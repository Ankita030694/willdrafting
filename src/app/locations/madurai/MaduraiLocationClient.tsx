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
  { id: "madurai-overview", label: "OVERVIEW" },
  { id: "madurai-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "madurai-probate-guidance", label: "PROBATE & HIGH COURT" },
  { id: "madurai-sro-directory", label: "SRO DIRECTORY" },
  { id: "madurai-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-madurai-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "madurai-property-types", label: "PROPERTY TYPES" },
  { id: "madurai-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const MADURAI_DISTRICTS = [
  {
    id: "madurai-north",
    name: "Madurai North",
    sro: "SRO Madurai North & SRO Tallakulam",
    address: "Combined Sub-Registrar Complex, Near Court Complex, K.K. Nagar / Alagarkoil Road, Madurai - 625020",
    areas: "K.K. Nagar, Anna Nagar, Tallakulam, Chokkikulam, Goripalayam, Alagarkoil Road, Melur Road, Race Course Colony, Reserve Line, Gandhi Nagar",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "madurai-south",
    name: "Madurai South",
    sro: "SRO Madurai South & Joint 1 SRO",
    address: "Registration Office Complex, Palace Road, Near Thirumalai Nayakar Mahal, Madurai - 625001",
    areas: "South Gate, Mahal Road, Simmakkal, Vilakkuthoon, Periyar, Town Hall Road, West Masi Street, North Chitrai Street, Kamarajar Salai, Teppakulam",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "madurai-west",
    name: "Madurai West",
    sro: "SRO Arasaradi (Madurai West)",
    address: "Sub-Registrar Office, Arasaradi, Near Railway Junction, Madurai - 625016",
    areas: "SS Colony, Ellis Nagar, Ponmeni, Bypass Road, Kalavasal, Doak Nagar, Arasaradi, Kochadai, Fatima College area, Samayanallur",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "thiruparankundram",
    name: "Thiruparankundram",
    sro: "SRO Thiruparankundram",
    address: "Sub-Registrar Office, Near Big Temple / Station Road, Thiruparankundram, Madurai - 625005",
    areas: "Thiruparankundram, Pasumalai, Harveypatti, Tirunagar, Austinpatti, Thanakkankulam, Kappalur Industrial Estate, Nilaiyur, Vadivelkarai",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "othakadai-highcourt",
    name: "Othakadai & High Court",
    sro: "SRO Thamaraipatti & SRO Othakadai",
    address: "Sub-Registrar Office, Melur Main Road, Near High Court Bench, Othakadai, Madurai - 625107",
    areas: "Othakadai, High Court Bench Campus, Mattuthavani, Uthangudi, Thamaraipatti, Surveyor Colony, Rajakambeeram, ELCOT IT Park, Karuppayurani",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "avaniyapuram-villapuram",
    name: "Avaniyapuram & Airport",
    sro: "SRO Avaniyapuram & SRO Thirumangalam",
    address: "Sub-Registrar Office, Airport Road, Avaniyapuram, Madurai - 625012",
    areas: "Avaniyapuram, Villapuram, Jaihindpuram, Madurai Airport Corridor, Perungudi, Mandela Nagar, Eliyarpathi, Valandhur, Thirumangalam",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on clean white A4 paper. No non-judicial stamp paper is required under Tamil Nadu law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Necessary for biometric thumbprint authentication and live web-camera photography at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be beneficiaries receiving bequests in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Issued by an MBBS practitioner. Attests to sound mental capacity and shields the estate against incapacity claims.",
    checked: false,
  },
  {
    id: "item-5",
    label: "TNREGINET Appointment Token Slip",
    detail: "Appointment booking confirmation from tnreginet.gov.in displaying your designated time slot and office code.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Patta & Registered Sale Deed Copies",
    detail: "Document copies verifying ownership, Patta number from Tamil Nilam portal, and Town Survey Land Register extract.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color photographs of the testator and both attesting witnesses for pasting in official Book III registers.",
    checked: false,
  },
];

export default function MaduraiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("madurai-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("madurai-north");
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

  const filteredDistricts = MADURAI_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    MADURAI_DISTRICTS.find((d) => d.id === selectedDistrict) || MADURAI_DISTRICTS[0];

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
                <span>MADURAI &amp; TAMIL NADU ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 56 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Madurai: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally valid Will for your Madurai residential houses, ancestral lands, commercial spaces, and bank investments.
                Get senior advocate drafting, TNREGINET registration guidance, and Madurai Bench High Court legal clarity across Madurai and southern Tamil Nadu.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Madurai Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#madurai-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Madurai SRO Directory</span>
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
                  <span>₹0 Tamil Nadu Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-madurai.jpg"
                  alt="Legal Will Drafting and Estate Succession Services in Madurai"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                Madurai Coverage
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                North, South &amp; Suburbs
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
                Non-Compulsory Outside Chennai
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep Visits for Seniors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS (STICKY ON MOBILE)
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
          {/* DESKTOP VIEW: STICKY TABLE OF CONTENTS */}
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
            <section id="madurai-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>MADURAI SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Probate in Madurai
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Madurai under Section 18(e) of the Registration Act, 1908. A Will on plain paper is valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Madras HC Probate Context</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 213 read with Section 57, probate is not mandatory for Hindu Wills outside Chennai. In Madurai, a registered Will provides direct authority for asset transmission.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur zero stamp duty in Tamil Nadu under the Indian Stamp Act. At Madurai SROs via TNREGINET, you pay only a flat one hundred rupee fee plus nominal scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Online Patta Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will enables swift Patta transfer on the Tamil Nilam portal and Madurai Corporation tax record updates without waiting for civil court decrees.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="madurai-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework for Will Drafting in Madurai
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Writing a Will in Madurai is governed by the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>.
                  Any adult of sound mind who has reached 18 years can make a Will to distribute their self-acquired assets and defined coparcenary shares.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Madurai families often hold a diverse mix of assets.
                  These include residential houses in K.K. Nagar, commercial shops near Meenakshi Amman Temple, agricultural holdings in Melur, and bank deposits.
                  A clearly drafted Will protects your loved ones from bitter property disputes and complex partition lawsuits.
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
                  <h3 className="font-bold text-sm text-slate-900">Free Choice</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will must be made voluntarily without coercion, undue influence, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sign in the concurrent presence of two adult witnesses who see you execute the deed (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not receive any gift, bequest, or interest under the Will (Section 67).
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Compulsory in Madurai?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is <strong>optional</strong>.
                  An unregistered Will executed on plain white paper is legally valid in Indian courts if attested by two witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at a Madurai Sub-Registrar Office via TNREGINET offers decisive legal benefits.
                  Here is how registered Wills compare against unregistered papers:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Madurai SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Custody</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives of Tamil Nadu Registration Department</td>
                      <td className="p-4 bg-slate-50/20">Kept in private custody; vulnerable to destruction, damage, or loss</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Risk of Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Minimal. Biometric thumbprints and live web-camera photos recorded at SRO</td>
                      <td className="p-4 bg-slate-50/20">Substantial. Discontented relatives often allege fabricated signatures</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Tamil Nilam Patta Transfer</td>
                      <td className="p-4 bg-rose-50/20">Enables direct revenue mutation and Patta transfer with certified SRO copy</td>
                      <td className="p-4 bg-slate-50/20">Tahsildar offices frequently insist on court succession certificates or legal heir consensus</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Judicial Evidentiary Value</td>
                      <td className="p-4 bg-rose-50/20">Statutory presumption of genuine execution under Section 60 of Registration Act</td>
                      <td className="p-4 bg-slate-50/20">Heirs must formally prove testator capacity and attestation from scratch in court</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Tamil Nadu Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 statutory registration fee</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: MADRAS HIGH COURT PROBATE GUIDANCE */}
            <section id="madurai-probate-guidance" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT JURISDICTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Madras High Court Probate Rules: Section 213
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is an official court decree certifying that a Will is genuine.
                  It grants the named executor statutory authority to administer and distribute estate assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidency towns of Chennai, Mumbai, and Kolkata.
                  Madurai is outside the original civil jurisdiction of Chennai.
                  The Madras High Court and the Madurai Bench have repeatedly confirmed that probate is not compulsory for Hindu, Jain, Sikh, or Buddhist Wills in Madurai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Execution vs Probate
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Understanding Key Legal Distinctions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Executing a Will means signing and attesting the deed before two witnesses. Registration records it with the Tamil Nadu Sub-Registrar. In contrast, probate is a formal court decree from the Principal District Court or High Court.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Letters of Administration apply when no executor is named</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Practical Practice in Madurai
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Court Intervention Advised in Madurai?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    While probate is not compulsory in Madurai, filing for probate or letters of administration before the Madurai District Court is necessary if disgruntled legal heirs dispute the Will or if institutional lenders require judicial clearance.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Case-specific facts determine whether court filing is required</span>
                  </div>
                </div>
              </div>

              {/* HELPFUL TOOL CALLOUT */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Unsure if your Madurai estate requires court probate?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Use our free diagnostic assessment tool to check probate requirements based on your asset location and family structure.
                  </p>
                </div>
                <Link
                  href="/tools/probate-checker"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Launch Probate Checker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="madurai-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Madurai Sub-Registrar Office SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration in Madurai is administered by the Commercial Taxes and Registration Department (TNREGINET).
                  Under Section 32 of the Registration Act, you can register your Will where you reside or where your immovable properties are situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. KK Nagar, Tallakulam, SS Colony)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {MADURAI_DISTRICTS.length} Key Madurai Jurisdictions
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
                      <span className="font-bold text-slate-900 block">Areas Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Appointment Booking: <strong>tnreginet.gov.in (Book III)</strong>
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Support for {activeDistrictData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AREA-WISE WILL DRAFTING ACROSS MADURAI */}
            <section id="madurai-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Madurai Zones
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in K.K. Nagar, Anna Nagar, Tallakulam, or SS Colony</strong>? Revenue records, Tamil Nilam patta procedures, and Sub-Registrar jurisdictions vary across Madurai.
                  Whether you own an independent home in K.K. Nagar, commercial shops near Meenakshi Temple, an ancestral property in Mahal Road, or a plot in Othakadai, our High Court advocates deliver tailored drafting, TNREGINET registration, and probate advisory:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: K.K. NAGAR & ANNA NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-East Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Madurai North &amp; Tallakulam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in K.K. Nagar &amp; Anna Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">K.K. Nagar (80 Feet Road)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anna Nagar Main</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alagarkoil Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Race Course Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in K.K. Nagar &amp; Anna Nagar</strong>? These upscale residential sectors feature independent villas, Tamil Nadu Housing Board (TNHB) layouts, and commercial establishments.
                      Our advocates draft precise succession clauses to ensure your property tax assessment records with the Madurai Corporation transfer smoothly without family conflict.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Court Complex, K.K. Nagar / Melur Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Assistance with TNREGINET token booking, Book III registration, and Section 31 home visits for senior residents across K.K. Nagar and Anna Nagar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in K.K. Nagar &amp; Anna Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft K.K. Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: SS COLONY & ELLIS NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Madurai Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Arasaradi (Madurai West)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in SS Colony &amp; Ellis Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">SS Colony (North &amp; South)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ellis Nagar TNHB Scheme</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bypass Road Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ponmeni &amp; Kalavasal</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get expert <strong>Will drafting services in SS Colony &amp; Ellis Nagar</strong>. This vibrant residential zone comprises TNHB quarters, private multistorey apartment blocks, and commercial retail showrooms on Bypass Road.
                      We structure comprehensive bequests detailing undivided shares of land (UDS), dedicated parking allotments, and bank deposits.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Arasaradi Sub-Registrar Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Full advocate-accompanied registration, doorstep home visits for elderly citizens, and seamless bank deposit transmission support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Madurai West SRO</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in SS Colony &amp; Ellis Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft SS Colony Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: HERITAGE TEMPLE CORRIDOR & MASI STREETS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Madurai South &amp; Joint 1 SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Central Heritage Madurai
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Masi Streets (East, West, South)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahal Road &amp; Vilakkuthoon</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Simmakkal &amp; Town Hall</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kamarajar Salai</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure professional <strong>Will drafting in Central Heritage Madurai</strong>. The areas surrounding Sri Meenakshi Amman Temple feature century-old ancestral properties, jewelry showrooms, and wholesale textile houses.
                      Our advocates draft airtight testamentary bequests to protect family trade assets and prevent prolonged coparcenary partition suits.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Palace Road Registration Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Expert handling of ancestral property titles, commercial tenancy succession clauses, and prompt TNREGINET Book III execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ancestral &amp; Trade Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Central Heritage Madurai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Central Madurai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: MATTUTHAVANI & OTHAKADAI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        High Court Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Othakadai &amp; Thamaraipatti
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mattuthavani &amp; Othakadai
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mattuthavani (MIBT Belt)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Othakadai (HC Bench Campus)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">ELCOT IT Park Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karuppayurani &amp; Uthangudi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Benefit from legal <strong>Will drafting in Mattuthavani &amp; Othakadai</strong>. This high-growth corridor along the Madurai Bench of Madras High Court hosts new gated layouts, DTCP-approved house sites, and modern IT professionals.
                      We ensure exact survey boundary schedules to facilitate smooth Tamil Nilam Patta transfer upon succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Melur Main Road SRO, Othakadai</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tailored advice for residential plots, DTCP layouts, demat asset portfolios, and High Court corridor properties.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">DTCP Plots &amp; IT Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mattuthavani &amp; Othakadai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Othakadai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: THIRUPARANKUNDRAM & PASUMALAI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South-West Industrial Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Thiruparankundram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Thiruparankundram &amp; Pasumalai
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thiruparankundram Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pasumalai Hill Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tirunagar &amp; Harveypatti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kappalur SIDCO Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will with top advocates in <strong>Thiruparankundram &amp; Pasumalai</strong>. With historic residential settlements, textile spinning mills, and manufacturing units in Kappalur SIDCO, business owners require structured succession.
                      We draft clear bequeathals for private limited equity, industrial machinery, and personal real estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Thiruparankundram Station Road SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Coordination of industrial asset bequests, partnership interest transfers, and TNREGINET document registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Industrial &amp; Textile Estate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Thiruparankundram &amp; Pasumalai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Thiruparankundram Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: AVANIYAPURAM & VILLAPURAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Airport Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Avaniyapuram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Avaniyapuram &amp; Villapuram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Avaniyapuram Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Villapuram Housing Board</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jaihindpuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madurai Airport Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure authoritative <strong>Will drafting in Avaniyapuram &amp; Villapuram</strong>. As a growing commercial and suburban belt connecting the Ring Road and Airport, landowners frequently hold converting agrarian parcels and residential sites.
                      Our advocates safeguard land titles, clear parent deed references, and ensure swift revenue mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Airport Road SRO, Avaniyapuram</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Legal heir verification, patta documentation support, and senior citizen home execution services across southern Madurai.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Airport Belt</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Avaniyapuram &amp; Villapuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Avaniyapuram Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP BY STEP SOP */}
            <section id="step-by-step-madurai-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP PROCEDURE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Tamil Nadu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering your Will in Madurai follows five clear procedural steps established by the Tamil Nadu Registration Department:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Asset Inventory
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      List your Madurai houses, Patta survey numbers, commercial shops, bank accounts, and demat folios.
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
                      Obtain an MBBS medical fitness certificate confirming sound mental health, especially for senior testators.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      TNREGINET Token
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Book an appointment on tnreginet.gov.in, upload witness details, and pay the flat ₹100 registration fee online.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Appearance
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar with two adult independent witnesses carrying original Aadhaar cards and photographs.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Book III Archival
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Record biometric thumbprints and live digital photographs. Receive the registered Book III document safely.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP HOME VISITS */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep Will Registration for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Navigating stairs and crowded government complexes can be difficult for senior citizens in Madurai.
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar can visit your home, hospital, or care home to complete Will registration.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep Registration Operates in Madurai:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Inability Certificate</strong>
                      <span className="text-slate-600">A registered medical practitioner certifies that the senior citizen is bedridden or cannot travel safely.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Petition</strong>
                      <span className="text-slate-600">Our advocates prepare and file the special commission petition before the jurisdictional Madurai Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Commission Fee</strong>
                      <span className="text-slate-600">You pay the government-notified home visit commission charge to schedule your appointed date.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometric Setup</strong>
                      <span className="text-slate-600">The officer visits your residence with portable biometric sensors to capture digital fingerprints and live photos.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Will Registration
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prepare your paperwork before visiting the Sub-Registrar Office in Madurai.
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

            {/* SECTION 9: MADURAI REAL ESTATE TYPES */}
            <section id="madurai-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY SUCCESSION RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Madurai Real Estate: Freehold, Plots &amp; Apartments
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Property succession in Madurai depends on how title and land records are held.
                  Here is how a Will affects major Madurai property categories:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    Ancestral &amp; Freehold
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Heritage Homes &amp; Ancestral Sites
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Houses in Masi streets, South Gate, and ancestral family lands require precise boundary schedules and clear coparcenary share definitions to prevent multi-branch partition lawsuits.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Apartments &amp; UDS
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Multistorey Flats &amp; Gated Homes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Apartments in K.K. Nagar, Anna Nagar, and Bypass Road require explicit mention of Undivided Share (UDS) of land, reserved car parking numbers, and association transfer clauses.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    DTCP Plots &amp; TNHB
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    DTCP Layouts &amp; Housing Board Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Plots in Othakadai, Mattuthavani, and TNHB houses in Ellis Nagar need allotment references, NOCs, and direct revenue Patta mutation instructions on the Tamil Nilam portal.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="madurai-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Stamp Duty &amp; Registration Fees in Madurai
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate sale deeds incur heavy stamp duty in Tamil Nadu.
                  In contrast, Wills are 100 percent exempt from stamp duty across Tamil Nadu under the Indian Stamp Act, 1899.
                  Government charges for registering a Will are purely nominal:
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
                      <td className="p-4 font-semibold">Tamil Nadu Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Tamil Nadu</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">TNREGINET SRO Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Fee)</td>
                      <td className="p-4">Commercial Taxes &amp; Registration Dept</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Scanning &amp; Portal Service Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹150</td>
                      <td className="p-4">Sub-Registrar Counter / e-Sevai</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Commission</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Sub-Registrar Official Visit Fee</td>
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
                  Select the level of professional legal support best suited to your family&apos;s estate planning requirements across Madurai:
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
                      Ideal for straightforward estates with bank deposits, mutual funds, and residential property.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Madurai Will maker</span>
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
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Online Now
                  </Link>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular in Madurai
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
                      Senior estate advocate review for Madurai residential houses, ancestral lands, and business succession.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 consultation with senior advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for business &amp; minors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor advisory &amp; witness vetting</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Advocate Call
                  </Link>
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
                      Full end-to-end registration assistance at Sub-Registrar offices across Madurai district.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>TNREGINET appointment token booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate attends with you at SRO</span>
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
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Support
                  </Link>
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
                  12. Frequently Asked Questions: Madurai Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Accurate answers to practical legal questions about making, registering, and probating a Will in Madurai:
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
                  13. Statutory References &amp; TNREGINET Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate planning workflows follow codified Indian laws and Tamil Nadu state rules:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 63, 67, and Section 213 read with Section 57 (Probate Jurisdiction outside Chennai).
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
                    Tamil Nadu TNREGINET Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official registration portal: <code>tnreginet.gov.in</code> &amp; <code>eservices.tn.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Madras High Court Precedents
                  </span>
                  <p className="text-xs text-slate-600">
                    Madurai Bench and Supreme Court rulings confirming non-compulsory probate outside Chennai city limits.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Madurai Properties &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Ensure your Madurai residential houses, commercial spaces, and financial assets pass smoothly to your loved ones.
                Draft a legally valid Will online or consult our experienced estate advocates today.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online Now
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20"
                >
                  Book Lawyer Consultation
                </Link>
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
                Visual Blueprint: Madurai Will Drafting &amp; Probate Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[400px] md:min-h-[550px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-madurai.jpg"
                alt="High Resolution Visual Blueprint: Madurai Will Drafting and Probate Support"
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
