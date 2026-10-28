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
  Users,
  Briefcase,
  ExternalLink,
  Laptop,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "nagpur-overview", label: "OVERVIEW" },
  { id: "nagpur-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "nagpur-probate-rules", label: "PROBATE RULES" },
  { id: "nagpur-sro-directory", label: "SRO DIRECTORY" },
  { id: "nagpur-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-nagpur-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "nagpur-property-types", label: "PROPERTY TYPES" },
  { id: "nagpur-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const NAGPUR_DISTRICTS = [
  {
    id: "civil-lines-core",
    name: "Civil Lines & Central Nagpur",
    sro: "SRO Nagpur 1 (Civil Lines)",
    address: "Collectorate Administrative Building, Near RBI Square, Civil Lines, Nagpur - 440001",
    areas: "Civil Lines, Ramdaspeth, Dharampeth, Dhantoli, Shivaji Nagar, Sadar, Seminary Hills, Gokulpeth",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "mahal-heritage",
    name: "Mahal & Old Secretariate Zone",
    sro: "SRO Nagpur 2 (Mahal / Old Secretariate)",
    address: "Old Secretariate Building Complex, Civil Lines / Mahal, Nagpur - 440001",
    areas: "Mahal, Sitabuldi, Hansapuri, Central Avenue, Empress City, Mohan Nagar, Ganeshpeth, Cotton Market",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "gandhibagh-east",
    name: "Gandhibagh & East Nagpur",
    sro: "SRO Nagpur 3 (Gandhibagh Zone)",
    address: "Gandhibagh Zone Administrative Complex, Central Avenue Road, Gandhibagh, Nagpur - 440002",
    areas: "Gandhibagh, Itwari, Lakadganj, Pardi, Kalamna, Nandanvan, Reshim Bagh, Sakkardara, Ayodhya Nagar",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hingna-midc",
    name: "Hingna & South-West Industrial Belt",
    sro: "SRO Nagpur 4 (Hingna / MIDC)",
    address: "Tehsil Office Campus, Hingna Road, Near MIDC Police Station, Nagpur - 440016",
    areas: "Hingna Road, MIDC Industrial Area, Trimurti Nagar, Pratap Nagar, Jaitala, Subhash Nagar, Wadi, Dattawadi",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kamptee-north",
    name: "Kamptee & North Nagpur Corridor",
    sro: "SRO Nagpur 5 (Kamptee)",
    address: "Tehsil Administrative Complex, Old Jabalpur Road, Kamptee, Nagpur - 441001",
    areas: "Kamptee, Dragon Palace Area, Koradi Road, Mankapur, Jaripatka, Byramji Town, Friends Colony, Katol Road",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "wardha-rd-rural",
    name: "Wardha Road, Besa & Nagpur Rural",
    sro: "SRO Nagpur Rural (Hudkeshwar)",
    address: "Sub-Divisional Revenue Complex, Hudkeshwar Road, Near Ring Road, Nagpur - 440034",
    areas: "Wardha Road, Besa, Ghogli, Manish Nagar, Somalwada, Narendra Nagar, Chhatrapati Nagar, MIHAN SEZ",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed clearly on standard white A4 sheets. Under Article 64 of the Maharashtra Stamp Act, stamp paper is 100% exempt.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Needed for biometric identity check and digital photograph capture under the IGR Maharashtra e-Stepin system.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo IDs and must not be heirs receiving assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Paper (For Seniors)",
    detail: "Signed by a filed MBBS medical practitioner certifying sound mind and memory to prevent undue influence allegations.",
    checked: false,
  },
  {
    id: "item-5",
    label: "IGR Maharashtra e-Stepin Appointment Token",
    detail: "Official token receipt downloaded from igrmaharashtra.gov.in showing the scheduled date and time slot at the Nagpur SRO.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Asset Chain Deeds: NMC Tax & NIT Leases",
    detail: "Allotment letters from Nagpur Improvement Trust (NIT), NMC asset tax receipts, or 7/12 Saat Bara for Vidarbha farm land.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Color Photographs Each",
    detail: "Recent color photographs of the Will maker and both witnesses for pasting in the official Book III registry.",
    checked: false,
  },
];

export default function NagpurLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("nagpur-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("civil-lines-core");
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

  const filteredDistricts = NAGPUR_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    NAGPUR_DISTRICTS.find((d) => d.id === selectedDistrict) || NAGPUR_DISTRICTS[0];

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
                <span>VIDARBHA &amp; NAGPUR ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 55 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Nagpur: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your NMC houses, NIT leasehold plots, 7/12 Vidarbha farmland, and bank investments.
                Get lawyer drafting, IGR Maharashtra e-Stepin filing support, and doorstep signing for senior citizens across Nagpur.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Nagpur Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#nagpur-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Nagpur SRO Directory</span>
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
                  <span>₹0 Maharashtra Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS - FULLY VISIBLE IN MOBILE & DESKTOP) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-nagpur.jpg"
                  alt="Online Will Drafting and Registration Services in Nagpur"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                6 SRO Offices
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Nagpur District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Article 64 Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
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
              DESKTOP VIEW: STICKY TOC
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

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all cursor-pointer shadow-sm text-center"
                >
                  <span>Start Online Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-500 text-center font-medium">
                  Checked by Bombay High Court Lawyers
                </p>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              EDITORIAL CONTENT COLUMN (MAIN BODY)
              ===================================================================== */}
          <main className="w-full flex-1 space-y-16 lg:space-y-20">
            
            {/* -------------------------------------------------------------------
                SECTION: OVERVIEW
                ------------------------------------------------------------------- */}
            <section id="nagpur-overview" className="scroll-target scroll-mt-24 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold tracking-wider uppercase mb-4 border border-rose-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Estate Planning in the Orange City</span>
                </div>

                {/* H2: Exactly 49 chars */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Nagpur
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#172228]">
                      <Home className="w-4 h-4 text-[#C65378]" />
                      <span>Vidarbha Asset Protection</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Protects Nagpur City City Board (NMC) homes, Nagpur Improvement Trust (NIT) plots, and 7/12 farm land across Vidarbha.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#172228]">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>Zero Needed Probate</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Unlike Mumbai, probate is not needed in Nagpur. Bombay High Court (Nagpur Bench) rulings allow direct name change via a filed Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#172228]">
                      <Stamp className="w-4 h-4 text-[#C65378]" />
                      <span>IGR Maharashtra Filing</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Book tokens on the e-Stepin system for SRO Civil Lines, Gandhibagh, Hingna, or Kamptee with a flat ₹100 filing fee under Article 64.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#172228]">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>Section 31 Doorstep Service</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Home and hospital filing visits for senior citizens across Dharampeth, Ramdaspeth, Dhantoli, and Wardha Road corridors.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 1: LEGAL FRAMEWORK
                ------------------------------------------------------------------- */}
            <section id="nagpur-legal-framework" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Legal Principles
                </span>
                {/* H2: Exactly 44 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Estate Laws in Nagpur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will drafted for assets in Nagpur must comply with the <strong>Indian Succession Act, 1925</strong>, the <strong>Filing Act, 1908</strong>, and the <strong>Maharashtra Stamp Act</strong>. The legal framework governing Will estate in Nagpur provides distinct procedural advantages:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-sm">
                    § 63
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Indian Succession Act
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 63, the Will maker must sign or affix their mark in the physical presence of two independent adult witnesses who sign as attestors.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-sm">
                    § 18
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Filing Act, 1908
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 18(e) makes filing a choice. A Will on plain paper is valid, but filing in Book III creates unimpeachable evidence against fights.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-sm">
                    Art 64
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Maharashtra Stamp Act
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Article 64 exempts Will gifts completely from stamp duty. Will makers never need to buy high-denomination non-judicial stamp papers.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 2: REGISTRATION RULES
                ------------------------------------------------------------------- */}
            <section id="mandatory-vs-optional" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Strategic Advantages
                </span>
                {/* H2: Exactly 51 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Will Filing in Nagpur: Rules &amp; Legal Value
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  While registering a Will is a choice under Section 18(e) of the Filing Act, registering your paper before the Nagpur SRO creates a state-preserved record in official <strong>Book III</strong>. Here is how a filed Will compares to an plain paper:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Estate Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Filed Will (Nagpur SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Plain Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Archival</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives of Maharashtra Filing Office</td>
                      <td className="p-4 bg-slate-50/20">Held in private custody; vulnerable to physical damage, loss, or suppression</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection Against Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Extremely high. Biometric thumbprints and digital photos recorded in e-Stepin</td>
                      <td className="p-4 bg-slate-50/20">Lower. Disgruntled legal heirs often allege forged signatures or coercion</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">NMC &amp; NIT Asset Name Change</td>
                      <td className="p-4 bg-rose-50/20">Accepted smoothly for asset tax transfer and NIT lease rights endorsement</td>
                      <td className="p-4 bg-slate-50/20">Officers often insist on indemnity bonds, family NOCs, or legal heir papers</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">7/12 Vidarbha Farmland Name Change</td>
                      <td className="p-4 bg-rose-50/20">Talathi records Ferfar entry directly without demanding civil court orders</td>
                      <td className="p-4 bg-slate-50/20">High risk of stay orders during the 15-day public objection notice period</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Post-Mortem Certified Copies</td>
                      <td className="p-4 bg-rose-50/20">Executor can get official certified copies from SRO if the original is misplaced</td>
                      <td className="p-4 bg-slate-50/20">If the original paper is lost, proving its contents requires difficult secondary evidence</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Legal Proof Presumption</td>
                      <td className="p-4 bg-rose-50/20">Enjoys legal presumption of genuine signing under Section 114 Indian Evidence Act</td>
                      <td className="p-4 bg-slate-50/20">Burden of proving genuine signing rests entirely on the propounder</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 3: PROBATE RULES
                ------------------------------------------------------------------- */}
            <section id="nagpur-probate-rules" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Local Clarity
                </span>
                {/* H2: Exactly 49 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Needed for Assets in Nagpur?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent misconceptions among asset owners in Vidarbha is that every Will in Maharashtra requires probate from the Bombay High Court. <strong>This is legally incorrect for Nagpur.</strong>
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Non-Presidency Town Exemption Under Section 213 ISA
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under Section 213(2) read with Section 57(a) and (b) of the Indian Succession Act, 1925, probate is needed <strong>only</strong> for Wills signed within or covering land and flats situated in the historical presidency towns: <strong>Mumbai, Kolkata, and Chennai</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378]">
                      Bombay High Court (Nagpur Bench) Precedent
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      The Nagpur Bench of the Bombay High Court has consistently affirmed that probate is strictly non-needed for Hindu, Sikh, Jain, and Buddhist Will makers in Nagpur and all 11 districts of Vidarbha.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#5F7E75]">
                      Direct Transfer in NMC &amp; NIT Registers
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Legal heirs do not need to spend months or lakhs on High Court probate proceedings. A filed Will allows direct name change of city records and bank transfer.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>When might probate still be required?</strong> Probate or Letters of Care from the Nagpur District Court is necessary only if the Will is actively contested by excluded legal heirs, or if the Will maker owned land and flats situated within Mumbai city city limits.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 4: SRO DIRECTORY
                ------------------------------------------------------------------- */}
            <section id="nagpur-sro-directory" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Filing Locations
                </span>
                {/* H2: Exactly 47 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Nagpur SRO Offices &amp; SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nagpur district operates 6 primary SRO Offices under the Inspector General of Filing (IGR Maharashtra). Under Section 31 of the Filing Act, filing of a Will can take place at the SRO within whose area the Will maker resides:
                </p>
              </div>

              {/* SEARCH & ACCORDION CARDS */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by locality, area, or SRO name (e.g., Civil Lines, Dharampeth, Hingna, Besa)..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C65378] focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDistricts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedDistrict(item.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        selectedDistrict === item.id
                          ? "bg-rose-50/50 border-[#C65378] shadow-xs"
                          : "bg-slate-50/60 border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-bold text-[#C65378] bg-rose-100/60 px-2 py-0.5 rounded-md">
                          {item.sro}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{item.address}</span>
                      </p>
                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                        <div><strong>Coverage:</strong> {item.areas}</div>
                        <div><strong>Timings:</strong> {item.timings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 5: LOCAL AREAS COVERAGE
                ------------------------------------------------------------------- */}
            <section id="nagpur-area-coverage" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Neighborhood Coverage
                </span>
                {/* H2: Exactly 48 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Nagpur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally checked <strong>Will drafting services in Dharampeth, Civil Lines, Wardha Road, or Gandhibagh</strong>? Our senior estate planning lawyers provide full legal drafting, IGR Maharashtra e-Stepin slot scheduling, and SRO accompaniment tailored to the specific asset dynamics of Nagpur:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: DHARAMPETH, RAMDASPET & DHANTOLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Prime Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 1 (Civil Lines)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dharampeth, Ramdaspeth &amp; Dhantoli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dharampeth</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramdaspeth</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dhantoli Medical Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gokulpeth</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shivaji Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Dharampeth</strong> and Ramdaspeth for independent bungalows, multi-specialty clinics, luxury apartments, and corporate shares. Doorstep Section 31 signing for doctors and seniors across Dhantoli.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Office Complex, Civil Lines</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        IGR Maharashtra e-Stepin token booking, lawyer representation, and home signing visits across West Nagpur.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dharampeth"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dharampeth Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: CIVIL LINES, SADAR & SEMINARY HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Judicial &amp; Bureaucratic Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 1 (Civil Lines)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Civil Lines, Sadar &amp; Seminary Hills
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sadar Bazaar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Seminary Hills</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katol Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Byramji Town</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Civil Lines</strong> for retired judicial officers, civil servants, armed forces veterans, and Sadar shop business owners, safeguarding government pensions, bungalow plots, and private trust bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Near RBI Square</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Immediate proximity to High Court lawyers, senior registrar desks, and fast-track biometric slots.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Civil Lines"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Civil Lines Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: WARDHA ROAD, BESA & MANISH NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        MIHAN &amp; IT Growth Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur Rural (Hudkeshwar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Wardha Road, Besa &amp; Manish Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wardha Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Besa-Ghogli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manish Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Somalwada</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MIHAN Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Wardha Road</strong> and Besa for IT professionals, MIHAN tech executives, and modern gated township homeowners, securing digital assets, ESOPs, and NMC asset name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Hudkeshwar Revenue Complex &amp; SRO 1</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Covering newly developed township assets, Gram Panchayat conversion layouts, and Gunthewari regularized plots.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Wardha Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Wardha Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: LAXMI NAGAR, BAJAJ NAGAR & SHANKAR NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Established South-West Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 1 (Civil Lines)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Laxmi Nagar, Bajaj Nagar &amp; Shankar Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Laxmi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bajaj Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shankar Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pratap Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Abhyankar Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert estate estate planning for senior citizens, VNIT faculty, and plant families in Laxmi Nagar and Bajaj Nagar, covering NIT lease deeds, cooperative housing society flats, and fixed deposits.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Lines Collectorate &amp; SRO 4 Hingna</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Seamless lawyer help, doctor paper coordination, and fast-track token booking on IGR Maharashtra.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Laxmi Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Laxmi Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: MAHAL, GANDHIBAGH, ITWARI & CENTRAL AVENUE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shop &amp; Trading Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 2 &amp; 3 (Gandhibagh)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Mahal, Gandhibagh, Itwari &amp; Central Ave
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahal Family Wadas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Itwari Wholesale Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandhibagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Central Avenue</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lakadganj</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom estate planning for trading firms, wholesale family businesses, gold merchants, and family wadas in Mahal and Itwari. Clear partnership clauses and shop shop bequests preventing family feuds.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Gandhibagh Zone Office, Central Avenue</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Dedicated lawyer support for joint business estate, Book III confidential filing, and family title mapping.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gandhibagh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gandhibagh Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: KORADI ROAD, BYRAMJI TOWN & MANKAPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Nagpur Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 5 (Kamptee) &amp; SRO 1
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Koradi Road, Byramji Town &amp; Mankapur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Koradi Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Byramji Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mankapur Sports Complex</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jaripatka</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Friends Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable estate planning for home assets, shop plots, and NRI family assets along the Koradi Road and Byramji Town corridor, making sure seamless NMC title name change and Book III filing.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Lines &amp; Kamptee Tehsil Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete help for senior citizens in Byramji Town and Jaripatka, including doctor papers and home visits.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Koradi Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Koradi Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: HINGNA ROAD, MIDC & TRIMURTI NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Plant &amp; Tech Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 4 (Hingna)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Hingna Road, MIDC &amp; Trimurti Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hingna Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MIDC Plant Units</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trimurti Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jaitala</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wadi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized drafting for MIDC factory plot leasehold transfers, plant machinery estate, MSME proprietor assets, and modern apartments in Trimurti Nagar and Jaitala.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Hingna Tehsil Office, Near MIDC Police Station</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct support for MIDC lease transfer papers, corporate estate, and SRO 4 Hingna token bookings.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hingna"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hingna Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: NANDANVAN, SAKKARDARA & RESHIM BAGH */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Nagpur &amp; NIT Belts
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagpur 3 (Gandhibagh) &amp; Rural
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Nandanvan, Sakkardara &amp; Reshim Bagh
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nandanvan NIT Layout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sakkardara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Reshim Bagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ayodhya Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Umred Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full estate papers for NIT allotted plots, home houses, and shop shops across East Nagpur, preventing name change fights in NMC Nehru Nagar and Hanuman Nagar zones.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Gandhibagh Zone &amp; Hudkeshwar Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete guidance on NIT lease transfer paperwork, indemnity bonds, and family asset split.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nandanvan"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nandanvan Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 6: STEP-BY-STEP SOP
                ------------------------------------------------------------------- */}
            <section id="step-by-step-nagpur-sop" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Procedural SOP
                </span>
                {/* H2: Exactly 51 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Drafting and registering your Will in Nagpur follows a clear 5-step standard operating step supervised by our Bombay High Court legal team:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] font-extrabold text-base flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Asset Inventory &amp; Vidarbha Title Mapping
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a complete list of your assets: Nagpur City City Board (NMC) house assets, Nagpur Improvement Trust (NIT) lease plots, 7/12 farm land in Vidarbha, bank fixed deposits, and demat accounts. Appoint an executor and assign specific shares to your heirs.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] font-extrabold text-base flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Lawyer Drafting with Non-Presidency Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior estate lawyers draft your Will incorporating vital clauses: clear revocation of prior testaments, survivorship clauses, residual bequest allocations, and an explicit declaration under Bombay High Court rules confirming non-presidency estate.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] font-extrabold text-base flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on plain A4 paper (no stamp paper required). The Will maker signs or affixes their thumb impression at the bottom of every page in the physical presence of two independent adult witnesses who are not heirs under the paper.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] font-extrabold text-base flex items-center justify-center shrink-0">
                    04
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Online Token Booking on IGR Maharashtra e-Stepin
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We book your filing appointment on the official Inspector General of Filing Maharashtra portal (igrmaharashtra.gov.in). We pay the nominal ₹100 filing fee online and secure your date and time slot at the designated Nagpur SRO.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] font-extrabold text-base flex items-center justify-center shrink-0">
                    05
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Biometric SRO Check &amp; Book III Archival
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO office with your two witnesses. The SRO captures biometric thumbprints, photographs the parties, verifies identities, and issues the official Book III filing endorsement and paper receipt.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 7: SECTION 31 DOORSTEP REGISTRATION
                ------------------------------------------------------------------- */}
            <section id="doorstep-home-registration" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Accessibility &amp; Senior Care
                </span>
                {/* H2: Exactly 48 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing in Nagpur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden people, or patients undergoing treatment in Nagpur hospitals (such as in Dhantoli medical hub, Kingsway Hospital, or Alexis/Max Healthcare), traveling to the SRO office can be difficult or impossible. <strong>Section 31 of the Filing Act, 1908</strong> provides a compassionate, legally sound solution:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Award className="w-4 h-4 text-[#C65378]" />
                      <span>Doctor Medical Paper</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed MBBS practitioner certifies that the Will maker is of sound mind, memory, and understanding, but physically unable to travel to the SRO.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Form 31 SRO Form</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our lawyer files the official petition before the Joint SRO in Civil Lines or Gandhibagh, paying the required government commission fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Home className="w-4 h-4 text-[#C65378]" />
                      <span>SRO Home Visit</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The SRO visits the Will maker&apos;s residence or hospital room with portable biometric equipment to capture fingerprints and complete Book III filing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center justify-between flex-col sm:flex-row gap-3">
                  <div className="text-xs text-rose-950 font-medium">
                    Need home filing for an elderly parent in Dharampeth, Ramdaspeth, or Wardha Road?
                  </div>
                  <a
                    href="/services/will-registration"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer"
                  >
                    <span>Request SRO Home Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 8: DOCUMENTS CHECKLIST
                ------------------------------------------------------------------- */}
            <section id="documents-checklist" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Preparation &amp; Check
                </span>
                {/* H2: Exactly 46 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Needed Paper Checklist for Nagpur Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Free checklist to prepare your papers before signing or visiting the Nagpur SRO office:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-600">
                    Prepared Items: <strong className="text-[#C65378]">{checkedCount}</strong> of {checklist.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {Math.round((checkedCount / checklist.length) * 100)}% Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200/80"
                          : "bg-slate-50/50 border-slate-200/70 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-1">
                        <span className={`text-xs sm:text-sm font-bold block ${item.checked ? "text-slate-900" : "text-slate-700"}`}>
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

            {/* -------------------------------------------------------------------
                SECTION 9: PROPERTY TYPES
                ------------------------------------------------------------------- */}
            <section id="nagpur-property-types" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Asset Classes
                </span>
                {/* H2: Exactly 46 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Split: NMC, NIT &amp; Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nagpur has unique asset governance structures ranging from Nagpur Improvement Trust (NIT) layouts to Vidarbha farm farmland. Here is how your Will covers each asset class:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    NIT Leasehold Plots &amp; Freehold Schemes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Nagpur Improvement Trust layouts (such as in Dharampeth, Laxmi Nagar, and Nandanvan) involve leasehold rights or regularized Gunthewari plots. A filed Will facilitates the smooth endorsement and transfer of lease rights in NIT records without expensive estate paper suits.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    NMC Apartments &amp; Independent Houses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For home assets assessed by the Nagpur City City Board (NMC), a filed Will enables direct name change (*Varasdar Nond*) of asset tax assessment numbers across all 10 NMC office zones.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Vidarbha Farm Farmland (7/12 &amp; 8-A)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Farmland, orange orchards, and agro-plots across Saoner, Katol, Kalmeshwar, Hingna, and Umred require revenue name change. A filed Will allows the Talathi and Circle Officer to record the Ferfar entry and update Saat Bara (7/12) records.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Financial Assets, Demat Portfolios &amp; FDs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Bank accounts, fixed deposits in nationalized and cooperative banks, mutual funds, and demat shares pass to the legatee specified in the Will. While bank nominees collect funds as trustees, true ownership passes strictly through the Will.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 10: REGISTRATION CHARGES & ZERO STAMP DUTY
                ------------------------------------------------------------------- */}
            <section id="nagpur-registration-fees" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Government Fee Structure
                </span>
                {/* H2: Exactly 52 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Filing Charges &amp; Zero Stamp Duty in Nagpur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike asset gift deeds or sale conveyances which attract 5% to 7% stamp duty in Maharashtra, <strong>Wills enjoy total exemption from stamp duty</strong> across Nagpur:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Maharashtra Stamp Duty
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-600">₹0</div>
                  <p className="text-xs text-slate-600 pt-1">
                    Article 64 of the Maharashtra Stamp Act explicitly exempts Wills from stamp duty.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    SRO Filing Fee
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900">₹100</div>
                  <p className="text-xs text-slate-600 pt-1">
                    Flat nominal government filing fee under Maharashtra Filing Rules.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Computer Scanning Fee
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900">₹100 - ₹300</div>
                  <p className="text-xs text-slate-600 pt-1">
                    Nominal official data processing and Book III paper scanning charges.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 11: PLANS & PRICING
                ------------------------------------------------------------------- */}
            <section id="service-pricing" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Transparent Pricing
                </span>
                {/* H2: Exactly 51 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Pricing: Nagpur Will Making Packages
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the plan that fits your family estate rules. Transparent pricing with zero hidden charges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Standard
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Online Will Drafting
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 font-medium">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Instant online lawyer-crafted Will template for straightforward family estates, bank FDs, and personal assets.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Instant automated legal draft</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Self-witness signing signing guide</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Encrypted PDF download</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all text-center cursor-pointer"
                  >
                    Start Basic Draft
                  </a>
                </div>

                {/* Plan 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 sm:p-7 shadow-lg relative flex flex-col justify-between space-y-6">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C65378] text-white text-[11px] font-extrabold uppercase tracking-wider">
                    MOST POPULAR IN NAGPUR
                  </div>
                  <div className="space-y-4 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Lawyer Assisted
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Lawyer Talk &amp; Custom Draft
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500 font-medium">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      1-on-1 talk with a senior High Court lawyer. Custom clauses for NIT lease plots, NMC houses, and 7/12 Vidarbha farmland.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Dedicated estate lawyer call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>NIT &amp; NMC specific clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Vidarbha farmland estate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Doctor paper format included</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all text-center cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Consult an Lawyer
                  </a>
                </div>

                {/* Plan 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Full
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Done-For-You SRO Filing
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 font-medium">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end service: lawyer drafting, IGR Maharashtra e-Stepin slot scheduling, and lawyer accompaniment at Nagpur SRO or doorstep.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Everything in Lawyer Assisted</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>IGR e-Stepin token booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Nagpur SRO lawyer accompaniment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Section 31 home visit help</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/services/will-registration"
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all text-center cursor-pointer"
                  >
                    Book SRO Filing
                  </a>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 12: FAQS
                ------------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Clear Answers
                </span>
                {/* H2: Exactly 51 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Nagpur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Answers to the most common legal questions regarding Will drafting, NIT plot transfers, and IGR filing in Nagpur:
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
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer text-xs sm:text-sm"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 13: STATUTORY CITATIONS
                ------------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-target scroll-mt-24 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C65378] font-bold">
                  Judicial References
                </span>
                {/* H2: Exactly 51 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Legal Citations &amp; Vidarbha Legal Precedents
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative legislative rules and judicial precedents governing Will drafting and estate in Nagpur and Maharashtra:
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
                <ul className="space-y-3 list-disc pl-5 leading-relaxed text-slate-600">
                  <li>
                    <strong>Indian Succession Act, 1925 (Section 63):</strong> Mandates witness signing by two or more witnesses who have seen the Will maker sign or affix their mark.
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925 (Section 213 read with Section 57):</strong> Confines needed probate strictly to presidency towns (Mumbai, Kolkata, Chennai). Confirms that probate is non-needed in Nagpur.
                  </li>
                  <li>
                    <strong>Filing Act, 1908 (Section 18(e)):</strong> Clarifies that filing of a Will remains a choice under Indian law.
                  </li>
                  <li>
                    <strong>Filing Act, 1908 (Section 31):</strong> Authorizes Sub-Registrars to attend the residence of an infirm or elderly Will maker for official paper signing.
                  </li>
                  <li>
                    <strong>Maharashtra Stamp Act (Article 64):</strong> Expressly exempts Will instruments and Wills from stamp duty in the State of Maharashtra.
                  </li>
                  <li>
                    <strong>Maharashtra Land Revenue Code, 1966 (Section 149 &amp; 150):</strong> Regulates the acquisition of rights in farm land by Will and steps for Talathi Ferfar (name change).
                  </li>
                  <li>
                    <strong>Bombay High Court (Nagpur Bench) Jurisprudence:</strong> Repeatedly affirms that heirs under a filed Will can effect city name change in Vidarbha without seeking court probate.
                  </li>
                </ul>
              </div>
            </section>

          
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

      {/* =========================================================================
          HIGH-RESOLUTION BLUEPRINT MODAL
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
                Visual Blueprint: Nagpur Will Drafting &amp; SRO Filing Architecture
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mt-3">
              <Image
                src="/images/will-drafting-in-nagpur.jpg"
                alt="High Resolution Visual Blueprint: Nagpur Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 95vw, 1000px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
