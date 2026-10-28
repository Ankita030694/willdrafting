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
  Anchor,
  X,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "dnh-dd-overview", label: "OVERVIEW" },
  { id: "dnh-dd-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "dnh-dd-probate-rules", label: "PROBATE RULES" },
  { id: "dnh-dd-sro-directory", label: "SRO DIRECTORY" },
  { id: "regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-dnh-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "dnh-dd-property-types", label: "PROPERTY TYPES" },
  { id: "dnh-dd-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const DNH_DD_SRO_HUBS = [
  {
    id: "silvassa-sro",
    name: "Silvassa & Dadra SRO (Collectorate)",
    sro: "Office of the Sub-Registrar, Silvassa",
    address:
      "District Collectorate Complex, Court Road, Silvassa, Dadra & Nagar Haveli - 396230",
    areas:
      "Silvassa Town, Amli, Masat, Piparia, Naroli, Dadra, Rakholi, Samarvarni, Sayli, Dokmardi",
    timings: "9:30 AM to 6:00 PM (Monday to Friday, 2nd & 4th Saturday closed)",
  },
  {
    id: "daman-sro",
    name: "Daman Civil Registrar & SRO (Moti Daman)",
    sro: "Office of the Civil Registrar-cum-Sub-Registrar, Daman",
    address: "Collectorate Complex, Dholar, Moti Daman, Daman - 396220",
    areas:
      "Moti Daman, Nani Daman, Somnath, Dabhel, Kadaiya, Bhimpore, Marwad, Devka, Dunetha, Varkund",
    timings: "9:30 AM to 6:00 PM (Monday to Friday, 2nd & 4th Saturday closed)",
  },
  {
    id: "diu-sro",
    name: "Diu Civil Registrar & SRO (Diu Fort Area)",
    sro: "Office of the Civil Registrar-cum-Sub-Registrar, Diu",
    address:
      "Collectorate Compound, Near Diu Fort, Diu Town, Diu - 362090",
    areas:
      "Diu Town, Ghoghla, Fudam, Nagoa, Bucharwada, Vanakbara, Bunder, Jethabai, Main Market",
    timings: "9:30 AM to 6:00 PM (Monday to Friday, 2nd & 4th Saturday closed)",
  },
  {
    id: "khanvel-sub-registry",
    name: "Khanvel & Rural DNH Sub-Registry",
    sro: "Taluka Sub-Registrar / Mamlatdar Office, Khanvel",
    address:
      "Mamlatdar Office Compound, Khanvel, Dadra & Nagar Haveli - 396230",
    areas:
      "Khanvel, Dudhani, Mandoni, Chauda, Kauncha, Rudana, Vansda, Sindoni Rural Belts",
    timings: "9:30 AM to 6:00 PM (Monday to Friday, 2nd & 4th Saturday closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail:
      "Printed clearly on standard durable A4 white paper. Non-judicial stamp paper is not required under UT laws.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail:
      "Needed for biometric identity check, photo recording, and official Book III government entry.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Attesting Witnesses",
    detail:
      "Must carry original government photo IDs and cannot be heirs or spouses of heirs under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "MBBS Doctor Sound Mind Note",
    detail:
      "Strongly recommended for senior citizens (60+) to certify testamentary lucidity and ward off future fights.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Industrial Estate Allotment / Title Documents",
    detail:
      "Lease allotment letter, DIC registration, or title deeds for Silvassa factories and shop units.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Portuguese Family Records (If Applicable in Daman/Diu)",
    detail:
      "Documents evidencing matrimonial property regime or family share to prevent community property conflicts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Legal SRO Fee Challan / Receipt",
    detail:
      "Challan receipt evidencing payment of nominal government registration and document processing fees.",
    checked: false,
  },
];

export default function DnhDdLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("dnh-dd-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [selectedHub, setSelectedHub] = useState<string>("silvassa-sro");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showHighResModal) {
        setShowHighResModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHighResModal]);

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

  const filteredHubs = DNH_DD_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    DNH_DD_SRO_HUBS.find((h) => h.id === selectedHub) || DNH_DD_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc =
    TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK STYLE ARCHITECTURE)
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
                <span>DADRA &amp; NAGAR HAVELI AND DAMAN &amp; DIU SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters (SEO Guideline Target 30-65 chars) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Dadra and Nagar Haveli, Daman &amp; Diu
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your Silvassa manufacturing units, Portuguese-era coastal estates in Daman, island assets in Diu, and family lands. Senior lawyer drafting, Sub-Registrar Book III registration, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your UT Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#dnh-dd-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>UT SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bombay HC Lawyer Vetted</span>
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
                  src="/images/will-drafting-in-dadra-and-nagar-haveli-and-daman-and-diu.jpg"
                  alt="Legal Will Drafting and Property Succession in Dadra and Nagar Haveli and Daman and Diu"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  UT Industrial &amp; Coastal Succession Blueprint
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
                4 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Silvassa, Daman &amp; Diu Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Ad-Valorem Exemption on Wills
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Outside Greater Mumbai Rule
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
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
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
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
                        isActive
                          ? "w-4 h-[1.5px] bg-[#C65378]"
                          : "w-2.5 h-[1px] bg-slate-300"
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
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
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
            <section id="dnh-dd-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>UT ESTATE SUCCESSION BRIEF</span>
                </div>
                {/* H2: 49 chars (<= 70) */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making in Dadra, Daman &amp; Diu
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are legally valid on plain paper under Section 18(e) of the Registration Act. Registering at Silvassa, Daman, or Diu SRO creates unshakeable Book III official custody.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills attract ₹0 ad-valorem stamp duty in the Union Territory. Only nominal legal registration charges (₹100 to ₹500) apply at the Sub-Registrar counter.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Industrial Unit Succession</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Silvassa&apos;s MSME manufacturing plants, corporate equity, and Administration industrial leaseholds transfer smoothly without frozen bank lines or operational interruption.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Portuguese Civil Code Nuance</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In Daman and Diu, family estates harmonize historical communion of assets with the Indian Succession Act 1925 to resolve community property questions.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Drafted under Section 63 of the Indian Succession Act, 1925 and vetted by experienced Bombay High Court practitioners.
                  </p>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] shrink-0"
                  >
                    <span>Start Your Online Will Draft</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section
              id="dnh-dd-legal-framework"
              className="scroll-target space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION &amp; SUCCESSION JURISPRUDENCE</span>
                </div>
                {/* H2: 52 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework: Succession in Dadra, Daman &amp; Diu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate succession across Dadra and Nagar Haveli and Daman and Diu represents a distinct blend of national legal law and unique historical office traditions. While the Indian Succession Act, 1925 governs the signing, attestation, and revocation of Wills, local property transfer mechanisms interface with the Union Territory Administration, municipal corporations, and agrarian land reforms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 63 Indian Succession Act, 1925
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every valid testamentary instrument in the UT requires: (a) intention of the Will maker expressed in writing, (b) personal signature or thumbmark of the Will maker, and (c) attestation by at least two independent adult witnesses who observe the Will maker signing.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Portuguese Civil Code Remnants in Daman &amp; Diu
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prior to liberation in 1961, Daman and Diu were governed by the Portuguese Civil Code of 1867. For native families, family holdings may involve marital communion of property. Our lawyers make sure your Will cleanly isolates your disposable estate without infringing on legitimate family reserves.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Dadra &amp; Nagar Haveli Land Reforms Regulation, 1971
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 8 of the DNH Land Reforms Regulation 1971, farm occupancy rights held by Scheduled Tribe people (Varli, Dhodia, Kokna) cannot be transferred or bequeathed to non-tribals. Wills must uphold these legal restrictions to secure lawful name change.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    The UT Merger Act, 2019 &amp; Office Unified Control
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Enacted under Act 44 of 2019, the merger unified office structures while preserving existing regional property rights. Registration processes at Silvassa, Daman, and Diu Sub-Registrar Offices operate with uniform efficiency under the Administrator.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT 1908 COMPLIANCE</span>
                </div>
                {/* H2: 51 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Registration Rules: Optional vs Book III Custody
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a testamentary Will is strictly optional throughout the Union Territory. A Will written on ordinary white paper and attested by two witnesses is legally enforceable in Indian courts. However, registering the Will before the Sub-Registrar provides immense proof benefits:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl">
                      Unregistered Will vs. Registered Will in DNH &amp; DD
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Understanding why Sub-Registrar Book III entry safeguards your estate
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C65378] text-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Legal Comparison
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4 sm:p-5">Legal Metric</th>
                        <th className="p-4 sm:p-5 text-slate-600">Unregistered White-Paper Will</th>
                        <th className="p-4 sm:p-5 text-[#C65378] bg-rose-50/50">SRO Registered Will (Book III)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Legal Validity</td>
                        <td className="p-4 sm:p-5">Valid under Section 63 Indian Succession Act</td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-rose-50/30">
                          Valid with legal presumption of genuine signing
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Government Record</td>
                        <td className="p-4 sm:p-5">Zero official record; vulnerable to loss or destruction</td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-rose-50/30">
                          Permanent sealed custody in Book III at the SRO office
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Vulnerability to Fraud Claims</td>
                        <td className="p-4 sm:p-5">High risk of forgery, coercion, or capacity allegations</td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-rose-50/30">
                          Minimal risk; Sub-Registrar verifies identity &amp; mental soundness
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Industrial &amp; Land Name Change</td>
                        <td className="p-4 sm:p-5">Mamlatdar/DIC may mandate civil court succession order</td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-rose-50/30">
                          Expedited name change on revenue records, SMC/DMC registers, and DIC
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Certified Copy Replacement</td>
                        <td className="p-4 sm:p-5">Impossible if original is misplaced or concealed</td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-rose-50/30">
                          Executor can get certified copies from SRO upon Will maker&apos;s death
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE JURISDICTION */}
            <section id="dnh-dd-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>BOMBAY HIGH COURT PROBATE JURISDICTION</span>
                </div>
                {/* H2: 53 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Bombay High Court Area &amp; Probate Exemption
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common point of confusion among property owners in Dadra and Nagar Haveli and Daman and Diu is whether probate is needed, given that the High Court of Bombay exercises judicial supervision over the Union Territory. The legal reality is clear and favorable:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Probate Is Strictly Optional Outside Greater Mumbai
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, getting probate is needed only for Wills made by Hindus, Buddhists, Sikhs, or Jains within the historical Ordinary Original Civil Area of the Bombay High Court (the island city and suburban territory of Greater Mumbai).
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Because Dadra and Nagar Haveli, Daman, and Diu lie completely outside the presidency city of Mumbai, <strong>probate is non-needed</strong>. The Bombay High Court has consistently affirmed that legal heirs can set up rights over immovable assets, factories, and bank accounts in the UT without filing an expensive and lengthy probate petition.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">Direct Land Name Change</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Mamlatdar and Talathi offices mutate farm land records directly based on the registered Will and death paper.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">Municipal Councils</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Daman, Diu, and Silvassa Municipal Councils update property tax registers (Varasdar) without requiring High Court probate.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">Banking &amp; Demat Transfer</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Financial institutions release fixed deposits, business accounts, and mutual funds upon receiving the registered Will.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/services/probate-lawyer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] underline underline-offset-2"
                  >
                    <span>Read our National Probate Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-300">·</span>
                  <Link
                    href="/tools/probate-checker"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 underline underline-offset-2"
                  >
                    <span>Check Probate Applicability for Your Assets</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="dnh-dd-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION OFFICES &amp; JURISDICTIONS</span>
                </div>
                {/* H2: 53 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. SRO Directory: Silvassa, Daman &amp; Diu Registry Hubs
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Locate your designated SRO office in Dadra and Nagar Haveli, Daman, or Diu. Filter by region to review official office addresses, geographic areas, and appointment protocols:
                </p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search SRO by area (e.g. Silvassa, Moti Daman, Diu, Naroli)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378] focus:border-transparent transition-all shadow-2xs"
                />
              </div>

              {/* SRO SELECTOR BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {filteredHubs.map((hub) => {
                  const isSelected = selectedHub === hub.id;
                  return (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => setSelectedHub(hub.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#C65378] text-white border-[#C65378] shadow-md shadow-[#C65378]/20"
                          : "bg-white text-slate-800 border-slate-200/90 hover:border-slate-300"
                      }`}
                    >
                      <span className="font-extrabold text-xs sm:text-sm line-clamp-1">
                        {hub.name}
                      </span>
                      <span
                        className={`text-[10px] mt-1 line-clamp-1 ${
                          isSelected ? "text-rose-100" : "text-slate-500"
                        }`}
                      >
                        {hub.sro}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE HUB DETAIL CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                      Selected Registration Office
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900 mt-0.5">
                      {activeHubData.sro}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    <Building className="w-3.5 h-3.5 text-[#C65378]" />
                    Book III Testamentary Custody
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Physical Address:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.address}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Areas &amp; Industrial Zones:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Official Office Hours:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.timings}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Need lawyer accompaniment or doorstep biometric signing at this registry?
                  </p>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d]"
                  >
                    <span>Request Lawyer Help for {activeHubData.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES (EXACT SAME STYLE AS NASHIK LOCAL AREAS SECTION) */}
            <section id="regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ASSET SUCCESSION NUANCES</span>
                </div>
                {/* H2: 57 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Succession Across DNH and Daman &amp; Diu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Dadra and Nagar Haveli and Daman and Diu span high-capacity manufacturing plants and corporate headquarters in Silvassa, Portuguese-era coastal estates and beachfront hotels in Daman, heritage fishing and tourism assets in Diu, and farm holdings across rural belts. Our lawyers deliver customized legal drafting and registry accompaniment across every key hub:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* REGIONAL CITY 1: SILVASSA & AMLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial Manufacturing Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Silvassa (Collectorate)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Silvassa &amp; Amli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Silvassa Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Masat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Piparia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sayli</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Silvassa &amp; Amli</strong> for factory founders, packaging units, and industrial promoters. Codifies transfer of Administration leasehold plots, DIC licenses, shop bank guarantees, and private company shares to avoid inter-generational corporate deadlocks.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Silvassa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track appointment scheduling, physical lawyer attendance, and Section 31 home visits for business founders.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Silvassa"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Silvassa Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 2: DAMAN (MOTI & NANI DAMAN) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coastal &amp; Portuguese Heritage Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Daman (Moti Daman)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Daman (Moti &amp; Nani Daman)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nani Daman</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Moti Daman</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Devka Beach</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Somnath</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dabhel</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Daman</strong> for family Portuguese villas, beachfront hotels, shop shops, and home apartments. Formulates bequests harmonizing Portuguese Civil Code property traditions with the Indian Succession Act 1925 to resolve community estate entitlements.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Registrar Complex, Dholar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Book III registration, NRI power of attorney alignment, and municipal property tax name change help.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Coastal Heritage</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Daman"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Daman Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 3: DIU ISLAND & GHOGHLA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Anchor className="w-3.5 h-3.5" />
                        Coastal Island Heritage Haven
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Diu (Diu Fort)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Diu Town &amp; Ghoghla
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Diu Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ghoghla</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nagoa Beach</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fudam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vanakbara</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Diu</strong> for historic townhouses, seaside hospitality resorts, and mechanized fishing fleet assets. Protects family family bequests across generations and safeguards NRI assets held by families residing in the UK, Portugal, or Africa.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Compound, Diu Fort</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Island SRO registration, maritime vessel license bequest, and doorstep signing for elderly citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Island Tourism &amp; Marine Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Diu"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Diu Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 4: DADRA & NAROLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Border MSME &amp; Logistics Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Silvassa (Collectorate)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dadra &amp; Naroli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dadra Border</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Naroli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Demni Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Samarvarni</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Practical <strong>Will drafting services in Dadra &amp; Naroli</strong> for plastic converters, textile spinning mills, and logistics warehouses bordering Gujarat. Details testamentary split of partnership capitals, shop godowns, and GST business accounts with clear executor powers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Silvassa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Cross-border Gujarat/DNH property alignment, partnership succession clauses, and swift registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Logistics &amp; Manufacturing</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dadra"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dadra Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 5: KHANVEL & DUDHANI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Agro-Forest &amp; Eco-Tourism Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Khanvel / Silvassa
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Khanvel &amp; Dudhani
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khanvel</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dudhani Lake</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mandoni</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kauncha</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable <strong>Will drafting services in Khanvel &amp; Dudhani</strong> for farm orchards, eco-tourism resorts, and private farmhouses. Ensures strict compliance with Section 8 of the DNH Land Reforms Regulation 1971 regarding tribal tenancy protections and revenue record name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mamlatdar Office Compound, Khanvel</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mamlatdar revenue coordination, tribal tenancy compliance review, and village record name change.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Forest &amp; Farmhouses</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Khanvel"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Khanvel Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 6: BHIMPORE & KADAIYA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Building className="w-3.5 h-3.5" />
                        Export &amp; Manufacturing Cluster
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Daman (Moti Daman)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bhimpore &amp; Kadaiya
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhimpore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadaiya</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dunetha</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Varkund</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Bhimpore &amp; Kadaiya</strong> for pharmaceutical factories, electrical manufacturers, and industrial estates in Daman. Covers plant machinery, leasehold factory lands, and corporate IP to secure seamless operational continuity for successors.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Registrar Complex, Moti Daman</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Corporate asset scheduling, industrial lease transfer papers, and Sub-Registrar signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Export &amp; Industrial Units</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bhimpore"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bhimpore Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP PROCESS */}
            <section id="step-by-step-dnh-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP OPERATING PROCEDURE</span>
                </div>
                {/* H2: 50 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. 5-Step Process: Draft and Register Your UT Will
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified standard legal protocol to draft, attest, and register your Will in Dadra and Nagar Haveli, Daman, or Diu:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#C65378] text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Compile Asset Inventory &amp; Heirs
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      List all your assets: Silvassa manufacturing plants, Daman coastal residences, Diu townhouses, farm farmlands, demat shares, and bank deposits. Assign specific shares to heirs and appoint a trusted executor to oversee management.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong>Pro-Tip:</strong> Clearly distinguish between self-acquired property and inherited family land, noting any Portuguese Civil Code community share where relevant.
                    </div>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#C65378] text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Lawyer Drafting &amp; Custom Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior legal team customizes your Will with explicit revocation clauses for prior instruments, executor powers, debt liquidation mandates, and guardian designations for minor children.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong>Pro-Tip:</strong> Include alternate heirs in case of simultaneous demise to eliminate the risk of partial intestacy.
                    </div>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#C65378] text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Attestation by Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on high-quality A4 paper. Under Section 63 of the Indian Succession Act, sign every page before two adult witnesses who hold zero beneficial interest in the estate.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong>Pro-Tip:</strong> Avoid using heirs&apos; spouses or relatives as witnesses, as Section 67 ISA can invalidate bequests made to attesting parties.
                    </div>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#C65378] text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Sub-Registrar Slot Scheduling &amp; Fee Remittance
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Schedule your registration appearance at the SRO office in Silvassa, Daman, or Diu. Remit nominal government registration fees and scanning charges.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong>Pro-Tip:</strong> Wills are exempt from ad valorem stamp duty across the UT. Only flat registration and scanning fees apply.
                    </div>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#C65378] text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Biometric Attestation &amp; Book III Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Attend the SRO with your two witnesses. The Sub-Registrar verifies personal identity, captures digital photographs and electronic thumbprints, and seals the document in Book III government custody.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong>Pro-Tip:</strong> The registered Will is returned with an official endorsement seal, establishing undeniable proof weight.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP REGISTRATION UNDER SECTION 31 */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP &amp; HOSPITAL REGISTRATION COMMISSION</span>
                </div>
                {/* H2: 45 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep SRO Registration Under Section 31
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden people, or factory founders unable to travel to the registry counter, Section 31 of the Registration Act, 1908 provides a legal doorstep commission facility:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold">
                      A
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Medical Fitness Certificate
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS or MD medical practitioner certifies that the Will maker is mentally sound, lucid, and possesses full sound mind, but physically unable to travel.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold">
                      B
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Formal SRO Petition &amp; Commission
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our lawyers draft and file a formal commission form with the SRO office in Silvassa, Daman, or Diu along with the doctor&apos;s paper and travel fee.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold">
                      C
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Home Biometric Check
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar personally visits the Will maker&apos;s residence or hospital room with portable biometric equipment, witnesses the signing, and registers the Will into Book III.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-600">
                    Available across Silvassa, Naroli, Daman, Diu Town, and rural DNH talukas.
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d]"
                  >
                    <span>Book Section 31 Home Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION DOCUMENTATION REQUIREMENTS</span>
                </div>
                {/* H2: 52 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Required: Checklist for UT Registration
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive document preparation checklist for your registration appearance before the Sub-Registrar in Silvassa, Daman, or Diu ({checkedCount} of {checklist.length} completed):
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/50 border-rose-200"
                          : "bg-slate-50/60 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 text-[#C65378] rounded border-slate-300 focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs sm:text-sm font-extrabold block ${
                            item.checked ? "text-[#C65378]" : "text-slate-900"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <span>
                    Our legal advisors cross-examine all document chains prior to registration to make sure 100% first-time acceptance.
                  </span>
                  <a
                    href="/tools/will-checklist"
                    className="font-bold text-[#C65378] hover:text-[#a13c5d] inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Download Interactive Asset Checklist</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="dnh-dd-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET BEQUEST CATEGORIES</span>
                </div>
                {/* H2: 55 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Asset Categories: Industrial, Heritage &amp; Urban Plots
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A full testamentary Will can cover every category of immovable and movable assets owned within Dadra and Nagar Haveli and Daman and Diu or across India:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Factory className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Industrial Plants &amp; MSME Units
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Piparia, Masat, Khadoli, and Kadaiya factories, plant equipment, industrial leasehold plots, and factory licenses.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Portuguese Heritage Houses
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Family stone residences in Moti Daman and Diu Fort quarter, coastal townhouses, and family heritage compounds.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Farm &amp; Tenancy Lands
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Orchards, farmland, and rural parcels in DNH adhering to the Land Reforms Regulation 1971 for lawful name change.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Anchor className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Coastal Resorts &amp; Hotels
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hospitality assets along Devka, Jampore, and Nagoa beaches, restaurant businesses, and shop leases.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <Home className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Home Flats &amp; Plots
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern apartments and row houses in Silvassa and Nani Daman registered under SMC and DMC property tax registers.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Demat, FDs &amp; Corporate Equity
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bank fixed deposits, private limited company shares, partnership capitals, mutual funds, and digital assets.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP DUTY */}
            <section
              id="dnh-dd-registration-fees"
              className="scroll-target space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FEE STRUCTURE</span>
                </div>
                {/* H2: 50 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Fees &amp; Stamp Duty: Registration Schedule in UT
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Testamentary instruments enjoy significant legal fee concessions compared to inter-vivos property transfers like gift deeds or sale deeds:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4 sm:p-5">Instrument Type</th>
                        <th className="p-4 sm:p-5">Stamp Duty Rate</th>
                        <th className="p-4 sm:p-5">Registration Fee</th>
                        <th className="p-4 sm:p-5">Effective Timing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50 transition-colors bg-rose-50/30">
                        <td className="p-4 sm:p-5 font-bold text-[#C65378]">
                          Testamentary Will (Book III)
                        </td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700">
                          ₹0 (Exempt from ad-valorem stamp duty)
                        </td>
                        <td className="p-4 sm:p-5 font-bold text-emerald-700">
                          Nominal flat fee (₹100 - ₹500 + scanning)
                        </td>
                        <td className="p-4 sm:p-5">Takes effect only after Will maker&apos;s death</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">
                          Gift Deed (Family Transfer)
                        </td>
                        <td className="p-4 sm:p-5">Ad-valorem percentage on market value</td>
                        <td className="p-4 sm:p-5">1% of property price check</td>
                        <td className="p-4 sm:p-5">Immediate transfer of ownership</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-900">
                          Sale Deed (Conveyance)
                        </td>
                        <td className="p-4 sm:p-5">Full ad-valorem stamp duty on circle rate</td>
                        <td className="p-4 sm:p-5">1% of transaction value</td>
                        <td className="p-4 sm:p-5">Immediate transfer of ownership</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL SERVICES &amp; PRICING</span>
                </div>
                {/* H2: 49 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Packages &amp; Pricing: Transparent Legal Support
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the plan that matches your family&apos;s estate planning and registration rules:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1: ONLINE DRAFT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Standard Digital Will
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">₹1,990</span>
                        <span className="text-xs text-slate-500 font-semibold">one-time</span>
                      </div>
                      <p className="text-xs text-slate-500">For home flats, plots &amp; investments</p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant online legal drafting questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 63 ISA compliant testamentary clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Executor &amp; minor guardian appointments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Attestation and witness guideline manual</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Select Online Draft
                  </a>
                </div>

                {/* TIER 2: ADVOCATE REVIEW (FEATURED) */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 sm:p-7 shadow-lg shadow-[#C65378]/10 flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Recommended
                  </div>

                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                      Lawyer Talk &amp; Review
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">₹4,990</span>
                        <span className="text-xs text-slate-500 font-semibold">one-time</span>
                      </div>
                      <p className="text-xs text-slate-500">For industrial units, Portuguese code &amp; family businesses</p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Everything in the Online Draft plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 talk with senior succession lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom clauses for Silvassa factories &amp; DIC licenses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Portuguese Civil Code communion analysis for Daman/Diu</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor mental fitness paper format</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-[#C65378] text-white font-bold text-xs sm:text-sm hover:bg-[#a13c5d] transition-colors text-center cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Select Lawyer Review
                  </a>
                </div>

                {/* TIER 3: COMPLETE SRO REGISTRATION */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Sub-Registrar Accompaniment
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">₹9,990</span>
                        <span className="text-xs text-slate-500 font-semibold">one-time</span>
                      </div>
                      <p className="text-xs text-slate-500">Full done-for-you Book III registration &amp; doorstep visits</p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete lawyer drafting &amp; legal review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>SRO appointment slot booking at Silvassa, Daman, or Diu</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical lawyer accompaniment at the registry counter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep commission support for seniors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>End-to-end Book III registration completion</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/services/will-registration"
                    className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Select Full SRO Support
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section
              id="frequently-asked-questions"
              className="scroll-target space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMONLY ASKED QUESTIONS</span>
                </div>
                {/* H2: 54 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Succession in DNH &amp; DD
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key practical questions regarding Will making, registration, probate exemption, and property succession in Dadra and Nagar Haveli and Daman and Diu:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section
              id="statutory-citations"
              className="scroll-target space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS &amp; LEGAL REFERENCES</span>
                </div>
                {/* H2: 53 chars (<= 70) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Rules: Governing Succession &amp; Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Formal legal rules governing testamentary drafting, attestation, registration, and property name change in Dadra and Nagar Haveli and Daman and Diu:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Section 63, Indian Succession Act, 1925
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mandates the formal rules of signing for unprivileged Wills: writing, Will maker&apos;s signature or mark, and attestation by two or more independent witnesses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Section 18(e) &amp; Section 31, Registration Act, 1908
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Establishes that Will registration is optional, and authorizes Sub-Registrars to conduct special commission visits to the residence of infirm testators.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Portuguese Civil Code, 1867 (Daman &amp; Diu)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Preserves historical civil law rules regarding communion of matrimonial property (communio bonorum) and reserved legal portions for native lineages.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Dadra &amp; Nagar Haveli Land Reforms Regulation, 1971
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 8 strictly restricts the alienation or transfer of farm occupancy rights held by Scheduled Tribe occupants to non-tribal persons.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Section 213, Indian Succession Act, 1925
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Confirms that High Court probate is not needed for Wills concerning land and flats situated outside historical presidency town limits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    The Dadra &amp; Nagar Haveli and Daman &amp; Diu Merger Act, 2019
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Act 44 of 2019 unified the office framework of both territories under a single Union Territory while preserving existing regional land records.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH RES IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#172228] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <button
              onClick={() => setShowHighResModal(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[16/9] bg-[#172228]">
              <Image
                src="/images/will-drafting-in-dadra-and-nagar-haveli-and-daman-and-diu.jpg"
                alt="Legal Will Drafting and Property Succession in Dadra and Nagar Haveli and Daman and Diu"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="p-4 bg-[#172228] border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">
                Dadra &amp; Nagar Haveli and Daman &amp; Diu Succession Blueprint
              </span>
              <span>16:9 Standard High-Definition View</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING MOBILE BOTTOM CTA BAR
          ========================================================================= */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <a
            href="/start"
            onClick={handleStartDraft}
            className="flex-1 py-3 px-4 rounded-xl bg-[#C65378] text-white font-extrabold text-xs sm:text-sm text-center shadow-md shadow-[#C65378]/25 cursor-pointer"
          >
            Draft Your UT Will Online
          </a>
          <a
            href="#dnh-dd-sro-directory"
            className="py-3 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center border border-slate-200"
          >
            SRO Directory
          </a>
        </div>
      </div>
    </div>
  );
}
