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
  Trees,
  Hotel,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "jk-overview", label: "OVERVIEW" },
  { id: "jk-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "jk-probate-rules", label: "PROBATE RULES" },
  { id: "jk-sro-directory", label: "SRO DIRECTORY" },
  { id: "jk-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-jk-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "jk-property-types", label: "PROPERTY TYPES" },
  { id: "jk-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const JK_SRO_HUBS = [
  {
    id: "srinagar-central",
    name: "Srinagar Sadder / Central",
    sro: "SRO Srinagar Central (DC Office Complex)",
    address: "Deputy Commissioner Office Complex, Tankipora, Srinagar - 190001",
    areas: "Lal Chowk, Civil Lines, Batamaloo, Rajbagh, Jawahar Nagar, Sonwar, Dalgate, Munshi Bagh",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "srinagar-north",
    name: "Srinagar North & Hazratbal",
    sro: "SRO Srinagar North (Hazratbal Sub-Division)",
    address: "Tehsil Office Complex, Hazratbal / Zakura Road, Srinagar - 190006",
    areas: "Hazratbal, Soura, Buchpora, Lal Bazar, Shalimar, Nishat, Harwan, Zakoora, Eidgah",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "jammu-south",
    name: "Jammu South (Rail Head)",
    sro: "SRO Jammu South (Rail Head Complex)",
    address: "Excise & Taxation Building, Rail Head Complex, Near Bahu Plaza, Jammu - 180012",
    areas: "Gandhi Nagar, Channi Himmat, Trikuta Nagar, Bahu Plaza, Sainik Colony, Greater Kailash, Sunjwan, Digiana",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "jammu-north",
    name: "Jammu North (Janipur Courts)",
    sro: "SRO Jammu North (Janipur Court Belt)",
    address: "District Court Complex Road, Janipur, Jammu - 180007",
    areas: "Janipur, Roop Nagar, Bantalab, Paloura, Subash Nagar, Talab Tillo, Muthi, Akhnoor Road",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "anantnag-south",
    name: "Anantnag & South Kashmir",
    sro: "SRO Anantnag (Mini Secretariat)",
    address: "Mini Secretariat Complex, KP Road, Anantnag - 192101",
    areas: "Anantnag Town, KP Road, Mattan, Bijbehara, Achabal, Dialgam, Qazigund, Pahalgam Corridor",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "baramulla-sopore",
    name: "Baramulla & Sopore Sub-Division",
    sro: "SRO Baramulla (Tehsil Complex)",
    address: "Tehsil Office Compound, Old National Highway, Baramulla - 193101",
    areas: "Baramulla Civil Lines, Sopore Fruit Mandi, Delina, Pattan, Uri Belt, Tangmarg, Gulmarg Agro-Zone",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "udhampur-katra",
    name: "Udhampur & Katra Hub",
    sro: "SRO Udhampur (Mini Secretariat)",
    address: "DC Office Complex, Mini Secretariat, Dhar Road, Udhampur - 182101",
    areas: "Udhampur Town, Dhar Road, Subhash Nagar, Battal Ballian, Chenani, Katra Foothills, Reasi Belt",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Central Registration Act rules, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo at the NGDRS J&K counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset or legacy under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly recommended for senior citizens aged 60+. Certifies testamentary mental capacity, soundness, and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "NGDRS J&K Appointment Slip & e-Challan",
    detail: "Official slot booking receipt downloaded from the ngdrs.jk.gov.in portal alongside the statutory registration fee challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Municipal Property Tax / Ownership Deeds",
    detail: "Copies of Srinagar Municipal Corporation (SMC) or Jammu Municipal Corporation (JMC) assessment papers and title deeds.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Revenue Extracts (Jamabandi & Khasra Girdawari)",
    detail: "Recent computerized revenue records for agricultural lands, saffron tracts, or apple orchards in Kashmir or Jammu divisions.",
    checked: false,
  },
];

export default function JammuAndKashmirLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("jk-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("srinagar-central");
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

  const filteredHubs = JK_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    JK_SRO_HUBS.find((h) => h.id === selectedHub) || JK_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN
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
                <span>JAMMU &amp; KASHMIR SUCCESSION &amp; ESTATE DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 60 characters (Within 30-65 chars limit) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Jammu and Kashmir: Succession Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally sound Will for your residential freeholds in Srinagar and Jammu, Dal Lake commercial hotels and houseboats, apple orchards in Sopore, and financial portfolios. Get senior advocate drafting, NGDRS J&amp;K portal booking, and Section 31 doorstep execution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your J&amp;K Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#jk-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>J&amp;K SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NGDRS J&amp;K Portal Support</span>
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
                  src="/images/will-drafting-in-jammu-and-kashmir.jpg"
                  alt="Legal Will Drafting and Property Succession in Jammu and Kashmir"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  J&amp;K Estate &amp; Orchard Succession Blueprint
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
          KEY STATS STRIP
          ========================================================================= */}
      <section className="bg-[#FAF7F0] border-b border-[#172228]/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0 text-center">
            {/* Stat 1 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                20 Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Complete UT Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                NGDRS J&amp;K
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Digital SRO Appointment
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Section 213 ISA Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Home Visits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS
          ========================================================================= */}
      <div className="block lg:hidden sticky top-0 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
        <div className="relative max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMobileTocOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs font-bold text-slate-800 cursor-pointer"
            aria-expanded={mobileTocOpen}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#C65378] font-bold">
                JUMP TO:
              </span>
              <span className="truncate text-slate-900 font-extrabold text-xs">
                {currentActiveToc.label}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
              }`}
            />
          </button>

          {mobileTocOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-3 z-40 max-h-[60vh] overflow-y-auto space-y-1">
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
                      className={`mr-2.5 ${
                        isActive ? "w-4 h-[1.5px] bg-[#C65378]" : "w-2.5 h-[1px] bg-slate-300"
                      }`}
                    />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER: 2-COLUMN (DESKTOP STICKY MINIMALIST TOC + EDITORIAL CONTENT)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-12">

          {/* DESKTOP VIEW: STICKY SIDEBAR TABLE OF CONTENTS */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]">
              <nav className="space-y-3.5">
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
                      className="group flex items-center text-[11px] font-mono tracking-[0.14em] uppercase transition-all cursor-pointer"
                    >
                      <span
                        className={`transition-all mr-2.5 rounded-full ${
                          isActive
                            ? "w-6 h-[1.5px] bg-[#C65378]"
                            : "w-3.5 h-[1px] bg-slate-300 group-hover:w-5 group-hover:bg-slate-500"
                        }`}
                      />
                      <span
                        className={`transition-colors ${
                          isActive
                            ? "text-[#C65378] font-bold"
                            : "text-slate-600 group-hover:text-slate-900 font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="jk-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>JAMMU &amp; KASHMIR ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Succession in Jammu &amp; Kashmir
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two witnesses is valid, but official Book III registration via NGDRS J&amp;K gives unmatched authenticity against challenges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Jammu and Kashmir lies outside historical presidency towns. Under Section 213 of the Indian Succession Act, court probate is non-compulsory, allowing direct title transfer and municipal mutation with a registered Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Central Acts Applicable</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Post the Jammu and Kashmir Reorganisation Act, 2019, central statutory frameworks including the Indian Succession Act, 1925 and the Registration Act, 1908 apply uniformly across all 20 districts of the Union Territory.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>SMC, JMC &amp; Orchard Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites mutation with municipal corporations in Srinagar and Jammu, and streamlines land revenue mutation (Intiqal) for apple and walnut orchards before the Tehsildar.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="jk-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Jammu &amp; Kashmir
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning and testamentary succession across Jammu and Kashmir are governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Jammu and Kashmir Reorganisation Act, 2019</strong>. Any individual of sound mind can legally bequeath self-acquired residential real estate, commercial hotels, agricultural orchards, and financial investments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Indian Succession Act 1925</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Following the 2019 Reorganisation Act, the Indian Succession Act 1925 governs testamentary disposition for Hindus, Sikhs, Buddhists, Jains, and Christians across J&amp;K, ensuring complete testamentary freedom over self-acquired assets.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Muslim Personal Law (Shariat)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For Muslim testators, testamentary bequests are guided by Shariat principles. A testator may bequeath up to one-third (1/3) of net assets to non-heirs; bequests exceeding one-third or in favor of legal heirs require consent of all remaining heirs after death.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-base text-slate-900">J&amp;K Land Revenue Laws</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the Jammu &amp; Kashmir Land Revenue Act, Samvat 1996 and Agrarian Reforms regulations, mutation (Intiqal) of apple orchards, walnut groves, and agricultural farmlands requires registered testamentary documentation for smooth revenue entry.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ADVISORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Jammu &amp; Kashmir?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a Will is legally optional throughout Jammu and Kashmir. An unregistered Will signed on plain white paper before two independent witnesses is recognized by courts. However, official registration through NGDRS J&amp;K provides crucial legal safeguards.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-3.5 sm:p-4 font-extrabold">Evaluation Factor</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-amber-900 bg-amber-50/50">Unregistered Will in J&amp;K</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-900 bg-emerald-50/50">Registered Will (Book III SRO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Legal Validity</td>
                      <td className="p-3.5 sm:p-4 bg-amber-50/20">Valid if attested by two witnesses</td>
                      <td className="p-3.5 sm:p-4 bg-emerald-50/20 font-semibold text-emerald-800">Presumed authentic under Section 114 BSA</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">SMC &amp; JMC Mutation</td>
                      <td className="p-3.5 sm:p-4 bg-amber-50/20">Requires indemnity bonds &amp; family NOCs</td>
                      <td className="p-3.5 sm:p-4 bg-emerald-50/20 font-semibold text-emerald-800">Direct mutation on property tax registers</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Revenue Mutation (Intiqal)</td>
                      <td className="p-3.5 sm:p-4 bg-amber-50/20">High risk of objection by disinherited heirs</td>
                      <td className="p-3.5 sm:p-4 bg-emerald-50/20 font-semibold text-emerald-800">Smooth Patwari &amp; Tehsildar verification</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Tampering &amp; Loss Risk</td>
                      <td className="p-3.5 sm:p-4 bg-amber-50/20">Susceptible to theft, misplacement, or destruction</td>
                      <td className="p-3.5 sm:p-4 bg-emerald-50/20 font-semibold text-emerald-800">Permanent archival in government Book III custody</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Bank &amp; Demat Transmission</td>
                      <td className="p-3.5 sm:p-4 bg-amber-50/20">Banks may demand succession certificates</td>
                      <td className="p-3.5 sm:p-4 bg-emerald-50/20 font-semibold text-emerald-800">Fast-track asset release by J&amp;K Bank, SBI, PNB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="jk-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. J&amp;K Probate Law: High Court Exemption &amp; Succession Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, obtaining court probate is compulsory only for Wills executed within or concerning immovable properties located in the historical presidency towns of Mumbai, Kolkata, and Chennai. The <strong>High Court of Jammu &amp; Kashmir and Ladakh</strong> has affirmed that probate is strictly non-compulsory in J&amp;K.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      No Compulsory Probate for J&amp;K Properties
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Neither the Srinagar Municipal Corporation, Jammu Municipal Corporation, nor local revenue Tehsildars can insist on probate before substituting names of beneficiaries under a validly executed and registered Will.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      When Is Voluntary Probate Beneficial?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      While not mandatory, testators bequeathing high-value commercial properties along Boulevard Road, large industrial units in SIDCO estates, or estates with estranged legal heirs may opt for voluntary probate to obtain a conclusive court decree binding the entire world.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="jk-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. J&amp;K Sub-Registrar Offices: NGDRS Registration Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across the Union Territory of Jammu and Kashmir is conducted through the National Generic Document Registration System (NGDRS J&amp;K). Explore key Sub-Registrar Offices serving both Kashmir and Jammu divisions:
                </p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search SRO by area or district (e.g., Srinagar, Jammu, Anantnag, Baramulla)..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#C65378] transition-colors text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* SRO SELECTOR BUTTONS */}
              <div className="flex flex-wrap gap-2">
                {filteredHubs.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedHub === hub.id
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {hub.name}
                  </button>
                ))}
              </div>

              {/* ACTIVE SRO CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C65378] font-bold">
                      OFFICIAL REGISTRATION VENUE
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {activeHubData.sro}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 self-start">
                    <Check className="w-3.5 h-3.5" />
                    NGDRS J&amp;K Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      Physical Address
                    </span>
                    <p className="text-slate-700 font-medium">{activeHubData.address}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      Operating Hours
                    </span>
                    <p className="text-slate-700 font-medium">{activeHubData.timings}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-1.5">
                    Areas &amp; Micro-Markets Served
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES IN JAMMU & KASHMIR */}
            <section id="jk-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ASSET NUANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Will Drafting Across Jammu &amp; Kashmir
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Jammu and Kashmir encompass urban freeholds in Srinagar and Jammu, commercial hotels and Dal Lake houseboats, world-famous apple orchards in Sopore and Shopian, saffron fields in Pampore, and industrial units in Bari Brahmana and Rangreth. Our legal team provides customized drafting and NGDRS J&amp;K coordination across all regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: SRINAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Summer Capital Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Srinagar Central &amp; North
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Srinagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lal Chowk</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajbagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hazratbal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Boulevard Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Srinagar</strong> for freehold bungalows, heritage residences in Rajbagh, commercial showrooms along Residency Road, and houseboats on Dal Lake. Formulates clear inheritance shares, executor appointments, and smooth Srinagar Municipal Corporation (SMC) mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Tankipora</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NGDRS J&amp;K appointment scheduling, advocate physical accompaniment, and Section 31 home visits for elderly testators.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Ad-Valorem Duty · Flat Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Srinagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Srinagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: JAMMU */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Winter Capital Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jammu South &amp; North
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jammu
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandhi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Channi Himmat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trikuta Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bahu Plaza</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Janipur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Jammu</strong> for residential bungalows, commercial spaces in Bahu Plaza, and Jammu Development Authority (JDA) leaseholds. Protects equal inheritance rights, incorporates bank locker nominations, and accelerates JMC property tax substitution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Rail Head Complex &amp; Janipur Courts</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Dedicated advocate support for high-net-worth estate planning, NGDRS slot reservation, and doorstep biometrics.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Residential &amp; Commercial</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jammu"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jammu Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: ANANTNAG */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Kashmir Agro-Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Anantnag
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Anantnag
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KP Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mattan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bijbehara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Achabal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dialgam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Anantnag</strong> for commercial establishments, apple orchards, and ancestral residential homes. Provides legally verified parcel descriptions under the J&amp;K Land Revenue Act, ensuring unambiguous revenue mutation (Intiqal) before the Tehsildar.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat, KP Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sub-Registrar slot booking on NGDRS J&amp;K, agricultural parcel mapping, and dispute prevention clauses.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Apple Orchards &amp; Farmland</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Anantnag"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Anantnag Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: BARAMULLA & SOPORE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Kashmir Trade Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Baramulla &amp; Sopore
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Baramulla &amp; Sopore
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sopore Fruit Mandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baramulla Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Delina</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pattan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tangmarg</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Trusted <strong>Will drafting services in Baramulla and Sopore</strong> for major fruit orchardists, cold storage operators, and commercial trade entities. Formulates succession plans that maintain business continuity and prevent land partition disputes among multiple generations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Office Complex, Baramulla</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Horticultural asset scheduling, business partnership succession, and NGDRS J&amp;K registration support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Fruit Mandi &amp; Orchards</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Baramulla"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Baramulla Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: UDHAMPUR & KATRA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Foothills Commercial Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Udhampur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Udhampur &amp; Katra
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Udhampur Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katra Foothills</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dhar Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Battal Ballian</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chenani</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Professional <strong>Will drafting services in Udhampur and Katra</strong> for commercial hotels, guesthouses catering to Vaishno Devi pilgrims, and highway roadside commercial assets. Protects business continuity and secures family wealth distribution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat, Dhar Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Hospitality asset structuring, executor appointment, and complete NGDRS J&amp;K compliance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Hotels &amp; Commercial</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Udhampur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Udhampur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: KATHUA & SAMBA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial Gateway Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kathua &amp; Samba
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kathua &amp; Samba
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bari Brahmana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Samba Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kathua Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Govindsar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vijaypur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Kathua and Samba</strong> for SICOP and SIDCO industrial leaseholds, factory units, agricultural lands, and residential properties. Ensures uninterrupted factory operations and unambiguous share allocations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complexes, Kathua &amp; Samba</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Industrial lease transfer clauses, manufacturing asset planning, and Sub-Registrar accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Industrial &amp; Manufacturing</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kathua"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kathua Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: PULWAMA & SHOPIAN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Saffron &amp; Apple Heart
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pulwama &amp; Shopian
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pulwama &amp; Shopian
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pampore Saffron Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shopian Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Awantipora</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tral</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajpora</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized agricultural <strong>Will drafting in Pulwama and Shopian</strong> for protected saffron cultivation lands and high-density apple orchards. Ensures revenue partition compliance under the J&amp;K Agrarian Reforms Act and preserves family legacy.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil &amp; Mini Secretariat Complexes</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Saffron land succession clauses, orchard demarcation mapping, and NGDRS J&amp;K booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Saffron Fields &amp; Orchards</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pulwama"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pulwama Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: RAJOURI & POONCH */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Pir Panjal Regional Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Rajouri &amp; Poonch
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Rajouri &amp; Poonch
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajouri Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Poonch City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nowshera</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Surankote</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mendhar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Regional <strong>Will drafting in Rajouri and Poonch</strong> for town residential houses, commercial retail businesses, and terraced farmlands across the Pir Panjal range. Ensures airtight succession and prevents multi-party civil litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Court &amp; Tehsil Compounds</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Terraced agricultural land bequests, family trust clauses, and NGDRS J&amp;K appointment handling.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Town Houses &amp; Farmland</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Rajouri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Rajouri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP BY STEP SOP */}
            <section id="step-by-step-jk-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to NGDRS Registration in J&amp;K
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Executing an enforceable Will in Jammu and Kashmir follows five standardized procedural milestones from asset collation to Book III SRO biometric thumbprinting:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset Mapping &amp; Executor Nomination
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a detailed schedule of all immovable properties (Srinagar/Jammu houses, orchards, hotels) with survey and Khasra numbers, alongside movable wealth (J&amp;K Bank deposits, demat shares, gold). Nominate an executor of sound integrity to administer the estate.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Drafting Statutory Clauses &amp; Doctor Certification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft customized legal clauses under the Indian Succession Act 1925 or Muslim Personal Law, including unambiguous share allocations, survivorship clauses, and revocation of prior wills. Senior citizens should procure an MBBS doctor fitness certificate certifying testamentary capacity.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Execution Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on plain white A4 paper. The testator signs or affixes thumbprints at the foot of each page in the simultaneous presence of two independent adult witnesses who sign as attesting witnesses under Section 63 of the Indian Succession Act.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      NGDRS J&amp;K Data Entry &amp; Slot Reservation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Upload party details, draft document, and witness identities onto the NGDRS J&amp;K portal (ngdrs.jk.gov.in). Generate the government e-Challan for the statutory registration and scanning fee, and reserve a confirmed time slot at your designated SRO.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometrics &amp; Book III Archival at SRO
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Attend the Sub-Registrar counter with both witnesses carrying original Aadhaar cards. Complete electronic fingerprinting and live web-camera photography. The Sub-Registrar enters the Will into Book III government archives and issues the registered document.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration for Senior Citizens
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 31 of the Registration Act, 1908, elderly, bedridden, or hospitalized testators residing across Jammu and Kashmir are legally entitled to request doorstep registration. An authorized Sub-Registrar visits your private residence or healthcare facility.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <div className="text-[#C65378] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Step 1: Medical Certificate</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Obtain a medical certificate from a registered MBBS/MD physician certifying that the testator is physically unable to travel to the SRO counter while affirming full testamentary mental lucidity.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[#C65378] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Step 2: SRO Home Petition</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Submit an application under Section 31 to the relevant Sub-Registrar in Srinagar, Jammu, or district headquarters, paying the prescribed official home visit conveyance fee.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[#C65378] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Step 3: Doorstep Biometrics</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The Sub-Registrar attends your residence with portable biometric hardware, records thumbprints and live photographs of the testator and two witnesses, and registers the Will.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>CHECKLIST &amp; PREREQUISITES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for J&amp;K Sub-Registrar Offices
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive document preparation checklist for your NGDRS J&amp;K Sub-Registrar appointment. Check items off as you prepare:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Ready: {checkedCount} of {checklist.length} Documents</span>
                  <span className="text-[#C65378]">{Math.round((checkedCount / checklist.length) * 100)}% Completed</span>
                </div>

                <div className="space-y-2.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200"
                          : "bg-slate-50/50 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "bg-white border-slate-300"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                          {item.label}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="jk-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Trees className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. J&amp;K Property Types: Freeholds, Apple Orchards &amp; Hotels
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Jammu and Kashmir presents a diverse portfolio of asset classes. Here is how distinct property holdings are bequeathed and legally transferred under an enforceable Will:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Residential Freeholds &amp; Flats
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Private bungalows, SDA plots, JDA colony houses, and residential apartments. Upon presenting the registered Will, municipal corporations (SMC &amp; JMC) update property tax records without requiring succession certificates.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center">
                    <Trees className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Apple &amp; Walnut Orchards
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agricultural orchards in Shopian, Sopore, Baramulla, and saffron tracts in Pampore. Bequests are recorded through revenue mutation (Intiqal) by the Tehsildar under the J&amp;K Land Revenue Act, updating Jamabandi records.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center">
                    <Hotel className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Hotels, Houseboats &amp; SIDCO Plots
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hotels along Boulevard Road, Dal Lake registered houseboats, and industrial leaseholds in SICOP/SIDCO complexes. Wills codify business share devolution and operational management continuity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="jk-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT STATUTORY LEVIES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official NGDRS J&amp;K Registration Fees &amp; Stamp Duties
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Jammu and Kashmir, testamentary Wills are completely exempt from ad-valorem stamp duty based on property market valuation. Registration fees are charged at flat government rates:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Stamp Duty
                    </span>
                    <span className="text-2xl font-black text-[#172228] block">₹0</span>
                    <span className="text-xs text-slate-600">Zero ad-valorem duty on Wills</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      SRO Registration Fee
                    </span>
                    <span className="text-2xl font-black text-[#172228] block">Flat Fee</span>
                    <span className="text-xs text-slate-600">Nominal statutory fee via e-Challan</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      NGDRS Scanning Fee
                    </span>
                    <span className="text-2xl font-black text-[#172228] block">₹100 - ₹300</span>
                    <span className="text-xs text-slate-600">Digital document scanning levy</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  Note: Fees are paid exclusively through the official NGDRS J&amp;K e-Challan government treasury gateway (ngdrs.jk.gov.in).
                </p>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in J&amp;K
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance tier suited to your estate complexity. Fixed transparent fees with zero hidden charges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Essential
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">Online Drafted Will</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">all inclusive</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Customized Will drafted by estate lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Clauses for Srinagar/Jammu residential assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Execution &amp; attestation instructions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Delivered within 24 hours via email</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Select Essential Draft
                  </Link>
                </div>

                {/* TIER 2: POPULAR */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-lg shadow-[#C65378]/10 flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    RECOMMENDED FOR FAMILIES
                  </div>

                  <div className="space-y-4 pt-1">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                        Comprehensive
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">Senior Advocate Review</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500">all inclusive</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 consultation with Senior High Court Advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Apple orchard, hotel &amp; business succession clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor mental fitness certificate format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Unlimited revisions until full satisfaction</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Select Advocate Consultation
                  </Link>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        End-to-End
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">SRO Registration Concierge</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">plus govt fee</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Complete drafting + High Court advocate vetting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>NGDRS J&amp;K portal data entry &amp; slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate accompaniment at Sub-Registrar Office</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep registration support</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Select Full SRO Concierge
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUERIES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in J&amp;K
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key statutory, registration, and succession queries concerning estate planning across Jammu and Kashmir:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          <p className="pt-3">{faq.a}</p>
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
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; J&amp;K Legal Government Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Key legislation and official government portals governing estate succession, property records, and document registration in Jammu and Kashmir:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      Indian Succession Act, 1925
                    </span>
                    <p className="text-slate-600">
                      Sections 57, 59, 63, and 213 governing testamentary capacity, attestation by two witnesses, and non-mandatory probate outside historical presidency towns.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      Registration Act, 1908
                    </span>
                    <p className="text-slate-600">
                      Section 18(e) (optional registration of wills), Section 31 (doorstep registration visits), and Section 32 (presentation before Sub-Registrar).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      J&amp;K Reorganisation Act, 2019
                    </span>
                    <p className="text-slate-600">
                      Act No. 34 of 2019 making Central Indian statutory frameworks and succession enactments applicable throughout Jammu &amp; Kashmir.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-extrabold text-slate-900 block">
                      NGDRS J&amp;K Registration Portal
                    </span>
                    <p className="text-slate-600">
                      Official portal at ngdrs.jk.gov.in for online citizen document data entry, e-challan treasury payment, and Sub-Registrar appointment scheduling.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* BOTTOM CTA CARD */}
            <section className="rounded-3xl bg-[#172228] text-white p-8 sm:p-10 relative overflow-hidden shadow-xl border border-white/10 text-center sm:text-left">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Protect Your Jammu &amp; Kashmir Legacy Today
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Prevent bitter family inheritance conflicts and ensure effortless property mutation across Srinagar, Jammu, and regional districts. Draft your legally watertight Will online with senior advocate vetting.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                  >
                    <span>Start Drafting Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#172228] rounded-3xl overflow-hidden border border-white/20 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/images/will-drafting-in-jammu-and-kashmir.jpg"
                alt="Legal Will Drafting and Property Succession in Jammu and Kashmir"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-white">
              <span className="font-bold">
                Jammu &amp; Kashmir Legal Will Drafting &amp; Succession Blueprint
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 font-bold transition-colors cursor-pointer"
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
