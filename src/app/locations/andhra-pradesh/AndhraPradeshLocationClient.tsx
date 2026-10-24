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
  { id: "ap-overview", label: "OVERVIEW" },
  { id: "ap-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "ap-probate-rules", label: "PROBATE RULES" },
  { id: "ap-sro-directory", label: "SRO DIRECTORY" },
  { id: "ap-area-coverage", label: "REGIONAL CITIES" },
  { id: "step-by-step-ap-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "ap-property-types", label: "PROPERTY TYPES" },
  { id: "ap-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const AP_SRO_HUBS = [
  {
    id: "vizag-dwarakanagar",
    name: "Visakhapatnam (Dwarakanagar & MVP)",
    sro: "SRO Visakhapatnam (District Registrar Complex)",
    address: "District Registrar Office Complex, Dwarakanagar, Near RTC Complex, Visakhapatnam - 530016",
    areas: "MVP Colony, Seethammadhara, Dwarakanagar, Siripuram, Waltair Uplands, Madhurawada, Rushikonda, Gajuwaka",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
  {
    id: "vijayawada-governorpet",
    name: "Vijayawada (Governorpet & Patamata)",
    sro: "SRO Vijayawada Urban (Governorpet Hub)",
    address: "Registration Department Complex, Governorpet, Vijayawada, NTR District - 520002",
    areas: "Governorpet, Benz Circle, Moghalrajpuram, Patamata, Bhavanipuram, Gunadala, Gandhinagar, Gollapudi",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
  {
    id: "guntur-amaravati",
    name: "Guntur & Amaravati Capital Region",
    sro: "SRO Guntur East & West (Collectorate Complex)",
    address: "District Registrar Office, Collectorate Compound, Nagarampalem, Guntur - 522004",
    areas: "Amaravati Capital City, Mangalagiri, Tadepalli, Brodipet, Arundelpet, Tenali, Pattabhipuram, Perecherla",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
  {
    id: "tirupati-chittoor",
    name: "Tirupati (Balaji & TUDA Zone)",
    sro: "SRO Tirupati Urban (TUDA Complex)",
    address: "TUDA Complex, Bhavani Nagar, Near Central Bus Station, Tirupati - 517501",
    areas: "Tirupati Urban, Renigunta, Chandragiri, Alipiri, Tiruchanur, Padmavathi Puram, Karakambadi Road",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
  {
    id: "rajamahendravaram-godavari",
    name: "Rajamahendravaram & Kakinada",
    sro: "SRO Rajamahendravaram & SRO Kakinada Port",
    address: "Sub-Registrar Office, Danavaipeta, Rajamahendravaram / Collectorate Complex, Kakinada - 533103",
    areas: "Danavaipeta, Morampudi, Dowleswaram, Kakinada Smart City, Jagannaickpur, Amalapuram, Konaseema Delta",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
  {
    id: "nellore-krishnapatnam",
    name: "Nellore (Dargamitta & Port Corridor)",
    sro: "SRO Nellore Rural & Urban",
    address: "District Registration Complex, Dargamitta, Near Collectorate, Nellore - 524003",
    areas: "Dargamitta, Magunta Layout, Vedayapalem, Podalakur Road, Krishnapatnam, Gudur, Kavali",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
  {
    id: "kurnool-anantapur",
    name: "Kurnool & Anantapur (Rayalaseema Belt)",
    sro: "SRO Kurnool Urban & SRO Ananthapuramu",
    address: "District Registrar Office, Near Zilla Parishad, Kurnool - 518002",
    areas: "Kurnool City, B-Camp, Nandyal, Ananthapuramu, Dharmavaram, Sri Sathya Sai (Puttaparthi), Kadapa",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd Saturday & Sunday closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 executive bond sheets. Under Andhra Pradesh registration guidelines, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity validation, electronic thumbprinting, and digital web-camera photo at the AP Sub-Registrar counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any property or bequest under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly advised for senior citizens aged 60+. Certifies testamentary mental capacity, soundness of mind, and voluntariness.",
    checked: false,
  },
  {
    id: "item-5",
    label: "AP IGRS Appointment Slip & CFMS Challan",
    detail: "Official time-slot booking receipt downloaded from registration.ap.gov.in portal with CFMS Cyber Treasury payment confirmation.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Municipal Property Tax Receipts & Registered Deeds",
    detail: "Copies of GVMC, VMC, GMC, or local municipal property tax receipts and registered sale or gift deeds.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Meebhoomi 1-B Adangal & Pattadar Passbook (For Farmland)",
    detail: "Recent computerized land records and digital e-Pattadar passbooks from meebhoomi.ap.gov.in for agricultural parcels.",
    checked: false,
  },
];

export default function AndhraPradeshLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("ap-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("vizag-dwarakanagar");
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
      { rootMargin: "-20% 0px -70% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (session) {
      router.push("/start");
    } else {
      window.dispatchEvent(
        new CustomEvent(OPEN_SIGNUP_EVENT, { detail: { returnUrl: "/start" } })
      );
    }
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const filteredHubs = AP_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    AP_SRO_HUBS.find((h) => h.id === selectedHub) || AP_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI STYLE ARCHITECTURE)
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
                <span>ANDHRA PRADESH SUCCESSION &amp; ASSET DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters (Begins with user target phrase) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Andhra Pradesh &amp; Legal Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally airtight Will for your urban apartments in Visakhapatnam and Vijayawada, APCRDA plots in Amaravati, commercial assets, and Meebhoomi agricultural farmlands. Get expert advocate drafting, AP IGRS registration guidance, and Section 31 doorstep execution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Andhra Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ap-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>AP SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AP High Court Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 AP Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep SRO</span>
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
                  src="/images/will-drafting-in-andhra-pradesh.jpg"
                  alt="Legal Will Drafting and Property Succession in Andhra Pradesh"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Andhra Urban &amp; Farmland Succession Framework
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
                26 Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Full Andhra Pradesh Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Statutory Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Presidency State Rule
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                Meebhoomi Sync
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                1-B Adangal &amp; Passbook Mutation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY MOBILE TOC BAR
          ========================================================================= */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5">
        <div className="relative">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-800"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C65378]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Section:</span>
              <span className="text-[#C65378]">{currentActiveToc.label}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileTocOpen ? "rotate-180" : ""}`} />
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
            <section id="ap-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>ANDHRA PRADESH SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in AP
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two witnesses is legally binding. However, registering your Will in Book III of the local AP Sub-Registrar Office provides undeniable evidentiary validity.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Andhra Pradesh is a non-presidency state. Under Section 213 of the Indian Succession Act, court probate is strictly optional in Andhra Pradesh. Legal heirs can transfer title and mutate records without High Court probate.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Andhra Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from ad-valorem stamp duty across Andhra Pradesh. You only pay nominal registration charges (₹100 to ₹200) and minor computer scanning charges at the Sub-Registrar Office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Meebhoomi &amp; Municipal Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites online property tax mutation with GVMC, VMC, and GMC, and enables smooth 1-B Adangal and e-Pattadar passbook updates for agricultural land on the Meebhoomi portal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="ap-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FRAMEWORK &amp; CODE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Andhra Pradesh
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession in Andhra Pradesh is governed by central statutory codes integrated with state land and municipal laws. Whether allocating residential apartments in Visakhapatnam, commercial establishments in Vijayawada, or fertile Godavari agricultural farmland, testamentary dispositions must comply with three core legal pillars:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 63, Indian Succession Act, 1925
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mandates that every Will must be signed by the testator in the presence of at least two adult witnesses. Each witness must attest that the testator executed the instrument voluntarily while in a sound disposing state of mind.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Registration Act, 1908 (Sec 18e &amp; 31)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 18(e) classifies Will registration as optional. Section 31 empowers the Sub-Registrar to conduct doorstep home or hospital visits for elderly, unwell, or mobility-restricted testators across all 26 districts of Andhra Pradesh.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    AP Rights in Land &amp; Passbooks Act
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governs agricultural title mutation across Andhra Pradesh. Under this statute, revenue authorities update the Record of Rights (ROR) on the Meebhoomi portal directly upon production of a registered Will and death certificate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION COMPARISON MATRIX</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Andhra Pradesh?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  While unregistered Wills executed on plain paper are legally recognized, estate planners and legal practitioners strongly advise registering your Will at the local AP Sub-Registrar Office. Registration establishes conclusive government custody under Book III and prevents family challenges:
                </p>
              </div>

              {/* TABLE */}
              <div className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white font-mono uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">Succession Criterion</th>
                        <th className="p-4 text-rose-300">Registered Will (AP IGRS)</th>
                        <th className="p-4 text-slate-300">Unregistered Will</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-4 font-bold text-slate-900">Legal Validity (ISA Sec 63)</td>
                        <td className="p-4 bg-rose-50/30 text-emerald-800 font-semibold">100% Valid &amp; Enforceable</td>
                        <td className="p-4">Valid if signed before 2 witnesses</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">Government Record (Book III)</td>
                        <td className="p-4 bg-rose-50/30 font-medium">Archived permanently in AP IGRS registry</td>
                        <td className="p-4">Held privately; vulnerable to loss or tampering</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">Evidentiary Presumption in Court</td>
                        <td className="p-4 bg-rose-50/30 font-medium">Strong legal presumption of genuine execution</td>
                        <td className="p-4">Beneficiary must formally prove handwriting &amp; mental soundness</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">Risk of Forgery or Coercion Claims</td>
                        <td className="p-4 bg-rose-50/30 text-emerald-800 font-semibold">Extremely Low (Biometric &amp; Photo log)</td>
                        <td className="p-4 text-amber-700 font-semibold">High risk of challenge by excluded relatives</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">Meebhoomi &amp; Municipal Mutation</td>
                        <td className="p-4 bg-rose-50/30 text-emerald-800 font-semibold">Fast single-window name mutation</td>
                        <td className="p-4">Revenue officials often demand court succession certificates</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">Government Stamp Duty</td>
                        <td className="p-4 bg-rose-50/30 font-bold text-emerald-700">₹0 (100% Exempt)</td>
                        <td className="p-4 font-bold text-slate-700">₹0 (Exempt)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE LAW IN ANDHRA PRADESH */}
            <section id="ap-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>AP HIGH COURT JURISPRUDENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. AP Probate Law: Exemption Under High Court Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent misconceptions among property owners in Andhra Pradesh is whether a Will must be probated by a court before transferring ownership. Under Indian succession jurisprudence, the answer is clear:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-5 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Probate Is Strictly Optional for Andhra Pradesh Properties
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Under Section 213(1) read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is mandatory only for Wills executed within or covering immovable assets inside the historic presidency towns of Mumbai, Kolkata, and Chennai. Because Andhra Pradesh has never been a presidency town, the High Court of Andhra Pradesh at Amaravati has ruled that obtaining probate is entirely non-mandatory for Hindu, Buddhist, Sikh, and Jain Wills.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs sm:text-sm text-amber-900">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Important Distinction: Probate vs. Title Challenge</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    While municipal bodies (GVMC, VMC, GMC) and Tahsildars cannot insist on court probate for routine mutation, any disgruntled legal heir can still file a regular civil suit challenging testamentary capacity, coercion, or fraud. Registering your Will on the AP IGRS portal provides the strongest defense against such frivolous litigation.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Need to verify if your specific family estate requires court probate?
                  </span>
                  <Link
                    href="/tools/probate-checker"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] hover:underline"
                  >
                    <span>Run Free AP Probate Checker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 4: AP SRO JURISDICTION DIRECTORY */}
            <section id="ap-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION JURISDICTION HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. AP Sub-Registrar Offices: District SRO Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Wills can be registered at any Sub-Registrar Office within the revenue district where the testator resides or where any part of the immovable property is located. Explore key registration hubs across Andhra Pradesh:
                </p>
              </div>

              {/* SEARCH & SELECTOR */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by city, district, SRO name, or locality (e.g., Visakhapatnam, Benz Circle, Amaravati)..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                  />
                </div>

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
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                        Selected District Registry Hub
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-900">{activeHubData.sro}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      AP IGRS Public Data Entry Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Complex Address:</span>
                      <p className="leading-relaxed">{activeHubData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Operational Timings:</span>
                      <p className="leading-relaxed">{activeHubData.timings}</p>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="font-bold text-xs text-slate-900 block">Key Localities &amp; Zones Covered:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Need an advocate to accompany you to this Sub-Registrar Office?
                    </span>
                    <a
                      href="/service/will-registration"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center"
                    >
                      <span>Book SRO Advocate Accompaniment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES IN ANDHRA PRADESH (EXACT NASHIK CARDS ARCHITECTURE) */}
            <section id="ap-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ASSET SUCCESSION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Will Drafting Across Andhra Pradesh
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Andhra Pradesh span coastal commercial hubs, high-growth IT corridors in Visakhapatnam, capital region lands in Amaravati, trading centers in Vijayawada, and agricultural delta farmlands in Godavari and Krishna. Our estate advocates deliver customized legal drafting, AP IGRS slot booking, and Sub-Registrar accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: VISAKHAPATNAM (VIZAG) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Coastal &amp; Port Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Visakhapatnam (Dwarakanagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Visakhapatnam (Vizag)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MVP Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Seethammadhara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madhurawada IT Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gajuwaka Industrial</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Visakhapatnam</strong> for luxury beachfront apartments, VMRDA plotted layouts, defense personnel retirement estates, and commercial logistics firms. Prepares watertight clauses for Greater Visakhapatnam Municipal Corporation (GVMC) property tax name substitution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Dwarakanagar, MVP Colony &amp; Gajuwaka</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS slot booking, advocate physical attendance at Dwarakanagar SRO, and Section 31 doorstep execution for naval veterans and senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Visakhapatnam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vizag Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: VIJAYAWADA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Commercial Capital &amp; NTR District
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Governorpet &amp; Patamata
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vijayawada
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benz Circle</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Moghalrajpuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Governorpet Wholesale</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patamata</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Vijayawada</strong> for commercial trading family businesses, multi-story commercial buildings on MG Road, and Krishna delta agricultural lands. Includes clear partnership succession clauses and Vijayawada Municipal Corporation (VMC) mutation roadmap.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Governorpet, Patamata &amp; Gunadala</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete AP IGRS slot booking, token issuance, and home registration assistance across Benz Circle, Moghalrajpuram, and Suryaraopeta.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vijayawada"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vijayawada Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: GUNTUR & AMARAVATI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital Region &amp; Institutional Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Guntur &amp; Mangalagiri
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Guntur &amp; Amaravati
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amaravati Seed Capital</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mangalagiri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tadepalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Brodipet &amp; Arundelpet</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting in Guntur &amp; Amaravati</strong> addressing APCRDA land pooling reconstitution plots, high-value commercial properties, and chili/tobacco export businesses. Ensures flawless succession before APCRDA single-window portals and GMC records.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Guntur Collectorate &amp; Mangalagiri</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS slot registration, advocate verification of APCRDA allotment deeds, and home registration visits across Guntur urban zones.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Guntur and Amaravati"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Guntur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: TIRUPATI & CHITTOOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Spiritual &amp; Education Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tirupati Urban (TUDA)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tirupati &amp; Chittoor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Renigunta Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandragiri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alipiri Bypass</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tiruchanur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Tirupati</strong> covering TUDA approved residential layouts, hospitality businesses, private educational assets, and agricultural groves in Chittoor district. Clarifies religious charitable trust bequests and family survivorship rights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: TUDA Complex, Bhavani Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS slot booking, token tracking, and Section 31 home execution for senior citizens and pilgrims residing in Tirupati urban.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tirupati"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tirupati Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: RAJAMAHENDRAVARAM & EAST GODAVARI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Godavari Cultural &amp; Agro Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Rajamahendravaram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Rajamahendravaram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Danavaipeta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Morampudi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dowleswaram Barrage</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kotipalli Bus Stand</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting in Rajamahendravaram</strong> for riverfront properties, paper and agro-processing businesses, and fertile Godavari paddy farmlands. Structures smooth Meebhoomi 1-B Adangal revenue succession without family litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Danavaipeta &amp; Dowleswaram</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS slot scheduling, advocate accompaniment, and doorstep registration for elderly residents across Danavaipeta and T. Nagar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Rajamahendravaram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Rajahmundry Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: KAKINADA & KONASEEMA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Deepwater Port &amp; Smart City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kakinada &amp; Amalapuram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kakinada &amp; Konaseema
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kakinada Port Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Smart City Layouts</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amalapuram Coconut Groves</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ravulapalem</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Kakinada</strong> for port logistics infrastructure, aquaculture hatcheries, and Konaseema coconut plantations. Protects multi-generational agricultural tenures and commercial deepwater shipping shares.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kakinada Collectorate &amp; Amalapuram</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS online appointment assistance, CFMS cyber challan processing, and advocate doorstep registration across East Godavari coastal belts.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kakinada"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kakinada Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: NELLORE & KRISHNAPATNAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Coastal &amp; Aquaculture Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nellore (Dargamitta)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nellore &amp; Krishnapatnam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Magunta Layout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vedayapalem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Krishnapatnam Port Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gudur &amp; Kavali</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting in Nellore</strong> for shrimp aquaculture estates, mica processing units, port ancillary warehousing, and residential layouts in Magunta Layout. Ensures seamless succession before Nellore Municipal Corporation and port authorities.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Dargamitta Registration Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS slot booking, advocate review of industrial and coastal aquaculture leaseholds, and Section 31 home registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nellore"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nellore Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: KURNOOL & ANANTAPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Rayalaseema Gateway &amp; Mineral Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kurnool &amp; Ananthapuramu
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kurnool &amp; Anantapur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kurnool B-Camp</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nandyal Industrial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ananthapuramu Urban</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Puttaparthi Sri Sathya Sai</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting in Kurnool &amp; Anantapur</strong> covering granite quarrying rights, cement factory shares, solar park leases, and dryland groundnut farms. Codifies undivided ancestral shares under Mitakshara Hindu law and KUDA layouts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kurnool Urban &amp; Ananthapuramu</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete AP IGRS slot booking, token issuance, and home registration assistance across Kurnool, Nandyal, and Anantapur.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal AP Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kurnool and Anantapur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kurnool Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-ap-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to AP IGRS Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Andhra Pradesh is straightforward when following the statutory sequence. Here is the verified 5-step Standard Operating Procedure (SOP) managed by our estate advocates:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Step 1 · Day 1</span>
                    <span className="text-xs font-bold text-slate-500">Asset Audit</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Comprehensive Asset Inventory &amp; Beneficiary Structuring
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Collate clear descriptions of all real estate (GVMC, VMC, APCRDA, VMRDA, or TUDA layouts), agricultural survey numbers with Meebhoomi 1-B extracts, bank accounts, mutual funds, and business shares. Appoint an executor and outline alternate beneficiaries.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Step 2 · Day 1 to 2</span>
                    <span className="text-xs font-bold text-slate-500">Legal Drafting</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Advocate Drafting with Testamentary Safeguards
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our senior High Court advocates draft clear testamentary clauses that explicitly revoke past instruments, provide life interest clauses for spouses where desired, appoint guardians for minor children, and allocate residuary assets.
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Step 3 · Day 2</span>
                    <span className="text-xs font-bold text-slate-500">Physical Attestation</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Physical Execution in the Presence of Two Witnesses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Print the approved Will on standard A4 executive bond paper. The testator signs or affixes their thumb impression at the foot of each page before two independent, non-beneficiary witnesses who sign immediately afterwards.
                  </p>
                </div>

                {/* STEP 4 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Step 4 · Day 2 to 3</span>
                    <span className="text-xs font-bold text-slate-500">AP IGRS Online</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    AP IGRS Public Data Entry &amp; Cyber Challan Generation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our legal team submits the Public Data Entry (PDE) on registration.ap.gov.in, uploads testator and witness KYC information, pays the nominal registration fee via CFMS cyber treasury challan, and books a confirmed time slot.
                  </p>
                </div>

                {/* STEP 5 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Step 5 · Day 3</span>
                    <span className="text-xs font-bold text-slate-500">SRO Finalization</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Biometric Authentication &amp; Book III Safe Custody
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The testator and both witnesses attend the designated AP Sub-Registrar Office accompanied by our advocate. After biometric thumbprinting and live digital photo capture, the original Will is registered into Book III and returned with official government endorsement.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP REGISTRATION */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP CONVENIENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration in Andhra Pradesh
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden testators, or hospital-bound individuals who cannot physically travel to the registration complex, Indian law provides a dignified alternative:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-xs">
                <h3 className="font-extrabold text-lg text-slate-900">
                  Sub-Registrar Home &amp; Hospital Attendance Protocol
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Under Section 31 of the Registration Act, 1908, the Sub-Registrar is legally empowered to attend the private residence or hospital room of a testator upon special cause. Our advocate desk coordinates the entire statutory commission workflow:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-slate-900 block">1. Doctor Fitness Certificate</span>
                    <p className="text-[11px] text-slate-500">
                      An MBBS/MD doctor issues a certificate confirming testamentary lucidity and certifying travel disability.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-slate-900 block">2. Formal SRO Application</span>
                    <p className="text-[11px] text-slate-500">
                      We submit a formal petition under Section 31 with the medical certificate to the District Registrar.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-slate-900 block">3. Portable Biometrics</span>
                    <p className="text-[11px] text-slate-500">
                      The Sub-Registrar visits your home with portable biometric hardware, completing Book III registration on-site.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Available across all major cities in Andhra Pradesh including Visakhapatnam, Vijayawada, Guntur, Tirupati, and Nellore.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENT CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>READINESS AUDIT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for AP Sub-Registrar Offices
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure you have all necessary documentation ready before your AP IGRS appointment slot. Check off the items below:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-5 shadow-xs">
                {/* PROGRESS BAR */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">Checklist Readiness Progress</span>
                    <span className="text-[#C65378]">
                      {checkedCount} of {checklist.length} Completed
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#C65378] transition-all duration-300 rounded-full"
                      style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* CHECKLIST ITEMS */}
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200"
                          : "bg-slate-50/60 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`font-bold text-xs sm:text-sm block ${item.checked ? "text-slate-900" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: ANDHRA PROPERTY TYPES */}
            <section id="ap-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Andhra Property Types: VMRDA, APCRDA &amp; Farmland
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A legally robust Will must accurately describe property according to its statutory authority to ensure prompt name substitution after the testator&apos;s lifetime:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Urban Apartments &amp; Gated Communities</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    High-rise apartments and gated villas across GVMC Visakhapatnam, VMC Vijayawada, and GMC Guntur. Codifies undivided share of land (UDS), dedicated car parking slots, and corpus fund deposits with resident welfare associations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Development Authority Plots &amp; Leases</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Plotted layouts and leasehold/freehold allotments under APCRDA (Amaravati), VMRDA (Visakhapatnam), and TUDA (Tirupati). Explicitly cites allotment letters, possession certificates, and master development plans to avoid authority transfer penalties.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>Meebhoomi Agricultural Farmland &amp; Aqua Farms</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fertile paddy land, horticulture orchards, and coastal aquaculture shrimp ponds. Bequests are drafted using exact survey numbers, sub-division numbers, and 1-B Namuna khatas to facilitate immediate Tahsildar mutation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Factory className="w-4 h-4 text-[#C65378]" />
                    <span>Commercial Showrooms, MSMEs &amp; Financial Wealth</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Wholesale trading stores in Governorpet, auto ancillary units in Gajuwaka, Demat share portfolios, bank fixed deposits, and mutual funds. Overrides nominee status to guarantee undisputed legal ownership.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="ap-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES BREAKDOWN</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official AP IGRS Registration Fees &amp; Stamp Duty
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike commercial sale deeds or gift settlements that attract 5% to 7.5% stamp duty in Andhra Pradesh, testamentary Wills are completely exempt from stamp duty. Government registration charges are strictly nominal:
                </p>
              </div>

              {/* TABLE */}
              <div className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white font-mono uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Government Fee Head</th>
                      <th className="p-4 text-rose-300">Statutory Rate in AP</th>
                      <th className="p-4 text-slate-300">Official Beneficiary Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Andhra Pradesh Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Andhra Pradesh</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">AP IGRS Statutory Registration Fee</td>
                      <td className="p-4 font-bold text-slate-900">₹100 to ₹200</td>
                      <td className="p-4">Registration &amp; Stamps Department</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer User &amp; Scanning Charges</td>
                      <td className="p-4 font-bold text-slate-900">₹100 to ₹300 (Approx)</td>
                      <td className="p-4">CFMS Cyber Treasury Portal</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Commission Fee</td>
                      <td className="p-4 font-bold text-slate-900">As per official SRO distance tariff</td>
                      <td className="p-4">District Registrar Office</td>
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
                  <span>TRANSPARENT SERVICES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in AP
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal assistance that matches your estate requirements. Zero hidden fees, clear deliverables, and verified High Court advocate review:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Standard
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">Online Will Drafting</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individuals with straightforward estates comprising residential flats, bank accounts, and investments.
                    </p>
                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant Lawyer-Vetted Draft</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 63 ISA Compliant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor Fitness Template Included</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={handleStartDraft}
                      className="w-full py-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-[#C65378] hover:text-white transition-colors cursor-pointer"
                    >
                      Choose Standard Draft
                    </button>
                  </div>
                </div>

                {/* TIER 2 (MOST POPULAR) */}
                <div className="rounded-3xl bg-[#172228] text-white p-6 flex flex-col justify-between shadow-xl relative transform md:-translate-y-2 border-2 border-[#C65378]">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Most Popular in Andhra
                  </div>

                  <div className="space-y-4 pt-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-xl text-white">Advocate Assisted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">₹4,990</span>
                      <span className="text-xs text-slate-300">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Recommended for families with agricultural land, APCRDA/VMRDA plots, multi-property portfolios, and business assets.
                    </p>
                    <ul className="space-y-2 pt-2 text-xs text-slate-200">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Everything in Standard Draft</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Senior High Court Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Meebhoomi 1-B Farmland Customization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>AP IGRS Online Booking Assistance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <button
                      onClick={handleStartDraft}
                      className="w-full py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-lg shadow-[#C65378]/30"
                    >
                      Get Advocate Assisted Will
                    </button>
                  </div>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      End-to-End
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">SRO Accompaniment &amp; Doorstep</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete done-for-you service with advocate accompanying you to the Sub-Registrar Office or arranging Section 31 home visits.
                    </p>
                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Advocate Drafting &amp; Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>AP IGRS Token &amp; Slot Coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical Advocate Attendance at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 Doorstep Visit Support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/service/will-registration"
                      className="block text-center w-full py-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-[#C65378] hover:text-white transition-colors cursor-pointer"
                    >
                      Book Full SRO Assistance
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
                  <span>LOCAL QUESTIONS ANSWERED</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in AP
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key statutory questions regarding registration, probate exemptions, Meebhoomi land mutations, and witness rules in Andhra Pradesh:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL AUTHORITIES &amp; STATUTES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; AP Legal Framework Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will drafting and testamentary succession in Andhra Pradesh are rooted in verified statutory frameworks and official government e-services:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act, 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 63 (Execution &amp; Attestation), Section 57 &amp; Section 213 (Probate Jurisdiction and non-presidency rules).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act, 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Will Registration) and Section 31 (Doorstep registration by Sub-Registrar commission).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    AP Rights in Land &amp; Pattadar Pass Books Act
                  </span>
                  <p className="text-xs text-slate-600">
                    Governs title mutation for agricultural lands via 1-B Adangal on the official Meebhoomi portal (<code>meebhoomi.ap.gov.in</code>).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    AP IGRS Government Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Registration &amp; Stamps Department Andhra Pradesh Public Data Entry portal (<code>registration.ap.gov.in</code>).
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Andhra Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Andhra Pradesh flats, commercial businesses, or agricultural lands to administrative delays or family disputes. Draft a legally valid Will online today or consult our senior advocates.
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
                Visual Blueprint: Andhra Pradesh Will Drafting &amp; Property Succession Framework
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
                src="/images/will-drafting-in-andhra-pradesh.jpg"
                alt="High Resolution Visual Blueprint: Andhra Pradesh Will Drafting and AP IGRS Registration"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>AP IGRS Registered &amp; Meebhoomi Mutation Compliant</span>
              <a
                href="/start"
                onClick={(e) => {
                  setShowHighResModal(false);
                  handleStartDraft(e);
                }}
                className="font-bold text-[#C65378] hover:underline"
              >
                Start Drafting Your Will →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
