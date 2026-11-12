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
  Clock,
  ScrollText,
  ShieldAlert,
} from "lucide-react";

// Table of Contents Items (matching section IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. CGLRC 1959 & Bhuiyan Rules" },
  { id: "interactive-affidavit-builder", label: "2. Free Fauti & Khasra Tool" },
  { id: "hindi-affidavit-template", label: "3. Hindi Fauti Affidavit Draft" },
  { id: "khasra-schedule-box", label: "4. Khasra B1 & P-II Schedule Box" },
  { id: "objection-notice-format", label: "5. 15-Day Objection Notice Draft" },
  { id: "stamp-duty-guide", label: "6. ₹50 Stamp Paper & Notary Rules" },
  { id: "mutation-comparison-table", label: "7. Joint Fauti vs Will vs Batwara" },
  { id: "bhuiyan-tehsil-sop", label: "8. Bhuiyan & Tehsil Filing SOP" },
  { id: "daughter-tribal-safeguards", label: "9. Daughter & Tribal Land Rules" },
  { id: "chhattisgarh-case-studies", label: "10. Cases: Bilaspur, Raipur & Durg" },
  { id: "statutory-citations", label: "11. Bhuiyan Portals & Legal Refs" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const CG_DISTRICTS = [
  "Raipur",
  "Bilaspur",
  "Durg",
  "Korba",
  "Raigarh",
  "Rajnandgaon",
  "Bastar (Jagdalpur)",
  "Surguja (Ambikapur)",
  "Dhamtari",
  "Mahasamund",
  "Janjgir-Champa",
  "Kabirdham (Kawardha)",
  "Balod",
  "Bemetara",
  "Baloda Bazar",
  "Kanker",
];

const CASE_TYPES: Record<
  "joint_bhumiswami" | "will_namantaran" | "tribal_sec165" | "haq_tyag_consent",
  {
    label: string;
    stampPractice: string;
    noticeDays: string;
    entryType: string;
    summary: string;
  }
> = {
  joint_bhumiswami: {
    label: "Intestate Joint Bhumiswami (सह-खातेदार फौती)",
    stampPractice: "₹50 Non-Judicial e-Stamp (Standard Tehsil Practice)",
    noticeDays: "15 Days (Section 110(3) Istehar)",
    entryType: "Joint Sah-Khatedar on B-1 & P-II",
    summary:
      "All Class I legal heirs (widow, sons, married daughters) enter jointly on Bhuiyan B-1 first. Later, heirs may apply for mutual Batwara under Section 178.",
  },
  will_namantaran: {
    label: "Registered / Unregistered Will (वसीयत नामांतरण)",
    stampPractice: "₹50 Warisan & Will Verification Affidavit",
    noticeDays: "15 Days + Personal Notice to All Heirs",
    entryType: "Devolution under Sec. 164 & 110",
    summary:
      "Tehsildar sends written notice to all natural legal heirs under Section 110(3) to check if anyone objects to the Will before updating Bhuiyan B-1.",
  },
  tribal_sec165: {
    label: "Scheduled Tribe Land Check (Sec. 165(6) CGLRC)",
    stampPractice: "₹50 Affidavit (Art. 4 ST Stamp Exemption Note)",
    noticeDays: "15 Days + Tribal Status Verification",
    entryType: "Tribal Legal Heirs Only (Sec. 164)",
    summary:
      "Agricultural land of an Aboriginal Tribe passes to tribal legal heirs under Section 164. Any non-tribal claim triggers Section 165(6) Collector bar.",
  },
  haq_tyag_consent: {
    label: "With Sister / Co-Heir Release (हक त्याग / सहमति)",
    stampPractice: "₹50 Affidavit + Registered Release Deed",
    noticeDays: "15 Days + In-Person Tehsil Statement",
    entryType: "Remaining Heirs with Consent Record",
    summary:
      "To drop a sister or co-heir from B-1, a simple affidavit is not enough. Attach a registered Release Deed (Haq Tyag) or record consent before the Tehsildar.",
  },
};

const FAQS = [
  {
    q: "What stamp paper value is needed for a Fauti Namantaran affidavit in CG?",
    a: "Under Schedule I-A Article 4 of the Indian Stamp Act in Chhattisgarh, the legal floor for a plain affidavit is ₹5. In practice across Raipur, Bilaspur, Durg, and Korba Tehsils, Notaries and Lok Seva Kendras print the Warisan affidavit on ₹50 non-judicial e-stamp paper, or ₹100 when indemnity terms are added.",
  },
  {
    q: "How do I apply for Fauti Namantaran online on the CG Bhuiyan portal?",
    a: "Visit bhuiyan.cg.nic.in or go to a local Choice Centre (CSC). Pick the online mutation link, choose Succession (Fauti), select your District, Tehsil, Village, and Khasra number, upload the death certificate, Vanshavali, B-1/P-II copy, and notarized Hindi affidavit as PDFs, and submit with OTP.",
  },
  {
    q: "What is the 15-day objection notice (Istehar) under Section 110 CGLRC?",
    a: "After the Patwari sends the field report, the Tehsildar issues a public Istehar (notice) in the village and on the Tehsil board under Section 110(3). Any legal heir or co-sharer gets 15 days to file written objections before the Bhumiswami entry order is signed.",
  },
  {
    q: "Must married daughters be included in a CG Fauti Namantaran affidavit?",
    a: "Yes. Under Section 164 of the Chhattisgarh Land Revenue Code, 1959 and the Supreme Court ruling in Vineeta Sharma (2020), married daughters hold equal birth rights in Bhumiswami land. Leaving out a daughter without a registered Release Deed can void the mutation.",
  },
  {
    q: "What is the difference between B-1 Khatauni and P-II Khasra on Bhuiyan CG?",
    a: "B-1 (Kistabandi Khatauni) lists all plots owned by a Bhumiswami in one village under one account. P-II (Panchsala Khasra) shows each Khasra plot number, land area (Rakba), soil irrigation status, crop details, and loan remarks. Both must match your affidavit.",
  },
  {
    q: "Is there a time limit to report Fauti Namantaran to the Patwari in CG?",
    a: "Yes. Under Section 109 of the Chhattisgarh Land Revenue Code, 1959, heirs must report land inheritance to the village Patwari or Tehsildar within six months of death. Late reports are still processed after verification, though a small statutory fee may apply.",
  },
  {
    q: "Can Scheduled Tribe land in Chhattisgarh be willed to a non-tribal person?",
    a: "No. Under Section 165(6) of the Chhattisgarh Land Revenue Code, 1959, Aboriginal Tribe Bhumiswami land cannot be transferred to a non-tribal in notified Scheduled Areas, and requires prior Collector permission elsewhere. On death, legal tribal heirs inherit under Section 164.",
  },
  {
    q: "What happens after the Tehsildar signs the Fauti Namantaran order?",
    a: "Once approved under Section 110(4), the Patwari updates Bhuiyan B-1 and P-II records to list all heirs as joint Sah-Khatedar Bhumiswamis. Next, collect your updated Rin Pustika (Kisan Kitab) from the Tehsil, and optionally apply for Batwara partition under Section 178.",
  },
];

interface WarisRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  status: "जीवित (Living)" | "विवाहित पुत्री (Married Daughter)" | "अवयस्क (Minor)" | "पूर्व-मृत शाखा (Predeceased Branch)";
}

interface KhasraRow {
  id: number;
  b1KhataNo: string;
  khasraNo: string;
  rakbaHectare: string;
  landType: string;
  rinPustikaNo: string;
  encumbranceNote: string;
}

export default function ChhattisgarhFautiClient() {
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
  const [copiedHindiDraft, setCopiedHindiDraft] = useState(false);
  const [copiedEnglishGuide, setCopiedEnglishGuide] = useState(false);
  const [copiedKhasraSchedule, setCopiedKhasraSchedule] = useState(false);
  const [copiedIstehar, setCopiedIstehar] = useState(false);
  const [copiedObjectionReply, setCopiedObjectionReply] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [draftView, setDraftView] = useState<"hindi" | "english">("hindi");

  // Interactive Builder State
  const [district, setDistrict] = useState<string>("Bilaspur");
  const [tehsil, setTehsil] = useState<string>("बिलासपुर (Bilaspur)");
  const [riMandal, setRiMandal] = useState<string>("सकरी (Sakri)");
  const [halkaNo, setHalkaNo] = useState<string>("24");
  const [village, setVillage] = useState<string>("मंगला (Mangla)");
  const [deceasedName, setDeceasedName] = useState<string>("स्व. श्री रामेश्वर प्रसाद वर्मा");
  const [deathDate, setDeathDate] = useState<string>("18-07-2026");
  const [deathRegNo, setDeathRegNo] = useState<string>("CG/D-2026/004192");
  const [applicantName, setApplicantName] = useState<string>("श्री सुरेश कुमार वर्मा");
  const [caseType, setCaseType] = useState<
    "joint_bhumiswami" | "will_namantaran" | "tribal_sec165" | "haq_tyag_consent"
  >("joint_bhumiswami");

  const [heirs, setHeirs] = useState<WarisRow[]>([
    {
      id: 1,
      name: "श्रीमती सावित्री देवी वर्मा",
      age: "64",
      relation: "पत्नी / विधवा (Spouse)",
      status: "जीवित (Living)",
    },
    {
      id: 2,
      name: "श्री सुरेश कुमार वर्मा",
      age: "40",
      relation: "पुत्र (Son)",
      status: "जीवित (Living)",
    },
    {
      id: 3,
      name: "श्रीमती सुनीता साहू",
      age: "36",
      relation: "पुत्री (Married Daughter)",
      status: "विवाहित पुत्री (Married Daughter)",
    },
  ]);

  const [khasraRows, setKhasraRows] = useState<KhasraRow[]>([
    {
      id: 1,
      b1KhataNo: "142",
      khasraNo: "318/2",
      rakbaHectare: "0.842 हेक्टेयर",
      landType: "सिंचित (Irrigated - नहर)",
      rinPustikaNo: "CG-BLP-88412",
      encumbranceNote: "KCC लोन नहीं / भार मुक्त (Free from Lien)",
    },
    {
      id: 2,
      b1KhataNo: "142",
      khasraNo: "319/1",
      rakbaHectare: "0.415 हेक्टेयर",
      landType: "असिंचित (Unirrigated)",
      rinPustikaNo: "CG-BLP-88412",
      encumbranceNote: "कोई न्यायालयीन प्रकरण लंबित नहीं",
    },
  ]);

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "नए वारिस का पूरा नाम",
        age: "32",
        relation: "पुत्र / पुत्री (Relation)",
        status: "जीवित (Living)",
      },
    ]);
  };

  const updateHeirRow = (id: number, field: keyof WarisRow, value: string) => {
    setHeirs((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const removeHeirRow = (id: number) => {
    if (heirs.length <= 1) return;
    setHeirs((prev) => prev.filter((r) => r.id !== id));
  };

  const addKhasraRow = () => {
    setKhasraRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        b1KhataNo: "142",
        khasraNo: "320/1",
        rakbaHectare: "0.250 हेक्टेयर",
        landType: "सिंचित (Irrigated)",
        rinPustikaNo: "CG-BLP-88412",
        encumbranceNote: "भार मुक्त (Clear)",
      },
    ]);
  };

  const updateKhasraRow = (id: number, field: keyof KhasraRow, value: string) => {
    setKhasraRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const removeKhasraRow = (id: number) => {
    if (khasraRows.length <= 1) return;
    setKhasraRows((prev) => prev.filter((r) => r.id !== id));
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

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  const khasraSummaryText = khasraRows
    .map(
      (k, i) =>
        `  ${i + 1}. बी-1 खाता क्र.: ${k.b1KhataNo} | खसरा (P-II) क्र.: ${k.khasraNo} | रकबा: ${k.rakbaHectare} | भूमि किस्म: ${k.landType} | ऋण पुस्तिका क्र.: ${k.rinPustikaNo} | भार/टिप्पणी: ${k.encumbranceNote}`
    )
    .join("\n");

  const heirsHindiList = heirs
    .map(
      (h, i) =>
        `  ${i + 1}. नाम: ${h.name} | उम्र: ${h.age} वर्ष | मृतक से संबंध: ${h.relation} | स्थिति: ${h.status}`
    )
    .join("\n");

  const hindiAffidavitDraft = `न्यायालय श्रीमान तहसीलदार महोदय, तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़) के समक्ष
(छत्तीसगढ़ भू-राजस्व संहिता, 1959 की धारा 109, 110 एवं धारा 164 के अंतर्गत फौती नामांतरण / संयुक्त भूमिस्वामी प्रविष्टि हेतु)

[₹50/- के नॉन-जुडिशियल ई-स्टाम्प पेपर पर नोटरी द्वारा सत्यापित कराकर भुइयां पोर्टल एवं तहसील कार्यालय में प्रस्तुत करने हेतु]

:: शपथ पत्र (वारिसान / फौती नामांतरण) ::

मैं शपथकर्ता ${applicantName}, आयु लगभग [आयु] वर्ष, पिता/पति का नाम [स्व. पिता/पति का नाम], निवासी - ग्राम ${village}, पटवारी हल्का नं. ${halkaNo}, राजस्व निरीक्षक मंडल (RI Circle) ${riMandal}, तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़), आधार कार्ड क्रमांक [XXXX-XXXX-XXXX], ईश्वर को साक्षी मानकर सत्यनिष्ठा से शपथपूर्वक बयान करता/करती हूँ कि:-

1. मृतक भूमिस्वामी एवं निवास का विवरण:
यह है कि ${deceasedName} (जो कि मेरे [पिता / माता / पति / संबंधी] थे), ग्राम ${village}, तहसील ${tehsil}, जिला ${district} के स्थायी निवासी एवं खातेदार भूमिस्वामी थे। उनका स्वर्गवास दिनांक ${deathDate} को [मृत्यु स्थान] में हो गया है। (नगर निगम / ग्राम पंचायत द्वारा जारी मृत्यु प्रमाण पत्र क्रमांक ${deathRegNo} की प्रमाणित प्रति संलग्न है)।

2. भुइयां पोर्टल खसरा (P-II) एवं बी-1 खतौनी भूमि विवरण:
यह है कि स्वर्गवासी खातेदार के नाम पर ग्राम ${village}, पटवारी हल्का क्र. ${halkaNo}, रा.नि.मं. ${riMandal}, तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़) में निम्नलिखित भूमिस्वामी हक की भूमि (बी-1 / खसरा पी-2 अनुसार) दर्ज है:-
${khasraSummaryText}

3. समस्त वैध कानूनी उत्तराधिकारियों (वारिसानों) की वंशावली तालिका:
यह है कि मृतक भूमिस्वामी के स्वर्गवास के पश्चात छत्तीसगढ़ भू-राजस्व संहिता की धारा 164 एवं लागू उत्तराधिकार विधि के अंतर्गत केवल निम्नलिखित जीवित/विधिक उत्तराधिकारी (विवाहित पुत्रियों एवं पूर्व-मृत संतान की शाखा सहित) हैं:-
${heirsHindiList}

4. अन्य किसी वारिस के न होने की नकारात्मक घोषणा (Negative Declaration):
यह है कि उपरोक्त तालिका में वर्णित वारिसानों के अतिरिक्त मृतक का अन्य कोई जीवित पति/पत्नी, पुत्र, विवाहित या अविवाहित पुत्री, दत्तक संतान या माता जीवित नहीं है। मृतक ने किसी अन्य व्यक्ति के पक्ष में कोई वसीयत निष्पादित नहीं की है [यदि वसीयत हो तो विवरण लिखें] और न ही किसी न्यायालय में कोई उत्तराधिकार वाद लंबित है।

5. अनुसूचित जनजाति (धारा 165(6)) एवं ऋण पुस्तिका घोषणा:
यह है कि भूमि स्वामी अनुसूचित जनजाति (Aboriginal Tribe) वर्ग से [नहीं आते हैं / आते हैं एवं समस्त वारिसान भी उसी अनुसूचित जनजाति के वैध उत्तराधिकारी हैं]। उक्त भूमि पर किसी बैंक (KCC) या सहकारी समिति का कोई अघोषित विवाद नहीं है।

6. संयुक्त भूमिस्वामी (सह-खातेदार) फौती नामांतरण की सहमति:
यह है कि हम समस्त वैध वारिसान की पूर्ण सहमति है कि भुइयां पोर्टल (bhuiyan.cg.nic.in) पर बी-1 एवं खसरा पी-2 अभिलेख में मृतक ${deceasedName} का नाम विलोपित कर उपरोक्त समस्त वैध वारिसानों का नाम संयुक्त भूमिस्वामी (सह-खातेदार) के रूप में फौती नामांतरण द्वारा दर्ज किया जाए।

सत्यापन (VERIFICATION)
मैं शपथकर्ता यह सत्यापित करता/करती हूँ कि उपरोक्त कंडिका क्रमांक 01 से 06 तक वर्णित समस्त तथ्य मेरी निजी जानकारी और विश्वास के अनुसार पूर्णतः सत्य एवं सही हैं। यदि भविष्य में कोई वारिस छिपाया जाना पाया जाता है या कोई तथ्य असत्य निकलता है, तो मैं भारतीय न्याय संहिता (BNS) की धारा 229 व 236 के अंतर्गत दण्डनीय दायित्व एवं नामांतरण निरस्तीकरण के लिए स्वयं उत्तरदायी रहूँगा/रहूँगी।

स्थान: ${district} (छत्तीसगढ़)
दिनांक: [DD-MM-YYYY]

शपथकर्ता के हस्ताक्षर: ________________________
पूरा नाम: ${applicantName}

-------------------------------------------------------------------------
नोटरी पब्लिक / शपथ आयुक्त का सत्यापन एवं दो गवाह (WITNESSES):
शपथकर्ता ने मेरे समक्ष आधार कार्ड से पहचान सिद्ध कर हस्ताक्षर किए।
1. गवाह 1 (नाम, ग्राम व आधार नं.): ______________________ हस्ताक्षर: ___________
2. गवाह 2 (नाम, ग्राम व आधार नं.): ______________________ हस्ताक्षर: ___________
नोटरी सील एवं पंजीयन क्रमांक: ________________________`;

  const englishGuideDraft = `AFFIDAVIT FOR FAUTI NAMANTARAN (SUCCESSION MUTATION) IN CHHATTISGARH
(Under Sections 109, 110 & 164 of the Chhattisgarh Land Revenue Code, 1959)
[Print on ₹50 Non-Judicial e-Stamp Paper & Notarize for Bhuiyan CG Portal & Tehsil Court]

BEFORE THE COURT OF TEHSILDAR, TEHSIL ${tehsil.toUpperCase()}, DISTRICT ${district.toUpperCase()} (C.G.)

I, ${applicantName}, aged about [Age] years, resident of Village ${village}, Patwari Halka No. ${halkaNo}, Revenue Inspector Circle ${riMandal}, Tehsil ${tehsil}, District ${district}, Chhattisgarh (Aadhaar No: [XXXX-XXXX-XXXX]), do hereby solemnly affirm on oath as follows:

1. DECEASED BHUMISWAMI DETAILS:
That ${deceasedName} was the recorded Bhumiswami of the agricultural/residential plots described below. The said Bhumiswami passed away on ${deathDate} as proven by Death Certificate No. ${deathRegNo}.

2. BHUIYAN PORTAL B-1 KHATAUNI & P-II KHASRA SCHEDULE:
${khasraRows
  .map(
    (k, i) =>
      `  ${i + 1}. B-1 Khata No: ${k.b1KhataNo} | Khasra P-II No: ${k.khasraNo} | Area: ${k.rakbaHectare} | Type: ${k.landType} | Rin Pustika: ${k.rinPustikaNo} | Remark: ${k.encumbranceNote}`
  )
  .join("\n")}

3. COMPLETE WARISAN (LEGAL HEIRS) LIST UNDER SECTION 164 CGLRC:
That at the time of death, the deceased left behind ONLY the following legal heirs (including spouse, sons, married daughters, and predeceased branch heirs):
${heirs
  .map(
    (h, i) =>
      `  ${i + 1}. ${h.name} | Age: ${h.age} | Relation: ${h.relation} | Status: ${h.status}`
  )
  .join("\n")}

4. NEGATIVE DECLARATION & TRIBAL LAND COMPLIANCE (SEC. 165(6)):
No other legal heir, adopted child, or Will claimant exists. No civil court stay is pending on these Khasra numbers. All legal heirs match applicable succession law and Section 165(6) tribal safeguards where applicable.

5. JOINT BHUMISWAMI ENTRY REQUEST:
All legal heirs consent to deletion of the deceased name and joint entry of all listed legal heirs (Sah-Khatedar) on the Bhuiyan B-1 and Khasra P-II revenue records under Section 110 of CGLRC 1959.

VERIFICATION:
Verified at ${district}, Chhattisgarh on [DD-MM-YYYY] that paragraphs 1 to 5 are true. Any false concealment attracts liability under Sections 229 & 236 of BNS, 2023.

DEPONENT SIGNATURE: _______________________
Name: ${applicantName}`;

  const khasraScheduleText = `BHUIYAN CG PORTAL KHASRA B-1 / P-II RECORD ALIGNMENT SCHEDULE
(Annexure to Fauti Namantaran Application & Affidavit under Sec. 109/110 CGLRC 1959)

District (जिला): ${district} | Tehsil (तहसील): ${tehsil}
Revenue Inspector Circle (रा.नि.मं.): ${riMandal} | Patwari Halka No. (प.ह.नं.): ${halkaNo}
Village (ग्राम): ${village} | Recorded Deceased Bhumiswami: ${deceasedName}

| क्र. | बी-1 खाता क्र. (B-1 Khata) | खसरा पी-2 क्र. (Khasra P-II) | कुल रकबा (Area) | भूमि किस्म (Type) | ऋण पुस्तिका क्र. (Rin Pustika) | भार / बंधक / ई-कोर्ट स्थिति |
${khasraRows
  .map(
    (k, i) =>
      `| ${i + 1} | ${k.b1KhataNo} | ${k.khasraNo} | ${k.rakbaHectare} | ${k.landType} | ${k.rinPustikaNo} | ${k.encumbranceNote} |`
  )
  .join("\n")}

VERIFICATION NOTE FOR PATWARI PRATIVEDAN:
1. All Khasra numbers above match the current digital Bhuiyan (bhuiyan.cg.nic.in) B-1 & P-II records.
2. Total Rakba across all Khasras matches the original Rin Pustika (Kisan Kitab) entry.
3. All surviving Class I / statutory legal heirs are disclosed in the attached Warisan Affidavit.`;

  const isteharNoticeText = `प्रारूप - इश्तेहार (15-दिवसीय सार्वजनिक आपत्ति आमंत्रण सूचना)
(छत्तीसगढ़ भू-राजस्व संहिता, 1959 की धारा 110 की उप-धारा (3) के अंतर्गत)

न्यायालय श्रीमान तहसीलदार महोदय, तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़)
राजस्व प्रकरण क्रमांक: .................../अ-6/वर्ष 2026
ग्राम: ${village} | पटवारी हल्का नंबर: ${halkaNo} | रा.नि.मं.: ${riMandal}

:: इश्तेहार (सार्वजनिक सूचना) ::

सर्वसाधारण, ग्रामवासियों एवं समस्त हितबद्ध व्यक्तियों को सूचित किया जाता है कि ग्राम ${village}, तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़) स्थित खसरा क्रमांक ${khasraRows.map((k) => k.khasraNo).join(", ")} (बी-1 खाता क्र. ${khasraRows[0]?.b1KhataNo || "___"}) के दर्ज भूमिस्वामी ${deceasedName} की मृत्यु दिनांक ${deathDate} को हो चुकी है।

मृतक के वैध कानूनी वारिस होने के नाते आवेदक ${applicantName} एवं अन्य सह-वारिसानों द्वारा उक्त भूमि को अपने नाम पर फौती नामांतरण (संयुक्त भूमिस्वामी प्रविष्टि) दर्ज कराने हेतु इस न्यायालय एवं भुइयां ऑनलाइन पोर्टल पर आवेदन प्रस्तुत किया गया है।

अतः इस संबंध में यदि किसी भी व्यक्ति, विवाहित/अविवाहित पुत्री, सह-खातेदार, बैंक अथवा अन्य हितबद्ध पक्ष को प्रस्तावित फौती नामांतरण पर कोई आपत्ति (Objection) हो, तो वह इस इश्तेहार के ग्राम में चस्पा/मुनादी होने की तिथि से 15 दिवस के भीतर अपनी लिखित आपत्ति मय प्रमाणित दस्तावेजों के इस न्यायालय में स्वयं या अधिवक्ता के माध्यम से प्रस्तुत कर सकता है।

निर्धारित 15 दिन की अवधि में कोई वैध आपत्ति प्राप्त न होने पर यह माना जाएगा कि किसी को कोई आपत्ति नहीं है, तथा धारा 110(4) के तहत नियमानुसार फौती नामांतरण आदेश पारित कर भुइयां B-1 व खसरा P-II में नाम दर्ज कर दिया जाएगा।

आज दिनांक [DD-MM-YYYY] को मेरे हस्ताक्षर एवं न्यायालय की मुद्रा से जारी।

तहसीलदार
तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़)
(प्रकाशन: ग्राम पंचायत भवन चस्पा, कोटवार मुनादी एवं तहसील सूचना पटल)`;

  const objectionReplyText = `15-दिवसीय इश्तेहार अवधि के भीतर लिखित आपत्ति आवेदन प्रारूप
(छत्तीसगढ़ भू-राजस्व संहिता, 1959 की धारा 110(3) एवं धारा 164 के तहत)

प्रति,
श्रीमान तहसीलदार महोदय,
तहसील ${tehsil}, जिला ${district} (छत्तीसगढ़)

विषय: प्रकरण क्रमांक [XXXX/अ-6/2026], ग्राम ${village} में फौती नामांतरण पर आपत्ति (छूटे हुए वारिस का नाम जोड़ने / वसीयत विवाद) बाबत।

महोदय,
1. यह कि आपके न्यायालय द्वारा ग्राम ${village}, प.ह.नं. ${halkaNo}, खसरा क्रमांक ${khasraRows[0]?.khasraNo || "___"} के फौती नामांतरण हेतु 15-दिवसीय इश्तेहार जारी किया गया है।
2. यह कि आवेदक द्वारा प्रस्तुत वारिसान शपथ पत्र में जानबूझकर या त्रुटिवश मुझ आपत्तिकर्ता [नाम लिखें, जैसे विवाहित पुत्री / मृतक की पत्नी / पूर्व-मृत पुत्र की संतान] का नाम छोड़ दिया गया है।
3. यह कि छत्तीसगढ़ भू-राजस्व संहिता की धारा 164 एवं माननीय सर्वोच्च न्यायालय के निर्णय (Vineeta Sharma v. Rakesh Sharma, 2020) के अनुसार मैं भी मृतक भूमिस्वामी का/की समान वैध वारिस हूँ।
4. अतः निवेदन है कि अविवादित नामांतरण स्थगित कर प्रकरण को विवादित नामांतरण पंजी में दर्ज किया जाए तथा बी-1/खसरा पी-2 में मेरा नाम भी संयुक्त भूमिस्वामी के रूप में शामिल किया जाए।

संलग्न साक्ष्य: आधार कार्ड, जन्म/विवाह प्रमाण पत्र, राशन कार्ड एवं वंशावली।

दिनांक: [DD-MM-YYYY]
आपत्तिकर्ता के हस्ताक्षर: ________________________`;

  const tehsilChecklistText = `CHHATTISGARH BHUIYAN PORTAL & TEHSIL FAUTI NAMANTARAN CHECKLIST (10 ITEMS)
1. Death Certificate (मृत्यु प्रमाण पत्र) of the deceased Bhumiswami issued by Municipal Corporation / Gram Panchayat.
2. Latest Digital B-1 (Khatauni) and P-II (Panchsala Khasra) downloaded from bhuiyan.cg.nic.in.
3. Notarized Hindi Fauti Namantaran (Warisan) Affidavit on ₹50 Non-Judicial e-Stamp Paper.
4. Sarpanch / Patwari Verified Family Tree (वंशावली चार्ट) naming widow, sons, married daughters, and minor/predeceased branches.
5. Original Rin Pustika / Kisan Kitab (ऋण पुस्तिका) of the deceased landowner for post-order endorsement.
6. Self-attested Aadhaar Cards of all surviving legal heirs (linked for e-KYC / OTP verification).
7. Patwari Mauka Panchnama & Prativedan (पटवारी मौका पंचनामा व प्रतिवेदन) signed by village panchas.
8. Registered Release Deed / Haq Tyag (हक त्याग पत्र) ONLY if a daughter or co-heir voluntarily relinquishes her share.
9. Registered Will & Witness Verification ONLY if mutation is claimed under a Will rather than intestate devolution.
10. Bank No-Dues / KCC Status Note if a crop loan encumbrance appears in Khasra Column 12 / Rin Pustika.`;

  const currentCase = CASE_TYPES[caseType];

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
            <span>CGLRC, 1959 • SECTIONS 109, 110 &amp; 164 • BHUIYAN CG PORTAL RULES</span>
          </div>

          {/* Strict Single H1 Tag (46 chars, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Chhattisgarh Fauti Namantaran Affidavit Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download the exact Hindi Warisan affidavit format on ₹50 stamp paper for Bhuiyan CG
            portal mutation. Includes live Khasra B-1/P-II schedules and the Section 110 15-day
            Tehsil objection notice draft.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#hindi-affidavit-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Hindi Fauti Draft</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Registered Will</span>
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CG Revenue Legal Help</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Ss. 109 &amp; 110</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CG LAND REVENUE CODE 1959
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹50 e-Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TEHSIL &amp; NOTARY PRACTICE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC. 110(3) ISTEHAR NOTICE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">B-1 &amp; P-II</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BHUIYAN JOINT ENTRY READY
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
                <span>Revenue Court Rules</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Compliant with Chhattisgarh Land Revenue Code 1959 ss. 109, 110, 164, 165(6), 178,
                Bhuiyan CG rules, BSA 2023 s. 61, and BNS 2023 ss. 229 &amp; 236.
              </p>
            </div>

            {/* Quick Start Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Tehsil &amp; Bhuiyan Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Copy the Hindi Warisan draft and Khasra B1/P2 table before visiting your Notary or
                local Choice Centre (CSC).
              </p>
              <a
                href="#hindi-affidavit-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Hindi Draft</span>
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
                  src="/images/chhattisgarh-fauti-namantaran-affidavit-format-og.jpg"
                  alt="Chhattisgarh Fauti Namantaran Affidavit Format and Khasra B1 P2 Guide"
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
                    Official Chhattisgarh Fauti Namantaran Hindi Draft, Khasra B-1/P-II Schedule &amp;
                    15-Day Istehar Notice Guide
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: CHHATTISGARH FAUTI NAMANTARAN ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>6-Month Reporting Rule (Sec. 109):</strong> Legal heirs must report a
                    landowner&apos;s death to the Patwari or Tehsildar within six months to avoid
                    late-fee notes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>₹50 Stamp Paper Practice:</strong> While Art. 4 sets a ₹5 legal floor,
                    Bilaspur, Raipur, and Durg Tehsils expect the Hindi Warisan draft on{" "}
                    <strong>₹50 non-judicial e-Stamp paper</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Exact B-1 &amp; P-II Alignment:</strong> Every Khasra number, Halka
                    number, RI Circle, and Hectare area (Rakba) in your affidavit must match your
                    Bhuiyan B-1 and P-II copy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>15-Day Objection Window (Sec. 110):</strong> The Tehsildar issues a
                    15-day public Istehar notice in the village before updating joint Bhumiswami
                    names on Bhuiyan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Married Daughters &amp; Tribal Land:</strong> Leave out no married
                    daughter without a registered Haq Tyag deed, and verify Section 165(6) rules for
                    Scheduled Tribe land.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY SINGLE H2 <= 70 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. CGLRC 1959 &amp; Bhuiyan Fauti Namantaran Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a landowner (Bhumiswami) passes away in Chhattisgarh, the family must update
                  the village land records. This process is called{" "}
                  <strong>Fauti Namantaran</strong> (death succession mutation). It removes the late
                  owner&apos;s name from the Bhuiyan portal and adds all legal heirs as joint{" "}
                  <em>Sah-Khatedars</em>.
                </p>
                <p>
                  Three sections of the <strong>Chhattisgarh Land Revenue Code, 1959</strong> run
                  this process. First, <strong>Section 164</strong> states that Bhumiswami land
                  passes on death by inheritance, survivorship, or Will under personal law. Next,{" "}
                  <strong>Section 109</strong> puts a legal duty on heirs to report this death to
                  the Patwari or Tehsildar within six months.
                </p>
                <p>
                  Third, <strong>Section 110</strong> sets the exact court steps for the Tehsildar.
                  After you apply online on <strong>bhuiyan.cg.nic.in</strong> or at a Choice
                  Centre, the Patwari checks your family tree and prepares a field report. Then the
                  Tehsildar issues a <strong>15-day Istehar (public notice)</strong> under Section
                  110(3) so any omitted heir can object.
                </p>
                <p>
                  Most generic forms online fail because they miss the exact Revenue Inspector (RI)
                  Circle, Patwari Halka number, B-1 Khata number, and Section 165(6) tribal
                  declaration. Our Hindi draft matches Chhattisgarh revenue court rules so your
                  file moves cleanly from Patwari check to new Rin Pustika issue.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE FAUTI & KHASRA BUILDER */}
            <section
              id="interactive-affidavit-builder"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>FREE INTERACTIVE DRAFT GENERATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Fauti Affidavit &amp; Khasra B1/P2 Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Fill in your District, Tehsil, Patwari Halka, Khasra rows, and legal heirs below.
                The tool builds your ready-to-print Hindi affidavit, B-1/P-II schedule, and
                15-day Istehar notice at once.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Row 1: Case Type & District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Mutation Case Category</span>
                    </label>
                    <select
                      value={caseType}
                      onChange={(e) => setCaseType(e.target.value as typeof caseType)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(CASE_TYPES).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Chhattisgarh District (जिला)</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {CG_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Tehsil, RI Circle, Halka, Village */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Tehsil (तहसील)
                    </label>
                    <input
                      type="text"
                      value={tehsil}
                      onChange={(e) => setTehsil(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      RI Circle (रा.नि.मं.)
                    </label>
                    <input
                      type="text"
                      value={riMandal}
                      onChange={(e) => setRiMandal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Patwari Halka No.
                    </label>
                    <input
                      type="text"
                      value={halkaNo}
                      onChange={(e) => setHalkaNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Village (ग्राम / वार्ड)
                    </label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 3: Deceased, Death Date, Cert No, Applicant */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Late Bhumiswami Name
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
                      Death Certificate No.
                    </label>
                    <input
                      type="text"
                      value={deathRegNo}
                      onChange={(e) => setDeathRegNo(e.target.value)}
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
                </div>

                {/* Editable Khasra B1 / P2 Rows */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Khasra P-II &amp; B-1 Plot Rows ({khasraRows.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={addKhasraRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Khasra Row</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {khasraRows.map((row, idx) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center"
                      >
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={row.b1KhataNo}
                            onChange={(e) => updateKhasraRow(row.id, "b1KhataNo", e.target.value)}
                            aria-label={`Row ${idx + 1} B1 Khata Number`}
                            placeholder="B-1 Khata"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={row.khasraNo}
                            onChange={(e) => updateKhasraRow(row.id, "khasraNo", e.target.value)}
                            aria-label={`Row ${idx + 1} Khasra P2 Number`}
                            placeholder="Khasra P-II"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={row.rakbaHectare}
                            onChange={(e) => updateKhasraRow(row.id, "rakbaHectare", e.target.value)}
                            aria-label={`Row ${idx + 1} Area Rakba`}
                            placeholder="Rakba (Hectare)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={row.rinPustikaNo}
                            onChange={(e) => updateKhasraRow(row.id, "rinPustikaNo", e.target.value)}
                            aria-label={`Row ${idx + 1} Rin Pustika Number`}
                            placeholder="Rin Pustika"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={row.encumbranceNote}
                            onChange={(e) => updateKhasraRow(row.id, "encumbranceNote", e.target.value)}
                            aria-label={`Row ${idx + 1} Encumbrance Status`}
                            placeholder="Loan / Stay Note"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeKhasraRow(row.id)}
                            aria-label={`Remove Khasra row ${idx + 1}`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editable Legal Heirs (Warisan) Rows */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Legal Heirs / Warisan List ({heirs.length})</span>
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
                            <option value="जीवित (Living)">जीवित (Living)</option>
                            <option value="विवाहित पुत्री (Married Daughter)">विवाहित पुत्री</option>
                            <option value="अवयस्क (Minor)">अवयस्क (Minor)</option>
                            <option value="पूर्व-मृत शाखा (Predeceased Branch)">पूर्व-मृत शाखा</option>
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

                {/* Live Computed Summary Box (Brand Navy #172228) */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        TEHSIL FILING SUMMARY ({district.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {currentCase.noticeDays}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Stamp Paper Needed
                      </div>
                      <div className="text-base sm:text-lg font-black text-white mt-1">
                        {currentCase.stampPractice}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Indian Stamp Act Sch. I-A Art. 4
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Bhuiyan B-1 Entry Mode
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                        {currentCase.entryType}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Halka {halkaNo} • {khasraRows.length} Khasra Plots
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Reporting Window
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                        Within 6 Months
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Section 109 CGLRC, 1959
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white">Tehsil Court Tip:</div>
                    <p className="leading-relaxed text-[11px]">{currentCase.summary}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: HINDI FAUTI NAMANTARAN AFFIDAVIT TEMPLATE (MANDATORY ASSET 1) */}
            <section id="hindi-affidavit-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MANDATORY ASSET: BHUIYAN &amp; TEHSIL DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Hindi Fauti Namantaran Affidavit Draft
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Chhattisgarh revenue courts and Patwaris process Fauti files in Hindi. Copy the
                Hindi draft below onto ₹50 non-judicial e-Stamp paper, sign before a Notary with two
                witnesses, and upload the PDF scan on Bhuiyan.
              </p>

              {/* Language Toggle Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDraftView("hindi")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    draftView === "hindi"
                      ? "bg-[#172228] text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Official Hindi Draft (हिन्दी शपथ पत्र)
                </button>
                <button
                  type="button"
                  onClick={() => setDraftView("english")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    draftView === "english"
                      ? "bg-[#172228] text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  English Reference Version
                </button>
              </div>

              {/* Template Container Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {draftView === "hindi"
                        ? "फौती नामांतरण शपथ पत्र प्रारूप (₹50 STAMP PAPER - HINDI)"
                        : "CHHATTISGARH FAUTI AFFIDAVIT FORMAT (ENGLISH REFERENCE)"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      draftView === "hindi"
                        ? copyText(hindiAffidavitDraft, setCopiedHindiDraft)
                        : copyText(englishGuideDraft, setCopiedEnglishGuide)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {(draftView === "hindi" ? copiedHindiDraft : copiedEnglishGuide) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Affidavit Draft!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>
                          {draftView === "hindi" ? "Copy Hindi Draft" : "Copy English Guide"}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[600px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {draftView === "hindi" ? hindiAffidavitDraft : englishGuideDraft}
                </div>
                <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <span>
                    Compliant with CGLRC 1959 ss. 109, 110 &amp; 164 (Joint Sah-Khatedar Entry)
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(hindiAffidavitDraft, setCopiedHindiDraft)}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Hindi Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 4: KHASRA B-1 & P-II RECORD ALIGNMENT SCHEDULE (MANDATORY ASSET 2) */}
            <section id="khasra-schedule-box" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>MANDATORY ASSET: BHUIYAN RECORD ALIGNMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Khasra B-1 &amp; P-II Record Alignment Schedule
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Tehsil clerks reject Fauti files when the land details in your affidavit do not match
                Bhuiyan&apos;s digital <strong>B-1 (Kistabandi Khatauni)</strong> and{" "}
                <strong>P-II (Panchsala Khasra)</strong>. Attach this Schedule Box with your
                affidavit:
              </p>

              {/* Live Khasra B1/P2 Schedule Table */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                      KHASRA B-1 / P-II ALIGNMENT SCHEDULE
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Village: <strong>{village}</strong> • Halka No. <strong>{halkaNo}</strong> •
                      RI Circle: <strong>{riMandal}</strong> • District: <strong>{district}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(khasraScheduleText, setCopiedKhasraSchedule)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedKhasraSchedule ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Schedule Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Khasra Schedule</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-900 font-extrabold">
                        <th className="py-3 px-4">No.</th>
                        <th className="py-3 px-4 text-[#C65378]">B-1 Khata No.</th>
                        <th className="py-3 px-4">Khasra (P-II) No.</th>
                        <th className="py-3 px-4">Area (Rakba)</th>
                        <th className="py-3 px-4">Land Type</th>
                        <th className="py-3 px-4">Rin Pustika No.</th>
                        <th className="py-3 px-4">Lien / e-Court Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {khasraRows.map((k, idx) => (
                        <tr key={k.id}>
                          <td className="py-3 px-4 font-bold text-slate-900">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-[#C65378]">{k.b1KhataNo}</td>
                          <td className="py-3 px-4 font-extrabold text-slate-900">{k.khasraNo}</td>
                          <td className="py-3 px-4">{k.rakbaHectare}</td>
                          <td className="py-3 px-4">{k.landType}</td>
                          <td className="py-3 px-4 font-mono text-xs">{k.rinPustikaNo}</td>
                          <td className="py-3 px-4 text-xs">{k.encumbranceNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4 Field Cards matching PartitionDeed Schedule Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Field 1</span>
                    <span className="text-[11px] font-bold text-slate-500">B-1 Khatauni</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Khata Account &amp; Co-Sharers (सह-खातेदार)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Check if the deceased held sole title or joint title with brothers. Only the
                    deceased&apos;s undivided share passes to their legal heirs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Field 2</span>
                    <span className="text-[11px] font-bold text-slate-500">P-II Khasra</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Bataankan Splits (बटांकन / उप-खसरा)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Always write exact slash numbers (like 318/2) and Hectare figures up to three
                    decimals. Rounding off area triggers Bhuiyan error flags.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Field 3</span>
                    <span className="text-[11px] font-bold text-slate-500">Column 12 Remarks</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    KCC Bank Loan &amp; Revenue e-Court Flag
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If a Kisan Credit Card (KCC) lien or stay order shows in P-II remarks, attach a
                    bank status note or disclose the lien in Paragraph 5.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Field 4</span>
                    <span className="text-[11px] font-bold text-slate-500">Rin Pustika</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Kisan Kitab Endorsement &amp; Paddy Sale
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    After Bhuiyan updates B-1, take your old Rin Pustika to the Patwari so the new
                    heirs can sell paddy at MSP societies and claim crop insurance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: 15-DAY OBJECTION NOTICE FORMAT (MANDATORY ASSET 3) */}
            <section id="objection-notice-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>MANDATORY ASSET: SECTION 110(3) ISTEHAR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. 15-Day Objection Notice Format (Sec. 110)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under <strong>Section 110(3) of CGLRC, 1959</strong>, the Tehsildar cannot pass a
                mutation order right after you file. The court publishes a{" "}
                <strong>15-day public Istehar notice</strong> at the Gram Panchayat Bhawan, through
                Kotwar <em>munadi</em>, and on the Tehsil board.
              </p>

              {/* Istehar Notice Draft Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>15-DAY ISTEHAR NOTICE FORMAT (तहसीलदार इश्तेहार प्रारूप)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(isteharNoticeText, setCopiedIstehar)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedIstehar ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Istehar Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Istehar Format</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {isteharNoticeText}
                </div>
              </div>

              {/* Excluded Heir Written Objection Application Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                    <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                    <span>FOR EXCLUDED HEIRS: WRITTEN OBJECTION (आपत्ति आवेदन)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(objectionReplyText, setCopiedObjectionReply)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedObjectionReply ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Objection Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Objection Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If a brother filed Fauti Namantaran while leaving out a married sister or widow,
                  submit this written objection within the 15-day window to convert the file into a
                  contested case.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {objectionReplyText}
                </div>
              </div>
            </section>

            {/* SECTION 6: STAMP DUTY & NOTARY GUIDE */}
            <section id="stamp-duty-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>CHHATTISGARH STAMP ACT RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. ₹50 Stamp Paper &amp; Notary Rules in Chhattisgarh
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Families in Bilaspur, Raipur, and Durg often ask why lawyers recommend ₹50 stamp
                paper when Article 4 mentions ₹5. Check the four rules below before you buy e-Stamp
                paper:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Tehsil Practice
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                      ₹50 e-Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Standard Fauti Warisan Affidavit
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Although Sch. I-A Art. 4 sets a ₹5 legal floor, SHCIL vendors and Tehsil
                    Notaries routinely issue ₹50 e-Stamp sheets. Paying higher stamp value is
                    100% valid.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Combined Indemnity
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      ₹100 e-Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    With Indemnity Bond or Urban Plots
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For Raipur Development Authority (RDA), Nava Raipur, or high-value municipal
                    claims with indemnity clauses, ₹100 non-judicial stamp paper is preferred.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#5F7E75]">
                      Article 4 Exemption
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                      ₹0 Stamp Free
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Court Filings, Pension &amp; SC/ST Notes
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under CG Art. 4 exemptions, affidavits filed for family pension, directly in
                    civil courts, or by eligible SC/ST members carry statutory stamp exemption.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Portal &amp; CSC Fee
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      Nominal CSC Fee
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Bhuiyan Portal &amp; Lok Seva Kendra
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reporting Fauti inheritance within 6 months carries no penalty. Choice Centres
                    (CSC) and Lok Seva Kendras charge only standard scan and portal user fees.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Do Not Buy ₹50 Stamp for Haq Tyag:</strong> A ₹50 notarized affidavit
                  cannot erase a sister&apos;s legal share. To release a share, the sister must sign
                  a registered Release Deed (Haq Tyag) at the Sub-Registrar Office (NGDRS CG) or
                  give recorded consent in open Tehsil court.
                </span>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="mutation-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>REVENUE PROCEDURE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Joint Fauti vs Will Mutation vs Sec. 178 Batwara
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Families often confuse death mutation (Fauti) with land partition (Batwara). Compare
                how each revenue step works on Bhuiyan CG:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Key Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Joint Fauti (Sec. 110)</th>
                      <th className="py-3.5 px-4">Will Mutation (Sec. 164)</th>
                      <th className="py-3.5 px-4">Batwara Partition (Sec. 178)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">When Applied</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Owner died without a Will
                      </td>
                      <td className="py-3 px-4">Owner left a signed / registered Will</td>
                      <td className="py-3 px-4">After heirs are entered jointly on B-1</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Paperwork Needed</td>
                      <td className="py-3 px-4">
                        ₹50 Warisan Affidavit, Death Cert., Vanshavali
                      </td>
                      <td className="py-3 px-4">
                        Original Will, 2 Witness Statements, Affidavit
                      </td>
                      <td className="py-3 px-4">Fard Batwara Map &amp; Partition Affidavit</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Notice Period</td>
                      <td className="py-3 px-4 font-bold text-rose-700">15-Day Istehar</td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        15-Day Istehar + Individual Notice
                      </td>
                      <td className="py-3 px-4">Notice to all Sah-Khatedars</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Result on Bhuiyan B-1</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        All heirs enter as joint owners
                      </td>
                      <td className="py-3 px-4">Legatee enters as sole / named owner</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Separate Bataankan Khasras &amp; Rin Pustika
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">SRO Stamp Duty</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        ₹0 Ad-Valorem Duty
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        ₹0 Ad-Valorem Duty
                      </td>
                      <td className="py-3 px-4">Nominal revenue fee for mutual Batwara</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: BHUIYAN & TEHSIL FILING SOP */}
            <section id="bhuiyan-tehsil-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>STEP-BY-STEP BHUIYAN PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Bhuiyan Portal &amp; Tehsil Filing SOP
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Download Digital B-1 & P-II from Bhuiyan CG",
                    desc: "Visit bhuiyan.cg.nic.in and pull the latest digitally signed B-1 Khatauni and P-II Khasra for your village. Check the exact Halka number, RI Circle, and Hectare area.",
                  },
                  {
                    step: 2,
                    title: "Print & Notarize Hindi Affidavit on ₹50 Stamp Paper",
                    desc: "Paste our Hindi Warisan Affidavit with the Khasra B1/P2 Schedule onto ₹50 non-judicial e-Stamp paper. Sign before a Notary Public with two witnesses.",
                  },
                  {
                    step: 3,
                    title: "Get Sarpanch / Ward Vanshavali & Death Certificate",
                    desc: "Attach the official Death Certificate and a signed Vanshavali (family tree) from the Gram Panchayat Sarpanch or local ward office listing all living heirs.",
                  },
                  {
                    step: 4,
                    title: "Submit Online Application on Bhuiyan / Choice Centre",
                    desc: "File under Succession (Fauti) on bhuiyan.cg.nic.in or at a Lok Seva Kendra. Upload clean PDF scans under 2 MB, confirm via your registered mobile OTP, and save the Case Number.",
                  },
                  {
                    step: 5,
                    title: "Patwari Prativedan & 15-Day Section 110 Istehar",
                    desc: "Your file routes to the Halka Patwari for Mauka Panchnama and report. Next, the Tehsildar issues a 15-day public Istehar notice in the village and on the Tehsil board.",
                  },
                  {
                    step: 6,
                    title: "Tehsildar Order, Bhuiyan Update & New Rin Pustika",
                    desc: "If no objection arrives in 15 days, the Tehsildar signs the Section 110(4) order. Verify your updated names on Bhuiyan B-1 and collect your new Rin Pustika (Kisan Kitab).",
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

              {/* Copyable 10-Item Checklist */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Need the 10-Point Bhuiyan &amp; Tehsil Document Checklist?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Copy all required PDFs and originals before visiting your Choice Centre.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(tehsilChecklistText, setCopiedChecklist)}
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
                      <span>Copy 10-Item List</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* SECTION 9: DAUGHTER SHARES & SECTION 165(6) TRIBAL LAND */}
            <section
              id="daughter-tribal-safeguards"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COPARCENARY &amp; TRIBAL SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Daughter Shares &amp; Section 165(6) Tribal Land Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Two statutory traps frequently trigger Tehsil objections or appellate reversals
                  before the Sub-Divisional Officer (SDO Revenue) in Chhattisgarh:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Married Daughters Hold Equal Bhumiswami Rights:</strong> Under{" "}
                    <strong>Section 164 CGLRC</strong> read with Section 6 of the Hindu Succession
                    Act and <em>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</em>, married and
                    unmarried daughters inherit equally with sons. Leaving a sister off the
                    affidavit invites a 15-day objection or appeal.
                  </li>
                  <li>
                    <strong>Scheduled Tribe Land Protection (Section 165(6)):</strong> In Scheduled
                    Areas (such as Bastar, Surguja, Jashpur, Korba, and Kanker), agricultural land
                    owned by an Aboriginal Tribe Bhumiswami cannot pass to a non-tribal by sale or
                    Will without strict statutory compliance and Collector sanction in non-scheduled
                    areas.
                  </li>
                  <li>
                    <strong>Predeceased Child &amp; Minor Heirs:</strong> Under Section 109, if an
                    heir is a minor, the surviving parent or guardian reports the Fauti entry and
                    ensures the minor&apos;s name appears in B-1 under guardianship.
                  </li>
                </ul>
              </div>
            </section>

            {/* MANDATORY COMPONENT 4: DUAL CONVERSION CTA BANNER INSIDE MAIN FLOW */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 shadow-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                    <Lock className="w-3 h-3 text-[#C65378]" />
                    <span>PREVENT FUTURE BHUMISWAMI DISPUTES</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    Need Chhattisgarh Revenue Help or a Registered Will?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Stuck in a contested Fauti mutation or B-1 mismatch at Raipur, Bilaspur, or Durg
                    Tehsil? Talk to our legal team or draft a clear Will so your heirs avoid family
                    disputes later.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <Scale className="w-4 h-4" />
                    <span>CG Revenue Legal Help</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Draft Your Will Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 10: REAL CASE STUDIES */}
            <section
              id="chhattisgarh-case-studies"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL REGIONAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Cases: Bilaspur, Raipur &amp; Durg Tehsils
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: SAKRI CIRCLE, BILASPUR TEHSIL</span>
                    <span className="text-slate-500 font-semibold">₹50 Warisan Affidavit</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Clearing Joint Bhumiswami Entry Across 3 Khasra Plots
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family in Bilaspur had their Bhuiyan Fauti file returned twice because their
                    short local draft missed the RI Circle and Bataankan numbers. Using our full
                    Hindi draft on ₹50 e-Stamp paper with the B-1/P-II Schedule cleared Patwari
                    verification and the 15-day Istehar smoothly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: DHARSIWA TEHSIL, RAIPUR</span>
                    <span className="text-slate-500 font-semibold">15-Day Objection Fix</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Adding Married Daughters Before Joint B-1 &amp; Sec. 178 Batwara
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two brothers applied for Fauti Namantaran in Raipur without naming their married
                    sister. During the 15-day Istehar period, the sister filed a Section 110(3)
                    objection. Adding her in a corrected Warisan affidavit followed by a registered
                    Haq Tyag deed resolved the file without SDO appeal.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: PATAN &amp; DURG DIVISION</span>
                    <span className="text-slate-500 font-semibold">KCC Lien &amp; Rin Pustika</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Disclosing Active Crop Loan Remarks for Unblocked Mutation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Durg farmer passed away with a KCC crop loan noted in P-II Column 12. The
                    family declared the active society loan in Paragraph 5 of the Hindi affidavit and
                    attached the society statement, allowing joint Sah-Khatedar Fauti entry and
                    fresh Rin Pustika issuance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: OFFICIAL PORTALS & LEGAL REFERENCES */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY REFS &amp; INTERNAL SPOKES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Official Bhuiyan Portals &amp; Legal Citations
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Chhattisgarh Land Revenue Code, 1959 ss. 109, 110 &amp; 164:</strong>{" "}
                    Governs inheritance devolution, 6-month reporting duty, 15-day Istehar notice,
                    and Tehsildar mutation orders.
                  </li>
                  <li>
                    <strong>CGLRC, 1959 s. 165(6) &amp; s. 178:</strong> Protects Scheduled Tribe
                    Bhumiswami land transfers and governs mutual Batwara partition after joint
                    Fauti entry.
                  </li>
                  <li>
                    <strong>Indian Stamp Act (CG Sch. I-A Art. 4) &amp; BNS 2023 ss. 229, 236:</strong>{" "}
                    Sets affidavit stamp norms and penal action for concealing legal heirs.
                  </li>
                  <li>
                    <strong>Supreme Court Precedent:</strong>{" "}
                    <em>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</em> on equal coparcenary
                    rights of daughters.
                  </li>
                </ul>

                {/* Official External Portals (Verified 200 OK HTTPS) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://bhuiyan.cg.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>Bhuiyan CG Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://revenue.cg.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>CG Revenue Department</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://highcourt.cg.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Chhattisgarh High Court</span>
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

                {/* Hub-and-Spoke Internal Links (Verified 200 OK Routes) */}
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
                    CG Revenue Legal Help
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Start Online Will Draft
                  </Link>
                  <Link
                    href="/locations/chhattisgarh"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Chhattisgarh Will &amp; NGDRS Guide
                  </Link>
                  <Link
                    href="/locations/raipur"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Raipur Estate &amp; SRO Guide
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Dakhil Kharij Mutation Service
                  </Link>
                  <Link
                    href="/templates/release-deed-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Haq Tyag Release Deed Format
                  </Link>
                  <Link
                    href="/templates/partition-deed-format-between-family-members"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Family Partition Deed Format
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: CG Fauti Namantaran
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

            {/* Plain-English Summary Cards (Matching PartitionDeedClient Reference) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will keeps your spouse and kids safe. It avoids long revenue court fights
                  and sets out exact shares in your family house, plot, and farm land.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">₹50 Stamp Paper Rule</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Print your Hindi Fauti draft on ₹50 e-Stamp paper. Add your exact B-1 and P-II
                  Khasra details, then sign before a Notary with two witnesses.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your Khasra B-1 copy, Vanshavali tree, and Rin Pustika. We
                  guide you through Tehsil notices so your family gets clear title fast.
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
                Advises families on Chhattisgarh Land Revenue Code mutations, Bhumiswami title
                checks, Haq Tyag deeds, and registered Wills at AMA Legal Solutions.
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
                  <span>PREVENT MUTATION DISPUTES</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family Land with a Registered Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clear Will names exact heirs for every Khasra and plot, preventing contested
                  Tehsil fights after your lifetime.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Stamp Duty on CG Wills</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - CG REVENUE LEGAL HELP (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CG REVENUE &amp; TEHSIL DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need Help with Bhuiyan Fauti or Contested Notice?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our legal team drafts custom Hindi Warisan affidavits, Khasra schedules, and
                  Section 110 objection replies for Raipur, Bilaspur, and Durg Tehsils.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>CG Revenue Legal Help</span>
                </Link>
                <Link
                  href="/services/property-mutation-dakhil-kharij-service"
                  className="block text-[11px] font-bold text-[#C65378] hover:underline"
                >
                  View Property Mutation Service
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
                      <strong>Bhuiyan Ready:</strong> Exact B-1, P-II &amp; Halka number format.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Authentic Hindi:</strong> Written for CG Tehsil &amp; Patwari review.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sec. 110 &amp; 165 Safe:</strong> Covers 15-day Istehar &amp; tribal
                      clauses.
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
          href="#hindi-affidavit-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Hindi Draft</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Help</span>
        </Link>
      </div>
    </div>
  );
}
