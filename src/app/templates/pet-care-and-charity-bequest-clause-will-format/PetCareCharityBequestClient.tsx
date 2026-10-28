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
  Heart,
  Dog,
  ShieldAlert,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique IDs)
const TOC_ITEMS = [
  { id: "legal-status-animals", label: "1. Pet Inheritance Law: Legal Status" },
  { id: "interactive-calculator", label: "2. Pet Care & Charity Allocation Tool" },
  { id: "direct-vs-trust-comparison", label: "3. Direct Bequest vs Caretaker Trust" },
  { id: "conditional-caretaker-bequest", label: "4. Conditional Caretaker Gift-Over" },
  { id: "testamentary-pet-trust", label: "5. Testamentary Pet Care Trust Model" },
  { id: "charitable-bequests-80g", label: "6. Charitable Bequests & Section 80G" },
  { id: "section-118-supreme-court", label: "7. Section 118: Supreme Court Ruling" },
  { id: "verifiable-clauses-templates", label: "8. Verifiable Pet & Charity Clauses" },
  { id: "sro-witness-rules", label: "9. SRO Registration & Witness Rules" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Delhi & Mumbai" },
  { id: "institutional-profile", label: "11. Institutional Profile: AMA Legal" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Statutory Citations & Legal Portals" },
];

const FAQS = [
  {
    q: "Can I leave money directly to my pet dog or cat in an Indian Will?",
    a: "No. Under Section 112 of the Indian Succession Act, 1925, a bequest cannot be made to an entity that is not recognized as a legal person under Indian jurisprudence. Animals lack legal personhood, cannot maintain bank accounts, and cannot hold title to immovable or movable assets. A direct clause such as 'I bequeath ₹20 Lakhs to my dog Max' is void ab initio. The legally enforceable approach is structuring a Conditional Caretaker Bequest under Section 127 with a Gift-Over under Section 131, or a Testamentary Pet Care Trust under the Indian Trusts Act, 1882.",
  },
  {
    q: "How does a Conditional Caretaker Bequest with Gift-Over operate under Indian law?",
    a: "Under Section 127 of the Indian Succession Act, 1925, a bequest can be made to a human beneficiary (friend, relative, or caretaker) subject to the fulfillment of a condition subsequent, namely providing lifelong humane shelter, veterinary healthcare, food, and companionship to your pet. Crucially, under Section 131, the Will includes a 'gift-over' provision: if the caretaker neglects, abandons, or mistreats the animal, custody of the pet and the remaining financial corpus immediately divest from them and transfer to a nominated animal welfare NGO or alternate guardian.",
  },
  {
    q: "Can a Christian, Parsi, or Hindu leave money to a charity or temple in a Will?",
    a: "Yes, without any statutory waiting period. In the landmark Constitution Bench ruling of John Vallamattom & Anr. v. Union of India (2003) 6 SCC 611, the Supreme Court of India struck down Section 118 of the Indian Succession Act, 1925 as unconstitutional and violative of Article 14. Section 118 had previously restricted Christians and others from bequeathing property to religious or charitable causes unless executed 12 months prior to death and deposited in safe custody within 6 months. Following John Vallamattom, all Indian testators enjoy unrestricted testamentary freedom to donate to charitable trusts, temples, ashrams, churches, and NGOs.",
  },
  {
    q: "What is a Corpus Donation under Section 11(1)(d) of the Income Tax Act?",
    a: "When bequeathing funds to a charitable trust or Section 8 company in a Will, it is vital to specify that the bequest is made as a 'Corpus Donation' under Section 11(1)(d) of the Income Tax Act, 1961. A corpus donation is credited directly to the capital fund of the NGO and is 100% exempt from the mandatory 85% annual application requirement. If not specified as corpus, the NGO may be taxed on the unspent portion if it cannot deploy 85% of the bequest within the same financial year.",
  },
  {
    q: "Can the designated pet caretaker or charity trustee act as an attesting witness to the Will?",
    a: "Strictly NO. Under Section 67 of the Indian Succession Act, 1925, any legacy, bequest, or interest given to an attesting witness, or to the husband or wife of an attesting witness, is entirely VOID. If the nominated caretaker signs as an attesting witness, the Will remains valid but the caretaker forfeits the entire financial fund and honorarium. Always ensure two neutral, independent adult witnesses who have zero financial interest under the Will attest the document.",
  },
  {
    q: "What happens to the remaining pet care fund after the pet passes away?",
    a: "An enforceable Will must always include a 'residuary bequest-over' clause. This instructs the executor or trustee that upon the pet's natural death (verified by a registered veterinary surgeon's certificate of humane demise), any unspent principal amount and accrued interest shall transfer to a named charitable animal welfare organization (such as Blue Cross of India, Friendicoes SECA, or People For Animals) or return to the testator's residuary family estate.",
  },
  {
    q: "How can I prevent family members from challenging my charitable or pet care Will?",
    a: "Disinherited family members often challenge animal or charity bequests alleging 'undue influence' or 'insane delusion'. To insulate your testament: (1) state clear, objective reasons in the recital for prioritizing animal welfare or philanthropic causes, (2) obtain a contemporaneous medical certificate from a registered MBBS or MD doctor confirming testamentary capacity on the date of execution, (3) register the Will at the Sub-Registrar Office under Book 3, and (4) record an unedited video of the Will execution and attestation.",
  },
  {
    q: "What is an Honorary Pet Trust and how is it structured under the Indian Trusts Act, 1882?",
    a: "In Indian law, an Honorary Trust is a testamentary arrangement where funds are placed in the custody of a human Trustee with instructions to expend income and principal for a non-human purpose. Because an animal cannot sue to enforce fiduciary obligations, the Will designates an independent 'Trust Protector' or 'Enforcer' (such as a practicing advocate or veterinary doctor). The Enforcer possesses legal standing to review veterinary expense accounts, inspect living conditions, and apply to court for replacement of a delinquent trustee.",
  },
];

export default function PetCareCharityBequestClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-status-animals");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeClauseTab, setActiveClauseTab] = useState<number>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedCustomClause, setCopiedCustomClause] = useState<boolean>(false);

  // Calculator Form State
  const [petType, setPetType] = useState<"dog" | "cat" | "horse" | "multiple">("dog");
  const [petName, setPetName] = useState<string>("Bruno");
  const [petLifeExpectancyYears, setPetLifeExpectancyYears] = useState<number>(8);
  const [monthlyFoodGrooming, setMonthlyFoodGrooming] = useState<number>(6000);
  const [monthlyVetVaccine, setMonthlyVetVaccine] = useState<number>(2500);
  const [emergencyMedicalBuffer, setEmergencyMedicalBuffer] = useState<number>(200000);
  const [monthlyCaretakerStipend, setMonthlyCaretakerStipend] = useState<number>(5000);
  const [caretakerName, setCaretakerName] = useState<string>("Shri Ramesh Kumar");
  const [charityCorpusAmount, setCharityCorpusAmount] = useState<number>(1000000); // ₹10 Lakhs
  const [charityName, setCharityName] = useState<string>("Friendicoes SECA / Blue Cross");
  const [annualInflationRate, setAnnualInflationRate] = useState<number>(6); // 6% annual inflation

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

  // ==========================================
  // MATHEMATICAL PET CARE & CHARITY ENGINE
  // ==========================================
  const totalMonthlyPetExpense = monthlyFoodGrooming + monthlyVetVaccine + monthlyCaretakerStipend;
  const totalMonths = petLifeExpectancyYears * 12;

  // Discrete future value compounding accounting for 6% annual inflation
  let cumulativePetCareCorpus = 0;
  for (let year = 1; year <= petLifeExpectancyYears; year++) {
    const inflationMultiplier = Math.pow(1 + annualInflationRate / 100, year - 1);
    const annualBase = totalMonthlyPetExpense * 12;
    cumulativePetCareCorpus += annualBase * inflationMultiplier;
  }
  cumulativePetCareCorpus = Math.round(cumulativePetCareCorpus);

  const totalPetAllocation = cumulativePetCareCorpus + emergencyMedicalBuffer;
  const grandTotalAllocation = totalPetAllocation + charityCorpusAmount;

  // Format INR Currency
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Clauses library
  const CLAUSE_TEMPLATES = [
    {
      title: "Clause A: Conditional Caretaker Bequest with Section 131 Gift-Over",
      code: `CLAUSE [___]: CONDITIONAL BEQUEST FOR LIFELONG PET CARETAKING AND GIFT-OVER

1. PET IDENTIFICATION & NOMINATION OF CARETAKER:
I am the sole owner and primary companion of [Species, e.g., Canine/Feline], named "[Pet Name]", breed [Breed], microchip number [Microchip ID], currently aged approximately [Age] years (hereinafter referred to as the "Pet"). I hereby bequeath legal custody and physical care of the Pet unto my trusted friend/relative, [Name of Caretaker], residing at [Address], Aadhaar No. [Aadhaar Number] (hereinafter referred to as the "Primary Caretaker").

2. SPECIFIC FINANCIAL BEQUEST & CONDITIONAL NATURE:
I hereby bequeath a dedicated sum of INR [Amount in Figures] (Rupees [Amount in Words] only) from my bank account held with [Bank Name], [Branch], Account No. [Account Number], unto the said Primary Caretaker, SUBJECT TO THE STRICT CONDITION PRECEDENT AND SUBSEQUENT (under Sections 127 and 131 of the Indian Succession Act, 1925) that the Primary Caretaker shall continuously provide humane shelter, high-quality nourishment, prompt veterinary medical care, vaccinations, and compassionate treatment to the Pet for the full remainder of its natural life.

3. DISBURSEMENT SCHEDULE:
My Executor shall deposit the said dedicated sum into a high-yield sweep Fixed Deposit with [Bank Name]. The Primary Caretaker shall receive a monthly maintenance allowance of INR [Monthly Allowance] on the first working day of each calendar month, alongside direct reimbursement of all certified veterinary emergency and surgical expenses upon submission of formal veterinary invoices.

4. GIFT-OVER UPON DEFAULT, NEGLECT, OR PRE-DECEASE (SECTION 131 ISA):
In the event that the Primary Caretaker predeceases me, is unwilling or unable to assume custody, or is determined by my Executor or a Registered Veterinary Surgeon to have neglected, abused, abandoned, or failed to provide standard veterinary care to the Pet, then:
(a) The custody of the Pet and all remaining unspent funds from the said bequest shall IMMEDIATELY DIVEST from the Primary Caretaker; and
(b) Custody and the balance funds shall immediately pass to [Name of Alternate Caretaker / Registered Animal Welfare NGO, e.g., Blue Cross of India / Friendicoes SECA], registered under Section 12AB of the Income Tax Act, 1961, who shall assume full responsibility for the Pet's lifelong sanctuary.

5. RESIDUARY DISPOSITION UPON PET'S DEMISE:
Upon the Pet's natural demise, attested by a Death and Cremation Certificate issued by a licensed Registered Veterinary Surgeon, any remaining unspent principal corpus and accrued interest shall:
[Select One: (Option I) Revert to the Primary Caretaker as an unconditional honorarium for faithful service / (Option II) Be transferred as a general donation to [Name of Animal Welfare Charity]].`,
    },
    {
      title: "Clause B: Testamentary Honorary Pet Care Trust Clause (Trusts Act 1882)",
      code: `CLAUSE [___]: CREATION OF TESTAMENTARY PET CARE TRUST

1. CREATION OF TESTAMENTARY TRUST:
Under Section 5 and Section 6 of the Indian Trusts Act, 1882, I hereby direct my Executor to establish a private testamentary trust to be named the "[Testator Name] Companion Animal Welfare Trust" (hereinafter the "Trust").

2. TRUST CORPUS:
I hereby dedicate and transfer a sum of INR [Amount in Figures] (Rupees [Amount in Words] only) to the said Trust, to be held in trust exclusively for the health, housing, veterinary treatment, and daily wellbeing of my pet companion "[Pet Name]".

3. APPOINTMENT OF TRUSTEE & TRUST PROTECTOR (ENFORCER):
(a) TRUSTEE: I appoint [Name of Trustee], residing at [Address], as the sole Managing Trustee of the Trust, authorized to invest the trust corpus in safe Reserve Bank of India Bonds or Scheduled Commercial Bank Fixed Deposits.
(b) TRUST PROTECTOR (ENFORCER): To ensure strict fiduciary compliance, I appoint Advocate/Dr. [Name of Enforcer], practicing at [Address], as the independent Trust Protector. The Trustee must submit quarterly expense accounts and semi-annual veterinary health certificates to the Trust Protector. The Trust Protector is legally empowered to replace the Trustee in the event of gross neglect or misappropriation.

4. CARETAKER REMUNERATION:
The physical custody of the Pet shall reside with [Name of Caretaker], who shall receive a monthly honorarium of INR [Stipend Amount] plus all actual veterinary expenses disbursed directly by the Trustee.

5. DISSOLUTION OF TRUST:
Upon the death of the Pet, verified by a qualified veterinarian, the Trust shall stand dissolved, and the remaining trust corpus shall be donated in full to [Name of Registered Animal Charity / 80G Society].`,
    },
    {
      title: "Clause C: Specific Corpus Bequest to Registered 80G Charity / Animal Welfare NGO",
      code: `CLAUSE [___]: SPECIFIC CHARITABLE CORPUS BEQUEST UNDER SECTION 11(1)(d)

1. CHARITABLE BEQUEST TO REGISTERED NGO:
I hereby give and bequeath a sum of INR [Amount in Figures] (Rupees [Amount in Words] only) out of my self-acquired liquid assets held in [Bank Name, Account Details] unto [Full Official Name of Charity/NGO], a public charitable trust/society registered under Section 12AB and Section 80G of the Income Tax Act, 1961, having its registered office at [Registered Address], PAN: [PAN Number].

2. SPECIFIC DIRECTION AS CORPUS DONATION:
I EXPLICITLY DIRECT under Section 11(1)(d) of the Income Tax Act, 1961 that this bequest is made specifically towards the PERMANENT CAPITAL CORPUS FUND of the said institution. The trustees/governing body of the charity shall invest the principal in approved securities under Section 11(5) and utilize only the income/interest generated therefrom for:
[Specify Purpose: e.g., Emergency animal ambulance operations / Shelter maintenance for abandoned senior dogs / Free veterinary sterilization].

3. DISCHARGE OF EXECUTOR:
The official receipt signed by the President, Secretary, or Treasurer of the said charitable institution along with an 80G acknowledgment certificate shall constitute a full and absolute legal discharge unto my Executor.

4. CY-PRÈS DOCTRINE (SECTION 92 CPC):
If at the time of my death the said charitable institution has ceased to exist, has been amalgamated, or has lost its tax-exempt status under Section 12AB, my Executor is directed to apply the doctrine of cy-près and transfer the funds to another registered 80G animal welfare charitable trust operating in India with identical objects.`,
    },
    {
      title: "Clause D: Religious Temple, Ashram, or Educational Endowment Bequest",
      code: `CLAUSE [___]: TESTAMENTARY ENDOWMENT TO RELIGIOUS / EDUCATIONAL TRUST

1. BEQUEST TO RELIGIOUS ENDOWMENT:
I bequeath the sum of INR [Amount in Figures] (Rupees [Amount in Words] only) to the Board of Trustees of [Name of Temple Trust / Ashram / Gurudwara / Educational Society], located at [Address], registered under the [Relevant State Public Trusts Act / Societies Registration Act 1860], PAN: [PAN Number].

2. ENDOWMENT PURPOSE & RECOGNITION:
This bequest is dedicated as a perpetual endowment. The annual income derived from this corpus shall be applied exclusively towards:
[Specify: e.g., Daily Annadanam / Free distribution of meals to pilgrims / Sponsoring education for underprivileged students].

3. UNRESTRICTED VALIDITY UNDER CONSTITUTION BENCH PRECEDENT:
This religious bequest is made in exercise of my absolute testamentary power, legally unencumbered and protected pursuant to the Supreme Court of India's landmark declaration in John Vallamattom v. Union of India (2003) 6 SCC 611, which struck down Section 118 of the Indian Succession Act, 1925.

4. LEGAL RECEIPT:
The receipt issued by the managing committee or designated financial officer of the temple trust shall fully absolve my Executor from all further accountability regarding this legacy.`,
    },
  ];

  const handleCopyClause = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2500);
  };

  const handleCopyCustomClause = () => {
    const customText = `CLAUSE [___]: CONDITIONAL BEQUEST FOR LIFELONG PET CARETAKING AND CHARITABLE CORPUS

1. CONDITIONAL CARETAKER BEQUEST (SECTIONS 127 & 131 ISA, 1925):
I hereby bequeath physical custody and guardianship of my pet (${petType.toUpperCase()}), named "${petName}", unto my trusted caretaker, ${caretakerName}, residing at [Address], Aadhaar No. [Aadhaar Number].

2. ALLOCATION OF CORPUS:
To provide for the daily sustenance, veterinary care, and emergency healthcare of "${petName}", I bequeath a dedicated sum of INR ${totalPetAllocation.toLocaleString(
      "en-IN"
    )} (including an emergency veterinary medical buffer of INR ${emergencyMedicalBuffer.toLocaleString(
      "en-IN"
    )}) to be maintained in a sweep Fixed Deposit account by my Executor. My Executor shall disburse a monthly maintenance stipend of INR ${totalMonthlyPetExpense.toLocaleString(
      "en-IN"
    )} unto ${caretakerName}.

3. GIFT-OVER UPON DEFAULT (SECTION 131 ISA):
Should ${caretakerName} fail, neglect, or abandon "${petName}", legal custody and all unspent funds shall immediately divest and pass to ${charityName}.

4. CHARITABLE CORPUS BEQUEST (SECTION 11(1)(d) INCOME TAX ACT):
I further bequeath INR ${charityCorpusAmount.toLocaleString(
      "en-IN"
    )} directly into the permanent Capital Corpus Fund of ${charityName} (PAN: [Charity PAN]), dedicated for animal rescue and public welfare.`;

    navigator.clipboard.writeText(customText);
    setCopiedCustomClause(true);
    setTimeout(() => setCopiedCustomClause(false), 2500);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-slate-800 font-sans antialiased selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Exact Calculator Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 SS. 112-117 &amp; TRUSTS ACT 1882</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Pet Care and Charity Bequest Clause in Will Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Under Indian law, a pet is not a legal person and cannot hold a bank account. A direct
            bequest fails unless structured as a <strong>Conditional Caretaker Bequest</strong> or{" "}
            <strong>Testamentary Pet Trust</strong> with a strict gift-over. Learn how to draft
            enforceable animal care funds and 80G charitable corpus donations.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Pet Care &amp; Charity Allocation Tool</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">ISA s. 112 &amp; 127</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CONDITIONAL CARETAKER GIFT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">John Vallamattom</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 118 STRUCK DOWN
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 11(1)(d)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                100% CORPUS TAX SHIELD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 131 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GIFT-OVER ANTI-NEGLECT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Matching Calculator Architecture)
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
                Governed under Sections 67, 112, 114, 117, 127 &amp; 131 of Indian Succession Act,
                1925; Indian Trusts Act, 1882; Income Tax Act, 1961 ss. 11(1)(d) &amp; 80G; and
                Supreme Court landmark precedent John Vallamattom v. UOI (2003).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Critical Legal Moat</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Direct bequests to animals fail for lack of juristic personhood. Always structure as a
                Conditioned Caretaker Bequest with Section 131 Gift-Over to ensure enforcement.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED BANNER IMAGE (Generated OG Card Displayed On-Page) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/pet-care-and-charity-bequest-clause-will-format-og.jpg"
                  alt="Pet Care and Charity Bequest Clause in Will Format India"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Official Legal Template &amp; Statutory Guidelines: Indian Succession Act, 1925
                  </span>
                </div>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-slate-700 hover:text-[#C65378] font-bold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Clause Guide</span>
                </button>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: PET CARE &amp; CHARITY TESTAMENTARY RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Animals Cannot Own Property in India:</strong> Under Indian legal jurisprudence,
                    a dog, cat, or horse is not a juristic person capable of receiving funds or owning a bank
                    account. Direct testamentary gifts to animals are void under Section 112 of the Indian
                    Succession Act, 1925.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Conditional Caretaker Bequests with Gift-Over:</strong> Under Sections 127 and
                    131, testators bequeath funds to a designated human caregiver conditional on proper animal
                    shelter and healthcare. If the caretaker defaults, funds and pet custody automatically
                    transfer to a secondary animal welfare charity.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court Struck Down Section 118:</strong> In <em>John Vallamattom v. UOI</em>{" "}
                    (2003), the Supreme Court struck down Section 118 ISA as unconstitutional. All testators
                    can freely leave bequests to temples, ashrams, churches, or NGOs without any 12-month
                    waiting window or safe deposit mandates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Corpus Donation Directives Under Section 11(1)(d):</strong> Charitable bequests
                    must specify a 'Corpus Donation' direction to ensure the NGO permanently capitalizes the
                    fund without attracting tax penalties under income tax application thresholds.
                  </span>
                </li>
              </ul>
            </div>

            {/* ===================================================================
                SECTION 1: PET INHERITANCE LAW: LEGAL STATUS OF ANIMALS IN INDIA
                =================================================================== */}
            <section id="legal-status-animals" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                1. Pet Inheritance Law: Legal Status of Animals in India
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Animal lovers and single or childless testators frequently ask:{" "}
                <em>"Can I leave ₹20 Lakhs or my residential flat to my dog or cat in my Will?"</em> While
                the emotional bond between human guardians and their pets is profound, the statutory reality
                under Indian succession law is governed strictly by the Indian Succession Act, 1925.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-800 text-sm">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>The Fatal Pitfall: Direct Bequests are Void</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Indian civil law, an animal is legally classified as movable property (personal
                    chattel), not a <strong>juristic person</strong>. Section 112 of the Indian Succession
                    Act, 1925 specifies that a bequest cannot be made to a person who is not in existence at
                    the testator&apos;s death, and courts have consistently held that non-human entities
                    cannot hold title to property. A direct clause naming an animal as beneficiary causes the
                    legacy to fail completely.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>The Enforceable Solution: Two Legal Pathways</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To guarantee lifelong quality of life for companion animals, Indian estate planners
                    utilize two battle-tested statutory structures:
                    <strong> (1) Conditional Caretaker Bequest</strong> under Section 127 with a mandatory
                    Gift-Over under Section 131, or <strong>(2) A Testamentary Honorary Pet Care Trust</strong>{" "}
                    under the Indian Trusts Act, 1882 with an independent Trust Protector.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 text-xs text-slate-700 border border-slate-200">
                <p className="leading-relaxed">
                  <strong>Judicial Doctrine:</strong> While the Supreme Court of India in{" "}
                  <em>Animal Welfare Board of India v. A. Nagaraja (2014) 7 SCC 547</em> recognized animals
                  as having statutory rights under the Prevention of Cruelty to Animals Act, 1960 and Article
                  21 of the Constitution, this has not been extended to encompass legal estate ownership or
                  testamentary capacity. Property must always vest in a human or juristic legal entity.
                </p>
              </div>
            </section>

            {/* ===================================================================
                SECTION 2: INTERACTIVE PET CARE & CHARITY ALLOCATION CALCULATOR
                =================================================================== */}
            <section
              id="interactive-calculator"
              className="scroll-target rounded-3xl bg-white border-2 border-slate-200 shadow-md p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    <Calculator className="w-4 h-4" />
                    <span>STATUTORY ESTATE ALLOCATION CALCULATOR</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                    2. Interactive Pet Care &amp; Charity Allocation Calculator
                  </h3>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Compounded @ {annualInflationRate}% Inflation
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Estimate the exact financial corpus required to sustain your pet&apos;s natural lifespan
                alongside philanthropic donations, factoring in nutrition, veterinary inflation, caretaker
                stipends, and emergency reserves.
              </p>

              {/* Calculator Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                {/* Pet Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Dog className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Companion Animal Type</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "dog", label: "Canine (Dog)" },
                      { id: "cat", label: "Feline (Cat)" },
                      { id: "horse", label: "Equine (Horse)" },
                      { id: "multiple", label: "Multiple Pets" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPetType(item.id as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          petType === item.id
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pet Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Pet Name (For Clause Generation)</span>
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]"
                    placeholder="e.g. Bruno / Bella"
                  />
                </div>

                {/* Life Expectancy Slider */}
                <div className="space-y-1.5 md:col-span-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Remaining Life Expectancy: {petLifeExpectancyYears} Years</span>
                    </label>
                    <span className="text-[#C65378] font-bold">{totalMonths} Monthly Cycles</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={petLifeExpectancyYears}
                    onChange={(e) => setPetLifeExpectancyYears(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-semibold">
                    <span>1 Year (Senior Pet)</span>
                    <span>10 Years (Adult)</span>
                    <span>20 Years (Puppy / Feline / Equine)</span>
                  </div>
                </div>

                {/* Monthly Food & Boarding */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Monthly Food &amp; Boarding</span>
                    <span className="text-[#C65378] font-black">{formatINR(monthlyFoodGrooming)}</span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="30000"
                    step="500"
                    value={monthlyFoodGrooming}
                    onChange={(e) => setMonthlyFoodGrooming(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                </div>

                {/* Monthly Vet & Vaccines */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Monthly Routine Veterinary</span>
                    <span className="text-[#C65378] font-black">{formatINR(monthlyVetVaccine)}</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="500"
                    value={monthlyVetVaccine}
                    onChange={(e) => setMonthlyVetVaccine(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                </div>

                {/* Caretaker Monthly Stipend */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Caretaker Monthly Stipend</span>
                    <span className="text-[#C65378] font-black">{formatINR(monthlyCaretakerStipend)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="1000"
                    value={monthlyCaretakerStipend}
                    onChange={(e) => setMonthlyCaretakerStipend(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                </div>

                {/* Emergency Medical Buffer */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Critical Veterinary Buffer</span>
                    <span className="text-[#C65378] font-black">{formatINR(emergencyMedicalBuffer)}</span>
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={emergencyMedicalBuffer}
                    onChange={(e) => setEmergencyMedicalBuffer(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                </div>

                {/* Caretaker Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Nominated Caretaker Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={caretakerName}
                    onChange={(e) => setCaretakerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]"
                    placeholder="e.g. Shri Ramesh Kumar"
                  />
                </div>

                {/* Charity Corpus Amount */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Philanthropic / NGO Corpus Donation</span>
                    <span className="text-emerald-700 font-black">{formatINR(charityCorpusAmount)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={charityCorpusAmount}
                    onChange={(e) => setCharityCorpusAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculation Output Dashboard */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-[#172228] text-white p-6 shadow-lg space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700/80 gap-3">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-rose-300">
                      ESTATE ALLOCATION COMPUTATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Total Testamentary Fund: {formatINR(grandTotalAllocation)}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Base Monthly Run-Rate</span>
                    <span className="text-base font-extrabold text-white">
                      {formatINR(totalMonthlyPetExpense)} / month
                    </span>
                  </div>
                </div>

                {/* Financial Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-300 block uppercase">Pet Care Corpus</span>
                    <span className="text-sm sm:text-base font-black text-rose-300">
                      {formatINR(cumulativePetCareCorpus)}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">With {annualInflationRate}% Inflation</span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-300 block uppercase">Emergency Vet Fund</span>
                    <span className="text-sm sm:text-base font-black text-amber-300">
                      {formatINR(emergencyMedicalBuffer)}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Surgeries / Critical Care</span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-300 block uppercase">Total Pet Dedicated</span>
                    <span className="text-sm sm:text-base font-black text-white">
                      {formatINR(totalPetAllocation)}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Conditioned Caretaker Fund</span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-300 block uppercase">Charity / NGO Corpus</span>
                    <span className="text-sm sm:text-base font-black text-emerald-300">
                      {formatINR(charityCorpusAmount)}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Section 11(1)(d) Corpus</span>
                  </div>
                </div>

                {/* Custom Dynamic Clause Generator Box */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Custom Generated Clause for &quot;{petName}&quot;</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCustomClause}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors"
                    >
                      {copiedCustomClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-200 whitespace-pre-wrap font-mono leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5 max-h-40 overflow-y-auto">
                    {`CLAUSE: CONDITIONAL BEQUEST FOR "${petName.toUpperCase()}"\nI bequeath custody of my ${petType} "${petName}" to ${caretakerName}, with a dedicated fund of ${formatINR(
                      totalPetAllocation
                    )} (including ${formatINR(
                      emergencyMedicalBuffer
                    )} emergency buffer) disbursed at ${formatINR(
                      totalMonthlyPetExpense
                    )}/month under Sections 127 and 131 ISA. If neglected, custody and balance funds immediately gift-over to ${charityName}. In addition, I bequeath ${formatINR(
                      charityCorpusAmount
                    )} to the permanent capital corpus of ${charityName} under Section 11(1)(d).`}
                  </pre>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 3: DIRECT BEQUEST VS CARETAKER TRUST: LEGAL COMPARISON
                =================================================================== */}
            <section id="direct-vs-trust-comparison" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                3. Direct Bequest vs Caretaker Trust: Legal Comparison
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Choosing the appropriate testamentary framework determines whether your intentions will
                stand in court or be struck down as invalid. The table below compares the legal mechanics,
                enforceability, and tax consequences of four distinct structuring methods in India.
              </p>

              {/* Structured HTML Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                      <th className="p-3.5 font-bold uppercase tracking-wider">Structuring Method</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider">Governing Statute</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider">Enforceability Under Law</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider">Default / Neglect Remedy</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider">Suitability Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-extrabold text-rose-700">
                        Direct Bequest to Pet (e.g., &quot;₹20L to Bruno&quot;)
                      </td>
                      <td className="p-3.5">Indian Succession Act s. 112</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                          <X className="w-3.5 h-3.5" />
                          <span>Void Ab Initio (Zero Standing)</span>
                        </span>
                      </td>
                      <td className="p-3.5">Lapses into residuary estate; pet left abandoned</td>
                      <td className="p-3.5 font-black text-rose-600">FATAL (0% Success)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/40">
                      <td className="p-3.5 font-extrabold text-[#172228]">
                        Conditional Caretaker Bequest with Gift-Over
                      </td>
                      <td className="p-3.5">Indian Succession Act ss. 127 &amp; 131</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>100% Legally Enforceable</span>
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-900">
                        Immediate divestment; funds &amp; pet pass to secondary charity
                      </td>
                      <td className="p-3.5 font-black text-emerald-700">IDEAL FOR INDIVIDUALS</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-extrabold text-[#172228]">
                        Testamentary Honorary Pet Care Trust
                      </td>
                      <td className="p-3.5">Indian Trusts Act, 1882 ss. 5 &amp; 6</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>High (With Appointed Enforcer)</span>
                        </span>
                      </td>
                      <td className="p-3.5">
                        Trust Protector audits books and replaces delinquent trustee
                      </td>
                      <td className="p-3.5 font-black text-slate-900">BEST FOR HNI / MULTI-PETS</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-extrabold text-[#172228]">
                        Direct 80G Charity Corpus Bequest
                      </td>
                      <td className="p-3.5">Income Tax Act s. 11(1)(d) &amp; ISA 1925</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>100% Legally Enforceable</span>
                        </span>
                      </td>
                      <td className="p-3.5">Charity takes custody under lifelong sanctuary pledge</td>
                      <td className="p-3.5 font-black text-emerald-700">EXCELLENT FOR RESCUE FUNDS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===================================================================
                SECTION 4: CONDITIONAL CARETAKER BEQUEST: GIFT-OVER MECHANICS
                =================================================================== */}
            <section id="conditional-caretaker-bequest" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                4. Conditional Caretaker Bequest: Gift-Over Mechanics
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                The most popular and legally robust solution for single testators is naming a human caregiver
                (such as a domestic help, trusted sibling, or friend) and attaching strict conditions
                subsequent. If not drafted precisely, however, the caretaker may pocket the funds and neglect
                the animal without consequences.
              </p>

              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                  <span>The Four Statutory Pillars of an Enforceable Caretaker Clause</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">
                      1. Staggered Monthly Drawdown:
                    </span>
                    Do not bequeath the entire corpus upfront. Instruct the executor to invest the funds in a
                    sweep fixed deposit, releasing only a fixed monthly maintenance allowance.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">
                      2. Mandatory Section 131 Gift-Over:
                    </span>
                    Explicitly invoke Section 131 of the Indian Succession Act, providing that on neglect or
                    abandonment, legal title immediately terminates and vests in a designated secondary NGO.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">
                      3. Periodic Veterinary Certification:
                    </span>
                    Condition the release of quarterly maintenance on the caretaker presenting a physical
                    health and vaccination certificate signed by a licensed registered veterinary surgeon.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">
                      4. Unannounced Inspection Right:
                    </span>
                    Grant the executor or trust protector the unilateral legal right to conduct unannounced
                    quarterly inspections of the pet&apos;s living quarters.
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 5: TESTAMENTARY PET CARE TRUST: INDIAN TRUSTS ACT MODEL
                =================================================================== */}
            <section id="testamentary-pet-trust" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                5. Testamentary Pet Care Trust: Indian Trusts Act Model
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                For High-Net-Worth Individuals (HNIs) owning multiple companion animals, horses, or rare
                species with extended life expectancies, a simple caretaker bequest may lack sufficient
                institutional governance. Under Sections 5 and 6 of the Indian Trusts Act, 1882, a testator
                can direct the creation of a private testamentary trust upon demise.
              </p>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-300 space-y-3 text-xs text-slate-700">
                <div className="font-bold text-sm text-[#172228] flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#5F7E75]" />
                  <span>The Tripartite Governance Structure of a Testamentary Pet Trust</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1 text-xs">The Trustee</span>
                    Holds and invests the financial portfolio; disburses monthly food allowances and pays
                    veterinary hospitals directly against formal GST tax invoices.
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1 text-xs">The Caregiver / Guardian</span>
                    Provides day-to-day physical custody, housing, and emotional care at their home or the
                    testator&apos;s dedicated estate property.
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1 text-xs">The Trust Protector (Enforcer)</span>
                    An independent third party (such as an advocate or veterinary doctor) empowered to audit
                    accounts, inspect the premises, and remove the Trustee if fiduciary duty is breached.
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 6: CHARITABLE BEQUESTS TO NGOS & SECTION 80G BENEFITS
                =================================================================== */}
            <section id="charitable-bequests-80g" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                6. Charitable Bequests to NGOs &amp; Section 80G Benefits
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Leaving a legacy to charitable causes, such as animal sanctuaries, cancer research hospitals,
                orphanages, or religious institutions, is one of the most noble acts of testamentary planning.
                However, to protect the donation from being diluted by taxes, specific provisions under the
                Income Tax Act, 1961 must be strictly observed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    <span>The Section 11(1)(d) Corpus Exemption</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Indian tax law, charitable trusts are legally required to spend at least 85% of their
                    annual income in the same financial year. If you leave ₹1 Crore without a specific
                    direction, the charity may face tax scrutiny if it cannot deploy ₹85 Lakhs immediately.
                    By inserting a <strong>Corpus Donation Direction under Section 11(1)(d)</strong>, the funds
                    are capitalized permanently, allowing the NGO to invest the principal and utilize only the
                    annual interest.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Mandatory NGO Verification Checklist</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>Valid registration under Section 12AB of the Income Tax Act.</li>
                    <li>Active Section 80G approval certificate number.</li>
                    <li>Permanent Account Number (PAN) issued to the official registered trust name.</li>
                    <li>Registered Darpan Unique ID issued by NITI Aayog for government compliance.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 7: SECTION 118 ISA: JOHN VALLAMATTOM SUPREME COURT RULE
                =================================================================== */}
            <section id="section-118-supreme-court" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                7. Section 118 ISA: John Vallamattom Supreme Court Rule
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Many outdated legal guides and templates cite Section 118 of the Indian Succession Act,
                1925, warning testators that charitable bequests will be declared void if executed less than
                12 months before death. This is an obsolete myth.
              </p>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
                  <Gavel className="w-4 h-4 text-rose-700 shrink-0" />
                  <span>Landmark Supreme Court Precedent: Section 118 Unconstitutional</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed">
                  In <strong>John Vallamattom &amp; Anr. v. Union of India (2003) 6 SCC 611</strong>, a
                  three-judge Constitution Bench of the Supreme Court headed by Chief Justice V.N. Khare struck
                  down Section 118 as unconstitutional, arbitrary, and violative of Article 14 of the
                  Constitution.
                </p>
                <div className="p-3 bg-white rounded-xl border border-rose-100 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block">Supreme Court Holding:</span>
                  <em>
                    &quot;Section 118 of the Indian Succession Act imposes an unreasonable restriction on the
                    right of a person to bequeath their self-acquired property for religious or charitable
                    purposes. A testator with near relatives was unfairly prevented from donating to charity
                    if death occurred within one year. Such discrimination between Christians and non-Christians
                    is wholly arbitrary and void.&quot;
                  </em>
                </div>
                <p className="text-[11px] text-rose-900">
                  <strong>Practical Takeaway:</strong> You can execute a Will leaving assets to a charity,
                  animal sanctuary, temple, or church at any time before death without statutory waiting
                  periods or deposit requirements.
                </p>
              </div>
            </section>

            {/* ===================================================================
                MID-ARTICLE CONTEXTUAL LINK TO INTERACTIVE /TOOLS/* CALCULATOR
                =================================================================== */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider">
                  <Calculator className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>INHERITANCE TAX &amp; CAPITAL GAINS TOOLS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  Selling Inherited Property to Fund Your Pet Trust or Charity?
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  Use our interactive Capital Gains Tax Calculator for inherited real estate to compute
                  Section 49(1) deemed cost, compare Budget 2024 grandfathering (12.5% vs 20% indexation),
                  and maximize Section 54 deductions.
                </p>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>Launch Tax Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* ===================================================================
                SECTION 8: VERIFIABLE PET CARE CLAUSES & 80G CHARITY FORMATS
                =================================================================== */}
            <section id="verifiable-clauses-templates" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    READY-TO-USE LEGAL FORMATS
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    8. Verifiable Pet Care Clauses &amp; 80G Charity Formats
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyClause(CLAUSE_TEMPLATES[activeClauseTab].code)}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  {copiedClause ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-rose-300" />
                      <span>Copy Current Clause</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CLAUSE_TEMPLATES.map((tab, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveClauseTab(idx)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border ${
                      activeClauseTab === idx
                        ? "bg-[#C65378] text-white border-[#C65378] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>Tab {idx + 1}</span>
                    <span className="block text-[11px] font-normal opacity-90 truncate mt-0.5">
                      {idx === 0
                        ? "Conditional Caretaker"
                        : idx === 1
                        ? "Testamentary Pet Trust"
                        : idx === 2
                        ? "80G NGO Corpus"
                        : "Temple / Ashram"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Clause Display Box */}
              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">
                    {CLAUSE_TEMPLATES[activeClauseTab].title}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Indian Succession Act Vetted
                  </span>
                </div>
                <div className="relative">
                  <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-[460px] overflow-y-auto">
                    {CLAUSE_TEMPLATES[activeClauseTab].code}
                  </pre>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 9: SRO REGISTRATION & WITNESS SELECTION GUIDELINES
                =================================================================== */}
            <section id="sro-witness-rules" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                9. SRO Registration &amp; Witness Selection Guidelines
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                When drafting non-standard testamentary provisions (such as conditioning bequests for animal
                welfare or allocating substantial capital to public trusts), relatives are far more prone to
                challenge the Will. Rigorous execution compliance before the Sub-Registrar Office (SRO) is
                mandatory.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-4">
                <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>The Section 67 Attesting Witness Disqualification Trap</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Under <strong>Section 67 of the Indian Succession Act, 1925</strong>, any bequest, legacy,
                  or beneficial appointment given to an attesting witness (or to their husband or wife) is
                  declared <strong>completely void</strong>. If you ask your nominated pet caretaker, or an
                  official/trustee of the charitable NGO, to sign as an attesting witness, the Will will be
                  admitted to probate, but the caretaker will forfeit 100% of their maintenance stipend and
                  honorarium!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-950 font-semibold">
                    ✅ Eligible Attesting Witnesses: Independent family physician, neighbors, colleagues,
                    chartered accountants, or advocates who receive ZERO financial benefit under the Will.
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-950 font-semibold">
                    ❌ Strictly Ineligible as Witnesses: Nominated caretaker, secondary animal shelter
                    representatives, charity founders, or executors who are also beneficiaries.
                  </div>
                </div>
              </div>

              {/* Step by Step Checklist */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  Six-Step Execution Checklist for Animal &amp; Charity Wills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Step 1: Medical Certificate</span>
                    Obtain a sound mental health certificate on doctor&apos;s letterhead on the day of signing.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Step 2: Two Witnesses</span>
                    Ensure both witnesses observe the testator sign each page in their concurrent presence.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Step 3: Sub-Registrar Book 3</span>
                    Register the document at the local SRO under Book 3 (Register of Wills) with biometric scans.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Step 4: Microchip ID Records</span>
                    Attach the pet&apos;s municipal licensing number and microchip veterinary certificate.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Step 5: NGO Acceptance Letter</span>
                    Obtain formal written consent from the secondary animal NGO agreeing to accept custody.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Step 6: Video Recording</span>
                    Capture an unedited video of the testator explaining reasons for the pet and charity gifts.
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 10: REAL CASE STUDIES: DELHI, MUMBAI & BENGALURU
                =================================================================== */}
            <section id="practical-case-studies" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                10. Real Case Studies: Delhi, Mumbai &amp; Bengaluru
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Examining practical scenarios drafted by our succession attorneys illustrates how to balance
                compassion for companion animals with rock-solid legal protection against predatory family
                challenges.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Case Study 1: South Delhi</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                      Childless Testator
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                    ₹35 Lakhs Caretaker Fund for Two Golden Retrievers with NGO Gift-Over
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A retired senior executive in Vasant Vihar wished to ensure his two elderly dogs were cared
                    for by his longtime domestic help. Our advocates drafted a Section 127 conditional clause
                    granting ₹15,000/month stipend and direct hospital reimbursement. A Section 131 gift-over
                    named Friendicoes SECA as alternate guardian with unannounced bi-monthly inspections.
                    Estranged nephews could not challenge the disposition.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Case Study 2: Mumbai</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                      Philanthropic Corpus
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                    ₹1.20 Crore Section 11(1)(d) Corpus Bequest to Stray Animal Sanctuary
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A businesswoman in Bandra allocated 40% of her liquid mutual fund portfolio to an animal
                    welfare trust in Karjat. The bequest explicitly designated the donation as permanent capital
                    corpus under Section 11(1)(d) with income earmarked for a mobile animal ambulance. The
                    clause incorporated cy-près safeguards in case the NGO altered its charitable charter.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 11: INSTITUTIONAL PROFILE: AMA LEGAL SOLUTIONS
                =================================================================== */}
            <section id="institutional-profile" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                11. Institutional Profile: AMA Legal Solutions
              </h3>
              <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#172228] to-slate-800 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                    AMA
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Advocate Anuj Anand Malik
                    </h3>
                    <p className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession Counsel • AMA Legal Solutions
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enrolled with Bar Council of Delhi • Specialization in Testamentary Trusts &amp; Estate Planning
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  AMA Legal Solutions is India&apos;s premier estate planning, succession litigation, and
                  testamentary advisory chamber. Our team of senior advocates and trust lawyers has drafted
                  hundreds of enforceable Wills for animal lovers, single guardians, and high-net-worth
                  philanthropists. We advise on cross-border estate transfers, Sub-Registrar Book 3
                  registrations, and High Court probate proceedings pan-India.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-base font-extrabold text-slate-900">100%</span>
                    <span className="text-[10px] text-slate-500 block uppercase">Bar Council Compliant</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-base font-extrabold text-slate-900">15+ Yrs</span>
                    <span className="text-[10px] text-slate-500 block uppercase">Succession Experience</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-base font-extrabold text-slate-900">500+</span>
                    <span className="text-[10px] text-slate-500 block uppercase">Probate Petitions</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-base font-extrabold text-slate-900">Pan-India</span>
                    <span className="text-[10px] text-slate-500 block uppercase">SRO Registration Desk</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    Need customized pet trust covenants or an irrevocable charitable foundation deed?
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
                  >
                    <span>Consult Succession Advocate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 12: FREQUENTLY ASKED QUESTIONS: PET & CHARITY BEQUESTS
                =================================================================== */}
            <section id="frequently-asked-questions" className="space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                  STATUTORY FAQS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Pet &amp; Charity Bequests
                </h3>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 pt-1 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ===================================================================
                SECTION 13: STATUTORY CITATIONS & OFFICIAL LEGAL AUTHORITIES
                =================================================================== */}
            <section id="statutory-citations" className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Official Legal Authorities
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 text-xs text-slate-600">
                <p className="leading-relaxed">
                  The clauses and legal rules presented on this page are governed by the following statutory
                  enactments and judicial authorities:
                </p>
                <ul className="space-y-2 list-disc pl-4 text-slate-700">
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Section 67 (void gifts to attesting
                    witnesses), Section 112 (bequests to non-existent persons void), Section 114 (rule
                    against perpetuity), Section 117 (direction for accumulation), Section 127 (conditional
                    bequests), and Section 131 (gift-over upon breach).
                  </li>
                  <li>
                    <strong>Supreme Court of India:</strong> <em>John Vallamattom &amp; Anr. v. Union of India</em>{" "}
                    (2003) 6 SCC 611 (declaring Section 118 ISA unconstitutional).
                  </li>
                  <li>
                    <strong>Indian Trusts Act, 1882:</strong> Sections 5 and 6 (creation of testamentary
                    trusts), Section 11 (fiduciary obligations of trustees).
                  </li>
                  <li>
                    <strong>Income Tax Act, 1961:</strong> Section 11(1)(d) (corpus donations exempt from 85%
                    application threshold), Section 12AB (registration of charitable institutions), and
                    Section 80G (deduction for donations).
                  </li>
                  <li>
                    <strong>Registration Act, 1908:</strong> Section 17 &amp; Section 18(e) (optional Will
                    registration before Sub-Registrar under Book 3).
                  </li>
                </ul>
              </div>
            </section>

            {/* ===================================================================
                SECTION 14: DUAL CONVERSION CTA BANNER
                =================================================================== */}
            <section className="rounded-3xl bg-[#172228] text-white p-6 sm:p-10 shadow-xl space-y-6 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECURE YOUR PET &amp; PHILANTHROPIC LEGACY TODAY</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-white max-w-2xl mx-auto leading-snug">
                Draft a Legally Enforceable Will with Custom Pet &amp; Charity Clauses
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Protect your loyal companion from abandonment and ensure your charitable donations reach
                genuine animal welfare causes. Start our self-serve online Will drafting flow or consult
                with a succession advocate today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Draft Your Will Online in 15 Mins</span>
                </button>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <PhoneCall className="w-4 h-4 text-[#C65378]" />
                  <span>Consult Succession Advocate</span>
                </Link>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bar Council Compliant</span>
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-rose-300" />
                  <span>100% Encrypted &amp; Confidential</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sub-Registrar Book 3 Formatted</span>
                </span>
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
                Specialist in Indian testamentary jurisprudence, conditional caretaker bequests, high-value
                charitable foundations, and probate petition litigation before High Courts.
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
                  <span>PREVENT PET ABANDONMENT</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Furry Child from Family Disregard
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Without a registered Will and Section 131 Gift-Over clause, pets are frequently given away
                  or abandoned by relatives after a testator passes away.
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
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Heart className="w-3 h-3" />
                  <span>PET TRUST &amp; 80G DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Structuring Large Charitable Endowments or Complex Pet Trusts?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession advocates structure private honorary trusts, corporate Section 8 animal
                  foundations, and temple endowment covenants pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: RELEVANT LINKS / SPOKES */}
              <div className="rounded-3xl bg-white border border-slate-200 shadow-xs p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>Related Formats &amp; Resources</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link
                      href="/templates/testamentary-trust-clause-minor-child-will-format"
                      className="text-slate-600 hover:text-[#C65378] flex items-center justify-between group"
                    >
                      <span>Testamentary Trust Clause Format</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/templates/life-interest-clause-for-spouse-will-format"
                      className="text-slate-600 hover:text-[#C65378] flex items-center justify-between group"
                    >
                      <span>Life Interest Clause Format</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/will-registration"
                      className="text-slate-600 hover:text-[#C65378] flex items-center justify-between group"
                    >
                      <span>SRO Will Registration Service</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="text-slate-600 hover:text-[#C65378] flex items-center justify-between group"
                    >
                      <span>Inherited Property Tax Calculator</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
