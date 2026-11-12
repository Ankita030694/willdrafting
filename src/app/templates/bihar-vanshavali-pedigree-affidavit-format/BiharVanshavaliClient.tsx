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
  Edit3,
} from "lucide-react";

// Table of Contents Items (all <= 70 chars, 0 em-dashes, matching section IDs)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Bihar Vanshavali & Mutation Law" },
  { id: "interactive-vanshavali-builder", label: "2. Free Vanshavali & Pedigree Tool" },
  { id: "hindi-vanshavali-template", label: "3. Editable Hindi Affidavit Draft" },
  { id: "pedigree-tree-chart", label: "4. Multi-Gen Pedigree Tree Chart" },
  { id: "mukhiya-endorsement-box", label: "5. Mukhiya Seal & Notary Stamp Box" },
  { id: "comparison-matrix", label: "6. Mukhiya Slip vs Magistrate Draft" },
  { id: "dakhil-kharij-sop", label: "7. BiharBhumi Filing SOP & Checklist" },
  { id: "daughters-land-survey", label: "8. Daughters' Rights & Survey Form" },
  { id: "case-studies", label: "9. Bihar Cases: Patna, Gaya & Muzaffarpur" },
  { id: "statutory-citations", label: "10. Official Portals & Law Links" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
];

const BIHAR_DISTRICTS = [
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Darbhanga",
  "Purnia",
  "Begusarai",
  "Saran (Chapra)",
  "Vaishali (Hajipur)",
  "Nalanda (Bihar Sharif)",
  "Rohtas (Sasaram)",
  "Purbi Champaran (Motihari)",
  "Pashchim Champaran (Bettiah)",
  "Sitamarhi",
  "Madhubani",
  "Samastipur",
  "Siwan",
  "Aurangabad",
  "Bhojpur (Arrah)",
  "Katihar",
  "Munger",
  "Saharsa",
];

const PERSONAL_LAWS: Record<
  "hindu" | "muslim" | "christian",
  {
    label: string;
    labelHi: string;
    statute: string;
    ruleSummary: string;
  }
> = {
  hindu: {
    label: "Hindu / Sikh / Jain / Buddhist",
    labelHi: "हिन्दू उत्तराधिकार अधिनियम, 1956 (धारा 6 एवं 8)",
    statute: "Hindu Succession Act, 1956 (Class I Heirs)",
    ruleSummary:
      "Wife, mother, sons, and all married or unmarried daughters take equal birth shares under Vineeta Sharma (2020).",
  },
  muslim: {
    label: "Muslim Personal Law (Shariat)",
    labelHi: "मुस्लिम पर्सनल लॉ (शरीयत) अधिनियम, 1937",
    statute: "Muslim Personal Law (Shariat) Act, 1937",
    ruleSummary:
      "Spouse, sons, daughters, and living parents must all appear on the Vanshavali per fixed Quranic shares.",
  },
  christian: {
    label: "Christian (Indian Succession Act)",
    labelHi: "भारतीय उत्तराधिकार अधिनियम, 1925 (भाग V)",
    statute: "Indian Succession Act, 1925 (Part V)",
    ruleSummary:
      "Spouse takes one-third share with children, and sons and daughters split the balance equally.",
  },
};

const PURPOSE_CONFIG: Record<
  "dakhil_kharij" | "land_survey_3_1" | "gram_katchahry" | "bank_court",
  {
    label: string;
    stampValue: string;
    officeFee: string;
    timeline: string;
    authorityLabel: string;
    summary: string;
  }
> = {
  dakhil_kharij: {
    label: "BiharBhumi Dakhil Kharij (Form-IA)",
    stampValue: "₹100 Stamp Paper (Art. 4)",
    officeFee: "₹0 Portal Fee (Free Online)",
    timeline: "35 to 75 Working Days",
    authorityLabel: "Circle Officer (Anchal Adhikari)",
    summary:
      "File Form-IA online on biharbhumi.bihar.gov.in with your ₹100 sworn affidavit, Panchayat Sachiv report, and Sarpanch seal.",
  },
  land_survey_3_1: {
    label: "Bihar Special Land Survey (Prapatra-3(1))",
    stampValue: "Plain Form + ₹100 Backup Oath",
    officeFee: "₹0 Camp Submission Fee",
    timeline: "Survey Camp Verification",
    authorityLabel: "Special Survey Amin / Shivir Prabhari",
    summary:
      "Submit Prapatra-2 and self-attested Prapatra-3(1) at the Survey Camp or on dlrs.bihar.gov.in. Keep a ₹100 sworn copy ready for disputes.",
  },
  gram_katchahry: {
    label: "Gram Katchahry Vanshavali Certificate",
    stampValue: "₹100 Oath + Application Form",
    officeFee: "₹10 Cash Fee (₹100 Duplicate)",
    timeline: "7 Days Verification Cycle",
    authorityLabel: "Panchayat Secretary & Sarpanch",
    summary:
      "Submit your ₹100 affidavit with ₹10 fee receipt to the Panchayat Secretary. After local field inquiry in 7 days, the Sarpanch issues the certificate.",
  },
  bank_court: {
    label: "Bank Deceased Claim / Civil File",
    stampValue: "₹100 Stamp + Notary / Magistrate",
    officeFee: "As per Bank / Notary Rules",
    timeline: "15 to 30 Days",
    authorityLabel: "Executive Magistrate / Notary Public",
    summary:
      "Banks and civil courts require an Executive Magistrate or Notary countersigned Vanshavali naming all Class I heirs and branch shares.",
  },
};

const FAQS = [
  {
    q: "What stamp paper value is needed for a Bihar Vanshavali affidavit?",
    a: "Under Schedule 1-A, Article 4 of the Indian Stamp Act as applied in Bihar, a sworn Vanshavali affidavit needs a ₹100 non-judicial stamp paper or e-stamp. For the Bihar Special Land Survey, you can also attach plain-paper Prapatra-3(1) alongside your sworn affidavit.",
  },
  {
    q: "Is a Gram Panchayat Mukhiya Vanshavali alone valid for Dakhil Kharij?",
    a: "No. Under the Bihar Gram Panchayat Raj Act, 2006 and state circulars, a Mukhiya or Sarpanch slip alone has no full legal power. You must pair your ₹100 sworn affidavit (signed before a Notary or Executive Magistrate) with Panchayat Secretary inquiry and Sarpanch seal.",
  },
  {
    q: "How much fee does the Panchayat Secretary charge for Vanshavali in Bihar?",
    a: "Under Bihar Panchayati Raj Department rules, the Gram Panchayat Secretary charges a flat ₹10 official fee with a receipt for a fresh Vanshavali. A second copy costs ₹100. The verification report must be completed within 7 days of filing.",
  },
  {
    q: "How long does the Circle Officer take for Dakhil Kharij under Section 6?",
    a: "Under Section 6 of the Bihar Land Mutation Act, 2011, the Circle Officer must decide undisputed mutation files within 35 working days. If any heir files an objection, the officer conducts hearings and passes a speaking order within 75 working days.",
  },
  {
    q: "Must married daughters be named in the Bihar Vanshavali family tree?",
    a: "Yes. Under Section 6 of the Hindu Succession Act and the Supreme Court Vineeta Sharma (2020) ruling, married and unmarried daughters hold equal birth shares. Leaving a sister or daughter out makes the Vanshavali false and invites mutation cancellation.",
  },
  {
    q: "What is the difference between Prapatra-3(1) and a Dakhil Kharij affidavit?",
    a: "Prapatra-3(1) is a self-attested family tree form used for the Bihar Special Land Survey under DLRS rules. In contrast, BiharBhumi online Dakhil Kharij (Form-IA) requires a ₹100 notarized or Magistrate Vanshavali affidavit plus Panchayat verification.",
  },
  {
    q: "What can I do if the Circle Officer rejects my Vanshavali mutation file?",
    a: "First download the reasoned Form 4 order from BiharBhumi. Under Section 7 of the Bihar Land Mutation Act, 2011, you can file a Mutation Appeal before the Deputy Collector Land Reforms (DCLR) within 30 days of the rejection order.",
  },
  {
    q: "Can NRIs or out-of-state Biharis file a Vanshavali affidavit without visiting?",
    a: "Yes. Any co-heir living in Patna, Delhi, or abroad can sign a Power of Attorney or sworn affidavit before a Notary or Indian Embassy. One local co-heir can then submit the Form-IA file on BiharBhumi with Aadhaar and consent papers.",
  },
];

interface PedigreeMember {
  id: number;
  generation: "Gen 2" | "Gen 3";
  name: string;
  nameHi: string;
  age: string;
  relation: string;
  relationHi: string;
  status: "Living" | "Married & Living" | "Predeceased" | "Minor";
  branchNote: string;
}

export default function BiharVanshavaliClient() {
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
  const [templateLang, setTemplateLang] = useState<"both" | "hi" | "en">("both");
  const [isEditingHindi, setIsEditingHindi] = useState(false);
  const [isEditingEnglish, setIsEditingEnglish] = useState(false);
  const [customHindiDraft, setCustomHindiDraft] = useState<string | null>(null);
  const [customEnglishDraft, setCustomEnglishDraft] = useState<string | null>(null);

  const [copiedHindi, setCopiedHindi] = useState(false);
  const [copiedEnglish, setCopiedEnglish] = useState(false);
  const [copiedBoth, setCopiedBoth] = useState(false);
  const [copiedPedigree, setCopiedPedigree] = useState(false);
  const [copiedMukhiya, setCopiedMukhiya] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // Interactive Bihar Vanshavali & Land Record State
  const [purpose, setPurpose] = useState<
    "dakhil_kharij" | "land_survey_3_1" | "gram_katchahry" | "bank_court"
  >("dakhil_kharij");
  const [personalLaw, setPersonalLaw] = useState<"hindu" | "muslim" | "christian">("hindu");
  const [areaType, setAreaType] = useState<"rural_panchayat" | "urban_municipal">("rural_panchayat");
  const [district, setDistrict] = useState<string>("Patna");
  const [anchal, setAnchal] = useState<string>("Danapur");
  const [panchayatOrWard, setPanchayatOrWard] = useState<string>("Adampur Gram Panchayat");
  const [mauza, setMauza] = useState<string>("Sultanpur");
  const [thanaNo, setThanaNo] = useState<string>("21");
  const [khataNo, setKhataNo] = useState<string>("142");
  const [khesraNo, setKhesraNo] = useState<string>("816, 817");
  const [jamabandiNo, setJamabandiNo] = useState<string>("Vol-4 / Page-118");

  const [deceasedName, setDeceasedName] = useState<string>("स्व. रामेश्वर प्रसाद सिंह (Late Rameshwar Prasad Singh)");
  const [ancestorFather, setAncestorFather] = useState<string>("स्व. शिवनंदन सिंह (Late Shivnandan Singh)");
  const [deathDate, setDeathDate] = useState<string>("12-06-2024");
  const [applicantName, setApplicantName] = useState<string>("राजेश कुमार सिंह (Rajesh Kumar Singh)");

  const [members, setMembers] = useState<PedigreeMember[]>([
    {
      id: 1,
      generation: "Gen 2",
      name: "Smt. Savitri Devi",
      nameHi: "श्रीमती सावित्री देवी",
      age: "68",
      relation: "Widow (Spouse)",
      relationHi: "पत्नी (विधवा)",
      status: "Living",
      branchNote: "Class I Legal Heir",
    },
    {
      id: 2,
      generation: "Gen 2",
      name: "Rajesh Kumar Singh",
      nameHi: "राजेश कुमार सिंह",
      age: "44",
      relation: "Son (Applicant)",
      relationHi: "पुत्र (आवेदक)",
      status: "Living",
      branchNote: "Class I Legal Heir",
    },
    {
      id: 3,
      generation: "Gen 2",
      name: "Smt. Sunita Kumari",
      nameHi: "श्रीमती सुनीता कुमारी",
      age: "40",
      relation: "Married Daughter",
      relationHi: "विवाहिता पुत्री",
      status: "Married & Living",
      branchNote: "Equal Share (HSA Sec. 6)",
    },
    {
      id: 4,
      generation: "Gen 2",
      name: "Late Mukesh Kumar Singh",
      nameHi: "स्व. मुकेश कुमार सिंह",
      age: "Deceased",
      relation: "Predeceased Son",
      relationHi: "पूर्व-मृत पुत्र",
      status: "Predeceased",
      branchNote: "Represented by Branch below",
    },
    {
      id: 5,
      generation: "Gen 3",
      name: "Smt. Rekha Devi & Aman Singh (Age 16)",
      nameHi: "श्रीमती रेखा देवी (पत्नी) एवं अमन सिंह (पुत्र, 16 वर्ष)",
      age: "36 / 16",
      relation: "Widow & Minor Grandson of Predeceased Son",
      relationHi: "पूर्व-मृत पुत्र की विधवा एवं नाबालिग पौत्र",
      status: "Minor",
      branchNote: "Per Stirpes Branch Share",
    },
  ]);

  const addMemberRow = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        generation: "Gen 2",
        name: "Full Name of Heir",
        nameHi: "उत्तराधिकारी का पूरा नाम",
        age: "35",
        relation: "Son / Daughter",
        relationHi: "पुत्र / पुत्री",
        status: "Living",
        branchNote: "Eligible Legal Heir",
      },
    ]);
  };

  const updateMemberRow = (id: number, field: keyof PedigreeMember, value: string) => {
    setMembers((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const removeMemberRow = (id: number) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((row) => row.id !== id));
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

  const hindiListText = members
    .map(
      (m, idx) =>
        `${idx + 1}. [${m.generation}] नाम: ${m.nameHi} | आयु: ${m.age} | संबंध: ${m.relationHi} | स्थिति: ${m.status} (${m.branchNote})`
    )
    .join("\n");

  const englishListText = members
    .map(
      (m, idx) =>
        `${idx + 1}. [${m.generation}] ${m.name} | Age: ${m.age} | Relation: ${m.relation} | Status: ${m.status} | Basis: ${m.branchNote}`
    )
    .join("\n");

  const generatedHindiDraft = `वंशावली एवं उत्तराधिकार शपथ-पत्र (बिहार दाखिल-खारिज एवं भूमि सर्वेक्षण हेतु)
[भारतीय स्टाम्प अधिनियम, अनुसूची 1-A, अनुच्छेद 4 (बिहार संशोधन) के अंतर्गत ₹100/- के नॉन-ज्यूडिशियल स्टाम्प पेपर / ई-स्टाम्प पर]

समक्ष: श्रीमान कार्यपालक दण्डाधिकारी (Executive Magistrate) / नोटरी पब्लिक, ${anchal}, जिला: ${district}, बिहार
एवं अंचलाधिकारी महोदय, अंचल: ${anchal}, जिला: ${district} (बिहार भूमि दाखिल-खारिज अधिनियम, 2011 की धारा 3, 4 एवं 6 के तहत)

मैं ${applicantName}, पुत्र/पुत्री/पत्नी [पिता/पति का नाम], आयु लगभग [आयु] वर्ष, निवासी ग्राम/मोहल्ला: ${mauza}, पंचायत/वार्ड: ${panchayatOrWard}, थाना सं.: ${thanaNo}, अंचल: ${anchal}, जिला: ${district}, बिहार (पिन: [80XXXX]), आधार सं.: [XXXX-XXXX-XXXX], सत्यनिष्ठापूर्वक शपथपूर्वक बयान करता/करती हूँ कि:

1. खतियानी / जमाबंदी रैयत का विवरण एवं मृत्यु तिथि:
यह कि मेरे पूर्वज ${deceasedName}, पुत्र/पत्नी ${ancestorFather}, ग्राम/मौजा: ${mauza}, थाना नं.: ${thanaNo}, अंचल: ${anchal}, जिला: ${district} के स्थायी निवासी एवं पंजी-2 (Jamabandi Panji-2) के दर्ज रैयत थे। उनकी भूमि का विवरण खाता सं.: ${khataNo}, खेसरा सं.: ${khesraNo}, जमाबंदी पंजी-2: ${jamabandiNo} है। उक्त रैयत की मृत्यु दिनांक ${deathDate} को [मृत्यु स्थान] में बिना किसी वसीयत के हो गई (मृत्यु प्रमाण-पत्र संख्या: [पंजीकरण संख्या])।

2. वंशावली वृक्ष एवं जीवित कानूनी वारिस (${PERSONAL_LAWS[personalLaw].labelHi}):
यह कि मृत रैयत ${deceasedName} की मृत्यु के उपरांत उनके निम्नलिखित वैध उत्तराधिकारी / वंशज (विवाहित पुत्रियों एवं पूर्व-मृत संतान के आश्रितों सहित) जीवित एवं हकदार हैं:
${hindiListText}

3. अन्य कोई वारिस न होने की घोषणा (Negative Declaration):
यह कि उपरोक्त वंशावली सूची में वर्णित व्यक्तियों के अतिरिक्त मृतक का कोई अन्य पुत्र, विवाहिता/अविवाहिता पुत्री, दत्तक संतान, या जीवित माता/पता नहीं है। इस भूमि पर किसी न्यायालय में कोई स्वत्व वाद (Title Suit) लंबित नहीं है और सभी वारिसान शांतिपूर्ण कब्जे में हैं।

4. उद्देश्य (दाखिल-खारिज / प्रपत्र-3(1) सर्वेक्षण / ग्राम कचहरी):
यह शपथ-पत्र बिहार भूमि पोर्टल (biharbhumi.bihar.gov.in) पर ऑनलाइन दाखिल-खारिज (प्रपत्र-1A), ग्राम पंचायत सचिव एवं सरपंच के माध्यम से वंशावली निर्गत करने, तथा बिहार विशेष भूमि सर्वेक्षण (प्रपत्र-3(1)) हेतु प्रस्तुत किया जा रहा है।

5. सत्यापन (Verification):
मैं सत्यापित करता/करती हूँ कि पैरा 1 से 4 तक के सभी तथ्य मेरे व्यक्तिगत ज्ञान से पूर्णतः सत्य हैं। कोई भी तथ्य छिपाने या असत्य पाए जाने पर भारतीय न्याय संहिता (BNS), 2023 की धारा 229 व 236 के तहत कानूनी दण्ड का भागी बनूँगा/बनूँगी।

स्थान: ${anchal}, ${district}, बिहार
दिनांक: [DD-MM-YYYY]

शपथकर्ता का हस्ताक्षर (Deponent): _______________________
नाम: ${applicantName}

-------------------------------------------------------------------
ग्राम पंचायत सचिव / सरपंच / मुखिया / वार्ड पार्षद सत्यापन टिप्पणी:
प्रमाणित किया जाता है कि उपरोक्त वंशावली की स्थानीय जांच ग्राम अभिलेख व ग्रामीण गवाहों से कर ली गई है तथा यह सत्य पाई गई।
हस्ताक्षर व मुहर (पंचायत सचिव / सरपंच / मुखिया / अंचल निरीक्षक): _______________________`;

  const generatedEnglishDraft = `AFFIDAVIT OF VANSHAVALI (PEDIGREE) & LEGAL HEIRS FOR BIHAR DAKHIL KHARIJ
[To be printed on Rs. 100/- Bihar Non-Judicial Stamp Paper / e-Stamp under Schedule 1-A, Article 4]

BEFORE THE EXECUTIVE MAGISTRATE / NOTARY PUBLIC, ${anchal.toUpperCase()}, DISTRICT ${district.toUpperCase()}, BIHAR
AND THE CIRCLE OFFICER (ANCHAL ADHIKARI), ${anchal.toUpperCase()} ANCHAL, ${district.toUpperCase()}
(Under Sections 3, 4 & 6 of the Bihar Land Mutation Act, 2011)

I, ${applicantName}, aged about [Age] years, son/daughter/spouse of [Parent/Spouse Name], resident of Mauza: ${mauza}, Panchayat/Ward: ${panchayatOrWard}, Thana No.: ${thanaNo}, Anchal: ${anchal}, District: ${district}, Bihar (PIN: [80XXXX]), Aadhaar No.: [XXXX-XXXX-XXXX], do hereby solemnly affirm and state on oath as follows:

1. RECORDED RAIYAT & JAMABANDI DETAILS:
That ${deceasedName}, son/daughter/spouse of ${ancestorFather}, was the recorded landholder (Raiyat) in Register-II (Jamabandi Panji-2: ${jamabandiNo}) for land situated at Mauza: ${mauza}, Thana No.: ${thanaNo}, Khata No.: ${khataNo}, Khesra No.: ${khesraNo}, Anchal: ${anchal}, District: ${district}, Bihar. The said Raiyat passed away intestate on ${deathDate} at [Place of Death], evidenced by Death Certificate No. [Cert No.].

2. COMPLETE MULTI-GENERATIONAL VANSHAVALI (${PERSONAL_LAWS[personalLaw].statute}):
That upon the death of the said Raiyat, ONLY the following legal heirs (including married daughters and branches of any predeceased child) survived and hold lawful succession rights:
${englishListText}

3. NEGATIVE DECLARATION & PEACEFUL POSSESSION:
I solemnly state that apart from the heirs listed in Paragraph 2, the deceased left no other spouse, son, married or unmarried daughter, or adopted child. All listed heirs are in peaceful possession, and no civil title suit is pending against this land.

4. PURPOSE OF FILING:
This sworn Vanshavali affidavit is submitted for Varisana Dakhil Kharij (Form-IA) on biharbhumi.bihar.gov.in, Gram Katchahry Vanshavali verification before the Panchayat Secretary and Sarpanch, and Bihar Special Land Survey Form Prapatra-3(1).

5. VERIFICATION & LEGAL UNDERTAKING:
I verify that Paragraphs 1 to 4 are true to my personal knowledge. Concealing any legal heir invites cancellation of mutation under the Bihar Land Mutation Act, 2011 and prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023.

Place: ${anchal}, ${district}, Bihar
Date: [DD-MM-YYYY]

DEPONENT SIGNATURE: _______________________
Name: ${applicantName}`;

  const activeHindiDraft = customHindiDraft ?? generatedHindiDraft;
  const activeEnglishDraft = customEnglishDraft ?? generatedEnglishDraft;

  const mukhiyaEndorsementText = `GRAM PANCHAYAT / MUKHIYA / PANCHAYAT SACHIV / SARPANCH ENDORSEMENT & EXECUTIVE MAGISTRATE COUNTERSIGNATURE BLOCK

PART A: LOCAL VERIFICATION BY MUKHIYA / WARD MEMBER & PANCHAYAT SECRETARY (पंचायत सचिव जाँच प्रतिवेदन)
Verified on local inquiry and Gram Panchayat Register (Fee Receipt No: [____], Rs. 10/- paid on [DD-MM-YYYY]) for Mauza ${mauza}, Thana No. ${thanaNo}, Panchayat ${panchayatOrWard}, Anchal ${anchal}, District ${district}.
Two Local Village Witnesses (ग्रामीण गवाह):
1. Name: _______________________ | Aadhaar: [XXXX-XXXX-XXXX] | Signature: _______________
2. Name: _______________________ | Aadhaar: [XXXX-XXXX-XXXX] | Signature: _______________

Mukhiya / Ward Councillor Signature & Seal: _______________________ (Local Identification)
Panchayat Secretary (पंचायत सचिव) Verification Signature & Seal: _______________________ (7-Day Inquiry Report)
Sarpanch (सरपंच, ग्राम कचहरी) Official Issuance Signature & Seal: _______________________

PART B: EXECUTIVE MAGISTRATE / NOTARY PUBLIC ATTESTATION (शपथ प्रमाणन)
Solemnly affirmed and signed before me by ${applicantName}, identified by Aadhaar No. [XXXX-XXXX-XXXX] on this [Day] day of [Month], [Year] at ${anchal}, ${district}, Bihar.
Executive Magistrate / Notary Public Seal & Reg. No.: _______________________`;

  const pedigreeTableText = `BIHAR VANSHAVALI PEDIGREE CHART (वंश-वृक्ष तालिका)
Ancestor / Recorded Raiyat: ${deceasedName} (S/o / W/o ${ancestorFather}) | Death Date: ${deathDate}
Mauza: ${mauza} | Thana No.: ${thanaNo} | Khata: ${khataNo} | Khesra: ${khesraNo} | Jamabandi: ${jamabandiNo}

| No. | Generation | Name (English & Hindi) | Age | Relation | Status | Share Basis |
${members
  .map(
    (m, idx) =>
      `| ${idx + 1} | ${m.generation} | ${m.name} (${m.nameHi}) | ${m.age} | ${m.relation} | ${m.status} | ${m.branchNote} |`
  )
  .join("\n")}`;

  const biharChecklistText = `BIHAR VANSHAVALI & DAKHIL KHARIJ DOCUMENT CHECKLIST (10 ITEMS)
1. Death Certificate of the deceased Jamabandi Raiyat (from Local Registrar / Gram Panchayat / Nagar Nigam).
2. Editable Vanshavali Affidavit printed on ₹100 Non-Judicial Stamp Paper / e-Stamp, signed before Executive Magistrate or Notary.
3. Gram Katchahry Vanshavali Application + ₹10 Cash Fee Receipt submitted to Panchayat Secretary (7-day verification).
4. Panchayat Secretary Inquiry Report + Sarpanch Signature & Seal (or Urban CO / Ward report for Municipal areas).
5. Bihar Special Land Survey Prapatra-2 & Prapatra-3(1) self-declaration forms (if survey is active in your Mauza).
6. Jamabandi Panji-2 (Register-II) copy showing Volume, Page, Khata No., Khesra No., and Rakba (Area).
7. Legacy Khatiyan (CS / RS) copy if Jamabandi is still undivided in an ancestor's name.
8. Latest Land Rent Receipt (Malguzari Rasid / Lagan) paid online via BiharBhumi.
9. Aadhaar KYC copies of the applicant and all living legal heirs (including married daughters).
10. Signed NOC / Consent Affidavit from sisters & co-heirs (or Registered Haq Tyag Release Deed if giving up share).`;

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  const currentPurpose = PURPOSE_CONFIG[purpose];
  const currentLaw = PERSONAL_LAWS[personalLaw];

  const gen2Members = members.filter((m) => m.generation === "Gen 2");
  const gen3Members = members.filter((m) => m.generation === "Gen 3");

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Partition Deed Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>BIHAR LAND MUTATION ACT, 2011 S. 6 • PANCHAYAT RAJ ACT, 2006 • HSA 1956</span>
          </div>

          {/* Strict Single H1 Tag (44 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Bihar Vanshavali &amp; Pedigree Affidavit Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download an editable Hindi and English Vanshavali affidavit format on ₹100 stamp paper
            for Dakhil Kharij on BiharBhumi. Build your family pedigree chart, add Mukhiya and
            Sarpanch endorsement lines, and pass Circle Officer checks fast.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#hindi-vanshavali-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Hindi Vanshavali Draft</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Bihar Will</span>
            </button>
            <Link
              href="/services/property-mutation-dakhil-kharij-service"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Mutation Team</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 6</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BIHAR MUTATION ACT 2011
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹100 Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STAMP ACT SCH. 1-A ART. 4
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">35 / 75 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CIRCLE OFFICER TIMELINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Hindi + EN</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PRAPATRA 3(1) &amp; AFFIDAVIT
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
                <span>Bihar Revenue Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built for Bihar Land Mutation Act 2011 s. 6, Gram Panchayat Raj Act 2006, Stamp
                Act Sch. 1-A Art. 4, HSA 1956 s. 6, and BSA 2023 s. 61.
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>BiharBhumi Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Copy the Hindi and English drafts with the Mukhiya and Sarpanch endorsement box
                before you visit your Anchal or Notary.
              </p>
              <a
                href="#hindi-vanshavali-template"
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
                  src="/images/bihar-vanshavali-pedigree-affidavit-format-og.jpg"
                  alt="Bihar Vanshavali Affidavit Format on Stamp Paper and Pedigree Guide"
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
                    Bihar Vanshavali Sworn Draft: ₹100 Stamp Paper, Pedigree Tree &amp; Panchayat
                    Seal Guide
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF (NO h3/h4 inside to preserve strict H1 -> H2 -> H3 order) */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>KEY FACTS: BIHAR VANSHAVALI AFFIDAVIT</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Stamp Paper Value:</strong> Print your sworn Vanshavali on{" "}
                    <strong>₹100 non-judicial stamp paper</strong> (Schedule 1-A, Article 4) for
                    Dakhil Kharij across Bihar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Why Low-Res Forms Fail:</strong> Plain Mukhiya slips without a Notary or
                    Magistrate oath and Panchayat Secretary check often face Circle Officer holds.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>7-Day Panchayat Rule:</strong> Submit your affidavit with a{" "}
                    <strong>₹10 cash receipt</strong> to the Panchayat Secretary. The report reaches
                    the Sarpanch within 7 days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Daughters Must Be Listed:</strong> Married and unmarried daughters hold
                    equal shares by birth under Section 6 of the Hindu Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>35-Day Disposal &amp; Appeal:</strong> Undisputed mutation takes 35
                    working days. If rejected in Form 4, appeal to the DCLR within 30 days.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 <= 70 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Bihar Vanshavali Rules &amp; Dakhil Kharij Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a landowner (<em>Jamabandi Raiyat</em>) dies in Bihar without a Will, the
                  heirs must apply for land name change (<em>Varisana Dakhil Kharij</em>) on{" "}
                  <strong>biharbhumi.bihar.gov.in</strong>. The main paper needed for this file is
                  a <strong>Vanshavali</strong> (family tree affidavit).
                </p>
                <p>
                  Most forms shared online are blurry scanned images with missing legal terms. Under{" "}
                  <strong>Section 6 of the Bihar Land Mutation Act, 2011</strong>, the Circle
                  Officer (<em>Anchal Adhikari</em>) sends the Halka Karamchari to check your family
                  tree against village records.
                </p>
                <p>
                  Under the <strong>Bihar Gram Panchayat Raj Act, 2006</strong> and state
                  notifications, a Mukhiya or Sarpanch cannot issue a valid legal Vanshavali on a
                  bare slip alone. First, you swear the family tree on a{" "}
                  <strong>₹100 stamp paper</strong> before a Notary or Executive Magistrate.
                </p>
                <p>
                  Next, you submit the application and a ₹10 receipt to the{" "}
                  <strong>Panchayat Secretary</strong>, who completes the inquiry in 7 days for the{" "}
                  <strong>Sarpanch</strong> seal. In city areas like Patna, the Circle Officer or
                  Ward office checks the Magistrate affidavit directly.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE BIHAR VANSHAVALI & PEDIGREE BUILDER */}
            <section
              id="interactive-vanshavali-builder"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>FREE EDITABLE BUILDER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Bihar Vanshavali &amp; Pedigree Builder
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your district, Anchal, Khata, Khesra, and family members below. Every change
                updates your Hindi draft, English draft, and family pedigree tree right away.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Row 1: Purpose, Personal Law & Area Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Purpose of Affidavit</span>
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
                      <span>Succession Law</span>
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Area Jurisdiction</span>
                    </label>
                    <select
                      value={areaType}
                      onChange={(e) => setAreaType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="rural_panchayat">Rural (Gram Panchayat &amp; Anchal)</option>
                      <option value="urban_municipal">Urban (Nagar Nigam / Ward)</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Bihar District, Anchal, Panchayat/Ward, Mauza */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      District (जिला)
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {BIHAR_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Anchal / Block (अंचल)
                    </label>
                    <input
                      type="text"
                      value={anchal}
                      onChange={(e) => setAnchal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Panchayat / Ward
                    </label>
                    <input
                      type="text"
                      value={panchayatOrWard}
                      onChange={(e) => setPanchayatOrWard(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Mauza / Village (मौजा)
                    </label>
                    <input
                      type="text"
                      value={mauza}
                      onChange={(e) => setMauza(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 3: Land Identifiers (Thana, Khata, Khesra, Jamabandi) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Thana No. (थाना सं.)
                    </label>
                    <input
                      type="text"
                      value={thanaNo}
                      onChange={(e) => setThanaNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Khata No. (खाता सं.)
                    </label>
                    <input
                      type="text"
                      value={khataNo}
                      onChange={(e) => setKhataNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Khesra No. (खेसरा सं.)
                    </label>
                    <input
                      type="text"
                      value={khesraNo}
                      onChange={(e) => setKhesraNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Jamabandi Panji-2
                    </label>
                    <input
                      type="text"
                      value={jamabandiNo}
                      onChange={(e) => setJamabandiNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 4: Deceased Raiyat & Applicant Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Deceased Raiyat Name
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
                      Ancestor&apos;s Father Name
                    </label>
                    <input
                      type="text"
                      value={ancestorFather}
                      onChange={(e) => setAncestorFather(e.target.value)}
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
                      Deponent / Applicant
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Multi-Generational Pedigree Member Rows */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Vanshavali Family Members ({members.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={addMemberRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Heir Branch</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {members.map((row, idx) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center"
                      >
                        <div className="sm:col-span-2">
                          <select
                            value={row.generation}
                            onChange={(e) => updateMemberRow(row.id, "generation", e.target.value)}
                            aria-label={`Member ${idx + 1} Generation`}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-[#C65378]"
                          >
                            <option value="Gen 2">Gen 2</option>
                            <option value="Gen 3">Gen 3</option>
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) => updateMemberRow(row.id, "name", e.target.value)}
                            aria-label={`Member ${idx + 1} English Name`}
                            placeholder="English Name"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={row.nameHi}
                            onChange={(e) => updateMemberRow(row.id, "nameHi", e.target.value)}
                            aria-label={`Member ${idx + 1} Hindi Name`}
                            placeholder="हिन्दी नाम"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900 font-[family-name:var(--font-devanagari)]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={row.relation}
                            onChange={(e) => updateMemberRow(row.id, "relation", e.target.value)}
                            aria-label={`Member ${idx + 1} Relation`}
                            placeholder="Relation"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <select
                            value={row.status}
                            onChange={(e) => updateMemberRow(row.id, "status", e.target.value)}
                            aria-label={`Member ${idx + 1} Status`}
                            className="w-full px-1.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          >
                            <option value="Living">Living</option>
                            <option value="Married & Living">Married</option>
                            <option value="Predeceased">Dead</option>
                            <option value="Minor">Minor</option>
                          </select>
                        </div>
                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeMemberRow(row.id)}
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
                        BIHAR REVENUE FILING SUMMARY ({district.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {currentPurpose.timeline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Stamp Paper Needed
                      </div>
                      <div className="text-base sm:text-lg font-black text-white mt-1">
                        {currentPurpose.stampValue}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Bihar Stamp Sch. 1-A Art. 4
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Official Govt Fee
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                        {currentPurpose.officeFee}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {areaType === "rural_panchayat"
                          ? "₹10 Panchayat Receipt + Free Portal"
                          : "Free Online on BiharBhumi"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Signing Officer
                      </div>
                      <div className="text-sm font-black text-emerald-400 mt-1">
                        {currentPurpose.authorityLabel}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {currentLaw.statute}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white">Action Step:</div>
                    <p className="leading-relaxed text-[11px]">
                      {currentPurpose.summary} {currentLaw.ruleSummary}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: MANDATORY ASSET - EDITABLE HINDI VANSHAVALI TEMPLATE */}
            <section
              id="hindi-vanshavali-template"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Languages className="w-4 h-4" />
                <span>EDITABLE HINDI &amp; ENGLISH DRAFTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Editable Hindi Vanshavali Affidavit Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Unlike blurry PDF scans online, you can edit and copy this clean Hindi and English
                Vanshavali affidavit directly. Click <strong>Edit Text</strong> inside either box
                if you want to tweak names or Khasra numbers before printing.
              </p>

              {/* Language Switcher + Copy Both */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1 shadow-2xs">
                  {(
                    [
                      { id: "both", label: "Show Both Drafts" },
                      { id: "hi", label: "Hindi (हिन्दी) Only" },
                      { id: "en", label: "English Only" },
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
                      `${activeHindiDraft}\n\n====================================\n\n${activeEnglishDraft}`,
                      setCopiedBoth
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  {copiedBoth ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Both Drafts!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Both (Hindi + English)</span>
                    </>
                  )}
                </button>
              </div>

              <div
                className={`grid grid-cols-1 ${
                  templateLang === "both" ? "xl:grid-cols-2" : ""
                } gap-5`}
              >
                {/* Hindi Vanshavali Draft Box */}
                {(templateLang === "both" || templateLang === "hi") && (
                  <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="bg-[#172228] text-white p-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          HINDI वंशावली शपथ-पत्र (STAMP READY)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEditingHindi && customHindiDraft === null) {
                              setCustomHindiDraft(generatedHindiDraft);
                            }
                            setIsEditingHindi((v) => !v);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isEditingHindi ? "Done" : "Edit Text"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyText(activeHindiDraft, setCopiedHindi)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          {copiedHindi ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Hindi</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    {isEditingHindi ? (
                      <textarea
                        value={activeHindiDraft}
                        onChange={(e) => setCustomHindiDraft(e.target.value)}
                        rows={20}
                        aria-label="Editable Hindi Vanshavali Affidavit"
                        className="w-full p-4 sm:p-5 bg-white text-xs sm:text-[13px] leading-relaxed text-slate-900 font-[family-name:var(--font-devanagari)] focus:outline-hidden"
                      />
                    ) : (
                      <div className="p-4 sm:p-5 max-h-[560px] overflow-y-auto bg-slate-50/60 text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all font-[family-name:var(--font-devanagari)]">
                        {activeHindiDraft}
                      </div>
                    )}
                  </div>
                )}

                {/* English Vanshavali Draft Box */}
                {(templateLang === "both" || templateLang === "en") && (
                  <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-rose-300" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          ENGLISH AFFIDAVIT (ANCHAL / COURT)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEditingEnglish && customEnglishDraft === null) {
                              setCustomEnglishDraft(generatedEnglishDraft);
                            }
                            setIsEditingEnglish((v) => !v);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isEditingEnglish ? "Done" : "Edit Text"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyText(activeEnglishDraft, setCopiedEnglish)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5F7E75] hover:bg-[#4e6961] text-white text-xs font-bold transition-colors cursor-pointer"
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
                    </div>
                    {isEditingEnglish ? (
                      <textarea
                        value={activeEnglishDraft}
                        onChange={(e) => setCustomEnglishDraft(e.target.value)}
                        rows={20}
                        aria-label="Editable English Vanshavali Affidavit"
                        className="w-full p-4 sm:p-5 bg-white font-mono text-xs leading-relaxed text-slate-900 focus:outline-hidden"
                      />
                    ) : (
                      <div className="p-4 sm:p-5 max-h-[560px] overflow-y-auto bg-slate-50/60 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                        {activeEnglishDraft}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 4: MANDATORY COMPONENT - MULTI-GENERATIONAL PEDIGREE TREE CHART */}
            <section id="pedigree-tree-chart" className="scroll-target scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>MULTI-GENERATIONAL PEDIGREE TREE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Multi-Generational Pedigree Tree Chart
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The Halka Karamchari checks every generation starting from the deceased Jamabandi
                Raiyat down to grandchildren. Review your live family hierarchy below and copy the
                matching table for your stamp paper.
              </p>

              {/* Visual Multi-Generational Pedigree Tree Diagram (HTML/React) */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                    LIVE FAMILY TREE CHART (वंश-वृक्ष आरेख)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Mauza: {mauza} | Khata: {khataNo} | Khesra: {khesraNo}
                  </span>
                </div>

                {/* Tier 1: Ancestor / Deceased Recorded Raiyat */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md rounded-2xl bg-[#172228] text-white p-4 text-center shadow-sm border border-[#172228]">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200 mb-1.5">
                      Generation 1: Deceased Jamabandi Raiyat
                    </div>
                    <div className="font-extrabold text-sm sm:text-base font-[family-name:var(--font-devanagari)]">
                      {deceasedName}
                    </div>
                    <div className="text-[11px] text-white/75 mt-1">
                      Parent: {ancestorFather} | Died: {deathDate}
                    </div>
                    <div className="text-[10px] text-emerald-300 font-semibold mt-1">
                      Register-II: {jamabandiNo}
                    </div>
                  </div>
                  <div className="w-0.5 h-6 bg-slate-300" />
                  <div className="w-3/4 h-0.5 bg-slate-300" />
                </div>

                {/* Tier 2: Spouse, Sons, Married Daughters & Predeceased Child */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {gen2Members.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-2xl p-3.5 border space-y-1.5 text-xs ${
                        m.status === "Predeceased"
                          ? "bg-amber-50/70 border-amber-200"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-black uppercase text-[#C65378]">
                          {m.generation}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            m.status === "Predeceased"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm leading-snug">
                        {m.name}
                      </div>
                      <div className="text-[11px] text-slate-600 font-[family-name:var(--font-devanagari)]">
                        {m.nameHi}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700">
                        {m.relation} (Age: {m.age})
                      </div>
                      <div className="text-[10px] text-slate-500">{m.branchNote}</div>
                    </div>
                  ))}
                </div>

                {/* Tier 3: Grandchildren / Predeceased Child Branch */}
                {gen3Members.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <span className="w-4 h-0.5 bg-amber-400" />
                      <span>Generation 3: Per Stirpes Branch of Predeceased Child</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {gen3Members.map((m) => (
                        <div
                          key={m.id}
                          className="rounded-2xl p-3.5 bg-rose-50/50 border border-rose-200/80 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[#C65378]">
                              {m.generation} Branch Heir
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white border border-rose-200 text-[10px] font-bold text-slate-800">
                              {m.status}
                            </span>
                          </div>
                          <div className="font-extrabold text-slate-900 text-sm">{m.name}</div>
                          <div className="text-[11px] text-slate-600 font-[family-name:var(--font-devanagari)]">
                            {m.nameHi}
                          </div>
                          <div className="text-[11px] text-slate-700">
                            {m.relation} | {m.branchNote}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Copyable Pedigree Table */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                      COPYABLE VANSHAVALI TABLE (वंश-वृक्ष तालिका)
                    </div>
                    <div className="text-xs text-slate-600">
                      Attach this structured table on Page 2 of your ₹100 stamp paper.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(pedigreeTableText, setCopiedPedigree)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedPedigree ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Table Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pedigree Table</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-900 font-extrabold">
                        <th className="py-3 px-4">Gen</th>
                        <th className="py-3 px-4">Heir Name (EN / HI)</th>
                        <th className="py-3 px-4">Age</th>
                        <th className="py-3 px-4">Relation</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {members.map((m) => (
                        <tr key={m.id}>
                          <td className="py-3 px-4 font-bold text-[#C65378]">{m.generation}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-[11px] text-slate-500 font-[family-name:var(--font-devanagari)]">
                              {m.nameHi}
                            </div>
                          </td>
                          <td className="py-3 px-4">{m.age}</td>
                          <td className="py-3 px-4">{m.relation}</td>
                          <td className="py-3 px-4 font-semibold">{m.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 5: MANDATORY COMPONENT - MUKHIYA ENDORSEMENT & NOTARY STAMP BOX */}
            <section id="mukhiya-endorsement-box" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>STAMP PAPER &amp; PANCHAYAT SEAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Mukhiya Endorsement &amp; Notary Stamp Guide
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Knowing who must sign your Vanshavali prevents Circle Officer rejection. Under{" "}
                <strong>Bihar Stamp Schedule 1-A, Article 4</strong>, your affidavit belongs on ₹100
                stamp paper. Pair it with the Panchayat Secretary report and Sarpanch seal below.
              </p>

              {/* Notary & Stamp Paper 4-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Bihar Stamp Act Art. 4
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                      ₹100 Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Non-Judicial Stamp Paper / e-Stamp
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All sworn Vanshavali affidavits in Bihar require ₹100 non-judicial stamp paper
                    or e-stamp. Do not use lower-value ₹10 or ₹20 sheets for mutation files.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#5F7E75]">
                      Gram Katchahry Fee
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                      ₹10 Cash Fee
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Panchayat Secretary Receipt &amp; 7-Day Check
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pay the ₹10 government fee to the Panchayat Secretary and take a printed receipt.
                    A second copy later costs ₹100. Verification completes in 7 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Oath Authority
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      Magistrate / Notary
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Executive Magistrate Countersignature
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For disputed Jamabandi Panji-2 transfers or bank claims, sign the ₹100 affidavit
                    before an Executive Magistrate (SDM court) rather than a Notary alone.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Bihar Land Survey
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      Prapatra-3(1)
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Self-Attested Survey Form Rule
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under DLRS Bihar Special Land Survey rules, heirs can file self-signed
                    Prapatra-3(1) with Prapatra-2 at the Survey Camp, backed by this affidavit.
                  </p>
                </div>
              </div>

              {/* Mandatory Mukhiya / Sarpanch / Panchayat Sachiv Endorsement Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>MUKHIYA, PANCHAYAT SACHIV &amp; MAGISTRATE ENDORSEMENT BOX</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(mukhiyaEndorsementText, setCopiedMukhiya)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedMukhiya ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Endorsement Box Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Endorsement Block</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {mukhiyaEndorsementText}
                </div>
              </div>
            </section>

            {/* SECTION 6: COMPARISON TABLE */}
            <section id="comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>VALIDITY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Mukhiya Slip vs Panchayat &amp; Magistrate Draft
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Revenue officers reject plain local letters when heirs fight over land. Compare
                each Bihar Vanshavali format below:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Key Rule</th>
                      <th className="py-3.5 px-4">Bare Mukhiya Slip</th>
                      <th className="py-3.5 px-4 text-[#C65378]">
                        ₹100 Oath + Panchayat Sachiv &amp; Sarpanch
                      </th>
                      <th className="py-3.5 px-4">Survey Prapatra-3(1)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Standing</td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">
                        Weak (No statutory force alone)
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Strong (Accepted by CO &amp; DCLR)
                      </td>
                      <td className="py-3 px-4">Valid for Special Land Survey</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Stamp Value</td>
                      <td className="py-3 px-4">Plain letterhead (None)</td>
                      <td className="py-3 px-4">₹100 Non-Judicial Stamp Paper</td>
                      <td className="py-3 px-4">Plain Form (Attach ₹100 Oath if disputed)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Official Receipt Fee</td>
                      <td className="py-3 px-4">No official receipt</td>
                      <td className="py-3 px-4">₹10 Panchayat Secretary receipt</td>
                      <td className="py-3 px-4">₹0 at Survey Camp</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Dakhil Kharij Use</td>
                      <td className="py-3 px-4 text-rose-700">Often rejected in Form-IA</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Full compliance under Section 6
                      </td>
                      <td className="py-3 px-4">Used for Survey Khatiyan entry</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Court Evidentiary Value</td>
                      <td className="py-3 px-4">Easily challenged by sisters/heirs</td>
                      <td className="py-3 px-4">BNS s. 229 &amp; 236 oath protection</td>
                      <td className="py-3 px-4">Verified during Survey Amin field visit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP BIHARBHUMI FILING SOP */}
            <section id="dakhil-kharij-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>STEP-BY-STEP FILING GUIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. BiharBhumi Dakhil Kharij Filing SOP
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Print Draft on ₹100 Bihar Stamp Paper",
                    desc: "Copy our Hindi affidavit and pedigree table above. Print them on ₹100 non-judicial stamp paper or e-stamp.",
                  },
                  {
                    step: 2,
                    title: "Sign Before Executive Magistrate or Notary",
                    desc: "Carry your Aadhaar, parent's Death Certificate, and two village witnesses. Get the affidavit sworn and numbered in the Notary or Magistrate register.",
                  },
                  {
                    step: 3,
                    title: "File with Panchayat Secretary (₹10 Fee)",
                    desc: "Submit your stamped affidavit, Mukhiya/Ward identification, and ₹10 cash fee to the Panchayat Secretary. Collect the receipt and allow 7 days for Sarpanch issuance.",
                  },
                  {
                    step: 4,
                    title: "Upload Form-IA on biharbhumi.bihar.gov.in",
                    desc: "Log in to the BiharBhumi portal, choose Inheritance Mutation, enter Jamabandi Panji-2 details, and upload a single clear PDF of your Vanshavali, Death Certificate, and rent receipt.",
                  },
                  {
                    step: 5,
                    title: "Halka Karamchari Check & Form-II Notice",
                    desc: "The Circle Officer sends the file to the Halka Karamchari for field inquiry and issues a public Form-II notice inviting objections from any missing heir.",
                  },
                  {
                    step: 6,
                    title: "Receive Shuddhipatra or File DCLR Appeal",
                    desc: "If uncontested, the Circle Officer issues Form-XIV Shuddhipatra within 35 working days (75 days if contested). If rejected in Form 4, appeal to the DCLR within 30 days.",
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

              {/* Copyable Checklist Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Bihar Dakhil Kharij Document Checklist (10 Papers)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Keep all 10 papers ready before visiting the Anchal or Panchayat office.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(biharChecklistText, setCopiedChecklist)}
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

            {/* SECTION 8: DAUGHTERS RIGHTS & LAND SURVEY PRAPATRA 3(1) */}
            <section id="daughters-land-survey" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>HINDU SUCCESSION ACT &amp; SURVEY RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Daughters&apos; Rights &amp; Land Survey Prapatra 3(1)
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The top reason Bihar Vanshavali files face DCLR cancellation is leaving out
                  married sisters and daughters. Under <strong>Section 6 of the Hindu Succession
                  Act, 1956</strong> and the Supreme Court ruling in{" "}
                  <em>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</em>, daughters hold equal
                  birth rights in family land.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>List Every Sister &amp; Daughter:</strong> Even if a daughter is married
                    into another district, write her full name in the Vanshavali table.
                  </li>
                  <li>
                    <strong>Use Haq Tyag if She Gives Up Her Share:</strong> Never erase a sister
                    from the tree. First put her name on the Vanshavali, then attach her registered{" "}
                    <strong>Release Deed (Haq Tyag)</strong> or notarized NOC.
                  </li>
                  <li>
                    <strong>Bihar Special Land Survey (Prapatra-3(1)):</strong> Attach Prapatra-2
                    (self-declaration of Khesra plots) and Prapatra-3(1) (Vanshavali form) at the
                    Mauza camp so the Survey Amin creates clean individual Khatiyans.
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
                    <span>AVOID BIHAR LAND &amp; JAMABANDI DISPUTES</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    Need Help with Bihar Mutation or a Registered Will?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    In Bihar, court probate is not needed for Hindu Wills outside presidency towns.
                    Write a clear Will today or book our legal team for Circle Officer and DCLR
                    mutation support.
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
                    <span>Book Mutation Legal Help</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* SECTION 9: REAL BIHAR CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>GROUND REALITY IN BIHAR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Bihar Cases: Patna, Muzaffarpur &amp; Gaya
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: DANAPUR ANCHAL, PATNA</span>
                    <span className="text-slate-500 font-semibold">Magistrate Affidavit Fix</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Fixing a Rejected Mukhiya Slip with ₹100 Stamp Oath
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family submitted an unsigned plain-paper Mukhiya note for Dakhil Kharij in
                    Danapur. The Circle Officer put the case on hold. They replaced it with our ₹100
                    Hindi affidavit attested by an Executive Magistrate and got Shuddhipatra in 28
                    days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: KANTI ANCHAL, MUZAFFARPUR</span>
                    <span className="text-slate-500 font-semibold">Section 7 DCLR Appeal</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Overturning a Vanshavali That Omitted Married Sisters
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two brothers left three married sisters out of their Panchayat family tree. The
                    sisters filed a Section 7 appeal before the DCLR within 30 days. Citing Vineeta
                    Sharma (2020), the DCLR cancelled the earlier entry and ordered joint Jamabandi.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: BODHGAYA ANCHAL, GAYA</span>
                    <span className="text-slate-500 font-semibold">Parimarjan + Prapatra-3(1)</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Three-Generation Vanshavali for Old 1965 Khatiyan Land
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The great-grandfather&apos;s Jamabandi was missing online. The heirs first used
                    BiharBhumi Parimarjan to digitize Panji-2, then attached a 3-generation Hindi
                    Vanshavali showing every predeceased son&apos;s branch.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL BIHAR PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; LAWS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Official Bihar Portals &amp; Legal References
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Bihar Land Mutation Act, 2011 (ss. 3, 4, 6 &amp; 7):</strong> Sets the
                    35-day uncontested and 75-day contested Dakhil Kharij window plus 30-day DCLR
                    appeal rights.
                  </li>
                  <li>
                    <strong>Bihar Gram Panchayat Raj Act, 2006 &amp; State Circulars:</strong> Sets
                    the ₹10 Panchayat Secretary verification fee, 7-day check window, and Sarpanch
                    issuance path.
                  </li>
                  <li>
                    <strong>Hindu Succession Act, 1956 s. 6 &amp; s. 8:</strong> Ensures equal
                    coparcenary and Class I succession shares for sons and daughters.
                  </li>
                  <li>
                    <strong>Bharatiya Sakshya Adhiniyam, 2023 s. 61 &amp; BNS ss. 229, 236:</strong>{" "}
                    Covers online portal PDF validity and punishment for false family tree claims.
                  </li>
                </ul>

                {/* Official External Portals (Verified 200 OK HTTPS) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://biharbhumi.bihar.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>BiharBhumi Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://dlrs.bihar.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>DLRS Bihar Survey</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Supreme Court of India</span>
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
                    href="/tools/bihar-dakhil-kharij-jamabandi-inheritance-tracker"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                  >
                    Bihar Dakhil Kharij Tracker
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Property Mutation Service
                  </Link>
                  <Link
                    href="/locations/bihar"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Will Drafting in Bihar
                  </Link>
                  <Link
                    href="/locations/patna"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Patna Will Guide
                  </Link>
                  <Link
                    href="/templates/will-format-hindi"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Hindi Will Format
                  </Link>
                  <Link
                    href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All-India Pedigree Format
                  </Link>
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Templates Hub
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    Start Drafting Will
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
                11. Frequently Asked Questions: Bihar Vanshavali
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
                  A clear Will keeps your spouse and kids safe. In Bihar, a registered Will helps
                  your family transfer Jamabandi land without court fights or delays.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple ₹100 Stamp Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Print your Bihar Vanshavali draft on ₹100 stamp paper. Get it signed by a
                  Magistrate or Notary and checked by the Panchayat Secretary for ₹10.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your Khata, Khesra, and Jamabandi Panji-2 papers. We help you
                  file clean Dakhil Kharij forms and Section 7 DCLR appeals.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (NO MOBILE NUMBER)
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
                Advises families on Indian succession law, Bihar Jamabandi Dakhil Kharij files,
                DCLR revenue appeals, and Will drafting at AMA Legal Solutions.
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
                  <span>PREVENT JAMABANDI DISPUTES</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Bihar Land with a Clear Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  A valid Will helps your children transfer land records smoothly without waiting
                  for disputed family tree hearings.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Write Your Will in 15 Mins</span>
                </button>
                <Link
                  href="/start"
                  className="block text-[11px] font-bold text-rose-200 hover:underline"
                >
                  Open Online Will Starter
                </Link>
              </div>

              {/* CARD 3: DUAL CTA 2 - BIHAR MUTATION & LEGAL HELP (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>BIHAR MUTATION HELP DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Facing Circle Officer Hold or Jamabandi Dispute?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our revenue team helps families draft Vanshavali affidavits, fix Panji-2 gaps, and
                  file Section 7 DCLR appeals across Bihar.
                </p>
                <Link
                  href="/services/property-mutation-dakhil-kharij-service"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Get Mutation Legal Help</span>
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
                  Why Families Use Our Drafts
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Editable Hindi &amp; EN:</strong> Clean text ready for ₹100 stamp
                      paper.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Panchayat Seal Block:</strong> Includes Sachiv, Sarpanch &amp;
                      Mukhiya lines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Daughter Parity Safe:</strong> Complies with Section 6 HSA rules.
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
          href="#hindi-vanshavali-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Hindi Draft</span>
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
