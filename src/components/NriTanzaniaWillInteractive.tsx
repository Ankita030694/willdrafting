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

interface NriTanzaniaScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string;
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_TANZANIA_SCENARIOS: NriTanzaniaScenario[] = [
  {
    id: "dar-es-salaam-upanga-gujarat",
    label: "Dar es Salaam: Ancestral Land",
    icon: "globe",
    heading: "Dar es Salaam & Upanga: Ancestral Land in Gujarat & Mumbai",
    challengeSummary:
      "Tanzanian-Indian business families in Dar es Salaam (Upanga, Kisutu, Masaki) or Arusha often own ancestral farmland and commercial plots in Gujarat (Surat, Rajkot, Kutch) and Maharashtra. Incomplete revenue records or informal family splits risk adverse possession or illegal mutation.",
    legalMechanism:
      "Under FEMA 1999 Section 6(5) and Regulation 3(1)(b), NRIs and foreign citizens holding OCI status can inherit agricultural land and family homes without prior RBI permission. A dedicated Indian Will with certified Pedhinama (family tree) and 7/12 extract details secures mutation before the local Tehsildar.",
    statutoryPrecedent:
      "FEMA Reg 3(1)(b) & ISA 1925 s. 5",
    recommendedInstrument:
      "Ancestral Property Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Verify Gujarat 7/12 extracts or Maharashtra Index II property cards",
      "Draft standalone Indian Will naming trusted India-resident executor",
      "Prepare certified Pedhinama to establish legal heir succession rights",
    ],
  },
  {
    id: "tanzania-cap-352-foreign-probate",
    label: "Cap 352 vs Sec 228 Probate",
    icon: "landmark",
    heading: "Tanzania Cap 352 vs Section 228 Indian Probate Resealing",
    challengeSummary:
      "Under Tanzania's Probate and Administration of Estates Act (Cap 352), a Grant of Probate issued by the High Court of Tanzania has zero automatic validity in India. Indian banks, municipal corporations, and land registries reject Tanzanian court orders without formal Indian court recognition.",
    legalMechanism:
      "Under Section 228 of the Indian Succession Act 1925, using a Tanzanian grant requires filing an ancillary probate petition in an Indian High Court with an authenticated copy. This takes 18 to 36 months. A separate Indian Will avoids Section 228 court delays and allows direct asset transfer.",
    statutoryPrecedent:
      "ISA 1925 s. 228 & Tanzania Cap 352",
    recommendedInstrument:
      "Jurisdictionally Ring-Fenced Standalone Indian Will",
    checklist: [
      "Ring-fence East African commercial assets and Tanzanian property",
      "Restrict Indian Will strictly to assets located in the Republic of India",
      "Appoint an India-resident executor for prompt local asset transfer",
    ],
  },
  {
    id: "tanzanian-dual-will-revocation",
    label: "Dual-Will Harmonization",
    icon: "coins",
    heading: "Dual-Will Strategy: Preventing Accidental Will Revocation",
    challengeSummary:
      "Standard Tanzanian Wills drafted by advocates in Dar es Salaam or Arusha include a blanket clause revoking all previous wills. Under Section 62 of the Indian Succession Act 1925, this standard clause cancels your existing Indian Will by mistake, forcing intestate succession.",
    legalMechanism:
      "Our High Court advocates draft synchronized twin Wills. Your Tanzanian Will covers East African company shares and local real estate under Cap 352. Your Indian Will covers Indian land, flats, and NRO bank accounts under ISA 1925, each containing an explicit non-revocation covenant.",
    statutoryPrecedent:
      "Tanzania Cap 352 & ISA 1925 s. 62",
    recommendedInstrument:
      "Harmonized Dual-Will Framework with Non-Revocation Covenants",
    checklist: [
      "Share cross-border details with your Tanzanian legal advocate",
      "Insert explicit mutual non-revocation clauses in both instruments",
      "Ensure two independent adult witnesses sign both legal documents",
    ],
  },
  {
    id: "dar-consular-attestation-mfaet",
    label: "Dar es Salaam Attestation",
    icon: "building",
    heading: "High Commission Attestation & MFAET Legalization Protocol",
    challengeSummary:
      "Tanzania is not a signatory to the Hague Apostille Convention. Tanzanian Indians in Dar es Salaam, Zanzibar, or Mwanza often wonder whether they must travel to India to execute their Will or how to ensure seamless legal acceptance.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, an Indian Will is legally complete when signed on plain A4 paper before two adult witnesses with zero stamp duty. For indisputable court proof, testators can attest the Will before the High Commission of India on Shaaban Robert Street in Dar es Salaam.",
    statutoryPrecedent:
      "ISA 1925 s. 63 & Diplomatic Consular Officers Act 1948",
    recommendedInstrument:
      "Consular Attested or Plain-Paper Executed Indian Will",
    checklist: [
      "Print on standard A4 paper with zero Indian stamp paper needed",
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Optional: Schedule consular attestation at HCI Dar es Salaam or CGI Zanzibar",
    ],
  },
];

export default function NriTanzaniaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("dar-es-salaam-upanga-gujarat");
  const [assetType, setAssetType] = useState<
    "urban_realty" | "financial_portfolios" | "ancestral_family"
  >("ancestral_family");
  const [citizenshipStatus, setCitizenshipStatus] = useState<
    "indian_nri" | "tanzanian_citizen_oci"
  >("tanzanian_citizen_oci");
  const [dualWillPreference, setDualWillPreference] = useState<
    "separate_wills" | "undecided"
  >("separate_wills");

  const currentScenario =
    NRI_TANZANIA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_TANZANIA_SCENARIOS[0];

  const getAssessmentAdvice = () => {
    if (citizenshipStatus === "tanzanian_citizen_oci" && assetType === "ancestral_family") {
      return {
        badge: "Priority: OCI Ancestral Land Protection",
        recommendation:
          "Under FEMA 1999 Section 6(5), Tanzanian citizens holding OCI status can inherit agricultural land in Gujarat or Maharashtra. Execute a separate Indian Will with certified Pedhinama details and local executor appointments to bypass Section 228 court delays.",
        action: "Draft Ancestral Property Indian Will",
        actionHref: "/contact",
      };
    }
    if (dualWillPreference === "undecided") {
      return {
        badge: "High Risk: Cross-Border Probate Delay",
        recommendation:
          "Relying on a single worldwide Tanzanian Will triggers mandatory Section 228 ancillary probate in Indian High Courts, taking 18 to 36 months. We strongly advise a separate Indian Will ring-fenced to Indian assets.",
        action: "Structure Twin Indian & Tanzanian Wills",
        actionHref: "/contact",
      };
    }
    return {
      badge: "Streamlined Transmission Plan",
      recommendation:
        "Your assets qualify for fast-track execution under Section 63 of the Indian Succession Act. Execute on plain paper in Dar es Salaam or Arusha before two witnesses, naming an India-resident executor for prompt bank and property transfer.",
      action: "Start Online Will Drafting",
      actionHref: "/start",
    };
  };

  const advice = getAssessmentAdvice();

  return (
    <div className="w-full my-12 sm:my-16">
      {/* Scenario Selector Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {NRI_TANZANIA_SCENARIOS.map((scenario) => {
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
              Key legal checks for NRIs in Tanzania before signing your Will:
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
            Configure Your Tanzania-India Estate Blueprint
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
            Answer 3 quick questions to receive a personalized legal action
            summary for your Indian properties and investments:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Question 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              1. Primary Indian Asset Category
            </label>
            <div className="space-y-2">
              {[
                { val: "urban_realty", label: "Flats & Commercial Realty" },
                { val: "financial_portfolios", label: "NRE/NRO Bank & Demat Shares" },
                { val: "ancestral_family", label: "Ancestral Family Land & Plots" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAssetType(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    assetType === opt.val
                      ? "bg-[#172228] text-white font-semibold"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              2. Nationality &amp; Diaspora Status
            </label>
            <div className="space-y-2">
              {[
                { val: "indian_nri", label: "Indian Passport Holder (NRI)" },
                { val: "tanzanian_citizen_oci", label: "Tanzanian Passport / OCI Card" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setCitizenshipStatus(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    citizenshipStatus === opt.val
                      ? "bg-[#172228] text-white font-semibold"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              3. Will Strategy Preference
            </label>
            <div className="space-y-2">
              {[
                { val: "separate_wills", label: "Separate Indian & Tanzanian Wills" },
                { val: "undecided", label: "Single Combined Worldwide Will" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setDualWillPreference(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    dualWillPreference === opt.val
                      ? "bg-[#172228] text-white font-semibold"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Diagnostic Output */}
        <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#C65378] bg-[#C65378]/10 px-3 py-1 rounded-full mb-2">
              {advice.badge}
            </span>
            <p className="text-xs sm:text-[13.5px] text-[#374151] leading-relaxed">
              {advice.recommendation}
            </p>
          </div>
          <Link
            href={advice.actionHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition-all shrink-0 shadow-xs"
          >
            <span>{advice.action}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
