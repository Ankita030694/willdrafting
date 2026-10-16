"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertTriangle, Globe, ShieldCheck, Clock } from "lucide-react";

interface CountryGuide {
  id: string;
  label: string;
  shortName: string;
  heading: string; // Strictly < 70 chars for Screaming Frog
  visaAndStatus: string;
  whyForeignWillFails: string;
  taxAndDomicileRule: string;
  authenticationMethod: string;
  indianConsulateOrAuthority: string;
  actionChecklist: string[];
}

const COUNTRY_GUIDES: CountryGuide[] = [
  {
    id: "usa",
    label: "United States (USA)",
    shortName: "USA",
    heading: "Indian Will Rules for NRIs & OCIs in the USA",
    visaAndStatus: "US Citizens (OCI), Green Card Holders (LPR), H-1B, L-1 & O-1 Visa Holders",
    whyForeignWillFails:
      "Many US NRIs set up a California, New York, Texas, or New Jersey Revocable Living Trust or US Pour-Over Will. However, Indian Sub-Registrars, cooperative housing societies, and banks do not recognize US Living Trusts for mutating Indian real estate or releasing NRE/NRO accounts without a 14–24 month Section 228 ancillary court proceeding in India.",
    taxAndDomicileRule:
      "India charges zero inheritance or estate tax (Section 56 Income Tax Act). However, H-1B/non-resident aliens in the US face a strict $60,000 US-situs estate tax exemption, while US citizens/Green Card holders report worldwide capital gains upon selling inherited Indian assets.",
    authenticationMethod:
      "Hague Apostille Convention: Sign your Indian Will on plain A4 paper before 2 local witnesses. If executing a supporting Power of Attorney or notarized copy, obtain a State Secretary of State Apostille—no Indian Consulate visit required for apostilled documents.",
    indianConsulateOrAuthority:
      "US State Secretary of State (Apostille) or Indian Embassy Washington D.C. & Consulates in New York, San Francisco, Chicago, Houston, Atlanta & Seattle.",
    actionChecklist: [
      "Keep your US Revocable Living Trust / US Will strictly limited to US-situs assets",
      "Execute a separate Indian Will with a non-revocation territorial clause for Indian flats, plots, Demat & NRE/NRO accounts",
      "Align Indian bank & Zerodha/Groww Demat nominations with your Indian Will beneficiaries",
    ],
  },
  {
    id: "uk",
    label: "United Kingdom (UK)",
    shortName: "UK",
    heading: "Indian Will Rules for NRIs & OCIs in the UK",
    visaAndStatus: "British Citizens (OCI), Indefinite Leave to Remain (ILR) & Skilled Worker Visa Holders",
    whyForeignWillFails:
      "Using an English or Scottish Will to transfer property in Mumbai, Delhi, Punjab, Gujarat, or Bengaluru requires waiting for a UK HMCTS Grant of Probate, getting it apostilled by the UK FCDO, and filing a second Section 228 petition in an Indian District or High Court.",
    taxAndDomicileRule:
      "The UK levies up to 40% Inheritance Tax (IHT) on worldwide assets for long-term UK residents / domiciled individuals, whereas India levies 0% inheritance tax. Separate UK and Indian Wills prevent cross-jurisdiction probate freezes while your accountant handles UK-India DTAA relief.",
    authenticationMethod:
      "Hague Apostille Convention: Sign your Indian Will before 2 adult witnesses in the UK. For optional authentication or PoA legalization, obtain an Apostille from the UK Foreign, Commonwealth & Development Office (FCDO).",
    indianConsulateOrAuthority:
      "UK FCDO Legalisation Office (Apostille) or High Commission of India in London & Consulates in Birmingham and Edinburgh.",
    actionChecklist: [
      "Ensure your UK Solicitor Will excludes Indian immovable property to avoid accidental revocation",
      "Draft a standalone Indian Will under Section 63 of the Indian Succession Act, 1925",
      "Name an Executor residing in India (or an alternate Indian Executor) for smooth bank and society mutation",
    ],
  },
  {
    id: "uae",
    label: "UAE (Dubai & Abu Dhabi)",
    shortName: "UAE",
    heading: "Indian Will Rules for NRIs in the UAE & Gulf",
    visaAndStatus: "Indian Passport Holders (NRI Resident Visa / Golden Visa) in Dubai, Abu Dhabi, Sharjah & GCC",
    whyForeignWillFails:
      "Non-Muslim expats in the UAE frequently register a DIFC Courts Will (Dubai) or an Abu Dhabi Judicial Department (ADJD) Civil Family Court Will to avoid default Sharia distribution of UAE bank accounts and Dubai real estate. However, DIFC and ADJD Wills apply ONLY to UAE assets and do not govern property or NRE/NRO accounts inside India.",
    taxAndDomicileRule:
      "Neither the UAE nor India levies an inheritance or estate tax. Because UAE expats remain Indian citizens holding Indian passports, succession to their Indian assets is governed strictly by their Indian personal law (Hindu, Muslim Wasiyat, Christian, or Parsi).",
    authenticationMethod:
      "Consular Attestation: Sign your Indian Will before 2 adult witnesses in Dubai or Abu Dhabi. If notarizing or executing an Indian Power of Attorney from the UAE, get it attested at the Indian Embassy in Abu Dhabi or Consulate General of India in Dubai (via BLS / IVS Global).",
    indianConsulateOrAuthority:
      "Embassy of India (Abu Dhabi) & Consulate General of India (Dubai) + UAE Ministry of Foreign Affairs (MoFA).",
    actionChecklist: [
      "Keep your DIFC or ADJD Will for UAE bank accounts, gratuity, and Dubai/Abu Dhabi real estate",
      "Maintain a separate Indian Will for all Indian flats, ancestral shares, NRE/NRO fixed deposits, and mutual funds",
      "Ensure Muslim NRIs adhere to the 1/3rd Wasiyat rule under Muslim Personal Law for Indian assets",
    ],
  },
  {
    id: "canada",
    label: "Canada",
    shortName: "Canada",
    heading: "Indian Will Rules for NRIs & OCIs in Canada",
    visaAndStatus: "Canadian Citizens (OCI), Permanent Residents (PR) & Work Permit Holders in Ontario, BC, Alberta",
    whyForeignWillFails:
      "An Ontario Certificate of Appointment of Estate Trustee or BC Probate grant is not directly enforceable by Indian banks or municipal authorities. Relying on a Canadian Will triggers multi-month court re-sealing under Section 228 of the Indian Succession Act.",
    taxAndDomicileRule:
      "Canada has no direct inheritance tax but enforces a 'deemed disposition at death' rule (capital gains tax on worldwide assets on the final T1 return). Having a clear Indian Will speeds up Indian valuation, property mutation, and Form 15CA/15CB repatriation.",
    authenticationMethod:
      "Hague Apostille Convention (Effective Jan 2024): Canada is now a Hague Apostille member. Documents notarized in Canada can be apostilled directly by Global Affairs Canada or provincial authorities (Ontario ODS, BC, Alberta) without needing red-ribbon consular legalization.",
    indianConsulateOrAuthority:
      "Global Affairs Canada / Provincial Apostille Offices, or High Commission of India (Ottawa) & Consulates in Toronto and Vancouver.",
    actionChecklist: [
      "Coordinate your Canadian Primary/Secondary Wills with a separate Indian Will",
      "Include a strict territorial clause so updating your Canadian Will never revokes your Indian Will",
      "Specify PAN, OCI card number, and Indian NRO account details clearly for future repatriation",
    ],
  },
  {
    id: "australia",
    label: "Australia",
    shortName: "Australia",
    heading: "Indian Will Rules for NRIs & OCIs in Australia",
    visaAndStatus: "Australian Citizens (OCI), Permanent Residents (PR) & Temporary Skill Shortage Visa Holders",
    whyForeignWillFails:
      "Australian Supreme Court Probate grants (NSW, Victoria, Queensland, WA) require formal authentication and ancillary Indian court proceedings under Section 228 before Indian immovable property can be transferred.",
    taxAndDomicileRule:
      "Neither Australia nor India imposes an inheritance tax on death, though Australian tax residents face Australian Capital Gains Tax (CGT) if they subsequently sell an inherited Indian property. A clear Indian Will establishes clean cost-base and title dates.",
    authenticationMethod:
      "Hague Apostille Convention: Sign your Indian Will on plain A4 paper before 2 adult witnesses in Australia. Supporting affidavits or PoAs can be apostilled by the Australian Department of Foreign Affairs and Trade (DFAT).",
    indianConsulateOrAuthority:
      "Australian DFAT Passport/Apostille Office or High Commission of India (Canberra) & Consulates in Sydney, Melbourne, Perth & Brisbane.",
    actionChecklist: [
      "Draft a standalone Indian Will covering Indian real estate, PPF/NRO balances, and Demat shares",
      "Ensure your Australian Will explicitly excludes assets situated within the Republic of India",
      "Keep a signed physical copy of your Indian Will accessible to your named Executor in India",
    ],
  },
  {
    id: "singapore",
    label: "Singapore & Europe",
    shortName: "SG & EU",
    heading: "Indian Will Rules for NRIs in Singapore & Europe",
    visaAndStatus: "Singapore Citizens/PRs, Employment Pass Holders & EU Blue Card / OCI Residents (Germany, NL, Ireland)",
    whyForeignWillFails:
      "A Singapore Grant of Probate or European Certificate of Succession (Erbschein / Verklaring van Erfrecht) is unfamiliar to Indian Sub-Registrars and bank legal cells, forcing heirs into Section 228 ancillary court petitions in India.",
    taxAndDomicileRule:
      "Singapore abolished estate duty in 2008, and India charges zero estate tax. In EU civil-law countries (like Germany, France, or the Netherlands), EU Succession Regulation (Brussels IV) forced-heirship rules can conflict with Indian personal laws unless a separate Indian Will is executed.",
    authenticationMethod:
      "Hague Apostille Convention: Both Singapore (via the Singapore Academy of Law — SAL) and EU member states issue Hague Apostilles recognized across India without requiring separate Embassy legalization.",
    indianConsulateOrAuthority:
      "Singapore Academy of Law (SAL) / EU Competent Apostille Authorities & Indian Embassies across Singapore, Berlin, The Hague, Dublin & Paris.",
    actionChecklist: [
      "Separate your Singapore/EU estate from your Indian immovable and financial assets",
      "Execute your Indian Will before two adult non-beneficiary witnesses under Section 63 ISA",
      "Document NRE/NRO/FCNR account numbers and Demat DP/Client IDs in your Indian Will schedule",
    ],
  },
];

export default function NriWillInteractive() {
  const [activeCountryId, setActiveCountryId] = useState<string>("usa");
  const [residency, setResidency] = useState<string>("usa");
  const [assetType, setAssetType] = useState<string>("property_and_bank");
  const [willStatus, setWillStatus] = useState<string>("foreign_only");

  const activeCountry =
    COUNTRY_GUIDES.find((c) => c.id === activeCountryId) || COUNTRY_GUIDES[0];

  const getRiskAssessment = () => {
    if (willStatus === "parents_in_india") {
      return {
        riskBadge: "HIGH PRIORITY · PARENTS' INDIAN ESTATE",
        timeSaved: "Saves 12 to 24 Months of Indian Court Delays",
        headline: "Help Your Parents in India Execute a Clear Will Today",
        summary:
          "If elderly parents in India pass away without a Will (or only have bank nominations), NRI children must fly back repeatedly for a Court Succession Certificate, newspaper citations, and all-heir NOCs before mutating flats or repatriating NRO sale proceeds.",
        steps: [
          "Use our Bilingual (English & Hindi) + AI Voice Assistant flow so parents in India can complete their Will easily from home",
          "Appoint an Executor and align parents' bank/Demat nominations with the Will",
          "Pre-establish clean title so NRI children can later repatriate up to USD 1M/year via Form 15CA/15CB",
        ],
      };
    }

    if (willStatus === "foreign_only") {
      return {
        riskBadge: "HIGH BOTTLENECK RISK · SECTION 228 PROBATE TRAP",
        timeSaved: "Avoids 14 to 24 Months of Foreign Probate Re-Sealing",
        headline: "Your Foreign Will Alone Triggers Dual-Country Court Delays",
        summary:
          "Relying on a US Living Trust, UK Will, UAE DIFC Will, or Canadian/Australian Will for Indian assets forces your family to wait for overseas probate first, obtain an Apostille/Embassy attestation, and then file a second Section 228 ancillary probate petition in an Indian court.",
        steps: [
          "Draft a dedicated Indian Will covering only your Indian assets ('Two-Will Strategy')",
          "Include our Non-Revocation Territorial Clause so your overseas Will remains 100% untouched",
          assetType === "agricultural"
            ? "Document FEMA Section 6(5) inheritance compliance for agricultural/ancestral land"
            : "List all Indian flats, NRE/NRO FDs, mutual funds, and Demat accounts for direct transmission",
        ],
      };
    }

    return {
      riskBadge: "CRITICAL INTESTACY RISK · ASSET FREEZE WARNING",
      timeSaved: "Prevents 18 to 30 Months of Intestate Litigation",
      headline: "Without an Indian Will, Your Indian Assets Face Statutory Freeze",
      summary:
        "If an NRI or OCI passes away without an Indian Will, Indian banks freeze NRE/NRO accounts and housing societies block flat transfers until all Class I legal heirs obtain a Court Succession Certificate or Letters of Administration in India.",
      steps: [
        "Create a legally valid Indian Will online in 15 minutes under Section 63 of the Indian Succession Act, 1925",
        "Print on plain A4 paper in your country of residence and sign before 2 local adult witnesses",
        "Optionally get your Will reviewed line-by-line by an AMA Legal Solutions succession advocate",
      ],
    };
  };

  const assessment = getRiskAssessment();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          1. INTERACTIVE COUNTRY TAB SELECTOR
          ========================================================================= */}
      <section id="country-rules" className="w-full scroll-mt-28">
        <div className="mb-8 sm:mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
            <Globe className="w-4 h-4" />
            <span>Country-Specific Execution &amp; Tax Rules</span>
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.4rem] lg:text-[2.85rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
            NRI Will Rules by Country of Residence
          </h2>
          <p className="text-[0.98rem] sm:text-[1.06rem] leading-[1.65] text-[#49585F]">
            Select your country of residence to see how your local Will or Living Trust interacts with the <span className="font-semibold text-[#111827]">Indian Succession Act, 1925</span>, Hague Apostille rules, and Indian Consulate attestation:
          </p>
        </div>

        {/* Country Tabs Bar */}
        <div
          role="tablist"
          aria-label="NRI Country of Residence Rules"
          className="flex flex-wrap gap-2.5 sm:gap-3 mb-8"
        >
          {COUNTRY_GUIDES.map((country) => {
            const isActive = country.id === activeCountry.id;
            return (
              <button
                key={country.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${country.id}`}
                id={`tab-${country.id}`}
                onClick={() => setActiveCountryId(country.id)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#172228] text-white border-[#172228] shadow-sm"
                    : "bg-white text-[#172228] border-[#172228]/15 hover:border-[#C65378] hover:text-[#C65378]"
                }`}
              >
                {country.label}
              </button>
            );
          })}
        </div>

        {/* Country Tab Panels (All rendered in DOM for full SEO crawlability) */}
        {COUNTRY_GUIDES.map((country) => {
          const isActive = country.id === activeCountry.id;
          return (
            <div
              key={country.id}
              id={`panel-${country.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${country.id}`}
              className={`${
                isActive ? "block" : "hidden"
              } bg-white rounded-[24px] sm:rounded-[30px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#172228]/10">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                    {country.visaAndStatus}
                  </span>
                  <h3 className="text-2xl sm:text-[1.75rem] font-medium text-[#111827] leading-snug">
                    {country.heading}
                  </h3>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] text-white text-xs sm:text-sm font-semibold px-6 py-3 hover:bg-[#a13c5d] transition-all shrink-0 self-start lg:self-center"
                >
                  <span>Draft My Indian Will from {country.shortName}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/8">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#B91C1C] mb-2">
                    Why a Local {country.shortName} Will Isn&apos;t Enough
                  </div>
                  <p className="text-[14.5px] leading-[1.65] text-[#374151]">
                    {country.whyForeignWillFails}
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/8">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2">
                    Inheritance Tax &amp; Domicile Nuance
                  </div>
                  <p className="text-[14.5px] leading-[1.65] text-[#374151]">
                    {country.taxAndDomicileRule}
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/8">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#047857] mb-2">
                    Signing, Witnesses &amp; Apostille / Embassy
                  </div>
                  <p className="text-[14.5px] leading-[1.65] text-[#374151] mb-3">
                    {country.authenticationMethod}
                  </p>
                  <p className="text-xs text-[#55636D] font-medium">
                    <strong>Competent Authority:</strong> {country.indianConsulateOrAuthority}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#F4EFE6]/70 border border-[#172228]/10">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3">
                  Recommended Action Plan for {country.shortName} Residents
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {country.actionChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#374151]">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      {/* =========================================================================
          2. INTERACTIVE 30-SECOND NRI PROBATE DELAY & RISK CHECKER
          ========================================================================= */}
      <section className="w-full bg-white rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
            <Clock className="w-4 h-4" />
            <span>Interactive NRI Assessment Tool</span>
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
            Do You Need a Separate Indian Will? Check in 30 Seconds
          </h2>
          <p className="text-[0.95rem] sm:text-[1.02rem] leading-[1.6] text-[#49585F]">
            Select your overseas residence, your Indian asset profile, and your current estate setup to see your exact legal roadmap under Indian succession and FEMA laws:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-5 space-y-5 bg-[#FAF7F0] p-6 rounded-2xl border border-[#172228]/10">
            <div>
              <label
                htmlFor="nri-residency"
                className="block text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2"
              >
                1. Where do you currently live?
              </label>
              <select
                id="nri-residency"
                value={residency}
                onChange={(e) => setResidency(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#172228]/15 px-4 py-3 text-sm font-medium text-[#111827] focus:outline-none focus:border-[#C65378]"
              >
                <option value="usa">United States (US Citizen / GC / H-1B)</option>
                <option value="uk">United Kingdom (British / OCI / ILR)</option>
                <option value="uae">UAE &amp; Middle East (Dubai / Abu Dhabi)</option>
                <option value="canada">Canada (Citizen / PR / Work Permit)</option>
                <option value="australia">Australia / New Zealand</option>
                <option value="singapore">Singapore / Europe</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="nri-assets"
                className="block text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2"
              >
                2. What assets do you hold in India?
              </label>
              <select
                id="nri-assets"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#172228]/15 px-4 py-3 text-sm font-medium text-[#111827] focus:outline-none focus:border-[#C65378]"
              >
                <option value="property_and_bank">Residential Flat / Plot + NRE/NRO Bank Accounts</option>
                <option value="financial_only">NRE/NRO Fixed Deposits, Demat Shares &amp; Mutual Funds</option>
                <option value="ancestral">Undivided Ancestral / HUF Coparcenary Property Share</option>
                <option value="agricultural">Agricultural Land / Farmhouse Inherited in India</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="nri-will-status"
                className="block text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2"
              >
                3. Current Will status
              </label>
              <select
                id="nri-will-status"
                value={willStatus}
                onChange={(e) => setWillStatus(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#172228]/15 px-4 py-3 text-sm font-medium text-[#111827] focus:outline-none focus:border-[#C65378]"
              >
                <option value="foreign_only">I only have a Foreign Will / US Living Trust</option>
                <option value="no_will">I do not have any Will yet</option>
                <option value="parents_in_india">I am an NRI helping my elderly parents in India</option>
              </select>
            </div>
          </div>

          {/* Right Output Card */}
          <div className="lg:col-span-7 bg-[#FAF7F0] rounded-2xl p-6 sm:p-8 border-2 border-[#C65378]/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] bg-[#C65378]/10 px-3.5 py-1.5 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{assessment.riskBadge}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#047857] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{assessment.timeSaved}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-3 leading-snug">
              {assessment.headline}
            </h3>

            <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151] mb-6">
              {assessment.summary}
            </p>

            <div className="space-y-3 mb-7">
              {assessment.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-[14px] text-[#172228]">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-1" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-3.5 transition-colors"
              >
                <span>Start My Indian Will Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#172228]/20 bg-white hover:border-[#C65378] text-[#172228] text-sm font-semibold px-6 py-3.5 transition-colors"
              >
                <span>Compare NRI Will Plans (₹2,490 – ₹9,990)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
