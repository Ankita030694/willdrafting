"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Copy,
  Check,
  ShieldCheck,
  Scale,
  FileText,
  BookOpen,
  Gavel,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Home,
  Landmark,
  ExternalLink,
  Clock,
  Building2,
  ScrollText,
} from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface GiftDeedRevocationClientProps {
  faqItems: FaqItem[];
}

type RelationshipType = "son" | "daughter" | "daughter-in-law" | "relative";
type ConditionRouteType =
  | "express-clause"
  | "vachan-patra"
  | "no-written-clause";

const tocItems = [
  { id: "overview", label: "1. Section 23 Petition Guide" },
  { id: "interactive-builder", label: "2. Customize Petition & Prayer" },
  { id: "sudesh-chhikara-compliance", label: "3. Sudesh Chhikara Compliance" },
  { id: "tribunal-petition-draft", label: "4. Section 23 Application Draft" },
  { id: "eviction-prayer-affidavit", label: "5. Eviction Prayer & Affidavit" },
  { id: "tribunal-vs-civil-court", label: "6. Tribunal vs Civil Court" },
  { id: "filing-sop", label: "7. Step-by-Step Filing SOP" },
  { id: "supporting-evidence", label: "8. Supporting Evidence List" },
  { id: "landmark-case-studies", label: "9. Real Case Scenarios" },
  { id: "related-resources", label: "10. Citations & Related Tools" },
  { id: "faqs", label: "11. Frequently Asked Questions" },
  { id: "plain-english-summary", label: "12. Plain-English Takeaways" },
];

export default function GiftDeedRevocationClient({
  faqItems,
}: GiftDeedRevocationClientProps) {
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

  // Interactive Customizer State
  const [petitionerName, setPetitionerName] = useState("Ramesh Kumar Sharma");
  const [petitionerAge, setPetitionerAge] = useState("72");
  const [petitionerAddress, setPetitionerAddress] = useState(
    "House No. 42, Sector 14, Gurugram, Haryana"
  );
  const [respondentName, setRespondentName] = useState("Vikram Sharma");
  const [relationship, setRelationship] = useState<RelationshipType>("son");
  const [tribunalCity, setTribunalCity] = useState("Gurugram");
  const [propertyDescription, setPropertyDescription] = useState(
    "Residential House No. 42, Sector 14, measuring 250 sq. yds."
  );
  const [deedDocNo, setDeedDocNo] = useState("1845");
  const [deedRegDate, setDeedRegDate] = useState("15 March 2021");
  const [subRegistrarOffice, setSubRegistrarOffice] = useState(
    "Sub-Registrar, Tehsil Gurugram"
  );
  const [conditionRoute, setConditionRoute] =
    useState<ConditionRouteType>("express-clause");
  const [includeEvictionPrayer, setIncludeEvictionPrayer] = useState(true);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const applyPreset = (
    preset: "son-eviction" | "daughter-food" | "blank"
  ) => {
    if (preset === "son-eviction") {
      setPetitionerName("Ramesh Kumar Sharma");
      setPetitionerAge("72");
      setPetitionerAddress("House No. 42, Sector 14, Gurugram, Haryana");
      setRespondentName("Vikram Sharma");
      setRelationship("son");
      setTribunalCity("Gurugram");
      setPropertyDescription(
        "Residential House No. 42, Sector 14, measuring 250 sq. yds."
      );
      setDeedDocNo("1845");
      setDeedRegDate("15 March 2021");
      setSubRegistrarOffice("Sub-Registrar, Tehsil Gurugram");
      setConditionRoute("express-clause");
      setIncludeEvictionPrayer(true);
    } else if (preset === "daughter-food") {
      setPetitionerName("Meera Devi");
      setPetitionerAge("69");
      setPetitionerAddress("Flat No. 304, Shanti Apartments, Pune, Maharashtra");
      setRespondentName("Anjali Deshmukh");
      setRelationship("daughter");
      setTribunalCity("Pune");
      setPropertyDescription(
        "Flat No. 304, Third Floor, Shanti Apartments, measuring 1,100 sq. ft."
      );
      setDeedDocNo("4912");
      setDeedRegDate("09 August 2020");
      setSubRegistrarOffice("Sub-Registrar, Haveli, Pune");
      setConditionRoute("vachan-patra");
      setIncludeEvictionPrayer(true);
    } else {
      setPetitionerName("[FULL NAME OF SENIOR CITIZEN]");
      setPetitionerAge("[AGE]");
      setPetitionerAddress("[COMPLETE RESIDENTIAL ADDRESS]");
      setRespondentName("[FULL NAME OF RESPONDENT]");
      setRelationship("son");
      setTribunalCity("[DISTRICT / SUB-DIVISION NAME]");
      setPropertyDescription("[FULL SCHEDULE AND DESCRIPTION OF PROPERTY]");
      setDeedDocNo("[DOCUMENT NO.]");
      setDeedRegDate("[REGISTRATION DATE]");
      setSubRegistrarOffice("[NAME OF SUB-REGISTRAR OFFICE]");
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2400);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2400);
    }
  };

  const relationshipLabel = useMemo(() => {
    switch (relationship) {
      case "daughter":
        return "Daughter";
      case "daughter-in-law":
        return "Daughter-in-Law";
      case "relative":
        return "Legal Heir / Relative";
      default:
        return "Son";
    }
  }, [relationship]);

  const complianceStatus = useMemo(() => {
    if (conditionRoute === "express-clause") {
      return {
        tone: "emerald" as const,
        badge: "Sudesh Chhikara Twin Test Met",
        title: "Strongest Statutory Ground Under Section 23(1)",
        summary:
          "Your registered Gift Deed directly states the maintenance condition. Attach the deed and proof of neglect to seek voidance and eviction.",
      };
    }
    if (conditionRoute === "vachan-patra") {
      return {
        tone: "blue" as const,
        badge: "Urmila Dixit (2025 SC) Shield",
        title: "Contemporaneous Vachan Patra / Undertaking Route",
        summary:
          "Attach the same-day undertaking letter (Vachan Patra) alongside the Gift Deed. Under Urmila Dixit (2025 INSC 20), courts read both documents together.",
      };
    }
    return {
      tone: "amber" as const,
      badge: "Strict Scrutiny Alert",
      title: "No Written Condition in Gift Deed: Alternate Relief Needed",
      summary:
        "After Sudesh Chhikara (2022), a purely silent deed faces dismissal on cancellation. Plead Section 22 State Rules eviction plus Section 4 and 9 monthly maintenance.",
    };
  }, [conditionRoute]);

  const conditionClauseDraft = useMemo(() => {
    if (conditionRoute === "express-clause") {
      return `4. CONDITION PRECEDENT OF TRANSFER (SUDESH CHHIKARA COMPLIANCE): That the aforesaid transfer by way of Registered Gift Deed dated ${deedRegDate} was expressly made subject to the mandatory condition under Clause [CLAUSE NO.] thereof that the Respondent (${relationshipLabel}) shall provide regular meals, basic amenities, medical care, residence, and physical needs to the Petitioner during the Petitioner's lifetime. Copies of the Registered Gift Deed are annexed hereto as Annexure P-2.`;
    }
    if (conditionRoute === "vachan-patra") {
      return `4. CONTEMPORANEOUS CONDITION OF MAINTENANCE (URMILA DIXIT v. SUNIL SHARAN DIXIT, 2025 INSC 20): That simultaneously with the execution of the Registered Gift Deed dated ${deedRegDate}, the Respondent (${relationshipLabel}) executed a written Vachan Patra / Undertaking dated ${deedRegDate} promising to provide food, medical expenses, shelter, and personal care to the Petitioner for life. The Gift Deed and Vachan Patra formed a single transaction. Both documents are annexed as Annexure P-2 and Annexure P-2A.`;
    }
    return `4. IMPLIED DUTY & ALTERNATIVE PRAYER UNDER SECTIONS 4, 9 & 22: That the Petitioner executed the Registered Gift Deed dated ${deedRegDate} out of natural love, trust, and oral assurance of lifelong care and food by the Respondent (${relationshipLabel}). Even if this Hon'ble Tribunal examines the absence of a written covenant in light of Sudesh Chhikara v. Ramti Devi (2022 SC), the Petitioner remains fully entitled to monthly maintenance under Section 9 and protective eviction under Section 22 State Rules.`;
  }, [conditionRoute, deedRegDate, relationshipLabel]);

  const petitionDraft = useMemo(() => {
    const evictionParagraph = includeEvictionPrayer
      ? `\n(c) Pass an order of summary eviction under Section 22 of the Act read with State Senior Citizens Rules, directing the Respondent and all persons claiming through the Respondent to peacefully vacate and hand over vacant possession of ${propertyDescription} to the Petitioner;\n(d) Direct the local Station House Officer (SHO) and District Magistrate to render police assistance for peaceful enforcement of possession and protection of life and property of the Petitioner;`
      : "";

    return `BEFORE THE HON'BLE MAINTENANCE TRIBUNAL / SUB-DIVISIONAL OFFICER (SDO)
AT ${tribunalCity.toUpperCase()}

APPLICATION NO. ________ OF 2026
UNDER SECTIONS 23, 5, 9 AND 22 OF THE MAINTENANCE AND WELFARE OF PARENTS AND SENIOR CITIZENS ACT, 2007

IN THE MATTER OF:
${petitionerName}, aged about ${petitionerAge} years,
Resident of ${petitionerAddress}
... APPLICANT / SENIOR CITIZEN

VERSUS

${respondentName}, (${relationshipLabel} of the Applicant),
Currently residing at ${petitionerAddress}
... RESPONDENT

SUB: PETITION FOR DECLARATION OF GIFT DEED DOC. NO. ${deedDocNo} DATED ${deedRegDate} AS VOID UNDER SECTION 23(1)${
      includeEvictionPrayer ? ", SUMMARY EVICTION," : ""
    } AND RESTORATION OF PROPERTY TITLE

MOST RESPECTFULLY SHOWETH:

1. SENIOR CITIZEN STATUS & JURISDICTION: That the Applicant is a Senior Citizen aged ${petitionerAge} years within the meaning of Section 2(h) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 (hereinafter "the Act"). The Applicant resides within the territorial jurisdiction of this Hon'ble Tribunal under Section 6(1) of the Act. Copy of Aadhaar Card / Age Proof is annexed as Annexure P-1.

2. TITLE & TRANSFER OF PROPERTY: That the Applicant was the absolute and exclusive owner of ${propertyDescription}. Out of trust and expectation of care in old age, the Applicant executed a Registered Gift Deed bearing Document No. ${deedDocNo} dated ${deedRegDate} before the ${subRegistrarOffice} in favour of the Respondent (${relationshipLabel}). The said transfer took place after the commencement of the Act of 2007.

3. RELATIONSHIP OF TRUST: That the Respondent is the ${relationshipLabel} of the Applicant and stood in a fiduciary relationship of care, dependence, and family support toward the aging Applicant.

${conditionClauseDraft}

5. BREACH OF CONDITION & DENIAL OF FOOD, CARE & SHELTER: That shortly after registration of the Gift Deed, the Respondent's behaviour changed completely. Despite repeated requests, the Respondent has refused and failed to provide daily food, drinking water, essential medicines, and basic physical care to the Applicant. Instead, the Respondent subjects the Applicant to verbal abuse, humiliation, and intimidation inside the house. Medical records, bank statements showing self-borne expenses, and copies of complaints are annexed as Annexure P-3 (Colly).

6. DEEMING FICTION OF FRAUD & COERCION (SECTION 23(1)): That since the transferee has failed to provide the basic amenities and physical needs agreed at the time of transfer, the said Gift Deed dated ${deedRegDate} is deemed to have been obtained by fraud, coercion, and undue influence under Section 23(1) of the Act, and is void at the option of the Applicant.

7. NO OTHER LEGAL BAR: That no civil suit regarding the present cause of action is pending between the parties, and Civil Court jurisdiction is barred under Section 27 of the Act.

PRAYER:
In view of the above facts, the Applicant humbly prays that this Hon'ble Tribunal may graciously be pleased to:
(a) Declare the Registered Gift Deed bearing Document No. ${deedDocNo} dated ${deedRegDate}, registered before ${subRegistrarOffice} in respect of ${propertyDescription}, as VOID AB INITIO and cancelled under Section 23(1) of the Act;
(b) Direct the ${subRegistrarOffice} and the concerned Tehsildar / Municipal Authority to cancel the entry of the said Gift Deed and restore title and mutation solely in the name of the Applicant;${evictionParagraph}
(e) Restrain the Respondent from selling, mortgaging, leasing, or creating any third-party interest in the subject property during the pendency of this petition;
(f) Grant monthly maintenance allowance under Section 9 of the Act and any other relief deemed fit in the interest of justice.

PLACE: ${tribunalCity}
DATE: [DD / MM / 2026]

SIGNATURE OF APPLICANT
(${petitionerName})

VERIFICATION:
I, ${petitionerName}, the Applicant above named, do hereby verify that the contents of Paragraphs 1 to 7 of this Application are true and correct to my personal knowledge and belief, and nothing material has been concealed therefrom.
Verified at ${tribunalCity} on this [DAY] day of [MONTH], 2026.

APPLICANT`;
  }, [
    tribunalCity,
    petitionerName,
    petitionerAge,
    petitionerAddress,
    respondentName,
    relationshipLabel,
    deedDocNo,
    deedRegDate,
    subRegistrarOffice,
    propertyDescription,
    conditionClauseDraft,
    includeEvictionPrayer,
  ]);

  const evictionPrayerDraft = useMemo(() => {
    return `SPECIFIC SUMMARY EVICTION & INTERIM STAY PRAYER CLAUSE
(Under Section 23 read with Section 22 of MWPSC Act, 2007 & State Maintenance Rules)

PRAYER FOR CANCELLATION, RESTORATION & SUMMARY EVICTION:
The Applicant Senior Citizen humbly prays before this Hon'ble Tribunal / District Magistrate that:
1. Declare Registered Gift Deed No. ${deedDocNo} dated ${deedRegDate} regarding ${propertyDescription} as void under Section 23(1) of the Act.
2. Issue an immediate interim order restraining the Respondent (${respondentName}, ${relationshipLabel}) from alienating, transferring, mortgaging, or parting with possession of the property.
3. Direct the Respondent and any unauthorized occupants claiming under the Respondent to vacate ${propertyDescription} within 30 days from the date of order, failing which the Sub-Divisional Magistrate / Police Authority shall enforce summary eviction and restore peaceful possession to the Applicant in terms of Sunny Paul v. State of NCT of Delhi (Delhi HC) and S. Vanitha v. Deputy Commissioner (2020 SC) guidelines.
4. Direct the ${subRegistrarOffice} to make a cancellation endorsement in Book No. 1 and direct the Revenue / Municipal Officer to delete the Respondent's name from property tax and mutation records.`;
  }, [
    deedDocNo,
    deedRegDate,
    propertyDescription,
    respondentName,
    relationshipLabel,
    subRegistrarOffice,
  ]);

  const verificationAffidavitDraft = useMemo(() => {
    return `BEFORE THE HON'BLE MAINTENANCE TRIBUNAL AT ${tribunalCity.toUpperCase()}

AFFIDAVIT IN SUPPORT OF SECTION 23 PETITION

I, ${petitionerName}, aged ${petitionerAge} years, resident of ${petitionerAddress}, do hereby solemnly affirm and declare on oath as under:

1. That I am the Applicant / Senior Citizen in the accompanying Petition under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, and am fully conversant with the facts of the case.
2. That I executed Registered Gift Deed No. ${deedDocNo} dated ${deedRegDate} before ${subRegistrarOffice} in favour of ${respondentName} (${relationshipLabel}) with the clear understanding of receiving lifelong basic amenities, food, shelter, and medical care.
3. That the Respondent has completely neglected me, stopped providing proper food and medicines, and made my peaceful stay impossible in my own property.
4. That the accompanying Application has been read over and explained to me in my vernacular language, and the annexures P-1 to P-3 filed along with the Application are true copies of the originals in my possession.
5. That I have not filed any similar application on the same cause of action before any other Tribunal or Civil Court.

DEPONENT
(${petitionerName})

VERIFICATION:
Verified at ${tribunalCity} on this [DAY] day of [MONTH], 2026 that the contents of Paragraphs 1 to 5 of this Affidavit are true and correct to the best of my knowledge and belief. No part is false and nothing material has been concealed.

DEPONENT`;
  }, [
    tribunalCity,
    petitionerName,
    petitionerAge,
    petitionerAddress,
    deedDocNo,
    deedRegDate,
    subRegistrarOffice,
    respondentName,
    relationshipLabel,
  ]);

  return (
    <div className="bg-[#FAF7F0] text-[#172228] pb-20 lg:pb-0">
      {/* LAYER 1: NAVY HERO */}
      <section className="bg-[#172228] text-white border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-500">/</span>
            <Link
              href="/templates"
              className="hover:text-white transition-colors"
            >
              Templates
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-[#E8C367] font-medium">
              Senior Citizen Gift Cancellation Format
            </span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C65378] text-white">
              <Gavel className="w-3.5 h-3.5" />
              Section 23 Petition Pack
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#5F7E75]/30 border border-[#5F7E75]/50 text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sudesh Chhikara &amp; Urmila Dixit Verified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-200">
              MWPSC Act, 2007 (All India)
            </span>
          </div>

          {/* Single H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.15] max-w-4xl">
            Senior Citizen Gift Deed Cancellation Format
          </h1>

          <p className="mt-4 max-w-3xl text-slate-200 text-base sm:text-lg leading-relaxed">
            Use this ready Section 23 Senior Citizens Act petition format to
            cancel a gift deed and evict abusive children. It includes the
            Sudesh Chhikara condition clauses, a verification affidavit, and a
            summary eviction prayer for the SDO Maintenance Tribunal.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href="#interactive-builder"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C65378] hover:bg-[#b24367] text-white font-semibold text-sm sm:text-base transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Customize Section 23 Petition
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#172228] font-semibold text-sm sm:text-base transition-colors"
            >
              Consult Tribunal Legal Desk
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleStartDraft}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm sm:text-base transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Protect Future Assets with a Will
            </button>
          </div>

          {/* Trust Bar */}
          <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
              Reviewed by Advocate Anuj Anand Malik
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
              Updated November 2026 (2025 SC Ruling Added)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
              Includes Eviction Prayer &amp; Affidavit
            </span>
          </div>
        </div>
      </section>

      {/* LAYER 2: STATS STRIP */}
      <section className="bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/90 rounded-xl border border-slate-200/90 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C65378]">
                Statutory Remedy
              </div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#172228]">
                Section 23(1) Void Order
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Deems neglectful gift transfer void
              </div>
            </div>

            <div className="bg-white/90 rounded-xl border border-slate-200/90 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5F7E75]">
                Statutory Speed
              </div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#172228]">
                90 Days Inquiry Target
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Section 5(4) summary disposal limit
              </div>
            </div>

            <div className="bg-white/90 rounded-xl border border-slate-200/90 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#172228]">
                Tribunal Cost
              </div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#172228]">
                Nominal / Zero Court Fee
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Rs. 10 to Rs. 100 affidavit stamp only
              </div>
            </div>

            <div className="bg-white/90 rounded-xl border border-slate-200/90 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C65378]">
                Possession Relief
              </div>
              <div className="mt-1 text-lg sm:text-xl font-bold text-[#172228]">
                Sec 22 Summary Eviction
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Restores peaceful home possession
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 3: 3-COLUMN GRID */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-8 items-start">
        {/* LEFT STICKY SIDEBAR */}
        <aside className="hidden lg:block sticky top-24 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C65378]" />
              On This Page
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-[#172228] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75]">
              SC Precedent Watchlist
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                <span>
                  <strong>Sudesh Chhikara (2022 SC):</strong> Twin condition
                  test is mandatory.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                <span>
                  <strong>Urmila Dixit (2025 SC):</strong> Same-day Vachan Patra
                  cures silent deeds.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#172228] shrink-0 mt-0.5" />
                <span>
                  <strong>S. Vanitha (2020 SC):</strong> Balances eviction vs DV
                  residence claims.
                </span>
              </li>
            </ul>
          </div>

          <a
            href="#tribunal-petition-draft"
            className="block w-full text-center px-4 py-3 rounded-xl bg-[#C65378] hover:bg-[#b24367] text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Jump to Application Draft
          </a>
        </aside>

        {/* MIDDLE MAIN CONTENT */}
        <main className="space-y-10 min-w-0">
          {/* Featured Banner Image */}
          <figure className="space-y-2.5">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-[#172228]">
              <Image
                src="/images/revocation-of-gift-deed-senior-citizens-act-format-og.jpg"
                alt="Section 23 Senior Citizens Act gift deed cancellation petition format and eviction prayer"
                width={1200}
                height={675}
                priority
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
            <figcaption className="text-xs text-slate-600 px-1">
              Section 23 Maintenance Tribunal Application Format for senior
              parents seeking gift deed cancellation and summary eviction.
            </figcaption>
          </figure>

          {/* Executive Brief Box (No heading tags inside) */}
          <div className="bg-[#F4F8FE] border border-blue-200/80 border-l-4 border-l-[#C65378] rounded-xl p-6 space-y-3">
            <div className="text-sm font-bold uppercase tracking-wider text-[#172228] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#C65378]" />
              Why Generic Gift Cancellation Forms Fail in Court
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Free online forms copy old civil suits. They miss the core proof
              rules set by the Supreme Court in{" "}
              <strong>Sudesh Chhikara v. Ramti Devi (2022)</strong>. Without
              clear facts on care and denial of food, the SDO Tribunal rejects
              the case.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              This draft solves that risk. It adds the{" "}
              <strong>Sudesh Chhikara twin test</strong>, the{" "}
              <strong>Urmila Dixit (2025) Vachan Patra plea</strong>, a sworn{" "}
              <strong>Verification Affidavit</strong>, and a{" "}
              <strong>Section 22 Eviction Prayer</strong>.
            </p>
          </div>

          {/* SECTION 1: SINGLE H2 */}
          <section
            id="overview"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4"
          >
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#172228] leading-snug">
              Section 23 Maintenance Tribunal Petition Guide
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Many parents in India gift their home to a son or daughter out of
              love. Later, some children stop giving food, care, or shelter.
              Section 23(1) of the{" "}
              <strong>
                Maintenance and Welfare of Parents and Senior Citizens Act, 2007
              </strong>{" "}
              gives elders a fast legal way to take their house back.
            </p>
            <p className="text-slate-700 text-base leading-relaxed">
              Instead of a slow Civil Court suit that lasts ten years, parents
              aged 60 or more can file a{" "}
              <strong>
                senior citizen gift deed cancellation application format
              </strong>{" "}
              before the SDO. If the child stops caring for them, the SDO can
              void the gift deed.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-slate-200">
                <div className="text-xs font-bold uppercase text-[#C65378] mb-1">
                  Who Can File
                </div>
                <div className="font-semibold text-sm text-[#172228]">
                  Age 60 or More
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Any parent or senior aged 60+ who signed a gift after the 2007
                  Act began.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-slate-200">
                <div className="text-xs font-bold uppercase text-[#5F7E75] mb-1">
                  Deeds Covered
                </div>
                <div className="font-semibold text-sm text-[#172228]">
                  Gift, Release &amp; Family Deeds
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Covers gift deeds, family release deeds, and settlement deeds.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-slate-200">
                <div className="text-xs font-bold uppercase text-[#172228] mb-1">
                  Where to File
                </div>
                <div className="font-semibold text-sm text-[#172228]">
                  Local SDO / SDM Court
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  File where you live or where your child stays under Section 6.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: INTERACTIVE PETITION CUSTOMIZER */}
          <section
            id="interactive-builder"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                  Interactive Clause &amp; Petition Customizer
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#172228] mt-1">
                  Customize Your Section 23 Petition &amp; Prayer
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset("son-eviction")}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#172228] text-white hover:bg-[#23333c] transition-colors cursor-pointer"
                >
                  Son Eviction Sample
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("daughter-food")}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#C65378]/10 text-[#C65378] border border-[#C65378]/30 hover:bg-[#C65378]/20 transition-colors cursor-pointer"
                >
                  Daughter Stopped Food
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("blank")}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Blank [Brackets]
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Senior Citizen Full Name
                </label>
                <input
                  type="text"
                  value={petitionerName}
                  onChange={(e) => setPetitionerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Petitioner Age (Must be 60+)
                </label>
                <input
                  type="text"
                  value={petitionerAge}
                  onChange={(e) => setPetitionerAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Respondent Child Name
                </label>
                <input
                  type="text"
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Relationship of Transferee
                </label>
                <select
                  value={relationship}
                  onChange={(e) =>
                    setRelationship(e.target.value as RelationshipType)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                >
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="daughter-in-law">Daughter-in-Law</option>
                  <option value="relative">Other Legal Heir / Relative</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Residential Address &amp; Tribunal City / SDO Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={petitionerAddress}
                    onChange={(e) => setPetitionerAddress(e.target.value)}
                    placeholder="Residential Address"
                    className="sm:col-span-2 w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  />
                  <input
                    type="text"
                    value={tribunalCity}
                    onChange={(e) => setTribunalCity(e.target.value)}
                    placeholder="Tribunal City"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Property Description (House / Flat / Plot Details)
                </label>
                <input
                  type="text"
                  value={propertyDescription}
                  onChange={(e) => setPropertyDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Gift Deed Document No.
                </label>
                <input
                  type="text"
                  value={deedDocNo}
                  onChange={(e) => setDeedDocNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Registration Date (Post-2007)
                </label>
                <input
                  type="text"
                  value={deedRegDate}
                  onChange={(e) => setDeedRegDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Sub-Registrar Office Name
                </label>
                <input
                  type="text"
                  value={subRegistrarOffice}
                  onChange={(e) => setSubRegistrarOffice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              {/* Condition Route Radio */}
              <div className="sm:col-span-2 space-y-2">
                <span className="block text-xs font-semibold text-slate-700">
                  Select Your Sudesh Chhikara Condition Route
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setConditionRoute("express-clause")}
                    className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      conditionRoute === "express-clause"
                        ? "border-[#5F7E75] bg-emerald-50/70 ring-1 ring-[#5F7E75]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-[#172228]">
                      1. Clause in Gift Deed
                    </div>
                    <div className="text-slate-600 mt-1">
                      Deed expressly mentions care and basic needs.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConditionRoute("vachan-patra")}
                    className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      conditionRoute === "vachan-patra"
                        ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-600"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-[#172228]">
                      2. Vachan Patra (2025 SC)
                    </div>
                    <div className="text-slate-600 mt-1">
                      Separate undertaking signed on the same day.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConditionRoute("no-written-clause")}
                    className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      conditionRoute === "no-written-clause"
                        ? "border-amber-600 bg-amber-50/70 ring-1 ring-amber-600"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-[#172228]">
                      3. Silent / Unconditional Deed
                    </div>
                    <div className="text-slate-600 mt-1">
                      No written care clause; needs eviction fallback.
                    </div>
                  </button>
                </div>
              </div>

              {/* Eviction Toggle */}
              <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl bg-[#FAF7F0] border border-slate-200">
                <div>
                  <div className="text-sm font-semibold text-[#172228]">
                    Include Summary Eviction &amp; Police Protection Prayer
                  </div>
                  <div className="text-xs text-slate-600">
                    Adds Section 22 State Rules eviction and SHO protection
                    clauses to your draft below.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setIncludeEvictionPrayer(!includeEvictionPrayer)
                  }
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    includeEvictionPrayer
                      ? "bg-[#5F7E75] text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {includeEvictionPrayer ? "Included" : "Excluded"}
                </button>
              </div>
            </div>

            {/* Live Compliance Box */}
            <div
              className={`rounded-xl border p-4 sm:p-5 ${
                complianceStatus.tone === "emerald"
                  ? "bg-emerald-50/80 border-emerald-200"
                  : complianceStatus.tone === "blue"
                  ? "bg-blue-50/80 border-blue-200"
                  : "bg-amber-50/80 border-amber-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#172228]">
                  Live Petition Readiness Check
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-[#172228] border border-slate-200">
                  {complianceStatus.badge}
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base text-[#172228]">
                {complianceStatus.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                {complianceStatus.summary}
              </p>
            </div>
          </section>

          {/* SECTION 3: SUDESH CHHIKARA COMPLIANCE BOX */}
          <section
            id="sudesh-chhikara-compliance"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
              <Scale className="w-4 h-4" />
              Supreme Court Precedent Guardrail
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Sudesh Chhikara &amp; Urmila Dixit Compliance Box
            </h3>
            <p className="text-slate-700 text-base leading-relaxed">
              In{" "}
              <strong>
                Sudesh Chhikara v. Ramti Devi (2022 SCC OnLine SC 1684)
              </strong>
              , the court said Section 23 does not void every gift made out of
              love. The parent must prove two clear rules in the plea:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#FAF7F0] border border-slate-200 border-l-4 border-l-[#5F7E75]">
                <h4 className="font-bold text-base text-[#172228] mb-2">
                  Rule 1: Gift Had a Duty of Care
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  The gift must state that the child will give basic needs and
                  daily care. Under{" "}
                  <strong>Urmila Dixit v. Sunil Sharan Dixit (2025 SC)</strong>,
                  a same-day <em>Vachan Patra</em> also meets this rule.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF7F0] border border-slate-200 border-l-4 border-l-[#C65378]">
                <h4 className="font-bold text-base text-[#172228] mb-2">
                  Rule 2: Child Refused Food &amp; Needs
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Your plea must list real acts of neglect. State dates when
                  food stopped, health care was denied, or abuse pushed you out
                  of your own room.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#172228] text-white text-sm leading-relaxed">
              <strong>Drafting Tip:</strong> Never write vague words like
              &ldquo;my son is rude.&rdquo; State clear facts like stoppage of
              meals, denial of gas, lack of pills, and locked rooms.
            </div>
          </section>

          {/* SECTION 4: COPYABLE SECTION 23 TRIBUNAL PETITION */}
          <section
            id="tribunal-petition-draft"
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <div className="bg-[#172228] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#E8C367]">
                  Mandatory Asset 1: Full SDO Court Filing Format
                </div>
                <h3 className="text-xl font-bold mt-1">
                  Section 23 Tribunal Application Draft Sample
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleCopy("petition", petitionDraft)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#b24367] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                {copiedId === "petition" ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied Petition
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Complete Application
                  </>
                )}
              </button>
            </div>

            <div className="p-5 sm:p-6 bg-[#FAF7F0]/60">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-[#172228] leading-relaxed bg-white p-5 rounded-xl border border-slate-200 max-h-[540px] overflow-y-auto">
                {petitionDraft}
              </pre>
              <p className="mt-3 text-xs text-slate-600">
                Print on A4 legal bond paper or standard court paper. Sign on
                every page and attach numbered annexures (P-1, P-2, P-3).
              </p>
            </div>
          </section>

          {/* SECTION 5: EVICTION PRAYER & VERIFICATION AFFIDAVIT */}
          <section
            id="eviction-prayer-affidavit"
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5F7E75]">
                Mandatory Assets 2 &amp; 3
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228] mt-1">
                Summary Eviction Prayer &amp; Verification Affidavit
              </h3>
            </div>

            {/* Eviction Prayer Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  Summary Eviction Prayer Format (Section 22 + Sunny Paul)
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("eviction", evictionPrayerDraft)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#b24367] text-white text-xs font-semibold cursor-pointer"
                >
                  {copiedId === "eviction" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Eviction Clause
                    </>
                  )}
                </button>
              </div>
              <div className="p-5">
                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-[#172228] leading-relaxed bg-[#FAF7F0] p-4 rounded-xl border border-slate-200">
                  {evictionPrayerDraft}
                </pre>
              </div>
            </div>

            {/* Verification Affidavit Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-[#5F7E75] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
                  <ScrollText className="w-4 h-4 text-white" />
                  Verification Affidavit Format (Oath Commissioner / Notary)
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy("affidavit", verificationAffidavitDraft)
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#172228] hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                >
                  {copiedId === "affidavit" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Affidavit
                    </>
                  )}
                </button>
              </div>
              <div className="p-5">
                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-[#172228] leading-relaxed bg-[#FAF7F0] p-4 rounded-xl border border-slate-200">
                  {verificationAffidavitDraft}
                </pre>
              </div>
            </div>
          </section>

          {/* SECTION 6: TRIBUNAL VS CIVIL COURT COMPARISON TABLE */}
          <section
            id="tribunal-vs-civil-court"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Maintenance Tribunal vs Civil Court Cancellation
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Parents often wonder whether to approach the SDO Tribunal under
              Section 23 or file a cancellation suit under Section 126 of the
              Transfer of Property Act. This comparison shows the practical
              differences.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#172228] text-white">
                    <th className="p-3.5 font-semibold">Legal Factor</th>
                    <th className="p-3.5 font-semibold">
                      Maintenance Tribunal (SDO)
                    </th>
                    <th className="p-3.5 font-semibold">
                      Civil Court (Sec 126 TPA Suit)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3.5 font-semibold text-[#172228]">
                      Legal Act Used
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Senior Citizens Act, 2007 (Sections 23 &amp; 22)
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Transfer of Property Act &amp; Specific Relief Act
                    </td>
                  </tr>
                  <tr className="bg-[#FAF7F0]/60">
                    <td className="p-3.5 font-semibold text-[#172228]">
                      Court Fee &amp; Cost
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Zero or low stamp fee in most states
                    </td>
                    <td className="p-3.5 text-slate-700">
                      High court fee tied to home price
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3.5 font-semibold text-[#172228]">
                      Usual Speed
                    </td>
                    <td className="p-3.5 text-slate-700">
                      90-day goal (Section 5(4))
                    </td>
                    <td className="p-3.5 text-slate-700">
                      3 to 8 years with trial and appeals
                    </td>
                  </tr>
                  <tr className="bg-[#FAF7F0]/60">
                    <td className="p-3.5 font-semibold text-[#172228]">
                      Role of Lawyers
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Section 17 limits lawyers; some states grant leave
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Full right to hire a trial lawyer
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3.5 font-semibold text-[#172228]">
                      Pre-2007 Gift Deeds
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Not covered under Section 23(1)
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Covered for fraud, coercion, or revocation clause
                    </td>
                  </tr>
                  <tr className="bg-[#FAF7F0]/60">
                    <td className="p-3.5 font-semibold text-[#172228]">
                      Appeal Authority
                    </td>
                    <td className="p-3.5 text-slate-700">
                      Appellate Tribunal (District Magistrate) within 60 days
                    </td>
                    <td className="p-3.5 text-slate-700">
                      District Judge / High Court regular civil appeal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 7: STEP-BY-STEP SOP */}
          <section
            id="filing-sop"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Step-by-Step SDO Filing &amp; Mutation Cancellation SOP
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Follow these six clear steps to file before the SDO Tribunal and
              take back your land records.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  step: "Step 1",
                  title: "Get Gift Deed & Age Proof",
                  desc: "Collect a copy of your signed Gift Deed, any Vachan Patra, and Aadhaar card showing age 60 or more.",
                },
                {
                  step: "Step 2",
                  title: "Gather Proof of Neglect",
                  desc: "Save doctor bills paid by you, bank passbooks, police reports, or texts proving loss of food and basic care.",
                },
                {
                  step: "Step 3",
                  title: "Sign Plea & Sworn Affidavit",
                  desc: "Fill out the Section 23 draft above. Sign the Affidavit before a Notary or Oath Officer.",
                },
                {
                  step: "Step 4",
                  title: "File Before the SDO Court",
                  desc: "Submit two sets at the Sub-Divisional Magistrate office. Seek an urgent interim stay stopping your child from selling the house.",
                },
                {
                  step: "Step 5",
                  title: "Attend Summary Hearing & Conciliation",
                  desc: "Appear personally under Section 5. If Section 17 bars advocates in your state, present your written points and evidence calmly.",
                },
                {
                  step: "Step 6",
                  title: "Cancel Sub-Registrar Entry & Mutation",
                  desc: "Present the certified Section 23 void order to the Sub-Registrar and Tehsildar to delete the child's name from title records.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl bg-[#FAF7F0] border border-slate-200"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-base text-[#172228] mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: SUPPORTING EVIDENCE CHECKLIST */}
          <section
            id="supporting-evidence"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Documents &amp; Evidence Required Before the SDO
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              The SDO hears cases fast. Attach clear proof on Day 1 so your plea
              moves smoothly within 90 days.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
              {[
                "Aadhaar, PAN, or Passport showing age 60 or more",
                "Copy of the Gift Deed signed after the 2007 Act began",
                "Same-day Vachan Patra, family note, or letter promising care",
                "Doctor slips and bills showing self-paid health costs",
                "Police complaint receipt or senior aid log",
                "House tax, water, or power bills in your name",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span className="leading-snug">{doc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 9: REAL CASE SCENARIOS */}
          <section
            id="landmark-case-studies"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Landmark Rulings &amp; Real Tribunal Scenarios
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 bg-[#FAF7F0]/70 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-[#172228] text-white">
                  Supreme Court (2022)
                </span>
                <h4 className="font-bold text-base text-[#172228]">
                  Sudesh Chhikara v. Ramti Devi
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  A mother signed a release deed with no care clause. The court
                  kept the deed valid because neither duty of care nor neglect
                  was shown.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-[#FAF7F0]/70 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-[#5F7E75] text-white">
                  Supreme Court (2025)
                </span>
                <h4 className="font-bold text-base text-[#172228]">
                  Urmila Dixit v. Sunil Sharan Dixit
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  A mother signed a gift deed plus a same-day Vachan Patra for
                  care. The court backed the mother and voided the gift deed.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-[#FAF7F0]/70 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-[#C65378] text-white">
                  Daughter Stopped Food Case
                </span>
                <h4 className="font-bold text-base text-[#172228]">
                  Daughter Denying Meals &amp; Home Access
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  If you gift a flat to a married daughter who stops giving
                  food, you can file under Section 23. The law covers sons,
                  daughters, and heirs alike.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-[#FAF7F0]/70 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-slate-800 text-white">
                  Eviction &amp; DV Act Balance
                </span>
                <h4 className="font-bold text-base text-[#172228]">
                  S. Vanitha (2020) &amp; Sunny Paul (Delhi HC)
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The SDO can evict abusive sons under Section 22 rules. Still,
                  if a daughter-in-law files a shared home claim, the SDO must
                  weigh both rights fairly.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 10: RELATED TOOLS & CITATIONS */}
          <section
            id="related-resources"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Related Tools, Templates &amp; Official Citations
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/tools/senior-citizen-gift-deed-revocation-assessment-tool"
                className="p-4 rounded-xl border border-slate-200 hover:border-[#C65378] bg-[#FAF7F0]/70 transition-colors block"
              >
                <div className="font-bold text-sm text-[#172228] flex items-center justify-between">
                  Section 23 Revocation Assessment Tool
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Score your Section 23 chances before approaching the SDO.
                </p>
              </Link>

              <Link
                href="/tools/senior-citizen-section-23-gift-revocation-checker"
                className="p-4 rounded-xl border border-slate-200 hover:border-[#C65378] bg-[#FAF7F0]/70 transition-colors block"
              >
                <div className="font-bold text-sm text-[#172228] flex items-center justify-between">
                  Sudesh Chhikara Condition Checker
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Check whether your gift clause satisfies Supreme Court rules.
                </p>
              </Link>

              <Link
                href="/blogs/gift-deed-cancellation-senior-citizens-act-section-23"
                className="p-4 rounded-xl border border-slate-200 hover:border-[#C65378] bg-[#FAF7F0]/70 transition-colors block"
              >
                <div className="font-bold text-sm text-[#172228] flex items-center justify-between">
                  Gift Deed Cancellation Detailed Guide
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Read High Court rulings on eviction and maintenance rights.
                </p>
              </Link>

              <Link
                href="/templates/gift-deed-format-blood-relatives-india"
                className="p-4 rounded-xl border border-slate-200 hover:border-[#C65378] bg-[#FAF7F0]/70 transition-colors block"
              >
                <div className="font-bold text-sm text-[#172228] flex items-center justify-between">
                  Gift Deed Format for Blood Relatives
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Safe future drafting with built-in Section 23 protective
                  clauses.
                </p>
              </Link>

              <Link
                href="/services/will-dispute-contest-litigation-lawyer"
                className="p-4 rounded-xl border border-slate-200 hover:border-[#C65378] bg-[#FAF7F0]/70 transition-colors block"
              >
                <div className="font-bold text-sm text-[#172228] flex items-center justify-between">
                  Property &amp; Estate Litigation Support
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Legal strategy for disputed family transfers and civil suits.
                </p>
              </Link>

              <Link
                href="/templates"
                className="p-4 rounded-xl border border-slate-200 hover:border-[#C65378] bg-[#FAF7F0]/70 transition-colors block"
              >
                <div className="font-bold text-sm text-[#172228] flex items-center justify-between">
                  Browse All WillDrafting Templates
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Explore Will, Partition, Release, and Legal Heir affidavit
                  packs.
                </p>
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Government &amp; Statutory Sources
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#172228] underline hover:text-[#C65378]"
                >
                  MWPSC Act, 2007 (India Code)
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://socialjustice.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#172228] underline hover:text-[#C65378]"
                >
                  Ministry of Social Justice &amp; Empowerment
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://main.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#172228] underline hover:text-[#C65378]"
                >
                  Supreme Court of India Judgments
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://legislative.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#172228] underline hover:text-[#C65378]"
                >
                  Legislative Department of India
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 11: FAQS */}
          <section
            id="faqs"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Frequently Asked Questions on Section 23
            </h3>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={item.question} className="bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-sm sm:text-base text-[#172228]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3 bg-[#FAF7F0]/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 12: PLAIN-ENGLISH SUMMARY CARDS */}
          <section id="plain-english-summary" className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
              Plain-English Key Takeaways for Families
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="text-xs font-bold uppercase text-[#5F7E75] mb-1.5">
                  Right to Reclaim
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Parents aged 60 or older can ask the SDO Tribunal to cancel a
                  post-2007 gift deed if the child stops giving food, care, and
                  shelter.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="text-xs font-bold uppercase text-[#C65378] mb-1.5">
                  Proof Matters Most
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Attach either the care clause inside the Gift Deed or a
                  same-day Vachan Patra alongside bills and complaints showing
                  real neglect.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="text-xs font-bold uppercase text-[#172228] mb-1.5">
                  Safer Alternative
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Once property comes back in your name, write a registered Will
                  instead of gifting property away during your lifetime.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* RIGHT STICKY SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          {/* Author Bio Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#172228] text-[#FAF7F0] flex items-center justify-center font-bold text-base tracking-wider shrink-0">
                AAM
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                  Legal Author &amp; Reviewer
                </div>
                <div className="font-bold text-base text-[#172228]">
                  Advocate Anuj Anand Malik
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founder of WillDrafting. Advises Indian families and senior
              citizens on Maintenance Tribunal petitions, property revocation
              strategy, and airtight estate planning.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Verified: 12 Nov 2026</span>
              <span className="font-semibold text-[#5F7E75]">
                Bar Precedent Check
              </span>
            </div>
          </div>

          {/* Dual CTA Card 1 (Navy - Product Funnel) */}
          <div className="bg-[#172228] text-white rounded-2xl p-6 shadow-md space-y-4">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-[#C65378] text-white">
              Prevent Future Disputes
            </span>
            <div className="text-lg font-bold leading-snug">
              Keep Ownership Till Life with a Registered Will
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Gifting property early invites risk. Create an ironclad Will in
              minutes so you retain 100% control during your lifetime.
            </p>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#b24367] text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              Start Your Custom Will
            </button>
            <Link
              href="/tools/senior-citizen-gift-deed-revocation-assessment-tool"
              className="block w-full text-center py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
            >
              Run Section 23 Eligibility Checker
            </Link>
          </div>

          {/* Dual CTA Card 2 (Rose Accent - Legal Consultation Funnel) */}
          <div className="bg-white rounded-2xl border-2 border-[#C65378]/30 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
              <Landmark className="w-4 h-4" />
              SDO Petition Assistance
            </div>
            <div className="text-lg font-bold text-[#172228] leading-snug">
              Need Case-Specific Drafting Before Filing?
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Share your Gift Deed facts through our secure consultation form
              for review of Sudesh Chhikara clauses and eviction reliefs.
            </p>
            <Link
              href="/contact"
              className="block w-full text-center py-3 px-4 rounded-xl bg-[#172228] hover:bg-[#23333c] text-white font-semibold text-sm transition-colors"
            >
              Request Tribunal Legal Review
            </Link>
            <Link
              href="/services/gift-deed-drafting-registration"
              className="block w-full text-center py-2.5 px-4 rounded-xl border border-slate-300 hover:border-[#172228] text-[#172228] font-medium text-xs transition-colors"
            >
              View Property Deed Services
            </Link>
          </div>

          {/* Trust Checklist Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#5F7E75]" />
              Included In This Template Pack
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                Section 23 SDO Petition Format
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                Sudesh Chhikara &amp; Urmila Dixit Clauses
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                Section 22 Summary Eviction Prayer
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                Sworn Verification Affidavit Draft
              </li>
            </ul>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-[#C65378]" />
              Free instant customization and copy
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#172228]/95 backdrop-blur border-t border-slate-700 px-4 py-3 flex items-center gap-3">
        <a
          href="#interactive-builder"
          className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#C65378] text-white font-semibold text-xs sm:text-sm"
        >
          Customize Draft
        </a>
        <Link
          href="/contact"
          className="flex-1 text-center py-2.5 px-3 rounded-xl bg-white text-[#172228] font-semibold text-xs sm:text-sm"
        >
          Request Legal Review
        </Link>
      </div>
    </div>
  );
}
