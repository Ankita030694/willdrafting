"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Coins,
  Globe,
  Landmark,
  FileText,
  Calculator,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface NriJurisdictionScenario {
  id: string;
  country: string;
  currency: string;
  symbol: string;
  taxCompliance: string;
  femaChannel: string;
  typicalIssue: string;
  statutoryRule: string;
  checklist: string[];
}

const NRI_JURISDICTIONS: NriJurisdictionScenario[] = [
  {
    id: "usa",
    country: "United States (US NRIs / OCIs)",
    currency: "USD ($)",
    symbol: "$",
    taxCompliance: "IRS FBAR (FinCEN 114) and FATCA Form 8938 reporting + India-US DTAA Article 13",
    femaChannel: "RBI FEMA 13(R) USD 1 Million Remittance Scheme via NRO account to US checking account",
    typicalIssue: "Buyer insists on deducting 23.92% TDS on total ₹3 Crore sale price ($360,000 locked for 18 months).",
    statutoryRule: "Section 197 Form 13 certificate reduces TDS from 23.92% gross to actual net gain (~3% to 5%).",
    checklist: [
      "Indian PAN card linked with NRI residential status",
      "Special Power of Attorney (PoA) apostilled or consularized in USA and adjudicated in India",
      "Ancestral pedigree chart (Vanshavali) and mutation order in seller name",
      "Section 197 certificate from International Taxation AO before deed execution",
      "Form 15CB signed by Chartered Accountant with unique UDIN number",
      "Form 15CA Part C filed online on Income Tax e-filing portal",
    ],
  },
  {
    id: "uk",
    country: "United Kingdom (UK NRIs / OCIs)",
    currency: "GBP (£)",
    symbol: "£",
    taxCompliance: "HMRC Worldwide Income & Capital Gains Tax credit under India-UK DTAA Article 14",
    femaChannel: "Direct outward wire from AD Category-I Bank in India to UK high street bank",
    typicalIssue: "UK resident inherits ancestral family bungalow in Delhi or Punjab with missing parent title deeds.",
    statutoryRule: "High Court title search + certified SRO copies + Legal Heir Certificate prior to buyer contract.",
    checklist: [
      "Adjudication of UK Notary-stamped Power of Attorney at District Collector of Stamps",
      "NRO bank account opened with Authorized Dealer Category-I bank in India",
      "Valuation report by registered valuer as of April 1, 2001 for indexation benefit",
      "Form 13 application submitted with draft agreement to sell",
      "Form 15CA and Form 15CB CA remittance package",
      "Foreign Inward Remittance Certificate (FIRC) / Outward wire SWIFT MT103 confirmation",
    ],
  },
  {
    id: "canada",
    country: "Canada (Canadian NRIs / OCIs)",
    currency: "CAD ($)",
    symbol: "C$",
    taxCompliance: "CRA T1135 Foreign Income Verification Statement + Foreign Tax Credit (FTC)",
    femaChannel: "FEMA Remittance of Assets Regulations 2016 outward wire up to USD 1 Million equivalent",
    typicalIssue: "Canadian citizen unable to travel to India for Sub-Registrar registration biometric appointment.",
    statutoryRule: "Special Power of Attorney executed before Indian Consulate in Toronto, Vancouver, or Ottawa.",
    checklist: [
      "Consular Special PoA registered and stamped in local Indian State within 90 days",
      "Property revenue mutation (Jamabandi / Dakhil Kharij / Khata transfer) complete",
      "Section 195 withholding calculated on net gain via Form 13 certificate",
      "CA issued 15CB certificate verifying full payment of Indian taxes",
      "RBI Form A2 application submitted to authorized remitting branch",
      "Proof of inheritance (Registered Will, Probate decree, or Succession Certificate)",
    ],
  },
  {
    id: "uae",
    country: "UAE & Middle East (GCC NRIs)",
    currency: "AED / USD",
    symbol: "AED",
    taxCompliance: "Zero personal income tax in UAE; 100% tax credit under India-UAE DTAA provisions",
    femaChannel: "Fast-track wire from Indian NRO to UAE NRE or offshore account in Dubai/Abu Dhabi",
    typicalIssue: "NRI faces demands for cash components from local buyers; risk of FEMA non-compliance.",
    statutoryRule: "Strict 100% banking channel sale deed required for Authorized Dealer bank outward clearance.",
    checklist: [
      "All sale consideration received via formal RTGS or crossed cheques into NRO account",
      "Special PoA executed before Indian Embassy in Abu Dhabi or Consulate in Dubai",
      "Section 197 Nil or Lower Tax Certificate obtained in 30 to 45 days",
      "Source of funds clearance: legacy purchase deed of late parents + inheritance proof",
      "Chartered Accountant verified Form 15CA (Part C) & Form 15CB",
      "Bank Form A2 outwards remittance to UAE account completed in 48 hours",
    ],
  },
  {
    id: "aus_sg",
    country: "Australia & Singapore NRIs",
    currency: "AUD / SGD",
    symbol: "A$/S$",
    taxCompliance: "ATO Foreign Capital Gains reporting / Singapore foreign source income remittance exemption",
    femaChannel: "RBI Master Direction on Remittance of Assets through AD Category-I Banking network",
    typicalIssue: "Co-heir dispute in India blocking property liquidation and sale proceeds division.",
    statutoryRule: "High Court partition suit settlement deed or mutual Relinquishment Deed before sale.",
    checklist: [
      "Consular or Notary PoA registered with local Sub-Registrar",
      "Registered Relinquishment Deed or Family Settlement Deed among co-heirs",
      "Valuer certificate for cost of acquisition grandfathering under Section 55",
      "Online Form 13 Lower TDS filing on Income Tax Traces portal",
      "Form 15CB certification with Chartered Accountant membership UDIN",
      "Swift MT103 international wire confirmation to Sydney, Melbourne, or Singapore",
    ],
  },
];

export default function NriRepatriationInteractive() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("usa");
  const [salePriceLakhs, setSalePriceLakhs] = useState<number>(200); // 2 Crore default
  const [acquisitionCostLakhs, setAcquisitionCostLakhs] = useState<number>(60); // 60 Lakhs indexed cost
  const [section54InvestmentLakhs, setSection54InvestmentLakhs] = useState<number>(0);

  const activeScenario = useMemo(() => {
    return (
      NRI_JURISDICTIONS.find((j) => j.id === selectedJurisdiction) ||
      NRI_JURISDICTIONS[0]
    );
  }, [selectedJurisdiction]);

  // Tax calculations
  const grossSalePrice = salePriceLakhs * 100000;
  const indexedCost = acquisitionCostLakhs * 100000;
  const exemption54 = section54InvestmentLakhs * 100000;

  // Standard TDS without Form 13 (20% + 15% surcharge for high value + 4% cess = approx 23.92% on gross)
  const defaultTdsRate = 0.2392;
  const standardTdsWithoutCertificate = Math.round(grossSalePrice * defaultTdsRate);

  // Net capital gain
  const netCapitalGain = Math.max(0, grossSalePrice - indexedCost - exemption54);
  // Actual tax on capital gain (20% LTCG + 4% cess = 20.8% on net gain)
  const actualLtcgTax = Math.round(netCapitalGain * 0.208);

  // Cash saved / unlocked
  const immediateCashFlowSaved = Math.max(
    0,
    standardTdsWithoutCertificate - actualLtcgTax
  );
  const effectiveTdsRateOnGross =
    grossSalePrice > 0
      ? ((actualLtcgTax / grossSalePrice) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-8 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Calculator className="w-4 h-4" />
          <span>Interactive NRI Remittance Diagnostic Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          NRI Property Sale TDS Savings &amp; Repatriation Modeler
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Indian buyers are required by Section 195 to deduct up to 23.92% TDS on total property sale price unless you hold a Section 197 Lower TDS Certificate. Model your tax reduction and statutory remittance roadmap below:
        </p>
      </div>

      {/* Jurisdiction Selection Pills */}
      <div className="mb-10">
        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-3">
          Select Your Country of Tax Residence:
        </label>
        <div className="flex flex-wrap gap-2.5">
          {NRI_JURISDICTIONS.map((j) => (
            <button
              key={j.id}
              onClick={() => setSelectedJurisdiction(j.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                selectedJurisdiction === j.id
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-[#FAF7F0] text-[#172228] hover:bg-[#FAF7F0]/80 border border-[#172228]/10"
              }`}
            >
              {j.country}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Left Inputs & Calculated Matrix, Right Jurisdiction Legal Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Interactive Sliders & Savings Matrix */}
        <div className="lg:col-span-7 bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-4">
            Step 1: Property Financial Valuation
          </div>

          {/* Slider 1: Gross Property Sale Price */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#111827]">
                Gross Sale Price (Agreement Value):
              </span>
              <span className="text-base font-bold text-[#C65378]">
                ₹{salePriceLakhs >= 100 ? `${(salePriceLakhs / 100).toFixed(2)} Cr` : `${salePriceLakhs} Lakhs`}
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="1000"
              step="5"
              value={salePriceLakhs}
              onChange={(e) => setSalePriceLakhs(Number(e.target.value))}
              className="w-full h-2 bg-[#172228]/15 rounded-lg appearance-none cursor-pointer accent-[#C65378]"
            />
            <div className="flex justify-between text-[11px] text-[#55636D] mt-1">
              <span>₹25 Lakhs</span>
              <span>₹5 Crore</span>
              <span>₹10 Crore</span>
            </div>
          </div>

          {/* Slider 2: Indexed Acquisition Cost */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#111827]">
                Indexed Cost of Acquisition / Inherited Fair Value (FMV 2001):
              </span>
              <span className="text-base font-bold text-[#111827]">
                ₹{acquisitionCostLakhs >= 100 ? `${(acquisitionCostLakhs / 100).toFixed(2)} Cr` : `${acquisitionCostLakhs} Lakhs`}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max={Math.min(salePriceLakhs, 800)}
              step="5"
              value={Math.min(acquisitionCostLakhs, salePriceLakhs)}
              onChange={(e) => setAcquisitionCostLakhs(Number(e.target.value))}
              className="w-full h-2 bg-[#172228]/15 rounded-lg appearance-none cursor-pointer accent-[#172228]"
            />
            <p className="text-[11.5px] text-[#55636D] mt-1">
              Section 49(1): Cost to previous owner + Section 55 Fair Market Value indexation up to FY 2024-25.
            </p>
          </div>

          {/* Slider 3: Section 54EC Capital Gain Bond Exemption */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#111827]">
                Section 54EC Bond Reinvestment (REC / PFC / NHAI):
              </span>
              <span className="text-base font-bold text-[#047857]">
                ₹{section54InvestmentLakhs} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={section54InvestmentLakhs}
              onChange={(e) => setSection54InvestmentLakhs(Number(e.target.value))}
              className="w-full h-2 bg-[#172228]/15 rounded-lg appearance-none cursor-pointer accent-[#047857]"
            />
            <div className="flex justify-between text-[11px] text-[#55636D] mt-1">
              <span>₹0</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs (Statutory Maximum)</span>
            </div>
          </div>

          {/* Results Comparison Box */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#172228]/10 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-4">
              Step 2: Section 195 vs Section 197 Savings Matrix
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-red-700 mb-1">
                  Without Form 13 Certificate (Sec 195)
                </div>
                <div className="text-2xl font-bold text-red-900">
                  ₹{(standardTdsWithoutCertificate / 100000).toFixed(2)} L
                </div>
                <p className="text-xs text-red-700/80 mt-1">
                  23.92% deducted on <strong>gross sale price</strong>. Locked with tax department for 12 to 18 months.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  With Form 13 Lower TDS (Sec 197)
                </div>
                <div className="text-2xl font-bold text-emerald-900">
                  ₹{(actualLtcgTax / 100000).toFixed(2)} L
                </div>
                <p className="text-xs text-emerald-800/80 mt-1">
                  Effective TDS rate: <strong>{effectiveTdsRateOnGross}%</strong> calculated on <em>actual net gain</em>.
                </p>
              </div>
            </div>

            {/* Cash flow advantage banner */}
            <div className="p-4 rounded-xl bg-[#172228] text-white flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#E2B96F] font-bold">
                  Immediate Liquid Cash Unlocked
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  ₹{(immediateCashFlowSaved / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-xs text-gray-300">
                  Retained in your NRO account ready for immediate Form 15CA/15CB outward wire.
                </div>
              </div>
              <Link
                href="/contact"
                className="shrink-0 bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold px-4 py-3 rounded-full transition-colors flex items-center gap-1"
              >
                <span>Hire Retainer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Statutory Precedents & Jurisdictional Legal Guide */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
              <Globe className="w-4 h-4" />
              <span>Cross-Border Legal Intelligence</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-medium text-[#111827] mb-3">
              {activeScenario.country}
            </h4>

            <div className="space-y-4 text-sm text-[#374151] mb-6">
              <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#55636D] mb-1">
                  Host Country Tax &amp; Reporting
                </span>
                <p className="text-xs leading-relaxed text-[#111827]">
                  {activeScenario.taxCompliance}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#55636D] mb-1">
                  Authorized FEMA Wire Channel
                </span>
                <p className="text-xs leading-relaxed text-[#111827]">
                  {activeScenario.femaChannel}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#55636D] mb-1">
                  Common Real Estate Dispute
                </span>
                <p className="text-xs leading-relaxed text-[#111827]">
                  {activeScenario.typicalIssue}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#C65378]/20">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#C65378] mb-1">
                  Statutory Advocate Solution
                </span>
                <p className="text-xs leading-relaxed font-medium text-[#111827]">
                  {activeScenario.statutoryRule}
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="border-t border-[#172228]/10 pt-4">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3">
                Statutory NRI Repatriation Checklist
              </div>
              <ul className="space-y-2 text-xs text-[#49585F]">
                {activeScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#172228]/10 flex items-center justify-between">
            <Link
              href="/tools/nri-property-sale-tds-repatriation-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] hover:text-[#C65378] transition-colors"
            >
              <span>Detailed Repatriation Calculator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] text-[#55636D]">RBI FEMA Master Direction Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
