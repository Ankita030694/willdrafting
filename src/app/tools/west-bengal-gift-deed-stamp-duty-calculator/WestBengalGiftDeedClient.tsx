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
  Lock,
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
  MessageSquare,
} from "lucide-react";

type DeedType = "gift" | "partition" | "release";

type RelationKey =
  | "parent_to_child"
  | "spouse"
  | "daughter_in_law"
  | "grandparent_to_grandchild"
  | "siblings"
  | "child_to_parent"
  | "grandchild_to_grandparent"
  | "son_in_law"
  | "extended_relative"
  | "non_family";

type LocationZone = "urban_corp" | "rural_panchayat";
type PropertyTenure = "freehold" | "leasehold";

interface RelationOption {
  id: RelationKey;
  label: string;
  desc: string;
  wbStatus: "statutory_family" | "hc_relief" | "non_family";
  isIncomeTaxRelative: boolean;
  triggersClubbing: boolean;
  legalNote: string;
}

const RELATION_OPTIONS: RelationOption[] = [
  {
    id: "parent_to_child",
    label: "Parent to Son or Daughter",
    desc: "Father or mother gifting to a son or daughter (married or unmarried)",
    wbStatus: "statutory_family",
    isIncomeTaxRelative: true,
    triggersClubbing: false,
    legalNote:
      "Sons and daughters (married, unmarried, widowed, or divorced) are listed in the Explanation to Article 33. You get the 0.5% family rate capped at Rs 1,000.",
  },
  {
    id: "spouse",
    label: "Husband and Wife",
    desc: "Gift of a flat, house, or land between legally wedded spouses",
    wbStatus: "statutory_family",
    isIncomeTaxRelative: true,
    triggersClubbing: true,
    legalNote:
      "Spouses qualify under Article 33(i) for the Rs 1,000 stamp duty cap. Note that future rent from a home gifted to a spouse is clubbed in the donor's tax return under Section 64(1)(iv).",
  },
  {
    id: "daughter_in_law",
    label: "Parent to Daughter-in-Law (Son's Wife)",
    desc: "Father-in-law or mother-in-law gifting to their son's wife",
    wbStatus: "statutory_family",
    isIncomeTaxRelative: true,
    triggersClubbing: true,
    legalNote:
      "West Bengal expressly names 'son's wife' in the Explanation to Article 33. She gets the Rs 1,000 cap, though future rent or gains are clubbed with the donor under Section 64(1)(vi).",
  },
  {
    id: "grandparent_to_grandchild",
    label: "Grandparent to Grandson or Granddaughter",
    desc: "Dadu, dida, thakurda, or thakuma gifting to a grandchild",
    wbStatus: "statutory_family",
    isIncomeTaxRelative: true,
    triggersClubbing: false,
    legalNote:
      "Both grandson and granddaughter appear directly in the Explanation to Article 33. Downward gifts from grandparents get the Rs 1,000 family cap.",
  },
  {
    id: "siblings",
    label: "Brother and Sister",
    desc: "Gift between full siblings (married, unmarried, widowed, or divorced)",
    wbStatus: "statutory_family",
    isIncomeTaxRelative: true,
    triggersClubbing: false,
    legalNote:
      "Brothers and sisters qualify under Article 33(i) regardless of marital status. You pay 0.5% stamp duty capped at Rs 1,000 plus 1% registration fee.",
  },
  {
    id: "child_to_parent",
    label: "Son or Daughter to Parent",
    desc: "Adult child gifting a home or plot upward to father or mother",
    wbStatus: "statutory_family",
    isIncomeTaxRelative: true,
    triggersClubbing: false,
    legalNote:
      "Parents are explicitly named in the Explanation to Article 33. Upward gifts to a father or mother qualify for the Rs 1,000 stamp duty cap.",
  },
  {
    id: "grandchild_to_grandparent",
    label: "Grandchild to Grandparent (HC Relief)",
    desc: "Grandson or granddaughter gifting upward to grandmother or grandfather",
    wbStatus: "hc_relief",
    isIncomeTaxRelative: true,
    triggersClubbing: false,
    legalNote:
      "The literal text omits 'grandparent', but the Calcutta High Court in Chetan Chowdhury v. State of West Bengal (2017) held that a grandson gifting to a grandmother qualifies under Article 33(i). Attach the judgment at the ADSR.",
  },
  {
    id: "son_in_law",
    label: "Parent to Son-in-Law (Daughter's Husband)",
    desc: "Excluded from WB Article 33 (Pays full 5% to 7% conveyance duty)",
    wbStatus: "non_family",
    isIncomeTaxRelative: true,
    triggersClubbing: false,
    legalNote:
      "A son-in-law is missing from the Explanation to Article 33. Even though the gift is tax-free under Section 56(2)(x), West Bengal charges full 6% to 7% urban or 5% to 6% rural stamp duty.",
  },
  {
    id: "extended_relative",
    label: "Uncle, Aunt, Nephew, Niece, Cousin, In-Laws",
    desc: "Relatives outside the 9 strict WB Article 33 family ties",
    wbStatus: "non_family",
    isIncomeTaxRelative: false,
    triggersClubbing: false,
    legalNote:
      "Unlisted relatives do not get the Article 33(i) cap in West Bengal. You pay full Article 23 conveyance stamp duty plus 1% registration fee, and non-relatives face income tax under Section 56(2)(x).",
  },
  {
    id: "non_family",
    label: "Friend, Third Party, Company, or Trust",
    desc: "Unrelated individual or legal entity receiving property as a gift",
    wbStatus: "non_family",
    isIncomeTaxRelative: false,
    triggersClubbing: false,
    legalNote:
      "Transfers to friends, firms, or trusts attract full Article 23 conveyance stamp duty (6% to 7% urban, 5% to 6% rural) plus 1% registration fee and Section 56(2)(x) tax on the full circle rate.",
  },
];

const TOC_ITEMS = [
  { id: "legal-framework", label: "1. WB Gift Deed & Article 33 Rules" },
  { id: "interactive-calculator", label: "2. Free WB Stamp Duty Calculator" },
  { id: "family-eligibility", label: "3. Who Qualifies as Family in WB" },
  { id: "finance-act-2024", label: "4. WB Finance Act 2024: Rs 1,000 Cap" },
  { id: "urban-vs-rural", label: "5. Urban vs Rural & Rs 1 Cr Surcharge" },
  { id: "deed-comparison", label: "6. Gift vs Release, Partition & Will" },
  { id: "leasehold-rulings", label: "7. Salt Lake Lease & Calcutta HC Rules" },
  { id: "enathikaran-steps", label: "8. e-Nathikaran & GRIPS Filing Steps" },
  { id: "document-checklist", label: "9. e-Nathikaran Document Checklist" },
  { id: "worked-examples", label: "10. Cost Examples: Kolkata & Districts" },
  { id: "tax-and-revocation", label: "11. Income Tax & Senior Revocation" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "official-portals", label: "14. Official WB Portals & Tools" },
];

const FAQS = [
  {
    q: "Is stamp duty on a family gift deed in West Bengal still 0.5% or capped at Rs 1,000?",
    a: "Under Article 33(i) of Schedule IA of the Indian Stamp Act in West Bengal, the rate is 0.5% of market value. Section 2(2) of the West Bengal Finance Act, 2024 (effective June 15, 2024 via Notification No. 929-FT) capped this stamp duty at Rs 1,000 for listed family members. You still pay the separate 1% registration fee with no cap.",
  },
  {
    q: "Who qualifies as a family member under Article 33 in West Bengal?",
    a: "The Explanation to Article 33 lists nine exact relations: parent, spouse, son, daughter, son's wife (daughter-in-law), grandson, granddaughter, brother, and sister. Married, unmarried, widowed, and divorced daughters or siblings are covered. Sons-in-law, uncles, aunts, cousins, nephews, nieces, and parents-in-law are left out and pay 5% to 7% duty.",
  },
  {
    q: "Does the Rs 1,000 cap also reduce the 1% registration fee on wbregistration?",
    a: "No. The West Bengal Finance Act, 2024 caps only the stamp duty under Article 33(i) at Rs 1,000. Under Article A(1) of the West Bengal Table of Fees, the registration fee stays 1% of the full market value (minimum Rs 50) with no upper cap. Minor e-Nathikaran processing charges also apply.",
  },
  {
    q: "What is the stamp duty on a non-family gift deed in Kolkata vs rural West Bengal?",
    a: "Gifts outside the family list pay Article 23 conveyance stamp duty. In urban areas like Kolkata KMC, Howrah, Salt Lake, Siliguri, and municipalities, stamp duty is 6% up to Rs 1 Crore and 7% above Rs 1 Crore. In Gram Panchayat rural areas, it is 5% up to Rs 1 Crore and 6% above Rs 1 Crore, plus 1% registration fee. West Bengal has no women's rebate.",
  },
  {
    q: "Does a gift to a son-in-law or daughter-in-law get the West Bengal family rate?",
    a: "A daughter-in-law (son's wife) is named in the Explanation to Article 33, so she gets the 0.5% duty capped at Rs 1,000. A son-in-law (daughter's husband) is excluded and pays full 5% to 7% conveyance stamp duty, even though both are tax-free relatives under Section 56(2)(x) of the Income Tax Act.",
  },
  {
    q: "Can Salt Lake 999-year leasehold plots get the Rs 1,000 Article 33(i) family gift cap?",
    a: "Be careful. In Atma Ram Saraf v. State of West Bengal (2021), the Calcutta High Court held that gifting a leasehold share is a lease transfer under Article 63 rather than freehold ownership under Article 33(i). Salt Lake owners must also check 17-clause vs 20-clause lease terms and UD&MA Nagarayan rules before filing.",
  },
  {
    q: "How do I update land or flat records on BanglarBhumi or KMC after a gift deed?",
    a: "For plots and homes outside KMC limits, apply online on banglarbhumi.gov.in for BL&LRO mutation and pay the fee on GRIPS to update your Khatian or Porcha. For flats and houses inside Kolkata Municipal Corporation limits, apply to the KMC Assessment-Collection Department with your registered Gift Deed and a tax No Outstanding Certificate.",
  },
  {
    q: "Is a Will still cheaper than a family Gift Deed in Kolkata after Section 213 repeal?",
    a: "Yes. A Will has zero stamp duty and lets you keep 100% control and edit it anytime while alive. The Repealing and Amending Act, 2025 removed Section 213 of the Indian Succession Act from December 20, 2025, ending mandatory Kolkata probate. Still, a Gift Deed gives immediate title and faster mutation when you want to transfer ownership right now.",
  },
];

function formatINR(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

export default function WestBengalGiftDeedClient() {
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
  const [deedType, setDeedType] = useState<DeedType>("gift");
  const [relation, setRelation] = useState<RelationKey>("parent_to_child");
  const [locationZone, setLocationZone] = useState<LocationZone>("urban_corp");
  const [propertyTenure, setPropertyTenure] = useState<PropertyTenure>("freehold");
  const [marketValue, setMarketValue] = useState<number>(12000000); // Rs 1.20 Crore default
  const [partitionHeirs, setPartitionHeirs] = useState<number>(3); // 3 equal co-owners -> 66.67% separated share
  const [releaseSharePct, setReleaseSharePct] = useState<number>(25); // 25% undivided share
  const [hasPriorTitle, setHasPriorTitle] = useState<boolean>(true);
  const [hasConsideration, setHasConsideration] = useState<boolean>(false);

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
    setDeedType("gift");
    setRelation("parent_to_child");
    setLocationZone("urban_corp");
    setPropertyTenure("freehold");
    setMarketValue(12000000);
    setPartitionHeirs(3);
    setReleaseSharePct(25);
    setHasPriorTitle(true);
    setHasConsideration(false);
  };

  // =========================================================================
  // WEST BENGAL STAMP DUTY & REGISTRATION CALCULATION ENGINE
  // =========================================================================
  const selectedRelation =
    RELATION_OPTIONS.find((r) => r.id === relation) || RELATION_OPTIONS[0];

  const safeMarketValue = Math.max(0, Number.isFinite(marketValue) ? marketValue : 0);
  const safeHeirs = Math.min(10, Math.max(2, partitionHeirs));
  const safeReleasePct = Math.min(100, Math.max(1, Number.isFinite(releaseSharePct) ? releaseSharePct : 25));

  // Standard WB Conveyance (Article 23) Stamp Duty Rate
  const isOverOneCrore = safeMarketValue > 10000000;
  const standardConveyanceRate =
    locationZone === "urban_corp"
      ? isOverOneCrore
        ? 0.07
        : 0.06
      : isOverOneCrore
        ? 0.06
        : 0.05;

  const standardRateLabel =
    locationZone === "urban_corp"
      ? isOverOneCrore
        ? "7% Urban (Above ₹1 Cr)"
        : "6% Urban (Up to ₹1 Cr)"
      : isOverOneCrore
        ? "6% Rural (Above ₹1 Cr)"
        : "5% Rural (Up to ₹1 Cr)";

  // Compute Assessable Value by Deed Type
  const partitionSeparatedFraction = (safeHeirs - 1) / safeHeirs;
  const assessableValue =
    deedType === "partition"
      ? Math.round(safeMarketValue * partitionSeparatedFraction)
      : deedType === "release"
        ? Math.round((safeMarketValue * safeReleasePct) / 100)
        : safeMarketValue;

  const assessableOverOneCrore = assessableValue > 10000000;
  const assessableConveyanceRate =
    locationZone === "urban_corp"
      ? assessableOverOneCrore
        ? 0.07
        : 0.06
      : assessableOverOneCrore
        ? 0.06
        : 0.05;

  let articleCited = "Article 33(i) + WB Finance Act 2024";
  let stampDuty = 0;
  let preCap2024StampDuty = Math.round(assessableValue * 0.005);
  const regFee = assessableValue > 0 ? Math.max(50, Math.round(assessableValue * 0.01)) : 0;
  let stampDutyFormula = "";
  let regFeeFormula = "1% of assessed market value (Min ₹50, No upper cap)";
  let verdictTitle = "";
  let verdictBadge = "";
  let verdictTone: "emerald" | "amber" | "rose" = "emerald";
  let legalSummary = "";
  let actionTip = "";
  let taxAlert = "";

  if (deedType === "gift") {
    if (propertyTenure === "leasehold") {
      // Calcutta HC Atma Ram Saraf v. State of WB (2021): Article 63 exposure
      articleCited = "Article 63 Risk (Atma Ram Saraf HC 2021)";
      stampDuty = Math.round(safeMarketValue * standardConveyanceRate);
      stampDutyFormula = `${Math.round(standardConveyanceRate * 100)}% under Article 63 Lease Transfer risk (${standardRateLabel})`;
      verdictTitle = "Leasehold Alert: Article 63 Risk Applies (Salt Lake / Lease Plot)";
      verdictBadge = "Atma Ram Saraf (2021)";
      verdictTone = "amber";
      legalSummary =
        "In Atma Ram Saraf v. State of West Bengal (2021), the Calcutta High Court held that gifting a leasehold share does not qualify for the Article 33(i) freehold family rate and attracts Article 63 lease assignment duty. Check UD&MA (Nagarayan) 17-clause vs 20-clause permission rules before filing.";
      actionTip =
        "Get a written e-Nathikaran assessment slip and check if a Registered Will (₹0 stamp duty) or leasehold conversion saves you lakhs.";
    } else if (selectedRelation.wbStatus === "statutory_family") {
      articleCited = "Article 33(i) + Notification No. 929-FT";
      const rawHalfPct = Math.round(safeMarketValue * 0.005);
      preCap2024StampDuty = rawHalfPct;
      stampDuty = Math.min(rawHalfPct, 1000);
      stampDutyFormula =
        rawHalfPct > 1000
          ? `0.5% (${formatINR(rawHalfPct)}) capped at ₹1,000 (WB Finance Act 2024)`
          : "0.5% of market value (below ₹1,000 cap)";
      verdictTitle = "Eligible for WB Family Gift Cap (₹1,000 Max Stamp Duty)";
      verdictBadge = stampDuty === 1000 ? "₹1,000 Cap Active" : "Concessional 0.5%";
      verdictTone = "emerald";
      legalSummary = `${selectedRelation.legalNote} Since June 15, 2024 (Notification No. 929-FT), your stamp duty stops at ₹1,000. Remember that the 1% registration fee (${formatINR(regFee)}) still applies on the full market value.`;
      actionTip =
        "A Registered Will costs ₹0 stamp duty and skips the 1% registration fee while keeping your home in your name for life.";
    } else if (selectedRelation.wbStatus === "hc_relief") {
      articleCited = "Article 33(i) + Chetan Chowdhury HC (2017)";
      const rawHalfPct = Math.round(safeMarketValue * 0.005);
      preCap2024StampDuty = rawHalfPct;
      stampDuty = Math.min(rawHalfPct, 1000);
      stampDutyFormula = `0.5% capped at ₹1,000 (Cite Chetan Chowdhury HC 2017 at ADSR)`;
      verdictTitle = "Qualifies via Calcutta High Court Relief (Attach Ruling)";
      verdictBadge = "Calcutta HC 2017 Relief";
      verdictTone = "amber";
      legalSummary = `${selectedRelation.legalNote} Without citing this judgment, an ADSR desk may try to levy ${Math.round(standardConveyanceRate * 100)}% non-family conveyance duty (${formatINR(Math.round(safeMarketValue * standardConveyanceRate))}).`;
      actionTip =
        "Carry a certified copy of Chetan Chowdhury v. State of West Bengal (W.P. 8854(W) of 2017) when submitting your e-Nathikaran query.";
    } else {
      articleCited = "Article 33(ii) = Article 23 Conveyance";
      stampDuty = Math.round(safeMarketValue * standardConveyanceRate);
      stampDutyFormula = `${Math.round(standardConveyanceRate * 100)}% full conveyance duty (${standardRateLabel}; No cap)`;
      verdictTitle = "Non-Family Rate Applies (Full Conveyance Duty)";
      verdictBadge = `${Math.round(standardConveyanceRate * 100)}% + 1% Uncapped`;
      verdictTone = "rose";
      legalSummary = `${selectedRelation.legalNote} West Bengal has zero gender rebate and ended its 2% temporary rebate on June 30, 2024. You pay ${Math.round(standardConveyanceRate * 100)}% stamp duty plus 1% registration fee.`;
      actionTip =
        "A Registered Will costs ₹0 stamp duty even when leaving a flat to a son-in-law, cousin, niece, or close friend.";
    }
  } else if (deedType === "partition") {
    articleCited = "Schedule IA Article 45 (Partition Deed)";
    stampDuty = Math.round(assessableValue * 0.005);
    preCap2024StampDuty = stampDuty;
    stampDutyFormula = `0.5% on separated share(s) (${Math.round(partitionSeparatedFraction * 100)}% of value; largest share excluded)`;
    regFeeFormula = `1% on separated share(s) (${formatINR(assessableValue)})`;
    verdictTitle = `West Bengal Partition Deed (${safeHeirs} Equal Co-Owners)`;
    verdictBadge = "Article 45: 0.5% Separated Share";
    verdictTone = "emerald";
    legalSummary = `Under Article 45 of Schedule IA, West Bengal charges 0.5% stamp duty only on the separated shares after excluding the single largest share. For ${safeHeirs} equal co-owners, duty applies to ${safeHeirs - 1}/${safeHeirs} (${formatINR(assessableValue)}) of the property value.`;
    actionTip =
      "Ensure all co-owners sign the Partition Deed and update individual Khatian or KMC Assessee records right after registration.";
  } else {
    // Release Deed (Article 55) with ADSR reclassification checks
    if (hasConsideration) {
      articleCited = "Reclassified: Article 23 Conveyance";
      stampDuty = Math.round(assessableValue * assessableConveyanceRate);
      stampDutyFormula = `${Math.round(assessableConveyanceRate * 100)}% conveyance rate on ${safeReleasePct}% share (Money paid)`;
      regFeeFormula = `1% on ${safeReleasePct}% share (${formatINR(assessableValue)})`;
      verdictTitle = "Reclassification Alert: Money Paid Triggers Conveyance Duty";
      verdictBadge = "Article 23 Sale Duty";
      verdictTone = "rose";
      legalSummary =
        "When money changes hands in a Release Deed, West Bengal Sub-Registrars treat it as a Conveyance (sale) of the released share under Article 23. You pay full 5% to 7% stamp duty plus 1% registration fee on the share value.";
      actionTip =
        "If no cash is changing hands between co-heirs, draft a pure release without consideration or use a Partition Deed.";
    } else if (!hasPriorTitle) {
      articleCited =
        selectedRelation.wbStatus === "statutory_family"
          ? "Reclassified: Article 33(i) Gift Deed"
          : "Reclassified: Article 33(ii) Non-Family Gift";
      if (selectedRelation.wbStatus === "statutory_family" && propertyTenure === "freehold") {
        stampDuty = Math.min(Math.round(assessableValue * 0.005), 1000);
        stampDutyFormula = "Reclassified as Family Gift: 0.5% capped at ₹1,000";
        verdictTone = "amber";
      } else {
        stampDuty = Math.round(assessableValue * assessableConveyanceRate);
        stampDutyFormula = `Reclassified as Non-Family Gift: ${Math.round(assessableConveyanceRate * 100)}% on ${safeReleasePct}% share`;
        verdictTone = "rose";
      }
      regFeeFormula = `1% on ${safeReleasePct}% share (${formatINR(assessableValue)})`;
      verdictTitle = "Invalid Release: Recipient Has No Prior Co-Ownership";
      verdictBadge = "Reclassified as Gift";
      verdictTone = "amber";
      legalSummary =
        "A Release Deed under Article 55 is valid only if the recipient already holds a legal share in the exact same property. Because they hold no prior title, the ADSR reclassifies the document as a Gift Deed under Article 33.";
      actionTip =
        "Execute a proper Gift Deed under Article 33 instead of a Release Deed so your title chain stays clear for future buyers and banks.";
    } else {
      articleCited = "Schedule IA Article 55(b) (Pure Release)";
      stampDuty = assessableValue <= 1000 ? 10 : 50;
      preCap2024StampDuty = Math.round(assessableValue * 0.005);
      stampDutyFormula = "₹50 under Article 55(b) (Note: ADSR may assess ₹1,000 Art. 33(i) for immovable family shares)";
      regFeeFormula = `1% on ${safeReleasePct}% released share (${formatINR(assessableValue)})`;
      verdictTitle = "Co-Owner Release Without Consideration (Article 55(b))";
      verdictBadge = "Verify ADSR Slip";
      verdictTone = "emerald";
      legalSummary =
        "Under Schedule IA Article 55(b) of the Indian Stamp Act in West Bengal, a pure release of a pre-existing claim carries ₹50 stamp duty. However, Kolkata ADSRs closely check ancestral title deeds and may assess immovable share relinquishments under Article 33(i) (capped at ₹1,000 for listed family) plus 1% registration fee.";
      actionTip =
        "Attach the original parent deed and Warish / Legal Heir Certificate so the ADSR confirms pre-existing co-ownership.";
    }
  }

  // Tax summary text
  if (deedType === "partition") {
    taxAlert =
      "Partition of joint family property is not a taxable transfer under Section 47(i) of the Income Tax Act. Zero income tax applies at partition.";
  } else if (!selectedRelation.isIncomeTaxRelative) {
    taxAlert =
      "Income Tax Warning: This recipient is NOT an exempt relative under Section 56(2)(x). If circle value exceeds ₹50,000, the full market value is added to the recipient's taxable income.";
  } else if (selectedRelation.triggersClubbing) {
    taxAlert =
      "Tax Exempt at Gift, Clubbing Applies Later: Zero tax under Section 56(2)(x) today. Under Section 64(1), future rent or capital gains from a flat gifted to a spouse or daughter-in-law are clubbed in the donor's income.";
  } else {
    taxAlert =
      "100% Income Tax Exempt: Zero tax for both donor and recipient under Section 56(2)(x) of the Income Tax Act, 1961, regardless of property value.";
  }

  const totalCost = stampDuty + regFee;
  const standardNonFamilyTotal =
    Math.round(assessableValue * assessableConveyanceRate) +
    (assessableValue > 0 ? Math.max(50, Math.round(assessableValue * 0.01)) : 0);
  const savingsVsConveyance = Math.max(0, standardNonFamilyTotal - totalCost);
  const extraSavedBy2024Cap =
    deedType === "gift" &&
    propertyTenure === "freehold" &&
    (selectedRelation.wbStatus === "statutory_family" || selectedRelation.wbStatus === "hc_relief")
      ? Math.max(0, preCap2024StampDuty - stampDuty)
      : 0;

  const copyClauseToClipboard = () => {
    const clauseText = `SAMPLE RECITAL CLAUSE: WEST BENGAL FAMILY GIFT DEED (ARTICLE 33(i) & WB FINANCE ACT 2024)
"WHEREAS the Donor is the absolute freehold owner of the Schedule Property situated in [Kolkata KMC Ward / District / Mouza, West Bengal], acquired vide Registered Deed No. [____] of [Year] at [ARA / ADSR Office], mutated under [KMC Assessee No. / Khatian No. ____];

AND WHEREAS the Donee is the [Son / Daughter / Wife / Husband / Son's Wife / Grandchild / Brother / Sister / Parent] of the Donor and falls strictly within 'member of a family' under the Explanation to Article 33 of Schedule IA to the Indian Stamp Act, 1899 (as amended by the West Bengal Finance Act, 2024, Notification No. 929-FT);

NOW THIS DEED OF GIFT WITNESSETH that out of natural love and affection and without any monetary consideration, the Donor hereby gifts, transfers, and conveys the Schedule Property unto the Donee absolutely and forever, and the Donee hereby accepts the said Gift during the lifetime of the Donor."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `WEST BENGAL e-NATHIKARAN & ADSR DOCUMENT CHECKLIST (GIFT DEED)
1. Original Parent Title Deed (Prior Sale Deed / Mother Deed / Chain Deeds).
2. Updated Mutation Record: KMC Assessment Extract (Kolkata) OR BanglarBhumi RoR / Porcha (Khatian).
3. Latest Tax Receipt: KMC Property Tax Clearance NOC or BL&LRO Khajna (Land Revenue) Receipt.
4. Relationship Proof for Article 33(i) Family Cap: Birth Certificate, Marriage Certificate, Passport, or Aadhaar.
5. PAN Card and Aadhaar Card of Donor, Donee, and 2 adult attesting witnesses.
6. e-Nathikaran Market Value Query Slip & e-Assessment Slip from wbregistration.gov.in.
7. GRIPS Online Payment Receipt (GRN Challan) for ₹1,000 capped Stamp Duty + 1% Registration Fee.
8. For Salt Lake / Kalyani Leasehold Plots: Original Lease Deed + UD&MA (Nagarayan) Transfer / Mutation Permission.
9. Passport-size photographs of Donor, Donee, and witnesses + e-Appointment Confirmation Slip.`;
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
            <span>WB STAMP ACT SCHEDULE IA • ARTICLE 33(i) • WB FINANCE ACT 2024</span>
          </div>

          {/* Strict Single H1 Tag (43 chars, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            West Bengal Gift Deed Stamp Duty Calculator
          </h1>

          {/* Plain-English Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate your exact West Bengal Gift Deed stamp duty and wbregistration fee in seconds.
            Check the ₹1,000 family cap, 1% registration fee, urban vs rural slabs, and Will savings.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate WB Stamp Duty</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Save 1% Fee with a Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹1,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FAMILY GIFT DUTY (0.5% MAX)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">1% Reg. Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNCAPPED ON MARKET VALUE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">6% / 7% Urban</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                5% / 6% RURAL NON-FAMILY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">9 Family Ties</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STRICT ART. 33 EXPLANATION
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
              <nav
                aria-label="Table of contents"
                className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs"
              >
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
                <span>Verified WB Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Updated for West Bengal Finance Act, 2024 (Notification No. 929-FT, June 15, 2024),
                expiry of the 2% rebate on June 30, 2024, and Calcutta High Court rulings.
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
                <span>QUICK ANSWER: WEST BENGAL GIFT DEED STAMP DUTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Family Stamp Duty Is Capped at ₹1,000:</strong> Under Article 33(i),
                    family gifts charge 0.5% stamp duty. From June 15, 2024, the West Bengal Finance
                    Act, 2024 capped this duty at ₹1,000 max.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>1% Registration Fee Has No Cap:</strong> Even with the ₹1,000 stamp duty
                    cap, you still pay a 1% registration fee on the full market value on
                    wbregistration.gov.in.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Non-Family Gifts Cost 5% to 7%:</strong> Gifting to a son-in-law,
                    cousin, uncle, or friend attracts 6% to 7% urban duty or 5% to 6% rural duty
                    plus 1% registration fee.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Salt Lake Leasehold Caution:</strong> Under Calcutta High Court rules,
                    gifting a leasehold plot may draw Article 63 lease duty instead of the family
                    freehold cap.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: LEGAL FRAMEWORK (STRICTLY THE ONLY H2 ON THE PAGE) */}
            <section id="legal-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. West Bengal Gift Deed Stamp Duty &amp; Article 33 Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  West Bengal offers one of the lowest family Gift Deed stamp duties in India. The
                  rules sit in <strong>Article 33 of Schedule IA</strong> of the Indian Stamp Act,
                  1899 as amended for West Bengal.
                </p>
                <p>
                  For years, a gift of a house, flat, or plot to a close family member drew{" "}
                  <strong>0.5% stamp duty</strong> on the government market value. On June 15, 2024,
                  the <strong>West Bengal Finance Act, 2024</strong> went one step further. It
                  capped family Gift Deed stamp duty at a flat <strong>₹1,000</strong>.
                </p>
                <p>
                  Most online tools still miss two big costs. First, the{" "}
                  <strong>1% registration fee</strong> under the Registration Act, 1908 is not
                  capped. On a ₹1 Crore Kolkata flat, you pay ₹1,000 stamp duty plus ₹1,00,000 as
                  registration fee.
                </p>
                <p>
                  Second, the family list under Article 33 is strict. If you gift to someone outside
                  the nine named relations, you pay full <strong>Article 23</strong> sale deed rates
                  of 5% to 7%. Use the free calculator below to check your exact cost.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE STAMP DUTY CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>WBREGISTRATION &amp; GRIPS DUTY ESTIMATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free West Bengal Gift Deed Stamp Duty Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your deed type, family link, urban or rural area, and property value below. Get
                your instant GRIPS fee split, 2024 cap savings, and Will cost comparison.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Deed Type */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Choose West Bengal Deed Type</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "gift" as DeedType,
                        label: "Gift Deed (Article 33)",
                        desc: "Owner gifts home, flat, or plot without money out of love and affection",
                      },
                      {
                        id: "partition" as DeedType,
                        label: "Partition Deed (Article 45)",
                        desc: "Co-owners split joint home or land into clear separate shares",
                      },
                      {
                        id: "release" as DeedType,
                        label: "Release Deed (Article 55)",
                        desc: "Co-heir gives up undivided share in favor of an existing co-owner",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setDeedType(option.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
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

                {/* Step 2: Relationship Selector (For Gift and Release) */}
                {deedType !== "partition" && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Select Relationship Between Donor and Recipient</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {RELATION_OPTIONS.map((opt) => {
                        const badgeClass =
                          opt.wbStatus === "statutory_family"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : opt.wbStatus === "hc_relief"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-rose-50 text-[#C65378] border border-rose-200";
                        const badgeText =
                          opt.wbStatus === "statutory_family"
                            ? "₹1,000 Cap"
                            : opt.wbStatus === "hc_relief"
                              ? "HC Relief"
                              : "5% to 7%";
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setRelation(opt.id)}
                            className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
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
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${badgeClass}`}
                              >
                                {badgeText}
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

                {/* Step 3: Urban vs Rural & Freehold vs Leasehold */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Location Zone */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C65378]" />
                        <span>Step 3A: Urban vs Rural Area</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          {
                            id: "urban_corp" as LocationZone,
                            label: "Urban (KMC / Municipality / Corp)",
                            desc: "Kolkata, Howrah, Salt Lake, New Town, Siliguri, Durgapur, Asansol (6% / 7%)",
                          },
                          {
                            id: "rural_panchayat" as LocationZone,
                            label: "Rural (Gram Panchayat / Mouza)",
                            desc: "District panchayat homes and BL&LRO land plots outside city limits (5% / 6%)",
                          },
                        ].map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => setLocationZone(loc.id)}
                            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                              locationZone === loc.id
                                ? "border-[#C65378] bg-rose-50/50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="font-bold text-xs text-slate-900">{loc.label}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5">{loc.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tenure Type */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#C65378]" />
                        <span>Step 3B: Ownership Tenure</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          {
                            id: "freehold" as PropertyTenure,
                            label: "Freehold Flat, House, or Raiyati Land",
                            desc: "Full title under KMC, municipality, or BanglarBhumi (Gets Art. 33(i) cap)",
                          },
                          {
                            id: "leasehold" as PropertyTenure,
                            label: "Leasehold Plot (e.g., Salt Lake 999-Yr)",
                            desc: "Long-term lease under UD&MA (Triggers Article 63 HC review)",
                          },
                        ].map((ten) => (
                          <button
                            key={ten.id}
                            type="button"
                            onClick={() => setPropertyTenure(ten.id)}
                            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                              propertyTenure === ten.id
                                ? "border-[#C65378] bg-rose-50/50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="font-bold text-xs text-slate-900">{ten.label}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5">{ten.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Market Value & Conditional Partition / Release Inputs */}
                <div className="space-y-5 pt-4 border-t border-slate-100">
                  <div className="space-y-3">
                    <label
                      htmlFor="wb-market-value"
                      className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                    >
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>
                        Step 4: Property Market Value / e-Nathikaran Circle Rate (₹)
                      </span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                          ₹
                        </span>
                        <input
                          id="wb-market-value"
                          type="number"
                          min={50000}
                          max={1000000000}
                          step={100000}
                          value={marketValue}
                          onChange={(e) => setMarketValue(Number(e.target.value) || 0)}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#C65378] focus:ring-2 focus:ring-rose-100 outline-none font-extrabold text-slate-900 text-sm sm:text-base"
                        />
                      </div>
                      <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl shrink-0">
                        {formatINR(safeMarketValue)}
                      </div>
                    </div>

                    {/* Quick Preset Chips */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "₹25 Lakh", val: 2500000 },
                        { label: "₹50 Lakh", val: 5000000 },
                        { label: "₹1 Crore", val: 10000000 },
                        { label: "₹1.2 Crore", val: 12000000 },
                        { label: "₹2.5 Crore", val: 25000000 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setMarketValue(preset.val)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                            marketValue === preset.val
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
                      aria-label="West Bengal property market value slider"
                      min={500000}
                      max={100000000}
                      step={500000}
                      value={Math.min(100000000, safeMarketValue)}
                      onChange={(e) => setMarketValue(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                  </div>

                  {/* Conditional Partition Deed Inputs */}
                  {deedType === "partition" && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Number of Equal Co-Owners Splitting Property (Art. 45)
                        </span>
                        <span className="text-xs font-extrabold text-[#C65378]">
                          {safeHeirs} Co-Owners ({safeHeirs - 1}/{safeHeirs} Separated Share Assessed)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[2, 3, 4, 5, 6].map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            onClick={() => setPartitionHeirs(cnt)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                              partitionHeirs === cnt
                                ? "bg-[#172228] text-white border-[#172228]"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-rose-50"
                            }`}
                          >
                            {cnt} Equal Heirs
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Under Schedule IA Article 45, the largest remaining share is left out. Duty
                        applies to the remaining separated share value of{" "}
                        <strong>{formatINR(assessableValue)}</strong>.
                      </p>
                    </div>
                  )}

                  {/* Conditional Release Deed Inputs */}
                  {deedType === "release" && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="wb-release-share"
                            className="text-xs font-bold text-slate-900"
                          >
                            Undivided Share Being Released (%)
                          </label>
                          <span className="text-xs font-extrabold text-[#C65378]">
                            {safeReleasePct}% ({formatINR(assessableValue)})
                          </span>
                        </div>
                        <input
                          id="wb-release-share"
                          type="range"
                          min={5}
                          max={100}
                          step={5}
                          value={safeReleasePct}
                          onChange={(e) => setReleaseSharePct(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                          <div className="font-bold text-slate-900">
                            Does recipient already co-own this property?
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setHasPriorTitle(true)}
                              className={`flex-1 py-1.5 rounded-lg font-bold border cursor-pointer ${
                                hasPriorTitle
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              Yes (Co-Owner)
                            </button>
                            <button
                              type="button"
                              onClick={() => setHasPriorTitle(false)}
                              className={`flex-1 py-1.5 rounded-lg font-bold border cursor-pointer ${
                                !hasPriorTitle
                                  ? "bg-[#C65378] text-white border-[#C65378]"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              No Prior Share
                            </button>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                          <div className="font-bold text-slate-900">
                            Is any money being paid for this release?
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setHasConsideration(false)}
                              className={`flex-1 py-1.5 rounded-lg font-bold border cursor-pointer ${
                                !hasConsideration
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              No Money (₹0)
                            </button>
                            <button
                              type="button"
                              onClick={() => setHasConsideration(true)}
                              className={`flex-1 py-1.5 rounded-lg font-bold border cursor-pointer ${
                                hasConsideration
                                  ? "bg-[#C65378] text-white border-[#C65378]"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              Yes (Cash Paid)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Gradient matching Reference Page)
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
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 self-start sm:self-auto ${
                        verdictTone === "emerald"
                          ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                          : verdictTone === "amber"
                            ? "bg-amber-500/15 border-amber-400/40 text-amber-200"
                            : "bg-rose-500/20 border-rose-400/40 text-rose-200"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{verdictBadge}</span>
                    </div>
                  </div>

                  {/* 3 Core Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        WB STAMP DUTY PAYABLE
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                        {formatINR(stampDuty)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {stampDutyFormula}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        WB REGISTRATION FEE (1%)
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {formatINR(regFee)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {regFeeFormula}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TOTAL GRIPS CHALLAN COST
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-rose-300">
                        {formatINR(totalCost)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {savingsVsConveyance > 0
                          ? `Saves ${formatINR(savingsVsConveyance)} vs non-family sale rate`
                          : "Excludes minor e-Nathikaran scanning charges"}
                      </div>
                    </div>
                  </div>

                  {/* 3-Way Comparison Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        2024 CAP EXTRA SAVINGS
                      </div>
                      <div className="font-extrabold text-emerald-300 text-sm mt-0.5">
                        {extraSavedBy2024Cap > 0
                          ? `${formatINR(extraSavedBy2024Cap)} saved vs old 0.5%`
                          : "₹0 (Not under ₹1,000 cap)"}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        NON-FAMILY CONVEYANCE COST
                      </div>
                      <div className="font-extrabold text-white text-sm mt-0.5">
                        {formatINR(standardNonFamilyTotal)} ({Math.round(assessableConveyanceRate * 100)}% + 1%)
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        REGISTERED WILL OPTION
                      </div>
                      <div className="font-extrabold text-rose-200 text-sm mt-0.5">
                        ₹0 Stamp Duty (Save {formatINR(totalCost)})
                      </div>
                    </div>
                  </div>

                  {/* Detailed Legal & Tax Rationale */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>West Bengal Legal &amp; Tax Assessment:</span>
                    </div>
                    <p>{legalSummary}</p>
                    <p className="text-amber-200 text-xs">{taxAlert}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10 text-xs sm:text-sm">
                      <strong>Next Step:</strong> {actionTip}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want zero stamp duty and full lifetime control of your Kolkata home?
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleStartDraft}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Draft Will Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href="/services/gift-deed-drafting-registration"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
                      >
                        <span>Hire Gift Deed Lawyer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>WEST BENGAL FAMILY GIFT DEED STAMP DUTY OVERVIEW</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Schedule IA Art. 33</span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/west-bengal-gift-deed-stamp-duty-calculator-og.jpg"
                  alt="Bengali family reviewing West Bengal Gift Deed stamp duty rules in Kolkata"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                West Bengal caps Article 33(i) family Gift Deed stamp duty at ₹1,000 while keeping a
                separate 1% registration fee on market value.
              </p>
            </div>

            {/* SECTION 3: FAMILY ELIGIBILITY MATRIX */}
            <section id="family-eligibility" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>EXPLANATION TO ARTICLE 33</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Who Qualifies as Family Under WB Article 33
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  People often call this a &ldquo;blood relative&rdquo; concession. That is not how
                  West Bengal law works. Only the <strong>nine exact relations</strong> written in
                  the Explanation to Article 33 qualify.
                </p>
                <p>
                  Watch out for the classic Kolkata trap: a <strong>daughter-in-law</strong>{" "}
                  (son&rsquo;s wife) is listed and gets the ₹1,000 cap. A{" "}
                  <strong>son-in-law</strong> (daughter&rsquo;s husband) is not listed and pays full
                  6% to 7% urban stamp duty.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Donor to Donee Relation</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">WB Stamp Duty</th>
                      <th className="p-3.5 font-extrabold">WB Reg. Fee</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Income Tax s. 56(2)(x)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Parent to Son / Daughter</td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">100% Tax Free</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Husband and Wife (Spouse)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-amber-800 font-semibold">Free (Sec. 64 Clubbing)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Parent to Daughter-in-Law</td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-amber-800 font-semibold">Free (Sec. 64 Clubbing)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Grandparent to Grandchild
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">100% Tax Free</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Brother and Sister / Child to Parent
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">100% Tax Free</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-amber-50/40">
                      <td className="p-3.5 font-bold text-slate-900">
                        Grandson to Grandmother
                      </td>
                      <td className="p-3.5 text-amber-800 font-bold">
                        0.5% Max ₹1,000 (Calcutta HC)
                      </td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">100% Tax Free</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                      <td className="p-3.5 font-bold text-slate-900">
                        Parent to Son-in-Law (Trap)
                      </td>
                      <td className="p-3.5 text-[#C65378] font-bold">
                        5% to 7% (Excluded!)
                      </td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">100% Tax Free</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                      <td className="p-3.5 font-bold text-slate-900">
                        Uncle, Aunt, Nephew, Niece, Cousin, Friend
                      </td>
                      <td className="p-3.5 text-[#C65378] font-bold">
                        5% to 7% (No Cap)
                      </td>
                      <td className="p-3.5">1% (Uncapped)</td>
                      <td className="p-3.5 text-[#C65378] font-semibold">
                        Taxable (Check s. 56)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: WB FINANCE ACT 2024 CAP */}
            <section id="finance-act-2024" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LANDMARK 2024 STATUTORY UPDATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. WB Finance Act 2024: The ₹1,000 Stamp Duty Cap
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before June 2024, West Bengal charged an uncapped 0.5% stamp duty on family Gift
                  Deeds. On a ₹2 Crore flat in Ballygunge or Salt Lake, 0.5% came to ₹1,00,000 in
                  stamp duty alone.
                </p>
                <p>
                  <strong>Section 2(2) of the West Bengal Finance Act, 2024</strong> (West Bengal
                  Act V of 2024) amended Schedule IA Article 33(i). It added the words{" "}
                  <em>&ldquo;subject to a maximum of rupees one thousand&rdquo;</em> right after the
                  0.5% rate.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Three Key Dates Every West Bengal Owner Must Know</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>March 20, 2024:</strong> Governor gave assent to the West Bengal
                      Finance Act, 2024 (Act V of 2024).
                    </li>
                    <li>
                      <strong>June 15, 2024:</strong> Finance Department Notification No. 929-FT
                      (dated June 13, 2024) brought the ₹1,000 family stamp duty cap into force.
                    </li>
                    <li>
                      <strong>July 1, 2024:</strong> West Bengal ended its pandemic 2% stamp duty
                      rebate and 10% circle rate cut. Baseline 5% to 7% non-family rates resumed.
                    </li>
                  </ul>
                </div>
                <p>
                  Keep in mind: the 1% registration fee under Article A(1) of the West Bengal Table
                  of Fees stays uncapped. Some older guides mention 1.1% due to past fee tables and
                  minor e-deed handling charges. Always check the live e-Assessment slip on
                  wbregistration.gov.in before paying on GRIPS.
                </p>
              </div>
            </section>

            {/* SECTION 5: URBAN VS RURAL RATES */}
            <section id="urban-vs-rural" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>URBAN VS RURAL VALUATION SLABS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Urban vs Rural Rates &amp; the ₹1 Crore Surcharge
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a Gift Deed goes to a non-family member or a son-in-law, West Bengal charges
                  full Article 23 conveyance stamp duty. Two factors set your exact slab: local body
                  type and the <strong>₹1 Crore value cutoff</strong>.
                </p>
                <p>
                  If market value crosses ₹1 Crore, West Bengal adds a{" "}
                  <strong>1% surcharge</strong> on top of the base stamp duty. Unlike Delhi, UP, or
                  Rajasthan, West Bengal gives <strong>no stamp duty rebate for women</strong>.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">WB Area &amp; Value Bracket</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">Family Gift (Art. 33(i))</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Non-Family Gift (Art. 33(ii))</th>
                      <th className="p-3.5 font-extrabold">Reg. Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Urban (KMC, Howrah, BMC, Municipalities) up to ₹1 Cr
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5 text-[#C65378] font-bold">6% Stamp Duty</td>
                      <td className="p-3.5 font-semibold">1% (No Cap)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Urban (KMC, Howrah, BMC, Municipalities) above ₹1 Cr
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5 text-[#C65378] font-bold">7% (6% + 1% Surcharge)</td>
                      <td className="p-3.5 font-semibold">1% (No Cap)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Rural (Gram Panchayat / District Mouza) up to ₹1 Cr
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5 text-[#C65378] font-bold">5% Stamp Duty</td>
                      <td className="p-3.5 font-semibold">1% (No Cap)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Rural (Gram Panchayat / District Mouza) above ₹1 Cr
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5 text-[#C65378] font-bold">6% (5% + 1% Surcharge)</td>
                      <td className="p-3.5 font-semibold">1% (No Cap)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: GIFT VS RELEASE VS PARTITION VS WILL */}
            <section id="deed-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>DEED SELECTION MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Gift Deed vs Release, Partition &amp; Will in WB
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Picking the wrong deed can cost lakhs or block mutation later. Compare all four
                West Bengal family transfer options below.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Factor</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">Family Gift (Art. 33)</th>
                      <th className="p-3.5 font-extrabold">Release (Art. 55)</th>
                      <th className="p-3.5 font-extrabold">Partition (Art. 45)</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Stamp Duty</td>
                      <td className="p-3.5 font-bold text-emerald-700">0.5% (Max ₹1,000)</td>
                      <td className="p-3.5">₹50 pure release (ADSR checks co-title)</td>
                      <td className="p-3.5">0.5% on separated share(s)</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹0 Stamp Duty</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Registration Fee</td>
                      <td className="p-3.5">1% on full value</td>
                      <td className="p-3.5">1% on released share</td>
                      <td className="p-3.5">1% on separated share</td>
                      <td className="p-3.5 font-bold text-emerald-700">Nominal Book 3 Fee</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Title Transfer</td>
                      <td className="p-3.5">Immediate upon registration</td>
                      <td className="p-3.5">Immediate to co-owner</td>
                      <td className="p-3.5">Immediate separate lots</td>
                      <td className="p-3.5">Only after owner passes away</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Can You Cancel?</td>
                      <td className="p-3.5 text-[#C65378] font-semibold">
                        No (Only s. 126 TPA / s. 23)
                      </td>
                      <td className="p-3.5 text-[#C65378] font-semibold">Irrevocable once filed</td>
                      <td className="p-3.5 text-[#C65378] font-semibold">Final among co-heirs</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Yes, anytime in life</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Kolkata Probate</td>
                      <td className="p-3.5">Never needed</td>
                      <td className="p-3.5">Never needed</td>
                      <td className="p-3.5">Never needed</td>
                      <td className="p-3.5">
                        Sec. 213 repealed Dec 2025 (Optional, useful if contested)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>2025 Kolkata Probate Update:</strong> The Repealing and Amending Act, 2025
                (effective December 20, 2025) omitted Section 213 of the Indian Succession Act,
                1925. Probate is no longer a strict statutory bar for Kolkata Wills. Even so, banks
                and KMC may still ask for a Registered Will, Warish Certificate, or heir NOCs when
                mutating a flat.
              </p>
            </section>

            {/* MID-ARTICLE CONTEXTUAL INTERNAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>STILL DECIDING BETWEEN GIFT DEED AND WILL?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Compare Gift Deed vs Registered Will Costs Across India
                </div>
                <p className="text-xs text-slate-600">
                  See side-by-side stamp duty, lifetime control, probate rules, and Bengali Will
                  (Ichchapatra) drafting options.
                </p>
              </div>
              <Link
                href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Gift vs Will Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 7: SALT LAKE LEASEHOLD & CALCUTTA HIGH COURT RULINGS */}
            <section id="leasehold-rulings" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CALCUTTA HIGH COURT PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Salt Lake Leasehold &amp; Calcutta High Court Rulings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Atma Ram Saraf v. State of WB (2021)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    In WPO No. 512 of 2019 (decided January 21, 2021), a brother tried to gift his
                    share in a 999-year leasehold plot using Article 33(i). The Calcutta High Court
                    dismissed his petition. It held that leasehold rights are not full ownership, so{" "}
                    <strong>Article 63</strong> (Transfer of Lease) applies instead.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Salt Lake / Kalyani Tip:</strong> Check if your plot has a 17-clause or
                    20-clause lease deed and apply at the UD&amp;MA Land Manager office (Nagarayan,
                    Salt Lake Sector I) for intra-family transfer or mutation clearance.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Chetan Chowdhury v. State of WB (2017)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    In W.P. 8854(W) of 2017 (decided March 28, 2017), a grandson gifted property to
                    his grandmother. The registry demanded full non-family stamp duty because
                    &ldquo;grandmother&rdquo; was not named in the Article 33 text.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Court Ruling:</strong> Justice Debangsu Basak struck down the demand.
                    Because &ldquo;grandson&rdquo; is named as family, a gift from a grandson to his
                    grandmother also falls under Article 33(i) by clear family link.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP e-NATHIKARAN & GRIPS PROCESS */}
            <section id="enathikaran-steps" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>WBREGISTRATION WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step e-Nathikaran &amp; GRIPS Filing Guide
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these six official steps to register a Gift Deed in Kolkata or any West
                Bengal district and update your ownership records.
              </p>

              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "Run Market Value Query on e-Nathikaran (wbregistration.gov.in)",
                    desc: "Open E-Services on wbregistration.gov.in and enter your District, Police Station, KMC Ward or Mouza, and flat carpet area or plot size. Download the Query Number and Market Value Assessment Slip.",
                  },
                  {
                    title: "Draft the Gift Deed with Clear Family Recitals",
                    desc: "State the exact Article 33(i) family relation, parent title deed number, KMC Assessee or Khatian number, and express acceptance by the donee during the donor's lifetime under Section 122 of the Transfer of Property Act.",
                  },
                  {
                    title: "Upload e-Deed Data & Generate Assessment Slip",
                    desc: "Fill in donor, donee, witness, and property details under e-Requisition on wbregistration.gov.in. Confirm that Article 33(i) shows the ₹1,000 capped stamp duty plus 1% registration fee.",
                  },
                  {
                    title: "Pay Stamp Duty & 1% Registration Fee via GRIPS",
                    desc: "Pay both amounts online through West Bengal's Government Receipt Portal System (GRIPS) using net banking or UPI. Save the official GRN (Government Reference Number) challan receipt.",
                  },
                  {
                    title: "Book ADSR / ARA Slot & Complete Biometrics",
                    desc: "Visit the Additional Registrar of Assurances (ARA, Kolkata) or local ADSR / DSR office with the donor, donee, two adult witnesses, and original IDs for biometric thumb scans and photo capture.",
                  },
                  {
                    title: "Apply for BanglarBhumi or KMC Mutation",
                    desc: "For flats and homes inside Kolkata Municipal Corporation, apply for KMC Assessee mutation with your registered Gift Deed and tax NOC. For district plots and land, file online mutation on banglarbhumi.gov.in to update your Khatian / Porcha.",
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

            {/* SECTION 9: DOCUMENT CHECKLIST & SAMPLE RECITAL */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SRO READY CHECKLIST &amp; CLAUSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. e-Nathikaran &amp; West Bengal SRO Document Checklist
              </h3>

              {/* Checklist Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Mandatory Papers for ARA Kolkata &amp; WB ADSR Offices
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
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
                    "Original Parent Title Deed & chain deeds",
                    "KMC Assessment Extract or BanglarBhumi Porcha (RoR)",
                    "Latest KMC Tax Clearance NOC or BL&LRO Khajna receipt",
                    "Relationship proof (Birth / Marriage Cert / Passport)",
                    "PAN & Aadhaar of Donor, Donee, and 2 witnesses",
                    "e-Nathikaran Market Value Query & Assessment Slip",
                    "GRIPS GRN Challan for ₹1,000 stamp duty + 1% fee",
                    "UD&MA permission (only for Salt Lake / Kalyani lease)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Clause Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Sample Article 33(i) Family Gift Deed Recital Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
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
{`"WHEREAS the Donor is the absolute freehold owner of the Schedule Property situated in [Kolkata KMC Ward / District / Mouza, West Bengal], acquired vide Registered Deed No. [____] of [Year], mutated under [KMC Assessee / Khatian No. ____];

AND WHEREAS the Donee is the [Son / Daughter / Wife / Husband / Son's Wife / Grandchild / Brother / Sister / Parent] of the Donor and falls strictly within 'member of a family' under the Explanation to Article 33 of Schedule IA to the Indian Stamp Act, 1899 (as amended by the West Bengal Finance Act, 2024, Notification No. 929-FT);

NOW THIS DEED OF GIFT WITNESSETH that out of natural love and affection and without any monetary consideration, the Donor hereby gifts, transfers, and conveys the Schedule Property unto the Donee absolutely and forever, and the Donee hereby accepts the said Gift during the lifetime of the Donor."`}
                </pre>
              </div>
            </section>

            {/* SECTION 10: WORKED COST EXAMPLES */}
            <section id="worked-examples" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>REAL WEST BENGAL SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Cost Examples: Kolkata, Salt Lake &amp; Rural
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Example 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">South Kolkata Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      ₹1.20 Crore
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Gifts Freehold KMC Flat to Married Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Stamp Duty:</strong> 0.5% equals ₹60,000, but WB Finance Act 2024 caps
                    it at <strong>₹1,000</strong>.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Registration Fee:</strong> 1% of ₹1.20 Cr = <strong>₹1,20,000</strong>.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Total GRIPS Cost:</strong> ₹1,21,000 (Saves ₹8,39,000 vs 7% non-family
                    rate). Next step: KMC Assessee mutation.
                  </p>
                </div>

                {/* Example 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Howrah House Trap</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      ₹80 Lakh
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Mother-in-Law Gifts Home to Son-in-Law
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Why It Hurts:</strong> Son-in-law is missing from WB Article 33. Full
                    6% urban duty applies = <strong>₹4,80,000</strong>.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Registration Fee:</strong> 1% of ₹80 Lakh = <strong>₹80,000</strong>.
                  </p>
                  <p className="text-[#C65378] font-semibold leading-relaxed">
                    <strong>Total GRIPS Cost:</strong> ₹5,60,000! Gifting directly to the daughter
                    instead cuts stamp duty from ₹4,80,000 to ₹1,000.
                  </p>
                </div>

                {/* Example 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Bardhaman Plot</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[10px]">
                      ₹40 Lakh
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Rural Gram Panchayat Land Gifted to Cousin vs Sister
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>To Sister (Art. 33(i)):</strong> ₹1,000 stamp duty + ₹40,000 fee ={" "}
                    <strong>₹41,000 total</strong>.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>To Cousin (Rural 5%):</strong> ₹2,00,000 stamp duty + ₹40,000 fee ={" "}
                    <strong>₹2,40,000 total</strong> (+ Income Tax on ₹40L!).
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Post-Filing:</strong> Update Khatian online via BanglarBhumi BL&amp;LRO.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: INCOME TAX & SENIOR CITIZEN REVOCATION */}
            <section id="tax-and-revocation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>TAXATION &amp; ELDER PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Income Tax Rules &amp; Senior Citizen Revocation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-[#C65378]" />
                    <span>Income Tax Act: Section 56(2)(x) &amp; Section 64</span>
                  </div>
                  <p className="leading-relaxed">
                    Gifts of flats or land from specified relatives (parents, spouse, siblings,
                    children, grandchildren) carry <strong>zero income tax</strong> at the time of
                    transfer.
                  </p>
                  <p className="leading-relaxed">
                    Watch two rules. First, if you gift a flat to your spouse or daughter-in-law,
                    future rent is clubbed in your tax return under <strong>Section 64(1)</strong>.
                    Second, if you gift to a friend or cousin and circle value exceeds ₹50,000, they
                    pay slab-rate income tax on the full value.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Senior Citizens Act Section 23 Protection</span>
                  </div>
                  <p className="leading-relaxed">
                    Under <strong>Section 126 of the Transfer of Property Act</strong>, a registered
                    Gift Deed is normally final. Parents cannot simply walk into the Kolkata ADSR
                    and cancel it later.
                  </p>
                  <p className="leading-relaxed">
                    Senior citizens transferring a home to children must add an express maintenance
                    clause under <strong>Section 23</strong> of the Senior Citizens Act, 2007. If
                    neglected later, the Maintenance Tribunal can void the Gift Deed. Check your
                    rights with our{" "}
                    <Link
                      href="/tools/senior-citizen-section-23-gift-revocation-checker"
                      className="text-[#C65378] font-bold underline hover:text-[#a33b5c]"
                    >
                      Section 23 Gift Revocation Checker
                    </Link>
                    .
                  </p>
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
                12. Institutional Profile: WillDrafting Legal Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in West Bengal Property &amp; Estate Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Lawyers</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and succession
                  advocates draft zero-error West Bengal Gift Deeds, Partition Deeds, Release Deeds,
                  and Bengali / English Wills backed by current Calcutta High Court law. This tool
                  gives general legal estimates; confirm your final e-Assessment slip before paying
                  on GRIPS.
                </p>

                {/* Verified Service & Template Grid Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Drafting</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/will-format-bengali-ichchapatra"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Bengali Will Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Mutation Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: WB Gift Deeds
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] cursor-pointer"
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
                14. Official WB Portals &amp; Related WillDrafting Tools
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify your circle rate, GRIPS challan, and mutation records directly on official
                  West Bengal and Government of India portals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://wbregistration.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>WB e-Nathikaran (wbregistration.gov.in)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://banglarbhumi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>BanglarBhumi Land Mutation Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.kmcgov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Kolkata Municipal Corporation (KMC)</span>
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
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax Portal (Section 56(2)(x))</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related West Bengal Guides, Services &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/locations/kolkata"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Will Drafting in Kolkata
                    </Link>
                    <Link
                      href="/locations/west-bengal"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      West Bengal Succession Guide
                    </Link>
                    <Link
                      href="/services/relinquishment-deed"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Release Deed Service
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Release Deed Format
                    </Link>
                    <Link
                      href="/templates/partition-deed-format-between-family-members"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Partition Deed Format
                    </Link>
                    <Link
                      href="/templates/revocation-of-gift-deed-senior-citizens-act-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Gift Cancellation Format
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Tool
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Kolkata Probate Checker
                    </Link>
                    <Link
                      href="/services/probate-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      High Court Probate Lawyer
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain-English Bottom Summary Cards (Matches Reference Page) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Why Check WB Stamp Duty First?
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A small mistake on the recipient or lease type can raise your bill from ₹1,000 to
                  lakhs. Check your exact e-Nathikaran slab before you pay on GRIPS.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Gift Deed vs Plain Paper Will
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Gift Deed gives your flat away today and costs a 1% fee. A Will costs zero stamp
                  duty, stays in your control for life, and can be changed any day.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  How Our Legal Desk Helps
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team drafts clean West Bengal Gift Deeds, Release Deeds, and Wills in clear
                  words. We also guide you through KMC and BanglarBhumi mutation steps.
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
                Specializes in Indian property transfers, West Bengal family Gift Deeds, High Court
                probate, and dispute-free Will structuring.
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
                  <span>ZERO STAMP DUTY ALTERNATIVE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Keep Full Control of Your Kolkata Home with a Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Skip the 1% registration fee and keep 100% ownership during your lifetime. Draft a
                  legally valid Will online in 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Plain Paper Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>WEST BENGAL PROPERTY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a West Bengal Gift Deed Drafted by Lawyers?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers handle Article 33(i) Gift Deeds, Salt Lake lease checks, e-Nathikaran
                  review, and KMC or BanglarBhumi mutation advice.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Book Lawyer Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why WB Families Use WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2024 Cap Verified:</strong> Built directly on WB Finance Act, 2024
                      Notification No. 929-FT.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Calcutta HC Checks:</strong> Flags Salt Lake Article 63 lease risks
                      and son-in-law traps early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>End-to-End Clarity:</strong> Covers e-Nathikaran, GRIPS, KMC, and
                      BanglarBhumi mutation.
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
          <span>WB Calculator</span>
        </a>
        <button
          type="button"
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
