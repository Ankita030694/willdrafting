"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Building,
  UserCheck,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Gavel,
  X,
  FileSignature,
  Check,
  Copy,
  Printer,
  ShieldAlert,
  Sliders,
  DollarSign,
  ArrowUpRight,
  Eye,
  Info,
} from "lucide-react";

interface ComparisonRow {
  parameter: string;
  plainWill: string;
  notarizedWill: string;
  registeredWill: string;
  verdict: "plain" | "notarized" | "registered" | "tie";
  note: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Legal Validity Under Indian Law",
    plainWill: "100% Valid if signed before two independent witnesses (ISA Sec 63).",
    notarizedWill: "100% Valid, but solely because of Sec 63 witnesses, NOT the notary seal.",
    registeredWill: "100% Valid under ISA Sec 63 with full registration under Registration Act.",
    verdict: "tie",
    note: "All three have identical substantive legal validity if Section 63 is satisfied.",
  },
  {
    parameter: "Evidentiary Value in Court",
    plainWill: "Baseline: Genuine until disputed; must be proven by attesting witness in court.",
    notarizedWill: "Low addition: Merely establishes testator identity; no presumption of mental fitness.",
    registeredWill: "Highest: Presumption of genuineness under Section 60, Registration Act.",
    verdict: "registered",
    note: "Official Sub-Registrar seal creates a strong barrier against claims of forgery.",
  },
  {
    parameter: "Government Stamp Duty",
    plainWill: "₹0 (Zero stamp duty nationwide under Indian Stamp Act, 1899).",
    notarizedWill: "₹0 stamp duty (notary fee: ₹100–₹500 for seal and register entry).",
    registeredWill: "₹0 stamp duty (government registration fee: ₹50–₹1,000 depending on state).",
    verdict: "plain",
    note: "Wills are legally exempt from stamp paper across every Indian state.",
  },
  {
    parameter: "Execution Process & Hassle",
    plainWill: "Fastest: Print on plain A4 paper, sign before two adult witnesses at home.",
    notarizedWill: "Moderate: Requires visiting an advocate / Notary Public with your witnesses.",
    registeredWill: "Highest: Requires online booking, physical Sub-Registrar visit, and biometrics.",
    verdict: "plain",
    note: "Plain Will can be executed in 15 minutes without visiting any government office.",
  },
  {
    parameter: "Turnaround Time",
    plainWill: "Immediate: 10 to 15 minutes from drafting to signing.",
    notarizedWill: "Same day: 1 to 2 hours depending on notary availability.",
    registeredWill: "1 to 7 working days: Depends on Sub-Registrar appointment slot availability.",
    verdict: "plain",
    note: "Ideal for emergencies, elderly persons unable to travel, or immediate trips.",
  },
  {
    parameter: "Ease of Amendment & Revocation",
    plainWill: "Simplest: Draft a new Will or Codicil declaring earlier Wills cancelled.",
    notarizedWill: "Simple: Draft a new Will or Codicil with two witnesses.",
    registeredWill: "Moderate: Can be revoked on plain paper, but registering revocation is safer.",
    verdict: "plain",
    note: "Section 62 allows revocation anytime; later registered revocation avoids record confusion.",
  },
  {
    parameter: "Vulnerability to Court Challenge",
    plainWill: "Vulnerable to allegations of fraud, signature forgery, or undue influence.",
    notarizedWill: "Equally vulnerable: A notary stamp does not prevent disputes over mental health.",
    registeredWill: "Strong defense: Sub-Registrar identity check and biometrics defeat forgery claims.",
    verdict: "registered",
    note: "Opponents challenging a registered Will bear a much heavier burden of proof.",
  },
  {
    parameter: "Custody & Government Backup",
    plainWill: "Private custody only: If lost or destroyed, proving contents is difficult.",
    notarizedWill: "Private custody only: Notary retains register entry, but rarely full text.",
    registeredWill: "Permanent archive: Permanent copy preserved in Book 3 at the Sub-Registrar Office.",
    verdict: "registered",
    note: "Certified duplicate copies can be extracted from the SRO if original is lost.",
  },
  {
    parameter: "Physical Office Visit Required",
    plainWill: "None: Can be signed in your living room, hospital room, or advocate office.",
    notarizedWill: "Yes: Visit a Notary Public office or arrange a notary home visit.",
    registeredWill: "Yes: Testator and two witnesses must physically appear at the SRO jurisdiction.",
    verdict: "plain",
    note: "Home visits by Sub-Registrars are rare and require special medical commission fees.",
  },
  {
    parameter: "Bank & Mutation Acceptance",
    plainWill: "Accepted if uncontested; banks or societies may ask for indemnity bond.",
    notarizedWill: "Often mistaken by bank clerks as 'sufficient', but legally same as plain Will.",
    registeredWill: "Widely trusted: Revenue authorities and banks process mutations smoothly.",
    verdict: "registered",
    note: "Municipal bodies and housing societies heavily favor registered documents.",
  },
];

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "comparison-matrix", label: "1. Three-Way Matrix" },
  { id: "legal-reality-notarization", label: "2. Notarization Legal Force" },
  { id: "section-63-mandate", label: "3. Section 63 Mandate" },
  { id: "evidentiary-weight-registration", label: "4. Evidentiary Weight" },
  { id: "section-18-registration-act", label: "5. Section 18 Analysis" },
  { id: "when-registration-worth-it", label: "6. When Registration is Worth It" },
  { id: "when-notarization-sufficient", label: "7. When Plain or Notarized Suffices" },
  { id: "execution-sop", label: "8. Step-by-Step SOP" },
  { id: "visual-breakdown", label: "9. Visual Document Breakdown" },
  { id: "common-myths", label: "10. Four Common Myths" },
  { id: "interactive-decision-tool", label: "11. Interactive Decision Tool" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-provisions", label: "13. Statutory Provisions" },
];

const FAQS = [
  {
    q: "Is a notarized Will legally valid in India?",
    a: "Yes, a notarized Will is legally valid in India, but NOT because of the notary's stamp or signature. It is valid solely because it satisfies Section 63 of the Indian Succession Act, 1925—meaning it is in writing, signed by the testator, and attested by at least two independent witnesses. The notary stamp itself adds zero extra legal validity under succession law.",
  },
  {
    q: "Is an unregistered Will valid in India?",
    a: "Yes, 100%. Under Section 18(e) of the Registration Act, 1908, the registration of a Will is purely optional across India. An unregistered Will executed on a plain sheet of A4 paper with the signatures of two independent witnesses is just as legally enforceable as a registered Will. Registration is never a condition of validity.",
  },
  {
    q: "What is the key difference between notarizing and registering a Will?",
    a: "Notarization is performed by an advocate appointed as a Notary Public under the Notaries Act, 1952. The notary simply certifies the identity of the person signing before them. Registration is an official government process carried out by the Sub-Registrar under the Registration Act, 1908. Registration creates a permanent government record in Book 3, records biometrics and photos, and grants a legal presumption of genuineness in court.",
  },
  {
    q: "Does a notary stamp protect a Will from family court challenges?",
    a: "No. A notary stamp does not prevent disputes, nor does it establish that the testator was of sound mind or free from coercion. In any court dispute or probate proceeding, the propounder of the Will must examine at least one attesting witness under Section 68 of the Indian Evidence Act. A notary's testimony or stamp cannot replace this statutory witness requirement.",
  },
  {
    q: "What are the biggest benefits of registering a Will in India?",
    a: "The three primary advantages are: (1) Evidentiary presumption under Sections 58 and 60 of the Registration Act, making false claims of forgery or signature theft virtually impossible; (2) Permanent safe custody in government records, allowing certified copies if the original paper is lost, stolen, or burned; and (3) Faster processing by municipal authorities, revenue departments, and banks during property mutation.",
  },
  {
    q: "Can a registered Will still be challenged in an Indian court?",
    a: "Yes. Registration does not make a Will bulletproof. A registered Will can be challenged on valid legal grounds, such as lack of testamentary capacity (dementia, severe mental illness), undue influence, fraud, coercion, suspicious circumstances surrounding its creation, or the discovery of a later valid Will. However, the legal burden on the person challenging a registered Will is much higher.",
  },
  {
    q: "Do I need non-judicial stamp paper to make a valid Will?",
    a: "No. Under Schedule I of the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty across all states and Union Territories in India. Drafting a Will on ₹50, ₹100, or ₹500 non-judicial stamp paper is an unnecessary misconception. A Will written or printed on standard plain white A4 paper is 100% valid.",
  },
  {
    q: "Can a Notary Public act as one of my two attesting witnesses?",
    a: "Legally, a notary could act as an attesting witness only if they specifically witnessed the testator sign and signed with the 'animus attestandi' (intent to attest as a private statutory witness). However, doing so is strongly discouraged. Courts distinguish between a public officer attesting a signature in their official capacity and a private witness attesting execution under Section 63.",
  },
  {
    q: "Can a registered Will be revoked or amended by an unregistered Will?",
    a: "Yes. Under Section 62 of the Indian Succession Act, a Will is revocable at any time during the testator's life. A subsequent valid unregistered Will or Codicil executed with two witnesses legally revokes or modifies an earlier registered Will. However, to prevent suspicion and contested mutation proceedings, it is best practice to register the revocation or newer Will as well.",
  },
  {
    q: "How much does it cost to register a Will at the Sub-Registrar Office?",
    a: "The statutory government registration fee for a Will is minimal in most Indian states—usually between ₹50 and ₹1,000, along with nominal scanning charges of ₹200 to ₹500. There is zero stamp duty. If you hire a professional lawyer or legal platform for end-to-end documentation, scheduling, and SRO assistance, professional fees typically range between ₹5,000 and ₹15,000.",
  },
];

export default function NotarizedVsRegisteredWillClient() {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("executive-summary");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  // Interactive Decision Tool state
  const [estateValue, setEstateValue] = useState<"modest" | "substantial">("substantial");
  const [familyHarmony, setFamilyHarmony] = useState<"peaceful" | "disputed">("disputed");
  const [healthStatus, setHealthStatus] = useState<"healthy" | "elderly">("healthy");
  const [metroProbate, setMetroProbate] = useState<"no" | "yes">("no");
  const [activeImageView, setActiveImageView] = useState<"generated" | "closeup">("generated");

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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const copySection63Clause = () => {
    const clauseText = `ATTESTATION CLAUSE UNDER SECTION 63 OF THE INDIAN SUCCESSION ACT, 1925:
"Signed and declared by the above-named Testator, [Full Name of Testator], as and for their Last Will and Testament, in the presence of us, who in their presence and at their request, and in the presence of each other, have hereunto subscribed our names as attesting witnesses, after seeing the Testator sign the same. We both confirm that we are independent witnesses and neither we nor our spouses receive any benefit under this Will."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2500);
  };

  // Evaluation for Interactive Decision Tool
  const computeRecommendation = () => {
    let score = 0;
    if (estateValue === "substantial") score += 2;
    if (familyHarmony === "disputed") score += 3;
    if (healthStatus === "elderly") score += 2;
    if (metroProbate === "yes") score += 2;

    if (score >= 4) {
      return {
        level: "Registration Strongly Recommended",
        color: "text-rose-700 bg-rose-50 border-rose-200",
        badge: "High Legal Shield Required",
        summary:
          "Because your scenario involves either high asset value, disinherited heirs, potential family friction, or elderly health scrutiny, registering your Will at the Sub-Registrar Office provides essential evidentiary weight under Section 60 of the Registration Act.",
        actionUrl: "/services/will-registration",
        actionText: "Book Advocate-Assisted Will Registration",
      };
    } else {
      return {
        level: "Plain Paper Section 63 Will is 100% Sufficient",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        badge: "Safe for Unanimous Estates",
        summary:
          "For harmonious families with equal distribution and straightforward assets, a properly drafted Will executed on plain A4 paper with two independent witnesses is 100% legally enforceable under Section 63. You do not need to spend money on registration or notarization.",
        actionUrl: "/start",
        actionText: "Draft Your Legally Valid Will in 15 Mins",
      };
    }
  };

  const recommendation = computeRecommendation();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Scale className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT &bull; LEGAL VALIDITY GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Is a Notarized Will Legally Valid in India? Full Comparison
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Discover why notarization adds zero legal force under Section 63 of the Indian Succession Act, compare Plain vs Notarized vs Registered Wills, and learn when registration is truly worth it.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Legally Valid Will Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#comparison-matrix"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View 3-Column Comparison</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Succession Expertise
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills Drafted & Registered
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                100% Valid
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Under ISA Section 63
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <div className="flex items-center justify-center gap-1.5 leading-none">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight">
                  4.9
                </span>
                <span className="text-amber-500 text-lg sm:text-xl">★</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Rated by 3,200+ Families
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Editorial Layout)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#172228]">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg text-xs transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-[#55636D] hover:bg-slate-50 hover:text-[#172228]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Bottom Trust Badge */}
              <div className="mt-6 pt-4 border-t border-[#172228]/10">
                <div className="flex items-start gap-2 text-[#55636D]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    Verified under the Indian Succession Act, 1925 &amp; Registration Act, 1908.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* ===================================================================
                SECTION 0: EXECUTIVE SUMMARY BOX
                =================================================================== */}
            <section
              id="executive-summary"
              className="rounded-2xl bg-white border border-[#172228]/10 border-l-4 border-l-[#C65378] p-6 sm:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Executive Brief &bull; Core Legal Insights
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                Executive Summary: Notarized vs Registered Will
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                In India, thousands of testators pay advocates outside civil courts to get their Wills stamped by a Notary Public, believing it confers ironclad government protection. Here is what Indian statutory law and the Supreme Court actually hold:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Notarization Adds Zero Legal Validity
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Under the Notaries Act 1952, a notary only attests signatures. A plain paper Will with two witnesses is 100% as legally valid as a notarized one.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Registration is Purely Optional
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Section 18(e) of the Registration Act 1908 explicitly makes Will registration optional. An unregistered plain paper Will is fully enforceable.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Registration Adds Evidentiary Weight
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Registration creates a statutory presumption of genuineness under Section 60. Challenging a registered Will requires overcoming a heavy burden of proof.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Section 63 Witnesses Are Mandatory
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Neither a notary seal nor a registrar's endorsement can cure a Will lacking two independent adult attesting witnesses under Section 63 of the ISA.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 1: THREE-WAY MATRIX
                =================================================================== */}
            <section id="comparison-matrix" className="space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Comparative Framework
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Three-Way Matrix: Plain vs Notarized vs Registered
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                To understand where each option stands, examine this side-by-side comparison of a Plain Paper Will, a Notarized Will, and a Registered Will across ten vital legal and procedural parameters:
              </p>

              {/* Responsive 3-Column Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#172228]/10 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/4">
                        Parameter
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/4">
                        Plain Will
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/4">
                        Notarized Will
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider w-1/4">
                        Registered Will
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10 text-slate-700">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-[#FAF7F0]/40" : "bg-white"}>
                        <td className="p-3.5 sm:p-4 font-semibold text-[#172228] border-r border-[#172228]/10">
                          {row.parameter}
                          <span className="block text-[11px] text-[#55636D] font-normal mt-0.5">
                            {row.note}
                          </span>
                        </td>
                        <td className="p-3.5 sm:p-4 border-r border-[#172228]/10 align-top">
                          <span className="leading-relaxed">{row.plainWill}</span>
                        </td>
                        <td className="p-3.5 sm:p-4 border-r border-[#172228]/10 align-top">
                          <span className="leading-relaxed">{row.notarizedWill}</span>
                        </td>
                        <td className="p-3.5 sm:p-4 align-top">
                          <span className="leading-relaxed font-medium text-[#172228]">
                            {row.registeredWill}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>The Takeaway:</strong> A notarized Will costs more time and money than a plain paper Will, yet provides <em>identical baseline legal value</em> in an Indian courtroom. If you seek legal invulnerability, skip the notary and go straight to the Sub-Registrar.
                </p>
              </div>
            </section>

            {/* ===================================================================
                SECTION 2: LEGAL REALITY OF NOTARIZATION
                =================================================================== */}
            <section id="legal-reality-notarization" className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Statutory Analysis
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Legal Reality: Why Notarization Adds No Legal Force
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                A widespread misconception across urban and rural India is that getting a Will stamped by an advocate with a red or blue notary seal makes it &quot;government approved&quot;. In legal reality, notarization does nothing of the sort.
              </p>

              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 sm:p-6 space-y-4 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-[#172228] flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-[#C65378]" />
                  What the Notaries Act, 1952 Actually Governs
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under Section 8 of the Notaries Act, 1952, a Notary Public is authorized to verify, authenticate, certify, or attest the execution of any instrument, administer oaths, and note negotiable instruments. When a notary stamps a document, they are merely certifying:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li>The person signing appeared in their physical presence and showed an identity card (e.g. Aadhaar or PAN).</li>
                  <li>The signature was affixed on the date entered in the notary register.</li>
                </ul>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Crucially, <strong>a Notary Public does not certify the mental soundness of the testator</strong>, does not evaluate whether the testator acted under coercion or family pressure, and does not retain a full permanent archive of the document text.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950">
                <p className="leading-relaxed">
                  <strong>Supreme Court Jurisprudence:</strong> The Supreme Court of India has repeatedly held that testamentary documents must be proven strictly in accordance with Section 68 of the Indian Evidence Act, 1872 (now Bharatiya Sakshya Adhiniyam, 2023). A notary stamp cannot substitute for the oral testimony of an attesting witness, nor does it create a presumption that the Will is free from suspicious circumstances.
                </p>
              </div>
            </section>

            {/* ===================================================================
                SECTION 3: SECTION 63 MANDATE
                =================================================================== */}
            <section id="section-63-mandate" className="space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Statutory Core
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Section 63 Mandate: What Truly Makes a Will Valid
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If neither stamp paper nor notarization creates validity, what does? The answer lies exclusively in <strong>Section 63 of the Indian Succession Act, 1925</strong>. If these statutory prerequisites are satisfied, the Will is 100% enforceable in any Indian court:
              </p>

              {/* 3 Prerequisite Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs mb-3">
                      1
                    </span>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                      In Writing by Adult of Sound Mind
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Can be handwritten or typed on ordinary white A4 paper. No stamp duty or special bond paper is required.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#5F7E75] mt-4 block">
                    Sec 59 &amp; 63(a) ISA
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs mb-3">
                      2
                    </span>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                      Signed or Thumb Marked by Testator
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The testator must sign or affix their mark with clear intention to give effect to the writing as their testamentary deed.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#5F7E75] mt-4 block">
                    Sec 63(b) ISA
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs mb-3">
                      3
                    </span>
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                      Attested by Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      At least two witnesses must see the testator sign and must sign in the presence of the testator. Beneficiaries must never sign as witnesses!
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#5F7E75] mt-4 block">
                    Sec 63(c) &amp; 67 ISA
                  </span>
                </div>
              </div>

              {/* Fatal Warning: Section 67 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                  <strong className="font-bold block text-rose-900">
                    Warning: Never Let a Beneficiary Witness Your Will (Section 67)
                  </strong>
                  <p>
                    Under Section 67 of the Indian Succession Act, if a beneficiary (or their spouse) signs as an attesting witness, the Will remains valid, but <strong>their legacy or bequest becomes completely void!</strong> Always use independent adult witnesses like trusted friends, neighbors, or colleagues.
                  </p>
                </div>
              </div>

              {/* Copyable Section 63 Attestation Clause */}
              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#172228] flex items-center gap-1.5">
                    <FileSignature className="w-4 h-4 text-[#C65378]" />
                    Recommended Section 63 Attestation Clause
                  </span>
                  <button
                    onClick={copySection63Clause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedClause ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] sm:text-xs text-slate-700 leading-relaxed overflow-x-auto">
                  &quot;Signed and declared by the above-named Testator, [Full Name], as and for their Last Will and Testament, in the presence of us, who in their presence and at their request, and in the presence of each other, have hereunto subscribed our names as attesting witnesses, after seeing the Testator sign the same. We both confirm that we are independent witnesses and neither we nor our spouses receive any benefit under this Will.&quot;
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 4: EVIDENTIARY WEIGHT OF REGISTRATION
                =================================================================== */}
            <section id="evidentiary-weight-registration" className="space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Courtroom Reality
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Evidentiary Weight: Why Registration Matters in Court
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If an unregistered Will is 100% legally valid, why do succession advocates strongly advise registering Wills for significant estates? The difference lies not in validity, but in <strong>evidentiary weight and survivability under litigation</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Presumption of Genuineness (Section 60)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 60 of the Registration Act, 1908, the Sub-Registrar&apos;s endorsement is admissible in court as proof that the document was presented by the testator, that identity was verified, and that the testator admitted execution.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Biometric &amp; Photographic Audit Trail
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    At the Sub-Registrar Office, the testator&apos;s live photo, biometric thumb impressions, and government ID numbers are officially stamped and sealed into the state register, eliminating claims of forged signatures.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Permanent Archive in Government Book 3
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Sub-Registrar enters registered Wills into a confidential permanent ledger known as &quot;Book 3&quot;. If the original paper is misplaced, torn, or hidden by disgruntled relatives, an authenticated certified copy can be issued upon proof of death.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <RefreshCw className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                      Frictionless Property Mutation &amp; Banking
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Municipal corporations, land revenue tehsildars, and co-operative housing societies frequently raise roadblocks for unregistered Wills, demanding court probates or indemnity bonds. Registered Wills are accepted with far fewer bureaucratic hurdles.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 5: SECTION 18 REGISTRATION ACT
                =================================================================== */}
            <section id="section-18-registration-act" className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Statutory Exemption
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Section 18 Analysis: Registration is Never Compulsory
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Many citizens ask: <em>&quot;If an unregistered Will is challenged, will the judge throw it out because I didn&apos;t go to the registry office?&quot;</em> The categorical answer is <strong>NO</strong>.
              </p>

              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 sm:p-6 space-y-4 shadow-xs">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  While Section 17 of the Registration Act, 1908 specifies documents that <em>must</em> be compulsorily registered (such as Sale Deeds, Gift Deeds of immovable property, or long-term lease deeds), <strong>Wills are deliberately placed under Section 18(e)</strong>, which lists documents whose registration is strictly optional:
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[#5F7E75] font-serif italic text-xs sm:text-sm text-slate-800">
                  &quot;Section 18. Documents of which registration is optional.—Any of the following documents may be registered under this Act, namely: ... (e) wills; ...&quot;
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Because Parliament made Will registration optional, no Indian court can dismiss, invalidate, or reject a Will simply because it is unregistered. The propounder merely has to prove execution under Section 68 of the Evidence Act.
                </p>
              </div>
            </section>

            {/* ===================================================================
                SECTION 6: WHEN REGISTRATION IS WORTH IT
                =================================================================== */}
            <section id="when-registration-worth-it" className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Strategic Guidance
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. When Registration is Worth It: High-Risk Scenarios
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                While registration requires scheduling an appointment, paying nominal fees, and visiting the Sub-Registrar Office with two witnesses, it is strongly advised in the following five high-stakes circumstances:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Unequal Distribution or Disinheriting Legal Heirs
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      If you are leaving more property to one child, gifting property to a daughter-in-law, or completely excluding a legal heir who would inherit under intestate succession, expect fierce resistance. Registration provides the necessary evidence to withstand challenges.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      High-Value Real Estate in Metropolitan Cities
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      If your estate includes prime residential flats, commercial shops, or ancestral parcels worth crores in cities like Delhi NCR, Mumbai, Bengaluru, or Hyderabad, the cost and effort of registration is negligible compared to potential title disputes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Elderly Age, Fragile Health, or Impending Medical Treatment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      When a senior citizen drafts a Will in their late 70s or 80s, dissatisfied relatives routinely file lawsuits alleging dementia, Alzheimer&apos;s, or undue influence by the caretaking child. An SRO registration, combined with a doctor&apos;s fitness certificate, decisively neutralizes this claim.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Properties in Former Presidential Towns (Mandatory Probate)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      Under Section 213 and Section 57 of the ISA, immovable properties situated within the original civil jurisdictions of Mumbai, Kolkata, and Chennai require court probate. Having a registered Will significantly expedites the High Court probate citation process.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Second Marriages, Stepchildren, or NRI Heirs Living Abroad
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      Blended family dynamics or non-resident heirs who cannot easily attend lengthy court hearings benefit enormously from the conclusive public record of a registered Will.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Silo Link Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-white border border-[#C65378]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-[#172228] text-sm sm:text-base">
                    Need Lawyer-Assisted Will Registration at Your Local SRO?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    WillDrafting.in handles slot booking, documentation, and advocate accompaniment at your Sub-Registrar Office.
                  </p>
                </div>
                <Link
                  href="/services/will-registration"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-[#C65378] transition-colors shrink-0"
                >
                  <span>Explore Will Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* ===================================================================
                SECTION 7: WHEN NOTARIZATION OR PLAIN WILL SUFFICES
                =================================================================== */}
            <section id="when-notarization-sufficient" className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Practical Alternatives
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. When Plain or Notarized is Enough: Practical Advice
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                You do not need to register your Will in every circumstance. Executing a valid Section 63 Will on plain paper (or obtaining a quick notarization for personal comfort) is completely practical and legally adequate in these situations:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                    Harmonious Families &amp; Equal Division
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When parents divide their estate equally among all biological children without animosity, the likelihood of a lawsuit is near zero. A plain paper Will executed with two trusted family friends satisfies every legal standard.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                    Urgent Medical or Travel Timelines
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If you are undergoing major surgery in 48 hours or embarking on an overseas trip, there is no time to wait for a Sub-Registrar appointment. Drafting and executing a Section 63 Will immediately secures your loved ones.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                    Movable Wealth with Updated Nominations
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If your estate consists primarily of bank fixed deposits, mutual funds, demat equity shares, and insurance policies with updated nominee designations, a plain paper Will serves as a definitive testamentary bridge without SRO visits.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-[#172228] text-sm sm:text-base mb-2">
                    Absolute Privacy from Public Registers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When a Will is registered, any person with the testator&apos;s death certificate can apply for a copy under the Registration Act after demise. A plain paper Will stored in your private bank locker remains confidential until disclosed by your named executor.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 8: STEP-BY-STEP SOP
                =================================================================== */}
            <section id="execution-sop" className="space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Standard Operating Procedure
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Step-by-Step SOP: Executing and Registering a Will
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Follow this verified 5-step roadmap to draft, execute, and optionally register your Will without costly legal mistakes:
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Draft Clear Clauses on Plain Paper (No Stamp Duty)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prepare your Last Will and Testament identifying your assets (properties, bank accounts, demat holdings), naming beneficiaries, appointing an Executor, and revoking all prior Wills. Use plain white A4 paper.
                    </p>
                    <div className="pt-1">
                      <Link
                        href="/templates/will-format-india"
                        className="text-xs font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Download Section 63 Will Format</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Select Two Independent Adult Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Choose two adults who are younger than you and have no financial interest in your estate. Ensure neither they nor their spouses receive any property under the Will to avoid Section 67 disqualification.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Conduct the Simultaneous Physical Signing Ceremony
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Sit together in one room. Sign your initials at the bottom of every page and your full signature on the final execution page. Both witnesses must watch you sign, and you must watch both witnesses sign.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      (Optional) Book SRO Appointment for Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If choosing registration, visit your state&apos;s land portal (e.g. IGRS Maharashtra, Kaveri Karnataka, or Revenue Dept Delhi) to pay nominal fees (₹100–₹1,000) and book a timeslot at the Sub-Registrar jurisdiction where you reside or own property.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                      Biometrics at SRO &amp; Archive in Book 3
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO with your original Will, Aadhaar/PAN cards, and both witnesses. The Sub-Registrar captures photos, biometrics, verifies identities, and issues an official registered endorsement in Book 3.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 9: VISUAL BREAKDOWN (Uploaded Image Showcase)
                =================================================================== */}
            <section id="visual-breakdown" className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Visual Evidence
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Visual Breakdown: Anatomy of Indian Testamentary Deeds
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Notice the three distinct physical appearances of testamentary documents in India. Each reflects a different statutory treatment under Indian succession law:
              </p>

              {/* High-Resolution Infographic Showcase */}
              <div className="bg-white rounded-2xl border border-[#172228]/10 overflow-hidden shadow-xs">
                {/* View Switcher Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#172228]/10 bg-[#FAF7F0]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveImageView("generated")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeImageView === "generated"
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                      }`}
                    >
                      Legal Chamber Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImageView("closeup")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeImageView === "closeup"
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                      }`}
                    >
                      Document Stamps Close-Up
                    </button>
                  </div>
                  <a
                    href={
                      activeImageView === "generated"
                        ? "/images/notarized-will-vs-registered-will-india-og-generated.jpg"
                        : "/images/notarized-will-vs-registered-will-india.jpg"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C65378] hover:underline"
                  >
                    <span>View High-Res Photo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative aspect-video w-full bg-slate-900">
                  <Image
                    src={
                      activeImageView === "generated"
                        ? "/images/notarized-will-vs-registered-will-india-og-generated.jpg"
                        : "/images/notarized-will-vs-registered-will-india.jpg"
                    }
                    alt={
                      activeImageView === "generated"
                        ? "Plain Will vs Notarized Will vs Registered Will in Indian Legal Chamber"
                        : "Plain Will vs Notarized Will vs Registered Will Document Comparison"
                    }
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    priority
                  />
                </div>
                <div className="p-5 sm:p-6 bg-white space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                      <span className="text-xs font-bold text-[#172228] block mb-1">
                        1. Plain Will (Left)
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Executed on ordinary A4 paper with a pen. 100% legally enforceable under Section 63 once signed and attested by two witnesses. Zero government fee.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                      <span className="text-xs font-bold text-[#172228] block mb-1">
                        2. Notarised Will (Center)
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Includes a blue circular seal from a Notary Public. Verifies identity of the signer, but creates zero presumption of testamentary capacity or mental fitness.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                      <span className="text-xs font-bold text-[#172228] block mb-1">
                        3. Registered Will (Right)
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Official red Sub-Registrar seal with volume and book registration numbers. Archived in Book 3 with biometric audit trails and maximum evidentiary strength.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 10: COMMON MYTHS
                =================================================================== */}
            <section id="common-myths" className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Mythbusters
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Four Common Myths About Will Notarization in India
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Let us dispel the most damaging folklore that leads Indian citizens into unnecessary expenses or bitter court disputes:
              </p>

              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Myth 1: &quot;A plain paper Will has zero legal standing in court.&quot;</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Fact:</strong> Section 63 of the Indian Succession Act contains zero requirements regarding stamp paper, government seals, or registration. Hundreds of thousands of plain paper Wills are probated and upheld by Indian High Courts every year.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Myth 2: &quot;A notarized Will is equal to a registered Will.&quot;</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Fact:</strong> A notary is not a Sub-Registrar. Notarization falls under the Notaries Act 1952, which carries no evidentiary presumption under Section 60 of the Registration Act. In a litigation battle, notarization adds practically nothing beyond proving your signature.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Myth 3: &quot;A registered Will can never be challenged or cancelled.&quot;</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Fact:</strong> Registration does not confer absolute immunity. If an excluded relative proves by cogent medical evidence that the testator suffered from advanced dementia, or proves coercion or fraud, the court will strike down even a registered Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Myth 4: &quot;A Will must be printed on ₹100 non-judicial stamp paper.&quot;</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Fact:</strong> Schedule I of the Indian Stamp Act, 1899 deliberately excludes Wills from stamp duty. Buying non-judicial stamp paper for a Will is an absolute waste of money and provides zero extra legal force.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 11: INTERACTIVE DECISION TOOL
                =================================================================== */}
            <section id="interactive-decision-tool" className="space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Diagnostic Assessment
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Interactive Decision Tool: Do You Need Registration?
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Answer these four quick questions to determine whether a plain paper Section 63 Will is sufficient for your family, or whether registering your Will at the Sub-Registrar Office is essential:
              </p>

              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 sm:p-7 space-y-6 shadow-xs">
                {/* Question 1 */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#172228] block">
                    1. Approximate Value of Your Real Estate &amp; Assets:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEstateValue("modest")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        estateValue === "modest"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Under ₹50 Lakhs (Movable / Modest)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEstateValue("substantial")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        estateValue === "substantial"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Above ₹50 Lakhs / Multiple Properties
                    </button>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#172228] block">
                    2. Family Dynamics &amp; Expected Distribution:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFamilyHarmony("peaceful")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        familyHarmony === "peaceful"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Equal Share to All Heirs (Peaceful)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFamilyHarmony("disputed")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        familyHarmony === "disputed"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Excluding an Heir / Unequal Distribution
                    </button>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#172228] block">
                    3. Age &amp; Medical Health of the Testator:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setHealthStatus("healthy")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        healthStatus === "healthy"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Under 70 Years &amp; In Sound Health
                    </button>
                    <button
                      type="button"
                      onClick={() => setHealthStatus("elderly")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        healthStatus === "elderly"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Aged 70+ / Critical Medical History
                    </button>
                  </div>
                </div>

                {/* Question 4 */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#172228] block">
                    4. Property Located in Mumbai, Kolkata, or Chennai?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMetroProbate("no")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        metroProbate === "no"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      No (Elsewhere in India)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetroProbate("yes")}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        metroProbate === "yes"
                          ? "border-[#C65378] bg-rose-50/50 font-bold text-[#C65378]"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      Yes (Mandatory Probate Jurisdictions)
                    </button>
                  </div>
                </div>

                {/* Result Display Box */}
                <div className={`p-5 rounded-2xl border ${recommendation.color} transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/80 border border-current">
                      {recommendation.badge}
                    </span>
                    <span className="text-xs font-bold">Calculated Assessment</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold mb-2">
                    {recommendation.level}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4">
                    {recommendation.summary}
                  </p>
                  <a
                    href={recommendation.actionUrl}
                    onClick={recommendation.actionUrl === "/start" ? handleStartDraft : undefined}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-[#C65378] transition-colors cursor-pointer"
                  >
                    <span>{recommendation.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 12: FREQUENTLY ASKED QUESTIONS
                =================================================================== */}
            <section id="frequently-asked-questions" className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Got Questions?
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Frequently Asked Questions: Notarized vs Registered
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Clear, straightforward answers to the most common questions regarding Will notarization, registration, and Section 63 validity in India:
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#172228]/10 bg-white overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#172228] hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-[#55636D] transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#172228]/5 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ===================================================================
                SECTION 13: STATUTORY PROVISIONS
                =================================================================== */}
            <section id="statutory-provisions" className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Statutory References
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                13. Statutory Provisions: Section 63 &amp; Registration Act
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Authoritative legislative provisions governing the drafting, attestation, notarization, and registration of Wills in India:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Indian Succession Act, 1925
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Section 59: Soundness of mind and testamentary capacity.</li>
                    <li>&bull; Section 62: Wills are revocable during the testator&apos;s lifetime.</li>
                    <li>&bull; Section 63: Execution and mandatory attestation by two witnesses.</li>
                    <li>&bull; Section 67: Invalidation of bequests to attesting witnesses.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Registration Act, 1908
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Section 18(e): Registration of Wills is strictly optional.</li>
                    <li>&bull; Section 40: Persons entitled to present Wills for registration.</li>
                    <li>&bull; Section 41: Special procedure on registration of Wills.</li>
                    <li>&bull; Section 60: Certificate of registration and presumption of due execution.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Notaries Act, 1952
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Section 8: Functions of notaries (verifying signatures and oaths).</li>
                    <li>&bull; Judicial Principle: Notary seal does not prove sound testamentary mind.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <strong className="text-xs sm:text-sm font-bold text-[#172228] block mb-1">
                    Indian Stamp Act, 1899
                  </strong>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>&bull; Schedule I: Complete exemption of Wills from stamp duty nationwide.</li>
                    <li>&bull; Plain paper execution has full legal enforceability.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bottom CTA Bar */}
            <div className="rounded-2xl bg-gradient-to-r from-[#172228] to-[#253741] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-extrabold">
                  Ready to Protect Your Family with a Section 63 Compliant Will?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Draft your legally verified Will in 15 minutes online or book an advocate for registration assistance at your local Sub-Registrar Office.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  <span>Draft Your Will</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20"
                >
                  <span>View Pricing Plans</span>
                </Link>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY AUTHOR / TRUST / CTA CARDS
              ===================================================================== */}
          <aside className="sticky top-6 space-y-5">

            {/* Card 4: Verified Advocate Review Card */}
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#172228] font-bold text-sm">
                  AAM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172228]">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Advocate Anuj Anand Malik
                    </a>
                  </h4>
                  <span className="text-[11px] text-[#55636D] block">
                    Succession Counsel, WillDrafting.in
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Reviewed under Indian Succession Act 1925 and Registration Act 1908. Member of the Bar Council of Delhi with 15+ years experience.
              </p>
              <div className="flex items-center justify-between gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Bar Council Verified</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C65378] hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* Card 1: Primary Action Card */}
            <div className="hidden lg:block rounded-2xl bg-gradient-to-br from-[#172228] to-[#263740] text-white p-5 shadow-xs border border-white/10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3 text-[#C65378]" />
                <span>15-Minute DIY Will</span>
              </div>
              <h3 className="text-base font-extrabold text-white mb-2 leading-snug">
                Draft a Legally Valid Will from Home
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Step-by-step guided interview ensuring full Section 63 compliance, customized asset bequests, and instant printable PDF.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                <span>Start Your Will Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2: Advocate Registration Service */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-[#5F7E75]">
                <Building className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  SRO Registration Service
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#172228] mb-1.5">
                Need Sub-Registrar Assistance?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Our senior advocates handle slot booking, witness coordination, and Sub-Registrar accompaniment across Delhi NCR, Mumbai, Bengaluru, and Pune.
              </p>
              <Link
                href="/services/will-registration"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
              >
                <span>Book Will Registration Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Free Format Link */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-[#55636D]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Free Legal Template
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#172228] mb-1.5">
                Download Section 63 Format
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Need a printable template for plain paper signing? Access our lawyer-reviewed format with Section 63 and Section 67 clauses.
              </p>
              <Link
                href="/templates/will-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>View Free Will Format</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 5: Trust Signals */}
            <div className="hidden lg:block rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Statutory Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Stamp Duty Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bank &amp; Municipal Registrar Accepted</span>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/services/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Registration Service
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
                <Link
                  href="/templates/codicil-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Codicil Format India
                </Link>
                <Link
                  href="/blogs/will-vs-family-trust-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will vs Family Trust
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
