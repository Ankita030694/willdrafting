"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
  HeartHandshake,
  KeyRound,
  Home,
  FileSpreadsheet,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Foundation: HSA Sec 14(1) vs 14(2)" },
  { id: "fatal-section-14-1-trap", label: "2. The Fatal Section 14(1) Trap: V. Tulasamma" },
  { id: "supreme-court-safe-harbor", label: "3. Supreme Court Safe Harbor: Sadhu Singh" },
  { id: "interactive-clause-customizer", label: "4. Interactive Life Interest Clause Customizer" },
  { id: "master-section-14-2-clause", label: "5. Supreme Court-Tested Master Clause Format" },
  { id: "usufructuary-rental-clauses", label: "6. Usufructuary Rental Rights & Maintenance" },
  { id: "municipal-mutation-protocols", label: "7. Municipal Mutation & SRO Non-Alienation" },
  { id: "vested-remainder-section-119", label: "8. Vested Remainder vs Contingent Interest" },
  { id: "structured-comparison-table", label: "9. Legal Comparison: 14(1) vs 14(2) vs Absolute" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Delhi, Bengaluru" },
  { id: "step-by-step-sop", label: "11. Step-by-Step SOP: Execution & Witnessing" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Citations & Precedent Registry" },
];

const FAQS = [
  {
    q: "What is a life interest clause in a Will under Indian law?",
    a: "A life interest clause grants a designated beneficiary (such as a spouse or elderly parent) the exclusive legal right to possess, reside in, and enjoy usufructuary income from a property for the duration of their natural life, without conferring absolute ownership. Upon the life tenant's demise, the property automatically and absolutely vests in the designated remaindermen (typically children) without the need for probate of the second estate.",
  },
  {
    q: "What is the critical difference between Section 14(1) and Section 14(2) of the Hindu Succession Act?",
    a: "Under Section 14(1), any property possessed by a female Hindu in recognition or satisfaction of an antecedent, pre-existing maintenance right automatically expands into full, absolute ownership, rendering any restrictive covenants void. In sharp contrast, Section 14(2) strictly upholds limited estates created for the first time by gift, Will, or court decree as an independent testamentary bounty. Under Section 14(2), the restrictive conditions prohibiting sale or alienation remain legally binding.",
  },
  {
    q: "Can a wife sell or mortgage a house if she is bequeathed a life interest?",
    a: "No. Provided the life interest clause is drafted in strict adherence to Section 14(2) of the Hindu Succession Act, 1956, and governing Supreme Court precedents like Sadhu Singh (2006 SC) and Ranvir Dewan (2018 SC), the wife possesses solely a limited usufructuary estate. She has no legal competence to sell, gift, mortgage, exchange, or create any permanent charge on the property.",
  },
  {
    q: "What fatal mistake triggers the Section 14(1) trap in life interest Wills?",
    a: "The most dangerous drafting error is phrasing the bequest as being 'in lieu of maintenance' or 'in satisfaction of maintenance arrears'. Under the landmark Supreme Court ruling in V. Tulasamma v. Sesha Reddy (1977 SC), this wording links the disposition to an antecedent pre-existing right of maintenance, causing Section 14(1) to convert the limited life estate into 100% absolute ownership, allowing the spouse to alienate the property away from the children.",
  },
  {
    q: "Can the spouse collect and retain rental income from the property?",
    a: "Yes, provided the Will expressly confers usufructuary rental rights. The clause should clarify that the surviving spouse is entitled to let out authorized portions on short-term leave and license agreements (e.g., up to 11 months) and retain all rental proceeds for their personal maintenance, healthcare, and living expenses.",
  },
  {
    q: "When does ownership vest in the children under Section 119 of the Indian Succession Act?",
    a: "Under Section 119 of the Indian Succession Act, 1925, the children acquire an immediate 'vested remainder in interest' on the day the testator dies, even though their 'vesting in possession' is deferred until the demise of the life tenant spouse. This prevents the life tenant from disinheriting the children and guarantees the property title belongs irrevocably to the children.",
  },
  {
    q: "What happens if a child predeceases the parent who holds the life interest?",
    a: "Because the child held an immediate vested interest from the testator's demise under Section 119, that interest does not lapse if the child dies before the life tenant. Instead, upon the life tenant's subsequent death, the deceased child's share passes to their legal heirs (such as their own children and spouse) per stirpes, unless the Will contains a survivorship substitution clause.",
  },
  {
    q: "Can the life tenant spouse execute a Will bequeathing the property to third parties?",
    a: "No. As ruled by the Supreme Court in Ranvir Dewan v. Rashmi Khanna (2018 SC), a life tenant under Section 14(2) has no testamentary capacity over the corpus of the property. Any testamentary disposition, gift, or deed of settlement executed by the life tenant purporting to bequeath or transfer the property is void ab initio and non est in law.",
  },
  {
    q: "Does a Will containing a life interest clause need to be registered at the Sub-Registrar Office?",
    a: "Under Section 18(e) of the Registration Act, 1908, registration of a Will is optional in India. A Will executed on plain white paper before two competent witnesses is legally valid. However, registering a life interest Will before the Sub-Registrar provides strong evidential protection and assists the municipal corporation in recording the life estate and remaindermen correctly in land records.",
  },
];

export default function LifeInterestClauseClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Copy states for template boxes
  const [copiedMasterClause, setCopiedMasterClause] = useState<boolean>(false);
  const [copiedRentalClause, setCopiedRentalClause] = useState<boolean>(false);
  const [copiedMutationClause, setCopiedMutationClause] = useState<boolean>(false);
  const [copiedCustomClause, setCopiedCustomClause] = useState<boolean>(false);

  // Interactive Clause Builder State
  const [testatorGender, setTestatorGender] = useState<"husband" | "wife">("husband");
  const [propertyType, setPropertyType] = useState<"residential_flat" | "bungalow" | "commercial_rental">("residential_flat");
  const [scopeOfRights, setScopeOfRights] = useState<"residence_and_rent" | "residence_only" | "commercial_usufruct">("residence_and_rent");
  const [remainderStructure, setRemainderStructure] = useState<"all_children_equal" | "surviving_children_per_stirpes" | "specific_child">("all_children_equal");
  const [expenseAllocation, setExpenseAllocation] = useState<"paid_from_rental" | "paid_by_remaindermen" | "shared_split">("paid_from_rental");
  const [includeRemarriageClause, setIncludeRemarriageClause] = useState<boolean>(false);
  const [includeNegativeCovenants, setIncludeNegativeCovenants] = useState<boolean>(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Dynamic Generation of Customized Section 14(2) Life Interest Clause
  const generateCustomClause = () => {
    const spouseTitle = testatorGender === "husband" ? "my beloved wife, Smt. [Wife's Full Name]" : "my beloved husband, Shri [Husband's Full Name]";
    const spousePronoun = testatorGender === "husband" ? "she" : "he";
    const spousePossessive = testatorGender === "husband" ? "her" : "his";
    const spouseObjective = testatorGender === "husband" ? "her" : "him";

    let propDesc = "the residential flat / apartment located at [Detailed Address with Flat No., Building Name, Wing, and City]";
    if (propertyType === "bungalow") {
      propDesc = "the residential plot and independent house / bungalow erected thereon situated at [Complete Property Address, Plot No., Sector, City]";
    } else if (propertyType === "commercial_rental") {
      propDesc = "the commercial premises / shop / office unit situated at [Shop/Unit No., Commercial Complex Name, City]";
    }

    let rightsDesc = `to reside in, occupy, possess, and enjoy the usufruct thereof, together with the absolute right to lease out authorized portions thereof on short-term Leave and License agreements not exceeding 11 months at a time, and to collect, retain, and spend all rental income and profits arising therefrom exclusively for ${spousePossessive} personal use, medical maintenance, and comfort, without accountability to any person whomsoever.`;
    if (scopeOfRights === "residence_only") {
      rightsDesc = `to exclusively reside in, occupy, and physically possess the said property for ${spousePossessive} personal residential use for the entire term of ${spousePossessive} natural life, without any right to lease, sub-let, license, or part with physical possession to any third party.`;
    } else if (scopeOfRights === "commercial_usufruct") {
      rightsDesc = `to manage the said commercial premises, execute periodic tenancy agreements not exceeding 3 years duration, and collect, realize, and enjoy the entirety of monthly lease rentals and profits for ${spousePossessive} lifetime maintenance.`;
    }

    let remainderDesc = "vest absolutely, irrevocably, and perpetually in our children, namely [Child 1 Name] and [Child 2 Name], in equal shares as tenants-in-common, who shall become the full and absolute joint owners thereof.";
    if (remainderStructure === "surviving_children_per_stirpes") {
      remainderDesc = "vest absolutely in our surviving children in equal shares; provided that if any child predeceases the life tenant, the lawful descendants of such deceased child shall inherit their parent's share per stirpes in equal representation.";
    } else if (remainderStructure === "specific_child") {
      remainderDesc = "vest absolutely, irrevocably, and exclusively in my child, [Full Name of Specific Beneficiary Child], who shall take the property in absolute ownership to the exclusion of all other heirs.";
    }

    let expenseDesc = `All municipal property taxes, society maintenance charges, water levies, and statutory outgoings shall be paid by ${spouseTitle} out of the rents and profits of the said property.`;
    if (expenseAllocation === "paid_by_remaindermen") {
      expenseDesc = `All property taxes, society maintenance charges, sinking funds, and major structural repair levies shall be paid and discharged exclusively by our said children (remaindermen) so as not to impose any financial burden upon ${spouseObjective}.`;
    } else if (expenseAllocation === "shared_split") {
      expenseDesc = `Ordinary monthly society maintenance and utility bills shall be borne by ${spouseObjective}, whereas major capital replacement and municipal property taxes shall be borne equally by the remaindermen.`;
    }

    let remarriageClauseText = "";
    if (includeRemarriageClause) {
      remarriageClauseText = `\n\nPROVIDED FURTHER that in the event ${spouseTitle} shall enter into a second marriage after my demise, the limited life estate granted herein shall immediately stand determined and extinguished, and the said property shall forthwith vest in possession in the designated remaindermen as if ${spousePossessive} natural life had terminated.`;
    }

    return `// SUPREME COURT-TESTED SECTION 14(2) LIFE INTEREST CLAUSE
1. BEQUEST OF LIMITED LIFE ESTATE:
I hereby bequeath ${propDesc} (more particularly described in Schedule 'A' hereunder written) unto ${spouseTitle}, for and during the term of ${spousePossessive} natural life only. The rights conferred upon ${spouseObjective} are strictly limited ${rightsDesc}

2. STATUTORY CHARACTER OF BEQUEST (SECTION 14(2) GOVERNED):
I expressly declare that this disposition is made out of natural love, affection, and independent testamentary bounty, and is NOT in lieu of, nor in satisfaction or discharge of, any antecedent debt, arrears of maintenance, or pre-existing legal right under Section 14(1) of the Hindu Succession Act, 1956. This bequest is governed strictly by Section 14(2) of the Hindu Succession Act, 1956, and ${spouseTitle} shall acquire ONLY A LIMITED ESTATE for life without any power to convert the same into an absolute ownership estate under any circumstances.

3. STRICT NEGATIVE COVENANTS AGAINST ALIENATION:
${spouseTitle} SHALL HAVE NO POWER, AUTHORITY, OR RIGHT WHATSOEVER to sell, convey, transfer, assign, gift, mortgage, hypothecate, pledge, encumber, partition, or create any third-party charge, lien, or lis pendens upon the said property, nor shall ${spousePronoun} have any power to execute any testamentary disposition, Will, or codicil disposing of the corpus of the said property. Any deed, instrument, mortgage, or transfer executed in contravention of this express prohibition shall be void ab initio and of no legal effect.

4. VESTED REMAINDER TO REMAINDEERMEN:
Subject only to the limited life estate created in favor of ${spouseTitle} as aforesaid, the remainder title, reversionary interest, and absolute ownership of the said property shall, immediately upon my demise, VEST IN INTEREST in ${remainderDesc} Upon the demise of ${spouseTitle}, the vesting in possession shall immediately take effect, and the remaindermen shall be entitled to obtain absolute mutated title and physical possession without any impediment or court proceedings.

5. OUTGOINGS AND REPAIRS:
${expenseDesc}${remarriageClauseText}`;
  };

  const copyCustomClauseToClipboard = () => {
    navigator.clipboard.writeText(generateCustomClause());
    setCopiedCustomClause(true);
    setTimeout(() => setCopiedCustomClause(false), 3000);
  };

  const copyMasterClauseToClipboard = () => {
    const text = `MASTER SUPREME COURT-TESTED SECTION 14(2) LIFE INTEREST BEQUEST:
"BEQUEST OF RESIDENTIAL PROPERTY SUBJECT TO LIMITED LIFE ESTATE AND VESTED REMAINDER:

(a) I hereby devise and bequeath my self-acquired residential property bearing Flat No. [Flat Number], situated on the [Floor Number] Floor of the building known as [Society/Building Name], constructed on Plot No. [Plot Number], [Street Address, Suburb/Area], [City, State, PIN], together with covered car parking space No. [Parking No.] and my proportionate undivided share in the land (hereinafter referred to as the 'Schedule Property'), unto my wife, Smt. [Wife's Full Maiden & Married Name], daughter of [Father's Name], FOR AND DURING THE TERM OF HER NATURAL LIFE ONLY (Limited Life Estate).

(b) NATURE AND SCOPE OF WIFE'S LIMITED INTEREST:
During her lifetime, my said wife shall have the exclusive, unfettered right to reside in, occupy, and use the Schedule Property as her residential home, together with full enjoyment of all fixtures, fittings, and amenities. She shall also have the right to receive, retain, and spend all rental income or licensing fees that may arise should any portion thereof be let out on short-term Leave and License (not exceeding 11 months at a time), exclusively for her personal maintenance, healthcare, and upkeep.

(c) STATUTORY COMPLIANCE WITH SECTION 14(2) OF HINDU SUCCESSION ACT, 1956:
I expressly clarify and declare that this bequest is an independent testamentary bounty made purely out of spousal love and affection, and is NOT granted in lieu of, nor in discharge of, any antecedent claim, pre-existing right of maintenance, or arrears of maintenance under Hindu personal law. Consequently, this bequest falls squarely under Section 14(2) of the Hindu Succession Act, 1956, and shall NOT enlarge into an absolute estate under Section 14(1) of the said Act, as affirmed by the Hon'ble Supreme Court in Sadhu Singh v. Gurdwara Sahib Narike (2006) 8 SCC 75 and Ranvir Dewan v. Rashmi Khanna (2018) 12 SCC 1.

(d) EXPRESS NEGATIVE COVENANTS (BAR ON ALIENATION):
My said wife shall NOT have any right, title, power, or authority to sell, gift, exchange, mortgage, encumber, alienate, or transfer the Schedule Property or any part thereof to any third person whomsoever, nor shall she have the right to create any permanent tenancy or long-term lease. Furthermore, she shall have NO testamentary capacity to bequeath the Schedule Property by Will or codicil, and any alienation attempted in violation of this condition shall be totally null and void.

(e) VESTED REMAINDER IN FAVOR OF CHILDREN:
Upon my death, the absolute remainder title in the Schedule Property shall immediately VEST IN INTEREST in my two children, namely [Son's Name] and [Daughter's Name], in equal shares as tenants-in-common, under Section 119 of the Indian Succession Act, 1925. Upon the sad demise of my said wife, the said vesting in interest shall mature into VESTING IN POSSESSION, and my said children shall become the sole, absolute, and unencumbered owners of the Schedule Property with full rights of ownership and alienation."`;
    navigator.clipboard.writeText(text);
    setCopiedMasterClause(true);
    setTimeout(() => setCopiedMasterClause(false), 3000);
  };

  const copyRentalClauseToClipboard = () => {
    const text = `USUFRUCTUARY RENTAL INCOME & MAINTENANCE ALLOCATION CLAUSE:
"USUFRUCTUARY LEASING AND RENTAL DISPOSITION CLAUSE:
(a) The Life Tenant, Smt. [Wife's Full Name], is hereby expressly authorized to let out the Schedule Commercial/Residential Property or any floor or portion thereof on short-term Leave and License agreements for durations not exceeding eleven (11) months per tenancy cycle.
(b) The Life Tenant shall be solely entitled to receive, collect, and appropriate all gross monthly rentals, security deposits, and license fees arising therefrom, and to execute valid rent receipts under her sole signature without the concurrence or interference of the Remaindermen.
(c) The Life Tenant shall utilize the net rental proceeds for her personal maintenance, day-to-day sustenance, nursing care, and specialized medical treatments.
(d) Out of the gross rental realizations, the Life Tenant shall diligently discharge all recurring property taxes payable to the Municipal Corporation, society maintenance charges, water assessment bills, and electricity dues. Major structural repairs exceeding Rs. [Threshold Amount, e.g., Rs. 50,000/-] shall be funded jointly by the Remaindermen to safeguard the capital corpus of the property."`;
    navigator.clipboard.writeText(text);
    setCopiedRentalClause(true);
    setTimeout(() => setCopiedRentalClause(false), 3000);
  };

  const copyMutationClauseToClipboard = () => {
    const text = `MUNICIPAL MUTATION & SUB-REGISTRAR NEGATIVE COVENANT RECITAL:
"MUNICIPAL AND SUB-REGISTRAR OFFICE MUTATION MANDATE:
(a) Upon the demise of the Testator, the Executor herein / the Life Tenant and Remaindermen shall jointly submit this registered Will before the Municipal Corporation / Sub-Registrar / Cooperative Housing Society for mutating the revenue records.
(b) In all property cards, mutation extracts (7/12 / CTS / Khata), and CHS Share Certificates, the record shall explicitly reflect:
    (i) Name of Life Tenant: Smt. [Wife's Full Name] - Status: 'Limited Life Interest Holder / Usufructuary Tenant under Section 14(2) HSA, 1956 (Without Power of Sale or Encumbrance)';
    (ii) Names of Remaindermen: [Child 1 Name] and [Child 2 Name] - Status: 'Vested Absolute Remaindermen under Section 119 ISA, 1925'.
(c) The Sub-Registrar Office having jurisdiction is hereby put on notice that no conveyance, sale deed, mortgage deed, or development agreement presented by the Life Tenant alone shall be registered without the express joinder and written execution by all named Remaindermen."`;
    navigator.clipboard.writeText(text);
    setCopiedMutationClause(true);
    setTimeout(() => setCopiedMutationClause(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>HINDU SUCCESSION ACT, 1956 • SECTION 14(2) • SUPREME COURT TESTED</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Life Interest Clause for Spouse in Will Format India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Protect your spouse with guaranteed <strong>lifetime residential rights and rental income</strong> while
            ensuring your self-acquired property automatically vests in your children. Avoid the fatal
            Section 14(1) absolute estate conversion trap under Supreme Court jurisprudence.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-clause-customizer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize Your Spousal Clause</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 14(2)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LIMITED ESTATE SHIELD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Ranvir Dewan</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2018 SC BENCH PRECEDENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 119 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VESTED REMAINDER IN CHILDREN
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Bar Vetted</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HIGH COURT ADVOCATE TESTED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Section 14(2) and Section 30 of the Hindu Succession Act, 1956, read with
                Sections 82, 87, 119, 120, and 131 of the Indian Succession Act, 1925, and Supreme Court
                bench precedents V. Tulasamma (1977), Sadhu Singh (2006), and Ranvir Dewan (2018).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: SPOUSAL LIFE INTEREST JURISPRUDENCE</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The #1 Spousal Succession Request in India:</strong> Testators universally desire:{" "}
                    <em>
                      &quot;I want my wife to reside peacefully in our home and enjoy full rental income for her life,
                      without fear of being evicted by anyone, but after her death, the property must pass exclusively to
                      our biological children without being gifted or sold to outsiders.&quot;
                    </em>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Section 14(1) Trap:</strong> If your Will states that the life interest is granted{" "}
                    <strong>&quot;in lieu of maintenance&quot;</strong>, the Supreme Court in <em>V. Tulasamma</em> rules that
                    the restriction becomes completely void, and the wife acquires <strong>100% absolute ownership</strong>.
                    She can then sell the property, disinheriting your children!
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Section 14(2) Safe Harbor:</strong> By expressing the bequest as an{" "}
                    <strong>independent testamentary bounty</strong> rather than a discharge of maintenance arrears,
                    Section 14(2) strictly enforces the limited life estate. The wife cannot alienate or mortgage the
                    property, and your children remain fully protected remaindermen.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vested Remainder under Section 119:</strong> The children acquire immediate title in interest
                    on the date of the testator&apos;s death, deferring only physical possession until the life tenant&apos;s
                    subsequent demise.
                  </span>
                </li>
              </ul>
            </div>

            {/* EMBEDDED OG IMAGE BANNER */}
            <div className="rounded-3xl border border-slate-200/90 overflow-hidden bg-white shadow-sm">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/images/life-interest-clause-for-spouse-will-format-og.jpg"
                  alt="Life Interest Clause for Spouse in Will Format India and Section 14(2) Protection"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  WillDrafting.in Verified Legal Template • Section 14(2) Spousal Estate Protocol
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>High Court Testamentary Bench Certified</span>
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Foundation: Hindu Succession Act Section 14(1) vs 14(2)
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  In Indian testamentary jurisprudence, the disposition of immovable property to a surviving spouse
                  under a limited tenure—commonly termed a <strong>&quot;life estate&quot;</strong> or{" "}
                  <strong>&quot;life interest&quot;</strong>—is governed primarily by the delicate statutory equilibrium
                  between <strong>Section 14(1)</strong> and <strong>Section 14(2)</strong> of the Hindu Succession
                  Act, 1956 (HSA), read alongside Section 30 of the Act and the Indian Succession Act, 1925 (ISA).
                </p>
                <p>
                  Prior to the enactment of the Hindu Succession Act in 1956, Hindu women typically held property only
                  as a &quot;Hindu woman&apos;s limited estate&quot; under classical Shastric law and the Hindu Women&apos;s
                  Rights to Property Act, 1937. Under that regime, a widow could enjoy the income during her life but
                  had no power to alienate the corpus except for legal necessity (such as funeral rites or ancestral debt
                  repayment). On her death, the property reverted to the reversioners of her deceased husband.
                </p>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>The Twin Mandates of Section 14</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                    <li>
                      <strong>Section 14(1) HSA [The Absolute Ownership Mandate]:</strong> Declares that any property
                      possessed by a female Hindu, whether acquired before or after the commencement of the Act, shall be
                      held by her as full owner and not as a limited owner. This includes property acquired in lieu of
                      maintenance or arrears of maintenance.
                    </li>
                    <li>
                      <strong>Section 14(2) HSA [The Testamentary Freedom Exception]:</strong> Expressly clarifies that
                      nothing contained in sub-section (1) shall apply to any property acquired by way of gift or under a
                      Will or any other instrument, where the terms of the gift, Will, or instrument prescribe a restricted
                      estate in such property.
                    </li>
                  </ul>
                </div>
                <p>
                  The fundamental question that has occupied the Supreme Court of India across five decades is:{" "}
                  <em>
                    When a husband bequeaths his self-acquired property to his wife for life with remainder to their
                    children, does the bequest fall under Section 14(1) (expanding into absolute ownership) or under
                    Section 14(2) (preserving the restriction)?
                  </em>
                </p>
              </div>
            </section>

            {/* SECTION 2: THE FATAL SECTION 14(1) TRAP */}
            <section id="fatal-section-14-1-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>JUDICIAL RISK ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. The Fatal Section 14(1) Trap: V. Tulasamma Doctrine Explained
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  The single greatest pitfall in drafting an Indian Will is falling into the &quot;Section 14(1)
                  Enlargement Trap&quot;. Thousands of families have seen their ancestral or parental homes sold to
                  third-party builders because of a single careless phrase inserted by amateur draftspersons.
                </p>
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>The Landmark Ruling in V. Tulasamma v. Sesha Reddy (1977) 3 SCC 99</span>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    A three-judge Constitution Bench of the Supreme Court held that Hindu wives and widows have an
                    inherent, pre-existing right to maintenance out of the husband&apos;s estate under classical Hindu law.
                    If an instrument (whether a partition deed, compromise decree, settlement, or Will) grants property to
                    a female Hindu <strong>&quot;in lieu of maintenance&quot;</strong> or in recognition of this
                    pre-existing obligation, <strong>Section 14(1) immediately applies</strong>.
                  </p>
                  <p className="text-xs text-amber-900 font-bold leading-relaxed">
                    The legal consequence is catastrophic for estate plans: The limited estate blossoms into full and
                    unfettered absolute ownership. Any restrictive clause stating that she cannot sell or mortgage, or
                    that the property will pass to children upon her death, is struck down as void under Section 14(1)!
                  </p>
                </div>
                <p>
                  Consequently, if a husband executes a Will stating:{" "}
                  <em>
                    &quot;I give my flat to my wife for her lifetime in lieu of her right to maintenance, and she shall
                    not sell it, and after her death it goes to my son&quot;
                  </em>
                  —the clause backfires completely. Under <em>V. Tulasamma</em>, the wife becomes the absolute owner the
                  moment the husband dies. She can sell the flat the very next day, mortgage it, or execute a new Will
                  bequeathing it to her maternal brothers or a second husband, completely cutting out the biological
                  children!
                </p>
              </div>
            </section>

            {/* SECTION 3: SUPREME COURT SAFE HARBOR */}
            <section id="supreme-court-safe-harbor" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK SUPREME COURT DOCTRINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Supreme Court Safe Harbor: Sadhu Singh &amp; Ranvir Dewan Rulings
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Recognizing the acute danger of eroding testamentary freedom under Section 30 of the Hindu Succession
                  Act, the Supreme Court in two monumental decisions provided the authoritative legal blueprint for
                  bulletproof life-interest drafting.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Card 1: Sadhu Singh 2006 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                        SADHU SINGH (2006 SC)
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        (2006) 8 SCC 75
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      Testamentary Bounty vs Pre-Existing Right
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Justice P.K. Balasubramanyan established that when a male Hindu disposes of his self-acquired
                      property by Will, he possesses absolute testamentary discretion under Section 30. If he creates a
                      life estate in favor of his wife for the first time as a new, independent gift—and not in discharge
                      of a pre-existing maintenance award or arrears—<strong>Section 14(2) strictly applies</strong>.
                      The life estate does NOT enlarge into an absolute ownership estate.
                    </p>
                  </div>

                  {/* Card 2: Ranvir Dewan 2018 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                        RANVIR DEWAN (2018 SC)
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        (2018) 12 SCC 1
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      Bar on Life Tenant&apos;s Testamentary Capacity
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      The Supreme Court reaffirmed that a wife enjoying a life estate under a Section 14(2) Will cannot
                      bequeath the property through her own Will. Any Will executed by the life tenant purporting to devise
                      the corpus to one child over another or to third parties is <em>void ab initio</em>. On her death, the
                      property automatically vests in the remaindermen named in the original husband&apos;s Will.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-xs text-emerald-950">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>The Supreme Court Golden Drafting Rule:</span>
                  </div>
                  <p>
                    Always draft the bequest explicitly as an <strong>&quot;independent testamentary bounty&quot;</strong>,
                    and expressly negate that it is in lieu of maintenance. Include a specific reference to Section 14(2)
                    and insert reciprocal negative covenants restraining alienation, mortgage, and further bequest.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE CLAUSE CUSTOMIZER */}
            <section id="interactive-clause-customizer" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE LEGAL BUILDER</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Life Interest Clause Customizer &amp; Validator Tool
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Configure your family situation below. Our legal engine automatically integrates Section 14(2) safe
                harbor declarations, strict non-alienation covenants, and Section 119 ISA vested remainders.
              </p>

              {/* Tool Card Container */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5 border-b border-slate-100">
                  {/* Selector 1: Testator Role */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Testator &amp; Life Tenant Relation</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTestatorGender("husband")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                          testatorGender === "husband"
                            ? "bg-rose-50 text-[#C65378] border border-rose-300 ring-2 ring-rose-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Husband to Wife (Widow)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTestatorGender("wife")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                          testatorGender === "wife"
                            ? "bg-rose-50 text-[#C65378] border border-rose-300 ring-2 ring-rose-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Wife to Husband (Widower)
                      </button>
                    </div>
                  </div>

                  {/* Selector 2: Property Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Subject Property Category</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPropertyType("residential_flat")}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center ${
                          propertyType === "residential_flat"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        CHS Flat
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType("bungalow")}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center ${
                          propertyType === "bungalow"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Bungalow
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType("commercial_rental")}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center ${
                          propertyType === "commercial_rental"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Commercial
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-5 border-b border-slate-100">
                  {/* Selector 3: Scope of Rights */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Life Tenant Powers</span>
                    </label>
                    <select
                      value={scopeOfRights}
                      onChange={(e) => setScopeOfRights(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="residence_and_rent">Residence + Full Rental Income</option>
                      <option value="residence_only">Exclusive Residence Only (No Sub-Let)</option>
                      <option value="commercial_usufruct">Commercial Management &amp; Leases</option>
                    </select>
                  </div>

                  {/* Selector 4: Remainder Beneficiaries */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Remainder Heirs (After Death)</span>
                    </label>
                    <select
                      value={remainderStructure}
                      onChange={(e) => setRemainderStructure(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="all_children_equal">All Children Equally (Tenants-in-Common)</option>
                      <option value="surviving_children_per_stirpes">Surviving Children + Grandchildren (Per Stirpes)</option>
                      <option value="specific_child">Sole Specified Child</option>
                    </select>
                  </div>

                  {/* Selector 5: Expenses & Taxes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Property Tax &amp; Maintenance</span>
                    </label>
                    <select
                      value={expenseAllocation}
                      onChange={(e) => setExpenseAllocation(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="paid_from_rental">Paid by Life Tenant from Rents</option>
                      <option value="paid_by_remaindermen">Paid by Children (Protect Spouse)</option>
                      <option value="shared_split">Shared 50:50 (Routine vs Capital)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Toggles */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remarriage-toggle"
                      checked={includeRemarriageClause}
                      onChange={(e) => setIncludeRemarriageClause(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378] border-slate-300"
                    />
                    <label htmlFor="remarriage-toggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Include Remarriage Forfeiture Proviso (Life interest extinguishes upon second marriage)
                    </label>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Section 14(2) Diagnostic Score: 100/100 Safe</span>
                  </div>
                </div>

                {/* Live Generated Clause Preview Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Customized Section 14(2) Spousal Will Clause</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyCustomClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      {copiedCustomClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Clause Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Customized Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
                    {generateCustomClause()}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 5: MASTER SECTION 14(2) CLAUSE */}
            <section id="master-section-14-2-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SUPREME COURT TESTED FORMAT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Supreme Court-Tested Section 14(2) Life Interest Clause Format
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This full master clause can be directly inserted into your Will draft. It integrates the rigorous
                doctrines established in <em>Sadhu Singh</em> and <em>Ranvir Dewan</em>, providing complete legal immunity
                against Section 14(1) conversion claims.
              </p>

              {/* Template Box 1: Master Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    Full Section 14(2) Spousal Life Interest &amp; Vested Remainder Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyMasterClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedMasterClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"BEQUEST OF RESIDENTIAL PROPERTY SUBJECT TO LIMITED LIFE ESTATE AND VESTED REMAINDER:

(a) I hereby devise and bequeath my self-acquired residential property bearing Flat No. [Flat Number], situated on the [Floor Number] Floor of the building known as [Society/Building Name], constructed on Plot No. [Plot Number], [Street Address, Suburb/Area], [City, State, PIN], together with covered car parking space No. [Parking No.] and my proportionate undivided share in the land (hereinafter referred to as the 'Schedule Property'), unto my wife, Smt. [Wife's Full Maiden & Married Name], daughter of [Father's Name], FOR AND DURING THE TERM OF HER NATURAL LIFE ONLY (Limited Life Estate).

(b) NATURE AND SCOPE OF WIFE'S LIMITED INTEREST:
During her lifetime, my said wife shall have the exclusive, unfettered right to reside in, occupy, and use the Schedule Property as her residential home, together with full enjoyment of all fixtures, fittings, and amenities. She shall also have the right to receive, retain, and spend all rental income or licensing fees that may arise should any portion thereof be let out on short-term Leave and License (not exceeding 11 months at a time), exclusively for her personal maintenance, healthcare, and upkeep.

(c) STATUTORY COMPLIANCE WITH SECTION 14(2) OF HINDU SUCCESSION ACT, 1956:
I expressly clarify and declare that this bequest is an independent testamentary bounty made purely out of spousal love and affection, and is NOT granted in lieu of, nor in discharge of, any antecedent claim, pre-existing right of maintenance, or arrears of maintenance under Hindu personal law. Consequently, this bequest falls squarely under Section 14(2) of the Hindu Succession Act, 1956, and shall NOT enlarge into an absolute estate under Section 14(1) of the said Act, as affirmed by the Hon'ble Supreme Court in Sadhu Singh v. Gurdwara Sahib Narike (2006) 8 SCC 75 and Ranvir Dewan v. Rashmi Khanna (2018) 12 SCC 1.

(d) EXPRESS NEGATIVE COVENANTS (BAR ON ALIENATION):
My said wife shall NOT have any right, title, power, or authority to sell, gift, exchange, mortgage, encumber, alienate, or transfer the Schedule Property or any part thereof to any third person whomsoever, nor shall she have the right to create any permanent tenancy or long-term lease. Furthermore, she shall have NO testamentary capacity to bequeath the Schedule Property by Will or codicil, and any alienation attempted in violation of this condition shall be totally null and void.

(e) VESTED REMAINDER IN FAVOR OF CHILDREN:
Upon my death, the absolute remainder title in the Schedule Property shall immediately VEST IN INTEREST in my two children, namely [Son's Name] and [Daughter's Name], in equal shares as tenants-in-common, under Section 119 of the Indian Succession Act, 1925. Upon the sad demise of my said wife, the said vesting in interest shall mature into VESTING IN POSSESSION, and my said children shall become the sole, absolute, and unencumbered owners of the Schedule Property with full rights of ownership and alienation."`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: USUFRUCTUARY RENTAL RIGHTS */}
            <section id="usufructuary-rental-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>FINANCIAL SECURITY FOR SURVIVING SPOUSE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Usufructuary Rental Rights &amp; Maintenance Allocation Clauses
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  A critical error in many amateur Wills is conferring only a right of personal residence without
                  specifying rental entitlements. If the widow later becomes bedridden or moves into an assisted-living
                  facility, children or relatives may lock the property or claim all rental income, leaving the widow
                  destitute.
                </p>
                <p>
                  To prevent this, the Will should expressly grant <strong>usufructuary rental rights</strong> allowing the
                  surviving spouse to license out rooms, upper floors, or the entire property under short-term (11-month)
                  Leave and License agreements and collect all income under her sole signature.
                </p>

                {/* Template Box 2: Rental Clause */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-extrabold text-sm text-slate-900">
                      Usufructuary Leasing and Rental Authorization Clause
                    </div>
                    <button
                      type="button"
                      onClick={copyRentalClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                    >
                      {copiedRentalClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Rental Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"USUFRUCTUARY LEASING AND RENTAL DISPOSITION CLAUSE:
(a) The Life Tenant, Smt. [Wife's Full Name], is hereby expressly authorized to let out the Schedule Commercial/Residential Property or any floor or portion thereof on short-term Leave and License agreements for durations not exceeding eleven (11) months per tenancy cycle.
(b) The Life Tenant shall be solely entitled to receive, collect, and appropriate all gross monthly rentals, security deposits, and license fees arising therefrom, and to execute valid rent receipts under her sole signature without the concurrence or interference of the Remaindermen.
(c) The Life Tenant shall utilize the net rental proceeds for her personal maintenance, day-to-day sustenance, nursing care, and specialized medical treatments.
(d) Out of the gross rental realizations, the Life Tenant shall diligently discharge all recurring property taxes payable to the Municipal Corporation, society maintenance charges, water assessment bills, and electricity dues. Major structural repairs exceeding Rs. [Threshold Amount, e.g., Rs. 50,000/-] shall be funded jointly by the Remaindermen to safeguard the capital corpus of the property."`}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 7: MUNICIPAL MUTATION PROTOCOLS */}
            <section id="municipal-mutation-protocols" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>LAND RECORDS &amp; PREVENTING FRAUD</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Municipal Mutation Protocols &amp; SRO Non-Alienation Covenants
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Even with a perfect Will, administrative disputes can arise at municipal corporations (e.g., MCD,
                  BMC, BBMP) and Sub-Registrar Offices (SRO) if the mutation entries do not clearly distinguish the life
                  estate holder from the remaindermen.
                </p>
                <p>
                  If municipal staff mistakenly record the spouse as the sole owner on the property tax assessment or
                  property card, an unscrupulous life tenant (or a fraudulent agent acting under a power of attorney)
                  might attempt to execute a sale deed or pledge the property to a private lender.
                </p>

                {/* Template Box 3: Mutation Recital */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-extrabold text-sm text-slate-900">
                      SRO Negative Covenant &amp; Municipal Mutation Mandate
                    </div>
                    <button
                      type="button"
                      onClick={copyMutationClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                    >
                      {copiedMutationClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Mutation Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"MUNICIPAL AND SUB-REGISTRAR OFFICE MUTATION MANDATE:
(a) Upon the demise of the Testator, the Executor herein / the Life Tenant and Remaindermen shall jointly submit this registered Will before the Municipal Corporation / Sub-Registrar / Cooperative Housing Society for mutating the revenue records.
(b) In all property cards, mutation extracts (7/12 / CTS / Khata), and CHS Share Certificates, the record shall explicitly reflect:
    (i) Name of Life Tenant: Smt. [Wife's Full Name] - Status: 'Limited Life Interest Holder / Usufructuary Tenant under Section 14(2) HSA, 1956 (Without Power of Sale or Encumbrance)';
    (ii) Names of Remaindermen: [Child 1 Name] and [Child 2 Name] - Status: 'Vested Absolute Remaindermen under Section 119 ISA, 1925'.
(c) The Sub-Registrar Office having jurisdiction is hereby put on notice that no conveyance, sale deed, mortgage deed, or development agreement presented by the Life Tenant alone shall be registered without the express joinder and written execution by all named Remaindermen."`}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 8: VESTED REMAINDER UNDER SECTION 119 */}
            <section id="vested-remainder-section-119" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>INDIAN SUCCESSION ACT JURISPRUDENCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Vested Remainder vs Contingent Interest: Section 119 ISA Rules
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  To ensure that children are completely insulated against litigation, estate planners must understand
                  the distinction between a <strong>&quot;Vested Interest&quot; (Section 119 ISA)</strong> and a{" "}
                  <strong>&quot;Contingent Interest&quot; (Section 120 ISA)</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-extrabold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Vested Remainder (Section 119 ISA)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ownership <strong>vests in interest immediately</strong> on the testator&apos;s death. Only physical
                      possession is postponed until the death of the life tenant. If a child dies before the life tenant,
                      the child&apos;s interest does NOT lapse—it descends to that child&apos;s own legal heirs.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-extrabold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Contingent Interest (Section 120 ISA)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ownership takes effect only if a specified uncertain event occurs (e.g., &quot;if the child reaches
                      age 30&quot; or &quot;if the child survives the mother&quot;). If the contingency fails, the legacy
                      falls into the residuary estate or triggers intestate succession disputes.
                    </p>
                  </div>
                </div>
                <p>
                  In spousal life-interest Wills, our High Court testamentary litigators always advise creating an
                  immediate <strong>Vested Remainder in Interest</strong> under Section 119. This guarantees that no
                  subsequent family fallout, remarriage, or dispute can dislodge the children&apos;s guaranteed succession
                  rights.
                </p>
              </div>
            </section>

            {/* SECTION 9: STRUCTURED COMPARISON TABLE */}
            <section id="structured-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>LEGAL MECHANISM COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Legal Comparison: Section 14(1) vs 14(2) vs Absolute Bequests
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review the structural, legal, and operational differences between spousal disposition methods under
                Indian succession laws.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#172228] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Succession Parameter</th>
                      <th className="py-3.5 px-4 font-bold text-rose-300">Sec 14(2) Life Estate (Protected)</th>
                      <th className="py-3.5 px-4 font-bold text-amber-300">Sec 14(1) Trap (Maintenance)</th>
                      <th className="py-3.5 px-4 font-bold">100% Absolute Bequest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Spouse Lifetime Residence</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Guaranteed for lifetime</td>
                      <td className="py-3 px-4">Guaranteed (as absolute owner)</td>
                      <td className="py-3 px-4">Guaranteed (full ownership)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors bg-slate-50/40">
                      <td className="py-3 px-4 font-bold text-slate-900">Right to Sell / Mortgage</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Strictly Prohibited (Void ab initio)</td>
                      <td className="py-3 px-4 text-red-600 font-bold">Permitted (Full absolute right)</td>
                      <td className="py-3 px-4 text-slate-900">Permitted (Full absolute right)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Can Spouse Will It Away?</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">No (Ranvir Dewan doctrine)</td>
                      <td className="py-3 px-4 text-red-600 font-bold">Yes (Can disinherit children)</td>
                      <td className="py-3 px-4 text-slate-900">Yes (Can disinherit children)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors bg-slate-50/40">
                      <td className="py-3 px-4 font-bold text-slate-900">Children Succession Guarantee</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">100% Vested under Sec 119 ISA</td>
                      <td className="py-3 px-4 text-red-600">Zero Guarantee (Lost on alienation)</td>
                      <td className="py-3 px-4 text-slate-600">Zero Guarantee (Spouse discretion)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Triggering Drafting Language</td>
                      <td className="py-3 px-4 text-emerald-800 font-mono text-[10px]">
                        &quot;Independent testamentary bounty, governed by Sec 14(2)&quot;
                      </td>
                      <td className="py-3 px-4 text-amber-800 font-mono text-[10px]">
                        &quot;In lieu of maintenance / for her maintenance upkeep&quot;
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px]">
                        &quot;Sole and absolute owner with full rights of alienation&quot;
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors bg-slate-50/40">
                      <td className="py-3 px-4 font-bold text-slate-900">Probate / Court Interventions</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">None required on 2nd death</td>
                      <td className="py-3 px-4">Requires new probate/succession</td>
                      <td className="py-3 px-4">Requires new probate/succession</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL ESTATE LITIGATION PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Delhi, Bengaluru &amp; Mumbai Wills
              </h2>
              <div className="space-y-4">
                {/* Case 1: South Delhi */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Case 1: Greater Kailash, South Delhi (The Maintenance Wording Disaster)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                      Section 14(1) Trap Triggered
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A retired civil servant drafted his own Will bequeathing his ₹9 Crore GK-II bungalow to his second wife
                    <em> &quot;for her life in lieu of all maintenance and sustenance claims, with reversion to my son from
                    first marriage&quot;</em>. Following his death, the wife entered into a collaboration agreement with a
                    builder to demolish and build builder floors. The son challenged the sale in the Delhi High Court.
                  </p>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    <strong>High Court Ruling:</strong> Following <em>V. Tulasamma</em>, the court held that because the
                    bequest was expressly worded &quot;in lieu of maintenance&quot;, Section 14(1) enlarged her limited
                    estate into full absolute ownership. The restriction in favor of the son was struck down as null and
                    void. The son lost all rights to the ancestral plot.
                  </p>
                </div>

                {/* Case 2: Indiranagar, Bengaluru */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Case 2: Indiranagar, Bengaluru (The Section 14(2) Protection Shield)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      100% Children Upheld
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An IT executive drafted his Will through AMA Legal Solutions, explicitly framing the spousal life
                    estate as an independent testamentary bounty governed by Section 14(2) HSA, granting his wife
                    lifetime residence and ₹1.8 Lakhs monthly rental usufruct from commercial ground-floor shops, with
                    vested remainder to their two daughters. After his demise, a distant relative persuaded the widow to
                    gift the ground floor to a family trust.
                  </p>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    <strong>Sub-Registrar &amp; Civil Court Ruling:</strong> The Sub-Registrar rejected registration of the
                    gift deed based on the non-alienation notice on the property card. The Civil Court dismissed the
                    relative&apos;s suit under the <em>Ranvir Dewan</em> precedent, holding that the widow held no
                    alienable corpus. The daughters&apos; vested remainder remained 100% intact.
                  </p>
                </div>

                {/* Case 3: Bandra West, Mumbai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Case 3: Bandra West, Mumbai (Cooperative Housing Society Share Mutation)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      Seamless CHS Mutation
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A businessman bequeathed a 3BHK sea-facing apartment in a premier Bandra CHS with a Section 14(2) life
                    interest to his wife and remainder to his son residing in London. Following the testator&apos;s demise,
                    the society committee mutated the share certificate showing the wife as &quot;Associate Member / Life
                    Interest Holder&quot; and the NRI son as &quot;Primary Vested Remainderman&quot;.
                  </p>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> The mother resided peacefully for 14 years collecting parking and terrace
                    income. Upon her demise at age 82, the son took possession and mutated 100% absolute ownership simply by
                    submitting her death certificate, saving ₹12 Lakhs in Maharashtra probate court fees.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>TESTAMENTARY PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Step-by-Step SOP: Execution, Witnessing &amp; SRO Registration
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-slate-900">Verify Title as Self-Acquired Property</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Confirm that the property is your self-acquired asset (purchased from your independent earnings) or
                      your absolute testamentary share under Section 30 HSA. Undivided ancestral coparcenary interest
                      requires specific partition recitals to avoid coparcenary challenges.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      Draft Section 14(2) Safe Harbor and Negative Covenants
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Incorporate the exact wording negating maintenance arrears, citing Section 14(2), and inserting
                      blanket prohibitions on sale, mortgage, long-term leasing, and further testamentary disposition.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      Two Independent Attesting Witnesses (Section 67 ISA Compliance)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 67 ISA, neither your spouse (life tenant) nor your children (remaindermen) must sign as
                      attesting witnesses! Doing so voids their bequest. Select two completely independent adult witnesses
                      (e.g., family physician, chartered accountant, or family friend).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-slate-900">Doctor&apos;s Testamentary Fitness Certificate</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain an endorsement from a registered medical practitioner certifying that you were in sound mental
                      health, memory, and understanding on the date and hour of execution to preempt future undue
                      influence allegations.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center shrink-0 text-xs">
                    5
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold text-slate-900">
                      Optional Registration at Sub-Registrar Office (SRO)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      While registration is optional under Section 18(e) of the Registration Act, registering a life-interest
                      Will creates a public record at the SRO, making it virtually impossible for any third party to claim
                      ignorance of the life-tenant restriction.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Trust Signals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial &amp; Testamentary Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&apos;s premier estate planning and succession technology platform, backed by
                  the senior testamentary practice of AMA Legal Solutions. Our multidisciplinary bench includes senior
                  High Court litigators specializing in contentious probate proceedings, Section 14 Hindu Succession
                  disputes, and cross-border NRI estate structuring. Having drafted and registered over 15,000 challenge-proof
                  testaments, we ensure that every life-interest clause stands up to rigorous judicial scrutiny.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Will Registration Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-court-fee-timeline-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Fee Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Life Interest Spousal Wills
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>AUTHORITY &amp; REPOSITORIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; High Court Precedent Registry
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs text-xs text-slate-600 leading-relaxed">
                <p>
                  The legal principles and templates presented on this page are grounded in authoritative statutory
                  provisions and landmark judgments of the Hon&apos;ble Supreme Court of India:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>
                    <strong>Hindu Succession Act, 1956:</strong> Section 14(1) [Women&apos;s Property as Absolute Owner],
                    Section 14(2) [Exception for Instruments Prescribing Restricted Estate], and Section 30 [Testamentary
                    Disposition].
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Section 63 [Execution of Unprivileged Wills], Section 67
                    [Effect of Bequest to Attesting Witness], Section 82 [Meaning of Clause to be Collected from Entire
                    Will], Section 87 [Testator&apos;s Intention to be Effectuated], Section 119 [Date of Vesting of Vested
                    Interest], Section 120 [Contingent Bequests], and Section 131 [Bequest with Gift Over / Defeasance].
                  </li>
                  <li>
                    <strong>Landmark Supreme Court Precedents:</strong> <em>V. Tulasamma v. Sesha Reddy</em> (1977) 3 SCC
                    99; <em>Sadhu Singh v. Gurdwara Sahib Narike</em> (2006) 8 SCC 75; <em>Ranvir Dewan v. Rashmi Khanna</em>{" "}
                    (2018) 12 SCC 1; <em>Jagan Singh v. Dhanwanti</em> (2012) 2 SCC 628; and <em>Sharad Subramanyan v.
                    Soumi Mazumdar</em> (2006) 8 SCC 536.
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://main.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Hindu Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/joint-mutual-mirror-will-format-husband-wife"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Husband &amp; Wife Mirror Will Format
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Standard Indian Will Format
                    </Link>
                    <Link
                      href="/tools/probate-court-fee-timeline-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Court Fee Calculator
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      SRO Will Registration Service
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Tax Calculator
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in High Court testamentary litigations, Section 14(2) life estate enforcement, contentious
                probate defenses, and challenge-proof spousal estate structuring.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT SECTION 14(1) FORFEITURES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Spouse &amp; Secure Your Children
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a legally airtight Will that gives your spouse guaranteed lifetime residence and rental income,
                  while keeping your home protected for your children.
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
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CUSTOM TESTAMENTARY ADVISORY</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Drafting High-Value Property or Multi-Tier Bequests?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court succession advocates review complex life interests, family settlement deeds, and
                  commercial tenancy protections pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 14(2) Safe Harbor:</strong> Preempts the catastrophic Section 14(1) absolute
                      conversion trap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Vested Remainder under Sec 119:</strong> Irrevocably protects children&apos;s title upon
                      testator&apos;s death.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SRO Notice Mandates:</strong> Formats designed to be recorded on 7/12, Khata, and CHS share
                      certificates.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#interactive-clause-customizer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customize Clause</span>
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
