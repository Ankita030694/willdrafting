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
  Users,
  FileText,
  FileSpreadsheet,
  Calculator,
  Stamp,
  Plus,
  Trash2,
  ClipboardCheck,
  Mountain,
  Languages,
} from "lucide-react";

// Table of Contents Items (matching section IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Khatauni & Virasat Law Rules" },
  { id: "khatauni-affidavit-builder", label: "2. Free Draft & Bhu-Kanoon Tool" },
  { id: "editable-khatauni-affidavit", label: "3. Editable Khatauni Affidavit" },
  { id: "bhu-kanoon-ceiling-clause", label: "4. Bhu-Kanoon 250 Sq.m Clause" },
  { id: "tehsil-verification-checklist", label: "5. Tehsil & Vaad Upload Box" },
  { id: "virasat-pathway-comparison", label: "6. PA-11 vs Section 34 vs Will" },
  { id: "section-171-succession-order", label: "7. Section 171 & Wife Share" },
  { id: "apuni-sarkar-vaad-sop", label: "8. Apuni Sarkar & Vaad Steps" },
  { id: "uttarakhand-case-studies", label: "9. Real Nainital & Doon Cases" },
  { id: "statutory-citations", label: "10. Official Portals & Citations" },
  { id: "frequently-asked-questions", label: "11. Uttarakhand Virasat FAQs" },
];

interface DistrictInfo {
  name: string;
  zone: "hill" | "plain";
  tehsilSample: string;
  note: string;
}

const UTTARAKHAND_DISTRICTS: DistrictInfo[] = [
  {
    name: "Nainital",
    zone: "hill",
    tehsilSample: "Nainital / Haldwani",
    note: "Strict hill land check outside Haldwani city wards. Orchards need clear Khatauni notes.",
  },
  {
    name: "Dehradun",
    zone: "hill",
    tehsilSample: "Dehradun / Vikasnagar / Rishikesh",
    note: "Rural and Mussoorie hill belts face tight Section 154 checks. MDDA plots follow urban rules.",
  },
  {
    name: "Almora",
    zone: "hill",
    tehsilSample: "Almora / Ranikhet",
    note: "Hill pattis often use Revenue Police (Patwari) spots for Parivar and Khatauni checks.",
  },
  {
    name: "Tehri Garhwal",
    zone: "hill",
    tehsilSample: "Tehri / Narendra Nagar",
    note: "Hill district under strict Bhu-Kanoon rules. Always add the 250 sq.m inheritance line.",
  },
  {
    name: "Pauri Garhwal",
    zone: "hill",
    tehsilSample: "Pauri / Kotdwar / Srinagar",
    note: "Migration from villages is common. Out-of-state heirs should attach Parivar Register proof.",
  },
  {
    name: "Chamoli",
    zone: "hill",
    tehsilSample: "Chamoli / Joshimath",
    note: "Border hill district. Inheritance works under Virasat, while fresh outside sales are barred.",
  },
  {
    name: "Rudraprayag",
    zone: "hill",
    tehsilSample: "Rudraprayag / Ukhimath",
    note: "Strict hill land protection applies. Keep old Bandobast and current Khatauni numbers ready.",
  },
  {
    name: "Uttarkashi",
    zone: "hill",
    tehsilSample: "Bhatwari / Dunda",
    note: "Border hill district. Patwari checks Parivar Register links before sending the report.",
  },
  {
    name: "Bageshwar",
    zone: "hill",
    tehsilSample: "Bageshwar / Garur",
    note: "Ancestral hill holdings often carry joint family shares. List every living branch.",
  },
  {
    name: "Pithoragarh",
    zone: "hill",
    tehsilSample: "Pithoragarh / Didihat",
    note: "Hill district rules bar outside land sales but protect legal heirs under Section 171.",
  },
  {
    name: "Champawat",
    zone: "hill",
    tehsilSample: "Champawat / Tanakpur",
    note: "Hill and Terai foothill mix. Check whether your plot falls in urban limits or Gram Sabha.",
  },
  {
    name: "Haridwar",
    zone: "plain",
    tehsilSample: "Haridwar / Roorkee / Laksar",
    note: "Plain district outside the 11 hill-ban zones. Still follows UPZA&LR Section 171 for farms.",
  },
  {
    name: "Udham Singh Nagar",
    zone: "plain",
    tehsilSample: "Rudrapur / Kashipur / Haldwani Belt",
    note: "Plain Terai farm belt. Large transfers need state sanction, while Virasat stays protected.",
  },
];

const INITIAL_UPLOAD_CHECKLIST = [
  {
    id: "chk-1",
    label: "Notarized Khatauni Succession Affidavit (₹10 Stamp)",
    detail: "Printed on ₹10 non-judicial e-Stamp with Bhu-Kanoon clause and signed before a Notary.",
    checked: true,
  },
  {
    id: "chk-2",
    label: "Registered Death Certificate of Khatauni Holder",
    detail: "Issued by Gram Panchayat, Nagar Nigam, or CRS portal showing exact date of death.",
    checked: true,
  },
  {
    id: "chk-3",
    label: "Certified Copy of Bhulekh Khatauni & Khasra",
    detail: "Latest Khata number, Khasra number, area in hectares, and land class from Bhulekh.",
    checked: true,
  },
  {
    id: "chk-4",
    label: "Parivar Register Nakal (Kutumb Register)",
    detail: "Issued by Gram Panchayat Vikas Adhikari or local municipal ward showing family ties.",
    checked: false,
  },
  {
    id: "chk-5",
    label: "Aadhaar & PAN of Applicant and All Heirs",
    detail: "Self-attested ID proof of widow, sons, and married or unmarried daughters.",
    checked: false,
  },
  {
    id: "chk-6",
    label: "Registered Will or Heir NOC (When Applicable)",
    detail: "Attach registered Book III Will copy, or registered Release Deed if one heir gives up share.",
    checked: false,
  },
];

const FAQS = [
  {
    q: "What stamp paper value is needed for an Uttarakhand Khatauni Virasat affidavit?",
    a: "Most Uttarakhand Tehsils and Revenue Courts accept a Virasat succession affidavit printed on Rs. 10 non-judicial stamp paper or e-Stamp. Some Dehradun and Nainital notary counters use Rs. 20 or Rs. 50 stamp paper when you add an indemnity line.",
  },
  {
    q: "Does the 250 sq. meter Bhu-Kanoon limit block legal heirs from inheriting hill land?",
    a: "No. Section 154(4) of the adapted UPZA&LR Act and the 2025 Bhu-Kanoon rules cap fresh land purchases by non-residents at 250 sq. meters for homes. Lawful inheritance (Virasat) by legal heirs is not a purchase, though your affidavit must clearly declare this distinction.",
  },
  {
    q: "Where do I upload the Uttarakhand Khatauni succession affidavit online?",
    a: "You file your Virasat request online through the Apuni Sarkar portal (eservices.uk.gov.in) under Revenue Department services, or via your Tehsil Revenue Court (Vaad / RCMS) if there is a Will or heir dispute.",
  },
  {
    q: "Is the Hindu Succession Act or UPZA&LR Section 171 used for Uttarakhand Khatauni mutation?",
    a: "Agricultural land recorded as Bhumidhari follows Section 171 of the UPZA&LR Act as adapted by Uttarakhand. Urban plots, houses, and Section 143 converted non-farm land follow the Hindu Succession Act, 1956 or the owner's personal law.",
  },
  {
    q: "How does Uttarakhand Section 130-A affect a wife's name in the Khatauni?",
    a: "Under Uttarakhand Act 14 of 2021 (Section 130-A), a wife must be entered as a joint co-sharer in her husband's ancestral agricultural land during his lifetime. After his death, her existing co-sharer status and widow share are checked by the Lekhpal.",
  },
  {
    q: "What documents must I upload with the affidavit on the Vaad or Apuni Sarkar portal?",
    a: "Upload the notarized Rs. 10 Khatauni affidavit, death certificate, certified Khatauni copy, Parivar Register Nakal (or family tree), Aadhaar cards of all heirs, and any registered Will if one exists.",
  },
  {
    q: "How long does Tehsildar Khatauni mutation take in Dehradun or Nainital?",
    a: "Simple uncontested Virasat (PA-11) entries clear in 15 to 30 days after the Lekhpal report. Contested or Will-based Vaad cases before the Tehsildar require a 35 to 45 day public notice (Ishtehar) and usually finish in 45 to 90 days.",
  },
  {
    q: "Can an heir living outside Uttarakhand or an NRI file Khatauni Virasat remotely?",
    a: "Yes. An heir living in Delhi, Mumbai, or abroad can sign the affidavit before a Notary or Indian Consulate, or execute a Special Power of Attorney so a relative can upload the forms and attend the Tehsildar hearing.",
  },
];

interface HeirRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  status: string;
}

export default function UttarakhandKhatauniClient() {
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
  const [templateLang, setTemplateLang] = useState<"en" | "hi" | "both">("both");
  const [copiedEnglish, setCopiedEnglish] = useState(false);
  const [copiedHindi, setCopiedHindi] = useState(false);
  const [copiedBhuClause, setCopiedBhuClause] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // Interactive Uttarakhand Khatauni & Bhu-Kanoon Builder State
  const [districtName, setDistrictName] = useState<string>("Nainital");
  const [tehsilName, setTehsilName] = useState<string>("Haldwani");
  const [villageName, setVillageName] = useState<string>("Kathgodam / Gram Sabha");
  const [khataNo, setKhataNo] = useState<string>("00142");
  const [khasraNo, setKhasraNo] = useState<string>("418 / 2");
  const [landAreaSqm, setLandAreaSqm] = useState<number>(650);
  const [landType, setLandType] = useState<"bhumidhari" | "sec143_abadi" | "orchard">("bhumidhari");
  const [heirDomicile, setHeirDomicile] = useState<"resident" | "outsider_nri">("outsider_nri");
  const [successionMode, setSuccessionMode] = useState<"intestate" | "will">("intestate");
  const [deceasedName, setDeceasedName] = useState<string>("Late Shri Harish Chandra Joshi");
  const [deathDate, setDeathDate] = useState<string>("18-08-2026");
  const [applicantName, setApplicantName] = useState<string>("Rajesh Joshi");
  const [applicantRelation, setApplicantRelation] = useState<string>("Son");

  const [heirs, setHeirs] = useState<HeirRow[]>([
    {
      id: 1,
      name: "Smt. Kamla Devi Joshi",
      age: "64",
      relation: "Widow (Wife - Sec. 130-A Co-Sharer)",
      status: "Living Class I / Sec. 171 Heir",
    },
    {
      id: 2,
      name: "Shri Rajesh Joshi",
      age: "39",
      relation: "Son",
      status: "Living Heir (Residing Outside UK)",
    },
    {
      id: 3,
      name: "Smt. Meera Pant",
      age: "35",
      relation: "Married Daughter",
      status: "Disclosed Family Member",
    },
  ]);

  const [uploadChecklist, setUploadChecklist] = useState(INITIAL_UPLOAD_CHECKLIST);

  const selectedDistrict =
    UTTARAKHAND_DISTRICTS.find((d) => d.name === districtName) || UTTARAKHAND_DISTRICTS[0];

  const isHillZone = selectedDistrict.zone === "hill";
  const exceeds250 = landAreaSqm > 250;

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Full Name of Heir",
        age: "30",
        relation: "Son / Daughter / Mother",
        status: "Living Heir",
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

  const toggleChecklist = (id: string) => {
    setUploadChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
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

  // Dynamic Guidance Strings
  const portalRouteText =
    successionMode === "will"
      ? "Tehsildar Revenue Court (Vaad / Section 34) with 35 to 45 day Ishtehar notice"
      : "Apuni Sarkar Portal (PA-11 Uncontested Virasat) via Lekhpal / Patwari report";

  const governingStatuteText =
    landType === "sec143_abadi"
      ? "Hindu Succession Act, 1956 (Section 143 Converted / Non-Farm Land)"
      : "UPZA&LR Act, 1950 (Uttarakhand Adapted) Section 171 & Section 130-A";

  const bhuKanoonResultSummary =
    isHillZone && heirDomicile === "outsider_nri" && exceeds250
      ? "Inheritance Allowed: 250 sq.m cap targets fresh purchases, not lawful Virasat. Add the Section 154(4) Inheritance Declaration."
      : isHillZone
      ? "Hill District Rules Apply: Lawful Virasat passes to legal heirs. Future sale to non-residents stays barred under Bhu-Kanoon 2025."
      : "Plain District Rules Apply: Haridwar / US Nagar exempt from the 11-district hill ban. Standard UPZA&LR Section 171 Virasat applies.";

  const heirRowsEnglish = heirs
    .map(
      (h, idx) =>
        `  (${idx + 1}) Name: ${h.name} | Relation: ${h.relation} | Age: ${h.age} yrs | Status: ${h.status}`
    )
    .join("\n");

  const heirRowsHindi = heirs
    .map(
      (h, idx) =>
        `  (${idx + 1}) नाम: ${h.name} | सम्बन्ध: ${h.relation} | आयु: ${h.age} वर्ष | स्थिति: ${h.status}`
    )
    .join("\n");

  const englishAffidavitText = `AFFIDAVIT FOR UTTARAKHAND KHATAUNI SUCCESSION (VIRASAT) MUTATION
(Under Section 34 & Section 171 of UPZA&LR Act, 1950 as adapted by Uttarakhand)
[To be executed on Rs. 10/- Non-Judicial Stamp Paper / Uttarakhand e-Stamp & Notarized]

BEFORE THE TEHSILDAR / REVENUE COURT (VAAD), TEHSIL ${tehsilName.toUpperCase()}, DISTRICT ${districtName.toUpperCase()}, UTTARAKHAND

I, ${applicantName}, ${applicantRelation} of ${deceasedName}, aged about [Age] years, permanently residing at [Full Residential Address, PIN Code], Aadhaar No: [XXXX-XXXX-XXXX], do hereby solemnly affirm and declare on oath as follows:

1. RECORDED KHATAUNI HOLDER & DEMISE:
That ${deceasedName} was the lawful recorded Bhumidhar / tenure-holder of the land bearing Khatauni Khata No. ${khataNo}, Khasra / Gata No. ${khasraNo}, admeasuring ${landAreaSqm} Sq. Meters (approx. [Area in Hectares / Nali]), situated at Village / Gram Sabha ${villageName}, Pargana [Pargana], Tehsil ${tehsilName}, District ${districtName}, Uttarakhand. The said Khatauni holder expired on ${deathDate} at [Place of Death], per Death Certificate No. [Cert. No.].

2. COMPLETE LIST OF SURVIVING LEGAL HEIRS (PARIVAR / VANSHAVALI):
That at the time of death, the deceased left behind ONLY the following legal heirs under ${governingStatuteText}:
${heirRowsEnglish}

3. SECTION 130-A WIFE CO-SHARER & DAUGHTER DISCLOSURE:
That the name of the surviving widow / wife (if living) has been duly disclosed above in compliance with Section 130-A of the UPZA&LR Act (Uttarakhand Amendment Act 14 of 2021). All sons and daughters (married and unmarried) are truly named above with no concealment.

4. BHU-KANOON & 250 SQ. METER HILL LAND CEILING DECLARATION (SECTION 154):
That the instant mutation claim arises purely from lawful inheritance (Virasat) upon the death of a lawful recorded Khatauni tenure-holder, and NOT from any sale deed, benami transfer, or commercial gift prohibited under Section 154 / Section 154(4) of the UPZA&LR Act (Uttarakhand Bhu-Kanoon Amendments, including 2025). The deponent affirms that the deceased held valid prior title in Uttarakhand and that any future transfer or alienation by the heirs shall strictly abide by Uttarakhand Bhu-Kanoon limits.

5. ${
    successionMode === "will"
      ? "TESTAMENTARY SUCCESSION (REGISTERED WILL): That the deceased executed a valid Registered Will dated [Will Date], registered in Book III at SRO [SRO Name], bequeathing the above land as disclosed in the application."
      : "INTESTATE SUCCESSION (NO WILL): That the deceased died intestate without executing any Will. No civil court stay or title suit is pending against this Khata."
  }

6. VERIFICATION:
I, ${applicantName}, verify that the contents of Paragraphs 1 to 5 above are true and correct to my personal knowledge and belief. Nothing material has been concealed. If any statement is found false, the mutation order shall stand void ab initio and I shall be liable under law.

Place: ${tehsilName}, ${districtName}, Uttarakhand
Date: [DD-MM-YYYY]

DEPONENT SIGNATURE: _______________________
Name: ${applicantName}
(Notary Public Seal, Signature & Register Entry No.)`;

  const hindiAffidavitText = `शपथ-पत्र (उत्तराखंड खतौनी वरासत / उत्तराधिकार नामांतरण हेतु)
(उत्तराखंड अनुकूलित उ.प्र. जमींदारी विनाश एवं भूमि व्यवस्था अधिनियम, 1950 की धारा 34 व 171 के अंतर्गत)
[रुपये 10/- के नॉन-ज्यूडिशियल स्टाम्प पेपर / ई-स्टाम्प पर नोटरी द्वारा प्रमाणित कराएं]

समक्ष: श्रीमान तहसीलदार महोदय / राजस्व न्यायालय (वाद), तहसील ${tehsilName}, जिला ${districtName}, उत्तराखंड

मैं, ${applicantName}, ${applicantRelation} स्व. ${deceasedName}, आयु लगभग [आयु] वर्ष, निवासी [पूरा पता], आधार संख्या [XXXX-XXXX-XXXX], सशपथ निम्नलिखित बयान करता/करती हूँ:

1. खातेदार का विवरण एवं देहांत:
यह कि स्व. ${deceasedName} ग्राम / ग्राम सभा ${villageName}, परगना [परगना], तहसील ${tehsilName}, जिला ${districtName}, उत्तराखंड स्थित भूमि खतौनी खाता संख्या ${khataNo}, खसरा / गाटा संख्या ${khasraNo}, रकबा ${landAreaSqm} वर्ग मीटर के वैध दर्ज खातेदार (भूमिधर) थे। उक्त खातेदार का देहांत दिनांक ${deathDate} को [मृत्यु स्थान] में हो चुका है (मृत्यु प्रमाण पत्र सं. [नंबर])।

2. मृतक के समस्त वैध वारिसान (परिवार रजिस्टर / वंशावली):
यह कि मृतक अपने पीछे केवल निम्नलिखित कानूनी वारिस छोड़ गए हैं, जिनके अतिरिक्त कोई अन्य जीवित वारिस नहीं है:
${heirRowsHindi}

3. धारा 130-क (पत्नी सह-खातेदार) एवं पुत्रियों का विवरण:
यह कि उत्तराखंड संशोधन अधिनियम 2021 की धारा 130-क के अनुसार जीवित पत्नी/विधवा तथा सभी पुत्रों व पुत्रियों (विवाहित एवं अविवाहित) के नाम ऊपर पूर्ण सत्यता से अंकित किए गए हैं तथा कोई तथ्य छुपाया नहीं गया है।

4. उत्तराखंड भू-कानून एवं 250 वर्ग मीटर सीमा घोषणा (धारा 154):
यह कि प्रस्तुत नामांतरण आवेदन विशुद्ध रूप से वैध दर्ज खातेदार की मृत्यु उपरांत प्राकृतिक/कानूनी उत्तराधिकार (वरासत) के आधार पर है, न कि धारा 154 / धारा 154(4) (उत्तराखंड भू-कानून संशोधन, 2025 सहित) के अंतर्गत निषिद्ध किसी क्रय-विक्रय या अंतरण के माध्यम से। भविष्य में भूमि के किसी भी विक्रय या अंतरण पर उत्तराखंड भू-कानून के नियम पूर्णतः लागू रहेंगे।

5. वसीयत / निर्वसीयत स्थिति:
${
    successionMode === "will"
      ? "यह कि मृतक द्वारा दिनांक [वसीयत दिनांक] को पंजीकृत वसीयत (रजिस्ट्री बुक-3) निष्पादित की गई थी, जिसकी प्रमाणित प्रति संलग्न है।"
      : "यह कि मृतक ने अपने जीवनकाल में कोई वसीयत नहीं लिखी और इस भूमि पर किसी न्यायालय में कोई वाद विचाराधीन नहीं है।"
  }

6. सत्यापन:
मैं शपथकर्ता प्रमाणित करता/करती हूँ कि पैरा 1 से 5 तक के सभी तथ्य मेरी जानकारी व विश्वास के अनुसार पूर्णतः सत्य हैं और इसमें कुछ भी छुपाया नहीं गया है।

स्थान: ${tehsilName}, ${districtName}, उत्तराखंड
दिनांक: [DD-MM-YYYY]

शपथकर्ता के हस्ताक्षर: _______________________
नाम: ${applicantName}
(नोटरी पब्लिक की मुहर एवं हस्ताक्षर)`;

  const standaloneBhuClause = `BHU-KANOON & 250 SQ. METER HILL LAND CEILING DECLARATION CLAUSE (SECTION 154 UPZA&LR ACT):
"The Deponent solemnly affirms that the deceased recorded Khatauni holder, ${deceasedName}, held valid, undisputed Bhumidhari title over the Schedule Land prior to demise, and that the present mutation request on the Apuni Sarkar / Vaad Portal arises solely from lawful succession (Virasat) under Section 171 of the adapted UPZA&LR Act, 1950 (or personal succession law / registered Will). This succession entry does not constitute a prohibited commercial purchase, sale, or gift beyond the 250 sq. meter residential ceiling under Section 154(4) and the Uttarakhand Bhu-Kanoon Amendment Rules, 2025. All legal heirs undertake that any future sale or land-use change shall remain strictly bound by Uttarakhand revenue permissions."`;

  const checklistCopyText = uploadChecklist
    .map((item, idx) => `${idx + 1}. ${item.label}: ${item.detail}`)
    .join("\n");

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
            <Mountain className="w-3.5 h-3.5 text-[#C65378]" />
            <span>UPZA&amp;LR ACT SEC. 34 &amp; 171 • UTTARAKHAND BHU-KANOON COMPLIANT</span>
          </div>

          {/* Strict H1 Tag (46 chars, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Uttarakhand Khatauni Mutation Affidavit Format
          </h1>

          {/* Subtitle Paragraph (Plain English) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download the editable English and Hindi Khatauni Virasat affidavit format for the
            Uttarakhand Apuni Sarkar and Vaad portals. Includes the 250 sq. meter Bhu-Kanoon hill
            land ceiling clause, Section 130-A wife check, and Tehsil upload list.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#editable-khatauni-affidavit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Khatauni Affidavit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Valid Indian Will</span>
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Uttarakhand Lawyer</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec. 34 &amp; 171</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ADAPTED UPZA&amp;LR VIRASAT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">250 Sq. Meter</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BHU-KANOON HILL CLAUSE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Apuni Sarkar</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VAAD &amp; TEHSIL PORTAL READY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹10 E-Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ENGLISH &amp; HINDI DRAFT
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
                <span>Uttarakhand Revenue Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Follows UPZA&amp;LR Act 1950 ss. 34, 130-A, 154 &amp; 171 (Uttarakhand
                Adaptation), Uttarakhand Bhu-Kanoon 2025, and Hindu Succession Act 1956.
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Instant Virasat Draft</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Fill your district, Khatauni number, and heir names to generate a print-ready ₹10
                stamp affidavit.
              </p>
              <a
                href="#editable-khatauni-affidavit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Affidavit Draft</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/uttarakhand-khatauni-succession-affidavit-format-og.jpg"
                  alt="Uttarakhand Khatauni Succession Affidavit Format and Bhu-Kanoon Guide"
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
                    Uttarakhand Khatauni Virasat Format: Apuni Sarkar, Vaad Portal &amp; 250 Sq.m
                    Bhu-Kanoon Declaration
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF (Uses <div>, never H3 before H2) */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>QUICK BRIEF: UTTARAKHAND KHATAUNI AFFIDAVIT ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>₹10 Stamp Paper:</strong> Print your Virasat sworn draft on a ₹10
                    non-judicial stamp paper or e-Stamp. Sign it before a Notary Public.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>250 Sq. Meter Rule:</strong> Bhu-Kanoon caps fresh land buys by
                    outsiders at 250 sq.m. Lawful inheritance by heirs is protected, but your draft
                    must state this clearly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Wife Co-Sharer Check:</strong> Under Section 130-A (2021 law), a wife
                    holds co-sharer rights in her husband&apos;s ancestral farm land.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Farm vs Abadi Land:</strong> Farm Bhumidhari follows Section 171
                    UPZA&amp;LR Act. Section 143 residential plots follow the Hindu Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Online Portal Filing:</strong> Submit scans via Apuni Sarkar
                    (<code>eservices.uk.gov.in</code>) for simple Virasat, or Tehsil Vaad court for
                    Wills.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY THE SINGLE <h2> ON THE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>UTTARAKHAND REVENUE LAW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Uttarakhand Khatauni &amp; Virasat Law Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a land owner dies in Uttarakhand, their name stays on the village Khatauni
                  (record of rights). Heirs cannot sell the land, take bank crop loans, or split
                  plots until they complete Virasat (succession mutation).
                </p>
                <p>
                  Most online sites copy old Uttar Pradesh drafts and miss Uttarakhand&apos;s strict
                  hill rules. Uttarakhand follows the adapted{" "}
                  <strong>UP Zamindari Abolition and Land Reforms Act, 1950 (UPZA&amp;LR)</strong>,
                  the <strong>2025 Bhu-Kanoon Amendment</strong>, and local Tehsil digital rules.
                </p>
                <p>
                  Under <strong>Section 34</strong>, any heir who gets farm or village land after a
                  death must report the change to the Tehsildar. For simple cases with no Will and
                  no dispute, the village Lekhpal or hill Patwari enters names under{" "}
                  <strong>PA-11</strong>.
                </p>
                <p>
                  If there is a Will, a missing Parivar entry, or a non-resident heir above 250 sq.
                  meters, the clerk opens a <strong>Vaad case</strong> in the Tehsildar court. A
                  clear notarized affidavit prevents clerk objections and saves months of delay.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE KHATAUNI & BHU-KANOON BUILDER */}
            <section id="khatauni-affidavit-builder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE VIRASAT &amp; BHU-KANOON TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Khatauni Draft &amp; Bhu-Kanoon Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your Uttarakhand district, Khatauni numbers, and family heirs below. Our tool
                checks Section 154 hill ceiling rules and fills your English and Hindi affidavit at
                once.
              </p>

              {/* Builder Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* District */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Uttarakhand District</span>
                    </label>
                    <select
                      value={districtName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDistrictName(val);
                        const found = UTTARAKHAND_DISTRICTS.find((d) => d.name === val);
                        if (found) setTehsilName(found.tehsilSample.split(" / ")[0]);
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {UTTARAKHAND_DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.zone === "hill" ? "Hill Rules" : "Plain District"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tehsil */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Tehsil Name
                    </label>
                    <input
                      type="text"
                      value={tehsilName}
                      onChange={(e) => setTehsilName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  {/* Village */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Village / Gram Sabha
                    </label>
                    <input
                      type="text"
                      value={villageName}
                      onChange={(e) => setVillageName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  {/* Land Classification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Land Record Type
                    </label>
                    <select
                      value={landType}
                      onChange={(e) => setLandType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="bhumidhari">Agricultural / Bhumidhari</option>
                      <option value="orchard">Hill Orchard / Horticulture</option>
                      <option value="sec143_abadi">Section 143 Residential / Abadi</option>
                    </select>
                  </div>

                  {/* Heir Domicile */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Heir Domicile Status
                    </label>
                    <select
                      value={heirDomicile}
                      onChange={(e) => setHeirDomicile(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="outsider_nri">Outside-UK / Delhi / NRI Heir</option>
                      <option value="resident">Uttarakhand Resident Family</option>
                    </select>
                  </div>

                  {/* Succession Mode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Succession Basis
                    </label>
                    <select
                      value={successionMode}
                      onChange={(e) => setSuccessionMode(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="intestate">No Will (Intestate Virasat)</option>
                      <option value="will">Registered Will (Testamentary)</option>
                    </select>
                  </div>

                  {/* Khata No */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Khatauni Khata No.
                    </label>
                    <input
                      type="text"
                      value={khataNo}
                      onChange={(e) => setKhataNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  {/* Khasra No */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Khasra / Gata No.
                    </label>
                    <input
                      type="text"
                      value={khasraNo}
                      onChange={(e) => setKhasraNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  {/* Area in Sq.m */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Land Area: {landAreaSqm} Sq.m
                    </label>
                    <input
                      type="range"
                      min={100}
                      max={3000}
                      step={50}
                      value={landAreaSqm}
                      onChange={(e) => setLandAreaSqm(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer mt-2"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                      <span>100 sq.m</span>
                      <span className="text-[#C65378] font-bold">250 sq.m Cap</span>
                      <span>3,000 sq.m</span>
                    </div>
                  </div>
                </div>

                {/* Deceased & Applicant Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Deceased Khatauni Holder
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
                      Relation to Deceased
                    </label>
                    <input
                      type="text"
                      value={applicantRelation}
                      onChange={(e) => setApplicantRelation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Editable Legal Heirs Rows */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Surviving Legal Heirs (Included in Affidavit)</span>
                    </div>
                    <button
                      type="button"
                      onClick={addHeirRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Heir</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {heirs.map((row) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-1 sm:grid-cols-[2fr_0.7fr_1.5fr_1.5fr_auto] gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center"
                      >
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => updateHeirRow(row.id, "name", e.target.value)}
                          placeholder="Full Name"
                          className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                        />
                        <input
                          type="text"
                          value={row.age}
                          onChange={(e) => updateHeirRow(row.id, "age", e.target.value)}
                          placeholder="Age"
                          className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                        />
                        <input
                          type="text"
                          value={row.relation}
                          onChange={(e) => updateHeirRow(row.id, "relation", e.target.value)}
                          placeholder="Relation"
                          className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                        />
                        <input
                          type="text"
                          value={row.status}
                          onChange={(e) => updateHeirRow(row.id, "status", e.target.value)}
                          placeholder="Status"
                          className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => removeHeirRow(row.id)}
                          aria-label="Remove heir row"
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer justify-self-end"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COMPUTATION RESULTS BOX */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        UTTARAKHAND TEHSIL &amp; BHU-KANOON DIAGNOSTIC
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {isHillZone ? "11-District Hill Zone" : "Plain District Zone"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Applicable Filing Route
                      </div>
                      <div className="text-sm sm:text-base font-black text-white mt-1 leading-snug">
                        {portalRouteText}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        District: {districtName} ({tehsilName})
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Stamp Paper &amp; Fee
                      </div>
                      <div className="text-sm sm:text-base font-black text-rose-300 mt-1">
                        ₹10 Stamp + ₹30 Portal Fee
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Zero stamp duty on Will or PA-11 entry.
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Governing Succession Law
                      </div>
                      <div className="text-sm sm:text-base font-black text-emerald-400 mt-1 leading-snug">
                        {governingStatuteText}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {selectedDistrict.note}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white flex items-center gap-1.5">
                      <Mountain className="w-3.5 h-3.5 text-rose-300" />
                      <span>Section 154 Bhu-Kanoon Output ({landAreaSqm} Sq.m):</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">{bhuKanoonResultSummary}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: EDITABLE KHATAUNI AFFIDAVIT FORMAT */}
            <section id="editable-khatauni-affidavit" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Languages className="w-4 h-4" />
                <span>READY-TO-PRINT BILINGUAL AFFIDAVIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Editable Khatauni Affidavit (English &amp; Hindi)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Your details from Section 2 update this sworn draft live. Print the English or
                Hindi version on ₹10 stamp paper, sign before a Notary, and upload the PDF scan to
                the portal.
              </p>

              {/* Language Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "both", label: "Show Both (English & Hindi)" },
                  { id: "en", label: "English Format Only" },
                  { id: "hi", label: "Hindi शपथ-पत्र Only" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTemplateLang(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      templateLang === tab.id
                        ? "bg-[#172228] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* English Box */}
              {(templateLang === "en" || templateLang === "both") && (
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                  <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        UTTARAKHAND KHATAUNI AFFIDAVIT (ENGLISH)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(englishAffidavitText, setCopiedEnglish)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      {copiedEnglish ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied English Draft!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy English Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 sm:p-6 max-h-[520px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                    {englishAffidavitText}
                  </div>
                </div>
              )}

              {/* Hindi Box */}
              {(templateLang === "hi" || templateLang === "both") && (
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                  <div className="bg-[#172228] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Stamp className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        उत्तराखंड खतौनी वरासत शपथ-पत्र (HINDI)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(hindiAffidavitText, setCopiedHindi)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      {copiedHindi ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Hindi Draft Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Hindi शपथ-पत्र</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 sm:p-6 max-h-[520px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                    {hindiAffidavitText}
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 4: BHU-KANOON COMPLIANCE CLAUSE (#1 RANKING MOAT) */}
            <section id="bhu-kanoon-ceiling-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Mountain className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT: HILL LAND CEILING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Bhu-Kanoon 250 Sq.m Hill Land Clause
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most free online templates miss Uttarakhand&apos;s strict hill land cap under{" "}
                  <strong>Section 154(4) of the adapted UPZA&amp;LR Act</strong> and the{" "}
                  <strong>2025 Bhu-Kanoon Amendment</strong>. Outside buyers cannot purchase farm
                  land in 11 hill districts and face a lifetime <strong>250 sq. meter</strong>{" "}
                  limit on residential plots.
                </p>
                <p>
                  Because of this strict cap, Tehsil clerks often pause Virasat files for heirs who
                  now live in Delhi, Mumbai, or abroad. Yet the law makes a clear difference: a sale
                  deed to an outsider is restricted, while{" "}
                  <strong>natural or Will-based inheritance (Virasat) is protected</strong>.
                </p>
                <p>
                  Adding the clause below inside your Khatauni affidavit shows the Tehsildar that
                  your claim is pure legal succession from an existing recorded holder, not a barred
                  sale.
                </p>
              </div>

              {/* Standalone Copyable Bhu-Kanoon Compliance Clause Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bhu-Kanoon Section 154(4) Compliance Clause</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(standaloneBhuClause, setCopiedBhuClause)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedBhuClause ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Clause Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bhu-Kanoon Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800">
                  {standaloneBhuClause}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>11 Hill Districts vs Plain Districts:</strong> The strict farm-purchase ban
                  and 250 sq.m cap apply across Dehradun (rural/hill belts), Nainital, Almora,
                  Tehri, Pauri, Chamoli, Rudraprayag, Uttarkashi, Bageshwar, Pithoragarh, and
                  Champawat. Haridwar and Udham Singh Nagar follow plain rules, though state sanction
                  is needed for large commercial buys.
                </span>
              </div>
            </section>

            {/* SECTION 5: TEHSIL VERIFICATION BOX & VAAD UPLOAD CHECKLIST */}
            <section id="tehsil-verification-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>TEHSIL &amp; PORTAL UPLOAD CHECK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Tehsil Verification &amp; Vaad Upload List
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Check off each document before uploading your Virasat file on Apuni Sarkar or
                submitting hard copies to your Tehsil clerk and village Lekhpal.
              </p>

              {/* Tehsil Verification Interactive Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">
                      Tehsil Verification Box ({uploadChecklist.filter((i) => i.checked).length} /{" "}
                      {uploadChecklist.length} Ready)
                    </div>
                    <div className="text-xs text-slate-500">
                      Scan each paper as a clear PDF under 2 MB for Apuni Sarkar upload.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(checklistCopyText, setCopiedChecklist)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedChecklist ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Checklist Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {uploadChecklist.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleChecklist(item.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-colors flex items-start gap-3 cursor-pointer ${
                        item.checked
                          ? "bg-emerald-50/50 border-emerald-200"
                          : "bg-slate-50/70 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          item.checked
                            ? "bg-emerald-600 text-white"
                            : "bg-white border border-slate-300 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">{item.detail}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: COMPARISON TABLE */}
            <section id="virasat-pathway-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>MUTATION PATHWAYS COMPARED</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. PA-11 Virasat vs Section 34 vs Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Uttarakhand Tehsils handle Khatauni transfers under three clear routes. Pick the one
                that matches your family papers:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Key Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">PA-11 Virasat</th>
                      <th className="py-3.5 px-4">Section 34 Vaad Case</th>
                      <th className="py-3.5 px-4">Registered Will Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">When Used</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        No Will and zero heir fight
                      </td>
                      <td className="py-3 px-4">Old death, missing heir, or objection</td>
                      <td className="py-3 px-4">Deceased left a valid Book III Will</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Deciding Officer</td>
                      <td className="py-3 px-4">Lekhpal / Revenue Inspector (RI)</td>
                      <td className="py-3 px-4">Naib Tehsildar or Tehsildar Court</td>
                      <td className="py-3 px-4">Tehsildar after Ishtehar notice</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Proclamation Wait</td>
                      <td className="py-3 px-4">Spot verification (No court wait)</td>
                      <td className="py-3 px-4 font-semibold text-rose-700">
                        35 to 45 days Ishtehar notice
                      </td>
                      <td className="py-3 px-4 font-semibold text-rose-700">
                        35 to 45 days + Witness proof
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Average Timeline</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">15 to 30 Days</td>
                      <td className="py-3 px-4">45 to 90 Days</td>
                      <td className="py-3 px-4">45 to 75 Days</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Affidavit Needed</td>
                      <td className="py-3 px-4">₹10 Virasat + Parivar Nakal</td>
                      <td className="py-3 px-4">₹10 Affidavit + Vaad Petition</td>
                      <td className="py-3 px-4">₹10 Affidavit + 2 Witness Proof</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: SECTION 171 SUCCESSION ORDER & SECTION 130-A */}
            <section id="section-171-succession-order" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>FARM LAND VS URBAN HOUSE RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Section 171 Heirs, Wife Share &amp; Daughters
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before signing your Khatauni affidavit, check which succession law applies to your
                plot. Farm land and converted town plots follow different rules in Uttarakhand:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Section 130-A</span>
                    <span className="text-[11px] font-bold text-slate-500">2021 UK Amendment</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Wife as Joint Co-Sharer in Ancestral Land
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Uttarakhand Act 14 of 2021, a wife&apos;s name must be entered as a
                    co-sharer in her husband&apos;s ancestral farm Khatauni during his life. Always
                    disclose the widow&apos;s joint status in Paragraph 3.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Section 171</span>
                    <span className="text-[11px] font-bold text-slate-500">Bhumidhari Farms</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Order of Heirs for Agricultural Khatauni
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farm land under Section 171 passes in set priority: widow, male lineal heirs,
                    and unmarried daughters sit ahead of married daughters. Still, name all daughters
                    in the family table so nothing is hidden.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Section 143</span>
                    <span className="text-[11px] font-bold text-slate-500">Abadi &amp; Town Plots</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Hindu Succession Act for Residential Plots
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Once land is converted to non-farm use under Section 143 or sits in city limits,
                    the Hindu Succession Act, 1956 applies. Sons, widows, mothers, and married
                    daughters take equal Class I shares.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Will Override</span>
                    <span className="text-[11px] font-bold text-slate-500">Section 169 UPZA&amp;LR</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    How a Registered Will Simplifies Virasat
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Bhumidhar with transferable rights can pass self-acquired farm land by a valid
                    Will under Section 169. Filing a registered Book III Will avoids bitter co-heir
                    fights in the Tehsil court.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: APUNI SARKAR & VAAD PORTAL SOP */}
            <section id="apuni-sarkar-vaad-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP PORTAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Apuni Sarkar &amp; Vaad Portal Filing Steps
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Download Current Khatauni & Parivar Nakal",
                    desc: "Pull the latest Khatauni extract (Khata, Khasra, area) from Bhulekh UK and get a signed Parivar Register copy from your Gram Panchayat or ward clerk.",
                  },
                  {
                    step: 2,
                    title: "Print & Notarize the ₹10 Khatauni Affidavit",
                    desc: "Customize the draft in Section 3 with all heirs and the Bhu-Kanoon 250 sq.m declaration. Print it on ₹10 stamp paper and sign before a Notary Public.",
                  },
                  {
                    step: 3,
                    title: "Apply Online on Apuni Sarkar (eservices.uk.gov.in)",
                    desc: "Log in to Apuni Sarkar via a CSC center or citizen account. Select Revenue Department, pick Virasat / Mutation, fill Khata details, and upload clear PDF scans.",
                  },
                  {
                    step: 4,
                    title: "Lekhpal / Hill Patwari Spot Inquiry",
                    desc: "The Tehsil sends your application to the area Lekhpal (or Patwari in hill pattis). The officer verifies the family tree with two local residents and uploads a report.",
                  },
                  {
                    step: 5,
                    title: "Ishtehar Proclamation & Tehsildar Order",
                    desc: "For PA-11 Virasat, the Revenue Inspector approves entry directly. For Section 34 Vaad or Will cases, the Tehsildar issues a 35 to 45 day notice before passing the final mutation order.",
                  },
                  {
                    step: 6,
                    title: "Verify Updated Names on Bhulekh Khatauni",
                    desc: "Once the Tehsildar signs the digital order (Amaldaramad), check the updated Khatauni online to confirm every legal heir's name and share.",
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
            </section>

            {/* SECTION 9: REAL CASE STUDIES */}
            <section id="uttarakhand-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>UTTARAKHAND TEHSIL EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Real Cases: Nainital, Dehradun &amp; Almora
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: BHIMTAL, NAINITAL</span>
                    <span className="text-slate-500 font-semibold">Outside-State Son &amp; Orchard</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Clearing a 900 Sq.m Hill Orchard Query for a Delhi Resident Heir
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father left 900 sq.m of ancestral orchard land near Bhimtal. His son lived in
                    Delhi with an outside Aadhaar. The Lekhpal paused the file citing the 250 sq.m
                    Bhu-Kanoon limit. Submitting a revised ₹10 affidavit with the Section 154(4)
                    inheritance clause and Parivar Nakal cleared the Tehsildar Vaad order in 48 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: RAJPUR ROAD, DEHRADUN</span>
                    <span className="text-slate-500 font-semibold">Registered Will &amp; Sec. 143 Plot</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Mutating a Section 143 House Plot Based on a Book III Will
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An army veteran left a registered Will leaving his Dehradun plot to his wife and
                    daughter. Because the plot held Section 143 conversion, the Tehsildar tried the
                    Vaad file after a 40-day Ishtehar notice and witness verification, updating the
                    Khatauni smoothly without civil probate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: RANIKHET, ALMORA</span>
                    <span className="text-slate-500 font-semibold">Section 130-A Widow Entry</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Adding Widow Co-Sharer &amp; NRI Son via Embassy Attestation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When the father died in Almora, the eldest son worked in Canada. The mother signed
                    the Hindi affidavit locally citing Section 130-A co-sharer rights, while the NRI
                    son sent a Consulate-attested PoA. Both names entered the Khatauni together.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; LAWS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Official Uttarakhand Portals &amp; Laws
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>UPZA&amp;LR Act, 1950 (Uttarakhand Adaptation) ss. 34, 130-A, 154 &amp; 171:</strong>{" "}
                    Governs Bhumidhari succession, wife co-sharer rights, 250 sq.m outsider caps, and
                    mutation filings.
                  </li>
                  <li>
                    <strong>Uttarakhand Bhu-Kanoon Amendment Act, 2025:</strong> Tightens hill
                    agricultural land transfers in 11 hill districts while preserving ancestral
                    inheritance.
                  </li>
                  <li>
                    <strong>Hindu Succession Act, 1956 ss. 6 &amp; 8:</strong> Governs urban plots,
                    houses, and Section 143 non-farm land with equal Class I heir rights.
                  </li>
                  <li>
                    <strong>State Digital Land Systems:</strong> Check online Khatauni extracts on{" "}
                    <code>bhulekh.uk.gov.in</code>, apply on <code>eservices.uk.gov.in</code>, and
                    track Vaad court dates via Revenue Court listings.
                  </li>
                </ul>

                {/* Verified 200 OK Official External Links */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://eservices.uk.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>Apuni Sarkar Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://bor.uk.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Board of Revenue UK</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://registration.uk.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Uttarakhand e-Prerna SRO</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://highcourtofuttarakhand.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Uttarakhand High Court</span>
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

                {/* Verified Internal Hub & Spoke Links */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/locations/uttarakhand"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                  >
                    Uttarakhand Will &amp; Land Guide
                  </Link>
                  <Link
                    href="/locations/dehradun"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Dehradun Property Guide
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
                    Legal Heir Assistance
                  </Link>
                  <Link
                    href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All-India Pedigree Affidavit
                  </Link>
                  <Link
                    href="/blogs/difference-between-mutation-dakhil-kharij-and-title-ownership-supreme-court"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Mutation vs Title Law
                  </Link>
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All Legal Templates
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
                11. Frequently Asked Questions: Uttarakhand Virasat
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

            {/* DUAL CONVERSION BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-7 sm:p-10 text-center space-y-4 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider text-rose-200">
                <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                <span>UTTARAKHAND SUCCESSION &amp; MUTATION DESK</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Need Help With Khatauni Virasat or a Will in Uttarakhand?
              </div>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Get an advocate-checked affidavit for Nainital, Dehradun, Almora, or Haridwar
                Tehsils, or draft a registered Will online to save your family from revenue court
                delays.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  Consult Uttarakhand Advocate
                </Link>
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs sm:text-sm transition-transform hover:-translate-y-0.5"
                >
                  Start Your Will Online
                </Link>
              </div>
            </section>

            {/* Plain-English Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will keeps your spouse and kids safe. In Uttarakhand, a signed Will pays
                  zero stamp duty and lets your heirs update land and MDDA records fast.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple ₹10 Stamp Rule</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Print your Khatauni draft on ₹10 stamp paper. Add the 250 sq.m Bhu-Kanoon clause,
                  sign before a Notary, and upload clear scans on Apuni Sarkar.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your Khatauni copy, Parivar Register, and Section 171 heir share.
                  We prepare clean Vaad filings for Nainital, Dehradun, and all hill Tehsils.
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
                Advises families across India and Uttarakhand on Khatauni Virasat, Section 154
                Bhu-Kanoon compliance, and Will registration at AMA Legal Solutions.
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
                  <span>PREVENT KHATAUNI DISPUTES</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Uttarakhand Land With a Valid Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a clear Will in 15 minutes with zero state stamp duty, keeping your hill
                  homes and farm plots safe from long Tehsil fights.
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
                  <span>Lawyer Reviewed &amp; e-Prerna Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Primary Funnel /contact) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>UTTARAKHAND REVENUE DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need Uttarakhand Tehsil or Vaad Court Help?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers help resident and NRI heirs handle Lekhpal inquiries, 250 sq.m
                  objections, and Khatauni Virasat in Dehradun, Nainital, and Almora.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Book Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Heirs Use Our Format
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bhu-Kanoon Ready:</strong> Cites Section 154(4) &amp; 250 sq.m rule.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dual Script:</strong> Live English and Hindi शपथ-पत्र drafts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 130-A:</strong> Protects widow co-sharer entries.
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
          href="#editable-khatauni-affidavit"
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
          <span>Talk to Lawyer</span>
        </Link>
      </div>
    </div>
  );
}
