"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
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
  Calendar,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Landmark,
  Gavel,
  Check,
  Layers,
  ArrowUpRight,
  Download,
  Info,
  Users,
  Home,
  Scroll,
  Copy,
  Split,
  Globe2,
  FileCode,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Understanding Intestate Property Transfer in India" },
  { id: "who-inherits-hsa", label: "2. Who Inherits: Hindu Succession Act Section 8 Rules" },
  { id: "five-step-roadmap", label: "3. Complete 5-Step Property Transfer Roadmap" },
  { id: "title-vs-mutation", label: "4. Title Ownership vs Municipal Property Mutation" },
  { id: "document-checklist", label: "5. Essential Documents Checklist for Property Transfer" },
  { id: "visual-blueprint", label: "6. Step-by-Step Visual Roadmap: Death to Mutation" },
  { id: "will-vs-intestate", label: "7. Transfer With a Will vs Transfer Without a Will" },
  { id: "relinquishment-deed", label: "8. Relinquishment Deed: Giving Up or Consolidating Shares" },
  { id: "complex-scenarios", label: "9. Handling Complex Scenarios: Disputes, NRIs & Minors" },
  { id: "avoid-with-a-will", label: "10. How Writing a Will Eliminates Succession Hardships" },
  { id: "legal-services", label: "11. Professional Legal Support from WillDrafting.in" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions on Property Succession" },
  { id: "statutory-citations", label: "13. Relevant Laws, Statutory Sections & Court Rulings" },
];

const CLASS_1_HEIRS = [
  {
    relation: "Surviving Widow (Wife)",
    share: "Takes 1 full primary share",
    legalBasis: "Section 10, Rule 1",
    plainNotes:
      "If the deceased leaves multiple widows (under personal laws permitting it), all widows together take one single share.",
  },
  {
    relation: "Surviving Mother",
    share: "Takes 1 full primary share",
    legalBasis: "Section 10, Rule 2",
    plainNotes:
      "The mother takes an equal share with the widow and children. Note that the deceased father is a Class II heir, not Class I.",
  },
  {
    relation: "Sons (Each Surviving Son)",
    share: "Takes 1 full primary share each",
    legalBasis: "Section 10, Rule 2",
    plainNotes:
      "Each biological or legally adopted son receives an identical undivided fractional share of the deceased father's property.",
  },
  {
    relation: "Daughters (Married or Unmarried)",
    share: "Takes 1 full primary share each",
    legalBasis: "HSA 2005 & Vineeta Sharma (SC 2020)",
    plainNotes:
      "Daughters have identical inheritance rights as sons from birth, regardless of marriage date or whether father passed away before 2005.",
  },
  {
    relation: "Children & Widow of Predeceased Son",
    share: "Takes branch share collectively (Per Stirpes)",
    legalBasis: "Section 10, Rule 3 & 4",
    plainNotes:
      "If a son died before the father, his surviving widow and children equally divide the one share he would have received if alive.",
  },
  {
    relation: "Children of Predeceased Daughter",
    share: "Takes branch share collectively (Per Stirpes)",
    legalBasis: "Section 10, Rule 3 & 4",
    plainNotes:
      "If a daughter died before the father, her surviving children equally divide the one share their mother would have inherited.",
  },
];

const ROADMAP_STEPS = [
  {
    number: "01",
    phase: "Phase 1: Death Registration",
    title: "Obtain the Official Death Certificate",
    timeline: "Within 21 Days of Death",
    authority: "Municipal Corporation / Registrar of Births & Deaths",
    description:
      "Under the Registration of Births and Deaths Act, 1969, report the demise within 21 days to the local civic body. Collect at least 10 to 15 original attested physical copies. Every revenue office, sub-registrar, utility provider, and society will demand an original or verified certified copy.",
    checklist: [
      "Hospital death summary or crematorium / burial receipt",
      "Deceased person's original Aadhaar card and voter ID",
      "Applicant family member's photo ID and relationship proof",
      "Form 2 application for death registration",
    ],
  },
  {
    number: "02",
    phase: "Phase 2: Heirship Verification",
    title: "Secure a Legal Heir Certificate",
    timeline: "15 to 45 Days",
    authority: "Tehsildar / Talukdar / Revenue SDM Office",
    description:
      "Apply for a Legal Heir Certificate (also called Surviving Member Certificate or Varisu Certificate). The local revenue inspector or Patwari conducts physical field verification at your residence to verify all surviving Class I legal heirs. Note: Section 370 of the Indian Succession Act bars civil courts from issuing a succession certificate for real estate.",
    checklist: [
      "Original Death Certificate",
      "Family pedigree affidavit on ₹100 stamp paper",
      "Ration card, family register extract, or voter list proving family tree",
      "Aadhaar cards of all surviving children, mother, and spouse",
    ],
  },
  {
    number: "03",
    phase: "Phase 3: Family Settlement",
    title: "Execute Relinquishment or Partition Deed",
    timeline: "1 to 2 Weeks",
    authority: "Sub-Registrar of Assurances (SRO)",
    description:
      "When multiple heirs inherit undivided shares, they hold the property as tenants-in-common. If siblings agree that the surviving mother or one brother will retain sole ownership, all other heirs must execute a registered Relinquishment Deed (Release Deed). Plain-paper affidavits or non-registered NOCs have zero legal validity under Section 17 of the Registration Act, 1908.",
    checklist: [
      "Draft Relinquishment Deed or Family Settlement Agreement",
      "Title deeds / original sale deed of the deceased father",
      "Legal Heir Certificate confirming all co-sharers",
      "Payment of state stamp duty and registration fees",
      "Two independent adult witnesses with government photo IDs",
    ],
  },
  {
    number: "04",
    phase: "Phase 4: Revenue & Civic Mutation",
    title: "Apply for Municipal Property Mutation",
    timeline: "30 to 60 Days",
    authority: "Local Municipal Corporation / Revenue Tehsildar",
    description:
      "Mutation (known as Dakhil Kharij, Namantaran, or Khata / Patta Transfer) records the new owners in municipal and land revenue records. While mutation does not create legal title (as ruled in Sawarni v. Inder Kaur), it is mandatory to assess property tax in your name, receive water bills, and prevent fraudulent secondary sales.",
    checklist: [
      "Mutation application in prescribed municipal form",
      "Certified copy of registered Relinquishment Deed or Title Deed",
      "Original Death Certificate and Legal Heir Certificate",
      "Latest paid property tax receipt and no-dues certificate",
      "Indemnity bond and public notice fee (if mandated by civic body)",
    ],
  },
  {
    number: "05",
    phase: "Phase 5: Utility & Society Updates",
    title: "Transfer Utility Meters & Housing Society Shares",
    timeline: "15 to 30 Days",
    authority: "Discom / Jal Board / RWA / Cooperative Housing Society",
    description:
      "Update utility and administrative records to reflect the new owner's name. In apartment societies (CHSs), submit the updated mutation order and registered deed to the society management to transfer the share certificate and membership register.",
    checklist: [
      "Updated property tax bill / Khata certificate in new owner's name",
      "Application to electricity board (Discom) with security deposit transfer",
      "Application to water supply department for meter transfer",
      "Cooperative housing society transfer form with nominal transfer fee",
    ],
  },
];

const COMPARISON_ROWS = [
  {
    parameter: "Process Timeline",
    withWill: "30 to 60 days (or 4-6 months if probate required in metro cities)",
    withoutWill: "6 to 18 months across multiple government offices and registrars",
    winner: "Transfer With a Will (Much Faster)",
  },
  {
    parameter: "Financial Cost & Fees",
    withWill: "Nominal Will drafting cost; standard municipal mutation fee (₹500 to ₹2,500)",
    withoutWill: "Heavy costs: Relinquishment deed stamp duty (0.5% to 5%), lawyer fees, court litigation",
    winner: "Transfer With a Will (Massive Savings)",
  },
  {
    parameter: "Family Dispute Probability",
    withWill: "Very low; deceased father's clear legal testamentary intent is recorded",
    withoutWill: "Extremely high; every single child has an undivided share; any heir can block transfer",
    winner: "Transfer With a Will (Zero Gridlock)",
  },
  {
    parameter: "Government Document Burden",
    withWill: "Original Will, Death Certificate, and standard mutation application",
    withoutWill: "Death cert, Legal Heir Cert, Pedigree affidavits, Registered Release deeds, Public notices",
    winner: "Transfer With a Will (Minimal Paperwork)",
  },
  {
    parameter: "Distribution Control",
    withWill: "100% control; father chooses who gets which property or floor",
    withoutWill: "Zero control; rigid statutory formula divides property equally among all Class I heirs",
    winner: "Transfer With a Will (Complete Freedom)",
  },
  {
    parameter: "Sub-Registrar Visits",
    withWill: "Zero mandatory visits if executing standard municipal mutation on original Will",
    withoutWill: "All heirs and two witnesses must physically visit SRO for Relinquishment Deed registration",
    winner: "Transfer With a Will (No SRO Hassle)",
  },
  {
    parameter: "Risk of Civil Partition Suit",
    withWill: "Minimal (unless someone challenges the Will on narrow testamentary grounds)",
    withoutWill: "Very high; any disgruntled heir or spouse can file a civil partition suit freezing the asset",
    winner: "Transfer With a Will (Prevents Court Freeze)",
  },
];

const DOCUMENT_CHECKLIST_ITEMS = [
  {
    id: "doc-1",
    name: "Death Certificate (Original & Certified Copies)",
    authority: "Municipal Corporation / Registrar of Births and Deaths",
    purpose: "Conclusive proof of demise required for every succession stage",
  },
  {
    id: "doc-2",
    name: "Legal Heir Certificate / Surviving Member Certificate",
    authority: "Tehsildar / Talukdar / Revenue SDM Office",
    purpose: "Establishes all surviving Class I legal heirs after field inquiry",
  },
  {
    id: "doc-3",
    name: "Original Title Deed / Sale Deed / Conveyance Deed",
    authority: "Sub-Registrar Office (or bank if mortgaged)",
    purpose: "Proves that the deceased father held undisputed legal title",
  },
  {
    id: "doc-4",
    name: "Prior Title Chain Documents (Past 30 Years)",
    authority: "Previous property owners or Sub-Registrar records",
    purpose: "Establishes unbroken title chain for clear marketability",
  },
  {
    id: "doc-5",
    name: "Latest Paid Property Tax Receipts & No-Dues Certificate",
    authority: "Local Municipal Corporation / Nagar Nigam",
    purpose: "Confirms property has zero outstanding municipal tax arrears",
  },
  {
    id: "doc-6",
    name: "Encumbrance Certificate (Form 15 / Form 16)",
    authority: "Sub-Registrar Office / State Land Portal",
    purpose: "Certifies that the property is free from mortgages, liens, or court attachments",
  },
  {
    id: "doc-7",
    name: "Registered Relinquishment / Release Deed (If applicable)",
    authority: "Sub-Registrar Office",
    purpose: "Mandatory when co-heirs surrender their shares to mother or sibling",
  },
  {
    id: "doc-8",
    name: "Family Pedigree Affidavit (Vamshavruksha / Shajra)",
    authority: "Executive Magistrate / Notary Public",
    purpose: "Sworn legal declaration listing the complete family tree",
  },
  {
    id: "doc-9",
    name: "Aadhaar, PAN & Voter ID Cards of All Legal Heirs",
    authority: "UIDAI / Income Tax Department / ECI",
    purpose: "Identity and signature verification of all surviving co-sharers",
  },
  {
    id: "doc-10",
    name: "NOC or Share Certificate from Housing Society / RWA",
    authority: "Cooperative Housing Society / Apartment Owners Association",
    purpose: "Required for transfer of apartment membership and flat allocation",
  },
  {
    id: "doc-11",
    name: "Indemnity Bond on Stamp Paper",
    authority: "Drafted by Advocate / Executed before Notary",
    purpose: "Indemnifies municipal corporation against third-party future claims",
  },
  {
    id: "doc-12",
    name: "Special Power of Attorney (For NRI / Outstation Heirs)",
    authority: "Apostilled by Foreign Ministry / Indian Embassy abroad",
    purpose: "Empowers an in-country representative to sign SRO and municipal papers",
  },
];

const FAQ_ITEMS = [
  {
    question: "What happens to a father's property if he dies without a will in India?",
    answer:
      "Under Section 8 of the Hindu Succession Act, 1956, when a male Hindu dies intestate (without a will), his entire estate devolves equally among his Class I legal heirs simultaneously. These include his surviving widow, mother, sons, and daughters. Each gets an undivided equal share as tenants-in-common.",
  },
  {
    question: "Do married daughters have equal inheritance rights in their father's property?",
    answer:
      "Yes. Following the landmark 2005 Amendment to the Hindu Succession Act and the Supreme Court's Vineeta Sharma (2020) ruling, daughters possess identical coparcenary and inheritance rights as sons from birth, irrespective of their marital status or whether the father was alive when the amendment took effect.",
  },
  {
    question: "Can a mother transfer the entire property to one son without the other children's consent?",
    answer:
      "No. If the property was owned solely by the deceased father, the mother inherits only her individual fractional share (e.g. 1/3 if there are two children). She cannot legally sell, gift, or transfer the shares belonging to the other children without their executed and registered relinquishment deeds.",
  },
  {
    question: "Is a succession certificate required to transfer real estate or houses in India?",
    answer:
      "No. Under Section 370 of the Indian Succession Act, 1925, a succession certificate can only be granted for movable debts and securities (like bank accounts and shares). Immovable property transfer requires a Legal Heir Certificate, registered release/settlement deeds, and municipal mutation.",
  },
  {
    question: "Does property mutation (Dakhil Kharij) grant legal title and ownership?",
    answer:
      "No. The Supreme Court of India in landmark rulings (including Sawarni v. Inder Kaur and Jitendra Singh v. State of MP) has settled that mutation entries in municipal or revenue records exist strictly for fiscal tax collection and do not confer, extinguish, or create proprietary title to immovable property.",
  },
  {
    question: "Can one legal heir sell their share of inherited property to an outsider?",
    answer:
      "While an heir technically owns an undivided share, Section 22 of the Hindu Succession Act and Section 44 of the Transfer of Property Act give co-heirs a preferential right of pre-emption. Furthermore, an outside purchaser cannot force joint physical possession of a family dwelling without filing a civil partition suit.",
  },
  {
    question: "How can an NRI legal heir relinquish or transfer their share from abroad?",
    answer:
      "An NRI co-heir can execute a Special Power of Attorney (POA) or Relinquishment Deed in their country of residence. The document must be notarized and apostilled (or authenticated by the Indian Embassy/Consulate), sent to India, stamped with state duty within 90 days, and registered under the Registration Act.",
  },
  {
    question: "Can a plain affidavit or unregistered NOC transfer property rights after death?",
    answer:
      "No. Under Section 17(1)(b) and Section 49 of the Registration Act, 1908, any instrument that relinquishes or transfers an interest in immovable property valued over 100 rupees must be compulsorily registered at the Sub-Registrar Office. Plain paper affidavits and NOCs have zero legal validity to extinguish title.",
  },
  {
    question: "What should family members do if one legal heir refuses to sign mutation papers?",
    answer:
      "If a co-heir refuses mutual cooperation or disputes shares, municipal authorities will refuse consensus mutation. The only legal remedy is for the consenting heirs to file a Civil Suit for Partition in the competent civil court to obtain a preliminary and final partition decree specifying separate metes and bounds.",
  },
];

export default function PropertyTransferAfterDeathClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
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

  const toggleDocCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleCopyChecklist = () => {
    const textToCopy = DOCUMENT_CHECKLIST_ITEMS.map(
      (item, idx) => `${idx + 1}. ${item.name} (${item.authority}) - ${item.purpose}`
    ).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Home className="w-4 h-4 text-[#C65378]" />
            <span>INTESTATE SUCCESSION &bull; PROPERTY MUTATION ROADMAP</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Transferring Property After Death Without a Will in India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            A comprehensive, plain-language guide for grieving families. Learn how Hindu Succession Act Section 8 works, how to navigate mutation and relinquishment deeds, and how to avoid costly family disputes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Will to Protect Your Family</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#five-step-roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View 5-Step Mutation Roadmap</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Legal Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Property Succession Law
              </span>
            </div>

            {/* Stat 2: Wills & Estate Plans */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estates Protected
              </span>
            </div>

            {/* Stat 3: Value Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Real Estate Assets Secured
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">
                  1,300+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#55636D] font-semibold">
                  Verified Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  TABLE OF CONTENTS
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Statutory Compliance Badge in Sidebar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Section 8 of the Hindu Succession Act, 1956, Section 17 of the Registration Act, 1908 & Section 370 of the Indian Succession Act, 1925.
              </p>
            </div>

            {/* Quick Helpline Support */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold mb-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                <span>Need Property Lawyers?</span>
              </div>
              <p className="text-emerald-900/80 text-[11px] leading-relaxed mb-2.5">
                Our advocates assist with Legal Heir Certificates, Relinquishment Deeds, and municipal mutation.
              </p>
              <Link
                href="/services/succession-certificate"
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>Succession Services &rarr;</span>
              </Link>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE SUMMARY: 4 GOLDEN RULES OF INTESTATE PROPERTY SUCCESSION
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 mb-3">
                What You Must Know Before Applying for Property Transfer
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Equal Fractional Rights:</strong> Under Section 8 of the Hindu Succession Act, the deceased father&apos;s widow, mother, sons, and daughters inherit equal undivided shares. No single child can claim the entire property automatically.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Married Daughters Have Equal Shares:</strong> As reaffirmed by the Supreme Court in <em>Vineeta Sharma (2020)</em>, married daughters hold identical coparcenary and inheritance rights as sons from birth.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Mutation Does NOT Equal Ownership:</strong> Supreme Court rulings establish that municipal mutation (<em>Dakhil Kharij</em>) only transfers tax liability. Proprietary title requires registered settlement or succession documents.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Plain NOCs Are Legally Void:</strong> To transfer a share from siblings to the mother, a registered Relinquishment Deed under Section 17 of the Registration Act is mandatory. A plain paper affidavit cannot extinguish ownership.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>INTESTATE SUCCESSION BASICS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                1. Understanding Intestate Property Transfer in India
              </h2>
              <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  When a property owner passes away without leaving a valid Last Will and Testament, legal experts describe the situation as dying <strong>intestate</strong>. In the absence of written instructions from the deceased, private preferences cease to apply, and the distribution of immovable assets (such as residential houses, apartments, commercial shops, and agricultural land) is governed strictly by statutory personal inheritance laws.
                </p>
                <p>
                  For Hindus, Buddhists, Jains, and Sikhs, intestate succession is controlled by the <strong>Hindu Succession Act, 1956</strong> (amended significantly in 2005). For Muslims, succession follows Islamic Personal Law (Shariat). For Christians, Parsis, and Jews, property transmission is governed by Part V of the <strong>Indian Succession Act, 1925</strong>.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                  <strong>The Critical Common Mistake:</strong> Many families assume that a surviving spouse (mother) automatically becomes the sole owner of her late husband&apos;s self-acquired house. Under Indian law, this is completely untrue. The surviving wife, surviving mother, and all surviving children immediately become joint co-owners (tenants-in-common), each holding an undivided fractional percentage of the real estate.
                </div>
              </div>
            </section>

            {/* SECTION 2: WHO INHERITS SECTION 8 */}
            <section id="who-inherits-hsa" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>CLASS I LEGAL HEIRS MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                2. Who Inherits: Hindu Succession Act Section 8 Rules
              </h2>
              <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Section 8 of the Hindu Succession Act, 1956 lays down a strict priority order for who inherits a deceased male&apos;s property. The law groups relatives into four distinct tiers:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-sm">
                  <li><strong>Class I Heirs:</strong> Immediate family (widow, mother, sons, daughters, and deceased children&apos;s heirs). They inherit simultaneously to the total exclusion of all other relatives.</li>
                  <li><strong>Class II Heirs:</strong> Father, brothers, sisters, nephews, nieces, and grandparents. They inherit only if zero Class I heirs are alive.</li>
                  <li><strong>Agnates:</strong> Relatives related wholly through male lineage (if no Class II heirs exist).</li>
                  <li><strong>Cognates:</strong> Relatives related through female lineage (if no agnates exist).</li>
                </ol>

                {/* Class 1 Heirs Table */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <div className="bg-slate-900 px-5 py-3 text-white">
                    <h3 className="font-bold text-sm tracking-wide">
                      Class I Legal Heirs: Statutory Share Entitlement
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <tr>
                          <th className="p-3.5">Legal Heir Category</th>
                          <th className="p-3.5">Statutory Share</th>
                          <th className="p-3.5">Governing Rule</th>
                          <th className="p-3.5">Practical Legal Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {CLASS_1_HEIRS.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="p-3.5 font-bold text-slate-900">{row.relation}</td>
                            <td className="p-3.5 font-semibold text-[#C65378]">{row.share}</td>
                            <td className="p-3.5 text-slate-500 font-mono text-xs">{row.legalBasis}</td>
                            <td className="p-3.5 text-slate-600 leading-snug">{row.plainNotes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example Calculation Box */}
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-300/80 text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#C65378]" />
                    <span>Real-Life Share Calculation Example:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Suppose Mr. Sharma dies leaving a self-acquired house in Delhi. He is survived by his <strong>wife, his elderly mother, two sons, and one married daughter</strong>. Under Section 10 rules:
                  </p>
                  <p className="text-slate-800 font-semibold bg-white p-2.5 rounded-lg border border-slate-200">
                    Total primary Class I heirs = 5 (Wife + Mother + Son 1 + Son 2 + Daughter). Each person receives an equal undivided <strong>1/5th share (20%)</strong> of the property. The house cannot be sold or rebuilt without the written, registered consent of all five individuals.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPLETE 5-STEP ROADMAP */}
            <section id="five-step-roadmap" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STEP-BY-STEP PROCEDURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                3. Complete 5-Step Property Transfer Roadmap
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Transferring real estate when there is no Will requires completing five chronological phases across civic, revenue, and registration authorities. Skipping any step creates defective title that prevents bank loans and future sales.
              </p>

              <div className="space-y-4">
                {ROADMAP_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-xs flex items-center justify-center">
                          {step.number}
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider block">
                            {step.phase}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#5F7E75]" />
                          {step.timeline}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>Competent Authority: <strong>{step.authority}</strong></span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="text-xs font-bold text-slate-800 mb-1.5">
                        Key Requirements & Documents:
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {step.checklist.map((c, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: TITLE VS MUTATION */}
            <section id="title-vs-mutation" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRINCIPLES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                4. Title Ownership vs Municipal Property Mutation
              </h2>
              <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  One of the most dangerous misconceptions in Indian real estate is treating a <strong>mutation entry (Dakhil Kharij / Khata / Patta)</strong> as proof of property ownership. Thousands of families assume that because their name appears on the municipal property tax receipt or electricity bill, they hold unshakeable legal title.
                </p>
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2 text-xs sm:text-sm text-rose-950">
                  <div className="font-bold flex items-center gap-1.5 text-rose-900 text-sm">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    <span>The Supreme Court Rule: Mutation Does NOT Confer Title</span>
                  </div>
                  <p className="leading-relaxed">
                    In a long line of consistent judgments—most notably <em>Sawarni v. Inder Kaur (1996) 6 SCC 223</em>, <em>Bhimabai Mahadeo Kambekar v. Arthur Import &amp; Export Co. (2019) 3 SCC 191</em>, and <em>Jitendra Singh v. State of Madhya Pradesh (2021) SCC OnLine SC 802</em>—the Supreme Court of India ruled:
                  </p>
                  <blockquote className="border-l-4 border-[#C65378] pl-3 py-1 italic bg-white/60 rounded-r text-slate-800 text-xs sm:text-sm">
                    &ldquo;Mutation of property in revenue or municipal records neither creates nor extinguishes title to the property, nor has it any presumptive value on title. Such an entry is made purely for fiscal purposes to collect property land revenue and municipal taxes.&rdquo;
                  </blockquote>
                </div>
                <p>
                  What does this mean for your family? Even if a revenue official mistakenly mutates the entire house in one brother&apos;s name, the other siblings remain lawful co-owners by virtue of Section 8 of the Hindu Succession Act. They can challenge the mutation at any point in civil court and demand their statutory 1/nth share. To ensure clear, unassailable title, heirs must execute and register formal conveyance or relinquishment documents.
                </p>
              </div>
            </section>

            {/* SECTION 5: ESSENTIAL DOCUMENTS CHECKLIST */}
            <section id="document-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COMPREHENSIVE DOSSIER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                5. Essential Documents Checklist for Property Transfer
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Before submitting applications to the Sub-Registrar Office or Municipal Corporation, assemble this 12-point document pack. Use the interactive checkboxes below to track your readiness.
              </p>

              {/* Progress and Copy Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-semibold text-slate-700">
                  Document Progress: <span className="font-extrabold text-[#C65378]">{checkedCount}</span> of {DOCUMENT_CHECKLIST_ITEMS.length} ready
                </div>
                <button
                  onClick={handleCopyChecklist}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Checklist!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Document Checklist</span>
                    </>
                  )}
                </button>
              </div>

              {/* Checklist Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <div className="divide-y divide-slate-100">
                  {DOCUMENT_CHECKLIST_ITEMS.map((item) => {
                    const isChecked = !!checkedDocs[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleDocCheck(item.id)}
                        className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                          isChecked ? "bg-emerald-50/50" : "hover:bg-slate-50/80"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-1">
                            <span
                              className={`text-xs sm:text-sm font-bold ${
                                isChecked ? "text-emerald-950 line-through" : "text-slate-900"
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="text-[10px] sm:text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {item.authority}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">
                            {item.purpose}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT & IMAGE SHOWCASE */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4" />
                <span>VISUAL ROADMAP & SUCCESSION OVERVIEW</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                6. Step-by-Step Visual Roadmap: Death to Mutation
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The visual guide below illustrates the transition from original property ownership under the deceased father to legal mutation among surviving heirs under the Hindu Succession Act.
              </p>

              {/* Uploaded Image Component */}
              <div className="rounded-2xl border border-[#172228]/10 bg-white p-4 sm:p-6 shadow-xs overflow-hidden">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#172228]/10 bg-[#FAF7F0] shadow-inner">
                  <Image
                    src="/images/property-transfer-after-death-without-will-india.jpg"
                    alt="Property Transfer After Death of Father Without Will in India Step-by-Step Guide"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#55636D]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>
                      Figure 1.0: Real estate succession workflow, Property Title Deed verification, and statutory legal heir rights under Indian property law.
                    </span>
                  </div>
                  <a
                    href="/images/property-transfer-after-death-without-will-india.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>View High-Resolution Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: WILL VS WITHOUT WILL COMPARISON */}
            <section id="will-vs-intestate" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Split className="w-4 h-4" />
                <span>ESTATE PLANNING COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                7. Transfer With a Will vs Transfer Without a Will
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When a family member dies with a Will, property transfer is an orderly administrative task. Without a Will, it often turns into a multi-year ordeal involving Sub-Registrar queues, legal notices, and family friction.
              </p>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <div className="bg-slate-900 px-5 py-3 text-white flex items-center justify-between">
                  <h3 className="font-bold text-sm tracking-wide">
                    Head-to-Head Comparison: With Will vs Without Will
                  </h3>
                  <span className="text-[11px] font-semibold text-rose-300">
                    Screaming Frog Audit Compliant
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="p-3.5 w-1/4">Evaluation Metric</th>
                        <th className="p-3.5 w-3/8 text-emerald-800 bg-emerald-50/40">
                          With a Registered / Valid Will
                        </th>
                        <th className="p-3.5 w-3/8 text-rose-800 bg-rose-50/40">
                          Without a Will (Intestate)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {COMPARISON_ROWS.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900">
                            <div>{row.parameter}</div>
                            <span className="text-[10px] font-extrabold text-[#5F7E75] uppercase tracking-wider">
                              {row.winner}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-700 leading-relaxed bg-emerald-50/20 font-medium">
                            {row.withWill}
                          </td>
                          <td className="p-3.5 text-slate-700 leading-relaxed bg-rose-50/20 font-medium">
                            {row.withoutWill}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 8: RELINQUISHMENT DEED & CONSOLIDATION */}
            <section id="relinquishment-deed" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scroll className="w-4 h-4" />
                <span>LEGAL TRANSFER INSTRUMENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                8. Relinquishment Deed: Giving Up or Consolidating Shares
              </h2>
              <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  In the vast majority of Indian households, when the father passes away, the sons and daughters agree that the mother should remain the sole owner of the family home during her lifetime. How can this be legally achieved?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                      <FileCheck className="w-4 h-4 text-[#5F7E75]" />
                      <span>Relinquishment Deed (Release Deed)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Used when a co-heir gives up their undivided share <strong>strictly in favor of another legal co-heir</strong> (such as the mother or a brother). Governed by Section 17 of the Registration Act, 1908. Most states offer concessional stamp duty for release deeds executed among Class I blood relatives (e.g., ₹1,000 in Delhi or 200 in Maharashtra).
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/templates/release-deed-format"
                        className="text-xs font-bold text-[#C65378] hover:underline flex items-center gap-1"
                      >
                        <span>Download Relinquishment Deed Format &rarr;</span>
                      </Link>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                      <Split className="w-4 h-4 text-[#C65378]" />
                      <span>Partition Deed vs Gift Deed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If the heirs want to divide the physical property (e.g. Son 1 takes the Ground Floor, Son 2 takes the First Floor), a <strong>Partition Deed</strong> must be executed, demarcating specific metes and bounds. A <strong>Gift Deed</strong> cannot be used by one co-heir to release an undivided ancestral share to another co-heir without triggering standard gift tax implications.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/blogs/legal-heir-certificate-vs-succession-certificate"
                        className="text-xs font-bold text-[#C65378] hover:underline flex items-center gap-1"
                      >
                        <span>Legal Heir vs Succession Certificate &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs sm:text-sm space-y-1.5">
                  <div className="font-bold text-red-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                    <span>Statutory Warning: Beware of Unregistered Affidavits</span>
                  </div>
                  <p className="leading-relaxed">
                    Under Section 49 of the Registration Act, 1908, an unregistered document purporting to extinguish an interest in real estate has no legal effect. Many families sign a ₹10 stamp paper affidavit or &ldquo;No Objection Certificate&rdquo; (NOC) and submit it to the municipality. While a corrupt clerk might process mutation, that affidavit has <strong>zero legal standing</strong>. Ten years later, any child can approach a civil court, declare the NOC null and void, and reclaim their share. Always register the deed at the Sub-Registrar Office.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: COMPLEX SCENARIOS */}
            <section id="complex-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>PRACTICAL OBSTACLES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                9. Handling Complex Scenarios: Disputes, NRIs & Minors
              </h2>
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {/* Scenario 1: Disputes */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#C65378]" />
                    <span>1. When Legal Heirs Disagree or Refuse to Sign</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Municipal mutation offices only process transfers on unanimous consent. If one brother or daughter refuses to execute a relinquishment deed or claims an unfair share, municipal mutation will be stayed. The consenting heirs have only one statutory remedy: filing a <strong>Civil Suit for Partition</strong> under Section 26 and Order VII of the Code of Civil Procedure (CPC). The court will issue a preliminary decree determining shares, appoint a Court Commissioner to assess physical division, and order an auction sale under the Partition Act, 1893 if division is impossible.
                  </p>
                </div>

                {/* Scenario 2: NRIs */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#5F7E75]" />
                    <span>2. NRI Legal Heirs Living Abroad</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If an NRI son or daughter cannot fly to India for Sub-Registrar registration, they can execute a <strong>Special Power of Attorney (POA)</strong> or Relinquishment Deed in their country of residence. The document must be executed before a local Notary Public and apostilled under the Hague Convention (in countries like the USA, UK, Canada, Australia) or authenticated by the Indian Embassy / Consulate. Once sent to India, the POA must be adjudicated and stamped with state stamp duty within 90 days under Section 18 of the Indian Stamp Act, 1899.
                  </p>
                </div>

                {/* Scenario 3: Minor Heirs */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-600" />
                    <span>3. Minor Legal Heirs</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If one of the deceased father&apos;s children is a minor (under 18 years), their surviving mother acts as the natural guardian under the Hindu Minority and Guardianship Act, 1956. However, under <strong>Section 8 of that Act</strong>, a natural guardian cannot sell, mortgage, gift, or relinquish the minor&apos;s undivided share in immovable property without obtaining prior permission from the District Civil Court. Any unauthorized relinquishment is voidable at the minor&apos;s option upon turning 18.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: HOW A WILL WOULD HAVE AVOIDED THIS (CONVERSION BRIDGE) */}
            <section id="avoid-with-a-will" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>PREVENTIVE ESTATE PLANNING</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                10. How Writing a Will Eliminates Succession Hardships
              </h2>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#172228] text-white shadow-xl space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5" />
                    The Power of Testamentary Succession
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    Don&apos;t Leave Your Family with Court Visits and Bureaucratic Deadlocks
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Every single headache described on this page—gathering pedigree proofs, negotiating with reluctant siblings, paying stamp duty on release deeds, and navigating civic mutation delays—stems from a single oversight: <strong>not drafting a simple Last Will</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Instant Clarity for Heirs</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      A Will specifies exactly who gets which floor, house, or savings. Zero ambiguity, zero scope for disputes among siblings.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Save Thousands in Stamp Duty</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Property transferring under a Will does not require siblings to execute expensive registered relinquishment deeds at the SRO.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Protect Surviving Spouse</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      You can bequeath absolute ownership or life-interest solely to your spouse, ensuring children cannot force a premature sale.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Complete in 15 Minutes Online</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Using our guided wizard, you can draft a legally binding, advocate-approved Will on plain paper from the comfort of your home.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                  >
                    <span>Start Your Will Online Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/tools/succession-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all text-xs sm:text-sm"
                  >
                    <span>Use Succession Calculator</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 11: PROFESSIONAL LEGAL SERVICES */}
            <section id="legal-services" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>ASSISTANCE FROM WillDrafting.in</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                11. Professional Legal Support from WillDrafting.in
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If your family is currently dealing with the aftermath of an intestate demise, navigating municipal offices and drafting registered deeds can feel overwhelming. The experienced property advocates at WillDrafting.in provide end-to-end representation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Succession Certificates</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For movable estate assets including bank accounts, demat portfolios, and mutual funds under Section 370 of ISA 1925.
                    </p>
                  </div>
                  <Link
                    href="/services/succession-certificate"
                    className="text-xs font-bold text-[#C65378] hover:underline flex items-center gap-1"
                  >
                    <span>Succession Lawyers &rarr;</span>
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      <Gavel className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Probate & Letters of Admin</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      High Court and District Court petitions for grant of Probate or Letters of Administration across India.
                    </p>
                  </div>
                  <Link
                    href="/services/probate-lawyer"
                    className="text-xs font-bold text-[#C65378] hover:underline flex items-center gap-1"
                  >
                    <span>Probate Advocates &rarr;</span>
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                      <Scroll className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Relinquishment & Mutation</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Custom drafting of registered Release Deeds, SRO appointment assistance, and municipal Dakhil Kharij liaison.
                    </p>
                  </div>
                  <Link
                    href="/templates/release-deed-format"
                    className="text-xs font-bold text-[#C65378] hover:underline flex items-center gap-1"
                  >
                    <span>Release Deed Guidance &rarr;</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>COMMONLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                12. Frequently Asked Questions on Property Succession
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Clear, straightforward answers to the practical legal questions families encounter when transferring property after death without a Will.
              </p>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer"
                      >
                        <span className="leading-snug">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL STATUTES & CITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                13. Relevant Laws, Statutory Sections & Court Rulings
              </h2>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3">
                <p>
                  This guide is authored in strict conformity with applicable Central legislation and binding jurisprudence of the Supreme Court of India:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-slate-600 text-xs">
                  <li>
                    <strong>Hindu Succession Act, 1956 (Act No. 30 of 1956):</strong> Section 6 (equal coparcenary rights for daughters), Section 8 (general rules of intestate succession for males), Section 9 (order of succession among Class I heirs), Section 10 (distribution rules among heirs in Class I).
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925 (Act No. 39 of 1925):</strong> Section 211 (character of executor and administrator), Part X Section 370 (statutory bar against granting succession certificates for immovable property).
                  </li>
                  <li>
                    <strong>Registration Act, 1908 (Act No. 16 of 1908):</strong> Section 17(1)(b) (compulsory registration of non-testamentary instruments transferring rights in immovable property), Section 49 (effects of non-registration of compulsory documents).
                  </li>
                  <li>
                    <strong>Hindu Minority and Guardianship Act, 1956:</strong> Section 8 (prohibiting natural guardians from selling, mortgaging, or relinquishing a minor&apos;s immovable property share without prior permission from the District Court).
                  </li>
                  <li>
                    <strong>Landmark Supreme Court Rulings:</strong> <em>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</em> (retroactive coparcenary rights for daughters); <em>Sawarni v. Inder Kaur (1996) 6 SCC 223</em> (mutation does not create or extinguish proprietary title); <em>Jitendra Singh v. State of MP (2021)</em> (reaffirming mutation is purely for revenue tax collection).
                  </li>
                </ul>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author Bio & Emergency CTAs)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Advocate Anuj Anand Malik
                    </a>
                  </div>
                  <div className="text-[11px] font-semibold text-[#C65378]">
                    Senior Estate &amp; Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled advocate with 18+ years of expertise in testamentary litigation, intestate estate disputes, and high-value property partitions at WillDrafting.in.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>Verified Legal Review</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C65378] hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: ACTION CTA CARD (Berry Rose / Navy) */}
            <div className="hidden lg:block bg-[#172228] rounded-3xl p-6 text-white text-center shadow-lg shadow-slate-900/10 space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>PROTECT YOUR FAMILY</span>
              </div>
              <h3 className="text-lg font-bold leading-snug">
                Avoid Intestate Nightmares for Your Family
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Don&apos;t leave your heirs to face bureaucratic delays and property litigation. Create an advocate-approved, court-ready Will in 15 minutes.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>Draft Your Will Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>Call our property advocates</span>
              </div>
            </div>

            {/* CARD 3: TRUST / BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Key Succession Rules at a Glance
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 8 HSA Governs:</strong> Equal division among Class I heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Married Daughters Included:</strong> Equal rights since 2005.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mutation &ne; Ownership:</strong> Mutation is for tax only.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registered Release Required:</strong> Stamp paper affidavits are void.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED TEMPLATES & GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Related Free Resources
              </h4>
              <div className="space-y-2">
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Legal Heir vs Succession Certificate</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Which document do you need for which asset? &rarr;
                  </div>
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Relinquishment Deed Format</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Free registered release deed template &rarr;
                  </div>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Calculate legal heir fractional shares &rarr;
                  </div>
                </Link>
                <Link
                  href="/services/succession-certificate"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Certificate Service</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Civil court representation by WillDrafting.in advocates &rarr;
                  </div>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Legal Heir vs Succession Certificate
                </Link>
                <Link
                  href="/services/succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Certificate Lawyers
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Relinquishment Deed Format
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
