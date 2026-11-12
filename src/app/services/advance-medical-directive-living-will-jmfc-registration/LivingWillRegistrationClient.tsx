"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Scale,
  Building,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Info,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  HeartPulse,
  Stethoscope,
  Activity,
  Hospital,
  FolderLock,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "sc-2023-legal-framework", label: "1. Supreme Court 2023 Rules: Living Will Framework" },
  { id: "turnkey-execution-service", label: "2. Turnkey 4-Step Living Will Execution Protocol" },
  { id: "hospital-medical-board-support", label: "3. Two-Tier Hospital Medical Board Approval Process" },
  { id: "jmfc-vs-notary-registration", label: "4. JMFC vs Notary & Sub-Registrar Filing Rules" },
  { id: "digital-custody-vault", label: "5. Hospital Notification & Digilocker Vault System" },
  { id: "interactive-evaluator", label: "6. Interactive Living Will Compliance Evaluator" },
  { id: "directive-clauses-scope", label: "7. End-of-Life Medical Directive Scope & Clauses" },
  { id: "state-municipal-guide", label: "8. State-Wise JMFC & Municipal Notification Guide" },
  { id: "clinical-case-studies", label: "9. Clinical Case Scenarios: ICU & Palliative Care" },
  { id: "legal-citations-profile", label: "10. Statutory Citations & Legal Counsel Profile" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions: Living Will India" },
];

const STATE_MUNICIPAL_DATA: Record<
  string,
  { label: string; authority: string; jmfcDistrict: string; notes: string }
> = {
  delhi: {
    label: "Delhi NCR",
    authority: "MCD Health Officer & NDMC Public Health Cell",
    jmfcDistrict: "Chief Metropolitan Magistrate, Tis Hazari / Saket",
    notes: "Deposit copy with SDM and MCD health officer. Major hospitals honor Notary signed wills.",
  },
  maharashtra: {
    label: "Maharashtra (Mumbai & Pune)",
    authority: "BMC Public Health Department & PMC Health Office",
    jmfcDistrict: "Metropolitan Magistrate Court, Bandra / Esplanade",
    notes: "Civic health posts accept copies under 2023 rules. State circulars recognize Notary execution.",
  },
  karnataka: {
    label: "Karnataka (Bengaluru)",
    authority: "BBMP Joint Commissioner Public Health Custodian",
    jmfcDistrict: "Chief Metropolitan Magistrate, Bengaluru",
    notes: "BBMP zonal offices act as local custodians. Private hospitals form boards within two days.",
  },
  tamil_nadu: {
    label: "Tamil Nadu (Chennai)",
    authority: "Greater Chennai Corporation (GCC) Health Cell",
    jmfcDistrict: "Chief Metropolitan Magistrate, Egmore, Chennai",
    notes: "Sanitary officers keep official records. Directives must name a surrogate clearly.",
  },
  telangana: {
    label: "Telangana (Hyderabad)",
    authority: "GHMC Circle Health Officer Desk",
    jmfcDistrict: "Metropolitan Court, Nampally, Hyderabad",
    notes: "Circle offices accept physical records. Tertiary hospitals verify proxies fast.",
  },
  gujarat: {
    label: "Gujarat (Ahmedabad)",
    authority: "AMC Public Health Department",
    jmfcDistrict: "Metropolitan Magistrate Court, Gheekanta",
    notes: "Notarize on stamp paper with witness papers. Civic registry issues filing receipts.",
  },
  west_bengal: {
    label: "West Bengal (Kolkata)",
    authority: "KMC Borough Health Officer Desk",
    jmfcDistrict: "Bankshall Court, Kolkata",
    notes: "Borough health desks log custodial copies. Both private and state hospitals honor them.",
  },
};

const FAQS = [
  {
    q: "What is a Living Will or Advance Medical Directive in India?",
    a: "A Living Will is a legal paper. You write your medical choices in advance. It states if you want life support machines stopped when you face a terminal illness. The Supreme Court approved this right under Article 21.",
  },
  {
    q: "Did the Supreme Court change living will rules in 2023?",
    a: "Yes. In January 2023, the Supreme Court made living wills easier to sign. You can now sign before a Notary Public with two witnesses. You do not need a magistrate visit before signing. Hospitals set up doctor boards within 48 hours.",
  },
  {
    q: "Is countersignature by a Judicial Magistrate First Class (JMFC) still needed?",
    a: "No. Under the 2023 order, signing before a Notary Public or Gazetted Officer is enough. The hospital informs the court after doctor boards meet. You can still file court records as an extra safety step.",
  },
  {
    q: "How does the Two-Tier Hospital Medical Board process work?",
    a: "When a patient cannot speak, the hospital sets up a Primary Board of 3 doctors within 48 hours. If they agree cure is not possible, a Secondary Board reviews the case within 48 hours. Both boards must agree before stopping life support.",
  },
  {
    q: "Can family members override a patient's registered Living Will?",
    a: "No. The Supreme Court ruled that your personal choice is supreme under Article 21. If your living will is valid, doctors and your surrogate must follow your written wishes, even if relatives disagree.",
  },
  {
    q: "Where should the executed Living Will be deposited for custody?",
    a: "Keep one signed copy with your chosen proxy. Give one copy to your family doctor. File one copy with your local city corporation or panchayat office. You can also save it in DigiLocker or your ABHA health record.",
  },
  {
    q: "What treatments can be refused under an Advance Medical Directive?",
    a: "You can refuse mechanical ventilators, heart shock (CPR), dialysis, and feeding tubes in terminal cases. You cannot ask for active euthanasia or lethal drugs, which remain illegal in India.",
  },
  {
    q: "Can a person revoke or amend their Living Will later?",
    a: "Yes. You can cancel or change your living will at any time while you have a sound mind. You must sign the change in writing and inform your proxy, doctor, and local city office.",
  },
  {
    q: "What is the difference between a Living Will and a Healthcare Power of Attorney?",
    a: "A Living Will lists exact medical treatments you refuse in writing. A Healthcare Proxy names a trusted person to make decisions if new medical issues arise. Our legal service combines both into one solid document.",
  },
  {
    q: "What are the legal fees for turnkey Living Will registration in India?",
    a: "Our legal retainer fees range from ₹25,000 to ₹75,000. This includes custom drafting, doctor fitness checks, Notary signing, city office filing, and hospital board support.",
  },
];

export default function LivingWillRegistrationClient() {
  const { status } = useSession();
  const router = useRouter();

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("sc-2023-legal-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("delhi");

  // Evaluator controls
  const [patientAge, setPatientAge] = useState(65);
  const [hasDoctorCert, setHasDoctorCert] = useState(true);
  const [hasProxyAppointed, setHasProxyAppointed] = useState(true);
  const [refuseVentilator, setRefuseVentilator] = useState(true);
  const [refuseCPR, setRefuseCPR] = useState(true);
  const [wantPainReliefOnly, setWantPainReliefOnly] = useState(true);
  const [chosenRoute, setChosenRoute] = useState("notary");

  const copyClause = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClause(key);
    setTimeout(() => setCopiedClause(null), 3000);
  };

  const score = Math.min(
    100,
    (patientAge >= 18 ? 20 : 0) +
      (hasDoctorCert ? 25 : 0) +
      (hasProxyAppointed ? 25 : 0) +
      (refuseVentilator && refuseCPR ? 15 : 5) +
      (chosenRoute !== "none" ? 15 : 0)
  );

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>SUPREME COURT 2023 ORDER • CONSTITUTION ART. 21</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Living Will & Advance Directive Registration Service
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Complete advocate service to draft, notarize, and file your Living Will in India. Fully compliant
            with Supreme Court 2023 rules, 48-hour hospital doctor boards, and city health records.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <HeartPulse className="w-4 h-4" />
              <span>Book Living Will Lawyer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#interactive-evaluator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Check 2023 Readiness</span>
            </a>
            <Link
              href="/templates/two-tier-medical-board-living-will-execution-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Medical Board Rules</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Article 21</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RIGHT TO DIE WITH DIGNITY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SC 2023 Order</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NOTARY SIGNING ALLOWED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">48 Hours</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TWO-TIER DOCTOR REVIEW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Full Service</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CITY VAULT FILING
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN GRID */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* LEFT COLUMN: TABLE OF CONTENTS */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Rules</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Constitution Article 21, Supreme Court 2023 orders, the Notaries Act,
                and Mental Healthcare Act 2017.
              </p>
            </div>

            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-[#C65378]" />
                <span>Turnkey Service</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need our lawyers to draft, notarize, and file your living will? Connect with our team today.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Book Legal Consultation</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* MIDDLE COLUMN: CONTENT */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/advance-medical-directive-living-will-jmfc-registration-og.jpg"
                  alt="Living Will and Advance Medical Directive Registration Service in India Legal Counsel"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Supreme Court 2023 Living Will Rules: Notary Signing, City Custody &amp; Hospital Boards
                  </span>
                </p>
              </div>
            </div>

            {/* EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: LIVING WILL REGISTRATION IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court 2023 Rules:</strong> You do not need a magistrate visit to sign your will.
                    Signing before a Notary Public with two witnesses is valid across India.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Doctor Boards:</strong> The hospital forms two doctor boards within 48 hours each.
                    This removes old delays from district offices.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Safe Records:</strong> We lodge physical copies with your city office. We also link your
                    file to DigiLocker and your ABHA card.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Complete Legal Help:</strong> We handle drafting, doctor mental fitness checks, Notary seals,
                    and city filings for you.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (Single H2) */}
            <section id="sc-2023-legal-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Supreme Court 2023 Rules: Living Will Framework
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every Indian citizen has the right to life under Article 21. In 2018, the Supreme Court ruled
                  in <em>Common Cause v. Union of India</em> that the right to life includes the right to die with
                  dignity. The Court made Advance Medical Directives legal in India.
                </p>
                <p>
                  The original 2018 rules were very strict. You had to sign before a judicial magistrate. You also
                  needed approval from the District Collector. This caused long delays while patients suffered.
                </p>
                <p>
                  On January 24, 2023, a five-judge Constitution Bench led by Justice K.M. Joseph eased these rules.
                  Now you can sign before a Notary. Hospitals can set up their own doctor review boards directly.
                </p>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-rose-50/60 rounded-xl border border-rose-200/80 p-4 space-y-2">
                  <div className="font-extrabold text-[#C65378] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Old 2018 Rules (Difficult)</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Must visit a court magistrate to sign.</li>
                    <li>District Collector had to name the doctor board.</li>
                    <li>Magistrate had to visit the hospital bed.</li>
                    <li>Long delays while patients stayed in pain.</li>
                  </ul>
                </div>
                <div className="bg-emerald-50/60 rounded-xl border border-emerald-200/80 p-4 space-y-2">
                  <div className="font-extrabold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>New 2023 Rules (Simple)</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Sign before a Notary Public with two witnesses.</li>
                    <li>The hospital forms both doctor boards directly.</li>
                    <li>Each doctor board must decide within 48 hours.</li>
                    <li>The hospital sends notice to court without bedside visits.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 2: 4-STEP TIMELINE */}
            <section id="turnkey-execution-service" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Activity className="w-4 h-4" />
                <span>PROCESS STEPS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Turnkey 4-Step Living Will Execution Protocol
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Most websites only give text forms. Our lawyers handle the complete legal procedure for your family.
              </p>

              {/* Steps */}
              <div className="relative border-l-2 border-[#C65378]/30 ml-4 pl-6 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[33px] top-1 w-6 h-6 rounded-full bg-[#C65378] text-white text-xs font-black flex items-center justify-center shadow-md">
                    1
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Step 1: Consultation &amp; Custom Legal Drafting
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Day 1
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We discuss your medical choices. We write clear rules about machines, CPR, and feeding tubes.
                      We also help secure a doctor certificate of sound mind.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[33px] top-1 w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-black flex items-center justify-center shadow-md">
                    2
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Step 2: Notary Signing with Two Witnesses
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Day 2
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      You sign the deed on stamp paper before two adult witnesses. An authorized Notary Public validates
                      and seals the deed under 2023 Supreme Court rules.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[33px] top-1 w-6 h-6 rounded-full bg-[#5F7E75] text-white text-xs font-black flex items-center justify-center shadow-md">
                    3
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Step 3: Filing with Local City Custodian
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Day 3 to 4
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our advocates deliver an official copy to your local municipal corporation or panchayat office.
                      We obtain a formal filing receipt for your records.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[33px] top-1 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                    4
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Step 4: Digital Health Sync &amp; Hospital Dossier
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Day 5
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      You receive sealed copies for your proxy. We help link your directive to DigiLocker and your
                      ABHA health card for quick hospital access.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: DOCTOR BOARD PROCESS */}
            <section id="hospital-medical-board-support" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Hospital className="w-4 h-4" />
                <span>DOCTOR BOARD RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Two-Tier Hospital Medical Board Approval Process
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                When a terminally ill patient cannot speak, the treating hospital follows a simple two-tier doctor review.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                      <Stethoscope className="w-4 h-4" />
                      <span>Tier 1: Primary Medical Board</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-2">
                      <p>
                        <strong>Members:</strong> Formed by the hospital. It has 3 doctors, including the treating doctor
                        and 2 specialists with at least 5 years experience.
                      </p>
                      <p>
                        <strong>Time Limit:</strong> Must examine the patient and give a written report within <strong>48 hours</strong>.
                      </p>
                      <p>
                        <strong>Duty:</strong> Verifies if the illness is terminal and whether machines only prolong pain.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Tier 2: Secondary Medical Board</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-2">
                      <p>
                        <strong>Members:</strong> Set up by hospital heads. It includes a senior doctor and 2 independent
                        subject specialists.
                      </p>
                      <p>
                        <strong>Time Limit:</strong> Must review the case within <strong>48 hours</strong>.
                      </p>
                      <p>
                        <strong>Duty:</strong> Confirms the first board finding. Informs the local court magistrate and family proxy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50/70 border border-amber-200/90 p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong>Legal Protection:</strong> If a hospital board refuses to act on a valid will, the family proxy
                    can file a writ petition in the High Court under Article 226 for urgent orders.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: JMFC VS NOTARY */}
            <section id="jmfc-vs-notary-registration" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>REGISTRATION COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. JMFC vs Notary &amp; Sub-Registrar Filing Rules
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Learn how Indian law treats Notary signing, sub-registrar filing, and court magistrate seals.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-[#172228] text-white text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Rule</th>
                      <th className="py-3 px-4">Notary Public Route</th>
                      <th className="py-3 px-4">Sub-Registrar Office</th>
                      <th className="py-3 px-4">Court Magistrate (JMFC)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Base</td>
                      <td className="py-3 px-4">SC 2023 Order &amp; Notaries Act</td>
                      <td className="py-3 px-4">Registration Act 1908</td>
                      <td className="py-3 px-4">SC 2018 Order (Modified 2023)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Current Status</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Standard &amp; Sufficient</td>
                      <td className="py-3 px-4">Optional Record</td>
                      <td className="py-3 px-4 text-slate-500">No Longer Compulsory</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Time to Complete</td>
                      <td className="py-3 px-4 text-emerald-700">Same-Day Service</td>
                      <td className="py-3 px-4">2 to 5 Days</td>
                      <td className="py-3 px-4 text-rose-600">Several Weeks</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Hospital Validity</td>
                      <td className="py-3 px-4 text-emerald-700">100% Accepted in India</td>
                      <td className="py-3 px-4">Fully Accepted</td>
                      <td className="py-3 px-4">Fully Accepted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: CUSTODY VAULT */}
            <section id="digital-custody-vault" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FolderLock className="w-4 h-4" />
                <span>SAFE RECORDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Hospital Notification &amp; Digilocker Vault System
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                A living will must be easy to find in an emergency. We help you place copies where doctors can see them fast.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">City Office Filing</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    A copy is filed with your local municipal health officer or panchayat office for public record.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <FolderLock className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">Digital Health Sync</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    We help you save digital copies in DigiLocker and your ABHA health record for quick doctor checks.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">Family Proxy Pack</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Your chosen proxy gets medical wallet cards and ready notice forms for attending ICU doctors.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: INTERACTIVE EVALUATOR */}
            <section id="interactive-evaluator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>ONLINE CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Interactive Living Will Compliance Evaluator
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Use this free tool to check if your medical choices follow the Supreme Court 2023 orders.
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Patient Age: {patientAge} Years
                      </label>
                      <input
                        type="range"
                        min={18}
                        max={95}
                        value={patientAge}
                        onChange={(e) => setPatientAge(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>18 (Adult)</span>
                        <span>60 (Senior)</span>
                        <span>95</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Doctor Fitness Certificate of Sound Mind
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setHasDoctorCert(true)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                            hasDoctorCert
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Certificate Ready
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasDoctorCert(false)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                            !hasDoctorCert
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Need Lawyer Help
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Chosen Healthcare Proxy (Decision Maker)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setHasProxyAppointed(true)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                            hasProxyAppointed
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Proxy Chosen
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasProxyAppointed(false)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                            !hasProxyAppointed
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Not Yet Chosen
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Signing Route
                      </label>
                      <select
                        value={chosenRoute}
                        onChange={(e) => setChosenRoute(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                      >
                        <option value="notary">Notary Public + City Office Filing (Recommended)</option>
                        <option value="jmfc">Court Magistrate Filing</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#FAF7F0] p-4 rounded-2xl border border-slate-200">
                    <div className="font-extrabold text-xs uppercase tracking-wider text-[#172228] flex items-center gap-1.5">
                      <HeartPulse className="w-4 h-4 text-[#C65378]" />
                      <span>Treatment Choices in Terminal Illness</span>
                    </div>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={refuseVentilator}
                        onChange={(e) => setRefuseVentilator(e.target.checked)}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Refuse Breathing Machines (Ventilators)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={refuseCPR}
                        onChange={(e) => setRefuseCPR(e.target.checked)}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Do Not Resuscitate (No Electric Shocks or CPR)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantPainReliefOnly}
                        onChange={(e) => setWantPainReliefOnly(e.target.checked)}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Provide Full Pain Relief &amp; Comfort Care Only</span>
                    </label>

                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">SC 2023 Readiness:</span>
                        <span
                          className={`text-sm font-black ${
                            score >= 80 ? "text-emerald-700" : score >= 60 ? "text-amber-700" : "text-rose-700"
                          }`}
                        >
                          {score}% Ready
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            score >= 80 ? "bg-emerald-600" : score >= 60 ? "bg-amber-500" : "bg-rose-600"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {score >= 80
                          ? "Your directive matches Supreme Court 2023 rules. Ready for lawyer execution."
                          : "You need a doctor fitness paper and a proxy name. Our legal team can help you complete both."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-600">
                    Retainer fee covers drafting, doctor papers, Notary seals, and city office filing.
                  </div>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-colors"
                  >
                    <span>Schedule Legal Retainer (₹25,000 - ₹75,000)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: DIRECTIVE CLAUSES */}
            <section id="directive-clauses-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. End-of-Life Medical Directive Scope &amp; Clauses
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                A valid living will must be clear and direct. Here are three standard legal clauses used in our drafts.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                      <span>Clause 1: Refusal of Breathing Machines in Terminal States</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyClause(
                          "clause1",
                          `If my treating doctors confirm that I am in a terminal condition with no hope of recovery, I direct that mechanical ventilators and invasive life support shall be stopped in line with Supreme Court 2023 orders.`
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      {copiedClause === "clause1" ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono leading-relaxed border border-slate-200">
                    &quot;If my treating doctors confirm that I am in a terminal condition with no hope of recovery,
                    I direct that mechanical ventilators and invasive life support shall be stopped in line with Supreme
                    Court 2023 orders.&quot;
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                      <span>Clause 2: Appointment of Family Healthcare Proxy</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyClause(
                          "clause2",
                          `I appoint my nominated family member as my healthcare proxy to speak with hospital doctor boards and enforce this living will under the Mental Healthcare Act 2017.`
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      {copiedClause === "clause2" ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono leading-relaxed border border-slate-200">
                    &quot;I appoint my nominated family member as my healthcare proxy to speak with hospital doctor boards
                    and enforce this living will under the Mental Healthcare Act 2017.&quot;
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                      <span>Clause 3: Direction for Pain Relief and Comfort</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyClause(
                          "clause3",
                          `I direct that all necessary pain medicines and comfort care be given to keep me free from pain and distress, even if such care may hasten the dying process.`
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      {copiedClause === "clause3" ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono leading-relaxed border border-slate-200">
                    &quot;I direct that all necessary pain medicines and comfort care be given to keep me free from pain
                    and distress, even if such care may hasten the dying process.&quot;
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: STATE GUIDE */}
            <section id="state-municipal-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>STATE CITY RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. State-Wise JMFC &amp; Municipal Notification Guide
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Health rules are managed by state and city offices. Select your city to see local custodian details.
              </p>

              <div className="flex flex-wrap gap-2 pb-2">
                {Object.keys(STATE_MUNICIPAL_DATA).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedState(key)}
                    className={`py-1.5 px-3 rounded-full text-xs font-bold border transition-colors ${
                      selectedState === key
                        ? "bg-[#C65378] text-white border-[#C65378]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {STATE_MUNICIPAL_DATA[key].label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between border-b pb-2">
                  <span>{STATE_MUNICIPAL_DATA[selectedState].label} Custodian Office</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                    Verified Office
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div>
                    <span className="font-bold block text-slate-900 mb-0.5">City Custodian Office:</span>
                    <p className="text-slate-600">{STATE_MUNICIPAL_DATA[selectedState].authority}</p>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 mb-0.5">Court Magistrate Court:</span>
                    <p className="text-slate-600">{STATE_MUNICIPAL_DATA[selectedState].jmfcDistrict}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
                  <strong>Practical Rule:</strong> {STATE_MUNICIPAL_DATA[selectedState].notes}
                </p>
              </div>
            </section>

            {/* SECTION 9: CASE STUDIES */}
            <section id="clinical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>REAL CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Clinical Case Scenarios: ICU &amp; Palliative Care
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                These case examples show how a clear living will prevents family fights and protects doctors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] uppercase tracking-wider">
                      DELHI NCR HOSPITAL
                    </span>
                    <span className="text-xs text-slate-600">Stroke Patient Case</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Stopping Family Disputes Over Ventilators</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 78-year-old patient suffered a severe stroke. The son wanted machines kept on. The daughter
                    wanted to honor her father&apos;s wish not to suffer.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The father had signed a notarized living will under the 2023 orders. The hospital doctor board met
                    within 24 hours. The board respected the written directive and avoided a court battle.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 uppercase tracking-wider">
                      MUMBAI ONCOLOGY
                    </span>
                    <span className="text-xs text-slate-600">Cancer Care Case</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Protecting Doctors from Legal Risk</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 72-year-old cancer patient reached the end of life. Doctors feared criminal complaints if they
                    stopped invasive breathing machines.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our team provided certified copies of the registered will and doctor papers. Both doctor boards approved
                    the request in 48 hours. The patient rested comfortably with pain relief.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: CITATIONS */}
            <section id="legal-citations-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Statutory Citations &amp; Legal Counsel Profile
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>1. Common Cause v. Union of India (2018):</strong> The Supreme Court affirmed the right to die
                  with dignity under Article 21.
                </p>
                <p>
                  <strong>2. Common Cause v. Union of India (2023 Order):</strong> Simplified signing before a Notary and
                  created 48-hour doctor boards.
                </p>
                <p>
                  <strong>3. Constitution of India Article 21:</strong> Protects life and personal freedom, including a
                  dignified death.
                </p>
                <p>
                  <strong>4. Mental Healthcare Act 2017 Section 5:</strong> Allows citizens to name healthcare representatives
                  in advance.
                </p>
                <p>
                  <strong>5. Notaries Act 1952:</strong> Authorizes legal notaries to attest documents and verify identity.
                </p>
              </div>
            </section>

            {/* SECTION 11: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>QUESTIONS &amp; ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Living Will India
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Read simple answers to common questions on living wills, doctor boards, and registration in India.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full py-4 px-5 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          {/* RIGHT COLUMN: LAWYER PROFILE & CARDS */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-[#C65378]/20 flex items-center justify-center font-black text-[#C65378] text-base shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate &amp; Medical Law Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in living wills, Article 21 rights, Notary signing, and hospital doctor boards at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Advocate</span>
                </span>
              </div>
            </div>

            <div className="hidden lg:block space-y-6">
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PROTECT YOUR DIGNITY</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Sign Your Living Will with Expert Advocate Help
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid ICU conflicts and unwanted machine suffering. Our advocates handle legal drafting, Notary seals,
                  and city office filing.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Advocate Consultation</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Retainer ₹25,000 to ₹75,000 • Pan-India</span>
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <FileText className="w-3 h-3" />
                  <span>PROPERTY WILLS</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need a Property Will Along with Your Living Will?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Living Will protects your health choices while alive. A Property Will passes your assets to your
                  heirs after death. Make both for complete safety.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Draft Property Will Online</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Clients Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SC 2023 Order:</strong> Fully compliant with Supreme Court rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>City Office Record:</strong> We deposit copies with city health officers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Doctor Board Support:</strong> Protects doctors from legal worries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Fast Action:</strong> Ready for quick 48-hour doctor review.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* BOTTOM CTA BANNER */}
      <section className="w-full bg-[#172228] text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-rose-200 uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-[#C65378]" />
            <span>LEGAL EXPERTS ACROSS INDIA</span>
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Protect Your Right to Die with Dignity Under Article 21
          </div>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Do not leave end-of-life choices to confusion in hospital halls. Our specialized living will advocates
            draft, notarize, and file your directive with total legal safety.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Schedule Advocate Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates/two-tier-medical-board-living-will-execution-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <span>View Doctor Board Formats</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
