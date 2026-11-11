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
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  FileText,
  AlertCircle,
  Clock,
  ShieldAlert,
  CheckSquare,
  Handshake,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-purpose-scope", label: "1. Section 7 Arbitration Clause: Stopping 20-Year Civil Suits" },
  { id: "arbitrability-clause-checker", label: "2. Free Arbitrability & Clause Validity Checker" },
  { id: "vidya-drolia-arbitrability-test", label: "3. Vidya Drolia Precedent: Arbitrable vs In Rem" },
  { id: "mediation-arbitration-clause-format", label: "4. Pre-Litigation Mediation & Arbitration Clause" },
  { id: "sole-arbitrator-protocol-format", label: "5. Sole Arbitrator Designation Protocol Format" },
  { id: "civil-court-bar-arbitrator-powers", label: "6. Civil Court Bar Box & Arbitrator Powers Guide" },
  { id: "mediation-act-2023-rules", label: "7. Mediation Act, 2023: 120-Day Rule & Decree Status" },
  { id: "will-vs-family-settlement-rule", label: "8. Why Wills Need a Separate Family Settlement" },
  { id: "supreme-court-arbitration-rulings", label: "9. Supreme Court Cases: Singhania, Perkins & Stamp" },
  { id: "step-by-step-enforcement-sop", label: "10. Step-by-Step SOP: Blocking a Civil Suit" },
  { id: "fatal-drafting-mistakes", label: "11. Four Fatal Mistakes That Break Arbitration" },
  { id: "institutional-profile", label: "12. Institutional Profile: Family Settlement Bench" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Family Arbitration" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Can an arbitration clause stop a civil court land suit?",
    a: "Yes. When all heirs sign a family deal with a Section 7 clause, you can stop a civil suit fast. Under Section 8 of the Act, ask the judge to send the case to a private judge before you file your main reply. The civil judge must stop the suit.",
  },
  {
    q: "What did Vidya Drolia say about family property arbitration?",
    a: "In Vidya Drolia v. Durga Trading Corp (2021) 2 SCC 1, the court set a clear four-part rule. Private duties between signed heirs (in personam) like flat splits, cash owed, and rent shares are fair for arbitration. Public court grants (in rem) like probate stay in court.",
  },
  {
    q: "Can I put a binding arbitration clause inside my Will?",
    a: "No. In Vijay Kumar Sharma v. Raghunandan Sharma (2010) 2 SCC 486, the Supreme Court held that a Will is just a one-sided wish. Since heirs do not sign a Will as a pact, there is no deal under Section 7. Put this clause in a signed Family Settlement Agreement instead.",
  },
  {
    q: "How does the Mediation Act, 2023 help solve family fights fast?",
    a: "Section 5 of the Mediation Act, 2023 lets kin talk in private first before going to court. Talks must end in 120 days, or 180 days if all sides agree. Once signed and checked by the mediator, Section 27 makes the pact work like a court decree.",
  },
  {
    q: "Can one brother pick the sole arbitrator on his own?",
    a: "No. Under Section 12(5) and Perkins Eastman (2019), one side cannot pick the sole judge alone. Such a rule is void in law. Name a fair retired judge, a neutral panel like DIAC or MCIA, or pick jointly with a Section 11 High Court back-up.",
  },
  {
    q: "What if a brother claims short stamp duty to stall talks?",
    a: "He cannot stall arbitration this way. A 7-judge bench in In Re: Interplay (2023) settled this law. Courts under Section 8 or Section 11 do not halt referral over stamp paper gaps. The private arbitrator handles any stamp fee issue later.",
  },
  {
    q: "How fast must a sole arbitrator finish a family case?",
    a: "Under Section 29A of the Act, the judge must pass the final award in 12 months from when claims close. All sides may add 6 months once by consent. Under Section 29B fast-track rules, the final award can come in just 6 months.",
  },
  {
    q: "Can an arbitration clause decide probate or a fake Will fight?",
    a: "No. Under Vidya Drolia, a probate grant binds the whole world (in rem), so only a probate court tests if a Will is true. Once heirs make peace and sign a family deal to split shares, any breach of that deal goes to arbitration.",
  },
];

export default function ArbitrationClauseFamilySettlementClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-purpose-scope");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedMedArb, setCopiedMedArb] = useState<boolean>(false);
  const [copiedArbitrator, setCopiedArbitrator] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE ARBITRABILITY & CLAUSE CHECKER
  // ==========================================
  const [disputeNature, setDisputeNature] = useState<string>("property_division");
  const [documentType, setDocumentType] = useState<string>("signed_fsa");
  const [mediationTier, setMediationTier] = useState<boolean>(true);
  const [appointmentMode, setAppointmentMode] = useState<string>("named_retired_judge");

  let isArbitrable = true;
  let vidyaDroliaNote =
    "Fully Arbitrable (In Personam): Division of family homes, land, and cash payouts between signed family members passes the Vidya Drolia test.";
  let docStatus = "Valid Section 7 Agreement";
  let courtBarStrength = "Strong Civil Court Bar (Section 8 Act)";
  let estimatedTimeline = mediationTier ? "4 to 12 Months (Med-Arb)" : "6 to 12 Months (Arbitration)";

  if (disputeNature === "probate_will_validity") {
    isArbitrable = false;
    vidyaDroliaNote =
      "Non-Arbitrable (In Rem): Under Vidya Drolia, only a Probate Court can test if a Will is genuine. Convert any compromise into a signed Family Settlement first.";
    estimatedTimeline = "Court Probate First (Settle via Order 23 Rule 3)";
  } else if (disputeNature === "third_party_title") {
    isArbitrable = false;
    vidyaDroliaNote =
      "Non-Arbitrable (Erga Omnes): Cancelling a sale deed held by an outside buyer affects third-party rights. File a civil suit for outside buyers.";
    estimatedTimeline = "Civil Suit Needed for Outside Buyers";
  } else if (disputeNature === "owelty_rent") {
    isArbitrable = true;
    vidyaDroliaNote =
      "Fully Arbitrable (In Personam): Unpaid owelty cash equalization, family rent shares, and maintenance dues are pure money duties between family members.";
  } else if (disputeNature === "family_business") {
    isArbitrable = true;
    vidyaDroliaNote =
      "Fully Arbitrable (In Personam): Partnership shares, director seats, and brand rights under a family charter are valid arbitration claims under Hari Shankar Singhania.";
  }

  if (documentType === "will_only") {
    docStatus = "Invalid Under Vijay Kumar Sharma (2010 SC)";
    courtBarStrength = "Weak: No Civil Court Bar (Not Signed by Heirs)";
    isArbitrable = false;
  } else if (documentType === "oral_memo_yadasht") {
    docStatus = "Valid Section 7 Pact (If Signed by All Members)";
    courtBarStrength = isArbitrable
      ? "Strong Bar (Stamp Flaws Cannot Stop Section 8 Referral)"
      : "Blocked by In Rem Rule";
  } else {
    docStatus = "Valid Section 7 Contract (Consensus Ad Idem)";
    courtBarStrength = isArbitrable
      ? "Maximum Bar: Mandatory Section 8 Referral to Arbitrator"
      : "Limited: In Rem Issues Stay in Court";
  }

  let neutralityStatus = "Compliant with Section 12(5) & Perkins Eastman";
  if (appointmentMode === "unilateral_eldest") {
    neutralityStatus = "Invalid: Unilateral Choice Void Under Perkins Eastman (2019 SC)";
    courtBarStrength = "Risk: High Court May Replace Arbitrator Under Section 11";
  } else if (appointmentMode === "institutional_diac") {
    neutralityStatus = "Gold Standard: DIAC / MCIA / IIAC Panel Prevents Bias Delays";
  }

  const copyMedArbToClipboard = () => {
    const text = `CLAUSE [X]: PRE-LITIGATION MEDIATION & BINDING ARBITRATION
(Compliant with Mediation Act, 2023 & Section 7 of the Arbitration and Conciliation Act, 1996)

[X].1 AMICABLE DISCUSSION & PRE-LITIGATION MEDIATION (MEDIATION ACT, 2023):
All disputes, differences, or claims arising out of or relating to this Family Settlement Agreement (including its breach, valuation, owelty cash payout, rent sharing, or possession handover) are strictly private rights in personam between the Parties. Before invoking arbitration, any disputing Party shall issue a written Dispute Notice to all other Parties. The Parties shall first attempt to resolve the matter in good faith through Pre-Litigation Mediation under Section 5 of the Mediation Act, 2023 before a mutually agreed Mediator (or a court-annexed / institutional mediation centre at [City Name]). Mediation shall conclude within 120 (one hundred twenty) days from the first session, extendable once by up to 60 (sixty) days with written consent of all Parties. Any Mediated Settlement Agreement signed by the Parties and authenticated by the Mediator shall be final, binding, and enforceable as a decree of a civil court under Section 27 of the Mediation Act, 2023.

[X].2 MANDATORY REFERENCE TO BINDING ARBITRATION (SECTION 7):
If mediation fails, or if any Party refuses to participate in mediation within 15 (fifteen) days of receiving the Dispute Notice, the unresolved dispute shall be referred to and finally resolved by binding private arbitration under the Arbitration and Conciliation Act, 1996 (as amended).

[X].3 BAR ON CIVIL COURT SUITS (SECTION 8 PROTECTION):
The Parties expressly waive their right to file any civil partition suit, injunction suit, or recovery suit before any Civil Court in respect of matters covered by this Agreement. If any Party files a civil suit in breach of this Clause, any other Party may immediately apply under Section 8 of the Arbitration and Conciliation Act, 1996 to refer the suit to arbitration and seek full legal costs against the defaulting Party.

[X].4 EXCLUSION OF NON-ARBITRABLE IN REM MATTERS (VIDYA DROLIA SAVING CLAUSE):
For clarity under the Supreme Court judgment in Vidya Drolia v. Durga Trading Corporation (2021) 2 SCC 1, this Clause governs all inter partes contractual obligations, possession duties, and financial adjustments under this Settlement. Nothing in this Clause shall oust the exclusive statutory jurisdiction of a Probate Court for formal grant of probate where strictly required by law, nor bind unrelated third-party strangers.`;
    navigator.clipboard.writeText(text);
    setCopiedMedArb(true);
    setTimeout(() => setCopiedMedArb(false), 3000);
  };

  const copyArbitratorToClipboard = () => {
    const text = `CLAUSE [Y]: SOLE ARBITRATOR DESIGNATION PROTOCOL & FAST-TRACK SCHEDULE
(Compliant with Section 12(5) & Perkins Eastman Neutrality Rules)

[Y].1 APPOINTMENT OF NEUTRAL SOLE ARBITRATOR:
The arbitration shall be conducted by a neutral Sole Arbitrator mutually appointed by the Parties in writing within 21 (twenty-one) days of invocation of arbitration:
(a) Primary Named Neutral Arbitrator: Shri/Smt. [Full Name], Retired [High Court / District] Judge (or Senior Advocate), failing whom:
(b) Alternate Named Neutral Arbitrator: Shri/Smt. [Full Name], Retired Judge / Accredited Arbitrator.
No Party or interested family relative shall hold unilateral authority to nominate the Sole Arbitrator. If both named arbitrators are unavailable or conflicted under Section 12(5) and the Seventh Schedule of the Act, the Sole Arbitrator shall be appointed by [Delhi International Arbitration Centre (DIAC) / Mumbai Centre for International Arbitration (MCIA)] or by the Hon'ble High Court of [State] under Section 11 of the Arbitration and Conciliation Act, 1996.

[Y].2 SEAT, VENUE & LANGUAGE:
The legal Seat and Venue of arbitration shall be [City, State, e.g., New Delhi / Mumbai / Bengaluru]. Proceedings shall be conducted in English, and the Courts at [City] alone shall hold supervisory jurisdiction under the Act.

[Y].3 FAST-TRACK TIMELINE & POWERS OF THE ARBITRATOR (SECTIONS 17, 29A & 29B):
(a) Interim Orders: The Sole Arbitrator may grant urgent interim stay orders under Section 17 to stop unauthorized sale, mortgage, or demolition of family assets during proceedings.
(b) Valuation & Owelty: The Arbitrator may appoint an independent government-approved valuer, inspect joint accounts, and compute exact owelty cash compensation or rent arrears.
(c) Fast-Track Award: The Parties hereby agree to Fast-Track Procedure under Section 29B wherever practical so the final award is passed within 6 (six) months, and in all events within 12 (twelve) months under Section 29A.
(d) Costs & Finality: The award shall be final and enforceable as a Civil Court decree under Section 36. The Arbitrator shall award full legal and arbitral costs against any Party that causes bad-faith delay or files barred civil suits.`;
    navigator.clipboard.writeText(text);
    setCopiedArbitrator(true);
    setTimeout(() => setCopiedArbitrator(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `FAMILY SETTLEMENT ARBITRATION CLAUSE CHECKLIST:
1. Ensure ALL legal heirs and family members sign the Family Settlement Agreement (never rely on a Will alone).
2. State clearly that all settlement obligations are private rights in personam (Vidya Drolia compliant).
3. Include a 120-day Pre-Litigation Mediation step under Section 5 of the Mediation Act, 2023.
4. Name a neutral Retired Judge or Accredited Institution (never give one brother sole choice).
5. Specify the Seat & Venue city and Section 29B Fast-Track (6 months) / Section 29A (12 months) cap.
6. Grant explicit Section 17 interim stay, valuer appointment, and cost-shifting powers to the Arbitrator.
7. Keep the original signed Family Settlement safe to attach in any urgent Section 8 Civil Court Bar application.`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

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
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#FAF7F0]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65378]/20 border border-[#C65378]/40 text-rose-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>ARBITRATION ACT 1996 S. 7 &amp; 8 • MEDIATION ACT 2023 • VIDYA DROLIA</span>
          </div>

          {/* Strict H1 Tag (49 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Family Dispute Arbitration Clause Format in India
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Keep your home and land out of 20-year court fights. Copy our verified arbitration and mediation clause
            built under Section 7, the Mediation Act 2023, and Supreme Court Vidya Drolia rules.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#mediation-arbitration-clause-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Copy Arbitration Clause Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/family-settlement-deed-lawyer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Handshake className="w-4 h-4 text-[#C65378]" />
              <span>Consult Settlement Lawyer</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 7 &amp; 8</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY CIVIL SUIT BAR
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">120 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MEDIATION ACT 2023 WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">6 to 12 Mos</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FAST-TRACK AWARD CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Vidya Drolia</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                IN PERSONAM VS IN REM TEST
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
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built for Section 7 and Section 8 of the Arbitration Act, 1996, the Mediation Act, 2023, and the
                Vidya Drolia (2021) rule.
              </p>
            </div>

            {/* Quick Legal Warning Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Will vs Settlement Rule</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                A clause inside a Will alone does not bind your kids. Under Vijay Kumar Sharma (2010), all heirs must
                sign a joint family pact to bar civil suits.
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
                <span>EXECUTIVE BRIEF: KEY LEGAL RULES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Can It Stop a 20-Year Civil Suit?</strong> Yes. A signed Section 7 clause lets you block a
                    civil suit under Section 8 before you file your main reply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vidya Drolia Rule (2021):</strong> Private duties like home splits, cash owed, and rent
                    shares pass to private talks. Probate grants stay in court.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mediation Act, 2023 First:</strong> A 120-day talk window helps kin settle fast. A signed
                    deal counts as a civil court decree under Section 27.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fair Judge Rule:</strong> Never let one brother pick the judge alone. Name a retired judge
                    or neutral panel under Perkins Eastman (2019).
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/arbitration-clause-in-family-settlement-format-og.jpg"
                  alt="Arbitration and mediation clause format for Indian family settlement agreements"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Family Dispute Prevention Series: Mediation Act 2023 &amp; Section 7 Arbitration Clause
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  UPDATED FOR 2026 SUPREME COURT RULES
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE (ONLY H2 ON PAGE) */}
            <section id="statutory-purpose-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LAW AND SCOPE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 7 Arbitration Clause: Stopping 20-Year Civil Suits
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Indian kin often sign a family deal to split a home, shop, or plot in peace. Yet years later, one
                  brother may break his word. He may hold back rent, keep the house keys, or file a civil suit to stall
                  the land for 20 years.
                </p>
                <p>
                  A clear clause stops that stall fast. Under Section 7 of the Arbitration and Conciliation Act, 1996, a
                  written clause inside a signed Family Settlement Agreement binds each heir who signed it.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    How Section 8 Shuts the Civil Court Door
                  </div>
                  <p className="text-xs text-slate-700">
                    When a brother files a civil suit on the settled land, you show the signed pact with the Section 7
                    clause. Under Section 8 of the Act, the civil judge must send the fight out to a private judge.
                  </p>
                </div>
                <p>
                  When you pair the Mediation Act, 2023 with fast-track rules, your family trades 20-year court waits for
                  a clear 6 to 12 month path.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE ARBITRABILITY & CLAUSE CHECKER */}
            <section id="arbitrability-clause-checker" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>QUICK VALIDITY TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Arbitrability &amp; Clause Validity Checker
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Test if your fight passes the Vidya Drolia rule. See if your clause can stop a civil suit under
                Section 8.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: Dispute Nature */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Nature of Family Dispute:
                    </label>
                    <select
                      value={disputeNature}
                      onChange={(e) => setDisputeNature(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="property_division">House, Flat &amp; Land Handover Under Settlement</option>
                      <option value="owelty_rent">Owelty Cash Payout, Rent Share &amp; Tax Dues</option>
                      <option value="family_business">Family Business Control &amp; Partnership Shares</option>
                      <option value="probate_will_validity">Challenging a Will or Seeking Court Probate</option>
                      <option value="third_party_title">Cancelling Sale Deed Sold to Outside Buyer</option>
                    </select>
                  </div>

                  {/* Select 2: Document Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Where Is the Clause Written?
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="signed_fsa">Signed Family Settlement Agreement (All Heirs)</option>
                      <option value="oral_memo_yadasht">Signed Past Oral Memorandum (Yadasht)</option>
                      <option value="will_only">Inside Father or Mother&apos;s Will Only</option>
                    </select>
                  </div>

                  {/* Select 3: Arbitrator Mode */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Sole Arbitrator Appointment Rule:
                    </label>
                    <select
                      value={appointmentMode}
                      onChange={(e) => setAppointmentMode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="named_retired_judge">Named Neutral Retired Judge + Mutual Consent</option>
                      <option value="institutional_diac">Accredited Institution (DIAC / MCIA / IIAC)</option>
                      <option value="unilateral_eldest">Eldest Brother Picks Arbitrator Alone</option>
                    </select>
                  </div>

                  {/* Toggle 4: Mediation First */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Include Mediation Act 2023 Tier First?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMediationTier(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          mediationTier
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        Yes, Med-Arb Tier
                      </button>
                      <button
                        type="button"
                        onClick={() => setMediationTier(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          !mediationTier
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        Direct Arbitration
                      </button>
                    </div>
                  </div>
                </div>

                {/* COMPUTED RESULT DISPLAY */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      {isArbitrable && appointmentMode !== "unilateral_eldest" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <span className="font-extrabold text-sm text-slate-900">
                        {isArbitrable ? "Arbitrable Family Dispute" : "Court Jurisdiction Alert"}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                      {docStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{vidyaDroliaNote}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Civil Court Bar</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">{courtBarStrength}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Neutrality Check</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">{neutralityStatus}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Expected Timeline</div>
                      <div className="text-xs font-bold text-emerald-700 mt-0.5">{estimatedTimeline}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: VIDYA DROLIA PRECEDENT (COMPETITOR BLIND SPOT & MOAT) */}
            <section id="vidya-drolia-arbitrability-test" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>KEY SUPREME COURT RULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Vidya Drolia Precedent: Arbitrable vs In Rem
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most forms skip the key rule in Vidya Drolia v. Durga Trading Corp (2021) 2 SCC 1. Three judges set a
                four-part test. It shows which fights a private judge can solve and which must stay in court:
              </p>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">
                        Fight Type
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-emerald-200">
                        Private Judge OK (In Personam)
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-rose-200">
                        Court Only (In Rem)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">House &amp; Land Split</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        Enforcing agreed plot lines, key handover, and sale cash under a signed family deal
                      </td>
                      <td className="p-3.5">
                        Voiding a sale deed held by an outside buyer (affects third-party rights)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Wills &amp; Probate</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        Splitting shares after all heirs sign a peace deal
                      </td>
                      <td className="p-3.5">
                        Granting or ending Probate or Letters of Care in court
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Cash &amp; Rent Dues</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        Owelty cash due, unpaid shop rent, repair bills, and bank split
                      </td>
                      <td className="p-3.5">
                        Police FIRs for fraud, fake sign crimes, or tax fraud cases
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Family Firms</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        Firm wind-up, non-compete terms, and share buybacks in a family deal
                      </td>
                      <td className="p-3.5">
                        Public insolvency pleas or NCLT firm wind-up suits
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Time &amp; Cost</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        6 to 12 months under Sections 29A &amp; 29B; final award works like a court decree
                      </td>
                      <td className="p-3.5">
                        15 to 20 years across trial court, High Court, and Supreme Court
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: COPY-PASTE TEMPLATE 1 - PRE-LITIGATION MEDIATION & ARBITRATION CLAUSE */}
            <section id="mediation-arbitration-clause-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTE FORMAT 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Pre-Litigation Mediation &amp; Arbitration Clause
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Put this two-step clause in your family deal or oral note. It meets Section 7 rules, uses the Mediation
                Act, 2023, and respects Vidya Drolia limits.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Pre-Litigation Mediation &amp; Arbitration Clause Format (Section 7 + Mediation Act 2023)
                  </div>
                  <button
                    type="button"
                    onClick={copyMedArbToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedMedArb ? (
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
{`CLAUSE [X]: PRE-LITIGATION MEDIATION & BINDING ARBITRATION
(Compliant with Mediation Act, 2023 & Section 7 of the Arbitration and Conciliation Act, 1996)

[X].1 AMICABLE DISCUSSION & PRE-LITIGATION MEDIATION (MEDIATION ACT, 2023):
All disputes, differences, or claims arising out of or relating to this Family Settlement Agreement (including its breach, valuation, owelty cash payout, rent sharing, or possession handover) are strictly private rights in personam between the Parties. Before invoking arbitration, any disputing Party shall issue a written Dispute Notice to all other Parties. The Parties shall first attempt to resolve the matter in good faith through Pre-Litigation Mediation under Section 5 of the Mediation Act, 2023 before a mutually agreed Mediator (or a court-annexed / institutional mediation centre at [City Name]). Mediation shall conclude within 120 (one hundred twenty) days from the first session, extendable once by up to 60 (sixty) days with written consent of all Parties. Any Mediated Settlement Agreement signed by the Parties and authenticated by the Mediator shall be final, binding, and enforceable as a decree of a civil court under Section 27 of the Mediation Act, 2023.

[X].2 MANDATORY REFERENCE TO BINDING ARBITRATION (SECTION 7):
If mediation fails, or if any Party refuses to participate in mediation within 15 (fifteen) days of receiving the Dispute Notice, the unresolved dispute shall be referred to and finally resolved by binding private arbitration under the Arbitration and Conciliation Act, 1996 (as amended).

[X].3 BAR ON CIVIL COURT SUITS (SECTION 8 PROTECTION):
The Parties expressly waive their right to file any civil partition suit, injunction suit, or recovery suit before any Civil Court in respect of matters covered by this Agreement. If any Party files a civil suit in breach of this Clause, any other Party may immediately apply under Section 8 of the Arbitration and Conciliation Act, 1996 to refer the suit to arbitration and seek full legal costs against the defaulting Party.

[X].4 EXCLUSION OF NON-ARBITRABLE IN REM MATTERS (VIDYA DROLIA SAVING CLAUSE):
For clarity under the Supreme Court judgment in Vidya Drolia v. Durga Trading Corporation (2021) 2 SCC 1, this Clause governs all inter partes contractual obligations, possession duties, and financial adjustments under this Settlement. Nothing in this Clause shall oust the exclusive statutory jurisdiction of a Probate Court for formal grant of probate where strictly required by law, nor bind unrelated third-party strangers.`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: COPY-PASTE TEMPLATE 2 - SOLE ARBITRATOR DESIGNATION PROTOCOL */}
            <section id="sole-arbitrator-protocol-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTE FORMAT 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Sole Arbitrator Designation Protocol Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pair Clause [X] with this Sole Judge Protocol. It avoids one-sided traps under Section 12(5). It gives
                the judge full power to freeze land sales and close cases in 6 to 12 months.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Sole Arbitrator Designation &amp; Fast-Track Protocol (Sections 11, 12(5), 17, 29A &amp; 29B)
                  </div>
                  <button
                    type="button"
                    onClick={copyArbitratorToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedArbitrator ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Protocol</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`CLAUSE [Y]: SOLE ARBITRATOR DESIGNATION PROTOCOL & FAST-TRACK SCHEDULE
(Compliant with Section 12(5) & Perkins Eastman Neutrality Rules)

[Y].1 APPOINTMENT OF NEUTRAL SOLE ARBITRATOR:
The arbitration shall be conducted by a neutral Sole Arbitrator mutually appointed by the Parties in writing within 21 (twenty-one) days of invocation of arbitration:
(a) Primary Named Neutral Arbitrator: Shri/Smt. [Full Name], Retired [High Court / District] Judge (or Senior Advocate), failing whom:
(b) Alternate Named Neutral Arbitrator: Shri/Smt. [Full Name], Retired Judge / Accredited Arbitrator.
No Party or interested family relative shall hold unilateral authority to nominate the Sole Arbitrator. If both named arbitrators are unavailable or conflicted under Section 12(5) and the Seventh Schedule of the Act, the Sole Arbitrator shall be appointed by [Delhi International Arbitration Centre (DIAC) / Mumbai Centre for International Arbitration (MCIA)] or by the Hon'ble High Court of [State] under Section 11 of the Arbitration and Conciliation Act, 1996.

[Y].2 SEAT, VENUE & LANGUAGE:
The legal Seat and Venue of arbitration shall be [City, State, e.g., New Delhi / Mumbai / Bengaluru]. Proceedings shall be conducted in English, and the Courts at [City] alone shall hold supervisory jurisdiction under the Act.

[Y].3 FAST-TRACK TIMELINE & POWERS OF THE ARBITRATOR (SECTIONS 17, 29A & 29B):
(a) Interim Orders: The Sole Arbitrator may grant urgent interim stay orders under Section 17 to stop unauthorized sale, mortgage, or demolition of family assets during proceedings.
(b) Valuation & Owelty: The Arbitrator may appoint an independent government-approved valuer, inspect joint accounts, and compute exact owelty cash compensation or rent arrears.
(c) Fast-Track Award: The Parties hereby agree to Fast-Track Procedure under Section 29B wherever practical so the final award is passed within 6 (six) months, and in all events within 12 (twelve) months under Section 29A.
(d) Costs & Finality: The award shall be final and enforceable as a Civil Court decree under Section 36. The Arbitrator shall award full legal and arbitral costs against any Party that causes bad-faith delay or files barred civil suits.`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: CIVIL COURT BAR BOX & ARBITRATOR POWERS BOX */}
            <section id="civil-court-bar-arbitrator-powers" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>COURT BAR &amp; JUDGE POWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Civil Court Bar Box &amp; Arbitrator Powers Guide
              </h3>

              {/* CIVIL COURT BAR BOX */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-7 space-y-4 shadow-md border border-[#C65378]/30">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/20 border border-[#C65378]/50 text-rose-200 text-xs font-bold uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>CIVIL COURT BAR BOX</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 font-bold">
                    SECTION 8 ACT + ORDER 7 RULE 11 CPC
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  How You Shut Down a Brother&apos;s Civil Court Suit
                </h4>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  A clause does not physically lock a court gate. Instead, it gives you a fast legal tool to throw out
                  a civil suit before the trial even starts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-rose-200">1. Strict Section 8 Plea</div>
                    <p className="text-white/80 leading-relaxed">
                      File a Section 8 plea before your written reply. Attach the signed deal. The judge must send the
                      case out of civil court.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-rose-200">2. Stamp Duty Shield (2023)</div>
                    <p className="text-white/80 leading-relaxed">
                      Under In Re: Interplay (2023), a civil judge cannot halt your plea even if a brother claims short
                      stamp paper.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1.5">
                    <div className="font-bold text-rose-200">3. Section 5 Court Bar</div>
                    <p className="text-white/80 leading-relaxed">
                      Section 5 bars civil judges from stepping into private talks. This cuts off slow stay appeals.
                    </p>
                  </div>
                </div>
              </div>

              {/* ARBITRATOR POWERS BOX */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Gavel className="w-4 h-4" />
                    <span>ARBITRATOR POWERS BOX</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">
                    Sections 17, 26, 29A, 31A &amp; 36
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">1. Freeze Sales (Sec 17)</div>
                    <p className="text-slate-600 leading-relaxed">
                      Pass fast stay orders stopping any sibling from selling, pledging, or renting out settled land
                      while talks run.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">2. Value Flats &amp; Cash</div>
                    <p className="text-slate-600 leading-relaxed">
                      Pick a fair valuer under Section 26 and set cash owelty sums when plots have unequal market worth.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">3. Check Rent &amp; Books</div>
                    <p className="text-slate-600 leading-relaxed">
                      Ask for bank books, rent deeds, and shop logs to count unpaid heir shares plus interest.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">4. Order Keys &amp; Deeds</div>
                    <p className="text-slate-600 leading-relaxed">
                      Order handover of house keys, title papers, and office visits to finish land name change.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">5. 12-Month Cap (Sec 29A)</div>
                    <p className="text-slate-600 leading-relaxed">
                      Pass a final award in 12 months, or 6 months under Section 29B fast-track. No multi-year waits.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">6. Shift Legal Costs (Sec 31A)</div>
                    <p className="text-slate-600 leading-relaxed">
                      Order the sibling who broke the pact or filed a barred court suit to pay all legal fees.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: MEDIATION ACT, 2023 RULES */}
            <section id="mediation-act-2023-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Handshake className="w-4 h-4" />
                <span>MEDIATION ACT 2023 RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Mediation Act, 2023: 120-Day Rule &amp; Decree Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Pre-Suit Talks</span>
                    <span className="text-[10px] text-rose-600 font-bold">Section 5 &amp; 18</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Kin try calm talks first for up to 120 days. Both sides can add 60 days by written consent. Your
                    time limit pauses while talks run.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Works Like a Decree</span>
                    <span className="text-[10px] text-rose-600 font-bold">Section 27</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Once signed by all kin and checked by the mediator, the deal is final. The law enforces it just like
                    a civil court decree.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>90-Day Appeal Bar</span>
                    <span className="text-[10px] text-rose-600 font-bold">Section 28</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    No brother can back out later over small regrets. You can challenge a signed pact only within 90
                    days for fraud or fake identity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: WILL VS FAMILY SETTLEMENT RULE */}
            <section id="will-vs-family-settlement-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>WILL VS SETTLEMENT RULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Why Wills Need a Separate Family Settlement
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Many parents ask if they can put a private dispute clause inside their Will to keep kids out of court.
                  In Vijay Kumar Sharma v. Raghunandan Sharma (2010) 2 SCC 486, the Supreme Court said no.
                </p>
                <p>
                  A Will is a one-sided wish signed by one parent. Under Section 7 of the Act, a binding clause needs a
                  written deal signed by all heirs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200">
                    <div className="font-bold text-rose-900 mb-1">Clause Inside a Will Alone</div>
                    <p className="text-rose-800 leading-relaxed">
                      Does not bind heirs under Section 7. Kids never signed a joint pact. A brother can still sue in
                      civil court or fight probate.
                    </p>
                  </div>
                  <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200">
                    <div className="font-bold text-emerald-900 mb-1">Clause Inside Family Pact</div>
                    <p className="text-emerald-800 leading-relaxed">
                      Fully binds each heir under Section 7. Signed by sons, daughters, and spouse. Blocks civil suits
                      via Section 8.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: SUPREME COURT PRECEDENTS */}
            <section id="supreme-court-arbitration-rulings" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SUPREME COURT RULINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Supreme Court Cases: Singhania, Perkins &amp; Stamp
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-xs">
                    1. Hari Shankar Singhania v. Gaur Hari Singhania (2006) 4 SCC 658
                  </div>
                  <p className="text-xs text-slate-600">
                    Family deals hold high value in Indian law. Courts back private dispute clauses in family pacts to
                    keep peace. The 3-year clock starts only when peace talks fail for good.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-xs">
                    2. Perkins Eastman Architects v. HSCC (India) Ltd. (2019) 20 SCC 760
                  </div>
                  <p className="text-xs text-slate-600">
                    One side cannot hold sole power to name the judge. Under Section 12(5), name a fair retired judge or
                    neutral panel so no heir can void the award later.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-xs">
                    3. In Re: Interplay Between Arbitration &amp; Indian Stamp Act (2023 INSC 1066)
                  </div>
                  <p className="text-xs text-slate-600">
                    A 7-judge bench ruled that a stamp fee gap does not kill an arbitration clause. Civil courts under
                    Section 8 must still refer the fight to the private judge.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP ENFORCEMENT SOP */}
            <section id="step-by-step-enforcement-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP ACTION GUIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Blocking a Civil Suit
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Send a Clear Dispute Notice</div>
                    <p className="text-slate-600 mt-0.5">
                      List the terms your sibling broke. Invite all sides to 120-day talks under Section 5 of the
                      Mediation Act, 2023.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Keep Section 8 Ready for Civil Court</div>
                    <p className="text-slate-600 mt-0.5">
                      If a brother sues in civil court first, do not file a regular reply on facts. File a Section 8
                      plea right on day one.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Send Section 21 Notice</div>
                    <p className="text-slate-600 mt-0.5">
                      If talks fail or your sibling ignores notice for 15 days, send a Section 21 notice calling on the
                      named judge to start hearings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Move High Court Under Section 11</div>
                    <p className="text-slate-600 mt-0.5">
                      If a sibling stalls on naming a judge for 30 days, ask the High Court under Section 11(6) to pick
                      a neutral sole arbitrator.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Freeze Sales &amp; Enforce Award</div>
                    <p className="text-slate-600 mt-0.5">
                      Seek a fast Section 17 stay to halt secret asset sales. Once the final award comes, enforce it
                      like a court decree under Section 36.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: FOUR FATAL MISTAKES */}
            <section id="fatal-drafting-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>AVOID WEAK CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Four Fatal Mistakes That Break Arbitration
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Leaving Out Married Sisters</span>
                  </div>
                  <p className="text-slate-600">
                    A sister who did not sign has birth rights under Vineeta Sharma (2020). Your clause will not bind
                    her, and she can file a civil suit.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Using Soft Words Like &quot;May Refer&quot;</span>
                  </div>
                  <p className="text-slate-600">
                    Courts throw out weak lines that say kin &quot;may&quot; try private talks. Use firm words like
                    &quot;shall be referred to and settled.&quot;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Naming a Close Uncle as Judge</span>
                  </div>
                  <p className="text-slate-600">
                    A relative tied to one branch fails Section 12(5) bias checks. Pick a neutral retired judge or an
                    accredited ADR centre.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Filing a Reply Before Section 8</span>
                  </div>
                  <p className="text-slate-600">
                    If you file a full written defense in civil court first, you lose your right to seek a Section 8
                    bar.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL TOOLS INTEGRATION */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>FREE FAMILY SHARE TOOLS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Check Heir Shares, Ancestral Rules &amp; HUF Partitions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Before your family signs a deal, check each legal heir share with our free Indian estate tools:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
                <Link
                  href="/tools/succession-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Legal Heir Share Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/ancestral-vs-self-acquired-property-classifier"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Ancestral Asset Checker</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/huf-coparcenary-share-partition-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>HUF Partition Calculator</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
              </div>
            </div>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL TEAM &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Family Settlement Bench
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Family Settlement &amp; ADR Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is run by AMA Legal Solutions. Our lawyers write safe family pacts, Mediation Act 2023
                  terms, and Section 7 clauses across India. We also appear in High Courts for Section 8 civil suit bars
                  and Section 11 judge picks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/family-settlement-deed-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Family Settlement Lawyer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/contact"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Contact Legal Team</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>All Legal Templates Hub</span>
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
                13. Frequently Asked Questions: Family Arbitration
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Statutes &amp; Supreme Court Rulings:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Arbitration and Conciliation Act, 1996 (Sections 7, 8, 11, 12(5), 17, 29A &amp; 29B):</strong>{" "}
                      Written clause rules, civil court referral bar, neutrality rules, interim stay, and 12-month award
                      timelines.
                    </li>
                    <li>
                      <strong>Mediation Act, 2023 (Sections 5, 6, 20, 27 &amp; 28):</strong> Pre-litigation mediation,
                      deemed court decree enforcement, and narrow 90-day challenge limits.
                    </li>
                    <li>
                      <strong>Vidya Drolia v. Durga Trading Corporation (2021) 2 SCC 1:</strong> Four-part test
                      separating private arbitrable rights in personam from non-arbitrable in rem disputes.
                    </li>
                    <li>
                      <strong>Vijay Kumar Sharma v. Raghunandan Sharma (2010) 2 SCC 486:</strong> Why a Will cannot bind
                      heirs to arbitration unless backed by a signed Family Settlement Agreement.
                    </li>
                    <li>
                      <strong>Hari Shankar Singhania v. Gaur Hari Singhania (2006) 4 SCC 658:</strong> Special equity
                      enforcing arbitration clauses in family settlements to keep peace.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Arbitration &amp; Mediation Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Family Settlement &amp; Deed Formats
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Family Settlement Agreement Format
                    </Link>
                    <Link
                      href="/templates/partition-deed-format-between-family-members"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Partition Deed Format
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Relinquishment &amp; Release Deed
                    </Link>
                    <Link
                      href="/templates/disinheritance-exclusion-clause-format-will"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Exclusion Clause Format
                    </Link>
                    <Link
                      href="/templates/caveat-against-probate-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Caveat Against Probate Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Add This Clause Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A signed family deal stays strong only when backed by fast rules. An arbitration clause stops long
                  civil court fights. You keep peace and save years of legal fees.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Clear Mediation First</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Mediation Act, 2023 lets brothers talk first for 120 days. When all sides sign the mediated deal,
                  the law treats it just like a final civil court decree.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your family tree, stamp duty, and asset list. We draft custom settlement deeds and
                  arbitration clauses that hold firm in Indian High Courts.
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
                Specialist in Indian family settlements, Section 7 &amp; 8 arbitration bars, Mediation Act 2023 deeds,
                and High Court succession defense pan-India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT 20-YEAR COURT FIGHTS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Clear Will &amp; Family Plan
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Pair your family settlement with a clear, witness-signed Will so your home and savings pass without
                  court battles.
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
                  <span>Section 63 &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - FAMILY SETTLEMENT LAWYER (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Gavel className="w-3 h-3" />
                  <span>FAMILY SETTLEMENT DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Drafting a Family Settlement Deed?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft binding family settlements with Vidya Drolia arbitration clauses and Mediation Act
                  terms across India.
                </p>
                <Link
                  href="/services/family-settlement-deed-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consult Settlement Lawyer</span>
                </Link>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors"
                >
                  <span>Book Legal Consultation</span>
                  <ArrowRight className="w-3 h-3 text-[#C65378]" />
                </Link>
              </div>

              {/* CARD 4: CLAUSE EXECUTION CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Clause Execution Checklist</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="text-[11px] font-bold text-[#C65378] hover:underline"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Signed by all Class I &amp; II heirs</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>In Personam Vidya Drolia wording</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>120-Day Mediation Act 2023 step</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Neutral judge or DIAC panel named</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Seat, Venue &amp; 12-month cap set</span>
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
