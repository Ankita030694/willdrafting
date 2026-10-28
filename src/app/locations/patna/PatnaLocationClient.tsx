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
  { id: "patna-overview", label: "OVERVIEW" },
  { id: "patna-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "patna-probate-rules", label: "PROBATE RULES" },
  { id: "patna-sro-directory", label: "SRO DIRECTORY" },
  { id: "patna-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-patna-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "patna-property-types", label: "PROPERTY TYPES" },
  { id: "patna-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const PATNA_DISTRICTS = [
  {
    id: "patna-sadar",
    name: "Patna Sadar (Collectorate)",
    sro: "Sub-Registrar Office, Patna Sadar",
    address: "Collectorate Campus, Near Gandhi Maidan, North of Patna Junction, Patna, Bihar 800001",
    areas: "Fraser Road, Exhibition Road, Gandhi Maidan, Lodipur, Digha, Kurji, Budh Marg, Kidwaipuri, Rajvanshi Nagar, Bailey Road Central",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "danapur",
    name: "Danapur Sub-Division",
    sro: "Sub-Registrar Office, Danapur",
    address: "Sub-Divisional Court Campus, Danapur Cantt, Patna, Bihar 801503",
    areas: "Danapur Cantt, Saguna More, RPS More, Gola Road, Khagaul, Bailey Road Western Extension, Shahpur, Bihta Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "phulwari-sharif",
    name: "Phulwari Sharif Zone",
    sro: "Sub-Registrar Office, Phulwari Sharif",
    address: "Block Development Office Campus, Phulwari Sharif, Patna, Bihar 801505",
    areas: "Phulwari Sharif, Anisabad, Walmi, AIIMS Patna Corridor, Beur, Haroon Nagar, Khoja Imli, Janipur Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "patna-city",
    name: "Patna City (Gulzarbagh)",
    sro: "Sub-Registrar Office, Patna City",
    address: "Government Printing Press Campus, Gulzarbagh, Patna City, Bihar 800007",
    areas: "Patna Sahib, Chowk, Meena Bazar, Marufganj, Didarganj, Jhauganj, Begumpur, Malsalami, Agamkuan, Mangal Talab",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "patna-east-kankarbagh",
    name: "Kankarbagh & Rajendra Nagar",
    sro: "Sub-Registrar Office, Patna Sadar (East Division)",
    address: "Revenue Complex, Kankarbagh Main Road / Collectorate Division, Patna, Bihar 800020",
    areas: "Kankarbagh (PC Colony, Doctors' Colony, Hanuman Nagar, Lohia Nagar), Rajendra Nagar, Kumhrar, Bahadurpur, Chitragupta Nagar, Kanti Factory Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on standard white A4 sheets. Under Bihar revenue rules, no non-judicial stamp paper is required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Mandatory for biometric fingerprinting, iris verification, and digital photo capture at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Original IDs",
    detail: "Witnesses must not be beneficiaries or spouse of beneficiaries. They must bring original Aadhaar or Voter IDs.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (MBBS)",
    detail: "Strongly recommended for senior testators aged 60+ to certify sound testamentary capacity under Section 59.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Bihar Bhumi Jamabandi & Khatiyan Records",
    detail: "Survey Khata, Khesra, Thana number, and Jamabandi Register-II extracts for ancestral or agricultural land parcels.",
    checked: false,
  },
  {
    id: "item-6",
    label: "PRDA Allotment / PMC Property Tax Receipt",
    detail: "Patna Municipal Corporation Holding Tax receipt or PRDA/Housing Board allotment deed for urban flats and plots.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Bihar e-Nibandhan Token & e-Challan Receipt",
    detail: "Official e-appointment confirmation slip and registration fee challan paid via biharregservices.gov.in.",
    checked: false,
  },
];

export default function PatnaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("patna-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("patna-sadar");
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

  const filteredDistricts = PATNA_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    PATNA_DISTRICTS.find((d) => d.id === selectedDistrict) || PATNA_DISTRICTS[0];

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
                <span>PATNA &amp; BIHAR ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Patna: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will in Patna. Protect your ancestral Khatiyan land, PMC houses, and modern apartments with senior advocate drafting, Bihar e-Nibandhan portal registration, and doorstep execution support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Patna Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#patna-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Patna SRO Directory</span>
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
                  <span>₹0 Bihar Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bihar Bhumi Dakhil Kharij</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULLY VISIBLE ON MOBILE & DESKTOP */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group flex items-center justify-center"
              >
                <Image
                  src="/images/will-drafting-in-patna.jpg"
                  alt="Online Will Drafting & Property Succession in Patna"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
                  priority
                />
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                Click image to inspect full visual succession roadmap
              </p>
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
                5 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Patna District Coverage
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
                Non-Presidency Rules
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Bihar Bhumi
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Dakhil Kharij Ready
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
              DESKTOP VIEW: STICKY SIDEBAR TABLE OF CONTENTS
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
            <section id="patna-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>PATNA ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Patna
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Bihar under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two independent witnesses is valid, but registration gives official authenticity before government departments.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Patna is a non-presidency town. Unlike Mumbai, Kolkata, or Chennai, court probate is not mandatory under Section 213 of the Indian Succession Act for Hindu, Sikh, Jain, or Buddhist estates across Bihar.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Bihar Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from ad-valorem stamp duty across Bihar. Testators only pay a nominal registration fee and portal scanning charge at the Sub-Registrar Office via the Bihar e-Nibandhan portal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Bihar Bhumi Dakhil Kharij</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will directly links to the Bihar Bhumi portal, enabling smooth land mutation (दाख़िल ख़ारिज) before the Circle Officer (CO) and protecting ancestral Khatiyan land from fraudulent sales.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="patna-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Patna Bihar
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Writing a legally enforceable Will in Patna is regulated by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Bihar Land Reforms (Fixation of Ceiling Area and Acquisition of Surplus Land) Act</strong> alongside the <strong>Bihar State Mutation Act</strong>. Any adult of sound mind can bequeath their self-acquired real estate, bank deposits, mutual funds, company equity, and jewelry.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Patna and adjoining rural belts of Danapur, Phulwari Sharif, and Bihta, real estate property tenures include ancestral Khatiyan lands recorded in Survey Register-II (Jamabandi), Patna Regional Development Authority (PRDA) plots, Patna Municipal Corporation (PMC) houses in Kankarbagh and Rajendra Nagar, and high-rise condominiums along Bailey Road. Given widespread property boundary disputes and inheritance friction in Bihar, executing a clear, advocate-vetted Will is essential to shield surviving family members.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years of age and possess sound disposing mind under Section 59.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Attesting Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63, the testator must sign before two adult independent witnesses who also sign in each other&apos;s presence.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    A4
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Plain White Paper</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Wills do not require non-judicial stamp paper in Bihar. Standard white A4 paper meets all statutory criteria.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    100%
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Testamentary Freedom</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testators have complete testamentary freedom to bequeath self-acquired properties, excluding forced heirship claims.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL VALIDITY &amp; PROOF</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Patna?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Indian Registration Act, 1908, registering a Will is <strong>strictly optional</strong> in Bihar. An unregistered Will signed by the testator in the presence of two witnesses is legally valid. However, in Bihar&apos;s land administration context, an unregistered Will is highly vulnerable to objections and allegations of fabrication during revenue mutation:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Parameter</th>
                      <th className="p-4 font-bold">Unregistered Will in Patna</th>
                      <th className="p-4 font-bold text-[#C65378]">Registered Will (Book III SRO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Legal Validity</td>
                      <td className="p-4">Valid under Section 63 ISA</td>
                      <td className="p-4 font-semibold text-emerald-700">Valid with statutory presumption of authenticity</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Bihar Bhumi Dakhil Kharij</td>
                      <td className="p-4 text-amber-700">High risk of objection before Circle Officer (CO)</td>
                      <td className="p-4 font-semibold text-emerald-700">Direct verification via e-Nibandhan portal</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Protection Against Fraud</td>
                      <td className="p-4 text-rose-600">Vulnerable to claims of forgery by co-sharers</td>
                      <td className="p-4 font-semibold text-emerald-700">Biometric fingerprint &amp; photo archived in SRO records</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">PMC Municipal Mutation</td>
                      <td className="p-4">Requires extensive affidavits and indemnity bonds</td>
                      <td className="p-4 font-semibold text-emerald-700">Expedited Holding Tax mutation without dispute</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Certified Copy Retrieval</td>
                      <td className="p-4 text-rose-600">If original paper is lost, proving terms is difficult</td>
                      <td className="p-4 font-semibold text-emerald-700">Certified copy retrievable from SRO Book III register</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE JURISDICTION */}
            <section id="patna-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT JURISPRUDENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Patna Probate Rules: Non-Presidency Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common question among property owners in Bihar is whether a Will must be probated by a court before assets can be transferred. Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, probate is mandatory only within the historical presidential towns of Mumbai, Kolkata, and Chennai.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  <strong>Patna is a non-presidency town.</strong> The Patna High Court has settled in landmark rulings that obtaining a grant of probate or Letters of Administration is <strong>not mandatory</strong> for Hindu, Sikh, Jain, or Buddhist Wills in Bihar. Financial institutions, the Patna Municipal Corporation, and revenue authorities must recognize a valid Will without insisting on a court probate decree.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      When is Court Action Required in Bihar?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Court proceedings become necessary only if disgruntled legal heirs lodge a formal civil title suit challenging the genuineness of the Will, alleging coercion, or disputing the testator&apos;s mental capacity. In such contested cases, the beneficiary can petition the District Judge at Patna Civil Court or the Patna High Court for Letters of Administration or Probate to confirm testamentary title.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="patna-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Patna Sub-Registrar Offices: SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Patna district operates five key Sub-Registrar Offices under the Bihar Registration, Excise &amp; Prohibition Department. Under Section 32 of the Registration Act, a Will can be registered at the Sub-Registrar Office having jurisdiction over where the testator resides or where any immovable property is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Bailey Road, Kankarbagh, Danapur)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {PATNA_DISTRICTS.length} SRO Jurisdictions
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
                      Book III Register Active
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
                      Official Bihar Portal: <strong>biharregservices.gov.in</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Accompaniment for {activeDistrictData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AREA-WISE WILL DRAFTING ACROSS PATNA */}
            <section id="patna-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; MICRO-MARKETS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Across Patna Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking to draft a legally binding <strong>Will in Bailey Road, Boring Road, Kankarbagh, or Danapur</strong>? Real estate across Patna spans ancestral Khatiyan holdings, PRDA planned plots, private developer high-rises, and prime commercial shops along Fraser Road. Our legal team provides customized drafting, Bihar e-Nibandhan portal appointment scheduling, and Sub-Registrar accompaniment across all key residential and commercial hubs:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: BAILEY ROAD & BORING ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central &amp; West Prime
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patna Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bailey Road &amp; Boring Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bailey Road (Jawaharlal Nehru Marg)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Boring Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Boring Canal Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patliputra Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Boring Road and Bailey Road</strong> for premium apartments, multi-story family bungalows, and commercial office floors. Structuring precise legal clauses protects family wealth and ensures seamless PMC municipal mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO Patna Sadar (Collectorate)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        e-Nibandhan token generation, senior advocate accompaniment, and Section 31 home visits for elderly citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bailey Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bailey Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: KANKARBAGH & RAJENDRA NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South-East Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO East / Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kankarbagh &amp; Rajendra Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kankarbagh PC Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Doctors&apos; Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hanuman Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajendra Nagar Sectors</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting in Kankarbagh</strong> (one of Asia&apos;s largest residential colonies) and Rajendra Nagar. Tailored for PRDA plotted houses, nursing homes, and residential plots to guarantee direct municipal Holding Tax transfer.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Patna Sadar (East Division)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Assistance with PRDA allotment succession records and doorstep medical fitness attestation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">PRDA Plotted Homes &amp; Clinics</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kankarbagh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kankarbagh Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: DANAPUR, SAGUNA MORE & GOLA ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Western Growth Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Danapur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Danapur, Saguna More &amp; Gola Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saguna More</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gola Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">RPS More</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Danapur Cantt Environs</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Danapur and Saguna More</strong> for new high-rise residential societies and agricultural land along the Bihta corridor. Incorporating precise Bihar Bhumi Khasra and Khata survey numbers prevents future title objections.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Registrar Office Danapur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Danapur court campus biometric registration, token slots, and revenue mutation assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">High-Rise Gated Societies</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Danapur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Danapur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: PHULWARI SHARIF, ANISABAD & AIIMS CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South &amp; Medical Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Phulwari
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Phulwari Sharif &amp; Anisabad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anisabad Roundabout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Phulwari Sharif</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AIIMS Patna Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Beur &amp; Khoja Imli</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Anisabad and Phulwari Sharif</strong> covering independent houses, ancestral land holdings, and suburban gated colonies. Drafting adheres to personal inheritance laws and Bihar revenue mutation codes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO Phulwari Sharif (Block Office)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast slot booking on Bihar e-Nibandhan with advocate verification and biometric token generation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Suburban Plots &amp; Residences</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Phulwari Sharif"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Phulwari Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: FRASER ROAD, EXHIBITION ROAD & GANDHI MAIDAN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Commercial Heart &amp; CBD
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patna Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Fraser Road &amp; Exhibition Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fraser Road Commercial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Exhibition Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dak Bungalow Crossing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandhi Maidan Environs</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting in Fraser Road and Exhibition Road</strong> for prime commercial showrooms, ancestral joint properties, corporate shares, and demat folios. Protects commercial tenancy succession and partnership equity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Campus, Near Gandhi Maidan</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct SRO Sadar counter execution, business succession structuring, and demat portfolio transmission.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Demat Portfolios</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Fraser Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Fraser Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: PATNA CITY, GULZARBAGH & PATNA SAHIB */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Historic Trade Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patna City
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Patna City &amp; Gulzarbagh
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patna Sahib</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chowk Mandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marufganj Godowns</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Meena Bazar &amp; Agamkuan</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Traditional <strong>Will drafting in Patna City and Gulzarbagh</strong> for historic mercantile families, joint business establishments, wholesale godowns, and heritage ancestral kothis. Clear division of undivided shares prevents multi-generation civil litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Government Printing Press Campus, Gulzarbagh</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        SRO Patna City counter facilitation, family coparcenary settlement, and witness attestation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Joint Family &amp; Wholesale Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Patna City"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Patna City Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: ASHIANA NAGAR, DIGHA & RAJIV NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-West Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patna Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ashiana Nagar &amp; Digha
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashiana Nagar Phases 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Digha Ghat Environs</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajiv Nagar Sectors</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ram Nagari Housing</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable <strong>Will drafting in Ashiana Nagar and Digha</strong> for cooperative housing societies, independent duplexes, and riverfront properties. Clear testamentary clauses ensure swift municipal transfer with Patna Municipal Corporation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO Patna Sadar (Revenue Wing)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online Bihar e-Nibandhan slot booking, home registration under Section 31, and doctor fitness certificate coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Cooperative &amp; Plotted Duplexes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ashiana Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ashiana Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: BIHTA, KHAGAUL & GREATER PATNA CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Emerging Industrial Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Danapur / Bihta Link
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bihta &amp; Khagaul
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bihta Industrial Hub</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IIT Patna Environs</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khagaul Railway Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Neora &amp; Shivala</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Future-ready <strong>Will drafting in Bihta and Khagaul</strong> for agricultural land parcels, newly acquired residential plots, and institutional corridor properties. Includes exact Survey Khatiyan and Khesra numbers for Bihar Bhumi Dakhil Kharij mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Divisional Complex, Danapur / Bihta Link</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Danapur SRO deed registration, Jamabandi verification, and Circle Officer mutation assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Bihar Bhumi Khatiyan Land</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bihta"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bihta Corridor Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: BIHAR BHUMI DAKHIL KHARIJ & E-NIBANDHAN SOP */}
            <section id="step-by-step-patna-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP SOP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Bihar Bhumi Dakhil Kharij &amp; e-Nibandhan SOP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Patna and ensuring future land mutation follows a systematic five-stage standard operating procedure:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C65378] text-white flex items-center justify-center font-black text-sm shrink-0">
                    01
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Estate Audit &amp; Land Record Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a detailed schedule of all assets. For Patna immovable properties, record the exact Survey Khata, Khesra, Thana number, and Jamabandi details from the Bihar Bhumi portal. Gather bank account details, demat statements, and jewelry lists.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C65378] text-white flex items-center justify-center font-black text-sm shrink-0">
                    02
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Advocate Drafting &amp; Custom Succession Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will through our platform or with a senior Patna estate lawyer. Essential clauses include clear revocation of past wills, specific bequest shares, appointment of a trusted executor, and survivorship arrangements.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C65378] text-white flex items-center justify-center font-black text-sm shrink-0">
                    03
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Execution &amp; Attestation by Two Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final Will draft on standard white paper. The testator signs each page in the simultaneous presence of two independent adult witnesses who then append their signatures and identity details as required under Section 63.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C65378] text-white flex items-center justify-center font-black text-sm shrink-0">
                    04
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Slot Booking on Bihar e-Nibandhan Portal
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log into <code>biharregservices.gov.in</code>, select your jurisdictional Sub-Registrar Office (Patna Sadar, Danapur, Phulwari Sharif, or Patna City), enter KYC details, pay the nominal government fee, and generate your e-appointment slip.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C65378] text-white flex items-center justify-center font-black text-sm shrink-0">
                    05
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO Biometric Capture &amp; Book III Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office with your two witnesses and original IDs. The Sub-Registrar completes biometric verification, captures digital photographs, and records the Will in the official Book III register, returning the endorsed registered deed.
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Registration for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Senior citizens, hospitalized individuals, and bedridden testators residing in Patna are not required to travel to congested Sub-Registrar offices. Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar has statutory authority to visit the testator&apos;s home or hospital room:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Doctor&apos;s Mental Certificate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An MBBS doctor certifies that the senior citizen is of sound mind, fully understands testamentary consequences, and is medically unfit to travel to the SRO.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Commission Petition</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our Patna legal team files an official requisition under Section 31 before the Sub-Registrar, paying the nominal government commission visit fee.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Home Biometric Visit</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The registration officer visits the residence in Bailey Road, Boring Road, or Kankarbagh with mobile biometric equipment to complete thumb impression and photo capture.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>DOCUMENT PREPARATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Patna Sub-Registrar
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive document preparation checklist for registering your Will at Patna Sub-Registrar offices. Track required documents before your e-Nibandhan appointment:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Mandatory Dossier Checklist
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold">
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
                          ? "bg-slate-50/80 border-slate-300/80 text-slate-800"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PATNA PROPERTY TYPES */}
            <section id="patna-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET SPECIFICS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Patna Property Types: Khatiyan, PRDA &amp; PMC
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession procedures in Patna depend directly on property tenure and classification under Bihar revenue and municipal authorities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Ancestral Khatiyan Land
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ancestral agricultural holdings across Patna district require precise reference to Cadastral/Revisional Survey Khatiyan records, Khesra numbers, and Jamabandi receipts to facilitate flawless Dakhil Kharij mutation before the Circle Officer.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    PRDA Plotted Properties
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Residential plots allotted by the former Patna Regional Development Authority (PRDA) in Kankarbagh, Lohia Nagar, and Hanuman Nagar can be transferred directly to beneficiaries upon presenting a registered Will and death certificate.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    PMC Flats &amp; Holding Tax
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern high-rise flats along Bailey Road and Boring Road require municipal assessment mutation (Holding Tax Namantaran) under Patna Municipal Corporation rules. A registered Will prevents conflicting claims from distant heirs.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & SRO CHARGES */}
            <section id="patna-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT SRO SCHEDULE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Bihar Government Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike commercial sale deeds or gift deeds that attract substantial ad-valorem stamp duty, Wills are 100% exempt from stamp duty across Bihar under the Indian Stamp Act, 1899:
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
                      <td className="p-4 font-semibold">Bihar Stamp Duty</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Bihar</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">e-Nibandhan Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹500 – ₹1,000 (Flat Fee)</td>
                      <td className="p-4">Registration &amp; Prohibition Dept Bihar</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Service Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">Bihar e-Nibandhan Service Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Commission</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Official Home Visit Commission Fee</td>
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal assistance that fits your family estate planning requirements in Patna:
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
                      Ideal for nuclear families with residential apartments, bank fixed deposits, and mutual funds.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Patna Will builder</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted statutory clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; instructions</span>
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
                    Most Popular in Patna
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
                      Senior estate advocate review for ancestral Khatiyan land, PRDA plots, and family succession clarity.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 video call with senior lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for land &amp; minors</span>
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
                      Full end-to-end registration assistance across all 5 Patna Sub-Registrar offices.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bihar e-Nibandhan slot &amp; e-challan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends SRO with you</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of registered Book III deed</span>
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
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Patna Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key queries on drafting and registering a Will in Patna:
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory References &amp; Bihar Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate planning protocols comply strictly with central statutes and official Bihar revenue systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 62, 63, and Section 213 (Non-Presidency Town Probate Rules).
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
                    Bihar e-Nibandhan
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Registration portal: <code>biharregservices.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Bihar Bhumi Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Revenue &amp; Land Reforms portal: <code>biharbhumi.bihar.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Patna Assets &amp; Loved Ones Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not allow your ancestral lands or hard-earned Patna properties to get trapped in prolonged family litigation. Draft a legally binding Will in minutes or consult our senior succession advocates.
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
          HIGH-RESOLUTION MODAL - ENSURES FULL VISIBILITY OF IMAGE
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-[#172228] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 flex flex-col shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <span className="font-bold text-sm text-white">
                Visual Blueprint: Patna Will Drafting &amp; Property Succession
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[350px] sm:min-h-[450px] md:min-h-[550px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-patna.jpg"
                alt="High Resolution Visual Blueprint: Patna Will Drafting and Registration"
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
