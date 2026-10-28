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
  Globe,
  Plane,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "kochi-overview", label: "OVERVIEW" },
  { id: "kochi-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "kochi-probate-rules", label: "PROBATE RULES" },
  { id: "christian-succession-kerala", label: "CHRISTIAN SUCCESSION" },
  { id: "gulf-nri-succession", label: "GULF NRI ESTATES" },
  { id: "kochi-sro-directory", label: "SRO DIRECTORY" },
  { id: "kochi-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-kochi-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "kochi-property-types", label: "PROPERTY TYPES" },
  { id: "kochi-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const KOCHI_DISTRICTS = [
  {
    id: "ernakulam-central",
    name: "Ernakulam Central & Marine Drive",
    sro: "SRO Ernakulam & SRO Kanayannur",
    address: "Sub-Registrar Office, Hospital Road, Near General Hospital, Marine Drive, Kochi - 682011",
    areas: "Marine Drive, Ernakulam South, MG Road, Ravipuram, High Court Junction, Broadway, Menaka, Shenoys",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "thrikkakara-kakkanad",
    name: "Kakkanad & InfoPark IT Corridor",
    sro: "SRO Thrikkakara (Kakkanad)",
    address: "Civil Station Complex, Collectorate Road, Kakkanad, Kochi - 682030",
    areas: "Kakkanad, InfoPark, SmartCity, Thrikkakara, Vazhakkala, Padamugal, Palarivattom (East), Kusumagiri",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "cochin-mattancherry",
    name: "Fort Kochi & Mattancherry",
    sro: "SRO Cochin (Mattancherry)",
    address: "Sub-Registrar Office, Bazaar Road, Mattancherry, Kochi - 682002",
    areas: "Fort Kochi, Mattancherry, Willingdon Island, Thoppumpady, Palluruthy, Kumbalangi, Chellanam",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "tripunithura-maradu",
    name: "Tripunithura & Maradu",
    sro: "SRO Tripunithura",
    address: "Statue Junction, Hill Palace Road, Tripunithura, Kochi - 682301",
    areas: "Tripunithura, Maradu, Kundannoor, Nettoor, Eroor, Karingachira, Udayamperoor, Chottanikkara",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "panampilly-kadavanthra",
    name: "Panampilly Nagar & Kadavanthra",
    sro: "SRO Ernakulam & SRO Tripunithura",
    address: "Hospital Road, Park Avenue, Ernakulam & Mini Civil Station, Tripunithura",
    areas: "Panampilly Nagar, Kadavanthra, Girinagar, Thevara, Gandhi Nagar, Vyttila, SA Road, Elamkulam",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "edappally-kalamassery",
    name: "Edappally & Kalamassery",
    sro: "SRO Edappally & SRO Kalamassery",
    address: "NH 66, Near Toll Gate, Edappally & Premier Junction, Kalamassery, Kochi - 682024",
    areas: "Edappally, Lulu Mall Zone, Kalamassery, HMT Colony, CUSAT Campus, Palarivattom, Mamangalam",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "aluva-periyar",
    name: "Aluva & Periyar Basin",
    sro: "SRO Aluva & SRO Chengamanad",
    address: "Mini Civil Station, Bank Road, Periyar Riverbank, Aluva - 683101",
    areas: "Aluva Town, Bank Junction, Thottakkattukara, Desom, Choornikkara, Edathala, UC College",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "angamaly-nedumbassery",
    name: "Angamaly & Airport Corridor",
    sro: "SRO Angamaly",
    address: "TB Road, Near KSRTC Bus Stand, Angamaly - 683572",
    areas: "Angamaly Town, Nedumbassery, Kalady, Karukutty, Mookkannoor, CIAL Cochin Airport Zone",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "north-paravur-vypin",
    name: "North Paravur & Goshree Islands",
    sro: "SRO North Paravur & SRO Njarackal",
    address: "Taluk Office Compound, North Paravur & Vypin Island, Kochi",
    areas: "North Paravur, Vypin Island, Njarackal, Cherai, Bolgatty, Mulavukad, Varapuzha, Eloor",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
  {
    id: "perumbavoor-muvattupuzha",
    name: "Perumbavoor & Muvattupuzha",
    sro: "SRO Perumbavoor & SRO Muvattupuzha",
    address: "Mini Civil Station, AM Road, Perumbavoor & Revenue Tower, Muvattupuzha",
    areas: "Perumbavoor, Kothamangalam, Muvattupuzha, Piravom, Kolenchery, Kuruppampady, Valayanchirangara",
    timings: "10:00 AM to 5:00 PM (Monday to Saturday, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on standard white A4 sheets. No expensive stamp paper is required under Kerala law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Required for biometric identity verification and digital photograph capture at the Kerala SRO.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Indian Passport for Gulf NRIs",
    detail: "Vital identity proof for Non-Resident Indians owning property across Kakkanad, Panampilly Nagar, or Aluva.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Two Independent Adult Witnesses with IDs",
    detail: "Witnesses must carry original Aadhaar or Voter ID. They must not be beneficiaries under the Will.",
    checked: true,
  },
  {
    id: "item-5",
    label: "Land Tax Receipt & Thandapper Number",
    detail: "Recent land tax receipt from the Village Office to ensure accurate property identification and Pokkuvaravu.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Title Deeds (Aadheeram / Prior Deeds)",
    detail: "Registered sale deed, partition deed, or GCDA allotment letter to extract exact survey numbers and boundaries.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Doctor Medical Capacity Certificate",
    detail: "MBBS medical certificate confirming sound mind, mandatory for testators aged 60+ or home visits.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Kerala PEARLS e-Token Appointment Slip",
    detail: "Official appointment booking confirmation downloaded from the keralaregistration.gov.in portal.",
    checked: false,
  },
];

export default function KochiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("kochi-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ernakulam-central");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
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
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const handleStartDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
      }
      return;
    }
    router.push("/start");
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const filteredDistricts = KOCHI_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    KOCHI_DISTRICTS.find((d) => d.id === selectedDistrict) || KOCHI_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (FULLY VISIBLE 16:9 IMAGE)
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
                <span>KOCHI &amp; GULF NRI SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Kochi: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your Kochi waterfront flats, ancestral Purayidom plots, and bank savings.
                Get expert advocate drafting, Christian inheritance guidance, PEARLS registration support, and doorstep execution across Ernakulam.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Kochi Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#kochi-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Ernakulam SRO Directory</span>
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
                  <span>₹0 Kerala Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS - 100% VISIBLE ON MOBILE & DESKTOP) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-kochi-og.jpg"
                  alt="Online Will Drafting and NRI Succession Support in Kochi Ernakulam"
                  width={1200} height={675}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="absolute inset-0 w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
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
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                14+ SROs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Ernakulam SRO Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Kerala Stamp Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Presidency Town Rules
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Home Visits for Seniors
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
            <section id="kochi-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>KOCHI &amp; ERNAKULAM SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Kochi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Kerala under Section 18(e) of the Registration Act, 1908. An unregistered Will on plain white paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kochi is a non-presidency town under the Kerala High Court. Probate is not mandatory in Kerala under Section 213 of the Indian Succession Act, enabling direct revenue title mutation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur ₹0 stamp duty in Kerala. At the local Sub-Registrar Office, testators pay only a flat nominal registration fee of ₹1,000 and scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Swift Village Pokkuvaravu</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering your Will speeds up ownership substitution (Pokkuvaravu) at Village Offices and facilitates immediate property tax transfer in Kochi Municipal Corporation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="kochi-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Succession Framework in Kochi
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate succession in Kochi and Ernakulam is governed primarily by the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>.
                  Any individual of sound mind who has attained the age of majority can execute a Will to dispose of their self-acquired real estate, bank deposits, mutual funds, company shares, and jewelry.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kochi features diverse property profiles.
                  Families frequently hold luxury high-rise apartments in Marine Drive, ancestral rubber or coconut Purayidom land in Aluva, GCDA plots in Panampilly Nagar, or IT corridor villas in Kakkanad.
                  Without an unambiguous Will, estates face lengthy title delays during Village Office mutation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years of age and in sound mental health (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be executed voluntarily without coercion, family duress, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of two independent adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Non-Beneficiary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses and their spouses must not receive any gift or bequest under the Will (Section 67).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION STATUS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Ernakulam Kerala?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is completely <strong>optional</strong>.
                  An unregistered Will executed on plain white paper is legally valid in Indian courts, provided it complies with Section 63 attestation requirements.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nonetheless, in urban Kochi and across Ernakulam district, registering your Will at the Sub-Registrar Office via the PEARLS portal is strongly advised by senior lawyers.
                  Here is how a registered Will compares against an unregistered document:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Kerala SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Custody</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III government archives</td>
                      <td className="p-4 bg-slate-50/20">Private possession; risk of misplacement, fire, or theft</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Risk of Forgery Disputes</td>
                      <td className="p-4 bg-rose-50/20">Minimal. Biometric photos and thumb impressions recorded</td>
                      <td className="p-4 bg-slate-50/20">High. Relatives often claim fake signature or dementia</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Village Office Pokkuvaravu</td>
                      <td className="p-4 bg-rose-50/20">Immediate title transfer upon death certificate verification</td>
                      <td className="p-4 bg-slate-50/20">Village officers routinely demand consent affidavits from all heirs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Evidentiary Presumption</td>
                      <td className="p-4 bg-rose-50/20">Strong judicial presumption of genuine execution under Section 60</td>
                      <td className="p-4 bg-slate-50/20">Beneficiary must formally prove sound mind in civil court</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Kerala Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Nominal ₹1,000 government fee</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="kochi-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT JURISPRUDENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Kochi Probate Rules: Kerala Non-Presidency Town Law
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Homeowners and Gulf NRIs frequently inquire whether probate from the Kerala High Court or District Court is required before dealing with inherited property in Kochi.
                  Under settled Indian law, <strong>probate is not compulsory in Kerala</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925 restricts compulsory probate strictly to historical presidency towns (Mumbai, Kolkata, and Chennai).
                  Because Kochi and Ernakulam were never presidency jurisdictions, court probate is strictly optional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    General Rule: Probate Optional
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Kerala High Court Precedents
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Supreme Court of India in <em>Clarence Pais v. Union of India</em> affirmed that Christians, Hindus, and other non-presidency testators are not compelled to seek probate. A registered Will is fully operational for title transfer before Kerala revenue officers and banks.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Allows direct land mutation without high court litigation</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Exceptions: When Probate Helps
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Desirable in Ernakulam?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Filing for Letters of Administration or Probate before the District Court at Ernakulam is beneficial when non-resident siblings challenge the Will, or when commercial banks insist on court orders for substantial high-value overseas deposits.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Conclusive judgment in rem binding against all worldwide claimants</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: CHRISTIAN SUCCESSION IN KERALA */}
            <section id="christian-succession-kerala" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>CHRISTIAN INHERITANCE LAW</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Christian Succession Act: Syrian &amp; Latin Catholic Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kerala has a rich Christian heritage, with prominent Syrian Christian (Syro-Malabar, Orthodox, Jacobite, Mar Thoma) and Latin Catholic communities concentrated in Kochi, Angamaly, and Mattancherry.
                  Testamentary succession for Christians in Kerala is governed by <strong>Part V of the Indian Succession Act, 1925</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Historically, Syrian Christians in Travancore and Cochin were governed by archaic state enactments (the Travancore Christian Succession Act, 1916) which restricted daughters to a fraction of the estate.
                  In the historic verdict <strong>Mary Roy v. State of Kerala (1986)</strong>, the Supreme Court declared that these state acts lapsed in 1951, confirming equal rights for daughters under intestate succession.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    100% Testamentary Freedom
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Bequeathing Self-Acquired Assets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 59 of the Indian Succession Act, a Christian testator enjoys absolute freedom to distribute self-acquired property to any child, spouse, or charitable institution through a Will.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Spouse Protection
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Widow and Widower Share
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Without a Will, the surviving widow receives one-third of the estate, while children share two-thirds (Section 33). A Will allows you to grant life interest or absolute ownership to your spouse.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Preventing Partition Suits
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Clarifying Stridhanom Bequests
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Customary marriage gifts (stridhanom) often create bitter legal disputes among siblings after parents pass away. A registered Will explicitly specifies asset allocation, eliminating court battles.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: GULF NRIS & CROSS BORDER PLANNING */}
            <section id="gulf-nri-succession" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Globe className="w-4 h-4 text-[#C65378]" />
                  <span>OVERSEAS WEALTH &amp; NRIS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Gulf NRIs: Cross-Border Asset Planning from Abroad
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ernakulam is one of India&apos;s leading NRI hubs. Hundreds of thousands of Malayalis reside across the United Arab Emirates (Dubai, Abu Dhabi, Sharjah), Qatar, Oman, Saudi Arabia, Kuwait, the United Kingdom, and the United States while investing extensively in Kochi real estate.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Coordinating an estate across borders requires specialized legal planning to avoid conflicting succession laws between Sharia-compliant Middle Eastern regimes and Indian property statutes.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                      <Plane className="w-5 h-5 text-[#C65378]" />
                      <span>Execution from Abroad Without Travel</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      You do not need to take leave or travel to Kerala to execute a Will. Under Section 63 of the Indian Succession Act, an Indian citizen can sign their Will anywhere in the world in the presence of two witnesses. SRO registration can be finalized during your next visit.
                    </p>
                  </div>

                  <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                      <Building className="w-5 h-5 text-[#C65378]" />
                      <span>Dual Will Strategy (UAE / Gulf Assets)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      For NRIs with bank balances or properties in Dubai (DIFC) and Kochi, executing two separate Wills is the gold standard: one covering Indian immovable assets under Indian law, and another registered with the DIFC Wills Service Centre for UAE assets.
                    </p>
                  </div>

                  <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                      <Landmark className="w-5 h-5 text-[#C65378]" />
                      <span>NRE / NRO Bank &amp; Portfolio Transmission</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Nomination in NRE/FCNR fixed deposits and mutual fund portfolios makes the nominee a temporary trustee, not the absolute legal owner. A clear Will ensures swift fund repatriation to designated heirs without RBI hurdles.
                    </p>
                  </div>

                  <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                      <FileCheck className="w-5 h-5 text-[#C65378]" />
                      <span>Power of Attorney Representation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our advocate network coordinates with your family in Ernakulam, preparing POA documents and managing documentation before Village Offices, GCDA, and Cochin Corporation authorities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: ERNAKULAM SRO DIRECTORY */}
            <section id="kochi-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Ernakulam Sub-Registrar Offices: District Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ernakulam district contains more than 14 Sub-Registrar Offices under the Kerala Registration Department.
                  Under Section 32 of the Registration Act, your Will can be registered at the Sub-Registrar Office where the testator resides, or where any part of the real estate is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Kakkanad, Aluva, Panampilly)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {KOCHI_DISTRICTS.length} Ernakulam Registration Zones
                  </span>
                </div>

                {/* DISTRICT PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredDistricts.map((d, index) => {
                    const isSelected = selectedDistrict === d.id;
                    const isLastOdd =
                      filteredDistricts.length % 2 !== 0 && index === filteredDistricts.length - 1;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDistrict(d.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                        }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE DISTRICT DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        {activeDistrictData.name} Zone
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeDistrictData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Register Operational
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">SRO Office Complex:</span>
                      <p className="text-slate-600">{activeDistrictData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeDistrictData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Jurisdiction Localities Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official PEARLS Portal: <strong>keralaregistration.gov.in</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Assistance for {activeDistrictData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: AREA-WISE WILL DRAFTING IN KOCHI */}
            <section id="kochi-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Area-Wise Will Drafting Services Across Kochi Localities
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Seeking advocate-vetted <strong>Will drafting services in Marine Drive, Kakkanad, Panampilly Nagar, or Aluva</strong>? Property types across Kochi span luxury waterfront high-rises and IT corridor gated communities to ancestral rubber Purayidom plots and GCDA allotments.
                  Our senior advocates provide legally verified Will drafting, PEARLS e-token scheduling, and SRO accompaniment across all prime neighborhoods:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: MARINE DRIVE & ERNAKULAM CENTRAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Waterfront Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ernakulam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Marine Drive &amp; MG Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marine Drive Promenade</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shanmugham Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">High Court Junction</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ravipuram &amp; South Bridge</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Marine Drive</strong> for prime seafront penthouses, luxury high-rises (Puravankara, Tata Tritvam), and commercial establishments on MG Road. Probate is optional in Kerala—a registered Will provides conclusive testamentary proof for Kochi Municipal Corporation property tax mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Hospital Road, Marine Drive (SRO Ernakulam)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PEARLS portal e-token scheduling, Hospital Road SRO advocate accompaniment, and Section 31 home visits for seniors across Marine Drive.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Marine Drive"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Marine Drive Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: KAKKANAD & INFOPARK */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        IT Hub &amp; SmartCity
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Thrikkakara
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kakkanad &amp; InfoPark
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">InfoPark Phases 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">SmartCity Kochi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vazhakkala &amp; Padamugal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Station Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Kakkanad</strong> for tech leaders, software professionals, and Gulf investors owning apartments in DLF Riverside, Skyline, or Asset Homes. Includes comprehensive clauses for overseas tech stock (RSUs), startup equity, and Thrikkakara Village Office Pokkuvaravu.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station Complex, Kakkanad</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct assistance for gated apartment owners, fast PEARLS biometric slots, and independent witness arrangement.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tech Assets &amp; NRI Flats</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kakkanad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kakkanad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: PANAMPILLY NAGAR & KADAVANTHRA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ernakulam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Panampilly Nagar &amp; Kadavanthra
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panampilly Main Avenues</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Girinagar Residential Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadavanthra Junction</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandhi Nagar &amp; Thevara</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Elite <strong>Will drafting services in Panampilly Nagar</strong> and Kadavanthra for high-value independent villas, GCDA allotted plots, and prominent Syrian Christian estates. Codifies life-interest clauses for surviving spouses, doctor fitness certificates, and undivided shares to avoid litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Ernakulam &amp; Tripunithura SROs</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Section 31 doorstep registration for senior citizens, GCDA title verification, and custom Christian inheritance drafting.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">GCDA Plots &amp; Family Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Panampilly Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Panampilly Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: FORT KOCHI & MATTANCHERRY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage West Kochi
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Cochin
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Fort Kochi &amp; Mattancherry
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bazaar Road Warehouses</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Princess Street Heritage Homes</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jew Town &amp; Synagogue Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thoppumpady &amp; Palluruthy</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Fort Kochi</strong> for colonial Portuguese/Dutch heritage bungalows, spice trade commercial godowns, and Anglo-Indian and Latin Catholic estates. Resolves intricate joint-ownership and prior-deed succession challenges under Kerala revenue norms.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bazaar Road, Mattancherry</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Specialized heritage property succession, ancient title deed review, and Mattancherry SRO appointment scheduling.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage &amp; Commercial Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Fort Kochi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Fort Kochi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: TRIPUNITHURA & MARADU */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Backwater
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tripunithura
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tripunithura &amp; Maradu
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Statue Junction &amp; Palace Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maradu Backwater Condos</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kundannoor Junction</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nettoor &amp; Eroor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Tripunithura</strong> and Maradu for royal family heritage properties, backwater luxury apartments, and riverbank villas. Formulates strict non-dispute provisions and ensures hassle-free municipal property tax transfer.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Hill Palace Road, Tripunithura</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Maradu waterfront apartment registration support, ancestral partition validation, and Hill Palace SRO token booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Backwater &amp; Palace Properties</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tripunithura"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tripunithura Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: ALUVA & ANGAMALY AIRPORT ZONE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Ernakulam / Airport
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Aluva &amp; Angamaly
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Aluva &amp; Angamaly
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Periyar Riverbank Enclaves</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">CIAL Airport Aerotropolis</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bank Junction &amp; UC College</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kalady &amp; Karukutty</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Trusted <strong>Will drafting services in Aluva</strong> and Angamaly for large agricultural plantations, family Purayidom homesteads, and Gulf NRI residences along the Periyar. Integrates Thandapper land tax account numbers to secure immediate Village Office Pokkuvaravu.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Civil Station Aluva &amp; TB Road Angamaly</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Coordination for airport corridor landholdings, agricultural land bequests, and elderly doorstep execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plantations &amp; Airport Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Aluva"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Aluva Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP BY STEP PEARLS REGISTRATION */}
            <section id="step-by-step-kochi-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP PROCEDURE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Step-by-Step Kerala PEARLS Portal Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering your Will in Ernakulam follows a transparent online workflow managed by the Kerala Registration Department through the PEARLS portal.
                  Here is the verified 5-step standard procedure:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Drafting with Details
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      List all Kerala real estate with Village Office survey numbers, Thandapper records, bank accounts, and demat folios.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Doctor Certificate
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Procure an MBBS medical certificate for testators aged 60+ confirming sound mental capacity and consciousness.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      PEARLS e-Token
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Generate appointment token on keralaregistration.gov.in, upload witness details, and pay the nominal ₹1,000 fee.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Witness Verification
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office with two independent witnesses carrying original Aadhaar cards and passport photos.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Book III Archiving
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete biometric fingerprinting and digital photo capture. The original registered deed is scanned into Book III archives.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: SECTION 31 DOORSTEP HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP SRO REGISTRATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Section 31 Doorstep Registration for Kochi Seniors
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Senior citizens, ailing testators, or hospital-bound individuals in Kochi often find it exhausting to climb stairs at government offices or navigate busy queues.
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar has the statutory discretion to attend a person&apos;s private residence or hospital room to conduct registration.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep Will Registration Operates in Ernakulam:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Inability Certificate</strong>
                      <span className="text-slate-600">A registered MBBS medical practitioner certifies that the senior citizen is infirm or advised against road travel.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Application</strong>
                      <span className="text-slate-600">Our advocates submit the formal Section 31 commission petition before the jurisdictional Ernakulam Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Nominal Commission Fee</strong>
                      <span className="text-slate-600">A standard government travel and commission allowance (₹500 to ₹1,000) is deposited online via PEARLS.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometrics at Home</strong>
                      <span className="text-slate-600">The Sub-Registrar visits your residence or hospital (Aster Medcity, Amrita, Lakeshore) to capture biometric records.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE CHECKLIST</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Documents Checklist for Ernakulam Sub-Registrars
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Organize your necessary paperwork before heading to the Sub-Registrar office or booking your online token.
                  You have completed <strong>{checkedCount} of {checklist.length}</strong> items:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        item.checked
                          ? "bg-rose-50/50 border-rose-300 text-slate-900"
                          : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm block">
                          {item.label}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11: KOCHI PROPERTY TYPES */}
            <section id="kochi-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY SUCCESSION RULES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Kochi Property Types: GCDA, Coastal Land &amp; Villas
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession procedures in Ernakulam depend significantly on the originating allotment and title category.
                  Here is how a Will operates across diverse Kochi property types:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    GCDA &amp; GIDA Allotments
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Greater Cochin Authority Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    GCDA and Goshree Islands Development Authority (GIDA) require a registered Will to re-allot residential plots in Panampilly Nagar or Marine Drive without requiring full legal heirship certificates.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Waterfront Apartments
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    High-Rise Societies &amp; Condos
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Common in Kakkanad, Maradu, and Marine Drive. Wills must explicitly define undivided impartible rights in the common land and car parking slots to prevent disputes with housing associations.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Purayidom &amp; Plantations
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Ancestral Compounds &amp; Rubber
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ancestral family compounds across Aluva, Angamaly, and North Paravur require precise boundary schedules and Thandapper references to ensure seamless Pokkuvaravu at local Village Offices.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: REGISTRATION FEES */}
            <section id="kochi-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL CHARGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Official Kerala Registration Fees &amp; Nominal Duty
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property conveyance deeds that incur 8% stamp duty plus 2% registration charges in Kerala, Wills are 100% exempt from ad valorem stamp duty under the Kerala Stamp Act, 1959.
                  Government charges for registering a Will across Ernakulam are strictly nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Official Amount</th>
                      <th className="p-4 font-bold">Payable To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Kerala Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Kerala</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Kerala SRO Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹1,000 (Flat Nominal Fee)</td>
                      <td className="p-4">Registration Department / PEARLS Portal</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Pasting</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">Sub-Registrar Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Home Visit Commission</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Doorstep Commission Official Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 13: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>PLANS &amp; PRICING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Transparent Will Packages &amp; Kochi Advocate Pricing
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal assistance tailored to your family estate and cross-border NRI requirements in Kochi:
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
                      Ideal for simple estates with residential flats, bank accounts, and mutual funds.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Kochi Will generator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted statutory clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; signing guide</span>
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
                    Most Popular for Kochi &amp; NRIs
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Advocate &amp; NRI Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior Kerala High Court advocate consultation for Christian succession, Gulf NRIs, and multiple properties.
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
                        <span>Christian succession &amp; NRI asset clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor advisory &amp; witness vetting</span>
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
                      Full end-to-end registration assistance at any of Ernakulam&apos;s Sub-Registrar offices.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>PEARLS online e-token slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends at Kerala SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Registered Book III deed collection</span>
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

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Frequently Asked Questions: Kochi &amp; NRI Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Straightforward answers to frequently asked legal questions regarding Will drafting and registration in Kochi and Kerala:
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

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  15. Statutory References &amp; Kerala Registration Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate planning and drafting protocols strictly comply with codified Indian legislation and official Kerala government portals:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 62, 63, Part V (Christian Succession), and Section 213 (Non-Presidency Rules).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration) and Section 31 (Doorstep Commission).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Kerala PEARLS Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Registration Department portal: <code>keralaregistration.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Supreme Court Precedent
                  </span>
                  <p className="text-xs text-slate-600">
                    <em>Mary Roy v. State of Kerala (1986)</em> and <em>Clarence Pais (2001)</em>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Kochi Assets &amp; Family Heritage Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Kochi real estate and NRI investments to lengthy revenue court delays.
                Draft a legally binding Will online in minutes or consult our senior Kerala estate advocates.
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
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20"
                >
                  Schedule Advocate Consultation
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION VISUAL BLUEPRINT MODAL (100% VISIBLE ON MOBILE & DESKTOP)
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
                Visual Blueprint: Kochi &amp; Ernakulam Will Drafting &amp; Succession Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-kochi-og.jpg"
                alt="High Resolution Visual Blueprint: Kochi Will Drafting and PEARLS Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
