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
  { id: "trivandrum-overview", label: "OVERVIEW" },
  { id: "trivandrum-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "trivandrum-probate-rules", label: "PROBATE RULES" },
  { id: "trivandrum-sro-directory", label: "SRO DIRECTORY" },
  { id: "trivandrum-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-trivandrum-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "trivandrum-property-types", label: "PROPERTY TYPES" },
  { id: "trivandrum-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const TRIVANDRUM_DISTRICTS = [
  {
    id: "vanchiyoor-core",
    name: "Vanchiyoor & Administrative Core",
    sro: "SRO Thiruvananthapuram (Vanchiyoor)",
    address: "Court Complex Campus, Vanchiyoor, Thiruvananthapuram - 695035",
    areas: "Vanchiyoor, Government Secretariat, Statue, Overbridge, Palayam, Pettah, Kaithamukku, Pattoor, General Hospital Junction",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "pattom-kowdiar",
    name: "Pattom, Kowdiar & Sasthamangalam",
    sro: "SRO Pattom (Mini Civil Station)",
    address: "Mini Civil Station Complex, Pattom Palace Road, Pattom, Thiruvananthapuram - 695004",
    areas: "Pattom, Kowdiar, Sasthamangalam, Jawahar Nagar, Golf Links, Vellayambalam, Kuravankonam, Marappalam, Kesavadasapuram, Medical College",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kazhakoottam-technopark",
    name: "Kazhakoottam & Technopark IT Corridor",
    sro: "SRO Kazhakoottam (Highway Complex)",
    address: "Registration Complex, Near Kazhakoottam Junction, NH-66 Bypass, Thiruvananthapuram - 695582",
    areas: "Kazhakoottam, Technopark Phases 1, 2, 3 & 4, Karyavattom, Kulathoor, Menamkulam, Pangappara, Technocity, Chanthavila, Kadinamkulam",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "chalai-east-fort",
    name: "Chalai, East Fort & Heritage City Core",
    sro: "SRO Chalai (Killipalam Annex)",
    address: "Chalai Registration Complex, Near Killipalam Junction, Chalai, Thiruvananthapuram - 695036",
    areas: "Chalai Bazaar, East Fort, Manacaud, Karamana, Attukal, Kalady, Kuriathy, Valiyasala, Sree Padmanabhaswamy Temple Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "thiruvallam-kovalam",
    name: "Thiruvallam, Kovalam & Vizhinjam Belt",
    sro: "SRO Thiruvallam",
    address: "Near Parasurama Temple Road, Thiruvallam, Thiruvananthapuram - 695027",
    areas: "Thiruvallam, Ambalathara, Pachalloor, Poonthura, Kovalam, Vizhinjam International Seaport Corridor, Venganoor, Muttathara",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "nemom-balaramapuram",
    name: "Nemom, Pappanamcode & South Highway",
    sro: "SRO Nemom",
    address: "Old National Highway Road, Near Nemom Police Station, Nemom, Thiruvananthapuram - 695020",
    areas: "Nemom, Pappanamcode, Pravachambalam, Pallichal, Balaramapuram, Malayinkeezhu, Vellayani, Santhivila",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "nedumangad-peroorkada",
    name: "Peroorkada, Nedumangad & Foothills",
    sro: "SRO Nedumangad & Peroorkada Zone",
    address: "Civil Station Campus, Nedumangad, Thiruvananthapuram - 695541",
    areas: "Peroorkada, Nedumangad, Vattiyoorkavu, Karakulam, Manikanteswaram, Aruvikkara, Kudappanakunnu, Vazhayila",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "attingal-technocity",
    name: "Attingal, Mangalapuram & North Belt",
    sro: "SRO Attingal / Chirayinkeezhu",
    address: "Municipal Administrative Complex, Attingal, Thiruvananthapuram - 695101",
    areas: "Attingal, Mangalapuram, Technocity Belt, Pothencode, Korani, Chirayinkeezhu, Mamom, Andoorkonam",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under the Kerala Stamp Act, 1959, stamp duty on Wills is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Required for biometric thumbprint scanning and live webcam photo capture on the Kerala PEARLS registration portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be beneficiaries receiving any assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Certificate (For Seniors)",
    detail: "Issued by a registered MBBS practitioner certifying sound testamentary capacity to eliminate dementia challenges.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Kerala Registration PEARLS e-Token & e-Challan Receipt",
    detail: "Official appointment confirmation downloaded from keralaregistration.gov.in with selected Trivandrum SRO time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (Title Deed, TMC Tax & Thandapper)",
    detail: "Copies of registered title deeds, prior title deeds, latest Thiruvananthapuram Municipal Corporation tax receipts, or Village Thandapper.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photos Each",
    detail: "Clear passport photographs for the testator and both attesting witnesses to paste into SRO Book III registers.",
    checked: false,
  },
];

export default function ThiruvananthapuramLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("trivandrum-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("vanchiyoor-core");
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

  const filteredDistricts = TRIVANDRUM_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    TRIVANDRUM_DISTRICTS.find((d) => d.id === selectedDistrict) || TRIVANDRUM_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (PUNE THEME STRICT REPLICA)
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
                <span>THIRUVANANTHAPURAM &amp; TECHNOPARK ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 57 characters (SEO Compliant: 30-65 chars) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Thiruvananthapuram: Legal Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your Thiruvananthapuram residential properties, Technopark tech equity, mutual funds, and ancestral family estates.
                Get High Court advocate drafting, Kerala PEARLS portal registration guidance, and Section 31 doorstep execution across Trivandrum.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Trivandrum Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#trivandrum-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Trivandrum SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kerala High Court Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Kerala Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
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
                  src="/images/will-drafting-in-thiruvananthapuram.jpg"
                  alt="Online Will Drafting and Registration Services in Thiruvananthapuram Kerala"
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
                14+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Thiruvananthapuram Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Kerala Stamp Act 1959
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Compulsory
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate Outside Presidency
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Visits for Seniors
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
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-xs"
          >
            <span className="truncate">
              Table of Contents: <span className="text-[#C65378]">{currentActiveToc.label}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${
                mobileTocOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileTocOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-40 max-h-72 overflow-y-auto space-y-1">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeId === item.id
                      ? "bg-rose-50 text-[#C65378] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN BODY: 2-COLUMN LAYOUT (DESKTOP TOC ON LEFT, CONTENT ON RIGHT)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* DESKTOP STICKY SIDEBAR: TABLE OF CONTENTS (4 COLS) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  DOCUMENT DIRECTORY
                </span>
                <span className="text-[11px] font-bold text-[#C65378] bg-rose-50 px-2.5 py-0.5 rounded-full">
                  14 Sections
                </span>
              </div>
              <nav className="space-y-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] translate-x-1"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                          isActive ? "bg-[#C65378] opacity-100" : "opacity-0 group-hover:opacity-40 bg-slate-400"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* SIDEBAR QUICK CTA CARD */}
            <div className="rounded-3xl bg-linear-to-br from-[#172228] to-[#25353D] text-white p-6 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <div className="font-extrabold text-base text-white">Need Kerala Legal Support?</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Speak directly with a senior estate planning advocate in Thiruvananthapuram for customized Will drafting and PEARLS registration assistance.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#C65378] text-white text-xs font-extrabold flex items-center justify-center gap-2 hover:bg-[#a13c5d] transition-all cursor-pointer shadow-md shadow-[#C65378]/25"
                >
                  <span>Start Drafting Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN ARTICLE CONTENT COLUMN (8 COLS) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="trivandrum-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>THIRUVANANTHAPURAM SUCCESSION BRIEF</span>
                </div>
                {/* H2 <= 70 chars: 56 chars */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Trivandrum
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional SRO Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering a Will is optional under Section 18(e) of the Registration Act, 1908. A handwritten or typed Will on plain white paper is legally valid if signed before two independent adult witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unlike historical presidency towns, probate is non-compulsory in Thiruvananthapuram under Section 213 of the Indian Succession Act. Beneficiaries inherit without expensive court petitions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>₹0 Kerala Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills carry zero stamp duty under the Kerala Stamp Act, 1959. At Trivandrum Sub-Registrar offices, testators pay only a flat one thousand rupee fee plus nominal computer scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Fast TMC &amp; Pokkuvaravu Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites property tax name transfer across Thiruvananthapuram Municipal Corporation (TMC) and revenue title updating (Thandapper) in local Village Offices.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="trivandrum-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                {/* H2 <= 70 chars: 56 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Succession Laws in Thiruvananthapuram
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Writing a Will in Thiruvananthapuram is governed primarily by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Kerala Land Tax Act</strong>.
                  Any adult of sound mind who has attained 18 years of age can execute a Will to distribute self-acquired real estate, bank deposits, mutual funds, and business holdings.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Thiruvananthapuram exhibits a unique estate profile.
                  The capital city blends heritage Tharavadu properties in East Fort, prime residential bungalows of retired civil servants in Kowdiar and Sasthamangalam, high-tech startup equity and RSUs in Technopark, and coastal parcels near Kovalam.
                  A professionally drafted Will ensures your assets pass peacefully to chosen heirs without contentious litigation in the Vanchiyoor Court Complex.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years of age and in sound testamentary mind (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Valid Execution</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed or marked by the testator at the foot of each page before two adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Both witnesses must sign in the presence of the testator. They cannot be beneficiaries under the Will.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    0%
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Zero Stamp Paper</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the Kerala Stamp Act, stamp duty is zero. Plain A4 paper is 100% legally enforceable.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PERSPECTIVE</span>
                </div>
                {/* H2 <= 70 chars: 51 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Will Registration in Kerala: PEARLS Portal Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will is completely optional throughout the State of Kerala.
                  An unregistered Will executed on plain paper is just as valid as a registered one, provided it meets the execution criteria laid down in Section 63 of the Indian Succession Act.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nonetheless, estate advocates in Thiruvananthapuram strongly recommend registering your Will on the Kerala Registration Department <strong>PEARLS portal</strong>.
                  Registration eliminates suspicions of forgery, establishes a verifiable government record in Book III, and prevents disgruntled relatives from producing counterfeit codicils.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-extrabold">
                      <tr>
                        <th className="py-3.5 px-4 md:px-6">Succession Parameter</th>
                        <th className="py-3.5 px-4 md:px-6">Unregistered Will (Kerala)</th>
                        <th className="py-3.5 px-4 md:px-6 text-[#C65378]">Registered Will (PEARLS Portal)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="py-3 px-4 md:px-6 font-bold text-slate-800">Legal Validity</td>
                        <td className="py-3 px-4 md:px-6">Valid if executed before 2 witnesses</td>
                        <td className="py-3 px-4 md:px-6 font-semibold text-emerald-700">Valid with statutory presumption of authenticity</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 md:px-6 font-bold text-slate-800">Stamp Duty &amp; Paper</td>
                        <td className="py-3 px-4 md:px-6">₹0 Stamp Duty (Plain A4 paper)</td>
                        <td className="py-3 px-4 md:px-6">₹0 Stamp Duty (Registered on plain paper)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 md:px-6 font-bold text-slate-800">Government Record</td>
                        <td className="py-3 px-4 md:px-6">Held privately; risk of loss or tampering</td>
                        <td className="py-3 px-4 md:px-6 font-semibold text-emerald-700">Archived securely in SRO Book III &amp; PEARLS database</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 md:px-6 font-bold text-slate-800">TMC &amp; Village Pokkuvaravu</td>
                        <td className="py-3 px-4 md:px-6">Requires witness affidavits and inquiries</td>
                        <td className="py-3 px-4 md:px-6 font-semibold text-emerald-700">Direct mutation with certified SRO extract</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 md:px-6 font-bold text-slate-800">Vulnerability to Challenge</td>
                        <td className="py-3 px-4 md:px-6">Susceptible to claims of coercion or illness</td>
                        <td className="py-3 px-4 md:px-6 font-semibold text-emerald-700">Sub-Registrar confirms identity and sound mind</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES IN THIRUVANANTHAPURAM */}
            <section id="trivandrum-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PROBATE DOCTRINE</span>
                </div>
                {/* H2 <= 70 chars: 52 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Mandatory for Properties in Trivandrum?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  <strong>No. Court probate is NOT compulsory for properties located in Thiruvananthapuram or anywhere in the State of Kerala.</strong>
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, obtaining probate from a civil court is mandatory only where the Will is executed within or pertains to immovable properties situated inside the historical presidency towns of Mumbai, Kolkata, and Chennai.
                  Because Thiruvananthapuram was part of the princely State of Travancore and is a non-presidency territory under the jurisdiction of the Kerala High Court, the statutory compulsion under Section 213 does not apply.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-rose-300" />
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">
                    Kerala High Court Precedent on Non-Compulsory Probate
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The Kerala High Court has established across consistent rulings (including Division Bench interpretations on Section 213) that no probate or letters of administration need be obtained by Christian, Hindu, Jain, Buddhist, or Sikh executors before enforcing property rights under a Will in Kerala.
                  Beneficiaries can present the registered Will directly to the Thiruvananthapuram Municipal Corporation, local Village Offices for Pokkuvaravu (Thandapper mutation), banks, and registrars of companies.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-rose-200">
                  <span className="px-3 py-1 rounded-full bg-white/10">Section 213 ISA Exemption</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">Kerala High Court Jurisdiction</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">Zero Mandatory Probate Fees</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: THIRUVANANTHAPURAM SRO DIRECTORY */}
            <section id="trivandrum-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION HUBS</span>
                </div>
                {/* H2 <= 70 chars: 58 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Thiruvananthapuram SRO Offices &amp; Registration Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 32 of the Registration Act, 1908</strong>, a Will can be registered at the Sub-Registrar Office having jurisdiction over your residential domicile, or where your primary immovable property is situated, or before any Sub-Registrar within the district.
                  Find your nearest Thiruvananthapuram SRO below:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by area (e.g. Kowdiar, Technopark, Kazhakoottam, Vanchiyoor, Pattom)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C65378] shadow-xs"
                />
              </div>

              {/* INTERACTIVE DISTRICT SELECTOR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDistricts.map((district) => {
                  const isSelected = selectedDistrict === district.id;
                  return (
                    <div
                      key={district.id}
                      onClick={() => setSelectedDistrict(district.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                        isSelected
                          ? "bg-white border-[#C65378] ring-2 ring-[#C65378]/20 shadow-md"
                          : "bg-white/80 border-slate-200/90 hover:border-slate-300 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">
                          {district.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? "bg-rose-100 text-[#C65378]" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          PEARLS SRO
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>{district.sro}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {district.address}
                      </p>
                      <div className="pt-1 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">Jurisdiction Localities: </span>
                        {district.areas}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SRO ACTIVE CARD HIGHLIGHT */}
              <div className="p-6 rounded-3xl bg-linear-to-r from-rose-50 to-amber-50/50 border border-rose-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C65378]">
                  <ExternalLink className="w-4 h-4 text-[#C65378]" />
                  <span>ONLINE SRO APPOINTMENT INSTRUCTIONS: {activeDistrictData.sro.toUpperCase()}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  Before visiting <strong>{activeDistrictData.sro}</strong>, complete your data entry and slot booking on <strong>keralaregistration.gov.in</strong>.
                  Carry two physical copies of your Will, original Aadhaar card, PAN card, two independent witnesses with photo IDs, and passport-size photographs.
                </p>
              </div>
            </section>

            {/* SECTION 5: LOCAL AREA COVERAGE */}
            <section id="trivandrum-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL JURISDICTION</span>
                </div>
                {/* H2 <= 70 chars: 63 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Across Thiruvananthapuram Localities
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning requirements in Thiruvananthapuram vary greatly depending on neighborhood property characteristics and resident profiles:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: KOWDIAR & JAWAHAR NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Residential &amp; Heritage
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pattom
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kowdiar &amp; Jawahar Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kowdiar Palace Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jawahar Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Golf Links Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vellayambalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kuravankonam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in Kowdiar &amp; Jawahar Nagar</strong>? Home to retired Chief Secretaries, IAS/IPS officers, royal lineage families, and prominent jurists, this elite enclave features sprawling heritage bungalows and prime ancestral properties.
                      Our advocates structure airtight testamentary bequests covering family partition settlements, high-value bank deposits, family trusts, and specific residential transfers to protect generational wealth against litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Civil Station, Pattom</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PEARLS portal e-token booking, Book III archiving, and Section 31 doorstep execution visits for retired civil servants and senior residents across Kowdiar and Jawahar Nagar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kowdiar and Jawahar Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kowdiar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: TECHNOPARK & KAZHAKOOTTAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Technology &amp; Innovation Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kazhakoottam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Technopark &amp; Kazhakoottam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Technopark Phases 1, 2 &amp; 3</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Technocity (Phase 4)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karyavattom</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kulathoor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Menamkulam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get specialized <strong>Will drafting services in Technopark &amp; Kazhakoottam</strong>. With over 70,000 IT professionals, startup founders, and senior software executives, this tech corridor requires modern digital succession planning.
                      Our legal team creates robust clauses for corporate stock options (ESOPs, RSUs), US brokerage investments (Vested, INDmoney), crypto wallets, and modern gated community villas, ensuring seamless transmission to your designated beneficiaries without court hurdles.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kazhakoottam Highway Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online PEARLS slot scheduling, biometric verification, and digital asset executor structuring for IT professionals across Kazhakoottam, Karyavattom, and Technocity.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Technopark IT Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Technopark and Kazhakoottam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Technopark Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SASTHAMANGALAM & VAZHUTHACAUD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central Residential Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pattom &amp; Chalai
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sasthamangalam &amp; Vazhuthacaud
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sasthamangalam Junction</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vazhuthacaud</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Althara Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kochar Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Edapazhanji</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Seeking trusted <strong>Will drafting services in Sasthamangalam &amp; Vazhuthacaud</strong>? This established residential heartland is favored by senior bank executives, university professors, and retired bureaucrats.
                      Many families own multi-storey apartments and premium urban villas with non-resident children in the Gulf or Western nations. We draft unambiguous survivorship clauses, cross-border NRI asset bequests, and seamless Thiruvananthapuram Municipal Corporation mutation mandates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO Pattom &amp; Central Trivandrum SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete guidance on TMC property tax name changes, Village Pokkuvaravu (Thandapper) transfers, and Sub-Registrar appointment processing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">TMC Urban Jurisdiction</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sasthamangalam and Vazhuthacaud"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sasthamangalam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: PATTOM & MEDICAL COLLEGE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Healthcare &amp; Institutional Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pattom
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pattom &amp; Medical College
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pattom Palace Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Medical College Campus</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kesavadasapuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marappalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kumarapuram</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      In need of expert <strong>Will drafting services in Pattom &amp; Medical College</strong>? Located along MC Road, this area is populated by prominent doctors, medical specialists, hospital directors, and commercial property owners.
                      Our Kerala High Court advocates structure comprehensive succession plans for commercial retail units, private clinic assets, healthcare practice goodwill, and family homes, preventing protracted probate disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Civil Station, Pattom</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Effortless PEARLS e-token booking, registered MBBS doctor mental fitness certificate coordination for seniors, and Book III registration support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pattom and Medical College"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pattom Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: CHALAI & EAST FORT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Commercial District
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Chalai
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Chalai &amp; East Fort
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chalai Bazaar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">East Fort Heritage Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manacaud</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karamana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Attukal &amp; Kalady</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for dedicated <strong>Will drafting services in Chalai &amp; East Fort</strong>? Encircling the historic Sree Padmanabhaswamy Temple, this bustling trading district is home to multi-generational merchant families, gold traders, and wholesale business owners.
                      We specialize in structuring business succession, partnership share transfers, commercial shop leasehold tenancies, and undivided family property bequests to ensure uninterrupted commercial continuity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Killipalam Annex, Chalai</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Chalai SRO documentation assistance, ancestral title deed verification, and rapid revenue mutation for commercial and residential estates across East Fort and Karamana.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Chalai Commercial Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Chalai and East Fort"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Chalai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: THIRUVALLAM & VIZHINJAM BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coastal &amp; Maritime Port Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Thiruvallam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Thiruvallam &amp; Vizhinjam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vizhinjam Port Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kovalam Beach Resort Strip</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thiruvallam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ambalathara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pachalloor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Need experienced <strong>Will drafting services in Thiruvallam &amp; Vizhinjam</strong>? Propelled by the Vizhinjam International Seaport project and Kovalam&apos;s world-class tourism, real estate values in this coastal belt have surged.
                      We assist families in structuring testamentary devolutions for seaside resorts, homestays, commercial logistics plots, and ancestral coastal land, ensuring smooth Village Pokkuvaravu without inheritance litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO Thiruvallam (Near Parasurama Temple)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Village Revenue Office title verification, coastal CRZ plot documentation, and PEARLS portal registration coordination for coastal property owners.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Vizhinjam Port Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Thiruvallam and Vizhinjam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vizhinjam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-trivandrum-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>EXECUTION WORKFLOW</span>
                </div>
                {/* H2 <= 70 chars: 49 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified five-step standard operating procedure to draft, execute, and optionally register your Will in Thiruvananthapuram:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">Comprehensive Asset &amp; Heir Listing</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compile a complete list of your Thiruvananthapuram real estate (including Village Office Thandapper and TMC building tax numbers), bank accounts, mutual funds, Technopark stock equity, and jewelry.
                      Name specific beneficiaries and identify an honest, reliable executor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">Professional Drafting &amp; Kerala High Court Advocate Vetting</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Use our online platform or consult our senior Kerala estate advocates.
                      The draft must incorporate clear revocation of prior Wills, explicit asset schedules, survivorship instructions, digital asset powers, and an executor appointment clause.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">Physical Attestation Before Two Witnesses</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the final document on plain white A4 paper. Under Section 63 of the Indian Succession Act, you must sign or affix your thumb impression at the bottom of every page in the simultaneous presence of two independent adult witnesses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">Kerala PEARLS Portal Registration &amp; E-Token Booking</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log onto <strong>keralaregistration.gov.in</strong>, input details of the testator, witnesses, and asset summary, and pay the nominal ₹1,000 registration fee online through e-Treasury challan.
                      Select your preferred SRO slot in Vanchiyoor, Pattom, Kazhakoottam, or Chalai.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">SRO Biometrics &amp; Book III Permanent Archiving</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office along with your two witnesses and original Aadhaar cards.
                      The Sub-Registrar captures biometric thumbprints, live digital photographs, and delivers the registered document number with official seal and Book III entry.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP SRO REGISTRATION */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Users className="w-4 h-4 text-[#C65378]" />
                  <span>SENIOR CITIZEN ASSISTANCE</span>
                </div>
                {/* H2 <= 70 chars: 52 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration in Trivandrum
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly testators, retired civil servants, defense veterans, or individuals undergoing medical recovery who cannot physically travel to an SRO, <strong>Section 31 of the Registration Act, 1908</strong> allows for registration at home or in a hospital.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">CRITERIA 1</span>
                    <h3 className="font-bold text-sm text-slate-900">Doctor&apos;s Fitness Certificate</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS practitioner must certify that the testator possesses sound testamentary capacity but is medically unable to visit the SRO.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">CRITERIA 2</span>
                    <h3 className="font-bold text-sm text-slate-900">SRO Commission Application</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A formal Section 31 requisition petition is submitted on the PEARLS portal accompanied by the official government inspection commission fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">CRITERIA 3</span>
                    <h3 className="font-bold text-sm text-slate-900">Sub-Registrar Home Visit</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar arrives at the testator&apos;s residence in Kowdiar, Sasthamangalam, Jawahar Nagar, or private hospital with portable biometric scanning devices.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed italic border-t border-slate-100 pt-4">
                  Our Thiruvananthapuram legal team manages doctor certification coordination, Section 31 petition filing, PEARLS portal slot scheduling, and Sub-Registrar liaison end-to-end.
                </p>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PREREQUISITES</span>
                </div>
                {/* H2 <= 70 chars: 51 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Mandatory Document Checklist for Trivandrum Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Check off the necessary items before executing your Will or proceeding to your local Thiruvananthapuram SRO:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    Interactive Readiness Checklist
                  </span>
                  <span className="text-xs font-extrabold text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-[#C65378]/30"
                          : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 text-[#C65378] rounded-md focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#C65378]"
                      />
                      <div className="space-y-0.5">
                        <span className={`block font-bold text-xs md:text-sm ${item.checked ? "text-slate-900" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: ESTATE ASSET DISTRIBUTION */}
            <section id="trivandrum-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Briefcase className="w-4 h-4 text-[#C65378]" />
                  <span>PORTFOLIO ALLOCATION</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Distribution: Tech Equity &amp; Real Estate
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A comprehensive estate plan must account for every category of movable and immovable property held in Kerala or worldwide:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Laptop className="w-4 h-4 text-[#C65378]" />
                    <span>Technopark Tech Portfolios &amp; RSUs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tech employees hold stock options (ESOPs, RSUs) in multinational corporations, global demat holdings (US stocks via Vested, INDmoney), and startup equity.
                    Our Wills include specific digital asset clauses with power of administration.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>TMC Apartments &amp; Gated Villas</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    High-rise apartments across Kazhakoottam, Pattom, and Sasthamangalam.
                    Clearly describe building numbers, undivided shares of land (UDS), and society maintenance accounts to prevent probate delays.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Ancestral Land &amp; Pokkuvaravu Titles</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ancestral properties, partitioned Tharavadu land, and coastal holdings in Thiruvallam and Kovalam.
                    Ensure detailed survey numbers, Resurvey block numbers, and Thandapper accounts are accurately transcribed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Pensions, Provident Funds &amp; Fixed Deposits</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Retired civil servants, ISRO scientists, and defense veterans hold significant treasury deposits, gratuities, and bank lockers.
                    Wills harmonize conflicting bank nominations with beneficial title bequests.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION CHARGES & ZERO STAMP DUTY */}
            <section id="trivandrum-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY EXPENDITURE</span>
                </div>
                {/* H2 <= 70 chars: 51 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Registration Charges &amp; Zero Stamp Duty in Kerala
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property gift deeds or sale deeds that attract heavy percentage-based stamp duty in Kerala, a Will enjoys zero stamp duty:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5 text-center">
                  <span className="block text-2xl font-black text-[#C65378]">₹0</span>
                  <span className="font-bold text-xs text-slate-800">Kerala Stamp Duty</span>
                  <p className="text-[11px] text-slate-500">Exempt under Kerala Stamp Act, 1959. Executed on plain paper.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5 text-center">
                  <span className="block text-2xl font-black text-[#C65378]">₹1,000</span>
                  <span className="font-bold text-xs text-slate-800">SRO Registration Fee</span>
                  <p className="text-[11px] text-slate-500">Flat government registration charge paid through e-Treasury challan.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5 text-center">
                  <span className="block text-2xl font-black text-[#C65378]">~₹100 - ₹200</span>
                  <span className="font-bold text-xs text-slate-800">Scanning &amp; User Fees</span>
                  <p className="text-[11px] text-slate-500">Computer digital archiving charges for Book III registration.</p>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PRICING</span>
                </div>
                {/* H2 <= 70 chars: 56 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Pricing: Trivandrum Will Making Packages
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose from our clear, all-inclusive legal service packages tailored for Trivandrum families:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      STANDARD
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Online Lawyer-Drafted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 font-semibold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for nuclear families with straightforward residential properties and bank savings.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Customized Kerala Succession Clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>TMC Property &amp; Thandapper Schedule</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Execution &amp; Witness Guidelines</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Select Standard
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 flex flex-col justify-between shadow-lg relative space-y-4">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378]">
                      COMPREHENSIVE
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Senior Advocate Consultation</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500 font-semibold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for Technopark professionals, NRI property owners, and multi-asset families.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>30-Min Call with High Court Advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Technopark RSUs &amp; Startup Shares</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Ancestral Partition Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Christian Succession Optimization</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-extrabold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Get Advocate Review
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      FULL CONCIERGE
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">PEARLS Registration &amp; SRO Visit</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 font-semibold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end service including PEARLS portal token booking and Sub-Registrar coordination.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Advocate Drafting &amp; Document Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>PEARLS Portal Token &amp; Challan Booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>SRO Physical Escort or Section 31 Home Visit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor Fitness Coordination for Seniors</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Select Full Concierge
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUESTIONS</span>
                </div>
                {/* H2 <= 70 chars: 54 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Trivandrum
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal questions regarding Wills and succession in Thiruvananthapuram:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
                  <span>AUTHORITATIVE SOURCES</span>
                </div>
                {/* H2 <= 70 chars: 54 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Statutory Citations &amp; Kerala High Court Precedents
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our Will drafting protocols strictly conform to foundational statutory provisions and landmark jurisprudence:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-xs">
                <div className="space-y-3 text-xs md:text-sm text-slate-600 leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800">Section 59, Indian Succession Act, 1925: </span>
                    Confirms testamentary capacity of every person of sound mind not being a minor to dispose of their property by Will.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800">Section 63, Indian Succession Act, 1925: </span>
                    Mandates testator signature or mark and concurrent attestation by two independent, non-beneficiary adult witnesses.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800">Section 213(2) read with Section 57, ISA 1925: </span>
                    Exempts non-presidency towns such as Thiruvananthapuram from compulsory court probate proceedings.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800">Mary Roy v. State of Kerala (1986 AIR 1011 SC): </span>
                    Landmark Supreme Court decision establishing the primacy of the Indian Succession Act over archaic Travancore Christian succession laws, conferring equal inheritance rights to female heirs.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800">Section 18(e) &amp; Section 31, Registration Act, 1908: </span>
                    Governs optional registration of Wills and doorstep commission visits by the Sub-Registrar for medically indisposed citizens.
                  </div>
                </div>
              </div>
            </section>

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
                Visual Blueprint: Thiruvananthapuram Will Drafting &amp; SRO Registration
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
                src="/images/will-drafting-in-thiruvananthapuram.jpg"
                alt="High Resolution Visual Blueprint: Thiruvananthapuram Will Drafting and SRO Registration"
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
