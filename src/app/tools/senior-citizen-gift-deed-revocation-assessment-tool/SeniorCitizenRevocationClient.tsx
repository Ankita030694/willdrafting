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
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  HeartHandshake,
  Clock,
  ShieldAlert,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Section 23 Senior Citizens Act" },
  { id: "interactive-assessment", label: "2. Free Section 23 Revocation Assessment Tool" },
  { id: "sudesh-chhikara-moat", label: "3. Express vs Implied Condition: Sudesh Chhikara Moat" },
  { id: "five-pillar-test", label: "4. The 5-Pillar Section 23 Statutory Test" },
  { id: "maintenance-tribunal-roadmap", label: "5. Maintenance Tribunal Filing Roadmap and SDM Powers" },
  { id: "eviction-and-residence", label: "6. Eviction and Residence Rights: S. Vanitha & Sunny Paul" },
  { id: "transfer-of-property-vs-sec23", label: "7. Transfer of Property Act Sec 126 vs Section 23" },
  { id: "comparison-table", label: "8. Legal Comparison: Tribunal vs Civil Court Suit" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Filing Gift Deed Revocation" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Delhi, Bengaluru, Mumbai" },
  { id: "legal-recital-templates", label: "11. Protective Recital Clauses & Document Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Senior Citizen Legal Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Gift Cancellation" },
  { id: "statutory-citations", label: "14. Legal Citations & Judicial Portals" },
];

const FAQS = [
  {
    q: "Can parents cancel a gift deed given to their child in India?",
    a: "Yes. Under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, an elderly parent who transferred property with a condition to receive basic care can ask the Maintenance Tribunal to cancel the deed if the child fails or refuses to provide food, shelter, or medical attention. The Sub-Divisional Magistrate (SDM) can declare the deed void.",
  },
  {
    q: "What did the Supreme Court rule in Sudesh Chhikara v. Ramti Devi (2022)?",
    a: "In Sudesh Chhikara (2022), the Supreme Court ruled that to cancel a gift deed under Section 23, the document must contain an express condition that the child will provide basic amenities and care. If the deed is an absolute unconditional gift, the Tribunal cannot presume an implied condition. In such situations, parents must seek eviction or civil remedies instead.",
  },
  {
    q: "What if my gift deed does not have an express maintenance condition?",
    a: "If your deed has no express condition, direct cancellation under Section 23 faces legal resistance under the Sudesh Chhikara ruling. However, you can still obtain swift relief. Under the Supreme Court ruling in S. Vanitha (2021) and High Court rulings like Sunny Paul, the SDM Tribunal can evict the abusive child and restore exclusive possession of the home to you.",
  },
  {
    q: "What is the age requirement to invoke Section 23 of the Senior Citizens Act?",
    a: "The property owner must have been at least 60 years of age on the exact date the gift deed was registered. If the parent was 58 or 59 years old when signing the transfer deed, Section 23 summary powers cannot be used, and the parent must file a regular civil court suit under Section 126 of the Transfer of Property Act.",
  },
  {
    q: "Can gift deeds signed before the 2007 Act came into force be cancelled?",
    a: "No. Section 23 applies only to property transfers executed after the Act came into force in your state (mostly late 2007 or 2008). Transfers executed before that date cannot be voided under Section 23. However, elderly parents can still claim monthly maintenance and medical assistance from their children under Section 4 and Section 9.",
  },
  {
    q: "How long does the Maintenance Tribunal take to decide a case?",
    a: "Under Section 5(6) of the Act, the Maintenance Tribunal is directed to complete its proceedings within 90 days of serving notice on the children. In reality, most SDM proceedings take 3 to 6 months. This is much faster than civil court title cancellation suits, which regularly take 5 to 10 years to reach a verdict.",
  },
  {
    q: "Does a senior citizen need an advocate before the Maintenance Tribunal?",
    a: "Section 17 of the Act states that legal practitioners cannot represent parties before the Maintenance Tribunal as a matter of right. However, High Courts have affirmed that senior citizens can take legal assistance for drafting, paperwork, and case strategy. You can also request the Tribunal to allow counsel when complex property questions are involved.",
  },
  {
    q: "What happens to the house after the SDM declares the gift deed void?",
    a: "Once the Maintenance Tribunal declares the gift deed void under Section 23, the order is forwarded to the Sub-Registrar and the local revenue office. The Sub-Registrar cancels the registration entry, the mutation in land records is reversed to the parent's name, and local police can assist in restoring exclusive physical possession.",
  },
];

export default function SeniorCitizenRevocationClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Diagnostic Assessment Form State
  const [ageAtTransfer, setAgeAtTransfer] = useState<"sixty_or_above" | "below_sixty">(
    "sixty_or_above"
  );
  const [executionDate, setExecutionDate] = useState<
    "after_act_commenced" | "before_act_commenced"
  >("after_act_commenced");
  const [conditionType, setConditionType] = useState<
    "express_clause" | "implied_oral_promise" | "unconditional_absolute" | "conditional_life_interest"
  >("express_clause");
  const [breachNature, setBreachNature] = useState<
    "total_neglect_medical" | "physical_mental_eviction" | "unauthorized_sale_mortgage" | "financial_maintenance_refusal"
  >("total_neglect_medical");
  const [desiredRemedy, setDesiredRemedy] = useState<
    "cancel_gift_deed_reversal" | "eviction_of_child_possession" | "monthly_maintenance_security" | "injunction_against_sale"
  >("cancel_gift_deed_reversal");

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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleReset = () => {
    setAgeAtTransfer("sixty_or_above");
    setExecutionDate("after_act_commenced");
    setConditionType("express_clause");
    setBreachNature("total_neglect_medical");
    setDesiredRemedy("cancel_gift_deed_reversal");
  };

  // Section 23 Diagnostic Assessment Calculation Engine
  let assessmentTitle = "High Section 23 Revocation Viability";
  let assessmentBadge = "Section 23(1) Direct Cancellation";
  let caseStrengthScore = 95;
  let sdmTribunalJurisdiction = "Full Summary Cancellation Jurisdiction";
  let landmarkPrecedent = "Maintenance and Welfare of Parents Act 2007 s. 23(1)";
  let legalRationale =
    "All statutory criteria are satisfied. The senior citizen was 60+ at execution, transfer occurred post-2007, and the deed contained an express care clause. Under Section 23(1), the failure to provide basic amenities creates a legal fiction of fraud and undue influence, empowering the SDM Tribunal to declare the transfer void.";
  let strategicRecommendation =
    "File a formal Section 23 petition before the local Sub-Divisional Magistrate (SDM) Maintenance Tribunal. Request simultaneous directions to the Sub-Registrar to annul the registration index and direct police to restore peaceful possession.";

  if (ageAtTransfer === "below_sixty") {
    assessmentTitle = "Ineligible Under Section 23: Age Threshold Not Met";
    assessmentBadge = "Civil Court Remedy Required";
    caseStrengthScore = 25;
    sdmTribunalJurisdiction = "SDM Lacks Section 23 Jurisdiction (Age < 60)";
    landmarkPrecedent = "Section 2(h) MWPSC Act 2007 & Section 126 Transfer of Property Act";
    legalRationale =
      "Section 23 strictly protects individuals who were senior citizens (age 60 or above) on the date of property transfer. Because the transferor was below 60 when signing the deed, the Maintenance Tribunal cannot declare the transfer void under summary jurisdiction.";
    strategicRecommendation =
      "File a civil suit in the competent Civil Court under Section 126 of the Transfer of Property Act for revocation on grounds of misrepresentation, or file under Section 4/9 for maintenance once you attain 60 years.";
  } else if (executionDate === "before_act_commenced") {
    assessmentTitle = "Pre-2007 Transfer: Section 23 Retrospective Bar";
    assessmentBadge = "Alternative Civil & Maintenance Remedy";
    caseStrengthScore = 35;
    sdmTribunalJurisdiction = "Section 23 Voiding Inapplicable (No Retrospective Effect)";
    landmarkPrecedent = "Supreme Court Rulings on Non-Retrospective Nature of Section 23";
    legalRationale =
      "The statutory text of Section 23 explicitly mandates that the transfer must have taken place 'after the commencement of this Act'. Deeds registered prior to late 2007 cannot be cancelled through summary SDM proceedings.";
    strategicRecommendation =
      "Pursue a dual track: file before the SDM Tribunal under Section 4 and Section 9 for lifetime monthly maintenance, and initiate a civil suit under Section 126 Transfer of Property Act for deed cancellation.";
  } else if (conditionType === "unconditional_absolute" || conditionType === "implied_oral_promise") {
    if (desiredRemedy === "eviction_of_child_possession") {
      assessmentTitle = "High Eviction Viability: S. Vanitha & Sunny Paul Doctrine";
      assessmentBadge = "Eviction & Possession Restoration";
      caseStrengthScore = 90;
      sdmTribunalJurisdiction = "Full Eviction Jurisdiction Under State Maintenance Rules";
      landmarkPrecedent = "S. Vanitha v. Deputy Commissioner (2021) 15 SCC 730";
      legalRationale =
        "Even without an express maintenance clause, the Supreme Court in S. Vanitha (2021) and Delhi High Court in Sunny Paul confirmed that the Maintenance Tribunal possesses sweeping powers to evict abusive children and restore exclusive residence to senior citizens.";
      strategicRecommendation =
        "Frame your petition under Section 4, Section 22, and State Maintenance Rules seeking immediate eviction and peaceful possession, avoiding long delays over deed voiding.";
    } else {
      assessmentTitle = "Sudesh Chhikara (SC 2022) Precedent Alert";
      assessmentBadge = "Deed Voiding Vulnerable / Eviction Advised";
      caseStrengthScore = 55;
      sdmTribunalJurisdiction = "Deed Voiding Restricted; Eviction Fully Available";
      landmarkPrecedent = "Sudesh Chhikara v. Ramti Devi (2022 SC) Civil Appeal 174/2021";
      legalRationale =
        "The Supreme Court ruled in Sudesh Chhikara that where a gift deed contains no express condition of maintenance, the Tribunal cannot infer one simply from love and affection. Attempting to void the title directly carries high risk of High Court challenge.";
      strategicRecommendation =
        "Plead a dual prayer before the SDM: primarily seek eviction and physical possession under S. Vanitha (2021) guidelines, coupled with statutory monthly maintenance under Section 4, while preserving your right to civil remedies.";
    }
  } else if (conditionType === "conditional_life_interest") {
    assessmentTitle = "High Enforceability: Registered Life Interest Protection";
    assessmentBadge = "Life Estate Enforcement & Eviction";
    caseStrengthScore = 92;
    sdmTribunalJurisdiction = "Tribunal Can Enforce Life Usufruct & Evict Defaulters";
    landmarkPrecedent = "Section 23 MWPSC Act read with Section 126 Transfer of Property Act";
    legalRationale =
      "Because the donor retained lifetime residence and income rights in the deed, any interference by the child constitutes a direct breach of property title terms, enabling swift SDM intervention and police protection.";
    strategicRecommendation =
      "File before the Maintenance Tribunal for removal of interference, cancellation of mutation changes, and eviction of the transferee for violating reserved life rights.";
  }

  const copyClauseToClipboard = () => {
    const clauseText = `MANDATORY SECTION 23 PROTECTIVE CLAUSE FOR INDIAN GIFT DEEDS:
"This Gift Deed is executed by the Donor in favour of the Donee subject to the EXPRESS AND MANDATORY CONDITION under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, that the Donee shall throughout the lifetime of the Donor provide all basic amenities, food, shelter, clothing, emotional support, and complete medical and healthcare needs to the Donor.

In the event the Donee fails or refuses to provide such basic amenities, care, or physical needs at any point during the Donor's lifetime, this transfer of property shall be deemed to have been procured by fraud, coercion, and undue influence under Section 23(1) of the said Act, and the Donor shall retain the absolute and unilateral right to have this Deed declared void by the Maintenance Tribunal and repossess the Schedule Property."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: FILING SECTION 23 GIFT DEED REVOCATION BEFORE SDM TRIBUNAL
1. Certified copy of the registered Gift Deed or Settlement Deed from Sub-Registrar Office.
2. Age proof of Senior Citizen showing age 60+ on execution date (Aadhaar / Voter ID / Passport / Matriculation).
3. Title documents showing Donor was absolute owner prior to gift (Sale Deed / Mutation Records / Khata).
4. Evidence of breach of care (medical treatment bills unpaid by child, hospital discharge papers).
5. Police complaints / DD entries / complaints to Senior Citizen Cell regarding harassment or physical threats.
6. Bank account statements establishing lack of financial support or pension dependency.
7. Proof of current residence and unauthorized occupation or lock-out attempts by children.
8. Written legal notice sent to the transferee demanding maintenance and care (optional but helpful).
9. Copy of local revenue record (7/12 extract / Jamabandi / Patta) showing current status of entry.
10. Duly verified Section 23 Application Form signed by the Senior Citizen transferor.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>MAINTENANCE AND WELFARE OF PARENTS ACT 2007 • SECTION 23</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Senior Citizen Gift Deed Cancellation Eligibility Tool
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Evaluate Section 23 gift deed cancellation viability in minutes. Check maintenance clauses,
            the 2022 Supreme Court Sudesh Chhikara test, and SDM Tribunal eviction powers.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Revocation Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/senior-citizen-gift-deed-cancellation-tribunal-advocate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Gavel className="w-4 h-4 text-[#C65378]" />
              <span>Tribunal Advocate Retainer</span>
            </Link>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 23</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SUMMARY SDM POWERS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sudesh Chhikara</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SC 2022 CONDITION RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">90-Day Target</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SPEEDY TRIBUNAL DISPOSAL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">S. Vanitha</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EVICTION &amp; RESIDENCE
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
                <span>Legal Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens
                Act, 2007. Anchored in Supreme Court precedents in Sudesh Chhikara and S. Vanitha.
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
                <span>EXECUTIVE BRIEF: GIFT DEED REVOCATION FOR SENIOR CITIZENS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Deeming Fiction:</strong> When a child neglects an elderly parent
                    after receiving property under a condition of maintenance, Section 23(1) treats the
                    transfer as procured through fraud, coercion, or undue influence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Sudesh Chhikara Precedent:</strong> The Supreme Court held that the
                    maintenance condition must be expressed in the deed. If the deed is unconditional,
                    cancellation under Section 23 faces strict tests, but eviction remains available.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Summary SDM Powers:</strong> Unlike civil suits that take 8 to 12 years, the
                    Maintenance Tribunal chaired by the Sub-Divisional Magistrate aims to complete hearings
                    in 90 days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Eviction of Abusive Relatives:</strong> Under S. Vanitha (2021), the Tribunal
                    has authority to order eviction of children and restore exclusive possession of the
                    home to the senior citizen.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL IMAGE CARD */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/images/senior-citizen-gift-deed-revocation-assessment-tool.jpg"
                  alt="Senior Citizen Gift Deed Cancellation Tool Section 23 Checker"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-rose-50/40 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium text-slate-800">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>Maintenance and Welfare of Parents Act 2007 • Section 23 Eviction &amp; Revocation Desk</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Legal Analysis</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (Strict Single H2) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Foundation: Section 23 Senior Citizens Act
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Indian family arrangements, elderly parents frequently execute registered gift deeds
                  or settlement deeds transferring their residential homes or self-acquired lands to children
                  under the mutual understanding that the children will care for them in old age. Tragically,
                  once title transfers, neglect, harassment, or abandonment often follows.
                </p>
                <p>
                  To address this social injustice, Parliament enacted the Maintenance and Welfare of Parents
                  and Senior Citizens Act, 2007 (MWPSC Act). <strong>Section 23(1)</strong> creates a special
                  statutory mechanism:
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs font-serif text-slate-800 text-xs sm:text-sm leading-relaxed border-l-4 border-l-[#C65378]">
                  &ldquo;Where any senior citizen who, after the commencement of this Act, has transferred by
                  way of gift or otherwise, his property, subject to the condition that the transferee shall
                  provide the basic amenities and basic physical needs to the transferor and such transferee
                  refuses or fails to provide such amenities and physical needs, the said transfer of property
                  shall be deemed to have been made by fraud or coercion or under undue influence and shall at
                  the option of the transferor be declared void by the Tribunal.&rdquo;
                </div>
                <p>
                  This deeming fiction bypasses tedious civil court fraud litigation. Instead of proving active
                  deceit, the statutory failure of care itself establishes legal fraud, giving the Maintenance
                  Tribunal summary power to void the deed.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE ASSESSMENT TOOL */}
            <section id="interactive-assessment" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Section 23 Revocation Assessment Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Complete the 5 assessment steps below to evaluate whether your gift deed qualifies for
                cancellation before the Sub-Divisional Magistrate (SDM) Maintenance Tribunal.
              </p>

              {/* Assessment Tool Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Senior Citizen Age at Transfer */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: What was the transferor&apos;s age on the deed execution date?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "sixty_or_above",
                        label: "Age 60 or Above (Senior Citizen)",
                        desc: "The owner had attained 60 years on the date the deed was signed and registered",
                      },
                      {
                        id: "below_sixty",
                        label: "Below 60 Years of Age",
                        desc: "The owner was under 60 years when signing (e.g. 52, 57, or 59 years old)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAgeAtTransfer(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          ageAtTransfer === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Date of Transfer Execution */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: When was the property transfer deed executed and registered?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "after_act_commenced",
                        label: "After Act Commenced (Post-2007)",
                        desc: "Deed was signed after the MWPSC Act was notified in your state (2008 to present)",
                      },
                      {
                        id: "before_act_commenced",
                        label: "Prior to Act (Pre-2007)",
                        desc: "Transfer was executed and registered before the Act took effect (e.g. 1995 to 2006)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setExecutionDate(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          executionDate === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Condition Clause in the Deed */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 3: What does the deed text say regarding maintenance and care?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "express_clause",
                        label: "Express Condition Clause Written in Deed",
                        desc: "Deed explicitly states the transfer is subject to transferee providing basic needs, shelter, and medical care",
                      },
                      {
                        id: "implied_oral_promise",
                        label: "Oral Promise / Love & Affection Only",
                        desc: "Deed states love and affection with no written maintenance clause, but child orally promised care",
                      },
                      {
                        id: "unconditional_absolute",
                        label: "Unconditional & Irrevocable Gift",
                        desc: "Deed expressly declares the gift is absolute, irrevocable, and without conditions",
                      },
                      {
                        id: "conditional_life_interest",
                        label: "Reserved Lifetime Residence / Usufruct",
                        desc: "Parent retained life interest, right of residence, or rental income for their natural lifetime",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setConditionType(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          conditionType === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Nature of Breach or Neglect */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    <span>Step 4: What is the current nature of neglect, breach, or harassment?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "total_neglect_medical",
                        label: "Denial of Food, Shelter & Medical Treatment",
                        desc: "Child completely refuses to provide medicines, meals, doctor visits, or basic survival support",
                      },
                      {
                        id: "physical_mental_eviction",
                        label: "Physical/Mental Abuse & Threats of Eviction",
                        desc: "Child verbally or physically harasses parent, attempting to throw them out of the house",
                      },
                      {
                        id: "unauthorized_sale_mortgage",
                        label: "Attempting to Sell or Mortgage the Property",
                        desc: "Child is actively negotiating sale, bringing brokers, or taking bank loans on the home",
                      },
                      {
                        id: "financial_maintenance_refusal",
                        label: "Refusal to Pay Monthly Support",
                        desc: "Child occupies property comfortably while leaving elderly parent with zero income",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBreachNature(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          breachNature === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 5: Desired Legal Remedy */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#C65378]" />
                    <span>Step 5: What is your primary desired legal relief?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "cancel_gift_deed_reversal",
                        label: "Cancel Gift Deed",
                        desc: "Declare deed void and return title to parent",
                      },
                      {
                        id: "eviction_of_child_possession",
                        label: "Evict Abusive Child",
                        desc: "Remove child and recover physical possession",
                      },
                      {
                        id: "monthly_maintenance_security",
                        label: "Monthly Maintenance",
                        desc: "Secure monthly living and medical allowance",
                      },
                      {
                        id: "injunction_against_sale",
                        label: "Injunction on Sale",
                        desc: "Stop child from transferring or mortgaging home",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDesiredRemedy(opt.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          desiredRemedy === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Assessment to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        SECTION 23 DIAGNOSTIC ASSESSMENT RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {assessmentTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{assessmentBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        CASE VIABILITY SCORE
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {caseStrengthScore}/100
                      </div>
                      <div className="text-[11px] text-slate-300">Statutory Probability</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TRIBUNAL SUMMARY POWERS
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white">
                        {sdmTribunalJurisdiction}
                      </div>
                      <div className="text-[11px] text-slate-300">Section 7 &amp; 23 Jurisdiction</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        LANDMARK GOVERNING PRECEDENT
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-300">
                        {landmarkPrecedent}
                      </div>
                      <div className="text-[11px] text-slate-300">Binding Supreme Court Law</div>
                    </div>
                  </div>

                  {/* Detailed Analysis Breakdown */}
                  <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                      <Info className="w-4 h-4" />
                      <span>Strategic Legal Evaluation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {legalRationale}
                    </p>
                    <div className="pt-2 border-t border-white/10 text-xs sm:text-sm text-white font-medium">
                      <strong className="text-rose-200">Recommended Action: </strong>
                      {strategicRecommendation}
                    </div>
                  </div>

                  {/* Dual Action CTAs in Results Box */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href="/services/senior-citizen-gift-deed-cancellation-tribunal-advocate"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5 text-center"
                    >
                      <Gavel className="w-4 h-4" />
                      <span>Retain Tribunal Counsel</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors text-center"
                    >
                      <PhoneCall className="w-4 h-4 text-rose-300" />
                      <span>Book Legal Consultation</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: SUDESH CHHIKARA PRECEDENT MOAT */}
            <section id="sudesh-chhikara-moat" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT &amp; RANKING MOAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Express vs Implied Condition: The Sudesh Chhikara Moat
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most online law blogs quote Section 23 of the Senior Citizens Act generically, claiming
                  that any parent who gifted a property can simply walk into an SDM office and cancel the
                  deed. This oversimplification misleads thousands of elderly parents and leads to adverse
                  High Court stays.
                </p>
                <p>
                  On <strong>December 6, 2022</strong>, a two-judge bench of the Supreme Court of India
                  comprising Justice Sanjay Kishan Kaul and Justice Abhay S. Oka delivered a decisive
                  judgment in <em>Sudesh Chhikara v. Ramti Devi &amp; Anr.</em> (Civil Appeal No. 174 of 2021).
                  The Court interpreted the statutory phrasing of Section 23(1) and established two
                  cumulative conditions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                      Prerequisite 1: Express Condition
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      The transfer deed must contain an express condition that the transferee shall provide
                      the basic amenities and basic physical needs to the transferor. Love and affection alone
                      cannot be presumed to mean an implied maintenance condition.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                      Prerequisite 2: Refusal or Failure
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      The transferee must have refused or failed to provide such amenities. Only when both
                      elements coexist does the statutory deeming fiction of fraud and undue influence arise.
                    </p>
                  </div>
                </div>
                <p>
                  <strong>How to Protect Yourself if Your Deed is Unconditional:</strong> If your gift deed
                  does not contain an express maintenance clause, your petition should NOT solely seek title
                  cancellation under Section 23. Instead, our senior advocates structure the prayer to seek
                  immediate <strong>eviction and physical recovery of the residence</strong> under State
                  Maintenance Rules and the Supreme Court doctrine in <em>S. Vanitha (2021)</em>, coupled with
                  maximum monthly maintenance under Section 4 and Section 9.
                </p>
              </div>
            </section>

            {/* SECTION 4: THE 5-PILLAR STATUTORY TEST */}
            <section id="five-pillar-test" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STATUTORY CRITERIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Statutory Prerequisites: The 5-Pillar Section 23 Test
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                To withstand judicial scrutiny in the Maintenance Tribunal and Appellate High Courts, an
                application under Section 23 must satisfy five strict pillars:
              </p>
              <div className="space-y-3">
                {[
                  {
                    pillar: "Pillar 1: Senior Citizen Status on Transfer Date",
                    desc: "The transferor must have been at least 60 years of age on the date of execution. If the deed was executed when the parent was 58, Section 23 cannot be invoked even if the parent is now 70.",
                  },
                  {
                    pillar: "Pillar 2: Transfer Executed Post-Act Commencement",
                    desc: "The property transfer (Gift Deed, Settlement Deed, or Release Deed) must have taken place after the MWPSC Act 2007 came into force in the respective state (2007-2008 onwards).",
                  },
                  {
                    pillar: "Pillar 3: Absolute Ownership Prior to Transfer",
                    desc: "The property transferred must have been the self-acquired or absolute property of the senior citizen. Undivided ancestral coparcenary property requires partition before Section 23 title remedies.",
                  },
                  {
                    pillar: "Pillar 4: Condition of Care and Amenities",
                    desc: "The deed must reflect the condition to provide food, shelter, clothing, medical care, or life usufruct, as mandated by the Supreme Court in Sudesh Chhikara (2022).",
                  },
                  {
                    pillar: "Pillar 5: Documented Refusal, Breach, or Neglect",
                    desc: "Tangible evidence must demonstrate that the child failed to provide necessities, stopped medical care, engaged in physical harassment, or attempted unauthorized alienation of the house.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900">{item.pillar}</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: MAINTENANCE TRIBUNAL FILING ROADMAP & SDM POWERS */}
            <section id="maintenance-tribunal-roadmap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SUMMARY PROCEEDINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Maintenance Tribunal Filing Roadmap and SDM Powers
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 7 of the Act establishes Maintenance Tribunals for each sub-division, presided
                  over by the <strong>Sub-Divisional Magistrate (SDM)</strong> or Revenue Divisional Officer
                  (RDO). The Tribunal possesses all the powers of a Civil Court under the Code of Civil
                  Procedure, 1908 (CPC) for taking evidence, enforcing attendance, and issuing binding
                  orders.
                </p>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Statutory Powers of the SDM Tribunal Under Section 23:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Declaration of Voidness:</strong> Issuing an order declaring the registered
                        gift deed null, void, and non-est in the eyes of law.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Direction to Sub-Registrar:</strong> Formally directing the Sub-Registrar
                        of Assurances to make entries in Book 1 cancelling the registration document.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Revenue Mutation Reversal:</strong> Directing the Tehsildar to restore the
                        senior citizen&apos;s name as the sole recorded owner in revenue records (Khata,
                        7/12, or Jamabandi).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Police Enforcement of Possession:</strong> Ordering local police authorities
                        to remove trespassers or abusive relatives and deliver peaceful vacant possession.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: EVICTION AND RESIDENCE RIGHTS */}
            <section id="eviction-and-residence" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HeartHandshake className="w-4 h-4" />
                <span>LANDMARK JURISPRUDENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Eviction and Residence Rights: S. Vanitha and Sunny Paul
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A common battleground arises when children claim that the Maintenance Tribunal only has
                  powers to grant monetary maintenance (up to ₹10,000 per month under the unamended Act)
                  and cannot order eviction. This argument was decisively rejected by the Supreme Court of
                  India in <strong>S. Vanitha v. Deputy Commissioner, Bengaluru Urban (2021) 15 SCC 730</strong>.
                </p>
                <p>
                  The Supreme Court affirmed that the MWPSC Act is an overarching social welfare legislation.
                  Section 22 mandates State Governments to prescribe a comprehensive plan for life and
                  property protection. The Court ruled:
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs font-serif text-slate-800 text-xs sm:text-sm leading-relaxed border-l-4 border-l-[#5F7E75]">
                  &ldquo;The Tribunal under the Senior Citizens Act has the authority to order an eviction
                  if it is necessary and expedient to ensure the maintenance and physical protection of the
                  senior citizen. The right of a senior citizen to live in peace in their own house cannot be
                  defeated by children claiming permissive possession.&rdquo;
                </div>
                <p>
                  Similarly, in <em>Sunny Paul v. State NCT of Delhi (2018)</em>, the Delhi High Court held
                  that an eviction petition before the Maintenance Tribunal is maintainable against sons,
                  daughters, or daughters-in-law who ill-treat senior citizens, irrespective of whether a gift
                  deed cancellation is pending.
                </p>
              </div>
            </section>

            {/* SECTION 7: SECTION 126 TRANSFER OF PROPERTY ACT VS SECTION 23 */}
            <section id="transfer-of-property-vs-sec23" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY INTERPLAY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Transfer of Property Act Section 126 vs Section 23 MWPSC
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under general civil law, <strong>Section 126 of the Transfer of Property Act, 1882 (TPA)</strong>{" "}
                  stipulates that a gift cannot be revoked except upon the happening of a specified event
                  agreed upon by the parties that does not depend on the will of the donor. In ordinary civil
                  courts, revoking an unconditional gift deed is virtually impossible unless active fraud at
                  the inception of the deed is proven beyond reasonable doubt.
                </p>
                <p>
                  <strong>Section 23 of the MWPSC Act operates with overriding statutory effect</strong>{" "}
                  under Section 3 of the 2007 Act (&ldquo;Act to have overriding effect&rdquo;). This gives
                  senior citizens three massive legal advantages over general civil litigation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-slate-900">1. Deemed Fraud Fiction</div>
                    <div className="text-[11px] text-slate-600">
                      No need to prove deceit at the time of signing. Subsequent breach of care automatically
                      creates statutory fraud.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-slate-900">2. Zero Ad Valorem Fee</div>
                    <div className="text-[11px] text-slate-600">
                      No heavy 4% to 7% civil court fees on property valuation. Section 23 applications
                      require minimal nominal court fees.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-slate-900">3. Summary Timeline</div>
                    <div className="text-[11px] text-slate-600">
                      Decided within 90 to 180 days by the SDM, avoiding decades of civil court trials and
                      interlocutory appeals.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: LEGAL COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Section 23 Tribunal vs Civil Court Suit
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Review the core legal and procedural differences between seeking gift deed revocation before
                the SDM Maintenance Tribunal versus filing a regular suit before the Civil Judge.
              </p>

              {/* Responsive Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#172228] text-white border-b border-slate-700">
                        <th className="p-3.5 font-extrabold uppercase tracking-wider">Parameter</th>
                        <th className="p-3.5 font-extrabold uppercase tracking-wider text-rose-300">
                          Section 23 Maintenance Tribunal (SDM)
                        </th>
                        <th className="p-3.5 font-extrabold uppercase tracking-wider text-slate-300">
                          Civil Court Suit (Civil Judge / District Court)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {[
                        {
                          param: "Governing Law",
                          tribunal: "MWPSC Act, 2007 (Section 23)",
                          civil: "Specific Relief Act & Transfer of Property Act (Sec 126)",
                        },
                        {
                          param: "Adjudicating Officer",
                          tribunal: "Sub-Divisional Magistrate (SDM) / RDO",
                          civil: "Civil Judge (Junior/Senior Division)",
                        },
                        {
                          param: "Statutory Disposal Timeline",
                          tribunal: "Mandated 90 days (realistically 3 to 6 months)",
                          civil: "5 to 12 years across trial and appeals",
                        },
                        {
                          param: "Court Fee Required",
                          tribunal: "Nominal application fee (₹50 to ₹100)",
                          civil: "Ad valorem court fee (3% to 7% of property market value)",
                        },
                        {
                          param: "Standard of Proof",
                          tribunal: "Deeming fiction: breach of care equals fraud",
                          civil: "Strict proof of fraud, undue influence, or mental incapacity",
                        },
                        {
                          param: "Eviction Power",
                          tribunal: "Direct summary eviction under S. Vanitha (2021)",
                          civil: "Requires separate execution proceedings after decree",
                        },
                        {
                          param: "First Appeal Forum",
                          tribunal: "District Magistrate (Appellate Tribunal, Sec 16)",
                          civil: "District Court & High Court (Regular First Appeal)",
                        },
                        {
                          param: "Effect on Sub-Registrar",
                          tribunal: "Direct statutory order to annul Book 1 entry",
                          civil: "Requires decree transmission under Specific Relief Act",
                        },
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                        >
                          <td className="p-3.5 font-bold text-slate-900">{row.param}</td>
                          <td className="p-3.5 font-semibold text-[#C65378]">{row.tribunal}</td>
                          <td className="p-3.5 text-slate-600">{row.civil}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Filing Gift Deed Revocation at Tribunal
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this 5-stage standard operating procedure when preparing and filing an application
                for gift deed revocation before the Maintenance Tribunal:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: "Stage 1: Document Curation & Age Proof Assembly",
                    desc: "Obtain a certified copy of the registered gift deed from the Sub-Registrar Office (SRO). Gather primary age proof verifying you were 60+ on the execution date, alongside title records showing you were the sole owner.",
                  },
                  {
                    step: "Stage 2: Section 23 Application Drafting",
                    desc: "Draft a formal petition under Section 23(1) and Section 4 of the MWPSC Act. If the deed contains an express condition, cite Sudesh Chhikara. If unconditional, include alternate prayers for eviction and residence rights under S. Vanitha.",
                  },
                  {
                    step: "Stage 3: Filing & Summons Issuance",
                    desc: "File the petition before the SDM having territorial jurisdiction over the property or where the senior citizen resides. The Tribunal issues summons to the child with a 15-day appearance notice.",
                  },
                  {
                    step: "Stage 4: Summary Hearing & Conciliation",
                    desc: "The Tribunal conducts summary conciliation. If the child refuses to vacate or fails to establish fulfillment of maintenance, the Tribunal closes evidence and reserves judgment.",
                  },
                  {
                    step: "Stage 5: Final Order, Registration Cancellation & Possession",
                    desc: "The SDM pronounces final order declaring the gift deed void. The order is served on the Sub-Registrar to cancel registration, the Tehsildar to restore revenue mutation, and the SHO for police assistance.",
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">{s.step}</div>
                      <div className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: REALISTIC PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>CASE STUDY ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Delhi, Bengaluru, Mumbai and Pune
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Examine how Maintenance Tribunals apply Section 23 and eviction principles across realistic
                Indian property scenarios:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                      Delhi NCR • South Extension Flat
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Deed Voided
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Express Clause Retained: Son Neglects Elderly Mother
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 72-year-old widow gifted her 3BHK flat to her youngest son in 2019 with an express clause
                    stipulating complete medical care. In 2023, the son moved to Dubai, leaving the mother
                    without financial or medical help.
                  </p>
                  <div className="text-xs text-slate-800 font-medium pt-2 border-t border-slate-100">
                    <strong>Verdict:</strong> The SDM (South Delhi) held that Sudesh Chhikara criteria were met,
                    declared the deed void under Section 23(1), and directed the Sub-Registrar to cancel the deed.
                  </div>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                      Bengaluru • Whitefield Villa
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                      Eviction Granted
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Unconditional Gift Deed: Daughter-in-Law Harassment
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 68-year-old retired PSU director gifted his villa unconditionally to his son. After
                    marriage, the son and daughter-in-law mentally tortured the father and locked his kitchen.
                  </p>
                  <div className="text-xs text-slate-800 font-medium pt-2 border-t border-slate-100">
                    <strong>Verdict:</strong> Under S. Vanitha (SC 2021), the Assistant Commissioner ordered the
                    son and daughter-in-law to vacate within 30 days and restored exclusive possession to the father.
                  </div>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                      Mumbai • Kandivali CHS Apartment
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                      Sale Restrained
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Child Attempts Unauthorized Sale to Third Party
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A son attempted to sell a gifted co-operative society flat to a third-party developer while
                    his 81-year-old father was undergoing cancer surgery.
                  </p>
                  <div className="text-xs text-slate-800 font-medium pt-2 border-t border-slate-100">
                    <strong>Verdict:</strong> The Tribunal issued an immediate interim injunction restraining
                    the Society from transferring shares and froze the registration portal entry.
                  </div>
                </div>

                {/* Case 4 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-[#C65378] uppercase tracking-wider">
                      Pune • Kothrud Bungalow
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Life Interest Protected
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Life Usufruct Breach: Police Enforces Physical Entry
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parents gifted a bungalow reserving lifetime residential rights. The son changed main gate
                    locks to exclude his father following a domestic dispute.
                  </p>
                  <div className="text-xs text-slate-800 font-medium pt-2 border-t border-slate-100">
                    <strong>Verdict:</strong> The SDM directed the local Police Inspector to break locks, escort
                    the father back into the master bedroom, and warn the son of Section 24 criminal action.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY RECITAL CLAUSES & EVIDENCE CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL DRAFTING &amp; TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Statutory Recital Clauses and Evidence Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                If you are planning to gift property to your children, or if you need to file an application
                before the Maintenance Tribunal, use our lawyer-crafted templates below.
              </p>

              {/* Template Box 1: Protective Recital Clause */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Section 23 Protective Recital Clause (For New Gift Deeds)</span>
                  </div>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  Insert this exact clause into any future gift deed or settlement deed. It directly meets
                  the Supreme Court standard in Sudesh Chhikara (2022) and guarantees total revocation protection.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 overflow-x-auto whitespace-pre-wrap">
                  {`"This Gift Deed is executed by the Donor in favour of the Donee subject to the EXPRESS AND MANDATORY CONDITION under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, that the Donee shall throughout the lifetime of the Donor provide all basic amenities, food, shelter, clothing, emotional support, and complete medical and healthcare needs to the Donor.

In the event the Donee fails or refuses to provide such basic amenities, care, or physical needs at any point during the Donor's lifetime, this transfer of property shall be deemed to have been procured by fraud, coercion, and undue influence under Section 23(1) of the said Act, and the Donor shall retain the absolute and unilateral right to have this Deed declared void by the Maintenance Tribunal and repossess the Schedule Property."`}
                </div>
              </div>

              {/* Template Box 2: 10-Point Document Checklist */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>10-Point Document Checklist for Tribunal Filing</span>
                  </div>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {[
                    "1. Certified copy of registered Gift Deed from SRO",
                    "2. Senior citizen age proof showing 60+ on execution date",
                    "3. Original title deeds showing prior absolute ownership",
                    "4. Medical bills showing denial of medical care",
                    "5. Police complaints / Senior Citizen Cell representations",
                    "6. Bank statements proving lack of financial maintenance",
                    "7. Proof of residence and lockout / harassment evidence",
                    "8. Written legal notice served on children demanding care",
                    "9. Current revenue records (7/12, Jamabandi, or Khata)",
                    "10. Duly verified Section 23 Petition signed by parent",
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-150">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Senior Citizen Legal Advocacy
              </h3>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/20 to-emerald-50/20 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-lg shrink-0">
                    AMA
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">AMA Legal Solutions</div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Citizen Property &amp; Succession Practice Group
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting, powered by AMA Legal Solutions, maintains a dedicated senior citizen
                  protection practice. Our senior estate advocates appear before Maintenance Tribunals,
                  Appellate Tribunals (District Magistrates), and High Courts across New Delhi, Mumbai,
                  Bengaluru, Chennai, Hyderabad, and Kolkata.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900">500+ Senior Matters</div>
                    <div className="text-[11px] text-slate-500">Tribunal &amp; High Court Petitions</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900">Speedy Eviction Orders</div>
                    <div className="text-[11px] text-slate-500">S. Vanitha Guideline Compliance</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900">Title Recovery</div>
                    <div className="text-[11px] text-slate-500">Sub-Registrar Annullment SOP</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ ACCORDION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Gift Deed Cancellation
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear answers to common questions regarding Section 23 of the Senior Citizens Act,
                tribunal jurisdiction, and child eviction.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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

            {/* SECTION 14: STATUTORY CITATIONS & PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Portals and Landmark Precedent Citations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#C65378] transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">India Code: MWPSC Act, 2007</div>
                    <div className="text-[11px] text-slate-500">Official Central Government Bare Act</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#C65378] transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">Supreme Court of India Portal</div>
                    <div className="text-[11px] text-slate-500">Sudesh Chhikara &amp; S. Vanitha Judgments</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </section>

            {/* PLAIN ENGLISH READABILITY SUMMARY STRIP (Flesch Score Booster) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Protect Your Property Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your home gives you safety and peace in old age. Do not sign away your rights without a
                  clear care clause. If a child stops caring for you, act quickly before the SDM Tribunal.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You do not need costly stamp papers to write a Will. Write your Will on plain white paper.
                  Sign before two adult witnesses to keep 100% control until your last breath.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your gift papers and past notices. We draft strong petitions for the SDM
                  office and guide you step by step so you can live peacefully in your home.
                </p>
              </div>
            </div>
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
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in senior citizen property disputes, Section 23 gift deed revocation petitions,
                and SDM Maintenance Tribunal litigation.
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
              {/* CARD 2: DUAL CTA 1 - TRIBUNAL ADVOCATE RETAINER (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>TRIBUNAL REPRESENTATION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Cancel Your Gift Deed &amp; Recover Your House
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our senior advocates draft your Section 23 petition, represent you before the SDM Tribunal,
                  and reverse revenue mutation records.
                </p>
                <Link
                  href="/services/senior-citizen-gift-deed-cancellation-tribunal-advocate"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Retain Tribunal Advocate</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backed by Sudesh Chhikara &amp; S. Vanitha</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - LEGAL CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SENIOR CITIZEN ADVISORY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Harassment or Threat of Eviction?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Schedule a private legal consultation with our succession attorneys to review your gift
                  deed clauses and prepare your defense.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Senior Citizens Choose WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supreme Court Backed:</strong> Every petition is crafted to satisfy the
                      demanding <em>Sudesh Chhikara</em> condition test.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Eviction Strategy:</strong> We combine Section 23 voiding with <em>S. Vanitha</em>{" "}
                      eviction prayers to prevent adverse stays.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Full Property Restoration:</strong> We ensure orders are served directly on
                      the Sub-Registrar and local police.
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
          href="#interactive-assessment"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Assessment Tool</span>
        </a>
        <Link
          href="/services/senior-citizen-gift-deed-cancellation-tribunal-advocate"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Retain Advocate</span>
        </Link>
      </div>
    </div>
  );
}
