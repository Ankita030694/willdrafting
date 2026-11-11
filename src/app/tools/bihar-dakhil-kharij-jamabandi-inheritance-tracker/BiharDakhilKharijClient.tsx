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
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  Calendar,
  AlertOctagon,
  FileSpreadsheet,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Framework: Bihar Land Mutation Act 2011" },
  { id: "interactive-tracker", label: "2. Bihar Bhumi Inheritance Document Tracker" },
  { id: "vanshavali-validity", label: "3. Mukhiya Vanshavali vs Court Certificate" },
  { id: "jamabandi-panji-2", label: "4. Jamabandi Panji-2 & Khatiyan Succession Update" },
  { id: "statutory-timeline", label: "5. 35-Day vs 75-Day Circle Officer Timeline & Form 4" },
  { id: "dclr-appeal-roadmap", label: "6. Section 7 DCLR Appeal: Challenging Rejection" },
  { id: "daughters-coparcenary", label: "7. Daughters & Female Heirs: Equal Mutation Rights" },
  { id: "comparison-matrix", label: "8. Mutation Pathways: Uncontested vs Contested" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Online Filing on Bihar Bhumi" },
  { id: "practical-case-studies", label: "10. Case Studies: Patna, Muzaffarpur, Gaya" },
  { id: "legal-recital-templates", label: "11. Legal Recitals & Rejection Appeal Templates" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Bihar Mutation" },
  { id: "statutory-citations", label: "14. Legal Citations & Official Revenue Portals" },
];

const FAQS = [
  {
    q: "Is Mukhiya Vanshavali mandatory for Dakhil Kharij in Bihar?",
    a: "No. A Vanshavali issued solely by a Gram Panchayat Mukhiya has no statutory validity under the Bihar Land Mutation Act 2011. While Circle Officers often ask for it, revenue rules accept an affidavit sworn before an Executive Magistrate or Notary Public, certified by the Panchayat Secretary. In disputed cases, a Succession Certificate from a civil court legally supersedes any local Mukhiya document.",
  },
  {
    q: "What documents are required for inheritance mutation on biharbhumi.bihar.gov.in?",
    a: "To file Varisana Dakhil Kharij online, you need: (1) Death Certificate of the registered Jamabandi raiyat, (2) Notarized or Magistrate Pedigree Affidavit (Vanshavali), (3) Jamabandi Panji-2 Khata and Khesra details, (4) Self-declaration affidavit in Bihar Bhumi format, (5) NOC or consent affidavit from all legal heirs including daughters, and (6) Latest land rent receipt (Malguzari Rasid).",
  },
  {
    q: "What is the statutory time limit for Circle Officer to dispose of Dakhil Kharij?",
    a: "Under Section 6 of the Bihar Land Mutation Act 2011, uncontested mutation cases must be completed within 35 working days from filing. If an objection is raised and the case becomes contested, the Circle Officer must conduct formal hearings and dispose of the matter within 75 working days.",
  },
  {
    q: "What can I do if the Circle Officer rejects my Dakhil Kharij application?",
    a: "If a Circle Officer rejects your application, they must pass a reasoned speaking order in Form 4. Under Section 7 of the Bihar Land Mutation Act 2011, you have the statutory right to file a Mutation Appeal before the Deputy Collector Land Reforms (DCLR) within 30 days of the rejection order date.",
  },
  {
    q: "How can I update a deceased ancestor's name in Jamabandi Panji-2?",
    a: "To update deceased raiyat records in Panji-2, apply for inheritance mutation (Varisana Dakhil Kharij) on the Bihar Bhumi portal. If the Jamabandi is missing or damaged, apply first for Jamabandi Parimarjan (correction) with legacy Khatiyan records before filing the inheritance transfer.",
  },
  {
    q: "Do daughters have equal mutation rights in Bihar ancestral land?",
    a: "Yes. Following the Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma and Section 6 of the Hindu Succession Act, daughters are equal coparceners by birth. The Circle Officer cannot approve an inheritance mutation that excludes married or unmarried daughters without their registered relinquishment deed or signed NOC affidavit.",
  },
  {
    q: "Is a registered Will sufficient for Dakhil Kharij in Bihar without probate?",
    a: "Yes. In Bihar (outside Kolkata, Mumbai, and Chennai), probate is not mandatory for Wills executed by Hindus under Section 213 of the Indian Succession Act. A registered Will accompanied by a death certificate and legal heir notice is legally admissible before the Circle Officer for mutation, provided no co-heir files a contentious civil title suit.",
  },
  {
    q: "What is the government fee for online Dakhil Kharij in Bihar?",
    a: "There is zero government fee for filing an online Dakhil Kharij application on biharbhumi.bihar.gov.in. The service is provided completely free of cost by the Bihar Revenue & Land Reforms Department. Landholders must beware of middlemen claiming official portal filing charges.",
  },
];

export default function BiharDakhilKharijClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedAppeal, setCopiedAppeal] = useState<boolean>(false);

  // Diagnostic Wizard State
  const [jamabandiStatus, setJamabandiStatus] = useState<
    "digitized_online" | "physical_unregistered" | "khatiyan_joint_split"
  >("digitized_online");

  const [vanshavaliType, setVanshavaliType] = useState<
    | "magistrate_affidavit_panchayat"
    | "mukhiya_plain_paper"
    | "court_succession_cert"
    | "registered_will"
    | "registered_partition_deed"
  >("magistrate_affidavit_panchayat");

  const [heirConsensus, setHeirConsensus] = useState<
    "unanimous_all_daughters" | "daughter_excluded" | "co_heir_dispute"
  >("unanimous_all_daughters");

  const [circleStage, setCircleStage] = useState<
    "pre_filing" | "pending_over_35_days" | "form_2_objection_raised" | "rejected_citing_vanshavali"
  >("pre_filing");

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

  const handleReset = () => {
    setJamabandiStatus("digitized_online");
    setVanshavaliType("magistrate_affidavit_panchayat");
    setHeirConsensus("unanimous_all_daughters");
    setCircleStage("pre_filing");
  };

  // Diagnostic Calculation Engine
  let complianceScore = 95;
  let riskLevel = "Very Low Risk (Fast-Track 35-Day Approval)";
  let riskBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let statutoryAuthority = "Section 6(1), Bihar Land Mutation Act, 2011";
  let primaryFinding =
    "Your application satisfies statutory standards. The digitized Jamabandi and Magistrate Vanshavali fulfill Anchal verification mandates.";
  let actionRecommendation =
    "Submit Form 1 online at biharbhumi.bihar.gov.in. Track the 35-day statutory window. Ensure Revenue Karamchari completes field verification without delay.";

  if (circleStage === "rejected_citing_vanshavali") {
    complianceScore = 40;
    riskLevel = "Critical: Rejection Order Passed by Circle Officer";
    riskBadgeColor = "bg-rose-50 text-rose-800 border-rose-300";
    statutoryAuthority = "Section 7, Bihar Land Mutation Act, 2011 (DCLR Appeal)";
    primaryFinding =
      "The Circle Officer passed a rejection order. Under Section 6, rejection without a reasoned Form 4 speaking order is legally flawed. A Mukhiya certificate alone cannot be forced if statutory affidavits exist.";
    actionRecommendation =
      "File a Mutation Appeal under Section 7 before the Deputy Collector Land Reforms (DCLR) within 30 days of the rejection order date with certified order copy.";
  } else if (circleStage === "form_2_objection_raised" || heirConsensus === "co_heir_dispute") {
    complianceScore = 55;
    riskLevel = "Moderate: Contested Mutation Case (75-Day Hearing Window)";
    riskBadgeColor = "bg-amber-50 text-amber-800 border-amber-300";
    statutoryAuthority = "Section 6(2) & 6(3), Bihar Land Mutation Act, 2011";
    primaryFinding =
      "An objection has been lodged. The Circle Officer must convert this matter into a regular contested revenue case and issue hearing notices to all parties.";
    actionRecommendation =
      "Engage revenue counsel to draft a written statement against the objection. Place the legal heir genealogical tree and registered title documents on record.";
  } else if (heirConsensus === "daughter_excluded") {
    complianceScore = 50;
    riskLevel = "High Rejection Risk: Female Heirs Omitted";
    riskBadgeColor = "bg-rose-50 text-rose-800 border-rose-300";
    statutoryAuthority = "Section 6 HSA & Vineeta Sharma (2020) 9 SCC 1";
    primaryFinding =
      "Excluding married or unmarried daughters violates Section 6 of the Hindu Succession Act. The Circle Officer will reject or co-heirs can overturn the mutation at DCLR.";
    actionRecommendation =
      "Include all daughters as joint applicants or obtain their registered Relinquishment Deed (Haq Tyag) or notarized No-Objection Affidavit before filing.";
  } else if (vanshavaliType === "mukhiya_plain_paper") {
    complianceScore = 65;
    riskLevel = "Moderate Risk: Informal Mukhiya Letterhead";
    riskBadgeColor = "bg-amber-50 text-amber-800 border-amber-300";
    statutoryAuthority = "Bihar Revenue Dept Circular on Pedigree Verification";
    primaryFinding =
      "A hand-written Mukhiya certificate lacks judicial evidentiary value. Revenue Karamcharis frequently raise objections or solicit informal fees citing missing verification.";
    actionRecommendation =
      "Convert the genealogy into a formal affidavit sworn before an Executive Magistrate or Notary, and get it countersigned by the Panchayat Secretary (Panchayat Sachiv).";
  } else if (jamabandiStatus === "physical_unregistered") {
    complianceScore = 60;
    riskLevel = "Pre-Condition Required: Undigitized Jamabandi Panji-2";
    riskBadgeColor = "bg-amber-50 text-amber-800 border-amber-300";
    statutoryAuthority = "Bihar Parimarjan Portal SOP & Section 4 Mutation Act";
    primaryFinding =
      "The land record is missing from online Panji-2. The online mutation portal cannot process Dakhil Kharij until the Jamabandi is digitized.";
    actionRecommendation =
      "Submit an online Parimarjan application on biharbhumi.bihar.gov.in with legacy Khatiyan, old rent receipts, and Jamabandi volume number to digitize records first.";
  } else if (vanshavaliType === "court_succession_cert" || vanshavaliType === "registered_partition_deed") {
    complianceScore = 98;
    riskLevel = "Ironclad: Judicial Succession Record";
    riskBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
    statutoryAuthority = "Section 372 Indian Succession Act & Section 4 Mutation Act";
    primaryFinding =
      "Your succession claim is supported by a civil court decree or registered partition deed. The Circle Officer has zero legal discretion to reject or question pedigree.";
    actionRecommendation =
      "Attach a certified copy of the court succession certificate or partition deed. The Circle Officer must complete mutation within 35 days under Section 6.";
  }

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL FOR BIHAR INHERITANCE MUTATION (VARISANA DAKHIL KHARIJ)
BEFORE THE HON'BLE CIRCLE OFFICER, ANCHAL: [Name of Circle], DISTRICT: [Name of District], BIHAR

IN THE MATTER OF: INHERITANCE MUTATION APPLICATION UNDER SECTION 3 & 4 OF BIHAR LAND MUTATION ACT, 2011

AFFIDAVIT OF LEGAL HEIRS & GENEALOGICAL TREE (VANSHAVALI)
I, [Name of Deponent], aged about [Age] years, son/daughter/wife of Late [Name of Deceased Raiyat], resident of Mauza: [Village/Ward], Thana No.: [Thana Number], Anchal: [Circle], District: [District], Bihar, do hereby solemnly affirm and state on oath as under:

1. That the recorded tenant (Raiyat) Late [Name of Ancestor] held title and lawful possession over the land described in Schedule below, recorded in Jamabandi Panji-2 (Volume No.: [Vol], Page No.: [Page]), Khata No.: [Khata], Khesra No.: [Plot], Area: [Acres/Decimals].
2. That the recorded raiyat passed away intestate on [Date of Death] at [Place of Death]. Official Death Certificate No. [Cert No.] is annexed herewith as Annexure-A.
3. That Late [Name of Ancestor] left behind only the following surviving Class-I legal heirs and no other person:
   (i) [Name 1], [Relation], Age: [X], Resident of [Address]
   (ii) [Name 2], [Relation], Age: [Y], Resident of [Address]
   (iii) [Name 3], [Relation], Age: [Z], Resident of [Address]
4. That the deponents and all legal heirs named above are in continuous, undisputed physical possession of the land. No title dispute or civil suit is pending before any court.
5. That this affidavit represents the true and complete Vanshavali under the statutory framework of the Bihar Land Mutation Act, 2011 and Hindu Succession Act, 1956.

DEPONENT
VERIFICATION: Verified at [Place] on this [Date] that the contents of paragraphs 1 to 5 are true to my personal knowledge.`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `MANDATORY DOCUMENT CHECKLIST: BIHAR INHERITANCE DAKHIL KHARIJ
1. Original Death Certificate of deceased Jamabandi Raiyat (issued by Registrar of Births & Deaths).
2. Sworn Affidavit of Pedigree (Vanshavali) on Stamp Paper attested by Executive Magistrate or Notary.
3. Verification certificate by Gram Panchayat Secretary (Panchayat Sachiv) / Ward Councillor.
4. Copy of Jamabandi Panji-2 (Register-II) showing Khata, Khesra, Rakba, and Page number.
5. Legacy Khatiyan (Cadastral / Revisional / CS / RS) copy if Jamabandi is undivided.
6. Self-declaration undertaking in prescribed Bihar Bhumi online Form.
7. Aadhaar KYC copies and mobile numbers of all surviving legal heirs.
8. No-Objection Certificate (NOC) / Consent Affidavit from all daughters and female co-heirs.
9. Latest Malguzari Rasid (Land Revenue Rent Receipt) paid up to current financial year.
10. Certified Copy of Registered Will or Civil Court Succession Certificate (if applicable).`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const copyAppealToClipboard = () => {
    const appealText = `MEMO OF APPEAL UNDER SECTION 7 OF BIHAR LAND MUTATION ACT, 2011
BEFORE THE COURT OF DEPUTY COLLECTOR LAND REFORMS (DCLR), [Subdivision Name], [District], BIHAR

MUTATION APPEAL NO. ______ OF 2026
IN THE MATTER OF: [Appellant Name(s)] ... APPELLANT(S)
VERSUS: The State of Bihar through Circle Officer, [Circle Name] & Others ... RESPONDENT(S)

MEMORANDUM OF APPEAL AGAINST REJECTION ORDER DATED [Date] PASSED IN MUTATION CASE NO. [Case No.]

GROUNDS OF APPEAL:
1. That the impugned rejection order passed by the learned Circle Officer is arbitrary, illegal, and contrary to Sections 3, 4, and 6 of the Bihar Land Mutation Act, 2011.
2. That the learned Circle Officer failed to record a speaking, reasoned order in Form 4 as mandated under Section 6(1) of the Act.
3. That the rejection citing "Missing Mukhiya Vanshavali" is legally unsustainable, as the Appellants submitted a verified Genealogical Affidavit sworn before the Executive Magistrate along with the official Death Certificate.
4. That the Circle Officer failed to appreciate that the Appellants are undisputed Class-I legal heirs in physical possession of the land under Section 8 of the Hindu Succession Act, 1956.
5. That no valid written objection was received from any co-heir during the 14-day public notice window under Form 2.

PRAYER: It is therefore prayed that this Hon'ble Court may graciously be pleased to set aside the impugned rejection order dated [Date] and direct the Circle Officer to issue a Mutation Correction Slip (Shuddhi Patra) in favor of the Appellants.`;
    navigator.clipboard.writeText(appealText);
    setCopiedAppeal(true);
    setTimeout(() => setCopiedAppeal(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>BIHAR LAND MUTATION ACT, 2011 • SECTIONS 3, 6 &amp; 7</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Bihar Dakhil Kharij Inheritance Tracker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Evaluate your inheritance mutation papers on biharbhumi.bihar.gov.in. Verify Vanshavali
            legality, correct Jamabandi Panji-2 records, track 35-day Circle timelines, and appeal
            unlawful rejections.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-tracker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Run Document Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Legal Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">35 Working Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 6 UNCONTESTED LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 7 Appeal</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                30-DAY DCLR REJECTION REMEDY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Panji-2 Online</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BIHAR BHUMI DIGITIZED RECORDS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form 4 Speaking Order</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY WRITTEN REASON
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
                <span>Bihar Revenue Bench</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 3, 6, 7 &amp; 9 of Bihar Land Mutation Act, 2011 and Bihar
                Land Reforms Act, 1950. Enforced across 534 Anchal (Circle) offices in Bihar.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: BIHAR INHERITANCE DAKHIL KHARIJ RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Top Mutation Flaw in Bihar:</strong> Over 62% of online inheritance mutation
                    petitions are delayed or rejected because Circle Officers demand a handwritten
                    Mukhiya Vanshavali. In law, a sworn affidavit before an Executive Magistrate is fully
                    valid and enforceable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory 35-Day Timeline:</strong> Under Section 6(1) of the Bihar Land Mutation
                    Act, 2011, uncontested succession mutation must be completed within 35 working days. If
                    an officer sits on your file without issuing notice, they violate statutory service rules.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Legal Remedy for Rejection:</strong> A Circle Officer cannot dismiss an online
                    claim with casual one-line remarks. They must issue a speaking order in Form 4. You hold
                    a statutory right to appeal before the DCLR under Section 7 within 30 days.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 TAG ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Bihar Land Mutation Act 2011: Inheritance Dakhil Kharij SOP
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Bihar, land ownership and fiscal liability are recorded in the <em>Jamabandi Panji-2</em>{" "}
                  (Register-II) kept at the local Anchal (Circle) Office. When a recorded landholder
                  (Raiyat) dies, their surviving legal heirs must update this record through{" "}
                  <strong>Varisana Dakhil Kharij</strong> (succession mutation).
                </p>
                <p>
                  Until 2011, mutation in Bihar was governed by the archaic Bihar Tenants Holdings
                  Maintenance of Records Act, 1973. To eliminate administrative delays, the state legislature
                  enacted the <strong>Bihar Land Mutation Act, 2011 (Bihar Act 23, 2011)</strong>. Under
                  Sections 3 and 4, any person acquiring land rights through succession, inheritance, or
                  partition must file an application before the Circle Officer.
                </p>
                <p>
                  Crucially, mutation does not create proprietary title; it recognizes who is responsible for
                  paying land revenue to the State. However, in practice, without an updated Jamabandi in
                  your name, you cannot sell the land, obtain government compensation, secure crop loans, or
                  generate a Land Possession Certificate (LPC) in Bihar.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DOCUMENT TRACKER TOOL */}
            <section id="interactive-tracker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Bihar Bhumi Inheritance Document Tracker &amp; Evaluator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your land record status, genealogy proof, and Circle Office stage below. Evaluate
                statutory compliance, uncover rejection risks, and generate legal appeal grounds.
              </p>

              {/* Wizard Container */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Step 1: Jamabandi Record Status */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      1. Jamabandi Panji-2 Status on biharbhumi
                    </label>
                    <select
                      value={jamabandiStatus}
                      onChange={(e) => setJamabandiStatus(e.target.value as any)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/20 transition-all font-medium text-slate-800"
                    >
                      <option value="digitized_online">
                        Digitized Online (Visible in Panji-2 with Khata / Khesra)
                      </option>
                      <option value="physical_unregistered">
                        Undigitized / Missing from Online Panji-2 (In Old Register)
                      </option>
                      <option value="khatiyan_joint_split">
                        Joint Ancestral Khatiyan (Undivided Multi-Family Branch)
                      </option>
                    </select>
                  </div>

                  {/* Step 2: Vanshavali Document Type */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      2. Vanshavali (Family Tree) Document Held
                    </label>
                    <select
                      value={vanshavaliType}
                      onChange={(e) => setVanshavaliType(e.target.value as any)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/20 transition-all font-medium text-slate-800"
                    >
                      <option value="magistrate_affidavit_panchayat">
                        Sworn Affidavit before Executive Magistrate / Notary + Panchayat Sachiv
                      </option>
                      <option value="mukhiya_plain_paper">
                        Mukhiya / Sarpanch Letterhead Certificate Only
                      </option>
                      <option value="court_succession_cert">
                        Succession Certificate from Civil Court (Section 372 ISA)
                      </option>
                      <option value="registered_will">
                        Registered Will (Vasiyatnama) Executed by Deceased Raiyat
                      </option>
                      <option value="registered_partition_deed">
                        Registered Partition Deed / Civil Court Preliminary Decree
                      </option>
                    </select>
                  </div>

                  {/* Step 3: Legal Heirs Consensus */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      3. Co-Heir Consensus &amp; Daughters&rsquo; Consent
                    </label>
                    <select
                      value={heirConsensus}
                      onChange={(e) => setHeirConsensus(e.target.value as any)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/20 transition-all font-medium text-slate-800"
                    >
                      <option value="unanimous_all_daughters">
                        All Legal Heirs Agree (Signed NOC &amp; KYC from Daughters)
                      </option>
                      <option value="daughter_excluded">
                        Daughters Omitted from Application (Sons Only)
                      </option>
                      <option value="co_heir_dispute">
                        Active Dispute (Collateral / Sibling Objecting in Anchal)
                      </option>
                    </select>
                  </div>

                  {/* Step 4: Circle Office Stage */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      4. Current Circle Office Processing Stage
                    </label>
                    <select
                      value={circleStage}
                      onChange={(e) => setCircleStage(e.target.value as any)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/20 transition-all font-medium text-slate-800"
                    >
                      <option value="pre_filing">
                        Pre-Filing Document Verification &amp; Checklist Review
                      </option>
                      <option value="pending_over_35_days">
                        Filed Online: Pending Beyond 35 Working Days Without Action
                      </option>
                      <option value="form_2_objection_raised">
                        Notice Issued: Contested Objection Filed by Sibling / Relative
                      </option>
                      <option value="rejected_citing_vanshavali">
                        Rejected by Circle Officer (Missing Vanshavali / Speaking Order)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Diagnostic Fields</span>
                  </button>
                </div>

                {/* Diagnostic Output Results Card */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        DIAGNOSTIC COMPLIANCE RESULT
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                        {primaryFinding}
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-extrabold shrink-0 ${riskBadgeColor}`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{riskLevel}</span>
                    </div>
                  </div>

                  {/* Progress Score Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Statutory Readiness Rating</span>
                      <span>{complianceScore}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          complianceScore > 80
                            ? "bg-emerald-600"
                            : complianceScore > 60
                            ? "bg-amber-500"
                            : "bg-rose-600"
                        }`}
                        style={{ width: `${complianceScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Governing Statutory Law */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Governing Legal Authority</span>
                      </div>
                      <p className="text-slate-600">{statutoryAuthority}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Gavel className="w-3.5 h-3.5 text-[#5F7E75]" />
                        <span>Actionable Legal Roadmap</span>
                      </div>
                      <p className="text-slate-600">{actionRecommendation}</p>
                    </div>
                  </div>

                  {/* Quick Copy Action Buttons */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={copyChecklistToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedChecklist ? "Checklist Copied!" : "Copy Bihar Checklist"}</span>
                    </button>
                    <button
                      onClick={copyClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      {copiedClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                      <span>{copiedClause ? "Affidavit Format Copied!" : "Copy Vanshavali Affidavit"}</span>
                    </button>
                    <button
                      onClick={copyAppealToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs shadow-xs transition-colors"
                    >
                      {copiedAppeal ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Gavel className="w-3.5 h-3.5 text-[#C65378]" />}
                      <span>{copiedAppeal ? "Appeal Grounds Copied!" : "Copy Section 7 Appeal"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT: INDIAN SCENARIO IMAGE */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: BIHAR INHERITANCE MUTATION DESK</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Bihar Land Mutation Act 2011</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/bihar-dakhil-kharij-jamabandi-inheritance-tracker-og.jpg"
                  alt="Bihar Dakhil Kharij and Jamabandi Inheritance Document Tracker Guide"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Authentic Indian scenario: Heir succession consulting at Circle Office desk with
                Jamabandi Panji-2 registers, Khatiyan files, and statutory Vanshavali affidavits.
              </p>
            </div>

            {/* SECTION 3: MUKHIYA VANSHAVALI VS SUCCESSION CERTIFICATE */}
            <section id="vanshavali-validity" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL PRECEDENT &amp; EVIDENTIARY VALUE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Mukhiya Vanshavali vs Court Succession Certificate
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The most pervasive dispute in Bihar land revenue administration is the demand by Circle
                  Officers for a <strong>Vanshavali (Genealogical Pedigree Certificate)</strong> issued by
                  the Gram Panchayat Mukhiya or Sarpanch.
                </p>
                <p>
                  Under the <strong>Bihar Panchayat Raj Act, 2006</strong> and the Indian Evidence Act,
                  a Mukhiya possesses no statutory judicial authority to conclusively determine legal
                  heirship. A paper signed on a Mukhiya&rsquo;s personal letterhead is an administrative
                  convenience document, not a judicial finding. In numerous instances across Patna,
                  Muzaffarpur, and Darbhanga, corrupt practices led to conflicting Vanshavalis issued to
                  rival family factions.
                </p>
                <p>
                  In contrast, an <strong>Affidavit of Pedigree</strong> sworn before an Executive
                  Magistrate or Notary Public under the Oaths Act, backed by official death certificates and
                  countersigned by the Panchayat Secretary (Panchayat Sachiv), satisfies the evidentiary
                  threshold of Section 4 of the Bihar Land Mutation Act, 2011.
                </p>
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 text-xs sm:text-sm text-amber-950 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Judicial Moat: Court Certificate Supersedes Mukhiya Letters</span>
                  </div>
                  <p>
                    Where collaterals dispute lineage, a <strong>Succession Certificate</strong> issued by a
                    Senior Civil Judge under Section 372 of the Indian Succession Act, 1925, or a Civil Court
                    Partition Decree, completely overrides any Mukhiya certificate. Under Patna High Court
                    jurisprudence, a Circle Officer committing contempt by refusing to recognize a civil
                    court decree is liable to statutory revision under Section 8.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: JAMABANDI PANJI-2 & KHATIYAN INHERITANCE UPDATE */}
            <section id="jamabandi-panji-2" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>LAND RECORDS ARCHITECTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Jamabandi Panji-2 &amp; Khatiyan Succession Update
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Bihar, land records are grounded in two historical pillars:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Khatiyan (Record of Rights):</strong> Surveyed during Cadastral Survey (CS -
                    early 1900s) and Revisional Survey (RS - 1960s-1970s), identifying the original raiyat
                    family and plot boundaries (Khesra).
                  </li>
                  <li>
                    <strong>Jamabandi Panji-2 (Continuous Register):</strong> Created following the Bihar
                    Land Reforms Act, 1950, recording the current rent-paying tenant, holding number, Khata,
                    Khesra, total area (Rakba), and annual rent cess (Malguzari).
                  </li>
                </ul>
                <p>
                  Under the state&rsquo;s digitization drive on <strong>biharbhumi.bihar.gov.in</strong>,
                  every physical Register-2 entry was mapped into digital databases. If your ancestor&rsquo;s
                  name appears in physical registers but not online, you must file a{" "}
                  <strong>Jamabandi Parimarjan</strong> (Correction) application before submitting the Dakhil
                  Kharij petition. Attempting to file inheritance mutation on an unlinked Jamabandi results
                  in automated portal rejection.
                </p>
              </div>
            </section>

            {/* SECTION 5: 35-DAY VS 75-DAY CIRCLE OFFICER TIMELINE */}
            <section id="statutory-timeline" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calendar className="w-4 h-4" />
                <span>STATUTORY TIMELINE &amp; SPEAKING ORDER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. 35-Day vs 75-Day Circle Officer Timeline &amp; Form 4
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Bihar Land Mutation Act, 2011 introduced binding procedural deadlines under Section 6:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                    <div className="font-extrabold text-[#C65378] text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                      <span>Uncontested Cases (35 Working Days)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If no objection is received within 14 days of public notice (Ishthar in Form 2), the
                      Revenue Karamchari and Revenue Officer submit their inquiry report. The Circle Officer
                      must pass the final mutation order and generate the Correction Slip (Shuddhi Patra)
                      within 35 working days.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                    <div className="font-extrabold text-[#172228] text-sm flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-amber-600" />
                      <span>Contested Cases (75 Working Days)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If an objection is submitted, the Circle Officer must convert the application into a
                      contested case (Vaad), give notice to all co-heirs, conduct hearings, examine revenue
                      records, and pass a speaking order within 75 working days.
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Mandatory Form 4 Speaking Order:</strong> Section 6(1) explicitly prohibits
                  Circle Officers from issuing vague, unreasoned rejections such as &ldquo;Rejected due to
                  disputed papers&rdquo; or &ldquo;Karamchari adverse report&rdquo;. The officer must
                  record detailed factual reasons in Form 4. A rejection lacking Form 4 grounds is void ab
                  initio in appellate proceedings.
                </p>
              </div>
            </section>

            {/* SECTION 6: SECTION 7 DCLR APPEAL ROADMAP */}
            <section id="dclr-appeal-roadmap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>APPELLATE REDRESSAL SYSTEM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Section 7 DCLR Appeal: Challenging Rejection Orders
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  If the Circle Officer unlawfully rejects your inheritance Dakhil Kharij, you are not
                  powerless. The Bihar Land Mutation Act provides a structured three-tier statutory remedy:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        Appeal before DCLR (Section 7) - Within 30 Days
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        File a formal Memorandum of Appeal before the Deputy Collector Land Reforms (DCLR)
                        at the Subdivisional headquarters within 30 days of the rejection order date. The
                        DCLR has statutory power to summon records, set aside the Circle Officer&rsquo;s
                        rejection, and direct immediate creation of Jamabandi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        Revision before Collector / ADM (Section 8) - Within 30 Days
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        If the DCLR passes an adverse order, file a Revision Petition before the District
                        Collector or Additional Collector (Revenue) under Section 8. The Collector examines
                        legality, jurisdictional errors, and procedural violations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        Bihar Land Tribunal (BLT) / High Court (Section 9)
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Final statutory challenges lie before the Bihar Land Tribunal (BLT) under the Bihar
                        Land Tribunal Act, 2009. Further constitutional remedies can be pursued under Article
                        226 before the Hon&rsquo;ble Patna High Court.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DAUGHTERS AND FEMALE HEIRS: EQUAL RIGHTS */}
            <section id="daughters-coparcenary" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>GENDER PARITY UNDER HINDU SUCCESSION ACT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Daughters &amp; Female Heirs: Equal Mutation Rights
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A frequent customary error in rural Bihar is the submission of Varisana applications
                  listing only sons while deliberately omitting married sisters or the widowed mother.
                </p>
                <p>
                  Under the landmark Supreme Court ruling in{" "}
                  <strong>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</strong> and Section 6 of the Hindu
                  Succession Act, 1956, daughters are coparceners by birth with rights equal to sons.
                  Whether married or unmarried, and irrespective of whether the father passed away before or
                  after 2005, daughters hold an indefeasible share.
                </p>
                <p>
                  Circle Officers in Bihar are under direct instructions from the Department of Revenue &amp;
                  Land Reforms to scrutinize the family tree. If a daughter is excluded without a registered
                  Relinquishment Deed (Haq Tyag) or an attested consent affidavit, the mutation is legally
                  defective and subject to cancellation at the appellate stage.
                </p>
              </div>
            </section>

            {/* SECTION 8: PROCEDURAL COMPARISON MATRIX TABLE */}
            <section id="comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Mutation Pathways: Uncontested vs Contested
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="min-w-full text-xs sm:text-sm text-left">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Evaluation Parameter</th>
                      <th className="py-3 px-4 font-bold">Uncontested Succession</th>
                      <th className="py-3 px-4 font-bold">Contested Co-Heir Dispute</th>
                      <th className="py-3 px-4 font-bold">Partition Deed Mutation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Statutory Timeline</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">35 Working Days</td>
                      <td className="py-3 px-4 text-amber-700 font-semibold">75 Working Days</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">35 Working Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Key Document</td>
                      <td className="py-3 px-4">Death Cert + Magistrate Vanshavali</td>
                      <td className="py-3 px-4">Objection Notice + Civil Pleadings</td>
                      <td className="py-3 px-4">Registered Partition Deed</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Daughters&rsquo; Consent</td>
                      <td className="py-3 px-4">Mandatory (Joint / NOC)</td>
                      <td className="py-3 px-4">Examined in Formal Hearing</td>
                      <td className="py-3 px-4">Signed in Registered Deed</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Rejection Remedy</td>
                      <td className="py-3 px-4">Section 7 DCLR Appeal</td>
                      <td className="py-3 px-4">Section 7 Appeal or Civil Suit</td>
                      <td className="py-3 px-4">Section 7 DCLR Appeal</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Government Fee</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹0 (Free on Portal)</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹0 (Free on Portal)</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">₹0 (Free on Portal)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP: ONLINE FILING */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <History className="w-4 h-4" />
                <span>STANDARD OPERATING PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Online Filing on Bihar Bhumi
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Portal Registration &amp; Anchal Selection</div>
                    <p className="text-xs text-slate-600">
                      Visit <strong>biharbhumi.bihar.gov.in</strong>. Create a user account using mobile OTP.
                      Navigate to &ldquo;Apply Online Dakhil Kharij&rdquo;, select your District, Anchal
                      (Circle), and click &ldquo;Apply New&rdquo;.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Select Mutation Type: Varisana (Succession)</div>
                    <p className="text-xs text-slate-600">
                      Choose &ldquo;Varisana (Succession)&rdquo; as the mutation type. Enter the details of
                      the deceased raiyat, date of demise, death certificate number, and issuing local body.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Enter Land Schedule (Khata, Khesra, Rakba)</div>
                    <p className="text-xs text-slate-600">
                      Input the exact Mauza, Halka number, Khata, Khesra (Plot), and area (in Acres and
                      Decimals) matching the registered Jamabandi Panji-2. Specify North, South, East, West
                      boundaries (Chauhaddi).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Upload Merged PDF of Statutory Documents</div>
                    <p className="text-xs text-slate-600">
                      Merge the Death Certificate, Magistrate Vanshavali Affidavit, Jamabandi extract,
                      Aadhaar KYC of all heirs, and self-declaration affidavit into a single PDF (under 2MB)
                      and submit the application.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-[#C65378] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Download Mutation Receipt (Vivadit / Shuddhi Patra)</div>
                    <p className="text-xs text-slate-600">
                      The portal generates a Case Number (e.g., <em>Case No. 124/2026-27</em>). Track the
                      status through &ldquo;Dakhil Kharij Status&rdquo;. Upon Circle Officer approval,
                      download the official <strong>Correction Slip (Shuddhi Patra)</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: CASE STUDIES (PATNA, MUZAFFARPUR, GAYA) */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>GROUND REALITY &amp; FIELD RESOLUTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Case Studies: Patna, Muzaffarpur, Gaya
              </h3>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Patna Rural: Circle Officer Demanding Mukhiya Signature Overruled
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Resolved via DCLR
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In Danapur Anchal, an NRI son applied for Varisana mutation after his father&rsquo;s
                    death. The Circle Officer issued an objection notice stating &ldquo;Vanshavali missing from
                    Gram Panchayat Mukhiya&rdquo;. Our revenue desk drafted a statutory rebuttal citing the
                    Executive Magistrate affidavit and High Court precedents. When the officer failed to pass
                    a speaking order, we filed a Section 7 Appeal before the DCLR Danapur, who set aside the
                    rejection within 45 days and ordered immediate Jamabandi creation.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Muzaffarpur: Married Daughters Excluded by Brothers
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Defective Mutation Overturned
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In Kanti Anchal, two brothers obtained an uncontested Shuddhi Patra by concealing the
                    existence of three married sisters. The sisters approached our advisory team. We filed a
                    cancellation petition before the DCLR Muzaffarpur under Section 7 on grounds of fraudulent
                    suppression of Class-I heirs. The DCLR cancelled the brothers&rsquo; exclusive Jamabandi
                    and ordered fresh joint mutation in all five siblings&rsquo; names.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Gaya: Undigitized Jamabandi Panji-2 Parimarjan Pre-Condition
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Two-Stage Resolution
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family in Bodhgaya faced repeated online rejections because their ancestor&rsquo;s 1968
                    rent-receipt holding had not been uploaded during the Bihar Bhumi digitization drive. We
                    assisted the heirs in retrieving the volume/page records from the Anchal Abhilekhagar,
                    submitting a Parimarjan petition, and completing the digitized entry before successfully
                    closing the succession mutation.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL RECITAL TEMPLATES & REJECTION GROUNDS */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PRACTITIONER TOOLKIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Recitals &amp; Rejection Appeal Templates
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use our battle-tested legal clauses for your affidavit, co-heir NOC, or Section 7 DCLR
                Memorandum of Appeal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Template 1: Magistrate Vanshavali Affidavit */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Executive Magistrate Vanshavali Format</span>
                    <button
                      onClick={copyClauseToClipboard}
                      className="text-[11px] font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedClause ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Includes statutory clauses identifying deceased raiyat, death certificate cross-reference,
                    complete Class-I pedigree listing, physical possession recital, and oath verification.
                  </p>
                </div>

                {/* Template 2: Section 7 DCLR Appeal Grounds */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Section 7 DCLR Appeal Memo</span>
                    <button
                      onClick={copyAppealToClipboard}
                      className="text-[11px] font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedAppeal ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Drafted to challenge unlawful Circle Officer rejections citing missing Mukhiya signs,
                    absence of Form 4 speaking orders, or illegal delay beyond the 35-day window.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence
              </h3>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-3 text-slate-700 leading-relaxed text-sm">
                <p>
                  <strong>WillDrafting.in</strong>, backed by <strong>AMA Legal Solutions</strong>, is
                  India&rsquo;s premier estate planning, inheritance compliance, and land succession legal
                  platform.
                </p>
                <p>
                  Our dedicated Bihar Revenue Practice assists resident landholders and non-resident
                  Biharis (NRIs and out-of-state professionals) in securing clear title records, resolving
                  complex Jamabandi Panji-2 disputes, filing Section 7 appeals before DCLR courts, and
                  drafting bulletproof Wills under the Indian Succession Act, 1925.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>534 Anchals Covered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Patna High Court &amp; BLT Panel</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero Undisclosed Charges</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Bihar Mutation
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 ml-3 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: LEGAL CITATIONS & REVENUE PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations &amp; Official Revenue Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://biharbhumi.bihar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                      Bihar Bhumi Official Portal
                    </div>
                    <div className="text-slate-500 text-[11px]">biharbhumi.bihar.gov.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                </a>

                <Link
                  href="/services/bihar-dakhil-kharij-jamabandi-dispute-lawyer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                      Bihar Dakhil Kharij Dispute Lawyers
                    </div>
                    <div className="text-slate-500 text-[11px]">Circle Office &amp; DCLR Representation</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                </Link>

                <Link
                  href="/tools/ancestral-vs-self-acquired-property-classifier"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                      Ancestral vs Self-Acquired Classifier
                    </div>
                    <div className="text-slate-500 text-[11px]">Section 8 vs Section 6 HSA Rules</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                </Link>

                <Link
                  href="/contact"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                      Contact AMA Legal Solutions
                    </div>
                    <div className="text-slate-500 text-[11px]">Consultation &amp; Case Filing Desk</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                </Link>
              </div>
            </section>
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
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Bihar land reforms, Jamabandi Panji-2 dispute litigation, High Court revenue
                appeals, and succession structuring.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT FAMILY PARTITION LAWSUITS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family Land with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid costly Circle Office delays and Jamabandi disputes. Draft a legally sound Will to
                  ensure clean title transmission for your children.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - REVENUE DISPUTE LAWYER CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>BIHAR REVENUE DISPUTE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing a Circle Office Rejection or Jamabandi Dispute?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our revenue advocates represent clients before Circle Officers, DCLR appellate courts,
                  and the Bihar Land Tribunal across all 38 districts.
                </p>
                <Link
                  href="/services/bihar-dakhil-kharij-jamabandi-dispute-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Consult Bihar Land Lawyer</span>
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
                      <strong>Statutory Precision:</strong> Built strictly on Bihar Land Mutation Act, 2011
                      and High Court rulings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Panji-2 Verification:</strong> Clarifies digital Parimarjan and physical
                      holding records.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>30-Day Appeal Protection:</strong> Step-by-step guidance for DCLR Section 7
                      hearings.
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
          href="#interactive-tracker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Document Tracker</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
