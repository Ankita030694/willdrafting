"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Users2,
  HeartHandshake,
  BookOpen,
  Landmark,
  BadgeAlert,
} from "lucide-react";

interface MuslimEstateScenario {
  id: string;
  label: string;
  icon: "scale" | "users" | "heart" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const SHARIA_SCENARIOS: MuslimEstateScenario[] = [
  {
    id: "one-third-cap",
    label: "The 1/3rd Disposable Cap",
    icon: "scale",
    heading: "The One-Third Disposable Estate Limit under Shariat",
    challengeSummary:
      "A Muslim testator wants to bequeath all property to one relative or a charitable trust, unaware of testamentary caps.",
    legalMechanism:
      "Under the Muslim Personal Law (Shariat) Application Act, 1937 and Section 118 of Mulla Mahomedan Law, a Muslim can bequeath at most one-third of net assets. Debts, funeral expenses, and unpaid Mahr must be cleared first. Any bequest beyond one-third is void unless all legal heirs consent.",
    statutoryPrecedent:
      "Section 2 Shariat Act, 1937 & Ghulam Mohammad v. Ghulam Husain (PC)",
    recommendedInstrument:
      "Sharia-Compliant 1/3rd Wasiyatnama with Explicit Debt Recitals",
    checklist: [
      "Deduct funeral expenses and unpaid Mahr to calculate true net estate",
      "Limit non-heir and charitable bequests to a maximum of 33.33%",
      "Record written heir consent if any legacy crosses the one-third cap",
    ],
  },
  {
    id: "bequest-to-heir",
    label: "Bequest to Legal Heir",
    icon: "users",
    heading: "Bequest to Legal Heir & Post-Demise Consent Rules",
    challengeSummary:
      "A testator writes a Will giving a specific apartment to a favored child, but other siblings dispute the bequest after death.",
    legalMechanism:
      "Under Sunni Hanafi law, a bequest to any legal heir is completely void unless all other heirs give voluntary consent after the testator passes away. Under Shia Ithna Ashari law, a bequest to an heir up to one-third is valid without consent. If Sunni heirs refuse consent, the property returns to the Faraid estate pool.",
    statutoryPrecedent:
      "Khajoorunissa v. Rowshan Jehan (1876 PC) & Mulla s. 117",
    recommendedInstrument:
      "Bespoke Wasiyat with Post-Mortem Heir Consent Deed or Hiba",
    checklist: [
      "Determine whether Sunni Hanafi or Shia succession principles govern",
      "Structure post-demise heir consent deeds to satisfy High Court scrutiny",
      "Use lifetime Hiba transfers if other heirs are likely to dispute",
    ],
  },
  {
    id: "daughter-protection",
    label: "Daughter & Spouse Defense",
    icon: "heart",
    heading: "Protecting Daughters & Spouse via Lifetime Hiba Gifts",
    challengeSummary:
      "Parents with only daughters or a surviving wife want to ensure their entire property does not leak to distant male relatives.",
    legalMechanism:
      "Under Sunni Faraid rules, an only daughter receives one-half (or two-thirds shared among multiple daughters), and a widow receives one-eighth. Distant agnates (uncles or cousins) claim the remaining estate. To protect wives and daughters, Muslim owners can make lifetime gifts (Hiba). Lifetime Hiba has no one-third limit and passes full ownership.",
    statutoryPrecedent:
      "Hafeeza Bibi v. Shaikh Farid (2011 5 SCC 654) & TPA s. 129",
    recommendedInstrument:
      "Registered Lifetime Hiba Deed or Hiba-bil-Iwaz with Sub-Registrar",
    checklist: [
      "Fulfill offer (Ijab), acceptance (Qabul), and physical possession (Qabda)",
      "Execute the gift during sound health to avoid Marz-ul-Maut challenges",
      "Complete Sub-Registrar registration to ensure smooth municipal mutation",
    ],
  },
  {
    id: "isa-probate-exemption",
    label: "Probate Exemption & Registry",
    icon: "landmark",
    heading: "Probate Exemption & Sub-Registrar Execution Strategy",
    challengeSummary:
      "Families worry about expensive High Court probate cases and long legal delays when executing a Muslim Will in India.",
    legalMechanism:
      "Under Section 213(2) and Section 58 of the Indian Succession Act, 1925, Mahomedan Wills are exempt from mandatory probate across India, including Mumbai, Kolkata, and Chennai. Registering the Wasiyat with the Sub-Registrar creates a certified public record that protects against forgery claims.",
    statutoryPrecedent:
      "Section 213(2) Indian Succession Act, 1925 & Registration Act s. 17",
    recommendedInstrument:
      "Advocate-Verified & Sub-Registrar Registered Muslim Wasiyatnama",
    checklist: [
      "Confirm probate exemption under Section 213(2) to save court fees",
      "Sign before two adult male Muslim witnesses or acceptable attestors",
      "Lodge the original Will with the Sub-Registrar for secure archival",
    ],
  },
];

export default function MuslimEstateInteractive() {
  const [selectedId, setSelectedId] = useState<string>("one-third-cap");

  const currentScenario =
    SHARIA_SCENARIOS.find((s) => s.id === selectedId) || SHARIA_SCENARIOS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "scale":
        return <Scale className="w-5 h-5 text-[#C65378]" />;
      case "users":
        return <Users2 className="w-5 h-5 text-[#C65378]" />;
      case "heart":
        return <HeartHandshake className="w-5 h-5 text-[#C65378]" />;
      case "landmark":
        return <Landmark className="w-5 h-5 text-[#C65378]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#C65378]" />;
    }
  };

  return (
    <section className="w-full my-12 sm:my-16 bg-white rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Interactive Sharia Legal Analyzer</span>
        </div>
        {/* Strictly <= 70 chars, no em-dash */}
        <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Sharia Estate Planning Scenarios &amp; Rights
        </h2>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Indian civil courts interpret Muslim succession through Shariat rules
          and High Court precedents. Select your family situation below to see
          the governing rule, legal remedy, and recommended document:
        </p>
      </div>

      {/* Tabs / Scenarios Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {SHARIA_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedId;
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedId(scenario.id)}
              className={`flex flex-col items-start p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#FAF7F0] border-[#C65378] shadow-sm ring-1 ring-[#C65378]/30"
                  : "bg-white border-[#172228]/10 hover:border-[#172228]/25 hover:bg-[#FAF7F0]/40"
              }`}
            >
              <div className="p-2 rounded-xl bg-white border border-[#172228]/10 mb-3">
                {getIcon(scenario.icon)}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold leading-snug ${
                  isSelected ? "text-[#111827]" : "text-[#49585F]"
                }`}
              >
                {scenario.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Detail Box */}
      <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-8 lg:p-9">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-1">
              Case Study &amp; Statutory Analysis
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#172228]/10 text-xs font-semibold text-[#111827] shrink-0 self-start lg:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>High Court Precedent Compliant</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-1.5 flex items-center gap-1.5">
                <BadgeAlert className="w-3.5 h-3.5 text-[#C65378]" />
                Common Legal Pitfall
              </h4>
              <p className="text-[14.5px] leading-[1.65] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#047857]" />
                Governing Shariat Mechanism &amp; Indian Law
              </h4>
              <p className="text-[14.5px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#55636D]">
                Statutory &amp; Judicial Authority:{" "}
                <strong className="text-[#111827]">
                  {currentScenario.statutoryPrecedent}
                </strong>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#172228]/10 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C65378] block mb-1">
                Recommended Solution
              </span>
              <div className="text-sm font-bold text-[#111827] mb-4">
                {currentScenario.recommendedInstrument}
              </div>

              <span className="text-xs font-semibold text-[#55636D] block mb-2.5">
                Advocate Verification Checklist:
              </span>
              <ul className="space-y-2.5 text-xs text-[#374151]">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-[#172228]/10 flex flex-col gap-2.5">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3 px-4 transition-colors text-center"
              >
                <span>Consult Sharia Estate Advocate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/muslim-inheritance-faraid-wasiyat-calculator"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#172228] text-[#172228] hover:text-white text-xs font-semibold py-2.5 px-4 border border-[#172228]/15 transition-colors text-center"
              >
                <span>Calculate Faraid &amp; 1/3rd Share</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
