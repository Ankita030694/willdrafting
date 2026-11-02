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
  Sparkles,
} from "lucide-react";

interface NriBhutanScenario {
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

const NRI_BHUTAN_SCENARIOS: NriBhutanScenario[] = [
  {
    id: "embassy-execution-thimphu",
    label: "Thimphu Consular Seal",
    icon: "globe",
    heading: "Consular Attestation at Indian Embassy in Thimphu",
    challengeSummary:
      "Many Indian professionals work in Thimphu, Phuntsholing, or Paro. They often ask if they must travel to India to sign a valid Will. Travel takes time and money.",
    legalMechanism:
      "You can sign before two witnesses in Bhutan. Section 63 of the Indian Succession Act 1925 makes this fully valid. Attesting at the Indian Embassy in Thimphu adds strong legal proof across all Indian land registries.",
    statutoryPrecedent:
      "Diplomatic & Consular Officers Act 1948 s. 3 & Indian Succession Act 1925 s. 63",
    recommendedInstrument:
      "Indian Will with Thimphu Consular Attestation",
    checklist: [
      "Draft separate territorial Will restricted strictly to Indian assets",
      "Sign in the physical presence of two independent adult witnesses",
      "Secure consular authentication at Embassy of India in Thimphu",
    ],
  },
  {
    id: "hydro-tech-estate-transmission",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "Securing High-Value Bank Deposits, FDs & Demat Folios",
    challengeSummary:
      "Engineers and executives in Bhutan often rely on bank nominations. They think nominees become sole owners of NRE, NRO, and mutual funds. This is a common legal mistake.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees are only trustees. A clear Indian Will names your true heirs. It prevents frozen accounts and stops costly court disputes.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Directions",
    recommendedInstrument:
      "Will Schedule with Depository Client IDs & Bank CIF Numbers",
    checklist: [
      "Itemize all NRE, NRO, and FCNR bank accounts with IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL",
      "Appoint an India-resident executor to handle asset transmission",
    ],
  },
  {
    id: "cross-border-land-mutation",
    label: "Ancestral Land & Flats",
    icon: "building",
    heading: "Transferring Ancestral Properties & Land Across India",
    challengeSummary:
      "Non-citizens cannot own freehold land in Bhutan under the Land Act 2007. As a result, your real estate wealth stays in India. Your estate plan must protect your Indian land.",
    legalMechanism:
      "A clear Indian Will enables direct name change in land records under State Land Revenue Codes. It avoids long probate delays and protects your heirs in West Bengal and Assam.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 59 & State Land Revenue Regulations",
    recommendedInstrument:
      "Territorial Indian Will with Property Survey Identifiers",
    checklist: [
      "Specify exact khasra, khatian, plot, and municipal ward details",
      "Avoid vague universal legacy clauses that create local revenue hurdles",
      "Retain original title chain documents with designated executor",
    ],
  },
  {
    id: "cross-border-currency-repatriation",
    label: "INR-BTN Banking & FEMA",
    icon: "landmark",
    heading: "FEMA Remittance & Dual-Currency Financial Clarity",
    challengeSummary:
      "INR and Bhutanese Ngultrum share parity. But selling inherited Indian assets requires RBI rules. Heirs need clear tax forms to send sale proceeds abroad.",
    legalMechanism:
      "Using an NRO bank account and a Section 197 tax certificate ensures smooth fund transfer. It stops heavy tax deductions and keeps your capital safe.",
    statutoryPrecedent:
      "FEMA 1999 s. 6(5) & Income Tax Act 1961 s. 195/197",
    recommendedInstrument:
      "Repatriation-Compliant Testamentary Estate Structure",
    checklist: [
      "Ensure heirs maintain active NRO bank accounts in India",
      "Obtain Form 15CA and Form 15CB chartered accountant certification",
      "Utilize RBI 1 Million USD annual remittance window smoothly",
    ],
  },
];

export default function NriBhutanWillInteractive() {
  const [activeScenario, setActiveScenario] = useState<string>(
    "embassy-execution-thimphu"
  );
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  const current =
    NRI_BHUTAN_SCENARIOS.find((s) => s.id === activeScenario) ||
    NRI_BHUTAN_SCENARIOS[0];

  const sampleClause = `TERRITORIAL JURISDICTION & EXCLUSION CLAUSE (BHUTAN EXPAT INDIAN WILL):
"1. This Last Will and Testament relates strictly and exclusively to my movable and immovable assets, properties, bank accounts, shares, mutual funds, and investments situated within the territory of India.
2. It shall not revoke, alter, or impact any testamentary disposition, declaration, or statutory entitlement executed by me regarding any movable property, personal effects, or employment gratuity situated within the Kingdom of Bhutan.
3. This Will shall be governed exclusively by the laws of the Republic of India, including the Indian Succession Act 1925 and the Foreign Exchange Management Act 1999."`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleClause);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  return (
    <div className="space-y-12 my-12">
      {/* Interactive Scenario Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Cross-Border Advisory
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
            Select Your Expat Scenario in Bhutan
          </h3>
          <p className="text-slate-400 text-sm">
            Learn how to protect your assets in India while living in Bhutan. Explore consular seals, land rules, and bank accounts. Our guide makes each step easy to follow.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {NRI_BHUTAN_SCENARIOS.map((scenario) => {
            const isActive = activeScenario === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario.id)}
                className={`flex flex-col items-start p-4 rounded-xl text-left transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="p-2 rounded-lg bg-white/10 mb-3">
                  {scenario.icon === "globe" && <Globe2 className="w-4 h-4" />}
                  {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
                  {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
                  {scenario.icon === "landmark" && <Landmark className="w-4 h-4" />}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                  Scenario
                </span>
                <span className="text-sm font-semibold mt-0.5">
                  {scenario.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Card */}
        <div className="mt-8 bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Legal Analysis & Precedent
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                {current.heading}
              </h4>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              {current.statutoryPrecedent}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  The Cross-Border Challenge
                </h5>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {current.challengeSummary}
                </p>
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Legal Solution & Framework
                </h5>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {current.legalMechanism}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                  Actionable Checklist
                </h5>
              </div>
              <ul className="space-y-2.5">
                {current.checklist.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Recommended Format:</span>
                <span className="text-xs font-semibold text-emerald-300">
                  {current.recommendedInstrument}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyable Ring-Fencing Clause Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Essential Will Clause
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bhutan Indian Expat Ring-Fencing Clause
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Include this exact territorial reservation clause to safeguard Indian assets from unintended jurisdictional overlap.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-sm self-start md:self-auto shrink-0"
          >
            {copiedClause ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied to Clipboard
              </>
            ) : (
              "Copy Clause Text"
            )}
          </button>
        </div>

        <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {sampleClause}
        </pre>
      </div>

      {/* Cross-Border Comparison Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Succession Law Comparison: Bhutan vs India
        </h3>
        <p className="text-xs text-slate-600 mb-6">
          Compare estate planning rules between Bhutan and India. Learn how each country handles property. Protect your family assets with clear legal knowledge.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                <th className="p-3">Succession Aspect</th>
                <th className="p-3">Kingdom of Bhutan</th>
                <th className="p-3">Republic of India (Indian Succession Act 1925)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3 font-semibold text-slate-800">Immovable Land Ownership</td>
                <td className="p-3">Non-citizens cannot acquire freehold land under Land Act 2007</td>
                <td className="p-3">Indian citizens and NRIs hold full freehold property rights across India</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Testamentary Freedom</td>
                <td className="p-3">Governed by traditional family practices and High Court oversight</td>
                <td className="p-3">100% testamentary freedom over self-acquired assets under Section 59</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Execution by Expats</td>
                <td className="p-3">Royal Court of Justice handles domestic registrations</td>
                <td className="p-3">Execution before 2 witnesses; consular seal via Embassy in Thimphu</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Estate Duty & Inheritance Tax</td>
                <td className="p-3">No formal estate duty on foreign nationals</td>
                <td className="p-3">Zero estate duty or inheritance tax in India</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Bank Nominee Status</td>
                <td className="p-3">Handled via local financial sector regulations</td>
                <td className="p-3">Nominee is merely a trustee; Will supersedes bank nomination</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Contextual Interactive Financial Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-700/60 shadow-md">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit mb-3">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            Inherited Property Capital Gains Calculator
          </h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Determine your Indian capital gains tax liability, indexation benefits, and exemptions when selling inherited residential or ancestral plots.
          </p>
          <Link
            href="/tools/capital-gains-tax-calculator-inherited-property"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Launch Tax Calculator <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-700/60 shadow-md">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit mb-3">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            NRI Property Sale TDS & Repatriation Calculator
          </h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Calculate Section 195 withholding tax, evaluate Section 197 Lower TDS Certificate savings, and streamline NRO repatriation from India.
          </p>
          <Link
            href="/tools/nri-property-sale-tds-repatriation-calculator"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Calculate Repatriation TDS <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
