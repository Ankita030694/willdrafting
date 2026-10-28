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
  UserCheck,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  Info,
  Gavel,
  Copy,
  CheckCheck,
  Sliders,
  Users,
  FileText,
  Layers,
  Globe,
  HeartHandshake,
  FileWarning,
  ShieldAlert,
  Stethoscope,
  Video,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-power", label: "1. Freedom of Will: Section 59 Indian Succession Act" },
  { id: "suspicious-circumstances", label: "2. Supreme Court Doctrine: Suspicious Circumstances Rule" },
  { id: "ancestral-vs-self-acquired", label: "3. Property Limits: Self-Acquired vs Ancestral Estates" },
  { id: "interactive-clause-generator", label: "4. Interactive Exclusion Clause Drafter & Risk Tool" },
  { id: "five-vetted-templates", label: "5. Five Legally Vetted Disinheritance Clause Templates" },
  { id: "comparison-table", label: "6. Legal Comparison: Silent Omission vs Explicit Clause" },
  { id: "seven-guardrails", label: "7. Seven Essential Guardrails for a Bulletproof Will" },
  { id: "landmark-precedents", label: "8. Landmark Precedents: Ram Piari to Kavita Kanwar" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Drafting and Registering the Will" },
  { id: "senior-citizens-act", label: "10. Neglect Defense: Senior Citizens Act 2007 Link" },
  { id: "institutional-profile", label: "11. Legal Backing: AMA Legal Solutions Succession Desk" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Disinheriting Legal Heirs" },
  { id: "statutory-citations", label: "13. Statutory Citations & High Court Precedents" },
];

const FAQS = [
  {
    q: "Can I legally disinherit my son or daughter in India?",
    a: "Yes. You have full legal authority to disinherit any son or daughter from your self-acquired property. Section 59 of the Indian Succession Act, 1925 gives every person of sound mind the power to distribute their self-acquired assets as they wish. However, you cannot disinherit a child from their birthright in ancestral coparcenary property under Hindu law.",
  },
  {
    q: "Why is unexplained exclusion of a child treated as a suspicious circumstance?",
    a: "The Supreme Court of India has ruled in several landmark cases, including Kavita Kanwar v. Pamela Mehta (2020) and Ram Piari v. Bhagwant (1990), that completely excluding a natural heir without any clear explanation in the Will raises legal suspicion. The court examines whether the testator was coerced, suffered from memory loss, or was misled by other relatives.",
  },
  {
    q: "How should an exclusion clause be worded to prevent court challenges?",
    a: "First, identify the child by their full name and relationship. This proves you were fully aware of them and did not forget them due to memory loss. Second, state a calm, factual reason for their exclusion, such as substantial financial support already given during your lifetime, foreign settlement with high income, or a prior registered gift deed. Avoid defamatory language.",
  },
  {
    q: "Can I disinherit an adult child who neglected or abandoned me?",
    a: "Yes. Indian law allows you to exclude an adult child who has failed to provide care, maintenance, or emotional support. Stating this factual situation in your Will aligns with the principles of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007. It provides a recognized legal rationale that disproves allegations of coercion.",
  },
  {
    q: "What is an in terrorem or no-contest clause in an Indian Will?",
    a: "An in terrorem clause is a protective provision. It states that if any excluded heir or dissatisfied family member files a court challenge, caveat, or partition suit to dispute your Will, any token legacy or conditional bequest given to them will be immediately revoked and redirected to the primary beneficiaries.",
  },
  {
    q: "Does registering the Will at the Sub-Registrar Office prevent court disputes?",
    a: "Registration under Section 18 of the Registration Act, 1908 does not make a Will immune from lawsuits, but it creates a strong legal presumption that the Will was genuine and executed voluntarily. When combined with a doctor's certificate of mental fitness and a video recording of the signing, it makes challenging the Will very difficult for excluded heirs.",
  },
  {
    q: "Should the favored child be present in the room when the Will is signed?",
    a: "No. Never allow the primary beneficiary to be present during drafting, execution, or registration. The Supreme Court has repeatedly observed that active involvement or presence of the favored beneficiary during the Will execution creates a strong suspicion of undue influence under Section 61 of the Indian Succession Act.",
  },
  {
    q: "Can a married daughter claim a share in my self-acquired property if excluded?",
    a: "No. While the 2005 amendment to the Hindu Succession Act gave daughters equal rights in ancestral coparcenary property, self-acquired property is governed entirely by the owner's choice. A parent can leave their self-acquired house, savings, or business entirely to other beneficiaries through a validly executed Will.",
  },
];

export default function DisinheritanceClauseClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-power");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplateIndex, setCopiedTemplateIndex] = useState<number | null>(null);
  const [copiedGeneratedClause, setCopiedGeneratedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Generator Form State
  const [heirRole, setHeirRole] = useState<string>("eldest_son");
  const [heirName, setHeirName] = useState<string>("Vikram Sharma");
  const [testatorName, setTestatorName] = useState<string>("Ramesh Chandra Sharma");
  const [propertyType, setPropertyType] = useState<string>("self_acquired");
  const [primaryReason, setPrimaryReason] = useState<string>("prior_financial_support");
  const [hasDoctorCert, setHasDoctorCert] = useState<boolean>(true);
  const [hasVideoRecording, setHasVideoRecording] = useState<boolean>(true);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [independentWitnesses, setIndependentWitnesses] = useState<boolean>(true);
  const [beneficiarySeparated, setBeneficiarySeparated] = useState<boolean>(true);
  const [hasNoContestClause, setHasNoContestClause] = useState<boolean>(true);

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
  // RISK COMPUTATION LOGIC
  // ==========================================
  let riskScore = 15; // base level
  const riskWarnings: string[] = [];
  const riskStrengths: string[] = [];

  if (propertyType === "ancestral") {
    riskScore += 55;
    riskWarnings.push(
      "Critical: Coparcenary ancestral property cannot be willed away to disinherit a legal heir. You can only bequeath your own undivided notional share under Section 30 of the Hindu Succession Act."
    );
  } else if (propertyType === "mixed") {
    riskScore += 25;
    riskWarnings.push(
      "Notice: Mixed estates require clear segregation between self-acquired assets and ancestral coparcenary shares to avoid court injunctions."
    );
  } else {
    riskStrengths.push(
      "Self-Acquired Estate: Complete testamentary freedom under Section 59 ISA & Section 30 HSA."
    );
  }

  if (!hasDoctorCert) {
    riskScore += 15;
    riskWarnings.push(
      "Missing Medical Certificate: The excluded heir may claim you lacked testamentary mental capacity or suffered from cognitive impairment."
    );
  } else {
    riskStrengths.push(
      "Contemporaneous Medical Certificate: Proves sound disposing mind under Section 59."
    );
  }

  if (!isRegistered) {
    riskScore += 12;
    riskWarnings.push(
      "Unregistered Document: Excluded heirs often dispute signature authenticity in unregistered Wills."
    );
  } else {
    riskStrengths.push(
      "Registered at SRO: Provides strong statutory presumption of voluntary execution."
    );
  }

  if (!independentWitnesses) {
    riskScore += 20;
    riskWarnings.push(
      "Witness Conflict: Attesting witnesses must not be beneficiaries or close family members of the primary legatee."
    );
  } else {
    riskStrengths.push(
      "Independent Attestation: Satisfies Section 63(c) ISA and Section 67 BSA 2023."
    );
  }

  if (!beneficiarySeparated) {
    riskScore += 25;
    riskWarnings.push(
      "Supreme Court Warning (Kavita Kanwar): Active presence of the favored heir during Will execution creates a heavy suspicion of coercion."
    );
  } else {
    riskStrengths.push(
      "Clean Execution Protocol: Primary beneficiary kept separate from drafting and execution."
    );
  }

  if (hasVideoRecording) {
    riskScore -= 8;
    riskStrengths.push(
      "Video Recording: Clear oral confirmation of your reasons dispels claims of forgery or coercion."
    );
  }

  const finalRiskPercent = Math.min(98, Math.max(8, riskScore));

  let riskCategory = "Low Contest Risk";
  let riskBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let riskBarColor = "bg-emerald-500";

  if (finalRiskPercent >= 65) {
    riskCategory = "High Contest Risk";
    riskBadgeColor = "bg-rose-50 text-rose-800 border-rose-300";
    riskBarColor = "bg-rose-500";
  } else if (finalRiskPercent >= 35) {
    riskCategory = "Moderate Contest Risk";
    riskBadgeColor = "bg-amber-50 text-amber-800 border-amber-300";
    riskBarColor = "bg-amber-500";
  }

  // Dynamic Clause Generation
  const buildGeneratedClause = () => {
    const heirTitle =
      heirRole === "eldest_son"
        ? "my eldest son"
        : heirRole === "younger_son"
        ? "my younger son"
        : heirRole === "daughter"
        ? "my daughter"
        : heirRole === "all_children_for_spouse"
        ? "all my children"
        : "my relative";

    let reasonText = "";
    if (primaryReason === "prior_financial_support") {
      reasonText = `I have already provided substantial financial assistance, capital, and resources to ${heirTitle}, ${heirName}, during my lifetime, including funding higher education, professional establishment, and personal investments. Having thus adequately provided for him/her, I deem it fair and equitable that my remaining self-acquired assets be preserved for my other dependents.`;
    } else if (primaryReason === "settled_abroad") {
      reasonText = `${heirTitle}, ${heirName}, is permanently settled abroad, enjoys substantial personal affluence, independent high-income professional status, and has no financial dependence upon me or my estate. Consequently, my testamentary desire is to ensure that my assets in India are devolved upon those family members who reside with me and require financial protection.`;
    } else if (primaryReason === "estrangement_neglect") {
      reasonText = `${heirTitle}, ${heirName}, has voluntarily severed filial ties with me, ceased communication for several years, and willfully failed to provide any care, companionship, or assistance during my advanced age and medical treatments, contrary to natural filial duties. This bequest is made after deep reflection and represents my conscious, independent choice.`;
    } else if (primaryReason === "prior_gift_deed") {
      reasonText = `I have already settled a substantial portion of my properties upon ${heirTitle}, ${heirName}, vide a separate Registered Deed of Gift / Release Deed executed during my lifetime. Having already received his/her full and complete share in my lifetime, he/she shall have no right, title, interest, or claim whatsoever in the properties bequeathed under this Will.`;
    } else {
      reasonText = `I have chosen to bequeath all my self-acquired properties exclusively in favor of my beloved spouse to ensure complete financial autonomy, physical security, and dignity in his/her old age, free from any interference, harassment, or partition claims by any of my children during his/her lifetime.`;
    }

    const noContestPart = hasNoContestClause
      ? `\n\nFORFEITURE & NO-CONTEST COVENANT (IN TERROREM): Should the said ${heirName} or any person claiming through him/her institute any caveat, suit for partition, probate challenge, or legal obstruction against this Will or my named beneficiaries, any legacy, provision, or benefit, if any, shall instantly stand revoked, and the costs of defending such malicious litigation shall be recovered from his/her estate.`
      : "";

    return `EXCLUSION AND DISINHERITANCE CLAUSE:
"I, ${testatorName}, expressly declare that I am fully conscious and aware of the existence of ${heirTitle}, namely ${heirName}. 

${reasonText}

Therefore, I consciously and intentionally exclude the said ${heirName} from receiving any share, right, title, interest, or benefit in any of my movable or immovable properties covered under this Will. He/she shall have no claim of any nature whatsoever against my estate or my appointed executors and beneficiaries."${noContestPart}`;
  };

  const copyGeneratedClauseToClipboard = () => {
    navigator.clipboard.writeText(buildGeneratedClause());
    setCopiedGeneratedClause(true);
    setTimeout(() => setCopiedGeneratedClause(false), 3000);
  };

  const copyTemplateToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateIndex(index);
    setTimeout(() => setCopiedTemplateIndex(null), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `SEVEN-POINT BULLETPROOF WILL EXECUTION CHECKLIST (DISINHERITANCE DEFENSE):
1. Clear Identification: State the excluded heir's full name, age, and relationship. Never omit them silently.
2. Calm, Non-Defamatory Rationale: Explain the objective reason (prior gifts, foreign settlement, or spousal care) without abusive or scandalous language.
3. Contemporaneous Medical Fitness Certificate: Obtain a signed certificate from an MBBS doctor on the exact day of execution confirming sound mind and memory.
4. Independent Attesting Witnesses: Use two reliable witnesses who are neither beneficiaries nor related to the favored heirs.
5. Absolute Beneficiary Absence: Ensure favored beneficiaries are not present during drafting, doctor's examination, or Sub-Registrar execution.
6. Sub-Registrar Registration: Register the Will under Section 18 of the Registration Act, 1908 for statutory evidentiary backing.
7. Uninterrupted Video Recording: Record a clear video of the testator reading the exclusion clause aloud and signing in front of both witnesses.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  // 5 Vetted Template Clauses
  const TEMPLATES = [
    {
      title: "Template 1: Prior Financial Support Provided During Lifetime",
      subtitle: "Ideal when a parent has already paid for foreign education, business capital, or an apartment",
      clause: `"EXCLUSION OF SON / DAUGHTER ON GROUNDS OF PRIOR LIFETIME ADVANCEMENTS:
I expressly acknowledge and record that I have a son/daughter named [Full Name of Excluded Child], residing at [Address]. I hereby declare that during my lifetime, I have provided substantial financial assistance, funds, and assets to him/her, including [Details, e.g., funding higher education abroad / providing Rs. XX Lakhs as startup capital / purchasing Flat No. XX]. Having thereby adequately settled and financially established him/her, I have consciously decided not to bequeath any further movable or immovable property to him/her under this Will. My remaining self-acquired assets are bequeathed exclusively to my other family members to ensure equitable treatment and financial security for my remaining dependents."`,
      notes: "Cites prior gifts and education funds. Eliminates the claim that the testator forgot the child or acted unfairly.",
    },
    {
      title: "Template 2: Child Settled Abroad with Independent Affluence",
      subtitle: "Ideal when an NRI son or daughter is financially independent and local resident heirs need protection",
      clause: `"EXCLUSION CLAUSE FOR OVERSEAS SETTLED & AFFLUENT HEIR:
I acknowledge that my son/daughter, [Full Name of Child], is permanently residing in [Foreign Country] as a citizen/permanent resident and possesses substantial independent wealth, assets, and high earning capacity. He/she is in no need of financial support from my estate. On the other hand, my [resident child / dependent family member], who has resided with me and tended to my personal and medical needs in India, requires financial protection and shelter. Therefore, after careful reflection and with full mental capacity, I consciously exclude [Full Name of Child] from any share or interest in my properties described in the Schedule herein."`,
      notes: "Acknowledges the overseas resident's financial stability while prioritizing the resident caregiver child.",
    },
    {
      title: "Template 3: Estrangement, Willful Abandonment & Filial Neglect",
      subtitle: "Ideal when a child severed relations, abandoned elderly parents, or refused care during illness",
      clause: `"EXCLUSION CLAUSE ON GROUNDS OF VOLUNTARY ESTRANGEMENT & NEGLECT:
I have a son/daughter named [Full Name of Excluded Heir]. I deeply regret to state that for the past [Number] years, the said [Name] has completely severed filial relations with me and my spouse. He/she has neither maintained contact nor extended any physical, emotional, or financial assistance to me, despite my advanced age and medical ailments. In accordance with my statutory freedom under Section 59 of the Indian Succession Act, 1925, and having single-handedly maintained my self-acquired estate, I hereby expressly exclude the said [Name] from receiving any portion, bequest, or legacy from my estate. This decision is entirely my own, made in sound disposing state of mind, free from any coercion or influence."`,
      notes: "Measured factual recital of filial abandonment. Connects with the statutory principles of the Senior Citizens Act, 2007.",
    },
    {
      title: "Template 4: Prior Registered Gift Deed or Family Settlement",
      subtitle: "Ideal when the child already received property via a registered deed or release deed",
      clause: `"EXCLUSION CLAUSE CITING REGISTERED LIFETIME TRANSFER:
WHEREAS I have already transferred and conveyed absolute ownership of [Description of Property] in favor of my son/daughter, [Full Name], vide Registered Deed of Gift / Settlement dated [Date], registered as Document No. [Doc No.] in the Office of the Sub-Registrar at [SRO Name]. AND WHEREAS the said transfer was accepted by him/her in full and final settlement of all his/her claims and expectations from my assets. NOW THEREFORE, I declare that the said [Full Name] has no further claim, right, or interest in any remaining movable or immovable properties owned by me, and he/she is hereby excluded from any inheritance under this testamentary instrument."`,
      notes: "References registered documents at the Sub-Registrar Office, creating an estoppel against future inheritance claims.",
    },
    {
      title: "Template 5: Complete Spousal Protection & Preservation of Dignity",
      subtitle: "Ideal when leaving 100% of property to a surviving spouse to prevent eviction by children",
      clause: `"TOTAL BEQUEST TO SPOUSE & CONDITIONAL EXCLUSION OF CHILDREN:
I declare that all my movable and immovable properties are my self-acquired assets. I hereby bequeath the absolute, unencumbered ownership of my entire estate exclusively to my beloved wife/husband, [Spouse Full Name], should he/she survive me. I have consciously and deliberately chosen not to bequeath any share to my sons or daughters, [Names of all children], during the lifetime of my said spouse. My prime objective is to ensure that my spouse retains complete financial autonomy and dignity, without being dependent on or subjected to any partition demands or interference by our children. My children shall not question, contest, or obstruct my spouse's absolute enjoyment of these properties."`,
      notes: "Safeguards the surviving spouse against immediate partition suits or eviction attempts by adult children.",
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 59 &amp; 61 • HINDU SUCCESSION ACT S. 30</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            How to Write a Disinheritance Clause in an Indian Will
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Learn how to safely exclude a child or natural heir from your Will. Protect your estate against
            probate caveats and claims of coercion with <strong>5 Supreme Court-compliant clause formats</strong>{" "}
            and our interactive Will contest risk evaluator.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-clause-generator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Sliders className="w-4 h-4" />
              <span>Draft Custom Exclusion Clause</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sections 59 &amp; 61</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TESTAMENTARY FREEDOM &amp; COERCION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">5 Legal Clauses</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VETTED TEMPLATE PACKS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Discretion</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SELF-ACQUIRED PROPERTY ASSETS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Senior Citizens Act</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FILIAL NEGLECT DEFENSE RULES
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
                Compliant with Indian Succession Act 1925 (Sections 59, 61, 63 &amp; 67), Hindu Succession Act 1956
                (Section 30), and Supreme Court benchmarks in <em>Kavita Kanwar</em> and <em>Ram Piari</em>.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE BRIEF CALLOUT */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: EXCLUSION CLAUSE LEGAL RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Absolute Right on Self-Acquired Assets:</strong> Under Section 59 of the Indian Succession Act,
                    you can legally exclude any son, daughter, or natural heir from self-acquired property.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Unexplained Exclusion Is Suspicious:</strong> The Supreme Court warns that leaving out a
                    natural heir without a clear reason invites probate challenges. You must state a valid rationale.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ancestral Coparcenary Limits:</strong> You cannot disinherit a child from their birthright
                    in ancestral property under Mitakshara Hindu law. You can only bequeath your own undivided share.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Three Shield Protocol:</strong> Combine an explicit exclusion clause with a doctor&apos;s
                    medical certificate, SRO registration, and beneficiary absence during execution.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY POWER */}
            <section id="statutory-power" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Freedom of Will: Section 59 Indian Succession Act
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every adult of sound mind has the legal right to write a Will in India. Section 59 of the
                  Indian Succession Act, 1925 confirms that any person capable of understanding their actions
                  can dispose of their property. You are not legally required to distribute your assets equally
                  among your children.
                </p>
                <p>
                  The purpose of writing a Will is often to change the default rules of intestate succession.
                  When someone dies without a Will, the law divides their estate equally among all Class I legal
                  heirs. However, by executing a valid Will, you can choose who inherits your property and who
                  does not.
                </p>
                <p>
                  Section 30 of the Hindu Succession Act, 1956 also gives full testamentary authority to dispose
                  of separate or self-acquired property. You can leave your hard-earned home, savings, or investments
                  to one child, your spouse, or even a charitable organization.
                </p>
              </div>
            </section>

            {/* SECTION 2: SUSPICIOUS CIRCUMSTANCES DOCTRINE */}
            <section id="suspicious-circumstances" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>JUDICIAL SCRUTINY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Supreme Court Doctrine: Suspicious Circumstances Rule
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  While you have the legal right to disinherit an heir, Indian courts examine such Wills with great
                  caution. The Supreme Court of India acts as a court of conscience when examining testamentary
                  disputes. If a parent disinherits a child without explanation, judges treat this as a{" "}
                  <strong>suspicious circumstance</strong>.
                </p>
                <p>
                  In the landmark decision of <em>H. Venkatachala Iyengar v. B.N. Thimmajamma (1959)</em>, the Supreme
                  Court established that the person presenting the Will must remove all legitimate suspicions. If
                  an eldest son or daughter is completely left out, the court will ask whether the parent was mentally
                  alert and acted freely.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>The Core Legal Rule: Name the Heir and Explain the Reason</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Never silently ignore an excluded child. If you simply omit their name, their lawyers will argue in
                    court that you had memory loss, suffered from dementia, or that the favored sibling concealed their
                    existence from you. You must explicitly name the child and state your genuine, calm reason.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: ANSTRAL VS SELF-ACQUIRED PROPERTY */}
            <section id="ancestral-vs-self-acquired" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PROPERTY RIGHTS BOUNDARIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Property Limits: Self-Acquired vs Ancestral Estates
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before writing an exclusion clause, you must verify the legal character of your property. Under
                  Hindu law, property is divided into two distinct legal classes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Self-Acquired Property (100% Free)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Assets purchased using your own salary, savings, loans, or gifts from friends. You have total
                      discretion to give these assets to anyone or exclude any legal heir completely.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2 text-rose-700">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Ancestral Property (Coparcenary Birthright)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Property inherited undivided through four generations of male lineage. Children and daughters
                      acquire an automatic birthright as coparceners. You cannot disinherit them from their ancestral
                      share.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pt-1">
                  Want to confirm whether your property is ancestral or self-acquired? You can use our specialized{" "}
                  <Link
                    href="/tools/ancestral-vs-self-acquired-property-classifier"
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Ancestral vs Self-Acquired Property Classifier
                  </Link>{" "}
                  before writing your clause.
                </p>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT: EDITORIAL BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: DISINHERITANCE &amp; EXCLUSION CLAUSE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/disinheritance-exclusion-clause-format-will-og.jpg"
                  alt="Disinheritance and Exclusion Clause in Will India Format Legal Guide"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center italic">
                Figure: Statutory framework and guardrails for disinheriting legal heirs in India under Sections 59 and 61.
              </p>
            </div>

            {/* SECTION 4: INTERACTIVE EXCLUSION CLAUSE GENERATOR */}
            <section id="interactive-clause-generator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE LEGAL TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Exclusion Clause Drafter &amp; Risk Tool
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Customize your exclusion clause below. Select the family member, legal justification, and protective
                safeguards to generate a court-tested clause and evaluate your Will contest vulnerability.
              </p>

              {/* Interactive Tool Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Form Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Testator Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Testator Full Name</span>
                    </label>
                    <input
                      type="text"
                      value={testatorName}
                      onChange={(e) => setTestatorName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra Sharma"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F0]/40 focus:outline-hidden focus:ring-2 focus:ring-[#C65378] font-medium"
                    />
                  </div>

                  {/* Heir Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Heir to Exclude</span>
                    </label>
                    <select
                      value={heirRole}
                      onChange={(e) => setHeirRole(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F0]/40 focus:outline-hidden focus:ring-2 focus:ring-[#C65378] font-medium"
                    >
                      <option value="eldest_son">Eldest Son</option>
                      <option value="younger_son">Younger Son</option>
                      <option value="daughter">Daughter</option>
                      <option value="all_children_for_spouse">All Children (In Favor of Spouse)</option>
                      <option value="specific_heir">Specific Relative / Heir</option>
                    </select>
                  </div>

                  {/* Excluded Heir Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileWarning className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Excluded Heir Full Name</span>
                    </label>
                    <input
                      type="text"
                      value={heirName}
                      onChange={(e) => setHeirName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F0]/40 focus:outline-hidden focus:ring-2 focus:ring-[#C65378] font-medium"
                    />
                  </div>

                  {/* Property Nature */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Property Category</span>
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F0]/40 focus:outline-hidden focus:ring-2 focus:ring-[#C65378] font-medium"
                    >
                      <option value="self_acquired">100% Self-Acquired Property</option>
                      <option value="ancestral">Ancestral / Coparcenary Property</option>
                      <option value="mixed">Mixed Estate (Both Types)</option>
                    </select>
                  </div>

                  {/* Legal Justification */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Primary Legal Rationale for Exclusion</span>
                    </label>
                    <select
                      value={primaryReason}
                      onChange={(e) => setPrimaryReason(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F0]/40 focus:outline-hidden focus:ring-2 focus:ring-[#C65378] font-medium"
                    >
                      <option value="prior_financial_support">
                        1. Already Provided Substantial Financial Support / Settlement During Lifetime
                      </option>
                      <option value="settled_abroad">
                        2. Child Settled Abroad with Independent Affluence &amp; High Income
                      </option>
                      <option value="estrangement_neglect">
                        3. Voluntary Estrangement, Abandonment &amp; Failure to Provide Filial Care
                      </option>
                      <option value="prior_gift_deed">
                        4. Prior Lifetime Registered Gift Deed / Release Deed Executed
                      </option>
                      <option value="spousal_protection">
                        5. Complete Protection &amp; Dignity of Surviving Elderly Spouse
                      </option>
                    </select>
                  </div>
                </div>

                {/* Safeguards Checkboxes */}
                <div className="space-y-3">
                  <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Select Protective Safeguards Attached to Your Will</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF7F0]/30 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasDoctorCert}
                        onChange={(e) => setHasDoctorCert(e.target.checked)}
                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Doctor Fitness Certificate</span>
                        <span className="text-slate-500 text-[11px]">MBBS doctor signs on execution day</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF7F0]/30 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={isRegistered}
                        onChange={(e) => setIsRegistered(e.target.checked)}
                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Sub-Registrar Registration</span>
                        <span className="text-slate-500 text-[11px]">Registered at local SRO office</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF7F0]/30 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasVideoRecording}
                        onChange={(e) => setHasVideoRecording(e.target.checked)}
                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Video Execution Recording</span>
                        <span className="text-slate-500 text-[11px]">Testator reads exclusion clause aloud</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF7F0]/30 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={independentWitnesses}
                        onChange={(e) => setIndependentWitnesses(e.target.checked)}
                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Independent Witnesses</span>
                        <span className="text-slate-500 text-[11px]">Witnesses have zero financial interest</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF7F0]/30 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={beneficiarySeparated}
                        onChange={(e) => setBeneficiarySeparated(e.target.checked)}
                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Favored Beneficiary Absent</span>
                        <span className="text-slate-500 text-[11px]">No coercion risk (Kavita Kanwar)</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF7F0]/30 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasNoContestClause}
                        onChange={(e) => setHasNoContestClause(e.target.checked)}
                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">No-Contest (In Terrorem) Clause</span>
                        <span className="text-slate-500 text-[11px]">Forfeits benefits if challenged</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Risk Meter Display */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                        Will Contest &amp; Challenge Vulnerability Score
                      </span>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold ${riskBadgeColor}`}>
                      {riskCategory} ({finalRiskPercent}% Risk)
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${riskBarColor}`}
                      style={{ width: `${finalRiskPercent}%` }}
                    />
                  </div>

                  {riskWarnings.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {riskWarnings.map((warn, i) => (
                        <div key={i} className="text-xs text-rose-800 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span>{warn}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {riskStrengths.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {riskStrengths.map((str, i) => (
                        <div key={i} className="text-xs text-emerald-800 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Generated Clause Output Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Customized Exclusion Clause (Copy-Paste Ready)</span>
                    </div>
                    <button
                      onClick={copyGeneratedClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedGeneratedClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#172228] text-white font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap select-all shadow-inner border border-slate-700/60">
                    {buildGeneratedClause()}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: FIVE VETTED TEMPLATES */}
            <section id="five-vetted-templates" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>MANDATORY ON-PAGE ASSET</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Five Legally Vetted Disinheritance Clause Templates
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Choose from five standardized, lawyer-approved exclusion clauses. Each template addresses a specific
                real-world family circumstance recognized by Indian courts.
              </p>

              <div className="space-y-6">
                {TEMPLATES.map((tmpl, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{tmpl.title}</h3>
                        <p className="text-xs text-slate-500">{tmpl.subtitle}</p>
                      </div>
                      <button
                        onClick={() => copyTemplateToClipboard(tmpl.clause, index)}
                        className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer shrink-0"
                      >
                        {copiedTemplateIndex === index ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Template</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap select-all">
                      {tmpl.clause}
                    </div>

                    <div className="flex items-start gap-2 pt-1 text-xs text-slate-600">
                      <Info className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>
                        <strong>Legal Note:</strong> {tmpl.notes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>RISK MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Legal Comparison: Silent Omission vs Explicit Clause
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare the legal consequences of leaving an heir out silently versus using a structured, legally sound
                exclusion clause.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-xs text-left text-slate-700 border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-black border-b border-slate-200">
                      <th className="p-3.5">Comparison Parameter</th>
                      <th className="p-3.5 text-rose-800 bg-rose-50/50">Silent Omission (No Mention)</th>
                      <th className="p-3.5 text-amber-800 bg-amber-50/50">Bare Exclusion (&quot;I leave nothing&quot;)</th>
                      <th className="p-3.5 text-emerald-800 bg-emerald-50/50">Vetted Exclusion Clause</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Judicial Presumption</td>
                      <td className="p-3.5 text-rose-700">Memory lapse, dementia, or coercion suspected</td>
                      <td className="p-3.5 text-amber-700">Unnatural bequest; burden on beneficiary</td>
                      <td className="p-3.5 text-emerald-700">Conscious, voluntary testamentary intention</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Burden of Proof (Section 61)</td>
                      <td className="p-3.5">Heavy burden to prove testator knew of child</td>
                      <td className="p-3.5">Moderate burden to prove absence of malice</td>
                      <td className="p-3.5">Discharged; objective rationale recorded in Will</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Probate Caveat Vulnerability</td>
                      <td className="p-3.5 font-bold text-rose-600">Extremely High (Years of litigation)</td>
                      <td className="p-3.5 font-bold text-amber-600">High (Claims of spite or influence)</td>
                      <td className="p-3.5 font-bold text-emerald-600">Very Low (Caveats dismissed early)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Defamation Risk</td>
                      <td className="p-3.5">None</td>
                      <td className="p-3.5">High if unverified insults are used</td>
                      <td className="p-3.5">Zero (Strictly objective, polite language)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Protection for Primary Heirs</td>
                      <td className="p-3.5 text-rose-700">Weak; high risk of stay orders</td>
                      <td className="p-3.5 text-amber-700">Moderate; protracted family disputes</td>
                      <td className="p-3.5 text-emerald-700">Maximum; supported by medical and SRO proof</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: SEVEN ESSENTIAL GUARDRAILS */}
            <section id="seven-guardrails" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>PREVENTATIVE CHECKLIST</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Seven Essential Guardrails for a Bulletproof Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this seven-point checklist to ensure your disinheritance clause withstands judicial review in
                any civil court or High Court probate proceeding.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Execution Defense Checklist
                  </span>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">1. Explicit Name &amp; Relationship</strong>
                      <span>Always write the heir&apos;s full name, date of birth, and exact relationship.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">2. Non-Defamatory Rationale</strong>
                      <span>State facts calmly. Never write abusive or criminal accusations in the Will.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">3. Contemporaneous Medical Fitness</strong>
                      <span>Obtain a doctor&apos;s certificate of mental alertness on the exact date of signing.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">4. Independent Attesting Witnesses</strong>
                      <span>Choose two witnesses who receive no property under the Will (Section 67 ISA).</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">5. Beneficiary Separation</strong>
                      <span>Ensure the favored heir is completely absent during drafting and signing.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">6. Sub-Registrar Registration</strong>
                      <span>Register the Will under Section 18 of the Registration Act, 1908.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 md:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">7. Video Recording of Execution</strong>
                      <span>Record the testator reading the exclusion clause aloud and signing before witnesses.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: LANDMARK PRECEDENTS */}
            <section id="landmark-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CASE LAW ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Landmark Precedents: Ram Piari to Kavita Kanwar
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Indian judicial history demonstrates that the validity of an exclusion clause depends heavily on
                  how well the testator&apos;s genuine mindset was documented:
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Ram Piari v. Bhagwant (1990) 3 SCC 364 (Supreme Court of India)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator executed a Will disinheriting his married daughter in favor of another heir. The Will
                    failed to assign any reason for depriving the daughter. The Supreme Court held that the unnatural
                    exclusion of a daughter without explanation casts grave suspicion on the voluntary nature of the
                    Will, especially when the propounder took an active part in execution.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Kavita Kanwar v. Pamela Mehta (2020) 7 SCC 657 (Supreme Court of India)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testatrix left her entire property to one daughter while completely excluding other children.
                    The favored daughter played a dominant role in preparing and executing the Will. The Supreme Court
                    reaffirmed that unexplained exclusion of natural heirs, coupled with the beneficiary&apos;s active
                    participation, makes the Will invalid under Section 61.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Rabindra Nath Mukherjee v. Panchanan Banerjee (1995) 4 SCC 459</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Supreme Court clarified that the mere fact that a natural heir is deprived of property is not
                    per se an unnatural circumstance, because the whole purpose of writing a Will is to alter the
                    default rules of succession. If the testator clearly articulates their reasons, the court will
                    respect their decision.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Drafting and Registering the Will
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <ol className="list-decimal pl-5 space-y-3 text-xs sm:text-sm">
                  <li>
                    <strong>Identify Property Titles:</strong> Gather original sale deeds, conveyance deeds, or share
                    certificates. Verify that the properties to be willed are strictly self-acquired.
                  </li>
                  <li>
                    <strong>Select the Relevant Exclusion Rationale:</strong> Pick the accurate legal template (e.g.
                    prior gifts, foreign settlement, spousal care, or filial neglect).
                  </li>
                  <li>
                    <strong>Medical Examination on Execution Day:</strong> Visit a registered medical practitioner (MBBS).
                    Have the doctor sign a fitness certificate confirming you are oriented in time, place, and memory.
                  </li>
                  <li>
                    <strong>Independent Witness Attestation:</strong> Under Section 63(c) of the Indian Succession Act,
                    two witnesses must see you sign the Will, and you must see them sign in your presence.
                  </li>
                  <li>
                    <strong>Video Record the Ceremony:</strong> Read the preamble, exclusion clause, and witness signatures
                    on video. Store the digital video file on a USB flash drive alongside the original paper Will.
                  </li>
                  <li>
                    <strong>Registration at the Sub-Registrar Office:</strong> Present the Will for registration under
                    Section 18 of the Registration Act. Both witnesses must accompany you for biometric verification.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 10: SENIOR CITIZENS ACT LINK */}
            <section id="senior-citizens-act" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HeartHandshake className="w-4 h-4" />
                <span>STATUTORY ALIGNMENT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Neglect Defense: Senior Citizens Act 2007 Link
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, adult children are legally
                  obligated to maintain and care for their aging parents. Section 23 of the Act even allows senior
                  citizens to declare lifetime gift deeds void if a child fails to provide basic physical needs.
                </p>
                <p>
                  When drafting a Will, reciting a history of neglect or abandonment directly reinforces your exclusion
                  clause. It proves to the court that you had a legitimate, legally recognized reason to disinherit the
                  child, rather than acting under undue influence from another relative.
                </p>
                <p className="text-xs text-slate-600">
                  If an excluded child previously signed an undertaking or failed to comply with a Maintenance Tribunal
                  order, citing that tribunal case number in your Will creates an unassailable record.
                </p>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Backing: AMA Legal Solutions Succession Desk
              </h2>
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting is backed by senior testamentary counsels and High Court advocates at AMA Legal
                  Solutions. Our legal team regularly advises families across India and NRIs worldwide on complex estate
                  matters, including disinheritance defense, family settlements, and probate litigation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-extrabold text-slate-900 text-base">25+ Years</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Succession Law Practice</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-extrabold text-slate-900 text-base">100% Vetted</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Supreme Court Standards</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-extrabold text-slate-900 text-base">Pan-India SRO</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Registration Guidance</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Disinheriting Legal Heirs
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Common questions answered by testamentary lawyers on excluding natural heirs in Indian Wills.
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors cursor-pointer"
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY AUTHORITIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; High Court Precedents
              </h2>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs text-slate-700">
                <p className="leading-relaxed">
                  All clauses and legal recommendations in this guide are drafted in strict accordance with the
                  governing statutory enactments of India:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Section 59 Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Section 61 Undue Influence</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Section 30 Hindu Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Senior Citizens Act 2007</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Succession Tools &amp; Legal Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/will-contest-challenge-risk-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Will Contest Risk Calculator
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/will-validity-section-63-audit-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Section 63 Validity Checker
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Registration SRO Assistance
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
                  AMA
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, High Court probate petitions, Section 59 exclusion
                clause defense, and cross-border succession disputes.
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
                  <span>PREVENT FUTURE PROBATE CHALLENGES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Chosen Beneficiaries from Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clearly drafted, legally registered Will with customized exclusion clauses protects your chosen
                  family members against long probate battles.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
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
                  <span>EXCLUSION &amp; PROBATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Excluding an Heir or Anticipating Family Objections?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our testamentary litigators advise on video execution protocols, doctor certificates, and SRO
                  registration to make your Will airtight.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
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
                      <strong>Supreme Court Doctrine:</strong> Built on Ram Piari and Kavita Kanwar guardrails.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>No-Contest Safeguards:</strong> Includes in terrorem forfeiture provisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Doctor Fitness Format:</strong> Contemporaneous medical soundness templates.
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
          href="#interactive-clause-generator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Clause Drafter</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
