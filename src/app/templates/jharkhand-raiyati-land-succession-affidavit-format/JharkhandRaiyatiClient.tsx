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
  Gavel,
} from "lucide-react";

// Table of Contents Items (<= 70 chars, 0 em-dashes, exact matching IDs)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Raiyati Land & CNT Act Rules" },
  { id: "interactive-cnt-checker", label: "2. Free CNT/SPT & Draft Tool" },
  { id: "cnt-affidavit-template", label: "3. CNT/SPT Heir Affidavit Format" },
  { id: "cnt-vs-spt-matrix", label: "4. CNT Sec 46 vs SPT Sec 20 Table" },
  { id: "panji-2-correction-notice", label: "5. Panji-2 Correction Notice Draft" },
  { id: "circle-office-checklist", label: "6. Circle Office Check List" },
  { id: "dclr-appeal-roadmap", label: "7. CO to DCLR Appeal Roadmap" },
  { id: "dual-conversion-options", label: "8. Will vs Revenue Retainer" },
  { id: "jharkhand-case-studies", label: "9. Real Cases: Ranchi & Dhanbad" },
  { id: "statutory-citations", label: "10. Official Portals & Laws" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
];

const JHARKHAND_DIVISIONS: Record<
  "south_chotanagpur" | "north_chotanagpur" | "kolhan" | "palamau" | "santhal_pargana",
  {
    label: string;
    districts: string[];
    primaryAct: string;
    sectionCite: string;
    summary: string;
  }
> = {
  south_chotanagpur: {
    label: "South Chotanagpur (Ranchi, Gumla, Khunti)",
    districts: ["Ranchi", "Khunti", "Gumla", "Lohardaga", "Simdega"],
    primaryAct: "Chota Nagpur Tenancy Act, 1908 (CNT Act)",
    sectionCite: "Section 46 & Section 71A CNT Act",
    summary:
      "Applies across Ranchi Circle Offices such as Kanke, Namkum, Ormanjhi, and Nagri. ST, SC, and BC Raiyati lands follow strict Section 46 rules.",
  },
  north_chotanagpur: {
    label: "North Chotanagpur (Dhanbad, Bokaro, Hazaribagh)",
    districts: ["Dhanbad", "Bokaro", "Hazaribagh", "Giridih", "Ramgarh", "Chatra", "Koderma"],
    primaryAct: "Chota Nagpur Tenancy Act, 1908 (CNT Act)",
    sectionCite: "Section 46 CNT Act & Mutation Rules",
    summary:
      "Covers Dhanbad, Chas, and Hazaribagh Circle Offices. Non-tribal freehold plots mutate under standard rules, while ST/SC/BC plots need Section 46 proof.",
  },
  kolhan: {
    label: "Kolhan (East Singhbhum / Jamshedpur, Seraikela)",
    districts: ["East Singhbhum", "West Singhbhum", "Seraikela-Kharsawan"],
    primaryAct: "Chota Nagpur Tenancy Act, 1908 & Wilkinson Rules",
    sectionCite: "Section 46 CNT Act",
    summary:
      "Covers Jamshedpur rural blocks, Chaibasa, and Seraikela. Tribal succession also checks traditional Ho and Munda customs recorded in the Khatiyan.",
  },
  palamau: {
    label: "Palamau (Daltonganj, Garhwa, Latehar)",
    districts: ["Palamau", "Garhwa", "Latehar"],
    primaryAct: "Chota Nagpur Tenancy Act, 1908 (CNT Act)",
    sectionCite: "Section 46 CNT Act",
    summary:
      "Applies across Palamau, Garhwa, and Latehar blocks. Online Jharbhoomi Dakhil-Kharij checks Panji-2 records before issuing any rent receipt.",
  },
  santhal_pargana: {
    label: "Santhal Pargana (Deoghar, Dumka, Jamtara)",
    districts: ["Deoghar", "Dumka", "Jamtara", "Godda", "Sahibganj", "Pakur"],
    primaryAct: "Santhal Parganas Tenancy Act, 1949 (SPT Act)",
    sectionCite: "Section 20 & Section 42 SPT Act",
    summary:
      "Follows strict Section 20 SPT non-transferability rules. Agricultural Raiyati holdings in Deoghar and Dumka cannot be willed or sold to outsiders.",
  },
};

const RAIYAT_CATEGORIES: Record<
  "non_tribal" | "scheduled_tribe" | "sc_bc",
  {
    label: string;
    statuteRule: string;
    dcPermission: string;
    riskStatus: string;
    clauseSummary: string;
  }
> = {
  non_tribal: {
    label: "Non-Tribal Raiyat (General / Unreserved)",
    statuteRule: "Bihar Land Mutation Act, 2011 (Jharkhand) & HSA 1956",
    dcPermission: "No DC Permission Needed",
    riskStatus: "Standard Jharbhoomi Check",
    clauseSummary:
      "Neither the late Raiyat nor the legal heirs belong to a Scheduled Tribe, Scheduled Caste, or Backward Class restricted under CNT Act Section 46.",
  },
  scheduled_tribe: {
    label: "Scheduled Tribe (ST) Raiyat",
    statuteRule: "CNT Act s. 46 / SPT Act s. 20 + Customary Law",
    dcPermission: "Not Needed for Direct Bloodline Heirs",
    riskStatus: "Strict Circle Officer Scrutiny",
    clauseSummary:
      "Direct bloodline succession after death is not a voluntary sale or gift. Still, the file must confirm same-community heirship and zero non-tribal alienation.",
  },
  sc_bc: {
    label: "Scheduled Caste (SC) / Backward Class (BC-I)",
    statuteRule: "CNT Act s. 46(1)(b) (Same District Rule)",
    dcPermission: "Not Needed for Direct Bloodline Heirs",
    riskStatus: "District Residence Check",
    clauseSummary:
      "Direct succession passes to natural legal heirs. Any voluntary transfer by Will or sale outside the statutory district rule triggers Section 46 review.",
  },
};

const FAQS = [
  {
    q: "Why did the Ranchi Circle Officer reject my Raiyati land mutation under the CNT Act?",
    a: "Circle Officers often reject Jharbhoomi files when the sworn paper does not state the late owner's caste status under Section 46 of the Chota Nagpur Tenancy Act, 1908. Files also fail if Khata, Plot, or Panji-2 page numbers are missing.",
  },
  {
    q: "Does Section 46 of the CNT Act block normal inheritance by legal heirs?",
    a: "No. Section 46 stops voluntary transfers like sales, gifts, or leases of ST, SC, or BC land without Deputy Commissioner consent. Natural bloodline inheritance after a parent's death is not a transfer and does not need DC permission.",
  },
  {
    q: "Can tribal Raiyati land in Jharkhand be given to a non-tribal by Will?",
    a: "No. Under Section 46 of the CNT Act and Section 20 of the Santhal Parganas Tenancy Act, 1949, giving tribal Raiyati land to a non-tribal by sale, gift, or Will is void. Under Section 71A of the CNT Act, the Deputy Commissioner can take the land back.",
  },
  {
    q: "What stamp paper value is needed for a Jharkhand Raiyati heir affidavit?",
    a: "Under Article 4 of the Indian Stamp Act in Jharkhand, a general non-judicial affidavit uses Rs. 20 or Rs. 50 e-stamp paper. Many Ranchi and Dhanbad Circle Offices prefer Rs. 50 or Rs. 100 e-stamp paper signed before a Notary Public.",
  },
  {
    q: "How do I fix a wrong or missing Panji-2 record before Jharbhoomi mutation?",
    a: "When your ancestor's Khata number, Plot number, or land area (rakba) is wrong on Jharbhoomi Register-II (Panji-2), send a Panji-2 Correction Notice to the Circle Officer. Also file on the Jharkhand Parishodhan portal with old Khatiyan and Laggan rent receipts to get a Shudhi Patra.",
  },
  {
    q: "What is the time limit to appeal a Circle Officer mutation rejection in Jharkhand?",
    a: "Under Jharkhand mutation rules, you must file a Mutation Appeal before the Deputy Collector Land Reforms (DCLR) within 30 days of the Circle Officer's order. If you miss 30 days, add a delay condonation request with clear proof.",
  },
  {
    q: "Are married daughters included in the Jharkhand Vanshavali and heir affidavit?",
    a: "Yes for non-tribal Hindu families under the Hindu Succession Act, 1956. Married daughters hold equal Class I shares under Vineeta Sharma (2020) and must appear in the Vanshavali. For Scheduled Tribe families, inheritance follows recorded tribal custom.",
  },
];

interface VanshavaliRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  status: "Living" | "Married & Living" | "Predeceased" | "Minor";
  shareBasis: string;
}

export default function JharkhandRaiyatiClient() {
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
  const [copiedSec46Clause, setCopiedSec46Clause] = useState(false);
  const [copiedPanjiNotice, setCopiedPanjiNotice] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // Interactive Jharkhand Builder State
  const [division, setDivision] = useState<
    "south_chotanagpur" | "north_chotanagpur" | "kolhan" | "palamau" | "santhal_pargana"
  >("south_chotanagpur");
  const [district, setDistrict] = useState<string>("Ranchi");
  const [anchal, setAnchal] = useState<string>("Kanke");
  const [mauza, setMauza] = useState<string>("Boreya");
  const [khataNo, setKhataNo] = useState<string>("142");
  const [plotNo, setPlotNo] = useState<string>("518, 519");
  const [areaDecimal, setAreaDecimal] = useState<string>("0.45 Acres (45 Decimals)");
  const [panjiVolPage, setPanjiVolPage] = useState<string>("Vol. 04, Page 112");
  const [raiyatCategory, setRaiyatCategory] = useState<
    "non_tribal" | "scheduled_tribe" | "sc_bc"
  >("non_tribal");
  const [transferMode, setTransferMode] = useState<"intestate" | "will" | "panji_error">(
    "intestate"
  );
  const [lateRaiyatName, setLateRaiyatName] = useState<string>("Late Ramnath Mahto");
  const [deathDate, setDeathDate] = useState<string>("18-06-2026");
  const [applicantName, setApplicantName] = useState<string>("Suresh Kumar Mahto");

  const [heirs, setHeirs] = useState<VanshavaliRow[]>([
    {
      id: 1,
      name: "Smt. Sushila Devi",
      age: "63",
      relation: "Spouse (Widow)",
      status: "Living",
      shareBasis: "Class I Equal Share",
    },
    {
      id: 2,
      name: "Sri Suresh Kumar Mahto",
      age: "39",
      relation: "Son",
      status: "Living",
      shareBasis: "Class I Equal Share",
    },
    {
      id: 3,
      name: "Smt. Sunita Kumari",
      age: "35",
      relation: "Daughter",
      status: "Married & Living",
      shareBasis: "Equal Coparcener (HSA s. 6)",
    },
  ]);

  const currentDivision = JHARKHAND_DIVISIONS[division];
  const currentCategory = RAIYAT_CATEGORIES[raiyatCategory];

  useEffect(() => {
    setDistrict(JHARKHAND_DIVISIONS[division].districts[0]);
  }, [division]);

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Full Name of Heir",
        age: "32",
        relation: "Son / Daughter / Mother",
        status: "Living",
        shareBasis: "Legal Heir Share",
      },
    ]);
  };

  const updateHeirRow = (id: number, field: keyof VanshavaliRow, value: string) => {
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

  const vanshavaliLines = heirs
    .map(
      (h, idx) =>
        `${idx + 1}. ${h.name} | Age: ${h.age} | Relation: ${h.relation} | Status: ${h.status} | Basis: ${h.shareBasis}`
    )
    .join("\n");

  const cntCompliancePara =
    division === "santhal_pargana"
      ? `3. SANTHAL PARGANAS TENANCY ACT, 1949 (SECTION 20) COMPLIANCE:\nThat the above-described land is situated in ${district} District under the Santhal Parganas Tenancy Act, 1949. ${
          raiyatCategory === "non_tribal"
            ? "Neither the recorded Raiyat nor the legal heirs belong to an aboriginal Scheduled Tribe barred under Section 20. The mutation is strictly by natural intestate succession among lawful Class I heirs, with no sale, gift, or prohibited transfer."
            : "The recorded Raiyat and the natural legal heirs listed in Paragraph 4 belong to the same Scheduled Tribe / local community and claim strictly by natural bloodline inheritance under recorded tribal custom, without any illegal transfer or alienation to a non-tribal person under Section 20 or Section 42 of the SPT Act."
        }`
      : `3. CHOTA NAGPUR TENANCY ACT, 1908 (SECTION 46 & 71A) COMPLIANCE:\nThat the land falls within ${district} District under ${currentDivision.primaryAct}. ${
          raiyatCategory === "non_tribal"
            ? "That the recorded Raiyat (${lateRaiyatName}) and all legal heirs belong to a Non-Tribal / General category NOT attracting the transfer restrictions of Section 46(1)(a) or (b) of the CNT Act, 1908. The land is free from any tribal restoration claim under Section 71A."
            : "That the recorded Raiyat (${lateRaiyatName}) belonged to a ${currentCategory.label} family, and the applicants are direct natural bloodline legal heirs within the same community and same police-station / district area. This mutation is strictly by natural inheritance upon death and is NOT a voluntary sale, gift, lease, or transfer requiring prior sanction of the Deputy Commissioner under Section 46 of the CNT Act, 1908."
        }`;

  const affidavitDraftText = `AFFIDAVIT FOR JHARKHAND RAIYATI LAND SUCCESSION MUTATION (DAKHIL-KHARIJ)
(Compliant with CNT Act, 1908 s. 46 / SPT Act, 1949 s. 20 & Jharbhoomi Mutation Rules)
[To be printed on Rs. 50/- Jharkhand Non-Judicial e-Stamp Paper]

BEFORE THE CIRCLE OFFICER (ANCHAL ADHIKARI), ${anchal.toUpperCase()} CIRCLE
DISTRICT: ${district.toUpperCase()}, STATE OF JHARKHAND

I, ${applicantName}, aged about [Age] years, son/daughter/spouse of [Parent/Spouse Name], resident of Village/Locality [Address], P.O. [Post Office], P.S. [Police Station], Anchal ${anchal}, District ${district}, Jharkhand (PIN: [834XXX]), Aadhaar No: [XXXX-XXXX-XXXX], do hereby solemnly affirm and declare on oath as follows:

1. RECORDED RAIYAT & LAND SCHEDULE (KHATIYAN & PANJI-2):
That ${lateRaiyatName}, son/daughter/spouse of [Parent Name], was the lawful recorded Raiyat in continuous peaceful possession of the Raiyati land detailed below, recorded in Khatiyan and Register-II (Panji-2):
- District: ${district} | Anchal (Circle): ${anchal} | Mauza: ${mauza} | Thana No: [Thana No.]
- Khata No: ${khataNo} | Plot (Khesra) No: ${plotNo} | Total Area (Rakba): ${areaDecimal}
- Jamabandi / Panji-2 Reference: ${panjiVolPage} | Last Laggan Receipt No: [Receipt No. & Year]

2. DEMISE OF RECORDED RAIYAT:
That the said ${lateRaiyatName} passed away intestate (without leaving any contrary transfer deed) on ${deathDate} at [Place of Death], as evidenced by Death Certificate No. [Reg. No.] dated [Date] issued by [Competent Authority].

${cntCompliancePara}

4. COMPLETE VANSHAVALI (FAMILY TREE) OF SURVIVING LEGAL HEIRS:
That upon the death of ${lateRaiyatName}, the following persons are the ONLY surviving lawful heirs entitled to succeed and get their names mutated jointly in Panji-2 (Register-II) on the Jharbhoomi portal:
${vanshavaliLines}

5. NEGATIVE DECLARATION & NON-ENCUMBRANCE:
That apart from the heirs named in Paragraph 4, the deceased Raiyat left behind no other spouse, son, married or unmarried daughter, adopted child, or predeceased child's branch. The scheduled land is free from any pending civil suit, attachment, Benami claim, or illegal sale agreement.

6. PURPOSE & BNS PENAL UNDERTAKING:
This affidavit is submitted before the Circle Officer, ${anchal}, and Halka Karamchari for online Varsi Dakhil-Kharij (Succession Mutation) on Jharbhoomi. I understand that any false caste declaration or omission of a legal heir attracts prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita (BNS), 2023 and renders the mutation void.

Place: ${anchal}, ${district}, Jharkhand
Date: [DD-MM-YYYY]

DEPONENT SIGNATURE: _______________________
Name: ${applicantName}

VERIFICATION & NOTARY / EXECUTIVE MAGISTRATE ATTESTATION:
Verified before me on this [Day] day of [Month], [Year] by ${applicantName}, identified by Aadhaar No. [XXXX-XXXX-XXXX] and two local witnesses.
Notary Public / Executive Magistrate Seal & Reg. No.: _______________________`;

  const sec46ClauseText = `MANDATORY CNT ACT SECTION 46 NON-ALIENATION CLAUSE (FOR JHARBHOOMI MUTATION):
"It is solemnly declared that the land under Khata No. ${khataNo}, Plot No. ${plotNo}, Mauza ${mauza}, Anchal ${anchal}, District ${district} is claimed strictly through natural bloodline succession following the demise of the recorded Raiyat on ${deathDate}. No part of this mutation arises out of any sale, gift, mortgage, benami agreement, or testamentary transfer to a non-tribal or ineligible transferee in violation of Section 46 of the Chota Nagpur Tenancy Act, 1908 or Section 20 of the Santhal Parganas Tenancy Act, 1949. No prior Deputy Commissioner permission is required for direct intestate inheritance among natural legal heirs."`;

  const panjiNoticeText = `APPLICATION / NOTICE FOR PANJI-2 (REGISTER-II) CORRECTION & SHUDHI PATRA
(Filed Before Circle Officer & Parishodhan Portal, Department of Revenue, Jharkhand)

To,
The Circle Officer (Anchal Adhikari),
${anchal} Circle Office, District ${district}, Jharkhand.

Subject: Application for Rectification of Digitized Panji-2 (Register-II) & Issuance of Shudhi Patra prior to Succession Mutation (Mauza: ${mauza}, Khata No: ${khataNo}, Plot No: ${plotNo})

Sir / Madam,

Respectfully, I ${applicantName}, legal heir of ${lateRaiyatName}, submit that our ancestral Raiyati land measuring ${areaDecimal} under Khata No. ${khataNo}, Plot No. ${plotNo}, Mauza ${mauza}, Halka No. [Halka No.], was lawfully recorded in physical Register-II (Panji-2) at ${panjiVolPage}.

While applying for online succession Dakhil-Kharij on the Jharbhoomi portal, the digitized Panji-2 entry shows the following clerical / digitization error:
[Pick applicable error: (a) Recorded Raiyat name misspelled / missing online; (b) Rakba / Plot area mismatched against Khatiyan; (c) Old Laggan rent receipt online ledger shows 'Zero' or 'Suspended'; (d) Khata / Plot number omitted in online Register-II.]

Enclosed Documents for Verification with Physical Panji-2 & Halka Karamchari Register:
1. Certified copy of Khatiyan (Record of Rights) for Mauza ${mauza}, Thana No. [Thana No.].
2. Photocopy of physical Register-II (Panji-2) page (${panjiVolPage}) and old Laggan Rent Receipts.
3. Death Certificate of ${lateRaiyatName} (Died: ${deathDate}) & Vanshavali attested by Mukhiya / Ward Councillor.
4. Sworn CNT/SPT Act Section 46 Legal Heir Affidavit on Rs. 50/- Jharkhand e-Stamp Paper.

PRAYER:
Kindly direct the Halka Karamchari and Circle Inspector to verify the physical Register-II ledger, rectify the online Jharbhoomi Panji-2 entry via the Parishodhan system, and issue a Correction Slip (Shudhi Patra) so our succession mutation can proceed without rejection.

Yours faithfully,
Signature: _______________________
Name: ${applicantName}
Date: [DD-MM-YYYY] | Parishodhan Acknowledgement No: [If filed online]`;

  const circleChecklistText = `RANCHI & JHARKHAND CIRCLE OFFICE MUTATION CHECKLIST (10 ITEMS):
1. Sworn Legal Heir & CNT/SPT Act Section 46 Affidavit on Rs. 50 Jharkhand e-Stamp paper (Notarized).
2. Certified copy of R.S. / C.S. Khatiyan showing recorded Raiyat name, Khata, Plot, and Caste column.
3. Latest Panji-2 (Register-II) extract and updated Laggan (Land Revenue) Rent Receipt.
4. Death Certificate of recorded Raiyat issued by local Panchayat / Municipality.
5. Vanshavali (Family Tree) attested by Gram Panchayat Mukhiya, Ward Councillor, and Halka Karamchari.
6. Self-attested Aadhaar and PAN cards of applicant and all living legal heirs (including married daughters).
7. Consent / No-Objection statement from co-sharers (if applying in single name instead of joint mutation).
8. Registered Sale Deed / Partition Deed / Registered Will (only if claiming via instrument instead of intestacy).
9. Parishodhan Correction Slip (Shudhi Patra) if online Panji-2 had spelling or rakba discrepancies.
10. Jharbhoomi online Dakhil-Kharij acknowledgement receipt & Case Number printout.`;

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  // Dynamic risk evaluation
  let dcRuleDisplay = currentCategory.dcPermission;
  let riskBadgeText = currentCategory.riskStatus;
  let filingAdvice =
    "Submit your online Dakhil-Kharij application on Jharbhoomi with the Section 46 declaration, certified Khatiyan, and Karamchari-verified Vanshavali.";

  if (transferMode === "will" && raiyatCategory !== "non_tribal") {
    dcRuleDisplay =
      division === "santhal_pargana"
        ? "Strictly Barred Under SPT Act s. 20"
        : "High Scrutiny / DC Sanction Risk";
    riskBadgeText = "High Rejection Risk";
    filingAdvice =
      "Attempting to pass ST/SC Raiyati land by Will to an outsider or non-heir violates Section 46 CNT / Section 20 SPT. Consult a revenue lawyer before filing.";
  } else if (transferMode === "panji_error") {
    dcRuleDisplay = "Fix Panji-2 First via Parishodhan";
    riskBadgeText = "Pre-Mutation Hold";
    filingAdvice =
      "Do not file online mutation while online Panji-2 shows wrong Khata or area. Serve the Panji-2 Correction Notice below to get a Shudhi Patra first.";
  }

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
            <span>CNT ACT, 1908 S. 46 • SPT ACT, 1949 S. 20 • JHARKHAND MUTATION RULES</span>
          </div>

          {/* Strict Single H1 Tag (50 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Jharkhand Raiyati Land Succession Affidavit Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Did the Circle Officer reject your Jharbhoomi mutation citing the CNT Act? Download our
            free Section 46 compliant heir affidavit, Panji-2 correction notice, and 30-day DCLR
            appeal roadmap.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cnt-affidavit-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get CNT Affidavit Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Jharkhand Will</span>
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Book Revenue Retainer</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 46</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CNT ACT TRIBAL CHECK
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Panji-2</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                REGISTER-II LEDGER SYNC
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DCLR APPEAL WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹50 Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                JHARKHAND E-STAMP DRAFT
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
                <span>State Tenancy Laws</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built for Jharbhoomi online mutation, CNT Act 1908 s. 46 &amp; s. 71A, SPT Act 1949
                s. 20, and Jharkhand Mutation Rules.
              </p>
            </div>

            {/* Quick Start Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Circle Office Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Fill your Khata, Plot, and Vanshavali below, then copy the affidavit and Panji-2
                notice for your Anchal filing.
              </p>
              <a
                href="#cnt-affidavit-template"
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
                  src="/images/jharkhand-raiyati-land-succession-affidavit-format-og.jpg"
                  alt="Jharkhand Raiyati Land Heir Affidavit Format and CNT Act Guide"
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
                    Jharkhand Raiyati Land Heir Affidavit: Section 46 CNT Act, Panji-2 Correction
                    &amp; Jharbhoomi Mutation Guide
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: JHARKHAND RAIYATI MUTATION ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fix CNT Act Objections:</strong> Ranchi Circle Officers reject online
                    files that skip caste status and Section 46 CNT Act declarations.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Inheritance Is Not a Sale:</strong> Natural bloodline succession after
                    death does not need prior Deputy Commissioner consent under Section 46.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Match Panji-2 Before Applying:</strong> If Jharbhoomi Register-II has
                    wrong area or missing names, file a Panji-2 correction notice first.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>E-Stamp &amp; Vanshavali:</strong> Print your sworn draft on Rs. 50
                    Jharkhand e-stamp paper and attach a Mukhiya-verified family tree.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>30-Day DCLR Appeal:</strong> If the Circle Officer rejects your claim,
                    file a Mutation Appeal before the DCLR within 30 days.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE MAIN H2 <= 70 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>TENANCY &amp; MUTATION LAW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Raiyati Land Succession &amp; CNT Act Section 46
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Jharkhand, <strong>Raiyati land</strong> means land held by a recognized tenant
                  or cultivator called a <em>Raiyat</em>. When that Raiyat passes away, legal heirs
                  must update the revenue records through succession mutation, known locally as{" "}
                  <strong>Varsi Dakhil-Kharij</strong>.
                </p>
                <p>
                  Many families in Ranchi, Dhanbad, and Jamshedpur get rejection notices on the{" "}
                  <strong>Jharbhoomi portal</strong>. Most standard online affidavit drafts do not
                  address <strong>Section 46 of the Chota Nagpur Tenancy (CNT) Act, 1908</strong> or{" "}
                  <strong>Section 20 of the Santhal Parganas Tenancy (SPT) Act, 1949</strong>.
                </p>
                <p>
                  Section 46 of the CNT Act restricts voluntary transfers such as sales, gifts, or
                  mortgages of Scheduled Tribe (ST), Scheduled Caste (SC), and Backward Class (BC)
                  Raiyati land without Deputy Commissioner consent. However, natural bloodline
                  inheritance upon the death of a Raiyat is not a voluntary transfer.
                </p>
                <p>
                  To pass Circle Officer scrutiny under the Jharkhand Mutation Rules (adapted from
                  the <strong>Bihar Land Mutation Act, 2011</strong>), your affidavit must state
                  the Khatiyan caste column, confirm natural succession, list all living heirs in a{" "}
                  <em>Vanshavali</em>, and match the live <strong>Panji-2 (Register-II)</strong>{" "}
                  record.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE JHARKHAND CNT/SPT & AFFIDAVIT BUILDER */}
            <section id="interactive-cnt-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE MUTATION &amp; DRAFT TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Jharkhand CNT/SPT &amp; Affidavit Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your Jharkhand division, Raiyat community category, and land details below.
                The tool checks your CNT or SPT rules and updates your copy-ready affidavit and
                Panji-2 notice right away.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Row 1: Division, Raiyat Category, Application Mode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Jharkhand Division</span>
                    </label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(JHARKHAND_DIVISIONS).map(([key, cfg]) => (
                        <option key={key} value={key}>
                          {cfg.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Raiyat Category</span>
                    </label>
                    <select
                      value={raiyatCategory}
                      onChange={(e) => setRaiyatCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(RAIYAT_CATEGORIES).map(([key, cat]) => (
                        <option key={key} value={key}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Claim Basis</span>
                    </label>
                    <select
                      value={transferMode}
                      onChange={(e) => setTransferMode(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="intestate">Natural Legal Heirs (No Will)</option>
                      <option value="will">Testamentary Will Claim</option>
                      <option value="panji_error">Panji-2 Missing / Error Online</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: District, Anchal, Mauza */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      District Name
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {currentDivision.districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Circle Office (Anchal)
                    </label>
                    <input
                      type="text"
                      value={anchal}
                      onChange={(e) => setAnchal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Kanke / Namkum / Jharia"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Mauza / Village Name
                    </label>
                    <input
                      type="text"
                      value={mauza}
                      onChange={(e) => setMauza(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 3: Khata, Plot, Area, Panji-2 */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Khata No.
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
                      Plot (Khesra) No.
                    </label>
                    <input
                      type="text"
                      value={plotNo}
                      onChange={(e) => setPlotNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Area (Rakba)
                    </label>
                    <input
                      type="text"
                      value={areaDecimal}
                      onChange={(e) => setAreaDecimal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Panji-2 Vol &amp; Page
                    </label>
                    <input
                      type="text"
                      value={panjiVolPage}
                      onChange={(e) => setPanjiVolPage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 4: Recorded Raiyat & Applicant */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Late Recorded Raiyat
                    </label>
                    <input
                      type="text"
                      value={lateRaiyatName}
                      onChange={(e) => setLateRaiyatName(e.target.value)}
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

                {/* Editable Vanshavali Rows */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Vanshavali Family Heirs ({heirs.length})</span>
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
                        JHARKHAND TENANCY &amp; MUTATION ASSESSMENT ({district.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {riskBadgeText}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Governing Act
                      </div>
                      <div className="text-sm sm:text-base font-black text-white mt-1">
                        {currentDivision.sectionCite}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {currentDivision.primaryAct}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        DC Permission Status
                      </div>
                      <div className="text-sm sm:text-base font-black text-rose-300 mt-1">
                        {dcRuleDisplay}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {currentCategory.statuteRule}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        E-Stamp &amp; Appeal Rule
                      </div>
                      <div className="text-sm sm:text-base font-black text-emerald-400 mt-1">
                        ₹50 Stamp | 30-Day DCLR
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        SHCIL / Jharnibandhan e-Stamp
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white">Circle Office Guidance:</div>
                    <p className="leading-relaxed text-[11px]">
                      {filingAdvice} {currentDivision.summary}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: CNT/SPT ACT COMPLIANT AFFIDAVIT FORMAT */}
            <section id="cnt-affidavit-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MANDATORY UNIQUE ASSET</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. CNT/SPT Compliant Heir Affidavit Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy this Circle Office affidavit format. It includes your Khata, Plot, and Panji-2
                data alongside a dedicated Section 46 CNT Act or Section 20 SPT Act declaration.
              </p>

              {/* Main Affidavit Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      JHARKHAND RAIYATI SUCCESSION AFFIDAVIT (READY DRAFT)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(affidavitDraftText, setCopiedAffidavit)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedAffidavit ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Affidavit Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Affidavit Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[580px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {affidavitDraftText}
                </div>
                <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <span>
                    Print on ₹50 Jharkhand e-Stamp paper and sign before Notary / Executive
                    Magistrate
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(affidavitDraftText, setCopiedAffidavit)}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>

              {/* Standalone Section 46 Non-Alienation Clause Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>STANDALONE SECTION 46 / 20 NON-ALIENATION CLAUSE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(sec46ClauseText, setCopiedSec46Clause)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedSec46Clause ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Clause Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Sec 46 Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {sec46ClauseText}
                </div>
              </div>
            </section>

            {/* SECTION 4: CNT ACT VS SPT ACT COMPARISON TABLE */}
            <section id="cnt-vs-spt-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>REGIONAL TENANCY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. CNT Act Section 46 vs SPT Act Section 20
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Jharkhand enforces two distinct tenancy laws depending on your division. Check how
                inheritance, Will transfers, and Circle Officer checks differ across both statutes:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Legal Rule</th>
                      <th className="py-3.5 px-4 text-[#C65378]">CNT Act 1908 (Sec 46)</th>
                      <th className="py-3.5 px-4">SPT Act 1949 (Sec 20)</th>
                      <th className="py-3.5 px-4">Non-Tribal Freehold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Applicable Divisions</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        North/South Chotanagpur, Kolhan, Palamau
                      </td>
                      <td className="py-3 px-4">
                        Santhal Pargana (Deoghar, Dumka, Jamtara, Godda)
                      </td>
                      <td className="py-3 px-4">All 24 districts (Urban / Non-restricted)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Natural Heir Succession</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Allowed without DC consent
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Allowed by tribal custom / heirs
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Standard Hindu / personal law
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Will to Non-Tribal</td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Void if ST/SC land alienated
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Strictly barred by Sec 20(1)
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Fully valid without DC order
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">DC Prior Permission</td>
                      <td className="py-3 px-4">
                        Needed for ST-to-ST sale (same police station)
                      </td>
                      <td className="py-3 px-4">Not open to outside commercial sales</td>
                      <td className="py-3 px-4">Not required</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Illegal Transfer Remedy</td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Section 71A restoration by DC
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Section 42 eviction by DC
                      </td>
                      <td className="py-3 px-4">Civil suit or DCLR mutation appeal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: PANJI-2 CORRECTION NOTICE DRAFT */}
            <section id="panji-2-correction-notice" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>PARISHODHAN &amp; REGISTER-II FIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Panji-2 Correction Notice Draft (Parishodhan)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                <strong>Panji-2 (Register-II)</strong> is the official tenant ledger at the Circle
                Office. If the digitized entry on Jharbhoomi has a wrong area (<em>rakba</em>),
                misspelled name, or missing Khata, your mutation gets blocked. File this formal
                notice with the Circle Officer and on the Parishodhan portal to get a{" "}
                <strong>Shudhi Patra (Correction Slip)</strong>.
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-[#172228] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      PANJI-2 CORRECTION &amp; SHUDHI PATRA NOTICE DRAFT
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(panjiNoticeText, setCopiedPanjiNotice)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5F7E75] hover:bg-[#4e6961] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedPanjiNotice ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Notice Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Panji-2 Notice</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 sm:p-6 max-h-[460px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                  {panjiNoticeText}
                </div>
              </div>
            </section>

            {/* SECTION 6: CIRCLE OFFICE CHECKLIST */}
            <section id="circle-office-checklist" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>ANCHAL DOCUMENT VERIFICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Ranchi &amp; Jharkhand Circle Office Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The Halka Karamchari and Circle Inspector check these core papers before placing
                your mutation file before the Circle Officer. Keep physical copies ready for spot
                verification:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Paper 1: Stamp Duty
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                      ₹50 e-Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Notarized Heir &amp; CNT Affidavit
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Print on ₹50 Jharkhand e-Stamp paper (Art. 4). Sign before a Notary Public or
                    Executive Magistrate with Aadhaar proof.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Paper 2: Khatiyan
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      Caste Column
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Certified Khatiyan &amp; Laggan Rasid
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proves the Raiyat&apos;s community status for Section 46 CNT verification and
                    confirms up-to-date land rent payments.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#5F7E75]">
                      Paper 3: Vanshavali
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                      Mukhiya Sign
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Attested Family Tree (Pedigree)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must carry signature and seal of the local Mukhiya, Ward Councillor, or Circle
                    Officer confirming all surviving heirs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Paper 4: KYC &amp; NOC
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      All Co-Heirs
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Aadhaar Cards &amp; Daughter Consent
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Include Aadhaar copies of all sons and married daughters so no co-heir raises an
                    objection during the 30-day Istehar notice.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Complete 10-Item Circle Office Checklist
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Keep all 10 records ready before submitting online on Jharbhoomi.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(circleChecklistText, setCopiedChecklist)}
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

            {/* SECTION 7: CIRCLE OFFICER TO DCLR APPEAL ROADMAP */}
            <section id="dclr-appeal-roadmap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>MUTATION &amp; APPELLATE PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Circle Officer to DCLR Appeal Roadmap
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these six procedural steps from online Jharbhoomi submission to challenging a
                wrongful Circle Officer rejection before the DCLR:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Submit Online Dakhil-Kharij on Jharbhoomi",
                    desc: "Upload your notarized CNT/SPT affidavit, Khatiyan, Panji-2 receipt, death certificate, and Vanshavali to generate your Mutation Case Number.",
                  },
                  {
                    step: 2,
                    title: "Halka Karamchari & CI Spot Inquiry",
                    desc: "The Halka Karamchari inspects physical possession, verifies the Register-II entry, and issues a public notice (Istehar) inviting objections.",
                  },
                  {
                    step: 3,
                    title: "Circle Officer Order & Shudhi Patra",
                    desc: "If no objection is filed and CNT Section 46 compliance is clear, the Circle Officer passes the mutation order and issues a Correction Slip (Shudhi Patra).",
                  },
                  {
                    step: 4,
                    title: "Download Certified Rejection Order",
                    desc: "If the CO rejects your file citing CNT Act restrictions or missing pedigree proof, obtain a certified copy of the order sheet right away.",
                  },
                  {
                    step: 5,
                    title: "File Mutation Appeal Before DCLR Within 30 Days",
                    desc: "Present a formal Mutation Appeal before the Sub-Divisional Deputy Collector Land Reforms (DCLR) within 30 days of the CO order, attaching a delay condonation application if late.",
                  },
                  {
                    step: 6,
                    title: "Revision Before Additional Collector / DC",
                    desc: "If the DCLR upholds an illegal rejection or ignores natural succession under Section 46, file a Mutation Revision before the Collector / Additional Collector.",
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

            {/* SECTION 8: DUAL CONVERSION CTA BANNER */}
            <section id="dual-conversion-options" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>PREVENT MUTATION REJECTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Will Drafting vs Jharkhand Revenue Retainer
              </h3>
              <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                      <ShieldCheck className="w-3 h-3 text-[#C65378]" />
                      <span>DUAL JHARKHAND LEGAL SOLUTION</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                      Facing a Ranchi CO Rejection or Planning Family Land Shares?
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      Protect freehold plots with a clear Will registered via NGDRS Jharkhand, or
                      engage our revenue desk for CNT/SPT mutation replies and DCLR appeals.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                    <Link
                      href="/start"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Draft a Jharkhand Will</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors"
                    >
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>Jharkhand Revenue Retainer</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: REAL CASE STUDIES */}
            <section id="jharkhand-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL JHARKHAND CASES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Real Cases: Ranchi, Dhanbad &amp; Deoghar
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: KANKE CIRCLE, RANCHI</span>
                    <span className="text-slate-500 font-semibold">CNT Section 46 Query</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Reversing an Online Jharbhoomi Mutation Rejection
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family applied for Dakhil-Kharij after their father died in Ranchi. The Circle
                    Officer flagged the file for missing CNT Act compliance. Submitting our Section
                    46 non-tribal declaration with the certified Khatiyan cleared the Shudhi Patra
                    in 21 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: JHARIA CIRCLE, DHANBAD</span>
                    <span className="text-slate-500 font-semibold">Panji-2 Area Mismatch</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Fixing Missing Register-II Ledger via Parishodhan Notice
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Online Jharbhoomi showed zero decimals against the ancestor&apos;s Khata in
                    Dhanbad. The heirs served our Panji-2 Correction Notice with 1998 Laggan
                    receipts. The CO updated digital Register-II and mutated all three siblings.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: DEOGHAR CIRCLE, SANTHAL PARGANA</span>
                    <span className="text-slate-500 font-semibold">SPT Section 20 Bar</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Protecting Ancestral Raiyati Land From Void Will Transfer
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An unregistered Will tried to transfer tribal Raiyati agricultural land in
                    Deoghar to a non-relative. The Circle Officer barred mutation under Section 20
                    of the SPT Act, and the rightful heirs succeeded via natural Vanshavali proof.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTES &amp; INTERNAL LINKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Official Jharkhand Portals &amp; Laws
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Chota Nagpur Tenancy Act, 1908 (s. 46 &amp; s. 71A):</strong> Governs
                    transfers and restoration of tribal, SC, and BC Raiyati holdings in Chotanagpur,
                    Kolhan, and Palamau.
                  </li>
                  <li>
                    <strong>Santhal Parganas Tenancy Act, 1949 (s. 20 &amp; s. 42):</strong> Bars
                    non-tribal alienation of Raiyati holdings in the Santhal Pargana division.
                  </li>
                  <li>
                    <strong>Bihar Land Mutation Act, 2011 (Adapted by Jharkhand):</strong> Sets
                    Circle Officer mutation procedure and 30-day DCLR appeal rules.
                  </li>
                  <li>
                    <strong>Bharatiya Sakshya Adhiniyam (BSA), 2023 s. 61:</strong> Recognizes
                    verified electronic revenue portal records and uploaded affidavits.
                  </li>
                </ul>

                {/* Official External Portals (Verified 200 OK HTTPS) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://jharsewa.jharkhand.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>Jharsewa e-District Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://parishodhan.jharkhand.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Jharkhand Parishodhan Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.jharkhand.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Jharkhand Govt Portal</span>
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
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Hub & Spoke Internal Links (Verified 200 OK Routes) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                  >
                    Templates Hub (All Formats)
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    Jharkhand Revenue Retainer
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Start Will Drafting Online
                  </Link>
                  <Link
                    href="/locations/jharkhand"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Jharkhand Will Guide
                  </Link>
                  <Link
                    href="/locations/ranchi"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Ranchi Succession Desk
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Dakhil-Kharij Mutation Service
                  </Link>
                  <Link
                    href="/blogs/tribal-scheduled-tribe-property-inheritance-will-rules-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Scheduled Tribe Will Rules
                  </Link>
                  <Link
                    href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All-India Pedigree Affidavit
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
                11. Frequently Asked Questions: Jharkhand Land
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
                <p className="text-xs font-bold text-slate-900 mb-1">Why File Clean Papers?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clean affidavit with your Khata, Plot, and caste column saves months of Circle
                  Office visits. It keeps your land records safe for your kids.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Check Panji-2 Early</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Look up your ancestor&apos;s Register-II page online first. If the land area or
                  name has errors, fix it via Parishodhan before asking for mutation.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our legal team checks your Khatiyan, writes CNT-compliant drafts, and represents
                  families in Circle Office objections and DCLR appeals.
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
                Advises families across India on Jharkhand Raiyati succession, CNT/SPT Act
                compliance, Panji-2 corrections, and registered Wills at AMA Legal Solutions.
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
                  <span>PREVENT FUTURE DISPUTES</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Secure Freehold Jharkhand Assets via Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  A valid Will registered via NGDRS Jharkhand establishes clear shares on urban and
                  non-restricted freehold plots for your family.
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
                  <span>Lawyer Reviewed &amp; NGDRS Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - JHARKHAND REVENUE RETAINER (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>JHARKHAND REVENUE RETAINER</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Circle Officer Rejected Your Dakhil-Kharij?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Book our Jharkhand revenue legal retainer for Ranchi and district CO replies,
                  Panji-2 corrections, and 30-day DCLR mutation appeals.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Book Revenue Consultation</span>
                </Link>
                <Link
                  href="/services/property-mutation-dakhil-kharij-service"
                  className="block text-[11px] font-bold text-[#C65378] hover:underline"
                >
                  Explore Mutation Legal Service
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
                      <strong>CNT &amp; SPT Precision:</strong> Addresses Section 46 and Section 20
                      specifically.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Panji-2 Sync:</strong> Includes Shudhi Patra notice for Jharbhoomi
                      errors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>DCLR Appeal Ready:</strong> Covers 30-day appellate timelines and
                      precedents.
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
          href="#cnt-affidavit-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>CNT Affidavit</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Revenue Help</span>
        </Link>
      </div>
    </div>
  );
}
