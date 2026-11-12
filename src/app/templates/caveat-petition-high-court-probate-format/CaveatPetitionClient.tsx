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
  BookOpen,
  Scale,
  Building,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Building2,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Clock,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

// Table of Contents Items (matching IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Rules: Probate Caveats Under Succession Act" },
  { id: "interactive-calculator", label: "2. Free Probate Caveat & Limitation Calculator" },
  { id: "comparison-table", label: "3. Section 284 ISA vs Section 148A CPC Matrix" },
  { id: "caveatable-interest-anatomy", label: "4. Caveatable Interest & Five Essential Ingredients" },
  { id: "grounds-of-objection", label: "5. Grounds of Objection: Forgery & Coercion Rules" },
  { id: "high-court-jurisdictions", label: "6. High Court Registry Rules: Bombay, Delhi & More" },
  { id: "caveat-petition-template", label: "7. High Court Probate Caveat Format (Form 12)" },
  { id: "verification-affidavit-draft", label: "8. Sworn Verification Affidavit in Support Format" },
  { id: "sub-registrar-notice-draft", label: "9. Sub-Registrar Notice & Lis Pendens Freezing Draft" },
  { id: "procedural-sop", label: "10. Step-by-Step SOP: Lodgment to Contentious Suit" },
  { id: "landmark-case-studies", label: "11. Landmark Precedents: Jagjit Singh & KK Birla" },
  { id: "statutory-citations", label: "12. Statutory Citations & High Court Counsel Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Probate Caveats" },
];

interface CourtRegistryConfig {
  name: string;
  code: string;
  rulesAuthority: string;
  affidavitDays: number;
  courtFee: string;
  notes: string;
}

const HIGH_COURT_CONFIGS: Record<string, CourtRegistryConfig> = {
  bombay: {
    name: "Bombay High Court (Original Side)",
    code: "BHC-OS",
    rulesAuthority: "Bombay High Court Original Side Rules (Rule 397 to Rule 402)",
    affidavitDays: 8,
    courtFee: "Rs. 500 to Rs. 1,000",
    notes:
      "Strict 8-day deadline to file the sworn reply under Rule 399 after citation service. If missed, the caveat drops.",
  },
  delhi: {
    name: "Delhi High Court (Original Side)",
    code: "DHC-OS",
    rulesAuthority: "Delhi High Court Original Side Rules (Chapter XXV) & Practice Directions",
    affidavitDays: 14,
    courtFee: "Rs. 100 to Rs. 250",
    notes:
      "Applies when estate value exceeds Rs. 2 Crore. You get 14 days to file sworn objections.",
  },
  calcutta: {
    name: "Calcutta High Court (Original Side)",
    code: "CHC-OS",
    rulesAuthority: "Calcutta High Court Original Side Rules (Chapter XXXV)",
    affidavitDays: 14,
    courtFee: "Rs. 200 to Rs. 500",
    notes:
      "Follows Form 12. You must serve a copy on the Will maker lawyer within 48 hours.",
  },
  madras: {
    name: "Madras High Court (Original Side)",
    code: "MHC-OS",
    rulesAuthority: "Madras High Court Original Side Rules (Order XXV)",
    affidavitDays: 14,
    courtFee: "Rs. 200 to Rs. 400",
    notes:
      "Entered in the court caveat book. Converts the probate plea into a regular testamentary suit.",
  },
  district: {
    name: "District Court / Principal Civil Court",
    code: "DIST-COURT",
    rulesAuthority: "Indian Succession Act 1925 ss. 284 & 295 read with Civil Court Rules",
    affidavitDays: 14,
    courtFee: "Rs. 50 to Rs. 200",
    notes:
      "Used outside metro towns. The District Judge hears probate pleas and caveats under Section 284.",
  },
};

const FAQS = [
  {
    q: "What is a caveat petition in High Court probate proceedings?",
    a: "A probate caveat is an alert filed in court under Section 284 of the Indian Succession Act, 1925. It tells the judge not to grant probate of a Will without giving you prior notice. This stops secret grants.",
  },
  {
    q: "Why is a Section 148A CPC caveat rejected in probate courts?",
    a: "Section 148A of the CPC applies only to regular civil suits. Probate cases follow Section 284 and Form 12 of the Indian Succession Act. Special law always overrides general law. Court registries reject civil caveats in probate.",
  },
  {
    q: "Who has caveatable interest to stop probate under Indian law?",
    a: "Any legal heir who would inherit property if there were no Will has standing. This includes sons, daughters, widows, and mothers. Beneficiaries under an earlier valid Will also have standing under Supreme Court rulings.",
  },
  {
    q: "How long does a probate caveat remain valid in High Court?",
    a: "A civil caveat under CPC lasts only 90 days. But a probate caveat under Section 284 stays active for 6 full calendar months. You can renew it before the 6 months end if no petition is filed.",
  },
  {
    q: "What happens when a probate caveat is filed?",
    a: "The court cannot grant probate in secret. When the other side files for probate, the court sends you a notice. Under Section 295, the case becomes a regular contested suit. Both sides must lead oral and written evidence.",
  },
  {
    q: "What is the mandatory 8-day affidavit rule in Bombay High Court?",
    a: "Under Rule 399 of Bombay High Court rules, you must file your sworn objections within 8 days of receiving notice. If you miss this 8-day window, the court discharges your caveat, and probate proceeds without you.",
  },
  {
    q: "What grounds can be taken in the affidavit in support of caveat?",
    a: "You can argue that the Will maker lacked a sound mind. You can cite severe illness, ICU admission, or memory loss. You can also cite fake signatures, undue influence, or total exclusion of close family.",
  },
  {
    q: "Can a probate court decide real estate title disputes?",
    a: "No. A probate court only checks if the Will was duly signed by a capable person. It does not decide who owns the land. To freeze property sales, you must also file a civil title suit with an injunction plea.",
  },
  {
    q: "Why should a caveat notice be served on the Sub-Registrar?",
    a: "Serving notice on the land sub-registrar creates a legal freeze under Section 52 of the Transfer of Property Act. It stops the executor from selling or mutating the family home while the Will fight is in court.",
  },
  {
    q: "What court fee is payable for filing a probate caveat in High Court?",
    a: "Filing a caveat requires only a small court fee of Rs. 50 to Rs. 500, based on state court rules. Heavy probate duty is paid only by the person seeking probate when the case ends.",
  },
];

export default function CaveatPetitionClient() {
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
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE CAVEAT & LIMITATION CALCULATOR
  // ==========================================
  const [selectedForum, setSelectedForum] = useState<string>("delhi");
  const [relationshipType, setRelationshipType] = useState<string>("class1");
  const [caveatStage, setCaveatStage] = useState<string>("anticipatory");
  const [estateValuation, setEstateValuation] = useState<number>(35000000); // 3.5 Cr

  const forumData = HIGH_COURT_CONFIGS[selectedForum] || HIGH_COURT_CONFIGS.delhi;

  // Standing evaluation
  const standingResult = (() => {
    if (relationshipType === "class1") {
      return {
        hasStanding: true,
        badge: "Clear Standing (Class I Heir)",
        badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-300",
        message:
          "You have automatic standing. As a son, daughter, spouse, or mother, you inherit by law if the Will fails. The Supreme Court in Jagjit Singh confirms this right.",
      };
    } else if (relationshipType === "class2") {
      return {
        hasStanding: true,
        badge: "Conditional Standing (Class II Heir)",
        badgeStyle: "bg-blue-50 text-blue-800 border-blue-300",
        message:
          "You have standing if there are no Class I heirs. You must state in your oath paper that you are the closest living heir under Section 8 of the Hindu Succession Act.",
      };
    } else if (relationshipType === "prior_will") {
      return {
        hasStanding: true,
        badge: "Valid Standing (Earlier Will Heir)",
        badgeStyle: "bg-purple-50 text-purple-800 border-purple-300",
        message:
          "You have valid standing. Your share under the earlier genuine Will is cut off by this disputed new paper. You can challenge its signing in court.",
      };
    } else if (relationshipType === "title_claim") {
      return {
        hasStanding: false,
        badge: "Needs Civil Suit (Title Dispute)",
        badgeStyle: "bg-amber-50 text-amber-900 border-amber-300",
        message:
          "A probate court does not decide who owns the land. If you claim the land was never owned by the deceased, you must file a regular civil title suit.",
      };
    } else {
      return {
        hasStanding: false,
        badge: "No Standing (Creditor or Tenant)",
        badgeStyle: "bg-rose-50 text-rose-800 border-rose-300",
        message:
          "Tenants and unsecured lenders cannot challenge a Will in probate court unless they prove the Will was made to cheat them of their dues.",
      };
    }
  })();

  const calculateExpiryDate = () => {
    const today = new Date();
    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + 6);
    return expiry.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // ==========================================
  // COPY HANDLERS
  // ==========================================
  const copyTemplateToClipboard = () => {
    const templateText = `IN THE HIGH COURT OF JUDICATURE AT [DELHI / BOMBAY / CALCUTTA / MADRAS]
(TESTAMENTARY AND INTESTATE JURISDICTION)
CAVEAT PETITION NO. ______ OF 2026

IN THE MATTER OF:
THE INDIAN SUCCESSION ACT, 1925 (SECTION 284 & SCHEDULE V, FORM NO. 12)
AND
HIGH COURT ORIGINAL SIDE TESTAMENTARY RULES

AND

IN THE MATTER OF:
THE ESTATE AND ALLEGED LAST WILL OF:
LATE [FULL NAME OF DECEASED],
SON OF LATE [FATHER'S NAME],
RESIDED AT [LAST ADDRESS OF DECEASED],
DATE OF DEATH: [DATE OF DEATH]                                  ... DECEASED

BETWEEN:

[CAVEATOR FULL NAME],
SON / DAUGHTER / SPOUSE OF LATE [DECEASED],
AGED ABOUT [AGE] YEARS, RESIDING AT [ADDRESS],
AADHAAR NO: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F]                  ... CAVEATOR

VERSUS

[PROPOUNDER / PETITIONER NAME],
RESIDING AT [ADDRESS OF OPPOSITE PARTY],
CLAIMING TO BE EXECUTOR / BENEFICIARY                           ... INTENDED PETITIONER

----------------------------------------------------------------------------------
CAVEAT UNDER SECTION 284 OF THE INDIAN SUCCESSION ACT, 1925
----------------------------------------------------------------------------------

TO,
THE HON'BLE THE CHIEF JUSTICE AND COMPANION JUSTICES
OF THE HON'BLE HIGH COURT OF JUDICATURE AT [CITY]

THE HUMBLE CAVEAT PETITION OF THE CAVEATOR ABOVE-NAMED:

MOST RESPECTFULLY SHOWETH:

1. That the Caveator above-named is the [Son / Daughter / Widow / Mother] of Late [Deceased Name], who died on [Date of Death] at [Place of Death].

2. That the Caveator is a natural Class I legal heir under Section 8 of the Hindu Succession Act, 1956. In the absence of any valid Will, the Caveator is entitled to inherit a lawful share in the estate.

3. That the Caveator has learned that the Intended Petitioner [Name] is planning to file a petition before this Hon'ble Court seeking probate of an alleged Will dated [Date].

4. That the Caveator disputes the execution and validity of the alleged Will dated [Date]. The Caveator submits that the document is fake, procured by fraud, and executed without a sound disposing mind.

5. That the Caveator files this Caveat under Section 284 of the Indian Succession Act, 1925 and Form 12 of Schedule V. The Caveator prays that no grant of Probate or Letters of Administration be issued without prior written notice to the Caveator.

6. That the Caveator undertakes to file a sworn affidavit in support of this caveat within [8 days / 14 days] from the receipt of notice or citation.

PRAYER:
WHEREFORE, it is prayed that this Hon'ble Court may be pleased to:
(a) Register this Caveat in the Caveat Book under Section 284 of the Indian Succession Act;
(b) Order that no grant of Probate be made without prior formal notice to the Caveator; and
(c) Treat any probate petition filed by the Intended Petitioner as a contested suit under Section 295 ISA.

FILED BY:
________________________________________
[ADVOCATE NAME], ADVOCATE ON RECORD
ENROLLMENT NO: [ENROLLMENT NUMBER]
ADDRESS: [OFFICE ADDRESS]
DATE: [DATE]`;

    navigator.clipboard.writeText(templateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyAffidavitToClipboard = () => {
    const affidavitText = `IN THE HIGH COURT OF JUDICATURE AT [DELHI / BOMBAY / CALCUTTA / MADRAS]
(TESTAMENTARY AND INTESTATE JURISDICTION)
IN CAVEAT PETITION NO. ______ OF 2026
IN TESTAMENTARY PETITION NO. ______ OF 2026

IN THE MATTER OF:
ESTATE OF LATE [DECEASED NAME], DECEASED

[PROPOUNDER / PETITIONER NAME]                             ... PETITIONER
VERSUS
[CAVEATOR NAME]                                           ... CAVEATOR / OBJECTOR

----------------------------------------------------------------------------------
AFFIDAVIT IN SUPPORT OF CAVEAT UNDER SECTION 284 & 285 OF THE
INDIAN SUCCESSION ACT, 1925 READ WITH TESTAMENTARY RULES
----------------------------------------------------------------------------------

I, [Caveator Full Name], son of Late [Deceased Name], aged about [Age] years, residing at [Address], do hereby solemnly affirm and state on oath as under:

1. That I am the Caveator and the biological son / Class I legal heir of Late [Deceased Name].

2. LEGAL STANDING: The deceased died intestate on [Date]. Without a valid Will, I inherit an equal share in the estate under Section 8 of the Hindu Succession Act, 1956.

3. LACK OF SOUND MIND: On the alleged signing date [Date], the deceased was bedridden at [Hospital], suffering from dementia, and unable to understand what he signed.

4. SUSPICIOUS CIRCUMSTANCES: The petitioner actively procured the Will and brought his own witnesses. Under H. Venkatachala Iyengar v. B.N. Thimmajamma, the petitioner must clear all doubts.

5. UNNATURAL EXCLUSION: The alleged Will cuts off natural children without any valid reason.

6. FAKE SIGNATURES: The signatures on the alleged Will do not match bank records. The Caveator prays for forensic testing of the paper.

7. PRAYER: It is prayed that this Hon'ble Court treat the probate plea as a contested suit under Section 295 ISA and dismiss the petition.

DEPONENT

VERIFICATION:
Verified at [City] on this [Day] day of [Month], 2026 that paragraphs 1 to 7 are true to my personal knowledge.
DEPONENT`;

    navigator.clipboard.writeText(affidavitText);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyNoticeToClipboard = () => {
    const noticeText = `FORMAL NOTICE OF PROBATE CAVEAT & LIS PENDENS FREEZE
(Under Section 52 of the Transfer of Property Act, 1882 & Section 284 Indian Succession Act)

DATE: [Insert Date]

TO,
1. THE SUB-REGISTRAR OF ASSURANCES,
   [ZONE / DISTRICT OFFICE ADDRESS]

2. THE TEHSILDAR / REVENUE OFFICER,
   [TEHSIL OFFICE ADDRESS]

SUBJECT: NOTICE OF PENDING CAVEAT & LIS PENDENS OVER ESTATE OF LATE [DECEASED NAME] - DEMAND TO FREEZE LAND RECORD MUTATION AND SALE DEEDS.

Sir / Madam,

Under instructions from my client, [Caveator Name], residing at [Address], I serve this notice:

1. Late [Deceased Name], who owned the lands and flats listed in SCHEDULE 'A', passed away on [Date].

2. My client is the biological child and legal heir of the deceased. A court fight is pending over an alleged Will dated [Date] propounded by [Opposite Party Name].

3. My client has filed Caveat Petition No. ______ of 2026 before the Hon'ble High Court under Section 284 of the Indian Succession Act, 1925, challenging the Will as fake.

4. Under Section 52 of the Transfer of Property Act, 1882, these properties are subject to a pending court case (Lis Pendens). Any sale deed, gift deed, or mortgage executed during this case is voidable by law.

5. You are hereby called upon:
   (a) NOT to register any deed of sale, gift, or mortgage for the Schedule Properties; and
   (b) NOT to sanction any revenue mutation (Dakhil Kharij / Khata change) based on the disputed Will until final court orders.

SCHEDULE 'A' OF PROPERTIES:
[Plot/Flat No., Survey/Khasra No., Ward, Locality, Boundaries North/South/East/West].

Yours faithfully,

________________________________________
[ADVOCATE NAME], COUNSEL FOR CAVEATOR
BAR COUNCIL ENROLLMENT NO: [ENROLLMENT NO]
OFFICE ADDRESS: [OFFICE ADDRESS]`;

    navigator.clipboard.writeText(noticeText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 284 &amp; SCHEDULE V FORM 12</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            High Court Probate Caveat Petition Format &amp; Form 12
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted High Court probate caveat formats under Section 284 of the Indian
            Succession Act, 1925. Stop fraudulent ex-parte grants of probate, prevent unauthorized estate
            sales, and convert non-contentious probate into a full testamentary suit.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#caveat-petition-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Form 12 Caveat Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
            </button>
            <Link
              href="/services/high-court-testamentary-suit-contested-will-defense"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Caveat Counsel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 284</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY PROBATE CAVEAT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form 12</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SCHEDULE V PRESCRIBED FORMAT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">6 Months</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY CAVEAT DURATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 295</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CONVERTS TO CONTENTIOUS SUIT
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
                <span>Testamentary Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Indian Succession Act 1925 ss. 284, 285 &amp; 295, High Court Original
                Side Rules, Code of Civil Procedure 1908 s. 148A, and Transfer of Property Act 1882
                s. 52.
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Litigation Draft Pack</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need to stop an impending probate petition? Copy the official Form 12 caveat, sworn
                affidavit, and Sub-Registrar intimation notice.
              </p>
              <a
                href="#caveat-petition-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Complete Caveat</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/caveat-petition-high-court-probate-format-og.jpg"
                  alt="High Court Probate Caveat Petition Format Form 12 Under Indian Succession Act 1925"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Official High Court Testamentary Caveat: Section 284 ISA Form 12 &amp; Sub-Registrar Lis Pendens Notice
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: HIGH COURT PROBATE CAVEAT ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rejection of Generic CPC Section 148A Drafts:</strong> Civil caveats under
                    CPC Section 148A are rejected by High Court registries. Probate caveats must follow
                    Section 284 and Form 12 of the Indian Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Six Months Statutory Validity:</strong> A civil caveat lasts only 90 days.
                    A probate caveat stays alive for 6 full months under Section 284(4).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Converts to Contentious Suit:</strong> Under Section 295 ISA, your caveat
                    turns a quick probate plea into a full trial. The petitioner must prove the Will.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 8-Day or 14-Day Rule:</strong> When served with notice, you must file
                    your sworn reply within 8 days in Bombay or 14 days in Delhi, or your caveat drops.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Land Office Notice:</strong> A court caveat does not stop sales on its own.
                    You must send notice to the land sub-registrar to freeze the property records.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: Probate Caveats Under Succession Act
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a family member dies, fights can start fast. Someone may take a fake Will to court.
                  They may try to get probate in secret. In cities like Mumbai, Delhi, and Kolkata, probate is
                  needed to claim bank money or sell family land.
                </p>
                <p>
                  Indian law gives you a shield called a <strong>Caveat</strong> under{" "}
                  <strong>Section 284 of the Indian Succession Act, 1925</strong>. It tells the court not to
                  grant probate without hearing you first. You must file it in <strong>Form 12</strong>.
                </p>
                <p>
                  Section 285 bars the court from making any grant until you get notice. The other party
                  must send you a full copy of their plea and the Will. You get time to read it and check the sign.
                </p>
                <p>
                  Under <strong>Section 295 of the Act</strong>, the case turns into a regular suit. The other
                  person becomes the plaintiff. You become the defendant. The other person must bring both
                  witnesses to court. You can cross-examine them to show the truth.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE LITIGATION DIAGNOSTIC TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Probate Caveat &amp; Limitation Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this simple tool to test your legal standing, find your court, check your deadlines, and
                see how many days you have to file your sworn reply.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Forum Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Court Jurisdiction</span>
                    </label>
                    <select
                      value={selectedForum}
                      onChange={(e) => setSelectedForum(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(HIGH_COURT_CONFIGS).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Relationship / Standing */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Your Legal Relationship</span>
                    </label>
                    <select
                      value={relationshipType}
                      onChange={(e) => setRelationshipType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="class1">Class I Legal Heir (Son / Daughter / Spouse)</option>
                      <option value="class2">Class II Legal Heir (Brother / Sister / Nephew)</option>
                      <option value="prior_will">Beneficiary under an Earlier Valid Will</option>
                      <option value="title_claim">Adverse Title Claimant (Property not Testator's)</option>
                      <option value="creditor">Unsecured Creditor / Tenant of Estate</option>
                    </select>
                  </div>

                  {/* Caveat Stage */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Filing Stage</span>
                    </label>
                    <select
                      value={caveatStage}
                      onChange={(e) => setCaveatStage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="anticipatory">Anticipatory (Before Probate Petition Filed)</option>
                      <option value="citation_issued">Urgent (Citation / Notice Received)</option>
                      <option value="renewal">Caveat Renewal (Approaching 6 Months)</option>
                    </select>
                  </div>
                </div>

                {/* Estate Valuation Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Disputed Estate Valuation: {formatINR(estateValuation)}
                    </label>
                    <span className="text-xs font-semibold text-slate-500">
                      High Court Pecuniary Threshold
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={200000000}
                    step={2500000}
                    value={estateValuation}
                    onChange={(e) => setEstateValuation(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>Rs. 20 Lakhs (District Court)</span>
                    <span>Rs. 2.00 Cr (Delhi HC Threshold)</span>
                    <span>Rs. 10.00 Cr</span>
                    <span>Rs. 20.00 Cr</span>
                  </div>
                </div>

                {/* Standing & Diagnostic Card */}
                <div className="p-4 rounded-2xl border space-y-2 bg-slate-50/80 border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Supreme Court Caveatable Interest Audit</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${standingResult.badgeStyle}`}>
                      {standingResult.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {standingResult.message}
                  </p>
                </div>

                {/* COMPUTATION RESULTS BOX */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        OFFICIAL LITIGATION ROADMAP &amp; REGISTRY PARAMETERS
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      Section 284 ISA Protected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Statutory Caveat Validity
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        6 Months
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Valid until: {calculateExpiryDate()}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Post-Citation Affidavit Rule
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-rose-300 mt-1">
                        Strictly {forumData.affidavitDays} Days
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {forumData.code} mandatory filing window
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Estimated Caveat Court Fee
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                        {forumData.courtFee}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Nominal fee (Ad-valorem duty on petitioner)
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-slate-200 space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
                      <span>Registry Protocol for {forumData.name}:</span>
                    </div>
                    <p className="leading-relaxed text-[11px] text-slate-300">
                      {forumData.notes} Ensure your advocate lodges the caveat in the Testamentary
                      Department using Form 12 and issues a concurrent notice to the Sub-Registrar under
                      Section 52 of the Transfer of Property Act.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPETITOR GAP &amp; BLIND SPOT ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 284 ISA vs Section 148A CPC Matrix
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Why do generic web formats fail? Most online portals give you an ordinary civil caveat under
                Section 148A of the Code of Civil Procedure. When you file that in a probate court, the clerk
                rejects it. Here is why you must use Section 284 instead:
              </p>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-4 font-bold">Litigation Parameter</th>
                      <th className="p-4 font-bold text-emerald-300">
                        Section 284 ISA Form 12 (WillDrafting)
                      </th>
                      <th className="p-4 font-bold text-rose-300">
                        Section 148A CPC Caveat (Generic Portals)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-4 font-extrabold text-slate-900">Governing Statute</td>
                      <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                        Indian Succession Act, 1925 (Special Law)
                      </td>
                      <td className="p-4 text-rose-800 font-semibold bg-rose-50/30">
                        Code of Civil Procedure, 1908 (General Law)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-4 font-extrabold text-slate-900">Prescribed Statutory Form</td>
                      <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                        Schedule V, Form No. 12 &amp; Testamentary Rules
                      </td>
                      <td className="p-4 text-rose-800 font-semibold bg-rose-50/30">
                        Generic Civil Caveat Format (No Form 12)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-4 font-extrabold text-slate-900">High Court Registry Status</td>
                      <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                        Accepted and entered into Testamentary Register
                      </td>
                      <td className="p-4 text-rose-800 font-semibold bg-rose-50/30">
                        Rejected with registry objections or unserved
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-4 font-extrabold text-slate-900">Duration of Validity</td>
                      <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                        6 Calendar Months (Renewable)
                      </td>
                      <td className="p-4 text-rose-800 font-semibold bg-rose-50/30">
                        Strictly 90 Days under Section 148A(5) CPC
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-4 font-extrabold text-slate-900">Legal Consequence</td>
                      <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                        Converts into Contentious Testamentary Suit (s. 295)
                      </td>
                      <td className="p-4 text-rose-800 font-semibold bg-rose-50/30">
                        Only entitles caveator to notice before ad-interim stay
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-4 font-extrabold text-slate-900">Affidavit Requirement</td>
                      <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                        Mandatory Affidavit in Support within 8 to 14 days
                      </td>
                      <td className="p-4 text-rose-800 font-semibold bg-rose-50/30">
                        No affidavit required until application is argued
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: ANATOMY & CAVEATABLE INTEREST */}
            <section id="caveatable-interest-anatomy" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>ESSENTIAL LITIGATION PREREQUISITES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Caveatable Interest &amp; Five Essential Ingredients
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                You must have a real stake in the estate to file a caveat. The Supreme Court in <em>Jagjit
                Singh v. Pamela Manmohan Singh</em> made this clear. You must prove you would inherit if the Will
                is set aside. A valid caveat needs these five things:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Element 1</span>
                    <span className="text-[11px] font-bold text-slate-500">Legal Share</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Intestate Inheritance Rights
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must show that without the Will, you get a share by law. This applies to sons,
                    daughters, widows, and mothers under Section 8 of the Hindu Succession Act.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Element 2</span>
                    <span className="text-[11px] font-bold text-slate-500">Exact Words</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Schedule V Wording Compliance
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must use the exact legal phrase: &ldquo;Let nothing be done in the estate without
                    notice to me.&rdquo; If you change these words, the court clerk can reject your paper.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Element 3</span>
                    <span className="text-[11px] font-bold text-slate-500">Local Address</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Registered Address for Service
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must give a local city address where the court can send notice. Your advocate on
                    record signs the paper along with you.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Element 4</span>
                    <span className="text-[11px] font-bold text-slate-500">Oath Promise</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Affidavit Filing Undertaking
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must promise to file your sworn reply within 8 days in Bombay or 14 days in Delhi once
                    notice comes. If you do not make this promise, your paper is not complete.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: GROUNDS OF OBJECTION */}
            <section id="grounds-of-objection" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>LEGAL DEFENSE GROUNDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Grounds of Objection: Forgery &amp; Coercion Rules
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When you file your sworn reply, you must state clear, true facts. You cannot just say the Will is
                bad. The Supreme Court in <em>Venkatachala Iyengar</em> set down the main legal grounds you can use:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    <span>Lack of Sound Mind (Section 59 Indian Succession Act)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must understand what they sign. If your parent was in an ICU, had deep memory
                    loss, or was in a coma, you can show hospital bills and doctor notes to prove they could not sign.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    <span>Active Role Played by One Child</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Did one child hire the typist, bring their own friends as witnesses, and keep all others
                    away? The court treats this with suspicion. That child must clear all doubts in court.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    <span>Total Exclusion of Close Family</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Did the Will cut off a loving spouse or kids for no stated reason? While people can leave
                    gifts to anyone, courts look closely when close family gets nothing without an explanation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    <span>Fake Signs and Forensic Lab Check</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If the sign on the Will does not match past bank cards, you can ask the judge to send the
                    paper to the forensic lab (CFSL) for expert handwriting checks.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: HIGH COURT JURISDICTION RULES */}
            <section id="high-court-jurisdictions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATE HIGH COURT PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. High Court Registry Rules: Bombay, Delhi &amp; More
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Each High Court has its own rules for probate cases. Learn your court rules before filing:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(HIGH_COURT_CONFIGS).map(([key, item]) => (
                  <div key={key} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">{item.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                        {item.affidavitDays} Days Rule
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-[#5F7E75]">{item.rulesAuthority}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.notes}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Limitation Warning:</strong> In Bombay High Court, Rule 399 is fatal if missed.
                  If the Caveator fails to file the Affidavit in Support within 8 days from service of citation,
                  the Prothonotary &amp; Senior Master marks the caveat as discharged. Once discharged, probate is
                  granted without any further notice!
                </span>
              </div>
            </section>

            {/* SECTION 7: COMPLETE CAVEAT TEMPLATE (FORM 12) */}
            <section id="caveat-petition-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LAWYER-VETTED LEGAL DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. High Court Probate Caveat Format (Form 12)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is the verified, registry-tested High Court Probate Caveat petition format compliant with
                Section 284 and Schedule V Form 12 of the Indian Succession Act, 1925:
              </p>

              {/* Template Container Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      HIGH COURT PROBATE CAVEAT PETITION (FORM 12)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyTemplateToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      {copiedTemplate ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Form 12 Caveat!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Form 12 Format</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 max-h-[600px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {`IN THE HIGH COURT OF JUDICATURE AT [DELHI / BOMBAY / CALCUTTA / MADRAS]
(TESTAMENTARY AND INTESTATE JURISDICTION)
CAVEAT PETITION NO. ______ OF 2026

IN THE MATTER OF:
THE INDIAN SUCCESSION ACT, 1925 (SECTION 284 & SCHEDULE V, FORM NO. 12)
AND
HIGH COURT ORIGINAL SIDE TESTAMENTARY RULES

AND

IN THE MATTER OF:
THE ESTATE AND ALLEGED LAST WILL OF:
LATE [FULL NAME OF DECEASED],
SON OF LATE [FATHER'S NAME],
RESIDED AT [LAST ADDRESS OF DECEASED],
DATE OF DEATH: [DATE OF DEATH]                                  ... DECEASED

BETWEEN:

[CAVEATOR FULL NAME],
SON / DAUGHTER / SPOUSE OF LATE [DECEASED],
AGED ABOUT [AGE] YEARS, OCCUPATION: [OCCUPATION],
RESIDING AT [COMPLETE POSTAL ADDRESS],
AADHAAR NO: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F]                  ... CAVEATOR

VERSUS

[PROPOUNDER / PETITIONER NAME],
RESIDING AT [ADDRESS OF OPPOSITE PARTY],
CLAIMING TO BE EXECUTOR / BENEFICIARY                           ... INTENDED PETITIONER

----------------------------------------------------------------------------------
CAVEAT UNDER SECTION 284 OF THE INDIAN SUCCESSION ACT, 1925
----------------------------------------------------------------------------------

TO,
THE HON'BLE THE CHIEF JUSTICE AND COMPANION JUSTICES
OF THE HON'BLE HIGH COURT OF JUDICATURE AT [CITY]

THE HUMBLE CAVEAT PETITION OF THE CAVEATOR ABOVE-NAMED:

MOST RESPECTFULLY SHOWETH:

1. That the Caveator above-named is the [Son / Daughter / Widow / Mother] of Late [Deceased Name], who died on [Date of Death] at [Place of Death].

2. That the Caveator is a natural Class I legal heir under Section 8 of the Hindu Succession Act, 1956. In the absence of any valid Will, the Caveator is entitled to inherit a lawful share in the estate.

3. That the Caveator has learned that the Intended Petitioner [Name] is planning to file a petition before this Hon'ble Court seeking probate of an alleged Will dated [Date].

4. That the Caveator disputes the execution and validity of the alleged Will dated [Date]. The Caveator submits that the document is fake, procured by fraud, and executed without a sound disposing mind.

5. That the Caveator files this Caveat under Section 284 of the Indian Succession Act, 1925 and Form 12 of Schedule V. The Caveator prays that no grant of Probate or Letters of Administration be issued without prior written notice to the Caveator.

6. That the Caveator undertakes to file a sworn affidavit in support of this caveat within [8 days / 14 days] from the receipt of notice or citation.

PRAYER:
WHEREFORE, it is prayed that this Hon'ble Court may be pleased to:
(a) Register this Caveat in the Caveat Book under Section 284 of the Indian Succession Act;
(b) Order that no grant of Probate be made without prior formal notice to the Caveator; and
(c) Treat any probate petition filed by the Intended Petitioner as a contested suit under Section 295 ISA.

FILED BY:
________________________________________
[ADVOCATE NAME], ADVOCATE ON RECORD
ENROLLMENT NO: [ENROLLMENT NUMBER]
ADDRESS: [OFFICE ADDRESS]
DATE: [DATE]`}
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                  <span>Draft compliant with Indian Succession Act Schedule V Form 12</span>
                  <button
                    onClick={copyTemplateToClipboard}
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 8: VERIFICATION AFFIDAVIT IN SUPPORT */}
            <section id="verification-affidavit-draft" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>MANDATORY OBJECTION PLEADING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Sworn Verification Affidavit in Support Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Filing the Form 12 caveat is step one. When the petitioner institutes the probate petition and
                serves citation, you must file this sworn Affidavit in Support stating all specific grounds of
                challenge:
              </p>

              {/* Affidavit Container Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      AFFIDAVIT IN SUPPORT OF CAVEAT (SECTION 284 &amp; 285)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyAffidavitToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      {copiedAffidavit ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Affidavit!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Affidavit Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 max-h-[500px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {`IN THE HIGH COURT OF JUDICATURE AT [DELHI / BOMBAY / CALCUTTA / MADRAS]
(TESTAMENTARY AND INTESTATE JURISDICTION)
IN CAVEAT PETITION NO. ______ OF 2026
IN TESTAMENTARY PETITION NO. ______ OF 2026

IN THE MATTER OF:
ESTATE OF LATE [DECEASED NAME], DECEASED

[PROPOUNDER / PETITIONER NAME]                             ... PETITIONER
VERSUS
[CAVEATOR NAME]                                           ... CAVEATOR / OBJECTOR

----------------------------------------------------------------------------------
AFFIDAVIT IN SUPPORT OF CAVEAT UNDER SECTION 284 & 285 OF THE
INDIAN SUCCESSION ACT, 1925 READ WITH TESTAMENTARY RULES
----------------------------------------------------------------------------------

I, [Caveator Full Name], son of Late [Deceased Name], aged about [Age] years, residing at [Address], do hereby solemnly affirm and state on oath as under:

1. That I am the Caveator and the biological son / Class I legal heir of Late [Deceased Name].

2. LEGAL STANDING: The deceased died intestate on [Date]. Without a valid Will, I inherit an equal share in the estate under Section 8 of the Hindu Succession Act, 1956.

3. LACK OF SOUND MIND: On the alleged signing date [Date], the deceased was bedridden at [Hospital], suffering from dementia, and unable to understand what he signed.

4. SUSPICIOUS CIRCUMSTANCES: The petitioner actively procured the Will and brought his own witnesses. Under H. Venkatachala Iyengar v. B.N. Thimmajamma, the petitioner must clear all doubts.

5. UNNATURAL EXCLUSION: The alleged Will cuts off natural children without any valid reason.

6. FAKE SIGNATURES: The signatures on the alleged Will do not match bank records. The Caveator prays for forensic testing of the paper.

7. PRAYER: It is prayed that this Hon'ble Court treat the probate plea as a contested suit under Section 295 ISA and dismiss the petition.

DEPONENT

VERIFICATION:
Verified at [City] on this [Day] day of [Month], 2026 that paragraphs 1 to 7 are true to my personal knowledge.
DEPONENT`}
                </div>
              </div>
            </section>

            {/* SECTION 9: SUB-REGISTRAR NOTICE */}
            <section id="sub-registrar-notice-draft" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>ESTATE PROTECTION MECHANISM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Sub-Registrar Notice &amp; Lis Pendens Freezing Draft
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Filing a caveat in High Court does not automatically update municipal or land revenue records.
                Unscrupulous executors often attempt to sell or mortgage the family home before probate is adjudicated.
                Serve this statutory notice on the local Sub-Registrar and Tehsildar under Section 52 of the Transfer
                of Property Act, 1882 (Doctrine of Lis Pendens):
              </p>

              {/* Sub-Registrar Notice Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>Statutory Freezing Notice (Section 52 TPA)</span>
                  </div>
                  <button
                    onClick={copyNoticeToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors"
                  >
                    {copiedNotice ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Notice Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Sub-Registrar Notice</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 overflow-x-auto">
                  &ldquo;TO THE SUB-REGISTRAR OF ASSURANCES: TAKE NOTICE that in respect of the estate properties
                  of Late [Deceased Name], a testamentary caveat bearing Caveat No. [Number] of 2026 is pending before
                  the Hon&apos;ble High Court under Section 284 of the Indian Succession Act. Pursuant to Section 52 of the
                  Transfer of Property Act, 1882 (Lis Pendens), any conveyance deed, sale deed, mortgage, or mutation
                  executed pending final decree is voidable. You are hereby called upon to freeze registration and mutation
                  extracts until final court orders.&rdquo;
                </div>
              </div>
            </section>

            {/* SECTION 10: PROCEDURAL STEP-BY-STEP SOP */}
            <section id="procedural-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL STEP-BY-STEP PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Lodgment to Contentious Suit
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Drafting Form 12 & Caveatable Interest Grounding",
                    desc: "Draft the petition strictly conforming to Schedule V Form 12 of the Indian Succession Act and High Court Original Side Rules, detailing kinship as a Class I or Class II legal heir.",
                  },
                  {
                    step: 2,
                    title: "Procurement of Court Fee Stamp & Filing in Registry",
                    desc: "Procure the requisite court fee stamp (Rs. 100 to Rs. 500) and file the caveat before the Testamentary & Intestate Registry (or Prothonotary & Senior Master). Obtain Caveat filing number.",
                  },
                  {
                    step: 3,
                    title: "Service of Intimation on Sub-Registrar & Banks",
                    desc: "Dispatch registered speed post notices enclosing the caveat receipt to the local Sub-Registrar, Municipal Corporation (Khata bifurcation), and banks holding deceased accounts.",
                  },
                  {
                    step: 4,
                    title: "Receipt of Citation / Notice of Probate Petition",
                    desc: "When the executor files the probate petition, the High Court Registry issues citation notice to you instead of proceeding ex-parte. Track registry listings weekly.",
                  },
                  {
                    step: 5,
                    title: "Filing Affidavit in Support within 8 to 14 Days",
                    desc: "Crucial deadline: File the comprehensive Affidavit in Support of Caveat within strictly 8 days (Bombay High Court Rule 399) or 14 days (Delhi / Calcutta High Court) detailing forgery and suspicious circumstances.",
                  },
                  {
                    step: 6,
                    title: "Conversion to Contentious Testamentary Suit (T.S.)",
                    desc: "Under Section 295 ISA, the court re-numbers the matter as a regular suit. The executor is directed to lead evidence and examine attesting witnesses under Section 68 of the Evidence Act.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: LANDMARK CASE STUDIES */}
            <section id="landmark-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL REAL-WORLD PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Landmark Precedents: Jagjit Singh &amp; KK Birla
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>SUPREME COURT OF INDIA (2010 5 SCC 157)</span>
                    <span className="text-slate-500 font-semibold">Locus Standi Test</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Jagjit Singh v. Pamela Manmohan Singh
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Supreme Court held that any person who would inherit an interest in the estate in the
                    event of intestacy has an undeniable caveatable interest. The court ruled that it is not necessary
                    for the caveator to establish absolute ownership; showing a slight legal interest that would be
                    adversely affected by the grant of probate is sufficient to maintain a caveat.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>SUPREME COURT OF INDIA (2008 4 SCC 300)</span>
                    <span className="text-slate-500 font-semibold">Title vs Testamentary Standing</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Krishna Kumar Birla v. Rajendra Singh Lodha
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Supreme Court settled that an adverse title claimant (claiming that the estate properties
                    did not belong to the testator) cannot file a caveat in probate proceedings. The probate court
                    is concerned only with the question whether the Will was duly executed by a capable testator,
                    not with title. Such parties must file a separate civil suit for declaration of title.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>DELHI HIGH COURT (TESTAMENTARY JURISDICTION)</span>
                    <span className="text-slate-500 font-semibold">Ex-Parte Grant Revocation</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Smt. Savitri Devi v. Smt. Bimla Devi
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The High Court held that where a legal heir has lodged a valid caveat under Section 284, any
                    probate granted without issuing formal citation to the caveator is void ab initio. Under Section
                    263 of the Indian Succession Act, such a grant must be revoked immediately for just cause.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: STATUTORY CITATIONS & PROFILE */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; DESK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Citations &amp; High Court Counsel Desk
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Primary Governing Testamentary &amp; Civil Authorities:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Indian Succession Act, 1925 ss. 284, 285 &amp; 295:</strong> Statutory lodgment of
                    caveats, prohibition on ex-parte grants, and conversion into contentious testamentary suits.
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925 Schedule V Form 12:</strong> Mandatory statutory form
                    prescribed for all probate caveats.
                  </li>
                  <li>
                    <strong>High Court Original Side Rules:</strong> Bombay High Court Rules 397-402, Delhi High
                    Court Original Side Rules Chapter XXV, Calcutta High Court Chapter XXXV.
                  </li>
                  <li>
                    <strong>Code of Civil Procedure, 1908 s. 148A &amp; Order 39:</strong> General caveat limits
                    and temporary injunction principles.
                  </li>
                  <li>
                    <strong>Transfer of Property Act, 1882 s. 52:</strong> Statutory doctrine of Lis Pendens
                    restraining alienation during pending litigation.
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/services/high-court-testamentary-suit-contested-will-defense"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    High Court Caveat Counsel
                  </Link>
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Templates Hub
                  </Link>
                  <Link
                    href="/templates/partition-deed-format-between-family-members"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Family Partition Deed Format
                  </Link>
                  <Link
                    href="/templates/cross-purchase-buy-sell-agreement-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Buy-Sell Agreement Format
                  </Link>
                  <Link
                    href="/templates/llp-partner-transmission-notice-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    LLP Transmission Notice
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Schedule Legal Consultation
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Probate Caveats
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SUMMARY PLAIN ENGLISH CARDS FOR HIGH READABILITY */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why File a Caveat Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A caveat blocks secret court orders. It forces the executor to send you copies of the Will.
                  You get your chance to prove if the document is fake before any probate grant is signed.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Court Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Do not use a simple civil caveat format. High Courts demand Form 12 under the Indian Succession Act.
                  Once you get the notice, file your sworn objections fast to keep your defense alive.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court advocates draft your Form 12 caveat and sworn affidavit. We file directly in the
                  testamentary registry and notify the land office to freeze property transfers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/60">
                <p className="text-xs font-bold text-slate-900 mb-1">How to Stop Land Sale</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Give notice to the land office right away. This stops the other party from selling the flat.
                  The sub-registrar will freeze the file while the court case is on.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                <p className="text-xs font-bold text-slate-900 mb-1">Equal Rights for All Heirs</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The law protects sons and daughters. If a fake Will is thrown out, all legal heirs take
                  equal shares. Act now to protect your family rights.
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
                    Senior Testamentary Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in High Court testamentary litigation, contested Will defense, Section 284 caveats,
                and CFSL forensic signature verification at AMA Legal Solutions.
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
                  <span>PREVENT FORGED WILL PROBATES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family Estate from Fraudulent Claims
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A registered, lawyer-vetted Will with medical fitness certification prevents
                  unscrupulous relatives from filing fraudulent probate petitions.
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
                  <span>Lawyer Reviewed &amp; High Court Tested</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>HIGH COURT CAVEAT COUNSEL</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Suspect a Forged Will Is Being Filed in High Court?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior testamentary advocates file emergency Form 12 caveats in Bombay, Delhi,
                  Calcutta, and Madras High Courts within 24 hours.
                </p>
                <Link
                  href="/services/high-court-testamentary-suit-contested-will-defense"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Schedule Caveat Counsel</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Litigants Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 284 Form 12:</strong> Compliant with High Court Original Side Rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>6-Month Protection:</strong> Prevents sneak ex-parte probate grants.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Lis Pendens Freezing:</strong> Notifies Sub-Registrar to stop estate transfers.
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
          href="#caveat-petition-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Form 12 Draft</span>
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
