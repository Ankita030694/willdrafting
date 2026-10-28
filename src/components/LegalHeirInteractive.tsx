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
} from "lucide-react";

interface StateProtocol {
  id: string;
  stateName: string;
  certificateName: string;
  issuingOfficer: string;
  portalName: string;
  timeline: string;
  fieldInquiryOfficer: string;
  keyRule: string;
  requiredDocuments: string[];
}

const STATE_PROTOCOLS: StateProtocol[] = [
  {
    id: "delhi",
    stateName: "Delhi NCR",
    certificateName: "Surviving Member Certificate (SMC)",
    issuingOfficer: "Sub-Divisional Magistrate (SDM) / Revenue Dept",
    portalName: "e-District Delhi Portal (edistrict.delhigovt.nic.in)",
    timeline: "14 to 21 Working Days",
    fieldInquiryOfficer: "Tehsildar & Sub-Divisional Revenue Inspector",
    keyRule:
      "In Delhi, the revenue office issues the Surviving Member Certificate. This document is needed to update DDA and municipal land records. It also helps heirs claim bank funds.",
    requiredDocuments: [
      "Original Death Certificate of Deceased from MCD / NDMC",
      "Aadhaar card and voter ID of all surviving family members",
      "Self-declaration / Family Tree Affidavit notarized on Rs 10 stamp paper",
      "Surviving members' joint photograph with the applicant",
      "Proof of deceased's permanent address in Delhi (Electricity bill / Registry)",
    ],
  },
  {
    id: "maharashtra",
    stateName: "Maharashtra (Mumbai / Pune)",
    certificateName: "Varisan Dakhla / Legal Heir Certificate",
    issuingOfficer: "Tehsildar / Sub-Divisional Officer (SDO)",
    portalName: "Aaple Sarkar Portal (aaplesarkar.mahaonline.gov.in)",
    timeline: "15 to 30 Working Days",
    fieldInquiryOfficer: "Talathi & Circle Officer (Mandal Adhikari)",
    keyRule:
      "In Maharashtra, families apply through the Aaple Sarkar portal. The local Talathi visits the home to check all heirs. Then, the officer updates the 7/12 extract and city land records.",
    requiredDocuments: [
      "Municipal Corporation (BMC / PMC) Death Certificate",
      "Ration Card copy showing deceased and family member names",
      "Affidavit of Legal Heirs (Varas Panchanama) executed before Notary",
      "7/12 extract, Property Card (PR Card), or Society Share Certificate copy",
      "No Objection Certificate (NOC) affidavits from siblings if one heir is mutating",
    ],
  },
  {
    id: "up-haryana",
    stateName: "Uttar Pradesh & Haryana",
    certificateName: "Waris Praman Patra / Legal Heir Certificate",
    issuingOfficer: "Tehsildar / Naib Tehsildar",
    portalName: "eDistrict UP / SARAL Haryana (edistrict.up.gov.in)",
    timeline: "15 to 25 Working Days",
    fieldInquiryOfficer: "Lekhpal / Patwari & Kanungo",
    keyRule:
      "In UP and Haryana, the local Lekhpal visits the home to verify the family tree. The officer reports to the Tehsildar. This step is required to update farmland Khatauni records.",
    requiredDocuments: [
      "Official Death Certificate issued by Nagar Nigam or Gram Panchayat",
      "Parivar Register Nakal (Family Register Extract) signed by ADO Panchayat",
      "Notarized Affidavit (Shapath Patra) listing all surviving Class 1 legal heirs",
      "Aadhaar cards of all legal heirs and two local neighbor witness IDs",
      "Land Khatauni or Municipal house tax receipt",
    ],
  },
  {
    id: "tamilnadu-karnataka",
    stateName: "Tamil Nadu & Karnataka",
    certificateName: "Varisu Certificate / Family Tree Certificate",
    issuingOfficer: "Tahsildar / Revenue Divisional Officer (RDO)",
    portalName: "TN e-Sevai / Karnataka Nadakacheri (tn.gov.in / nadakacheri.karnataka.gov.in)",
    timeline: "15 to 30 Working Days",
    fieldInquiryOfficer: "Village Administrative Officer (VAO) & Revenue Inspector (RI)",
    keyRule:
      "In Tamil Nadu, the revenue office issues the Varisu certificate online. In Karnataka, you apply through Nadakacheri. Local revenue inspectors visit the family to verify all heirs, including married daughters.",
    requiredDocuments: [
      "Death Certificate of the deceased from Municipality or Corporation",
      "Smart Family Card / Ration Card of the deceased",
      "School TC, Birth Certificate, or Aadhaar showing parent-child relationship",
      "Notarized Family Tree Affidavit with applicant photograph",
      "Self-declaration regarding deceased's marital status and surviving mother",
    ],
  },
  {
    id: "bengal-east",
    stateName: "West Bengal & Eastern India",
    certificateName: "Legal Heir / Succession Verification Certificate",
    issuingOfficer: "Block Development Officer (BDO) / SDO / Municipality Chairman",
    portalName: "e-District West Bengal (edistrict.wb.gov.in)",
    timeline: "20 to 35 Working Days",
    fieldInquiryOfficer: "Revenue Inspector (RI) & Local Councilor / Gram Pradhan",
    keyRule:
      "In West Bengal, city residents apply through the municipality. Rural families apply through the block development office. Local officers verify family papers before issuing the certificate.",
    requiredDocuments: [
      "Death Certificate from Municipal Corporation (KMC / Bidhannagar / Panchayat)",
      "Local Councilor / Gram Panchayat Pradhan Family Verification Certificate",
      "Family genealogical declaration on Rs 20 non-judicial stamp paper",
      "Aadhaar and Voter IDs of all surviving descendants and spouse",
      "Mutation application form with land deed (Deed of Conveyance / Porcha)",
    ],
  },
];

export default function LegalHeirInteractive() {
  const [activeTab, setActiveTab] = useState("delhi");

  // Diagnostic Quiz State
  const [deceasedType, setDeceasedType] = useState<"male" | "female" | "unmarried">("male");
  const [purpose, setPurpose] = useState<"property" | "bank" | "pension" | "vehicle">("property");
  const [siblingStatus, setSiblingStatus] = useState<"cooperative" | "disputed" | "nri">("cooperative");

  const currentProtocol =
    STATE_PROTOCOLS.find((item) => item.id === activeTab) || STATE_PROTOCOLS[0];

  return (
    <div className="w-full my-12 sm:my-20">
      {/* SECTION HEADER (H2 <= 70 chars: 48 chars) */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Building2 className="w-4 h-4" />
          <span>State-Wise Revenue Authorities &amp; Interactive Checker</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          State Revenue Protocols &amp; 30-Second Heir Checker
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Each state in India has its own revenue rules for heir certificates. Select your state or check your legal heirs and required papers below.
        </p>
      </div>

      {/* =========================================================================
          PART 1: STATE REVENUE PROTOCOL EXPLORER (TABS)
          ========================================================================= */}
      <div className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-[#172228]/10 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Part 1: State e-District Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              How Legal Heir Certificates Work in Your State
            </h3>
          </div>
          <div className="text-xs text-[#55636D] flex items-center gap-1.5 bg-[#FAF7F0] px-3.5 py-1.5 rounded-full border border-[#172228]/10 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Updated with 2026 State Circulars</span>
          </div>
        </div>

        {/* State Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#172228]/10 mb-8">
          {STATE_PROTOCOLS.map((protocol) => {
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
                Official Document Designation
              </span>
              <h4 className="text-2xl font-semibold text-[#111827] mb-2">
                {currentProtocol.certificateName}
              </h4>
              <p className="text-[14.5px] leading-[1.7] text-[#49585F]">
                {currentProtocol.keyRule}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Issuing Authority
                </span>
                <span className="text-sm font-semibold text-[#111827] block">
                  {currentProtocol.issuingOfficer}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Field Verification Officer
                </span>
                <span className="text-sm font-semibold text-[#111827] block">
                  {currentProtocol.fieldInquiryOfficer}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Official Portal
                </span>
                <span className="text-xs font-medium text-[#C65378] break-all block">
                  {currentProtocol.portalName}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Statutory Turnaround
                </span>
                <span className="text-sm font-bold text-[#047857] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {currentProtocol.timeline}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-6 border border-[#172228]/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-4">
              <FileText className="w-4 h-4 text-[#C65378]" />
              <span>Mandatory Checklist for {currentProtocol.stateName}</span>
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
                <span>Get Lawyer Assistance in {currentProtocol.stateName}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: 30-SECOND LEGAL HEIR ELIGIBILITY & DOCUMENT DIAGNOSTIC TOOL
          ========================================================================= */}
      <div className="w-full bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10 lg:p-12">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Users className="w-4 h-4" />
            <span>Part 2: 30-Second Diagnostic Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#111827] mb-2">
            Who Are the Rightful Legal Heirs in Your Family Situation?
          </h3>
          <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
            Select your family details below. Find out who has inheritance rights, what papers you need, and whether you require sibling consent letters.
          </p>
        </div>

        {/* 3 Step Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1: Deceased Family Setup */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-3">
              1. Deceased Family Member
            </label>
            <div className="space-y-2">
              {[
                { id: "male", label: "Father / Husband (Married Male)" },
                { id: "female", label: "Mother / Wife (Married Female)" },
                { id: "unmarried", label: "Single / Unmarried Child" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDeceasedType(opt.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border ${
                    deceasedType === opt.id
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#C65378]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Purpose */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-3">
              2. Primary Purpose
            </label>
            <div className="space-y-2">
              {[
                { id: "property", label: "Property Mutation (Flat / Land)" },
                { id: "bank", label: "Bank Account / Fixed Deposits" },
                { id: "pension", label: "PF, Gratuity & Pension" },
                { id: "vehicle", label: "Vehicle RC / Utility Transfer" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPurpose(opt.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border ${
                    purpose === opt.id
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#C65378]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Sibling / Co-Heir Co-operation */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-3">
              3. Co-Heir Agreement
            </label>
            <div className="space-y-2">
              {[
                { id: "cooperative", label: "All Heirs Agree & Will Sign NOC" },
                { id: "disputed", label: "Sibling Disagrees / Refuses NOC" },
                { id: "nri", label: "Heir Lives Abroad (NRI / OCI)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSiblingStatus(opt.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border ${
                    siblingStatus === opt.id
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#C65378]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Diagnostic Output Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Instant Legal Assessment</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl sm:text-2xl font-semibold text-[#111827]">
                {deceasedType === "male" && "Rightful Heirs: Wife, Sons, Daughters & Mother"}
                {deceasedType === "female" && "Rightful Heirs: Husband, Sons & Daughters"}
                {deceasedType === "unmarried" && "Rightful Heirs: Mother & Father (Class II Heirs)"}
              </h4>

              <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                {deceasedType === "male" && (
                  <>
                    Under <strong className="text-[#111827]">Section 8 of the Hindu Succession Act, 1956</strong>, the surviving wife, all sons, all daughters, and the mother are Class 1 heirs. They inherit equal shares. The father is a Class 2 heir. Thus, the father has no share if any Class 1 heir is alive.
                  </>
                )}
                {deceasedType === "female" && (
                  <>
                    Under <strong className="text-[#111827]">Section 15 of the Hindu Succession Act, 1956</strong>, the estate of a deceased female goes first to her children and surviving husband. They share the property equally.
                  </>
                )}
                {deceasedType === "unmarried" && (
                  <>
                    When an unmarried person dies without a Will, the mother inherits first. If the mother is not alive, the father and siblings inherit under Class 2 rules.
                  </>
                )}
              </p>

              {/* Status Warning / Tip */}
              {siblingStatus === "disputed" && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs sm:text-[13.5px] text-amber-900 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Dispute Alert:</strong> Revenue officers cannot decide family disputes. If a sibling refuses to sign the consent letter, the officer rejects the application. In this situation, our advocates help you file a formal partition suit or succession petition in civil court.
                  </div>
                </div>
              )}

              {siblingStatus === "nri" && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs sm:text-[13.5px] text-blue-900 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>NRI Heir Protocol:</strong> Overseas heirs do not need to travel to India. We prepare a power of attorney or NOC. The heir gets it apostilled or embassy-stamped abroad. Then, a family member submits it in India.
                  </div>
                </div>
              )}

              {purpose === "property" && (
                <div className="text-xs sm:text-sm text-[#374151] pt-2">
                  <strong>Property Mutation Note:</strong> To record a house in one heir&apos;s name, all co-heirs must sign a registered <Link href="/templates/release-deed-format" className="text-[#C65378] font-bold underline hover:text-[#a83d5f]">Relinquishment Deed (Haq Tyag)</Link> at the sub-registrar office.
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-[#172228]/10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] block">
                Next Steps for Your Application
              </span>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#49585F] leading-snug">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                  <span>Get the death certificate from the local registrar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                  <span>A lawyer drafts the family tree affidavit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                  <span>File the form on the state portal or revenue office</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                  <span>The local revenue inspector completes the home visit</span>
                </li>
              </ul>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a83d5f] text-white text-xs sm:text-sm font-semibold px-6 py-3 transition-colors shadow-xs"
                >
                  <span>Consult an Advocate on My Case</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
