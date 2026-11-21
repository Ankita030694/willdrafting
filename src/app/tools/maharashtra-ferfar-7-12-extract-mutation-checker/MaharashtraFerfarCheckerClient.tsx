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
  MapPin,
  Clock,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "legal-basis", label: "1. Legal Basis: MLRC 1966 Ferfar & 7/12 Rules" },
  { id: "interactive-checker", label: "2. Free Maharashtra Ferfar & 7/12 Checker" },
  { id: "section-149-150", label: "3. MLRC Sections 149 & 150: Notice & Certification" },
  { id: "varas-vs-will", label: "4. Varas Nond vs Will Mutation & Mumbai Probate" },
  { id: "aapli-chawdi-rts", label: "5. Aapli Chawdi 15-Day Notice & RTS Timelines" },
  { id: "supreme-court-title", label: "6. Supreme Court Law: 7/12 Is Fiscal, Not Title" },
  { id: "disputed-takrari-appeal", label: "7. Takrari Disputes & Section 247 SDO Appeals" },
  { id: "comparison-table", label: "8. Comparison: 7/12 Satbara vs Property Card" },
  { id: "step-by-step-sop", label: "9. Step-by-Step Guide: Online e-Hakk Filing" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Pune, Mumbai, Nashik" },
  { id: "affidavit-checklist", label: "11. Varas Affidavit Template & Document List" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Expertise" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Ferfar & 7/12" },
  { id: "statutory-citations", label: "14. Official Maharashtra Portals & Citations" },
];

const FAQS = [
  {
    q: "What is Ferfar (Village Form 6) and how does it update a 7/12 extract?",
    a: "Ferfar is the Register of Mutations kept in Village Form 6 under Section 150 of the MLRC, 1966. When land passes by death, sale, gift, or Will, the Talathi writes a Ferfar entry first. Once the Circle Officer certifies it after a 15-day notice, the new name updates on your 7/12 extract and 8A Khata.",
  },
  {
    q: "How much is the official government fee for Maharashtra Ferfar mutation?",
    a: "The Maharashtra Revenue Department charges zero fee for standard mutations like Varas Nond or registered sales. Downloading a digitally signed 7/12, 8A, or Ferfar copy from Digital Satbara costs Rs 15 per document. Common Service Centers may charge small operator fees.",
  },
  {
    q: "How long does Circle Officer certification take under the RTS Act?",
    a: "Under the Maharashtra Right to Public Services Act, 2015, undisputed mutations must finish within 30 days. This includes the compulsory 15-day notice posted on Aapli Chawdi. If any heir files a written objection, the case shifts to the Disputed Register (Takrari) with a 365-day limit.",
  },
  {
    q: "Is Probate needed to mutate a 7/12 or Property Card through a Will?",
    a: "In Mumbai City and Suburban areas, Probate from the Bombay High Court is mandatory under Section 57 and Section 213 of the Indian Succession Act. Outside Mumbai, Probate is not legally compulsory for clean undisputed Wills. However, if any heir objects, the Circle Officer asks for a Civil Court decree.",
  },
  {
    q: "Does a certified Ferfar or 7/12 extract prove legal ownership of land?",
    a: "No. In Jitendra Singh v. State of MP (2021) and Bhimabai Mahadeo Kambekar (2019), the Supreme Court held that mutation entries exist only for land tax collection. They do not create or cancel title. Only a registered deed or Civil Court decree decides final legal ownership.",
  },
  {
    q: "What happens if heirs miss the 3-month reporting window under Section 149?",
    a: "Section 149 asks heirs to report land rights within 3 months of death or transfer. Missing this window does not cancel your right to inherit the land. Under Section 152, the Talathi can charge a tiny nominal fine up to Rs 5 and still process your Varas Nond entry.",
  },
  {
    q: "How do I challenge a rejected or wrong Ferfar order in Maharashtra?",
    a: "You can file a formal RTS Appeal under Section 247 of the MLRC, 1966 before the Sub-Divisional Officer (SDO). Under Section 250, you must file this appeal within 60 days of the order. Late appeals require a written delay condonation request under Section 251.",
  },
  {
    q: "How is a 7/12 Satbara extract different from a Property Card?",
    a: "A 7/12 Satbara Utara covers rural and farm land using Survey or Gat numbers, handled by the Village Talathi. A Property Card (Malmatta Patrak) covers urban and city survey plots using CTS numbers, handled by the City Survey Officer. Both are revenue records, not title deeds.",
  },
];

type MutationType =
  | "varas_intestate"
  | "mrutyupatra_will"
  | "kharedi_registered"
  | "vatnipatra_partition"
  | "boja_correction";

type LandZone = "rural_7_12" | "urban_property_card" | "mumbai_presidency";
type DisputeStatus = "undisputed_all_agree" | "missing_heir_noc" | "disputed_takrari";
type DocStatus =
  | "death_cert_pedigree_only"
  | "registered_complete"
  | "unregistered_will"
  | "clerical_mismatch";

function getDefaultDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 40);
  return d.toISOString().split("T")[0];
}

export default function MaharashtraFerfarCheckerClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-basis");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Checker State
  const [mutationType, setMutationType] = useState<MutationType>("varas_intestate");
  const [landZone, setLandZone] = useState<LandZone>("rural_7_12");
  const [disputeStatus, setDisputeStatus] = useState<DisputeStatus>("undisputed_all_agree");
  const [docStatus, setDocStatus] = useState<DocStatus>("death_cert_pedigree_only");
  const [eventDate, setEventDate] = useState<string>(getDefaultDateString);

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
    setMutationType("varas_intestate");
    setLandZone("rural_7_12");
    setDisputeStatus("undisputed_all_agree");
    setDocStatus("death_cert_pedigree_only");
    setEventDate(getDefaultDateString());
  };

  // Live Section 149 Deadline Math (3 months / 90 days from event date)
  const parsedEventDate = eventDate ? new Date(`${eventDate}T00:00:00`) : new Date();
  const section149DueDate = new Date(parsedEventDate);
  section149DueDate.setMonth(section149DueDate.getMonth() + 3);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((section149DueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dueDateFormatted = section149DueDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isExemptFrom149 = mutationType === "kharedi_registered" && docStatus === "registered_complete";
  const reportingStatusLabel = isExemptFrom149
    ? "Auto SRO e-Ferfar (Sec. 154)"
    : diffDays >= 0
      ? `${diffDays} Days Left (Due ${dueDateFormatted})`
      : `Overdue by ${Math.abs(diffDays)} Days (Sec. 152 Nominal Fine)`;

  // Target Record & Authority
  const recordAuthority =
    landZone === "rural_7_12"
      ? "7/12 Satbara & 8A • Talathi & Circle Officer"
      : landZone === "urban_property_card"
        ? "Property Card (CTS) • City Survey Officer"
        : "Mumbai Property Card / 7/12 • CTS & Bombay HC";

  // Dynamic Diagnostic Rules Engine
  let resultHeadline = "Eligible for Online e-Hakk Varas Nond (30-Day RTS Track)";
  let resultBadge = "Undisputed • 30-Day RTS";
  let rtsTimeline = "30 Days (15-Day Notice)";
  let govtFeeText = "Govt Fee: Rs 0 (Rs 15 Digital Copy)";
  let legalSectionRef = "MLRC 1966 Sections 149, 150 & 1971 Rules";
  let readinessScore = 92;
  let legalRationale =
    "Your heirship mutation qualifies for direct online filing on the Maharashtra e-Hakk portal. The Talathi creates a draft Ferfar in Village Form 6 and posts a 15-day notice on Aapli Chawdi. If no heir objects, the Circle Officer certifies it within 30 days.";
  let recommendedAction =
    "Upload the Death Certificate, Family Tree (Vanshavali) affidavit, and Aadhaar copies of all Class I heirs on e-Hakk today. Keep the Poch Pavti receipt to track status.";
  let requiredDocs: string[] = [
    "Official Municipal or Gram Panchayat Death Certificate",
    "Notarized Family Tree (Vanshavali) & Legal Heir Affidavit",
    "Latest 7/12 Satbara and 8A Khata Extract copy",
    "Aadhaar & PAN cards of all surviving legal heirs",
  ];

  // 1. Check Mumbai Mandatory Probate Gate first (Highest Legal Precedence)
  if (
    mutationType === "mrutyupatra_will" &&
    landZone === "mumbai_presidency" &&
    docStatus !== "registered_complete"
  ) {
    resultHeadline = "Bombay High Court Probate Mandatory Before Mutation";
    resultBadge = "Section 213 ISA Gate";
    rtsTimeline = "6-12 Months (HC Probate) + 30 Days";
    govtFeeText = "HC Court Fee (Max Rs 75K) + Rs 0 Ferfar";
    legalSectionRef = "ISA 1925 Sec. 57 & 213 + MLRC Sec. 150";
    readinessScore = 30;
    legalRationale =
      "For property located in Mumbai City or Mumbai Suburban, an unprobated Will cannot prove ownership rights under Section 213 of the Indian Succession Act. The City Survey Officer or Talathi will reject direct mutation until the Bombay High Court grants Probate or Letters of Administration.";
    recommendedAction =
      "File a Testamentary Petition for Probate in the Bombay High Court first. Once the grant is issued, submit the certified Probate order for smooth Property Card or 7/12 mutation.";
    requiredDocs = [
      "Original Signed Will (Mrutyupatra) & Death Certificate",
      "Bombay High Court Probate or Letters of Administration Grant",
      "Schedule of Assets & Maharashtra Court-Fees GRAS Receipt",
      "Latest Property Card (CTS) or 7/12 Extract & Heir KYC",
    ];
  } else if (disputeStatus === "disputed_takrari") {
    resultHeadline = "Contested Mutation: Shifted to Takrari (Disputed) Register";
    resultBadge = "Section 150(3) Takrari";
    rtsTimeline = "Up to 365 Days (RTS Disputed Track)";
    govtFeeText = "Govt Fee: Rs 0 (Civil Suit Fee if Title Fight)";
    legalSectionRef = "MLRC Sec. 150(3)-(4) & Jitendra Singh (2021 SC)";
    readinessScore = 38;
    legalRationale =
      "Once any party files an objection within the 15-day Aapli Chawdi window, the Talathi must log it in the Disputed Register under Section 150(3). Under Jitendra Singh v. State of MP (2021), revenue officers cannot decide genuine Will validity or title disputes. You may need a Civil Court declaration.";
    recommendedAction =
      "File a written reply with title proof before the Circle Officer during the hearing. If the dispute involves a contested Will or share split, file a Civil Suit or prepare an SDO Appeal under Section 247 within 60 days.";
    requiredDocs = [
      "Copy of Written Objection (Takrar) & Aapli Chawdi Notice",
      "Certified Ferfar Form 6 Extract & 30-Year Index II Chain",
      "Registered Title Deed, Probate, or Civil Court Status",
      "Written Reply & Evidence Bundle for Circle Officer Hearing",
    ];
  } else if (docStatus === "clerical_mismatch" || mutationType === "boja_correction") {
    resultHeadline = "Section 155 Clerical Correction or Boja Entry Required";
    resultBadge = "MLRC Section 155 / Boja";
    rtsTimeline = "30 Days (Collector / Tahsildar Order)";
    govtFeeText = "Govt Fee: Rs 0 (Rs 15 Digital Copy)";
    legalSectionRef = "MLRC 1966 Section 155 & Section 150";
    readinessScore = 76;
    legalRationale =
      "Spelling errors, wrong area totals, or old bank loan liens (Boja) on a 7/12 extract cannot be fixed through a normal sale or heir entry alone. Under Section 155, the Tahsildar or Collector can fix clear clerical errors admitted by all parties. Bank Boja removal requires a registered Bank NOC or Release letter.";
    recommendedAction =
      "File a Section 155 correction application before the Tahsildar with original Index II or past Ferfar records. For bank loans, upload the Bank No Dues Certificate on e-Hakk to clear the Other Rights column.",
    requiredDocs = [
      "Application under MLRC Section 155 detailing exact clerical error",
      "Prior certified Ferfar (Form 6) & Registered Deed (Index II)",
      "Bank No Dues / Loan Closure Certificate (for Boja removal)",
      "Applicant Aadhaar & current 7/12 Satbara copy",
    ];
  } else if (mutationType === "kharedi_registered") {
    resultHeadline = "Automatic e-Ferfar Triggered via Sub-Registrar (Section 154)";
    resultBadge = "Auto SRO Intimation";
    rtsTimeline = "15 to 30 Days (Auto PDE Pipeline)";
    govtFeeText = "Govt Mutation Fee: Rs 0 (Covered at SRO)";
    legalSectionRef = "MLRC 1966 Section 154 & Section 150(2)";
    readinessScore = 96;
    legalRationale =
      "Under Section 154 of the MLRC, when you register a Sale Deed or Gift Deed at a Maharashtra Sub-Registrar Office (SRO), the IGR system sends an automatic digital intimation to the Talathi. You do not need a fresh Section 149 report. The Talathi issues the 15-day notice, and the Circle Officer certifies it.";
    recommendedAction =
      "Check Aapli Chawdi after 3 to 5 days of deed registration using your village and Survey/Gat number. Confirm the draft Ferfar entry matches your Index II area and buyer names exactly.";
    requiredDocs = [
      "Registered Sale Deed or Gift Deed with IGR Index II",
      "Stamp Duty & Registration Fee GRAS Receipt",
      "Previous 7/12 Satbara or Property Card (CTS)",
      "Buyer & Seller Aadhaar / PAN verification copy",
    ];
  } else if (mutationType === "mrutyupatra_will") {
    if (docStatus === "unregistered_will" || disputeStatus === "missing_heir_noc") {
      resultHeadline = "Will Mutation Possible, High Scrutiny Without Heir NOCs";
      resultBadge = "Enhanced Scrutiny Track";
      rtsTimeline = "30 to 90 Days (Notice to All Legal Heirs)";
      govtFeeText = "Govt Fee: Rs 0 (Rs 15 Digital Copy)";
      legalSectionRef = "MLRC Sec. 150(2) + ISA 1925 Sec. 63";
      readinessScore = 58;
      legalRationale =
        "Outside Mumbai, an unregistered Will is legally valid under Section 63 of the Indian Succession Act. However, the Talathi must serve written notices to every natural Class I heir under Section 150(2). If any missing heir objects, the Circle Officer will refuse mutation and direct you to a Civil Court.";
      recommendedAction =
        "Collect signed No Objection Affidavits from all natural legal heirs along with the Death Certificate and Will copy before filing on e-Hakk. Consider registering Wills during lifetime to stop future disputes.";
      requiredDocs = [
        "Original Will (Mrutyupatra) signed by testator and 2 witnesses",
        "Official Death Certificate of the deceased owner",
        "Signed No Objection Affidavits (NOC) from all Class I heirs",
        "Complete Family Tree (Vanshavali) & latest 7/12 extract",
      ];
    } else {
      resultHeadline = "Eligible for Mrutyupatra (Will) Ferfar Entry";
      resultBadge = "Will Mutation Ready";
      rtsTimeline = "30 Days (Undisputed RTS Track)";
      govtFeeText = "Govt Fee: Rs 0 (Rs 15 Digital Copy)";
      legalSectionRef = "MLRC Sec. 149-150 & ISA 1925";
      readinessScore = 88;
      legalRationale =
        "With a registered Will (or Probated Will in Mumbai) and full family consent, the Talathi logs a Mrutyupatra Nond in Village Form 6. After the 15-day Aapli Chawdi notice passes without objection, the Circle Officer certifies the mutation onto the 7/12 extract.";
      recommendedAction =
        "Submit the e-Hakk application under Mrutyupatra Nond with the registered Will, Death Certificate, and beneficiary KYC. Track the 15-day notice period on Aapli Chawdi.";
      requiredDocs = [
        "Registered Will / Probated Grant (mandatory for Mumbai)",
        "Death Certificate of the Will maker (Testator)",
        "Family Tree Affidavit & Heir Consent / No Objection letters",
        "Current 7/12 Satbara or Property Card & Beneficiary Aadhaar",
      ];
    }
  } else if (mutationType === "vatnipatra_partition") {
    resultHeadline =
      docStatus === "registered_complete"
        ? "Eligible for Vatnipatra / Hakka Sod Patra Ferfar"
        : "Register Partition or Release Deed Before Filing Ferfar";
    resultBadge =
      docStatus === "registered_complete" ? "30-Day RTS Ready" : "Registration Required";
    rtsTimeline =
      docStatus === "registered_complete"
        ? "30 Days (Auto SRO / e-Hakk)"
        : "Blocked Until Deed Registration";
    govtFeeText = "Govt Mutation Fee: Rs 0 (Stamp Duty at SRO)";
    legalSectionRef = "MLRC Sec. 85 (Partition) & Sec. 150";
    readinessScore = docStatus === "registered_complete" ? 90 : 45;
    legalRationale =
      docStatus === "registered_complete"
        ? "A registered Partition Deed (Vatnipatra) or Release Deed (Hakka Sod Patra) lets the Talathi divide or remove co-owner shares cleanly. For rural land, MLRC Section 85 also allows a Tahsildar-supervised family partition among co-holders."
        : "Revenue officers generally refuse to remove a co-owner name based on an unregistered plain-paper relinquishment. Under Section 17 of the Registration Act, releasing rights in immovable property requires a registered deed (or a formal Section 85 MLRC partition order).";
    recommendedAction =
      docStatus === "registered_complete"
        ? "Track the auto e-Ferfar from the SRO or upload the registered Index II on e-Hakk. Confirm separate Pot-Hissa survey measurements if splitting physical plots."
        : "Execute a registered Hakka Sod Patra (Rs 500 stamp duty among blood relatives under Maharashtra Stamp Act Art. 52(a)) or apply under MLRC Section 85 before filing Ferfar.";
    requiredDocs = [
      "Registered Vatnipatra (Partition) or Hakka Sod Patra + Index II",
      "Section 85 Tahsildar Order (if applying for rural land partition)",
      "Consent Affidavits & Aadhaar KYC of all co-owners",
      "Latest 7/12 Satbara, 8A Khata & Pot-Hissa measurement map",
    ];
  } else if (disputeStatus === "missing_heir_noc") {
    resultHeadline = "Varas Nond Allowed, Must Include All Surviving Legal Heirs";
    resultBadge = "Include All Heirs";
    rtsTimeline = "30 to 60 Days (Notice Verification)";
    govtFeeText = "Govt Fee: Rs 0 (Rs 15 Digital Copy)";
    legalSectionRef = "MLRC Sec. 149-150 & Hindu Succession Act Sec. 8";
    readinessScore = 68;
    legalRationale =
      "Under Varas Nond, the Talathi must enter the names of ALL Class I legal heirs (including married daughters and widowed mother). You cannot drop a missing heir from the 7/12 without a registered Release Deed (Hakka Sod Patra). Hiding an heir makes the Ferfar illegal and open to Section 247 cancellation.";
    recommendedAction =
      "List every legal heir truthfully in the Vanshavali affidavit so the joint Varas Nond gets certified smoothly. Later, any heir wishing to give up their share can sign a registered Release Deed.";
    requiredDocs = [
      "Official Death Certificate of the deceased khatedar",
      "Complete Vanshavali (Family Tree) naming ALL heirs including daughters",
      "Address proof of missing or NRI heir for Section 150(2) notice",
      "Latest 7/12 Satbara & 8A Khata copy",
    ];
  }

  const copyAffidavitToClipboard = () => {
    const text = `VARAS NOND (LEGAL HEIRSHIP) FAMILY TREE AFFIDAVIT FORMAT - MAHARASHTRA (MLRC 1966)
Before the Village Talathi / Circle Officer / City Survey Officer, [Village/City, Taluka, District]

I, [Applicant Full Name], aged [Age] years, residing at [Full Address], solemnly affirm as follows:
1. That late [Deceased Owner Full Name] was the lawful holder of agricultural land / plot bearing Survey / Gat / CTS No. [Number], admeasuring [Area], situated at Village [Name], Taluka [Name], District [Name], Maharashtra.
2. That the said holder passed away intestate on [Date of Death] (Death Certificate No. [Number] attached).
3. That the deceased left behind ONLY the following lawful Class I legal heirs:
   (a) [Spouse Name] - Age [X] - Relation: Spouse
   (b) [Son/Daughter Name] - Age [X] - Relation: Son/Daughter
   (c) [Mother Name, if surviving] - Age [X] - Relation: Mother
4. That no other legal heir has been omitted and there is no pending civil court injunction against this property.
5. I request the Hon'ble Talathi and Circle Officer to enter all above legal heirs in the Register of Mutations (Village Form 6 - Ferfar) under Sections 149 and 150 of the MLRC, 1966.

Deponent Signature | Date | Verified before Executive Magistrate / Notary Public`;
    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `MAHARASHTRA FERFAR & 7/12 MUTATION DOCUMENT CHECKLIST (MLRC 1966)
1. Official Death Certificate (for Varas Nond or Will Mutation).
2. Notarized Family Tree (Vanshavali) & Legal Heir Affidavit naming ALL Class I heirs.
3. Latest 7/12 Satbara Utara & 8A Khata (or Property Card for urban CTS plots).
4. Registered Deed with Index II (Sale Deed, Gift Deed, Vatnipatra, or Hakka Sod Patra).
5. Original Will + Bombay High Court Probate (mandatory for Mumbai properties).
6. Aadhaar Card & PAN Card of applicant and all legal heirs.
7. Bank Loan Closure / No Dues Letter (for removing Boja from Other Rights column).
8. e-Hakk Acknowledgement Receipt (Poch Pavti) to track 15-day Aapli Chawdi notice.`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>MLRC 1966 SECTIONS 149-150 • MAHARASHTRA RTS ACT 2015</span>
          </div>

          {/* Strict Single H1 Tag (50 chars, distinct from page title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Maharashtra Ferfar &amp; 7/12 Extract Mutation Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Verify Ferfar rules for 7/12 Satbara and Property Cards under MLRC 1966. Check Varas
            Nond, Will probate rules, 15-day Aapli Chawdi notices, and 30-day RTS deadlines.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Run Ferfar Mutation Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Dispute-Free Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 0 Govt Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STANDARD FERFAR (RS 15 DIGITAL COPY)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15-Day Notice</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 150(2) AAPLI CHAWDI WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30-Day RTS</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNDISPUTED CERTIFICATION TIMELINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">60-Day Appeal</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 247 &amp; 250 SDO APPEAL LIMIT
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
                <span>Statutory Reference</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Based on the Maharashtra Land Revenue Code, 1966 (Sections 149, 150, 154, 155, 157,
                247), 1971 Record of Rights Rules, and Maharashtra RTS Act, 2015.
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
                <span>EXECUTIVE BRIEF: MAHARASHTRA FERFAR &amp; 7/12 RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ferfar Comes Before 7/12 Update:</strong> Your 7/12 Satbara never
                    changes directly. The Talathi first records a Ferfar entry in Village Form 6
                    under Section 150. Only after the Circle Officer certifies it does your name
                    appear on the 7/12 extract.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Government Fee for Standard Mutation:</strong> Filing Varas Nond
                    (heirship) or registered transfer mutations carries no revenue fee. Downloading a
                    digitally signed 7/12 or Ferfar copy online costs Rs 15.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>30-Day Undisputed Limit:</strong> Under the Maharashtra RTS Act, 2015,
                    undisputed entries must finish within 30 days. This includes the compulsory
                    15-day public notice on Aapli Chawdi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Revenue Records Are Not Title Deeds:</strong> Supreme Court rulings confirm
                    that a 7/12 extract only shows who pays land tax. Deep disputes over Wills or
                    ownership must go to a Civil Court.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: LEGAL BASIS (SINGLE H2 ON THIS PAGE) */}
            <section id="legal-basis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LAND LAW BASIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Basis: MLRC 1966 Ferfar &amp; 7/12 Mutation Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Land name transfer in Maharashtra follows Chapter X of the Maharashtra Land
                  Revenue Code (MLRC), 1966. It works with the 1971 Record of Rights Rules.
                </p>
                <p>
                  A <strong>Ferfar (Village Form 6)</strong> is the official land change log kept by
                  the village Talathi. It logs every shift in land rights. This covers heirship
                  (Varas Nond), a Will (Mrutyupatra), a sale deed, a gift, or a bank loan (Boja).
                </p>
                <p>
                  Once the Circle Officer signs off the Ferfar entry, the Talathi updates your{" "}
                  <strong>7/12 Satbara Utara</strong> and <strong>8A Khata</strong>. In city towns
                  and Mumbai, the City Survey Officer updates the <strong>Property Card</strong>{" "}
                  instead.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER TOOL */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE MUTATION DIAGNOSTIC</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Maharashtra Ferfar &amp; 7/12 Mutation Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your transfer type, property zone, consent status, documents, and date below.
                Get your exact MLRC track, Section 149 due date, RTS limit, and document checklist.
              </p>

              {/* Checker Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Transfer / Mutation Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: What type of Ferfar mutation do you need?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        id: "varas_intestate",
                        label: "Varas Nond (No Will)",
                        desc: "Owner passed away without a Will; heirs claim by law",
                      },
                      {
                        id: "mrutyupatra_will",
                        label: "Mrutyupatra (Via Will)",
                        desc: "Owner left a signed registered or unregistered Will",
                      },
                      {
                        id: "kharedi_registered",
                        label: "Sale / Gift Deed (SRO)",
                        desc: "Registered Kharedi Khat or Bakshispatra at Sub-Registrar",
                      },
                      {
                        id: "vatnipatra_partition",
                        label: "Partition / Release Deed",
                        desc: "Family Vatnipatra or Hakka Sod Patra among co-owners",
                      },
                      {
                        id: "boja_correction",
                        label: "Boja / Sec. 155 Fix",
                        desc: "Remove bank loan lien or fix spelling/area error on 7/12",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setMutationType(option.id as MutationType)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          mutationType === option.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{option.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Property Zone & Record Type */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Where is the property located in Maharashtra?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "rural_7_12",
                        label: "Rural / Farm Land (7/12)",
                        desc: "Pune, Nashik, Satara, Nagpur villages with Survey / Gat No.",
                      },
                      {
                        id: "urban_property_card",
                        label: "Urban City Plot (CTS)",
                        desc: "Municipal urban plots outside Mumbai using Property Card",
                      },
                      {
                        id: "mumbai_presidency",
                        label: "Mumbai City / Suburban",
                        desc: "Presidency town jurisdiction (Bombay HC Probate rules apply)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setLandZone(opt.id as LandZone)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          landZone === opt.id
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

                {/* Step 3: Family Consent / Dispute Status */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 3: Do all legal heirs and co-owners agree?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "undisputed_all_agree",
                        label: "Yes, Fully Undisputed",
                        desc: "All heirs agree; zero objection expected during notice",
                      },
                      {
                        id: "missing_heir_noc",
                        label: "Missing Heir / No NOC",
                        desc: "One heir is unreachable or has not given consent yet",
                      },
                      {
                        id: "disputed_takrari",
                        label: "Objection Filed (Takrar)",
                        desc: "A family member objected at the Talathi or Circle Office",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDisputeStatus(opt.id as DisputeStatus)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          disputeStatus === opt.id
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

                {/* Step 4: Document Readiness */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Step 4: Which primary documents do you currently have?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "death_cert_pedigree_only",
                        label: "Death Cert + Vanshavali",
                        desc: "Death paper and family tree affidavit for Varas Nond",
                      },
                      {
                        id: "registered_complete",
                        label: "Registered Deed / Probate",
                        desc: "SRO registered deed, Index II, or Court Probate grant",
                      },
                      {
                        id: "unregistered_will",
                        label: "Unregistered / Plain Will",
                        desc: "Signed Will on plain paper without SRO registration or Probate",
                      },
                      {
                        id: "clerical_mismatch",
                        label: "Name / Area Mismatch",
                        desc: "Spelling mistake, wrong guntha area, or old bank Boja",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDocStatus(opt.id as DocStatus)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          docStatus === opt.id
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

                {/* Step 5: Date of Death / Acquisition (Section 149 3-Month Deadline Tracker) */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label
                    htmlFor="ferfar-event-date"
                    className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-[#C65378]" />
                    <span>Step 5: Date of owner&rsquo;s death or property transfer (Section 149 check)</span>
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <input
                      id="ferfar-event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:border-[#C65378]"
                    />
                    <span className="text-xs text-slate-600">
                      Calculates your 3-month statutory reporting window under MLRC Section 149.
                    </span>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Checker to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        MAHARASHTRA FERFAR MUTATION DIAGNOSTIC RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {resultHeadline}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{resultBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        RTS TIMELINE &amp; GOVT FEE
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {rtsTimeline}
                      </div>
                      <div className="text-[11px] text-slate-300">{govtFeeText}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        RECORD &amp; REVENUE OFFICE
                      </div>
                      <div className="text-sm sm:text-base font-black text-white leading-snug">
                        {recordAuthority}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Readiness Score: {readinessScore}/100
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        SECTION 149 (3-MONTH WINDOW)
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {reportingStatusLabel}
                      </div>
                      <div className="text-[11px] text-slate-400">{legalSectionRef}</div>
                    </div>
                  </div>

                  {/* Tailored Document Checklist */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-200 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Required Papers for Your Exact Scenario:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {requiredDocs.map((doc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Analysis:</span>
                    </div>
                    <p>{legalRationale}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Next Step:</strong> {recommendedAction}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want smooth land transfer for your family? Put your wishes in a clear Will.
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Your Will Online in 15 Mins</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>MAHARASHTRA FERFAR &amp; 7/12 EXTRACT GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">MLRC 1966</span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/maharashtra-ferfar-7-12-extract-mutation-checker-og.jpg"
                  alt="Maharashtra Ferfar and 7/12 Extract Mutation Checker under MLRC 1966"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Reviewing Maharashtra 7/12 Satbara Utara and Village Form 6 Ferfar entries under
                Sections 149 and 150 of the MLRC, 1966.
              </p>
            </div>

            {/* SECTION 3: MLRC SECTIONS 149 & 150 */}
            <section id="section-149-150" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CORE STATUTORY SECTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. MLRC Sections 149 &amp; 150: Notice &amp; Certification
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every land mutation in Maharashtra flows through four key sections of the MLRC,
                  1966. Knowing each rule stops illegal rejections at the Talathi office.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 149 &amp; Section 152
                    </div>
                    <div className="font-bold text-slate-800">3-Month Reporting Rule</div>
                    <p className="text-slate-600 leading-relaxed">
                      Anyone who gets land rights by death, Will, or gift must inform the Talathi
                      within 3 months. Late notice attracts only a tiny fine up to Rs 5 under Section
                      152. It never cancels your share.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 150(1) &amp; 150(2)
                    </div>
                    <div className="font-bold text-slate-800">Ferfar Entry &amp; 15-Day Notice</div>
                    <p className="text-slate-600 leading-relaxed">
                      The Talathi logs a draft Ferfar in Village Form 6. He must post a public copy
                      at the village Chawdi and send written notices to all linked parties. Parties
                      get 15 days to object.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 154 (Auto Intimation)
                    </div>
                    <div className="font-bold text-slate-800">Registered Deeds Skip Sec. 149</div>
                    <p className="text-slate-600 leading-relaxed">
                      When you sign a registered Sale Deed or Gift Deed at the SRO, the Sub-Registrar
                      sends an automatic digital notice to the Talathi. You do not need to file a
                      separate report.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 150(6) &amp; Section 157
                    </div>
                    <div className="font-bold text-slate-800">Circle Officer Certification</div>
                    <p className="text-slate-600 leading-relaxed">
                      The Circle Officer (Mandal Adhikari) checks the file after 15 days and
                      certifies the Ferfar. Under Section 157, a certified entry is presumed true
                      until proved wrong.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: VARAS NOND VS WILL MUTATION */}
            <section id="varas-vs-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>SUCCESSION &amp; PROBATE GATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Varas Nond vs Will Mutation &amp; Mumbai Probate
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Families often confuse <strong>Varas Nond</strong> (no Will) with{" "}
                  <strong>Mrutyupatra Nond</strong> (with a Will). Each path follows strict rules on
                  who must be notified and whether court Probate is needed.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Varas Nond (Intestate Death):</strong> All Class I heirs (spouse, sons,
                    married or unmarried daughters, and mother) go onto the 7/12 jointly. Skipping a
                    daughter makes the Ferfar open to cancellation.
                  </li>
                  <li>
                    <strong>Will Mutation Outside Mumbai:</strong> In Pune, Nashik, Satara, Nagpur,
                    and rural districts, Probate is not compulsory for clean Wills. Still, the
                    Talathi serves Section 150(2) notices on all natural heirs before certification.
                  </li>
                  <li>
                    <strong>Mumbai City &amp; Suburban Rule:</strong> Under Section 57 and Section
                    213 of the Indian Succession Act, 1925, Probate from the Bombay High Court is
                    mandatory for Wills covering Mumbai properties.
                  </li>
                </ul>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Warning: Never Hide a Legal Heir in Your Vanshavali</span>
                  </div>
                  <p className="leading-relaxed">
                    Filing a false family tree to exclude a married sister or sibling is an offense
                    and voids the Ferfar on appeal. If an heir wants to give up their share, record
                    Varas Nond first and then sign a registered Hakka Sod Patra (Release Deed).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: AAPLI CHAWDI & RTS TIMELINES */}
            <section id="aapli-chawdi-rts" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>RIGHT TO PUBLIC SERVICES ACT 2015</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Aapli Chawdi 15-Day Notice &amp; RTS Timelines
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Maharashtra digitized village notice boards through the{" "}
                  <strong>Aapli Chawdi</strong> portal. Any citizen or NRI can now track live
                  pending Ferfar notices online without visiting the village office.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Stage 1: Notice Period
                    </div>
                    <div className="font-bold text-slate-800">15 Calendar Days</div>
                    <p className="text-slate-600 leading-relaxed">
                      The Talathi publishes Form 9 / Section 150(2) notice physically at the Chawdi
                      and digitally on Aapli Chawdi for objections.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Stage 2: Undisputed RTS
                    </div>
                    <div className="font-bold text-slate-800">30 Days Statutory Limit</div>
                    <p className="text-slate-600 leading-relaxed">
                      If no written objection arrives in 15 days, the Circle Officer must certify
                      the Ferfar within 30 days under the Maharashtra RTS Act, 2015.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Stage 3: Disputed Track
                    </div>
                    <div className="font-bold text-slate-800">Up to 365 Days</div>
                    <p className="text-slate-600 leading-relaxed">
                      If an heir files a Takrar (objection), the Circle Officer conducts a summary
                      hearing with up to 365 days allowed under RTS rules.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: SUPREME COURT LAW */}
            <section id="supreme-court-title" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Supreme Court Law: 7/12 Is Fiscal, Not Title
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many property buyers assume that a name on a 7/12 extract proves absolute legal
                  ownership. The Supreme Court of India has settled clearly that this belief is wrong.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Jitendra Singh v. State of Madhya Pradesh (2021)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Supreme Court held that a mutation entry does not confer any right, title, or
                    interest in land. It exists purely for fiscal tax collection. Where a party
                    claims land through a disputed Will, revenue officers cannot judge the Will. The
                    claimant must get title declared by a Civil Court first.
                  </p>
                </div>
                <p>
                  In <strong>Bhimabai Mahadeo Kambekar v. Arthur Import &amp; Export Co. (2019)</strong>{" "}
                  and <strong>Balwant Singh v. Daulat Singh (1997)</strong>, the Supreme Court
                  repeated that revenue records neither create nor extinguish title. Always rely on a
                  registered deed, Probate, or Civil Court decree alongside your 7/12 extract.
                </p>
              </div>
            </section>

            {/* SECTION 7: DISPUTED TAKRARI & SDO APPEALS */}
            <section id="disputed-takrari-appeal" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>RTS DISPUTES &amp; REMEDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Takrari Disputes &amp; Section 247 SDO Appeals
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  What if the Circle Officer cancels your genuine Ferfar entry or certifies a wrong
                  name secretly? The MLRC, 1966 gives you a strict multi-tier appeal chain.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>First RTS Appeal (Section 247):</strong> Challenge a Circle Officer or
                    Tahsildar mutation order before the Sub-Divisional Officer (SDO).
                  </li>
                  <li>
                    <strong>Strict 60-Day Limit (Section 250):</strong> You must file the appeal
                    within 60 days from the order date. For late filings, you must prove sufficient
                    cause under Section 251.
                  </li>
                  <li>
                    <strong>Second Appeal &amp; Revision (Section 257):</strong> Unhappy with the SDO
                    order? Escalate to the Additional Collector, then file a revision before the
                    Divisional Commissioner or State Revenue Minister.
                  </li>
                  <li>
                    <strong>Clerical Errors (Section 155):</strong> If the mistake is only a typo or
                    area slip admitted by all parties, apply directly to the Tahsildar under Section
                    155 instead of filing a long appeal.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>RURAL VS URBAN REVENUE RECORDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison: 7/12 Satbara vs Property Card (CTS)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Check which land record applies to your Maharashtra property before filing a
                mutation request.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        7/12 Satbara Utara
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Property Card (Malmatta Patrak)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Property Area</td>
                      <td className="p-3.5 sm:p-4">
                        Rural and agricultural land parcels across Maharashtra villages.
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Urban, municipal, and non-agricultural city-surveyed plots.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Identifier Number</td>
                      <td className="p-3.5 sm:p-4 font-semibold">Survey Number or Gat Number</td>
                      <td className="p-3.5 sm:p-4 font-semibold">City Survey (CTS) Number</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Custodian Officer</td>
                      <td className="p-3.5 sm:p-4">Village Talathi &amp; Circle Officer</td>
                      <td className="p-3.5 sm:p-4">City Survey Officer (CTS Office)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Mutation Register</td>
                      <td className="p-3.5 sm:p-4">Village Form 6 (Ferfar Register)</td>
                      <td className="p-3.5 sm:p-4">City Survey Inquiry / Mutation Register</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Official Digital Fee</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Rs 0 mutation; Rs 15 per signed copy
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Nominal CTS copy fee via Mahabhumi
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Proof of Ownership?</td>
                      <td className="p-3.5 sm:p-4 text-[#C65378] font-bold">
                        No. Fiscal record only (MLRC Sec. 157)
                      </td>
                      <td className="p-3.5 sm:p-4 text-[#C65378] font-bold">
                        No. Fiscal record only (Needs Title Deed)
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
                  <Calculator className="w-3.5 h-3.5" />
                  <span>TRANSFERRING PROPERTY AMONG FAMILY IN MAHARASHTRA?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Check Rs 200 Gift Deed &amp; Rs 500 Hakka Sod Patra Stamp Duty
                </div>
                <p className="text-xs text-slate-600">
                  Calculate exact Maharashtra Stamp Act Article 34 &amp; Article 52(a) blood-relative
                  stamp duty before filing Ferfar.
                </p>
              </div>
              <Link
                href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Maharashtra Stamp Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>ONLINE E-HAKK &amp; AAPALI CHAWDI WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step Guide: Online e-Hakk Ferfar Filing
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these six steps to complete your Varas Nond or Will mutation smoothly
                  without repeated visits to the Talathi office:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Register on Maharashtra e-Hakk (PDE) Portal",
                      desc: "Visit the official Mahabhumi PDE / e-Hakk portal. Sign up using your mobile OTP and pick your District, Taluka, and Village.",
                    },
                    {
                      title: "Choose the Exact Mutation Category",
                      desc: "Select Varas Nond (for heirship without Will), Mrutyupatra Nond (for a Will), or Boja Kami (to remove a closed bank loan).",
                    },
                    {
                      title: "Enter Survey / Gat Number & All Heir Names",
                      desc: "Select the exact 7/12 account holder name. Type every surviving legal heir name truthfully matching their Aadhaar spelling.",
                    },
                    {
                      title: "Upload Clear PDF Scans & Save Poch Pavti",
                      desc: "Upload the Death Certificate, notarized Vanshavali affidavit, Will or Probate copy, and Aadhaar cards. Download the Poch Pavti receipt with your application ID.",
                    },
                    {
                      title: "Track 15-Day Public Notice on Aapli Chawdi",
                      desc: "Once the Talathi enters the draft Ferfar (Form 6), check Aapli Chawdi online. Ensure notice copies reach all listed family members.",
                    },
                    {
                      title: "Download Digitally Signed 7/12 & Certified Ferfar",
                      desc: "After 15 objection-free days, the Circle Officer certifies the entry within 30 days. Pay Rs 15 on Digital Satbara to download your QR-verified 7/12 and Ferfar copy.",
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
                <span>PRACTICAL MAHARASHTRA SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Case Studies: Pune, Mumbai &amp; Nashik
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Pune */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Pune Rural 7/12</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Brothers Exclude Married Sister from Varas Nond
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Two brothers filed Varas Nond on their father&rsquo;s
                    Haveli farmland without naming their married sister. She found the certified
                    Ferfar a year later.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> The SDO allowed her Section 247 appeal with delay
                    condonation under Section 251 and cancelled the false Ferfar. All three children
                    were entered equally on the 7/12.
                  </p>
                </div>

                {/* Case 2: Mumbai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mumbai CTS Plot</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Unprobated Will Rejected by City Survey Office
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A daughter applied to update an Andheri Property Card
                    using her father&rsquo;s registered Will without getting Bombay High Court
                    Probate.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> Under Section 213 of the Indian Succession Act, the
                    CTS office rejected direct transfer. After securing Probate from the Bombay High
                    Court, her Property Card updated in 25 days.
                  </p>
                </div>

                {/* Case 3: Nashik */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Nashik Vineyard</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Disputed Will Moved to Takrari Register
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> One son filed a Will mutation in Nashik. His brother
                    filed a written objection during the 15-day Aapli Chawdi window alleging fraud.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> Following <em>Jitendra Singh (2021)</em>, the Circle
                    Officer logged a Takrari case and directed the family to obtain a Civil Court
                    declaration rather than deciding Will validity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: AFFIDAVIT TEMPLATE & CHECKLIST */}
            <section id="affidavit-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>READY-TO-USE VARAS DRAFT &amp; CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Varas Affidavit Template &amp; Document Checklist
              </h3>

              {/* Template Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Maharashtra Varas Nond (Vanshavali) Affidavit Draft
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`Before the Village Talathi / Circle Officer / City Survey Officer, [Village/City, Taluka, District]

I, [Applicant Full Name], aged [Age] years, residing at [Address], solemnly affirm:
1. Late [Deceased Holder Name] held Survey / Gat / CTS No. [Number], area [Area], at Village [Name], Maharashtra.
2. The holder passed away intestate on [Date] (Death Certificate No. [Number] attached).
3. The deceased left ONLY the following lawful Class I legal heirs: [List Spouse, All Sons, All Daughters, Surviving Mother].
4. No lawful heir is omitted and no civil court stay applies. I request mutation in Village Form 6 (Ferfar) under Sections 149 & 150 of the MLRC, 1966.`}
                </pre>
              </div>

              {/* Template Box 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Master Paper Checklist: Maharashtra Ferfar &amp; 7/12 Mutation
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Official Municipal / Gram Panchayat Death Certificate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Notarized Family Tree (Vanshavali) &amp; Legal Heir Affidavit</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Latest 7/12 Satbara, 8A Khata, or CTS Property Card</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Registered Deed + Index II (or Bombay HC Probate for Mumbai)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Aadhaar &amp; PAN copies of applicant and all legal heirs</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>e-Hakk Poch Pavti receipt &amp; Bank NOC (if clearing Boja)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Expertise &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Maharashtra Estate &amp; Revenue Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is backed by AMA Legal Solutions. Our property and succession
                  lawyers assist families across Mumbai, Pune, Nagpur, Thane, and Nashik with
                  clean Wills, Bombay High Court Probate, Varas Nond filings, and Section 247 RTS
                  appeals. Note: This page provides general legal information, not tailored legal
                  advice.
                </p>

                {/* Related Tools & Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/tools/bombay-high-court-probate-court-fee-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Bombay HC Probate Fee</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>MH Gift &amp; Release Duty</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Property Mutation Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/templates/will-format-marathi-mrutyupatra"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Marathi Will Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
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
                13. Frequently Asked Questions: Ferfar &amp; 7/12 Mutation
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] cursor-pointer"
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Maharashtra Portals &amp; Legal Citations
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify your 7/12 extract, pending Aapli Chawdi notices, and primary statutes
                  directly through official Indian government portals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://bhulekh.mahabhumi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Bhulekh Mahabhumi (7/12 &amp; 8A)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://digitalsatbara.mahabhumi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Digital Satbara &amp; Aapli Chawdi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: MLRC 1966</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools, Services &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/housing-society-flat-transfer-document-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Housing Society Flat Transfer Tool
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir vs Succession Cert Tool
                    </Link>
                    <Link
                      href="/services/probate-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bombay HC Probate Lawyer
                    </Link>
                    <Link
                      href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heirs Pedigree Affidavit Format
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heirs NOC Format
                    </Link>
                    <Link
                      href="/locations/maharashtra"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Maharashtra Will &amp; Estate Guide
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain-English Bottom Trust Cards (matching reference design) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Keep 7/12 Fresh?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A fresh 7/12 makes bank loans, crop aid, and land sales fast. It stops wrong
                  claims early. File Varas Nond soon after a death so your farm and home stay safe.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Will</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write a Will on plain white paper. No stamp paper is needed in India. Sign
                  it in front of two adult witnesses. Each witness signs in your view to make it
                  valid.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your 7/12, old Ferfar, and heir list. We write clear Wills with
                  no mix-ups. We guide your heirs step by step so your land passes on fast.
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
                Advises families on Indian succession law, Maharashtra revenue mutations, Bombay
                High Court probate, and dispute-free Will drafting.
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
                  <span>PREVENT TAKRARI LAND DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Maharashtra Land with a Clear Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid years of Takrari fights and split claims. Put every Survey number, flat, and
                  heir share in a lawyer-reviewed Will.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Registration Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>FERFAR &amp; RTS APPEAL DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Stuck With a Rejected Ferfar or Takrari Objection?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our legal team assists with Varas Nond documentation, Bombay HC Probate, and
                  Section 247 SDO appeals across Maharashtra.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Legal Consultation</span>
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
                      <strong>MLRC 1966 Grounded:</strong> Built on Sections 149, 150, 154, 155, and
                      247 of Maharashtra revenue law.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Mumbai Probate Aware:</strong> Flags Section 213 Bombay HC rules
                      before you waste months at CTS offices.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Plain English Clarity:</strong> Clear timelines, zero invented fees,
                      and ready affidavit templates.
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
          href="#interactive-checker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Ferfar Checker</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
