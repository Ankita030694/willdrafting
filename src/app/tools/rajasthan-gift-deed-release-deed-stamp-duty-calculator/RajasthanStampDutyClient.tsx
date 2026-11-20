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
} from "lucide-react";

type DeedType = "gift" | "release" | "settlement";

type GiftRelationKey =
  | "wife"
  | "daughter"
  | "dil_grandchild_widow"
  | "senior_parent_60"
  | "son_senior_donor_70"
  | "close_family_2_5"
  | "non_family";

type ReleaseCategoryKey =
  | "ancestral_family"
  | "self_acquired_coowner"
  | "no_preexisting_right";

type RecipientCategoryKey = "male_joint" | "sole_female" | "sc_st_bpl_female";
type SurchargeModeKey = "standard_33" | "proviso_30";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Rajasthan Gift & Release Stamp Rules" },
  { id: "interactive-calculator", label: "2. Free Rajasthan Stamp Duty Calculator" },
  { id: "gift-deed-family-rates", label: "3. Article 31 Gift Deed Family Rates" },
  { id: "release-deed-ancestral-rules", label: "4. Article 48 Release Deed & Rs 500 Rule" },
  { id: "surcharge-and-registration-fees", label: "5. 33% Surcharge & Rs 4 Lakh Fee Cap" },
  { id: "settlement-vs-gift-vs-will", label: "6. Gift vs Release vs Settlement vs Will" },
  { id: "income-tax-and-clubbing", label: "7. Income Tax Sec. 56(2)(x) & Clubbing" },
  { id: "document-checklist", label: "8. Documents Needed at Rajasthan SRO" },
  { id: "step-by-step-sop", label: "9. Step-by-Step e-Panjiyan Filing SOP" },
  { id: "practical-case-studies", label: "10. Cost Examples: Jaipur, Jodhpur, Udaipur" },
  { id: "legal-recital-templates", label: "11. Recital Clauses & Copyable Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Portals & Legal Citations" },
];

const FAQS = [
  {
    q: "What is the stamp duty on a Gift Deed to a wife or daughter in Rajasthan?",
    a: "Under Rajasthan Stamp Act rules (Notification No. F.4(2)FD/Tax/2022-115), stamp duty on a Gift Deed to a wife or daughter is 0%. Since base duty is zero, the 33% surcharge is also Rs 0. A wife pays a flat Rs 1,000 fee under spousal rules. A daughter pays a 1% fee capped at Rs 4 lakh.",
  },
  {
    q: "How much is stamp duty on a Gift Deed to a son, brother, sister, or parents?",
    a: "For a Gift Deed to a son, husband, brother, sister, or parents up to age 60, Rajasthan charges 2.5% base duty on the DLC rate. With the 33% surcharge (13% Section 3-A plus 20% Section 3-B), total stamp duty is 3.325%, plus a 1% fee capped at Rs 4 lakh. Senior parent age rebates or an Article 51 Family Settlement can cut this cost further.",
  },
  {
    q: "What is the stamp duty on a Release Deed of ancestral property in Rajasthan?",
    a: "Under Article 48(a) of the Rajasthan Stamp Act, 1998 and Notification No. F.4(2)FD/Tax/2022-110 (February 23, 2022), base stamp duty on an ancestral Release Deed among close family co-heirs without cash is Rs 500 flat. Surcharges apply only on that Rs 500 base sum, plus the SRO fee.",
  },
  {
    q: "How does Rajasthan calculate the 33% surcharge on stamp duty?",
    a: "Rajasthan adds two surcharges on top of base stamp duty, not on home value. Section 3-A adds a 13% local infrastructure surcharge (raised from 10% by Order F.4(2)FD/Tax/2026-132 on February 11, 2026). Section 3-B adds a 20% cow protection and calamity cess. Together they add 33% of base duty. If base duty is Rs 0, surcharges are Rs 0.",
  },
  {
    q: "What is the maximum registration fee cap for property deeds in Rajasthan?",
    a: "Under Section 78 of the Registration Act, 1908 in Rajasthan, the standard fee is 1% of the DLC rate of the home or released share. This fee stops at Rs 4,00,000 for homes worth over Rs 4 crore. A Will costs just Rs 100 flat. A valid Article 51 Family Settlement has Rs 0 fee.",
  },
  {
    q: "Can I use a Release Deed for self-acquired land or a relative with no prior share?",
    a: "No. Under Article 48 and the Supreme Court case Kuppuswami Chettiar v. Arumugam Chettiar (1967), a Release Deed works only when one co-owner gives up an existing share to another co-owner. If the home is self-acquired or the other person holds no share, the Rs 500 flat rate does not apply.",
  },
  {
    q: "How does a Family Settlement Deed (Article 51) compare to a Gift Deed in Rajasthan?",
    a: "Under Order No. F.4(2)FD/Tax/2024-92 (July 10, 2024), a Family Settlement Deed for a wife, son, daughter, grandchild, or daughter-in-law has 0% stamp duty and Rs 0 fee. For a father, mother, husband, brother, or sister, it costs 1.5% duty and Rs 0 fee. Always check Article 51 fit with a Rajasthan lawyer first.",
  },
  {
    q: "Is a Will cheaper than a Gift Deed or Release Deed in Rajasthan?",
    a: "Yes. In Rajasthan, a Will has Rs 0 stamp duty and only a Rs 100 flat SRO fee, plus small scan charges. Court probate is not needed in Rajasthan for Hindu, Sikh, Jain, and Buddhist Wills. You keep full title and rent for life, unlike a Gift Deed.",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function RajasthanStampDutyClient() {
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

  // Calculator Inputs
  const [deedType, setDeedType] = useState<DeedType>("gift");
  const [propertyValue, setPropertyValue] = useState<number>(8000000); // Rs 80 Lakh default
  const [propertyInputText, setPropertyInputText] = useState<string>("8000000");
  const [releasedSharePct, setReleasedSharePct] = useState<number>(50);
  const [giftRelation, setGiftRelation] = useState<GiftRelationKey>("close_family_2_5");
  const [releaseCategory, setReleaseCategory] = useState<ReleaseCategoryKey>("ancestral_family");
  const [recipientCategory, setRecipientCategory] = useState<RecipientCategoryKey>("male_joint");
  const [surchargeMode, setSurchargeMode] = useState<SurchargeModeKey>("standard_33");

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

  const handlePropertyValueChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, "");
    setPropertyInputText(clean);
    const parsed = Number(clean);
    if (!Number.isNaN(parsed)) {
      setPropertyValue(Math.min(parsed, 1000000000));
    }
  };

  const applyPresetValue = (val: number) => {
    setPropertyValue(val);
    setPropertyInputText(String(val));
  };

  const handleReset = () => {
    setDeedType("gift");
    setPropertyValue(8000000);
    setPropertyInputText("8000000");
    setReleasedSharePct(50);
    setGiftRelation("close_family_2_5");
    setReleaseCategory("ancestral_family");
    setRecipientCategory("male_joint");
    setSurchargeMode("standard_33");
  };

  // =========================================================================
  // RAJASTHAN STAMP ACT, 1998 CALCULATION ENGINE
  // =========================================================================
  const sec3ARate = surchargeMode === "standard_33" ? 0.13 : 0.10;
  const sec3BRate = 0.20;
  const totalSurchargePct = sec3ARate + sec3BRate; // 33% or 30%

  // Article 21 Conveyance Baseline Rate
  const conveyanceRate =
    recipientCategory === "sole_female"
      ? 0.05
      : recipientCategory === "sc_st_bpl_female"
      ? 0.04
      : 0.06;

  // Taxable Base Value (Full DLC for Gift/Settlement; Released Share DLC for Release Deed)
  const effectiveTaxableValue =
    deedType === "release" ? Math.round((propertyValue * releasedSharePct) / 100) : propertyValue;

  // Standard Sale Deed Reference Cost on Effective Taxable Value
  const standardSaleBaseStamp = effectiveTaxableValue * conveyanceRate;
  const standardSaleSurcharge = standardSaleBaseStamp * totalSurchargePct;
  const standardSaleRegFee = Math.min(effectiveTaxableValue * 0.01, 400000);
  const standardSaleTotal = standardSaleBaseStamp + standardSaleSurcharge + standardSaleRegFee;

  let baseStampDuty = 0;
  let baseStampLabel = "0% (Nil)";
  let registrationFee = 0;
  let registrationFeeNote = "1% of DLC value (Capped at Rs 4,00,000)";
  let resultTitle = "";
  let statutoryBadge = "";
  let legalRationale = "";
  let incomeTaxNote = "";
  let actionRecommendation = "";
  let settlementCompareTotal: number | null = null;
  let settlementCompareLabel = "";
  let isWarningCase = false;

  if (deedType === "gift") {
    if (giftRelation === "wife") {
      baseStampDuty = 0;
      baseStampLabel = "0% (Exempt under F.4(2)FD/Tax/2022-115)";
      registrationFee = 1000;
      registrationFeeNote = "Rs 1,000 flat spousal gift concession (verify code on e-Panjiyan)";
      resultTitle = "0% Stamp Duty Gift Deed to Wife (Article 31)";
      statutoryBadge = "Article 31 • 0% Spousal Exemption";
      legalRationale =
        "Rajasthan waives 100% of stamp duty when a husband gifts immovable property to his wife under Section 9(1) notifications. Because base stamp duty is Rs 0, both the Section 3-A infrastructure surcharge and Section 3-B cow cess are Rs 0.";
      incomeTaxNote =
        "Exempt from gift tax under Section 56(2)(x) of the Income Tax Act. However, Section 27 and Section 64(1)(iv) clubbing rules apply. Any rent or gain from this home is still taxed in the husband's income.";
      actionRecommendation =
        "Recite the marriage relationship clearly in the deed and carry your marriage proof and Aadhaar to the Rajasthan SRO. Check the live e-Panjiyan fee code for the Rs 1,000 spousal registration fee before paying e-GRAS.";
    } else if (giftRelation === "daughter") {
      baseStampDuty = 0;
      baseStampLabel = "0% (Exempt under F.4(2)FD/Tax/2022-115)";
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "0% Stamp Duty Gift Deed to Daughter (Article 31)";
      statutoryBadge = "Article 31 • 0% Daughter Exemption";
      legalRationale =
        "Under Rajasthan Finance Department Notification No. F.4(2)FD/Tax/2022-115, a Gift Deed in favour of a daughter attracts 0% stamp duty and Rs 0 surcharge. You only pay the Section 78 registration fee of 1% (capped at Rs 4 lakh).";
      incomeTaxNote =
        "100% tax-free under Section 56(2)(x). For an adult daughter, Section 64 clubbing does not apply, so future rent or capital gains belong to her own tax slab.";
      actionRecommendation =
        "Include clear blood-relation proof such as her birth certificate or passport showing parent names. You can also check Article 51 Family Settlement rules (F.4(2)FD/Tax/2024-92) where registration fee is Rs 0.";
      settlementCompareTotal = 0;
      settlementCompareLabel = "Article 51 Family Settlement (0% + Rs 0 fee)";
    } else if (giftRelation === "dil_grandchild_widow") {
      baseStampDuty = 0;
      baseStampLabel = "0% (Notified Family Gift Concession)";
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "0% Stamp Duty Gift Deed (Daughter-in-Law / Grandchild)";
      statutoryBadge = "Article 31 • 0% Family Relief";
      legalRationale =
        "Rajasthan extends zero base stamp duty to gifts in favour of a daughter-in-law (son's wife), grandchildren (son's or daughter's children), and eligible family widows. Since base stamp duty is Rs 0, the 33% surcharge is Rs 0.";
      incomeTaxNote =
        "Exempt from gift tax under Section 56(2)(x) because a daughter-in-law and grandchildren are specified relatives. Warning: Under Section 64(1)(vi), any rent or gain from a gift to a daughter-in-law is clubbed in the parent-in-law's income.";
      actionRecommendation =
        "Attach clear family pedigree proof (marriage certificate and birth records) on e-Panjiyan so the Sub-Registrar approves the 0% slab without raising a valuation objection.";
      settlementCompareTotal = 0;
      settlementCompareLabel = "Article 51 Family Settlement (0% + Rs 0 fee)";
    } else if (giftRelation === "senior_parent_60") {
      baseStampDuty = 0;
      baseStampLabel = "0% (Senior Parent 60+ Gift Concession)";
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "0% Stamp Duty Gift Deed to Parent Aged Above 60";
      statutoryBadge = "Article 31 • Senior Parent Relief";
      legalRationale =
        "Under Rajasthan senior-parent gift concessions, transferring immovable property to a father or mother aged above 60 years qualifies for 0% base stamp duty and Rs 0 surcharge. Standard 1% registration fee applies (capped at Rs 4 lakh).";
      incomeTaxNote =
        "100% exempt under Section 56(2)(x) as parents are lineal ascendants. No income clubbing applies on rent earned by parents.";
      actionRecommendation =
        "Carry government age proof (PAN, Aadhaar, or senior citizen card) showing the recipient parent is above 60 years on the execution date and confirm the active e-Panjiyan rebate code.";
    } else if (giftRelation === "son_senior_donor_70") {
      baseStampDuty = 0;
      baseStampLabel = "0% (Donor Parent 70+ Gift to Son)";
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "0% Stamp Duty Gift Deed to Son (Donor Aged 70+)";
      statutoryBadge = "Article 31 • 70+ Parent Relief";
      legalRationale =
        "When parents aged above 70 years gift property to their son in Rajasthan, the 0% senior-donor concession removes both base stamp duty and the 33% surcharge. You still pay the 1% registration fee (capped at Rs 4 lakh).";
      incomeTaxNote =
        "100% tax-free under Section 56(2)(x). For an adult son, income clubbing does not apply. Caution: Senior citizens should insert a clear maintenance clause under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007.";
      actionRecommendation =
        "Verify donor age proof (70+ years) on e-Panjiyan. Also compare a Registered Will (Rs 100 total fee) if the senior parent wants to retain full control and rental income for life.";
      settlementCompareTotal = 0;
      settlementCompareLabel = "Article 51 Family Settlement (0% + Rs 0 fee)";
    } else if (giftRelation === "close_family_2_5") {
      baseStampDuty = effectiveTaxableValue * 0.025;
      baseStampLabel = "2.5% Concessional Family Rate";
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "2.5% Concessional Family Gift Deed (Article 31)";
      statutoryBadge = "Article 31 • 2.5% Family Slab";
      legalRationale =
        "For gifts to a son (donor aged 70 or below), husband, brother, sister, or parents aged 60 or below, Rajasthan levies 2.5% base stamp duty on the DLC value. Adding the 33% surcharge on base duty brings stamp duty to 3.325%, plus 1% registration fee.";
      incomeTaxNote =
        "100% exempt from gift tax under Section 56(2)(x) for son, spouse, parents, and siblings. Note: If a wife gifts property to her husband, Section 64(1)(iv) clubs future income in the wife's tax return.";
      actionRecommendation =
        "Before paying 3.325% plus 1% fee, compare an Article 51 Family Settlement Deed under Notification No. F.4(2)FD/Tax/2024-92 (0% for son; 1.5% + Rs 0 fee for husband, parents, or siblings) or a Registered Will (Rs 100 fee).";
      settlementCompareTotal = effectiveTaxableValue * 0.015 * (1 + totalSurchargePct);
      settlementCompareLabel = "Art. 51 Settlement (Rs 0 for Son / 1.5% Siblings)";
    } else {
      // non_family
      isWarningCase = true;
      baseStampDuty = effectiveTaxableValue * conveyanceRate;
      baseStampLabel = `${(conveyanceRate * 100).toFixed(0)}% Standard Conveyance (Art. 21)`;
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "Full Conveyance Stamp Duty on Non-Family Gift (Art. 31)";
      statutoryBadge = "Article 31 -> Art. 21 Full Rate";
      legalRationale =
        "Gifts to cousins, nephews, nieces, uncles, aunts, friends, or outsiders get zero family rebate in Rajasthan. Under Article 31 read with Article 21, full sale-deed stamp duty (6% male/joint, 5% sole female, or 4% SC/ST/BPL female) applies plus 33% surcharge and 1% registration fee.";
      incomeTaxNote =
        "HIGH TAX ALERT: Under Section 56(2)(x) of the Income Tax Act, a non-relative recipient must pay income tax at slab rates (up to 30%+) on the entire DLC stamp duty value of the gifted property. Note that uncles/aunts (parents' siblings) are tax relatives, but cousins, nephews, nieces, and friends are NOT.";
      actionRecommendation =
        "Do NOT execute a Gift Deed to a friend, nephew, or cousin without a tax review. Bequeathing the property through a Registered Will (Rs 100 fee) is 100% exempt from both stamp duty and Section 56(2)(x) income tax.";
    }
  } else if (deedType === "release") {
    if (releaseCategory === "ancestral_family") {
      baseStampDuty = 500;
      baseStampLabel = "Rs 500 Flat (Notification F.4(2)FD/Tax/2022-110)";
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% on released share, capped at Rs 4,00,000"
          : "1% on released share DLC value (check SRO flat concessions)";
      resultTitle = "Ancestral Property Release Deed (Article 48(a))";
      statutoryBadge = "Article 48(a) • Rs 500 Flat Duty";
      legalRationale =
        "Under Article 48(a) of the Rajasthan Stamp Act read with Notification No. F.4(2)FD/Tax/2022-110 dated February 23, 2022, base stamp duty on a Release Deed of ancestral property among eligible family co-heirs without money is reduced to Rs 500 flat. Surcharges apply only on that Rs 500 base amount.";
      incomeTaxNote =
        "No capital gains tax or Section 56(2)(x) income tax applies when a co-heir relinquishes an undivided ancestral share without monetary payment in favour of blood-relative co-owners.";
      actionRecommendation =
        "Prove ancestral lineage clearly using prior Jamabandi records, death certificate of the common ancestor, and family pedigree (Vanshavali). Never write any cash consideration in the deed, or the SRO will reclassify it as a Sale Deed.";
    } else if (releaseCategory === "self_acquired_coowner") {
      isWarningCase = true;
      baseStampDuty = effectiveTaxableValue * conveyanceRate;
      baseStampLabel = `${(conveyanceRate * 100).toFixed(0)}% Conveyance Rate on Released Share (Art. 48(b))`;
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% on released share, capped at Rs 4,00,000"
          : "1% on released share DLC value (Max cap Rs 4,00,000)";
      resultTitle = "Non-Ancestral / Paid Release Deed (Article 48(b))";
      statutoryBadge = "Article 48(b) • Full Share Duty";
      legalRationale =
        "The Rs 500 relief applies strictly to ancestral property without consideration. For self-acquired co-owned property (such as a flat bought jointly by two brothers) or a release with monetary payment, Article 48(b) levies full Article 21 conveyance stamp duty on the released share value.";
      incomeTaxNote =
        "If money is paid to the outgoing co-owner, Capital Gains Tax under Section 45 applies on their released share. If no money is paid between close family members, evaluate using a family Gift Deed (Article 31) or Family Settlement (Article 51) instead.";
      actionRecommendation =
        "Do not mislabel a self-acquired flat as ancestral. If transferring a self-acquired share to a wife, daughter, or close blood relative without money, switch the calculator above to Gift Deed or Family Settlement to save lakhs.";
    } else {
      // no_preexisting_right
      isWarningCase = true;
      baseStampDuty = effectiveTaxableValue * conveyanceRate;
      baseStampLabel = `${(conveyanceRate * 100).toFixed(0)}% Reclassified Conveyance (Art. 21)`;
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% on transferred share, capped at Rs 4,00,000"
          : "1% on transferred share DLC value (Max cap Rs 4,00,000)";
      resultTitle = "Invalid Release Deed Trap: No Pre-Existing Share";
      statutoryBadge = "Legal Risk • Reclassified as Sale/Gift";
      legalRationale =
        "Under Article 48 and the Supreme Court ruling in Kuppuswami Chettiar v. Arumugam Chettiar (1967), a Release Deed only enlarges an existing co-owner's title. If the recipient does not already co-own the property, the Collector (Stamps) will impound the deed and charge full Conveyance duty plus penalty.";
      incomeTaxNote =
        "If the recipient is not a defined relative under Section 56(2)(x), transferring a share without payment also triggers heavy income tax on the DLC stamp value.";
      actionRecommendation =
        "Use a Gift Deed (Article 31) for close family members, a Family Settlement (Article 51) where eligible, or a Sale Deed (Article 21) for outsiders. Never use a Release Deed for someone who has no existing ownership share.";
    }
  } else {
    // Family Settlement (Article 51) under Notification F.4(2)FD/Tax/2024-92 (July 10, 2024)
    if (
      giftRelation === "wife" ||
      giftRelation === "daughter" ||
      giftRelation === "dil_grandchild_widow" ||
      giftRelation === "son_senior_donor_70"
    ) {
      baseStampDuty = 0;
      baseStampLabel = "0% (Notification F.4(2)FD/Tax/2024-92)";
      registrationFee = 0;
      registrationFeeNote = "Rs 0 Registration Fee under July 10, 2024 Notification";
      resultTitle = "0% Duty & Rs 0 Fee Family Settlement (Article 51)";
      statutoryBadge = "Article 51 • July 2024 Order";
      legalRationale =
        "Under Rajasthan Finance Department Notification No. F.4(2)FD/Tax/2024-92 dated July 10, 2024, an instrument of Family Settlement in favour of a wife, son, daughter, son's children, daughter's children, or daughter-in-law attracts 0% stamp duty and Rs 0 registration fee.";
      incomeTaxNote =
        "Bona fide family settlements among blood relatives are exempt under Section 56(2)(x) and generally do not trigger capital gains tax under Supreme Court precedent (Kale v. Deputy Director of Consolidation, 1976).";
      actionRecommendation =
        "Draft the Family Settlement Deed carefully with a Rajasthan property advocate so it meets Article 51 statutory wording on e-Panjiyan and avoids being reclassified as a standard Gift Deed.";
    } else if (giftRelation === "senior_parent_60" || giftRelation === "close_family_2_5") {
      baseStampDuty = effectiveTaxableValue * 0.015;
      baseStampLabel = "1.5% (Notification F.4(2)FD/Tax/2024-92)";
      registrationFee = 0;
      registrationFeeNote = "Rs 0 Registration Fee under July 10, 2024 Notification";
      resultTitle = "1.5% Duty & Rs 0 Fee Family Settlement (Article 51)";
      statutoryBadge = "Article 51 • 1.5% + Rs 0 Fee";
      legalRationale =
        "Under Notification No. F.4(2)FD/Tax/2024-92 dated July 10, 2024, a Family Settlement in favour of father, mother, husband, brother, or sister attracts 1.5% base stamp duty plus 33% surcharge on base duty, with Rs 0 registration fee. Note: If the sole recipient is a son, the 0% tier applies under this same notification.";
      incomeTaxNote =
        "Parents, spouse, and siblings are all specified relatives under Section 56(2)(x) of the Income Tax Act, making receipt exempt from gift tax.";
      actionRecommendation =
        "Compare this 1.5% + Rs 0 registration fee settlement cost against the 2.5% + 1% registration fee Gift Deed cost. For a son alone, Article 51 drops both stamp duty and registration fee to Rs 0.";
    } else {
      isWarningCase = true;
      baseStampDuty = effectiveTaxableValue * conveyanceRate;
      baseStampLabel = `${(conveyanceRate * 100).toFixed(0)}% Standard Conveyance (Outside Family)`;
      registrationFee = Math.min(effectiveTaxableValue * 0.01, 400000);
      registrationFeeNote =
        effectiveTaxableValue > 40000000
          ? "1% capped at Rs 4,00,000 maximum limit"
          : "1% of DLC market value (Max cap Rs 4,00,000)";
      resultTitle = "Not Eligible for Article 51 Family Settlement Relief";
      statutoryBadge = "Outside Defined Family List";
      legalRationale =
        "Notification No. F.4(2)FD/Tax/2024-92 strictly limits Family Settlement relief to father, mother, husband, wife, brother, sister, son, daughter, grandchildren, and daughter-in-law. Outsiders or extended relatives pay full Article 21 conveyance rates.";
      incomeTaxNote =
        "A transfer without money to a non-relative triggers income tax on the full DLC value under Section 56(2)(x).";
      actionRecommendation =
        "Use a Registered Will (Rs 100 fee) for tax-free and stamp-duty-free inheritance to extended relatives or friends after your lifetime.";
    }
  }

  const sec3ASurcharge = baseStampDuty * sec3ARate;
  const sec3BSurcharge = baseStampDuty * sec3BRate;
  const totalSurcharge = sec3ASurcharge + sec3BSurcharge;
  const totalStampWithSurcharge = baseStampDuty + totalSurcharge;
  const totalPayable = totalStampWithSurcharge + registrationFee;
  const effectivePct =
    effectiveTaxableValue > 0 ? ((totalPayable / effectiveTaxableValue) * 100).toFixed(2) : "0.00";
  const savingsVsSale = Math.max(0, standardSaleTotal - totalPayable);

  const showGenderSelector =
    (deedType === "gift" && giftRelation === "non_family") ||
    (deedType === "release" && releaseCategory !== "ancestral_family") ||
    (deedType === "settlement" && giftRelation === "non_family");

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE FOR RAJASTHAN GIFT DEED (ARTICLE 31) / RELEASE DEED (ARTICLE 48)

[A. FAMILY GIFT DEED RECITAL - RAJASTHAN STAMP ACT ARTICLE 31]
"Out of natural love and affection, without any monetary consideration, the Donor [Name], residing at [Rajasthan Address], hereby voluntarily gifts, conveys, and transfers 100% of his/her absolute, self-acquired title in the Schedule Property (DLC Value Rs [Amount]) unto the Donee [Name], who is the Donor's [Wife / Daughter / Son / Father / Mother]. The Donee hereby accepts the gift during the lifetime of the Donor under Section 122 and Section 123 of the Transfer of Property Act, 1882. This instrument qualifies for family stamp duty concession under Section 9(1) notifications of the Rajasthan Stamp Act, 1998."

[B. ANCESTRAL RELEASE DEED (HAQ TYAG PATRA) RECITAL - ARTICLE 48(a)]
"Whereas the Schedule Property is undivided ancestral property inherited from late [Common Ancestor Name], who died intestate on [Date], leaving the Releasor and Releasee as joint co-heirs. Out of natural love and without receiving any monetary consideration, the Releasor hereby irrevocably releases and relinquishes his/her undivided [Share %] interest in favour of the Releasee [Name & Relation] under Article 48(a) of the Rajasthan Stamp Act, 1998 read with Finance Department Notification No. F.4(2)FD/Tax/2022-110."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `RAJASTHAN SRO DOCUMENT CHECKLIST (GIFT DEED & RELEASE DEED)
1. Drafted Gift Deed (Daan Patra) or Release Deed (Haq Tyag Patra) with accurate property boundaries and relationship recital.
2. Original Title Chain: Previous registered Sale Deed, JDA / UIT Lease Patta, or Allotment Letter.
3. Latest Jamabandi Nakal (issued within 30 days via Apna Khata) for rural / agricultural land.
4. Section 90A Conversion Order (if agricultural land was converted for residential or commercial use).
5. Approved Site Map / Layout Plan and latest Urban Development (UD) Tax / Municipal House Tax receipt.
6. Non-Encumbrance Certificate (NEC) confirming no active bank mortgage or court attachment.
7. PAN Card, Aadhaar Card, and 2 passport photos of Donor/Releasor, Donee/Releasee, and 2 witnesses.
8. Official Relationship Proof (Marriage Certificate, Birth Certificate, Ration Card, or Pedigree Affidavit) + Senior Age Proof (if claiming 60+ or 70+ relief).
9. For Ancestral Release Deed: Death Certificate of common ancestor and Vanshavali / Legal Heir proof.
10. e-Panjiyan Citizen Reference Number (CRN) slip and e-GRAS payment challan receipts.`;
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
            <span>RAJASTHAN STAMP ACT, 1998 • ART. 31, ART. 48 &amp; SEC. 3-A/3-B</span>
          </div>

          {/* Strict Single H1 Tag (51 characters, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Rajasthan Gift &amp; Release Deed Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact Rajasthan stamp duty for family Gift Deeds (Article 31) and ancestral
            Release Deeds (Article 48). Check 0% to 2.5% family slabs, the flat Rs 500 ancestral
            relief, the 33% surcharge stack, and e-Panjiyan registration fees.
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
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Will (Rs 100 Reg. Fee)</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% - 2.5%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ART. 31 FAMILY GIFT DUTY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 500 Flat</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ART. 48(a) ANCESTRAL RELEASE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">33% Surcharge</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                13% SEC. 3-A + 20% SEC. 3-B
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 4 Lakh Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                1% REGISTRATION FEE CEILING
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
                <span>Rajasthan Stamp Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on the Rajasthan Stamp Act, 1998 (Act No. 14 of 1999), Finance Department
                orders F.4(2)FD/Tax/2022-110, 2022-115, 2024-92, and 2026-132.
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
                <span>QUICK SUMMARY: RAJASTHAN GIFT &amp; RELEASE DEED CHARGES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>0% Gift Duty for Wife &amp; Daughter:</strong> Rajasthan waives base
                    stamp duty on Gift Deeds to a wife, daughter, daughter-in-law, or grandchild.
                    Because base duty is zero, the 33% surcharge is also Rs 0.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>2.5% Family Gift Slab:</strong> Gifts to a son (donor up to age 70),
                    husband, brother, sister, or parents up to age 60 pay 2.5% base duty. Adding the
                    33% surcharge makes effective stamp duty 3.325%, plus 1% registration fee.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rs 500 Flat Ancestral Release Deed:</strong> Under Article 48(a) and
                    Notification F.4(2)FD/Tax/2022-110, co-heirs releasing an undivided share in
                    ancestral land without money pay just Rs 500 base stamp duty.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>2026 Surcharge &amp; Fee Cap:</strong> On February 11, 2026, Notification
                    F.4(2)FD/Tax/2026-132 raised Section 3-A surcharge from 10% to 13%. Combined with
                    20% Section 3-B cow cess, total surcharge is 33% of base stamp duty. General
                    registration fee is 1%, capped at Rs 4,00,000.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Rajasthan Gift &amp; Release Deed Stamp Duty Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Home and land transfers inside Rajasthan families follow the{" "}
                  <strong>Rajasthan Stamp Act, 1998</strong> (Act No. 14 of 1999) and the{" "}
                  <strong>Registration Act, 1908</strong>. Any deed for land or a home worth over Rs
                  100 must be in writing, stamped, and filed at the local SRO via e-Panjiyan.
                </p>
                <p>
                  Do not mix up central Stamp Act numbers with Rajasthan Schedule numbers. In
                  Rajasthan, a <strong>Gift Deed (Daan Patra)</strong> comes under{" "}
                  <strong>Article 31</strong>. A <strong>Release Deed (Haq Tyag Patra)</strong>{" "}
                  comes under <strong>Article 48</strong>, and a{" "}
                  <strong>Family Settlement Deed</strong> comes under <strong>Article 51</strong>.
                </p>
                <p>
                  By default, Article 31 links gift duty to a sale deed under{" "}
                  <strong>Article 21</strong> (6% for men and 5% for sole women). Still, the state
                  uses <strong>Section 9(1)</strong> orders to cut family rates down to 0%, 2.5%, or
                  Rs 500 flat based on relation and land type.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE STAMP DUTY ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Rajasthan Gift &amp; Release Duty Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your deed type, enter the DLC market value, and choose the family relation
                below. See your exact base stamp duty, 33% surcharge split, registration fee, and
                Will savings right away.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Instrument Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Rajasthan Deed Instrument</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "gift",
                        label: "Gift Deed (Article 31)",
                        desc: "Daan Patra: Transfer separate or self-acquired property without money",
                      },
                      {
                        id: "release",
                        label: "Release Deed (Article 48)",
                        desc: "Haq Tyag Patra: Co-heir giving up an existing share to another co-owner",
                      },
                      {
                        id: "settlement",
                        label: "Family Settlement (Art. 51)",
                        desc: "Compare July 2024 notification savings (0% / 1.5% + Rs 0 fee)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDeedType(opt.id as DeedType)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          deedType === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Property DLC Value (+ Share % for Release Deed) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label
                      htmlFor="rajasthan-dlc-value"
                      className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                    >
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>
                        Step 2: Enter Total Property DLC / Market Value (in INR)
                      </span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                          Rs
                        </span>
                        <input
                          id="rajasthan-dlc-value"
                          type="text"
                          inputMode="numeric"
                          value={propertyInputText}
                          onChange={(e) => handlePropertyValueChange(e.target.value)}
                          placeholder="e.g. 8000000"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#C65378] focus:ring-2 focus:ring-rose-200 outline-none font-bold text-slate-900 text-sm sm:text-base"
                        />
                      </div>
                      <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 shrink-0">
                        Value: <span className="text-slate-900">{formatINR(propertyValue)}</span>
                      </div>
                    </div>

                    {/* Quick Preset Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { label: "Rs 25 Lakh", val: 2500000 },
                        { label: "Rs 50 Lakh", val: 5000000 },
                        { label: "Rs 80 Lakh", val: 8000000 },
                        { label: "Rs 1.5 Crore", val: 15000000 },
                        { label: "Rs 5 Crore (Tests Rs 4L Cap)", val: 50000000 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => applyPresetValue(preset.val)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                            propertyValue === preset.val
                              ? "bg-[#172228] text-white border-[#172228]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50 hover:border-rose-200"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Share Being Released (Only for Release Deed) */}
                  {deedType === "release" && (
                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span className="uppercase tracking-wider flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#C65378]" />
                          <span>Share Being Relinquished by Releasor (%)</span>
                        </span>
                        <span className="text-[#C65378] font-black">
                          {releasedSharePct}% = {formatINR(effectiveTaxableValue)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "25% (1/4th Share)", pct: 25 },
                          { label: "33.33% (1/3rd Share)", pct: 33.33 },
                          { label: "50% (1/2 Share)", pct: 50 },
                          { label: "66.67% (2/3rd Share)", pct: 66.67 },
                          { label: "75% (3/4th Share)", pct: 75 },
                        ].map((shareOpt) => (
                          <button
                            key={shareOpt.pct}
                            type="button"
                            onClick={() => setReleasedSharePct(shareOpt.pct)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                              releasedSharePct === shareOpt.pct
                                ? "bg-rose-50 text-[#C65378] border-[#C65378]"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {shareOpt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3: Relationship / Property Category */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>
                      {deedType === "release"
                        ? "Step 3: Select Property Nature & Co-Owner Status"
                        : "Step 3: Select Relationship Between Donor & Recipient"}
                    </span>
                  </label>

                  {deedType !== "release" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        {
                          id: "wife",
                          label: "Husband to Wife",
                          desc: "0% stamp duty (F.4(2)FD/Tax/2022-115) + Rs 1,000 spousal fee",
                        },
                        {
                          id: "daughter",
                          label: "To Daughter",
                          desc: "0% stamp duty (F.4(2)FD/Tax/2022-115) + 1% registration fee",
                        },
                        {
                          id: "dil_grandchild_widow",
                          label: "Daughter-in-Law / Grandchild",
                          desc: "0% stamp duty for son's wife, grandchildren, or family widow",
                        },
                        {
                          id: "senior_parent_60",
                          label: "To Father / Mother (Age 60+)",
                          desc: "0% stamp duty under senior-parent gift relief + 1% reg. fee",
                        },
                        {
                          id: "son_senior_donor_70",
                          label: "To Son (Parents Aged 70+)",
                          desc: "0% stamp duty when donor parent is above 70 years + 1% fee",
                        },
                        {
                          id: "close_family_2_5",
                          label: "Son (<=70), Husband, Sibling, Parent",
                          desc: "2.5% base stamp duty + 33% surcharge (or Art. 51 settlement)",
                        },
                        {
                          id: "non_family",
                          label: "Extended Relative / Non-Relative",
                          desc: "Nephew, cousin, uncle, friend: full 4% to 6% conveyance rate",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setGiftRelation(opt.id as GiftRelationKey)}
                          className={`text-left p-3.5 rounded-2xl border transition-all ${
                            giftRelation === opt.id
                              ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                            {opt.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "ancestral_family",
                          label: "Ancestral Property (Art. 48(a))",
                          desc: "Eligible family co-heirs releasing share without money (Rs 500 flat)",
                        },
                        {
                          id: "self_acquired_coowner",
                          label: "Self-Acquired / Paid (Art. 48(b))",
                          desc: "Jointly bought flat or release with payment: full duty on share",
                        },
                        {
                          id: "no_preexisting_right",
                          label: "No Pre-Existing Share",
                          desc: "Recipient is not an existing co-owner (Reclassified as Conveyance)",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setReleaseCategory(opt.id as ReleaseCategoryKey)}
                          className={`text-left p-3.5 rounded-2xl border transition-all ${
                            releaseCategory === opt.id
                              ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                            {opt.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Step 4: Recipient Gender Category (for Art. 21 Comparison / Full Rate) & Surcharge Toggle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>
                        {showGenderSelector
                          ? "Step 4: Recipient Gender / Category (Sets Base Rate)"
                          : "Benchmark Sale Rate Category (For Savings Check)"}
                      </span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        {
                          id: "male_joint",
                          label: "Male or Joint Owners (6% Art. 21 Base)",
                        },
                        {
                          id: "sole_female",
                          label: "Sole Female Recipient (5% Art. 21 Base)",
                        },
                        {
                          id: "sc_st_bpl_female",
                          label: "SC / ST / BPL Female or 40%+ Disabled (4% Base)",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRecipientCategory(opt.id as RecipientCategoryKey)}
                          className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            recipientCategory === opt.id
                              ? "border-[#C65378] bg-rose-50/50 text-slate-900"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>Rajasthan Surcharge Stack (Sec. 3-A + Sec. 3-B)</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        {
                          id: "standard_33",
                          label: "2026 Standard 33% Stack (13% Sec. 3-A + 20% Sec. 3-B)",
                          desc: "Per Notification No. F.4(2)FD/Tax/2026-132 dated Feb 11, 2026",
                        },
                        {
                          id: "proviso_30",
                          label: "Proviso 30% Stack (10% Sec. 3-A + 20% Sec. 3-B)",
                          desc: "Applies only to specified lower-tier instruments under Sec. 3-A proviso",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSurchargeMode(opt.id as SurchargeModeKey)}
                          className={`text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                            surchargeMode === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

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
                    DYNAMIC RESULTS CARD (Brand Navy Dashboard)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        RAJASTHAN STAMP DUTY &amp; E-PANJIYAN FEE BREAKDOWN
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {resultTitle}
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 self-start sm:self-auto ${
                        isWarningCase
                          ? "bg-amber-500/20 border-amber-400/40 text-amber-200"
                          : "bg-white/10 border-white/20 text-white"
                      }`}
                    >
                      {isWarningCase ? (
                        <AlertTriangle className="w-4 h-4 text-amber-300" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                      <span>{statutoryBadge}</span>
                    </div>
                  </div>

                  {/* 4 Financial Breakdown Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        BASE STAMP DUTY
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white">
                        {formatINR(baseStampDuty)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {baseStampLabel}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        SURCHARGE ({(totalSurchargePct * 100).toFixed(0)}% OF DUTY)
                      </div>
                      <div className="text-lg sm:text-xl font-black text-rose-200">
                        {formatINR(totalSurcharge)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        Sec. 3-A: {formatINR(sec3ASurcharge)} | Sec. 3-B:{" "}
                        {formatINR(sec3BSurcharge)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        REGISTRATION FEE (SEC. 78)
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white">
                        {formatINR(registrationFee)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {registrationFeeNote}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        TOTAL E-GRAS PAYABLE
                      </div>
                      <div className="text-lg sm:text-xl font-black text-emerald-300">
                        {formatINR(totalPayable)}
                      </div>
                      <div className="text-[11px] text-emerald-100 leading-snug">
                        {effectivePct}% of {formatINR(effectiveTaxableValue)} (+ ~Rs 200 CSI)
                      </div>
                    </div>
                  </div>

                  {/* Smart Comparison Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          SAVINGS VS SALE DEED
                        </div>
                        <div className="text-sm font-black text-emerald-300 mt-0.5">
                          {formatINR(savingsVsSale)}
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">
                        Sale Total: {formatINR(standardSaleTotal)}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          REGISTERED WILL (RAJASTHAN)
                        </div>
                        <div className="text-sm font-black text-white mt-0.5">Rs 100 Flat</div>
                      </div>
                      <div className="text-[10px] text-rose-200 font-semibold text-right">
                        Rs 0 Stamp Duty + No Probate
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          {settlementCompareTotal !== null
                            ? "FAMILY SETTLEMENT OPTION"
                            : "TAXABLE DLC BASE"}
                        </div>
                        <div className="text-sm font-black text-white mt-0.5">
                          {settlementCompareTotal !== null
                            ? formatINR(settlementCompareTotal)
                            : formatINR(effectiveTaxableValue)}
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-300 text-right">
                        {settlementCompareTotal !== null
                          ? settlementCompareLabel
                          : deedType === "release"
                          ? `${releasedSharePct}% Released Share`
                          : "100% Property DLC"}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Legal & Income Tax Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Statutory Basis &amp; Legal Rationale:</span>
                    </div>
                    <p>{legalRationale}</p>
                    <div className="pt-2 border-t border-white/10 text-amber-200">
                      <strong>Income Tax &amp; Clubbing Check:</strong> {incomeTaxNote}
                    </div>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Next Step:</strong> {actionRecommendation}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want Rs 0 stamp duty and full lifetime control? Register a clear Will in
                      Rajasthan for Rs 100.
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 shrink-0"
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
                  <span>RAJASTHAN PROPERTY TRANSFER VISUAL GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Rajasthan Stamp Act, 1998
                </span>
              </div>
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/rajasthan-gift-deed-release-deed-stamp-duty-calculator-og.jpg"
                  alt="Rajasthan family reviewing Gift and Release Deed stamp duty in Jaipur"
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Planning family property transfers across Jaipur, Jodhpur, Udaipur, and Kota under
                Article 31 (Gift Deed), Article 48 (Release Deed), and Article 51 (Family
                Settlement).
              </p>
            </div>

            {/* SECTION 3: ARTICLE 31 GIFT DEED FAMILY RATES */}
            <section id="gift-deed-family-rates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>ARTICLE 31 &amp; SECTION 9(1) NOTIFICATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 31 Gift Deed Rates for Rajasthan Families
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under <strong>Article 31</strong> of the Rajasthan Stamp Act, 1998, a Gift Deed
                  transfers ownership without any money. Even though no price is paid, the state
                  values the property at the local <strong>DLC (District Level Committee) rate</strong>.
                </p>
                <p>
                  The Rajasthan Finance Department grants major stamp duty relief to close family
                  members through Section 9(1) orders (such as{" "}
                  <strong>Notification No. F.4(2)FD/Tax/2022-115</strong>). Check the exact rate
                  matrix below before buying e-stamps.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white mt-2">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 font-extrabold">Donee (Recipient)</th>
                        <th className="p-3.5 font-extrabold text-emerald-300">Base Stamp Duty</th>
                        <th className="p-3.5 font-extrabold text-rose-200">
                          With 33% Surcharge
                        </th>
                        <th className="p-3.5 font-extrabold">Registration Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Wife (from Husband)</td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Nil)</td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Rs 0)</td>
                        <td className="p-3.5">Rs 1,000 flat (concessional spousal order)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Daughter, Daughter-in-Law, Grandchildren, Widow
                        </td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Nil)</td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Rs 0)</td>
                        <td className="p-3.5">1% of DLC value (Cap Rs 4,00,000)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Father / Mother (Age Above 60)
                        </td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Nil)</td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Rs 0)</td>
                        <td className="p-3.5">1% of DLC value (Cap Rs 4,00,000)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Son (Donor Parents Aged Above 70)
                        </td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Nil)</td>
                        <td className="p-3.5 text-emerald-800 font-bold">0% (Rs 0)</td>
                        <td className="p-3.5">1% of DLC value (Cap Rs 4,00,000)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Son (Donor &lt;=70), Husband, Brother, Sister, Parents (&lt;=60)
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">2.5%</td>
                        <td className="p-3.5 font-bold text-[#C65378]">3.325%</td>
                        <td className="p-3.5">1% of DLC value (Cap Rs 4,00,000)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Non-Family / Extended Relatives (Cousin, Nephew, Friend)
                        </td>
                        <td className="p-3.5 text-rose-700 font-bold">
                          6% Male / 5% Female / 4% SC-ST-BPL Female
                        </td>
                        <td className="p-3.5 text-rose-700 font-bold">
                          7.98% / 6.65% / 5.32%
                        </td>
                        <td className="p-3.5">1% of DLC value (Cap Rs 4,00,000)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Proviso to Article 31: Revocation Clauses Do Not Cut Duty</span>
                  </div>
                  <p className="leading-relaxed">
                    Under the proviso to Article 31, adding a revocation clause does not reduce the
                    property value for stamp duty. The SRO always values the full DLC market rate.
                    Also, under Section 123 of the Transfer of Property Act, a Gift Deed must be
                    signed by two witnesses, accepted during the donor&rsquo;s lifetime, and
                    registered.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: ARTICLE 48 RELEASE DEED RULES */}
            <section id="release-deed-ancestral-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>HAQ TYAG PATRA &amp; SUPREME COURT LAW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Article 48 Release Deed Rules &amp; Rs 500 Relief
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A <strong>Release Deed</strong> (locally called <em>Haq Tyag Patra</em> or
                  Relinquishment Deed) is used when one co-owner gives up their share in joint
                  property to another co-owner. In Rajasthan, <strong>Article 48</strong> splits
                  Release Deeds into two strict legal groups.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                    <div className="font-black uppercase tracking-wider text-[11px] text-emerald-700">
                      ARTICLE 48(a): ANCESTRAL PROPERTY
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      Rs 500 Flat Base Stamp Duty
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Under <strong>Notification No. F.4(2)FD/Tax/2022-110</strong> (dated February
                      23, 2022, superseding 2021-275), Rajasthan cut base stamp duty on ancestral
                      Release Deeds among eligible family co-heirs to a flat <strong>Rs 500</strong>.
                      No money may be paid to the outgoing co-heir.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      ARTICLE 48(b): SELF-ACQUIRED OR PAID RELEASE
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      Full Article 21 Conveyance Rate on Share
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      If the flat or plot was bought jointly with personal income, or if money is
                      paid to buy out a sibling&rsquo;s share, Article 48(b) applies. You pay full
                      Conveyance duty (6% male / 5% female + 33% surcharge) on the{" "}
                      <strong>released share value</strong> only.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Eligible Relatives &amp; Kuppuswami Chettiar (1967 SC) Rule</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Article 48(a), concessional ancestral release applies among father, mother,
                    son, daughter, brother, sister, spouse, grandchildren of predeceased children,
                    father&rsquo;s sister, predeceased brother&rsquo;s son, mother&rsquo;s brother,
                    and sister&rsquo;s children. Under{" "}
                    <em>Kuppuswami Chettiar v. A.S.P.A. Arumugam Chettiar</em> (1967 SC), a Release
                    Deed can only enlarge a <strong>pre-existing co-ownership right</strong>. An
                    unregistered Release Deed cannot prove title in Rajasthan courts.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: 33% SURCHARGE & REGISTRATION FEE CAPS */}
            <section id="surcharge-and-registration-fees" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTIONS 3-A, 3-B &amp; SECTION 78 RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. 33% Surcharge &amp; e-Panjiyan Registration Fee Caps
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many property owners miscalculate Rajasthan costs because they add 33% directly to
                  the home value. In fact, Rajasthan surcharges apply only as a percentage of your{" "}
                  <strong>base stamp duty amount</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 3-A (13%)
                    </div>
                    <div className="font-bold text-slate-900">Infrastructure Surcharge</div>
                    <p className="text-slate-600 leading-relaxed">
                      Funds urban bodies and rural Panchayats. Raised from 10% to{" "}
                      <strong>13%</strong> via Notification{" "}
                      <strong>F.4(2)FD/Tax/2026-132</strong> on February 11, 2026.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 3-B (20%)
                    </div>
                    <div className="font-bold text-slate-900">Cow &amp; Calamity Surcharge</div>
                    <p className="text-slate-600 leading-relaxed">
                      Levied at <strong>20%</strong> of base stamp duty for cow conservation and
                      disaster relief. Combined with Section 3-A, total surcharge equals{" "}
                      <strong>33% of base stamp duty</strong>.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 78 (1% / Cap)
                    </div>
                    <div className="font-bold text-slate-900">Registration Fee Ceiling</div>
                    <p className="text-slate-600 leading-relaxed">
                      Standard fee is <strong>1% of DLC value</strong>, capped at{" "}
                      <strong>Rs 4,00,000</strong> for properties above Rs 4 crore. Spousal gifts
                      (Rs 1,000), Art. 51 settlements (Rs 0), and Wills (Rs 100) cost far less.
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Simple math check:</strong> On a Rs 1 crore gift to a son (donor under
                  70), base duty is 2.5% (Rs 2,50,000). The 33% surcharge is 33% of Rs 2,50,000
                  (Rs 82,500). Registration fee is 1% (Rs 1,00,000). Total e-GRAS payment equals{" "}
                  <strong>Rs 4,32,500</strong> (4.325% total).
                </p>
              </div>
            </section>

            {/* SECTION 6: 4-WAY LEGAL COMPARISON TABLE */}
            <section id="settlement-vs-gift-vs-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>STRATEGIC ESTATE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Comparison: Gift vs Release vs Settlement vs Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare Rajasthan stamp duty, registration fees, timing of transfer, and control
                across all four legal options before signing a deed.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Factor</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Gift Deed (Art. 31)</th>
                      <th className="p-3.5 font-extrabold">Release Deed (Art. 48)</th>
                      <th className="p-3.5 font-extrabold text-amber-200">
                        Family Settlement (Art. 51)
                      </th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Registered Will
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Stamp Duty</td>
                      <td className="p-3.5">0% (wife/daughter) or 2.5% (+33% surcharge)</td>
                      <td className="p-3.5">Rs 500 flat (ancestral) or 4% to 6% on share</td>
                      <td className="p-3.5 font-semibold text-slate-900">
                        0% (wife/kids/grandkids) or 1.5% (parents/siblings)
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">Rs 0 (100% Exempt)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Registration Fee</td>
                      <td className="p-3.5">1% (Cap Rs 4L; Rs 1,000 wife concession)</td>
                      <td className="p-3.5">1% on released share (Cap Rs 4L)</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Rs 0 (Notification F.4(2)FD/Tax/2024-92)
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">Rs 100 Flat</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">When Ownership Moves</td>
                      <td className="p-3.5">Immediately upon registration</td>
                      <td className="p-3.5">Immediately upon registration</td>
                      <td className="p-3.5">As per settlement terms</td>
                      <td className="p-3.5 font-semibold text-slate-900">
                        After owner&rsquo;s lifetime
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Can Owner Cancel Later?</td>
                      <td className="p-3.5 text-rose-700">
                        No, except narrow Sec. 23 Senior Citizens Act grounds
                      </td>
                      <td className="p-3.5 text-rose-700">No (irrevocable once registered)</td>
                      <td className="p-3.5 text-rose-700">Only with all parties&rsquo; consent</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Yes, unlimited changes anytime
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Pre-Existing Share Needed?</td>
                      <td className="p-3.5">No (transfers donor&rsquo;s sole title)</td>
                      <td className="p-3.5 font-bold text-[#C65378]">
                        Yes (strictly between existing co-owners)
                      </td>
                      <td className="p-3.5">Family rights or bonafide family claim</td>
                      <td className="p-3.5">No (covers separate assets &amp; HUF share)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-3.5 h-3.5" />
                  <span>CLAIMING THE RS 500 ANCESTRAL RELEASE RATE?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Verify First Whether Your Property Is Legally Ancestral or Self-Acquired
                </div>
                <p className="text-xs text-slate-600">
                  Test your title under Section 6 vs Section 8 of the Hindu Succession Act so the
                  Rajasthan Sub-Registrar does not reject your Article 48(a) claim.
                </p>
              </div>
              <Link
                href="/tools/ancestral-vs-self-acquired-property-classifier"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Check Property Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 7: INCOME TAX & CLUBBING RULES */}
            <section id="income-tax-and-clubbing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <IndianRupee className="w-4 h-4" />
                <span>INCOME TAX ACT, 1961 COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Income Tax Section 56(2)(x) &amp; Clubbing Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Paying zero stamp duty in Rajasthan does not remove central income tax rules. Each
                  family gift must pass two Income Tax Act checks before you sign.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Check 1: Gift Tax under Section 56(2)(x)
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Land or flats gifted by a listed &ldquo;relative&rdquo; are{" "}
                      <strong>100% tax-free</strong> at any DLC value. This list covers spouse,
                      parents, kids, grandkids, brothers, sisters, in-laws, and their spouses
                      (including a <strong>daughter-in-law</strong> or <strong>son-in-law</strong>).
                      Gifts from friends, cousins, or nephews are taxed if DLC value tops Rs 50,000.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Check 2: Income Clubbing under Sections 64 &amp; 27
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      If you gift a home to your <strong>wife</strong> (Sections 27 and 64(1)(iv))
                      or <strong>daughter-in-law</strong> (Section 64(1)(vi)) for free, future rent
                      or gain is added back to your own tax return. A gift to an{" "}
                      <strong>adult son or daughter</strong> does NOT trigger clubbing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: REQUIRED DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SUB-REGISTRAR DOSSIER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Required Documents for Rajasthan SRO Filing
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Keep original copies and clean PDF scans of these papers ready before uploading your
                deed on e-Panjiyan Rajasthan:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {[
                  {
                    title: "Drafted Gift or Release Deed",
                    desc: "Printed deed with exact property plot number, four boundaries, DLC rate, and blood relation recital.",
                  },
                  {
                    title: "Original Ownership Title Chain",
                    desc: "Previous registered Sale Deed, JDA / UIT 99-year lease or freehold Patta, or allotment letter.",
                  },
                  {
                    title: "Latest Jamabandi Nakal & 90A Order",
                    desc: "Recent Jamabandi copy (within 30 days) for rural land, plus Section 90A order for converted urban plots.",
                  },
                  {
                    title: "UD Tax & Non-Encumbrance Paper",
                    desc: "Paid Urban Development (UD) or municipal house tax receipt and clean Non-Encumbrance Certificate (NEC).",
                  },
                  {
                    title: "ID Proofs & Two Adult Witnesses",
                    desc: "Original PAN Card, Aadhaar Card, and two passport photos for Donor/Releasor, Donee/Releasee, and two witnesses.",
                  },
                  {
                    title: "Relationship & Age Proof Papers",
                    desc: "Marriage certificate, birth certificate, or ration card to claim 0% or 2.5% duty, plus age proof for 60+/70+ relief.",
                  },
                  {
                    title: "Ancestor Death Paper (Release Deed)",
                    desc: "For Article 48(a) ancestral Release Deeds, attach the common ancestor's death certificate and Vanshavali.",
                  },
                  {
                    title: "e-Panjiyan CRN & e-GRAS Challans",
                    desc: "Printed Citizen Reference Number (CRN) slot slip and verified e-GRAS stamp duty and registration challans.",
                  },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900">{doc.title}</div>
                      <p className="text-slate-600 leading-relaxed">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>E-PANJIYAN &amp; E-GRAS WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step e-Panjiyan &amp; e-GRAS Registration
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these six steps to register a Gift Deed or Release Deed anywhere in
                  Rajasthan without delays or undervaluation notices:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Verify Property DLC Rate on e-Panjiyan",
                      desc: "Open epanjiyan.rajasthan.gov.in and check the active District Level Committee (DLC) rate for your district, zone, road width, and urban or rural land type.",
                    },
                    {
                      title: "Draft the Deed with Exact Statutory Recitals",
                      desc: "Write the deed clearly stating Article 31 (Gift) or Article 48(a) (Ancestral Release), full relation proof, zero cash payment, and property measurements.",
                    },
                    {
                      title: "Complete Online Data Entry & PDF Upload",
                      desc: "Log into e-Panjiyan, pick the right document code and family concession sub-code, enter party PAN/Aadhaar details, and upload title and ID scans.",
                    },
                    {
                      title: "Pay Stamp Duty, Surcharge & Fee on e-GRAS",
                      desc: "Generate your e-GRAS challan at egras.rajasthan.gov.in and pay the exact stamp duty, Section 3-A/3-B surcharges, and registration fee online.",
                    },
                    {
                      title: "Book SRO Slot & Finish Biometric Signing",
                      desc: "Generate your CRN slip, book an SRO time slot, and visit with both parties, two witnesses, and all original deeds for photo and thumbprint capture.",
                    },
                    {
                      title: "Apply for Mutation (Namantaran / Patta Update)",
                      desc: "After getting the registered deed, update ownership on Apna Khata (apnakhata.rajasthan.gov.in) for rural land or at JDA / UIT / Nagar Nigam for urban plots.",
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

            {/* SECTION 10: PRACTICAL RAJASTHAN COST EXAMPLES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>WORKED RAJASTHAN COST SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Rajasthan Cost Examples: Jaipur, Jodhpur, Udaipur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Example 1: Jaipur */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Jaipur JDA Plot</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Gifts Rs 1.2 Crore Vaishali Nagar Plot to Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Calculation:</strong> Under Article 31 and Notification 2022-115, base
                    stamp duty is <strong>Rs 0</strong>. Because base duty is zero, the 33%
                    surcharge is <strong>Rs 0</strong>. Registration fee at 1% equals{" "}
                    <strong>Rs 1,20,000</strong>.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Total Saved:</strong> Compared to a regular female sale deed
                    (Rs 9,18,000), the family saves <strong>Rs 7,98,000</strong> in stamp charges.
                  </p>
                </div>

                {/* Example 2: Jodhpur */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Jodhpur Haveli</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Sister Releases 50% Ancestral Share (Rs 60L Share) to Brother
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Calculation:</strong> Under Article 48(a) and Notification 2022-110,
                    base stamp duty is a flat <strong>Rs 500</strong> (plus Rs 165 surcharge at
                    33%). Registration fee at 1% on her Rs 60 lakh share is{" "}
                    <strong>Rs 60,000</strong>.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> Total e-GRAS cost is just <strong>Rs 60,665</strong>{" "}
                    instead of Rs 5,38,800 under standard conveyance rates.
                  </p>
                </div>

                {/* Example 3: Udaipur */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Udaipur Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    62-Year-Old Father Transfers Rs 80L Flat to Son
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Gift Deed Cost:</strong> Donor is under 70, so Article 31 charges 2.5%
                    (Rs 2,00,000) + 33% surcharge (Rs 66,000) + 1% fee (Rs 80,000) ={" "}
                    <strong>Rs 3,46,000</strong>.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Smart Alternative:</strong> A qualifying Article 51 Family Settlement
                    (F.4(2)FD/Tax/2024-92) drops cost to <strong>Rs 0</strong>, or a Registered Will
                    costs just <strong>Rs 100</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL RECITAL TEMPLATES & CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DRAFTING CLAUSES &amp; CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Recital Clauses &amp; Copyable Checklist
              </h3>

              {/* Template Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Sample Relationship &amp; Ancestral Recital Clauses (Rajasthan SRO)
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
                        <span>Copy Clauses</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`[A. GIFT DEED RECITAL - RAJASTHAN STAMP ACT ARTICLE 31]
"Out of natural love and affection, without any monetary consideration, the Donor [Name] hereby voluntarily gifts and transfers 100% of his/her self-acquired title in the Schedule Property (DLC Value Rs [Amount]) unto the Donee [Name], who is the Donor's [Wife / Daughter / Son / Parent]. The Donee accepts this gift during the Donor's lifetime under Sections 122 & 123 of the Transfer of Property Act, 1882."

[B. ANCESTRAL RELEASE DEED RECITAL - ARTICLE 48(a)]
"Whereas the Schedule Property is undivided ancestral property inherited from late [Common Ancestor Name], who died intestate on [Date]. Without receiving any monetary consideration, the Releasor irrevocably releases his/her undivided [Share %] interest in favour of the Releasee [Name & Relation] under Article 48(a) of the Rajasthan Stamp Act, 1998 read with Notification No. F.4(2)FD/Tax/2022-110."`}
                </pre>
              </div>

              {/* Template Box 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Copyable SRO Document Checklist (Rajasthan e-Panjiyan)
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
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Original Sale Deed / JDA or UIT Patta &amp; Title Chain</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Latest Jamabandi Nakal &amp; Section 90A Order (if applicable)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>PAN, Aadhaar, Relationship Proof &amp; 2 Adult Witnesses</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>e-Panjiyan CRN Slot Slip &amp; e-GRAS Fee Receipts</span>
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
                      WillDrafting.in Property Transfer &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Estate Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and estate lawyers
                  help families across Jaipur, Jodhpur, Udaipur, Kota, and Bikaner structure Gift
                  Deeds, Release Deeds, Family Settlements, and Wills while avoiding Collector
                  (Stamps) deficiency notices and title fights.
                </p>

                {/* Verified Internal Service & Template Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Gift Deed Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/relinquishment-deed"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Release Deed Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/family-settlement-deed-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Family Settlement</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Mutation Support</span>
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
                13. Frequently Asked Questions: Rajasthan Stamp Duty
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

            {/* SECTION 14: OFFICIAL PORTALS & LEGAL CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL GOVERNMENT PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Rajasthan Portals &amp; Legal Citations
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All calculations reflect the Rajasthan Stamp Act, 1998, Registration Act, 1908,
                  and published Rajasthan Finance Department notifications. Always confirm live DLC
                  rates and concession codes on official Rajasthan portals before paying e-GRAS:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://epanjiyan.rajasthan.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>e-Panjiyan Rajasthan Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://egras.rajasthan.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>e-GRAS Rajasthan Stamp Payment</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://igrs.rajasthan.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>IGRS Rajasthan Registration &amp; Stamps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Statutory Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Judgments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools, Templates &amp; Rajasthan Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Gift Deed vs Will Calculator
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/senior-citizen-section-23-gift-revocation-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Senior Citizen Gift Revocation Checker
                    </Link>
                    <Link
                      href="/templates/gift-deed-format-blood-relatives-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Blood Relative Gift Deed Format
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Release Deed Template
                    </Link>
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Format
                    </Link>
                    <Link
                      href="/locations/rajasthan"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting in Rajasthan
                    </Link>
                    <Link
                      href="/locations/jaipur"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting in Jaipur
                    </Link>
                    <Link
                      href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Delhi Gift &amp; Release Calculator
                    </Link>
                    <Link
                      href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Maharashtra Gift &amp; Release Calculator
                    </Link>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  Disclaimer: This tool gives general legal and stamp duty estimates for educational
                  use. State budget notifications and DLC circle rates can change. Always confirm
                  exact payable challan figures on e-Panjiyan Rajasthan or with a local advocate
                  before executing a deed.
                </p>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check Duty First?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Picking the wrong deed in Rajasthan can cost lakhs in extra tax. A quick check
                  helps you pick between a Gift Deed, Release Deed, Family Settlement, or Will.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Will Cost Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Will in Rajasthan needs Rs 0 stamp paper. You pay only Rs 100 to register it at
                  the SRO. You keep full title and rent for life, and heirs need no court probate.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers review your title papers, relation proof, and tax impact. We draft
                  clear deeds and Wills so your family gets smooth title transfer without fights.
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
                    Lawyer Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializes in Indian property conveyancing, family gift and release deeds,
                ancestral partition disputes, and fight-proof Will structuring.
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
                  <span>SAVE LAKHS IN RAJASTHAN STAMP DUTY</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Pass On Your Home with a Registered Will for Rs 100
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Wills carry Rs 0 stamp duty in Rajasthan, keep full ownership in your hands for
                  life, and need no High Court probate.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>RAJASTHAN PROPERTY DEED DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Gift Deed, Release Deed, or Family Settlement?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our legal team drafts clean Rajasthan deeds, verifies DLC and family relief rules,
                  and helps prevent Collector (Stamps) notices.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Lawyer Review</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Rajasthan Families Use WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2026 Rate Accuracy:</strong> Includes Section 3-A 13% surcharge,
                      Section 3-B 20% cess, and Rs 4 lakh fee cap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Tax Surprises:</strong> Flags Section 56(2)(x) gift tax and
                      Section 64 clubbing risks early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Full Rajasthan Coverage:</strong> Guides for JDA, UIT, Nagar Nigam,
                      and Apna Khata mutations.
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
          <span>Calculator</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Will (Rs 100)</span>
        </button>
      </div>
    </div>
  );
}
