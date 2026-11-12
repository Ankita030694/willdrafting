"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Copy,
  Check,
  ShieldCheck,
  Scale,
  AlertTriangle,
  FileText,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Landmark,
  CheckCircle2,
  Award,
  Plus,
  Trash2,
  Trees,
  ExternalLink,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

interface HeirRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  agriculturistStatus: string;
  share: string;
}

const TOC_ITEMS = [
  { id: "executive-brief", label: "EXECUTIVE BRIEF" },
  { id: "intkal-overview", label: "STATUTORY OVERVIEW" },
  { id: "affidavit-builder", label: "LIVE DRAFT BUILDER" },
  { id: "himbhoomi-draft", label: "VIRASAT AFFIDAVIT" },
  { id: "section-118-clause", label: "SEC 118 & BONA FIDE" },
  { id: "virasat-vs-section-118", label: "SEC 118 MATRIX" },
  { id: "patwari-guide", label: "PATWARI CHECKLIST" },
  { id: "mutation-steps", label: "5-STEP & APPEALS" },
  { id: "case-studies", label: "SHIMLA CASE LAW" },
  { id: "official-links", label: "PORTALS & HUBS" },
  { id: "faq", label: "FAQ (8 ANSWERS)" },
];

const HP_DISTRICTS = [
  { id: "shimla-apple", label: "Shimla (Theog, Rohru, Kotkhai & Sadar)" },
  { id: "kangra", label: "Kangra (Dharamshala, Palampur & Nurpur)" },
  { id: "kullu", label: "Kullu (Kullu Sadar, Bhuntar & Manali)" },
  { id: "solan", label: "Solan (Solan Sadar, Kasauli & Kandaghat)" },
  { id: "mandi", label: "Mandi (Mandi Sadar, Sundernagar & Balh)" },
  { id: "sirmaur", label: "Sirmaur (Nahan, Paonta Sahib & Rajgarh)" },
  { id: "hamirpur", label: "Hamirpur / Bilaspur / Una" },
  { id: "tribal-belt", label: "Kinnaur / Lahaul & Spiti (Scheduled Area)" },
];

const SUCCESSION_MODES = [
  {
    id: "intestate",
    label: "Intestate Virasat (No Will - HSA 1956)",
    risk: "LOW",
    verdict: "EXEMPT U/S 118(1) EXPLANATION",
    patwariType: "Intkal-e-Virasat (Natural Succession)",
    note: "All Class I legal heirs inherit equal shares automatically. No prior State permission is needed.",
  },
  {
    id: "will-natural-heir",
    label: "Testamentary Will to Natural Legal Heir",
    risk: "LOW",
    verdict: "EXEMPT U/S 118(1) EXPLANATION",
    patwariType: "Intkal Bazaari / Wasiyat (Testamentary)",
    note: "A Will to a spouse, son, or daughter falls outside Section 118 restrictions. Notice goes to non-beneficiary heirs at Jalsa-e-Aam.",
  },
  {
    id: "will-non-agriculturist",
    label: "Will to Non-Heir / Non-Agriculturist",
    risk: "CRITICAL",
    verdict: "BARRED WITHOUT STATE GOVT PERMISSION",
    patwariType: "Contested / Stayed u/s 118 HP Act 1972",
    note: "Under Kuldeep Singal v. Rakesh Kumar (2019 HP HC), you cannot pass Himachal land via Will to a stranger who is not an agriculturist.",
  },
];

const STATIC_HIMBHOOMI_DRAFT = `BEFORE THE EXECUTIVE MAGISTRATE / TEHSILDAR / NAIB-TEHSILDAR
TEHSIL [SHIMLA RURAL / THEOG / ROHRU], DISTRICT [SHIMLA], HIMACHAL PRADESH

(Execute on Rs. 20 Himachal Pradesh Non-Judicial e-Stamp Paper under Art. 4)

AFFIDAVIT FOR INTKAL-E-VIRASAT (INHERITANCE MUTATION) & SECTION 118 DECLARATION

I, [Full Name of Deponent], aged about [Age] years, son / daughter / spouse of Late Shri / Smt. [Name], permanent resident of Village / Mohal [Mohal Name], Post Office [PO Name], Tehsil [Tehsil Name], District [District Name], Himachal Pradesh (PIN: [PIN Code]), do hereby solemnly affirm and declare on oath as under:

1. DECEASED OWNER DETAILS:
That Late Shri / Smt. [Full Name of Deceased Landowner] passed away on [Date of Death] at [Place of Death], vide Death Certificate Registration No. [Reg No.] dated [Issue Date] issued by the Registrar of Births & Deaths / Gram Panchayat [Name].

2. IMMOVABLE LAND & ORCHARD RECORD (HIMBHOOMI JAMABANDI):
That during his/her lifetime, the deceased was the recorded landowner in possession of agricultural / orchard / homestead land situated in Mohal [Mohal Name], Hadbast No. [HB No.], Tehsil [Tehsil Name], District [District Name], Himachal Pradesh, as recorded in the Jamabandi for the year [2021-22]:
- Khata / Khewat No.: [Khata No.]
- Khatauni No.: [Khatauni No.]
- Khasra Nos.: [Khasra Nos., e.g., 312/1, 314, 318]
- Total Area & Classification: [Area in Bigha/Biswa or Hectares], [Bagicha Seb / Barani / Banjar]

3. COMPLETE PEDIGREE & LEGAL HEIRS (SHAJRA NASAB):
That the deceased left behind only the following lawful Class I legal heirs under the Hindu Succession Act, 1956 (and matching the Shajra Nasab verified by the Halka Patwari), and no other legal heir exists:
(a) [Name of Heir 1] | Relation: [Spouse / Son / Daughter] | Age: [Age] | Address: [Address]
(b) [Name of Heir 2] | Relation: [Son / Daughter] | Age: [Age] | Address: [Address]
(c) [Name of Heir 3] | Relation: [Son / Daughter] | Age: [Age] | Address: [Address]

4. MANDATORY SECTION 118 HP TENANCY & LAND REFORMS ACT, 1972 DECLARATION:
That all beneficiaries named in Paragraph 3 above are natural / legal heirs of the deceased landowner and therefore fall squarely within the statutory exemption under the Explanation to Section 118(1) of the Himachal Pradesh Tenancy and Land Reforms Act, 1972. [Optional if applicable: The heirs also hold independent status as agriculturists in Himachal Pradesh under Section 2(2) of the said Act vide Jamabandi Mohal (Name).] No prohibited transfer to an outsider or non-agriculturist is taking place under this Intkal Virasat entry.

5. SUCCESSION STATUS (INTESTATE / REGISTERED WILL):
That the deceased died [intestate without leaving any Will / leaving behind Registered Will No. (Reg No.) dated (Date) strictly in favour of natural legal heirs], and there is no pending stay order, attachment, or civil court suit restraining mutation of the above Khewat.

6. MUTATION REQUEST & INDEMNITY:
That I request the Halka Patwari and Ld. Tehsildar to record Intkal-e-Virasat in Parat Intkal and read the same at Jalsa-e-Aam under Sections 35 to 38 of the HP Land Revenue Act, 1954. I undertake to indemnify the State Government and all third parties if any heir was concealed or any fact stated herein turns out false.

DEPONENT

VERIFICATION:
Verified at [Tehsil / District], Himachal Pradesh on this [Day] day of [Month, Year] that the contents of Paragraphs 1 to 6 of this affidavit are true and correct to my personal knowledge and Himbhoomi revenue records, and nothing material has been concealed therefrom.

DEPONENT
(Attested by Executive Magistrate / Notary Public / Oath Commissioner)`;

const SECTION_118_CLAUSE_DRAFT = `MANDATORY SECTION 118 COMPLIANCE & AGRICULTURIST EXEMPTION CLAUSE
(Insert into Intkal Virasat Affidavits, Family Settlements, or Himachal Wills)

"The Deponent / Testator hereby states and declares that the transfer and mutation of the Scheduled Himachal Pradesh land is strictly governed by Section 118 of the Himachal Pradesh Tenancy and Land Reforms Act, 1972. All beneficiaries taking title or Virasat shares under this instrument are natural legal heirs of the landowner within the Explanation to Section 118(1) of the 1972 Act [and/or hold recorded agriculturist status under Section 2(2) of the Act via personal cultivation in Estate (Mohal Name), Tehsil (Name), District (Name), HP]. Accordingly, no prior permission from the State Government of Himachal Pradesh is required for sanctioning this Intkal in the Himbhoomi Jamabandi records."`;

const AGRICULTURIST_CERT_DRAFT = `BEFORE THE EXECUTIVE MAGISTRATE / TEHSILDAR
TEHSIL [NAME], DISTRICT [NAME], HIMACHAL PRADESH

AFFIDAVIT FOR HP AGRICULTURIST CERTIFICATE (KRISHAK PRAMAN PATRA)
(Under Section 2(2) & Section 118, HP Tenancy and Land Reforms Act, 1972 - Submit via HP e-District)

(Execute on Rs. 20 Himachal Pradesh Non-Judicial e-Stamp Paper)

I, [Full Name], aged [Age] years, S/o / D/o / W/o [Parent/Spouse Name], permanent resident of Village / Mohal [Mohal Name], Tehsil [Tehsil Name], District [District Name], Himachal Pradesh, solemnly affirm and declare on oath as under:

1. That I am a permanent resident of Himachal Pradesh and hold Bona Fide Himachali Certificate No. [Cert No.] dated [Date] issued by Tehsildar [Name]. (Note: Bona Fide status alone does not confer agriculturist status without recorded land holding.)

2. That I / my direct ancestral predecessor hold agricultural land recorded in our own name as landowners personally cultivating land in Mohal [Mohal Name], Patwar Circle [Circle Name], Tehsil [Tehsil Name], District [District Name], HP, as entered in Jamabandi Year [2021-22], Khata No. [Khata], Khatauni No. [Khatauni], Khasra No. [Khasra], measuring [Area].

3. That I cultivate the said agricultural land personally within the meaning of Section 2(2) and Section 2(4) of the Himachal Pradesh Tenancy and Land Reforms Act, 1972, through my own labour, family members, or personal supervision.

4. That I need the Agriculturist Certificate (Krishak Praman Patra) through the HP e-District portal to verify my lawful eligibility under Section 118 of the 1972 Act before the Revenue Authorities.

5. That all copies of Jamabandi, Shajra Nasab, and Aadhaar attached herewith are genuine, and I am liable for penal prosecution if any land record statement is found untrue.

DEPONENT

VERIFICATION:
Verified at [Place], HP on [Date] that Paragraphs 1 to 5 are true to my knowledge and belief based on official Himbhoomi records.

DEPONENT`;

const PATWARI_CHECKLIST_TEXT = `HIMACHAL PRADESH INTKAL VIRASAT SUBMISSION CHECKLIST (PATWARI & JALSA-E-AAM)
1. [ ] Rs. 20 HP Non-Judicial e-Stamp Intkal Affidavit (Article 4 Stamp Duty, Notary/Magistrate attested)
2. [ ] Certified Death Certificate of Recorded Landowner (Gram Panchayat / Municipal Registrar / CRS)
3. [ ] Latest Certified Jamabandi Copy & Fard from Himbhoomi (Khata, Khatauni & Khasra numbers visible)
4. [ ] Patwari-Verified Shajra Nasab (Pedigree Table) matching all Class I Legal Heirs (including married daughters)
5. [ ] Section 118 Proof: Agriculturist Certificate (Krishak Praman Patra) OR Natural Legal Heir Family Tree Proof
6. [ ] Original Registered / Unregistered Will + 2 Witnesses' IDs (only if mutating by Will instead of intestate Virasat)
7. [ ] Self-Attested Aadhaar / Voter ID of Deponent & Co-Heirs + Receipt of Roznamcha Report & Govt Mutation Fee`;

const COMPARISON_ROWS = [
  {
    scenario: "Intestate Virasat (No Will - HSA 1956)",
    authority: "HP Land Revenue Act s. 35 & Sec 118(1) Expl.",
    sec118Needed: "No (Statutorily Exempt)",
    stampFee: "Rs. 20 e-Stamp Affidavit + Nominal Intkal Fee",
    risk: "Low (Equal Class I Shares)",
  },
  {
    scenario: "Registered Will to Natural Legal Heir",
    authority: "HP Tenancy Act Sec 118(1) Expl. & HSA/ISA",
    sec118Needed: "No (Natural Heir Exempt)",
    stampFee: "Rs. 20 e-Stamp Affidavit + Will Copy Notice",
    risk: "Medium (Heirs Invited at Jalsa-e-Aam)",
  },
  {
    scenario: "Will to Non-Heir Non-Agriculturist",
    authority: "Sec 118(1) Bar; Kuldeep Singal v. Rakesh Kumar",
    sec118Needed: "Yes (Prior State Approval Mandatory)",
    stampFee: "Cannot Mutate Without State Order",
    risk: "Critical (Void / Liable to State Vesting)",
  },
  {
    scenario: "Bona Fide Himachali Without Land",
    authority: "Domicile Rules vs Sec 2(2) Tenancy Act",
    sec118Needed: "Yes (Only Proves Domicile, Not Farmer)",
    stampFee: "Full Sec 118 Application Required to Buy",
    risk: "High (Common Misconception Rejection)",
  },
  {
    scenario: "Krishak Agriculturist Buying Orchard",
    authority: "Sec 2(2) & Sec 118 Tenancy Act 1972",
    sec118Needed: "No (Holds Krishak Praman Patra)",
    stampFee: "Rs. 20 Affidavit + e-District Verification",
    risk: "Low (Valid Across HP Except Tribal Belts)",
  },
];

const CITATIONS_DATA = [
  {
    label: "Himbhoomi Land Records Portal (HP Revenue Dept)",
    href: "https://himbhoomilmk.nic.in/",
    external: true,
  },
  {
    label: "HP e-District Portal (Agriculturist & Bona Fide Certs)",
    href: "https://edistrict.hp.gov.in/HPeDistrict/",
    external: true,
  },
  {
    label: "Himachal Pradesh Official Government Gateway",
    href: "https://himachal.nic.in/",
    external: true,
  },
  {
    label: "High Court of Himachal Pradesh, Shimla",
    href: "https://highcourt.hp.gov.in/",
    external: true,
  },
  {
    label: "All WillDrafting Legal Templates Hub",
    href: "/templates",
    external: false,
  },
  {
    label: "Will Drafting & Revenue Laws in Himachal Pradesh",
    href: "/locations/himachal-pradesh",
    external: false,
  },
  {
    label: "Shimla Estate Planning & Apple Orchard Guide",
    href: "/locations/shimla",
    external: false,
  },
  {
    label: "Property Mutation (Dakhil Kharij) Advocate Service",
    href: "/services/property-mutation-dakhil-kharij-service",
    external: false,
  },
  {
    label: "Legal Heir vs Succession Certificate Decision Tool",
    href: "/tools/legal-heir-vs-succession-certificate-decision-tool",
    external: false,
  },
  {
    label: "Book HP Land Law & Mutation Consultation",
    href: "/contact",
    external: false,
  },
];

export default function HimachalIntkalAffidavitClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeSection, setActiveSection] = useState<string>("executive-brief");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  // Interactive Builder State
  const [districtId, setDistrictId] = useState<string>("shimla-apple");
  const [successionMode, setSuccessionMode] = useState<string>("intestate");
  const [deponentName, setDeponentName] = useState<string>("Vikram Singh Chauhan");
  const [deceasedName, setDeceasedName] = useState<string>("Late Shri Raghubir Singh Chauhan");
  const [deathDate, setDeathDate] = useState<string>("14-08-2025");
  const [mohalName, setMohalName] = useState<string>("Kotkhai Khas (Hadbast No. 114)");
  const [khataNumbers, setKhataNumbers] = useState<string>("Khata 42 / Khatauni 115 / Khasra 312/1, 314");
  const [landArea, setLandArea] = useState<string>("12 Bigha 04 Biswa (Bagicha Seb / Apple Orchard)");
  const [hasAgriculturistCert, setHasAgriculturistCert] = useState<boolean>(true);
  const [heirs, setHeirs] = useState<HeirRow[]>([
    {
      id: 1,
      name: "Smt. Bimla Devi",
      age: "68",
      relation: "Widow",
      agriculturistStatus: "Recorded Co-Heir (Natural Legal Heir)",
      share: "1/3rd Equal Share",
    },
    {
      id: 2,
      name: "Vikram Singh Chauhan",
      age: "42",
      relation: "Son",
      agriculturistStatus: "HP Agriculturist u/s 2(2)",
      share: "1/3rd Equal Share",
    },
    {
      id: 3,
      name: "Anjali Thakur",
      age: "39",
      relation: "Married Daughter",
      agriculturistStatus: "Natural Legal Heir (Sec 118 Exempt)",
      share: "1/3rd Equal Share",
    },
  ]);

  // Copy states
  const [copiedLive, setCopiedLive] = useState<boolean>(false);
  const [copiedStatic, setCopiedStatic] = useState<boolean>(false);
  const [copiedSec118, setCopiedSec118] = useState<boolean>(false);
  const [copiedAgriCert, setCopiedAgriCert] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [activeClauseTab, setActiveClauseTab] = useState<"clause" | "certificate">("clause");

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (session) {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(
        new CustomEvent(OPEN_SIGNUP_EVENT, {
          detail: {
            callbackUrl: "/start/dashboard",
            templateTitle: "HP Intkal Virasat Will & Estate Plan",
          },
        })
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedDistrict = useMemo(
    () => HP_DISTRICTS.find((d) => d.id === districtId) || HP_DISTRICTS[0],
    [districtId]
  );

  const selectedMode = useMemo(
    () => SUCCESSION_MODES.find((m) => m.id === successionMode) || SUCCESSION_MODES[0],
    [successionMode]
  );

  const addHeirRow = () => {
    const nextId = heirs.length ? Math.max(...heirs.map((h) => h.id)) + 1 : 1;
    setHeirs([
      ...heirs,
      {
        id: nextId,
        name: "New Legal Heir Name",
        age: "35",
        relation: "Son / Daughter",
        agriculturistStatus: "Natural Legal Heir (Sec 118 Exempt)",
        share: "Equal Share",
      },
    ]);
  };

  const removeHeirRow = (id: number) => {
    if (heirs.length <= 1) return;
    setHeirs(heirs.filter((h) => h.id !== id));
  };

  const updateHeirRow = (id: number, field: keyof HeirRow, value: string) => {
    setHeirs(heirs.map((h) => (h.id === id ? { ...h, [field]: value } : h)));
  };

  const generatedAffidavitText = useMemo(() => {
    const pedigreeLines = heirs
      .map(
        (h, idx) =>
          `(${idx + 1}) ${h.name} | Age: ${h.age} yrs | Relation: ${h.relation} | Status: ${h.agriculturistStatus} | Proposed Share: ${h.share}`
      )
      .join("\n");

    const successionPara =
      successionMode === "intestate"
        ? "That the deceased died intestate without executing any Will, and succession opens strictly under the Hindu Succession Act, 1956."
        : successionMode === "will-natural-heir"
          ? "That the deceased left a valid Will solely in favour of his/her natural legal heirs named above, which is exempt from prior State clearance under the Explanation to Section 118(1)."
          : "CAUTION: A Will naming a non-heir who is not a Himachal agriculturist is barred under Section 118(1) of the 1972 Act unless prior permission of the State Government of Himachal Pradesh is obtained.";

    const agriPara = hasAgriculturistCert
      ? "The Deponent further confirms that recorded agriculturist status under Section 2(2) of the HP Tenancy and Land Reforms Act, 1972 is substantiated by existing Jamabandi records / Krishak Praman Patra."
      : "The Deponent confirms that the beneficiaries claim inheritance strictly as natural legal heirs under the Explanation to Section 118(1) of the HP Tenancy and Land Reforms Act, 1972.";

    return `BEFORE THE EXECUTIVE MAGISTRATE / TEHSILDAR
${selectedDistrict.label.toUpperCase()}, HIMACHAL PRADESH

(To be executed on Rs. 20 HP Non-Judicial e-Stamp Paper under Art. 4)

INTKAL-E-VIRASAT & SECTION 118 DECLARATION AFFIDAVIT

I, ${deponentName}, permanent resident of Village/Mohal ${mohalName}, ${selectedDistrict.label}, Himachal Pradesh, do hereby solemnly affirm and state on oath:

1. That ${deceasedName} passed away on ${deathDate}, leaving behind the following agricultural / orchard land in Mohal ${mohalName}:
   Revenue Particulars: ${khataNumbers}
   Measured Area & Kind: ${landArea}

2. That the complete list of surviving legal heirs (Shajra Nasab) entitled to entry in Parat Intkal is:
${pedigreeLines}

3. ${successionPara}

4. SECTION 118 COMPLIANCE CLAUSE: ${agriPara}

5. That no undisclosed heir, civil court stay, or conflicting mutation proceeding exists. I pray that the Halka Patwari and Ld. Tehsildar enter and attest this Intkal at the ensuing Jalsa-e-Aam under Sections 35 to 38 of the HP Land Revenue Act, 1954.

DEPONENT: ${deponentName}
VERIFICATION: Verified at ${selectedDistrict.label} that Paragraphs 1 to 5 are true and correct to my knowledge and official Himbhoomi records.`;
  }, [
    deponentName,
    deceasedName,
    deathDate,
    mohalName,
    khataNumbers,
    landArea,
    heirs,
    selectedDistrict,
    successionMode,
    hasAgriculturistCert,
  ]);

  const triggerCopy = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2200);
    } catch {
      setter(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] pb-24 lg:pb-16">
      {/* =====================================================================
          LAYER 1: DARK NAVY HERO SECTION
          ===================================================================== */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#C65378]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#5F7E75]/10 blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-200 border border-white/15 text-xs font-extrabold tracking-widest uppercase">
            <Trees className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Himbhoomi Virasat • Section 118 HP Act 1972 • Rs. 20 Stamp Duty</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Himachal Pradesh Intkal Mutation Affidavit Format
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Draft a valid Himbhoomi Virasat Intkal affidavit for Shimla, Kangra, Kullu, or Mandi land records. Includes the mandatory Section 118 agriculturist declaration, Shajra Nasab pedigree table, and Patwari checklist.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#affidavit-builder"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#b04366] transition-all shadow-lg shadow-[#C65378]/25 cursor-pointer"
            >
              <span>Build Intkal Affidavit Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/start"
              onClick={handleStartDraft}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#172228] font-bold text-sm hover:bg-slate-100 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Start Free Online Will</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <Scale className="w-4 h-4 text-emerald-300" />
              <span>HP Land Law Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LAYER 2: TRUST & STATUTORY STATS STRIP
          ===================================================================== */}
      <section className="border-b border-rose-200/70 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-[#172228]">Rs. 20</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                HP Stamp Duty (Art. 4, 2023)
              </div>
            </div>
            <div className="p-2 border-l border-rose-200/60">
              <div className="text-xl sm:text-2xl font-black text-[#C65378]">Sec. 118</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                Agriculturist &amp; Heir Shield
              </div>
            </div>
            <div className="p-2 md:border-l border-rose-200/60">
              <div className="text-xl sm:text-2xl font-black text-[#5F7E75]">30 Days</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                Sec. 15 Collector Appeal Window
              </div>
            </div>
            <div className="p-2 border-l border-rose-200/60">
              <div className="text-xl sm:text-2xl font-black text-[#172228]">100% Free</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                Himbhoomi Ready Formats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LAYER 3: 3-COLUMN ENTERPRISE LAYOUT
          ===================================================================== */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-10 items-start">
          {/* -----------------------------------------------------------------
              LEFT SIDEBAR: STICKY TOC & AUTHORITY SUMMARY (NO H3/H4 BEFORE H2)
              ----------------------------------------------------------------- */}
          <aside className="hidden lg:block sticky top-24 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                ON THIS PAGE
              </p>
              <nav aria-label="Page contents" className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#5F7E75]">
                STATUTORY AUTHORITY
              </p>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>HP Land Revenue Act, 1954 (ss. 34 to 38 &amp; ss. 14 to 15)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>HP Tenancy &amp; Land Reforms Act, 1972 (s. 2(2) &amp; s. 118)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>Hindu Succession Act, 1956 (Class I Equal Rights)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>Indian Stamp (HP Amendment) Act, 2023 (Art. 4 Rs. 20)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAF7F0] rounded-2xl border border-rose-200/80 p-4 space-y-2">
              <p className="text-xs font-extrabold text-slate-900">Explore Related Hubs</p>
              <Link
                href="/templates"
                className="flex items-center justify-between text-xs font-semibold text-[#C65378] hover:underline py-1"
              >
                <span>All Legal Format Templates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/locations/himachal-pradesh"
                className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#C65378] py-1"
              >
                <span>Himachal Will Drafting Rules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/locations/shimla"
                className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#C65378] py-1"
              >
                <span>Shimla Apple Orchard Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* -----------------------------------------------------------------
              CENTER COLUMN: MAIN CONTENT & INTERACTIVE BUILDER
              ----------------------------------------------------------------- */}
          <main className="min-w-0 space-y-12">
            {/* EDITORIAL VISUAL CARD */}
            <div className="rounded-2xl overflow-hidden border border-rose-200/80 bg-white shadow-sm">
              <div
                className="relative aspect-[16/9] bg-[#FAF7F0] cursor-pointer group"
                onClick={() => setShowHighResModal(true)}
              >
                <Image
                  src="/images/himachal-pradesh-intkal-mutation-affidavit-format-og.jpg"
                  alt="HP Intkal Mutation Affidavit Format for Himbhoomi and Section 118 compliance"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
              <div className="px-5 py-3 bg-[#FAF7F0] border-t border-rose-200/70 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold">
                  Visual Guide: Himbhoomi Jamabandi, Rs. 20 e-Stamp &amp; Section 118 Orchard Compliance
                </span>
                <button
                  type="button"
                  onClick={() => setShowHighResModal(true)}
                  className="font-bold text-[#C65378] hover:underline cursor-pointer"
                >
                  View Full Blueprint
                </button>
              </div>
            </div>

            {/* EXECUTIVE BRIEF CALLOUT (USES <p>, ZERO H3/H4 BEFORE H2) */}
            <section
              id="executive-brief"
              className="rounded-2xl bg-[#F4F8FE] border border-blue-100 border-l-4 border-l-[#C65378] p-6 sm:p-7 space-y-3"
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                Executive Legal Brief
              </p>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                An Intkal Virasat affidavit updates land records after an owner dies in Himachal Pradesh. Most online drafts fail at the village office because they leave out one key rule. You must state your farm heir status under Section 118 of the 1972 Land Reforms Act.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/90 rounded-xl p-3 border border-blue-100 text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Rs. 20 HP Stamp Duty</strong>
                  The 2023 Stamp Amendment raised affidavit fee from Rs. 10 to Rs. 20.
                </div>
                <div className="bg-white/90 rounded-xl p-3 border border-blue-100 text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Sec 118 Heir Shield</strong>
                  Natural heirs get free cover under the Section 118(1) law rule.
                </div>
                <div className="bg-white/90 rounded-xl p-3 border border-blue-100 text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Open Village Camp</strong>
                  Tehsildars read and sign heir names aloud at Jalsa-e-Aam camps.
                </div>
              </div>
            </section>

            {/* SECTION 1: THE SINGLE H2 ON THE ENTIRE PAGE */}
            <section id="intkal-overview" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                What Is Intkal Virasat &amp; Section 118 Compliance?
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Intkal means an owner change note in village land records. When a land owner dies in Himachal Pradesh, heirs must tell the Patwari. Section 35 of the HP Land Revenue Act, 1954 makes this report a must.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The Patwari logs the death note in a book called Parat Intkal. Next, field staff verify the family tree. The Tehsildar then updates your names on the Himbhoomi Jamabandi site.
              </p>

              <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Why Plain Indian Heir Drafts Fail in Shimla</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  Other states only ask for death proof and heir names. Himachal Pradesh adds strict land rules under Section 118 of the HP Tenancy and Land Reforms Act, 1972. Clerks stop your file if it lacks farmer status under Section 2(2) or natural heir status under Section 118(1).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5 space-y-2">
                  <p className="text-sm font-extrabold text-[#172228]">
                    Bona Fide Himachali vs Farmer Card
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A Bona Fide card only proves you live in Himachal Pradesh. It does not make you a farm owner under law. To buy farm land freely, you need a Krishak Praman Patra based on village land records.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5 space-y-2">
                  <p className="text-sm font-extrabold text-[#172228]">
                    Safe Rules for Family Wills
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 118 protects close blood heirs in every home. A parent can leave apple farms by Will to natural heirs without State clearance. Yet a Will to an outside friend who does not farm HP land stays barred.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE BUILDER (USES H3) */}
            <section
              id="affidavit-builder"
              className="bg-white rounded-3xl border border-rose-200/90 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#C65378] mb-1">
                    Interactive Customizer
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228]">
                    Interactive Intkal Virasat &amp; Sec 118 Draft Builder
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#5F7E75] border border-emerald-200 text-xs font-bold">
                  Auto-Updates Pedigree &amp; Compliance
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    District &amp; Tehsil Circle
                  </label>
                  <select
                    value={districtId}
                    onChange={(e) => setDistrictId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-[#FAF7F0] px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  >
                    {HP_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inheritance / Succession Route
                  </label>
                  <select
                    value={successionMode}
                    onChange={(e) => setSuccessionMode(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-[#FAF7F0] px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  >
                    {SUCCESSION_MODES.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Deponent Name (Person Signing Affidavit)
                  </label>
                  <input
                    type="text"
                    value={deponentName}
                    onChange={(e) => setDeponentName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Deceased Landowner Name &amp; Date of Death
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={deceasedName}
                      onChange={(e) => setDeceasedName(e.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    />
                    <input
                      type="text"
                      value={deathDate}
                      onChange={(e) => setDeathDate(e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mohal / Village &amp; Hadbast Number
                  </label>
                  <input
                    type="text"
                    value={mohalName}
                    onChange={(e) => setMohalName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Khata / Khatauni / Khasra Numbers (Himbhoomi)
                  </label>
                  <input
                    type="text"
                    value={khataNumbers}
                    onChange={(e) => setKhataNumbers(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Land Area &amp; Soil Classification
                  </label>
                  <input
                    type="text"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  />
                </div>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200 cursor-pointer mt-2 md:mt-5">
                  <input
                    type="checkbox"
                    checked={hasAgriculturistCert}
                    onChange={(e) => setHasAgriculturistCert(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#C65378]"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed">
                    <strong>Heirs already hold HP Agriculturist Status (Sec 2(2))</strong>. Uncheck if heirs live outside HP and rely purely on the natural legal heir exemption.
                  </span>
                </label>
              </div>

              {/* Dynamic Shajra Nasab Rows */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Shajra Nasab (Legal Heir Pedigree Rows)
                  </h4>
                  <button
                    type="button"
                    onClick={addHeirRow}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Legal Heir</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {heirs.map((heir) => (
                    <div
                      key={heir.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-xl bg-[#FAF7F0] border border-slate-200 items-center"
                    >
                      <input
                        type="text"
                        value={heir.name}
                        onChange={(e) => updateHeirRow(heir.id, "name", e.target.value)}
                        aria-label="Heir name"
                        className="sm:col-span-3 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                      />
                      <input
                        type="text"
                        value={heir.age}
                        onChange={(e) => updateHeirRow(heir.id, "age", e.target.value)}
                        aria-label="Heir age"
                        placeholder="Age"
                        className="sm:col-span-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={heir.relation}
                        onChange={(e) => updateHeirRow(heir.id, "relation", e.target.value)}
                        aria-label="Relation"
                        className="sm:col-span-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={heir.agriculturistStatus}
                        onChange={(e) =>
                          updateHeirRow(heir.id, "agriculturistStatus", e.target.value)
                        }
                        aria-label="Section 118 status"
                        className="sm:col-span-3 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={heir.share}
                        onChange={(e) => updateHeirRow(heir.id, "share", e.target.value)}
                        aria-label="Share"
                        className="sm:col-span-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => removeHeirRow(heir.id)}
                        disabled={heirs.length <= 1}
                        aria-label="Remove heir"
                        className="sm:col-span-1 inline-flex items-center justify-center p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* DARK NAVY COMPUTATION & VERDICT BOX */}
              <div className="rounded-2xl bg-[#172228] text-white p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-300">
                    Section 118 &amp; Revenue Compliance Verdict
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      selectedMode.risk === "CRITICAL"
                        ? "bg-rose-600 text-white"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                    }`}
                  >
                    {selectedMode.verdict}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <span className="block text-slate-400 mb-1">Required HP Stamp Paper</span>
                    <strong className="text-white text-sm">Rs. 20 e-Stamp (Art. 4)</strong>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <span className="block text-slate-400 mb-1">Patwari Mutation Entry</span>
                    <strong className="text-white text-sm">{selectedMode.patwariType}</strong>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <span className="block text-slate-400 mb-1">Attesting Revenue Officer</span>
                    <strong className="text-white text-sm">Tehsildar at Jalsa-e-Aam</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-3">
                  {selectedMode.note}{" "}
                  {districtId === "tribal-belt" &&
                    "Scheduled tribal protections in Kinnaur and Lahaul-Spiti carry stricter non-tribal restrictions."}
                </p>
              </div>

              {/* LIVE PREVIEW OUTPUT */}
              <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#172228] text-white">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Customized Himbhoomi Virasat Affidavit Preview</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerCopy(generatedAffidavitText, setCopiedLive)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] text-white text-xs font-bold hover:bg-[#b04366] cursor-pointer"
                  >
                    {copiedLive ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLive ? "Copied Custom Draft" : "Copy Custom Draft"}</span>
                  </button>
                </div>
                <pre className="p-4 sm:p-5 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                  {generatedAffidavitText}
                </pre>
              </div>
            </section>

            {/* SECTION 3: STANDARD HIMBHOOMI VIRASAT AFFIDAVIT FORMAT */}
            <section
              id="himbhoomi-draft"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                    Mandatory Revenue Template
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                    Himbhoomi Intkal Virasat Affidavit Format
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => triggerCopy(STATIC_HIMBHOOMI_DRAFT, setCopiedStatic)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  {copiedStatic ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedStatic ? "Copied Full Format" : "Copy Full Draft"}</span>
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                Print this full template on a Rs. 20 Himachal Pradesh non-judicial e-Stamp paper. Replace every bracketed placeholder with details from your certified Himbhoomi Jamabandi copy before notarization.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] p-5 sm:p-6">
                <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {STATIC_HIMBHOOMI_DRAFT}
                </pre>
              </div>
            </section>

            {/* SECTION 4: SECTION 118 EXEMPTION CLAUSE & AGRICULTURIST CERTIFICATE DRAFT */}
            <section
              id="section-118-clause"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#5F7E75]">
                    #1 Ranking Moat Assets
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                    Section 118 Agriculturist &amp; Bona Fide Drafts
                  </h3>
                </div>

                <div className="inline-flex rounded-xl bg-[#FAF7F0] p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setActiveClauseTab("clause")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      activeClauseTab === "clause"
                        ? "bg-[#172228] text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Sec 118 Exemption Clause
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveClauseTab("certificate")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      activeClauseTab === "certificate"
                        ? "bg-[#C65378] text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Krishak Certificate Affidavit
                  </button>
                </div>
              </div>

              {activeClauseTab === "clause" ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Add this short protective clause inside any Himachal Intkal affidavit, partition settlement, or Will. It proves to the Kanungo and Tehsildar that natural heirs take the estate lawfully without prior State sanction.
                  </p>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#5F7E75] uppercase tracking-wider">
                        Ready-to-Insert Section 118 Clause
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerCopy(SECTION_118_CLAUSE_DRAFT, setCopiedSec118)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5F7E75] text-white text-xs font-bold hover:opacity-90 cursor-pointer"
                      >
                        {copiedSec118 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSec118 ? "Copied Clause" : "Copy Clause"}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {SECTION_118_CLAUSE_DRAFT}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Use this affidavit when applying on the HP e-District portal or Lok Mitra Kendra for an official Agriculturist Certificate (Krishak Praman Patra). Patwaris verify your ancestral Jamabandi before the Tehsildar issues this digital certificate.
                  </p>
                  <div className="rounded-2xl border border-rose-200 bg-[#FAF7F0] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#C65378] uppercase tracking-wider">
                        HP e-District Krishak Certificate Affidavit
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerCopy(AGRICULTURIST_CERT_DRAFT, setCopiedAgriCert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] text-white text-xs font-bold hover:opacity-90 cursor-pointer"
                      >
                        {copiedAgriCert ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAgriCert ? "Copied Draft" : "Copy Draft"}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {AGRICULTURIST_CERT_DRAFT}
                    </pre>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 5: COMPARISON MATRIX TABLE */}
            <section
              id="virasat-vs-section-118"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  Legal Clearance Rules
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                  Intkal Virasat vs Section 118 Permission Matrix
                </h3>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold">Succession Scenario</th>
                      <th className="p-3.5 font-bold">Governing Law</th>
                      <th className="p-3.5 font-bold">Sec 118 Approval?</th>
                      <th className="p-3.5 font-bold">Stamp &amp; Filing</th>
                      <th className="p-3.5 font-bold">Mutation Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.scenario} className="hover:bg-[#FAF7F0]/70">
                        <td className="p-3.5 font-bold text-[#172228]">{row.scenario}</td>
                        <td className="p-3.5 text-slate-700">{row.authority}</td>
                        <td className="p-3.5 font-semibold text-slate-800">{row.sec118Needed}</td>
                        <td className="p-3.5 text-slate-600">{row.stampFee}</td>
                        <td className="p-3.5 font-semibold text-[#C65378]">{row.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: PATWARI INTKAL REGISTER GUIDE & CHECKLIST */}
            <section
              id="patwari-guide"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#5F7E75]">
                  Field Revenue Records
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                  Patwari Intkal Register Guide &amp; Checklist
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Every Himachal estate keeps two core field books under Section 34 of the 1954 Act. First, the Patwari records your oral or written report inside the Roznamcha Waqiati, which is the village daily diary. Second, the Patwari enters the family tree and Khasra details inside Parat Intkal, the official Register of Mutations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-4 space-y-1.5">
                  <p className="text-xs font-extrabold text-[#C65378] uppercase">1. Parat Sarkar &amp; Parat Patwar</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Mutation pages have twin foils. One copy goes to the Tehsil office for permanent Himbhoomi storage, and one stays with the circle Patwari.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-4 space-y-1.5">
                  <p className="text-xs font-extrabold text-[#5F7E75] uppercase">2. Kanungo Partal Check</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    The Field Kanungo compares the Patwari entry against the Shajra Nasab and existing Jamabandi before listing the file for attestation.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-4 space-y-1.5">
                  <p className="text-xs font-extrabold text-[#172228] uppercase">3. Jalsa-e-Aam Attestation</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    The Tehsildar or Naib-Tehsildar reads the pending mutation loudly in a public village camp to confirm no heir raises an objection.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-200 bg-[#FAF7F0] p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#172228]">
                    7-Point Patwari Intkal Submission Checklist
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerCopy(PATWARI_CHECKLIST_TEXT, setCopiedChecklist)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                  >
                    {copiedChecklist ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChecklist ? "Copied Checklist" : "Copy Checklist"}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {PATWARI_CHECKLIST_TEXT}
                </pre>
              </div>
            </section>

            {/* SECTION 7: 5-STEP PROCESS & SECTION 14/15 APPEALS */}
            <section
              id="mutation-steps"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  Step-by-Step Revenue SOP
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                  5-Step Mutation Process &amp; Appeal Timeline
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Download Jamabandi on Himbhoomi",
                    desc: "Check your District, Tehsil, and Mohal on Himbhoomi to confirm exact Khata, Khatauni, and Khasra numbers before writing the affidavit.",
                  },
                  {
                    step: "2",
                    title: "Purchase Rs. 20 e-Stamp &amp; Attest",
                    desc: "Print your completed Intkal Virasat affidavit on a Rs. 20 HP non-judicial e-Stamp paper and sign before a Magistrate, Notary, or Oath Commissioner.",
                  },
                  {
                    step: "3",
                    title: "File Report with Circle Patwari",
                    desc: "Submit the affidavit, Death Certificate, and ID proofs to the Halka Patwari to record a Roznamcha diary number and Parat Intkal entry.",
                  },
                  {
                    step: "4",
                    title: "Attend Jalsa-e-Aam Open Hearing",
                    desc: "Heirs or their authorised relatives confirm the Shajra Nasab before the Tehsildar or Naib-Tehsildar during the open village mutation camp.",
                  },
                  {
                    step: "5",
                    title: "Download Updated Jamabandi Fard",
                    desc: "After attestation under Section 35, verify that all heir names and Section 118 entries reflect online in Himbhoomi records.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#172228]">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-rose-50/70 border border-rose-200 p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#C65378] font-extrabold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>Disputed Mutations &amp; 30-Day Collector Appeal Rule</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  If co-heirs dispute a Will or inheritance claim during Jalsa-e-Aam, the Revenue Officer conducts a summary inquiry under Section 37 of the 1954 Act. Under Sections 14 and 15, any aggrieved heir must file an appeal before the District Collector within 30 days of the Tehsildar&apos;s order (60 days before the Commissioner and 90 days before the Financial Commissioner). Remember that mutation never grants final ownership title by itself; serious Will disputes belong in Civil Court.
                </p>
              </div>
            </section>

            {/* SECTION 8: CASE STUDIES & PRECEDENTS */}
            <section
              id="case-studies"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#5F7E75]">
                  Real Ground Scenarios &amp; Judgments
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                  Shimla Orchard Scenarios &amp; Supreme Court Rulings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#C65378]">
                    Case Study 1 • Rohru Apple Orchard
                  </span>
                  <h4 className="font-bold text-base text-[#172228]">
                    Married Daughter Living Outside Himachal
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A brother sought Virasat mutation excluding his married sister living in Chandigarh, arguing she lacked a Himachal agriculturist certificate. Under the Hindu Succession Act, 1956 and the Section 118(1) natural heir exemption, she held equal Class I rights. Submitting a corrected Shajra Nasab affidavit ensured equal Jamabandi entry.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5F7E75]">
                    Case Study 2 • Kangra Land vs Outsider Will
                  </span>
                  <h4 className="font-bold text-base text-[#172228]">
                    Non-Agriculturist Caretaker Named in Will
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A retired owner left farmland by unregistered Will to a non-agriculturist business partner instead of natural nephews. The Tehsildar paused the Intkal under Section 118(1). Without prior State Government clearance, a non-heir non-agriculturist cannot take land via Will.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#172228] text-white p-6 space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-rose-300">
                  Key Supreme Court &amp; HP High Court Precedents
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <li>
                    <strong className="text-white">Ajay Dabra v. Pyare Ram &amp; Ors. (2023 Supreme Court):</strong>{" "}
                    Reaffirmed that Section 118 of the 1972 Act exists to protect small Himachal agriculturists and stop rampant transfer of farm holdings to non-agriculturists.
                  </li>
                  <li>
                    <strong className="text-white">Kuldeep Singal v. Rakesh Kumar (2019 HP High Court, RSA No. 688/2008):</strong>{" "}
                    Clarified that the statutory exemption under Section 118 protects Wills only in favour of natural legal heirs, never strangers who fail the agriculturist test.
                  </li>
                  <li>
                    <strong className="text-white">Shree Vinod Kumar v. State of Himachal Pradesh (Supreme Court):</strong>{" "}
                    Foundational constitutional ruling upholding state agrarian land reform protections in Himachal Pradesh.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 9: OFFICIAL PORTALS, HUB-SPOKE LINKS & DUAL CONVERSION BANNER */}
            <section
              id="official-links"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  Verified Government Portals &amp; Legal Spokes
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                  Official HP Portals &amp; Related Legal Tools
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CITATIONS_DATA.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200 hover:border-[#C65378] text-xs font-bold text-[#172228] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200 hover:border-[#C65378] text-xs font-bold text-[#172228] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5F7E75] shrink-0" />
                    </Link>
                  )
                )}
              </div>

              {/* DUAL CONVERSION CTA BANNER */}
              <div className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-6 sm:p-8 text-center space-y-4">
                <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                  Need Advocate Vetting for Your HP Intkal File?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Avoid Patwari objections or Section 118 notices on ancestral apple orchards. Start a registered Himachal Will online or schedule a dedicated consultation with our land revenue desk.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#b04366] transition-all shadow-lg shadow-[#C65378]/25"
                  >
                    Book HP Land Law Consultation
                  </Link>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#172228] font-extrabold text-sm hover:bg-slate-100 transition-all"
                  >
                    Draft Legal HP Will Online
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 10: 8 EXPANDABLE FAQS */}
            <section
              id="faq"
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  Common Questions Answered
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] mt-0.5">
                  Frequently Asked Questions on HP Intkal
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl border border-slate-200 bg-[#FAF7F0]/60 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
                      >
                        <span className="font-bold text-sm sm:text-base text-[#172228]">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PLAIN-ENGLISH READABILITY SUMMARY STRIP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Intkal Matters Fast</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Do not delay reporting a death to your Patwari. Updating Jamabandi records keeps your apple orchard safe from crop-loan stops and border fights.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Natural Heirs Stay Safe</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spouses, sons, and married daughters do not need State Government approval under Section 118. Add clear pedigree names and claim your share.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Prevent Future Disputes</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Write a clear Will while healthy and list every Khasra number cleanly. It protects your children and keeps revenue hearings smooth.
                </p>
              </div>
            </div>
          </main>

          {/* -----------------------------------------------------------------
              RIGHT SIDEBAR: AUTHOR BIO, DUAL CONVERSION CTA & CHECKLIST
              ----------------------------------------------------------------- */}
          <aside className="sticky top-24 space-y-5">
            {/* AUTHOR BIO CARD */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#172228] text-white font-extrabold flex items-center justify-center text-sm shrink-0">
                  AM
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#172228]">
                    Lawyer Anuj Anand Malik
                  </h3>
                  <p className="text-[11px] font-semibold text-[#C65378]">
                    Founder, AMA Legal Solutions
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reviewed for Section 118 HP Tenancy compliance, Shimla and upper-belt orchard succession, and Himbhoomi Jamabandi mutation filings.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#5F7E75]">
                <Award className="w-4 h-4 shrink-0" />
                <span>Verified Legal Format • Updated Nov 2026</span>
              </div>
            </div>

            {/* DUAL CONVERSION CTA 1: WILL PLATFORM /START */}
            <div className="bg-[#172228] text-white rounded-2xl p-5 shadow-md space-y-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                Estate Planning Tool
              </span>
              <h3 className="text-base font-extrabold text-white">
                Protect HP Orchards With a Valid Will
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Draft a Section 118-safe Will listing Khasra numbers and natural heirs in 15 minutes online.
              </p>
              <Link
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-[#172228] text-xs font-extrabold hover:bg-slate-100 transition-colors"
              >
                <span>Start Free Will Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* DUAL CONVERSION CTA 2: ADVOCATE HELP /CONTACT */}
            <div className="bg-white rounded-2xl border-2 border-[#C65378]/30 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#C65378] text-xs font-extrabold uppercase tracking-wider">
                <Landmark className="w-4 h-4" />
                <span>HP Land Law Desk</span>
              </div>
              <h3 className="text-base font-extrabold text-[#172228]">
                Stuck With Sec 118 or Contested Intkal?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult our senior lawyers for contested Tehsildar orders, 30-day Collector appeals, or NRI orchard mutations.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#b04366] transition-colors"
              >
                <span>Request HP Land Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* TRUST CHECKLIST CARD */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-slate-200 p-5 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Before Visiting the Patwari
              </h4>
              {[
                "Use Rs. 20 HP non-judicial e-Stamp",
                "Verify Khata & Khasra on Himbhoomi",
                "Include all daughters in Shajra Nasab",
                "Insert Sec 118 natural heir clause",
              ].map((line) => (
                <div key={line} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR (NO PHONE NUMBERS) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-rose-200 px-4 py-3 flex items-center gap-2.5 shadow-lg">
        <a
          href="#himbhoomi-draft"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#172228] text-white text-xs font-extrabold text-center"
        >
          View Affidavit Draft
        </a>
        <Link
          href="/contact"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#C65378] text-white text-xs font-extrabold text-center"
        >
          HP Legal Consultation
        </Link>
      </div>

      {/* HIGH-RES IMAGE MODAL */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                HP Intkal Mutation Affidavit Format &amp; Section 118 Blueprint
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#FAF7F0] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/himachal-pradesh-intkal-mutation-affidavit-format-og.jpg"
                alt="HP Intkal Mutation Affidavit Format for Himbhoomi and Section 118 compliance"
                width={1200}
                height={675}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
