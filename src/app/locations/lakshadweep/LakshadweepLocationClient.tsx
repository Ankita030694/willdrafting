"use client";

import React, { useState, useEffect } from "react";
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
  Award,
  Scale,
  Building,
  Sparkles,
  HelpCircle,
  FileCheck,
  Check,
  Landmark,
  Home,
  MapPin,
  Search,
  FileQuestion,
  Stamp,
  Palmtree,
  Waves,
  Compass,
  Ship,
  Anchor,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "lakshadweep-overview", label: "OVERVIEW" },
  { id: "lakshadweep-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "lakshadweep-probate-rules", label: "PROBATE RULES" },
  { id: "lakshadweep-sro-directory", label: "SRO DIRECTORY" },
  { id: "lakshadweep-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-lakshadweep-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "lakshadweep-property-types", label: "PROPERTY TYPES" },
  { id: "lakshadweep-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const LAKSHADWEEP_SRO_HUBS = [
  {
    id: "kavaratti-hub",
    name: "Kavaratti Central SRO (Capital Complex)",
    sro: "Office of the Sub-Registrar, Kavaratti",
    address: "District Collectorate & Planning Complex, Kavaratti Island, Lakshadweep - 682555",
    areas: "Kavaratti Island, Secretariat Enclave, South Beach, Jetty Zone, Ujra Mosque Quarters, Dweep Panchayat Ward",
    timings: "9:00 AM to 5:30 PM (Mon-Fri, Closed on 2nd & 4th Sat and National Holidays)",
  },
  {
    id: "agatti-hub",
    name: "Agatti Island Registry Desk",
    sro: "Sub-Divisional Office & Registry, Agatti",
    address: "Sub-Divisional Magistrate Complex, Agatti Island, Lakshadweep - 682553",
    areas: "Agatti Island, Airport Corridor, Lagoon Beach Belt, Eastern Jetty, Agatti North & South Wards",
    timings: "9:00 AM to 5:30 PM (Mon-Fri, SDO Delegated Registry Days)",
  },
  {
    id: "amini-hub",
    name: "Amini Judicial & Registry Center",
    sro: "Office of the Additional Sub-Registrar / SDO Amini",
    address: "Court Complex & Administrative Enclave, Amini Island, Lakshadweep - 682552",
    areas: "Amini Island, Court Complex Zone, Sub-Divisional Quarters, Northern Lagoon, Traditional Tarawads",
    timings: "9:00 AM to 5:30 PM (Mon-Fri, Scheduled Registry Days)",
  },
  {
    id: "andrott-hub",
    name: "Andrott Island Sub-Division Registry",
    sro: "Office of the SDO / Additional Sub-Registrar, Andrott",
    address: "Administrative Complex, Near Saint Ubaidullah Shrine, Andrott Island, Lakshadweep - 682551",
    areas: "Andrott Island, Eastern & Western Agricultural Belts, Old Harbor, Lighthouse Zone, Coconut Groves",
    timings: "9:00 AM to 5:30 PM (Mon-Fri)",
  },
  {
    id: "minicoy-hub",
    name: "Minicoy (Maliku) Island Registry",
    sro: "Sub-Divisional Office & Registry Desk, Minicoy",
    address: "SDO Office Complex, Near Minicoy Light House, Minicoy Island, Lakshadweep - 682559",
    areas: "Minicoy Island, 11 Traditional Athiri Villages, Light House Zone, Bada Village, South Lagoon Basin",
    timings: "9:00 AM to 5:30 PM (Mon-Fri)",
  },
  {
    id: "kalpeni-hub",
    name: "Kalpeni & Cheriyam Island Registry",
    sro: "Executive Magistrate & Registry Desk, Kalpeni",
    address: "Administrative Office Complex, Kalpeni Island, Lakshadweep - 682557",
    areas: "Kalpeni Island, Cheriyam Islet, Tilakkam, Lagoon Frontage, Copra Processing Belts",
    timings: "9:00 AM to 5:30 PM (Mon-Fri)",
  },
  {
    id: "kadmat-kiltan-hub",
    name: "Kadmat, Kiltan & Northern Registry",
    sro: "Northern Islands Sub-Divisional Revenue Desk",
    address: "Revenue & Sub-Divisional Administrative Office, Kadmat Island, Lakshadweep - 682556",
    areas: "Kadmat Island, Kiltan Island, Chetlat, Bitra Coral Atoll, Traditional Maritime Holdings",
    timings: "9:00 AM to 5:30 PM (Mon-Fri)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Customary Will Document",
    detail: "Printed on standard white A4 sheets. Under Lakshadweep rules, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity validation, electronic signature, and registry verification at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset or bequest under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Medical Mental Fitness Certificate (MBBS Doctor)",
    detail: "Strongly advised for senior citizens. Issued by an island Medical Officer confirming testamentary mental capacity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Land Revenue Record of Rights / Patta Extract",
    detail: "Ownership extract under the 1965 Land Revenue Regulation verifying Belasha (self-acquired) parcel status.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Village (Dweep) Panchayat Assessment Records",
    detail: "Copy of local island Panchayat house tax receipts or building permit records for residential dwellings.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Tarawad Family Pedigree or Consent Memo (If Applicable)",
    detail: "Documentation confirming distinction from matrilineal Velliazha ancestral properties to avert family litigation.",
    checked: false,
  },
];

export default function LakshadweepLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("lakshadweep-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("kavaratti-hub");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const targets = document.querySelectorAll(".scroll-target");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: 0.05,
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleStartDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
      }
    } else {
      router.push("/start");
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const filteredHubs = LAKSHADWEEP_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    LAKSHADWEEP_SRO_HUBS.find((h) => h.id === selectedHub) || LAKSHADWEEP_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK ARCHITECTURE)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT COLUMN: HERO VALUE PROP & CTAs (7 COLS) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs font-semibold text-rose-200">
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                <span>LAKSHADWEEP &amp; KERALA HIGH COURT JURISDICTION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 45 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Lakshadweep Islands
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your island properties, Belasha self-acquired assets, coconut groves, and residential dwellings. Expert advocate drafting, Marumakkathayam customary compliance, and SRO Kavaratti registration support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Lakshadweep Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#lakshadweep-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>SRO Kavaratti Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kerala HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nominal Lakshadweep SRO Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULL VISIBILITY GUARANTEED ACROSS MOBILE & DESKTOP */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group flex items-center justify-center"
              >
                <Image
                  src="/images/will-drafting-in-lakshadweep.jpg"
                  alt="Legal Will Drafting and Property Succession in Lakshadweep Islands"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Lakshadweep Customary Estate Blueprint
                </span>
                <button
                  onClick={() => setShowHighResModal(true)}
                  className="text-xs text-rose-300 hover:text-white font-bold inline-flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  <span>Enlarge</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY IN-PAGE NAVIGATION (TOC)
          ========================================================================= */}
      <div className="sticky top-0 z-40 bg-[#172228]/95 backdrop-blur-md border-b border-white/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            {/* DESKTOP HORIZONTAL SCROLL NAV */}
            <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* MOBILE DROPDOWN TRIGGER */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Jump to: {currentActiveToc.label}</span>
              </span>
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-bold flex items-center gap-1"
                aria-expanded={mobileTocOpen}
              >
                <span>Navigate</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileTocOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* HERO CTA BUTTON ON STICKY BAR */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="/start"
                onClick={handleStartDraft}
                className="px-4 py-1.5 rounded-full bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#a13c5d] transition-colors shadow-xs"
              >
                Draft Will Now
              </a>
            </div>
          </div>

          {/* MOBILE EXPANDED MENU */}
          {mobileTocOpen && (
            <div className="lg:hidden py-3 border-t border-white/10 grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`px-2.5 py-1.5 rounded text-xs font-medium text-left truncate ${
                    activeId === item.id
                      ? "bg-[#C65378] text-white font-bold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          KEY HIGHLIGHTS: STATS & AT-A-GLANCE SUMMARY BANNER
          ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
              Key Highlights: Will Making &amp; Succession in Lakshadweep
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Essential statutory parameters for island properties, customary holdings, and Kerala High Court legal standards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Court Jurisdiction
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#172228] block">
                Kerala High Court
              </span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">
                Constitutional Territorial Seat
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Probate Mandate
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#172228] block">
                Strictly Optional
              </span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">
                Sec 213 ISA Exemption
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Customary Law
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#172228] block">
                Marumakkathayam
              </span>
              <span className="text-[11px] text-[#C65378] font-bold mt-1 inline-block">
                Belasha vs Velliazha
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Central Registry
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#172228] block">
                SRO Kavaratti
              </span>
              <span className="text-[11px] text-slate-600 font-bold mt-1 inline-block">
                Nominal Registration Fees
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN EDITORIAL & PROCEDURAL CONTENT CONTAINER
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT CONTENT STREAM (8 COLS) */}
          <div className="lg:col-span-8 space-y-16">

            {/* SECTION 1: OVERVIEW & LEGAL FRAMEWORK */}
            <section id="lakshadweep-overview" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>CUSTOMARY MATRILINEAL SUCCESSION &amp; ISLAND GOVERNANCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Succession Framework in Lakshadweep
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Testamentary estate planning across the Union Territory of Lakshadweep presents a unique legal synthesis in the Republic of India. Succession on these thirty-six coral atolls is shaped by the intersection of statutory Indian civil laws, island tenancy regulations, and deep-seated customary matrilineal jurisprudence known as <strong>Marumakkathayam</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Indian Succession Act, 1925</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governs formal testamentary execution under Section 63. Requires clear testator capacity, voluntary declaration of intent, and attestation by two non-beneficiary witnesses in each other presence.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Palmtree className="w-4 h-4 text-[#C65378]" />
                    <span>Marumakkathayam Customary Law</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Draws a decisive legal boundary between <em>Velliazha</em> (undivided ancestral tarawad property) and <em>Belasha</em> (self-acquired assets). Only self-acquired property can be freely bequeathed by Will.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="font-extrabold text-base text-slate-900">
                  Island Land Protection: The 1965 Tenancy Regulation Safeguards
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under the <strong>Laccadive, Minicoy and Amindivi Islands Land Revenue and Tenancy Regulation, 1965 (Regulation 6 of 1965)</strong>, agricultural coconut groves, cowle lands, and homestead properties receive special statutory protection. Non-native individuals cannot acquire or inherit land in Lakshadweep without express authorization from the Administrator. A customized Will ensures that bequests to lawful island heirs remain fully compliant with island revenue codes, avoiding probate hurdles or rejection during Tehsildar mutation.
                </p>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 COMPLIANCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Lakshadweep Islands?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is legally optional throughout Lakshadweep. An unregistered Will signed on standard white paper before two competent witnesses possesses prima facie validity. However, in an island ecosystem where families frequently hold overlapping customary rights, registration provides indispensable legal safeguards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Unregistered Will Vulnerabilities</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-black">•</span>
                      <span>Susceptible to family allegations of forgery, undue influence, or mental impairment.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-black">•</span>
                      <span>Frequently disputed during revenue mutation before island Tehsildars.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-black">•</span>
                      <span>Requires expensive handwriting expert affidavits if contested by tarawad claimants.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Registered Will Advantages at SRO Kavaratti</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-black">•</span>
                      <span>Enters permanent Book III government custody under official government seal.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-black">•</span>
                      <span>Carries a legal presumption of genuine execution under the Indian Evidence Act.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-black">•</span>
                      <span>Ensures rapid mutation with Village (Dweep) Panchayats and mainland banks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: KERALA HIGH COURT PROBATE RULES */}
            <section id="lakshadweep-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>KERALA HIGH COURT JURISDICTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Kerala High Court Jurisdiction &amp; Probate Rules in Lakshadweep
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Under Article 241 of the Constitution of India and Section 60 of the States Reorganisation Act, 1956, the High Court of Kerala at Ernakulam exercises territorial jurisdiction over Lakshadweep. A frequent question among island residents is whether obtaining High Court probate is compulsory before transferring island estates.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">
                  Section 213 ISA: Probate is Strictly Non-Mandatory in Lakshadweep
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, obtaining court probate is compulsory only for Wills executed within or concerning properties located inside the historical presidency towns of Mumbai, Kolkata, and Chennai. 
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <p className="font-semibold text-slate-900">
                    Practical Implication for Lakshadweep Testators:
                  </p>
                  <p>
                    Because Lakshadweep lies completely outside presidency town limits, testators and their beneficiaries are <strong>not required to apply for probate</strong> before the Kerala High Court or the District &amp; Sessions Court at Kavaratti. A properly registered Will functions as conclusive testamentary title, allowing the Tehsildar and island Village Panchayats to transfer ownership directly upon production of the death certificate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO KAVARATTI & REGISTRY DIRECTORY */}
            <section id="lakshadweep-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL ISLAND REGISTRATION OFFICES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. SRO Kavaratti &amp; Island Registry Offices Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  The Union Territory of Lakshadweep maintains its principal Sub-Registrar Office at Kavaratti, supplemented by Sub-Divisional Magistrates and delegated registry desks across outlying inhabited islands. Select your island hub below for jurisdiction details and timing:
                </p>
              </div>

              {/* SEARCH & FILTER BAR */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by island name, SRO location, or administrative center..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                />
              </div>

              {/* SRO TABS / HUBS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredHubs.map((hub) => {
                  const isSelected = selectedHub === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white border-[#C65378] ring-2 ring-[#C65378]/20 shadow-xs"
                          : "bg-white/70 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {hub.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        {hub.sro}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE SRO DETAIL CARD */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#C65378]/30 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider block">
                      Active Registry Hub
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {activeHubData.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Operational Registry
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Registry Office
                    </span>
                    <span className="font-bold text-slate-800">
                      {activeHubData.sro}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Working Hours
                    </span>
                    <span className="font-bold text-slate-800">
                      {activeHubData.timings}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Physical Address
                    </span>
                    <span className="font-medium text-slate-700">
                      {activeHubData.address}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Islands &amp; Jurisdictional Wards Covered
                    </span>
                    <span className="font-medium text-slate-700">
                      {activeHubData.areas}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Advocate drafting &amp; registry accompaniment available
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d]"
                  >
                    <span>Book Assistance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES (USER SPECIFICATION: EXACT SAME TYPE AS NASHIK, RENAMED TO REGIONAL CITIES) */}
            <section id="lakshadweep-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ISLAND COVERAGE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Will Drafting Coverage Across Lakshadweep
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate holdings across Lakshadweep span residential properties in the administrative capital of Kavaratti, tourism and lagoon plots in Agatti, traditional tarawad holdings in Amini, extensive coconut plantations in Andrott, and matrilocal family residences in Minicoy. Our specialized legal advocates deliver customized Will drafting, customary review, and registry assistance across all regional island centers:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* REGIONAL CITY 1: KAVARATTI ISLAND */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital Administrative Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kavaratti
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kavaratti Island
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Collectorate Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">South Beach</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jetty Quarter</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dweep Panchayat</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Kavaratti Island</strong> for administrative officers, business owners, and resident island families. Codifies clear partition between government employee benefits, bank deposits, self-acquired residential dwellings, and ancestral tarawad shares under Kerala High Court standards.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct registration at SRO Kavaratti, advocate verification, and Section 31 doorstep execution for elderly testators.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal SRO Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kavaratti Island"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kavaratti Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 2: AGATTI ISLAND */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Airport &amp; Gateway Island
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Agatti Registry Desk
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Agatti Island
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Airport Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Eastern Jetty</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lagoon Beach Front</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Agatti Village</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Agatti Island</strong> for tourism entrepreneurs, resort operators, boat owners, and coconut grove holders. Formulates strict compliance with non-native land transfer restrictions under Regulation 6 of 1965 to ensure secure family asset devolution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Divisional Magistrate Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Lagoon tourism estate planning, passenger vessel bequests, and expedited island registry recording.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Hospitality &amp; Residential</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Agatti Island"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Agatti Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 3: AMINI ISLAND */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Customary Judicial Seat
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SDO Registry Amini
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Amini Island
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Court Complex Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Historic Tarawad Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amini North</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Quarters</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Amini Island</strong> addressing historic matrilineal tarawad properties. Carefully distinguishes ancestral Velliazha coconut holdings from Belasha self-acquired stone dwellings, preventing civil contestation in the Amini Munsiff Court.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Amini Administrative &amp; Judicial Desk</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Customary Marumakkathayam reconciliation, family tree verification, and Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Customary &amp; Ancestral Law</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Amini Island"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Amini Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 4: ANDROTT ISLAND */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Largest Agricultural Atoll
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Andrott SDO Registry
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Andrott Island
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ubaidullah Complex</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Eastern Groves</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lighthouse Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Western Settlement</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Andrott Island</strong> for owners of extensive coconut plantations, copra drying units, and multi-family residential estates. Drafts unambiguous clauses for tree usufructuary rights (*Themma*) and smooth Tehsildar mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Andrott Sub-Divisional Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Agricultural estate succession, tree yield allocation, and local Sub-Divisional Officer execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Plantations &amp; Real Estate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Andrott Island"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Andrott Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 5: MINICOY ISLAND (MALIKU) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Southernmost Atoll (Maliku)
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Minicoy SDO Registry
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Minicoy Island
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bada Village</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aoumagu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Light House Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">South Lagoon</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Minicoy Island</strong> accommodating the Mahl-speaking community distinctive Athiri (village) culture and Avakar matrilocal house rights. Harmonizes marine vessel ownership and seafarer financial investments with local village traditions.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Minicoy SDO &amp; Light House Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Merchant navy seafarer Wills, maritime vessel bequests, and Athiri customary homestead protections.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Maritime &amp; Cultural Heritage</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Minicoy Island"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Minicoy Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 6: KALPENI & CHERIYAM ISLANDS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Scenic Coral Lagoon Atoll
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Kalpeni Registry Desk
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kalpeni Island
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kalpeni Main</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cheriyam Islet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tilakkam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lagoon Coast</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Kalpeni Island</strong> covering multi-island agricultural parcels, copra processing facilities, and lagoon frontages. Integrates clear beneficiary survivorship clauses to avoid joint tenancy deadlocks among matrilineal cousins.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kalpeni Administrative Enclave</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Multi-islet property mapping, copra business succession, and Dweep Panchayat recording.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Lagoon &amp; Copra Holdings</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kalpeni Island"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kalpeni Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 7: KADMAT & KILTAN ISLANDS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Northern Marine Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Kadmat &amp; Kiltan Desk
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kadmat &amp; Kiltan
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadmat Resort Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kiltan Harbor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Coral Reef Coast</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Northern Wards</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Kadmat and Kiltan</strong> for water sports operators, fishing vessel owners, and family coconut groves. Ensures full alignment with island coastal regulation zone rules and official revenue record mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kadmat Sub-Divisional Revenue Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Coastal asset documentation, fishing boat transfer clauses, and local revenue record updating.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Reef &amp; Maritime Commercial</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kadmat and Kiltan"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kadmat Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 8: CHETLAT & BITRA ATOLLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Northern Coral Atolls
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Northern Island Registry
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Chetlat &amp; Bitra
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chetlat Jetty</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bitra Lagoon</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Boat Building Yards</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dweep Settlements</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Chetlat and Bitra</strong> protecting artisanal boat-building crafts, deep-sea fishing craft, and residential homesteads on India smallest inhabited coral atoll. Ensures swift estate preservation across remote island communities.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Delegated Executive Magistrate Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Remote island estate execution, digital draft verification, and Section 31 doorstep assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Island Homesteads &amp; Craft</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Chetlat and Bitra"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Chetlat Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-lakshadweep-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STANDARDIZED ISLAND PROTOCOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to SRO Kavaratti Registration
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Executing a legally binding Will in Lakshadweep requires methodical progression from asset identification to formal Book III government recording. Follow this verified five-step operating procedure:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 1: Segregate Belasha (Self-Acquired) &amp; Velliazha (Ancestral) Assets
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a comprehensive inventory of your real estate, coconut trees, bank accounts, and fishing vessels. Categorize each property to ensure only self-acquired (Belasha) assets are unilaterally bequeathed, preserving matrilineal harmony.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 2: Legal Drafting with Customary &amp; Statutory Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will with explicit legal clauses complying with Section 63 of the Indian Succession Act, 1925 and island revenue regulations. Appoint an executor, nominate substitute beneficiaries, and insert clear revocation clauses for prior instruments.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 3: Attestation Before Two Independent Island Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on standard A4 paper. The testator signs each page in the presence of two adult witnesses who hold no beneficial interest under the Will. Both witnesses subsequently sign in the presence of the testator.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 4: Submission at SRO Kavaratti or Sub-Divisional Office
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Present the executed original Will, testator identity proofs, and witness KYC at the Sub-Registrar Office in Kavaratti or your local island Sub-Divisional Magistrate office. Pay the nominal government registration fee.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 5: Verbal Affirmation, Biometrics &amp; Book III Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The Sub-Registrar verifies testator voluntariness and testamentary mental capacity, captures biometric thumbprints, and seals the document into Book III permanent government archives. An official registration endorsement is issued.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP &amp; ISLAND RESIDENCE EXECUTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration for Senior Islanders
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Inter-island transit across Lakshadweep often requires passenger ship or helicopter travel that can be physically taxing for elderly, ailing, or bedridden citizens. The Registration Act provides an official legal remedy through <strong>Section 31</strong>.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base">
                  <Award className="w-5 h-5 text-[#C65378]" />
                  <span>Home &amp; Hospital Commission Visits by the Sub-Registrar</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under Section 31 of the Registration Act, 1908, a testator unable to travel to SRO Kavaratti or their local island administrative complex due to bodily infirmity or old age can submit a formal application requesting a home visit.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">1. Medical Certificate</span>
                    <p className="text-[11px] text-slate-600">
                      Signed by an island Medical Officer or Health Centre doctor certifying mental lucidity and physical inability to travel.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">2. Commission Petition</span>
                    <p className="text-[11px] text-slate-600">
                      Formal requisition filed with SRO Kavaratti or the island Sub-Divisional Magistrate stating residential coordinates.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">3. In-Home Biometrics</span>
                    <p className="text-[11px] text-slate-600">
                      The registering officer attends the residence with registry ledgers, recording verbal attestation and thumb impressions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>MANDATORY VERIFICATION DOSSIER</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for Lakshadweep Sub-Registrar Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Before presenting your Will for registration at SRO Kavaratti or your island Sub-Divisional registry desk, verify that you have assembled all required documents. Use this interactive preparation checklist:
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">
                    Checklist Progress: {checkedCount} of {checklist.length} verified
                  </span>
                  <span className="text-xs font-bold text-[#C65378]">
                    {Math.round((checkedCount / checklist.length) * 100)}% Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200"
                          : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.checked ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES IN LAKSHADWEEP */}
            <section id="lakshadweep-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION &amp; CUSTOMARY RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Lakshadweep Property Types: Belasha, Velliazha &amp; Coconut Lands
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Real estate and movable wealth in Lakshadweep differ fundamentally from mainland Indian property. Understanding how your assets fall under island customary classifications prevents expensive legal disputes:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Belasha Property (Self-Acquired)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Land bought with personal income, newly constructed residential houses, commercial shops, mechanized fishing boats, copra dryers, motor vehicles, bank deposits, and mutual funds. The testator enjoys 100% unilateral testamentary freedom to bequeath Belasha assets to any chosen person.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Velliazha Property (Ancestral Tarawad)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ancestral lands descending through female maternal lines. Owned jointly by the undivided matrilineal family. Under Lakshadweep customary law, an individual holder or <em>Karanavan</em> cannot bequeath Velliazha property through a Will without the signed consent of all adult tarawad members.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <Palmtree className="w-4 h-4 text-[#5F7E75]" />
                    <span>Coconut Palm Holdings &amp; Cowle Grants</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agricultural land governed by the 1965 Land Revenue and Tenancy Regulation. Includes tree usufructuary rights (*Themma*) where coconut trees can be bequeathed separately from underlying land occupancy, requiring precise testamentary description.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <Waves className="w-4 h-4 text-blue-600" />
                    <span>Minicoy Avakar Dwellings &amp; Vessels</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In Minicoy (Maliku), residential houses traditionally pass matrilocally to female lineage heirs who manage the household. Bequests must harmoniously preserve Avakar dwelling succession while freely distributing maritime vessels and savings.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & CHARGES */}
            <section id="lakshadweep-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT STATUTORY COSTS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Lakshadweep SRO Registration Fees &amp; Stamp Duty
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Unlike property sale deeds, gift deeds, or mortgages that attract ad-valorem stamp duty based on circle rates, Wills are testamentary declarations taking effect solely upon death. Consequently, government charges for registering a Will across Lakshadweep are strictly nominal.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-extrabold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Government Fee Component</th>
                      <th className="p-3.5 sm:p-4">Statutory Charge</th>
                      <th className="p-3.5 sm:p-4">Legal Authority &amp; Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Stamp Duty on Will
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-600 font-extrabold">
                        ₹0 (100% Exempt)
                      </td>
                      <td className="p-3.5 sm:p-4 text-xs">
                        Wills are completely exempt from ad-valorem stamp duty across Lakshadweep. Non-judicial stamp paper is not required.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        SRO Kavaratti Registration Fee
                      </td>
                      <td className="p-3.5 sm:p-4 font-extrabold text-slate-900">
                        ₹100
                      </td>
                      <td className="p-3.5 sm:p-4 text-xs">
                        Standard statutory fee for registering a testamentary instrument under Registration Act rules.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Government Scanning &amp; Archive Charges
                      </td>
                      <td className="p-3.5 sm:p-4 font-extrabold text-slate-900">
                        ₹100 – ₹200
                      </td>
                      <td className="p-3.5 sm:p-4 text-xs">
                        Digital scanning and Book III archival storage fee covering official government document preservation.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Section 31 Doorstep Commission Fee
                      </td>
                      <td className="p-3.5 sm:p-4 font-extrabold text-slate-900">
                        Nominal Travel Allowance
                      </td>
                      <td className="p-3.5 sm:p-4 text-xs">
                        Applicable only when the Sub-Registrar conducts an in-home or hospital visit for elderly or bedridden citizens.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT SERVICE PACKAGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Lakshadweep
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Choose the ideal service tier for your estate planning needs. All drafts include customary Marumakkathayam verification, Kerala High Court compliance, and step-by-step registry instructions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* PLAN 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 inline-block">
                      Basic Self-Draft
                    </span>
                    <div>
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 block mt-0.5">One-time flat fee</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Ideal for individuals with straightforward Belasha personal savings, bank deposits, and single residential homes.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Online lawyer-formatted Will</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download in 15 mins</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Attestation &amp; witness guidelines</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#C65378] shadow-md relative flex flex-col justify-between">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[11px] font-black uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#C65378] inline-block">
                      Advocate Consultation
                    </span>
                    <div>
                      <span className="text-3xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500 block mt-0.5">Custom legal drafting</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Recommended for islanders with agricultural coconut holdings, copra units, commercial shops, and multiple heirs.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Senior succession lawyer consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Customary Marumakkathayam review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Belasha vs Velliazha asset vetting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Two rounds of custom clause edits</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-2.5 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>Choose Advocate Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* PLAN 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 inline-block">
                      Full SRO Assistance
                    </span>
                    <div>
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 block mt-0.5">End-to-end management</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Complete done-for-you service including SRO Kavaratti filing, island registry accompaniment, or Section 31 home visit.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in ₹4,990 Advocate plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>SRO Kavaratti slot &amp; token coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit petition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Post-registration Book III dispatch</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Book SRO Registration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMONLY ASKED QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Lakshadweep
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Answers to real questions concerning island property succession, customary Marumakkathayam rules, and SRO Kavaratti registration:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left font-extrabold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F0]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>AUTHORITATIVE STATUTORY CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; Lakshadweep Island Legal Framework
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Every Will prepared through WillDrafting strictly adheres to governing primary legislation, island regulations, and high court precedents:
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      Section 63, Indian Succession Act, 1925
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      Mandates testator execution and two-witness simultaneous attestation for all unprivileged Wills in India.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      Section 18(e) &amp; 31, Registration Act, 1908
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      Designates Will registration as optional and empowers the registering officer to conduct home commission visits.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      Regulation 6 of 1965 (Land Revenue &amp; Tenancy)
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      Controls land tenure, agricultural coconut grants, and safeguards non-native land transfer restrictions.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      Article 241, Constitution of India
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      Establishes the territorial jurisdiction of the High Court of Kerala over the Union Territory of Lakshadweep.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-slate-200 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900 mb-1">
                    Official Administration &amp; Judicial Portals:
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Lakshadweep Administration Official Portal (lakshadweep.gov.in) · High Court of Kerala (hckerala.gov.in) · District Court Kavaratti (districts.ecourts.gov.in/lakshadweep)
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR COLUMN (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">

            {/* STICKY SIDEBAR CARD */}
            <div className="sticky top-20 space-y-6">

              {/* CARD 1: PRIMARY ACTION CARD */}
              <div className="p-6 rounded-3xl bg-[#172228] text-white shadow-xl space-y-5 border border-white/10">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C65378] text-white inline-block">
                    Online &amp; SRO Assisted
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Protect Your Island Estate Today
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prevent bitter family inheritance disputes. Draft a legally sound Will customized for Lakshadweep property laws.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Kerala High Court advocate vetted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Marumakkathayam customary review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SRO Kavaratti filing guidance</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/30 flex items-center justify-center gap-2 text-center"
                  >
                    <span>Draft Your Will Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Transparent packages from ₹1,990 · No hidden costs
                  </p>
                </div>
              </div>

              {/* CARD 2: SECTION 31 HOME VISIT */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>Senior Citizen Home Visits</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you or an elderly family member residing on Kavaratti, Agatti, Amini, or Andrott unable to travel to the Sub-Registrar Office? We coordinate Section 31 in-home commission visits with island authorities.
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="text-xs font-bold text-[#C65378] hover:text-[#a13c5d] inline-flex items-center gap-1"
                >
                  <span>Request Home Visit Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* CARD 3: RELATED LINKS & LEGAL TOOLS */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  Useful Legal Resources
                </span>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>
                    <Link
                      href="/services/will-registration"
                      className="hover:text-[#C65378] flex items-center justify-between"
                    >
                      <span>Done-For-You Will Registration</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/will-checklist"
                      className="hover:text-[#C65378] flex items-center justify-between"
                    >
                      <span>Interactive Will Preparation Checklist</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/probate-checker"
                      className="hover:text-[#C65378] flex items-center justify-between"
                    >
                      <span>Probate Requirement Diagnostic</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations"
                      className="hover:text-[#C65378] flex items-center justify-between"
                    >
                      <span>All India City &amp; UT Locations</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* =========================================================================
          HIGH-RESOLUTION ENLARGED IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#172228] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/will-drafting-in-lakshadweep-og.jpg"
                alt="Legal Will Drafting and Property Succession in Lakshadweep Islands"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between bg-[#172228] border-t border-white/10 text-white">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold">
                  Legal Will Drafting Services in Lakshadweep
                </h4>
                <p className="text-xs text-slate-300">
                  Customary Marumakkathayam Compliance &amp; SRO Kavaratti Execution
                </p>
              </div>
              <button
                onClick={() => setShowHighResModal(false)}
                className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
