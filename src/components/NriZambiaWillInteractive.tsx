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
  Scale,
  ShieldCheck,
} from "lucide-react";

interface NriZambiaScenario {
  id: string;
  label: string;
  icon: "globe" | "landmark" | "coins" | "building";
  heading: string;
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_ZAMBIA_SCENARIOS: NriZambiaScenario[] = [
  {
    id: "lusaka-copperbelt-gujarat-assets",
    label: "Lusaka & Copperbelt: Gujarat Assets",
    icon: "globe",
    heading: "Lusaka & Copperbelt: Ancestral Land & Commercial Plots in Gujarat & Mumbai",
    challengeSummary:
      "Prominent Indian business families in Lusaka (Makeni, Kabulonga, Roma) and Copperbelt (Ndola, Kitwe, Chingola) own ancestral farmland, commercial shops, and residential apartments in Gujarat (Surat, Bharuch, Anand, Ahmedabad) and Maharashtra (Mumbai, Pune). Informal family settlements or outdated revenue records risk disputes and illegal mutation.",
    legalMechanism:
      "Under Section 6(5) of FEMA 1999 and Regulation 3(1)(b), NRIs and foreign passport holders with OCI status can inherit agricultural land and family homes without prior RBI approval. A dedicated Indian Will with certified Pedhinama (family tree) and land parcel details ensures swift mutation before the local Tehsildar.",
    statutoryPrecedent:
      "FEMA Reg 3(1)(b) & ISA 1925 s. 5(1)",
    recommendedInstrument:
      "Ancestral Property Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Verify Gujarat 7/12 extracts or Maharashtra Index II property cards",
      "Draft standalone Indian Will naming trusted India-resident executor",
      "Prepare certified Pedhinama to establish legal heir succession rights",
    ],
  },
  {
    id: "zambia-cap-60-probate-bottleneck",
    label: "Cap 60 vs Sec 228 Probate",
    icon: "landmark",
    heading: "Zambia Cap 60 Grant vs Section 228 Indian Probate Resealing Bottleneck",
    challengeSummary:
      "Under Zambia's Wills and Administration of Testate Estates Act (Cap 60), a Grant of Probate issued by the High Court for Zambia has no automatic extraterritorial effect in India. Indian banks, municipal corporations, and revenue registries reject foreign grants outright.",
    legalMechanism:
      "Section 228 of the Indian Succession Act 1925 requires filing an ancillary probate petition in an Indian High Court with an authenticated court copy. This process takes 18 to 36 months. A separate Indian Will avoids Section 228 court bottlenecks completely, enabling direct executor administration.",
    statutoryPrecedent:
      "ISA 1925 s. 228 & Zambia Cap 60",
    recommendedInstrument:
      "Jurisdictionally Ring-Fenced Standalone Indian Will",
    checklist: [
      "Ring-fence Zambian business assets and Kwacha bank accounts",
      "Restrict Indian Will strictly to assets located in the Republic of India",
      "Appoint an India-resident executor for prompt local asset transfer",
    ],
  },
  {
    id: "zambian-dual-will-revocation",
    label: "Dual-Will Harmonization",
    icon: "coins",
    heading: "Dual-Will Strategy: Preventing Inadvertent Will Revocation",
    challengeSummary:
      "Standard Zambian Wills drafted by legal practitioners in Lusaka or Ndola contain boilerplate revocation clauses canceling all previous testamentary dispositions. Under Section 62 of the Indian Succession Act 1925, this standard clause cancels an existing Indian Will by mistake, forcing intestate succession.",
    legalMechanism:
      "Our High Court advocates draft synchronized twin Wills. Your Zambian Will covers local real estate and Zambian corporate shares under Cap 60. Your Indian Will covers Indian land, flats, and NRO bank accounts under ISA 1925, each containing an explicit mutual non-revocation covenant.",
    statutoryPrecedent:
      "Zambia Cap 60 s. 20 & ISA 1925 s. 62",
    recommendedInstrument:
      "Harmonized Dual-Will Framework with Non-Revocation Covenants",
    checklist: [
      "Share cross-border details with your Zambian legal practitioner",
      "Insert explicit mutual non-revocation covenants in both instruments",
      "Ensure two independent adult witnesses sign both legal documents",
    ],
  },
  {
    id: "lusaka-consular-attestation-mfaic",
    label: "Lusaka Consular Protocol",
    icon: "building",
    heading: "Lusaka High Commission Attestation & Legalization Protocol",
    challengeSummary:
      "Zambia is not a signatory to the 1961 Hague Apostille Convention. Zambian NRIs and OCIs often wonder whether they must travel to India to execute their Will or how to guarantee unchallengeable evidential validity before Indian authorities.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act 1925, an Indian Will is legally valid when signed on plain A4 paper before two adult witnesses with zero stamp duty. For heightened evidential certainty, testators can attest the Will before the High Commission of India on Pandit Nehru Road in Lusaka.",
    statutoryPrecedent:
      "ISA 1925 s. 63 & Diplomatic Consular Officers Act 1948",
    recommendedInstrument:
      "Consular Attested or Plain-Paper Executed Indian Will",
    checklist: [
      "Print on standard A4 paper with zero Indian stamp paper needed",
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Optional: Schedule consular attestation at HCI Lusaka (Longacres)",
    ],
  },
];

export default function NriZambiaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("lusaka-copperbelt-gujarat-assets");
  const [assetType, setAssetType] = useState<
    "urban_realty" | "financial_portfolios" | "ancestral_family"
  >("ancestral_family");
  const [citizenshipStatus, setCitizenshipStatus] = useState<
    "indian_nri" | "zambian_citizen_oci"
  >("zambian_citizen_oci");
  const [dualWillPreference, setDualWillPreference] = useState<
    "separate_wills" | "undecided"
  >("separate_wills");

  const currentScenario =
    NRI_ZAMBIA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_ZAMBIA_SCENARIOS[0];

  const getAssessmentAdvice = () => {
    if (citizenshipStatus === "zambian_citizen_oci" && assetType === "ancestral_family") {
      return {
        badge: "Priority: OCI Ancestral Land Protection",
        recommendation:
          "Under FEMA 1999 Section 6(5), Zambian citizens holding OCI status can inherit agricultural land in Gujarat or Maharashtra. Execute a separate Indian Will with certified Pedhinama details and local executor appointments to bypass Section 228 court delays.",
        action: "Draft Ancestral Property Indian Will",
        actionHref: "/contact",
      };
    }
    if (dualWillPreference === "undecided") {
      return {
        badge: "High Risk: Cross-Border Probate Delay",
        recommendation:
          "Relying on a single worldwide Zambian Will triggers mandatory Section 228 ancillary probate in Indian High Courts, taking 18 to 36 months. We strongly advise a separate Indian Will ring-fenced to Indian assets.",
        action: "Structure Twin Indian & Zambian Wills",
        actionHref: "/contact",
      };
    }
    return {
      badge: "Streamlined Transmission Plan",
      recommendation:
        "Your assets qualify for fast-track execution under Section 63 of the Indian Succession Act. Execute on plain paper in Lusaka, Ndola, or Kitwe before two witnesses, naming an India-resident executor for prompt bank and property transfer.",
      action: "Start Online Will Drafting",
      actionHref: "/start",
    };
  };

  const advice = getAssessmentAdvice();

  return (
    <div className="w-full my-12 sm:my-16">
      {/* Scenario Selector Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {NRI_ZAMBIA_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveTab(scenario.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] border border-[#172228]/10 hover:border-[#C65378] hover:text-[#C65378]"
              }`}
            >
              {scenario.icon === "globe" && <Globe2 className="w-3.5 h-3.5 text-[#C65378]" />}
              {scenario.icon === "landmark" && <Landmark className="w-3.5 h-3.5 text-[#C65378]" />}
              {scenario.icon === "coins" && <Coins className="w-3.5 h-3.5 text-[#C65378]" />}
              {scenario.icon === "building" && <Building2 className="w-3.5 h-3.5 text-[#C65378]" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-7 bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 flex flex-col justify-between">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-2.5">
              Case Review &amp; Statutory Moat
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h3>
            <p className="text-[14.5px] leading-[1.68] text-[#374151] mb-5">
              {currentScenario.challengeSummary}
            </p>

            <div className="bg-white rounded-xl p-4 border border-[#172228]/10 mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                Legal Rule &amp; Statutory Authority:
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                {currentScenario.legalMechanism}
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#C65378] font-medium">
                Governing Law: {currentScenario.statutoryPrecedent}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#172228]">
              Recommended Step: {currentScenario.recommendedInstrument}
            </span>
          </div>
        </div>

        {/* Right Checklist Box */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 flex flex-col justify-between shadow-2xs">
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3">
              Essential Verification Checklist
            </h4>
            <p className="text-xs text-[#55636D] mb-4">
              Key legal checks for NRIs in Zambia before signing your Will:
            </p>

            <ul className="space-y-3 text-xs sm:text-[13.5px] text-[#374151] mb-6">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
          >
            <span>Consult Cross-Border Lawyer</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3-Question Diagnostic Assessment */}
      <div className="bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-1">
            Quick Diagnostic Tool
          </span>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Configure Your Zambia-India Estate Blueprint
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
            Answer 3 quick questions to receive a personalized legal action
            summary for your Indian properties and investments:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Question 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              1. Primary Indian Asset Base
            </label>
            <select
              value={assetType}
              onChange={(e) =>
                setAssetType(
                  e.target.value as
                    | "urban_realty"
                    | "financial_portfolios"
                    | "ancestral_family"
                )
              }
              className="w-full rounded-xl border border-[#172228]/15 bg-[#FAF7F0] p-3 text-xs sm:text-[13px] font-medium text-[#111827] focus:outline-none focus:border-[#C65378]"
            >
              <option value="ancestral_family">
                Ancestral Farmland / Plots (Gujarat / Maharashtra)
              </option>
              <option value="urban_realty">
                Self-Acquired Urban Flats / Commercial Shops
              </option>
              <option value="financial_portfolios">
                NRO Accounts / Mutual Funds / Demat Portfolios
              </option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              2. Nationality &amp; Residency Status
            </label>
            <select
              value={citizenshipStatus}
              onChange={(e) =>
                setCitizenshipStatus(
                  e.target.value as "indian_nri" | "zambian_citizen_oci"
                )
              }
              className="w-full rounded-xl border border-[#172228]/15 bg-[#FAF7F0] p-3 text-xs sm:text-[13px] font-medium text-[#111827] focus:outline-none focus:border-[#C65378]"
            >
              <option value="zambian_citizen_oci">
                Zambian Citizen holding OCI Card
              </option>
              <option value="indian_nri">
                NRI with Indian Passport living in Zambia
              </option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              3. Cross-Border Will Architecture
            </label>
            <select
              value={dualWillPreference}
              onChange={(e) =>
                setDualWillPreference(
                  e.target.value as "separate_wills" | "undecided"
                )
              }
              className="w-full rounded-xl border border-[#172228]/15 bg-[#FAF7F0] p-3 text-xs sm:text-[13px] font-medium text-[#111827] focus:outline-none focus:border-[#C65378]"
            >
              <option value="separate_wills">
                Dual-Will Strategy (Separate Indian &amp; Zambian Wills)
              </option>
              <option value="undecided">
                Single Global Will (Undecided / Needs Review)
              </option>
            </select>
          </div>
        </div>

        {/* Personalized Legal Output Card */}
        <div className="rounded-2xl bg-white p-6 border border-[#172228]/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#172228]/10 text-xs font-bold text-[#C65378] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{advice.badge}</span>
            </div>
            <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#374151]">
              {advice.recommendation}
            </p>
          </div>
          <Link
            href={advice.actionHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors shrink-0"
          >
            <span>{advice.action}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
