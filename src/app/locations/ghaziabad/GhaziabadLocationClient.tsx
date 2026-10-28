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
  { id: "ghaziabad-overview", label: "OVERVIEW" },
  { id: "ghaziabad-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "ghaziabad-probate-rules", label: "PROBATE RULES" },
  { id: "ghaziabad-sro-directory", label: "SRO DIRECTORY" },
  { id: "ghaziabad-area-coverage", label: "Local Areas" },
  { id: "step-by-step-ghaziabad-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "ghaziabad-property-types", label: "PROPERTY TYPES" },
  { id: "ghaziabad-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const GHAZIABAD_SRO_HUBS = [
  {
    id: "ghaziabad-1",
    name: "SRO I Ghaziabad (Collectorate)",
    sro: "Sub-Registrar Office I Ghaziabad",
    address: "Collectorate Compound, Raj Nagar, District Administrative Complex, Ghaziabad - 201002",
    areas: "Raj Nagar, Kavi Nagar, Sanjay Nagar, Shastri Nagar, Patel Nagar, Old Ghaziabad, Grand Trunk Road Belt",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "ghaziabad-2",
    name: "SRO II Ghaziabad (Raj Nagar)",
    sro: "Sub-Registrar Office II Ghaziabad",
    address: "Collectorate Compound, Raj Nagar, District Administrative Complex, Ghaziabad - 201002",
    areas: "Raj Nagar Extension, NH-58 Bypass, Morta, Duhai, Govindpuram, Swarna Jayanti Puram, Meerut Road Corridor",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "sahibabad",
    name: "SRO Sahibabad (Trans-Hindon)",
    sro: "Sub-Registrar Office Sahibabad",
    address: "Trans-Hindon Administrative Building, Site IV Industrial Area, Sahibabad, Ghaziabad - 201010",
    areas: "Indirapuram (Ahinsa Khand, Vaibhav Khand, Nyay Khand, Niti Khand), Vaishali (Sectors 1-9), Kaushambi, Vasundhara",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "modi-nagar",
    name: "SRO Modi Nagar",
    sro: "Sub-Registrar Office Modi Nagar Tehsil",
    address: "Tehsil Complex, Delhi-Meerut Highway, Modi Nagar, Ghaziabad - 201204",
    areas: "Modi Nagar Township, Muradnagar, Bhojpur, Niwari, Ordnance Factory Estate, Delhi-Meerut RRTS Corridor",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "loni",
    name: "SRO Loni",
    sro: "Sub-Registrar Office Loni Sub-Division",
    address: "Tehsil & Sub-Divisional Office, Delhi-Saharanpur Road, Loni, Ghaziabad - 201102",
    areas: "Loni Central, Tronica City (UPSIDC Sectors), Pavi Sadakpur, Indrapuri, Jawahar Nagar, Border Industrial Belt",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
  {
    id: "crossings-expressway",
    name: "Trans-Hindon SRO II (NH-24 Belt)",
    sro: "Sub-Registrar Office Trans-Hindon SRO II",
    address: "Trans-Hindon Registry Complex, Link Road, Sahibabad / Raj Nagar Sub-Desk, Ghaziabad - 201010",
    areas: "Crossings Republik, Delhi-Meerut Expressway, Shahpur Bamheta, Chipiyana, Siddhartha Vihar, Wave City",
    timings: "9:30 AM to 5:30 PM (Mon-Sat, 2nd Sat & Gazetted Holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under UP stamp laws, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo capture at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset or legacy under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly advised for senior citizens aged 60+. Certifies testamentary mental capacity, soundness, and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "UP IGRSUP e-Appointment Token Slip",
    detail: "Official time-slot booking receipt downloaded from the igrsup.gov.in portal with statutory ₹100 fee challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "GDA Allotment Letter / Registered Sale Deed",
    detail: "Photocopy of allotment, possession letter, or sale deed for Ghaziabad Development Authority flats or plots.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Ghaziabad Nagar Nigam Property Tax Receipt",
    detail: "Recent municipal house tax bill confirming municipal assessment and property location details.",
    checked: false,
  },
  {
    id: "item-8",
    label: "High-Rise Society Allotment / AOA Share Certificate",
    detail: "Apartment ownership documents for Indirapuram, Vaishali, Vasundhara, or Raj Nagar Extension societies.",
    checked: false,
  },
];

export default function GhaziabadLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeSection, setActiveSection] = useState<string>("ghaziabad-overview");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedHub, setSelectedHub] = useState<string>("ghaziabad-1");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = checklist.filter((i) => i.checked).length;

  useEffect(() => {
    const handleScroll = () => {
      const sections = TOC_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (session) {
      router.push("/start");
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
    }
  };

  const filteredHubs = GHAZIABAD_SRO_HUBS.filter(
    (hub) =>
      hub.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    GHAZIABAD_SRO_HUBS.find((h) => h.id === selectedHub) || GHAZIABAD_SRO_HUBS[0];

  return (
    <div className="bg-[#FAF7F0] min-h-screen">
      {/* =========================================================================
          HERO SECTION - BRAND COMPLIANT (#172228, #C65378)
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#172228] via-[#1b272e] to-[#121c21] text-white pt-24 pb-16 sm:pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN: HERO VALUE PROP (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold tracking-wide uppercase backdrop-blur-xs border border-white/10">
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                <span>GHAZIABAD &amp; UP NCR SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 55 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Ghaziabad: Online Legal Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft an airtight, legally enforceable Will for your Indirapuram high-rise apartments, GDA freehold plots, Vaishali flats, and Sahibabad commercial units. Enjoy senior advocate consultation, UP IGRSUP appointment assistance, and Section 31 doorstep registration.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Ghaziabad Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20 text-center"
                >
                  <span>Book Advocate Consultation</span>
                </a>
              </div>

              {/* 4 Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4.9/5 ⭐ Rated Across NCR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Allahabad HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 UP Will Stamp Duty</span>
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
                  src="/images/will-drafting-in-ghaziabad.jpg"
                  alt="Legal Will Drafting and Property Succession in Ghaziabad UP NCR"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Ghaziabad Urban &amp; Apartment Blueprint
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-[#C65378]">₹0</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">UP Stamp Duty on Wills</div>
              <p className="text-[11px] text-slate-500 mt-0.5">100% exempt from ad valorem stamp duties in UP</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Probate Exemption</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Court probate strictly optional in Ghaziabad</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-[#C65378]">5+ SROs</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Ghaziabad Sub-Registrars</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Collectorate, Sahibabad, Modi Nagar &amp; Loni</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">GDA &amp; AOA</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Direct Mutation Support</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Valid for society flats &amp; Nagar Nigam ledgers</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN EDITORIAL CONTAINER WITH STICKY TOC
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* =======================================================================
              MOBILE VIEW: DROPDOWN TABLE OF CONTENTS
              ======================================================================= */}
          <div className="block lg:hidden w-full">
            <button
              type="button"
              onClick={() => setMobileTocOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-left"
              aria-expanded={mobileTocOpen}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-mono tracking-wider uppercase font-bold text-slate-900">
                  Table of Contents
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  ({TOC_ITEMS.find((t) => t.id === activeSection)?.label || "Overview"})
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
                  }`}
              />
            </button>

            {mobileTocOpen && (
              <div className="mt-2 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-md space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
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
                      className={`block px-3 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-colors ${isActive
                          ? "bg-rose-50 text-[#C65378] font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                        }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* =======================================================================
              DESKTOP VIEW: STICKY SIDEBAR (LEFT)
              ======================================================================= */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider text-slate-500 uppercase px-1">
                <span>Quick Navigation</span>
                <span className="text-[#C65378] font-bold">14 Sections</span>
              </div>

              <nav className="space-y-1 bg-white/70 backdrop-blur-xs p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
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
                        className={`transition-all mr-2.5 rounded-full ${isActive
                            ? "w-6 h-[1.5px] bg-[#C65378]"
                            : "w-3.5 h-[1px] bg-slate-300 group-hover:w-5 group-hover:bg-slate-500"
                          }`}
                      />
                      <span
                        className={`transition-colors ${isActive
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

          {/* =======================================================================
              MAIN EDITORIAL CONTENT AREA (RIGHT)
              ======================================================================= */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="ghaziabad-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>GHAZIABAD ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Ghaziabad
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two witnesses is legally valid, but official Book III SRO registration provides absolute authenticity against property disputes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ghaziabad lies outside presidency town limits under the Allahabad High Court. Under Section 213 of the Indian Succession Act, court probate is strictly non-compulsory in Uttar Pradesh, enabling direct title transfer with a registered Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero UP Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are completely exempt from stamp duty across Uttar Pradesh. You only pay a flat nominal ₹100 registration fee plus nominal scanning charges at the Sub-Registrar Office via the official UP IGRSUP portal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>GDA &amp; AOA Society Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites ownership mutation with the Ghaziabad Development Authority (GDA), Ghaziabad Nagar Nigam property tax rolls, and high-rise Apartment Owners Associations across Indirapuram and Vaishali.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="ghaziabad-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Ghaziabad
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will drafting and succession planning across Ghaziabad district are governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>UP Apartment (Promotion of Construction, Ownership &amp; Maintenance) Act, 2010</strong>. Any adult individual of sound mind can legally bequeath self-acquired high-rise apartments, freehold plots, industrial manufacturing units, and financial investments.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ghaziabad represents a complex confluence of modern NCR high-density residential corridors (Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension) alongside extensive industrial belts in Sahibabad and plotted family kothis in Raj Nagar and Kavi Nagar. Without an expertly drafted Will, surviving legal heirs face protracted administrative friction across GDA property desks, municipal tax counters, and society management committees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be a major aged 18 years or older with sound testamentary mental capacity (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed voluntarily without undue influence, fraudulent misrepresentation, or family coercion (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of at least two independent adult attesting witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Non-Beneficiary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Attesting witnesses and their spouses must not receive any legacy or property under the Will (Section 67).
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
                  2. Is Will Registration Mandatory in Ghaziabad?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a testamentary Will is strictly <strong>optional</strong>. An unregistered Will signed on standard white paper before two independent witnesses is legally valid and admissible in court.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, with rapidly escalating real estate valuations along Indirapuram, Vaishali, and Raj Nagar Extension, senior advocates strongly advise formal registration at the Sub-Registrar Office. An official Book III registration eliminates suspicion of forged signatures and guarantees seamless ownership transfer across government agencies.
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Ghaziabad SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Record</td>
                      <td className="p-4 bg-rose-50/20">Stored securely in Book III government registry</td>
                      <td className="p-4 bg-slate-50/20">Stored privately; susceptible to loss, destruction, or theft</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection from Challenge</td>
                      <td className="p-4 bg-rose-50/20">High legal presumption of genuine execution</td>
                      <td className="p-4 bg-slate-50/20">Vulnerable to allegations of fraud, coercion, or forgery</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">GDA Property Mutation</td>
                      <td className="p-4 bg-rose-50/20">Direct mutation upon presenting certified copy</td>
                      <td className="p-4 bg-slate-50/20">GDA officials demand public notices, affidavits &amp; heavy bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">High-Rise AOA Transfer</td>
                      <td className="p-4 bg-rose-50/20">Smooth membership change under UP Apartment Act</td>
                      <td className="p-4 bg-slate-50/20">Management committees may delay or seek court decrees</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Nagar Nigam Tax Records</td>
                      <td className="p-4 bg-rose-50/20">Accepted by Municipal Zonal Officers immediately</td>
                      <td className="p-4 bg-slate-50/20">Subject to third-party heir objections during public window</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Government Registration Cost</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 fee + scanning charges</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="ghaziabad-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Ghaziabad Probate Law: Exemption Across Uttar Pradesh
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most persistent misconceptions among Ghaziabad property owners is whether probate from a civil court or High Court is legally mandatory before inheriting real estate. The clear legal answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is mandatory solely for Wills executed within or properties situated within the historical presidency towns of Mumbai, Kolkata, and Chennai. The territorial jurisdiction of the original side of high courts applies only to those three cities. Ghaziabad is a non-presidency district governed by the Allahabad High Court, where court probate is strictly optional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Settled Law: Non-Compulsory
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Allahabad High Court Precedents
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Allahabad High Court in landmark rulings including <em>Smt. Vimla v. Shankarlal</em> and subsequent division bench decisions reaffirmed that obtaining probate is not a condition precedent to establish rights under a Will in Uttar Pradesh. A registered Will is fully operational for GDA mutation, banking access, and apartment succession.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables immediate asset transmission without High Court delays</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Voluntary Filings: High-Value Disputes
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Ghaziabad District Court?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may voluntarily file for probate or letters of administration before the District Judge in Ghaziabad only if hostile co-heirs file partition suits or contest the testator&apos;s mental capacity. A grant of probate provides an undisputed judgment <em>in rem</em> that conclusively settles ownership.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Conclusive judicial decree against any collateral claims</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: GHAZIABAD SRO DIRECTORY */}
            <section id="ghaziabad-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Ghaziabad Sub-Registrar Offices: SRO Directory Guide
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ghaziabad operates designated Sub-Registrar Offices under the Stamps and Registration Department Uttar Pradesh (IGRSUP). Under Section 32 of the Registration Act, your Will can be registered at the Sub-Registrar Office having jurisdiction over your permanent residence or where any portion of your immovable property is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Indirapuram, Raj Nagar, Vaishali)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {GHAZIABAD_SRO_HUBS.length} Ghaziabad Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredHubs.map((h, index) => {
                    const isSelected = selectedHub === h.id;
                    const isLastOdd =
                      filteredHubs.length % 2 !== 0 && index === filteredHubs.length - 1;
                    return (
                      <button
                        key={h.id}
                        onClick={() => setSelectedHub(h.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                          } ${isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                          }`}
                      >
                        {h.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        Ghaziabad Registration District
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Registry Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Location:</span>
                      <p className="text-slate-600">{activeHubData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeHubData.timings}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-200/70">
                    <span className="font-bold text-slate-900 block">Key Localities Covered:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official IGR Portal: <strong>igrsup.gov.in (Stamps &amp; Registration UP)</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Assistance for {activeHubData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES / LOCALITIES IN GHAZIABAD */}
            <section id="ghaziabad-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ASSET NUANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Area-Wise Will Drafting in Ghaziabad
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate assets in Ghaziabad span high-rise condominiums along Indirapuram and Vaishali, planned GDA plotted developments in Vasundhara and Raj Nagar, expanding residential corridors in Raj Nagar Extension, and major industrial centers in Sahibabad and Tronica City. Our estate advocates deliver customized legal drafting, UP IGRSUP token scheduling, and Sub-Registrar accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: INDIRAPURAM & AHINSA KHAND */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime NCR High-Rise Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sahibabad (Trans-Hindon)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Indirapuram &amp; Ahinsa Khand
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Indirapuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ahinsa Khand 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shipra Sun City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vaibhav Khand</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nyay Khand</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Indirapuram</strong> for premier multi-story societies, luxury apartments, and penthouses. Codifies high-rise apartment transfers under the UP Apartment Act, 2010, AOA maintenance substitutions, allotted basement car parkings, and equity portfolios to prevent inheritance conflicts among heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sahibabad, Site IV Trans-Hindon</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        IGRSUP token booking, advocate accompaniment, and Section 31 doorstep execution for elderly residents in Indirapuram.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Indirapuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Indirapuram Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: VAISHALI & KAUSHAMBI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Delhi-NCR Border Premium Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sahibabad (Trans-Hindon)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vaishali &amp; Kaushambi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vaishali Sectors 1-9</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kaushambi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Express Garden</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramprastha Greens</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Vaishali</strong> and Kaushambi for gated residential societies, independent builder floors, and doctor clinics. Seamlessly integrates interstate asset planning for families with properties straddling Delhi and Ghaziabad, bank lockers, and clear life-interest provisions for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Trans-Hindon Administrative Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Dual-state succession planning, society share transfers, and rapid Book III registry execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Residential</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vaishali"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vaishali Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: VASUNDHARA & SAHIBABAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Plotted &amp; Industrial Micro-Market
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sahibabad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vasundhara &amp; Sahibabad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vasundhara Sectors 1-19</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sahibabad</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Brij Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Site IV Industrial</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Vasundhara</strong> and Sahibabad catering to GDA plotted duplexes, row houses, and Site IV manufacturing units. Protects industrial leasehold transfers, MSME enterprise succession, partnership equity bequests, and residential assets from bureaucratic delays.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Factory className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sahibabad Industrial Area Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Industrial lease succession, GDA plotted land bequeathal, and advocate-vetted commercial clauses.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">GDA Plots &amp; MSME Factories</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vasundhara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vasundhara Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: RAJ NAGAR EXTENSION */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        High-Growth Residential Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO II Ghaziabad (Collectorate)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Raj Nagar Extension
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raj Nagar Extension</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NH-58 Bypass</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">River Heights Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Noor Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Raj Nagar Extension</strong> for first-generation flat buyers, modern residential complexes, and township apartments along the NH-58 bypass. Formulates explicit alternate beneficiaries, minor guardianship trusts, and smooth GDA municipal registry mutation protocols.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO II Collectorate, Raj Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        New tower title verification, builder-buyer assignment bequeathal, and confirmed IGRSUP appointment slots.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">New High-Rise Communities</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Raj Nagar Extension"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Raj Nagar Ext Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: RAJ NAGAR & KAVI NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Central &amp; Civil Lines
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO I &amp; II Ghaziabad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Raj Nagar &amp; Kavi Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raj Nagar (Sectors 1-15)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kavi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sanjay Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Collectorate Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Executive <strong>Will drafting services in Raj Nagar</strong> and Kavi Nagar for established heritage kothis, senior civil servant retirements, and Kavi Nagar Industrial Area commercial properties. Integrates medical doctor soundness certificates, family settlement trusts, and clear executor designations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Compound, Raj Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        On-site Collectorate SRO registry support, senior citizen priority, and Section 31 doorstep commissions.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage Kothis &amp; Bungalows</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Raj Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Raj Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: CROSSINGS REPUBLIK & EXPRESSWAY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Integrated Township Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO I / Trans-Hindon Desk
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Crossings Republik
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Crossings Republik</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NH-24 Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chipiyana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Expressway Towers</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Crossings Republik</strong> for multi-tower condominium owners, IT professionals, and corporate executives along the Delhi-Meerut Expressway. Structures joint tenancy survivorship, mutual fund transmission, and digital asset bequeathal across international jurisdictions.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Trans-Hindon / Collectorate Registry Desk</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-density township society transfers, joint ownership succession, and online drafting delivery.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Modern NCR Township Condos</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Crossings Republik"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Crossings Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: MODI NAGAR & MURADNAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Regional Industrial &amp; Agro Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Modi Nagar (Tehsil)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Modi Nagar &amp; Muradnagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Modi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Muradnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">RRTS Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ordnance Factory Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Modi Nagar</strong> and Muradnagar for ancestral family lands, commercial market shops along GT Road, and residential properties near the RRTS corridor. Harmonizes agricultural land succession under the UP Revenue Code, 2006 to prevent tehsildar mutation disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Karyalaya, Modi Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        UP Revenue Code farmland inheritance, ancestral property partitioning, and rural SRO registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Farmland &amp; Commercial Shops</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Modi Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Modi Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: LONI & TRONICA CITY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        UPSIDC Industrial Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Loni (Sub-Division)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Loni &amp; Tronica City
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tronica City (UPSIDC)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Loni Central</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pavi Sadakpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Delhi-Saharanpur Highway</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Loni</strong> and Tronica City for UPSIDC industrial plots, garment units, packaging factories, and plotted layouts. Details industrial plot leasehold transfers, manufacturing assets, and commercial warehouse bequests with full regulatory compliance.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Factory className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Divisional Office Complex, Loni</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        UPSIDC industrial plot transfer compliance, trade license succession, and prompt SRO execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">UPSIDC Plots &amp; Factories</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Loni"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Loni Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-ghaziabad-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to IGRSUP Ghaziabad Registry
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified 5-stage legal operating procedure to create, execute, and register your Will before the Sub-Registrar in Ghaziabad:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Asset Audit
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compile complete details of GDA flats, high-rise AOA shares, plots, bank deposits, and demat portfolios.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Advocate Drafting
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft customized legal clauses covering revocation of past wills, survivorship, executor powers, and minor guardianships.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Valid Execution
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print on A4 paper and sign each page in the physical presence of two independent non-beneficiary adult witnesses.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      IGRSUP Token
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Schedule your slot on the UP Stamps &amp; Registration portal (igrsup.gov.in) and pay the ₹100 registration fee online.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Biometrics
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit Ghaziabad SRO with witnesses for verbal verification, photo capture, and biometric thumbprint to seal Book III entry.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP REGISTRATION */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FOR SENIORS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration for Senior Citizens
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, unwell, or bedridden citizens residing in Indirapuram, Vaishali, Vasundhara, or Raj Nagar, traveling to the Sub-Registrar Office can be a physical hardship. Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar possesses legal authority to attend a private residence or hospital to register a Will.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep SRO Registration Operates in Ghaziabad:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Medical Certificate</strong>
                      <span className="text-slate-600">A registered MBBS or MD doctor certifies that the senior citizen is of sound mind but medically advised against traveling.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Application</strong>
                      <span className="text-slate-600">Our legal team drafts and submits the formal Section 31 special commission petition before the jurisdictional Ghaziabad Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Commission Fee</strong>
                      <span className="text-slate-600">A nominal government commission fee is remitted through the UP IGRSUP portal to schedule the official officer home visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometric Equipment</strong>
                      <span className="text-slate-600">The Sub-Registrar visits your home with portable biometric thumb scanners and webcams to capture verified identity records.</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for Ghaziabad Sub-Registrar Offices
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prepare your documentation before scheduling your Sub-Registrar appointment. You have organized <strong>{checkedCount} of {checklist.length}</strong> required documents:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${item.checked
                          ? "bg-rose-50/40 border-[#C65378]/30"
                          : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${item.checked ? "bg-[#C65378] text-white" : "border border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-1">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${item.checked ? "text-slate-900" : "text-slate-700"
                            }`}
                        >
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

            {/* SECTION 9: GHAZIABAD PROPERTY TYPES */}
            <section id="ghaziabad-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY DYNAMICS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Ghaziabad Property Types: GDA Flats, Plots &amp; Builder Floors
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession procedures in Ghaziabad vary considerably depending on whether the asset is a high-rise society apartment, a GDA freehold plot, or an industrial lease:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    High-Rise Condominiums
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Indirapuram &amp; Vaishali Towers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the UP Apartment Act, 2010, society nominees hold apartment interests only in fiduciary trust. The registered Will directs the Apartment Owners Association (AOA) to mutate membership and parking spaces without civil court intervention.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    GDA Freehold Plots
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Vasundhara &amp; Raj Nagar Kothis
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Independent houses and plotted sectors require direct mutation on Ghaziabad Development Authority records. A certified copy of the registered Will is presented with an indemnity bond for direct mutation into the legal heir&apos;s name.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Industrial Enterprises
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Sahibabad &amp; Kavi Nagar Units
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For industrial plots in Sahibabad Site IV or Kavi Nagar, leasehold transfer with UPSIDC / GDA demands explicit testamentary bequeathal of lease rights, partner equity shares, factory sheds, and heavy manufacturing machinery.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & CHARGES */}
            <section id="ghaziabad-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official IGRSUP Ghaziabad Registration Fees &amp; Stamp Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike commercial sale conveyances or gift deeds that attract 5% to 7% stamp duty in Uttar Pradesh, testamentary Wills are completely exempt from stamp duty. Government registration fees in Ghaziabad are purely nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Statutory Amount</th>
                      <th className="p-4 font-bold">Remittance Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Uttar Pradesh Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt across UP)</td>
                      <td className="p-4">Government of Uttar Pradesh</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Statutory Fee)</td>
                      <td className="p-4">IGRSUP Portal via e-Challan</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Processing Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">Sub-Registrar Service Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Special Commission (Home Visit)</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Doorstep Official Commissioner Fee</td>
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
                  11. Transparent Will Packages &amp; Legal Fees in Ghaziabad
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance package tailored to your family&apos;s estate planning and property portfolio in Ghaziabad:
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
                      Ideal for individual homeowners with GDA apartments, bank accounts, and demat assets.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Uttar Pradesh Will creator</span>
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
                    Most Popular in NCR
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
                      Senior estate advocate review for high-rise society flats, GDA plots, and multi-heir portfolios.
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
                        <span>Custom clauses for GDA plots &amp; AOA flats</span>
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
                    Schedule Advocate Call
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Assisted SRO Execution
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Registration
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end IGRSUP appointment management and physical advocate accompaniment at Ghaziabad SRO.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGRSUP token &amp; e-Challan generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical advocate presence at Ghaziabad SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep execution support</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Ghaziabad
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative legal answers addressing Will drafting, GDA apartment succession, and IGRSUP registration across Ghaziabad and Uttar Pradesh:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                  >
                    <summary className="p-5 font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between cursor-pointer list-none select-none">
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 group-open:text-[#C65378] transition-transform" />
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL AUTHORITIES &amp; STATUTES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; UP Legal Portals for Ghaziabad
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every legal principle and procedural guideline on this page is anchored in verified statutory enactments and binding judicial decisions:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act, 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 59 (Testamentary capacity), Section 63 (Two attesting witnesses), Section 213 (Probate optional outside presidency towns).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act, 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional registration of wills), Section 31 (Special commission for registration at private residence), Section 32 (Presentation persons).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    UP Apartment Act, 2010 &amp; GDA Bylaws
                  </span>
                  <p className="text-xs text-slate-600">
                    UP Apartment (Promotion of Construction, Ownership &amp; Maintenance) Act, 2010 and Ghaziabad Development Authority flat mutation regulations.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    UP IGRSUP Official Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Stamps and Registration Department UP appointment portal: <code>igrsup.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Ghaziabad Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Indirapuram flats, GDA plots, or family assets to administrative delays. Draft a legally binding Will online today or consult our senior Allahabad High Court advocates.
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
                Visual Blueprint: Ghaziabad Will Drafting &amp; Property Succession Framework
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
                src="/images/will-drafting-in-ghaziabad.jpg"
                alt="High Resolution Visual Blueprint: Ghaziabad Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Ghaziabad SRO Registered &amp; GDA / AOA Mutation Compliant</span>
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
