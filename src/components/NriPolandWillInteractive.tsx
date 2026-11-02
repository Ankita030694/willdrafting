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

interface NriPolandScenario {
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

const NRI_POLAND_SCENARIOS: NriPolandScenario[] = [
  {
    id: "brussels-iv-choice-of-law",
    label: "Brussels IV Art. 22 Choice",
    icon: "globe",
    heading: "Electing Indian Succession Law Under Brussels IV",
    challengeSummary:
      "Under EU Regulation 650/2012 Article 21, residing in Poland defaults your estate to Polish law. This covers cities like Warsaw, Kraków, Wrocław, and Poznań. It risks subjecting your Indian assets to foreign courts.",
    legalMechanism:
      "Article 22 allows Indian passport holders to choose Indian law. Electing the Indian Succession Act, 1925 ensures Indian courts keep sole jurisdiction. Your Indian estate remains governed by Indian law.",
    statutoryPrecedent:
      "EU Succession Regulation No 650/2012 Art. 22 & Indian Succession Act 1925",
    recommendedInstrument:
      "Indian Will with Express Article 22 Choice of Law Clause",
    checklist: [
      "State your Indian passport number and Polish residence address",
      "Insert explicit Article 22 choice electing Indian succession law",
      "Ring-fence Indian properties from separate Polish testamentary acts",
    ],
  },
  {
    id: "polish-zachowek-shield",
    label: "Polish Zachowek Shield",
    icon: "landmark",
    heading: "Shielding Indian Assets from Polish Zachowek Claims",
    challengeSummary:
      "The Polish Civil Code gives heirs a forced cash share called zachowek. This claim equals half or two-thirds of their intestate share. It can create heavy money claims against your chosen heirs.",
    legalMechanism:
      "Under Section 59 of the Indian Succession Act, 1925, you enjoy full testamentary freedom. Electing Indian law protects your Indian assets. It stops Polish zachowek money lawsuits completely.",
    statutoryPrecedent:
      "Polish Kodeks cywilny Book IV (Arts. 991-1011) & ISA 1925 s. 59",
    recommendedInstrument:
      "Standalone Indian Will with Complete Testamentary Freedom",
    checklist: [
      "Establish clean title to self-acquired Indian flats and plots",
      "Explicitly state testamentary intent without Polish statutory reductions",
      "Specify clear distribution clauses to prevent succession challenges",
    ],
  },
  {
    id: "poland-tech-assets",
    label: "IT & Demat Portfolios",
    icon: "coins",
    heading: "Indian Mutual Funds, Demat Shares & Bank Deposits",
    challengeSummary:
      "Indian professionals in Warsaw and Kraków maintain NRE, NRO, and Demat accounts. Bank nominations do not grant legal ownership. Nominees act only as temporary caretakers.",
    legalMechanism:
      "The Supreme Court held in Sarbati Devi that nominees are only custodians. A clear Indian Will transfers ownership directly to your heirs. It avoids costly court succession certificate petitions.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Directions",
    recommendedInstrument:
      "Will Schedule with Depository Client IDs & Bank CIFs",
    checklist: [
      "Itemize NRE, NRO, and FCNR bank accounts with IFSC codes",
      "List 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Appoint an India-based executor to handle local asset transfer",
    ],
  },
  {
    id: "polish-notary-execution",
    label: "Polish Notary & Apostille",
    icon: "building",
    heading: "Signing in Poland: Plain-Paper & Notarial Certification",
    challengeSummary:
      "NRIs in Poland often think they must travel to India to sign a Will. Travelling to India is not needed. You can sign your Will in Poland.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, signing on plain A4 paper is 100% valid. You sign before two adult witnesses in Poland. A Polish Notary seal or MSZ apostille gives strong proof.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Notary Attestation or Consular Seal",
    checklist: [
      "Sign in physical presence of two independent adult witnesses",
      "Ensure witnesses are not beneficiaries or spouses of beneficiaries",
      "Optional: Polish Notary signature certification or Indian Embassy seal",
    ],
  },
];

export default function NriPolandWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("brussels-iv-choice-of-law");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );

  const currentScenario =
    NRI_POLAND_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_POLAND_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & City Property Protection Plan";
    recommendationSummary =
      "For flats and land parcels in Bengaluru, Delhi NCR, Mumbai, Hyderabad, or Punjab, your Will requires exact deed registration and municipal revenue IDs.";
    actionPoints = [
      "List undivided land shares (UDS) and registered conveyance deed numbers",
      "Incorporate Article 22 Brussels IV election to bar Polish zachowek claims",
      "Designate an India-resident executor for prompt municipal mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank deposits, equity portfolios, and mutual funds, an Indian Will is indispensable because nominees are only custodians under Indian law.";
    actionPoints = [
      "Record depository participant IDs and bank branch IFSC details with precision",
      "Equip heirs with RBI Form 15CA and 15CB remittance procedural guidelines",
      "Eliminate the need for expensive High Court succession certificate petitions",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral family estates in India, your Will must ring-fence your distinct coparcenary entitlement under the Hindu Succession Act, 1956.";
    actionPoints = [
      "Obtain certified revenue records including Khasra, Khatauni, or Jamabandi extracts",
      "Confirm Class-I legal heir entitlements to prevent family partition disputes",
      "Attest before two independent witnesses who are not beneficiaries",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Poland-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Poland
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate EU Brussels IV rules,
        Polish zachowek forced share risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_POLAND_SCENARIOS.map((sc) => {
          const isActive = sc.id === activeTab;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => setActiveTab(sc.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-xs"
                  : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#F4EFE6] hover:text-[#172228] border border-[#172228]/10"
              }`}
            >
              {sc.icon === "globe" && <Globe2 className="w-3.5 h-3.5" />}
              {sc.icon === "landmark" && <Landmark className="w-3.5 h-3.5" />}
              {sc.icon === "coins" && <Coins className="w-3.5 h-3.5" />}
              {sc.icon === "building" && <Building2 className="w-3.5 h-3.5" />}
              <span>{sc.label}</span>
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
              Key legal checks for NRIs in Poland before signing your Will:
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

          <div className="pt-4 border-t border-[#172228]/10">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
            >
              <span>Speak to Cross-Border Counsel</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Asset & Estate Architecture Selector */}
      <div className="bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
          <ShieldCheck className="w-4 h-4 text-[#C65378]" />
          <span>Diagnostic Asset Evaluation</span>
        </div>
        <h4 className="text-lg sm:text-xl font-semibold text-[#111827] mb-4">
          Select Your Indian Asset Profile
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setAssetType("urban_realty")}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              assetType === "urban_realty"
                ? "bg-white border-[#C65378] shadow-xs"
                : "bg-white/60 border-[#172228]/10 hover:bg-white"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
              Urban Real Estate
            </div>
            <p className="text-xs text-[#55636D]">
              Flats, apartments, plots, and commercial units across Indian cities.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setAssetType("financial_portfolios")}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              assetType === "financial_portfolios"
                ? "bg-white border-[#C65378] shadow-xs"
                : "bg-white/60 border-[#172228]/10 hover:bg-white"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
              Financial Portfolios
            </div>
            <p className="text-xs text-[#55636D]">
              NRE/NRO fixed deposits, Demat shares, mutual funds, and insurance.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setAssetType("ancestral_family")}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              assetType === "ancestral_family"
                ? "bg-white border-[#C65378] shadow-xs"
                : "bg-white/60 border-[#172228]/10 hover:bg-white"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
              Ancestral Holdings
            </div>
            <p className="text-xs text-[#55636D]">
              HUF coparcenary shares, ancestral agricultural land, and family homes.
            </p>
          </button>
        </div>

        {/* Dynamic Evaluation Output */}
        <div className="bg-white rounded-xl p-5 border border-[#172228]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-base font-semibold text-[#111827]">
              {recommendationTitle}
            </h4>
            <span className="text-[11px] font-mono text-[#047857] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded-md w-fit">
              Tailored Poland-India Protocol
            </span>
          </div>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#172228]/10">
            {actionPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                <span className="text-xs text-[#374151] leading-relaxed">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
