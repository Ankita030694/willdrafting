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
  IndianRupee,
  MapPin,
  XCircle,
} from "lucide-react";

type DeedType = "settlement" | "release" | "revocation";

type RelationKey =
  | "parent_child"
  | "spouse"
  | "grandparent_to_grandchild"
  | "siblings"
  | "deceased_heir"
  | "grandchild_to_grandparent"
  | "in_law_extended"
  | "non_family";

type LocalBodyType = "chennai_corp" | "other_corp" | "municipality" | "panchayat";

interface RelationOption {
  id: RelationKey;
  label: string;
  desc: string;
  isFamilyForSettlement: boolean;
  isFamilyForRelease: boolean;
  isIncomeTaxRelative: boolean;
  legalNote: string;
}

const RELATION_OPTIONS: RelationOption[] = [
  {
    id: "parent_child",
    label: "Parent to Son or Daughter",
    desc: "Father or mother to son, daughter, or legally adopted child",
    isFamilyForSettlement: true,
    isFamilyForRelease: true,
    isIncomeTaxRelative: true,
    legalNote:
      "Qualifies as family under the Explanation to Article 58 and Article 55-A. Adoptive parents and adopted children are included where personal law permits adoption.",
  },
  {
    id: "spouse",
    label: "Husband and Wife",
    desc: "Transfer or release between legally wedded spouses",
    isFamilyForSettlement: true,
    isFamilyForRelease: true,
    isIncomeTaxRelative: true,
    legalNote:
      "Qualifies for the 1% family concession capped at Rs 40,000 stamp duty and Rs 10,000 registration fee under G.O.(Ms.) No. 69.",
  },
  {
    id: "grandparent_to_grandchild",
    label: "Grandparent to Grandchild",
    desc: "Downward settlement or release to grandson or granddaughter",
    isFamilyForSettlement: true,
    isFamilyForRelease: true,
    isIncomeTaxRelative: true,
    legalNote:
      "Grandchild is explicitly listed in the Explanation to Article 58. Downward transfer from grandparent to grandchild gets the Rs 40,000 stamp duty cap.",
  },
  {
    id: "siblings",
    label: "Brother and Sister",
    desc: "Transfer or co-heir share release among full siblings",
    isFamilyForSettlement: true,
    isFamilyForRelease: true,
    isIncomeTaxRelative: true,
    legalNote:
      "Brothers and sisters qualify under the family definition for both Article 58(a)(i) Settlement Deeds and Article 55-A Release Deeds.",
  },
  {
    id: "deceased_heir",
    label: "Heir of Deceased Family Member",
    desc: "Widow or child of a deceased sibling or child (TN Act 13/2024)",
    isFamilyForSettlement: false,
    isFamilyForRelease: true,
    isIncomeTaxRelative: true,
    legalNote:
      "Tamil Nadu Act 13 of 2024 (effective May 3, 2024) amended Article 55 (Release) and Article 45 (Partition) so legal heirs of a deceased family member get the Rs 40,000 family cap. For fresh Settlement Deeds under Article 58, check SRO eligibility carefully.",
  },
  {
    id: "grandchild_to_grandparent",
    label: "Grandchild to Grandparent",
    desc: "Upward settlement to grandfather or grandmother (Excluded)",
    isFamilyForSettlement: false,
    isFamilyForRelease: false,
    isIncomeTaxRelative: true,
    legalNote:
      "A Full Bench of the Madras High Court in V. Shiva v. Inspector General of Registration ruled that Article 58 uses the exhaustive word means and omits grandparents. Upward transfers pay full non-family duty.",
  },
  {
    id: "in_law_extended",
    label: "In-Laws, Cousins, Uncles, Great-Grandchild",
    desc: "Son-in-law, daughter-in-law (spouse alive), cousin, nephew, or great-grandchild",
    isFamilyForSettlement: false,
    isFamilyForRelease: false,
    isIncomeTaxRelative: false,
    legalNote:
      "In T. Muthu Bala v. IGR (2014), the Madras High Court confirmed that unlisted relatives fall outside the family definition under Tamil Nadu stamp law. Full non-family rates apply without any cap.",
  },
  {
    id: "non_family",
    label: "Friend or Unrelated Co-Owner",
    desc: "Third party, business partner, or unrelated joint buyer",
    isFamilyForSettlement: false,
    isFamilyForRelease: false,
    isIncomeTaxRelative: false,
    legalNote:
      "Transfers to non-family members lose all caps. Non-family settlements pay 7% stamp duty plus 2% registration fee (Art. 58(a)(ii)). Non-family co-owner releases pay 7% stamp duty plus 1% fee (Art. 55-C).",
  },
];

const TOC_ITEMS = [
  { id: "legal-framework", label: "1. Tamil Nadu Settlement & Release Rules" },
  { id: "interactive-calculator", label: "2. Free Stamp Duty & Fee Calculator" },
  { id: "family-eligibility", label: "3. Who Counts as Family Under TN Law" },
  { id: "rate-revisions", label: "4. G.O.Ms.No. 69 & Act 13 of 2024 Changes" },
  { id: "deed-comparison", label: "5. Settlement vs Release vs Gift vs Will" },
  { id: "release-share-rules", label: "6. Release Deed Co-Owner & Share Rules" },
  { id: "cancellation-rules", label: "7. Can a Settlement Deed Be Cancelled" },
  { id: "tnreginet-steps", label: "8. Step-by-Step TNREGINET Filing Guide" },
  { id: "document-checklist", label: "9. Required TN SRO Document Checklist" },
  { id: "worked-examples", label: "10. Cost Examples: Chennai, Coimbatore, Madurai" },
  { id: "tax-implications", label: "11. Income Tax & Capital Gains Rules" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "official-portals", label: "14. Official TN Portals & Related Tools" },
];

const FAQS = [
  {
    q: "What is the maximum stamp duty and registration fee for a family settlement deed in Tamil Nadu?",
    a: "Under Article 58(a)(i) of the Indian Stamp Act (Tamil Nadu) and G.O.(Ms.) No. 69 effective July 10, 2023, a family settlement deed attracts 1% stamp duty capped at Rs 40,000 and 1% registration fee capped at Rs 10,000. Even if the house is worth Rs 5 Crore, your total statutory duty stays Rs 50,000 plus small scanning charges.",
  },
  {
    q: "Who counts as a family member under Article 58 and Article 55 in Tamil Nadu?",
    a: "The Explanation to Article 58 defines family strictly as father, mother, husband, wife, son, daughter, grandchild, brother, or sister. Adoptive parents and adopted children also qualify where personal law allows adoption. Under Tamil Nadu Act 13 of 2024 (effective May 3, 2024), family under Article 55 also covers legal heirs of a deceased family member.",
  },
  {
    q: "Does a settlement deed from a grandchild to a grandparent qualify for the Rs 40,000 cap?",
    a: "No. In V. Shiva v. Inspector General of Registration, a Full Bench of the Madras High Court held that the statutory list is strict and exhaustive. A grandparent settling property to a grandchild gets the Rs 40,000 cap. A grandchild settling upward to a grandparent pays 7% stamp duty and 2% registration fee with no cap.",
  },
  {
    q: "How is stamp duty calculated on a family release deed in Tamil Nadu?",
    a: "Under Article 55-A, stamp duty is charged only on the market or guideline value of the specific undivided share being released, not the whole property. The rate is 1% stamp duty capped at Rs 40,000 and 1% registration fee capped at Rs 10,000. The recipient must already hold a legal share in the property.",
  },
  {
    q: "What is the stamp duty for a non-family settlement deed or non-family release deed in Tamil Nadu?",
    a: "A non-family settlement deed under Article 58(a)(ii) attracts 7% stamp duty and 2% registration fee (reduced from 4% by G.O.Ms.No. 34 on April 1, 2023), making 9% total with no upper limit. A non-family co-owner release deed under Article 55-C attracts 7% stamp duty and 1% registration fee on the released share with no cap.",
  },
  {
    q: "Can a parent unilaterally cancel a registered settlement deed in Tamil Nadu?",
    a: "No. In Sasikala v. Revenue Divisional Officer (2022), a Full Bench of the Madras High Court held that unilateral cancellation of a registered settlement deed is void. Sub-Registrars cannot register it. You need bilateral consent under Article 58(b) (Rs 1,000 stamp duty), a Civil Court decree, or a Maintenance Tribunal order under Section 23 of the Senior Citizens Act.",
  },
  {
    q: "Why do Tamil Nadu families prefer a Settlement Deed over a Gift Deed?",
    a: "In Tamil Nadu, a Family Settlement Deed under Article 58(a)(i) gives clear statutory caps of Rs 40,000 stamp duty and Rs 10,000 registration fee. It also lets parents keep life interest or add family terms. By contrast, a Gift Deed under Article 33 carries full conveyance duty (7% stamp duty plus 2% registration fee) outside family settlement scope and cannot hold conditions.",
  },
  {
    q: "Is a registered Will cheaper than a Settlement Deed in Tamil Nadu?",
    a: "Yes. A Will has zero stamp duty across India and only nominal Book 3 filing charges on TNREGINET if registered voluntarily under Section 18(e) of the Registration Act. You also keep full ownership during your life and can change it anytime. However, immovable property inside Chennai city limits requires probate under Section 213 of the Indian Succession Act.",
  },
];

function formatINR(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

export default function TamilNaduStampDutyClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Calculator State
  const [deedType, setDeedType] = useState<DeedType>("settlement");
  const [relation, setRelation] = useState<RelationKey>("parent_child");
  const [propertyValue, setPropertyValue] = useState<number>(10000000); // Rs 1 Crore default
  const [releaseSharePct, setReleaseSharePct] = useState<number>(25); // 25% (1/4th share)
  const [hasPriorTitle, setHasPriorTitle] = useState<boolean>(true);
  const [localBody, setLocalBody] = useState<LocalBodyType>("chennai_corp");

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
    setDeedType("settlement");
    setRelation("parent_child");
    setPropertyValue(10000000);
    setReleaseSharePct(25);
    setHasPriorTitle(true);
    setLocalBody("chennai_corp");
  };

  // Calculation Engine
  const selectedRelation =
    RELATION_OPTIONS.find((r) => r.id === relation) || RELATION_OPTIONS[0];
  const safePropertyValue = Math.max(0, Number.isFinite(propertyValue) ? propertyValue : 0);
  const safeSharePct = Math.min(100, Math.max(1, Number.isFinite(releaseSharePct) ? releaseSharePct : 25));

  const effectiveDeed: DeedType =
    deedType === "release" && !hasPriorTitle ? "settlement" : deedType;

  const assessableValue =
    effectiveDeed === "release"
      ? Math.round((safePropertyValue * safeSharePct) / 100)
      : safePropertyValue;

  let isConcessional = false;
  let articleCited = "Article 58(a)(i)";
  let stampDuty = 0;
  let stampDutyFormula = "";
  let regFee = 0;
  let regFeeFormula = "";
  let verdictTitle = "";
  let verdictBadge = "";
  let legalSummary = "";
  let actionTip = "";

  if (effectiveDeed === "revocation") {
    isConcessional = true;
    articleCited = "Article 58(b) (TN Act 13 of 2024)";
    stampDuty = 1000;
    stampDutyFormula = "Flat Rs 1,000 stamp duty (raised from Rs 80 on May 3, 2024)";
    regFee = 1000;
    regFeeFormula = "Standard SRO registration & filing charges (approx. Rs 1,000)";
    verdictTitle = "Bilateral or Court-Ordered Revocation Only (Article 58(b))";
    verdictBadge = "Sasikala 2022 Rule Applies";
    legalSummary =
      "Under Tamil Nadu Act 13 of 2024, stamp duty for a Deed of Revocation of Settlement is a flat Rs 1,000. However, following the Madras High Court Full Bench ruling in Sasikala v. RDO (2022), a Sub-Registrar will reject unilateral cancellation. Both settlor and settlee must sign, or you need a Civil Court decree or Senior Citizens Tribunal order under Section 23.";
    actionTip =
      "If the recipient refuses to sign a mutual revocation, check your Section 23 Senior Citizens Act rights before approaching the SRO.";
  } else if (effectiveDeed === "settlement") {
    isConcessional = selectedRelation.isFamilyForSettlement;
    if (isConcessional) {
      articleCited = "Article 58(a)(i) & G.O.(Ms.) No. 69";
      const rawStamp = Math.round(assessableValue * 0.01);
      const rawReg = Math.round(assessableValue * 0.01);
      stampDuty = Math.min(rawStamp, 40000);
      regFee = Math.min(rawReg, 10000);
      stampDutyFormula =
        rawStamp > 40000
          ? `1% (${formatINR(rawStamp)}) capped at Rs 40,000`
          : "1% of guideline / market value (under Rs 40,000 cap)";
      regFeeFormula =
        rawReg > 10000
          ? `1% (${formatINR(rawReg)}) capped at Rs 10,000`
          : "1% of guideline / market value (under Rs 10,000 cap)";
      verdictTitle = "Eligible for Tamil Nadu Family Cap (Article 58(a)(i))";
      verdictBadge = stampDuty === 40000 ? "Max Cap Active: Rs 50,000" : "Concessional 1% + 1%";
      legalSummary = `${selectedRelation.legalNote} Under G.O.(Ms.) No. 69 (effective July 10, 2023), stamp duty is 1% up to Rs 40,000 and registration fee is 1% up to Rs 10,000.`;
      actionTip =
        "Compare this instant ownership transfer against a Registered Will (Rs 0 stamp duty). Remember a Settlement Deed transfers title immediately and cannot be cancelled unilaterally.";
    } else {
      articleCited = "Article 58(a)(ii) & G.O.(Ms.) No. 34";
      stampDuty = Math.round(assessableValue * 0.07);
      regFee = Math.round(assessableValue * 0.02);
      stampDutyFormula = "7% of guideline / market value (No upper cap)";
      regFeeFormula = "2% under G.O.(Ms.) No. 34 (effective April 1, 2023; No cap)";
      verdictTitle = "Non-Family Settlement Rate Applies (Article 58(a)(ii))";
      verdictBadge = "Uncapped 9% Total Rate";
      legalSummary = `${selectedRelation.legalNote} Because this relation falls outside Article 58(a)(i), you pay 7% stamp duty and 2% registration fee with zero ceiling.`;
      actionTip =
        "A Registered Will costs Rs 0 stamp duty even when leaving property to a grandparent, in-law, cousin, or friend. Consider a Will instead of paying 9% upfront.";
    }
  } else {
    // Release Deed with valid pre-existing co-ownership
    isConcessional = selectedRelation.isFamilyForRelease;
    if (isConcessional) {
      articleCited =
        relation === "deceased_heir"
          ? "Article 55-A & TN Act 13 of 2024"
          : "Article 55-A & G.O.(Ms.) No. 69";
      const rawStamp = Math.round(assessableValue * 0.01);
      const rawReg = Math.round(assessableValue * 0.01);
      stampDuty = Math.min(rawStamp, 40000);
      regFee = Math.min(rawReg, 10000);
      stampDutyFormula =
        rawStamp > 40000
          ? `1% on ${safeSharePct}% share (${formatINR(rawStamp)}) capped at Rs 40,000`
          : `1% on ${safeSharePct}% released share (${formatINR(assessableValue)})`;
      regFeeFormula =
        rawReg > 10000
          ? `1% on ${safeSharePct}% share (${formatINR(rawReg)}) capped at Rs 10,000`
          : `1% on ${safeSharePct}% released share (${formatINR(assessableValue)})`;
      verdictTitle = "Eligible for Family Release Cap (Article 55-A)";
      verdictBadge = stampDuty === 40000 ? "Max Cap Active: Rs 50,000" : "Family Release 1% + 1%";
      legalSummary = `${selectedRelation.legalNote} Stamp duty applies only to the ${safeSharePct}% share being released (${formatINR(assessableValue)}), capped at Rs 40,000 plus Rs 10,000 registration fee.`;
      actionTip =
        "Attach the parent title deed and Legal Heir Certificate (if inherited) so the Sub-Registrar verifies both parties already hold co-ownership.";
    } else {
      articleCited = "Article 55-C (Non-Family Co-Owner Release)";
      stampDuty = Math.round(assessableValue * 0.07);
      regFee = Math.round(assessableValue * 0.01);
      stampDutyFormula = `7% on ${safeSharePct}% released share (${formatINR(assessableValue)}; No cap)`;
      regFeeFormula = `1% under TN Table of Fees on released share (No cap)`;
      verdictTitle = "Non-Family Co-Owner Release Rate (Article 55-C)";
      verdictBadge = "Uncapped 8% Share Rate";
      legalSummary = `${selectedRelation.legalNote} Non-family co-owner releases pay 7% stamp duty plus 1% registration fee on the market value of the released share, with no monetary cap.`;
      actionTip =
        "Verify whether the recipient is a legal heir of a deceased family member under TN Act 13 of 2024 before paying uncapped 8% duty.";
    }
  }

  const totalCost = stampDuty + regFee;
  const standardNonFamilyCost = Math.round(assessableValue * 0.09); // 7% SD + 2% Reg Fee
  const savingsVsNonFamily = Math.max(0, standardNonFamilyCost - totalCost);
  const willEstimatedFee = 600; // Nominal Book 3 SRO registration & scanning estimate

  const copyClauseToClipboard = () => {
    const clauseText = `SAMPLE RECITAL CLAUSE: TAMIL NADU FAMILY SETTLEMENT DEED (ARTICLE 58(a)(i))
"WHEREAS the Settlor is the absolute owner of the Schedule Property situated in [District / Taluk / Village, Tamil Nadu], acquired vide Registered Sale Deed Doc. No. [____] of [Year] at SRO [Name], with Patta No. [____];

AND WHEREAS the Settlee is the [Son / Daughter / Wife / Husband / Grandchild / Brother / Sister] of the Settlor and falls within the definition of 'family' under the Explanation to Article 58 of Schedule I to the Indian Stamp Act, 1899 (as amended in Tamil Nadu);

NOW THIS DEED OF SETTLEMENT WITNESSETH that out of natural love and affection and without any monetary consideration, the Settlor hereby settles, conveys, and transfers the Schedule Property unto the Settlee absolutely and forever [subject to life interest of the Settlor, if applicable]."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `TAMIL NADU SRO DOCUMENT CHECKLIST (SETTLEMENT & RELEASE DEED)
1. Original Parent Title Deed (Prior Sale Deed / Partition Deed / Settlement Deed).
2. Revenue Records: Latest Patta, Chitta, Adangal, or Town Survey Land Register (TSLR) extract.
3. 30-Year Encumbrance Certificate (EC) downloaded from TNREGINET (tnreginet.gov.in).
4. Relationship Proof establishing 'Family' status (Birth Certificate, Marriage Certificate, Legal Heir Certificate, Aadhaar / Family Card).
5. Death Certificate & Legal Heir Certificate (mandatory for inherited Release Deeds under Article 55-A / TN Act 13 of 2024).
6. PAN Card & Aadhaar Card of Settlor / Releasor, Settlee / Releasee, and 2 adult witnesses.
7. TNREGINET Guideline Value printout & Building Valuation Statement (Form for built-up area).
8. Online e-Stamp & Registration Fee Payment Receipt + TNREGINET Token Appointment Slip.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN STAMP ACT (TN) • ARTICLES 55 &amp; 58 • G.O.MS.NO. 69</span>
          </div>

          {/* Strict Single H1 Tag (58 chars, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Tamil Nadu Settlement &amp; Release Deed Stamp Duty Calculator
          </h1>

          {/* Plain-English Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact Tamil Nadu stamp duty and TNREGINET registration fees in seconds. Check
            the ₹40,000 family cap, ₹10,000 fee ceiling, legal heir rules, and Will cost savings.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Stamp Duty Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Save Duty with a Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹40,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MAX FAMILY STAMP DUTY (1%)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹10,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MAX FAMILY REG. FEE (1%)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">G.O.Ms.No. 69</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                REVISED JULY 10, 2023
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">TN Act 13/2024</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LEGAL HEIRS INCLUDED
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
              <nav aria-label="Table of contents" className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
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
                <span>Verified TN Rates</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Updated for G.O.(Ms.) No. 34 (April 2023), G.O.(Ms.) No. 69 (July 2023), and Tamil
                Nadu Act 13 of 2024 (May 2024). Backed by Madras High Court Full Bench rulings.
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
                <span>QUICK ANSWER: TAMIL NADU SETTLEMENT &amp; RELEASE DUTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Family Cap Is ₹50,000 Total:</strong> For close family members, both
                    Settlement Deeds (Art. 58(a)(i)) and Release Deeds (Art. 55-A) charge 1% stamp
                    duty capped at ₹40,000 plus 1% registration fee capped at ₹10,000.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Non-Family Transfers Have No Cap:</strong> If the recipient is outside
                    the legal family list, a Settlement Deed costs 7% stamp duty plus 2% fee (9%
                    total). A non-family co-owner Release Deed costs 7% stamp duty plus 1% fee (8%).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Legal Heirs Added in May 2024:</strong> Tamil Nadu Act 13 of 2024
                    expanded the family list for Release Deeds to cover legal heirs of a deceased
                    family member.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Unilateral Cancellation:</strong> Once you register a Tamil Nadu
                    Settlement Deed, you cannot cancel it alone at the Sub-Registrar Office.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: LEGAL FRAMEWORK — STRICTLY THE ONLY <h2> ON THE PAGE */}
            <section id="legal-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Tamil Nadu Settlement &amp; Release Deed Legal Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Tamil Nadu gives big stamp duty relief when families transfer homes or land among
                  close relatives. Two articles of Schedule I of the Indian Stamp Act, 1899 control
                  these transfers in the state.
                </p>
                <p>
                  <strong>Article 58 governs Settlement Deeds.</strong> An owner uses a Settlement
                  Deed to give full or part ownership to a family member without taking money.
                  Parents often use this deed to pass a house to children while keeping a life right
                  to stay in the home.
                </p>
                <p>
                  <strong>Article 55 governs Release Deeds.</strong> A co-owner or legal heir uses a
                  Release Deed to give up their joint share in favor of another co-owner. Both
                  parties must already hold a share in the same land or flat.
                </p>
                <p>
                  Under <strong>G.O.(Ms.) No. 69</strong> (effective July 10, 2023), Tamil Nadu
                  fixed clear upper caps for both family deeds. You pay 1% stamp duty up to ₹40,000
                  and 1% registration fee up to ₹10,000. Your duty is always calculated on the
                  higher of the deed value or the official TNREGINET Guideline Value.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE STAMP DUTY CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>TNREGINET DUTY &amp; FEE ESTIMATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Tamil Nadu Stamp Duty &amp; Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your deed type, family relation, and property value below. Check your exact
                stamp duty, registration fee, cap savings, and Will comparison right away.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Deed Type */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Choose Tamil Nadu Deed Type</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "settlement" as DeedType,
                        label: "Settlement Deed (Art. 58)",
                        desc: "Owner transfers sole or partial title out of love and affection",
                      },
                      {
                        id: "release" as DeedType,
                        label: "Release Deed (Art. 55-A / 55-C)",
                        desc: "Co-owner or co-heir gives up undivided share to existing co-owner",
                      },
                      {
                        id: "revocation" as DeedType,
                        label: "Revocation Deed (Art. 58(b))",
                        desc: "Mutual bilateral cancellation of a prior settlement deed",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setDeedType(option.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          deedType === option.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{option.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Relationship Eligibility Selector */}
                {deedType !== "revocation" && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Select Relationship Between Parties</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {RELATION_OPTIONS.map((opt) => {
                        const qualifies =
                          deedType === "release"
                            ? opt.isFamilyForRelease
                            : opt.isFamilyForSettlement;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setRelation(opt.id)}
                            className={`text-left p-3.5 rounded-2xl border transition-all ${
                              relation === opt.id
                                ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-xs text-slate-900">
                                {opt.label}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                  qualifies
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-amber-50 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {qualifies ? "Family Cap" : "Non-Family"}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                              {opt.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Property Value & Release Share */}
                {deedType !== "revocation" && (
                  <div className="space-y-5 pt-4 border-t border-slate-100">
                    <div className="space-y-3">
                      <label
                        htmlFor="tn-property-value"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                      >
                        <IndianRupee className="w-4 h-4 text-[#C65378]" />
                        <span>
                          Step 3: Total Property Guideline or Market Value (₹)
                        </span>
                      </label>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                            ₹
                          </span>
                          <input
                            id="tn-property-value"
                            type="number"
                            min={100000}
                            max={1000000000}
                            step={100000}
                            value={propertyValue}
                            onChange={(e) => setPropertyValue(Number(e.target.value) || 0)}
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#C65378] focus:ring-2 focus:ring-rose-100 outline-none font-extrabold text-slate-900 text-sm sm:text-base"
                          />
                        </div>
                        <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl shrink-0">
                          {formatINR(safePropertyValue)}
                        </div>
                      </div>

                      {/* Quick Preset Chips */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "₹25 Lakh", val: 2500000 },
                          { label: "₹50 Lakh", val: 5000000 },
                          { label: "₹1 Crore", val: 10000000 },
                          { label: "₹2.5 Crore", val: 25000000 },
                          { label: "₹5 Crore", val: 50000000 },
                        ].map((preset) => (
                          <button
                            key={preset.val}
                            type="button"
                            onClick={() => setPropertyValue(preset.val)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                              propertyValue === preset.val
                                ? "bg-[#172228] text-white border-[#172228]"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50 hover:border-rose-200"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      <input
                        type="range"
                        aria-label="Property market value slider"
                        min={500000}
                        max={100000000}
                        step={500000}
                        value={Math.min(100000000, safePropertyValue)}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                    </div>

                    {/* Conditional Release Deed Inputs */}
                    {deedType === "release" && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="tn-share-pct"
                            className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between"
                          >
                            <span>Undivided Share Being Released (%)</span>
                            <span className="text-[#C65378] font-black">
                              {safeSharePct}% ({formatINR(Math.round((safePropertyValue * safeSharePct) / 100))})
                            </span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "50% (1/2)", pct: 50 },
                              { label: "33.3% (1/3)", pct: 33.33 },
                              { label: "25% (1/4)", pct: 25 },
                              { label: "20% (1/5)", pct: 20 },
                              { label: "100% Full", pct: 100 },
                            ].map((s) => (
                              <button
                                key={s.pct}
                                type="button"
                                onClick={() => setReleaseSharePct(s.pct)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                  releaseSharePct === s.pct
                                    ? "bg-[#C65378] text-white border-[#C65378]"
                                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                            <input
                              id="tn-share-pct"
                              type="number"
                              min={1}
                              max={100}
                              step={1}
                              value={releaseSharePct}
                              onChange={(e) => setReleaseSharePct(Number(e.target.value) || 1)}
                              className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-900"
                              aria-label="Custom released share percentage"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 space-y-2">
                          <div className="text-xs font-bold text-slate-900">
                            Does the recipient already hold a legal share in this property?
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <button
                              type="button"
                              onClick={() => setHasPriorTitle(true)}
                              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                                hasPriorTitle
                                  ? "border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950"
                                  : "border-slate-200 bg-white text-slate-600"
                              }`}
                            >
                              Yes, both parties are co-owners or co-heirs
                            </button>
                            <button
                              type="button"
                              onClick={() => setHasPriorTitle(false)}
                              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                                !hasPriorTitle
                                  ? "border-amber-600 bg-amber-50 font-bold text-amber-950"
                                  : "border-slate-200 bg-white text-slate-600"
                              }`}
                            >
                              No, recipient has zero prior title
                            </button>
                          </div>
                          {!hasPriorTitle && (
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <span>
                                <strong>SRO Reclassification Alert:</strong> A Release Deed works
                                only between existing co-owners. Because the recipient has no prior
                                title, the SRO treats this as a <strong>Settlement Deed</strong>{" "}
                                (Article 58) on the full property value. Results below reflect this.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Property Location Jurisdiction */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C65378]" />
                        <span>Step 4: Property Local Body Jurisdiction in Tamil Nadu</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { id: "chennai_corp" as LocalBodyType, label: "Chennai Corp." },
                          { id: "other_corp" as LocalBodyType, label: "Coimbatore / Madurai Corp." },
                          { id: "municipality" as LocalBodyType, label: "Municipality" },
                          { id: "panchayat" as LocalBodyType, label: "Town / Village Panchayat" },
                        ].map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => setLocalBody(loc.id)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                              localBody === loc.id
                                ? "border-[#C65378] bg-rose-50/50 text-slate-900"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {loc.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Exact Reference Brand Navy Card)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        {articleCited}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {verdictTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck
                        className={`w-4 h-4 ${
                          isConcessional ? "text-emerald-400" : "text-amber-300"
                        }`}
                      />
                      <span>{verdictBadge}</span>
                    </div>
                  </div>

                  {/* 3 Primary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        STAMP DUTY PAYABLE
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400">
                        {formatINR(stampDuty)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {stampDutyFormula}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TNREGINET REGISTRATION FEE
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        {formatINR(regFee)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {regFeeFormula}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TOTAL STATUTORY PAYABLE
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-rose-300">
                        {formatINR(totalCost)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        Plus nominal TNREGINET scanning &amp; computer fees
                      </div>
                    </div>
                  </div>

                  {/* Live 3-Way Comparison Bar */}
                  {effectiveDeed !== "revocation" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          ASSESSABLE VALUE
                        </div>
                        <div className="font-extrabold text-white">
                          {formatINR(assessableValue)}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          {effectiveDeed === "release"
                            ? `${safeSharePct}% share of ${formatINR(safePropertyValue)}`
                            : "100% of property guideline value"}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          VS NON-FAMILY 9% RATE
                        </div>
                        <div
                          className={`font-extrabold ${
                            savingsVsNonFamily > 0 ? "text-emerald-400" : "text-amber-300"
                          }`}
                        >
                          {savingsVsNonFamily > 0
                            ? `You Save ${formatINR(savingsVsNonFamily)}`
                            : `Full 9% (${formatINR(standardNonFamilyCost)})`}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Standard conveyance / outsider rate
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          VS REGISTERED WILL (BOOK 3)
                        </div>
                        <div className="font-extrabold text-rose-200">
                          ₹0 Stamp Duty (~{formatINR(willEstimatedFee)} fee)
                        </div>
                        <div className="text-[11px] text-slate-300">
                          {localBody === "chennai_corp"
                            ? "Note: Chennai city limits require High Court Probate (Sec. 213 ISA)"
                            : "No mandatory probate outside Chennai city limits"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Statutory Basis &amp; Tax Check:</span>
                    </div>
                    <p>{legalSummary}</p>
                    {effectiveDeed !== "revocation" && (
                      <p className="text-xs text-slate-300">
                        <strong>Income Tax Section 56(2)(x):</strong>{" "}
                        {selectedRelation.isIncomeTaxRelative
                          ? "Exempt from income tax for the recipient as a specified relative under the Income Tax Act, 1961."
                          : "Tax warning: This recipient may not qualify as an exempt relative under Section 56(2)(x). Stamp duty value above Rs 50,000 can be taxed as income."}
                      </p>
                    )}
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Practical Guidance:</strong> {actionTip}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want to transfer assets at ₹0 stamp duty while keeping full control for life?
                    </div>
                    <button
                      type="button"
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
                  <span>TAMIL NADU FAMILY PROPERTY TRANSFER OVERVIEW</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Art. 58 &amp; Art. 55-A
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/tamil-nadu-settlement-release-deed-stamp-duty-calculator-og.jpg"
                  alt="Tamil Nadu family reviewing Settlement and Release Deed stamp duty rules in Chennai"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Tamil Nadu caps family Settlement and Release Deed charges at ₹40,000 stamp duty
                and ₹10,000 registration fee under G.O.(Ms.) No. 69.
              </p>
            </div>

            {/* SECTION 3: WHO COUNTS AS FAMILY UNDER TAMIL NADU LAW */}
            <section id="family-eligibility" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>ELIGIBILITY CRITERIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Who Counts as Family Under Tamil Nadu Stamp Law
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Sub-Registrars in Tamil Nadu check family ties very strictly. The Explanation to
                  Article 58 uses the word <strong>&ldquo;means&rdquo;</strong> instead of
                  &ldquo;includes.&rdquo; Courts treat this list as closed and exact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2.5">
                    <div className="font-extrabold text-emerald-900 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Eligible Family (1% Capped at ₹50,000 Total)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      <li>• Father and Mother (including adoptive parents)</li>
                      <li>• Husband and Wife (legally married spouses)</li>
                      <li>• Son and Daughter (including legally adopted children)</li>
                      <li>• Grandchild (grandson or granddaughter from grandparent)</li>
                      <li>• Brother and Sister</li>
                      <li>
                        • Legal heirs of a deceased family member (added by TN Act 13 of 2024 for
                        Release and Partition deeds)
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2.5">
                    <div className="font-extrabold text-rose-900 text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-[#C65378]" />
                      <span>Excluded Relations (7% Uncapped Duty)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      <li>
                        • Grandparents (when a grandchild settles property upward to a grandparent)
                      </li>
                      <li>• Great-grandchildren (Madras HC in T. Muthu Bala, 2014)</li>
                      <li>• Daughter-in-law or Son-in-law (while spouse is alive)</li>
                      <li>• Cousins, Uncles, Aunts, Nephews, and Nieces</li>
                      <li>• Step-relations not legally adopted under personal law</li>
                      <li>• Friends, business partners, and unrelated co-buyers</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-amber-700" />
                    <span>Madras High Court Full Bench Warning: V. Shiva v. IGR</span>
                  </div>
                  <p className="leading-relaxed">
                    A grandparent can settle property to a grandchild for a maximum of ₹50,000.
                    However, if a grandchild settles property back to a grandparent, the Madras
                    High Court Full Bench ruled that grandparents are not on the Article 58 list.
                    The SRO will charge full 7% stamp duty plus 2% registration fee with no cap.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: G.O.MS.NO. 69 & TN ACT 13 OF 2024 */}
            <section id="rate-revisions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LATEST TAMIL NADU AMENDMENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. G.O.Ms.No. 69 &amp; TN Act 13 of 2024 Rate Changes
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many old blogs still quote ₹25,000 stamp duty and ₹4,000 registration caps. Tamil
                Nadu updated these caps in 2023 and expanded family rules in 2024. Always budget
                using the current statutory numbers below.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold">Fee Head / Provision</th>
                      <th className="p-3.5 font-bold">Old Rule</th>
                      <th className="p-3.5 font-bold">Current Tamil Nadu Rule</th>
                      <th className="p-3.5 font-bold">Legal Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Family Settlement / Release Stamp Duty Cap
                      </td>
                      <td className="p-3.5">1% capped at ₹25,000</td>
                      <td className="p-3.5 font-bold text-emerald-800">1% capped at ₹40,000</td>
                      <td className="p-3.5">G.O.(Ms.) No. 69 (w.e.f. July 10, 2023)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Family Settlement / Release Reg. Fee Cap
                      </td>
                      <td className="p-3.5">1% capped at ₹4,000</td>
                      <td className="p-3.5 font-bold text-emerald-800">1% capped at ₹10,000</td>
                      <td className="p-3.5">G.O.(Ms.) No. 69 (w.e.f. July 10, 2023)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Non-Family Settlement / Gift Reg. Fee
                      </td>
                      <td className="p-3.5">4% of market value</td>
                      <td className="p-3.5 font-bold text-emerald-800">2% of market value</td>
                      <td className="p-3.5">G.O.(Ms.) No. 34 (w.e.f. April 1, 2023)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Legal Heirs of Deceased Member (Art. 55)
                      </td>
                      <td className="p-3.5">Often rejected by SRO</td>
                      <td className="p-3.5 font-bold text-emerald-800">
                        Included in family definition
                      </td>
                      <td className="p-3.5">TN Act 13 of 2024 (w.e.f. May 3, 2024)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Revocation of Settlement (Art. 58(b))
                      </td>
                      <td className="p-3.5">₹80 flat stamp duty</td>
                      <td className="p-3.5 font-bold text-[#C65378]">₹1,000 flat stamp duty</td>
                      <td className="p-3.5">TN Act 13 of 2024 (w.e.f. May 3, 2024)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: FULL COMPARISON TABLE */}
            <section id="deed-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>INSTRUMENT COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Settlement vs Release vs Gift vs Will in TN
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Picking the wrong deed in Tamil Nadu can cost you lakhs of extra rupees. Compare
                every major family property transfer option side by side below.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold">Instrument &amp; Article</th>
                      <th className="p-3.5 font-bold">Stamp Duty</th>
                      <th className="p-3.5 font-bold">Reg. Fee</th>
                      <th className="p-3.5 font-bold">Max Cap</th>
                      <th className="p-3.5 font-bold">Ownership &amp; Revocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Family Settlement (Art. 58(a)(i))
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">1%</td>
                      <td className="p-3.5 font-bold text-emerald-800">1%</td>
                      <td className="p-3.5 font-bold text-emerald-800">₹40,000 + ₹10,000</td>
                      <td className="p-3.5">Instant transfer; can keep life interest; no unilateral cancel</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Non-Family Settlement (Art. 58(a)(ii))
                      </td>
                      <td className="p-3.5 font-bold text-rose-700">7%</td>
                      <td className="p-3.5 font-bold text-rose-700">2%</td>
                      <td className="p-3.5 text-rose-700">None (9% total)</td>
                      <td className="p-3.5">Instant transfer; high upfront cost on full value</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Family Release (Art. 55-A)
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">1% on share</td>
                      <td className="p-3.5 font-bold text-emerald-800">1% on share</td>
                      <td className="p-3.5 font-bold text-emerald-800">₹40,000 + ₹10,000</td>
                      <td className="p-3.5">Needs prior co-ownership; extinguishes releasor share</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Non-Family Release (Art. 55-C)
                      </td>
                      <td className="p-3.5 font-bold text-rose-700">7% on share</td>
                      <td className="p-3.5 font-bold text-rose-700">1% on share</td>
                      <td className="p-3.5 text-rose-700">None (8% share)</td>
                      <td className="p-3.5">Between unrelated joint buyers or distant co-owners</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Gift Deed (Art. 33)
                      </td>
                      <td className="p-3.5">7% (outsider / general)</td>
                      <td className="p-3.5">2%</td>
                      <td className="p-3.5">Lacks Art. 58 cap flexibility</td>
                      <td className="p-3.5">Must be unconditional; TN families use Settlement instead</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                      <td className="p-3.5 font-bold text-slate-900">
                        Registered Will (Book 3)
                      </td>
                      <td className="p-3.5 font-black text-emerald-700">₹0 (Exempt)</td>
                      <td className="p-3.5 font-bold text-emerald-700">Nominal (~₹600)</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹0 Stamp Duty</td>
                      <td className="p-3.5">Takes effect after death; 100% revocable anytime</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: RELEASE DEED CO-OWNER RULES */}
            <section id="release-share-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>CO-OWNERSHIP &amp; SHARE VALUATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Release Deed Co-Owner Rules &amp; Share Valuation
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Release Deed is common after a parent passes away without a Will. Siblings or
                  surviving spouses often release their joint shares so one family member holds
                  clear sole title. Keep three strict Tamil Nadu rules in mind.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rule 1: Prior Title
                    </div>
                    <div className="font-bold text-slate-800">Recipient Must Be Co-Owner</div>
                    <p className="text-slate-600 leading-relaxed">
                      The person receiving the release must already own a share in the property. If
                      they hold zero prior title, the SRO rejects the release and treats it as a
                      Settlement Deed.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rule 2: Share Value Only
                    </div>
                    <div className="font-bold text-slate-800">Pay Only on Released Share</div>
                    <p className="text-slate-600 leading-relaxed">
                      If one of four heirs releases a 25% share in an ₹80 Lakh home, stamp duty is
                      calculated only on ₹20 Lakh. At 1%, you pay ₹20,000 stamp duty and ₹10,000
                      capped registration fee.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rule 3: Act 13 of 2024
                    </div>
                    <div className="font-bold text-slate-800">Deceased Sibling&rsquo;s Heirs</div>
                    <p className="text-slate-600 leading-relaxed">
                      Since May 3, 2024, the widow or children of a deceased sibling qualify under
                      Article 55 family caps when releasing or receiving inherited family shares.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: CANCELLATION & SENIOR CITIZEN PROTECTION */}
            <section id="cancellation-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>REVOCATION &amp; ELDER PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Can a Settlement Deed Be Cancelled in Tamil Nadu
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many senior citizens execute a Settlement Deed expecting their children to care
                  for them. Later, if family ties break down, parents try to cancel the deed at the
                  Sub-Registrar Office.
                </p>
                <p>
                  In <strong>Sasikala v. The Revenue Divisional Officer (2022)</strong>, a Full
                  Bench of the Madras High Court shut down unilateral cancellations. Once a
                  Settlement Deed is registered and accepted, title passes at once. A Sub-Registrar
                  has zero legal power to register a one-sided cancellation deed.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Three Legal Ways to Cancel a Tamil Nadu Settlement Deed</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>Mutual Revocation Deed (Article 58(b)):</strong> Both donor and donee
                      sign a bilateral revocation deed at the SRO by paying ₹1,000 stamp duty.
                    </li>
                    <li>
                      <strong>Senior Citizens Maintenance Tribunal (Section 23):</strong> Under
                      Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act,
                      2007 and the Supreme Court ruling in <em>Urmila Dixit (2025 INSC 20)</em>, an
                      elderly parent can apply to the RDO Tribunal to void a deed if care and
                      maintenance are denied.
                    </li>
                    <li>
                      <strong>Civil Court Suit:</strong> File a suit under Section 31 of the
                      Specific Relief Act, 1963 to cancel a deed signed due to fraud, coercion, or
                      undue influence.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL INTERNAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ELDERLY PARENT SEEKING DEED CANCELLATION?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Check Section 23 Senior Citizens Act Cancellation Eligibility
                </div>
                <p className="text-xs text-slate-600">
                  Test your legal grounds under the Supreme Court&rsquo;s Urmila Dixit (2025)
                  ruling before filing at the RDO Maintenance Tribunal.
                </p>
              </div>
              <Link
                href="/tools/senior-citizen-section-23-gift-revocation-checker"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Section 23 Checker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: STEP-BY-STEP TNREGINET REGISTRATION SOP */}
            <section id="tnreginet-steps" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>ONLINE FILING PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step TNREGINET Registration Guide
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Every Settlement Deed or Release Deed for immovable property in Tamil Nadu must be
                registered under Section 17 of the Registration Act, 1908. Follow these six steps on
                TNREGINET.
              </p>
              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "Verify Guideline Value on TNREGINET",
                    desc: "Visit tnreginet.gov.in and look up your street name or survey number under Guideline Value. Confirm the official square-foot or acre valuation before drafting.",
                  },
                  {
                    title: "Draft the Deed with Accurate Family Recitals",
                    desc: "Prepare the Settlement Deed (Article 58(a)(i)) or Release Deed (Article 55-A) clearly stating the blood relationship, parent deed number, Patta/TSLR details, and exact property boundaries.",
                  },
                  {
                    title: "Create Temporary Document on TNREGINET",
                    desc: "Log in to your TNREGINET citizen account, select Document Creation, choose Settlement - Within Family or Release - Within Family, and upload party details and schedules.",
                  },
                  {
                    title: "Pay Stamp Duty & Registration Fee Online",
                    desc: "Pay the calculated stamp duty (up to ₹40,000 for family), registration fee (up to ₹10,000 for family), and scanning charges via online e-Stamping / GRAS portal.",
                  },
                  {
                    title: "Book Token & Execute at Sub-Registrar Office",
                    desc: "Reserve a token slot at the jurisdictional SRO. Both parties and two adult witnesses appear in person with original IDs for biometric thumbprint, live photo, and signing.",
                  },
                  {
                    title: "Apply for Online Patta / TSLR Name Transfer",
                    desc: "After registration, apply for Patta transfer via Tamil Nilam / eservices.tn.gov.in using your registered document number so revenue records reflect the new owner.",
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
            </section>

            {/* SECTION 9: DOCUMENT CHECKLIST & SAMPLE CLAUSE */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SRO PAPERWORK &amp; DRAFTING CLAUSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Required Document Checklist for Tamil Nadu SRO
              </h3>

              {/* Checklist Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Mandatory Papers for TNREGINET Settlement or Release Deed
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
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
                    "Original Parent Title Deed (Sale / Partition / Prior Settlement)",
                    "Latest Patta, Chitta, Adangal, or Town Survey (TSLR) Extract",
                    "30-Year Encumbrance Certificate (EC) from TNREGINET",
                    "Proof of Family Relation (Birth / Marriage / Family Card)",
                    "Death & Legal Heir Certificate (for inherited Release Deeds)",
                    "Original Aadhaar & PAN of Settlor, Settlee & 2 Witnesses",
                    "TNREGINET Guideline Value & Building Valuation Sheet",
                    "e-Stamp Payment Receipt & SRO Token Appointment Slip",
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Clause Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Sample Article 58(a)(i) Family Settlement Recital Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
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
{`"WHEREAS the Settlor is the absolute owner of the Schedule Property situated in [District / Taluk / Village, Tamil Nadu], acquired vide Registered Sale Deed Doc. No. [____] of [Year] at SRO [Name], with Patta No. [____];

AND WHEREAS the Settlee is the [Son / Daughter / Wife / Husband / Grandchild / Brother / Sister] of the Settlor and falls within the definition of 'family' under the Explanation to Article 58 of Schedule I to the Indian Stamp Act, 1899 (as amended in Tamil Nadu);

NOW THIS DEED OF SETTLEMENT WITNESSETH that out of natural love and affection and without any monetary consideration, the Settlor hereby settles, conveys, and transfers the Schedule Property unto the Settlee absolutely and forever [subject to life interest of the Settlor, if applicable]."`}
                </pre>
              </div>
            </section>

            {/* SECTION 10: WORKED EXAMPLES */}
            <section id="worked-examples" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL COST EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Cost Examples: Chennai, Coimbatore, Madurai
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Chennai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Chennai Anna Nagar Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Art. 58(a)(i)
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Settles ₹1.5 Crore Flat to Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Calculation:</strong> 1% of ₹1.5 Crore equals ₹1,50,000. Under
                    G.O.Ms.No. 69, stamp duty stops at ₹40,000 and registration fee stops at
                    ₹10,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Total Paid: ₹50,000.</strong> The family saves ₹13,00,000 compared to
                    the 9% non-family rate (₹13,50,000).
                  </p>
                </div>

                {/* Case 2: Coimbatore */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Coimbatore Family House</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Art. 55-A
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Widow of Deceased Brother Releases 25% Share
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Calculation:</strong> Total house guideline value is ₹80 Lakh. Her 25%
                    share is ₹20 Lakh. Under TN Act 13 of 2024, she qualifies as legal heir of a
                    deceased family member.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Total Paid: ₹30,000</strong> (1% stamp duty ₹20,000 + ₹10,000 capped
                    registration fee) instead of ₹1,60,000 at 8%.
                  </p>
                </div>

                {/* Case 3: Madurai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Madurai Plot Trap</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[10px]">
                      Art. 58(a)(ii)
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Grandson Settles ₹60 Lakh Plot to Grandfather
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Calculation:</strong> Per the Madras HC Full Bench in{" "}
                    <em>V. Shiva v. IGR</em>, grandparents do not qualify for upward settlements.
                    No cap applies.
                  </p>
                  <p className="text-rose-700 font-semibold leading-relaxed">
                    <strong>Total Payable: ₹5,40,000</strong> (7% stamp duty ₹4,20,000 + 2% reg.
                    fee ₹1,20,000). A Will costs ₹0 stamp duty.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: INCOME TAX & CAPITAL GAINS */}
            <section id="tax-implications" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <IndianRupee className="w-4 h-4" />
                <span>TAXATION RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Income Tax &amp; Capital Gains on TN Family Deeds
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Stamp duty is a Tamil Nadu state levy, while income tax follows the Central
                  Income Tax Act, 1961. The word &ldquo;family&rdquo; in Tamil Nadu stamp law does
                  not match the word &ldquo;relative&rdquo; in income tax law.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Section 56(2)(x) Exemption:</strong> Property received without money
                    from a specified relative (parents, spouse, siblings, lineal ascendants or
                    descendants, and their spouses) is 100% income-tax free for the receiver.
                  </li>
                  <li>
                    <strong>Non-Relative Tax Trap:</strong> If you settle property on a friend or
                    cousin, the receiver pays income tax on the full guideline value if it exceeds
                    ₹50,000, in addition to the 9% Tamil Nadu duty.
                  </li>
                  <li>
                    <strong>Capital Gains Carry-Forward (Sections 47(iii) &amp; 49(1)):</strong>{" "}
                    Settling or gifting property triggers zero capital gains tax for the donor. When
                    the receiver later sells the home, the original purchase price and holding
                    period of the donor apply.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: WillDrafting Legal Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Estate &amp; Property Succession Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and succession
                  advocates help families across Chennai, Coimbatore, Madurai, Trichy, and NRI hubs
                  choose between Registered Wills, Family Settlement Deeds, and Release Deeds with
                  zero registration surprises.
                </p>

                {/* Service & Template Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/family-settlement-deed-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Family Settlement Lawyer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/relinquishment-deed"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Release Deed Drafting</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Will Registration Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/templates/will-format-tamil-uyil-sasanam"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Tamil Uyil Sasanam Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
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
                13. Frequently Asked Questions: TN Stamp Duty
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
                        aria-expanded={isOpen}
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

            {/* SECTION 14: OFFICIAL PORTALS & RELATED LINKS */}
            <section id="official-portals" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL GOVERNMENT PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Tamil Nadu Portals &amp; Related Guides
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify live guideline values, Patta status, and statutory notifications directly
                  on official government and court portals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://tnreginet.gov.in/portal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>TNREGINET Official Registration Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://eservices.tn.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Tamil Nadu Patta &amp; Chitta e-Services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Stamp Act, 1899</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://hcmadras.tn.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Madras High Court Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related Stamp Duty Tools, Templates &amp; Services
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Gift Deed vs Will Stamp Duty Tool
                    </Link>
                    <Link
                      href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Maharashtra Gift &amp; Release Calculator
                    </Link>
                    <Link
                      href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Delhi Gift &amp; Relinquishment Calculator
                    </Link>
                    <Link
                      href="/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      UP ₹5,000 Family Gift Calculator
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Deed Format
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Release Deed Format India
                    </Link>
                    <Link
                      href="/templates/will-format-tamil-uyil-sasanam"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Tamil Will Format (Uyil Sasanam)
                    </Link>
                    <Link
                      href="/services/property-mutation-dakhil-kharij-service"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Patta &amp; Property Mutation Service
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Why Compare Settlement vs Will?
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Settlement Deed passes ownership today and costs up to ₹50,000 in Tamil Nadu. A
                  Will costs ₹0 stamp duty, keeps your home in your name for life, and lets you
                  update your plan anytime.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Check Family Ties Before Filing
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Always check if your relative sits on the exact Article 58 or Article 55 list
                  before buying e-Stamps. One wrong relation can raise your tax bill from ₹50,000
                  to lakhs of rupees.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  General Legal Information Notice
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This calculator uses current Tamil Nadu stamp rates for planning. Exact payable
                  duty depends on your SRO guideline value, built-up structure value, and title
                  chain. Consult a lawyer before filing.
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
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advises Indian and NRI families on Tamil Nadu settlement deeds, co-heir release
                deeds, Chennai probate rules, and clear registered Wills.
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
                  <span>ZERO STAMP DUTY OPTION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Keep Full Ownership Today with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid giving away your house too early. Draft a clear Indian Will at ₹0 stamp
                  duty and keep 100% control during your lifetime.
                </p>
                <button
                  type="button"
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>TAMIL NADU PROPERTY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Custom Settlement or Release Deed Draft?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers verify Patta, title chain, family cap eligibility, and life-interest
                  clauses before you pay TNREGINET e-Stamp duty.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Legal Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Tamil Nadu Families Use This Tool
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Current Caps:</strong> Reflects G.O.Ms.No. 69 (₹40,000 + ₹10,000) and
                      G.O.Ms.No. 34 (2% non-family fee).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2024 Heir Rules:</strong> Covers TN Act 13 of 2024 inclusion of
                      deceased family members&rsquo; legal heirs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Court-Tested Alerts:</strong> Warns on <em>V. Shiva</em> grandparent
                      exclusions and <em>Sasikala</em> cancellation bars.
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
          href="#interactive-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Duty Calculator</span>
        </a>
        <button
          type="button"
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
