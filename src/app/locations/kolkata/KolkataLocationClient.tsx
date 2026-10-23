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
  Scale,
  Building,
  Sparkles,
  Check,
  Landmark,
  MapPin,
  Search,
  FileQuestion,
  ExternalLink,
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
  { id: "kolkata-overview", label: "OVERVIEW" },
  { id: "kolkata-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "calcutta-probate-rules", label: "PROBATE RULES" },
  { id: "kolkata-sro-directory", label: "SRO DIRECTORY" },
  { id: "kolkata-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-kolkata-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "kolkata-property-types", label: "PROPERTY TYPES" },
  { id: "kolkata-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const KOLKATA_DISTRICTS = [
  {
    id: "ara-kolkata",
    name: "ARA Kolkata (Core City)",
    sro: "Registrar of Assurances (ARA I, II, III & IV Kolkata)",
    address: "5, Council House Street & Stephen House, B.B.D. Bagh, Kolkata - 700001",
    areas: "BBD Bagh, Park Street, Camac Street, Theatre Road, Bowbazar, College Street, Chowringhee, Esplanade, Dharmatala, Burrabazar",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, Govt Holidays closed)",
  },
  {
    id: "dsr-alipore",
    name: "Alipore & South Kolkata",
    sro: "District Sub-Registrar (DSR I, II, III & IV South 24 Parganas)",
    address: "Alipore Treasury Building, Judges Court Road, Alipore, Kolkata - 700027",
    areas: "Alipore, New Alipore, Ballygunge, Southern Avenue, Gariahat, Jodhpur Park, Lake Gardens, Tollygunge, Dhakuria",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
  {
    id: "sro-behala",
    name: "Behala & South-West",
    sro: "Sub-Registrar Office Behala",
    address: "Diamond Harbour Road, Behala Chowrasta, Kolkata - 700034",
    areas: "Behala, Parnasree, Thakurpukur, Sarsuna, Taratala, Joka, Diamond Harbour Road",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
  {
    id: "sro-kasba",
    name: "Kasba & EM Bypass",
    sro: "Sub-Registrar Office Kasba",
    address: "Rajdanga Main Road, Kasba (near Ruby Hospital), Kolkata - 700107",
    areas: "Kasba, Ruby, Anandapur, Santoshpur, Mukundapur, Jadavpur, Garia, EM Bypass Corridor",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
  {
    id: "sro-cossipore",
    name: "North Kolkata & Dum Dum",
    sro: "Sub-Registrar Office Cossipore-Dum Dum",
    address: "Cossipore Road & Dum Dum Road, Sinthee, Kolkata - 700002",
    areas: "Shyambazar, Bagbazar, Shobhabazar, Hatibagan, Cossipore, Dum Dum, Sinthee, Baranagar",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
  {
    id: "sro-sealdah",
    name: "Sealdah & Central East",
    sro: "Sub-Registrar Office Sealdah",
    address: "Acharya Prafulla Chandra Road, Sealdah, Kolkata - 700009",
    areas: "Sealdah, Beliaghata, Entally, Tangra, Phoolbagan, Kankurgachi, Ultadanga",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
  {
    id: "sro-bidhannagar",
    name: "Salt Lake & New Town",
    sro: "SRO Bidhannagar & DSR Barasat (North 24 Parganas)",
    address: "Mayukh Bhavan / Purta Bhavan, DF Block, Sector 1, Bidhannagar, Kolkata - 700091",
    areas: "Salt Lake (Sectors 1 to 5), New Town (Action Areas 1, 2, 3), Rajarhat, Lake Town, Bangur Avenue, VIP Road",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
  {
    id: "dsr-howrah",
    name: "Howrah & Shibpur",
    sro: "District Sub-Registrar (DSR I & II Howrah)",
    address: "Howrah Collectorate Building, Rishi Bankim Chandra Road, Howrah - 711101",
    areas: "Howrah City, Shibpur, Bally, Salkia, Mandirtala, Botanical Garden, Foreshore Road",
    timings: "10:00 AM to 5:00 PM (Monday to Friday)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Testator Identity & Age Proof",
    detail: "Aadhaar card, PAN card, or Passport confirming identity and legal age (18+).",
    checked: false,
  },
  {
    id: "item-2",
    label: "KMC Assessee & Property Records",
    detail: "Kolkata Municipal Corporation property tax receipt, Assessee Number, Title Deed, or Sale Deed.",
    checked: false,
  },
  {
    id: "item-3",
    label: "Salt Lake / Housing Lease Papers",
    detail: "Urban Development Department 999-year lease deed or WBHIDCO allotment letter for New Town flats.",
    checked: false,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate",
    detail: "Signed by a registered MBBS physician confirming sound testamentary capacity and alert mind.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Two Independent Adult Witnesses",
    detail: "Two adult witnesses with valid photo IDs who are not beneficiaries or legatees in the Will.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Designated Executor Details",
    detail: "Full legal name, residential address, and phone number of the executor who will file for probate.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Dayabhaga Share Demarcation",
    detail: "Clear description of ancestral shares, self-acquired flats, and movable bank/demat portfolios.",
    checked: false,
  },
  {
    id: "item-8",
    label: "West Bengal e-District Token Slip",
    detail: "Downloaded appointment confirmation slip from the West Bengal Registration portal (wbregistration.gov.in).",
    checked: false,
  },
];

export default function KolkataLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("kolkata-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ara-kolkata");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState<string>("" );
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

  const filteredDistricts = KOLKATA_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    KOLKATA_DISTRICTS.find((d) => d.id === selectedDistrict) || KOLKATA_DISTRICTS[0];

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
                <span>KOLKATA &amp; WEST BENGAL SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 56 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Kolkata: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your ancestral and self-acquired assets across Kolkata.
                Get expert advocate drafting, Calcutta High Court probate guidance, and West Bengal SRO e-appointment support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Kolkata Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#kolkata-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Kolkata SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Calcutta HC Probate Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 West Bengal Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULLY VISIBLE IN MOBILE & DESKTOP */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-kolkata.jpg"
                  alt="Online Will Drafting and Probate Assistance in Kolkata"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
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
                8 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Kolkata Metro &amp; ARA
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 213
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Calcutta HC Probate Rules
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Dayabhaga Law
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Absolute Disposal Power
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
          
          {/* =====================================================================
              DESKTOP VIEW: STICKY TABLE OF CONTENTS
              ===================================================================== */}
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

          {/* =====================================================================
              MAIN EDITORIAL CONTENT AREA
              ===================================================================== */}
          <main className="min-w-0 flex-1 space-y-16">
            
            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="kolkata-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>KOLKATA SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Drafting &amp; Probate in Kolkata
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Dayabhaga Heritage</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      West Bengal follows the Dayabhaga school of Hindu law. Unlike Mitakshara coparcenary rules, children have no birthright in ancestral property. The father has full legal authority to bequeath all property freely.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Mandatory Probate in Kolkata</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 213 of the Indian Succession Act, 1925, probate is compulsory for Hindu, Buddhist, Sikh, and Jain Wills executed or holding property within the Calcutta High Court original civil jurisdiction.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills in West Bengal attract ₹0 stamp duty. At the Registrar of Assurances (ARA) or local District Sub-Registrar offices, testators pay only a flat nominal registration fee of ₹100 to ₹200.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Smooth KMC Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A probated and registered Will enables rapid name substitution before the Kolkata Municipal Corporation (KMC) Revenue Department and Urban Development Department for Salt Lake leaseholds.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK & DAYABHAGA LAW */}
            <section id="kolkata-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework: Indian Succession &amp; Dayabhaga Law
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will drafting in Kolkata is guided by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the historical <strong>Dayabhaga school of Hindu succession</strong>.
                  Any adult of sound mind can write a Will to dispose of real estate, bank deposits, mutual funds, company shares, and jewelry.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kolkata possesses distinctive estate succession rules.
                  In West Bengal, the Dayabhaga system ensures the property owner enjoys complete ownership during their lifetime.
                  Whether your assets include an ancestral rajbari in North Kolkata, a flat in Ballygunge, or a commercial shop on Park Street, drafting a structured Will prevents bitter family partition lawsuits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years old and possess sound testamentary capacity (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The document must be executed voluntarily without family coercion, undue influence, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of two adult witnesses who attest your signature (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not receive any gift, property, or legacy under the Will (Section 67).
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
                  2. Is Will Registration Mandatory in West Bengal?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is strictly <strong>optional</strong>.
                  An unregistered Will executed on plain paper is legally enforceable in Indian courts if properly executed and attested before two witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, in Kolkata, registering your Will at the Registrar of Assurances (ARA) or District Sub-Registrar (DSR) office is strongly advised by legal counsel.
                  A registered Will creates vital documentary proof that significantly eases the mandatory Calcutta High Court probate process:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Kolkata ARA / DSR)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Record</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives at the Registry office</td>
                      <td className="p-4 bg-slate-50/20">Kept in personal custody with high risk of loss or tampering</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Calcutta HC Probate</td>
                      <td className="p-4 bg-rose-50/20">Biometrics and official seal simplify proof of due execution</td>
                      <td className="p-4 bg-slate-50/20">Disputing relatives can easily allege forgery or undue influence</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">KMC Property Mutation</td>
                      <td className="p-4 bg-rose-50/20">Accelerated municipal approval with certified government copy</td>
                      <td className="p-4 bg-slate-50/20">Municipal assessors often require affidavits from all legal heirs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Presumption of Genuineness</td>
                      <td className="p-4 bg-rose-50/20">Strong presumption of validity under Section 60 of the Act</td>
                      <td className="p-4 bg-slate-50/20">The propounder carries heavy burden to remove suspicious circumstances</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">West Bengal Govt Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 - ₹200 statutory fee</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 government fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: CALCUTTA HIGH COURT PROBATE RULES */}
            <section id="calcutta-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION 213 COMPLIANCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Calcutta High Court Probate Rules: Section 213
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kolkata holds an exceptional position in Indian succession jurisprudence.
                  As one of the historic British presidency towns alongside Mumbai and Chennai, Kolkata is subject to the mandatory probate provisions of the Indian Succession Act, 1925.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-2 md:w-1/2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Section 213: Mandatory Probate Requirement</span>
                    </div>
                    <p>
                      Section 213(1) of the Indian Succession Act provides that no right as executor or legatee can be established in any court of justice unless probate or letters of administration have been formally granted.
                    </p>
                    <p>
                      Under Section 57(a) and 57(b), this statutory mandate applies compulsorily to Hindu, Buddhist, Sikh, and Jain Wills executed within the Ordinary Original Civil Jurisdiction of the Calcutta High Court, or where the Will relates to immovable property situated within those colonial limits.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs leading-relaxed space-y-2 md:w-1/2">
                    <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Calcutta High Court vs District Courts</span>
                    </div>
                    <p>
                      For properties situated within the core colonial limits of Kolkata (Original Side), probate petitions are filed before the Calcutta High Court.
                    </p>
                    <p>
                      For properties situated in extended suburban areas (such as Alipore, Behala, Jadavpur, Salt Lake, and Barasat), probate or letters of administration petitions are filed before the competent District Judge at Alipore (South 24 Parganas) or Barasat (North 24 Parganas).
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-600">
                    Need to draft a Will specifically structured to pass Calcutta High Court probate without delay?
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/service/probate-lawyer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold transition-colors"
                    >
                      <span>Consult Kolkata Probate Advocate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: KOLKATA SRO DIRECTORY */}
            <section id="kolkata-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Kolkata Sub-Registrar Offices: SRO Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Kolkata, registration of documents is handled across the historic Registrar of Assurances (ARA) and various District Sub-Registrar (DSR) offices under the Directorate of Registration and Stamp Revenue, West Bengal.
                  You can register your Will where you reside or where your real estate is situated:
                </p>
              </div>

              {/* INTERACTIVE SRO SEARCH CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Alipore, Salt Lake, Behala)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {KOLKATA_DISTRICTS.length} Kolkata Registry Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
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

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        {activeDistrictData.name}
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
                      Official Appointment Portal: <strong>wbregistration.gov.in</strong>
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

            {/* SECTION 5: AREA-WISE WILL DRAFTING ACROSS KOLKATA */}
            <section id="kolkata-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Kolkata Localities
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Ballygunge, Alipore, Salt Lake, or New Town</strong>? Properties across Kolkata span heritage ancestral rajbaris, modern high-rises in New Town, 999-year leasehold plots in Salt Lake, and luxury condominiums in Ballygunge and Alipore.
                  Our senior advocates provide comprehensive legal drafting and SRO registration support across all key hubs:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: BALLYGUNGE & ALIPORE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Kolkata Prime
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Alipore / Judges Court
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ballygunge &amp; Alipore
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ballygunge Circular Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alipore Park Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Alipore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Southern Avenue &amp; Gariahat</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in Ballygunge &amp; Alipore</strong>? Ballygunge and Alipore host prestigious residential estates, luxury bungalows, and high-value family trusts.
                      Our advocates draft customized bequests covering KMC tax mutations, demat securities, and multi-generational real estate allocations to prevent contentious partition disputes before the District Judge at Alipore.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Registry Hub: Alipore Treasury Complex (DSR I-IV)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep registration for senior citizens across Alipore and Ballygunge under Section 31 home commission.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ballygunge &amp; Alipore"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ballygunge Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: PARK STREET & CENTRAL KOLKATA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central Heritage Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        ARA Kolkata (Council House)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Park Street &amp; BBD Bagh
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Park Street</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Camac Street</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shakespeare Sarani</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chowringhee &amp; Bowbazar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get specialized <strong>Will drafting services in Park Street &amp; BBD Bagh</strong>. Central Kolkata encompasses prominent commercial properties, tenanted premises under the West Bengal Premises Tenancy Act, and century-old family businesses.
                      Because properties lie directly within Calcutta High Court original civil jurisdiction, mandatory probate clauses and clear executor powers are essential.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Registry Hub: Registrar of Assurances, 5 Council House St</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete SRO attendance and Calcutta High Court Original Side probate filing coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Section 213 HC Probate Compliant</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Park Street &amp; Central Kolkata"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Central Kolkata Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SALT LAKE & NEW TOWN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        IT Corridor &amp; Planned Hubs
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bidhannagar / Barasat
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Salt Lake &amp; New Town
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Salt Lake Sectors 1-5</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Town Action Areas 1, 2, 3</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajarhat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lake Town &amp; VIP Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Opt for premier <strong>Will drafting services in Salt Lake &amp; New Town</strong>. Salt Lake properties feature 999-year leasehold plots allotted by the Urban Development Department, requiring specific testamentary compliance for Nagarayan Bhavan mutation.
                      In New Town, high-rise apartment bequests demand clear nomination and co-operative society succession clauses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Registry Hub: Mayukh Bhavan / Purta Bhavan (Bidhannagar SRO)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Seamless e-registration guidance for IT professionals and NRI property owners.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">UDD Leasehold &amp; WBHIDCO Aligned</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Salt Lake &amp; New Town"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Salt Lake Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: SHYAMBAZAR & NORTH KOLKATA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Heritage Paras
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Cossipore-Dum Dum
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Shyambazar &amp; Shobhabazar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shyambazar Five-Point</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shobhabazar Rajbari Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bagbazar &amp; Hatibagan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cossipore &amp; Dum Dum</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure expert <strong>Will drafting services in Shyambazar &amp; Shobhabazar</strong>. North Kolkata holds generations-old family properties, undivided Dayabhaga co-heir estates, and heritage structures.
                      Under Dayabhaga law, a father holds unrestricted right to dispose of ancestral assets. A structured Will defines precise room or floor distributions, eliminating joint tenancy stalemates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Registry Hub: Sinthee / Cossipore-Dum Dum SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Specialized drafting for joint family partitions and doctor mental fitness certification for elders.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Dayabhaga Ancestral Asset Security</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Shyambazar &amp; North Kolkata"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft North Kolkata Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: JADAVPUR, GARIA & KASBA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South-East Metro Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kasba / DSR Alipore
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jadavpur, Kasba &amp; Garia
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jadavpur &amp; Dhakuria</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kasba Rajdanga</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Garia &amp; Tollygunge</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mukundapur &amp; Anandapur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Jadavpur, Kasba &amp; Garia</strong>. This expansive residential zone features multi-story cooperative apartments, standalone houses, and hospital hub properties along the EM Bypass.
                      Our estate planning ensures swift KMC Assessee Number updates, bank account transmissions, and hassle-free executor guidance.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Registry Hub: SRO Kasba (near Ruby Hospital)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online e-District slot management and senior citizen home visits along the EM Bypass corridor.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">KMC Tax &amp; Bank Account Transmission</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jadavpur, Kasba &amp; Garia"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jadavpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: BEHALA & JOKA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Diamond Harbour Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Behala
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Behala, Thakurpukur &amp; Joka
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Behala Chowrasta &amp; Tram Depot</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Parnasree Pally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thakurpukur &amp; Sarsuna</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Joka Metro Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Protect your family assets with <strong>Will drafting services in Behala, Thakurpukur &amp; Joka</strong>. Covering extensive freehold housing societies and developing townships along Diamond Harbour Road.
                      Our legal team assists in drafting unambiguous bequests for family homes, resolving undivided ancestral shares, and coordinating SRO Behala registration with zero stamp duty.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Registry Hub: SRO Behala, Diamond Harbour Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Prompt slot booking on wbregistration.gov.in and advocate accompaniment for testators.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Freehold &amp; Cooperative Flat Support</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Behala &amp; Joka"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Behala Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-kolkata-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>5-STEP EXECUTION PROTOCOL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Kolkata
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Executing a legally binding Will in Kolkata requires statutory compliance with both the Indian Succession Act and West Bengal registration protocols.
                  Follow our verified five-step procedure:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Catalog Assets and Clarify Dayabhaga Title
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      List all immovable properties in Kolkata with their KMC Assessee Numbers, Salt Lake lease details, or Rajarhat allotment numbers.
                      Under Dayabhaga law, verify that you hold sole ownership without conflicting co-heir disputes. Document your bank accounts, mutual funds, and demat accounts.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Draft Specialized Clauses with Kolkata Estate Counsel
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will incorporating specific revocation of prior wills, survivorship clauses, and unambiguous executor appointments.
                      Since Kolkata properties fall under mandatory Calcutta High Court probate rules, exact wording prevents future citation challenges by distant relatives.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Sign Before Two Independent Adult Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final Will on plain white A4 paper.
                      Sign the bottom of each page in the physical presence of two adult witnesses who are not beneficiaries or spouses of beneficiaries.
                      Both witnesses must sign the attestation clause in your presence (Section 63 compliance).
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Book West Bengal e-District / Registration Token
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log onto the West Bengal Directorate of Registration portal (wbregistration.gov.in) to generate your e-Deed application for Book III.
                      Select your jurisdiction SRO (ARA Kolkata, DSR Alipore, SRO Bidhannagar, or SRO Behala), pay the nominal fee, and download the appointment token.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Complete Biometric Verification at the Registry Office
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO with your two witnesses and original photo IDs.
                      The Sub-Registrar captures biometric thumbprints and digital photographs of the testator and witnesses.
                      The Will is entered into Book III, and the original endorsed document is returned or deposited in sealed custody under Section 42.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISITS FOR SENIORS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP LEGAL RELIEF</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Registration for Seniors
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 31 of the Registration Act, 1908, the Sub-Registrar has the legal authority to visit the private residence, hospital room, or nursing home of a testator who is physically unable to travel.
                  This provides critical dignity and protection for elderly citizens across Kolkata:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-sm text-slate-900 block">1. Medical Certificate</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain an MBBS doctor certificate declaring the testator is physically unable to visit the registry office but possesses sound mental alertness.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-sm text-slate-900 block">2. Commission Requisition</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our advocate files a formal petition before the Registrar of Assurances or District Sub-Registrar along with the doctor certificate and government fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-sm text-slate-900 block">3. Home Execution</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar visits your Kolkata residence with portable biometric equipment to record signatures, thumbprints, and witness attestations.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-sm text-[#C65378] block">
                      Need Doorstep Registration for an Elderly Parent in Kolkata?
                    </span>
                    <p className="text-xs text-slate-600">
                      Our Kolkata estate team coordinates the doctor certificate, SRO petition, and commission scheduling from start to finish.
                    </p>
                  </div>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors shrink-0"
                  >
                    <span>Request Doorstep Support</span>
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
                  <span>INTERACTIVE READINESS TOOL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for West Bengal Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure you have all necessary paperwork assembled before booking your Kolkata registry appointment.
                  Use this interactive checklist to verify your document readiness:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      READINESS STATUS:
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {checkedCount} of {checklist.length} Documents Checked
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {Math.round((checkedCount / checklist.length) * 100)}% Complete
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200 shadow-2xs"
                          : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-xs font-bold block ${item.checked ? "text-[#C65378]" : "text-slate-900"}`}>
                          {item.label}
                        </span>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: KOLKATA PROPERTY TYPES */}
            <section id="kolkata-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ESTATE ARCHITECTURE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Kolkata Property Types: Ancestral, KMC &amp; Leases
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate in the Kolkata Metropolitan Area presents distinct legal tenures.
                  Your Will must address the specific requirements of each asset class:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Dayabhaga Ancestral Property</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Dayabhaga law, ancestral assets do not vest by birth. The patriarch or matriarch holds absolute ownership.
                    The Will should clearly demarcate physical portions or fractional shares to prevent co-heir deadlocks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>KMC Freehold Apartments &amp; Houses</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Freehold properties governed by the Kolkata Municipal Corporation require KMC Assessee Number updating.
                    A probated Will is the gold standard document for title mutation without demanding non-encumbrance indemnities.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Salt Lake 999-Year Leasehold Plots</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allotted by the Urban Development Department (UDD), Government of West Bengal.
                    The Will must incorporate clauses respecting the original lease agreement. Following probate, heirs mutate records at Nagarayan Bhavan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Thika Tenancy &amp; Tenanted Properties</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the West Bengal Thika Tenancy Act, land vests with the State while structures belong to the tenant.
                    Wills must separate the structural interest from the underlying land and comply with the Thika Controller guidelines.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & STAMP DUTY */}
            <section id="kolkata-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT EXPENSE AUDIT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. West Bengal Registration Fees &amp; Stamp Duty Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in West Bengal is highly economical.
                  Under the Indian Stamp Act, 1899, Wills are entirely exempt from stamp duty across India:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Statutory Fee Head</th>
                      <th className="p-4 font-bold">Government Amount</th>
                      <th className="p-4 font-bold">Legal Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">West Bengal Stamp Duty</td>
                      <td className="p-4 font-extrabold text-emerald-600">₹0 (Completely Exempt)</td>
                      <td className="p-4">Wills do not require non-judicial stamp paper or percentage property duty.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Sub-Registrar Registration Fee</td>
                      <td className="p-4 font-extrabold text-slate-900">₹100 to ₹200</td>
                      <td className="p-4">Nominal statutory registration fee under West Bengal Registration Rules.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Scanning &amp; User Charges</td>
                      <td className="p-4 font-extrabold text-slate-900">₹100 to ₹300</td>
                      <td className="p-4">Official computerization and digital archiving charges at the SRO.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Commission</td>
                      <td className="p-4 font-extrabold text-slate-900">₹500 to ₹1,500</td>
                      <td className="p-4">Official government conveyance allowance for home visits to seniors.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Calcutta High Court Probate Court Fee</td>
                      <td className="p-4 font-extrabold text-amber-700">Ad-Valorem (Capped at ₹50,000)</td>
                      <td className="p-4">Court Fees Act (WB Amendment) caps maximum probate court fee at ₹50,000.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal support tailored to your estate.
                  All packages include professional advocate review and Calcutta High Court probate compliance checks:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      STANDARD PLAN
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Lawyer-Drafted Will
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#172228]">₹1,990</span>
                      <span className="text-xs text-slate-500 font-bold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individuals with straightforward assets like a Kolkata apartment, bank deposits, and demat shares.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>High Court Advocate Vetted</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>KMC &amp; Demat Asset Clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Witness Instructions Checklist</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>48-Hour Digital Delivery</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold text-center transition-colors cursor-pointer"
                  >
                    Select Standard Plan
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-[#172228] text-white border-2 border-[#C65378] p-6 shadow-xl flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-[10px] font-black uppercase tracking-wider text-white">
                    MOST RECOMMENDED FOR KOLKATA
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300 block">
                      COMPREHENSIVE PLAN
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      Senior Advocate Review
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">₹4,990</span>
                      <span className="text-xs text-slate-300 font-bold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Recommended for estates involving Dayabhaga ancestral shares, Salt Lake leases, or business assets.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-200 pt-3 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>1-on-1 Senior Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Calcutta HC Probate Structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Custom Ancestral Asset Clauses</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold text-center transition-colors shadow-md cursor-pointer"
                  >
                    Select Comprehensive Plan
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      FULL SRO &amp; DOORSTEP
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Sub-Registrar Service
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#172228]">₹9,990</span>
                      <span className="text-xs text-slate-500 font-bold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      End-to-end management including West Bengal portal booking, advocate attendance, and Section 31 home visits.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Comprehensive</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>e-District Slot &amp; Token Scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical Advocate SRO Attendance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 Doorstep Requisition</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/contact"
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold text-center transition-colors cursor-pointer"
                  >
                    Request SRO Registration
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUESTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Kolkata Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key questions regarding Will registration, Calcutta High Court probate, and Dayabhaga property rights in West Bengal:
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
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
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
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY REFERENCES & LEGAL PORTALS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL AUTHORITY &amp; PORTALS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory References &amp; West Bengal Legal Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Key statutes, judicial authorities, and official government portals governing estate succession and Will registration across Kolkata:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act, 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 63, 67, and Section 213 read with Section 57 (Presidency Town Mandatory Probate Rules).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act, 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration), Section 31 (Home Commission), and Section 42 (Sealed Cover Deposit).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Court Fees (West Bengal Amendment) Act
                  </span>
                  <p className="text-xs text-slate-600">
                    Governs ad-valorem probate court fees with a statutory maximum ceiling of ₹50,000 for high-value estates.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    West Bengal Registration Portal
                  </span>
                  <a
                    href="https://wbregistration.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C65378] font-bold hover:underline"
                  >
                    <span>wbregistration.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    West Bengal e-District Portal
                  </span>
                  <a
                    href="https://edistrict.wb.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C65378] font-bold hover:underline"
                  >
                    <span>edistrict.wb.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Calcutta High Court (Original Side)
                  </span>
                  <p className="text-xs text-slate-600">
                    High Court of Judicature at Calcutta testamentary jurisdiction for grants of probate and letters of administration.
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL VIEW FOR INFOGRAPHIC / VISUAL BLUEPRINT
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#172228] rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-3 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10 mb-3">
              <span className="text-xs sm:text-sm font-bold text-white">
                Visual Blueprint: Kolkata Will Drafting &amp; Probate Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src="/images/will-drafting-in-kolkata.jpg"
                alt="High Resolution Visual Blueprint: Kolkata Will Drafting and Probate Architecture"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
