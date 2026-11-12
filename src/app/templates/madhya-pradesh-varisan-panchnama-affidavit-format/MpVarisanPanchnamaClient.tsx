"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Users,
  BookOpen,
  Landmark,
  Clock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MapPin,
  Sparkles,
  FileCheck2,
  ListChecks,
  Plus,
  Trash2,
  ExternalLink,
  Gavel,
} from "lucide-react";

interface HeirRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  note: string;
}

const tocItems = [
  { id: "statutory-foundation", label: "1. MPLRC Section 109 & 110 Rules" },
  { id: "interactive-builder", label: "2. Interactive MP Draft Builder" },
  { id: "comparison-matrix", label: "3. Panchnama vs Affidavit vs Haq Tyag" },
  { id: "hindi-panchnama", label: "4. Hindi Varisan Panchnama Format" },
  { id: "witness-grid", label: "5. 5-Panch Witness Signature Grid" },
  { id: "hindi-affidavit", label: "6. Section 109 Affidavit (Rs 200)" },
  { id: "patwari-checklist", label: "7. Patwari Checklist & RCMS Steps" },
  { id: "dual-cta", label: "8. Will Plan & Mutation Legal Help" },
  { id: "married-daughters-and-will", label: "9. Married Daughters & Wills" },
  { id: "mp-case-studies", label: "10. MP Field Case Examples" },
  { id: "statutory-authorities", label: "11. Statutes & Verified Links" },
  { id: "faqs", label: "12. Common RCMS Questions" },
];

const mpDistricts = [
  "Indore (इन्दौर)",
  "Bhopal (भोपाल)",
  "Jabalpur (जबलपुर)",
  "Gwalior (ग्वालियर)",
  "Ujjain (उज्जैन)",
  "Dewas (देवास)",
  "Sagar (सागर)",
  "Rewa (रीवा)",
  "Satna (सतना)",
  "Sehore (सीहोर)",
  "Vidisha (विदिशा)",
  "Narmadapuram (नर्मदापुरम)",
  "Chhindwara (छिन्दवाड़ा)",
  "Raisen (रायसेन)",
  "Ratlam (रतलाम)",
];

const patwariChecklistItems = [
  {
    id: "death-cert",
    title: "Official Death Certificate (मृत्यु प्रमाण-पत्र)",
    detail: "Issued by Nagar Nigam or Gram Panchayat. It must state the exact death date.",
  },
  {
    id: "khasra-b1",
    title: "Fresh Khasra P-II and Khatauni B-1 (MP Bhulekh)",
    detail: "Download the signed copy. It proves the late owner's name and plot size.",
  },
  {
    id: "rin-pustika",
    title: "Bhu-Adhikar evam Rin Pustika (ऋण पुस्तिका)",
    detail: "Keep this land passbook ready. The clerk writes new heir names after the order.",
  },
  {
    id: "samagra-id",
    title: "Family Samagra ID and Heir ID Proofs",
    detail: "Match every Class I heir name on MP RCMS. Check spelling before you file.",
  },
  {
    id: "stamp-affidavit",
    title: "Section 109 Form on Rs 200 SAMPADA 2.0 e-Stamp",
    detail: "Print the oath paper on a Rs 200 stamp (2025 rule). Sign it before a Notary.",
  },
  {
    id: "panchnama-five",
    title: "Varisan Panchnama Signed by 5 Local Panchs",
    detail: "Get five neutral adult neighbors from your own village or ward to sign.",
  },
  {
    id: "kotwar-sign",
    title: "Gram Kotwar (ग्राम कोटवार) Sign",
    detail: "The Kotwar checks the village death book and backs your spot notice.",
  },
  {
    id: "daughter-check",
    title: "Married and Single Daughters Included",
    detail: "Name every living daughter on the sheet. Only a registered Haq Tyag removes her share.",
  },
  {
    id: "rcms-upload",
    title: "RCMS Portal (rcms.mp.gov.in) Case Filing",
    detail: "File online or at a Lok Seva center. The system sends the file to your Patwari.",
  },
  {
    id: "ishtehar-wait",
    title: "15-to-30 Day Ishtehar Notice Wait",
    detail: "Wait out the objection window. Most clean cases close in 30 work days.",
  },
];

const standardHindiPanchnama = `वारिसान मौका पंचनामा (फौती नामांतरण हेतु)
(मध्य प्रदेश भू-राजस्व संहिता, 1959 की धारा 109 एवं 110 के अंतर्गत)

आज दिनांक ........................ को ग्राम ........................, पटवारी हल्का नं. ............, राजस्व निरीक्षक मंडल ........................, तहसील ........................, जिला ........................ (म.प्र.) में फौती नामांतरण प्रकरण क्र. ........................ के संबंध में हम निम्नलिखित पंचान, ग्राम कोटवार एवं हल्का पटवारी की उपस्थिति में मौके पर जांच कर यह वारिसान पंचनामा निष्पादित करते हैं:-

1. भूमि स्वामी का विवरण:
भूमि स्वामी स्व. श्री/श्रीमती ........................................ पिता/पति श्री ........................................, निवासी ग्राम ........................, तहसील ........................, जिला ........................ के नाम पर निम्नलिखित कृषि/अकृषि भूमि राजस्व अभिलेख (खसरा एवं बी-1) में दर्ज है:-
- ग्राम एवं हल्का नं. : ........................ / हल्का नं. ............
- खसरा / सर्वे क्रमांक : ........................
- कुल रकबा (हेक्टेयर में) : ........................ हेक्टेयर

2. मृत्यु का विवरण:
दर्ज भूमि स्वामी श्री/श्रीमती ........................................ का स्वर्गवास दिनांक ........................ को ग्राम/शहर ........................ में हो चुका है, जिसकी पुष्टि ग्राम पंचायत / नगर निगम मृत्यु प्रमाण-पत्र क्रमांक ........................ द्वारा होती है।

3. जीवित वैध उत्तराधिकारियों (प्रथम श्रेणी वारिसानों) का पूर्ण विवरण:
मौके पर ग्रामीणों एवं परिवारजनों से पूछताछ करने पर पाया गया कि स्वर्गीय भूमि स्वामी के निम्नानुसार ही वैध उत्तराधिकारी (पत्नी/पति, पुत्र, अविवाहिता एवं विवाहिता पुत्रियाँ तथा माता) जीवित हैं:-

क्र. | वारिस का पूरा नाम | पिता / पति का नाम | उम्र | मृतक से संबंध | वर्तमान पता / वार्ड नं.
1. | ........................ | ........................ | .... | पत्नी / पति | ........................
2. | ........................ | ........................ | .... | पुत्र | ........................
3. | ........................ | ........................ | .... | विवाहिता पुत्री | ........................
4. | ........................ | ........................ | .... | अविवाहिता पुत्री | ........................

4. सत्यापन एवं कब्जा घोषणा (कोई आपत्ति नहीं):
उपरोक्त वर्णित वारिसानों के अतिरिक्त स्वर्गीय भूमि स्वामी का कोई अन्य प्रथम श्रेणी का वैध वारिस, दत्तक संतान अथवा हकदार जीवित नहीं है। प्रश्नगत भूमि पर वर्तमान में उपरोक्त वारिसानों का ही शांतिपूर्ण कब्जा व काश्त है। प्रकरण में जारी इश्तहार के विरुद्ध मौके पर किसी भी व्यक्ति की कोई आपत्ति नहीं है। यदि भविष्य में किसी भी वारिस का नाम छुपाना या गलत पाया जाता है, तो उसकी समस्त विधिक जिम्मेदारी आवेदक की होगी।

अतः यह वारिसान मौका पंचनामा मौके पर पढ़ा जाकर, सही पाकर हम सभी पंचान, कोटवार एवं हल्का पटवारी द्वारा अपने-अपने हस्ताक्षर एवं पदमुद्रा अंकित कर श्रीमान तहसीलदार महोदय की सेवा में फौती नामांतरण आदेश हेतु सादर प्रस्तुत किया जाता है।

साक्षी पंचान हस्ताक्षर (5 स्वतंत्र ग्राम निवासी - परिवार के सगे संबंधी न हों):
1. पंच-1 नाम एवं पिता का नाम: ........................................ उम्र: ..... निवासी: .................... हस्ताक्षर/अंगूठा: ..................
2. पंच-2 नाम एवं पिता का नाम: ........................................ उम्र: ..... निवासी: .................... हस्ताक्षर/अंगूठा: ..................
3. पंच-3 नाम एवं पिता का नाम: ........................................ उम्र: ..... निवासी: .................... हस्ताक्षर/अंगूठा: ..................
4. पंच-4 नाम एवं पिता का नाम: ........................................ उम्र: ..... निवासी: .................... हस्ताक्षर/अंगूठा: ..................
5. पंच-5 नाम एवं पिता का नाम: ........................................ उम्र: ..... निवासी: .................... हस्ताक्षर/अंगूठा: ..................

सत्यापन एवं प्रतिवेदन हस्ताक्षर:
ग्राम कोटवार हस्ताक्षर: ........................ (नाम एवं ग्राम: ........................)
हल्का पटवारी हस्ताक्षर एवं सील: ........................ (हल्का नं. ............, दिनांक: ................)`;

const standardHindiAffidavit = `समक्ष : श्रीमान तहसीलदार / नायब तहसीलदार महोदय
तहसील ........................, जिला ........................ (मध्य प्रदेश)

शपथ-पत्र (फौती नामांतरण हेतु - धारा 109 एवं 110 म.प्र. भू-राजस्व संहिता, 1959)
(नोट: संपदा 2.0 द्वारा जारी रुपये 200/- के नॉन-ज्यूडिशियल ई-स्टाम्प पेपर पर निष्पादित करें)

मैं, ................................................ (आवेदक का पूरा नाम), पिता/पति श्री ................................................, उम्र ........ वर्ष, व्यवसाय ........................, निवासी ग्राम/वार्ड नं. ........................, तहसील ........................, जिला ........................ (म.प्र.), ईश्वर की शपथ पूर्वक निम्नलिखित कथन करता/करती हूँ:-

1. यह कि मेरे पिता/माता/पति स्व. श्री/श्रीमती ................................................ निवासी ग्राम ........................ के नाम ग्राम ........................, पटवारी हल्का नं. ............, तहसील ........................, जिला ........................ स्थित खसरा क्रमांक ........................ रकबा ........................ हेक्टेयर भूमि राजस्व अभिलेख (खसरा P-II एवं खतौनी B-1) में भूमि स्वामी स्वत्व पर दर्ज है।

2. यह कि उक्त भूमि स्वामी श्री/श्रीमती ................................................ की मृत्यु दिनांक ........................ को हो चुकी है। (सक्षम अधिकारी द्वारा जारी मृत्यु प्रमाण-पत्र की छायाप्रति संलग्न है)।

3. यह कि मृत भूमि स्वामी अपने पीछे निम्नानुसार जीवित प्रथम श्रेणी विधिक उत्तराधिकारी (वारिसान) छोड़ गए हैं:-
(क) ........................................ उम्र ........ वर्ष, संबंध: पत्नी/पति
(ख) ........................................ उम्र ........ वर्ष, संबंध: पुत्र
(ग) ........................................ उम्र ........ वर्ष, संबंध: विवाहिता/अविवाहिता पुत्री
(घ) ........................................ उम्र ........ वर्ष, संबंध: ................

4. यह कि उपरोक्त वर्णित वारिसानों के अतिरिक्त मृतक का अन्य कोई पुत्र, पुत्री (विवाहिता अथवा अविवाहिता), विधवा, माता अथवा विधिक उत्तराधिकारी जीवित नहीं है, और न ही मैंने किसी विधिक वारिस का नाम जानबूझकर छुपाया है।

5. यह कि मृत भूमि स्वामी द्वारा कोई भी वसीयत निष्पादित नहीं की गई है (अथवा यदि वसीयत है तो उसका विवरण स्पष्ट लिखें) तथा प्रश्नगत भूमि के संबंध में किसी भी दीवानी न्यायालय अथवा राजस्व न्यायालय में कोई वाद या स्थगन आदेश (Stay) प्रचलित नहीं है।

6. यह कि मैं म.प्र. भू-राजस्व संहिता, 1959 की धारा 109 एवं 110 के अंतर्गत समस्त वर्णित वैध वारिसों का नाम संयुक्त रूप से खसरा एवं बी-1 अभिलेख में फौती नामांतरण द्वारा दर्ज किए जाने की प्रार्थना करता/करती हूँ।

दिनांक : ........................
स्थान : ........................
हस्ताक्षर शपथकर्ता / आवेदक
(........................................)

सत्यापन (VERIFICATION)
मैं उपरोक्त शपथकर्ता यह सत्यापित करता/करती हूँ कि इस शपथ-पत्र की कंडिका 1 से 6 में वर्णित समस्त तथ्य मेरे निजी ज्ञान एवं राजस्व अभिलेखों के अनुसार पूर्णतः सत्य व सही हैं, इसमें कोई बात असत्य नहीं कही गई है और न ही किसी जीवित वारिस का तथ्य छुपाया गया है। यदि भविष्य में कोई तथ्य असत्य पाया जाता है तो नामांतरण निरस्त होने एवं भारतीय न्याय संहिता के अंतर्गत विधिक कार्यवाही की संपूर्ण जिम्मेदारी मेरी स्वयं की होगी।

दिनांक : ........................
स्थान : ........................
हस्ताक्षर शपथकर्ता / आवेदक`;

const witnessGridPlainText = `5-PANCH WITNESS SIGNATURE GRID (MP VARISAN PANCHNAMA)
Gram / Ward: ________________   Patwari Halka No.: _______   Khasra No.: ___________
Deceased Bhumiswami: ____________________________   Death Date: ______________

Sr. | Panch Full Name & Father/Husband Name | Age | Village / Ward No. & Aadhaar Last 4 | Signature / Thumb
1.  |                                       |     |                                     |
2.  |                                       |     |                                     |
3.  |                                       |     |                                     |
4.  |                                       |     |                                     |
5.  |                                       |     |                                     |

OFFICIAL FIELD VERIFICATION:
- Gram Kotwar Name & Signature: ______________________________  Date: ____________
- Halka Patwari Signature & Official Seal: ___________________  RCMS Case No.: ____`;

const faqsData = [
  {
    q: "Why does a Patwari demand 5 Panch signatures on a Varisan Panchnama in Madhya Pradesh?",
    a: "A Patwari visits your village under Section 110 of the MP Land Revenue Code. Five neutral local residents and the Gram Kotwar sign to prove the death date, land hold, and true heir list. This stops fraud or hidden claims.",
  },
  {
    q: "What e-Stamp value is required for the MP Fauti Namantaran Section 109 affidavit?",
    a: "Under the MP Stamp Amendment Act 2025 (Article 4), you need a Rs 200 e-Stamp from SAMPADA 2.0. Older Rs 50 stamps are out of date. Get the form signed by a Notary before upload.",
  },
  {
    q: "Must married daughters be included in the MP Varisan Panchnama and Section 109 affidavit?",
    a: "Yes. By law, married daughters hold equal rights as sons in family land. Leaving a sister out makes your oath false. Your file can face rejection or a Section 44 appeal before the SDO.",
  },
  {
    q: "Can an unregistered stamp paper consent remove a daughter's name in Fauti Namantaran?",
    a: "No. Plain stamp paper cannot pass land rights worth over Rs 100. Either put all heirs on the record first, or sign a registered Haq Tyag deed at the Sub-Registrar office.",
  },
  {
    q: "What is the time limit to report Fauti Namantaran under Section 109 MPLRC?",
    a: "Heirs must report the death to the Patwari or on MP RCMS within 6 months. Late filing can draw a fine of up to Rs 500 under Section 109(2).",
  },
  {
    q: "How many days does Tehsildar approval take after Patwari Panchnama upload on RCMS?",
    a: "Clean cases follow a 30 work-day limit under the MP Lok Seva law. This period covers the 15-to-30 day public Ishtehar notice for claims or objections.",
  },
  {
    q: "Can Fauti Namantaran on RCMS proceed on the basis of an unregistered Will?",
    a: "Yes, if no legal heir objects after the Ishtehar notice. If a sister or brother contests the Will, the Tehsildar stops the file. Only a Civil Court can rule on a disputed Will.",
  },
  {
    q: "Who cannot act as one of the 5 Panch witnesses on the MP Varisan Panchnama?",
    a: "Blood relatives, heirs on the list, co-owners of the same plot, and minors cannot sign as Panch witnesses. Pick five unrelated adult neighbors from the same village or ward.",
  },
];

export default function MpVarisanPanchnamaClient() {
  const { status } = useSession();
  const router = useRouter();

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [builderTab, setBuilderTab] = useState<"panchnama" | "affidavit" | "summary">("panchnama");
  const [checkedDocs, setCheckedDocs] = useState<string[]>(["death-cert", "khasra-b1"]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Interactive MP Varisan Builder State
  const [district, setDistrict] = useState("Indore (इन्दौर)");
  const [tehsil, setTehsil] = useState("इन्दौर (मल्हारगंज)");
  const [gram, setGram] = useState("बिचौली मर्दाना");
  const [halkaNo, setHalkaNo] = useState("14");
  const [riCircle, setRiCircle] = useState("इन्दौर ग्रामीण");
  const [khasraNo, setKhasraNo] = useState("112/2, 114/1");
  const [rakba, setRakba] = useState("1.450");
  const [deceasedName, setDeceasedName] = useState("स्व. श्री रमेशचंद्र शर्मा");
  const [deceasedFather, setDeceasedFather] = useState("स्व. श्री हीरालाल शर्मा");
  const [deathDate, setDeathDate] = useState("14-08-2026");
  const [deathCertNo, setDeathCertNo] = useState("MP-IND-2026-08421");
  const [applicantName, setApplicantName] = useState("श्री राजेश शर्मा");
  const [applicantAge, setApplicantAge] = useState("44");
  const [applicantRelation, setApplicantRelation] = useState("पुत्र");
  const [heirs, setHeirs] = useState<HeirRow[]>([
    { id: 1, name: "श्रीमती कमला शर्मा", age: "66", relation: "पत्नी (Widow)", note: "Class I Legal Heir" },
    { id: 2, name: "श्री राजेश शर्मा", age: "44", relation: "पुत्र (Son)", note: "Applicant / Class I" },
    {
      id: 3,
      name: "श्रीमती अनिता दुबे (विवाहिता पुत्री)",
      age: "40",
      relation: "विवाहिता पुत्री (Married Daughter)",
      note: "Mandatory Co-Heir (Vineeta Sharma Rule)",
    },
  ]);

  const handleStartDraft = () => {
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

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

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedDocs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "नया वारिस नाम",
        age: "35",
        relation: "पुत्र / पुत्री",
        note: "Class I Legal Heir",
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

  const hasMarriedDaughter = heirs.some(
    (h) => h.relation.includes("पुत्री") || h.relation.toLowerCase().includes("daughter")
  );

  const generatedPanchnamaDraft = `वारिसान मौका पंचनामा (फौती नामांतरण हेतु)
(मध्य प्रदेश भू-राजस्व संहिता, 1959 की धारा 109 एवं 110 के अंतर्गत)

आज दिनांक .................... को ग्राम ${gram || "............"}, पटवारी हल्का नं. ${halkaNo || "..."}, राजस्व निरीक्षक मंडल ${riCircle || "............"}, तहसील ${tehsil || "............"}, जिला ${district} में भूमि स्वामी ${deceasedName} (पिता/पति ${deceasedFather}) के फौती नामांतरण प्रकरण के संबंध में हम 5 स्वतंत्र ग्राम पंचान, ग्राम कोटवार एवं हल्का पटवारी मौके पर उपस्थित होकर यह वारिसान पंचनामा निष्पादित करते हैं:-

1. राजस्व भूमि का विवरण:
- ग्राम व हल्का नं.: ${gram} / हल्का नं. ${halkaNo}
- खसरा / सर्वे क्रमांक: ${khasraNo}
- कुल रकबा: ${rakba} हेक्टेयर

2. मृत्यु एवं प्रमाण-पत्र विवरण:
दर्ज भूमि स्वामी ${deceasedName} का स्वर्गवास दिनांक ${deathDate} को हो चुका है (मृत्यु प्रमाण-पत्र क्र. ${deathCertNo})।

3. जीवित वैध उत्तराधिकारियों (वारिसानों) की सूची:
${heirs
  .map(
    (h, idx) =>
      `${idx + 1}. ${h.name} | उम्र: ${h.age} वर्ष | संबंध: ${h.relation} | ग्राम/निवास: ${gram}`
  )
  .join("\n")}

4. आपत्ति एवं कब्जा सत्यापन:
उपरोक्त वर्णित वारिसानों के अतिरिक्त मृतक का अन्य कोई जीवित प्रथम श्रेणी वारिस नहीं है। भूमि पर उपरोक्त वारिसानों का शांतिपूर्ण कब्जा है तथा इश्तहार के संबंध में मौके पर किसी को कोई आपत्ति नहीं है।

पंचान हस्ताक्षर (5 स्वतंत्र ग्राम निवासी):
1. पंच-1 नाम/पिता: .................................. निवास: ${gram}  हस्ताक्षर/अंगूठा: ..............
2. पंच-2 नाम/पिता: .................................. निवास: ${gram}  हस्ताक्षर/अंगूठा: ..............
3. पंच-3 नाम/पिता: .................................. निवास: ${gram}  हस्ताक्षर/अंगूठा: ..............
4. पंच-4 नाम/पिता: .................................. निवास: ${gram}  हस्ताक्षर/अंगूठा: ..............
5. पंच-5 नाम/पिता: .................................. निवास: ${gram}  हस्ताक्षर/अंगूठा: ..............

ग्राम कोटवार हस्ताक्षर: ........................      हल्का पटवारी हस्ताक्षर व सील: ........................`;

  const generatedAffidavitDraft = `समक्ष : श्रीमान तहसीलदार / नायब तहसीलदार महोदय
तहसील ${tehsil}, जिला ${district} (म.प्र.)

शपथ-पत्र (फौती नामांतरण धारा 109 एवं 110 म.प्र. भू-राजस्व संहिता 1959)
[संपदा 2.0 से प्राप्त रुपये 200/- नॉन-ज्यूडिशियल ई-स्टाम्प पेपर पर निष्पादित करें]

मैं, ${applicantName}, पिता/पति ${deceasedName}, उम्र ${applicantAge} वर्ष, संबंध (${applicantRelation}), निवासी ग्राम ${gram}, तहसील ${tehsil}, जिला ${district}, ईश्वर की शपथ पूर्वक कथन करता/करती हूँ:-

1. यह कि मेरे ${applicantRelation === "पुत्र" || applicantRelation === "पुत्री" ? "पिता/माता" : "परिजन"} ${deceasedName} निवासी ग्राम ${gram} के नाम ग्राम ${gram}, हल्का नं. ${halkaNo} में खसरा क्र. ${khasraNo}, रकबा ${rakba} हेक्टेयर भूमि राजस्व अभिलेख में दर्ज है।
2. यह कि उक्त भूमि स्वामी की मृत्यु दिनांक ${deathDate} को हो गई है (मृत्यु प्रमाण-पत्र क्र. ${deathCertNo} संलग्न)।
3. यह कि मृतक के निम्नानुसार ${heirs.length} जीवित प्रथम श्रेणी वारिसान हैं:-
${heirs.map((h, i) => `   (${i + 1}) ${h.name}, उम्र ${h.age} वर्ष (${h.relation})`).join("\n")}
4. यह कि उपरोक्त के अलावा कोई अन्य जीवित पुत्र, पुत्री (विवाहिता या अविवाहिता), विधवा अथवा माता शेष नहीं है।
5. यह कि भूमि पर कोई दीवानी वाद अथवा स्थगन आदेश लंबित नहीं है तथा सभी वारिसों का नाम संयुक्त रूप से खसरा व बी-1 में दर्ज किया जावे।

दिनांक : ....................
स्थान : ${tehsil}, ${district}                   हस्ताक्षर शपथकर्ता (${applicantName})

सत्यापन: कंडिका 1 से 5 तक के समस्त तथ्य मेरे निजी ज्ञान से सत्य हैं। किसी जीवित वारिस का नाम छुपाया नहीं गया है।
                                                 हस्ताक्षर शपथकर्ता`;

  return (
    <div
      ref={contentRef}
      className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white"
    >
      {/* Layer 1: Dark Navy Legal Hero Section */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C65378]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5F7E75]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-rose-200 mb-6">
            <FileText className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Madhya Pradesh Revenue Format &amp; MPLRC ss. 109 and 110 Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight text-white max-w-4xl">
            MP Varisan Panchnama Format and RCMS Mutation Affidavit
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
            Use this ready Hindi Varisan Panchnama format and Section 109 MPLRC affidavit for fast
            Fauti Namantaran approval. Built for Halka Patwari verification, 5-Panch signatures, and
            MP RCMS Tehsildar orders.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#hindi-panchnama"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#b04467] text-white font-semibold text-sm shadow-lg shadow-[#C65378]/25 transition-all"
            >
              Get Hindi Panchnama Draft
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F0] text-[#172228] font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Draft Legal Will &amp; Heir Plan
              <Sparkles className="w-4 h-4 text-[#C65378]" />
            </button>
            <Link
              href="/services/property-mutation-dakhil-kharij-service"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all"
            >
              MP Mutation Assistance
              <ShieldCheck className="w-4 h-4 text-rose-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Layer 2: Credibility & Statutory Strip */}
      <section className="border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#C65378]/10 text-[#C65378] shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Statutory Code
                </div>
                <div className="text-sm font-semibold text-[#172228] mt-0.5">
                  MPLRC 1959 ss. 109 &amp; 110
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#5F7E75]/15 text-[#3F6358] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Spot Witnesses
                </div>
                <div className="text-sm font-semibold text-[#172228] mt-0.5">
                  5 Village Panch + Kotwar
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#172228]/10 text-[#172228] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Public Guarantee SLA
                </div>
                <div className="text-sm font-semibold text-[#172228] mt-0.5">
                  30 Working Days (RCMS)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-800 shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  MP e-Stamp (Art. 4)
                </div>
                <div className="text-sm font-semibold text-[#172228] mt-0.5">
                  Rs 200 SAMPADA 2.0 Stamp
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 3: Main 3-Column Editorial Grid */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* LEFT STICKY COLUMN: TOC + Filing Desk + Quick Jump (Zero h3/h4 before H2!) */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-3 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>On This Page</span>
              </div>
              <nav aria-label="Table of Contents" className="space-y-1">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#C65378] text-white shadow-sm"
                          : "text-gray-600 hover:bg-[#FAF7F0] hover:text-[#172228]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="bg-gradient-to-br from-[#F4F8FE] to-white border border-blue-100 rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-[#172228] mb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                <span>MP RCMS Filing Desk</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Check exact Patwari documents for your Madhya Pradesh district or connect with a
                mutation specialist online.
              </p>
              <div className="space-y-2">
                <Link
                  href="/tools/madhya-pradesh-rcms-namantaran-document-finder"
                  className="block w-full text-center px-3 py-2 rounded-lg bg-[#172228] hover:bg-[#23323a] text-white text-xs font-semibold transition"
                >
                  Open MP RCMS Doc Finder
                </Link>
                <Link
                  href="/services/property-mutation-dakhil-kharij-service"
                  className="block w-full text-center px-3 py-2 rounded-lg bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-semibold transition"
                >
                  Mutation Support Service
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Fast Jump Downloads
              </div>
              <div className="space-y-2 text-xs">
                <a
                  href="#hindi-panchnama"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF7F0] hover:bg-rose-50 text-[#172228] font-medium transition"
                >
                  <span>Hindi Panchnama</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                </a>
                <a
                  href="#witness-grid"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF7F0] hover:bg-rose-50 text-[#172228] font-medium transition"
                >
                  <span>5-Panch Grid</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                </a>
                <a
                  href="#patwari-checklist"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF7F0] hover:bg-rose-50 text-[#172228] font-medium transition"
                >
                  <span>Patwari Checklist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                </a>
              </div>
            </div>
          </aside>

          {/* CENTER CONTENT COLUMN */}
          <main className="space-y-10 min-w-0">
            {/* Editorial Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-[#172228]/10 bg-white shadow-sm">
              <div className="relative aspect-video w-full bg-[#172228]/5">
                <Image
                  src="/images/madhya-pradesh-varisan-panchnama-affidavit-format-og.jpg"
                  alt="MP Varisan Panchnama and Fauti Namantaran Affidavit Format"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="px-5 py-3.5 bg-white border-t border-[#172228]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
                <span className="font-medium text-[#172228]">
                  MP Varisan Panchnama &amp; Section 109 MPLRC Affidavit Guide
                </span>
                <span>Updated for MP Stamp Amendment Act 2025 &amp; RCMS Portal</span>
              </div>
            </div>

            {/* Executive Brief Box */}
            <div className="bg-[#F4F8FE] border border-blue-200/70 border-l-4 border-l-[#C65378] rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                Executive Legal Brief
              </div>
              <p className="text-sm sm:text-base text-[#172228] leading-relaxed mb-3">
                When a landowner dies in Madhya Pradesh, heirs apply for{" "}
                <strong>Fauti Namantaran</strong> (death transfer). Across Indore, Bhopal, Jabalpur,
                and rural courts, the Halka Patwari checks two main papers first.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                First, you file a signed <strong>Section 109 Affidavit</strong> on a Rs 200
                SAMPADA 2.0 e-Stamp. Next, the Patwari makes a{" "}
                <strong>Hindi Varisan Panchnama</strong> on site. Five village neighbors and the
                Gram Kotwar sign it. Both sheets must name every married and single daughter.
              </p>
            </div>

            {/* SECTION 1: THE ONLY H2 ON THE ENTIRE PAGE */}
            <section
              id="statutory-foundation"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                Governing Revenue Law
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#172228] mb-5 leading-snug">
                MP Varisan Panchnama Rules Under Section 109 and 110 MPLRC
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  <strong>Section 109 of the MP Land Revenue Code, 1959</strong> sets the first
                  rule. Heirs must tell the Halka Patwari or apply on MP RCMS within six months of
                  death. Late reports can draw a fine up to Rs 500 under Section 109(2).
                </p>
                <p>
                  <strong>Section 110 MPLRC</strong> and the <strong>2018 MP Mutation Rules</strong>{" "}
                  guide how the Tehsildar hears the file. After online filing on{" "}
                  <code className="px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#172228] text-xs font-mono">
                    rcms.mp.gov.in
                  </code>
                  , the office posts a public notice (<em>Ishtehar</em>) for 15 to 30 days.
                </p>
                <p>
                  Next, Revenue Book Circular (RBC) rules call for a field check (
                  <em>Mauka Janch</em>). The Patwari visits the plot, confirms who holds it, and
                  writes the <strong>Varisan Panchnama</strong>. Five local witnesses (
                  <em>5 Panch</em>) and the Village Kotwar sign on site. Clean cases close in 30
                  work days under the MP Lok Seva law.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    Section 109 Duty
                  </div>
                  <div className="font-semibold text-[#172228] text-sm mb-1">
                    6-Month Intimation Window
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    File early with the Death Certificate, Khasra P-II, Khatauni B-1, and Rs 200
                    e-Stamp affidavit to avoid penalties.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-1">
                    Section 110 &amp; RBC Rule
                  </div>
                  <div className="font-semibold text-[#172228] text-sm mb-1">
                    5-Panch Spot Verification
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Five adult neighbors with zero blood relation verify the death date, possession,
                    and complete list of living heirs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                    MP Stamp Act 2025
                  </div>
                  <div className="font-semibold text-[#172228] text-sm mb-1">
                    Rs 200 Non-Judicial e-Stamp
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Schedule I-A Article 4 now prescribes a Rs 200 SAMPADA 2.0 e-Stamp for standard
                    affidavits instead of the older Rs 50 rate.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                    Guarantee &amp; Appeal
                  </div>
                  <div className="font-semibold text-[#172228] text-sm mb-1">
                    30-Day Order &amp; 45-Day SDO Appeal
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Uncontested cases close within 30 working days under Lok Seva Guarantee. Excluded
                    heirs may appeal to the SDO within 45 days under Section 44.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE BUILDER */}
            <section
              id="interactive-builder"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    Custom Live Tool
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228]">
                    Interactive MP Varisan Panchnama and Section 109 Affidavit Builder
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  Instant Hindi Output
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Enter your district, village, Khasra numbers, and surviving heirs below. The tool
                builds a ready Hindi Varisan Panchnama and Section 109 Affidavit instantly. No data
                leaves your browser.
              </p>

              {/* Form Inputs */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    MP District (जिला)
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  >
                    {mpDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Tehsil (तहसील)
                  </label>
                  <input
                    type="text"
                    value={tehsil}
                    onChange={(e) => setTehsil(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Gram / Ward (ग्राम / मोहल्ला)
                  </label>
                  <input
                    type="text"
                    value={gram}
                    onChange={(e) => setGram(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Patwari Halka No. (हल्का नं.)
                  </label>
                  <input
                    type="text"
                    value={halkaNo}
                    onChange={(e) => setHalkaNo(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Khasra / Survey No. (खसरा क्र.)
                  </label>
                  <input
                    type="text"
                    value={khasraNo}
                    onChange={(e) => setKhasraNo(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Area in Hectares (रकबा हेक्टेयर)
                  </label>
                  <input
                    type="text"
                    value={rakba}
                    onChange={(e) => setRakba(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Deceased Owner (स्वर्गीय भूमि स्वामी)
                  </label>
                  <input
                    type="text"
                    value={deceasedName}
                    onChange={(e) => setDeceasedName(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Date of Death &amp; Cert No.
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={deathDate}
                      onChange={(e) => setDeathDate(e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-2.5 py-2 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={deathCertNo}
                      onChange={(e) => setDeathCertNo(e.target.value)}
                      placeholder="Cert No."
                      className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-2.5 py-2 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Applicant Name &amp; Relation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="col-span-2 w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-2.5 py-2 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={applicantRelation}
                      onChange={(e) => setApplicantRelation(e.target.value)}
                      className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-2.5 py-2 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hidden RI/Father/Age quick row */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    RI Circle (राजस्व निरीक्षक मंडल)
                  </label>
                  <input
                    type="text"
                    value={riCircle}
                    onChange={(e) => setRiCircle(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Deceased Father/Husband Name
                  </label>
                  <input
                    type="text"
                    value={deceasedFather}
                    onChange={(e) => setDeceasedFather(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172228] mb-1">
                    Applicant Age (उम्र)
                  </label>
                  <input
                    type="text"
                    value={applicantAge}
                    onChange={(e) => setApplicantAge(e.target.value)}
                    className="w-full rounded-xl border border-[#172228]/20 bg-[#FAF7F0] px-3 py-2 text-sm text-[#172228] focus:border-[#C65378] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Heir List */}
              <div className="rounded-xl bg-[#FAF7F0] border border-[#172228]/15 p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#172228]">
                    Surviving Class I Legal Heirs ({heirs.length})
                  </div>
                  <button
                    type="button"
                    onClick={addHeirRow}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] hover:bg-[#23323a] text-white text-xs font-semibold cursor-pointer transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Legal Heir
                  </button>
                </div>

                <div className="space-y-2.5">
                  {heirs.map((heir, idx) => (
                    <div
                      key={heir.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-lg border border-[#172228]/10"
                    >
                      <span className="sm:col-span-1 text-xs font-bold text-[#C65378]">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={heir.name}
                        onChange={(e) => updateHeirRow(heir.id, "name", e.target.value)}
                        aria-label={`Heir ${idx + 1} full name`}
                        className="sm:col-span-5 rounded-lg border border-[#172228]/15 px-2.5 py-1.5 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={heir.age}
                        onChange={(e) => updateHeirRow(heir.id, "age", e.target.value)}
                        aria-label={`Heir ${idx + 1} age`}
                        placeholder="Age"
                        className="sm:col-span-2 rounded-lg border border-[#172228]/15 px-2.5 py-1.5 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={heir.relation}
                        onChange={(e) => updateHeirRow(heir.id, "relation", e.target.value)}
                        aria-label={`Heir ${idx + 1} relation`}
                        className="sm:col-span-3 rounded-lg border border-[#172228]/15 px-2.5 py-1.5 text-xs text-[#172228] focus:border-[#C65378] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeHeirRow(heir.id)}
                        disabled={heirs.length <= 1}
                        aria-label={`Remove heir ${idx + 1}`}
                        className="sm:col-span-1 inline-flex items-center justify-center p-1.5 rounded-lg text-gray-400 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {!hasMarriedDaughter && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Reminder: Ensure you have not omitted any living married or unmarried
                      daughter. Under Supreme Court rules, omitting daughters causes mutation
                      rejection during Patwari inquiry.
                    </span>
                  </div>
                )}
              </div>

              {/* Builder Output Switcher & Dark Output Preview */}
              <div className="rounded-2xl bg-[#172228] text-white overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBuilderTab("panchnama")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                        builderTab === "panchnama"
                          ? "bg-[#C65378] text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      Live Hindi Panchnama
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuilderTab("affidavit")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                        builderTab === "affidavit"
                          ? "bg-[#C65378] text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      Live Section 109 Affidavit
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuilderTab("summary")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                        builderTab === "summary"
                          ? "bg-[#C65378] text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      RCMS Cost &amp; SLA
                    </button>
                  </div>

                  {builderTab !== "summary" && (
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          builderTab === "panchnama"
                            ? generatedPanchnamaDraft
                            : generatedAffidavitDraft,
                          "builder-copy"
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#172228] hover:bg-[#FAF7F0] text-xs font-semibold cursor-pointer transition"
                    >
                      {copiedKey === "builder-copy" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied Live Draft</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Generated Draft</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {builderTab === "summary" ? (
                  <div className="p-6 grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400">Non-Judicial e-Stamp</div>
                      <div className="text-xl font-bold text-white mt-1">Rs 200</div>
                      <p className="text-xs text-gray-300 mt-1">
                        SAMPADA 2.0 Affidavit rate under MP Stamp Amendment Act 2025.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400">RCMS Processing Time</div>
                      <div className="text-xl font-bold text-rose-300 mt-1">30 Working Days</div>
                      <p className="text-xs text-gray-300 mt-1">
                        Includes 15-to-30 day Ishtehar notice for undisputed Fauti files.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400">Minimum Spot Witnesses</div>
                      <div className="text-xl font-bold text-emerald-300 mt-1">5 Panch + Kotwar</div>
                      <p className="text-xs text-gray-300 mt-1">
                        Unrelated village residents plus Halka Patwari physical seal.
                      </p>
                    </div>
                  </div>
                ) : (
                  <pre className="p-5 text-xs sm:text-sm text-gray-100 font-sans whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
                    {builderTab === "panchnama"
                      ? generatedPanchnamaDraft
                      : generatedAffidavitDraft}
                  </pre>
                )}
              </div>
            </section>

            {/* SECTION 3: COMPARISON MATRIX */}
            <section
              id="comparison-matrix"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-1">
                Document Role Matrix
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-3">
                Varisan Panchnama vs Section 109 Affidavit vs Relinquishment Deed
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Families often confuse the Patwari Panchnama with the applicant affidavit or a
                sister consent letter. This table shows how MP Revenue Courts treat each paper.
              </p>

              <div className="overflow-x-auto rounded-xl border border-[#172228]/15">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-semibold">Legal Feature</th>
                      <th className="p-3.5 font-semibold">Varisan Panchnama</th>
                      <th className="p-3.5 font-semibold">Section 109 Affidavit</th>
                      <th className="p-3.5 font-semibold">Haq Tyag (Relinquishment)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10">
                    <tr className="bg-white">
                      <td className="p-3.5 font-semibold text-[#172228]">Primary Purpose</td>
                      <td className="p-3.5 text-gray-700">
                        Spot inquiry report confirming heirs and possession on ground.
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Sworn family declaration by applicant to open RCMS mutation.
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Transfers a daughter or co-heir share to other family members.
                      </td>
                    </tr>
                    <tr className="bg-[#FAF7F0]/70">
                      <td className="p-3.5 font-semibold text-[#172228]">MP Stamp / Fee</td>
                      <td className="p-3.5 text-gray-700">
                        Plain legal paper (no stamp needed for field memo).
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Rs 200 SAMPADA 2.0 e-Stamp (MP Amendment Act 2025).
                      </td>
                      <td className="p-3.5 text-gray-700">
                        State stamp duty + SRO registration fee on market value or concession.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3.5 font-semibold text-[#172228]">Who Signs It</td>
                      <td className="p-3.5 text-gray-700">
                        5 neutral village Panchs, Gram Kotwar, and Halka Patwari.
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Legal heir applicant before a Notary or Oath Commissioner.
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Releasing co-heirs before Sub-Registrar with 2 witnesses.
                      </td>
                    </tr>
                    <tr className="bg-[#FAF7F0]/70">
                      <td className="p-3.5 font-semibold text-[#172228]">SRO Registration</td>
                      <td className="p-3.5 text-gray-700">Not required. Uploaded by Patwari.</td>
                      <td className="p-3.5 text-gray-700">Not registered at SRO. Notarized only.</td>
                      <td className="p-3.5 text-gray-700">
                        Strictly compulsory under Section 17 Registration Act.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3.5 font-semibold text-[#172228]">Legal Power</td>
                      <td className="p-3.5 text-gray-700">
                        Supports Section 110 Tehsildar order for joint heir entry.
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Binds deponent under oath; false claim triggers cancellation.
                      </td>
                      <td className="p-3.5 text-gray-700">
                        Validly extinguishes a daughter or brother share in Khasra.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: HINDI VARISAN PANCHNAMA FORMAT */}
            <section id="hindi-panchnama" className="scroll-mt-24">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-3">
                Standard Hindi Varisan Panchnama Format (Copy Ready)
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Patwaris across Madhya Pradesh use this formal Hindi Panchnama template during
                village field inquiries. Copy the exact text below and fill your Khasra and heir
                details.
              </p>

              <div className="bg-[#FAF7F0] rounded-2xl border border-[#172228]/15 overflow-hidden shadow-sm">
                <div className="bg-[#172228] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <FileCheck2 className="w-4 h-4 text-[#C65378]" />
                    <span>वारिसान मौका पंचनामा (फौती नामांतरण प्रारूप)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(standardHindiPanchnama, "panchnama")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#b04467] text-white text-xs font-semibold cursor-pointer transition"
                  >
                    {copiedKey === "panchnama" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Panchnama</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Hindi Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 sm:p-6 text-xs sm:text-sm font-sans text-[#172228] whitespace-pre-wrap leading-relaxed overflow-x-auto bg-white">
                  {standardHindiPanchnama}
                </pre>
              </div>
            </section>

            {/* SECTION 5: MANDATORY 5-PANCH WITNESS SIGNATURE GRID */}
            <section
              id="witness-grid"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    Patwari Spot Witness Asset
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228]">
                    5-Panch Witness Signature Grid for Patwari Spot Verification
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(witnessGridPlainText, "witness-grid")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 hover:border-[#C65378] text-xs font-semibold text-[#172228] cursor-pointer transition"
                >
                  {copiedKey === "witness-grid" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Witness Grid</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Copy Print Grid</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                This 7-row witness grid is needed during Patwari field visits. Pick five neutral
                adult neighbors outside your family. For safety, never print contact numbers on
                public copies. Write only the Village or Ward number and ID last four digits.
              </p>

              <div className="overflow-x-auto rounded-xl border border-[#172228]/15">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#FAF7F0] border-b border-[#172228]/15 text-[#172228]">
                      <th className="p-3 font-bold">Witness Slot</th>
                      <th className="p-3 font-bold">Name &amp; Father/Husband</th>
                      <th className="p-3 font-bold">Village / Ward &amp; Age</th>
                      <th className="p-3 font-bold">Admissibility Check</th>
                      <th className="p-3 font-bold">Signature &amp; Seal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <tr key={num} className="bg-white">
                        <td className="p-3 font-semibold text-[#C65378]">Panch #{num}</td>
                        <td className="p-3 text-gray-600">________________________</td>
                        <td className="p-3 text-gray-600">Ward / Gram ____ (Age __)</td>
                        <td className="p-3 text-xs text-gray-600">
                          Unrelated adult resident (not a co-heir)
                        </td>
                        <td className="p-3 text-gray-500">Sign / Thumb</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50/50">
                      <td className="p-3 font-semibold text-[#3F6358]">Gram Kotwar</td>
                      <td className="p-3 text-gray-700">Village Kotwar Official</td>
                      <td className="p-3 text-gray-700">Assigned Revenue Halka</td>
                      <td className="p-3 text-xs text-gray-700">
                        Attests death register entry and village Munadi
                      </td>
                      <td className="p-3 font-medium text-[#3F6358]">Kotwar Sign</td>
                    </tr>
                    <tr className="bg-rose-50/50">
                      <td className="p-3 font-semibold text-[#172228]">Halka Patwari</td>
                      <td className="p-3 text-gray-700">Revenue Field Officer</td>
                      <td className="p-3 text-gray-700">Patwari Halka Office</td>
                      <td className="p-3 text-xs text-gray-700">
                        Uploads signed PDF scan on RCMS portal
                      </td>
                      <td className="p-3 font-semibold text-[#172228]">Official Seal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: SECTION 109 & 110 HINDI AFFIDAVIT */}
            <section id="hindi-affidavit" className="scroll-mt-24">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-3">
                Section 109 and 110 MPLRC Hindi Affidavit Format (Rs 200 e-Stamp)
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Print this Hindi <em>Shapath Patra</em> on a Rs 200 non-judicial MP e-Stamp issued
                from SAMPADA 2.0 (MP Stamp Amendment Act 2025, Article 4). Get it attested by a
                licensed Notary before uploading to the MP RCMS portal.
              </p>

              <div className="bg-[#FAF7F0] rounded-2xl border border-[#172228]/15 overflow-hidden shadow-sm">
                <div className="bg-[#172228] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>शपथ-पत्र (धारा 109 एवं 110 MPLRC - रुपये 200 ई-स्टाम्प प्रारूप)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(standardHindiAffidavit, "affidavit")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#b04467] text-white text-xs font-semibold cursor-pointer transition"
                  >
                    {copiedKey === "affidavit" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Affidavit</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Hindi Affidavit</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 sm:p-6 text-xs sm:text-sm font-sans text-[#172228] whitespace-pre-wrap leading-relaxed overflow-x-auto bg-white">
                  {standardHindiAffidavit}
                </pre>
              </div>
            </section>

            {/* SECTION 7: MANDATORY PATWARI CHECKLIST & RCMS PORTAL WORKFLOW */}
            <section
              id="patwari-checklist"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-1">
                    Submission Readiness Box
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228]">
                    Patwari Report Submission Checklist and RCMS Filing Steps
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#172228]/15 text-xs font-bold text-[#172228]">
                    {checkedDocs.length} / {patwariChecklistItems.length} Checked
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        patwariChecklistItems
                          .map((item, idx) => `${idx + 1}. ${item.title} - ${item.detail}`)
                          .join("\n"),
                        "checklist"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] hover:bg-[#23323a] text-white text-xs font-semibold cursor-pointer transition"
                  >
                    {copiedKey === "checklist" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy List</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {patwariChecklistItems.map((item) => {
                  const checked = checkedDocs.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleCheck(item.id)}
                      className={`text-left p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                        checked
                          ? "bg-emerald-50/70 border-emerald-300"
                          : "bg-[#FAF7F0] border-[#172228]/10 hover:border-[#C65378]"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          checked ? "text-emerald-600" : "text-gray-400"
                        }`}
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-[#172228]">
                          {item.title}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.detail}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl bg-[#F4F8FE] border border-blue-200/70 p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
                  <ListChecks className="w-4 h-4 text-[#C65378]" />
                  <span>6-Step MP RCMS Portal Approval Sequence</span>
                </div>
                <ol className="space-y-1.5 text-xs sm:text-sm text-gray-700 list-decimal pl-5 leading-relaxed">
                  <li>
                    Submit a Fauti Namantaran application online via <strong>rcms.mp.gov.in</strong>{" "}
                    or your nearest Lok Seva Kendra.
                  </li>
                  <li>
                    Upload the Death Certificate, Khasra B-1 copy, and notarized Rs 200 Section 109
                    Affidavit.
                  </li>
                  <li>
                    Tehsildar court opens a case number and publishes the 15-to-30 day public
                    <em> Ishtehar</em> notice.
                  </li>
                  <li>
                    Halka Patwari completes village spot inquiry, takes 5 Panch + Kotwar signatures
                    on the Varisan Panchnama, and uploads <em>Prativeden</em>.
                  </li>
                  <li>
                    If zero objection arrives during Ishtehar, Tehsildar passes the Section 110
                    mutation order.
                  </li>
                  <li>
                    Verify updated joint heir names on <strong>MP Bhulekh</strong> and endorse your
                    <em> Rin Pustika</em>.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 8: DUAL CONVERSION CTA */}
            <section id="dual-cta" className="scroll-mt-24">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-4">
                Protect Your MP Land Title: Plan a Will or Resolve a Contested Mutation
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-[#172228] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                      Prevent Future Panchnama Delays
                    </div>
                    <div className="text-lg sm:text-xl font-serif font-bold text-white mb-2">
                      Create an Indian Registered Will Online
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                      Avoid multi-year revenue disputes and missing-heir objections. Build a clear,
                      registered Will specifying agricultural Khasra numbers and urban plots.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#b04467] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    Start Drafting Your Will
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="rounded-2xl bg-white border-2 border-[#C65378]/30 p-6 sm:p-7 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-semibold mb-3">
                      <Gavel className="w-3.5 h-3.5" />
                      Contested Mutation or SDO Appeal
                    </div>
                    <div className="text-lg sm:text-xl font-serif font-bold text-[#172228] mb-2">
                      Need Lawyer Help for MP RCMS Disputes?
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                      Facing a sister objection, Will rejection before Tehsildar, or Section 44 SDO
                      appeal? Speak with our property mutation team online.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <Link
                      href="/services/property-mutation-dakhil-kharij-service"
                      className="flex-1 text-center py-3 px-4 rounded-xl bg-[#172228] hover:bg-[#23323a] text-white font-semibold text-xs sm:text-sm transition"
                    >
                      Mutation Legal Service
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 text-center py-3 px-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 hover:border-[#C65378] text-[#172228] font-semibold text-xs sm:text-sm transition"
                    >
                      Book Case Review
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: MARRIED DAUGHTERS, CONTESTED WILLS & CYBER TEHSIL */}
            <section
              id="married-daughters-and-will"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                Court Rules &amp; Common Errors
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-5">
                Married Daughters Rights, Disputed Wills, and Common RCMS Rejections
              </h3>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#172228] text-base mb-1.5">
                    1. Married Daughters and Plain-Paper Consent Letters
                  </h4>
                  <p>
                    Under Section 6 of the Hindu Succession Act and <em>Vineeta Sharma (2020)</em>,
                    married daughters hold equal birth rights in family land. Dropping a sister from
                    the Varisan Panchnama is a false statement. A plain Rs 200 or Rs 500 consent
                    letter cannot drop a land right worth over Rs 100. Either put all heirs on the
                    Khasra first, or register a{" "}
                    <Link
                      href="/services/relinquishment-deed"
                      className="text-[#C65378] font-semibold hover:underline"
                    >
                      Relinquishment Deed (Haq Tyag)
                    </Link>{" "}
                    at the Sub-Registrar office.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#172228] text-base mb-1.5">
                    2. Uncontested vs Disputed Wills Before Tehsildar
                  </h4>
                  <p>
                    In <em>Murari Lal v. State of MP</em> and <em>Kusum Bai v. State of MP</em>,
                    the High Court set a clear rule. A Tehsildar can enter a Will only if no heir
                    objects after the Ishtehar notice. When any brother or sister contests a Will,
                    the revenue court must stop and send them to Civil Court. Per{" "}
                    <em>Jitendra Singh v. State of MP (2021)</em>, land mutation is tax record work
                    only and does not create new title.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#172228] text-base mb-1.5">
                    3. MP Cyber Tehsil vs Regular Tehsil Fauti Check
                  </h4>
                  <p>
                    MP Cyber Tehsil clears undisputed registered deed transfers with no paper visits.
                    However, most Fauti Namantaran files still need a Halka Patwari report, a
                    5-Panch Varisan Panchnama, and local Tehsildar orders on RCMS to prove the death
                    and spot hold.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REAL MP FIELD CASE SCENARIOS */}
            <section id="mp-case-studies" className="scroll-mt-24">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-4">
                Three Real Madhya Pradesh Fauti Namantaran Case Studies
              </h3>

              <div className="grid md:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                    Case 1: Indore Rural Halka
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#172228] mb-2">
                    Patwari Asks for 5 Non-Family Neighbor Signs
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A son put two cousins as Panch witnesses on his sheet. The Indore Patwari turned
                    the file back. He then brought five neutral village elders and the Kotwar to
                    sign. The B-1 order passed in 24 work days.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                    Case 2: Bhopal Tehsil
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#172228] mb-2">
                    Married Sister Left Out During Ishtehar
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Two brothers tried to skip their married sisters using plain stamp notes. One
                    sister filed an objection during the notice window. The Tehsildar entered all
                    heirs first, and the family later signed a registered Haq Tyag deed.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                    Case 3: Jabalpur Revenue Court
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#172228] mb-2">
                    Unregistered Will Challenged on RCMS
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    One son asked for sole plot mutation using an unregistered Will. His sisters
                    objected in time. The Naib Tehsildar kept the Will aside under Kusum Bai rules
                    and told the parties to use a Civil Court or family deed.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS & VERIFIED INTERNAL RESOURCES */}
            <section
              id="statutory-authorities"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-4">
                Governing Statutes and Verified MP Mutation Resources
              </h3>

              <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-[#172228] mb-2.5 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Primary Statutes &amp; Rules</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 list-disc pl-5">
                    <li>Madhya Pradesh Land Revenue Code, 1959 (ss. 44, 109, 110, 178)</li>
                    <li>MP Bhu-Rajasva Sanhita (Namantaran) Rules, 2018</li>
                    <li>MP Revenue Book Circular (RBC) Field Verification Norms</li>
                    <li>Indian Stamp (MP Amendment) Act, 2025 (Schedule I-A Art. 4)</li>
                    <li>MP Public Services Guarantee Act, 2010 (30-Day SLA)</li>
                    <li>Hindu Succession Act, 1956 (s. 6 &amp; Class I Schedule)</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-[#172228] mb-2.5 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#5F7E75]" />
                    <span>Related WillDrafting Guides &amp; Services</span>
                  </div>
                  <ul className="space-y-2 text-[#C65378] font-medium">
                    <li>
                      <Link
                        href="/tools/madhya-pradesh-rcms-namantaran-document-finder"
                        className="hover:underline"
                      >
                        MP RCMS Namantaran Document Finder Tool
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/property-mutation-dakhil-kharij-service"
                        className="hover:underline"
                      >
                        Property Mutation &amp; Dakhil Kharij Lawyer Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/legal-heir" className="hover:underline">
                        Legal Heir Certificate &amp; Pedigree Assistance
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/relinquishment-deed" className="hover:underline">
                        Registered Relinquishment (Haq Tyag) Deed Drafting
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/family-settlement-deed-lawyer"
                        className="hover:underline"
                      >
                        Family Settlement Deed Legal Consultation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                        className="hover:underline"
                      >
                        Pan-India Legal Heir &amp; Pedigree Affidavit Format
                      </Link>
                    </li>
                    <li>
                      <Link href="/templates" className="hover:underline">
                        Browse All Will &amp; Property Legal Templates
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section
              id="faqs"
              className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172228] mb-5">
                Frequently Asked Questions on MP Varisan Panchnama
              </h3>

              <div className="space-y-3">
                {faqsData.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={item.q}
                      className="rounded-xl border border-[#172228]/10 bg-[#FAF7F0]/50 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="font-semibold text-sm sm:text-base text-[#172228]">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#C65378] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-[#172228]/5 pt-3 bg-white">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Bottom 3 Plain-English Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1.5">
                  The Core Rule
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Report death within six months under Section 109 MPLRC. Always list your widow,
                  sons, and married daughters together.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-1.5">
                  Who Signs on Spot
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Collect five adult village Panch signatures outside your family, plus the Gram
                  Kotwar and Halka Patwari seal.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1.5">
                  Stamp &amp; Filing
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Print your Section 109 affidavit on a Rs 200 SAMPADA 2.0 e-Stamp, notarize it, and
                  upload everything on RCMS.
                </p>
              </div>
            </div>
          </main>

          {/* RIGHT STICKY COLUMN: Reviewer Bio + Navy Will CTA + White Mutation CTA + Readiness Card */}
          <aside className="space-y-6 sticky top-24">
            {/* Card 1: Legal Reviewer Bio */}
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#172228] text-white font-serif font-bold flex items-center justify-center text-sm shrink-0">
                  AAM
                </div>
                <div>
                  <div className="text-sm font-bold text-[#172228]">Lawyer Anuj Anand Malik</div>
                  <div className="text-xs text-[#C65378] font-medium">
                    AMA Legal Solutions | Founder
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Template verified against Madhya Pradesh Land Revenue Code ss. 109 &amp; 110, MP
                Namantaran Rules 2018, and MP Stamp Amendment Act 2025 e-Stamp norms.
              </p>
            </div>

            {/* Card 2: Navy Primary Will CTA */}
            <div className="bg-[#172228] text-white rounded-2xl p-6 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">
                Avoid Fauti Disputes
              </div>
              <div className="text-lg font-serif font-bold mb-2">
                Draft a Clear Indian Will Online
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Specify agricultural Khasras and residential shares clearly so your family avoids
                slow revenue court battles later.
              </p>
              <button
                type="button"
                onClick={handleStartDraft}
                className="w-full py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#b04467] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                Start Will &amp; Heir Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: White & Rose Consultation CTA (Zero Mobile Number) */}
            <div className="bg-white rounded-2xl border-2 border-[#C65378]/30 p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1.5">
                Revenue Lawyer Review
              </div>
              <div className="text-base font-serif font-bold text-[#172228] mb-2">
                Stuck With Patwari or SDO Objection?
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Get help with disputed RCMS files, SDO appeals under Section 44, or registered Haq
                Tyag relinquishment deeds.
              </p>
              <div className="space-y-2">
                <Link
                  href="/services/property-mutation-dakhil-kharij-service"
                  className="block w-full text-center py-2.5 px-3 rounded-xl bg-[#172228] hover:bg-[#23323a] text-white text-xs font-semibold transition"
                >
                  Explore Mutation Service
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 px-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-semibold transition"
                >
                  Send Case Details Online
                </Link>
              </div>
            </div>

            {/* Card 4: RCMS Readiness Card */}
            <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Quick RCMS Checklist
              </div>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Rs 200 SAMPADA 2.0 e-Stamp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>5 Non-Family Panch Signatures</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Gram Kotwar + Patwari Seal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>All Married Daughters Listed</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Mobile Action Bar (Zero Mobile Number) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#172228]/10 px-4 py-3 flex items-center gap-3 shadow-lg">
        <a
          href="#hindi-panchnama"
          className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 text-[#172228] text-xs font-semibold"
        >
          Hindi Format
        </a>
        <button
          type="button"
          onClick={handleStartDraft}
          className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#C65378] text-white text-xs font-semibold cursor-pointer"
        >
          Start Will Plan
        </button>
      </div>
    </div>
  );
}
