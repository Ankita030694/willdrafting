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
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Ancestral vs Self-Acquired" },
  { id: "interactive-classifier", label: "2. Interactive Property Provenance Classifier" },
  { id: "chander-sen-rule", label: "3. Section 8 vs Section 6: Landmark Chander Sen Rule" },
  { id: "four-generation-lineage", label: "4. The 4-Generation Lineage Test Under Hindu Law" },
  { id: "father-inheritance-test", label: "5. Property Inherited from Father: Section 8 Test" },
  { id: "partition-deeds-severance", label: "6. Partition Deeds: How Division Alters Status" },
  { id: "daughters-coparcenary-rights", label: "7. Daughters' Equal Rights: Vineeta Sharma" },
  { id: "comparison-table", label: "8. Legal Comparison: Ancestral vs Self-Acquired" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Tracing Title Provenance" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Delhi, Bengaluru, Mumbai" },
  { id: "legal-recital-templates", label: "11. Legal Recital Templates & Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Ancestral Assets" },
  { id: "statutory-citations", label: "14. Statutory Citations & Judicial Portals" },
];

const FAQS = [
  {
    q: "Is property inherited from my father ancestral or self-acquired?",
    a: "Under Supreme Court rulings, property inherited from a father who died after 1956 is self-acquired property under Section 8. It is not ancestral coparcenary property. The son holds it in his individual capacity. His children do not get any birthright in it.",
  },
  {
    q: "What makes a property legally ancestral in India?",
    a: "A property is legally ancestral only if it passes undivided through four generations of male lineage. It must come from the paternal great-grandfather down to the father without any partition deed. It must not have passed under a Will or gift.",
  },
  {
    q: "Can my father sell or Will away property he inherited from his father?",
    a: "Yes. If your father inherited the property under Section 8 after 1956, he is the sole owner. He has 100% legal freedom to sell, gift, or make a Will for the whole house. He does not need consent or signatures from his children.",
  },
  {
    q: "What happens to ancestral property after a partition deed is registered?",
    a: "Once family members divide ancestral land through a registered deed, the joint family ends. In Uttam v. Saubhag Singh (2016), the Supreme Court ruled that each divided share becomes separate property. Children born later cannot claim to reopen the partition.",
  },
  {
    q: "Do daughters have equal rights in ancestral property in India?",
    a: "Yes. In Vineeta Sharma v. Rakesh Sharma (2020), the Supreme Court ruled that daughters are equal coparceners by birth under Section 6. A daughter has the same rights as a son, even if her father died before 2005.",
  },
  {
    q: "Can a grandson claim a share in his grandfather's self-acquired property?",
    a: "No. A grandchild has zero birthright in a grandfather's self-acquired home while the grandfather is alive. The grandfather can sell or Will the property to anyone. Even if the father passes away, the grandson cannot demand a partition.",
  },
  {
    q: "Is property received via a Gift Deed or Will considered ancestral?",
    a: "No. The Supreme Court in Arunachala Mudaliar (1953) ruled that property received through a Will or gift deed is self-acquired property. It is not ancestral unless the donor specifically wrote that it belongs to the joint family.",
  },
  {
    q: "Can a coparcener make a Will of their share in ancestral property?",
    a: "Yes. Under Section 30 of the Hindu Succession Act, 1956, any coparcener can make a Will for their undivided share in ancestral property. However, they cannot make a Will for the whole property or for other members' shares.",
  },
];

export default function AncestralClassifierClient() {
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

  // Diagnostic Wizard State
  const [acquisitionMode, setAcquisitionMode] = useState<
    "self_purchase" | "gift_or_will" | "inherited_father_paternal" | "maternal_inheritance" | "partition_allotment" | "huf_blended"
  >("inherited_father_paternal");

  const [demiseDate, setDemiseDate] = useState<"after_1956" | "before_1956" | "alive_today">(
    "after_1956"
  );

  const [generationsCount, setGenerationsCount] = useState<
    "four_unbroken" | "father_or_grandfather_bought" | "divided_earlier"
  >("father_or_grandfather_bought");

  const [partitionStatus, setPartitionStatus] = useState<
    "no_partition" | "registered_partition" | "oral_informal"
  >("no_partition");

  const [primaryGoal, setPrimaryGoal] = useState<
    "draft_will" | "sell_property" | "grandchild_claim" | "family_dispute"
  >("draft_will");

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
    setAcquisitionMode("inherited_father_paternal");
    setDemiseDate("after_1956");
    setGenerationsCount("father_or_grandfather_bought");
    setPartitionStatus("no_partition");
    setPrimaryGoal("draft_will");
  };

  // Diagnostic Classification Engine
  let classificationTitle = "100% Self-Acquired & Separate Property";
  let classificationBadge = "Self-Acquired (Section 8 HSA)";
  let testamentaryFreedom = "100% Absolute Will Freedom";
  let freedomScore = 100;
  let birthrightStatus = "Zero Birthright for Children or Grandchildren";
  let landmarkPrecedent = "Commissioner of Wealth Tax v. Chander Sen (1986) 3 SCC 567";
  let legalRationale =
    "Under Section 8 of the Hindu Succession Act, property inherited from a father who died after 1956 belongs to the son as his separate property. His children or grandchildren acquire no right by birth.";
  let actionRecommendation =
    "You can make a registered Will leaving 100% of this property to anyone you choose. No relative can stop you with a partition lawsuit.";

  if (acquisitionMode === "self_purchase") {
    classificationTitle = "100% Absolute Self-Acquired Property";
    classificationBadge = "Self-Acquired (Personal Earnings)";
    testamentaryFreedom = "100% Absolute Will Freedom";
    freedomScore = 100;
    birthrightStatus = "Zero Birthright for Any Family Member";
    landmarkPrecedent = "Section 30, Hindu Succession Act, 1956";
    legalRationale =
      "Property bought with your own salary, savings, or bank loan is your personal property. No family member or child has any birthright in it.";
    actionRecommendation =
      "You can sell, gift, or make a Will for the whole property. Draft your Will now to protect your home.";
  } else if (acquisitionMode === "gift_or_will") {
    classificationTitle = "100% Self-Acquired Property (Gift / Will)";
    classificationBadge = "Self-Acquired (Gift / Will)";
    testamentaryFreedom = "100% Absolute Will Freedom";
    freedomScore = 100;
    birthrightStatus = "Zero Birthright for Descendants";
    landmarkPrecedent = "C.N. Arunachala Mudaliar v. C.A. Muruganatha Mudaliar (1953)";
    legalRationale =
      "The Supreme Court ruled that property received via a gift deed or Will is self-acquired property in the son's hands.";
    actionRecommendation =
      "Keep the registered gift deed or probated Will safe. You have full freedom to make a Will for this property.";
  } else if (acquisitionMode === "maternal_inheritance") {
    classificationTitle = "100% Separate Property (Maternal Lineage)";
    classificationBadge = "Separate Property (Maternal Succession)";
    testamentaryFreedom = "100% Absolute Will Freedom";
    freedomScore = 100;
    birthrightStatus = "Zero Birthright for Lineal Descendants";
    landmarkPrecedent = "Mulla Principles of Hindu Law (Section 223)";
    legalRationale =
      "Property inherited from your mother or maternal grandfather (Nana) is never ancestral property. It is always separate property.";
    actionRecommendation =
      "Your children have no birthright in maternal property. You can make a Will for 100% of this asset.";
  } else if (acquisitionMode === "partition_allotment") {
    if (partitionStatus === "registered_partition") {
      classificationTitle = "Partitioned Separate Property (Divided Share)";
      classificationBadge = "Partitioned Share (Section 6 Severance)";
      testamentaryFreedom = "100% Will Freedom Over Allotted Share";
      freedomScore = 90;
      birthrightStatus = "No Collateral Claims on Divided Share";
      landmarkPrecedent = "Uttam v. Saubhag Singh (2016) 4 SCC 68";
      legalRationale =
        "When coparcenary property is divided through a registered deed, the joint family ends. The share you receive becomes your separate property.";
      actionRecommendation =
        "Ensure your partition deed is registered. You can freely make a Will for your divided share.";
    } else {
      classificationTitle = "Unsettled Share (Informal Family Agreement)";
      classificationBadge = "Informal Family Settlement";
      testamentaryFreedom = "Restricted (Needs Formal Registration)";
      freedomScore = 50;
      birthrightStatus = "Vulnerable to Claims by Family Members";
      landmarkPrecedent = "Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1";
      legalRationale =
        "Under Section 6(5), only registered partition deeds or court decrees are fully valid. Informal oral papers can be disputed in court.";
      actionRecommendation =
        "Register a formal Partition Deed before making a sale or signing an contested Will.";
    }
  } else if (acquisitionMode === "huf_blended") {
    classificationTitle = "Hindu Undivided Family (HUF) Joint Property";
    classificationBadge = "Coparcenary / Joint Family Asset";
    testamentaryFreedom = "Restricted: Can Only Will Undivided Share";
    freedomScore = 35;
    birthrightStatus = "Equal Right by Birth for All Coparceners";
    landmarkPrecedent = "Section 6 & Section 30, Hindu Succession Act, 1956";
    legalRationale =
      "Property bought with joint family business funds belongs to the whole family. Sons and daughters hold an equal share by birth.";
    actionRecommendation =
      "You cannot sell the whole property without family consent. Under Section 30, you can only make a Will for your own share.";
  } else {
    // acquisitionMode === "inherited_father_paternal"
    if (demiseDate === "before_1956" && generationsCount === "four_unbroken") {
      classificationTitle = "Ancestral Coparcenary Property (Pre-1956 Lineage)";
      classificationBadge = "Ancestral Coparcenary (Pre-1956)";
      testamentaryFreedom = "Restricted to Undivided Share (Section 30)";
      freedomScore = 30;
      birthrightStatus = "Equal Birthright for Sons and Daughters";
      landmarkPrecedent = "Arshnoor Singh v. Harpal Kaur (2019) 11 SCC 648";
      legalRationale =
        "Property that passed undivided across four generations before 1956 remains ancestral. Children acquire a right by birth.";
      actionRecommendation =
        "Family members have a right by birth. Under Section 30, you can only make a Will for your specific share.";
    } else {
      classificationTitle = "100% Self-Acquired Property (Section 8 Succession)";
      classificationBadge = "Self-Acquired (Section 8 Succession)";
      testamentaryFreedom = "100% Absolute Will Freedom";
      freedomScore = 100;
      birthrightStatus = "Zero Birthright for Children or Grandchildren";
      landmarkPrecedent = "Commissioner of Wealth Tax v. Chander Sen (1986) 3 SCC 567";
      legalRationale =
        "The predecessor died after 1956. Section 8 applies. Under the Chander Sen ruling, property inherited from a father is self-acquired. Grandchildren have no birthright.";
      actionRecommendation =
        "You hold full ownership. You can sell without children's consent or make a Will for 100% of the property.";
    }
  }

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE FOR WILL DEED: DECLARATION OF SELF-ACQUIRED PROPERTY
"I declare that the Schedule Property is my SELF-ACQUIRED PROPERTY. I acquired it through [my personal earnings / inheritance under Section 8 of the Hindu Succession Act, 1956 / registered Gift Deed].

Under the Supreme Court rulings in 'Commissioner of Wealth Tax v. Chander Sen' (1986) 3 SCC 567 and 'Yudhishter v. Ashok Kumar' (1987) 1 SCC 204, this property is held in my individual capacity. No child, grandchild, or relative holds any birthright in it.

Under Section 30 of the Hindu Succession Act, 1956, I bequeath 100% of my title in the Schedule Property to [Name of Beneficiary], absolutely and forever."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: PROVING SELF-ACQUIRED PROPERTY IN INDIA
1. Registered Sale Deed showing purchase money paid by individual owner.
2. Bank account records showing payment from individual account.
3. Death Certificate of predecessor showing death occurred after June 17, 1956.
4. Legal Heir Certificate from local revenue authority (Tehsildar / SDM).
5. 30-Year Encumbrance Certificate (Form 15) from Sub-Registrar Office.
6. Revenue mutation records (Patta / Khata / 7-12) in individual owner name.
7. Registered Will or Gift Deed if property was gifted or bequeathed.
8. Registered Partition Deed if property was divided in family partition.`;
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
            <span>HINDU SUCCESSION ACT, 1956 • SECTIONS 6, 8 &amp; 30</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Ancestral vs Self-Acquired Property Classifier India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your property rights under Hindu law. Trace Section 8 versus Section 6 rules. Test
            children&rsquo;s birthrights and verify your 100% legal power to make a Will.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-classifier"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Run Provenance Classifier</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 8 HSA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NO GRANDSON BIRTHRIGHT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Will Rights</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 30 TESTAMENTARY FREEDOM
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4 Generations</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNBROKEN MALE LINEAGE TEST
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Vineeta Sharma</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DAUGHTERS EQUAL COPARCENERS
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
                Governed under Sections 6, 8, and 30 of the Hindu Succession Act, 1956. Backed by Supreme
                Court rulings in CWT v. Chander Sen and Vineeta Sharma.
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
                <span>EXECUTIVE BRIEF: ANCESTRAL VS SELF-ACQUIRED PROPERTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Top Legal Myth in India:</strong> Most people think property from a grandfather
                    is ancestral. Under Supreme Court law, this is false. If your grandfather bought it with
                    his own money and died after 1956, it is self-acquired. Grandchildren have no right by
                    birth.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Will Rights for Self-Acquired Assets:</strong> If property is self-acquired,
                    the owner has total control under Section 30. They can make a Will leaving 100% to
                    anyone. They can exclude any child without legal trouble.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 4-Generation Lineage Test:</strong> Property is ancestral only if it
                    passes undivided through four generations of direct male lineage without any partition
                    deed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Daughters Hold Equal Rights:</strong> In Vineeta Sharma (2020), the Supreme
                    Court gave daughters equal coparcenary rights by birth in genuine ancestral property.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: Ancestral vs Self-Acquired Property
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Property disputes often happen when families confuse family inheritance with ancestral
                  land. Hindu law divides property into two clear classes. These are ancestral property and
                  self-acquired property.
                </p>
                <p>
                  <strong>Self-acquired property</strong> includes real estate bought with your personal
                  income. It also includes gifts, assets from a Will, or property inherited under Section 8.
                  The owner has total control over the asset. You can sell, gift, or make a Will for the
                  whole property without asking your children.
                </p>
                <p>
                  <strong>Ancestral property</strong> is inherited from a paternal ancestor across four
                  unbroken generations. In true ancestral property, sons and daughters get an equal share at
                  birth under Section 6. An owner cannot sell or Will away the whole property without the
                  consent of all family members.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CLASSIFIER TOOL */}
            <section id="interactive-classifier" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>PROVENANCE TRACE WIZARD</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Property Provenance Classifier Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Answer the 5 diagnostic questions below. Classify your real estate under Hindu law and
                verify your 100% legal Will making rights.
              </p>

              {/* Classifier Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Acquisition Mode */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>Question 1: How did the current owner acquire this property?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        id: "self_purchase",
                        label: "Self-Purchased",
                        desc: "Bought with own earnings, salary, savings, or bank loan",
                      },
                      {
                        id: "gift_or_will",
                        label: "Registered Gift / Will",
                        desc: "Received through a gift deed or probated Will from a relative",
                      },
                      {
                        id: "inherited_father_paternal",
                        label: "Inherited from Father / Dada",
                        desc: "Passed down upon death of father or grandfather",
                      },
                      {
                        id: "maternal_inheritance",
                        label: "Maternal Lineage (Mother / Nana)",
                        desc: "Inherited from mother or maternal grandfather (Nana)",
                      },
                      {
                        id: "partition_allotment",
                        label: "Partition / Family Settlement",
                        desc: "Allotted as an individual share following family division",
                      },
                      {
                        id: "huf_blended",
                        label: "HUF / Joint Family Nucleus",
                        desc: "Acquired using undivided ancestral business or HUF funds",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setAcquisitionMode(option.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          acquisitionMode === option.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{option.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Lineage & Predecessor Demise Date */}
                {acquisitionMode === "inherited_father_paternal" && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <History className="w-4 h-4 text-[#C65378]" />
                        <span>Question 2: When did the father or grandfather pass away?</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          {
                            id: "after_1956",
                            label: "After June 17, 1956",
                            desc: "Governed by Hindu Succession Act Section 8 (Modern law)",
                          },
                          {
                            id: "before_1956",
                            label: "Before June 17, 1956",
                            desc: "Governed by classical old Mitakshara coparcenary law",
                          },
                          {
                            id: "alive_today",
                            label: "Predecessor is Still Alive",
                            desc: "Current owner has not yet inherited; father/grandfather lives",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDemiseDate(opt.id as any)}
                            className={`text-left p-3 rounded-xl border transition-all ${
                              demiseDate === opt.id
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

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-[#C65378]" />
                        <span>Question 3: Who originally bought the property?</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          {
                            id: "father_or_grandfather_bought",
                            label: "Father or Grandfather Bought It",
                            desc: "Purchased with their individual income (Not ancestral lineage)",
                          },
                          {
                            id: "four_unbroken",
                            label: "Unbroken 4 Generations",
                            desc: "Inherited from Great-Grandfather with zero intermediate partition",
                          },
                          {
                            id: "divided_earlier",
                            label: "Divided Earlier in Family",
                            desc: "A partition or settlement divided it in a previous generation",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setGenerationsCount(opt.id as any)}
                            className={`text-left p-3 rounded-xl border transition-all ${
                              generationsCount === opt.id
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
                  </div>
                )}

                {/* Step 3: Partition Status */}
                {(acquisitionMode === "partition_allotment" ||
                  acquisitionMode === "inherited_father_paternal") && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Question 4: Was a registered partition deed executed?</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "no_partition",
                          label: "No Partition Done",
                          desc: "Property was never formally divided among siblings or coparceners",
                        },
                        {
                          id: "registered_partition",
                          label: "Registered Partition Deed",
                          desc: "Registered at Sub-Registrar Office (or decree by civil court)",
                        },
                        {
                          id: "oral_informal",
                          label: "Oral / Unregistered Agreement",
                          desc: "Informal family settlement or mutual understanding on paper",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPartitionStatus(opt.id as any)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            partitionStatus === opt.id
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
                )}

                {/* Step 4: Primary Legal Objective */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Question 5: What is your primary objective or legal query?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "draft_will",
                        label: "Making a Legal Will",
                        desc: "Can I bequeath 100% of this property freely?",
                      },
                      {
                        id: "sell_property",
                        label: "Selling the Property",
                        desc: "Do I need signatures from children or siblings?",
                      },
                      {
                        id: "grandchild_claim",
                        label: "Grandchild / Child Claim",
                        desc: "Can I stop my father or grandfather from selling?",
                      },
                      {
                        id: "family_dispute",
                        label: "Partition Dispute Defense",
                        desc: "A relative has sent a legal notice claiming coparcenary share",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPrimaryGoal(opt.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          primaryGoal === opt.id
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
                    <span>Reset Classifier to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        DEFINITIVE LEGAL CLASSIFICATION RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {classificationTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{classificationBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TESTAMENTARY WILL FREEDOM
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {testamentaryFreedom}
                      </div>
                      <div className="text-[11px] text-slate-300">Score: {freedomScore}/100</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        CHILD / GRANDCHILD BIRTHRIGHT
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {birthrightStatus}
                      </div>
                      <div className="text-[11px] text-slate-300">No Birthright in Separate Assets</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        LANDMARK SUPREME COURT BENCH
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {landmarkPrecedent}
                      </div>
                      <div className="text-[11px] text-slate-400">Settled Law of India</div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Judicial Rationale:</span>
                    </div>
                    <p>{legalRationale}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Action:</strong> {actionRecommendation}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Ready to safeguard this asset? Execute a registered, legally sound Will.
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Your Will Online in 15 Mins</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: ANCESTRAL VS SELF-ACQUIRED PROPERTY</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Hindu Succession Act</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/ancestral-vs-self-acquired-property-classifier-og.jpg"
                  alt="Ancestral vs Self-Acquired Property Classifier India - Supreme Court Provenance Guide"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Visualizing property classification under the Hindu Succession Act: Mitakshara coparcenary
                versus Section 8 individual separate property.
              </p>
            </div>

            {/* SECTION 3: SECTION 8 VS SECTION 6: CHANDER SEN RULE */}
            <section id="chander-sen-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 8 vs Section 6: Landmark Chander Sen Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many people believe that property inherited from a father is always ancestral. This is the
                  top legal myth in India. It leads to many unnecessary court cases.
                </p>
                <p>
                  The Supreme Court resolved this in Commissioner of Wealth Tax v. Chander Sen (1986). The
                  court looked at Section 8 of the Hindu Succession Act.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>The Supreme Court Ruling in CWT v. Chander Sen (1986)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The court ruled that Section 8 replaces old Hindu law. When a father dies without a Will
                    after 1956, his property passes to his heirs as separate property. In the son&rsquo;s
                    hands, it is self-acquired property. The grandson gets no birthright in it.
                  </p>
                </div>
                <p>
                  Later judgments confirmed this rule. These include Yudhishter (1987) and Uttam (2016). If
                  your father inherited a home from your grandfather after 1956, he is the sole owner. You
                  cannot claim a share while he is alive.
                </p>
              </div>
            </section>

            {/* SECTION 4: THE 4-GENERATION LINEAGE TEST */}
            <section id="four-generation-lineage" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>COPARCENARY LINEAGE CRITERIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The 4-Generation Lineage Test Under Hindu Law
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To be legally ancestral, property must meet four clear conditions. It must pass down four
                  generations of male lineage without any division:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Generation 1 (Paternal Great-Grandfather):</strong> The original male ancestor
                    who acquired the land.
                  </li>
                  <li>
                    <strong>Generation 2 (Paternal Grandfather / Dada):</strong> Inherited through male
                    lineage without partition.
                  </li>
                  <li>
                    <strong>Generation 3 (Father):</strong> Received down the unbroken male line without
                    division.
                  </li>
                  <li>
                    <strong>Generation 4 (Son or Daughter):</strong> Acquires an equal share by birth under
                    Section 6 of the Act.
                  </li>
                </ul>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Inheritance from Maternal Relatives Is Never Ancestral</span>
                  </div>
                  <p className="leading-relaxed">
                    Property from your mother, maternal grandfather (Nana), or uncle is never ancestral.
                    Under Hindu law, maternal property is always separate property. Children have no
                    birthright in it.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: PROPERTY INHERITED FROM FATHER: SECTION 8 TEST */}
            <section id="father-inheritance-test" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY SUCCESSION TESTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Property Inherited from Father: Section 8 Test
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To check property inherited from a father, apply three simple statutory tests:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black text-slate-900 uppercase tracking-wider text-[11px] text-[#C65378]">
                      Stage 1: Demise Date
                    </div>
                    <div className="font-bold text-slate-800">Did Father Die After 1956?</div>
                    <p className="text-slate-600 leading-relaxed">
                      If the father died after June 17, 1956, Section 8 applies. The property becomes the
                      son&rsquo;s separate property.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black text-slate-900 uppercase tracking-wider text-[11px] text-[#C65378]">
                      Stage 2: Testamentary Bequest
                    </div>
                    <div className="font-bold text-slate-800">Did Father Leave a Will or Gift?</div>
                    <p className="text-slate-600 leading-relaxed">
                      If the father left a Will or Gift deed, it is 100% self-acquired property under Supreme
                      Court rulings.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black text-slate-900 uppercase tracking-wider text-[11px] text-[#C65378]">
                      Stage 3: Original Purchase Source
                    </div>
                    <div className="font-bold text-slate-800">Did Father Buy with Own Income?</div>
                    <p className="text-slate-600 leading-relaxed">
                      If the father bought it with his own salary or business earnings, it was never
                      ancestral property.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: PARTITION DEEDS & SEVERANCE */}
            <section id="partition-deeds-severance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SEVERANCE OF COPARCENARY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Partition Deeds: How Division Alters Legal Status
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When family members divide ancestral land through a registered deed, the joint family
                  ends. In Uttam v. Saubhag Singh (2016), the Supreme Court clarified the law.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    When a partition takes place, the joint family ends for the divided property.
                  </li>
                  <li>
                    The share allotted to each person becomes their individual separate property.
                  </li>
                  <li>
                    Children born after the division cannot ask to reopen the partition.
                  </li>
                </ul>
                <p>
                  Under Section 6(5), only a registered deed or court decree is valid. An oral or informal
                  agreement on plain paper can be challenged in court.
                </p>
              </div>
            </section>

            {/* SECTION 7: DAUGHTERS' EQUAL COPARCENARY RIGHTS */}
            <section id="daughters-coparcenary-rights" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>GENDER EQUALITY UNDER SECTION 6</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Daughters&rsquo; Equal Coparcenary Rights: Vineeta Sharma
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before 2005, only male heirs held birthrights in joint family property. The landmark
                  Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020) changed Indian succession
                  law forever.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Key Rules from Vineeta Sharma (2020)</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>Daughters Are Equal Heirs:</strong> Daughters hold the exact same coparcenary
                      rights as sons from birth under Section 6.
                    </li>
                    <li>
                      <strong>Father Need Not Be Alive in 2005:</strong> A daughter can claim her share even
                      if her father passed away before September 9, 2005.
                    </li>
                    <li>
                      <strong>Equal Right to Be Karta:</strong> A senior daughter can manage the family estate
                      as Karta.
                    </li>
                    <li>
                      <strong>Protected Partitions:</strong> Registered partitions completed before December
                      20, 2004 cannot be reopened.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* SECTION 8: STRUCTURED COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPREHENSIVE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Ancestral vs Self-Acquired Assets
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare rights of ownership, Will making, and partition claims under the Hindu Succession
                Act, 1956.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Legal Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">Ancestral Property</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">Self-Acquired Property</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Source of Title</td>
                      <td className="p-3.5 sm:p-4">
                        Inherited through 4 unbroken generations of male lineage without division.
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Bought with personal income, received via Gift/Will, or inherited under Section 8.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Right by Birth</td>
                      <td className="p-3.5 sm:p-4 text-[#C65378] font-bold">
                        Yes. Children acquire an equal right automatically upon birth.
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        No right by birth. Children have zero claim during owner&rsquo;s lifetime.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Testamentary Will Freedom</td>
                      <td className="p-3.5 sm:p-4">
                        Restricted. Owner can only Will away their specific undivided share under Section 30.
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        100% Absolute. Owner can bequeath 100% of property to anyone freely.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Sale Without Heirs&rsquo; Consent</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        Cannot sell whole property without legal necessity or family consent.
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Full right to sell or gift without asking children for NOC.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Daughters&rsquo; Legal Share</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-800">
                        Equal coparcener by birth since 2005 (Vineeta Sharma ruling).
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Equal Class I heir only if owner dies without making a Will.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Creditor Attachment</td>
                      <td className="p-3.5 sm:p-4">
                        Only the debtor&rsquo;s undivided share can be attached for debts.
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Entire property can be attached to pay personal debts.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>PLANNING A SALE OF INHERITED PROPERTY?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Calculate Capital Gains Tax &amp; Budget 2024 Grandfathering Options
                </div>
                <p className="text-xs text-slate-600">
                  Compare 12.5% Flat Tax vs 20% Indexation and calculate multi-heir Section 54EC bond
                  exemptions.
                </p>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Tax Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP: TRACING TITLE PROVENANCE */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>TITLE DUE DILIGENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Tracing Title Provenance in India
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before selling real estate or drafting a Will, trace title provenance to avoid family
                  disputes:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      step: "Step 1",
                      title: "Get 30-Year Prior Title Deeds",
                      desc: "Apply at the Sub-Registrar Office for certified copies of title deeds for the past 30 years. Identify the original buyer and transfer mode.",
                    },
                    {
                      step: "Step 2",
                      title: "Verify Date of Predecessor's Demise",
                      desc: "Check the official death certificate. If the demise happened after June 17, 1956, Section 8 applies, creating separate property in the son's hands.",
                    },
                    {
                      step: "Step 3",
                      title: "Inspect Encumbrance Certificate (EC)",
                      desc: "Obtain Form 15 for 30 years from the registry office. Confirm that no partition suit or family mortgage is registered.",
                    },
                    {
                      step: "Step 4",
                      title: "Review Revenue Mutation Records",
                      desc: "Check Patta, Khata, or 7-12 extracts. Confirm that ownership is entered in your personal name rather than as an HUF Karta.",
                    },
                    {
                      step: "Step 5",
                      title: "Add Self-Acquired Declaration in Will",
                      desc: "Include clear recitals citing Supreme Court rulings in Chander Sen and Arunachala Mudaliar to prevent family claims.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL LITIGATION INSIGHTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Delhi, Bengaluru, Mumbai
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Delhi */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Delhi DDA Flat Dispute</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Grandson Sues to Stop Father Selling Grandfather&rsquo;s Flat
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Grandfather bought a flat in Delhi in 1982. He died without a
                    Will in 2012. The father mutated the flat in his name. In 2024, the grandson filed a
                    suit claiming it was ancestral property.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> The court dismissed the grandson&rsquo;s suit under{" "}
                    <em>CWT v. Chander Sen</em>. Because the grandfather died after 1956, the father
                    inherited under Section 8 as sole owner. The grandson had no birthright.
                  </p>
                </div>

                {/* Case 2: Bengaluru */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Bengaluru Farmland</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Daughter Claims Coparcenary Share in Undivided Land
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> 10 acres of land passed undivided across four generations. In
                    2021, two sons tried to sell the land. They excluded their married sister because their
                    father died in 1999.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> Under <em>Vineeta Sharma (2020)</em>, the court ruled that the
                    daughter is an equal coparcener by birth. Her father&rsquo;s death before 2005 did not
                    matter. She won an equal 1/3rd share.
                  </p>
                </div>

                {/* Case 3: Mumbai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mumbai Apartment Will</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Son Challenges Father&rsquo;s Will Leaving Flat to Sister
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A father received a Mumbai flat as a registered gift from his
                    mother in 1995. In 2023, he made a Will leaving the flat to his daughter. His son claimed
                    ancestral rights.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> The High Court granted probate to the daughter. Under{" "}
                    <em>Arunachala Mudaliar</em>, gifts from parents are self-acquired property. The father
                    had full right to Will it freely.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL RECITAL TEMPLATES & CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL DRAFTING CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Recital Templates &amp; Verification Checklist
              </h3>

              {/* Template Box 1: Self-Acquired Declaration Recital */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Self-Acquired Property Testamentary Recital for Will Deed
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
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
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I declare that the Schedule Property is my SELF-ACQUIRED PROPERTY. I acquired it through [my personal earnings / inheritance under Section 8 of the Hindu Succession Act, 1956 / registered Gift Deed].

Under the Supreme Court rulings in 'Commissioner of Wealth Tax v. Chander Sen' (1986) 3 SCC 567 and 'Yudhishter v. Ashok Kumar' (1987) 1 SCC 204, this property is held in my individual capacity. No child, grandchild, or relative holds any birthright in it.

Under Section 30 of the Hindu Succession Act, 1956, I bequeath 100% of my title in the Schedule Property to [Name of Beneficiary], absolutely and forever."`}
                </pre>
              </div>

              {/* Template Box 2: Verification Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Document Checklist: Proving Self-Acquired Status in India
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
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
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Registered Sale Deed showing personal purchase</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Father/Grandfather Death Certificate (Post-1956)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>30-Year SRO Encumbrance Certificate (Form 15)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Revenue Mutation Record (Individual name Patta/Khata)</span>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial &amp; Property Succession Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Succession Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s leading digital estate planning platform, powered by AMA
                  Legal Solutions. Our senior High Court litigators have drafted thousands of dispute-free
                  Wills. We resolve complex family partitions and property disputes pan-India.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/tools/huf-coparcenary-share-partition-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>HUF Partition Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Checker Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Inherited Capital Gains</span>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Ancestral Assets
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
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
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Judicial Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All legal classifications on this page are grounded in Indian statutes and landmark
                  Supreme Court decisions:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Hindu Succession Act, 1956</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court: Vineeta Sharma (2020)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court: CWT v. Chander Sen (1986)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Succession Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/huf-coparcenary-share-partition-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      HUF Partition Calculator
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Document Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Template India
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
                Specialist in Hindu succession law, coparcenary partition defense, High Court probate
                litigation, and challenge-proof testamentary Will structuring.
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
                  <span>PREVENT FAMILY PARTITION LAWSUITS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Self-Acquired Home with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Your property is self-acquired. You have 100% legal freedom to bequeath it to your
                  chosen heirs and bar unwanted claims.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PROPERTY DISPUTE &amp; PARTITION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing a Coparcenary Claim or Partition Legal Notice?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our civil litigators handle title verification, Section 8 defense petitions, and
                  challenge baseless grandson claims pan-India.
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
                      <strong>Supreme Court Backed:</strong> Governed strictly by the <em>Chander Sen</em>{" "}
                      and <em>Vineeta Sharma</em> precedents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Will Defense:</strong> Inserts bulletproof non-coparcenary declarations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Flaws:</strong> Analyzes SRO registration, partition, and mutation
                      legality.
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
          href="#interactive-classifier"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Classifier Tool</span>
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
