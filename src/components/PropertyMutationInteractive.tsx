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
  Scale,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface StateMutationProtocol {
  id: string;
  stateName: string;
  mutationType: string;
  issuingAuthority: string;
  portalName: string;
  timeline: string;
  verificationOfficer: string;
  governingAct: string;
  keyRule: string;
  requiredDocuments: string[];
}

const STATE_PROTOCOLS: StateMutationProtocol[] = [
  {
    id: "delhi",
    stateName: "Delhi NCR",
    mutationType: "MCD e-Mutation & DDA Mutation Letter",
    issuingAuthority: "Joint Assessor & Collector (MCD) / Deputy Director (DDA)",
    portalName: "MCD Online Property Tax Portal (mcdonline.nic.in) & DDA Portal",
    timeline: "21 to 45 Working Days",
    verificationOfficer: "Zonal Assessor & Collector / Revenue Inspector",
    governingAct: "Delhi Municipal Corporation Act, 1957 (Sections 124–128) & DDA Act, 1957",
    keyRule:
      "In Delhi, mutation updates municipal tax records. If the deceased left a registered Will, MCD requires death certificate, Surviving Member Certificate (SMC), and affidavits. DDA leasehold properties require public newspaper notification before issuing a formal mutation substitution letter.",
    requiredDocuments: [
      "Original or Certified Copy of Title Deed / Conveyance Deed",
      "Official Death Certificate issued by MCD / NDMC",
      "Surviving Member Certificate (SMC) from SDM Revenue Department",
      "Registered Will (if applicable) or Relinquishment Deed executed by co-heirs",
      "Affidavit on ₹10 non-judicial stamp paper attested by Notary Public",
      "Indemnity Bond on ₹100 stamp paper indemnifying the Municipal Corporation",
      "Up-to-date Property Tax Payment Receipt and UPIC number",
    ],
  },
  {
    id: "maharashtra",
    stateName: "Maharashtra (Mumbai / Pune)",
    mutationType: "7/12 Varas Nond / Ferfar & BMC Property Tax Transfer",
    issuingAuthority: "Talathi / Circle Officer (Revenue) & Assessor & Collector (BMC/PMC)",
    portalName: "Aaple Sarkar / Mahabhumi Portal (mahabhumi.gov.in)",
    timeline: "30 to 60 Working Days (including 15-day statutory objection period)",
    verificationOfficer: "Talathi (Saza) and Mandal Adhikari (Circle Officer)",
    governingAct: "Maharashtra Land Revenue Code, 1966 (Sections 148–154) & MMC Act, 1888",
    keyRule:
      "For agricultural land in Maharashtra, legal heirs apply for Varas Nond under Section 149 MLRC. Talathi prepares a Ferfar (mutation draft entry) and serves Form 135-D public notice. If no objections arise within 15 days, Circle Officer certifies the mutation, updating the 7/12 extract.",
    requiredDocuments: [
      "Death Certificate from Municipal Corporation (BMC/PMC) or Gram Panchayat",
      "Varis Panchanama / Legal Heir Certificate issued by Tehsildar",
      "Latest 7/12 Extract (Satbara Utara) and 8-A Khate Utar",
      "CTS Property Card (PR Card) for city survey properties",
      "Co-heirs No Objection Affidavits (Hakka Sodpatra / Consent Letters)",
      "Cooperative Housing Society Share Certificate & NOC (for Mumbai/Pune flats)",
    ],
  },
  {
    id: "karnataka",
    stateName: "Karnataka (Bengaluru / BBMP)",
    mutationType: "BBMP e-Aasthi A-Khata Transfer & BDA Mutation",
    issuingAuthority: "Assistant Revenue Officer (ARO - BBMP) / BDA Secretary",
    portalName: "BBMP e-Aasthi Portal (bbmpeaasthi.karnataka.gov.in) & Seva Sindhu",
    timeline: "30 to 45 Working Days",
    verificationOfficer: "Revenue Inspector (RI) and Assistant Revenue Officer (ARO)",
    governingAct: "Bruhat Bengaluru Mahanagara Palike Act, 2020 & Karnataka Land Revenue Act, 1964",
    keyRule:
      "In Bengaluru, Khata transfer is mandatory to record the legal heir as the assessed property owner. BBMP issues an e-Khata Certificate and Khata Extract upon submitting registered title deeds, death certificate, family tree, and SAS property tax clearance.",
    requiredDocuments: [
      "Registered Title Deed (Sale Deed / Gift Deed / Partition Deed)",
      "Death Certificate of registered Khata holder",
      "Family Tree (Vamsha Vruksha) certified by Revenue Authority or Notary",
      "Latest Property Tax paid receipts and SAS Challan",
      "Encumbrance Certificate (Form 15) up to current date",
      "Affidavit of Legal Heirs consenting to Khata transfer",
    ],
  },
  {
    id: "up",
    stateName: "Uttar Pradesh & NCR",
    mutationType: "Nagar Nigam Dakhil Kharij & Khatauni Varasat (Pouthi)",
    issuingAuthority: "Tehsildar / Naib Tehsildar (Rural) & Nagar Nigam Revenue Officer (Urban)",
    portalName: "UP e-District & UP Bhulekh Portal (upbhulekh.gov.in / e-nagarsewaup.gov.in)",
    timeline: "25 to 45 Working Days",
    verificationOfficer: "Lekhpal (Patwari) & Revenue Inspector (Kanungo)",
    governingAct: "UP Revenue Code, 2006 (Sections 33, 34 & 35) & UP Municipal Corporation Act, 1959",
    keyRule:
      "Under Section 33 of the UP Revenue Code, 2006, succession to agricultural land is recorded via automated Varasat (Pouthi Khata). For city properties (Noida, Ghaziabad, Lucknow), urban Dakhil Kharij is filed before the Nagar Nigam with newspaper publication to invite objections.",
    requiredDocuments: [
      "Registered Title Deed or Allotment / Conveyance Deed (NOIDA / GDA / LDA)",
      "Official Death Certificate from Nagar Nigam or Registrar of Births & Deaths",
      "Waris Praman Patra (Legal Heir Certificate) from Tehsildar",
      "Parivar Register Nakal certified by ADO Panchayat",
      "Affidavit on ₹10 stamp paper with 2 local witness identity proofs",
      "Up-to-date Municipal House Tax & Water Tax clearance receipts",
    ],
  },
  {
    id: "west-bengal",
    stateName: "West Bengal & Kolkata",
    mutationType: "KMC Assessment Mutation & BL&LRO Porcha Mutation",
    issuingAuthority: "Assessor-Collector (KMC) / Block Land & Land Reforms Officer (BL&LRO)",
    portalName: "Banglarbhumi Portal (banglarbhumi.gov.in) & KMC Online Portal",
    timeline: "30 to 60 Working Days",
    verificationOfficer: "Revenue Inspector (RI) and Sub-Assessor Collector",
    governingAct: "West Bengal Land Reforms Act, 1955 (Section 50) & KMC Act, 1980 (Section 183)",
    keyRule:
      "In West Bengal, mutation is two-fold: BL&LRO records change in the Record of Rights (Porcha / Khatian), while Kolkata Municipal Corporation (KMC) amends the Assessment Book. Mutation under a Will requires court Probate if executed within Kolkata presidential limits.",
    requiredDocuments: [
      "Registered Deed of Conveyance / Lease Deed",
      "Municipal Death Certificate from KMC or concerned municipality",
      "Legal Heirship Certificate issued by Councilor, MLA, or Magistrate",
      "Copy of High Court Probate (mandatory for Wills in Kolkata jurisdiction)",
      "Latest Property Tax Assessment Challan and BL&LRO Khajana Receipt",
      "Joint Declaration & Indemnity Bond executed by surviving heirs",
    ],
  },
  {
    id: "tamilnadu",
    stateName: "Tamil Nadu & Chennai",
    mutationType: "Patta Chitta Transfer & Chennai Corporation Name Transfer",
    issuingAuthority: "Tahsildar / Zonal Officer (Greater Chennai Corporation)",
    portalName: "Tamil Nilam Portal (eservices.tn.gov.in) & GCC Portal",
    timeline: "15 to 30 Working Days",
    verificationOfficer: "Village Administrative Officer (VAO) & Revenue Inspector (RI)",
    governingAct: "Tamil Nadu Patta Pass Book Act, 1983 & Chennai City Municipal Corporation Act, 1919",
    keyRule:
      "Under the Tamil Nadu Patta Pass Book Act, 1983, legal heirs apply for Patta Transfer (Name Transfer) online. For residential flats, Chennai Corporation updates property tax billing name. Succession requires an official Varisu certificate from the Tahsildar.",
    requiredDocuments: [
      "Registered Sale Deed, Settlement Deed, or Partition Deed",
      "Original Death Certificate from Corporation of Chennai or Local Body",
      "e-Varisu Certificate (Legal Heir Certificate) from Revenue Department",
      "Current Property Tax Receipt and CMWSSB Water Tax clearance",
      "Parent Document copies tracing title back to 30 years",
      "No Objection Affidavit on non-judicial stamp paper from siblings (if applicable)",
    ],
  },
];

export default function PropertyMutationInteractive() {
  const [activeTab, setActiveTab] = useState("delhi");

  // Diagnostic Calculator State
  const [propertyType, setPropertyType] = useState<"flat" | "plot" | "authority" | "agri">("flat");
  const [acquisitionBasis, setAcquisitionBasis] = useState<"registered_will" | "unregistered_will" | "no_will_joint" | "no_will_single">("registered_will");
  const [coHeirStatus, setCoHeirStatus] = useState<"agree" | "nri_abroad" | "disputed">("agree");
  const [selectedState, setSelectedState] = useState<string>("delhi");

  const currentProtocol =
    STATE_PROTOCOLS.find((item) => item.id === activeTab) || STATE_PROTOCOLS[0];

  // Evaluate mutation path
  const evaluatePath = () => {
    let complexity: "Low Complexity" | "Moderate Complexity" | "High Complexity / Legal Representation Recommended" = "Low Complexity";
    let timeline = "20 to 35 Days";
    let probateNote = "Probate not mandatory in this jurisdiction for straightforward municipal mutation.";
    const keyActionItems: string[] = [];
    const legalAlerts: string[] = [];

    // Analyze based on inputs
    if (acquisitionBasis === "registered_will") {
      keyActionItems.push("Submit Certified Copy of Registered Will to the municipal authority / Tehsildar.");
      keyActionItems.push("Execute Affidavit of Executor / Beneficiary certifying genuineness of the Will.");
      if (selectedState === "west-bengal" || selectedState === "maharashtra") {
        probateNote = "Note: In presidential towns (Mumbai, Kolkata, Chennai), High Court probate may be demanded by municipal assessors or cooperative housing societies under Section 213 of the Indian Succession Act.";
      }
    } else if (acquisitionBasis === "unregistered_will") {
      complexity = "Moderate Complexity";
      timeline = "45 to 90 Days";
      keyActionItems.push("Obtain notarized No Objection Affidavits (NOC) from all Class 1 legal heirs who would inherit under intestate law.");
      keyActionItems.push("Publish public notices in two local daily newspapers (one vernacular, one English) inviting 15-day objections.");
      legalAlerts.push("Unregistered Wills face intense scrutiny from revenue officers. If any legal heir files an objection, the Tehsildar cannot adjudicate title disputes and will direct parties to civil court.");
    } else if (acquisitionBasis === "no_will_joint") {
      keyActionItems.push("Procure official Legal Heir Certificate / Surviving Member Certificate from the SDM / Tehsildar.");
      keyActionItems.push("Apply for Joint Mutation, recording all surviving legal heirs as co-owners in undivided shares.");
    } else if (acquisitionBasis === "no_will_single") {
      complexity = "Moderate Complexity";
      keyActionItems.push("Draft and register a formal Relinquishment Deed (Haq Tyag) or Release Deed at the local Sub-Registrar Office (SRO).");
      keyActionItems.push("Unregistered NOCs or plain paper consent letters are frequently rejected by municipal authorities.");
    }

    if (coHeirStatus === "nri_abroad") {
      complexity = "Moderate Complexity";
      timeline = "35 to 60 Days";
      keyActionItems.push("NRI co-heir must execute a Specific Power of Attorney (PoA) or Relinquishment Deed abroad.");
      keyActionItems.push("Foreign document must be apostilled in Hague Convention country (USA, UK, Canada, Australia) or attested by Indian Embassy (UAE) and stamped in India within 90 days of receipt.");
      legalAlerts.push("Failure to adjudicate foreign stamp duty within the 90-day statutory window under the Indian Stamp Act will cause the Tehsildar to reject the mutation file.");
    } else if (coHeirStatus === "disputed") {
      complexity = "High Complexity / Legal Representation Recommended";
      timeline = "90 to 180+ Days (Subject to Revenue Court Hearing)";
      legalAlerts.push("CRITICAL: Under Supreme Court rulings (Sawarni v. Inder Kaur), a Tehsildar or Municipal Assessor has NO legal jurisdiction to decide title disputes. Contested mutations are referred to the Sub-Divisional Officer (SDO) or Civil Court.");
      keyActionItems.push("Hire an advocate to file a Caveat or contest the disputed mutation before the Revenue Court.");
      keyActionItems.push("Consider filing a civil partition suit or petition for declaration of title with temporary injunction under Order 39 CPC.");
    }

    if (propertyType === "agri") {
      keyActionItems.push("Process under State Land Revenue Code (e.g. Section 33 UP Revenue Code / Section 149 MLRC Maharashtra) through Patwari / Lekhpal.");
    } else if (propertyType === "authority") {
      keyActionItems.push("Apply to development authority (DDA, BDA, NOIDA, MHADA) for substitution of leasehold or freehold allotment rights.");
    }

    return { complexity, timeline, probateNote, keyActionItems, legalAlerts };
  };

  const assessment = evaluatePath();

  return (
    <div className="w-full my-12 sm:my-20">
      {/* SECTION HEADER (H2 <= 70 chars: 57 chars) */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Building2 className="w-4 h-4" />
          <span>Interactive State Directory &amp; Diagnostic Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          State Revenue Protocols &amp; 30-Second Mutation Calculator
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Property mutation rules vary across Indian states. Select your state below to inspect local statutory guidelines, or run our 30-second estimator to calculate your exact procedural pathway.
        </p>
      </div>

      {/* =========================================================================
          PART 1: STATE-WISE REVENUE & MUNICIPAL PROTOCOLS (TABS)
          ========================================================================= */}
      <div className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-[#172228]/10 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Part 1: State Authority Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              State-Specific Mutation Protocols &amp; Competent Authorities
            </h3>
          </div>
          <div className="text-xs text-[#55636D] flex items-center gap-1.5 bg-[#FAF7F0] px-3.5 py-1.5 rounded-full border border-[#172228]/10 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Updated with 2026 Revenue Circulars</span>
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
                Official Procedure Name
              </span>
              <h4 className="text-2xl font-semibold text-[#111827] mb-2">
                {currentProtocol.mutationType}
              </h4>
              <p className="text-[14.5px] leading-[1.7] text-[#49585F]">
                {currentProtocol.keyRule}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#172228]/10">
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] block mb-1">
                  Competent Officer
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  {currentProtocol.issuingAuthority}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] block mb-1">
                  Field Inquiry Official
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  {currentProtocol.verificationOfficer}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] block mb-1">
                  Standard Timeline
                </span>
                <span className="text-sm font-semibold text-[#047857]">
                  {currentProtocol.timeline}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] block mb-1">
                  Governing Enactment
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  {currentProtocol.governingAct}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#172228]/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] block mb-1">
                Official Submission Portal
              </span>
              <span className="text-xs sm:text-sm font-mono text-[#C65378] break-all">
                {currentProtocol.portalName}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-6 border border-[#172228]/10">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-[#C65378]" />
              <h5 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
                Mandatory Documentation Checklist
              </h5>
            </div>
            <ul className="space-y-3">
              {currentProtocol.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#374151] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Hire Advocate for {currentProtocol.stateName} Mutation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: 30-SECOND MUTATION CALCULATOR & CHECKLIST GENERATOR
          ========================================================================= */}
      <div className="w-full bg-[#172228] text-white rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_rgba(23,34,40,0.12)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Part 2: 30-Second Diagnostic Calculator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            Calculate Your Exact Property Mutation Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Select your property details and family circumstances below to receive an instant legal diagnosis, estimated timeline, and tailored checklist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5">
            {/* Input 1: Property Type */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-2">
                1. Property Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "flat", label: "Apartment / Flat" },
                  { id: "plot", label: "Freehold House / Plot" },
                  { id: "authority", label: "Authority Allotment" },
                  { id: "agri", label: "Agricultural Land" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                      propertyType === item.id
                        ? "bg-[#C65378] text-white font-semibold shadow-xs"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Basis of Acquisition */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-2">
                2. Basis of Inheritance Claim
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "registered_will", label: "Registered Will" },
                  { id: "unregistered_will", label: "Unregistered Will" },
                  { id: "no_will_joint", label: "No Will (Joint Heirs)" },
                  { id: "no_will_single", label: "No Will (Single via NOC)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAcquisitionBasis(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                      acquisitionBasis === item.id
                        ? "bg-[#C65378] text-white font-semibold shadow-xs"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Co-heir Consensus */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-2">
                3. Family Co-Heir Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "agree", label: "All Heirs Agree" },
                  { id: "nri_abroad", label: "Heir Lives Abroad" },
                  { id: "disputed", label: "Dispute / Objection" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCoHeirStatus(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                      coHeirStatus === item.id
                        ? "bg-[#C65378] text-white font-semibold shadow-xs"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: State */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-2">
                4. Property Location State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#C65378]"
              >
                <option value="delhi" className="bg-[#172228] text-white">Delhi NCR (MCD / DDA)</option>
                <option value="maharashtra" className="bg-[#172228] text-white">Maharashtra (BMC / PMC / 7/12)</option>
                <option value="karnataka" className="bg-[#172228] text-white">Karnataka (BBMP Khata / BDA)</option>
                <option value="up" className="bg-[#172228] text-white">Uttar Pradesh / Haryana (Nagar Nigam / Lekhpal)</option>
                <option value="west-bengal" className="bg-[#172228] text-white">West Bengal (KMC / BL&amp;LRO)</option>
                <option value="tamilnadu" className="bg-[#172228] text-white">Tamil Nadu (Chennai Corp / Patta)</option>
              </select>
            </div>
          </div>

          {/* Diagnostic Result Card */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Assessed Complexity
                </span>
                <span
                  className={`text-base sm:text-lg font-bold ${
                    assessment.complexity === "Low Complexity"
                      ? "text-[#34D399]"
                      : assessment.complexity === "Moderate Complexity"
                      ? "text-[#FBBF24]"
                      : "text-[#F87171]"
                  }`}
                >
                  {assessment.complexity}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Estimated Timeline
                </span>
                <span className="text-sm font-semibold text-white">
                  {assessment.timeline}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
                Mandatory Action Steps
              </span>
              <ul className="space-y-2">
                {assessment.keyActionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-200 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {assessment.legalAlerts.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#F87171]/10 border border-[#F87171]/25 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F87171] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Statutory Precaution</span>
                </div>
                {assessment.legalAlerts.map((alert, idx) => (
                  <p key={idx} className="text-xs text-gray-200 leading-relaxed mb-1 last:mb-0">
                    {alert}
                  </p>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-300 leading-relaxed mb-5">
              <span className="font-semibold text-white">Jurisdictional Probate Rule:</span>{" "}
              {assessment.probateNote}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Book Advocate Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                <span>Check Heir Shares</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
