"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Users,
  Scale,
  DollarSign,
  HelpCircle,
} from "lucide-react";

interface StateProtocol {
  id: string;
  stateName: string;
  deedName: string;
  stampDutyRule: string;
  registrationFee: string;
  portalName: string;
  sroAuthority: string;
  turnaround: string;
  keyRule: string;
  requiredDocuments: string[];
}

const STATE_DEED_PROTOCOLS: StateProtocol[] = [
  {
    id: "delhi",
    stateName: "Delhi NCR",
    deedName: "Relinquishment Deed / Haq Tyag",
    stampDutyRule: "Fixed ₹1,000 e-Stamp paper for family co-heirs",
    registrationFee: "Fixed ₹100 registration fee + ₹500 pasting / processing fee",
    portalName: "DORIS Delhi (doris.delhigovt.nic.in)",
    sroAuthority: "Sub-Registrar Office (SRO) under Revenue Department, GNCTD",
    turnaround: "1 to 3 Days after online slot booking",
    keyRule:
      "In Delhi, a Relinquishment Deed executed in favor of direct family co-heirs (mother, brother, sister, son, daughter) attracts fixed stamp duty. Both parties and two witnesses must provide biometrics at the local Sub-Registrar Office.",
    requiredDocuments: [
      "Original Title Deed / Conveyance Deed of the deceased owner",
      "Death Certificate of the deceased owner from MCD or NDMC",
      "Surviving Member Certificate (SMC) issued by SDM or Revenue Dept",
      "Aadhaar card and PAN card of Releasor (giving share) and Releasee (receiving share)",
      "Two independent adult witnesses with original Aadhaar cards and PAN cards",
      "e-Stamp paper of ₹1,000 with DORIS online registration receipt",
    ],
  },
  {
    id: "maharashtra",
    stateName: "Maharashtra (Mumbai / Pune)",
    deedName: "Release Deed / Hakka Sodpatra",
    stampDutyRule: "Fixed ₹200 for ancestral co-heirs; 3% to 5% if consideration exists",
    registrationFee: "Fixed ₹1,000 or 1% capped as per Maharashtra Stamp Rules",
    portalName: "IGR Maharashtra (igrmaharashtra.gov.in)",
    sroAuthority: "Joint Sub-Registrar Office (Class 1 / Class 2)",
    turnaround: "Same day biometric registration upon e-Step appointment",
    keyRule:
      "Under Article 52 of Maharashtra Stamp Act, release of ancestral property in favor of brother, sister, son, daughter, or mother without consideration attracts nominal stamp duty of ₹200. SRO verifies 7/12 extract or society share certificate.",
    requiredDocuments: [
      "Registered Purchase Agreement or Society Share Certificate of property",
      "Municipal Corporation (BMC / PMC) Death Certificate",
      "Legal Heir Certificate or Varisan Dakhla / Varas Panchanama",
      "7/12 Extract or City Survey (CTS) Property Card",
      "Aadhaar and PAN cards of all executing parties and two local witnesses",
      "Index II copy of original property deed",
    ],
  },
  {
    id: "up",
    stateName: "Uttar Pradesh",
    deedName: "Haq Tyag Patra / Release Deed",
    stampDutyRule: "Fixed concessional ₹5,000 for blood relatives under State Notification",
    registrationFee: "Fixed ₹1,000 or 1% registration fee (capped as per UP Stamp Rules)",
    portalName: "IGRSUP (igrsup.gov.in)",
    sroAuthority: "Sub-Registrar Office (Up-Nibandhak Karyalaya)",
    turnaround: "1 to 2 Working Days following biometric appointment",
    keyRule:
      "The Uttar Pradesh government issued special notifications granting concessional stamp duty of ₹5,000 for partition and relinquishment deeds executed exclusively between blood relatives (parents, children, siblings, spouse).",
    requiredDocuments: [
      "Original Registered Sale Deed or Allotment Letter (NOIDA / Greater NOIDA / Awas Vikas)",
      "Death Certificate of deceased owner from Nagar Nigam or Panchayat",
      "Waris Praman Patra (Legal Heir Certificate) from Tehsildar",
      "Khatauni extract (for agricultural land) or House Tax receipt",
      "Aadhaar and PAN cards of both parties with 2 independent witnesses",
      "Online fee receipt generated through IGRSUP portal",
    ],
  },
  {
    id: "haryana",
    stateName: "Haryana (Gurugram / Faridabad)",
    deedName: "Relinquishment Deed / Tabadla",
    stampDutyRule: "Nominal ₹100 to ₹1,000 stamp duty for family co-sharers",
    registrationFee: "Fixed ₹2,000 registration fee under Haryana Revenue Rules",
    portalName: "Jamabandi / Web-HALRIS Haryana (jamabandi.nic.in)",
    sroAuthority: "Sub-Registrar / Joint Sub-Registrar (Tehsildar / Naib Tehsildar)",
    turnaround: "1 to 2 Days after e-token booking",
    keyRule:
      "In Haryana, transfers of ancestral property among co-owners and legal heirs through relinquishment deed are exempt from regular ad-valorem stamp duty, provided the parties share common blood lineage from the deceased titleholder.",
    requiredDocuments: [
      "Original Title Deed, Conveyance Deed, or HSVP Allotment Letter",
      "Death Certificate issued by Municipal Corporation or Registrar",
      "Family Tree Nakal / Legal Heir Certificate from Tehsildar",
      "Municipal Property Tax NOC or Jamabandi Nakal",
      "Aadhaar cards and PAN cards of releasors, releasees, and witnesses",
      "e-GRAS challan for stamp duty and registration fee",
    ],
  },
  {
    id: "karnataka",
    stateName: "Karnataka (Bengaluru)",
    deedName: "Release Deed / Hakku Bidugade Patra",
    stampDutyRule: "Fixed ₹1,000 for family members; 5% if outside family co-heirs",
    registrationFee: "Fixed ₹500 to ₹1,000 registration fee",
    portalName: "Kaveri 2.0 Portal (kaveri.karnataka.gov.in)",
    sroAuthority: "Sub-Registrar Office under Dept of Stamps and Registration",
    turnaround: "1 Day with online biometric slot via Kaveri 2.0",
    keyRule:
      "Under Article 45 of Karnataka Stamp Act, a release deed between family members (spouse, children, brothers, sisters) is charged a fixed nominal stamp duty of ₹1,000. Release to a non-relative is treated as a conveyance attracting full 5% duty.",
    requiredDocuments: [
      "Original Registered Sale Deed or BDA / BBMP Khata Certificate (e-Khata / Form 15)",
      "Death Certificate of the deceased property holder",
      "Family Tree / Genealogical Tree Certificate from Tahsildar / Nadakacheri",
      "Encumbrance Certificate (EC) for the last 15 to 30 years",
      "Aadhaar cards and PAN cards of all parties and two witnesses",
      "Kaveri 2.0 application summary and e-payment receipt",
    ],
  },
  {
    id: "tamilnadu",
    stateName: "Tamil Nadu (Chennai)",
    deedName: "Release Deed / Urimai Viduthalai Pathiram",
    stampDutyRule: "1% of market value (subject to a statutory cap of ₹25,000) for family",
    registrationFee: "1% of property value (subject to a statutory cap of ₹4,000)",
    portalName: "TNREGINET Portal (tnreginet.gov.in)",
    sroAuthority: "Sub-Registrar Office under Registration Department, Tamil Nadu",
    turnaround: "Same day completion after online appointment",
    keyRule:
      "Under Article 55A of Tamil Nadu Stamp Act, release of undivided share among family members (parents, children, spouse, siblings, grandchildren) attracts 1% stamp duty capped at ₹25,000, significantly lower than 7% sale deed duty.",
    requiredDocuments: [
      "Parent Document / Original Sale Deed or Settlement Deed",
      "Municipal Death Certificate of deceased family member",
      "Online Varisu Certificate (Legal Heir Certificate) from Tahsildar",
      "Encumbrance Certificate (EC) and Patta / Chitta extract",
      "Aadhaar, PAN cards, and passport photos of all parties and witnesses",
      "Online token generated on TNREGINET",
    ],
  },
];

export default function RelinquishmentDeedInteractive() {
  const [activeTab, setActiveTab] = useState("delhi");

  // Diagnostic Checker States
  const [recipientType, setRecipientType] = useState<"coheir" | "stranger">("coheir");
  const [considerationType, setConsiderationType] = useState<"gratuitous" | "monetary">("gratuitous");
  const [hasMinors, setHasMinors] = useState<"no" | "yes">("no");
  const [nriStatus, setNriStatus] = useState<"resident" | "nri">("resident");

  const currentProtocol =
    STATE_DEED_PROTOCOLS.find((item) => item.id === activeTab) || STATE_DEED_PROTOCOLS[0];

  return (
    <section className="w-full my-12 sm:my-20">
      {/* SECTION HEADER: Strict H2 <= 70 chars, No Em-dashes */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Building2 className="w-4 h-4" />
          <span>Interactive State Protocols &amp; Eligibility Checker</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Interactive State Stamp Duty &amp; Document Estimator
        </h2>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Stamp duty and registration rules for Relinquishment Deeds (Haq Tyag) vary across Indian states. Select your state to review official rates, or use our 30-second legal checker to confirm your documentation requirements.
        </p>
      </div>

      {/* =========================================================================
          PART 1: STATE PROTOCOL SELECTOR
          ========================================================================= */}
      <div className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-[#172228]/10 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Part 1: State Sub-Registrar Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              State Stamp Duty &amp; Registration Procedures
            </h3>
          </div>
          <div className="text-xs text-[#55636D] flex items-center gap-1.5 bg-[#FAF7F0] px-3.5 py-1.5 rounded-full border border-[#172228]/10 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Updated with 2026 State Stamp Schedules</span>
          </div>
        </div>

        {/* State Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#172228]/10 mb-8">
          {STATE_DEED_PROTOCOLS.map((protocol) => {
            const isActive = activeTab === protocol.id;
            return (
              <button
                key={protocol.id}
                onClick={() => setActiveTab(protocol.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#172228] text-white shadow-sm"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/10 border border-[#172228]/10"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-[#C65378]" : "text-[#55636D]"}`} />
                <span>{protocol.stateName}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
                Official Deed Designation
              </span>
              <h4 className="text-2xl font-semibold text-[#111827] mb-2">
                {currentProtocol.deedName}
              </h4>
              <p className="text-[14.5px] leading-[1.7] text-[#49585F]">
                {currentProtocol.keyRule}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Applicable Stamp Duty
                </span>
                <span className="text-sm font-semibold text-[#111827] block">
                  {currentProtocol.stampDutyRule}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Registration &amp; Pasting Fee
                </span>
                <span className="text-sm font-semibold text-[#111827] block">
                  {currentProtocol.registrationFee}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Official SRO Portal
                </span>
                <span className="text-xs font-medium text-[#C65378] break-all block">
                  {currentProtocol.portalName}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Estimated SRO Turnaround
                </span>
                <span className="text-sm font-bold text-[#047857] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {currentProtocol.turnaround}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-6 border border-[#172228]/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-4">
              <FileText className="w-4 h-4 text-[#C65378]" />
              <span>Mandatory SRO Checklist for {currentProtocol.stateName}</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-[13.5px] text-[#374151] leading-relaxed">
              {currentProtocol.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-semibold px-5 py-3 transition-colors text-center"
              >
                <span>Book Advocate Consultation in {currentProtocol.stateName}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: 30-SECOND LEGAL ELIGIBILITY CHECKER
          ========================================================================= */}
      <div className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="pb-6 border-b border-[#172228]/10 mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
            Part 2: 30-Second Diagnostic Check
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">
            Check If Your Property Relinquishment Is Legally Valid
          </h3>
          <p className="text-sm text-[#49585F] mt-1">
            Answer 4 quick questions to identify potential legal hurdles before drafting your deed:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Questions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Question 1: Recipient Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-2.5">
                1. Who is receiving the relinquished share?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRecipientType("coheir")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    recipientType === "coheir"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">A Legal Co-Heir / Co-Owner</span>
                  <span className="text-xs text-[#55636D]">Mother, brother, sister, son, or daughter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRecipientType("stranger")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    recipientType === "stranger"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">A Third Party / Non-Heir</span>
                  <span className="text-xs text-[#55636D]">Cousin, friend, in-law, or external buyer</span>
                </button>
              </div>
            </div>

            {/* Question 2: Consideration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-2.5">
                2. Is money or consideration being paid for this share?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsiderationType("gratuitous")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    considerationType === "gratuitous"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">Without Consideration (Gratuitous)</span>
                  <span className="text-xs text-[#55636D]">Given out of natural love and family affection</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsiderationType("monetary")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    considerationType === "monetary"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">With Financial Consideration</span>
                  <span className="text-xs text-[#55636D]">Financial buyout or family settlement amount</span>
                </button>
              </div>
            </div>

            {/* Question 3: Minors */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-2.5">
                3. Are any of the releasing heirs minors (under 18 years)?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHasMinors("no")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    hasMinors === "no"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">No, All Heirs Are Adults</span>
                  <span className="text-xs text-[#55636D]">Every co-heir has completed 18 years of age</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHasMinors("yes")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    hasMinors === "yes"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">Yes, One or More Minors</span>
                  <span className="text-xs text-[#55636D]">Deceased left minor children or grandchildren</span>
                </button>
              </div>
            </div>

            {/* Question 4: NRI Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-2.5">
                4. Is any co-heir living outside India (NRI / OCI)?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNriStatus("resident")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    nriStatus === "resident"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">All Heirs In India</span>
                  <span className="text-xs text-[#55636D]">Can physically visit local Sub-Registrar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNriStatus("nri")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    nriStatus === "nri"
                      ? "border-[#C65378] bg-[#C65378]/5 text-[#111827]"
                      : "border-[#172228]/15 hover:border-[#172228]/40 text-[#49585F]"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-0.5">One or More NRIs Abroad</span>
                  <span className="text-xs text-[#55636D]">USA, UK, UAE, Canada, Australia, etc.</span>
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostic Result Box */}
          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#172228]/10">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378]">
                  Legal Assessment
                </span>
                <span className="text-xs font-semibold text-[#111827] bg-white px-2.5 py-1 rounded-full border border-[#172228]/10">
                  Section 17 Registration Act
                </span>
              </div>

              {recipientType === "stranger" ? (
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#F87171]/40 mb-4">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-[#991B1B] block mb-1">
                        Cannot Use a Relinquishment Deed
                      </strong>
                      <p className="text-xs leading-relaxed text-[#7F1D1D]">
                        Under Indian law, a Relinquishment Deed can only be executed in favor of an existing legal co-heir. Transferring an inherited share to a non-heir or third party requires a registered <strong>Gift Deed</strong> or <strong>Sale Deed</strong>, attracting regular stamp duty.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#34D399]/40 mb-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-[#065F46] block mb-1">
                        Relinquishment Deed (Haq Tyag) Is Applicable
                      </strong>
                      <p className="text-xs leading-relaxed text-[#047857]">
                        Because the recipient is an existing legal co-heir, you qualify for state-level concessional stamp duty under the relevant state stamp law.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasMinors === "yes" && (
                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] mb-4">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-[#92400E] block mb-1">
                        Minor Child Protection Alert
                      </strong>
                      <p className="text-xs leading-relaxed text-[#78350F]">
                        A minor cannot surrender their inherited property rights. A guardian cannot relinquish a minor&apos;s share without prior permission from the District Court under Section 8 of the Hindu Minority and Guardianship Act, 1956.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {nriStatus === "nri" && (
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 mb-4">
                  <div className="flex items-start gap-2.5">
                    <Scale className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-[#111827] block mb-1">
                        NRI Power of Attorney Solution
                      </strong>
                      <p className="text-xs leading-relaxed text-[#49585F]">
                        The NRI heir does not need to fly to India. They can execute a Special Power of Attorney (SPA) before the Indian Embassy or get it Hague Apostilled abroad. The attorney can register the deed in India.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {considerationType === "monetary" && (
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 mb-4">
                  <div className="flex items-start gap-2.5">
                    <DollarSign className="w-5 h-5 text-[#111827] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-[#111827] block mb-1">
                        Tax &amp; Consideration Recital
                      </strong>
                      <p className="text-xs leading-relaxed text-[#49585F]">
                        When monetary compensation is paid, the exact payment method (cheque, RTGS) must be recorded in the registered deed. Capital gains tax rules apply under the Income Tax Act, 1961.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 shadow-sm transition-all"
              >
                <span>Draft Lawyer-Verified Relinquishment Deed</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
