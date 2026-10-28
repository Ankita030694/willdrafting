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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "raipur-overview", label: "OVERVIEW" },
  { id: "raipur-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "raipur-probate-rules", label: "PROBATE RULES" },
  { id: "raipur-sro-directory", label: "SRO DIRECTORY" },
  { id: "raipur-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-raipur-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "raipur-property-types", label: "PROPERTY TYPES" },
  { id: "raipur-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const RAIPUR_DISTRICTS = [
  {
    id: "raipur-central",
    name: "Raipur Central (Civil Lines & Collectorate)",
    sro: "Senior Sub-Registrar Office Raipur 1 (Collectorate)",
    address: "District Collectorate Campus, Civil Lines / Katora Talab Road, Raipur, Chhattisgarh - 492001",
    areas: "Civil Lines, Shankar Nagar, Katora Talab, Byron Bazar, Raja Talab, Telibandha, Marine Drive (Telibandha Talab), VIP Road, GE Road, Police Lines, Raj Bhavan enclave",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "pandri-devendra",
    name: "Pandri & Devendra Nagar (Commercial Core)",
    sro: "Sub-Registrar Office Raipur 2 (Pandri)",
    address: "Near Cloth Market Complex, Devendra Nagar / Pandri, Raipur, Chhattisgarh - 492004",
    areas: "Pandri Cloth Market, Devendra Nagar, Mowa, Lodhipara, Khamtarai, Samta Colony, Choubey Colony, Gudhiyari, Tagore Nagar, Fafadih, Station Road",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "nava-raipur",
    name: "Nava Raipur Atal Nagar (Smart City Capital)",
    sro: "Sub-Registrar Office Nava Raipur Atal Nagar",
    address: "Sector 19 Administrative Zone, Near Mantralaya & NRANVP Bhavan, Nava Raipur, Chhattisgarh - 492018",
    areas: "Nava Raipur Sectors 1 to 40, Capitol Complex, Rakhi, Uparwara, Kayabandha, Jungle Safari zone, Smart City residential townships, institutional campuses (HNLU, IIIT)",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "dharsiwa-urla",
    name: "Dharsiwa, Urla & Siltara (Industrial Belt)",
    sro: "Sub-Registrar Office Dharsiwa",
    address: "Tehsil Office Complex, Dharsiwa / Urla Road, Raipur District, Chhattisgarh - 493221",
    areas: "Urla Industrial Area, Siltara Industrial Growth Centre, Bhanpuri, Birgaon, Rawabhatha, Sarora, Dharsiwa town, steel rolling mills, sponge iron complexes, logistics hubs",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "abhanpur-mandir-hasaud",
    name: "Abhanpur & Mandir Hasaud (Southern Belt)",
    sro: "Sub-Registrar Office Abhanpur & SRO Arang",
    address: "Tehsil Campus, NH-30 Abhanpur & Sub-Tehsil Mandir Hasaud, Raipur, Chhattisgarh - 493661",
    areas: "Abhanpur town, Mandir Hasaud logistics hub, Arang border, NH-53 corridor plots, Boriyakhurd extension, agricultural tracts, private farmhouse developments",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Final Will",
    detail: "Printed clearly on standard white A4 sheets. No expensive non-judicial stamp paper is required under Chhattisgarh law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Required for biometric thumb verification and web-camera digital photography at the Raipur SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo IDs and must not be beneficiaries receiving any property under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Issued by a registered MBBS doctor. Certifies sound testamentary capacity and prevents future allegations of incapacity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Chhattisgarh NGDRS Online Appointment Slip",
    detail: "Official e-appointment receipt downloaded from ngdrs.cg.gov.in displaying your application reference number and time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "RDA / NRANVP Allotment Letter or Bhuiyan Khasra Copy",
    detail: "Copies of RDA Kamal Vihar allotment, Nava Raipur lease deed, registered sale deed, or Bhuiyan B-1/P-II Khasra land record.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color passport photographs of the testator and both attesting witnesses for pasting in the official Book III registers.",
    checked: false,
  },
];

export default function RaipurLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("raipur-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("raipur-central");
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

  const filteredDistricts = RAIPUR_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    RAIPUR_DISTRICTS.find((d) => d.id === selectedDistrict) || RAIPUR_DISTRICTS[0];

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
                <span>RAIPUR &amp; NAVA RAIPUR ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 50 characters, compliant with SEO guidelines */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Raipur: Legal Succession
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your RDA plots in Kamal Vihar, Nava Raipur smart city homes, steel trading business equity, and family assets.
                Get senior advocate drafting, Chhattisgarh NGDRS registration advice, and Section 31 doorstep execution across Raipur.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Raipur Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#raipur-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Raipur SRO Directory</span>
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
                  <span>₹0 Chhattisgarh Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - PRESERVES FULL IMAGE VISIBILITY ON MOBILE & DESKTOP */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-16/9 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-raipur.jpg"
                  alt="Will Drafting Services in Raipur: Legal Succession and Estate Planning"
                  width={1200} height={675}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="font-semibold truncate">Raipur &amp; Nava Raipur Legal Blueprint</span>
                  <span className="text-[10px] text-rose-300 font-mono flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3" /> Full View
                  </span>
                </div>
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
                5 SRO Offices
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Raipur &amp; Nava Raipur
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
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                High Court Bilaspur Rules
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Senior Citizen Home Visits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS (STICKY BELOW NAVBAR ON MOBILE)
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
            <section id="raipur-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>CHHATTISGARH SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Raipur Estate Succession &amp; Will Drafting Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Chhattisgarh under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two independent witnesses is valid, though registration at Raipur SRO guarantees institutional acceptance.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Mandatory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Raipur was never a British presidency town. Under Section 213 of the Indian Succession Act, court probate is optional in Chhattisgarh, enabling direct property transfer and bank claim release.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur ₹0 ad-valorem stamp duty in Chhattisgarh. At the Sub-Registrar Office, testators pay only a flat nominal registration charge and standard NGDRS portal scanning fees.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct RDA &amp; NRANVP Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites title transfer before the Raipur Development Authority (RDA), Nava Raipur Atal Nagar Vikas Pradhikaran, and Raipur Municipal Corporation (RMC) tax registries.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="raipur-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Raipur
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Executing a legally binding Will in Raipur is governed by two central statutes: the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>, together with specific tenancy and mutation rules under the <strong>Chhattisgarh Land Revenue Code, 1959</strong>.
                  Any adult of sound mental disposition has the unfettered legal authority to dispose of their self-acquired real estate, commercial assets, bank fixed deposits, mutual funds, company equity, and ancestral shares to the extent permitted by personal law.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Raipur represents the industrial, commercial, and administrative core of Chhattisgarh.
                  Local families often possess diverse asset portfolios: RDA residential plots in Kamal Vihar or Indraprastha, smart city allotments in Nava Raipur Atal Nagar, wholesale textile units in Pandri, or equity in rolling mills and sponge iron complexes across Urla and Siltara.
                  Without an unambiguous, lawyer-vetted Will, your estate can become tangled in protracted family partition suits before the Raipur Civil Court.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Majority</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years of age and in sound testamentary disposition (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Voluntary Execution</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed freely without undue family pressure, coercion, or misrepresentation (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the simultaneous presence of two adult attesting witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent Status</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not be beneficiaries receiving any legacy under the drafted Will (Section 67).
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
                  2. Is Will Registration Mandatory in Chhattisgarh?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is entirely <strong>optional</strong> in the State of Chhattisgarh.
                  An unregistered Will executed on plain white A4 paper is legally valid and admissible in evidence before revenue officers and civil judges, provided the formal requirements of Section 63 of the Indian Succession Act are fulfilled.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nevertheless, estate advocates in Raipur strongly urge testators to formally register their Will through the Chhattisgarh NGDRS system.
                  Registration produces an immutable government record in Book III, creating a strong legal presumption of authenticity under Section 60:
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Raipur SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Record Keeping</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives at the Raipur Sub-Registrar Office</td>
                      <td className="p-4 bg-slate-50/20">Kept in private possession; high risk of physical loss, theft, or destruction</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Risk of Forgery Disputes</td>
                      <td className="p-4 bg-rose-50/20">Negligible. Biometric thumb impressions and photos recorded before Sub-Registrar</td>
                      <td className="p-4 bg-slate-50/20">Elevated. Discontented relatives routinely claim signature manipulation or forgery</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">RDA &amp; NRANVP Mutation</td>
                      <td className="p-4 bg-rose-50/20">Expedited mutation in Kamal Vihar or Nava Raipur with certified copy from SRO</td>
                      <td className="p-4 bg-slate-50/20">Officers frequently demand non-objection affidavits from all Class I legal heirs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Evidentiary Presumption</td>
                      <td className="p-4 bg-rose-50/20">Strong judicial presumption of genuine execution under Section 60 Registration Act</td>
                      <td className="p-4 bg-slate-50/20">Beneficiary carries full burden of proving testamentary capacity and absence of fraud</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Chhattisgarh SRO Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Nominal flat fee (₹100 to ₹500)</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 out-of-pocket cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="raipur-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT PRECEDENTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Raipur Probate Rules: Non-Presidency Town Law
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common point of confusion among property owners in Raipur is whether obtaining court probate from a civil judge is legally necessary.
                  The clear statutory position is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read in conjunction with Section 57(a) and 57(b) of the Indian Succession Act, 1925, obtaining court probate is compulsory only if the Will was executed within, or disposes of immovable property located within, the historic presidency towns of Mumbai, Kolkata, or Chennai.
                  Raipur and the entire state of Chhattisgarh fall under non-presidency jurisdiction, governed by the High Court of Chhattisgarh at Bilaspur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    General Principle: Probate Optional
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Chhattisgarh High Court Jurisprudence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Following the Supreme Court precedent in <em>Clarence Pais v. Union of India</em>, the High Court of Chhattisgarh has consistently affirmed that an executor of a Hindu, Buddhist, Jain, or Sikh Will in Chhattisgarh is not required to obtain probate before asserting proprietary rights.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Permits direct RDA mutation, bank claim payout, and share transfer</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Exceptions: When Probate is Desirable
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When Should You Consider Probate in Raipur?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Filing an optional probate application before the District Judge at the Raipur District Court Complex (near Kutchery Chowk) is beneficial if legal heirs contest the Will, if substantial ancestral industrial units are involved, or if multinational banks raise objections.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Delivers an indisputable decree in rem binding upon all heirs</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: RAIPUR SRO DIRECTORY */}
            <section id="raipur-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Raipur SRO Directory: Civil Lines, Pandri &amp; Nava
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 32 of the Registration Act, 1908, a Will can be presented for registration at the Sub-Registrar Office within whose sub-district the testator resides.
                  Select your area below to view the designated SRO office, address, and operational details:
                </p>
              </div>

              {/* INTERACTIVE BENTO SRO HUB */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 md:p-6 shadow-xs space-y-5">
                
                {/* SEARCH INPUT & COUNT STRIP */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search Shankar Nagar, Pandri, Nava Raipur, Urla..."
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C65378] focus:bg-white transition-all"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {RAIPUR_DISTRICTS.length} Raipur SRO Jurisdictions
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

                {/* ACTIVE DISTRICT CARD */}
                <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-rose-50/20 border border-slate-200/90 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                        ACTIVE SUB-REGISTRAR OFFICE
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        {activeDistrictData.sro}
                      </h3>
                    </div>
                    <span className="self-start sm:self-auto text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      NGDRS e-Appointment Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        Official Physical Address:
                      </span>
                      <p className="text-slate-600 leading-relaxed pl-5">
                        {activeDistrictData.address}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                        Operational Timings:
                      </span>
                      <p className="text-slate-600 leading-relaxed pl-5">
                        {activeDistrictData.timings}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70">
                    <span className="font-bold text-xs text-slate-900 block mb-1.5">
                      Prominent Neighborhoods &amp; Schemes Covered:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/70">
                      {activeDistrictData.areas}
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 5: LOCAL COVERAGE */}
            <section id="raipur-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Local Coverage: Raipur &amp; Nava Raipur Atal Nagar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Raipur span upscale residential residences in Shankar Nagar and Civil Lines, expansive RDA schemes like Kamal Vihar, greenfield smart city developments in Nava Raipur Atal Nagar, commercial wholesale centers in Pandri, and heavy steel industrial complexes in Urla and Siltara. Our estate advocates deliver customized legal drafting, Chhattisgarh NGDRS e-Panjiyan slot scheduling, and Sub-Registrar accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: SHANKAR NAGAR & CIVIL LINES */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-East Luxury Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Raipur 1 (Civil Lines)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting on Shankar Nagar &amp; Civil Lines
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shankar Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katora Talab</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Byron Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raja Talab</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting on Shankar Nagar and Civil Lines</strong> for premium freehold bungalows, duplex kothis, and high-rise apartments. Codifies clear title devolution for residential estates, bank locker allocations, mutual funds, and precious family jewelry to prevent co-parcenary partition disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Civil Lines</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Chhattisgarh NGDRS slot booking, advocate physical attendance, and Section 31 doorstep execution for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Shankar Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Shankar Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: KAMAL VIHAR & NAVA RAIPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        RDA Township &amp; Smart City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nava Raipur &amp; SRO 1
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting on Kamal Vihar &amp; Nava Raipur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kamal Vihar (RDA)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nava Raipur Sector 27</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 29 &amp; 30</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Indraprastha Raipura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Kamal Vihar</strong> and Nava Raipur Atal Nagar for plotted residential schemes and smart sector apartments. Includes precise clauses for NRANVP 99-year leasehold succession, RDA allotment letter transfers, and direct municipal tax mutation without court succession certificates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 19 Mantralaya Zone &amp; Collectorate</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        RDA allotment record verification, NRANVP lease succession drafting, and e-Panjiyan Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">RDA &amp; Smart City Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nava Raipur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nava Raipur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: PANDRI & DEVENDRA NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Commercial Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Raipur 2 (Pandri)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Pandri &amp; Devendra Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pandri Cloth Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Devendra Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mowa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lodhipara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fafadih</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Pandri and Devendra Nagar</strong> for business families owning commercial showrooms, textile wholesale shops, and residential floors. Protects business continuity through partnership equity bequests, proprietary trade licenses, director loans, and commercial asset distribution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Near Cloth Market Complex, Pandri</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Business equity transmission, commercial property documentation, and expedited Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Residential</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pandri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pandri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: VIP ROAD & TELIBANDHA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Luxury Lakeside Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Raipur 1 (Collectorate)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting on VIP Road &amp; Telibandha
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">VIP Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marine Drive (Telibandha)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Labhandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">GE Road Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Exclusive <strong>Will drafting on VIP Road and Telibandha</strong> for luxury gated communities, villas, penthouses, and commercial plots. Formulates clear life-interest covenants for surviving spouses, structured trust bequeathals for minor grandchildren, and overseas investment transfer clauses for NRI family members.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Lines / Katora Talab Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth estate structuring, private family asset mapping, and priority Sub-Registrar coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Luxury Villas &amp; Penthouses</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services on VIP Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft VIP Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: URLA & SILTARA INDUSTRIAL AREA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial &amp; Manufacturing
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Dharsiwa (Industrial)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Urla &amp; Siltara Industrial Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Urla Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Siltara Growth Centre</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhanpuri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Birgaon</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rawabhatha</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting in Urla and Siltara</strong> for industrialists operating sponge iron plants, steel rolling mills, and logistics parks. Structures succession for CSIDC leasehold industrial plots, corporate shareholdings under Companies Act 2013, factory machinery, and bank guarantees to prevent operational freeze.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Office Complex, Dharsiwa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        CSIDC industrial lease transfer advisory, corporate share transfer clauses, and Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Factory Leases &amp; Corporate Equity</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Urla Siltara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Industrial Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: SAMTA COLONY & CHOUBEY COLONY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Traditional Enclaves
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Raipur 2 &amp; SRO 1
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Samta Colony &amp; Choubey Colony
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Samta Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Choubey Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gudhiyari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tagore Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tatibandh</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Focused <strong>Will drafting in Samta Colony and Choubey Colony</strong> for multi-generational family homes, ancestral bungalows, and clinic establishments. Resolves ancestral versus self-acquired property complexities, specifies clear floor-wise distributions for siblings, and secures medical sound-mind certificates for elderly testators.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Pandri &amp; Civil Lines Collectorate</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep registration for senior residents, ancestral property succession advice, and NGDRS slot booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ancestral Homes &amp; Modern Floors</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Samta Colony"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Samta Colony Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-raipur-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PROTOCOL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Chhattisgarh NGDRS Portal
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Raipur is executed through the Chhattisgarh National Generic Document Registration System (NGDRS) portal.
                  Follow our verified 5-stage standard operating procedure:
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Asset Inventory &amp; Beneficiary Structuring
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile complete documentation for your Raipur holdings: RDA plot numbers in Kamal Vihar, Nava Raipur lease details, Bhuiyan agricultural Khasra numbers, bank accounts, and trading partnership shares. Appoint your primary beneficiaries and select an honest executor.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Drafting with Statutory Succession Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will incorporating imperative legal clauses: revocation of prior testaments, clear allocation of specific assets, residuary bequest provisions, executor powers, and survivorship covenants tailored for Chhattisgarh revenue mutation rules.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    03
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Execution Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the drafted Will on plain white A4 paper. The testator signs or affixes thumb impressions on every single page in the simultaneous presence of two independent adult witnesses who sign their names and addresses as attesters.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    04
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      NGDRS Chhattisgarh Citizen Data Entry &amp; Slot Booking
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log on to <code>ngdrs.cg.gov.in</code>. Enter citizen data, party details (testator and witnesses), select the designated Raipur Sub-Registrar Office, pay the nominal government fee online, and download your official appointment slip with time slot.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    05
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Biometric Capture &amp; SRO Book III Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office with your two witnesses and original Aadhaar cards. The Sub-Registrar verifies personal identities, records digital fingerprints and photographs, and enters the document into official Book III registers, providing a certified registered copy.
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
                  7. Section 31 Home Visit: Doorstep Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, testators who are unable to travel to the Sub-Registrar Office due to advanced age, severe illness, paralysis, or hospitalization can request the Sub-Registrar to attend their private residence or hospital room in Raipur.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                      Eligible Situations
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Senior citizens over 70, bedridden patients, testators in intensive care across Raipur hospitals (AIIMS Raipur, Ramkrishna Care, NH MMI Narayana), or hospice care.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      Statutory Formalities
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A formal commission requisition submitted to the District Registrar, backed by a medical fitness certificate from a registered MBBS practitioner certifying sound mental capacity.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block flex items-center gap-1.5">
                      <Stamp className="w-3.5 h-3.5 text-[#C65378]" />
                      Doorstep Procedure
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar visits the residence with biometric equipment, confirms the testator&apos;s voluntariness, collects thumb impressions and photos, and seals the registration.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                  <span>Our Raipur advocate team prepares the complete Section 31 petition dossier and coordinates government commission schedules.</span>
                  <a
                    href="/contact"
                    className="font-bold text-[#C65378] hover:text-[#a13c5d] shrink-0 flex items-center gap-1"
                  >
                    <span>Request Section 31 Assistance</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PRE-REGISTRATION DOSSIER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Raipur Will Documents: Pre-Registration Checklist
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Review the necessary documentation prior to drafting and visiting the Raipur Sub-Registrar Office. Use our interactive checklist to track your readiness:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900">
                    Mandatory Dossier Checklist
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/30 border-rose-200"
                          : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
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
              </div>
            </section>

            {/* SECTION 9: RAIPUR PROPERTY TYPES */}
            <section id="raipur-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL ASSET CLASSES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Raipur Property Types: RDA Plots &amp; Business Units
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning in Raipur requires tailored legal structuring across distinct local real estate and business classes:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Building className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    RDA Allotment Plots &amp; Schemes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Raipur Development Authority (RDA) schemes like Kamal Vihar, Indraprastha, and Kaushalya Mata Vihar require specific allotment schedule references. Our drafts incorporate RDA transfer covenants, ensuring smooth lease-to-freehold conversion and direct administrative succession without objections.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Nava Raipur Atal Nagar Smart City Properties
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Properties under Nava Raipur Atal Nagar Vikas Pradhikaran (NRANVP) operate under structured 99-year lease deeds or freehold allotments. We draft succession clauses compliant with NRANVP Estate Department protocols to prevent lease forfeiture or costly legal heir litigation.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Steel, Sponge Iron &amp; Trading Firm Equity
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Raipur is home to thousands of industrial units in Urla and Siltara and wholesale trading firms in Pandri. We draft specific corporate bequests for private limited equity, partnership capital, trade licenses, and promoter loan accounts to maintain unbroken family control.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Agricultural Farmland &amp; Bhuiyan Records
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Succession of rural farmlands and farmhouses in Dharsiwa, Abhanpur, and Mandir Hasaud is governed by the Chhattisgarh Land Revenue Code, 1959. A registered Will enables direct Tahsildar mutation on the state Bhuiyan digital land portal (bhuiyan.cg.nic.in).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP DUTY */}
            <section id="raipur-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT SCHEDULE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Chhattisgarh Will Registration Fees &amp; Stamp Duty
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration in Chhattisgarh is highly affordable because testamentary instruments are exempt from ad-valorem property stamp duty.
                  Below is the official fee structure applicable across Raipur SRO offices:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Head of Government Fee</th>
                      <th className="p-4 font-bold">Prescribed Amount (INR)</th>
                      <th className="p-4 font-bold">Legal Authority &amp; Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Stamp Duty</td>
                      <td className="p-4 font-extrabold text-emerald-700">₹0 (Completely Exempt)</td>
                      <td className="p-4 text-slate-600">Indian Stamp Act, 1899. Wills attract no stamp duty anywhere in India</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Government Registration Fee</td>
                      <td className="p-4 font-extrabold text-[#C65378]">₹100 to ₹500</td>
                      <td className="p-4 text-slate-600">Commercial Tax (Registration) Department Chhattisgarh Book III schedule</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">NGDRS User &amp; Scanning Fee</td>
                      <td className="p-4">₹100 to ₹300</td>
                      <td className="p-4 text-slate-600">Portal service charges for high-resolution document scanning and archiving</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Visit Fee</td>
                      <td className="p-4">Government Commission (~₹1,000)</td>
                      <td className="p-4 text-slate-600">Official fee for Sub-Registrar home or hospital visit across Raipur district</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Certified Copy of Registered Will</td>
                      <td className="p-4">₹100 to ₹200</td>
                      <td className="p-4 text-slate-600">Issued to the testator during lifetime or to beneficiaries post demise</td>
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
                  <span>PLANS &amp; PRICING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Pricing: Raipur Will Drafting Plans
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the transparent legal plan tailored to your family estate requirements in Raipur and Nava Raipur:
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
                      Ideal for individual testators with residential flats, bank savings, and simple nuclear family distribution.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant online drafting engine</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Indian Succession Act compliant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Step-by-step signing checklist</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Downloadable editable Word &amp; PDF</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Started Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-lg shadow-[#C65378]/10 flex flex-col justify-between relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR IN RAIPUR
                  </span>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Advocate Assisted
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Senior Lawyer Consultation
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Designed for families with multiple RDA properties, commercial shops in Pandri, or complex business succession.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 consultation with estate advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Customized RDA Kamal Vihar clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Trading &amp; industrial shareholding planning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited revisions until full satisfaction</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <a
                      href="/contact"
                      className="w-full py-3 rounded-full bg-[#C65378] text-white font-bold text-xs sm:text-sm hover:bg-[#a13c5d] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#C65378]/25"
                    >
                      <span>Book Advocate Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Comprehensive SRO Support
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Full SRO Registration &amp; Doorstep
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Complete end-to-end guidance including Chhattisgarh NGDRS appointment booking, advocate escort, or Section 31 home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Will drafting &amp; legal review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>NGDRS citizen entry &amp; slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit petition support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical advocate coordination at Raipur SRO</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <a
                      href="/contact"
                      className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Request SRO Registration</span>
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
                  <span>KNOWLEDGE BASE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Raipur
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal answers regarding Will drafting, Chhattisgarh NGDRS registration, probate optionality, and RDA property succession:
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Statutory References &amp; Chhattisgarh Legal Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols strictly follow codified Indian statutes and official Chhattisgarh government registration portals:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213 (Non-Presidency Town Probate Rules).
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
                    Chhattisgarh NGDRS Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official e-registration system: <code>ngdrs.cg.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    High Court Bilaspur Precedents
                  </span>
                  <p className="text-xs text-slate-600">
                    Affirmed judgments exempting Chhattisgarh Wills from compulsory probate.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Raipur Properties &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Raipur, Kamal Vihar, and Nava Raipur assets to painful family court battles.
                Draft a legally airtight Will in minutes or consult our senior estate lawyers.
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
                  Book Lawyer Consultation
                </a>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION LIGHTBOX MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden p-4 sm:p-5 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                Visual Blueprint: Raipur Will Drafting &amp; NGDRS Registration Guide
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 px-3 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-all"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[280px] sm:min-h-[420px] md:min-h-[520px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center p-2">
              <div className="relative w-full h-full min-h-[280px] sm:min-h-[420px] md:min-h-[520px]">
                <Image
                  src="/images/will-drafting-in-raipur.jpg"
                  alt="High Resolution Visual Blueprint: Raipur Will Drafting and NGDRS Registration"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
