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
  Clock,
  GitBranch,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Rules: UP Varasat & Khatauni Mutation" },
  { id: "interactive-checker", label: "2. Free UP Varasat & Khatauni Mutation Checker" },
  { id: "section-108-heirs", label: "3. Section 108 Heir Order & Daughter Rules" },
  { id: "female-tenure-rules", label: "4. Female Land Holders: Sections 109 & 110" },
  { id: "section-107-will-rules", label: "5. Agricultural Will Rules: Section 107 Mandate" },
  { id: "timelines-and-appeals", label: "6. 45-Day Timeline, Rule 34 & SDM Appeals" },
  { id: "comparison-table", label: "7. Varasat vs Will Mutation vs Gift Mutation" },
  { id: "step-by-step-sop", label: "8. Step-by-Step Guide: Apply Online on RCCMS" },
  { id: "document-checklist", label: "9. Required Document Checklist & Forms" },
  { id: "practical-case-studies", label: "10. Real UP Scenarios: Lucknow, Meerut, Varanasi" },
  { id: "drafting-templates", label: "11. Ready Affidavit Clause & Will Recital" },
  { id: "institutional-profile", label: "12. Legal Desk: WillDrafting & AMA Legal" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions on UP Varasat" },
  { id: "statutory-citations", label: "14. Official UP Portals & Legal Citations" },
];

const FAQS = [
  {
    q: "How long does UP Varasat Khatauni mutation take?",
    a: "Under Rule 34(7) of the UP Revenue Code Rules, 2016, the revenue officer aims to close undisputed cases within 45 days. Contested cases take up to 90 days. If a case goes past this limit, the officer must write down the reasons for delay.",
  },
  {
    q: "Is a plain-paper unregistered Will valid for farm land in UP?",
    a: "No. Under Section 107(3) of the UP Revenue Code, 2006, a Will for farm land must be in writing, signed by two witnesses, and registered at the Sub-Registrar Office. Under Section 107(5), an unregistered Will for UP farm land is void.",
  },
  {
    q: "Do married daughters inherit farm land automatically in Uttar Pradesh?",
    a: "Not when primary heirs exist. Under Section 108(2) of the UP Revenue Code, 2006, the widow, sons, and unmarried daughters fall in Clause (a). A married daughter sits in Clause (c). She inherits only if no Clause (a) or Clause (b) heir is alive, unless the owner leaves a registered Will.",
  },
  {
    q: "What is the government fee for online Varasat in UP?",
    a: "Filing an undisputed natural succession (Varasat) report online under Section 33 on the UP Revenue Board portal carries zero government fee. A small service charge applies only if you file through a local Jan Seva Kendra or CSC.",
  },
  {
    q: "Can a Bhumidhar with non-transferable rights write a Will in UP?",
    a: "No. Section 107(4) of the UP Revenue Code, 2006 clearly bars a Bhumidhar with non-transferable rights and an Asami from leaving land by Will. Only a Bhumidhar with transferable rights can make a registered Will.",
  },
  {
    q: "Does Khatauni mutation prove final land ownership in court?",
    a: "No. In Jitendra Singh v. State of Madhya Pradesh (2021), the Supreme Court held that mutation entries are only for land tax records. They do not grant final title. Section 39 of the UP Revenue Code allows any party to file a title suit under Section 144.",
  },
  {
    q: "What if my name was left out of the Varasat Khatauni order?",
    a: "You have two clear legal remedies. You can apply to the Tehsildar under Section 33(3) if an undisputed Revenue Inspector order left you out. You can also file an appeal before the Sub-Divisional Officer (SDM) within 30 days under Section 35(2).",
  },
];

type TenureType =
  | "bhumidhar_transferable"
  | "bhumidhar_non_transferable"
  | "asami_lessee"
  | "urban_non_agri";

type HolderProfile = "male_holder" | "female_self_acquired" | "female_inherited";

type ClaimMode =
  | "intestate_no_will"
  | "registered_will"
  | "unregistered_will"
  | "sale_gift_transfer";

type HeirGroup =
  | "clause_a_heirs"
  | "parents_only"
  | "married_daughter_only"
  | "siblings_or_remote";

type DisputeStatus = "undisputed" | "contested" | "omitted_heir";

type ScStStatus = "general_or_same" | "sc_st_outside_without_permission";

export default function UpVarasatMutationCheckerClient() {
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
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedWillClause, setCopiedWillClause] = useState<boolean>(false);

  // Interactive Checker State
  const [tenureType, setTenureType] = useState<TenureType>("bhumidhar_transferable");
  const [holderProfile, setHolderProfile] = useState<HolderProfile>("male_holder");
  const [claimMode, setClaimMode] = useState<ClaimMode>("intestate_no_will");
  const [heirGroup, setHeirGroup] = useState<HeirGroup>("clause_a_heirs");
  const [disputeStatus, setDisputeStatus] = useState<DisputeStatus>("undisputed");
  const [scStStatus, setScStStatus] = useState<ScStStatus>("general_or_same");

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
    setTenureType("bhumidhar_transferable");
    setHolderProfile("male_holder");
    setClaimMode("intestate_no_will");
    setHeirGroup("clause_a_heirs");
    setDisputeStatus("undisputed");
    setScStStatus("general_or_same");
  };

  // =========================================================================
  // UP REVENUE CODE 2006 DIAGNOSTIC ENGINE
  // =========================================================================
  let verdictTitle = "Eligible for Online Undisputed Varasat (Section 33)";
  let verdictBadge = "Valid Online Route • R.C. Form-9";
  let badgeTone: "emerald" | "amber" | "rose" = "emerald";
  let legalSection = "Section 33(1) & Section 108";
  let formName = "R.C. Form-9 (Online PA-11)";
  let authorityName = "Revenue Inspector (Kanungo) via Lekhpal";
  let timelineText = "Up to 45 Days (Rule 34(7))";
  let feeText = "Rs 0 Govt Fee (Online Varasat)";
  let heirVerdict = "Widow, Sons & Unmarried Daughters (Clause a)";
  let legalRationale =
    "When a male Bhumidhar dies without a Will and heirs agree, you can file online Varasat under Section 33. The Lekhpal checks the family tree and the Revenue Inspector updates the Khatauni.";
  let actionRecommendation =
    "File R.C. Form-9 online on the UP RCCMS portal (vaad.up.nic.in) with the Death Certificate, Parivar Register copy, and Khatauni extract. Track status until your name appears on UP Bhulekh.";
  let customDocs: string[] = [
    "Death Certificate of the deceased land holder",
    "Current Khatauni copy showing Khata and Gata numbers",
    "Parivar Register Nakal (Family Tree) from Gram Panchayat or local body",
    "Aadhaar cards and mobile OTP of applicant and all legal heirs",
    "Self-declaration or Shapath Patra (Affidavit) of legal heirs",
  ];

  if (tenureType === "urban_non_agri") {
    verdictTitle = "Urban / Abadi Land: Outside Farm Varasat Portal";
    verdictBadge = "Municipal / Authority Route";
    badgeTone = "amber";
    legalSection = "Municipal Act / Authority Bylaws";
    formName = "Nagar Nigam / Authority Mutation Form";
    authorityName = "Nagar Nigam, LDA, NOIDA, or GDA";
    timelineText = "30 to 60 Days (Local Bylaws)";
    feeText = "Local Municipal / Authority Fee";
    heirVerdict = "Personal Law Applies (HSA / ISA / Muslim Law)";
    legalRationale =
      "The UP Revenue Code, 2006 covers farm land recorded in Khatauni. Urban flats, Abadi plots, and authority houses (LDA, NOIDA, GDA, Nagar Nigam) follow personal succession law, not Section 108.";
    actionRecommendation =
      "Apply for mutation with the local Nagar Nigam or Development Authority using a Legal Heir Certificate, Registered Will, or Probate. Check if a family gift or release deed fits better.";
    customDocs = [
      "Death Certificate of the property owner",
      "Registered Sale Deed, Lease Deed, or Conveyance Deed",
      "Registered Will or Legal Heir / Succession Certificate",
      "No Objection Affidavit and Indemnity Bond on stamp paper",
      "Latest House Tax or Authority Dues Receipt",
    ];
  } else if (
    (claimMode === "registered_will" || claimMode === "unregistered_will") &&
    (tenureType === "bhumidhar_non_transferable" || tenureType === "asami_lessee")
  ) {
    verdictTitle = "Will Void: Non-Transferable Holder Cannot Make a Will";
    verdictBadge = "Barred under Section 107(4)";
    badgeTone = "rose";
    legalSection = "Section 107(4) & 107(5) UP Revenue Code";
    formName = "Revert to R.C. Form-9 (Natural Varasat)";
    authorityName = "Revenue Inspector / Tehsildar";
    timelineText = "45 Days (Natural Heir Route)";
    feeText = "Rs 0 Govt Fee (Natural Varasat)";
    heirVerdict = "Natural Statutory Heirs Only (Will Ignored)";
    legalRationale =
      "Section 107(4) clearly forbids a Bhumidhar with non-transferable rights or an Asami from leaving farm land by Will. Under Section 107(5), such a Will is void in law.";
    actionRecommendation =
      "Do not apply for Will mutation. File natural Varasat under Section 33 for the legal heirs listed under Section 108, 109, or 110 of the UP Revenue Code.";
    customDocs = [
      "Death Certificate of the Bhumidhar or Asami",
      "Current Khatauni showing Shreni 2 or Shreni 3 tenure",
      "Parivar Register Nakal proving natural legal heirs",
      "Aadhaar cards of all surviving statutory heirs",
      "Affidavit confirming natural succession claim under Section 33",
    ];
  } else if (claimMode === "unregistered_will") {
    verdictTitle = "VOID WILL ALERT: Registration Is Mandatory in UP";
    verdictBadge = "Invalid under Section 107(3) & (5)";
    badgeTone = "rose";
    legalSection = "Section 107(3) & 107(5) UP Revenue Code";
    formName = "Will Rejected • Natural Varasat Applies";
    authorityName = "Tehsildar / Revenue Inspector";
    timelineText = "45 Days (Natural Varasat) / 90 Days (Disputed)";
    feeText = "Natural Varasat: Rs 0 | Suit: Court Fee";
    heirVerdict = "Passes to Natural Heirs (Sec 108/109/110)";
    legalRationale =
      "Unlike urban property, a Will for farm land in Uttar Pradesh MUST be in writing, attested by two witnesses, and registered at the Sub-Registrar Office under Section 107(3). An unregistered plain-paper Will is void under Section 107(5).";
    actionRecommendation =
      "An unregistered Will cannot pass Khatauni title. If the owner is still alive, register a fresh Will at the SRO immediately. If the owner has passed away, heirs must apply via natural Varasat or a registered Family Settlement.";
    customDocs = [
      "Death Certificate of the land holder",
      "Current Khatauni extract (Shreni 1-Ka)",
      "Parivar Register Nakal listing all natural legal heirs",
      "Copy of unregistered Will (for lawyer review only)",
      "NOC or Registered Family Settlement if heirs agree on division",
    ];
  } else if (
    claimMode === "registered_will" &&
    scStStatus === "sc_st_outside_without_permission"
  ) {
    verdictTitle = "Will Barred: SC/ST Transfer Restriction Applies";
    verdictBadge = "Hit by Section 107(2), 98 & 99";
    badgeTone = "rose";
    legalSection = "Sections 107(2), 98 & 99 UP Revenue Code";
    formName = "Tehsildar Verification / Collector Check";
    authorityName = "Tehsildar & District Collector";
    timelineText = "90+ Days (Contested / Statutory Review)";
    feeText = "Court Process Fee as Notified";
    heirVerdict = "Bequest Void Without Collector Permission";
    legalRationale =
      "Under Section 107(2), a Scheduled Caste or Scheduled Tribe Bhumidhar's Will is bound by Sections 98 and 99. Leaving farm land to a non-SC/ST person without prior Collector permission makes the bequest void under Section 107(5).";
    actionRecommendation =
      "Consult a UP revenue lawyer before filing mutation. Verify if prior Collector permission was obtained or if the beneficiary belongs to the protected category.";
    customDocs = [
      "Registered Will attested by two witnesses",
      "Caste certificates of both testator and beneficiary",
      "Prior District Collector permission order (if any under Section 98)",
      "Death Certificate and Khatauni extract",
      "Witness affidavits confirming execution",
    ];
  } else if (disputeStatus === "omitted_heir") {
    verdictTitle = "File Section 33(3) Application or SDM Appeal";
    verdictBadge = "30-Day Appeal Window • Sec 35(2)";
    badgeTone = "amber";
    legalSection = "Section 33(3) & Section 35(2) UP Code";
    formName = "Tehsildar Petition / SDM Appeal Memo";
    authorityName = "Tehsildar or Sub-Divisional Officer (SDM)";
    timelineText = "File SDM Appeal Within 30 Days";
    feeText = "Prescribed Revenue Court Fee";
    heirVerdict = "Omitted Legal Heir Correction / Title Suit";
    legalRationale =
      "If a Revenue Inspector's Varasat order left out your name, apply to the Tehsildar under Section 33(3). If the Tehsildar passed a wrong order under Section 35(1), file an appeal before the SDM within 30 days under Section 35(2).";
    actionRecommendation =
      "Obtain a certified copy of the wrong Khatauni order at once. File an application before the Tehsildar or an SDM appeal within 30 days. For major title fights, Section 39 preserves your right to file a Section 144 declaratory suit.";
    customDocs = [
      "Certified copy of the wrong PA-11 / Tehsildar mutation order",
      "Updated Khatauni extract showing the omitted or wrong entry",
      "Parivar Register Nakal and Birth/Marriage proof showing relation",
      "Death Certificate of the original Khatedar",
      "Appeal Memo or Restoration Petition with affidavit",
    ];
  } else if (claimMode === "sale_gift_transfer") {
    verdictTitle =
      disputeStatus === "contested"
        ? "Contested Transfer Mutation Before Tehsildar"
        : "Deed Transfer Mutation (Dakhil-Kharij) via Tehsildar";
    verdictBadge =
      disputeStatus === "contested" ? "Section 35 Contested Suit" : "Section 34 Transfer Mutation";
    badgeTone = disputeStatus === "contested" ? "amber" : "emerald";
    legalSection = "Sections 34 & 35 UP Revenue Code";
    formName = "R.C. Form-11 (Proclamation: R.C. Form-12)";
    authorityName = "Tehsildar (RCCMS Court)";
    timelineText =
      disputeStatus === "contested"
        ? "Up to 90 Days (Rule 34(7) Contested)"
        : "Up to 45 Days (Includes 30-Day Notice)";
    feeText = "Notified Transfer Mutation Fee";
    heirVerdict = "Transferee Named in Registered Deed";
    legalRationale =
      "Farm land transferred by a registered Sale Deed or Family Gift Deed is reported to the Tehsildar under Section 34. The Tehsildar issues a 30-day public proclamation (Ishtihar in R.C. Form-12) before updating the Khatauni.";
    actionRecommendation =
      "Verify that the Sub-Registrar forwarded the deed electronically to RCCMS, or file R.C. Form-11 with the Tehsildar. Monitor the 30-day proclamation window for objections.";
    customDocs = [
      "Certified copy of Registered Sale Deed or UP Family Gift Deed",
      "Current Khatauni copy of the seller or donor",
      "Buyer or donee Aadhaar card and affidavit (Section 89 ceiling declaration)",
      "Copy of mutation application (R.C. Form-11)",
      "Stamp duty and registration receipt from IGRSUP",
    ];
  } else if (claimMode === "registered_will") {
    verdictTitle =
      disputeStatus === "contested"
        ? "Contested Will Mutation Suit Before Tehsildar"
        : "Registered Will Mutation via Tehsildar (Section 34/35)";
    verdictBadge =
      disputeStatus === "contested" ? "Section 35 Contested • 90 Days" : "Valid Section 107(3) Will";
    badgeTone = disputeStatus === "contested" ? "amber" : "emerald";
    legalSection = "Sections 107(3), 34 & 35 UP Code";
    formName = "Mutation Petition + R.C. Form-12 Notice";
    authorityName = "Court of Tehsildar (RCCMS)";
    timelineText =
      disputeStatus === "contested"
        ? "Up to 90 Days (Rule 34(7) Contested)"
        : "Up to 45 Days (After 30-Day Proclamation)";
    feeText = "Notified Tehsildar Court Fee";
    heirVerdict = "Named Beneficiary in Registered Will";
    legalRationale =
      "A registered Will attested by two witnesses from a transferable Bhumidhar is valid under Section 107(3). Because a Will overrides natural succession, the Tehsildar issues a 30-day public notice and examines at least one attesting witness.";
    actionRecommendation =
      "File the mutation case before the Tehsildar with the original Registered Will and Death Certificate. Keep at least one attesting witness ready to confirm the testator's signature and sound mind.";
    customDocs = [
      "Original Registered Will attested by two witnesses (Section 107(3))",
      "Death Certificate of the Will maker (Khatedar)",
      "Current Khatauni extract (Shreni 1-Ka)",
      "Affidavit and testimony of at least one attesting witness",
      "Beneficiary Aadhaar card and notice details of natural heirs",
    ];
  } else {
    // Intestate Natural Varasat (Section 33)
    if (holderProfile === "female_inherited") {
      legalSection = "Section 33 & Section 109 UP Code";
      heirVerdict = "Reverts to Nearest Heir of Last Male Holder (Sec 109)";
      legalRationale =
        "Under Section 109, when a woman who inherited farm land from a male relative dies or remarries, the land goes back to the nearest surviving heir of the last male holder under Section 108. Exception: if she inherited as a daughter and leaves her own children, it passes to her Clause (a) heirs under Section 110.";
    } else if (holderProfile === "female_self_acquired") {
      legalSection = "Section 33 & Section 110 UP Code";
      if (heirGroup === "clause_a_heirs") {
        heirVerdict = "Sons, Unmarried Daughters & Predeceased Son's Heirs (Sec 110(a))";
      } else if (heirGroup === "parents_only") {
        heirVerdict = "Husband (Clause b) or Married Daughter (Clause c) Before Parents";
      } else if (heirGroup === "married_daughter_only") {
        heirVerdict = "Married Daughter Inherits Under Section 110(c) (After Husband)";
      } else {
        heirVerdict = "Daughter's Children, Father, Mother, then Siblings (Sec 110)";
      }
      legalRationale =
        "Section 110 governs farm land that a woman bought herself or held independently. Her sons and unmarried daughters inherit first in equal shares, followed by her husband, then married daughters, then her parents.";
    } else {
      // Male / Third-Gender holder (Section 108)
      legalSection = "Section 33 & Section 108 UP Code";
      if (heirGroup === "clause_a_heirs") {
        heirVerdict = "Widow, Sons & Unmarried Daughters Equally (Sec 108(2)(a))";
        legalRationale =
          "Under Section 108(2)(a), the widow, sons, unmarried daughters, and predeceased son's lineal heirs inherit in equal shares (per stirpes). They exclude parents and married daughters.";
      } else if (heirGroup === "parents_only") {
        heirVerdict = "Mother and Father (Sec 108(2)(b))";
        legalRationale =
          "When no Clause (a) heir (widow, son, or unmarried daughter) is alive, the land passes to the deceased holder's mother and father under Section 108(2)(b).";
      } else if (heirGroup === "married_daughter_only") {
        heirVerdict = "Married Daughter Inherits Under Sec 108(2)(c)";
        legalRationale =
          "Because no Clause (a) or Clause (b) heirs exist, the married daughter legally inherits the farm land under Section 108(2)(c). Note: If a son, widow, or parent were alive, the married daughter would be excluded without a registered Will.";
      } else {
        heirVerdict = "Brother, Unmarried Sister, then Collaterals (Sec 108(2)(d)+)";
        legalRationale =
          "When no spouse, children, or parents survive, Section 108(2) passes the holding to the brother, unmarried sister, married sister, and listed collateral relatives in strict order.";
      }
    }

    if (disputeStatus === "contested") {
      verdictTitle = "Contested Varasat: Referred to Tehsildar Court";
      verdictBadge = "Section 33(2)(b) & 35 • 90 Days";
      badgeTone = "amber";
      formName = "R.C. Form-9 Referred to RCCMS Case";
      authorityName = "Tehsildar (Summary Judicial Hearing)";
      timelineText = "Up to 90 Days (Rule 34(7) Contested)";
      feeText = "Online Filing Rs 0 | Hearing Costs Apply";
      actionRecommendation =
        "Because an objection exists, the Revenue Inspector cannot finalize PA-11 directly. The case moves to the Tehsildar under Section 35. Present the Parivar Register, Death Certificate, and witness statements on the RCCMS hearing date.";
    } else {
      verdictTitle = "Eligible for Online Undisputed Varasat (Section 33)";
      verdictBadge = "Fast-Track Online • 45 Days";
      badgeTone = "emerald";
      formName = "R.C. Form-9 (Online PA-11)";
      authorityName = "Lekhpal Inquiry -> Revenue Inspector Order";
      timelineText = "Up to 45 Days (Rule 34(7))";
      feeText = "Rs 0 Govt Fee (Online Portal)";
      actionRecommendation =
        "Submit R.C. Form-9 online at the UP Revenue Board RCCMS portal (vaad.up.nic.in). After Lekhpal field verification, the Revenue Inspector passes the Varasat order and updates UP Bhulekh.";
    }
  }

  const copyAffidavitToClipboard = () => {
    const text = `SHAPATH PATRA (AFFIDAVIT) FOR UP VARASAT / KHATAUNI MUTATION (SECTION 33, UP REVENUE CODE, 2006)
I, [Full Name], S/o or W/o [Father/Husband Name], resident of Village [Village Name], Tehsil [Tehsil], District [District], Uttar Pradesh, state on oath:
1. That Late [Deceased Khatedar Name] was the recorded Bhumidhar of Khata No. [Khata Number], Gata No. [Gata Numbers], Area [Area in Hectares] in Village [Village Name].
2. That the said Khatedar passed away on [Date of Death] (Death Certificate No. [Number] attached).
3. That the deceased left no registered Will under Section 107 of the UP Revenue Code, 2006.
4. That under Section [108 / 109 / 110] of the UP Revenue Code, 2006, the only surviving legal heirs are: [List Names, Relations, Ages].
5. That there is no pending dispute or hidden heir. If any fact is found false, I shall be liable under law.`;
    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyWillClauseToClipboard = () => {
    const text = `AGRICULTURAL LAND BEQUEST CLAUSE (SECTION 107(3), UP REVENUE CODE, 2006)
"I declare that I am a Bhumidhar with Transferable Rights (Shreni 1-Ka) of the agricultural land at Village [Village], Pargana [Pargana], Tehsil [Tehsil], District [District], UP, bearing Khata No. [Khata] and Gata No. [Gata].
Under Section 107(1) and 107(3) of the Uttar Pradesh Revenue Code, 2006, I execute this Will in writing, attested by two witnesses, and present it for compulsory registration before the Sub-Registrar.
After my lifetime, my entire share in the said holding shall pass solely to [Beneficiary Name, e.g., my married daughter / spouse], who may apply for Khatauni mutation under Sections 34 and 35."`;
    navigator.clipboard.writeText(text);
    setCopiedWillClause(true);
    setTimeout(() => setCopiedWillClause(false), 3000);
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
            <span>UP REVENUE CODE, 2006 • SECTIONS 33, 34, 35 &amp; 107-110</span>
          </div>

          {/* Single H1 Tag (49 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Uttar Pradesh Varasat &amp; Khatauni Mutation Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check legal heirs under Section 108, verify if a farm land Will is valid under Section
            107, and get your exact R.C. Form-9, document list, and 45-day mutation steps.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Run UP Varasat Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft UP-Compliant Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">45 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNDISPUTED RULE 34 TARGET
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 0 Govt Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ONLINE VARASAT (R.C. FORM-9)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 107(3)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FARM LAND WILL MUST REGISTER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SDM APPEAL WINDOW (SEC 35(2))
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
                aria-label="Page sections"
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
                <span>UP Revenue Law Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on the UP Revenue Code, 2006 (Sections 33-39 and 107-110) and the UP Revenue
                Code Rules, 2016 (Rule 34).
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
                <span>QUICK SUMMARY: UP VARASAT &amp; KHATAUNI MUTATION</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>What Varasat Means:</strong> Varasat updates the UP land record
                    (Khatauni) after a land holder dies. Undisputed heirs apply online via R.C.
                    Form-9 under Section 33.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Farm Land Will Rule:</strong> Under Section 107(3), a Will for
                    UP farm land must be in writing, signed by two witnesses, and registered. Plain
                    unregistered Wills are void.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Married Daughter Alert:</strong> Under Section 108(2), widows, sons,
                    and unmarried daughters inherit first. A married daughter sits in Clause (c)
                    unless a registered Will names her.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mutation Is Not Final Title:</strong> Khatauni entries are for tax and
                    land records only. Section 39 lets any party file a title suit under Section
                    144.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (THE ONLY H2 ON THIS PAGE!) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>UP REVENUE CODE, 2006</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: UP Varasat &amp; Khatauni Mutation
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a land holder in Uttar Pradesh passes away, the heirs must update the
                  Khatauni (Record of Rights). This process is called <strong>Varasat</strong> or{" "}
                  <strong>Dakhil-Kharij</strong>.
                </p>
                <p>
                  Agricultural land in UP does not follow the Hindu Succession Act or Muslim
                  personal law for natural inheritance. Instead, it follows one secular state law:
                  the <strong>Uttar Pradesh Revenue Code, 2006</strong>.
                </p>
                <p>
                  <strong>Section 33</strong> covers natural inheritance without a Will.{" "}
                  <strong>Section 34</strong> covers registered Sale Deeds, Gift Deeds, and Wills.{" "}
                  <strong>Section 35</strong> gives the Tehsildar power to issue notices, hear
                  disputes, and update the Khatauni.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER TOOL */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE VARASAT DIAGNOSTIC</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free UP Varasat &amp; Khatauni Mutation Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your land type, heir details, and dispute status below. Get the right legal
                section, form name, competent officer, and timeline at once.
              </p>

              {/* Checker Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Question 1: Tenure Type */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>Question 1: What type of land is shown on the Khatauni?</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "bhumidhar_transferable",
                        label: "Bhumidhar (Transferable Rights)",
                        desc: "Shreni 1-Ka land: full right to sell, gift, or write a valid Will",
                      },
                      {
                        id: "bhumidhar_non_transferable",
                        label: "Bhumidhar (Non-Transferable)",
                        desc: "Shreni 2 allotted land: bar on Will under Section 107(4)",
                      },
                      {
                        id: "asami_lessee",
                        label: "Asami / Govt Lessee",
                        desc: "Shreni 3 or lease land: cannot transfer or pass by Will",
                      },
                      {
                        id: "urban_non_agri",
                        label: "Urban Flat / Abadi / Authority Plot",
                        desc: "Nagar Nigam, LDA, NOIDA, or GDA home (not farm Khatauni land)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTenureType(opt.id as TenureType)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          tenureType === opt.id
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

                {/* Question 2: Claim Mode */}
                {tenureType !== "urban_non_agri" && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Question 2: How are the heirs claiming the land?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          id: "intestate_no_will",
                          label: "No Will (Natural Varasat)",
                          desc: "Land holder died without a Will (Section 33 / R.C. Form-9)",
                        },
                        {
                          id: "registered_will",
                          label: "Registered Will (Vasiyat)",
                          desc: "Written Will signed by 2 witnesses and registered at SRO (Sec 107(3))",
                        },
                        {
                          id: "unregistered_will",
                          label: "Unregistered / Plain-Paper Will",
                          desc: "Signed at home or notarized, but NOT registered at Sub-Registrar Office",
                        },
                        {
                          id: "sale_gift_transfer",
                          label: "Registered Sale / Family Gift Deed",
                          desc: "Lifetime transfer via registered deed (Section 34 / R.C. Form-11)",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setClaimMode(opt.id as ClaimMode)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            claimMode === opt.id
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

                {/* Question 3: Deceased Holder Profile (for Natural Varasat) */}
                {tenureType !== "urban_non_agri" && claimMode === "intestate_no_will" && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C65378]" />
                        <span>Question 3: Who was the deceased Khatauni holder?</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          {
                            id: "male_holder",
                            label: "Male / Third-Gender Holder",
                            desc: "Governed by Section 108 order of heirs",
                          },
                          {
                            id: "female_self_acquired",
                            label: "Woman (Self-Bought Land)",
                            desc: "She bought or acquired it independently (Sec 110)",
                          },
                          {
                            id: "female_inherited",
                            label: "Woman (Inherited From Male)",
                            desc: "Inherited as widow, mother, or daughter (Sec 109)",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setHolderProfile(opt.id as HolderProfile)}
                            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                              holderProfile === opt.id
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

                    {/* Question 4: Surviving Family Tier */}
                    {holderProfile !== "female_inherited" && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[#C65378]" />
                          <span>Question 4: Which closest family members are alive today?</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            {
                              id: "clause_a_heirs",
                              label: "Widow / Sons / Unmarried Daughters",
                              desc: "Primary Clause (a) heirs (or predeceased son's heirs)",
                            },
                            {
                              id: "parents_only",
                              label: "Parents Only (No Clause a)",
                              desc: "Mother or Father alive; no spouse/son/unmarried daughter",
                            },
                            {
                              id: "married_daughter_only",
                              label: "Married Daughter Only",
                              desc: "No widow, son, unmarried daughter, or parents alive",
                            },
                            {
                              id: "siblings_or_remote",
                              label: "Brothers / Sisters / Remote",
                              desc: "No spouse, children, or surviving parents",
                            },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setHeirGroup(opt.id as HeirGroup)}
                              className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                                heirGroup === opt.id
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
                  </div>
                )}

                {/* Conditional SC/ST Check for Registered Will */}
                {tenureType === "bhumidhar_transferable" && claimMode === "registered_will" && (
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                      <span>SC/ST Statutory Check (Section 107(2) read with Sec 98 &amp; 99)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          id: "general_or_same",
                          label: "General Category or Same Community",
                          desc: "No Section 98/99 bar applies to this Will",
                        },
                        {
                          id: "sc_st_outside_without_permission",
                          label: "SC/ST Holder Willing Outside Category",
                          desc: "Will leaves land to non-SC/ST person without Collector order",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setScStStatus(opt.id as ScStStatus)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            scStStatus === opt.id
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

                {/* Question 5: Dispute Status */}
                {tenureType !== "urban_non_agri" && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Question 5: What is the family agreement or order status?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "undisputed",
                          label: "Undisputed (All Heirs Agree)",
                          desc: "No family clash or formal objection expected",
                        },
                        {
                          id: "contested",
                          label: "Contested / Objection Filed",
                          desc: "Rival heir or relative is opposing the entry",
                        },
                        {
                          id: "omitted_heir",
                          label: "Wrong Order / Name Left Out",
                          desc: "Varasat already passed, but an heir was excluded",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDisputeStatus(opt.id as DisputeStatus)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            disputeStatus === opt.id
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

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Checker to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        UP VARASAT &amp; MUTATION DIAGNOSTIC RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {verdictTitle}
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 self-start sm:self-auto ${
                        badgeTone === "emerald"
                          ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-200"
                          : badgeTone === "amber"
                            ? "bg-amber-500/15 border-amber-400/40 text-amber-200"
                            : "bg-rose-500/20 border-rose-400/40 text-rose-200"
                      }`}
                    >
                      {badgeTone === "rose" ? (
                        <AlertTriangle className="w-4 h-4 text-rose-300" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                      <span>{verdictBadge}</span>
                    </div>
                  </div>

                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        LAW &amp; FORM
                      </div>
                      <div className="text-sm font-black text-emerald-400 leading-snug">
                        {legalSection}
                      </div>
                      <div className="text-[11px] text-slate-300">{formName}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        AUTHORITY &amp; TIMELINE
                      </div>
                      <div className="text-sm font-black text-white leading-snug">
                        {timelineText}
                      </div>
                      <div className="text-[11px] text-slate-300">{authorityName}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        RECOGNIZED HEIRS
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {heirVerdict}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        OFFICIAL FEE STATUS
                      </div>
                      <div className="text-sm font-black text-emerald-300 leading-snug">
                        {feeText}
                      </div>
                      <div className="text-[11px] text-slate-300">CSC charges extra if used</div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Explanation:</span>
                    </div>
                    <p>{legalRationale}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Next Step:</strong> {actionRecommendation}
                    </div>
                  </div>

                  {/* Dynamic Tailored Documents */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-200">
                      Required Papers for Your Selected Case
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {customDocs.map((doc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want to protect married daughters or prevent future Khatauni fights?
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft a Registered-Ready Will</span>
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
                  <span>UP LAND SUCCESSION GUIDE: VARASAT &amp; KHATAUNI MUTATION</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  UP Revenue Code, 2006
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/uttar-pradesh-varasat-khatauni-mutation-checker-og.jpg"
                  alt="Uttar Pradesh Varasat and Khatauni Mutation Checker under UP Revenue Code 2006"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Verify natural heirs under Sections 108-110, check mandatory Will registration
                under Section 107(3), and prepare R.C. Form-9 cleanly.
              </p>
            </div>

            {/* SECTION 3: SECTION 108 HEIR ORDER */}
            <section id="section-108-heirs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>STATUTORY HEIR PRIORITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 108 Heir Order &amp; Daughter Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 108 of the UP Revenue Code, 2006 lists who inherits farm land when a male
                  or third-gender land holder dies without a Will. Heirs in an earlier tier exclude
                  all lower tiers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Tier 1: Clause (a)
                    </div>
                    <div className="font-bold text-slate-800">Widow, Sons &amp; Unmarried Daughters</div>
                    <p className="text-slate-600 leading-relaxed">
                      They share equally. If a son died earlier, his widow, sons, and unmarried
                      daughters take his branch share (per stirpes).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Tier 2: Clause (b)
                    </div>
                    <div className="font-bold text-slate-800">Mother and Father</div>
                    <p className="text-slate-600 leading-relaxed">
                      Parents inherit only when no Clause (a) heir is alive at the time of death.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Tier 3: Clause (c)
                    </div>
                    <div className="font-bold text-slate-800">Married Daughters</div>
                    <p className="text-slate-600 leading-relaxed">
                      A married daughter inherits farm land only if no Clause (a) or Clause (b) heir
                      exists.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Why Married Daughters Need a Registered Will in UP</span>
                  </div>
                  <p className="leading-relaxed">
                    Unlike the Hindu Succession Act where married and unmarried daughters get equal
                    shares, Section 108(2) puts married daughters in Clause (c). If you want your
                    married daughter to receive UP farm land, execute a registered Will under
                    Section 107(3) or a{" "}
                    <Link
                      href="/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator"
                      className="underline font-bold text-[#C65378]"
                    >
                      UP Family Gift Deed
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: FEMALE LAND HOLDERS (SECTIONS 109 & 110) */}
            <section id="female-tenure-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>FEMALE TENURE SUCCESSION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Female Land Holders: Sections 109 &amp; 110
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For a woman who holds Khatauni land, UP law asks one key question: did she
                  inherit the land from a male relative, or did she buy it herself?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs sm:text-sm">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 flex items-center gap-2">
                      <Gavel className="w-4 h-4 text-[#C65378]" />
                      <span>Section 109: Inherited Farm Land</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      If a woman got the land as a widow, mother, or female heir of a male holder,
                      her death or remarriage sends the land back to the nearest living heir of
                      that last male holder. Exception: a daughter&rsquo;s own children inherit if
                      she leaves heirs under Section 110(a).
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#5F7E75]" />
                      <span>Section 110: Self-Acquired Farm Land</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      If a woman bought the land herself, her own heirs inherit in order: first
                      sons and unmarried daughters, next her husband, then married daughters, then
                      daughter&rsquo;s children, and then her father and mother.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AGRICULTURAL WILL RULES (SECTION 107) */}
            <section id="section-107-will-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MANDATORY REGISTRATION RULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Agricultural Will Rules: Section 107 Mandate
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many families make a costly mistake with UP farm land Wills. For city flats, a
                  plain-paper Will is valid. For farm land in Uttar Pradesh,{" "}
                  <strong>Section 107</strong> sets strict rules that override general law:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Who Can Write a Will (Sec 107(1)):</strong> Only a Bhumidhar with
                    transferable rights (Shreni 1-Ka) can bequeath farm land by Will.
                  </li>
                  <li>
                    <strong>Who Cannot (Sec 107(4)):</strong> A Bhumidhar with non-transferable
                    rights (Shreni 2) or an Asami cannot write a valid Will for that land.
                  </li>
                  <li>
                    <strong>Compulsory Registration (Sec 107(3)):</strong> The Will must be in
                    writing, signed by at least two witnesses, and registered at the Sub-Registrar
                    Office.
                  </li>
                  <li>
                    <strong>SC/ST Rule (Sec 107(2)):</strong> A Will by an SC/ST land holder must
                    follow the transfer restrictions in Sections 98 and 99.
                  </li>
                  <li>
                    <strong>Void Result (Sec 107(5)):</strong> Any Will that breaks these rules is
                    void, and the Tehsildar will reject Will mutation.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 6: TIMELINES, RULE 34 & SDM APPEALS */}
            <section id="timelines-and-appeals" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>RULE 34 TIMELINES &amp; REMEDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. 45-Day Timeline, Rule 34 &amp; SDM Appeals
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  <strong>Rule 34 of the UP Revenue Code Rules, 2016</strong> sets clear deadlines
                  so families do not wait for years at the Tehsil office:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>30-Day Public Notice (Proclamation):</strong> For Tehsildar cases under
                    Section 35, R.C. Form-12 gives at least 30 days for anyone to file an objection.
                  </li>
                  <li>
                    <strong>45-Day Undisputed Limit (Rule 34(7)):</strong> Undisputed mutation and
                    Varasat cases must be closed within 45 days of registration.
                  </li>
                  <li>
                    <strong>90-Day Contested Limit (Rule 34(7)):</strong> Disputed cases and Will
                    hearings must be decided within 90 days. Delays need written reasons.
                  </li>
                  <li>
                    <strong>30-Day SDM Appeal (Section 35(2)):</strong> If the Tehsildar passes an
                    unfair order, file an appeal before the Sub-Divisional Officer (SDM) within 30
                    days.
                  </li>
                  <li>
                    <strong>Title Protection (Section 39):</strong> As confirmed in{" "}
                    <em>Jitendra Singh v. State of MP (2021)</em>, Khatauni mutation does not grant
                    final ownership. Section 39 lets you file a full title suit under Section 144.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PATHWAY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Varasat vs Will Mutation vs Gift Mutation
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare the three main ways Khatauni names change in Uttar Pradesh under the UP
                Revenue Code, 2006.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Feature</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Natural Varasat
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">Will Mutation</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-amber-200">
                        Gift / Sale Mutation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Governing Section</td>
                      <td className="p-3.5 sm:p-4">Section 33 &amp; Sec 108-110</td>
                      <td className="p-3.5 sm:p-4">Section 107(3), 34 &amp; 35</td>
                      <td className="p-3.5 sm:p-4">Sections 34 &amp; 35</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Required Form</td>
                      <td className="p-3.5 sm:p-4">R.C. Form-9 (Online PA-11)</td>
                      <td className="p-3.5 sm:p-4">Tehsildar Suit + R.C. Form-12</td>
                      <td className="p-3.5 sm:p-4">R.C. Form-11 + R.C. Form-12</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Deciding Officer</td>
                      <td className="p-3.5 sm:p-4">Revenue Inspector (Undisputed)</td>
                      <td className="p-3.5 sm:p-4">Tehsildar Court</td>
                      <td className="p-3.5 sm:p-4">Tehsildar Court</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Target Timeline</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">45 Days</td>
                      <td className="p-3.5 sm:p-4">45 Days (90 if contested)</td>
                      <td className="p-3.5 sm:p-4">45 Days (90 if contested)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">SRO Registration</td>
                      <td className="p-3.5 sm:p-4">Not needed</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#C65378]">
                        Compulsory (Sec 107(3))
                      </td>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Compulsory Deed</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Govt Portal Fee</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">Rs 0 Online</td>
                      <td className="p-3.5 sm:p-4">Court Process Fee</td>
                      <td className="p-3.5 sm:p-4">Notified Mutation Fee</td>
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
                  <span>TRANSFERRING UP LAND DURING LIFETIME?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Check UP Rs 5,000 Family Gift Deed Stamp Duty Scheme
                </div>
                <p className="text-xs text-slate-600">
                  Verify blood-relative eligibility and compare Rs 5,000 flat family duty against
                  standard UP stamp rates before visiting the SRO.
                </p>
              </div>
              <Link
                href="/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open UP Gift Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>ONLINE FILING WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step Guide: Apply Online on RCCMS
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these five clear steps to file undisputed Varasat online without middlemen:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Check Current Khatauni on UP Bhulekh",
                      desc: "Visit upbhulekh.gov.in and note the exact District, Tehsil, Village, Khata number, Gata numbers, and exact spelling of the deceased holder.",
                    },
                    {
                      title: "Log Into the UP RCCMS Varasat Portal",
                      desc: "Open the Board of Revenue RCCMS portal (vaad.up.nic.in), choose Online Varasat Application (Uttaraadhikar / Varasat), and sign in with OTP.",
                    },
                    {
                      title: "Fill R.C. Form-9 Details & Add All Heirs",
                      desc: "Enter the holder's death date, land details, and every eligible heir's name, relation, age, and Aadhaar. Never hide a surviving heir.",
                    },
                    {
                      title: "Cooperate With Lekhpal Field Check",
                      desc: "The portal sends your file to the village Lekhpal. Show the original Death Certificate and Parivar Register copy so the Lekhpal uploads a clean report.",
                    },
                    {
                      title: "Revenue Inspector Order & Khatauni Update",
                      desc: "If no objection arises, the Revenue Inspector approves the Varasat order within 45 days. Download the updated Khatauni from UP Bhulekh.",
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

            {/* SECTION 9: REQUIRED DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PAPERS &amp; VERIFICATION LIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Required Document Checklist &amp; Forms
              </h3>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Keep scanned PDFs and originals of these papers ready before applying online or
                  meeting the Lekhpal:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {[
                    "Official Death Certificate of the recorded Khatedar",
                    "Latest Khatauni Extract (from UP Bhulekh)",
                    "Parivar Register Nakal (Family Register Copy)",
                    "Aadhaar Cards of applicant and all legal heirs",
                    "Self-declaration Affidavit (Shapath Patra)",
                    "Registered Will + 2 Witnesses (only for Will mutation)",
                    "Registered Gift / Sale Deed (only for Section 34 transfer)",
                    "Active mobile number for RCCMS OTP tracking",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL UP MUTATION EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real UP Scenarios: Lucknow, Meerut, Varanasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Lucknow */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Lucknow Tehsil</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Unregistered Home Will Rejected for Farm Plot
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A father left a plain-paper Will giving his Mohanlalganj
                    farm land to his married daughter. He never registered the Will at the SRO.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> The Tehsildar rejected Will mutation under Section
                    107(3) and 107(5). The land passed under Section 108(2)(a) to the sons and
                    widow instead.
                  </p>
                </div>

                {/* Case 2: Meerut */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Meerut District</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Undisputed Varasat Closed in 38 Days Online
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> After a farmer died intestate, his widow, son, and
                    unmarried daughter filed R.C. Form-9 online with the Parivar Register copy.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> The Lekhpal verified all three Clause (a) heirs in
                    two weeks. The Revenue Inspector updated the Khatauni with Rs 0 government fee.
                  </p>
                </div>

                {/* Case 3: Varanasi */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Varanasi Tehsil</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Omitted Brother Restored via Section 35(2) Appeal
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> One brother living in Delhi was left out when local
                    Varasat was entered. He noticed the missing name on UP Bhulekh two weeks later.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> He filed an appeal with the SDM within the 30-day
                    limit under Section 35(2) with his Parivar Register copy and got his equal
                    share entered.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: READY TEMPLATES */}
            <section id="drafting-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-READY LEGAL CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Ready Affidavit Clause &amp; Will Recital
              </h3>

              {/* Box 1: Varasat Affidavit */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    UP Varasat Heir Affidavit (Shapath Patra Format)
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`SHAPATH PATRA (AFFIDAVIT) FOR UP VARASAT (SECTION 33, UP REVENUE CODE, 2006)
I, [Full Name], S/o or W/o [Name], resident of Village [Village], Tehsil [Tehsil], District [District], UP, state on oath:
1. Late [Deceased Name] was the recorded Bhumidhar of Khata No. [Khata], Gata No. [Gata] in Village [Village].
2. The holder passed away on [Date of Death] (Death Certificate No. [Number]).
3. The deceased left no registered Will under Section 107 of the UP Revenue Code, 2006.
4. Under Section [108 / 109 / 110], the sole surviving legal heirs are: [Names, Relations, Ages].
5. No heir has been concealed and no dispute is pending.`}
                </pre>
              </div>

              {/* Box 2: Section 107 Will Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 107(3) UP Agricultural Land Will Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyWillClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedWillClause ? (
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
{`"I declare that I am a Bhumidhar with Transferable Rights (Shreni 1-Ka) of Khata No. [Khata], Gata No. [Gata], Village [Village], Tehsil [Tehsil], District [District], UP.
Under Section 107(1) and 107(3) of the UP Revenue Code, 2006, I execute this Will in writing, attested by two witnesses, for compulsory registration before the Sub-Registrar.
After my lifetime, my full share in this holding shall pass solely to [Beneficiary Name], who may apply for Khatauni mutation under Sections 34 and 35."`}
                </pre>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Desk: WillDrafting &amp; AMA Legal
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in UP Succession &amp; Mutation Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Estate Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is backed by AMA Legal Solutions. Our property lawyers help
                  families across Lucknow, Noida, Ghaziabad, Agra, Kanpur, Meerut, Prayagraj, and
                  Varanasi draft Section 107 registered Wills, resolve Varasat disputes, and
                  complete clean Khatauni mutations. Note: This tool gives general legal
                  information; complex disputes depend on your exact Khatauni and family facts.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Dakhil-Kharij Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/legal-heir"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/family-settlement-deed-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Family Settlement</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/locations/uttar-pradesh"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>UP Will Services</span>
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
                13. Frequently Asked Questions on UP Varasat
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PRIMARY SOURCES &amp; RELATED LINKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official UP Portals &amp; Legal Citations
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All rules on this page follow the Uttar Pradesh Revenue Code, 2006, UP Revenue
                  Code Rules, 2016, and Supreme Court precedent in{" "}
                  <em>Jitendra Singh v. State of Madhya Pradesh (2021)</em>. Online Varasat forms
                  are filed on the UP Board of Revenue RCCMS portal (<code>vaad.up.nic.in</code>).
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://upbhulekh.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>UP Bhulekh Official Khatauni Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: State &amp; Central Acts</span>
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
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related UP Tools, Templates &amp; Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      UP Family Gift Deed Calculator
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Checker
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir vs Succession Tool
                    </Link>
                    <Link
                      href="/tools/post-death-30-day-legal-compliance-tracker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Post-Death 30-Day Tracker
                    </Link>
                    <Link
                      href="/templates/will-format-hindi"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindi Will Format (Wasiyatnama)
                    </Link>
                    <Link
                      href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heirs Pedigree Affidavit
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heirs NOC Template
                    </Link>
                    <Link
                      href="/locations/lucknow"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Lucknow Will Services
                    </Link>
                    <Link
                      href="/locations/noida"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Noida Will Services
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Update Khatauni Fast?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clean Khatauni records protect your farm land from fraud. You also need updated
                  records for crop loans, Kisan credit, and future sale or partition.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Register Farm Wills in UP</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never leave an unregistered Will for UP farm land. Sign it with two witnesses and
                  register it at the Sub-Registrar Office so your wishes stay valid.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your Khatauni papers, draft valid Section 107 Wills, and help
                  your family close Varasat or contested Tehsildar cases smoothly.
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
                Guides Indian families on UP Revenue Code succession, registered farm land Wills,
                Khatauni mutations, and High Court estate disputes.
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
                  <span>SECTION 107(3) COMPLIANT WILLS</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your UP Land &amp; Daughters With a Registered Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Section 108 excludes married daughters when sons or widows survive. Draft a
                  registration-ready UP Will with exact Khata and Gata details.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Building className="w-3 h-3" />
                  <span>UP VARASAT &amp; REVENUE DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Stuck in a Contested Tehsildar Case or SDM Appeal?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Get legal help for omitted heir corrections, Section 35(2) SDM appeals, and
                  Section 144 title suits across Uttar Pradesh.
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
                  Key UP Varasat Safeguards
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Statute Citations:</strong> Covers Sections 33, 34, 35, 39, and
                      107 to 110.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Traps:</strong> Flags unregistered farm Wills and Shreni
                      2 bars early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Portal Ready:</strong> Lists exact R.C. Form-9 and UP Bhulekh check
                      steps.
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
          href="#interactive-checker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Varasat Checker</span>
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
