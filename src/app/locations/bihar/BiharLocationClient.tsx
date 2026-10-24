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
  { id: "bihar-overview", label: "OVERVIEW" },
  { id: "bihar-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "bihar-probate-rules", label: "PROBATE RULES" },
  { id: "bihar-sro-directory", label: "SRO DIRECTORY" },
  { id: "bihar-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-bihar-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "bihar-property-types", label: "PROPERTY TYPES" },
  { id: "bihar-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const BIHAR_SRO_HUBS = [
  {
    id: "patna-sadar",
    name: "Patna Sadar (Kutchery Compound)",
    sro: "District Registry Office Patna Sadar",
    address: "District Registration Office, Kutchery Compound, Near Gandhi Maidan, Patna - 800001",
    areas: "Boring Road, Bailey Road, Kankarbagh, Rajendra Nagar, Gandhi Maidan, Fraser Road, Exhibition Road, Patliputra",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "danapur",
    name: "Danapur Sub-Division (Danapur Cantt)",
    sro: "Sub-Divisional Registry Office Danapur",
    address: "Sub-Divisional Registry Office, Near Danapur Bus Stand, Danapur Cantt, Patna - 801503",
    areas: "Danapur, Saguna More, Khagaul, RPS More, Gola Road, Bihta, Maner, Shahpur",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "gaya-sadar",
    name: "Gaya Sadar (Civil Lines)",
    sro: "District Registration Office Gaya",
    address: "District Registration Office, Collectorate Parisar, Civil Lines, Gaya - 823001",
    areas: "Civil Lines, AP Colony, Bodh Gaya, Delha, Manpur, Rampur, Tekari, Sherghati",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "muzaffarpur-sadar",
    name: "Muzaffarpur Sadar (Company Bagh)",
    sro: "District Sub-Registrar Office Muzaffarpur",
    address: "District Sub-Registrar Office, Company Bagh Road, Muzaffarpur - 842001",
    areas: "Motijheel, Mithanpura, Sutapatti, Maripur, Ahiyapur, Gobarsahi, Kanti, Saraiya",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "bhagalpur-sadar",
    name: "Bhagalpur Sadar (Kachhari Parisar)",
    sro: "District Registry Office Bhagalpur",
    address: "District Registry Office, Kachhari Parisar, Tilka Manjhi, Bhagalpur - 812001",
    areas: "Tilka Manjhi, Barari, Sabour, Aliganj, Nathnagar, Zero Mile, Kahalgaon, Sultanganj",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "darbhanga-sadar",
    name: "Darbhanga Sadar (Laheriasarai)",
    sro: "District Sub-Registrar Office Darbhanga",
    address: "District Sub-Registrar Office, Collectorate Compound, Laheriasarai, Darbhanga - 846001",
    areas: "Laheriasarai, Tower Chowk, Benta, Allalpatti, Donar, Baheri, Benipur, Keoti",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "purnia-sadar",
    name: "Purnia Sadar (Court Compound)",
    sro: "District Registry Office Purnia",
    address: "District Registry Office, Court Compound, Near Zila School, Purnia - 854301",
    areas: "Line Bazar, Bhatta Bazar, Gulabbagh, Rambagh, Kasba, Banmankhi, Dagarua",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "begusarai-sadar",
    name: "Begusarai Sadar (Pokhariya)",
    sro: "District Registration Office Begusarai",
    address: "District Registration Office, Near Pokhariya Overbridge, Begusarai - 851101",
    areas: "Harrakh, Pokhariya, Barauni, Refinery Township, Teghra, Bakhri, Ballia, Sahebpur Kamal",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Print on plain A4 sheets. Under Bihar rules, stamp paper is not needed.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Needed for ID check, thumbprints, and digital photos at the registry office.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs. Witnesses must not receive any gift under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Recommended for elders aged 60+. Confirms sound mind and clear thinking.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Bihar e-Nibandhan Appointment Slip & Fee Challan",
    detail: "Download this receipt from biharregservices.gov.in after paying the online fee.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Bihar Bhumi Dakhil Kharij / Jamabandi & Khatiyan Copies",
    detail: "Attach land records, Register-II details, or Khatiyan papers for your farm land.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Parivarik Bantwara / Batwaranama / Vanshavali Details",
    detail: "Family lineage tree or recorded partition deed that clarifies your separate share.",
    checked: false,
  },
];

export default function BiharLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("bihar-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("patna-sadar");
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

  const filteredHubs = BIHAR_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    BIHAR_SRO_HUBS.find((h) => h.id === selectedHub) || BIHAR_SRO_HUBS[0];

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
                <span>BIHAR LAND &amp; ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Bihar: Land Succession Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally valid Will for your flats, shops, and ancestral farmland in Bihar. Get advocate drafting, Bihar e-Nibandhan portal appointment booking, and full Bihar Bhumi Dakhil Kharij protection.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Bihar Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#bihar-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Bihar SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Patna HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Bihar Stamp Duty</span>
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
                  src="/images/will-drafting-in-bihar.jpg"
                  alt="Online Will Drafting and Land Succession Services in Bihar"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Bihar Urban &amp; Land Succession Blueprint
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
          MOBILE VIEW ONLY: DROPDOWN TABLE OF CONTENTS (HIDDEN ON DESKTOP)
          ========================================================================= */}
      <div className="block lg:hidden sticky top-16 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
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
          MAIN EDITORIAL CONTAINER WITH SIDEBAR (NASHIK THEME)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* DESKTOP STICKY SIDEBAR (320px) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-36 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                    Bihar Navigation
                  </span>
                </div>
                <nav className="space-y-1">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl text-xs transition-all ${
                        activeId === item.id
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* QUICK CTA CARD */}
              <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-[#2B3B42] text-white p-5 shadow-md space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Verified Legal Service
                </span>
                <h4 className="font-extrabold text-sm text-white leading-snug">
                  Protect Your Bihar Ancestral Land &amp; Property
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Draft a clear Will online in 15 minutes. Avoid painful court disputes and delayed Dakhil Kharij.
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="block w-full text-center py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-xs"
                >
                  Start Will Drafting
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="bihar-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>BIHAR ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Bihar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. A plain paper Will signed before two witnesses is valid. Registering your Will in Book III gives permanent proof against family disputes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Bihar is not a presidency town. Under Section 213 of the Indian Succession Act, court probate is optional in Bihar. You can transfer property directly with a registered Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Bihar Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from stamp duty across Bihar. You pay only a small ₹100 registration fee plus scanning charges at your Sub-Registrar Office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Bihar Bhumi Dakhil Kharij</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will helps you get fast land mutation on the Bihar Bhumi portal. Circle Officers use registered Wills to update Jamabandi records without civil court cases.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="bihar-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>INDIAN SUCCESSION ACT &amp; BIHAR LAWS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Land Succession in Bihar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a Will in Bihar protects both city homes and ancestral farm plots. Testamentary succession follows the Indian Succession Act, 1925 and the Bihar Land Mutation Act, 2011. Here are three key legal rules you must know:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 59: Testamentary Capacity
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Any adult of sound mind can make a Will in Bihar. This includes senior citizens with ancestral land or city flats. A doctor fitness certificate proves clear mental health and stops false claims.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 63: Two Witnesses Rule
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must sign your Will before two adult witnesses. The witnesses must watch you sign. Witnesses must not receive any land, money, or property in the Will.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Bihar Bhumi Mutation Alignment
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A good Bihar Will clearly lists your Thana number, Khata, Khesra (Plot), and Jamabandi details. This helps the Circle Officer approve online Dakhil Kharij quickly.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT 1908 ANALYSIS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Bihar?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Section 18(e) of the Registration Act, 1908 makes Will registration optional in Bihar. A Will on plain paper with two witness signatures is legally valid. However, an unregistered Will often faces objections during land mutation before the Circle Officer. Registering your Will gives permanent safety.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-4 font-extrabold">Succession Parameter</th>
                      <th className="p-4 font-extrabold text-slate-500">Unregistered Will</th>
                      <th className="p-4 font-extrabold text-[#C65378]">Registered Will (Book III)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Legal Validity</td>
                      <td className="p-4">Valid under Section 63 Indian Succession Act</td>
                      <td className="p-4 font-bold text-emerald-700">Valid with strong legal presumption</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Bihar Bhumi Dakhil Kharij</td>
                      <td className="p-4">Frequent objections by Circle Officers and co-heirs</td>
                      <td className="p-4 font-bold text-emerald-700">Direct mutation under Bihar Land Mutation Act</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Tampering &amp; Loss Risk</td>
                      <td className="p-4">Risk of loss, damage, or theft</td>
                      <td className="p-4 font-bold text-emerald-700">Safe in government Book III custody</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Patna Municipal Corporation</td>
                      <td className="p-4">Requires court succession certificates</td>
                      <td className="p-4 font-bold text-emerald-700">Quick name change on property tax records</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Official Govt Fee</td>
                      <td className="p-4">₹0 (Free on plain paper)</td>
                      <td className="p-4 font-bold text-emerald-700">₹100 flat fee plus small scanning charge</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE JURISDICTION */}
            <section id="bihar-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>PATNA HIGH COURT JURISPRUDENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Bihar Probate Law: Optional Under Patna High Court
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate means getting a court order to confirm a Will. Many property owners in Bihar think probate is required before land transfer. This is not true. Here is how probate works in Bihar:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Section 213 ISA: Non-Presidency Exemption
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Why Court Probate is Optional in Bihar
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 213 of the Indian Succession Act requires probate only in Mumbai, Kolkata, and Chennai. Bihar is outside these areas. The Patna High Court has confirmed that probate is optional in Bihar. You can transfer property directly with a registered Will.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct mutation possible without High Court probate</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Voluntary Filings: High-Value Contests
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Bihar Civil Courts?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor files for probate only if family members file a court case or challenge the Will. A court probate order settles all claims for good.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Court order stops all third-party property disputes</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: BIHAR SRO DIRECTORY */}
            <section id="bihar-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Bihar Sub-Registrar Offices: SRO Jurisdiction Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Bihar runs Sub-Registrar Offices under the Registration Department. Under Section 32 of the Registration Act, you can register your Will where you live or where your property is located.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search city or locality (e.g. Patna, Danapur, Gaya)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {BIHAR_SRO_HUBS.length} Bihar Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left truncate cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SRO DETAIL CARD */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                        Selected Registration Authority
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <Check className="w-3.5 h-3.5" />
                      Bihar e-Nibandhan Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">
                        Physical Address
                      </span>
                      <p className="text-slate-800 leading-relaxed">
                        {activeHubData.address}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">
                        Key Coverage Areas
                      </span>
                      <p className="text-slate-800 leading-relaxed">
                        {activeHubData.areas}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200/60">
                    <span className="font-medium">
                      Operational Hours: {activeHubData.timings}
                    </span>
                    <a
                      href="/service/will-registration"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d]"
                    >
                      <span>Book SRO Advocate Accompaniment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES IN BIHAR (EXACT SAME TYPE AS NASHIK LOCAL AREAS) */}
            <section id="bihar-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: City-Wise Will Drafting in Bihar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Bihar include city flats along Bailey Road in Patna, family homes in Gaya, textile shops in Muzaffarpur, silk units in Bhagalpur, ancestral Mithila havelis in Darbhanga, and fertile farms across Seemanchal and Shahabad. Our estate advocates provide expert legal drafting and Sub-Registrar accompaniment across all key regional hubs:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: PATNA & DANAPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; Central Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patna Sadar &amp; Danapur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Patna &amp; Danapur Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Boring Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bailey Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kankarbagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patliputra Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Danapur Cantt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saguna More</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Patna</strong> and Danapur for city apartments, PRDA residential plots, commercial shops, and bank lockers. We handle Patna Municipal Corporation (PMC) property tax mutation, parking allocations, and demat account transfers to keep family peace.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kutchery Compound &amp; Danapur Sub-Division</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        e-Nibandhan slot booking at Patna Sadar and Danapur, advocate attendance, and Section 31 home visits for seniors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">PMC Flats &amp; Commercial Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Patna"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Patna Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: GAYA & BODH GAYA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Southern Bihar &amp; Magadh Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gaya Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gaya &amp; Bodh Gaya Heritage Zone
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AP Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bodh Gaya</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Delha</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tekari Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Gaya</strong> and Bodh Gaya for family homes, hotels, and ancestral farmland. We add clear protections for surviving spouses, divide shares cleanly between children, and ensure fast mutation on the Bihar Bhumi portal.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Parisar, Civil Lines</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Family estate planning, asset mapping, and fast Book III registration at Gaya Sadar SRO.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage Estates &amp; Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gaya"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gaya Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: MUZAFFARPUR & TIRHUT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Bihar Commercial Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Muzaffarpur Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Muzaffarpur &amp; Tirhut Region
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Motijheel</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mithanpura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sutapatti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maripur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ahiyapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gobarsahi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Complete <strong>Will drafting services in Muzaffarpur</strong> for Sutapatti textile wholesale shops, city houses under Nagar Nigam, and lychee orchards. We help business families pass assets to the next generation without messy partition suits.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Company Bagh Road, Muzaffarpur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Business estate planning, lychee land verification, and e-Nibandhan registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Wholesale &amp; Agro-Holdings</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Muzaffarpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Muzaffarpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: BHAGALPUR & ANGA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Eastern Bihar &amp; Silk City Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bhagalpur Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bhagalpur &amp; Anga Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tilka Manjhi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Barari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sabour</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nathnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aliganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Zero Mile</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable <strong>Will drafting services in Bhagalpur</strong> for Nathnagar silk weaving units, riverside homes, and fertile farms in Sabour. We help you draft clear bequests that avoid disputes among legal heirs in Khatiyan land.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kachhari Parisar, Tilka Manjhi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete SRO attendance, witness verification, and doorstep visits under Section 31.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Enterprises &amp; Gangetic Land</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bhagalpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bhagalpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: DARBHANGA & MITHILANCHAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Cultural &amp; Educational Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Darbhanga Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Darbhanga &amp; Mithilanchal
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Laheriasarai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tower Chowk</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Allalpatti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Donar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benipur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Darbhanga</strong> for Mithila ancestral havelis, townhouses, medical clinics, and makhana pond farms. We record your family lineage tree (Vanshavali) and stop informal partition disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Compound, Laheriasarai</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mithila heritage estate planning, pond fishery bequests, and safe Book III custody.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ancestral Haveli &amp; Farmland</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Darbhanga"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Darbhanga Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: PURNIA & SEEMANCHAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Eastern Gateway &amp; Agri-Trade
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Purnia Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Purnia &amp; Seemanchal Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Line Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhatta Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gulabbagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rambagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kasba</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Banmankhi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Purnia</strong> for Gulabbagh grain trading firms, Line Bazar commercial clinics, and maize farmlands across Seemanchal. We make Bihar Bhumi land mutation fast and hassle-free.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Court Compound, Near Zila School</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Agri-business estate planning, market lease transfer, and e-Nibandhan appointments.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Grain Trade &amp; Agri-Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Purnia"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Purnia Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: BEGUSARAI & BARAUNI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial Capital of Bihar
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Begusarai Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Begusarai &amp; Barauni Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Harrakh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pokhariya</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Barauni</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Refinery Township</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Teghra</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bakhri</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Focused <strong>Will drafting services in Begusarai</strong> and Barauni for industrial units, residential plots, BIADA industrial lease land, and farmland. We set clear rules for company shares, factory equipment, and homes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Near Pokhariya Overbridge</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        BIADA lease transfer clauses, industrial equity planning, and SRO execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Industrial Units &amp; Real Estate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Begusarai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Begusarai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: ARA / BHOJPUR & BUXAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Western Bihar &amp; Shahabad Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ara Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ara &amp; Bhojpur Agro-Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nawada Ara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pakri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Judge&apos;s Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Charpokhari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jagdishpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Buxar Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Solid <strong>Will drafting services in Ara</strong> and Bhojpur for canal-irrigated farmland, family havelis, and market plots. We record clear family partition terms, protect daughters&apos; rights, and help you get fast Circle Office mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Compound, Bhojpur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Canal farm record checks, family settlement terms, and e-Nibandhan registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Canal Farmland &amp; City Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ara Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-bihar-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to e-Nibandhan in Bihar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a valid Will in Bihar follows 5 simple steps. Each step protects your assets under the Indian Succession Act and Bihar Land Mutation Act:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center font-black text-sm text-[#C65378] shrink-0">
                    01
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset Mapping &amp; Khatiyan / Jamabandi Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Make a list of all your assets. For farmland, write down the Revenue Thana, Khata, Khesra, and Jamabandi numbers. For city flats, list the sale deed, municipal holding, and bank accounts.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center font-black text-sm text-[#C65378] shrink-0">
                    02
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Advocate Drafting &amp; Custom Bequest Structuring
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our advocates draft your Will with clear terms. We cancel old Wills, set clear shares for heirs, and appoint a trusted executor to handle your estate.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center font-black text-sm text-[#C65378] shrink-0">
                    03
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Physical Attestation Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print your Will on plain A4 sheets. Sign each page in front of two adult witnesses. Witnesses sign right after you. Attach a doctor certificate for seniors.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center font-black text-sm text-[#C65378] shrink-0">
                    04
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Bihar e-Nibandhan Slot Booking &amp; Fee Remittance
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Book your appointment online on biharregservices.gov.in. Pay the nominal ₹100 fee and scanning charges online. Download the appointment slip with your date and time.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center font-black text-sm text-[#C65378] shrink-0">
                    05
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO Attendance &amp; Book III Permanent Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office with your two witnesses. Our advocate helps you finish ID checks, photo capture, and thumbprints for Book III custody.
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
                  <span>DOORSTEP REGISTRATION IN BIHAR</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration in Bihar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 31 of the Registration Act, 1908, elderly or unwell citizens can register a Will from home or hospital in Bihar.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Eligibility &amp; Medical Prerequisites
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Doctor&apos;s Fitness &amp; Inability Certificate
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      An MBBS doctor issues a certificate stating the person cannot travel but has a sound mind. This protects the Will against false claims.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Official Commission Procedure
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Sub-Registrar Residence Visit
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The Sub-Registrar visits your home with portable biometric tools. They record thumbprints and digital photos right in your living room.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-3 text-xs text-slate-700">
                  <AlertTriangle className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">
                      AMA Legal Solutions Doorstep Coordination
                    </span>
                    Our legal team drafts the commission petition, liaises with the District Registrar, files the medical dossier, and coordinates the official Sub-Registrar visit to ensure complete comfort for your elderly family members.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE DOCUMENT AUDIT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for Bihar Sub-Registrar Offices
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Before going to the Sub-Registrar Office, make sure you have all required papers. Use this simple checklist to get ready:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-sm text-slate-900">
                    Testamentary Dossier Checklist
                  </span>
                  <span className="text-xs font-bold text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-slate-50/80 border-slate-200"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span
                          className={`font-bold text-xs sm:text-sm block ${
                            item.checked
                              ? "text-slate-900"
                              : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: BIHAR PROPERTY TYPES */}
            <section id="bihar-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS IN BIHAR</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Bihar Property Types: Land, Houses &amp; BIADA Plots
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A strong Will in Bihar lists every property type according to its land record and revenue rules:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Urban Apartments &amp; Municipal Houses</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Flats and houses in Patna, Gaya, Muzaffarpur, and Bhagalpur. We list sale deeds, tax numbers, and parking slots so your heirs get easy mutation.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>Ancestral Khatiyani &amp; Raiyati Farmland</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agricultural land recorded under Khatiyan surveys. A Will transfers your partitioned share with Khata, Khesra, and Jamabandi details for quick Dakhil Kharij.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Factory className="w-4 h-4 text-[#C65378]" />
                    <span>BIADA Industrial Plots &amp; Commercial Shops</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Retail shops in wholesale markets and factory lease land from BIADA. We add clauses that follow lease terms and company rules.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Financial Assets, Bank Lockers &amp; Demat Portfolios</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bank savings, fixed deposits, post office NSC, mutual funds, and demat shares. Remember: nominees act only as trustees. Your Will decides true ownership.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="bihar-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FEE BREAKDOWN</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Bihar e-Nibandhan Registration Fees
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds, testamentary Wills enjoy complete stamp duty exemption in Bihar:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-4 font-extrabold">Fee Component</th>
                      <th className="p-4 font-extrabold">Applicable Statutory Rate</th>
                      <th className="p-4 font-extrabold text-[#C65378]">Bihar Practical Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Stamp Duty</td>
                      <td className="p-4">100% Exempt (₹0)</td>
                      <td className="p-4">Wills can be executed on plain white A4 paper</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">SRO Registration Fee</td>
                      <td className="p-4">Nominal Flat Fee (Approx ₹100)</td>
                      <td className="p-4">Standard Book III registration charge under Bihar rules</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Computer Scanning Charges</td>
                      <td className="p-4">Nominal (Approx ₹100 to ₹250)</td>
                      <td className="p-4">Digital scanning and permanent Book III electronic custody</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Property Valuation Charges</td>
                      <td className="p-4">Nil (0%)</td>
                      <td className="p-4">No percentage fee based on circle rates or market value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PLANS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Fees in Bihar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance package tailored to your family&apos;s estate planning and property portfolio in Bihar:
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
                      Ideal for individual homeowners with urban flats, bank savings, and demat investments.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Bihar Will creator</span>
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
                    Most Popular in Bihar
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
                      Senior estate advocate review for ancestral Khatiyani land, multiple heirs, and urban apartments.
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
                        <span>Custom clauses for Khatiyan &amp; Dakhil Kharij</span>
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
                      End-to-end registration coordination across any Bihar Sub-Registrar Office or home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bihar e-Nibandhan portal booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends Bihar SRO</span>
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

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENT QUESTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Bihar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal answers regarding Will drafting, e-Nibandhan portal registration, probate exemptions, and land succession across Bihar:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180 text-[#C65378]" : "text-slate-400"
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
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
                  13. Statutory Citations &amp; Bihar Legal Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Bihar state registration systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213 (Non-Presidency Town Probate Exemption in Bihar).
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
                    Bihar Land Mutation Act 2011
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 3, 5, and 6 (Online Dakhil Kharij mutation procedure via Bihar Bhumi).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Bihar e-Nibandhan Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official e-appointment portal: <code>biharregservices.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Bihar Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Bihar flats, ancestral farmlands, or family businesses to lengthy partition suits and mutation gridlock. Draft a legally binding Will online today or consult our senior Patna High Court advocates.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online Now
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20"
                >
                  Book Advocate Consultation
                </a>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL
          ========================================================================= */}
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
                Visual Blueprint: Will Drafting &amp; Land Succession in Bihar
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors text-xs font-bold px-3 py-1 cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-bihar.jpg"
                alt="High Resolution Visual Blueprint: Bihar Will Drafting and SRO Registration"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Bihar e-Nibandhan Registered &amp; Bihar Bhumi Mutation Compliant</span>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="font-bold text-[#C65378] hover:underline"
              >
                Create Your Will Now &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
