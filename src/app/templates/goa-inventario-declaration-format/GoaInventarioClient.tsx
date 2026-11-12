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
  Coins,
  Layers,
  Globe,
  Gavel,
} from "lucide-react";

// Table of Contents Items (matching section IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Goa Inventario & Civil Code Rules" },
  { id: "legitima-calculator", label: "2. Free Legitima & Meeacao Calculator" },
  { id: "inventario-vs-notary", label: "3. Court Inventario vs Special Notary" },
  { id: "legitima-reserve-table", label: "4. Mandatory 50% Legitima Reserve" },
  { id: "estate-inventory-schedule", label: "5. Estate Inventory Schedule (s. 399)" },
  { id: "cabeca-de-casal-duties", label: "6. Cabeca de Casal Order & Duties" },
  { id: "inventario-declaration-template", label: "7. Cabeca de Casal & Petition Formats" },
  { id: "goa-court-filing-sop", label: "8. Goa Court Filing Steps & Checklist" },
  { id: "taluka-comunidade-nri", label: "9. Taluka Courts, Comunidade & NRIs" },
  { id: "goa-case-studies", label: "10. Real Cases: Margao & Panaji" },
  { id: "statutory-citations", label: "11. Legal Citations & Goa Portals" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const GOA_TALUKA_COURTS = [
  {
    name: "Salcete (Margao)",
    court: "Civil Judge Senior / Junior Division, Margao",
    areas: "Margao, Fatorda, Colva, Benaulim, Navelim, Curtorim, Cuncolim",
    notes: "High volume of NRI and ancestral house Inventario filings.",
  },
  {
    name: "Tiswadi (Panaji)",
    court: "Civil Judge Senior / Junior Division, Panaji",
    areas: "Panaji, Taleigao, Dona Paula, Miramar, Ribandar, Old Goa",
    notes: "Handles urban flats, business shares, and Comunidade plots.",
  },
  {
    name: "Bardez (Mapusa)",
    court: "Civil Judge Senior / Junior Division, Mapusa",
    areas: "Mapusa, Porvorim, Calangute, Candolim, Assagao, Siolim, Anjuna",
    notes: "Handles coastal villa titles and UK/Gulf NRI estate shares.",
  },
  {
    name: "Mormugao (Vasco)",
    court: "Civil Judge Senior / Junior Division, Vasco da Gama",
    areas: "Vasco, Chicalim, Bogmalo, Cortalim, Dabolim, Sancoale",
    notes: "Covers port-area residences and apartment transfers.",
  },
  {
    name: "Ponda & Pernem",
    court: "Civil Judge Junior / Senior Division, Ponda & Pernem",
    areas: "Ponda, Marcela, Shiroda, Pernem, Morjim, Arambol, Mandrem",
    notes: "Handles agricultural lands, orchards, and village homes.",
  },
  {
    name: "Bicholim, Quepem & Canacona",
    court: "Taluka Civil Courts & Special Notary Desks",
    areas: "Bicholim, Sanquelim, Quepem, Curchorem, Canacona, Sanguem",
    notes: "Handles joint family properties and Form I & XIV updates.",
  },
];

const LEGITIMA_RESERVE_ROWS = [
  {
    heirs: "Surviving Children / Grandchildren (Descendant Heirs)",
    legitima: "50% (Half of Deceased's Estate)",
    quotaDisponivel: "50% (Freely Disposable by Will or Gift)",
    section: "Section 83(a) of 2012 Act & PCC Art. 1784",
    practicalRule:
      "All children share the 50% reserve equally. Sons and married daughters hold equal birth-based parity.",
  },
  {
    heirs: "Surviving Spouse Only (No Children or Descendants)",
    legitima: "100% of Deceased's Estate (Protected Forced Share)",
    quotaDisponivel: "0% (Spouse Cannot Be Disinherited)",
    section: "Section 83(b) of Goa Succession Act, 2012",
    practicalRule:
      "Under Section 83(b), when no children survive, the spouse takes the entire estate unless disinherited for legal cause.",
  },
  {
    heirs: "Parents Alive (No Spouse and No Children)",
    legitima: "100% (Equal Shares Between Mother and Father)",
    quotaDisponivel: "0% (Reserved for Parents)",
    section: "Section 83(c) of Goa Succession Act, 2012",
    practicalRule:
      "If both parents survive, each takes half of the Legitima. If one parent lives, that parent takes the full share.",
  },
  {
    heirs: "Grandparents / Other Ascendants (No Spouse, Children, or Parents)",
    legitima: "33.33% (One-Third of Estate)",
    quotaDisponivel: "66.67% (Two-Thirds Disposable by Will)",
    section: "Section 83(d) of Goa Succession Act, 2012",
    practicalRule:
      "Grandparents hold a one-third forced reserve. The estate owner may Will away the remaining two-thirds.",
  },
  {
    heirs: "No Spouse, No Descendants, No Ascendants (Siblings / Relatives Only)",
    legitima: "0% (No Forced Heirs)",
    quotaDisponivel: "100% (Full Testamentary Freedom)",
    section: "Section 83 Read with Intestate Rules",
    practicalRule:
      "Brothers, sisters, and cousins are not forced heirs. You may bequeath 100% via a registered Public or Sealed Will.",
  },
];

const FAQS = [
  {
    q: "Who can act as Cabeca de Casal in Goa Inventario proceedings?",
    a: "The surviving spouse comes first if married under Communion of Assets. Next comes the eldest child living in the home, followed by other children or parents. This priority follows the Goa Succession Act, 2012 and Articles 2068 to 2070 of the Portuguese Civil Code.",
  },
  {
    q: "When are Inventario proceedings mandatory in Goa?",
    a: "Under Section 366 of the 2012 Act, court Inventario is mandatory if there is a surviving spouse, a minor child, an absent or NRI heir, or an unknown heir. If all heirs are present adults, they can use a Special Notary Deed under Section 15 and Section 346.",
  },
  {
    q: "What must the Cabeca de Casal declaration on oath include?",
    a: "Under Section 376, the statement must list the death date, marriage regime, antenuptial contract details, all forced and Will heirs, lifetime gifts for collation, and estate debts. Under Section 378, the court treats these facts as true unless an heir proves otherwise.",
  },
  {
    q: "How does the 50% Legitima reserve work in Goa?",
    a: "Under Section 83 of the 2012 Act and Articles 1784 to 1785 of the Portuguese Civil Code, 50% of a parent's estate is locked for children as Legitima. Only the other 50% Quota Disponivel can be gifted or willed freely. Any extra gift can be cut down in court.",
  },
  {
    q: "How is Spouse Meeacao calculated before the 50% Legitima?",
    a: "In a standard Goa marriage under Communion of Assets, each spouse owns half of all marital wealth. On one spouse's death, the survivor keeps their 50% Meeacao outright. Only the deceased spouse's half enters the estate for Legitima and Will division.",
  },
  {
    q: "In what order must assets appear in the Estate Inventory Schedule?",
    a: "Under Section 399, the Relacao de Bens starts with money owed to the estate, securities, cash, gold, other movables, and livestock. Next come houses and plots with Matriz and Form I and XIV survey numbers. Debts owed by the estate go last.",
  },
  {
    q: "Can an NRI heir join a Goa Inventario without flying to India?",
    a: "Yes. An NRI or Portuguese passport holder can sign a Special Power of Attorney before the Indian Consulate or an Apostille notary. A local relative or advocate in Goa can then represent their share in the Civil Court.",
  },
  {
    q: "How do heirs update Form I and XIV after the Inventario order?",
    a: "Once the court signs the final partition order under Section 442 confirming the Mapa de Partilha, heirs submit a certified copy and death certificate to the Talathi and Mamlatdar. The revenue office then mutates the Form I and XIV record.",
  },
];

export default function GoaInventarioClient() {
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
  const [activeDraftTab, setActiveDraftTab] = useState<"declaration" | "petition">("declaration");
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE GOA LEGÍTIMA & MEEAÇÃO SIMULATOR
  // ==========================================
  const [marriageRegime, setMarriageRegime] = useState<"communion" | "separate" | "single">(
    "communion"
  );
  const [heirProfile, setHeirProfile] = useState<"children" | "spouse_only" | "parents_only" | "none">(
    "children"
  );
  const [numChildren, setNumChildren] = useState<number>(2);
  const [hasMinorOrNri, setHasMinorOrNri] = useState<boolean>(true);
  const [grossEstate, setGrossEstate] = useState<number>(24000000); // ₹2.40 Cr
  const [estateDebts, setEstateDebts] = useState<number>(2000000); // ₹20 Lakhs

  const effectiveDebts = Math.min(estateDebts, grossEstate);
  const netJointEstate = Math.max(0, grossEstate - effectiveDebts);

  // Communion of Assets gives surviving spouse 50% Meeacao outright (if married under communion)
  const hasSurvivingSpouse = marriageRegime !== "single";
  const spouseMeeacao =
    marriageRegime === "communion" && heirProfile !== "parents_only"
      ? Math.round(netJointEstate * 0.5)
      : 0;

  const deceasedEstate = Math.max(0, netJointEstate - spouseMeeacao);

  let legitimaRate = 0.5;
  if (heirProfile === "children") {
    legitimaRate = 0.5;
  } else if (heirProfile === "spouse_only") {
    legitimaRate = hasSurvivingSpouse ? 1.0 : 0;
  } else if (heirProfile === "parents_only") {
    legitimaRate = 1.0;
  } else {
    legitimaRate = 0;
  }

  const legitimaReserve = Math.round(deceasedEstate * legitimaRate);
  const quotaDisponivel = Math.max(0, deceasedEstate - legitimaReserve);
  const perChildForcedShare =
    heirProfile === "children" && numChildren > 0
      ? Math.round(legitimaReserve / numChildren)
      : 0;

  const isMandatoryCourt =
    hasMinorOrNri || hasSurvivingSpouse || marriageRegime === "communion";
  const cabecaDeCasalPriority =
    marriageRegime === "communion"
      ? "Surviving Spouse (Priority 1 under PCC Art. 2068 & 2012 Act)"
      : heirProfile === "children"
      ? "Eldest Resident Child (Priority 2 under PCC Art. 2068)"
      : heirProfile === "parents_only"
      ? "Surviving Parent / Ascendant (Priority 3)"
      : "Nearest Collateral / Testamentary Executor";

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

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const CABECA_DECLARATION_TEXT = `IN THE COURT OF THE CIVIL JUDGE [SENIOR / JUNIOR] DIVISION AT [MARGAO / PANAJI / MAPUSA / VASCO]
INVENTORY PROCEEDING NO. [____] OF [2026]

In the Estate of Late [Full Name of Deceased],
formerly resident of [House No., Ward / Vaddo, Village / Town, Taluka, Goa - PIN].

DECLARATION ON OATH OF THE HEAD OF THE FAMILY (CABECA DE CASAL)
(Under Sections 376 and 378 of the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012)

I, [Full Name of Cabeca de Casal], aged about [Age] years, [occupation], resident of [Full Residential Address in Goa], being appointed as the Head of the Family (Cabeca de Casal) by Order of this Hon'ble Court dated [Date], do hereby solemnly affirm on oath and state as under:

1. PARTICULARS OF THE ESTATE LEAVER (DECEASED):
That the deceased [Full Name of Deceased], son/daughter of Late [Father's Name], permanently resided at [Goa Address] within the jurisdiction of this Hon'ble Court. The deceased passed away on [Date of Death] at [Place of Death], as evidenced by Death Certificate No. [Cert No.] issued by [Registrar of Births and Deaths, Village Panchayat / Municipality].

2. MARRIAGE REGIME & ANTENUPTIAL STATUS:
That the deceased was married to [Name of Surviving / Predeceased Spouse] on [Date of Marriage] under Marriage Registration No. [Assento No.] in the Office of the Civil Registrar of [Taluka], Goa. The marriage was governed by the regime of Communion of Assets (Comunhao de Bens) [OR: Separate Assets pursuant to registered Antenuptial Contract dated (Date), Document No. (No.)].

3. COMPLETE LIST OF FORCED & INTERESTED LEGAL HEIRS:
That the deceased left behind the following legal heirs (Herdeiros Legitimarios / Interested Parties):
(a) [Spouse Name], aged [Age] years, [Surviving Spouse / Moiety Holder], residing at [Address].
(b) [Eldest Child Name], aged [Age] years, [Son / Married Daughter], married to [Spouse Name if married], residing at [Address / NRI Overseas Address].
(c) [Second Child Name], aged [Age] years, [Son / Daughter], [if minor, mention DOB and natural guardian], residing at [Address].
(d) [Third Child Name], aged [Age] years, [Son / Daughter], residing at [Address].
[Note: List every child, predeceased child's issue, and surviving parents with complete addresses.]

4. EXISTENCE OF WILL OR ANTENUPTIAL SETTLEMENT:
That to the best of my knowledge and belief, the deceased died intestate without leaving any Will or Codicil.
[OR: That the deceased left behind a Public / Sealed Will dated (Date) registered before the Special Notary / Civil Registrar of (Taluka) at Book No. (No.), Volume (Vol.), disposing only of the 50% Disposable Quota (Quota Disponivel) in favour of (Name).]

5. LIFETIME GIFTS LIABLE FOR COLLATION (COLACAO):
That during his/her lifetime, the deceased did not make any gift or advance to any forced heir liable for collation under the Act [OR: gifted Plot/Sum of Rs. (Amount) to Heir (Name) vide Deed dated (Date), which is subject to collation against the 50% Legitima].

6. CREDITORS, LEGATEES & ADMINISTRATION UNDERTAKING:
That there are no undisclosed creditors other than those shown in the Relacao de Bens (List of Assets and Liabilities) filed herewith under Section 399. I undertake to administer the estate faithfully, render true accounts under Section 379, and produce every asset before this Hon'ble Court until final partition (Partilha).

Solemnly affirmed on oath before this Hon'ble Court at [Margao / Panaji], Goa, on this [Day] day of [Month], [Year].

DEPONENT (CABECA DE CASAL)
[Signature / Thumb Impression]

VERIFICATION
I, [Full Name of Cabeca de Casal], the Deponent above named, do hereby verify that the contents of paragraphs 1 to 6 above are true and correct to my personal knowledge and official records, and nothing material has been concealed therefrom. I am aware that any false statement attracts personal liability under Section 382 of the Act.

Verified at [Margao / Panaji], Goa, on [Date].
DEPONENT`;

  const INVENTARIO_PETITION_TEXT = `IN THE COURT OF THE CIVIL JUDGE [SENIOR / JUNIOR] DIVISION AT [MARGAO / PANAJI / MAPUSA]
INVENTORY PROCEEDING NO. [____] OF [2026]

APPLICANT:
[Name of Petitioning Heir / Surviving Spouse], aged [Age] years, [Relation to Deceased], residing at [Full Address],
... Petitioner / Applicant

VERSUS

INTERESTED PARTIES:
1. [Name of Co-Heir 1], aged [Age] years, residing at [Address].
2. [Name of Co-Heir 2], aged [Age] years, residing at [Address].
3. [Name of NRI / Minor Co-Heir 3], represented where minor by natural guardian / POA holder, residing at [Address].

PETITION FOR INITIATION OF MANDATORY / OPTIONAL INVENTORY PROCEEDINGS
(Under Sections 366 / 367 and 375 of the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012)

MOST RESPECTFULLY SHEWETH:
1. That [Full Name of Deceased], permanent resident of [Address in Goa], expired at [Place] on [Date of Death], leaving behind the Applicant and Interested Parties as legal heirs and moiety holder.
2. That the deceased was married under the regime of Communion of Assets (Comunhao de Bens), and the surviving spouse holds a 50% Meeacao moiety share while the remaining estate devolves as per the 50% Legitima reserve under Section 83.
3. That Inventory Proceedings are mandatory under Section 366 of the Act because the deceased left behind [a surviving spouse / a minor heir / an absent NRI heir residing abroad], and the parties desire judicial partition of the estate listed in the preliminary schedule annexed hereto.
4. That [Name of Proposed Cabeca de Casal] is the [Surviving Spouse / Eldest Resident Child] and is legally qualified under the Act to be appointed as Head of the Family (Cabeca de Casal), being under 70 years of age and residing in Goa.
5. That the immovable properties are situated within the territorial limits of this Hon'ble Court, and the estate valuation falls within this Court's pecuniary jurisdiction under Section 373.

PRAYER:
The Applicant therefore prays that this Hon'ble Court may be pleased to:
(a) Institute Inventory Proceedings in respect of the estate of Late [Name of Deceased];
(b) Appoint [Name] as the Head of the Family (Cabeca de Casal) under Section 376 and administer the oath for recording declarations and filing the Relacao de Bens under Section 399;
(c) Issue notices to all Interested Parties and pass a final Order of Partition (Partilha) under Section 442.

Place: [Margao / Panaji], Goa
Date: [DD/MM/YYYY]

APPLICANT                                         ADVOCATE FOR APPLICANT`;

  const ESTATE_SCHEDULE_TEXT = `RELAÇÃO DE BENS (INITIAL LIST OF ASSETS & LIABILITIES)
(Under Section 399 of the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012)
[Note: Keep approx. 5 cm blank space between items and sign/initial every page.]

PART A: CREDITS DUE TO THE ESTATE, SECURITIES, CASH & MOVABLES
Verba No. 1 (Credits Due): Fixed Deposit Receipt No. [FDR No.] with [Bank Name & Branch, Goa] maturing on [Date], balance Rs. [Amount]/-.
Verba No. 2 (Bank Accounts): Savings Bank Account No. [A/c No.] at [Bank Name, Goa], balance as on date of death Rs. [Amount]/-.
Verba No. 3 (Demat & Shares): [Number] Equity Shares held in DP ID [ID] / Client ID [ID], valued at Rs. [Amount]/-.
Verba No. 4 (Cash & Foreign Coins): Cash in hand Rs. [Amount]/- [and Foreign Currency if any].
Verba No. 5 (Gold, Silver & Jewellery): Gold ornaments weighing [Grams] grams (22K), appraised at Rs. [Amount]/-.
Verba No. 6 (Vehicles & Household Movables): [Vehicle Make, Reg No. GA-XX-XX-XXXX], valued at Rs. [Amount]/-.

PART B: IMMOVABLE PROPERTIES (GOA LAND & BUILDINGS)
Verba No. 7 (Ancestral Dwelling House & Plot):
All that residential house bearing House Tax No. [No.] together with land bearing Survey No. [Survey No.], Sub-Division No. [Sub-Div], situated at Village [Village Name], Taluka [Salcete / Tiswadi / Bardez], District [South/North Goa], recorded in Form I & XIV in the name of [Name], Matriz No. [No.], Land Registration Office Description No. [No.] / Inscription No. [No.], admeasuring [Area] sq. meters.
Boundaries: North: [Boundary], South: [Boundary], East: [Boundary], West: [Boundary].
Estimated Market Value: Rs. [Amount]/-.

Verba No. 8 (Agricultural / Coconut Orchard / Plot):
Survey No. [No.], Sub-Division [No.], Village [Name], Taluka [Name], admeasuring [Area] sq. meters, recorded in Form I & XIV. Estimated Value: Rs. [Amount]/-.

PART C: DEBTS & LIABILITIES OWED BY THE ESTATE
Verba No. 9 (Funeral & Medical Bills): Verified last illness hospital bills and funeral expenses of Rs. [Amount]/-.
Verba No. 10 (Mortgage / Bank Loan): Outstanding housing loan A/c No. [No.] with [Bank Name], balance Rs. [Amount]/-.

SIGNATURE / INITIALS OF CABECA DE CASAL ON EACH PAGE: ___________________`;

  const CHECKLIST_TEXT = `GOA CIVIL COURT INVENTARIO FILING CHECKLIST (10 ESSENTIAL PAPERS):
1. Original or certified Death Certificate of the estate leaver (and burial/cremation record if needed).
2. Certified Marriage Certificate (Assento de Casamento) from the Goa Civil Registrar.
3. Registered Antenuptial Contract (if married under separation of assets), else Communion of Assets applies.
4. Certified copy of Public Will or Sealed Will (if any) registered with the Special Notary / Civil Registrar.
5. Current Form I & XIV (Record of Rights) or Form B / Form D (City Survey) for every Goa property.
6. Land Registration (Conservatoria) Certificate & Matriz Predial extract showing old Portuguese title link.
7. House Tax Receipt and Panchayat / Municipal Occupation Certificate for residential houses.
8. Family Tree / Pedigree details with full names, ages, marital status, and addresses of all heirs.
9. Bank passbook statements, Fixed Deposit receipts, Demat statements, and gold valuation receipts as on death date.
10. Special Power of Attorney (Embassy-attested or Apostilled) for any NRI or overseas co-heir.`;

  const copyDraftToClipboard = () => {
    const text =
      activeDraftTab === "declaration" ? CABECA_DECLARATION_TEXT : INVENTARIO_PETITION_TEXT;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const copyScheduleToClipboard = () => {
    navigator.clipboard.writeText(ESTATE_SCHEDULE_TEXT);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    navigator.clipboard.writeText(CHECKLIST_TEXT);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>GOA SUCCESSION &amp; INVENTORY ACT, 2012 • PORTUGUESE CIVIL CODE</span>
          </div>

          {/* Strict Single H1 Tag (51 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Goa Inventario &amp; Cabeca de Casal Declaration Format
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download verified Goa Inventario legal heir declaration formats for Civil Courts in Margao,
            Panaji, and Mapusa. Includes the Cabeca de Casal oath draft, Section 399 estate inventory
            schedule, and a free 50% Legitima reserve calculator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inventario-declaration-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Cabeca de Casal Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Goa-Compliant Will</span>
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Goa Counsel</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Act 2012</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GOA INVENTORY STATUTE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">50% Reserve</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY LEGITIMA RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 376</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CABECA DE CASAL OATH
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 399</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RELAÇÃO DE BENS SCHEDULE
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

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Goa Legal Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012
                (ss. 14, 15, 83, 346, 366 to 442) and Portuguese Civil Code, 1867 (arts. 1761 to 2166).
              </p>
            </div>

            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Court Filing Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Copy the Section 376 Cabeca de Casal oath format and Section 399 asset list, or consult
                our Goa succession advocates.
              </p>
              <a
                href="#inventario-declaration-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Format Draft</span>
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
                  src="/images/goa-inventario-declaration-format-og.jpg"
                  alt="Goa Inventario Cabeca de Casal Declaration Format and 50% Legitima Guide"
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
                    Goa Inventario Proceeding Kit: Cabeca de Casal Oath, Relacao de Bens Schedule &amp; 50% Legitima Reserve
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: GOA INVENTARIO ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Different from Mainland India:</strong> Goa courts reject standard Hindu
                    Succession Act affidavits. You must file under the Goa Succession, Special Notaries
                    and Inventory Proceeding Act, 2012.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Spouse Meeacao Comes First:</strong> In a Communion of Assets marriage, the
                    surviving spouse keeps 50% of all marital wealth outright before inheritance shares start.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory 50% Legitima Reserve:</strong> Under Section 83, half of the
                    deceased&apos;s estate goes to forced heirs like children. Only the other half can be
                    freely willed away.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Presumption of Truth (s. 378):</strong> Once the Head of Family (Cabeca de
                    Casal) files a sworn declaration under Section 376, the court assumes it is true unless
                    disproved.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>When Court Is Mandatory (s. 366):</strong> If there is a surviving spouse, a
                    minor child, or an NRI heir living abroad, you must file a court Inventario.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Goa Inventario Law &amp; Portuguese Civil Code Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Goa follows a uniform civil code for all communities. Unlike the rest of India, the
                  Hindu Succession Act, 1956 and Indian Succession Act, 1925 do not govern family
                  inheritance in Goa.
                </p>
                <p>
                  Instead, inheritance is governed by the{" "}
                  <strong>Portuguese Civil Code, 1867 (Articles 1761 to 2166)</strong> and the{" "}
                  <strong>Goa Succession, Special Notaries and Inventory Proceeding Act, 2012</strong>.
                  Every house, plot, and bank account of a deceased Goan resident must pass through formal
                  inventory steps.
                </p>
                <p>
                  Most mainland legal websites share generic Tahsildar heir affidavits. Civil Judges in
                  Margao, Panaji, Mapusa, and Vasco reject those drafts on day one. Goa courts require a
                  sworn <strong>Cabeca de Casal declaration</strong> (Head of the Family statement) under{" "}
                  <strong>Sections 376 and 378</strong> of the 2012 Act.
                </p>
                <p>
                  Under <strong>Section 366</strong>, court Inventario is mandatory if the deceased leaves a
                  surviving spouse, minor child, or an NRI heir living abroad. If all heirs are adult
                  residents with no legal disability, they may use a Special Notary Deed under{" "}
                  <strong>Sections 15 and 346</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE LEGÍTIMA & MEEAÇÃO CALCULATOR */}
            <section id="legitima-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE LEGÍTIMA CALCULATION BOX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Goa Legitima &amp; Meeacao Share Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Adjust the family details below to find the spouse&apos;s 50% Meeacao moiety, the forced
                50% Legitima reserve, each child&apos;s share, and the Quota Disponivel under Section 83
                of the 2012 Act.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Marriage Regime</span>
                    </label>
                    <select
                      value={marriageRegime}
                      onChange={(e) =>
                        setMarriageRegime(e.target.value as "communion" | "separate" | "single")
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="communion">Communion of Assets (Default)</option>
                      <option value="separate">Separate Assets (Antenuptial Deed)</option>
                      <option value="single">Widowed / Unmarried Deceased</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Forced Heir Group</span>
                    </label>
                    <select
                      value={heirProfile}
                      onChange={(e) =>
                        setHeirProfile(
                          e.target.value as "children" | "spouse_only" | "parents_only" | "none"
                        )
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="children">Living Children / Grandchildren</option>
                      <option value="spouse_only">Surviving Spouse (No Children)</option>
                      <option value="parents_only">Living Parents (No Spouse/Kids)</option>
                      <option value="none">No Spouse, Kids, or Parents</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Any Minor or NRI Heir?</span>
                    </label>
                    <select
                      value={hasMinorOrNri ? "yes" : "no"}
                      onChange={(e) => setHasMinorOrNri(e.target.value === "yes")}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="yes">Yes (Minor / Absent / NRI Abroad)</option>
                      <option value="no">No (All Heirs Adult &amp; Present)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Gross Estate Value: {formatINR(grossEstate)}
                      </label>
                      <span className="text-xs font-semibold text-slate-500">Land + Bank + Gold</span>
                    </div>
                    <input
                      type="range"
                      min={2000000}
                      max={100000000}
                      step={1000000}
                      value={grossEstate}
                      onChange={(e) => setGrossEstate(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>Rs. 20 Lakhs</span>
                      <span>Rs. 5.00 Cr</span>
                      <span>Rs. 10.00 Cr</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Verified Estate Debts: {formatINR(effectiveDebts)}
                      </label>
                      <span className="text-xs font-semibold text-slate-500">Loans &amp; Funeral Costs</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={Math.round(grossEstate * 0.5)}
                      step={500000}
                      value={effectiveDebts}
                      onChange={(e) => setEstateDebts(Number(e.target.value))}
                      className="w-full accent-[#172228] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>Rs. 0</span>
                      <span>25% Debt</span>
                      <span>50% Max</span>
                    </div>
                  </div>
                </div>

                {heirProfile === "children" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Number of Living Children (Including Married Daughters): {numChildren}
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setNumChildren(count)}
                          className={`w-9 h-9 rounded-xl font-extrabold text-xs transition-colors cursor-pointer ${
                            numChildren === count
                              ? "bg-[#C65378] text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* COMPUTATION RESULTS BOX */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        GOA SUCCESSION ACT 2012 SHARE BREAKDOWN
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {isMandatoryCourt
                        ? "Mandatory Court Inventario (s. 366)"
                        : "Optional Court or Special Notary (s. 15)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Spouse Meeacao (50%)
                      </div>
                      <div className="text-xl font-black text-white mt-1">
                        {formatINR(spouseMeeacao)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {spouseMeeacao > 0
                          ? "Owned outright by surviving spouse"
                          : "No communion moiety applies"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Deceased Net Estate
                      </div>
                      <div className="text-xl font-black text-white mt-1">
                        {formatINR(deceasedEstate)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Enters Inventario partition pool
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Mandatory Legitima
                      </div>
                      <div className="text-xl font-black text-rose-300 mt-1">
                        {formatINR(legitimaReserve)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {heirProfile === "children"
                          ? `${formatINR(perChildForcedShare)} per child (${Math.round(
                              (legitimaRate * 100) / numChildren
                            )}% each)`
                          : `${Math.round(legitimaRate * 100)}% protected by law`}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Quota Disponivel (Free)
                      </div>
                      <div className="text-xl font-black text-emerald-400 mt-1">
                        {formatINR(quotaDisponivel)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {quotaDisponivel > 0
                          ? "Max amount deceased could Will freely"
                          : "Cannot Will away forced share"}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-rose-300" />
                      <span>Appointed Head of Family (Cabeca de Casal) Rule:</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      <strong>Recommended Cabeca de Casal:</strong> {cabecaDeCasalPriority}. If the
                      deceased left no Will, the <strong>Quota Disponivel</strong> ({formatINR(quotaDisponivel)})
                      also passes equally to legal heirs. If a Will gave away more than{" "}
                      <strong>{formatINR(quotaDisponivel)}</strong>, forced heirs can claim reduction under
                      Sections 86 to 111.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COURT INVENTARIO VS SPECIAL NOTARY */}
            <section id="inventario-vs-notary" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>STATUTORY PATHWAY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Court Inventario vs Special Notary Partition
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Section 14 and Section 15 of the 2012 Act allow three distinct paths to divide a
                Goan estate. Picking the wrong forum leads to registry rejection at the Talathi or
                Sub-Registrar office:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Legal Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Mandatory Inventario (s. 366)</th>
                      <th className="py-3.5 px-4">Optional Inventario (s. 367)</th>
                      <th className="py-3.5 px-4">Special Notary Deed (ss. 15 &amp; 346)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">When Required</td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Surviving spouse, minor, or absent NRI heir
                      </td>
                      <td className="py-3 px-4">All adult heirs want court supervision</td>
                      <td className="py-3 px-4">All adult heirs agree and have no disability</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Forum</td>
                      <td className="py-3 px-4">Civil Judge Senior / Junior Division</td>
                      <td className="py-3 px-4">Civil Judge Senior / Junior Division</td>
                      <td className="py-3 px-4">Special Notary (Civil Registrar)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Key Initial Filing</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Petition (s. 375) &amp; Cabeca Oath (s. 376)
                      </td>
                      <td className="py-3 px-4">Petition (s. 375) &amp; Relacao de Bens</td>
                      <td className="py-3 px-4">Deed of Declaration of Heirship (s. 346)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Handles Disputes?</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Yes (Objections &amp; Licitation)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Yes (Judicial bidding s. 427)</td>
                      <td className="py-3 px-4 text-rose-700">No (Requires 100% consent)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Final Title Document</td>
                      <td className="py-3 px-4">Final Order confirming Mapa de Partilha (s. 442)</td>
                      <td className="py-3 px-4">Final Order confirming Mapa de Partilha</td>
                      <td className="py-3 px-4">Registered Deed of Partition (s. 15)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Form I &amp; XIV Mutation</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Accepted by all Mamlatdars</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Accepted by all Mamlatdars</td>
                      <td className="py-3 px-4">Accepted if all s. 366 bars absent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: MANDATORY 50% LEGÍTIMA RESERVE TABLE */}
            <section id="legitima-reserve-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MANDATORY UNIQUE ASSET: SECTION 83 TABLE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Mandatory 50% Legitima Reserve Table
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under <strong>Section 83 of the 2012 Act</strong> and{" "}
                <strong>Articles 1784 to 1785 of the Portuguese Civil Code</strong>, forced heirs hold a
                locked share called the <strong>Legitima</strong> (Quota Indisponivel). No parent can
                exclude a daughter or son from this share through a Will or lifetime gift:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Surviving Family Group</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Mandatory Legitima</th>
                      <th className="py-3.5 px-4">Quota Disponivel (Free)</th>
                      <th className="py-3.5 px-4">Legal Authority</th>
                      <th className="py-3.5 px-4">Practical Impact in Court</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {LEGITIMA_RESERVE_ROWS.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 font-bold text-slate-900">{row.heirs}</td>
                        <td className="py-3 px-4 font-bold text-[#C65378]">{row.legitima}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-700">
                          {row.quotaDisponivel}
                        </td>
                        <td className="py-3 px-4 text-xs">{row.section}</td>
                        <td className="py-3 px-4 text-xs leading-relaxed">{row.practicalRule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Inofficious Will Reduction (Sections 86 to 111):</strong> If a Will or gift
                  cuts into the 50% Legitima, it is called <em>inofficious</em>. It is not totally
                  void, but the court scales down the extra gifts during Inventario so forced heirs
                  get their full statutory half.
                </span>
              </div>
            </section>

            {/* SECTION 5: COMPLETE ESTATE INVENTORY SCHEDULE (RELAÇÃO DE BENS) */}
            <section id="estate-inventory-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>SECTION 399 ASSET SCHEDULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Estate Inventory Schedule (Relacao de Bens)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under <strong>Section 399 of the 2012 Act</strong>, the Cabeca de Casal must file an
                item-wise list of assets called the <strong>Relacao de Bens</strong>. Every item is
                numbered as a <em>Verba</em> in a fixed legal order, with 5 cm spacing between items and
                initials on every page:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Verbas 1 to 4</span>
                    <span className="text-[11px] font-bold text-slate-500">Liquid &amp; Precious Assets</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Credits Due, Shares, Cash &amp; Gold
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Start with money owed to the deceased, then list bank FDs, shares, cash in hand,
                    foreign currency, and gold or silver jewellery with weights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Verbas 5 &amp; 6</span>
                    <span className="text-[11px] font-bold text-slate-500">Movables &amp; Livestock</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Vehicles, Furniture &amp; Livestock
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    List cars, two-wheelers with Goa registration numbers, valuable household goods, and
                    any farm livestock separately for clear valuation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Verbas 7 &amp; 8</span>
                    <span className="text-[11px] font-bold text-slate-500">Goa Real Estate</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Houses &amp; Land (Form I &amp; XIV + Matriz)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    State the Survey Number, Sub-Division, Village, Taluka, Matriz number, Conservatoria
                    Land Registration number, area in sq. m, and four boundaries.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Final Verbas</span>
                    <span className="text-[11px] font-bold text-slate-500">Passive Liabilities</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Debts &amp; Bills Owed by Estate
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Close the schedule by listing bank mortgages, medical bills, and funeral costs so
                    debts are settled under Section 421 before net shares are divided.
                  </p>
                </div>
              </div>

              {/* Copyable Section 399 Schedule Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>Complete Section 399 Relacao de Bens Schedule</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyScheduleToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedSchedule ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Schedule Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Estate Schedule</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap max-h-72 overflow-y-auto">
                  {ESTATE_SCHEDULE_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 6: CABEÇA DE CASAL ORDER, POWERS & DUTIES */}
            <section id="cabeca-de-casal-duties" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>ADMINISTRATOR OF THE ESTATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Cabeca de Casal Order, Powers &amp; Duties
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under <strong>Section 2(h)</strong> of the 2012 Act and{" "}
                  <strong>Portuguese Civil Code Article 2068</strong>, the <strong>Cabeca de Casal</strong>{" "}
                  (Head of the Family) acts as the court-appointed estate manager until partition ends.
                </p>
                <p>
                  The court follows a strict statutory order when picking the Head of Family:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>1. Surviving Spouse:</strong> First priority if married under Communion of
                    Assets or named as an heir, provided they live in Goa and are fit to act.
                  </li>
                  <li>
                    <strong>2. Eldest Resident Child:</strong> If there is no spouse, the court picks
                    the eldest child living with the deceased or managing the family home.
                  </li>
                  <li>
                    <strong>3. Ascendants or Other Heirs:</strong> If no children survive, parents or
                    nearest co-heirs assume the duty after a Section 377 court inquiry.
                  </li>
                </ul>
                <p>
                  Under <strong>Section 379</strong>, the Head of Family collects house rents, pays land
                  taxes, and defends the estate in court. However, they cannot sell or mortgage ancestral
                  property without prior court permission. Under <strong>Section 382</strong>, filing false
                  asset records creates direct personal liability for damages.
                </p>
              </div>
            </section>

            {/* SECTION 7: DOWNLOADABLE / COPYABLE CABEÇA DE CASAL FORMATS */}
            <section
              id="inventario-declaration-template"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COURT-READY GOA LEGAL DRAFTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Cabeca de Casal Declaration &amp; Petition Formats
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Switch tabs below to copy either the sworn{" "}
                <strong>Section 376 Cabeca de Casal Declaration on Oath</strong> or the{" "}
                <strong>Section 375 Initial Inventario Petition Draft</strong> for Goa Civil Courts:
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDraftTab("declaration")}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activeDraftTab === "declaration"
                          ? "bg-[#C65378] text-white"
                          : "bg-white/10 text-slate-200 hover:bg-white/20"
                      }`}
                    >
                      Cabeca de Casal Declaration (ss. 376 &amp; 378)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDraftTab("petition")}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activeDraftTab === "petition"
                          ? "bg-[#C65378] text-white"
                          : "bg-white/10 text-slate-200 hover:bg-white/20"
                      }`}
                    >
                      Inventario Petition Draft (s. 375)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={copyDraftToClipboard}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Draft!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Copy Entire Format</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[600px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {activeDraftTab === "declaration"
                    ? CABECA_DECLARATION_TEXT
                    : INVENTARIO_PETITION_TEXT}
                </div>

                <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <span>
                    Compliant with Goa Succession, Special Notaries and Inventory Proceeding Act, 2012
                  </span>
                  <button
                    type="button"
                    onClick={copyDraftToClipboard}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 8: GOA COURT FILING SOP & CHECKLIST */}
            <section id="goa-court-filing-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>6-STAGE COURT PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Goa Civil Court Inventario Filing Steps
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "File Inventario Petition (Section 375)",
                    desc: "Submit the petition in the Taluka Civil Court with the death certificate, marriage certificate (Assento), Will if any, and preliminary family details.",
                  },
                  {
                    step: 2,
                    title: "Court Appointment of Cabeca de Casal (Sections 376 & 377)",
                    desc: "The Judge verifies priority under Article 2068, resolves any objections under Section 377, and appoints the Head of the Family.",
                  },
                  {
                    step: 3,
                    title: "Oath Declaration & Relacao de Bens (Sections 378 & 399)",
                    desc: "The Cabeca de Casal takes oath, files the heir declaration format, and submits the Section 399 asset and liability list.",
                  },
                  {
                    step: 4,
                    title: "Notice to Heirs & Objections (Section 400)",
                    desc: "Court summons reach all co-heirs (including NRIs). Heirs can file objections to add omitted properties, dispute values, or demand collation.",
                  },
                  {
                    step: 5,
                    title: "Valuation & Licitation Bidding (Sections 409 & 427)",
                    desc: "Court valuers appraise houses and plots. If heirs want one indivisible home, they bid internally (Licitation) and pay cash equalization.",
                  },
                  {
                    step: 6,
                    title: "Mapa de Partilha & Form I & XIV Mutation (Sections 435 to 442)",
                    desc: "The court signs the final partition decree under Section 442. Submit the certified order to the Talathi and Mamlatdar to update Form I and XIV.",
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

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Need the 10-Document Goa Inventario Checklist?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Covers Form I &amp; XIV, Assento, Matriz, Conservatoria papers, and NRI POA.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0 cursor-pointer"
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
            </section>

            {/* SECTION 9: TALUKA COURTS, COMUNIDADE & NRI HEIRS */}
            <section id="taluka-comunidade-nri" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>GOA JURISDICTIONS &amp; SPECIAL ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Taluka Courts, Comunidade Land &amp; NRI Heirs
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under <strong>Section 373</strong>, you must file the Inventario petition in the Civil
                Court where the deceased last lived permanently, or where main Goa land sits:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GOA_TALUKA_COURTS.map((hub) => (
                  <div
                    key={hub.name}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">{hub.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                        Civil Court
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-800">{hub.court}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{hub.areas}</p>
                    <p className="text-[11px] text-[#5F7E75] font-medium">{hub.notes}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base pt-2">
                <p>
                  <strong>Comunidade Lands &amp; Gaunkari Rights:</strong> Under the Code of Comunidades,
                  annual dividend shares (<em>Zon</em>) and <em>Gaunkar</em> membership follow separate
                  statutory enrollment rules and do not go into ordinary estate partition. Only private
                  aforamento titles or superstructures allowed by law enter the Relacao de Bens.
                </p>
                <p>
                  <strong>NRI &amp; Portuguese Passport Heirs:</strong> Many Goan families have heirs in the
                  UK, UAE, Portugal, or Canada. Any absent heir triggers mandatory Inventario under{" "}
                  <strong>Section 366</strong>. Overseas heirs can sign a Special Power of Attorney
                  attested by the Indian Consulate or Apostilled abroad so counsel can appear for them.
                </p>
              </div>
            </section>

            {/* SECTION 10: REAL CASE SCENARIOS */}
            <section id="goa-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL GOA CASE EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Case Scenarios: Margao &amp; Panaji
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE STUDY 1: MARGAO (SALCETE TALUKA)</span>
                    <span className="text-slate-500 font-semibold">Ancestral Goan House</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Father Died Intestate Leaving Spouse, Son in Margao &amp; Daughter in London
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father passed away in Margao leaving an ancestral house worth Rs. 2.00 Cr. Because his
                    daughter lived in London and his wife survived him under Communion of Assets, Section
                    366 barred a Special Notary deed. The mother took oath as Cabeca de Casal using our
                    Section 376 declaration format. She kept her Rs. 1.00 Cr Meeacao, and the remaining Rs.
                    1.00 Cr split equally between the two children (Rs. 50 Lakhs each) via Licitation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE STUDY 2: PANAJI (TISWADI TALUKA)</span>
                    <span className="text-slate-500 font-semibold">Inofficious Will Reduction</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Correcting a Will That Excluded an Elder Sibling from 50% Legitima
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A widower in Panaji wrote a Public Will giving 100% of his flat to his younger son.
                    During Inventario proceedings, the elder brother challenged the bequest under Sections 83
                    and 86 of the 2012 Act. The Civil Judge preserved the younger son&apos;s 50% Quota
                    Disponivel plus half of the 50% Legitima (75% total), and restored the elder
                    brother&apos;s mandatory 25% forced heir share.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PRIMARY LAWS &amp; INTERNAL GUIDES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Statutory Citations &amp; Goa Legal Links
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Primary Governing Statutes &amp; Official Resources:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Goa Succession, Special Notaries and Inventory Proceeding Act, 2012:</strong>{" "}
                    Sections 14, 15, 83, 86 to 112, 346, and 366 to 442 governing Inventario petitions,
                    Cabeca de Casal oaths, and Legitima shares.
                  </li>
                  <li>
                    <strong>Portuguese Civil Code, 1867 (Articles 1761 to 2166):</strong> Communion of Assets
                    (Meeacao), forced heirship doctrine, Head of Family order, and Partilha rules.
                  </li>
                  <li>
                    <strong>Code of Comunidades (Codigo das Comunidades):</strong> Separate rules for
                    village Gaunkari dividends and Comunidade land grants.
                  </li>
                  <li>
                    <strong>Official Statute Portal:</strong> Access verified statutory texts on{" "}
                    <a
                      href="https://www.indiacode.nic.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] font-bold hover:underline"
                    >
                      India Code Digital Repository
                    </a>{" "}
                    and Supreme Court judgments on{" "}
                    <a
                      href="https://www.sci.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] font-bold hover:underline"
                    >
                      Supreme Court of India
                    </a>
                    .
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    Goa Testamentary Counsel
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Start Goa Will Builder
                  </Link>
                  <Link
                    href="/locations/goa"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Will Drafting in Goa
                  </Link>
                  <Link
                    href="/locations/panaji"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Panaji Civil Registrar Guide
                  </Link>
                  <Link
                    href="/blogs/goa-portuguese-civil-code-communion-of-assets-will-rules"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Goa Communion of Assets Guide
                  </Link>
                  <Link
                    href="/templates/partition-deed-format-between-family-members"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Family Partition Deed Format
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Form I &amp; XIV Mutation Desk
                  </Link>
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All Legal Templates Hub
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Goa Inventario
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

            {/* Plain-English Summary Strip (Matches Reference Structure) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why File Inventario Early?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Without an Inventario order, you cannot sell ancestral land in Goa or update Form I and
                  XIV names. Filing early stops title blocks and family disputes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">50% Legitima Made Simple</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  First give half of marital assets to the surviving spouse as Meeacao. Then split the
                  deceased&apos;s share: half is locked for children, and half can go by Will.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Goa Desk Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your Form I and XIV records, draft your Cabeca de Casal declaration,
                  and guide NRI heirs through POA filings in Goa Civil Courts.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Dual Conversion CTA -> /start & /contact)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializes in Goa Portuguese Civil Code succession, Inventario court filings, Quota
                Disponivel Wills, and NRI ancestral land titles at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (/start) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PROTECT YOUR QUOTA DISPONIVEL</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Goa-Compliant Will Respecting 50% Legitima
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid inofficious Will challenges in Goa Civil Courts. Clearly allocate your 50%
                  Quota Disponivel without infringing forced heir rights.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Goa Civil Code &amp; Notary Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - GOA TESTAMENTARY COUNSEL (/contact) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>GOA TESTAMENTARY COUNSEL</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Filing Inventario in Margao, Panaji, or Mapusa Court?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Goa estate desk drafts custom Cabeca de Casal petitions, prepares Section 399
                  schedules, and handles NRI Powers of Attorney.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Book Goa Legal Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Goan Families Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2012 Act Precision:</strong> Strictly follows ss. 375, 376 &amp; 399.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Meeacao &amp; Legitima Clarity:</strong> Zero calculation errors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Form I &amp; XIV Ready:</strong> Matches Talathi &amp; Matriz fields.
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
          href="#inventario-declaration-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Copy Format</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Goa Counsel</span>
        </Link>
      </div>
    </div>
  );
}
