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

interface NriFijiScenario {
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

const NRI_FIJI_SCENARIOS: NriFijiScenario[] = [
  {
    id: "suva-lautoka-nadi-oci",
    label: "Suva & Lautoka: OCI Assets",
    icon: "landmark",
    heading: "Suva, Lautoka & Nadi: OCI Ancestral Land & Home Claims",
    challengeSummary:
      "Indo-Fijian families residing in Suva, Lautoka, Nadi, and Ba often maintain deep ancestral roots in Uttar Pradesh, Bihar, Punjab, or Gujarat, while also acquiring modern apartments in Delhi NCR, Mumbai, or Bengaluru. Without a clear testamentary plan, proving OCI heirship before local Indian revenue authorities triggers lengthy multi-party disputes.",
    legalMechanism:
      "Under FEMA 1999 Regulation 3(1)(b), Overseas Citizens of India (OCIs) and foreign nationals of Indian origin are legally entitled to inherit agricultural land, farmhouses, and residential properties from Indian residents. A standalone Indian Will provides unimpeachable proof of title, allowing direct mutation before the local Tehsildar or Sub-Registrar.",
    statutoryPrecedent: "FEMA 1999 Reg 3(1)(b) & HSA 1956 s. 30",
    recommendedInstrument: "OCI Ancestral Title Will & Revenue Mutation Protocol",
    checklist: [
      "Map ancestral coparcenary shares in India vs modern self-acquired flats",
      "Cite FEMA Regulation 3(1)(b) to secure OCI agricultural land inheritance",
      "Appoint an Indian resident co-executor for rapid mutation before Tehsildar",
    ],
  },
  {
    id: "fiji-succession-act-dual-will",
    label: "Fiji Succession Act: Dual-Will",
    icon: "coins",
    heading: "Fiji Succession Act 1970: Eliminating Resealing Impasse",
    challengeSummary:
      "Standard Fijian wills drafted under the Fiji Succession, Probate and Administration Act 1970 contain blanket revocation clauses that inadvertently revoke prior Indian wills. When only a Fijian Will exists, Indian land offices cannot act until probate is granted in Fiji and resealed via Indian High Courts.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925 (Lex Situs), succession to immovable property in India is regulated exclusively by Indian law. Resealing a Fijian High Court probate in India under Section 228 takes 12 to 24 months. A separate Indian Will with reciprocal territorial ring-fencing keeps Fiji and Indian estates completely insulated.",
    statutoryPrecedent: "Fiji Succession Act 1970 Cap 60 & ISA 1925 s. 5",
    recommendedInstrument: "Dual-Track Standalone Indian Will & Ring-Fence Clause",
    checklist: [
      "Insert express territorial ring-fencing limiting scope strictly to India",
      "Carve out Fijian residential properties, superannuation, and bank accounts",
      "Coordinate with Fijian legal counsel to insert mirror exclusion clause",
    ],
  },
  {
    id: "suva-consular-attestation",
    label: "Consular & Notarial Protocols",
    icon: "building",
    heading: "High Commission Suva Attestation & Notarial Protocols",
    challengeSummary:
      "NRIs and OCIs across Viti Levu and Vanua Levu often believe they must travel to India or buy Indian non-judicial stamp paper to execute an enforceable Will, causing indefinite estate planning delays.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act 1925 and the Indian Stamp Act 1899, a Will requires zero stamp duty and can be executed on plain A4 paper in Fiji. Signing before two independent adult witnesses followed by attestation at the High Commission of India in Suva (Butt Street) makes it fully admissible before Indian courts.",
    statutoryPrecedent: "ISA 1925 s. 63 & Diplomatic Officers Act 1948",
    recommendedInstrument: "Section 63 Plain-Paper Will with HCI Suva Attestation",
    checklist: [
      "Print on standard A4 paper in Fiji (zero Indian stamp duty required)",
      "Sign in the concurrent presence of two independent adult witnesses",
      "Complete consular attestation at High Commission of India in Suva",
    ],
  },
  {
    id: "fema-usd1m-remittance",
    label: "FEMA & USD 1M Remittance",
    icon: "globe",
    heading: "FEMA 1999 & RBI: USD 1M Annual Repatriation to Fiji",
    challengeSummary:
      "Indo-Fijian heirs selling inherited Indian property or liquidating NRO bank accounts often face excessive 20%+ TDS withholding under Section 195 of the Income Tax Act, along with banking delays when transferring funds to Fijian bank accounts.",
    legalMechanism:
      "Under RBI Foreign Exchange Management (Remittance of Assets) Regulations and Section 197 of the Income Tax Act, non-resident heirs can obtain a Lower TDS Certificate (Form 13) and repatriate up to USD 1,000,000 per financial year via an NRO bank account with CA certifications (Form 15CA and Form 15CB).",
    statutoryPrecedent: "FEMA Remittance Reg 2016 & IT Act s. 195/197",
    recommendedInstrument: "FEMA Remittance Roadmap & Section 197 Tax Clearance",
    checklist: [
      "Update NRO and NRE bank account nominations with registered mandates",
      "Obtain Section 197 Lower TDS Certificate (Form 13) before property sale",
      "Secure Form 15CA and Form 15CB certifications for outward wire to Fiji",
    ],
  },
];

export default function NriFijiWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("suva-lautoka-nadi-oci");

  const currentScenario =
    NRI_FIJI_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_FIJI_SCENARIOS[0];

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
          Select Your Fiji NRI &amp; OCI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal pathways for Suva, Lautoka, and Nadi OCI ancestral assets, Fiji Succession Act dual-will harmonization, High Commission Suva attestation, and FEMA USD 1M repatriation:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_FIJI_SCENARIOS.map((s) => {
          const isActive = s.id === selectedId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-left text-xs sm:text-[13px] font-semibold transition-all border ${
                isActive
                  ? "bg-[#172228] text-white border-[#172228] shadow-sm"
                  : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#C65378]/40 hover:bg-white"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${
                  isActive ? "bg-white/10" : "bg-white border border-[#172228]/10"
                }`}
              >
                {getIcon(s.icon)}
              </div>
              <span className="leading-tight">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario Detail Card */}
      <div className="bg-[#FAF7F0] rounded-[24px] border border-[#172228]/10 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
              Legal Diagnostic Analysis
            </div>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              {currentScenario.heading}
            </h4>
          </div>
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <span className="text-xs font-mono uppercase bg-white border border-[#172228]/15 px-3 py-1.5 rounded-full text-[#172228] font-bold">
              {currentScenario.statutoryPrecedent}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-2">
                Cross-Border Legal Challenge
              </div>
              <p className="text-[14.5px] leading-[1.68] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#047857] mb-2">
                Statutory Solution &amp; Indian Law Mechanism
              </div>
              <p className="text-[14.5px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#172228]/10 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#C65378] mb-1">
                Recommended Legal Instrument
              </div>
              <div className="text-base font-semibold text-[#111827] mb-4">
                {currentScenario.recommendedInstrument}
              </div>

              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-3">
                Actionable Compliance Checklist
              </div>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151] mb-6">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors w-full"
            >
              <span>Consult Cross-Border Counsel</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
