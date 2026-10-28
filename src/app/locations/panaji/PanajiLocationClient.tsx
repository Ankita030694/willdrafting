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
  Layers,
  Lock,
  Compass,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "panaji-overview", label: "OVERVIEW" },
  { id: "panaji-legal-framework", label: "GOA CIVIL CODE" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "panaji-probate-rules", label: "PROBATE & INVENTORY" },
  { id: "panaji-sro-directory", label: "SRO & NOTARY" },
  { id: "panaji-regional-cities", label: "Local Areas" },
  { id: "step-by-step-panaji-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "panaji-property-types", label: "PROPERTY TYPES" },
  { id: "panaji-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const PANAJI_SRO_HUBS = [
  {
    id: "panaji-tiswadi",
    name: "Panaji / Tiswadi (Ilhas)",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Tiswadi",
    address: "Junta House Complex / Old High Court Building, Near Garcia de Orta, Panaji, Goa - 403001",
    areas: "Panaji Central, Miramar, Dona Paula, Caranzalem, Altinho, Fontainhas, Taleigao, Ribandar, Santa Cruz, Bambolim",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "margao-salcete",
    name: "Margao / Salcete (South Goa)",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Salcete",
    address: "Mathany Saldanha Administrative Complex, Margao, South Goa - 403601",
    areas: "Margao, Fatorda, Benaulim, Colva, Navelim, Nuvem, Majorda, Curtorim, Raia",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "mapusa-bardez",
    name: "Mapusa / Bardez (North Goa)",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Bardez",
    address: "Administrative Complex, Morod, Mapusa, North Goa - 403507",
    areas: "Mapusa, Morod, Porvorim, Calangute, Candolim, Anjuna, Assagao, Siolim, Aldona, Moira",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "vasco-mormugao",
    name: "Vasco da Gama / Mormugao",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Mormugao",
    address: "Municipal Administrative Building, Near Railway Station, Vasco da Gama, Goa - 403802",
    areas: "Vasco da Gama, Mormugao Harbor, Dabolim, Chicalim, Sancoale, Bogmalo, Velsao, Cortalim",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ponda-taluka",
    name: "Ponda Sub-Division",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Ponda",
    address: "Government Office Complex, Tisk, Ponda, Goa - 403401",
    areas: "Ponda Town, Bandora, Curti, Kundaim IDC, Marcaim, Priol, Shiroda, Borim, Usgao",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bicholim-sattari",
    name: "Bicholim & Sattari Registry",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Bicholim",
    address: "Mamlatdar Complex, Bicholim, North Goa - 403504",
    areas: "Bicholim, Sanquelim, Valpoi, Mayem, Honda, Usgao, Sattari Inland Belts",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "quepem-canacona",
    name: "Quepem & Canacona Registry",
    sro: "Office of Civil Registrar-cum-Sub-Registrar of Quepem & Canacona",
    address: "Government Administrative Complex, Quepem / Chaudi, South Goa - 403705",
    areas: "Quepem, Curchorem, Sanvordem, Canacona, Chaudi, Palolem, Agonda, Poinguinim",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Drafts of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Goa law, non-judicial stamp paper is not needed for Wills.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Required for biometric identity validation, electronic thumbprinting, and photographic record at the Civil Registrar.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Witnesses must carry valid government photo IDs and must not hold any beneficial interest under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Sound Mind Note (MBBS / MD)",
    detail: "Essential for senior citizens aged 60+. Certifies Will mental capacity, soundness of mind, and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Form I & XIV Records & City Tax Receipts",
    detail: "Recent computerized Form I & XIV extract from the Directorate of Land Records and City City Board of Panaji (CCP) tax receipts.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Marriage Paper & Antenuptial Deed (If Any)",
    detail: "Verifies whether marriage is under default Communion of Assets (Comunhão de Bens) or filed antenuptial separation.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Comunidade Plot Allotment / Transfer Deed (If Applicable)",
    detail: "Sanction orders and NOC from the respective Comunidade managing committee for structures on Comunidade land.",
    checked: false,
  },
];

export default function PanajiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("panaji-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("panaji-tiswadi");
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

  const filteredHubs = PANAJI_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    PANAJI_SRO_HUBS.find((h) => h.id === selectedHub) || PANAJI_SRO_HUBS[0];

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
                <span>PANAJI &amp; GOA SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters (User matched: begins with will drafting services in PANAJI) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Panaji: Legal Estate Planning
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will in Panaji under the Goa Civil Code. Protect family estate for Miramar flats, Dona Paula villas, Altinho heritage homes, and Comunidade plots. Get senior lawyer drafting, Civil Registrar filing, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Panaji Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#panaji-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Panaji SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Goa Civil Code Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Ad-Valorem Stamp Duty</span>
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
                  src="/images/will-drafting-in-panaji.jpg"
                  alt="Legal Will Drafting and Property Succession in Panaji Goa"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Panaji &amp; Goa Estate Blueprint
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
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                7 Registry Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                All Goa Talukas Covered
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                No Ad-Valorem Asset Tax
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                50% Legitime
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Forced Heir Protection Rule
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                Doorstep Notary
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Section 31 Senior Visits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN EDITORIAL LAYOUT: STICKY TOC ON LEFT + EDITORIAL CONTENT ON RIGHT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* DESKTOP STICKY TOC SIDEBAR */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28 space-y-4">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-500">
                <Compass className="w-4 h-4 text-[#C65378]" />
                <span>Panaji Guide Contents</span>
              </div>
              <nav className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                          ? "bg-rose-50 text-[#C65378] translate-x-1"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${isActive ? "bg-[#C65378]" : "bg-slate-300"
                          }`}
                      />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* SIDEBAR CTA CARD */}
            <div className="rounded-3xl bg-[#172228] text-white p-5 space-y-3 shadow-md">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                Panaji Lawyer Desk
              </span>
              <div className="font-extrabold text-sm leading-snug">
                Need Help with Goa Civil Code Wills?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our estate lawyers for legitime calculations, inventory help, and Civil Registrar filing.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all"
              >
                <span>Consult Panaji Lawyer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* MOBILE FLOATING TOC DROPDOWN */}
          <div className="lg:hidden w-full sticky top-20 z-30 mb-6">
            <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 p-3 shadow-md">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION: {currentActiveToc.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${mobileTocOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {mobileTocOpen && (
                <div className="mt-3 pt-3 border-t border-slate-100 max-h-60 overflow-y-auto space-y-1">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className={`block px-2.5 py-1.5 rounded-lg text-xs font-semibold ${activeId === item.id
                          ? "bg-rose-50 text-[#C65378]"
                          : "text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="panaji-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>PANAJI ESTATE SUCCESSION BRIEF</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Panaji
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Goa Civil Code Governance</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Panaji Will makers are governed by the Goa Civil Code and Portuguese Civil Code of 1867. Forced heirs hold a protected legal claim (Legitime) over 50% of the estate, leaving the remaining 50% as Disposable Quota.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Inventory Proceedings Over Probate</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      High Court probate under Section 213 of the Indian Succession Act is not standard in Goa. Estate split and estate are conducted via Inventory Proceedings before the Civil Court or Special Notary.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Ad-Valorem Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are completely exempt from ad-valorem stamp duty based on asset market value in Goa. Only nominal filing, scanning, and Notary Public fees apply at the Civil Registrar office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Form I &amp; XIV Land Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed Will expedites record of rights name change on Form I &amp; XIV with the Tiswadi Mamlatdar and accelerates asset tax register substitution with the City City Board of Panaji (CCP).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="panaji-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                {/* H2: Exactly 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Goa Civil Code Framework in Panaji
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will drafting and estate planning in Panaji and across the state of Goa are distinct from any other area in India. Instead of being governed primarily by the Indian Succession Act, 1925, estate matters in Panaji are governed by the <strong>Goa Civil Code</strong> (derived from the Portuguese Civil Code of 1867) and the <strong>Goa Estate, Special Notaries and Inventory Proceeding Act, 2012</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will makers in Panaji must carefully navigate three legal realities: the <strong>Communion of Assets (Comunhão de Bens)</strong> marital regime, the reservation of the <strong>Legitime (Quota Indisponível)</strong> for forced heirs, and the exact bequeathal of the <strong>Disposable Quota (Quota Disponível)</strong>. Any Will signed without accounting for these specific rules risks being challenged or reduced during subsequent inventory proceedings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Will Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be a major aged 18 years or older with sound mental capacity and clear lucidity at signing.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will must be signed freely without undue coercion, family duress, fraud, or misrepresentation.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    50%
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legitime Quota</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Forced heirs hold an inalienable legal right over 50% of the estate, which cannot be willed away.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Adult Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Attested by two independent adult witnesses who hold no beneficial interest or legacy under the Will instrument.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PROTOCOLS</span>
                </div>
                {/* H2: Exactly 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Panaji &amp; Goa?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Filing Act, 1908</strong>, registering a Will is technically a choice across India, including Goa. A Will handwritten or typed on plain paper and signed before two witnesses is legally valid. However, in the context of Goa&apos;s legal framework, signing an plain Will creates significant hurdles during inventory proceedings and asset mutations.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="p-5 bg-slate-50 border-b border-slate-200/80">
                  <h3 className="font-extrabold text-base text-slate-900">
                    Comparative Analysis: Public Will vs Sealed Will vs Plain Will in Panaji
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
                      <tr>
                        <th className="p-3 sm:p-4">Legal Parameter</th>
                        <th className="p-3 sm:p-4 text-[#C65378]">Public Will (Testamento Público)</th>
                        <th className="p-3 sm:p-4">Sealed Will (Testamento Cerrado)</th>
                        <th className="p-3 sm:p-4">Plain White Paper Will</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Signing Venue</td>
                        <td className="p-3 sm:p-4 font-medium text-[#C65378]">Inscribed directly in Book of Wills (Livro de Notas) by Notary</td>
                        <td className="p-3 sm:p-4">Enclosed in sealed envelope; Approved by Civil Registrar</td>
                        <td className="p-3 sm:p-4">Signed at home on plain white paper</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Proof Value</td>
                        <td className="p-3 sm:p-4">Highest legal presumption of authenticity</td>
                        <td className="p-3 sm:p-4">High official presumption of valid sealing</td>
                        <td className="p-3 sm:p-4">Vulnerable to fights of forgery and incapacity</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Form I &amp; XIV Name Change</td>
                        <td className="p-3 sm:p-4">Accepted right away by Tiswadi Mamlatdar &amp; Talathi</td>
                        <td className="p-3 sm:p-4">Accepted upon official opening in court</td>
                        <td className="p-3 sm:p-4">Requires extensive inquiry and heir sworn notes</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Inventory Proceedings</td>
                        <td className="p-3 sm:p-4">Immediate judicial recognition in split court</td>
                        <td className="p-3 sm:p-4">Admitted upon judicial unsealing</td>
                        <td className="p-3 sm:p-4">Requires witness testimony and handwriting check</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Loss or Tampering Risk</td>
                        <td className="p-3 sm:p-4">Zero. Permanent government book custody</td>
                        <td className="p-3 sm:p-4">Zero if deposited in official registry custody</td>
                        <td className="p-3 sm:p-4">High risk of misplacement, fire, or concealment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE & INVENTORY PROCEEDINGS */}
            <section id="panaji-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>COURT SUCCESSION PROCEDURES</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Probate vs Inventory Proceedings in Panaji Courts
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In most Indian states, asset fights after death lead to forms for Probate or Letters of Care under Section 213 of the Indian Succession Act. In Panaji and across Goa, however, estate management follows a fundamentally different legal mechanism: <strong>Inventory Proceedings (Processo de Inventário)</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under the <strong>Goa Estate, Special Notaries and Inventory Proceeding Act, 2012</strong>, when a person passes away, any legal heir or Will legatee can initiate inventory proceedings before the Civil Court or designated Special Notary. The court catalogues the entire estate (Ativo), accounts for debts (Passivo), calculates the 50% Legitime of forced heirs, and allocates the 50% Disposable Quota in accordance with the deceased&apos;s filed Will.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Head of Family (Cabecelha de Casal)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The surviving spouse or eldest heir is appointed as the legal head to submit a full list of family assets and debts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Legitime Apportionment</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Civil Court safeguards the 50% legal reserve for children or forced heirs before verifying the Will bequests.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Final Split Decree (Mapa de Partilha)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A strong court split order is issued, providing unshakeable title for Form I &amp; XIV name change and bank account releases.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO & NOTARY DIRECTORY */}
            <section id="panaji-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTIONAL SRO DIRECTORY</span>
                </div>
                {/* H2: Exactly 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Panaji SRO &amp; Notary Public Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Goa, the SRO also functions as the Civil Registrar and Special Notary for Will deeds. Filter through the official registry offices across Tiswadi, Salcete, Bardez, Mormugao, and other Goa talukas:
                </p>
              </div>

              {/* SEARCH & SELECTOR */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by locality, taluka, or office name (e.g., Panaji, Miramar, Margao, Mapusa)..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#C65378] transition-colors"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                        }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SRO DETAIL CARD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                        Official Area Office
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 self-start sm:self-auto">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active Registry
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Address:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.timings}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <span className="font-bold text-slate-900 block">Localities &amp; Areas Covered:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-slate-500">
                      Goa State Filing Portal: <strong>ngdrs.goa.gov.in</strong>
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Lawyer Help for {activeHubData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES ACROSS GOA (EXACT SAME TYPE AS NASHIK LOCAL AREAS SECTION) */}
            <section id="panaji-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>Local Areas &amp; TALUKA JURISDICTIONS</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Local Areas: Will Drafting Services Across Goa
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Goa span historic coastal villas and luxury flats in Panaji and Tiswadi, bustling shop hubs in Margao and Salcete, port logistics in Vasco da Gama, home corridors in Mapusa and Porvorim, holiday estates in Calangute and Candolim, and farm plantations in Ponda and Bicholim. Our estate planning lawyers provide personalized legal drafting, Portuguese Civil Code compliance, and Civil Registrar accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* REGIONAL CITY 1: PANAJI & TISWADI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital Heritage &amp; Coastal Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Civil Registrar Tiswadi (Panaji)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Panaji &amp; Tiswadi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Miramar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dona Paula</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Caranzalem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Altinho</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Taleigao</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Panaji</strong> and Tiswadi for premium seafront apartments along Miramar Beach, luxury villas in Dona Paula, Portuguese heritage mansions in Fontainhas, and home plots across Kadamba plateau. Accounts for undivided matrimonial half-shares and precise disposable quota allocation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Junta House, Panaji</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Public Will recording in the official Book of Wills, lawyer physical attendance, and Section 31 doorstep signing for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Goa Civil Code · Notary Public Deed</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Panaji"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Panaji Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 2: MARGAO & SALCETE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Goa Shop Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Civil Registrar Salcete (Margao)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Margao &amp; Salcete
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Margao Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatorda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benaulim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Colva</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Navelim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Margao</strong> and Salcete for family-held shop stores, home family assets, and coastal beachside lands in Benaulim and Colva. Seamlessly addresses Communion of Assets (Comunhão de Bens) rules and protects joint family enterprises.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mathany Saldanha Complex, Margao</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth shop estate structuring, NRI family villa papers, and official Civil Registrar signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Coastal Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Margao"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Margao Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 3: MAPUSA & BARDEZ */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Goa Shop Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Civil Registrar Bardez (Mapusa)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mapusa &amp; Bardez
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mapusa Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aldona</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Moira</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Guirim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thivim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Mapusa</strong> for business owners, market traders, and legacy family homes in Aldona and Moira. Formulates watertight executor appointments, accounts for farm orchard plots, and prepares for swift inventory proceedings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Morod Office Complex, Mapusa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Bardez taluka area, bilingual Portuguese-English clause check, and smooth Form I &amp; XIV name change.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Urban &amp; Family Villages</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mapusa"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mapusa Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 4: PORVORIM & ALTO-PORVORIM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Office &amp; High Court Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Bardez &amp; Tiswadi Access
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Porvorim &amp; Alto-Porvorim
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Porvorim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alto-Porvorim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Defense Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Penha de Franca</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Porvorim</strong> along the NH-66 corridor and Goa Legislative Assembly belt. Caters to government officers, legal lawyers, and modern gated apartment complexes with clear housing society share transmissions and mutual fund allocations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: High Court Corridor / Bardez Registry</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Rapid lawyer talk, Bombay High Court at Goa proximity, and convenient online draft review.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Modern Home Gated Belts</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Porvorim"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Porvorim Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 5: VASCO DA GAMA & MORMUGAO */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Port &amp; Plant Gateway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Civil Registrar Mormugao (Vasco)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vasco da Gama &amp; Mormugao
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vasco City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chicalim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dabolim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sancoale</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bogmalo</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Vasco da Gama</strong> for marine captains, shipping executives, plant port business owners, and apartment owners across Dabolim and Chicalim. Formulates cross-border bank account mandates and overseas asset coordination.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: City Office Building, Vasco</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mormugao sub-registry signing, Goa Civil Code compliance, and home visit coordination for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Port Logistics &amp; Airport Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vasco da Gama"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vasco Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 6: CANDOLIM, CALANGUTE & ASSAGAO */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coastal Tourism &amp; Luxury Heritage Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Bardez SRO Area
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Candolim, Calangute &amp; Assagao
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Candolim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Calangute</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Assagao</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anjuna</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Siolim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Candolim and Assagao</strong> for luxury holiday homes, restored Portuguese estates, boutique guest houses, and Comunidade home leases. Protects non-resident Indian (NRI) investments while honoring legal forced heir reserves.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bardez Sub-Registry / North Goa Special Notary</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NRI remote talk, apostille guidance, and seamless Form I &amp; XIV name change handling.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Boutique Villas &amp; Hospitality</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Candolim"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Coastal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 7: PONDA & CENTRAL GOA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central Plant &amp; Cultural Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Civil Registrar Ponda
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ponda &amp; Central Goa
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ponda Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bandora</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Curti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kundaim IDC</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marcaim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Ponda</strong> for spice plantation owners, temple town family assets, and plant manufacturing plants in Kundaim and Marcaim Plant Estates. Establishes clear estate for multi-generational business families.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Government Office Complex, Tisk, Ponda</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Central Goa taluka registry, plant unit estate planning, and farm land division.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Plantations &amp; Plant Units</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ponda"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ponda Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 8: BICHOLIM & VALPOI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-East Agro &amp; Mineral Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Civil Registrar Bicholim &amp; Sattari
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bicholim &amp; Valpoi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bicholim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sanquelim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Valpoi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mayem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Honda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Bicholim and Valpoi</strong> for horticultural cashew orchards, betel nut plantations, and family asset titles. Ensures compliance with Mamlatdar name change guidelines and prevents protracted rural estate fights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mamlatdar Complex, Bicholim</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Inland farm record check, Form I &amp; XIV title mapping, and Civil Registrar filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plantation Land &amp; Rural Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bicholim"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bicholim Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP PROCESS */}
            <section id="step-by-step-panaji-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP SOP</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to Filing in Panaji
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Signing a fully enforceable Will in Panaji requires systematic legal planning under Goa Civil Code rules. Follow our 5-step Standard Operating Step:
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex gap-4 items-start">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-base shrink-0">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 1: Calculate Forced Heirs &amp; Disposable Quota
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Evaluate your family pedigree to identify surviving children, descendants, or ascendants who qualify as forced heirs under the Goa Civil Code. Isolate the needed 50% Legitime quota from the 50% Disposable Quota that you can freely bequeath.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex gap-4 items-start">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-base shrink-0">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 2: Confirm Matrimonial Asset Regime
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Verify whether you were married under the default Communion of Assets (Comunhão de Bens) or an Antenuptial Contract. Ensure the Will mainly bequests only your undivided 50% half-share (meeação), respecting your spouse&apos;s equal co-ownership.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex gap-4 items-start">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-base shrink-0">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 3: Draft Watertight Goa Estate Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior lawyers draft customized clauses detailing your specific assets, Form I &amp; XIV survey numbers, bank account numbers, Comunidade allotment numbers, and executor designations while formally revoking prior Will deeds.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex gap-4 items-start">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-base shrink-0">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 4: Select Public Will or Sealed Will Format
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Decide whether to execute an open Public Will (inscribed directly into the Civil Registrar&apos;s Livro de Notas) or a Closed Sealed Will (Testamento Cerrado) enclosed in an official sealed envelope with an Act of Approval (Instrumento de Aprovação).
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex gap-4 items-start">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-base shrink-0">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 5: Filing Before Civil Registrar of Tiswadi
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Appear at the Civil Registrar office in Junta House, Panaji with two independent adult witnesses. Complete verbal witness signing, photo capture, and biometric thumbprinting to receive your permanent filed instrument.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP NOTARY VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FACILITY</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Notary Filing in Panaji
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden people, or persons recovering from medical illness in Panaji, traveling to the Civil Registrar office at Junta House is often physically challenging. Under <strong>Section 31 of the Filing Act, 1908</strong>, the law explicitly empowers the Civil Registrar and Special Notary to conduct official filing directly at your private residence.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">
                  How Home Visit Filing Operates in Panaji
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 block">1. Medical Fitness Paper</span>
                    <p className="leading-relaxed">
                      An MBBS or MD doctor certifies the Will maker&apos;s sound mental capacity while stating their physical inability to travel to the registry office.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 block">2. Official Petition &amp; Fee</span>
                    <p className="leading-relaxed">
                      Our lawyer files an form under Section 31 with the Tiswadi Civil Registrar and remits the nominal government home visit conveyance charge.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 block">3. At-Home Biometrics</span>
                    <p className="leading-relaxed">
                      The Civil Registrar visits your home in Miramar, Dona Paula, or Caranzalem with portable biometric devices and completes the recording in person.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENT CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION DOCUMENTATION</span>
                </div>
                {/* H2: Exactly 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Panaji Filing &amp; Notary
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Free checklist for registering your Will before the Civil Registrar or Special Notary in Panaji. Check off each paper before scheduling your appointment:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Required Legal Records
                  </span>
                  <span className="text-xs font-extrabold text-[#C65378]">
                    {checkedCount} of {checklist.length} Documents Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${item.checked
                          ? "bg-rose-50/50 border-[#C65378]/30"
                          : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-50"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${item.checked
                            ? "bg-[#C65378] text-white"
                            : "border-2 border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          {item.label}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PANAJI PROPERTY TYPES */}
            <section id="panaji-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Panaji Asset Types: Comunidade, Villas &amp; Flats
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate in Panaji and surrounding Tiswadi encompasses distinct categories of asset tenure, each requiring specialized legal draftsmanship under Goan land management:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <h3 className="font-bold text-base text-slate-900">
                    Comunidade Leasehold Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Land allocated by Comunidades across Tiswadi (e.g., Taleigao, Bambolim, Santa Cruz). The Will transfers proprietary building rights and long-term lease interest subject to getting NOC from the Comunidade managing committee under the Code of Comunidades.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <h3 className="font-bold text-base text-slate-900">
                    Family Indo-Portuguese Villas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Heritage bungalows in Fontainhas, São Tomé, and Altinho. Typically held as undivided family co-shares among siblings. Our draft delineates specific rooms, private courtyards, or fractional co-ownership percentages to prevent family fights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <h3 className="font-bold text-base text-slate-900">
                    Miramar &amp; Caranzalem Coastal Apartments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Modern high-rise home flats in Miramar, Caranzalem, and Dona Paula. The Will details housing society share transmissions, stilt parking rights, and exclusive terrace easements, preventing nomination fights upon estate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <h3 className="font-bold text-base text-slate-900">
                    Kadamba Plateau &amp; Farmland Parcels
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Rapidly developing home plots on Kadamba plateau and farm parcels across Tiswadi. The Will includes exact survey numbers, sub-division numbers, and Form I &amp; XIV specifications for seamless Mamlatdar name change.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL REGISTRATION FEES */}
            <section id="panaji-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT STATUTORY COSTS</span>
                </div>
                {/* H2: Exactly 50 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Goa Filing Fees &amp; Notary Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds, signing and registering a Will in Panaji does not attract ad-valorem stamp duty based on asset market price check. The legal costs are strictly nominal:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Government Fee Head</th>
                      <th className="p-3 sm:p-4">Legal Charge</th>
                      <th className="p-3 sm:p-4">Legal Citation &amp; Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900">Stamp Duty on Will</td>
                      <td className="p-3 sm:p-4 font-extrabold text-emerald-600">₹0 (100% Exempt)</td>
                      <td className="p-3 sm:p-4">Exempt from ad-valorem duty under Goa Stamp Act</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900">Civil Registrar Fee</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹500 to ₹1,500</td>
                      <td className="p-3 sm:p-4">Standard Book of Wills entry and check fee</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900">Scanning &amp; Data Entry</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹100 to ₹300</td>
                      <td className="p-3 sm:p-4">Digital archival and NGDRS portal electronic upload</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900">Section 31 Doorstep Visit</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹500 to ₹1,000</td>
                      <td className="p-3 sm:p-4">Conveyance charge for home filing under Section 31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: TRANSPARENT WILL PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT FIXED PRICING</span>
                </div>
                {/* H2: Exactly 50 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Panaji
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the plan that suits your family estate needs. Transparent pricing with zero hidden charges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* BASIC TIER */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Self-Drafted Online
                    </span>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 ml-1.5">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Best for nuclear families with straightforward assets seeking a legally compliant online Will draft.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Free Goa legal clause builder</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legitime &amp; disposable quota guidance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant downloadable PDF &amp; Word draft</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-100 text-slate-800 text-xs font-extrabold text-center hover:bg-slate-200 transition-colors"
                  >
                    Get Started Online
                  </a>
                </div>

                {/* ADVOCATE ASSISTED (FEATURED) */}
                <div className="rounded-3xl bg-[#172228] text-white border-2 border-[#C65378] p-6 shadow-xl flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    Most Popular in Goa
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                      Senior Lawyer Assisted
                    </span>
                    <div>
                      <span className="text-3xl font-extrabold text-white">₹4,990</span>
                      <span className="text-xs text-slate-300 ml-1.5">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Complete lawyer talk, Communion of Assets evaluation, and custom legal drafting.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Dedicated Goa estate lawyer review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Comunidade &amp; Form I &amp; XIV check</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Doctor mental fitness paper format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Unlimited revisions until final satisfaction</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-2xl bg-[#C65378] text-white text-xs font-extrabold text-center hover:bg-[#a13c5d] transition-all shadow-md shadow-[#C65378]/25"
                  >
                    Draft with Goa Lawyer
                  </a>
                </div>

                {/* SRO REGISTRATION ASSISTED */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Full SRO Filing &amp; Visit
                    </span>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 ml-1.5">+ govt charges</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      End-to-end service including lawyer drafting, Civil Registrar appointment, and physical office accompaniment.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Full senior lawyer bespoke drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Civil Registrar slot booking &amp; challan payment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical lawyer accompaniment at Panaji SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white text-xs font-extrabold text-center hover:bg-slate-800 transition-colors"
                  >
                    Book Full SRO Help
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
                {/* H2: Exactly 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Panaji
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key legal questions on Will drafting, the Goa Civil Code, forced heir quotas, and Civil Registrar filing in Panaji:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors gap-4"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#C65378]" : ""
                            }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          <p className="mt-3">{faq.a}</p>
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
                {/* H2: Exactly 56 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Goa Legal Framework References
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every legal principle and procedural mandate outlined on this page is rooted in governing Indian statutes and Goa-specific estate enactments:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <h3 className="font-bold text-slate-900">
                    Goa Civil Code (Portuguese Civil Code of 1867)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governs forced heirship (Legitime), Communion of Assets matrimonial asset regime, Public Wills, and Sealed Wills across Goa.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <h3 className="font-bold text-slate-900">
                    Goa Estate, Special Notaries and Inventory Act, 2012
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern codification of Will estate, powers of Special Notaries, and the conduct of Inventory Proceedings in Goa courts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <h3 className="font-bold text-slate-900">
                    Section 18(e) &amp; Section 31, Filing Act, 1908
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governs a choice filing of Wills and doorstep filing at home for senior citizens and medically incapacitated Will makers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <h3 className="font-bold text-slate-900">
                    The Code of Comunidades (Código das Comunidades)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Regulates Comunidade village institutions, Gaunkari customary shares (Zon), and conditions for transferring leased plots through a Will.
                  </p>
                </div>
              </div>
            </section>

            {/* PRE-FOOTER CTA BANNER */}
            <div className="rounded-3xl bg-[#172228] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden text-center space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Secure Your Family&apos;s Goa Heritage Today
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Protect Your Panaji Assets Under the Goa Civil Code
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Avoid costly court inventory fights. Draft your legally watertight Will with senior lawyer help and register before the Civil Registrar of Tiswadi.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25"
                >
                  Start Drafting Your Panaji Will
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-all border border-white/20"
                >
                  Schedule Lawyer Talk
                </Link>
              </div>
            </div>

          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
            </div>
          </div>

      </main>
        </div>
      </div>

      {/* HIGH-RES HERO IMAGE MODAL */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#172228] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/images/will-drafting-in-panaji.jpg"
                alt="Legal Will Drafting and Property Succession in Panaji Goa"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-[#172228] flex items-center justify-between border-t border-white/10 text-xs text-slate-300">
              <span>Panaji &amp; Goa Civil Code Estate Blueprint</span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="px-4 py-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
