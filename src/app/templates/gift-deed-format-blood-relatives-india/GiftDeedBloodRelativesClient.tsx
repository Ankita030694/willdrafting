"use client";

import React, { useState, useEffect } from "react";
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
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  HeartHandshake,
} from "lucide-react";

// Table of Contents Items (all labels <= 70 chars, unique, no em-dashes)
const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Legal Rules: Transfer of Property Act Gift Law" },
  { id: "blood-relative-definition", label: "2. Blood Relative Definition & Section 56(2) Tax Rules" },
  { id: "state-stamp-duty-matrix", label: "3. State Stamp Duty Matrix: Concessions for Relatives" },
  { id: "the-unconditional-deed-trap", label: "4. The Unconditional Gift Trap: Why Online Deeds Fail" },
  { id: "senior-citizen-section-23", label: "5. Section 23 Senior Citizens Act: Legal Revocation Power" },
  { id: "supreme-court-precedents", label: "6. Supreme Court Rulings: Sudesh Chhikara & Urmila Dixit" },
  { id: "gift-deed-vs-will", label: "7. Gift Deed vs Will: Comparison for Indian Families" },
  { id: "interactive-clause-customizer", label: "8. Free Gift Deed Clause & Stamp Duty Customizer" },
  { id: "complete-gift-deed-format", label: "9. Senior-Protected Blood Relative Gift Deed Format" },
  { id: "sro-registration-sop", label: "10. Step-by-Step SOP: SRO Filing Protocol" },
  { id: "title-documents-checklist", label: "11. Needed Check Checklist Before Filing" },
  { id: "real-life-case-studies", label: "12. Real-World Case Studies: Noida, Mumbai & Bangalore" },
  { id: "legal-counsel-profile", label: "13. Senior Estate Legal Team & Lawyer Check" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions: Blood Relative Gifts" },
  { id: "statutory-citations", label: "15. Legal Citations & Official Revenue Portals" },
];

// State Stamp Duty Concession Rates for Blood Relatives
interface StateDutyConfig {
  state: string;
  dutyRateBloodRelative: string;
  regularDutyRate: string;
  cessSurcharge: string;
  registrationFee: string;
  ruleCitation: string;
  notes: string;
}

const STATE_DUTY_DATA: StateDutyConfig[] = [
  {
    state: "Maharashtra",
    dutyRateBloodRelative: "₹200 or 1%",
    regularDutyRate: "5% to 7%",
    cessSurcharge: "1% Metro Cess in Mumbai/Pune",
    registrationFee: "₹200 to ₹30,000 max",
    ruleCitation: "Article 34, Maharashtra Stamp Act",
    notes: "Applies to residential or agricultural land gifted to a spouse, child, or grandchild.",
  },
  {
    state: "Uttar Pradesh",
    dutyRateBloodRelative: "₹5,000 (Flat nominal)",
    regularDutyRate: "5% to 7%",
    cessSurcharge: "Nil under concession",
    registrationFee: "₹1,000 (Flat)",
    ruleCitation: "UP Stamp Notification 2022/2023",
    notes: "Applies to parents, children, spouse, siblings, and grandchildren.",
  },
  {
    state: "Haryana",
    dutyRateBloodRelative: "0% (Zero stamp duty)",
    regularDutyRate: "5% to 7%",
    cessSurcharge: "Nil",
    registrationFee: "Nominal SRO fee (₹100 to ₹1,000)",
    ruleCitation: "Haryana Revenue Dept Notification",
    notes: "Total exemption for transfers between parents, children, spouse, and siblings.",
  },
  {
    state: "Punjab",
    dutyRateBloodRelative: "0% (Zero stamp duty)",
    regularDutyRate: "5% to 6%",
    cessSurcharge: "Nil",
    registrationFee: "Nominal facilitation fee",
    ruleCitation: "Punjab Land Revenue Notification",
    notes: "Zero stamp duty on gift deeds among blood relatives across Punjab.",
  },
  {
    state: "Karnataka",
    dutyRateBloodRelative: "₹1,000 to ₹5,000 (Fixed)",
    regularDutyRate: "5% to 5.6%",
    cessSurcharge: "10% Cess + 2% Surcharge on duty",
    registrationFee: "₹500 to ₹1,000 fixed",
    ruleCitation: "Article 28(a), Karnataka Stamp Act",
    notes: "Applies to parents, spouse, children, siblings, and grandchildren.",
  },
  {
    state: "Delhi (NCT)",
    dutyRateBloodRelative: "4% (Female) / 6% (Male)",
    regularDutyRate: "4% to 6%",
    cessSurcharge: "1% MCD Cess if applicable",
    registrationFee: "1% of circle rate valuation",
    ruleCitation: "Delhi Stamp Act Schedule 1A",
    notes: "Delhi charges standard conveyance duty. It offers no family discount.",
  },
  {
    state: "Tamil Nadu",
    dutyRateBloodRelative: "1% (Capped at ₹25,000)",
    regularDutyRate: "7%",
    cessSurcharge: "Nil",
    registrationFee: "1% (Capped at ₹4,000)",
    ruleCitation: "Article 33, Indian Stamp (TN) Act",
    notes: "Applies only to close family. Maximum total government charge is ₹29,000.",
  },
  {
    state: "West Bengal",
    dutyRateBloodRelative: "0.5% of market value",
    regularDutyRate: "5% to 6%",
    cessSurcharge: "Standard local body surcharge",
    registrationFee: "Standard 1% SRO fee",
    ruleCitation: "WB Stamp (Amendment) Rules",
    notes: "Concessional rate applies to gifts for parents, spouse, children, and siblings.",
  },
];

const FAQS = [
  {
    q: "Is a gift deed between blood relatives legally revocable in India?",
    a: "Under Section 126 of the Transfer of Property Act, 1882, a gift deed is generally permanent once accepted. However, Section 23 of the Senior Citizens Act, 2007 provides a vital exception. If an elderly parent adds an express condition for care and basic needs, the Maintenance Tribunal can declare the deed void if the child fails to provide support.",
  },
  {
    q: "Why do standard online gift deed templates put elderly parents at risk?",
    a: "Standard internet templates use unconditional transfer language. In the landmark case Sudesh Chhikara v. Ram Anandi (2022 SC), the Supreme Court ruled that without an express care condition in the deed itself, Section 23 cannot be used. Parents who sign unconditional deeds cannot easily cancel them if problems arise later.",
  },
  {
    q: "What is the stamp duty on a gift deed to blood relatives across Indian states?",
    a: "Many Indian states offer generous stamp duty discounts for blood relatives. In Maharashtra, stamp duty is only ₹200 for home homes. In Uttar Pradesh, it is a flat ₹5,000. In Haryana and Punjab, stamp duty is completely 0%. Tamil Nadu caps the total stamp duty at ₹25,000 for family members.",
  },
  {
    q: "Is there any income tax on asset received as a gift from blood relatives?",
    a: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, gifts received from defined relatives are 100% tax-free. This applies to parents, children, spouse, siblings, and grandparents. The value of the asset does not matter.",
  },
  {
    q: "Should I execute a Gift Deed or a Will for transferring asset to my child?",
    a: "A Will is usually safer for parents. With a Will, you keep 100% ownership and control during your life. You pay no stamp duty, and you can change the Will anytime. A Gift Deed is helpful only when your child needs immediate ownership today.",
  },
  {
    q: "Is filing of a gift deed needed for land asset in India?",
    a: "Yes. Under Section 123 of the Transfer of Property Act, 1882, every gift of land asset must be filed. You must sign the deed at the SRO office before two independent witnesses. An plain gift deed has zero legal effect in court.",
  },
  {
    q: "Can family asset be transferred through a gift deed to one child?",
    a: "No. Under Hindu law, you cannot gift undivided family asset to one child without written consent from all other legal coparceners. However, you can freely gift your self-acquired asset to any child you choose.",
  },
  {
    q: "What happens to capital gains tax when the child sells the gifted asset?",
    a: "Under Section 49(1) of the Income Tax Act, 1961, the child takes over the parent's original purchase cost. Under Section 2(42A), the parent's holding period also counts toward the child's tenure for long-term capital gains tax calculations.",
  },
];

export default function GiftDeedBloodRelativesClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Free Customizer Form State
  const [selectedRelation, setSelectedRelation] = useState<string>("father-to-son");
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  const [propertyValuation, setPropertyValuation] = useState<number>(7500000);
  const [includeSection23, setIncludeSection23] = useState<boolean>(true);
  const [includeResidenceClause, setIncludeResidenceClause] = useState<boolean>(true);
  const [includeIndemnity, setIncludeIndemnity] = useState<boolean>(true);
  const [donorName, setDonorName] = useState<string>("Rajesh Kumar Sharma");
  const [doneeName, setDoneeName] = useState<string>("Amit Sharma");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute estimated stamp duty
  const getEstimatedDuty = () => {
    switch (selectedState) {
      case "Maharashtra":
        return { duty: 200, reg: Math.min(30000, Math.round(propertyValuation * 0.01)), label: "Concessional Flat ₹200 (Article 34)" };
      case "Uttar Pradesh":
        return { duty: 5000, reg: 1000, label: "Concessional Flat ₹5,000 + ₹1,000 Reg" };
      case "Haryana":
      case "Punjab":
        return { duty: 0, reg: 1000, label: "0% Stamp Duty Concession" };
      case "Karnataka":
        return { duty: 5000, reg: 1000, label: "Fixed ₹5,000 (Art 28(a)) + Surcharges" };
      case "Tamil Nadu":
        return { duty: Math.min(25000, Math.round(propertyValuation * 0.01)), reg: Math.min(4000, Math.round(propertyValuation * 0.01)), label: "1% Duty (Capped at ₹25k) + 1% Reg" };
      case "West Bengal":
        return { duty: Math.round(propertyValuation * 0.005), reg: Math.round(propertyValuation * 0.01), label: "0.5% Concessional Family Duty" };
      case "Delhi (NCT)":
      default:
        return { duty: Math.round(propertyValuation * 0.06), reg: Math.round(propertyValuation * 0.01), label: "Standard Rate (6% Male / 4% Female)" };
    }
  };

  const estimated = getEstimatedDuty();

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyTemplateToClipboard = () => {
    const fullDeedText = `DEED OF GIFT OF IMMOVABLE PROPERTY BETWEEN BLOOD RELATIVES
(WITH EXPRESS SECTION 23 SENIOR CITIZENS ACT MAINTENANCE AND LIFETIME RESIDENCE CLAUSE)

THIS DEED OF GIFT is made and executed on this [Day] day of [Month], [Year], at [City], by:

DONOR:
Mr./Mrs. ${donorName || "[Full Name of Donor]"}, aged about [Age] years, residing at [Permanent Address], PAN: [Donor PAN], Aadhaar: [XXXX-XXXX-XXXX] (hereinafter called the "DONOR") OF THE ONE PART;

AND

DONEE:
Mr./Mrs. ${doneeName || "[Full Name of Donee]"}, aged about [Age] years, residing at [Permanent Address], PAN: [Donee PAN], Aadhaar: [XXXX-XXXX-XXXX] (hereinafter called the "DONEE") OF THE OTHER PART.

WHEREAS:
1. The Donor is the absolute owner of the self-acquired residential property described in the SCHEDULE below.
2. The Donor acquired the property vide Registered Sale Deed dated [Date], Document No. [Doc No.], registered at SRO [SRO Location].
3. The property is free from all mortgages, claims, liens, and disputes.
4. The Donee is the biological son/daughter of the Donor. The Donor holds deep love and affection for the Donee.
5. In return for love and affection, the Donor wishes to gift the property to the Donee, subject to the conditions below.

NOW THIS DEED WITNESSETH:

1. VOLUNTARY TRANSFER:
The Donor voluntarily transfers the Schedule Property to the Donee without any monetary payment.

${includeSection23 ? `2. SECTION 23 SENIOR CITIZENS ACT MAINTENANCE CONDITION:
This gift is subject to Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007. The Donee promises to care for the Donor and spouse throughout their lives. The Donee must provide:
(a) Healthy food, proper clothing, and peaceful shelter;
(b) Complete medical care, medicines, and hospital costs;
(c) Daily personal support and respect.
If the Donee fails or refuses to provide this basic care, this gift will be deemed made by fraud or undue influence. The Donor can then ask the Maintenance Tribunal (SDM Court) to declare this gift deed null and void under Section 23(1).` : ""}

${includeResidenceClause ? `3. RESERVED LIFETIME RIGHT OF RESIDENCE:
The Donor keeps an absolute, exclusive right to live in the property for life. The Donee cannot evict, disturb, or move the Donor. The Donee cannot sell, lease, or mortgage the home during the Donor's life without written consent.` : ""}

4. ACCEPTANCE OF GIFT:
The Donee accepts this gift along with all the conditions and care duties stated above.

5. SCHEDULE OF PROPERTY:
[Insert Full Property Address, Flat No., Survey No., Total Square Feet, and Boundaries North/South/East/West].

IN WITNESS WHEREOF the parties have signed this Deed of Gift on the date stated above.

DONOR: _______________________ (${donorName || "Donor"})
DONEE: _______________________ (${doneeName || "Donee"})

WITNESSES:
1. Name & Address: ____________________________________________________
2. Name & Address: ____________________________________________________`;

    navigator.clipboard.writeText(fullDeedText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyClauseToClipboard = () => {
    const clauseText = `SECTION 23 SENIOR CITIZEN PROTECTION & LIFETIME RESIDENCE CLAUSE (STANDALONE):
"AND THIS DEED OF GIFT IS SUBJECT TO THE EXPRESS STATUTORY CONDITION that the Donee shall provide basic physical needs, food, shelter, clothing, medical attention, and healthcare to the Donor for life. 

IF THE DONEE NEGLECTS OR REFUSES to maintain the Donor as agreed, this transfer of property shall be deemed made by fraud or undue influence under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007. The Maintenance Tribunal may declare this deed void at the option of the Donor. 

THE DONOR FURTHER RESERVES AN ABSOLUTE LIFETIME RIGHT OF RESIDENCE in the property. The Donee shall not sell, mortgage, or create third-party rights during the lifetime of the Donor without written consent."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `MANDATORY BLOOD RELATIVE GIFT DEED REGISTRATION CHECKLIST:
1. Proof of Clear Title: Original Registered Sale Deed or Conveyance Deed of the Donor.
2. Blood Relationship Proof: Birth Certificate of Donee, School Leaving Certificate, or Passport.
3. Senior Citizen Proof: Donor's Aadhaar or PAN card showing age 60 or above.
4. Land Revenue Records: Latest Khata Extract, 7/12 Extract, Patta, and Property Tax Receipts.
5. Encumbrance Certificate (EC): Form 15/16 from the Sub-Registrar Office for past 13 to 30 years.
6. Housing Society NOC: No Objection Certificate from the Cooperative Housing Society or RWA.
7. E-Stamp Paper: Non-judicial e-stamp paper with concessional state duty for blood relatives.
8. Two Independent Witnesses: Government photo IDs of two adult witnesses who are not donees.
9. Biometric Attendance: Physical presence of Donor, Donee, and both witnesses at the SRO.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>TRANSFER OF PROPERTY ACT, 1882 • SENIOR CITIZENS ACT, 2007 (SEC 23)</span>
          </div>

          {/* Strict H1 Tag (Length 46 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Gift Deed Format for Blood Relatives in India
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted gift deed formats for parents, children, and siblings. Learn how to add a{" "}
            <strong>Section 23 maintenance condition</strong> so you keep your home safe, save on stamp duty,
            and decide if a Will works better for your family.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#complete-gift-deed-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Senior-Protected Gift Deed</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Fight-Proof Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS & STATUTORY STRIP
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 122</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TRANSFER OF PROPERTY ACT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 23</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SENIOR CITIZEN REVOCATION POWER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Income Tax</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 56(2)(x) EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% to 1% Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATE BLOOD RELATIVE CONCESSIONS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
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

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Governing Statutes</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 122–126 of the Transfer of Property Act, 1882, Section 17(1)(a) of
                the Filing Act, 1908, Section 56(2)(x) of the Income Tax Act, 1961, and Section 23 of
                the MWPSC Act, 2007 (interpreted in <em>Sudesh Chhikara</em> &amp; <em>Urmila Dixit</em>).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & TEMPLATES
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: GIFT DEED RULES FOR BLOOD RELATIVES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Needed Filing:</strong> You must register every gift deed for land
                    asset at the local SRO office with two witnesses.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Unconditional Trap:</strong> Basic online templates transfer full title right away.
                    If a child stops supporting you, cancelling an unconditional deed is very hard.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 23 Senior Protection:</strong> Adding an express care condition allows
                    elderly parents to cancel the deed through the Maintenance Tribunal if neglected.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Big Stamp Duty Savings:</strong> States like UP, Maharashtra, Punjab, and Haryana offer
                    large discounts on stamp duty for gifts between close family members.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL ASSET: VERIFIED OPEN GRAPH IMAGE BANNER */}
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/gift-deed-format-blood-relatives-india-og.jpg"
                  alt="Gift Deed Format for Blood Relatives in India Legal Templates and Senior Citizen"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900">Senior-Protected Conveyance Framework:</strong> Transfer of
                  Asset Act 1882 compliant format with embedded Maintenance and Lifetime Residence covenants.
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Legal Standard</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: Transfer of Property Act Gift Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A gift deed lets you give asset to a family member during your lifetime. In India,
                  asset gifts follow <strong>Sections 122 to 126 of the Transfer of Property Act, 1882</strong>.
                  Under this law, a valid gift requires four main points:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 text-sm mb-1">1. Voluntary Transfer</div>
                    <div className="text-xs text-slate-600">
                      You must give the asset of your own free will. There must be no force or pressure.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 text-sm mb-1">2. Zero Payment</div>
                    <div className="text-xs text-slate-600">
                      No money can change hands. You give the asset purely out of love and affection.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 text-sm mb-1">3. Timely Acceptance</div>
                    <div className="text-xs text-slate-600">
                      The person getting the gift must accept it while you are alive and capable of giving.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 text-sm mb-1">4. Official Filing</div>
                    <div className="text-xs text-slate-600">
                      You must register the deed at the SRO office in front of two adult witnesses.
                    </div>
                  </div>
                </div>
                <p>
                  You cannot transfer land or a flat by word of mouth. Under Section 123 of the Act, an oral
                  gift of land asset has no legal standing in India.
                </p>
              </div>
            </section>

            {/* SECTION 2: BLOOD RELATIVE DEFINITION & TAX */}
            <section id="blood-relative-definition" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HeartHandshake className="w-4 h-4" />
                <span>TAXATION EXEMPTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Blood Relative Definition &amp; Section 56(2) Tax Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Gifting asset to close relatives has huge tax advantages. Normally, if someone receives
                  asset for free, they must pay income tax on its value under Section 56(2)(x).
                </p>
                <p>
                  However, the law makes an exception for defined relatives. Gifts from close family members are{" "}
                  <strong>100% tax-free</strong>. You pay zero income tax on the gift value. This list of
                  exempt relatives includes:
                </p>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                  <div className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                    Tax-Free Relatives under Section 56(2)(x)
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Husband or wife</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Brothers and sisters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Brothers and sisters of your spouse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Brothers and sisters of either parent</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Parents and grandparents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Children and grandchildren</span>
                    </li>
                  </ul>
                </div>
                <p>
                  Keep in mind that income tax and state stamp duty are different. While income tax is zero, you
                  must still pay local state stamp duty at the time of filing.
                </p>
              </div>
            </section>

            {/* SECTION 3: STATE STAMP DUTY MATRIX */}
            <section id="state-stamp-duty-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STATE REVENUE CONCESSIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. State Stamp Duty Matrix: Concessions for Relatives
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Each state sets its own stamp duty rates. Standard sale deeds usually carry 5% to 7% duty.
                However, many states charge much lower rates when you gift asset to close family members:
              </p>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">State / Area</th>
                      <th className="py-3 px-4 font-bold">Blood Relative Duty</th>
                      <th className="py-3 px-4 font-bold">Regular Duty</th>
                      <th className="py-3 px-4 font-bold">Filing Fee</th>
                      <th className="py-3 px-4 font-bold">Legal Office</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {STATE_DUTY_DATA.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-extrabold text-slate-900">
                          {item.state}
                          <div className="text-[11px] font-normal text-slate-500 mt-0.5">{item.notes}</div>
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-700 bg-emerald-50/40">
                          {item.dutyRateBloodRelative}
                        </td>
                        <td className="py-3 px-4 text-slate-500 line-through">{item.regularDutyRate}</td>
                        <td className="py-3 px-4 text-slate-800">{item.registrationFee}</td>
                        <td className="py-3 px-4 text-[11px] text-slate-600 font-mono">{item.ruleCitation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: THE UNCONDITIONAL DEED TRAP */}
            <section id="the-unconditional-deed-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>LEGAL PITFALL TO AVOID</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The Unconditional Gift Trap: Why Online Deeds Fail
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many elderly parents face serious trouble after gifting a home to their children. They often
                  sign standard deed templates downloaded from the internet.
                </p>
                <div className="rounded-2xl bg-rose-50/80 border border-rose-200 p-5 space-y-3">
                  <div className="font-extrabold text-rose-950 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>The Danger of Unconditional Templates</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                    Generic templates give away complete ownership without conditions. Once filed, the child
                    becomes the sole legal owner. The child can sell the asset, mortgage it, or even ask the
                    parents to leave.
                  </p>
                </div>
                <p>
                  Under Section 126 of the Transfer of Property Act, you cannot cancel a gift deed just because
                  relationships sour. Regular civil court cases take 10 to 15 years. This leaves elderly parents
                  without shelter unless they add legal safeguards beforehand.
                </p>
              </div>
            </section>

            {/* SECTION 5: SECTION 23 SENIOR CITIZENS ACT */}
            <section id="senior-citizen-section-23" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY SAFETY NET</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 23 Senior Citizens Act: Legal Revocation Power
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To protect elderly parents from abandonment, Parliament passed the{" "}
                  <strong>Maintenance and Welfare of Parents and Senior Citizens Act, 2007</strong>.
                  Section 23 of this law gives parents strong legal protection.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                    How Section 23 Protects Parents
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Under Section 23, a senior citizen can transfer asset subject to a condition. The child must
                    promise to provide food, shelter, clothing, and medical care. If the child fails to care for
                    the parent, the law treats the transfer as made by fraud.
                  </p>
                </div>
                <p>
                  This process is fast. Instead of fighting in civil court for years, parents can apply to the
                  local Maintenance Tribunal headed by the Sub-Divisional Magistrate (SDM). The Tribunal can cancel
                  the gift deed and restore the home to the parents.
                </p>
              </div>
            </section>

            {/* SECTION 6: SUPREME COURT PRECEDENTS */}
            <section id="supreme-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LANDMARK JUDGMENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Supreme Court Rulings: Sudesh Chhikara &amp; Urmila Dixit
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Supreme Court has set clear rules for cancelling gift deeds under Section 23:
                </p>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      Sudesh Chhikara v. Ram Anandi (2022 SC)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                      Supreme Court of India
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Supreme Court ruled that the maintenance duty must be written in the gift deed as an express
                    condition. If the deed is unconditional, the Tribunal cannot cancel it. That is why having the
                    right clause is essential.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      Urmila Dixit v. Sunil Sharan Dixit (2025 SC)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Supreme Court 2025
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Court confirmed that parents who keep lifetime residence rights cannot be evicted. If the
                    child denies basic care or attempts eviction, the Tribunal can restore possession to the parents
                    promptly.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: GIFT DEED VS WILL COMPARISON */}
            <section id="gift-deed-vs-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DECISION MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Gift Deed vs Will: Comparison for Indian Families
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before registering a gift deed, ask yourself if a Will is a better option. Here is how they compare:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Key Feature</th>
                      <th className="py-3 px-4 font-bold">Filed Gift Deed</th>
                      <th className="py-3 px-4 font-bold">Filed / Plain Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">When Ownership Changes</td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">Right away upon filing</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Only after death of parent</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Can You Change Your Mind?</td>
                      <td className="py-3 px-4">No, unless Section 23 applies</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Yes, change or revoke anytime</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Stamp Duty Cost</td>
                      <td className="py-3 px-4">Payable upfront (₹200 to 6%)</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Zero stamp duty across India</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Parental Control</td>
                      <td className="py-3 px-4 text-amber-700">Lost; child becomes the owner</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">100% full control retained</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Safe from Child&rsquo;s Debts?</td>
                      <td className="py-3 px-4">No, lenders can attach the home</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Yes, fully protected</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Our Recommendation</td>
                      <td className="py-3 px-4">Only if child needs title today</td>
                      <td className="py-3 px-4 text-emerald-800 font-bold bg-emerald-50">Safest choice for most parents</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: INTERACTIVE CLAUSE CUSTOMIZER */}
            <section id="interactive-clause-customizer" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE UTILITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Free Gift Deed Clause &amp; Stamp Duty Customizer
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your relationship and state below to estimate government charges and build your protective clause:
              </p>

              {/* Customizer Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 border-b border-slate-100">
                  {/* Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Family Relationship
                    </label>
                    <select
                      value={selectedRelation}
                      onChange={(e) => setSelectedRelation(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    >
                      <option value="father-to-son">Father to Son</option>
                      <option value="mother-to-daughter">Mother to Daughter</option>
                      <option value="parents-to-both">Parents to Son &amp; Daughter</option>
                      <option value="grandparent-to-grandchild">Grandparent to Grandchild</option>
                      <option value="brother-to-sister">Brother to Sister</option>
                      <option value="husband-to-wife">Husband to Wife</option>
                    </select>
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      State of Asset
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    >
                      {STATE_DUTY_DATA.map((s) => (
                        <option key={s.state} value={s.state}>
                          {s.state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Valuation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Market / Circle Value (₹)
                    </label>
                    <input
                      type="number"
                      step={500000}
                      value={propertyValuation}
                      onChange={(e) => setPropertyValuation(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    />
                  </div>
                </div>

                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Donor Name (Parent / Giver)</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#C65378]"
                      placeholder="e.g. Rajesh Kumar Sharma"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Donee Name (Child / Receiver)</label>
                    <input
                      type="text"
                      value={doneeName}
                      onChange={(e) => setDoneeName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#C65378]"
                      placeholder="e.g. Amit Sharma"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Safety Clauses to Add
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={includeSection23}
                        onChange={(e) => setIncludeSection23(e.target.checked)}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Section 23 Maintenance Covenant</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={includeResidenceClause}
                        onChange={(e) => setIncludeResidenceClause(e.target.checked)}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Lifetime Right of Residence</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={includeIndemnity}
                        onChange={(e) => setIncludeIndemnity(e.target.checked)}
                        className="rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <span>Indemnity &amp; Good Title Covenant</span>
                    </label>
                  </div>
                </div>

                {/* Computed Stamp Duty Result Bar */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                      Estimated State Government Outgo ({selectedState})
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-950">
                      Stamp Duty: {formatINR(estimated.duty)} + Reg Fee: {formatINR(estimated.reg)}
                    </div>
                    <div className="text-[11px] text-emerald-700">{estimated.label}</div>
                  </div>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                  >
                    {copiedClause ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClause ? "Clause Copied!" : "Copy Protection Clause"}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 9: COMPLETE GIFT DEED FORMAT */}
            <section id="complete-gift-deed-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COMPLETE LEGAL TEMPLATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Senior-Protected Blood Relative Gift Deed Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is the full gift deed draft with built-in Section 23 protections. Click the button to copy
                the text for your word processor:
              </p>

              {/* Template Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-[#172228] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-extrabold">
                      Gift Deed Format: Father / Mother to Son / Daughter
                    </span>
                  </div>
                  <button
                    onClick={copyTemplateToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedTemplate ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedTemplate ? "Copied Entire Deed!" : "Copy Full Deed Format"}</span>
                  </button>
                </div>

                <div className="p-5 sm:p-7 max-h-[550px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed space-y-4 bg-slate-50/60 border-t border-slate-100">
                  <div className="text-center font-bold text-slate-900 uppercase">
                    DEED OF GIFT OF IMMOVABLE PROPERTY BETWEEN BLOOD RELATIVES
                    <br />
                    (WITH RECIPROCAL SECTION 23 SENIOR CITIZENS ACT MAINTENANCE COVENANTS)
                  </div>

                  <p>
                    THIS DEED OF GIFT is made on this [Day] day of [Month], [Year], at [City], by:
                  </p>

                  <p>
                    <strong>DONOR:</strong> Mr./Mrs. {donorName || "[Full Name of Parent/Donor]"}, aged about [Age]{" "}
                    years, residing at [Full Address], PAN: [Donor PAN], Aadhaar: [XXXX-XXXX-XXXX] (hereinafter called
                    the &ldquo;DONOR&rdquo;) OF THE ONE PART;
                  </p>

                  <p className="text-center font-bold">AND</p>

                  <p>
                    <strong>DONEE:</strong> Mr./Mrs. {doneeName || "[Full Name of Child/Donee]"}, aged about [Age]{" "}
                    years, residing at [Full Address], PAN: [Donee PAN], Aadhaar: [XXXX-XXXX-XXXX] (hereinafter called
                    the &ldquo;DONEE&rdquo;) OF THE OTHER PART.
                  </p>

                  <div className="font-bold text-slate-900">WHEREAS:</div>
                  <p>
                    1. The Donor is the absolute owner of the self-acquired home described in the{" "}
                    <strong>SCHEDULE</strong> below.
                  </p>
                  <p>
                    2. The Donor bought the asset vide Filed Sale Deed dated [Date], Paper No. [Doc No.] at
                    SRO [SRO Location].
                  </p>
                  <p>
                    3. The asset is free from all bank loans, liens, or court fights.
                  </p>
                  <p>
                    4. The Donee is the biological child of the Donor, and the Donor holds deep affection for the Donee.
                  </p>

                  <div className="font-bold text-slate-900">NOW THIS DEED WITNESSETH:</div>
                  <p>
                    <strong>1. VOLUNTARY TRANSFER:</strong> The Donor voluntarily gives the Schedule Asset to the
                    Donee without receiving any money.
                  </p>

                  <div className="p-3 bg-rose-50 border-l-2 border-[#C65378] text-slate-900">
                    <strong>2. SECTION 23 MWPSC ACT 2007 MAINTENANCE CONDITION:</strong> This gift is subject to
                    Section 23 of the Senior Citizens Act, 2007. The Donee promises to care for the Donor and spouse
                    for life. The Donee must provide healthy food, clothing, shelter, medical care, and hospital
                    expenses. If the Donee fails or refuses to provide this care, the transfer will be treated as made
                    by fraud. The Donor can then ask the Maintenance Tribunal to declare this gift deed void.
                  </div>

                  <div className="p-3 bg-amber-50 border-l-2 border-amber-600 text-slate-900">
                    <strong>3. RESERVATION OF LIFETIME RIGHT OF RESIDENCE:</strong> The Donor keeps the full right to
                    live in the home for life. The Donee cannot sell, mortgage, or lease the home during the Donor&rsquo;s
                    lifetime without written consent.
                  </div>

                  <p>
                    <strong>4. ACCEPTANCE:</strong> The Donee accepts this gift and agrees to all the care conditions.
                  </p>

                  <p>
                    <strong>SCHEDULE OF PROPERTY:</strong> [Insert Flat No., Plot No., Survey No., Total Square Feet,
                    and Boundaries North/South/East/West].
                  </p>

                  <p className="pt-2">
                    IN WITNESS WHEREOF the parties have signed this Deed in the presence of the witnesses below.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <strong>DONOR:</strong> _____________________
                      <br />({donorName || "Donor"})
                    </div>
                    <div>
                      <strong>DONEE:</strong> _____________________
                      <br />({doneeName || "Donee"})
                    </div>
                  </div>

                  <div className="pt-2">
                    <strong>ATTESTING WITNESSES:</strong>
                    <br />
                    1. Name, Address &amp; Signature: _____________________________________________
                    <br />
                    2. Name, Address &amp; Signature: _____________________________________________
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: SRO REGISTRATION SOP */}
            <section id="sro-registration-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: SRO Filing Protocol
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these clear steps to register your gift deed at the SRO office:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">Check Circle Rates</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Look up the official circle rate on your state revenue portal. Stamp duty is calculated on this
                        government value.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">Buy E-Stamp Paper</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Purchase e-stamp paper through SHCIL or an authorized bank. Make sure to claim the blood
                        relative concession.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">Draft the Deed with Care Clauses</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Print the deed with the Section 23 maintenance condition and lifetime residence clause. Both
                        parties should sign each page.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">Book an SRO Appointment</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Book a time slot online. The parent, child, and two witnesses must visit the office with
                        original Aadhaar and PAN cards.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0">
                      5
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">Complete Biometrics &amp; Collect Deed</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        The registrar takes your photo and thumbprints. Collect the filed deed within a few days,
                        then apply for revenue name change.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: TITLE VERIFICATION CHECKLIST */}
            <section id="title-documents-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRE-REGISTRATION DUE DILIGENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Needed Check Checklist Before Filing
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Make sure you have these key papers ready before visiting the SRO:
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    SRO Paper Package
                  </div>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChecklist ? "Checklist Copied!" : "Copy Checklist"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Original parent purchase deed or conveyance deed</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Proof of family relationship (Passport or school paper)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Encumbrance Paper (EC) for past 13 to 30 years</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Latest asset tax receipt and electricity bill</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Original Aadhaar and PAN cards of Donor and Donee</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Two adult witnesses with government photo IDs</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: REAL-LIFE CASE STUDIES */}
            <section id="real-life-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>PRACTICAL LITIGATION INSIGHTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Real-World Case Studies: Noida, Mumbai &amp; Bangalore
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="text-[11px] font-bold uppercase text-[#C65378] tracking-wider">
                    CASE STUDY 1: NOIDA SECTOR 62
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Unconditional Deed Led to a 4-Year Court Battle
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A retired officer gifted his flat to his son using an online template. Later, the son rented out
                    the flat and locked his father out. Because the deed had no maintenance condition, the SDM could
                    not help. The father had to file a long civil lawsuit.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="text-[11px] font-bold uppercase text-[#5F7E75] tracking-wider">
                    CASE STUDY 2: MUMBAI SUBURBS
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Section 23 Clause Restored Flat in 45 Days
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 72-year-old mother in Mumbai added a Section 23 maintenance condition to her gift deed. When her
                    daughter stopped caring for her, the mother approached the Maintenance Tribunal. The Tribunal
                    cancelled the deed in 45 days and restored her home.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK TO CAPITAL GAINS CALCULATOR */}
            <div className="rounded-3xl bg-gradient-to-r from-[#172228] to-slate-900 text-white p-6 sm:p-7 shadow-md space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-rose-200 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-[#C65378]" />
                <span>FUTURE TAX PLANNING TOOL</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                What Happens When Your Child Sells the Home Later?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                Under Section 49(1) of the Income Tax Act, the child takes over your original purchase price. Under
                Budget 2024 rules, you can compare the <strong>12.5% Flat Tax vs 20% with Indexation</strong>. Use our
                free tool to check future capital gains tax.
              </p>
              <div className="pt-2">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <span>Open Inherited Asset Capital Gains Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* SECTION 13: LEGAL COUNSEL PROFILE */}
            <section id="legal-counsel-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; REVIEW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Senior Estate Legal Team &amp; Lawyer Check
              </h3>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-900">
                      Lawyer Anuj Anand Malik
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate &amp; Conveyancing Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Bar Council of Delhi • Supreme Court &amp; High Court Practitioner
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Specializing in real estate deeds, family settlements, SRO registrations, and senior
                  citizen protections under Section 23 of the Senior Citizens Act, 2007.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Legal Compliance</span>
                  </div>
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Gift Deed Legal Drafting Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Blood Relative Gifts
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; STATUTES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Legal Citations &amp; Official Revenue Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://legislative.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-800">Transfer of Property Act, 1882 (ss. 122–126)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://socialjustice.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-800">Maintenance &amp; Welfare of Senior Citizens Act 2007 (Sec 23)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.indiacode.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-800">Income Tax Act, 1961 (Section 56(2)(x) Relative Rules)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://igrmaharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-800">IGR Maharashtra (Article 34 Blood Relative Concession)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
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

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR PROFILE */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian succession law, Section 23 senior citizen revocations, and family asset
                conveyancing.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* CARD 2: DUAL CTA 1 - DRAFT A WILL INSTEAD */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>PREVENT PREMATURE TITLE LOSS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                Should You Draft a Will Instead of a Gift Deed?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                A Will gives you 100% control, lifetime ownership, and the freedom to change your mind anytime
                without paying stamp duty during your life.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Draft Your Will in 15 Mins</span>
              </button>
              <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Stamp Duty • 100% Revocable</span>
              </div>
            </div>

            {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
            <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                <Building className="w-3 h-3" />
                <span>AMA LEGAL CONVEYANCING DESK</span>
              </div>
              <h4 className="font-black text-slate-900 text-sm leading-snug">
                Need Custom Gift Deed Drafting &amp; SRO Help?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our asset litigators draft watertight Section 23 deeds and manage complete SRO
                e-stamping and physical filing pan-India.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                <span>Schedule Lawyer Talk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* CARD 4: TRUST BADGES */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Why Families Rely on WillDrafting
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court Aligned:</strong> Compliant with <em>Sudesh Chhikara</em> &amp;{" "}
                    <em>Urmila Dixit</em> rulings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>State Concession Optimized:</strong> Explains exact stamp savings in UP, MH, PB, HR,
                    TN, KA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lifetime Residence Protection:</strong> Guarantees parents cannot be evicted.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#complete-gift-deed-format"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Template</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}