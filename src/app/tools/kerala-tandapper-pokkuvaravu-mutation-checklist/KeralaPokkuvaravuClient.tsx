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
  MapPin,
  Search,
  Compass,
  FilePlus,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Basis: Kerala Land Tax & Registry Rules" },
  { id: "interactive-checklist", label: "2. Interactive Pokkuvaravu Document Generator" },
  { id: "akshaya-vs-village", label: "3. Akshaya Centre vs Village Office Filter" },
  { id: "tandapper-lookup", label: "4. Thandaper Number Lookup & BTR Guide" },
  { id: "portal-stepper", label: "5. Revenue e-Services Portal Step-by-Step SOP" },
  { id: "section-213-kerala", label: "6. Section 213 ISA: Kerala Probate Exemption" },
  { id: "rejection-troubleshooting", label: "7. Rejection Troubleshooting & RDO Appeals" },
  { id: "comparison-table", label: "8. Legal Comparison: Testate vs Intestate" },
  { id: "step-by-step-sop", label: "9. Title Due Diligence & Succession Checklist" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Kerala Cities" },
  { id: "legal-recital-templates", label: "11. Legal Recital Templates & NOC Formats" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Pokkuvaravu" },
  { id: "statutory-citations", label: "14. Legal Citations & Official Kerala Portals" },
];

const FAQS = [
  {
    q: "What documents are required for Pokkuvaravu after death in Kerala?",
    a: "To apply for Pokkuvaravu after death on the Kerala Revenue e-Services portal, you need: (1) Death Certificate of the registered landholder, (2) Legal Heirship Certificate issued by Tahsildar or registered Will Deed, (3) Prior Title Deed (Aadharam/Pattayam), (4) Latest Land Tax Receipt (Karam Raseethu) showing zero arrears, (5) Encumbrance Certificate from SRO, and (6) Aadhaar and identity proofs of all legal heirs.",
  },
  {
    q: "Is probate compulsory for property mutation under a Will in Kerala?",
    a: "No. The High Court of Kerala in Kuruvila v. State of Kerala (2007) and Babu P.C. v. State of Kerala (2020) ruled that Section 213 of the Indian Succession Act does not mandate probate for wills executed outside original presidency jurisdictions. Revenue authorities cannot reject a Pokkuvaravu application simply because probate was not obtained, provided there is no dispute among legal heirs.",
  },
  {
    q: "What is the difference between Thandaper and Pokkuvaravu in Kerala?",
    a: "Thandaper (Tandapper) is the revenue ledger account number assigned to a landholder in a specific village, recording all their landholdings and tax liability in the Basic Tax Register (BTR). Pokkuvaravu is the statutory process of transfer of registry under the Transfer of Registry Rules, 1966, which mutates the title and updates or issues a new Thandaper.",
  },
  {
    q: "How can I find my existing Thandaper account number online?",
    a: "You can find your Thandaper account number by visiting revenue.kerala.gov.in and clicking 'Know Your Thandaper / View BTR'. Select your District, Taluk, Village, Block, and Re-survey Number with Sub-division. The portal will display the registered Thandaper number, registered landholder name, and land extent.",
  },
  {
    q: "What is the official government fee for Pokkuvaravu in Kerala?",
    a: "The statutory government mutation fee in Kerala is nominal, ranging between ₹20 and ₹50 depending on the land extent and whether it is rural or urban. Akshaya Centres charge an approved citizen service fee of approximately ₹40 to ₹60 for online form submission, scanning, and upload.",
  },
  {
    q: "What should I do if the Village Officer rejects my Pokkuvaravu application?",
    a: "If your application is rejected or delayed, you have a statutory right of appeal under Rule 18 and Rule 21 of the Transfer of Registry Rules, 1966. You can submit an appeal before the Revenue Divisional Officer (RDO) or Sub-Collector within 30 days of the rejection order.",
  },
  {
    q: "Can NRI legal heirs apply for Pokkuvaravu without coming to Kerala?",
    a: "Yes. NRI legal heirs can execute a Special Power of Attorney (PoA) authorizing a resident family member or advocate. The PoA must be notarized or attested by the Indian Consulate or Embassy abroad, then adjudicated and stamped by the District Collector or District Registrar in Kerala before submission.",
  },
  {
    q: "What happens if there is a Re-survey mismatch between Title Deed and BTR?",
    a: "If the old survey number in your Title Deed does not match the Re-survey number in the Basic Tax Register, you must obtain a Survey Correlation Certificate from the Village Office or file a Form 8 application under the Kerala Survey and Boundaries Act before final Pokkuvaravu approval.",
  },
];

export default function KeralaPokkuvaravuClient() {
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
  const [copiedNoc, setCopiedNoc] = useState<boolean>(false);
  const [copiedObjection, setCopiedObjection] = useState<boolean>(false);

  // Diagnostic Wizard State
  const [successionType, setSuccessionType] = useState<
    | "registered_will"
    | "unregistered_will"
    | "intestate_legal_heir"
    | "intestate_release_deed"
    | "nri_heir_poa"
    | "contested_heirs"
  >("registered_will");

  const [landCategory, setLandCategory] = useState<
    "dry_land_purayidam" | "wetland_nilam_converted" | "paddy_unconverted" | "plantation_exempted"
  >("dry_land_purayidam");

  const [resurveyStatus, setResurveyStatus] = useState<
    "resurvey_matched" | "survey_discrepancy" | "old_survey_only"
  >("resurvey_matched");

  const [filterMode, setFilterMode] = useState<"all" | "akshaya_online" | "village_physical">("all");

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
    setSuccessionType("registered_will");
    setLandCategory("dry_land_purayidam");
    setResurveyStatus("resurvey_matched");
    setFilterMode("all");
  };

  // Dynamic Output Engine
  let toolResultTitle = "Testate Pokkuvaravu: Registered Will Pathway";
  let badgeText = "Statutory Rule 28 TR Rules 1966";
  let estimatedTimeline = "15 to 30 Business Days";
  let statutoryFee = "₹20 to ₹50 (Basic Land Tax Fee)";
  let approvalOdds = "95% (High Approval Rate)";
  let primaryWarning =
    "Under Kerala High Court rulings, the Village Officer cannot ask for probate unless other heirs raise genuine objections in writing.";
  let requiredDocs: Array<{ title: string; desc: string; channel: "both" | "akshaya" | "village" }> = [
    {
      title: "Registered Will Deed (Original & Certified SRO Copy)",
      desc: "Registered testament proving specific bequest of the schedule land to the legatee.",
      channel: "both",
    },
    {
      title: "Death Certificate of Testator",
      desc: "Original death paper issued by Local Self Government (Municipality/Panchayat).",
      channel: "both",
    },
    {
      title: "Prior Title Deed (Aadharam / Pattayam)",
      desc: "Registered document under which the deceased owner acquired title.",
      channel: "both",
    },
    {
      title: "Latest Land Tax Receipt (Karam Raseethu)",
      desc: "Paid receipt showing zero arrears under the deceased owner's Thandaper account.",
      channel: "both",
    },
    {
      title: "SRO Encumbrance Certificate (Nilavaram / Kudikadam)",
      desc: "Form 15 or 16 showing clear title from Sub-Registrar Office for past 15 to 30 years.",
      channel: "akshaya",
    },
    {
      title: "Village Office Physical Spot Verification",
      desc: "Physical inspection by Village Officer to verify boundaries and peaceable possession.",
      channel: "village",
    },
  ];

  if (successionType === "unregistered_will") {
    toolResultTitle = "Unregistered Will Pokkuvaravu: Attestation Pathway";
    badgeText = "Rule 28 Inquiry Required";
    estimatedTimeline = "30 to 60 Business Days";
    statutoryFee = "₹20 to ₹50 + Village Inquiry";
    approvalOdds = "75% (Conditional on Co-heir Consent)";
    primaryWarning =
      "Village Officers often issue notice to all Class I legal heirs. If heirs object, Tahsildar may require a civil court declaration.";
    requiredDocs = [
      {
        title: "Original Unregistered Will & Affidavits of 2 Attesting Witnesses",
        desc: "Sworn affidavits from attesting witnesses attesting to the mental capacity and execution.",
        channel: "both",
      },
      {
        title: "Death Certificate of Testator",
        desc: "Official death certificate from local registrar (Panchayat/Corporation).",
        channel: "both",
      },
      {
        title: "Family Membership / Legal Heirship List",
        desc: "Affidavit detailing all surviving Class I legal heirs with relationship proofs.",
        channel: "both",
      },
      {
        title: "Signed No-Objection Affidavits (NOC) from Co-Heirs",
        desc: "Consent statements from non-beneficiary heirs confirming no challenge to the Will.",
        channel: "village",
      },
      {
        title: "Prior Title Deed & Land Tax Receipts",
        desc: "Prior Aadharam and latest Karam receipt under existing Thandaper.",
        channel: "both",
      },
      {
        title: "Tahsildar Hearing & Village Spot Verification",
        desc: "Local inquiry by Village Officer and hearing by Tahsildar before BTR mutation.",
        channel: "village",
      },
    ];
  } else if (successionType === "intestate_legal_heir") {
    toolResultTitle = "Intestate Succession: Joint Heirship Pokkuvaravu";
    badgeText = "Rule 27 TR Rules (Intestate)";
    estimatedTimeline = "20 to 45 Business Days";
    statutoryFee = "₹20 to ₹50 (No Stamp Duty on Inheritance)";
    approvalOdds = "90% (Standard Joint Mutation)";
    primaryWarning =
      "All legal heirs will be entered as joint holders in a single Thandaper account unless a registered partition or release deed is produced.";
    requiredDocs = [
      {
        title: "Legal Heirship Certificate (Varikasa / Anantharavakasa Pathram)",
        desc: "Issued by Tahsildar and published in the Kerala Government Gazette.",
        channel: "both",
      },
      {
        title: "Official Death Certificate of Registered Landholder",
        desc: "Local registrar death certificate with registration number.",
        channel: "both",
      },
      {
        title: "Joint Application Signed by All Legal Heirs",
        desc: "Application submitted jointly on Revenue e-Services portal.",
        channel: "akshaya",
      },
      {
        title: "Aadhaar & Identity Proofs of Every Legal Heir",
        desc: "Scanned copies of Aadhaar cards, PAN cards, and contact numbers.",
        channel: "akshaya",
      },
      {
        title: "Prior Title Deed & Latest Karam Receipt",
        desc: "Original Aadharam and tax receipt proving existing Thandaper account.",
        channel: "both",
      },
      {
        title: "Village Officer Boundary & Possession Report",
        desc: "Field verification to confirm physical possession of the legal heirs.",
        channel: "village",
      },
    ];
  } else if (successionType === "intestate_release_deed") {
    toolResultTitle = "Intestate Succession with Registered Release Deed";
    badgeText = "Sole Title Mutation Pathway";
    estimatedTimeline = "15 to 30 Business Days";
    statutoryFee = "₹20 to ₹50 (Revenue Fee)";
    approvalOdds = "95% (Fast-Track Approval)";
    primaryWarning =
      "A registered Release Deed (Ozhimuri) from other heirs allows a single heir to get an independent individual Thandaper account.";
    requiredDocs = [
      {
        title: "Registered Release Deed (Ozhimuri / Relinquishment Deed)",
        desc: "Registered at SRO where co-heirs relinquish their undivided shares in favor of applicant.",
        channel: "both",
      },
      {
        title: "Legal Heirship Certificate from Tahsildar",
        desc: "Proving all legal heirs were parties to the registered Release Deed.",
        channel: "both",
      },
      {
        title: "Death Certificate of Original Landholder",
        desc: "Original death paper issued by Municipal/Panchayat office.",
        channel: "both",
      },
      {
        title: "Prior Title Deed & SRO Encumbrance Certificate",
        desc: "Parent Aadharam and 15-year EC showing registration of the Release Deed.",
        channel: "both",
      },
      {
        title: "Latest Land Tax Receipt under Deceased's Thandaper",
        desc: "Proving no pending basic tax or plantation tax dues.",
        channel: "akshaya",
      },
      {
        title: "Village Officer Field Verification",
        desc: "Physical inspection of the land and recommendation for new Thandaper creation.",
        channel: "village",
      },
    ];
  } else if (successionType === "nri_heir_poa") {
    toolResultTitle = "NRI Legal Heir Pokkuvaravu: Power of Attorney Pathway";
    badgeText = "Consular Attestation & Adjudication";
    estimatedTimeline = "30 to 60 Business Days";
    statutoryFee = "₹20 to ₹50 + Kerala PoA Stamping";
    approvalOdds = "85% (Subject to Strict PoA Adjudication)";
    primaryWarning =
      "Foreign Power of Attorney must be authenticated by the Indian Embassy/Consulate and adjudicated by District Collector/District Registrar within 90 days of receipt in India.";
    requiredDocs = [
      {
        title: "Special Power of Attorney (PoA) Executed Abroad",
        desc: "Attested by Indian Embassy/Consulate abroad, then stamped by Kerala District Collector.",
        channel: "both",
      },
      {
        title: "Collector / District Registrar Adjudication Certificate",
        desc: "Proof of stamp duty payment under the Kerala Stamp Act for foreign PoA.",
        channel: "village",
      },
      {
        title: "Legal Heirship Certificate or Registered Will",
        desc: "Statutory proof of succession establishing the NRI's inheritance entitlement.",
        channel: "both",
      },
      {
        title: "Passport & Overseas Resident Proof of NRI Heir",
        desc: "Copies of Indian passport, visa/OIC card, and overseas address proof.",
        channel: "akshaya",
      },
      {
        title: "Aadhaar & Photo ID of Appointed Power Agent in Kerala",
        desc: "Identity and signature proof of the person representing the NRI heir.",
        channel: "both",
      },
      {
        title: "Prior Title Deed, Tax Receipt & SRO Encumbrance Certificate",
        desc: "Complete chain of parent documents and zero-arrear tax receipt.",
        channel: "both",
      },
    ];
  } else if (successionType === "contested_heirs") {
    toolResultTitle = "Disputed Succession: Civil Court Reference Pathway";
    badgeText = "Rule 29 TR Rules Dispute Hold";
    estimatedTimeline = "90+ Business Days (Or Awaiting Civil Decree)";
    statutoryFee = "Revenue Hearing Fees";
    approvalOdds = "30% (High Risk of Rejection/Civil Referral)";
    primaryWarning =
      "Under Rule 29 of the Transfer of Registry Rules, Tahsildars cannot decide disputed questions of title. Revenue authorities will hold mutation until a Civil Court decree is produced.";
    requiredDocs = [
      {
        title: "Written Objection Petition & Co-Heir Caveat Notice",
        desc: "Formal objection filed before Village Officer or Tahsildar disputing title or Will.",
        channel: "village",
      },
      {
        title: "Civil Court Partition Suit Plaint / Injunction Order",
        desc: "Copy of OS suit filed before Munsiff or Sub-Court with temporary status quo order.",
        channel: "village",
      },
      {
        title: "Death Certificate & Disputed Title Deeds",
        desc: "Official records submitted for revenue hearing before Tahsildar.",
        channel: "both",
      },
      {
        title: "Tahsildar Hearing Minutes & Rule 29 Order Sheet",
        desc: "Order of Tahsildar directing parties to establish title in civil court.",
        channel: "village",
      },
      {
        title: "Retainer Defense by Kerala Property Advocate",
        desc: "Representation by legal counsel before Tahsildar and RDO appellate bench.",
        channel: "village",
      },
    ];
  }

  // Filtered documents list based on filterMode
  const displayedDocs = requiredDocs.filter((doc) => {
    if (filterMode === "all") return true;
    if (filterMode === "akshaya_online") return doc.channel === "both" || doc.channel === "akshaya";
    if (filterMode === "village_physical") return doc.channel === "both" || doc.channel === "village";
    return true;
  });

  const copyNocClause = () => {
    const text = `NO-OBJECTION AFFIDAVIT (NOC) FOR TRANSFER OF REGISTRY (POKKUVARAVU)
BEFORE THE VILLAGE OFFICER / TAHSILDAR, [NAME OF VILLAGE], [TALUK], KERALA

I, [Name of Co-Heir], aged [Age] years, residing at [Full Address], do hereby solemnly affirm and state as follows:
1. That I am the [son/daughter/widow] of the late [Name of Deceased], who passed away on [Date of Death] at [Place of Death].
2. That the deceased was the registered landholder of the property situated in Re-survey No. [Re-survey No], Block No. [Block No], Extent [Ares/Cents] in [Village Name], covered under Thandaper No. [Thandaper No] and Title Deed No. [Deed No] of [SRO Name].
3. That under the [Registered Will Deed No. / Mutual Agreement among Legal Heirs], the said property is bequeathed / allotted exclusively to [Name of Transferee Heir].
4. That I have no objection whatsoever to the Transfer of Registry (Pokkuvaravu) being effected in the sole name of [Name of Transferee Heir] in the Basic Tax Register (BTR) and issuance of a new Thandaper Account.

DEPONENT
Identified and verified at [Place] on this [Day] of [Month, Year].`;
    navigator.clipboard.writeText(text);
    setCopiedNoc(true);
    setTimeout(() => setCopiedNoc(false), 3000);
  };

  const copyObjectionReply = () => {
    const text = `LEGAL REPLY TO NOTICE UNDER KERALA TRANSFER OF REGISTRY RULES, 1966
BEFORE THE TAHSILDAR / DEPUTY TAHSILDAR (LAND RECORDS), [TALUK NAME], KERALA

IN THE MATTER OF: Application for Transfer of Registry (Pokkuvaravu) under Application No. [Application No]
APPLICANT: [Name of Applicant]
PROPERTY: Re-survey No. [Re-survey No], Village: [Village Name], Existing Thandaper: [Thandaper No]

REPLY TO REJECTION / QUERY CITING PROBATE REQUIREMENT UNDER SECTION 213 OF INDIAN SUCCESSION ACT:
1. The applicant has submitted a validly executed and registered Will Deed No. [Deed No/Year] of SRO [SRO Name] executed by the late [Name of Testator].
2. The Village Officer's objection requiring Probate is contrary to the settled law of the High Court of Kerala.
3. In 'Kuruvila v. State of Kerala' (2007) and 'Babu P.C. v. State of Kerala' (2020 (3) KHC 696), the Hon'ble High Court held that Section 213 of the Indian Succession Act does not mandate probate for Wills executed in Kerala outside the original presidency towns.
4. Mutation in the Basic Tax Register (BTR) under the Transfer of Registry Rules, 1966 is purely for fiscal and revenue collection purposes and does not determine civil title.
5. In the absence of an injunction order from a competent Civil Court, the Tahsildar is bound by statutory duty to effect Pokkuvaravu and issue the updated Thandaper receipt.

PRAYER: It is respectfully prayed that the objection be dropped, Pokkuvaravu be sanctioned, and basic land tax be accepted.

ADVOCATE FOR APPLICANT`;
    navigator.clipboard.writeText(text);
    setCopiedObjection(true);
    setTimeout(() => setCopiedObjection(false), 3000);
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
            <span>KERALA LAND TAX ACT, 1961 • TRANSFER OF REGISTRY RULES, 1966</span>
          </div>

          {/* Strict H1 Tag (Length <= 70 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Kerala Pokkuvaravu &amp; Tandapper Mutation Checklist
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Generate an instant document checklist for Kerala Pokkuvaravu and Thandaper mutation after
            death. Verify Akshaya versus Village Office rules, testate Will exceptions, and prevent
            revenue rejections.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checklist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Generate Document Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/kerala-pokkuvaravu-mutation-legal-retainer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Kerala Lawyer Retainer</span>
            </Link>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rule 28 TR</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WILL &amp; SUCCESSION MUTATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">No Probate</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KERALA HC EXEMPTION (SEC 213)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">1,664 Villages</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                REVENUE E-SERVICES COVERAGE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹20 - ₹50</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY REVENUE FEE ONLY
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
                <span>Kerala Revenue Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under the Kerala Land Tax Act, 1961 and Transfer of Registry Rules, 1966. Backed
                by High Court precedents in Kuruvila v. State of Kerala and Babu P.C. v. State of Kerala.
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
                <span>EXECUTIVE BRIEF: KERALA POKKUVARAVU AFTER DEATH</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>What Pokkuvaravu Does:</strong> Pokkuvaravu (പോക്കുവരവ്) transfers the revenue
                    registry in the Basic Tax Register (BTR) and assigns a new Thandaper (Tandapper)
                    account number to the legal heir or Will beneficiary.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Testate vs Intestate Route:</strong> If the deceased left a registered Will,
                    mutation proceeds under Rule 28. If no Will exists, a Legal Heirship Certificate
                    (അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ്) from the Tahsildar is mandatory under Rule 27.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Probate Rule in Kerala:</strong> Under Section 213(2) of the Indian
                    Succession Act and Kerala High Court rulings, probate is not required for Kerala
                    properties unless contested. Village Officers cannot reject applications on this ground.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Online Revenue e-Services:</strong> Applications are submitted online via{" "}
                    <code>revenue.kerala.gov.in</code> directly or through local Akshaya Centres, followed
                    by physical Village Office verification.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Basis: Kerala Land Tax Act &amp; Registry Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a property owner passes away in Kerala, ownership must be updated in the state
                  revenue records. This statutory process is governed by the{" "}
                  <strong>Kerala Land Tax Act, 1961</strong> and the{" "}
                  <strong>Transfer of Registry Rules, 1966</strong>.
                </p>
                <p>
                  Under Rule 2 of the Transfer of Registry Rules, Pokkuvaravu changes the registered holder
                  name in the <strong>Basic Tax Register (BTR)</strong> maintained at the local Village
                  Office. While mutation does not create or extinguish civil title, it is necessary to pay
                  annual Basic Land Tax (ഭൂനികുതി), obtain building permits, secure bank loans, and receive
                  compensation during land acquisition.
                </p>
                <p>
                  The revenue department tracks every land parcel using the{" "}
                  <strong>Thandaper (Tandapper) Account Number</strong>. When a property passes to an heir,
                  the land is either transferred to their existing Thandaper or a new Thandaper is created
                  by the Village Officer and Deputy Tahsildar.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKLIST TOOL */}
            <section id="interactive-checklist" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DIAGNOSTIC DOCUMENT ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Kerala Pokkuvaravu Document Checklist Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your succession scenario, land category, and survey status below. Get an instant,
                custom document checklist tailored to Tahsildar and Village Office requirements.
              </p>

              {/* Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Succession Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#C65378]" />
                    <span>Question 1: How is the property devolving after the owner&rsquo;s demise?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        id: "registered_will",
                        label: "Registered Will Deed",
                        desc: "Deceased left a registered Will bequeathing the land to specific heir(s)",
                      },
                      {
                        id: "unregistered_will",
                        label: "Unregistered Will Deed",
                        desc: "Deceased executed an unregistered Will with 2 witnesses on plain paper",
                      },
                      {
                        id: "intestate_legal_heir",
                        label: "No Will (Intestate Joint Mutation)",
                        desc: "No Will exists; all legal heirs inherit jointly via Tahsildar Heirship Certificate",
                      },
                      {
                        id: "intestate_release_deed",
                        label: "No Will + Registered Release Deed",
                        desc: "Co-heirs executed a registered Release Deed (Ozhimuri) in favor of one heir",
                      },
                      {
                        id: "nri_heir_poa",
                        label: "NRI Legal Heir (Power of Attorney)",
                        desc: "Beneficiary lives abroad and appoints an agent via Embassy-attested PoA",
                      },
                      {
                        id: "contested_heirs",
                        label: "Disputed / Contested Succession",
                        desc: "One or more relatives have filed an objection or civil court partition suit",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSuccessionType(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          successionType === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Land Classification */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Question 2: What is the land classification in the Basic Tax Register (BTR)?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "dry_land_purayidam",
                        label: "Purayidam / Dry Land",
                        desc: "Residential garden land / house plot with zero conversion restrictions",
                      },
                      {
                        id: "wetland_nilam_converted",
                        label: "Converted Nilam (Form 5 / 6)",
                        desc: "Formerly wetland, converted with valid RDO / Revenue order",
                      },
                      {
                        id: "paddy_unconverted",
                        label: "Paddy Land / Data Bank Nilam",
                        desc: "Classified as Nilam in BTR and listed in Local Data Bank",
                      },
                      {
                        id: "plantation_exempted",
                        label: "Plantation / Estate Land",
                        desc: "Rubber, tea, or coffee estate exempted under Land Reforms Act",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setLandCategory(opt.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          landCategory === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Re-Survey Status */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C65378]" />
                    <span>Question 3: Does the Re-survey number match your registered title deed?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "resurvey_matched",
                        label: "Re-Survey Matched",
                        desc: "Deed survey number matches BTR Re-survey block and sub-division",
                      },
                      {
                        id: "survey_discrepancy",
                        label: "Survey Discrepancy",
                        desc: "Old survey in deed does not correlate with new Re-survey records",
                      },
                      {
                        id: "old_survey_only",
                        label: "Pre-Resurvey Village",
                        desc: "Village has not yet completed digital Re-survey; old survey applies",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setResurveyStatus(opt.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          resurveyStatus === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Filter to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        DIAGNOSTIC POKKUVARAVU REPORT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {toolResultTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{badgeText}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        ESTIMATED TIMELINE
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {estimatedTimeline}
                      </div>
                      <div className="text-[11px] text-slate-300">Tahsildar Sanction Window</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        STATUTORY GOVERNMENT FEE
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {statutoryFee}
                      </div>
                      <div className="text-[11px] text-slate-300">Zero Stamp Duty on Succession</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        APPROVAL PROBABILITY
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {approvalOdds}
                      </div>
                      <div className="text-[11px] text-slate-400">Subject to Document Verification</div>
                    </div>
                  </div>

                  {/* Legal Analysis & Warning */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Key Statutory Advisory:</span>
                    </div>
                    <p>{primaryWarning}</p>
                    {resurveyStatus === "survey_discrepancy" && (
                      <div className="pt-2 text-amber-300 font-semibold border-t border-white/10">
                        <strong>Survey Notice:</strong> A Survey Correlation Certificate from the Village
                        Officer or a Form 8 survey correction application is required prior to Pokkuvaravu
                        sanction.
                      </div>
                    )}
                    {landCategory === "paddy_unconverted" && (
                      <div className="pt-2 text-rose-300 font-semibold border-t border-white/10">
                        <strong>Paddy Land Notice:</strong> Land will be mutated strictly under its BTR
                        classification as Nilam. Mutation does not grant building permission without Form 5
                        or Form 6 orders under the Kerala Conservation of Paddy Land Act.
                      </div>
                    )}
                  </div>

                  {/* Document Channel Filter Tabs */}
                  <div className="pt-2 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Required Documents for Your Scenario ({displayedDocs.length} Papers)
                      </div>
                      <div className="inline-flex rounded-lg bg-white/10 p-1 text-[11px] font-semibold">
                        <button
                          type="button"
                          onClick={() => setFilterMode("all")}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            filterMode === "all" ? "bg-[#C65378] text-white" : "text-slate-300 hover:text-white"
                          }`}
                        >
                          All Papers
                        </button>
                        <button
                          type="button"
                          onClick={() => setFilterMode("akshaya_online")}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            filterMode === "akshaya_online"
                              ? "bg-[#C65378] text-white"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          Akshaya Online Uploads
                        </button>
                        <button
                          type="button"
                          onClick={() => setFilterMode("village_physical")}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            filterMode === "village_physical"
                              ? "bg-[#C65378] text-white"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          Village Office Physical
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {displayedDocs.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="flex-1 space-y-0.5">
                            <div className="font-bold text-xs sm:text-sm text-white flex items-center justify-between">
                              <span>{doc.title}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-rose-200">
                                {doc.channel === "both"
                                  ? "Akshaya & Village"
                                  : doc.channel === "akshaya"
                                  ? "Akshaya Upload (PDF)"
                                  : "Village Office Original"}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300">{doc.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dual Conversion CTA in Result */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need end-to-end representation before the Village Officer, Tahsildar, or RDO?
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Link
                        href="/services/kerala-pokkuvaravu-mutation-legal-retainer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Retain Kerala Lawyer</span>
                      </Link>
                      <button
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Draft Registered Will</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>KERALA REVENUE GUIDE: THANDAPER &amp; POKKUVARAVU MUTATION</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Kerala Land Tax Act, 1961</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/kerala-tandapper-pokkuvaravu-mutation-checklist-og.jpg"
                  alt="Kerala Tandapper and Pokkuvaravu Mutation Document Checklist and Revenue Guide"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Visualizing the Kerala land revenue workflow: Akshaya online submission, Village Office
                field verification, and Thandaper account transfer.
              </p>
            </div>

            {/* SECTION 3: AKSHAYA CENTRE VS VILLAGE OFFICE FILTER */}
            <section id="akshaya-vs-village" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PROCEDURAL ROLES &amp; DIVISION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Akshaya Centre vs Village Office Document Filter
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A common cause of delay is confusion between what needs to be submitted at an Akshaya
                  Centre versus what must be presented at the Village Office.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Akshaya Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#C65378]" />
                        <span>Akshaya Centre Role (Online Portal)</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                        Digital Upload
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Scanning and uploading PDF documents (each under 2 MB).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          Entering District, Taluk, Village, Block, Re-survey and Sub-division numbers.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Paying the statutory government mutation fee online via e-Treasury.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Generating the Application Acknowledgment Number for tracking.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Village Office Box */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#5F7E75]" />
                        <span>Village Office Role (Physical Verification)</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                        Field Verification
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Inspecting original registered title deeds and death certificates.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Physical site visit by the Village Officer to inspect land boundaries.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          Checking the Basic Tax Register (BTR) for unpaid tax arrears or government land.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Submitting the field verification report to the Tahsildar for approval.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: TANDAPPER NUMBER LOOKUP & BTR GUIDE */}
            <section id="tandapper-lookup" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Search className="w-4 h-4" />
                <span>REVENUE RECORDS LOOKUP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Thandaper Number Lookup &amp; BTR Guide
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Thandaper (Tandapper) number is the primary identifier for land ownership in Kerala.
                  To file a Pokkuvaravu application, you must cite the existing Thandaper account number
                  of the deceased owner.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Three Ways to Find the Existing Thandaper Number</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>Check Old Land Tax Receipts (Karam Raseethu):</strong> The Thandaper number is
                      prominently printed at the top left of the physical or digital tax receipt (e.g.,
                      &ldquo;തണ്ടപ്പേർ നമ്പർ: 1420&rdquo;).
                    </li>
                    <li>
                      <strong>Inspect the Property Schedule in Title Deed:</strong> The registered Aadharam
                      usually lists the Thandaper number under which the prior owner paid tax at the time of
                      execution.
                    </li>
                    <li>
                      <strong>Online Search on Revenue e-Services:</strong> Visit{" "}
                      <code>revenue.kerala.gov.in</code>, navigate to <em>&ldquo;Know Your Thandaper / View
                      BTR&rdquo;</em>, select District, Taluk, Village, Block, and enter the Re-survey
                      number and Sub-division. The portal returns the registered Thandaper and landholder
                      name.
                    </li>
                  </ol>
                </div>
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Unique Thandaper Identification Number (UTIN) Update</span>
                  </div>
                  <p className="leading-relaxed">
                    Kerala is implementing the Unique Thandaper Project (UTIN), linking landholdings
                    across all 14 districts to the citizen&rsquo;s Aadhaar. When your Pokkuvaravu is
                    sanctioned, ensure your Aadhaar is linked to prevent duplication.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: STEP-BY-STEP PORTAL STEPPER */}
            <section id="portal-stepper" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>ONLINE PORTAL WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Revenue e-Services Portal Step-by-Step SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow this 7-step process to file and complete your Pokkuvaravu application on the
                  official portal:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      step: "Step 1",
                      title: "User Registration & Portal Login",
                      desc: "Visit revenue.kerala.gov.in and create an account using your mobile number and Aadhaar, or visit your nearest Akshaya Centre.",
                    },
                    {
                      step: "Step 2",
                      title: "Select Transfer of Registry (Pokkuvaravu)",
                      desc: "Under 'Apply for Services', select 'Transfer of Registry (Pokkuvaravu)' and choose 'Inheritance / Death of Registered Holder' as application type.",
                    },
                    {
                      step: "Step 3",
                      title: "Enter District, Taluk, Village & Re-Survey Details",
                      desc: "Input property location details, Block Number, Re-survey Number, Sub-division, and Extent in Ares and Hectares.",
                    },
                    {
                      step: "Step 4",
                      title: "Enter Deceased Owner & Legal Heir Information",
                      desc: "Provide the deceased holder's existing Thandaper number, death certificate details, and full particulars of all surviving heirs or Will beneficiaries.",
                    },
                    {
                      step: "Step 5",
                      title: "Upload Scanned PDF Documents (<= 2 MB Each)",
                      desc: "Upload scanned copies of Title Deed, Death Certificate, Legal Heirship Certificate or Will, Encumbrance Certificate, and Tax Receipt.",
                    },
                    {
                      step: "Step 6",
                      title: "Pay Statutory Fee & Download Acknowledgment",
                      desc: "Pay the nominal revenue fee (₹20 to ₹50) via e-Treasury or net banking and save the Application Reference Number.",
                    },
                    {
                      step: "Step 7",
                      title: "Village Field Inspection & Sanction Order",
                      desc: "The Village Officer conducts field verification and submits report. Deputy Tahsildar sanctions the mutation, issuing the new Thandaper.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: SECTION 213 ISA: KERALA PROBATE EXEMPTION */}
            <section id="section-213-kerala" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>HIGH COURT PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Section 213 ISA: Kerala Probate Exemption
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most frequent reasons Village Officers reject mutation applications under a
                  Will is demanding a &ldquo;Probate&rdquo; or &ldquo;Letters of Administration&rdquo;
                  from a Civil Court. Under settled Kerala law, this demand is legally erroneous.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Landmark Ruling: Kuruvila v. State of Kerala (2007)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The High Court of Kerala held that Section 213 of the Indian Succession Act, 1925 applies
                    only within the original civil jurisdictions of the High Courts of Calcutta, Madras, and
                    Bombay. For properties situated in Kerala, probate is <strong>not mandatory</strong> to
                    establish rights under a Will or to effect transfer of registry in revenue records.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This principle was reaffirmed in <em>Babu P.C. v. State of Kerala (2020)</em>, confirming
                    that revenue officials cannot insist on probate unless a genuine objection is filed by
                    legal heirs disputing execution of the Will.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: REJECTION TROUBLESHOOTING & RDO APPEALS */}
            <section id="rejection-troubleshooting" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>DISPUTE RESOLUTION &amp; APPEALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Rejection Troubleshooting &amp; RDO Appeals
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  If your Pokkuvaravu application is flagged or rejected, identify the rejection code and
                  apply the correct statutory remedy:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-rose-800 text-xs">
                      Rejection 1: Demanding Court Probate
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>Fix:</strong> Submit a written reply citing <em>Kuruvila v. State of Kerala</em>{" "}
                      and <em>Babu P.C. v. State of Kerala</em>. If the Tahsildar persists, file a statutory
                      appeal before the RDO under Rule 18 of the TR Rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-rose-800 text-xs">
                      Rejection 2: Re-Survey / Extent Discrepancy
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>Fix:</strong> Apply for a Survey Correlation Certificate from the Taluk
                      Surveyor, or submit Form 8 for survey boundary correction under the Kerala Survey and
                      Boundaries Act.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-rose-800 text-xs">
                      Rejection 3: Objection from a Disgruntled Co-Heir
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>Fix:</strong> Request a formal hearing before the Tahsildar. If the objection
                      lacks prima facie merit, the Tahsildar must mutate. If complex title issues arise,
                      representation by counsel is advised.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-rose-800 text-xs">
                      Rejection 4: Unpaid Land Tax Arrears
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>Fix:</strong> Clear pending Basic Land Tax or Plantation Tax arrears online
                      under the old Thandaper account number and attach the paid Karam receipt.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Statutory Appeal Before the Revenue Divisional Officer (RDO)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Under Rule 18 and Rule 21 of the Transfer of Registry Rules, 1966, any person aggrieved
                    by an order of the Village Officer or Tahsildar can file an appeal before the{" "}
                    <strong>Revenue Divisional Officer (RDO) / Sub-Collector</strong> within{" "}
                    <strong>30 days</strong> of the order. A further revision lies before the District
                    Collector.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: LEGAL COMPARISON: TESTATE VS INTESTATE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Testate vs Intestate Mutation
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare document requirements, procedures, and timelines under the Transfer of Registry
                Rules, 1966.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Legal Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">Testate (With Will)</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">Intestate (No Will)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Governing Rule</td>
                      <td className="p-3.5 sm:p-4">Rule 28, Transfer of Registry Rules, 1966</td>
                      <td className="p-3.5 sm:p-4">Rule 27, Transfer of Registry Rules, 1966</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Primary Title Proof</td>
                      <td className="p-3.5 sm:p-4 text-[#C65378] font-bold">
                        Registered Will Deed + Testator Death Certificate
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Legal Heirship Certificate (Tahsildar) + Death Certificate
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Probate Requirement</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Not mandatory in Kerala (Sec 213 ISA exemption)
                      </td>
                      <td className="p-3.5 sm:p-4">Not applicable (Heirship certificate suffices)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Thandaper Entry</td>
                      <td className="p-3.5 sm:p-4">
                        Mutated directly to legatee named in the Will
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Mutated jointly to all heirs unless Release Deed signed
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Typical Processing Time</td>
                      <td className="p-3.5 sm:p-4">15 to 30 Business Days</td>
                      <td className="p-3.5 sm:p-4">20 to 45 Business Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Risk of Disinheritance Suit</td>
                      <td className="p-3.5 sm:p-4">
                        Co-heir may file objection; resolved by Tahsildar hearing
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Equal shares; dispute arises only over partition lines
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-3.5 h-3.5" />
                  <span>KERALA PROPERTY LAW CONSULTATION</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Facing a Village Office Delay or Co-Heir Dispute in Kerala?
                </div>
                <p className="text-xs text-slate-600">
                  Retain our Kerala revenue and civil advocates for Tahsildar hearings, RDO appeals, and
                  fast-track Thandaper transfers.
                </p>
              </div>
              <Link
                href="/services/kerala-pokkuvaravu-mutation-legal-retainer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Retain Kerala Lawyer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP: TRACING TITLE DEEDS */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>TITLE DUE DILIGENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Title Due Diligence &amp; Succession Checklist
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before applying for Pokkuvaravu on the Revenue e-Services portal, verify these five
                  critical title checkpoints:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      step: "Check 1",
                      title: "Procure 30-Year Encumbrance Certificate (Kudikadam / Nilavaram)",
                      desc: "Apply at the relevant SRO for Form 15 covering 30 years to confirm no court attachments, mortgages, or lis pendens exist.",
                    },
                    {
                      step: "Check 2",
                      title: "Reconcile Resurvey Block & Old Survey Numbers",
                      desc: "Compare the registered deed schedule with the Village Office BTR to ensure the Re-survey block number and sub-division match exactly.",
                    },
                    {
                      step: "Check 3",
                      title: "Verify Legal Heirship Certificate Gazette Publication",
                      desc: "In intestate cases, ensure the Legal Heirship Certificate has completed its statutory 30-day Gazette notification window.",
                    },
                    {
                      step: "Check 4",
                      title: "Confirm Local Data Bank Classification (Paddy Land Act)",
                      desc: "Check whether the land is included in the Panchayat Data Bank under the Kerala Conservation of Paddy Land and Wetland Act, 2008.",
                    },
                    {
                      step: "Check 5",
                      title: "Ensure Zero Arrears of Basic Land Tax",
                      desc: "Obtain the last paid land tax receipt under the deceased owner's Thandaper account to avoid automatic portal rejection.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL LITIGATION INSIGHTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Kerala Cities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Ernakulam */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Ernakulam Flat Pokkuvaravu</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Village Officer Demanded Probate for Registered Will
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A father in Kochi bequeathed his apartment to his daughter via a
                    registered Will. The Kanayannur Taluk Village Officer refused Pokkuvaravu, citing lack
                    of Probate under Section 213.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> Our counsel cited <em>Kuruvila v. State of Kerala</em>. The
                    Tahsildar dropped the objection, and the new Thandaper was issued within 14 days without
                    probate court proceedings.
                  </p>
                </div>

                {/* Case 2: Thrissur */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Thrissur Farmland Succession</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Co-Heirs Divided Land via Registered Release Deed
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Father died intestate leaving 50 cents in Ollur village. Two
                    daughters executed a registered Release Deed (Ozhimuri) in favor of their brother.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> On submitting the Legal Heirship Certificate alongside the
                    registered Ozhimuri, the Village Officer created an independent Thandaper solely in the
                    brother&rsquo;s name.
                  </p>
                </div>

                {/* Case 3: Trivandrum */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Trivandrum NRI Succession</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Foreign PoA Rejected for Missing Stamp Duty Adjudication
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> An NRI heir in Dubai executed a PoA for mutating ancestral land
                    in Nedumangad. The Village Office rejected it as unadjudicated.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> The PoA was submitted to the District Collector for stamping
                    under Section 31 of the Kerala Stamp Act, after which Pokkuvaravu was promptly sanctioned.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL RECITAL TEMPLATES & NOC FORMATS */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>STATUTORY REVENUE CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Recital Templates &amp; NOC Formats
              </h3>

              {/* Template Box 1: NOC Format */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Legal Heir No-Objection Affidavit (NOC) for Pokkuvaravu
                  </div>
                  <button
                    type="button"
                    onClick={copyNocClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedNoc ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy NOC</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`NO-OBJECTION AFFIDAVIT (NOC) FOR TRANSFER OF REGISTRY (POKKUVARAVU)
BEFORE THE VILLAGE OFFICER / TAHSILDAR, [NAME OF VILLAGE], [TALUK], KERALA

I, [Name of Co-Heir], aged [Age] years, residing at [Full Address], do hereby solemnly affirm and state as follows:
1. That I am the [son/daughter/widow] of the late [Name of Deceased], who passed away on [Date of Death].
2. That the deceased was the registered landholder of the property situated in Re-survey No. [Re-survey No], Block No. [Block No], Extent [Ares/Cents] in [Village Name], covered under Thandaper No. [Thandaper No].
3. That under the [Registered Will Deed / Mutual Settlement among Legal Heirs], the said property is allotted exclusively to [Name of Transferee Heir].
4. That I have no objection whatsoever to the Transfer of Registry (Pokkuvaravu) being effected in the sole name of [Name of Transferee Heir] in the Basic Tax Register (BTR).

DEPONENT
Identified and verified at [Place] on this [Day] of [Month, Year].`}
                </pre>
              </div>

              {/* Template Box 2: Reply to Tahsildar Notice */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Legal Reply to Tahsildar Notice (Citing Section 213 ISA Exemption)
                  </div>
                  <button
                    type="button"
                    onClick={copyObjectionReply}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedObjection ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Reply</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`LEGAL REPLY TO NOTICE UNDER KERALA TRANSFER OF REGISTRY RULES, 1966
BEFORE THE TAHSILDAR / DEPUTY TAHSILDAR (LAND RECORDS), [TALUK NAME], KERALA

REPLY TO REJECTION / QUERY CITING PROBATE REQUIREMENT UNDER SECTION 213 ISA:
1. The applicant has submitted a validly executed Registered Will Deed No. [Deed No/Year] of SRO [SRO Name] executed by the late [Name of Testator].
2. In 'Kuruvila v. State of Kerala' (2007) and 'Babu P.C. v. State of Kerala' (2020 (3) KHC 696), the Hon'ble High Court held that Section 213 of the Indian Succession Act does not mandate probate for Wills executed in Kerala.
3. Mutation in the Basic Tax Register (BTR) under the Transfer of Registry Rules, 1966 is purely for fiscal and revenue collection purposes and does not determine civil title.
4. In the absence of an injunction order from a competent Civil Court, the Tahsildar is bound by statutory duty to effect Pokkuvaravu and issue the updated Thandaper receipt.

PRAYER: It is respectfully prayed that the objection be dropped, Pokkuvaravu be sanctioned, and basic land tax be accepted.`}
                </pre>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Retainer
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Kerala Revenue &amp; Property Succession Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Kerala Advocates</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s leading estate planning platform, powered by AMA Legal
                  Solutions. Our Kerala property law advocates handle revenue mutation appeals before
                  Tahsildars, RDOs, and the High Court of Kerala, ensuring dispute-free Thandaper transfers
                  for resident families and NRIs worldwide.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/kerala-pokkuvaravu-mutation-legal-retainer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Kerala Mutation Retainer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/ancestral-vs-self-acquired-property-classifier"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Property Classifier</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Checker Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Kerala Pokkuvaravu
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
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations &amp; Official Kerala Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All procedural checklists and legal interpretations on this page are grounded in
                  statutory revenue legislation and authoritative judicial precedents:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://revenue.kerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Kerala Revenue e-Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act, 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://highcourt.kerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Kerala High Court: Kuruvila v. State of Kerala</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Decisions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Succession Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Property Classifier Tool
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir Share Tool
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Rule Checker
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Heirship vs Succession Tool
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Format India
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS FOR HIGH READABILITY */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Transfer Land Registry Early?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transferring land records fast stops family fights. It lets you pay your land tax in your
                  own name. It also makes it easy to take bank loans and sell later without delays.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Akshaya vs Village Office Tips</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload clear scanned copies at Akshaya. Keep files below 2 MB. Carry original deeds and
                  death papers to the Village Office when the officer conducts field checks.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Retainer Protects You</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Kerala property lawyers file your papers properly. We resolve Tahsildar queries,
                  oppose baseless objections, and represent you before the RDO bench across all districts.
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
                  KL
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Adv. K. Lekshmanan Nair</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Kerala Land Revenue Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior advocate specializing in the Kerala Land Tax Act, Transfer of Registry Rules, RDO
                appellate hearings, and NRI land title regularization.
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
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT SUCCESSION DISPUTES IN KERALA</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Kerala Property with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A registered Will ensures smooth mutation under Rule 28 without needing complicated Legal
                  Heirship Certificates or co-heir disputes.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>REVENUE MUTATION LEGAL RETAINER</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing a Village Office Rejection or Tahsildar Notice?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Kerala property lawyers handle physical Village Office representation, RDO appeals,
                  and Thandaper transfers across all 14 districts.
                </p>
                <Link
                  href="/services/kerala-pokkuvaravu-mutation-legal-retainer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Retain Kerala Lawyer</span>
                </Link>
                <div className="pt-1 text-[11px] text-slate-500">
                  <Link href="/contact" className="hover:text-[#C65378] underline">
                    Or schedule a legal inquiry with our desk
                  </Link>
                </div>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Kerala Landowners Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>High Court Precedent Backed:</strong> Enforces the <em>Kuruvila</em> and{" "}
                      <em>Babu P.C.</em> rulings exempting probate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Flaws:</strong> Resolves Re-survey mismatches, Thandaper errors,
                      and co-heir disputes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NRI Representation:</strong> Full consular PoA authentication and revenue
                      adjudication support.
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
          href="#interactive-checklist"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Checklist Tool</span>
        </a>
        <Link
          href="/services/kerala-pokkuvaravu-mutation-legal-retainer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kerala Lawyer</span>
        </Link>
      </div>
    </div>
  );
}
