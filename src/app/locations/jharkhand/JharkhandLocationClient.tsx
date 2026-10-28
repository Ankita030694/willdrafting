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
  Wheat,
  Factory,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "jharkhand-overview", label: "OVERVIEW" },
  { id: "jharkhand-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "jharkhand-probate-rules", label: "PROBATE RULES" },
  { id: "jharkhand-sro-directory", label: "SRO DIRECTORY" },
  { id: "jharkhand-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-jharkhand-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "jharkhand-property-types", label: "PROPERTY TYPES" },
  { id: "jharkhand-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const JHARKHAND_SRO_HUBS = [
  {
    id: "ranchi-sadar",
    name: "Ranchi Sadar (Kutchery)",
    sro: "SRO Ranchi Sadar (DC Office Campus)",
    address: "Deputy Commissioner Office Campus, Kutchery Road, Ranchi, Jharkhand - 834001",
    areas: "Morabadi, Ashok Nagar, Kanke Road, Bariatu, Doranda, Harmu, Lalpur, Main Road, HEC Township, Namkum",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "jamshedpur-sakchi",
    name: "Jamshedpur (Sakchi DC Office)",
    sro: "SRO Jamshedpur (East Singhbhum)",
    address: "District Collectorate Complex, Sakchi, Jamshedpur, Jharkhand - 831001",
    areas: "Bistupur, Circuit House Area, Northern Town, Kadma, Sonari, Telco Colony, Sakchi, Mango, Golmuri, Baridih",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "dhanbad-sadar",
    name: "Dhanbad Sadar (Court Road)",
    sro: "SRO Dhanbad Sadar (Combined Building)",
    address: "Combined Building Complex, Court Road, Dhanbad, Jharkhand - 826001",
    areas: "Bank More, Hirapur, Saraidhela, Govindpur, Katras, Jharia, Steel Gate, Bartand, Putki, Sindri",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "bokaro-chas",
    name: "Bokaro (Chas Sub-Division)",
    sro: "SRO Chas (Bokaro District)",
    address: "Sub-Divisional Office Compound, Chas, Bokaro, Jharkhand - 827013",
    areas: "Steel City Sectors (1 to 12), Chas Municipal Area, Cooperative Colony, Balidih, Kurmidih, Camp Two",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "deoghar-court",
    name: "Deoghar (Civil Court)",
    sro: "SRO Deoghar (Santhal Pargana)",
    address: "Civil Court Complex, Court Road, Deoghar, Jharkhand - 814112",
    areas: "Baidyanath Dham, Jasidih, Madhupur, Castairs Town, Williams Town, Bilasi Town, Kunda, Mohanpur",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hazaribagh-sadar",
    name: "Hazaribagh Sadar (Canary Hill)",
    sro: "SRO Hazaribagh Collectorate",
    address: "Collectorate Complex, Canary Hill Road, Hazaribagh, Jharkhand - 825301",
    areas: "Matwari, Canary Hill, Korrah, Babugaon, Pelawal, Barhi, Ramgarh Cantt, Mandu, Gola",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "giridih-chaibasa",
    name: "Giridih & Chaibasa Regional",
    sro: "SRO Giridih & West Singhbhum Hubs",
    address: "District Registration Office, Court Compound, Giridih & Chaibasa, Jharkhand",
    areas: "Giridih Town, Parasnath, Isri Bazar, Chaibasa Sadar, Chakradharpur, Noamundi, Ghatsila",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Jharkhand law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo capture at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any property or asset under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly recommended for senior citizens aged 60+. Certifies testamentary mental capacity and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "NGDRS Jharkhand Online Appointment Slip",
    detail: "Official time-slot booking receipt downloaded from the ngdrs.jharkhand.gov.in portal with e-Challan receipt.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Municipal Property Tax Receipts (RMC / JNAC / DMC)",
    detail: "Current holding tax paid challans proving accurate house number, ward, and municipal identification.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Jharbhoomi Land Records / Khatiyan / Mutation Slips",
    detail: "Computerized Khasra and Khatiyan extract for ancestral or agricultural land proving clear non-tribal or transferable title.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Tata Steel Sub-Lease Papers (For Jamshedpur Assets)",
    detail: "Sub-lease deed copies issued by Tata Steel Land Department for properties in Bistupur, Kadma, or Circuit House Area.",
    checked: false,
  },
];

export default function JharkhandLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("jharkhand-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState<string>("ranchi-sadar");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredHubs = JHARKHAND_SRO_HUBS.filter(
    (hub) =>
      hub.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    JHARKHAND_SRO_HUBS.find((h) => h.id === selectedHub) || JHARKHAND_SRO_HUBS[0];

  const currentActiveToc =
    TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI / NASHIK ARCHITECTURE)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* COLUMN 1: HERO COPY (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* BREADCRUMB & REGIONAL PILL */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Locations
                </Link>
                <span>/</span>
                <span className="text-[#C65378] uppercase tracking-wider font-bold">
                  Jharkhand
                </span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters (30-65 target range) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Jharkhand: Legal Asset Protection
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your Ranchi municipal homes, Tata Steel sub-leasehold plots in Jamshedpur, Dhanbad commercial assets, and Jharbhoomi ancestral lands. Ensure complete compliance with CNT and SPT tenancy safeguards, senior advocate drafting, NGDRS Jharkhand slot booking, and Section 31 doorstep execution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-7 py-4 rounded-xl bg-[#C65378] text-white font-extrabold text-sm sm:text-base text-center hover:bg-[#a13c5d] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Your Will Online (₹1,990)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#service-pricing"
                  className="px-6 py-4 rounded-xl bg-white/10 text-white font-bold text-sm sm:text-base text-center hover:bg-white/15 transition-all border border-white/20 backdrop-blur-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>Explore Legal Plans</span>
                </a>
              </div>

              {/* TRUST PILLS */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>NGDRS Jharkhand Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CNT &amp; SPT Act Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Zero High Court Probate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Doorstep SRO (Sec. 31)</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: RESPONSIVE VISUAL BLUEPRINT CARD (5 Cols) */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group flex items-center justify-center"
              >
                <Image
                  src="/images/will-drafting-in-jharkhand.jpg"
                  alt="Will Drafting Services in Jharkhand and Property Succession"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Jharkhand Estate &amp; Land Succession Blueprint
                </span>
                <button
                  onClick={() => setShowHighResModal(true)}
                  className="text-xs text-rose-300 hover:text-white font-bold inline-flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  <span>Enlarge Visual</span>
                  <Search className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY TABLE OF CONTENTS NAV (MOBILE + DESKTOP SIDEBAR ARCHITECTURE)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* MOBILE TOC ACCORDION */}
          <div className="lg:hidden col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-800 bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>ON THIS PAGE: {currentActiveToc.label}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileTocOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileTocOpen && (
                <div className="p-3 border-t border-slate-200/80 space-y-1 bg-white">
                  {TOC_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileTocOpen(false);
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                          isActive
                            ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`mr-2.5 w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-[#C65378]" : "bg-transparent"
                          }`}
                        />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP STICKY SIDEBAR (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  DOCUMENT DIRECTORY
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <nav className="space-y-1" aria-label="Table of Contents">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className={`flex items-center text-xs font-mono tracking-wider uppercase transition-all ${
                        isActive
                          ? "text-[#C65378] font-bold translate-x-1"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`mr-2.5 transition-all ${
                          isActive ? "text-[#C65378] font-bold" : "text-slate-400"
                        }`}
                      >
                        {isActive ? "›" : "•"}
                      </span>
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#C65378] text-white text-xs font-bold text-center transition-colors block cursor-pointer"
                >
                  Create Your Will Now
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT (9 Cols) */}
          <main className="lg:col-span-9 space-y-12 sm:space-y-16">
            {/* SECTION 1: OVERVIEW */}
            <section id="jharkhand-overview" className="scroll-target space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>ESTATE SUCCESSION IN JHARKHAND</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Overview: Online Will Drafting Services in Jharkhand
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Securing your family&apos;s financial future in Jharkhand demands an estate plan that reconciles modern urban wealth with intricate regional land tenures. From high-value private bungalows in Ranchi&apos;s Ashok Nagar and Morabadi to unique 99-year Tata Steel sub-leasehold residential plots in Jamshedpur, coal trading commercial complexes in Dhanbad, and ancestral agricultural parcels across all 24 districts, bequeathing assets requires precision.
                </p>
                <p>
                  A properly drafted and registered testamentary Will serves as your final voice. It completely supersedes default intestate succession disputes under personal laws, eliminates conflicting claims among extended family branches, and provides unassailable documentary authority during digital mutation on the official <strong>Jharbhoomi land records portal</strong>.
                </p>
                <p>
                  Our legal platform connects Jharkhand testators directly with experienced estate advocates. We combine compliant statutory drafting with seamless <strong>NGDRS Jharkhand e-Panjiyan</strong> appointment scheduling, doctor mental fitness certification, and <strong>Section 31 doorstep execution</strong> across Ranchi, Jamshedpur, Dhanbad, Bokaro, and all surrounding districts.
                </p>
              </div>

              {/* 3 STATS/METRIC CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
                  <span className="text-2xl font-black text-[#C65378] block">₹0 Stamp Duty</span>
                  <span className="text-xs text-slate-600 font-medium">
                    Testamentary Wills are 100% exempt from ad-valorem stamp duty across Jharkhand.
                  </span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
                  <span className="text-2xl font-black text-slate-900 block">Non-Mandatory</span>
                  <span className="text-xs text-slate-600 font-medium">
                    Civil court probate is non-mandatory under Jharkhand High Court non-presidency rules.
                  </span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
                  <span className="text-2xl font-black text-emerald-600 block">Jharbhoomi</span>
                  <span className="text-xs text-slate-600 font-medium">
                    Direct computerized Dakhil-Kharij and Khatiyan update with a registered Will.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK & TENANCY ACTS */}
            <section id="jharkhand-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY SAFEGUARDS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Legal Framework: Succession &amp; Tenancy Laws in Jharkhand
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning in Jharkhand operates under central testamentary enactments while strictly honoring foundational regional land tenancy statutes:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ACT 1: INDIAN SUCCESSION ACT */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                      Central Legislation
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Indian Succession Act, 1925
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Governs the testamentary disposition of movable and immovable property. Under <strong>Section 59</strong>, any adult of sound mind may dispose of their property by Will. Under <strong>Section 63</strong>, the testator must sign each page in the physical presence of at least two independent adult witnesses who attest in their presence.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    Governs Hindus, Sikhs, Jains, Buddhists, Christians, and Parsis across Jharkhand.
                  </div>
                </div>

                {/* ACT 2: CNT ACT 1908 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                      Regional Tenure
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Chota Nagpur Tenancy (CNT) Act, 1908
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enacted to protect indigenous land rights across Ranchi, Dhanbad, Bokaro, and Hazaribagh. <strong>Section 46 and Section 71A</strong> prohibit the alienation or transfer of tribal raiyati land to non-tribals. A Will cannot be used as an evasive tool to transfer tribal holdings to non-tribal entities; our advocates ensure clear non-tribal title certification.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    Urban non-tribal municipal properties are completely transferable via Will.
                  </div>
                </div>

                {/* ACT 3: SPT ACT 1949 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                      Santhal Pargana Division
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Santhal Parganas Tenancy (SPT) Act, 1949
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Governs Deoghar, Dumka, Godda, Jamtara, Pakur, and Sahibganj. <strong>Section 20</strong> strictly forbids transfer of raiyati lands by sale, gift, mortgage, or Will unless backed by recognized customary village tenancy records. Urban freehold and municipal holding tax properties in Deoghar and Jasidih remain fully bequeathable.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    Mandatory review prevents post-demise rejection during revenue circle mutation.
                  </div>
                </div>

                {/* ACT 4: JHARBHOOMI PORTAL */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                      Digital Revenue Portal
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Jharbhoomi Land Mutation Protocol
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The Department of Revenue, Registration and Land Reforms Jharkhand manages all rural and peri-urban land mutation via the <strong>Jharbhoomi portal</strong> (<code>jharbhoomi.jharkhand.gov.in</code>). Presenting a Book III registered Will ensures the Circle Officer initiates swift public notice and updates the digital Khatiyan without litigation.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    Eliminates disputed succession claims across all 24 Jharkhand revenue circles.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Registration Rules: Optional vs Mandatory Will Execution
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will is legally optional in the State of Jharkhand. A Will drafted on plain A4 paper and executed before two independent witnesses carries legal force from the instant of signing. However, in Jharkhand&apos;s land records landscape, registration is overwhelmingly recommended:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold">Unregistered Will</th>
                      <th className="p-4 font-bold text-[#C65378]">NGDRS Registered Will (Recommended)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Legal Validity</td>
                      <td className="p-4">Valid under Section 63 ISA if properly witnessed</td>
                      <td className="p-4 font-bold text-emerald-700">Fully Valid &amp; Strong Legal Presumption</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Government Record Keeping</td>
                      <td className="p-4">Private document; vulnerable to loss, fire, or theft</td>
                      <td className="p-4 font-bold">Permanent Book III government archive at SRO</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Challenge Vulnerability</td>
                      <td className="p-4 text-amber-700">High risk of forgery or undue influence claims</td>
                      <td className="p-4 font-bold text-emerald-700">Virtually immune; verified by Sub-Registrar biometrics</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Jharbhoomi &amp; RMC Mutation</td>
                      <td className="p-4">Slow; circle officers often demand affidavits</td>
                      <td className="p-4 font-bold text-[#C65378]">Fast digital mutation and tax record transfer</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Tata Steel Lease Transfer (Jamshedpur)</td>
                      <td className="p-4">Subject to lengthy Land Department scrutiny</td>
                      <td className="p-4 font-bold">Direct substitution of sub-leaseholder rights</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Registration Cost</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4 font-bold text-slate-900">₹100 flat statutory fee + nominal scanning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PROBATE LAW IN JHARKHAND */}
            <section id="jharkhand-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL JURISPRUDENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Probate Law in Jharkhand: High Court Rules &amp; Exemptions
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most persistent misconceptions among property owners in Ranchi and Jamshedpur is that a Will must be probated through a civil court before assets can be transferred. This is legally incorrect:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-rose-50 text-[#C65378] shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Probate is Non-Mandatory in Jharkhand under Section 213 ISA
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, court probate is compulsory only within the historical presidential towns of Mumbai, Kolkata, and Chennai, or for Wills executed within those territories concerning real estate situated there.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The <strong>High Court of Jharkhand at Ranchi</strong> has affirmed that for Hindu, Sikh, Jain, Buddhist, and Christian testators residing in Jharkhand, probate is strictly non-compulsory. Beneficiaries can directly apply for municipal tax name changes, bank account transfers, and Jharbhoomi mutation by producing the registered Will and certified death certificate.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block">When is Probate Advisable in Jharkhand?</span>
                    <span className="text-slate-600">
                      Only when hostile legal heirs challenge the authenticity of the Will in a civil partition suit, or when the testator held immovable assets located inside Kolkata, Mumbai, or Chennai presidency limits.
                    </span>
                  </div>
                  <a
                    href="#service-pricing"
                    className="shrink-0 font-bold text-[#C65378] hover:underline"
                  >
                    Consult an Advocate →
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: JHARKHAND SRO DIRECTORY */}
            <section id="jharkhand-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>NGDRS JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Jharkhand SRO Directory: NGDRS Registration Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Jharkhand operates registration offices governed by the National Generic Document Registration System (NGDRS Jharkhand). Under Section 32 of the Registration Act, your Will can be registered at the Sub-Registrar Office having jurisdiction over your place of residence or where any portion of your immovable property is situated:
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search hub (e.g. Ranchi, Jamshedpur, Dhanbad)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {JHARKHAND_SRO_HUBS.length} Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredHubs.map((h, index) => {
                    const isSelected = selectedHub === h.id;
                    const isLastOdd =
                      filteredHubs.length % 2 !== 0 && index === filteredHubs.length - 1;
                    return (
                      <button
                        key={h.id}
                        onClick={() => setSelectedHub(h.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                        }`}
                      >
                        {h.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        Jharkhand Registration District
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Registry Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Location:</span>
                      <p className="text-slate-600">{activeHubData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeHubData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Key Localities in Jurisdiction:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Portal: <strong>ngdrs.jharkhand.gov.in (NGDRS)</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Assistance for {activeHubData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: REGIONAL CITIES IN JHARKHAND (EXACT NASHIK CARD DESIGN) */}
            <section id="jharkhand-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Regional Cities: Area-Wise Will Drafting in Jharkhand
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Jharkhand span state capital residences in Ranchi, 99-year Tata Steel leasehold plots in Jamshedpur, coal enterprise and trading wealth in Dhanbad, planned steel townships in Bokaro, pilgrimage properties in Deoghar, and ancestral land parcels across North and South Chotanagpur. Our advocates provide tailored drafting and NGDRS support across all key regions:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: RANCHI & RRDA CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; RRDA
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ranchi Sadar &amp; Kanke
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ranchi &amp; RRDA Region
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashok Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Morabadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanke Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bariatu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Doranda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Ranchi</strong> for Ranchi Regional Development Authority (RRDA) plotted layouts, RMC municipal apartments, and private residences. Formulates watertight bequests ensuring full compliance with non-tribal ownership provisions of the CNT Act, municipal holding tax mutation, and liquid mutual fund distribution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kutchery Sadar, Ranchi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NGDRS token booking, advocate physical attendance at Kutchery SRO, and Section 31 home visits in Ashok Nagar and Kanke.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ranchi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ranchi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: JAMSHEDPUR & TATA STEEL SUB-LEASEHOLD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Steel City &amp; Leasehold Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sakchi Jamshedpur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jamshedpur &amp; East Singhbhum
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bistupur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Circuit House Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadma</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Northern Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Telco Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Jamshedpur</strong> addressing unique Tata Steel residential sub-leasehold plots and company bungalows. Incorporates testamentary clauses that facilitate seamless verification by the Tata Steel Land Department and JNAC holding tax department to prevent succession deadlocks.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Compound, Sakchi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sakchi SRO execution, Tata Steel sub-leasehold transfer protocols, and Section 31 doorstep service for senior Tata executives.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tata Lease &amp; Freehold</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jamshedpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jamshedpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: DHANBAD & COAL CAPITAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coal Capital &amp; Trade Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Dhanbad Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dhanbad &amp; Jharia Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bank More</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saraidhela</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hirapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Govindpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katras</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Dhanbad</strong> for commercial showrooms in Bank More, residential complexes along Saraidhela, and mining logistics firms. Codifies BCCL/CCL retirement funds, commercial transport fleet assets, and DMC municipal tax records to protect family enterprise continuity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Combined Building, Court Road, Dhanbad</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NGDRS appointment coordination, business succession structuring, and prompt Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Mining Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dhanbad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dhanbad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: BOKARO STEEL CITY & CHAS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial Steel Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Chas (Bokaro)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bokaro Steel City &amp; Chas
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 1-12</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chas Municipal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cooperative Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Balidih</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Camp Two</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Structured <strong>Will drafting services in Bokaro and Chas</strong> for SAIL employee cooperative societies, independent houses in Chas, and industrial engineering ancillaries in Balidih. Protects family inheritance from disputes, specifies executor powers, and ensures seamless computerized mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Chas Sub-Divisional Office, Bokaro</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep registration for retired steel plant executives and senior citizens in Cooperative Colony.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">PSU Quarters &amp; Chas Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bokaro"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bokaro Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: DEOGHAR & SANTHAL PARGANAS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Pilgrimage Division
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Deoghar &amp; Madhupur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Deoghar &amp; Santhal Parganas
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baidyanath Dham</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jasidih</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madhupur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Castairs Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Williams Town</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Deoghar</strong> and the Santhal Pargana division respecting Section 20 of the SPT Act, 1949. Protects urban freehold properties, hospitality assets, and non-raiyati residential plots from unauthorized inheritance claims while keeping tribal land tenure intact.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Court Road, Deoghar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Expert SPT tenancy verification, hotel/guest house succession planning, and Sub-Registrar accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">SPT Act &amp; Urban Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Deoghar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Deoghar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: HAZARIBAGH, RAMGARH & GIRIDIH */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        North Chotanagpur Plateau
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Hazaribagh &amp; Ramgarh
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Hazaribagh, Ramgarh &amp; Giridih
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Canary Hill</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Matwari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramgarh Cantt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Giridih Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Parasnath Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting in Hazaribagh, Ramgarh, and Giridih</strong> for ancestral agricultural parcels, mica and stone processing firms, and commercial properties along the NH-33 corridor. Formulates clear bequest shares that satisfy Jharbhoomi digital mutation norms.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Complex, Hazaribagh</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Khatiyan verification, mineral and trade firm succession, and Section 31 doorstep assistance across rural estates.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ancestral Lands &amp; Mines</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hazaribagh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Plateau Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-jharkhand-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. 5-Step Legal SOP: How to Draft &amp; Register in Jharkhand
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified 5-stage standard operating procedure to create, execute, and register your Will before the Sub-Registrar in Jharkhand:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Asset Audit &amp; Tenancy
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compile complete details of RMC flats, Tata Steel sub-leases, Jharbhoomi survey numbers, bank accounts, and demat portfolios. Verify non-tribal classification.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Advocate Drafting
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft customized legal clauses covering revocation of past wills, survivorship, executor powers, minor guardianships, and community law compliance.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Valid Execution
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print on standard A4 paper and sign each page in the physical presence of two independent non-beneficiary adult witnesses holding valid Aadhaar cards.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      NGDRS Booking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Schedule your slot on NGDRS Jharkhand (ngdrs.jharkhand.gov.in) for your relevant district SRO and pay the nominal ₹100 registration fee online via e-Challan.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Biometrics
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar office with witnesses for verbal verification, photo capture, and biometric thumbprinting to complete permanent Book III registry.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 DOORSTEP REGISTRATION */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FOR SENIORS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Doorstep Registration: Section 31 Home Visit Facility
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, ailing, or bedridden citizens residing in Ashok Nagar, Circuit House Area, Saraidhela, or remote ancestral homes, traveling to a crowded Sub-Registrar Office can be physically daunting. Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar holds statutory power to attend a private home or hospital:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep SRO Registration Operates in Jharkhand:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Medical Certificate</strong>
                      <span className="text-slate-600">A registered MBBS or MD doctor certifies testamentary soundness of mind while stating physical inability to commute.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Special Commission Petition</strong>
                      <span className="text-slate-600">Our legal team files the Section 31 home-visit application before the jurisdictional District Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Commission Fee</strong>
                      <span className="text-slate-600">A nominal statutory government fee is deposited via the official treasury e-Challan to schedule the officer visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometric Registration</strong>
                      <span className="text-slate-600">The Sub-Registrar arrives at your residence with portable biometric sensors and webcams to execute official Book III enrollment.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENT CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Document Checklist: What You Need for SRO Registration
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Use this interactive checklist to verify that all necessary legal records and identities are prepared prior to executing your Will:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200/70 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {}}
                          className="w-4 h-4 text-[#C65378] rounded-sm border-slate-300 focus:ring-[#C65378] cursor-pointer"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.checked ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <span>Need personalized document audit from an estate advocate?</span>
                  <a
                    href="#service-pricing"
                    className="font-bold text-[#C65378] hover:underline"
                  >
                    View Comprehensive Plans →
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 10: PROPERTY TYPES COVERED */}
            <section id="jharkhand-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET INVENTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Property Types Covered: Residential, Leasehold &amp; Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our customized legal drafts encompass all categories of real, commercial, and financial assets across Jharkhand:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#C65378]">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Municipal Freehold Homes
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apartments, builder floors, and residential houses registered under Ranchi Municipal Corporation (RMC), Chas Municipal, or DMC holding tax registers.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#C65378]">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Tata Steel Sub-Leasehold
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Long-term 99-year residential sub-leases granted by Tata Steel across Jamshedpur&apos;s Circuit House Area, Bistupur, Northern Town, and Kadma.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#C65378]">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Jharbhoomi Farmland
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Non-tribal agricultural acreage and ancestral groves recorded on computerized Khatiyan and Khasra sheets across all 24 revenue circles.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#C65378]">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Trade &amp; Mining Ancillaries
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Commercial retail shops in Bank More, coal trading logistics partnerships, stone crushing units, and private limited company shares.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#C65378]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Liquid Financial Holdings
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bank fixed deposits, demat shares, mutual fund units, provident fund accumulated balances, and gold jewelry portfolios.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="p-3 w-fit rounded-2xl bg-rose-50 text-[#C65378]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    PSU &amp; Employee Benefits
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gratuity, pension family trust designations, and cooperative society housing shares for BCCL, CCL, SAIL Bokaro, and HEC retirees.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES & CHARGES */}
            <section id="jharkhand-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Registration Fees &amp; Stamp Duty Charges in Jharkhand
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike real estate sale conveyances or gift deeds that attract substantial stamp duty and transfer levies in Jharkhand, testamentary Wills are completely exempt from stamp duty. Government registration charges in Jharkhand are purely nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Statutory Amount</th>
                      <th className="p-4 font-bold">Remittance Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Jharkhand Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt under Indian Stamp Act)</td>
                      <td className="p-4">Zero Stamp Duty Payable</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Statutory Fee)</td>
                      <td className="p-4">NGDRS Jharkhand via e-Challan</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Service Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹300</td>
                      <td className="p-4">Sub-Registrar Service Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Special Commission (Home Visit)</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Official Treasury Commission Challan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 12: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Professional Plans &amp; Transparent Legal Drafting Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance package tailored to your family&apos;s estate planning and property portfolio in Jharkhand:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Standard
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Online Will Drafting
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹1,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Ideal for individual homeowners with municipal apartments, bank accounts, and demat assets.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Jharkhand Will creator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted statutory clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; execution guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Online Now
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular in Jharkhand
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Advocate Consultation
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate advocate review for RMC homes, Tata Steel sub-leases, and multi-heir estates.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 video call with senior advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for CNT / Tata leasehold assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor vetting &amp; witness protocols</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Advocate Call
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Doorstep SRO
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Registration
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end registration coordination across any Jharkhand Sub-Registrar Office or home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>NGDRS Jharkhand token booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of certified Book III record</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Support
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Frequently Asked Questions: Jharkhand Will Drafting
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal questions regarding Will drafting and property registration in Jharkhand:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Statutory Citations &amp; Legal Reference Framework
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Jharkhand state registration systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213 (Non-Presidency Town Probate Exemption).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration) and Section 31 (Special Commission Home Visit).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Tenancy Acts of Jharkhand
                  </span>
                  <p className="text-xs text-slate-600">
                    Chota Nagpur Tenancy (CNT) Act 1908 Sec 46/71A &amp; Santhal Parganas Tenancy (SPT) Act 1949 Sec 20.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    NGDRS Jharkhand Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official e-Panjiyan token appointment portal: <code>ngdrs.jharkhand.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Jharkhand Properties &amp; Family Legacy
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Draft a legally vetted, CNT-compliant Will in less than 15 minutes. Secure Book III registration before your local Sub-Registrar or request an advocate home visit.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Start Your Will Online (₹1,990)
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-all border border-white/20 backdrop-blur-xs cursor-pointer"
                >
                  Consult an Estate Advocate
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* HIGH RESOLUTION VISUAL BLUEPRINT MODAL */}
      {showHighResModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#172228] rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span className="font-extrabold text-sm sm:text-base">
                  Jharkhand Will Drafting &amp; NGDRS Registration Guide
                </span>
              </div>
              <button
                onClick={() => setShowHighResModal(false)}
                className="text-xs text-slate-300 hover:text-white font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-jharkhand.jpg"
                alt="High Resolution Visual Blueprint: Jharkhand Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-300">
              <span>Jharkhand NGDRS Registered &amp; Jharbhoomi Mutation Compliant</span>
              <a
                href="/start"
                onClick={(e) => {
                  setShowHighResModal(false);
                  handleStartDraft(e);
                }}
                className="font-bold text-[#C65378] hover:underline"
              >
                Start Your Will Now →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
