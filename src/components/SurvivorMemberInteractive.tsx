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
  Search,
  Scale,
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

const SMC_STATE_PROTOCOLS: StateProtocol[] = [
  {
    id: "delhi",
    stateName: "Delhi NCR",
    certificateName: "Surviving Member Certificate (SMC)",
    issuingOfficer: "Sub-Divisional Magistrate (SDM) / Revenue Dept",
    portalName: "e-District Delhi Portal (edistrict.delhigovt.nic.in)",
    timeline: "14 to 21 Working Days",
    fieldInquiryOfficer: "Tehsildar & Sub-Divisional Revenue Inspector",
    keyRule:
      "In Delhi, the Revenue Department issues the Surviving Member Certificate. It is required by DDA, MCD, and L&DO for leasehold and freehold property mutation. Banks also mandate it for releasing funds of a deceased person.",
    requiredDocuments: [
      "Original Death Certificate issued by MCD, NDMC, or Cantonment Board",
      "Aadhaar cards and Voter IDs of all surviving family members",
      "Family tree affidavit on 10 Rupee non-judicial stamp paper",
      "Joint family photograph of all surviving members with the applicant",
      "Address proof of the deceased in Delhi like electricity bill or registry copy",
    ],
  },
  {
    id: "up",
    stateName: "Uttar Pradesh",
    certificateName: "Waris Praman Patra / Surviving Family Record",
    issuingOfficer: "Tehsildar / Sub-Divisional Magistrate",
    portalName: "eDistrict UP Portal (edistrict.up.gov.in)",
    timeline: "15 to 25 Working Days",
    fieldInquiryOfficer: "Lekhpal (Patwari) & Revenue Inspector (Kanungo)",
    keyRule:
      "In Uttar Pradesh, the Lekhpal visits the locality to verify family heirs. This certificate is required for Khatauni land record mutation and urban municipal property transfers under the UP Revenue Code.",
    requiredDocuments: [
      "Death certificate issued by Nagar Nigam, Nagar Palika, or Gram Panchayat",
      "Parivar Register Nakal certified by ADO Panchayat",
      "Notarized affidavit listing all legal heirs and their marital status",
      "Identity cards of two local neighbor witnesses",
      "Property house tax receipt or agricultural Khatauni copy",
    ],
  },
  {
    id: "maharashtra",
    stateName: "Maharashtra (Mumbai & Pune)",
    certificateName: "Varisan Dakhla / Surviving Members Extract",
    issuingOfficer: "Tehsildar / Sub-Divisional Officer (SDO)",
    portalName: "Aaple Sarkar Portal (aaplesarkar.mahaonline.gov.in)",
    timeline: "15 to 30 Working Days",
    fieldInquiryOfficer: "Talathi & Circle Officer (Mandal Adhikari)",
    keyRule:
      "Under the Maharashtra Right to Public Services Act, applications are filed via Aaple Sarkar. Talathi conducts spot panchanama before mutating 7/12 land extract or cooperative housing society shares.",
    requiredDocuments: [
      "Municipal Corporation death certificate (BMC, PMC, or PCMC)",
      "Ration card extract showing names of family members",
      "Varas Panchanama affidavit signed before an authorized notary",
      "Society share certificate, 7/12 extract, or City Survey PR Card",
      "Aadhaar and PAN cards of all surviving legal heirs",
    ],
  },
  {
    id: "haryana-punjab",
    stateName: "Haryana & Punjab",
    certificateName: "Legal Heir / Surviving Family Certificate",
    issuingOfficer: "Tehsildar / Naib Tehsildar",
    portalName: "Antyodaya SARAL Haryana / e-Sewa Punjab",
    timeline: "15 to 20 Working Days",
    fieldInquiryOfficer: "Halqa Patwari & Field Kanungo",
    keyRule:
      "In Haryana and Punjab, Halqa Patwari examines village Jamabandi and municipal registers. He submits an inquiry report confirming all living Class 1 heirs before issuing the certificate.",
    requiredDocuments: [
      "Digital death certificate issued by Civil Hospital or Municipal Body",
      "Family ID (Parivar Pehchan Patra in Haryana) or Ration Card",
      "Notarized family tree affidavit declaring all children and surviving spouse",
      "Statements and ID proofs of two local respectable area witnesses",
      "Self-declaration confirming no court dispute exists among co-heirs",
    ],
  },
  {
    id: "karnataka-tn",
    stateName: "Karnataka & Tamil Nadu",
    certificateName: "Varisu Certificate / Family Tree Certificate",
    issuingOfficer: "Tahsildar / Revenue Divisional Officer (RDO)",
    portalName: "Nadakacheri Karnataka / TN e-Sevai Portal",
    timeline: "15 to 30 Working Days",
    fieldInquiryOfficer: "Village Administrative Officer (VAO) & Revenue Inspector",
    keyRule:
      "Tamil Nadu and Karnataka issue digital barcoded certificates. VAO verifies that no surviving legal heir, especially married daughters and elderly mothers, has been omitted.",
    requiredDocuments: [
      "Digitized Death Certificate with QR code verification",
      "Smart Family Ration Card of the deceased",
      "Birth certificates or school transfer certificates of children",
      "Notarized genealogical tree affidavit with passport photographs",
      "Identity and address proofs of all legal heirs",
    ],
  },
];

interface PurposeChecklist {
  purpose: string;
  title: string;
  description: string;
  mandatoryDocs: string[];
  caveat: string;
}

const PURPOSE_OPTIONS: PurposeChecklist[] = [
  {
    purpose: "property-mutation",
    title: "DDA, MCD or State Housing Board Property Mutation",
    description:
      "Used to transfer leasehold or freehold flats, plots, and ancestral houses in official government and municipal records.",
    mandatoryDocs: [
      "Original Death Certificate of the deceased owner",
      "Surviving Member Certificate issued by the SDM or Tehsildar",
      "Original Title Deed, Conveyance Deed, or Allotment Letter",
      "Latest municipal property tax paid receipt",
      "Indemnity Bond and affidavits on prescribed non-judicial stamp paper",
    ],
    caveat:
      "If other co-heirs are releasing their share to one person, a registered Relinquishment Deed (Haq Tyag) is also mandatory.",
  },
  {
    purpose: "bank-accounts",
    title: "Bank Accounts, Fixed Deposits & Locker Claims",
    description:
      "Used to claim deceased savings accounts, term deposits, and safe deposit lockers when no nominee was registered.",
    mandatoryDocs: [
      "Surviving Member Certificate or Legal Heir Certificate",
      "Death Certificate of the bank account holder",
      "Original passbooks, Cheque books, and FD deposit receipts",
      "KYC documents (Aadhaar & PAN) of all surviving members",
      "Bank claim form signed jointly by all surviving legal heirs",
    ],
    caveat:
      "Under RBI guidelines, banks settle claims up to statutory limits with an SMC and indemnity bond without needing a court succession certificate.",
  },
  {
    purpose: "relinquishment-deed",
    title: "Prerequisite for Drafting a Relinquishment Deed",
    description:
      "Sub-Registrars mandate an official Surviving Member Certificate before registering a Haq Tyag deed among family members.",
    mandatoryDocs: [
      "Surviving Member Certificate listing every living co-heir",
      "Original property purchase deed or conveyance deed",
      "Death certificate of the original deceased owner",
      "e-Stamp paper with state stamp duty payment receipt",
      "Two independent adult witnesses with original ID cards",
    ],
    caveat:
      "Every single surviving member named in the certificate must either sign as a releasor or be joined as an executing party.",
  },
  {
    purpose: "insurance-pension",
    title: "Insurance Claims, PF & Family Pension Release",
    description:
      "Required by LIC, private insurers, EPFO, and government pension departments to release death benefits to rightful dependents.",
    mandatoryDocs: [
      "Surviving Member Certificate from the local revenue authority",
      "Original insurance policy bond or EPFO member claim forms",
      "Death certificate with cause of death medical records",
      "Bank account details and cancelled cheques of the surviving claimant",
      "No Objection Certificates from other adult family members",
    ],
    caveat:
      "Family pension is usually released first to the surviving spouse or dependent minor children under central and state pension rules.",
  },
  {
    purpose: "utility-meter",
    title: "Electricity, Water Meter & Gas Connection Transfer",
    description:
      "Used to transfer utility meters and consumer connections from the deceased person to the surviving family member residing in the home.",
    mandatoryDocs: [
      "Surviving Member Certificate or Legal Heir document",
      "Latest paid electricity or water utility bill",
      "Death certificate of the registered consumer",
      "Aadhaar card of the surviving applicant residing on the premises",
      "Self-declaration NOC from other co-occupants",
    ],
    caveat:
      "Utility boards allow fast name transfer within 7 days once the certified surviving member document is uploaded.",
  },
];

export default function SurvivorMemberInteractive() {
  const [selectedStateId, setSelectedStateId] = useState<string>("delhi");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("property-mutation");
  const [selectedApplicant, setSelectedApplicant] = useState<string>("spouse");

  const currentState =
    SMC_STATE_PROTOCOLS.find((s) => s.id === selectedStateId) || SMC_STATE_PROTOCOLS[0];
  const currentPurpose =
    PURPOSE_OPTIONS.find((p) => p.purpose === selectedPurpose) || PURPOSE_OPTIONS[0];

  return (
    <section className="w-full my-16 sm:my-24">
      {/* SECTION HEADER: Strict H2 <= 70 chars, No Em-dashes */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Building2 className="w-4 h-4" />
          <span>Interactive State Protocols &amp; Document Checker</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Interactive SMC State Authority &amp; Document Selector
        </h2>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Issuing rules for Surviving Member Certificates vary across Indian states. Select your state to review official issuing offices, or use our 30-second checker to identify your required papers:
        </p>
      </div>

      {/* =========================================================================
          PART 1: STATE PROTOCOL SELECTOR
          ========================================================================= */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-4">
          <MapPin className="w-4 h-4" />
          <span>Step 1: Choose Your Indian State or Union Territory</span>
        </div>

        {/* State Pill Buttons */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8">
          {SMC_STATE_PROTOCOLS.map((state) => (
            <button
              key={state.id}
              onClick={() => setSelectedStateId(state.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedStateId === state.id
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/10 border border-[#172228]/10"
              }`}
            >
              {state.stateName}
            </button>
          ))}
        </div>

        {/* Selected State Protocol Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#172228]/10">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#55636D] font-medium mb-1">
                Official Revenue Certificate
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                {currentState.certificateName}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#172228]/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] mb-1">
                  Issuing Authority
                </div>
                <div className="text-sm font-semibold text-[#111827]">
                  {currentState.issuingOfficer}
                </div>
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#172228]/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#047857] mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Official Timeline</span>
                </div>
                <div className="text-sm font-semibold text-[#111827]">
                  {currentState.timeline}
                </div>
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#172228]/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] mb-1">
                  Field Inquiry Official
                </div>
                <div className="text-sm font-semibold text-[#111827]">
                  {currentState.fieldInquiryOfficer}
                </div>
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#172228]/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] mb-1">
                  Government Portal
                </div>
                <div className="text-sm font-semibold text-[#111827] truncate">
                  {currentState.portalName}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#C65378]/5 border border-[#C65378]/15">
              <div className="text-xs font-bold text-[#C65378] mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Authority Rule</span>
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#374151]">
                {currentState.keyRule}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#FAF7F0] rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>State Required Documents Checklist</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151]">
                {currentState.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#55636D]">
                Need advocate verification for this state?
              </span>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#C65378] hover:bg-[#a13c5d] text-white px-4 py-2.5 rounded-full transition-colors"
              >
                <span>Consult Advocate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: 30-SECOND FAST PURPOSE & ELIGIBILITY CHECKER
          ========================================================================= */}
      <div className="bg-[#F4EFE6] rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
          <Search className="w-4 h-4" />
          <span>30-Second Legal Document Checker</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">
          Find Your Exact SMC Requirements by Purpose
        </h3>
        <p className="text-sm text-[#49585F] mb-6 max-w-2xl">
          Select why you need the certificate and who is applying. We will display the exact papers you must submit to avoid rejection:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
                1. Select Primary Purpose
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full bg-white border border-[#172228]/15 rounded-xl px-4 py-3 text-sm text-[#111827] font-medium focus:outline-hidden focus:border-[#C65378]"
              >
                <option value="property-mutation">Property Mutation (DDA / MCD / Housing Board)</option>
                <option value="bank-accounts">Bank Accounts &amp; Fixed Deposits Settlement</option>
                <option value="relinquishment-deed">Relinquishment Deed (Haq Tyag) Preparation</option>
                <option value="insurance-pension">Insurance Claim, PF &amp; Family Pension</option>
                <option value="utility-meter">Electricity, Water &amp; Gas Connection Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
                2. Applicant Relationship to Deceased
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "spouse", label: "Surviving Spouse" },
                  { id: "child", label: "Son or Daughter" },
                  { id: "mother", label: "Surviving Mother" },
                  { id: "sibling", label: "Brother or Sister" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedApplicant(item.id)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                      selectedApplicant === item.id
                        ? "bg-[#172228] text-white"
                        : "bg-white text-[#172228] border border-[#172228]/10 hover:border-[#C65378]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#172228]/10 text-xs text-[#55636D] leading-relaxed">
              <strong className="text-[#111827]">Legal Note:</strong> Under Section 8 of the Hindu Succession Act, 1956, Class 1 heirs include spouse, sons, daughters, and mother. If an applicant is a sibling, they are Class 2 heirs and can apply only when no Class 1 heir is alive.
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
            <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#C65378] bg-[#C65378]/10 px-3 py-1 rounded-full mb-3">
              Application Checklist
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#111827] mb-2">
              {currentPurpose.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#49585F] mb-5">
              {currentPurpose.description}
            </p>

            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">
                Mandatory Documentation Checklist:
              </div>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151]">
                {currentPurpose.mandatoryDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 mb-6 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div className="text-xs text-[#49585F] leading-relaxed">
                <strong className="text-[#111827]">Important Advisory: </strong>
                {currentPurpose.caveat}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold px-6 py-3 transition-colors"
              >
                <span>Draft Affidavits &amp; Apply Online</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/relinquishment-deed"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#172228]/15 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-xs font-semibold px-5 py-3 transition-colors"
              >
                <span>Explore Relinquishment Deed</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
