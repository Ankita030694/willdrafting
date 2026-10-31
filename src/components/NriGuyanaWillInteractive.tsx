"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Landmark,
  Coins,
  Globe2,
  FileText,
  Calculator,
} from "lucide-react";

interface NriGuyanaScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_GUYANA_SCENARIOS: NriGuyanaScenario[] = [
  {
    id: "georgetown-oil-expats",
    label: "Georgetown: Oil & Gas Expats",
    icon: "landmark",
    heading: "Georgetown & Demerara: Cross-Border Asset Ring-Fencing",
    challengeSummary:
      "Indian professionals and expatriates living in Georgetown, Demerara, and Linden working across Guyana's energy, engineering, and medical sectors often hold flats, mutual funds, and NRE/NRO accounts in India. A standard Guyanese Will triggers lengthy ancillary probate disputes in Indian High Courts.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, succession to immovable assets in India follows the Lex Situs rule. An independent Indian Will ring-fences your domestic estate, avoiding dual-court probate battles, foreign asset freezes, and conflicts under Guyanese civil law.",
    statutoryPrecedent: "ISA 1925 s. 5 & FEMA Reg 3(1)(b)",
    recommendedInstrument: "Dual-Track Indian Will with Consular Legalisation",
    checklist: [
      "Identify Indian bank accounts, demat portfolios, and real estate",
      "Insert reciprocal non-revocation clauses to protect Guyanese wills",
      "Appoint an Indian resident executor or power of attorney holder",
    ],
  },
  {
    id: "purvanchal-bihar-lineage",
    label: "Indo-Guyanese: Lineage & Land",
    icon: "globe",
    heading: "Purvanchal & Bihar Lineage: Land Mutation & BSA 2023",
    challengeSummary:
      "Descendants in Berbice and New Amsterdam whose ancestors arrived under the colonial indentured system often hold ancestral lands in Ghazipur, Azamgarh, Gorakhpur, Arrah, or Patna that remain registered under great-grandparents' names without updated title deeds.",
    legalMechanism:
      "Under the Bharatiya Sakshya Adhiniyam 2023 (BSA) and Section 34 of the Specific Relief Act, Guyanese citizens reconstruct genealogical lineage (shajra nasab) using archival ship manifests and ancient revenue records, securing declaratory court decrees and Tehsildar mutation.",
    statutoryPrecedent: "BSA 2023 ss. 79-80 & SRA 1963 s. 34",
    recommendedInstrument: "Lineage Proof & Declaratory Succession Protocol",
    checklist: [
      "Verify colonial departure manifests from Georgetown & Kolkata archives",
      "Draft certified family pedigree charts (shajra nasab) with revenue patwaris",
      "File civil declaration suits under Section 34 Specific Relief Act in India",
    ],
  },
  {
    id: "hci-georgetown-attestation",
    label: "HCI Georgetown: Attestation",
    icon: "building",
    heading: "HCI Georgetown: Consular Legalisation & Attestation",
    challengeSummary:
      "Guyana is not a signatory to the 1961 Hague Apostille Convention. Indo-Guyanese citizens executing an Indian Will in Georgetown cannot rely on apostille seals, causing rejections by Indian sub-registrars and civil courts.",
    legalMechanism:
      "Section 63 of the Indian Succession Act 1925 validates wills executed abroad when signed before two adult witnesses and authenticated through a Guyanese Notary Public, the Guyana Ministry of Foreign Affairs, and the High Commission of India in Queenstown, Georgetown.",
    statutoryPrecedent: "ISA 1925 s. 63 & Consular Legalisation Rules",
    recommendedInstrument: "HCI Georgetown Consular-Attested Indian Will",
    checklist: [
      "Print Will on standard A4 paper (zero Indian stamp duty required)",
      "Sign before two independent adult witnesses who are not beneficiaries",
      "Complete consular legalisation at High Commission of India in Georgetown",
    ],
  },
  {
    id: "fema-repatriation-usd1m",
    label: "FEMA: USD 1M Repatriation",
    icon: "coins",
    heading: "FEMA Compliance: USD 1M Remittance & Form 13 Lower TDS",
    challengeSummary:
      "Guyanese NRI and OCI heirs liquidating inherited Indian real estate or closing bank accounts face automatic 20% plus surcharge withholding tax (Section 195 TDS) and banking compliance delays.",
    legalMechanism:
      "Under RBI FEMA Remittance of Assets Regulations 2016, Guyanese beneficiaries can repatriate up to USD 1,000,000 per financial year via NRO accounts after securing a Section 197 Lower TDS Certificate (Form 13) and chartered accountant certifications (Form 15CA & 15CB).",
    statutoryPrecedent: "FEMA Remittance Reg 2016 & IT Act s. 195/197",
    recommendedInstrument: "FEMA Asset Transmission & Remittance Protocol",
    checklist: [
      "Secure legal heirship or probate certificate from Indian authorities",
      "Apply for Section 197 Form 13 certificate to reduce withholding tax",
      "Issue Form 15CA and Form 15CB for authorized dealer bank outward transfer",
    ],
  },
];

export default function NriGuyanaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("georgetown-oil-expats");

  const currentScenario =
    NRI_GUYANA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_GUYANA_SCENARIOS[0];

  const getIcon = (icon: "globe" | "building" | "coins" | "landmark") => {
    switch (icon) {
      case "globe":
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#C65378]" />;
      case "coins":
        return <Coins className="w-5 h-5 text-[#C65378]" />;
      case "landmark":
        return <Landmark className="w-5 h-5 text-[#C65378]" />;
      default:
        return <FileText className="w-5 h-5 text-[#C65378]" />;
    }
  };

  return (
    <section className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Calculator className="w-4 h-4" />
          <span>Interactive Estate Check</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Select Your Guyana NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for Georgetown professionals, Purvanchal and Bihar ancestral lineage claims, High Commission of India legalisation, and FEMA asset repatriation:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_GUYANA_SCENARIOS.map((s) => {
          const isActive = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isActive
                  ? "bg-[#FAF7F0] border-[#C65378] shadow-xs"
                  : "bg-white border-[#172228]/10 hover:border-[#172228]/30 hover:bg-[#FAF7F0]/40"
              }`}
            >
              <div className="mb-2.5">{getIcon(s.icon)}</div>
              <div
                className={`text-xs sm:text-[13.5px] font-semibold leading-snug ${
                  isActive ? "text-[#111827]" : "text-[#55636D]"
                }`}
              >
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scenario Details Container */}
      <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
              Legal Diagnostic Analysis
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="shrink-0 bg-white px-4 py-2 rounded-xl border border-[#172228]/10 text-xs text-[#55636D] self-start">
            <span className="font-semibold text-[#111827]">Authority: </span>
            {currentScenario.statutoryPrecedent}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1.5">
                The Practical Challenge in Guyana &amp; India
              </h4>
              <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1.5">
                Statutory Legal Mechanism &amp; Protection
              </h4>
              <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#C65378] mb-2">
                Mandatory Execution Checklist
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151] mb-5">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#172228]/10">
              <div className="text-[11px] text-[#55636D] mb-1">
                Recommended Cross-Border Instrument:
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-[#111827]">
                {currentScenario.recommendedInstrument}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#172228]/10">
          <span className="text-xs text-[#55636D]">
            Need help ring-fencing your Indian estate or resolving ancestral land titles from Guyana?
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white bg-[#C65378] hover:bg-[#a13c5d] px-5 py-2.5 rounded-full transition-colors"
            >
              <span>Consult Cross-Border Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#172228] bg-white hover:bg-[#FAF7F0] border border-[#172228]/15 px-4 py-2.5 rounded-full transition-colors"
            >
              <span>Start Online Intake</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
