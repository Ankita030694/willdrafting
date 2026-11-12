import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Landmark,
  BookOpen,
  Users,
  Scale,
  Building2,
  Coins,
  AlertCircle,
  FileSearch,
  Gavel,
  ShieldAlert,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import TestamentarySuitInteractive from "@/components/TestamentarySuitInteractive";
import CopyableTrustClauseBox from "@/components/CopyableTrustClauseBox";

// Strict SEO compliance: Title strictly 30-60 chars, Meta Description strictly 70-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Contested Will Litigation Lawyer | WillDrafting", // exactly 47 characters
  },
  description:
    "Premier High Court contested will litigation and probate dispute lawyers in Delhi, Mumbai, Kolkata and Chennai. Forensic handwriting & caveat defense.", // exactly 150 characters
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "contested will litigation lawyer high court india",
    "probate dispute advocate bombay delhi calcutta",
    "challenge forged will lawyer",
    "high court testamentary suit representation service",
    "section 295 indian succession act advocate",
    "caveat petition probate high court lawyer",
    "suspicious circumstances will supreme court",
    "cfsl forensic handwriting expert will dispute",
    "cross examination attesting witness will bsa 2023",
    "administrator pendente lite section 247 isa",
    "testamentary original suit tos bombay madras",
    "ama legal solutions contested will defense",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense",
      "x-default":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense",
    },
  },
  openGraph: {
    title: "Contested Will Litigation Lawyer | WillDrafting",
    description:
      "Premier High Court contested will litigation and probate dispute lawyers in Delhi, Mumbai, Kolkata and Chennai. Forensic handwriting & caveat defense.",
    url: "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/high-court-testamentary-suit-contested-will-defense-og.jpg",
        width: 1200,
        height: 675,
        alt: "Contested Will Litigation Lawyer High Court Testamentary Suit Representation India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contested Will Litigation Lawyer | WillDrafting",
    description:
      "Premier High Court contested will litigation and probate dispute lawyers in Delhi, Mumbai, Kolkata and Chennai. Forensic handwriting & caveat defense.",
    images: [
      "https://www.willdrafting.in/images/high-court-testamentary-suit-contested-will-defense-og.jpg",
    ],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TESTAMENTARY_FAQS = [
  {
    q: "What happens when a caveat is lodged against a probate petition in High Court?",
    a: "Under Section 284 and Section 295 of the Indian Succession Act, 1925, lodging a caveat halts ex-parte probate. Once the caveator files an affidavit in support of caveat within the prescribed window, the non-contentious petition converts into a regular Testamentary Suit (TS or TOS). The probate petitioner becomes the Plaintiff, and the caveator becomes the Defendant under the Code of Civil Procedure, 1908.",
  },
  {
    q: "Can an executor sell or lease estate property while a testamentary suit is pending?",
    a: "No. An executor has no absolute authority to alienate or transfer estate assets during an active contest. Under Section 269 of the Indian Succession Act and Order 39 Rules 1 and 2 CPC, High Courts routinely grant interim injunctions preserving status quo. In cases of financial mismanagement or waste, courts appoint an Administrator Pendente Lite under Section 247 ISA to collect rents and safeguard assets.",
  },
  {
    q: "How does CFSL forensic handwriting analysis help prove a forged Will?",
    a: "Under Section 61 and Section 73 of the Bharatiya Sakshya Adhiniyam 2023 (BSA), disputed signatures are scientifically compared against admitted standards. Forensic examiners at CFSL or certified document laboratories inspect microscopic tremor of fraud, unnatural pen lifts, blunt terminal strokes, line quality, and chemical ink age to determine whether the signature was forged or traced.",
  },
  {
    q: "What are suspicious circumstances under Supreme Court rulings on contested Wills?",
    a: "Starting from H. Venkatachala Iyengar v. B.N. Thimmajamma and Kavita Kanwar v. Pamela Mehta, the Supreme Court ruled that a propounder must dispel all suspicious circumstances to satisfy the court conscience. Suspicious factors include unnatural disinheritance of natural heirs, active participation of the sole beneficiary in drafting or execution, shaky signatures without medical fitness, and execution in hospital ICUs.",
  },
  {
    q: "What is an Administrator Pendente Lite under Section 247 of the Indian Succession Act?",
    a: "An Administrator Pendente Lite is a court-appointed neutral custodian who manages the estate pending the outcome of a contested testamentary suit. The administrator collects commercial rents, deposits dividend income, pays municipal taxes, and ensures that neither side misappropriates high-value family assets before the High Court delivers its final judgment.",
  },
  {
    q: "How long does a contested testamentary suit take in Indian High Courts?",
    a: "Because testamentary suits involve cross-examination of attesting witnesses, forensic testimony, and document trials, they typically take 2 to 4 years in original side High Courts like Bombay, Delhi, Calcutta, and Madras. However, our early application for interim status quo, witness subpoenas, and fast-track discovery significantly reduces delays.",
  },
  {
    q: "Can an NRI defend or challenge a Will in India without travelling for every hearing?",
    a: "Yes. Non-Resident Indians (NRIs) residing in the US, UK, Canada, Australia, or UAE can execute a Special Power of Attorney (SPA) appointing our High Court advocates to file caveats and conduct trial proceedings. Under modern High Court rules, witness evidence and advocate arguments can also be facilitated through authorized video conferencing.",
  },
  {
    q: "How does AMA Legal Solutions charge for High Court contested will litigation?",
    a: "Unlike traditional trial advocates who charge unpredictable daily appearance fees that quickly escalate, AMA Legal Solutions offers structured litigation retainers. We provide clear milestone fees covering caveat filing, forensic coordination, witness cross-examination, and final arguments with zero hidden surprises.",
  },
];

const TESTAMENTARY_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense#webpage",
      url: "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense",
      name: "Contested Will Litigation Lawyer | WillDrafting",
      description:
        "Premier High Court contested will litigation and probate dispute lawyers in Delhi, Mumbai, Kolkata and Chennai. Forensic handwriting & caveat defense.",
      datePublished: "2026-11-12",
      dateModified: "2026-11-12",
      author: {
        "@type": "Person",
        name: "Advocate Anuj Anand Malik",
        url: "https://www.linkedin.com/in/iamanujmalik/",
      },
      publisher: {
        "@id": "https://www.willdrafting.in/#organization",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.willdrafting.in/images/high-court-testamentary-suit-contested-will-defense-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "High Court Testamentary Suit and Contested Will Defense Litigation Framework India",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense#service",
      name: "High Court Testamentary Suit & Contested Will Defense",
      serviceType:
        "Probate Caveat Lodging, Section 295 Testamentary Suit Defense & CFSL Forensic Handwriting Coordination",
      provider: {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      areaServed: [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Testamentary Litigation Retainer Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "50000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Urgent High Court Caveat Filing & Status Quo Motion",
              description:
                "Same-day caveat drafting under Section 284 ISA, High Court filing, and Order 39 interim stay petition to freeze estate asset sales.",
            },
          },
          {
            "@type": "Offer",
            price: "150000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "CFSL Forensic Document Audit & Section 295 Written Statement",
              description:
                "Microscopic signature analysis coordination with forensic examiners, medical record subpoena, and comprehensive defense affidavit.",
            },
          },
          {
            "@type": "Offer",
            price: "350000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Full High Court Testamentary Suit Trial Defense Retainer",
              description:
                "End-to-end representation in Bombay, Delhi, Calcutta or Madras High Courts: witness cross-examination, BSA 2023 evidence, and final decree.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense#howto",
      name: "How to Defend or Challenge a Contested Will in High Court",
      description:
        "Five-stage judicial protocol to lodge caveats, convert probate to testamentary suit, conduct CFSL forensic audits, and cross-examine witnesses.",
      totalTime: "P730D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Lodge Caveat & Secure Immediate Status Quo Injunction",
          text: "File a caveat under Section 284 of the Indian Succession Act and move an urgent interim application under Order 39 CPC to freeze property alienation.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "File Affidavit in Support & Convert Petition to Testamentary Suit",
          text: "Submit a detailed affidavit setting out grounds of forgery, mental incapacity, or undue influence, converting the case to a contested suit under Section 295 ISA.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Execute CFSL Forensic Handwriting & Document Audit",
          text: "Move under Section 73 BSA and Order 26 Rule 10A CPC to compare disputed signatures against contemporaneous admitted records via forensic examiners.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Cross-Examine Attesting Witnesses & Beneficiary Propounders",
          text: "Conduct rigorous trial cross-examination to expose fatal flaws in simultaneous presence, hospital records, and suspicious circumstances.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Secure High Court Final Decree & Execute Revenue Mutation",
          text: "Argue final testamentary issues to dismiss the forged Will or grant probate, followed by municipal and revenue mutation updates.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense#faq",
      mainEntity: TESTAMENTARY_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://www.willdrafting.in/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Contested Will Litigation Lawyer",
          item: "https://www.willdrafting.in/services/high-court-testamentary-suit-contested-will-defense",
        },
      ],
    },
  ],
};

const HIGH_COURT_JURISDICTION_TABLE = [
  {
    highCourt: "Bombay High Court (Original Side)",
    statutoryRules: "Original Side Rules (Chapter XXV, Rules 397 to 403)",
    pecuniaryJurisdiction: "Exclusive original jurisdiction over Greater Mumbai estates",
    caveatProcedure: "Caveat under Rule 397; Affidavit in support within 8 days under Rule 401",
    courtFeeStructure: "Capped at max ₹75,000 under Maharashtra Court Fees Act Schedule I Article 11",
    suitDesignation: "Testamentary Suit (TS)",
  },
  {
    highCourt: "Delhi High Court (Original Side)",
    statutoryRules: "Delhi High Court (Original Side) Rules 2018 (Chapter XXV)",
    pecuniaryJurisdiction: "Original side suits where estate valuation exceeds ₹2.0 Crore",
    caveatProcedure: "Caveat lodged in testamentary department; written objections within 14 days",
    courtFeeStructure: "Ad-valorem scale under Court Fees Act as applicable to NCT of Delhi",
    suitDesignation: "Contested Testamentary Case (Test. Cas.)",
  },
  {
    highCourt: "Calcutta High Court (Original Side)",
    statutoryRules: "Original Side Rules (Chapter XXV, Testamentary & Intestate)",
    pecuniaryJurisdiction: "Ordinary original civil jurisdiction over Kolkata municipal limits",
    caveatProcedure: "Caveat lodged within 14 days of citation notice; affidavit in support filed",
    courtFeeStructure: "Tiered rate under West Bengal Court Fees Act schedules",
    suitDesignation: "Testamentary Suit (TS)",
  },
  {
    highCourt: "Madras High Court (Original Side)",
    statutoryRules: "Original Side Rules 1956 (Order XXV, Rules 1 to 70)",
    pecuniaryJurisdiction: "Presidency town jurisdiction over Chennai metropolitan area",
    caveatProcedure: "Caveat under Order XXV Rule 51; converting OP to regular contested suit",
    courtFeeStructure: "Schedule scale under Tamil Nadu Court Fees and Suits Valuation Act",
    suitDesignation: "Testamentary Original Suit (TOS)",
  },
  {
    highCourt: "District Courts (Pan-India)",
    statutoryRules: "Indian Succession Act, 1925 (Sections 264 to 295) read with CPC",
    pecuniaryJurisdiction: "District Judge holds plenary testamentary authority where High Court has no original side",
    caveatProcedure: "Caveat lodged before District Delegate or District Judge under Section 284",
    courtFeeStructure: "Respective State Court Fees Acts (ad-valorem or fixed schedules)",
    suitDesignation: "Contentious Probate Suit (OS / Civil Suit)",
  },
];

const GENERIC_VS_AMA_LITIGATION_TABLE = [
  {
    parameter: "Testamentary Subject Specialization",
    generic: "General civil trial advocates handling broad property disputes without deep succession focus",
    ama: "Specialized testamentary litigators handling Section 295 ISA conversions and High Court Original Side trials",
  },
  {
    parameter: "CFSL & Forensic Handwriting Coordination",
    generic: "Leaves handwriting inspection to late trial stages; no in-house forensic document examiner networks",
    ama: "Immediate microscopic examination, contemporaneous standards audit, and Section 73 BSA court commissioner motions",
  },
  {
    parameter: "Cross-Examination Blueprint under BSA 2023",
    generic: "Standard cross-examination without systematic attesting witness simultaneous presence interrogation",
    ama: "Meticulous cross-examination targeting fatal gaps in Section 63 ISA attestation and ICU medical incapacity",
  },
  {
    parameter: "Emergency Injunctions & Estate Ring-Fencing",
    generic: "Delays in moving interim motions, allowing adverse co-heirs to secretly sell or mortgage land",
    ama: "Same-day caveat filing and urgent Order 39 CPC stay motions with Section 247 Administrator Pendente Lite requests",
  },
  {
    parameter: "Pan-India High Court Reach & NRI Support",
    generic: "Confined to a single local court; NRIs required to fly to India for routine appearances",
    ama: "Coordinated representation across Bombay, Delhi, Calcutta and Madras High Courts with NRI video-conferencing support",
  },
];

export default function HighCourtTestamentarySuitContestedWillDefensePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TESTAMENTARY_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL AUTHOR ATTRIBUTION BAR
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#172228]/10 text-xs text-[#55636D]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-[#C65378] transition-colors font-medium"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-[#C65378] transition-colors font-medium"
            >
              Services
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-[#111827] font-semibold">
              Contested Will Litigation Lawyer
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span>
              Written by{" "}
              <a
                href="https://www.linkedin.com/in/iamanujmalik/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#111827] hover:text-[#C65378] transition-colors"
              >
                Lawyer Anuj Anand Malik
              </a>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              Legally Verified by{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>
            </span>
            <span className="hidden sm:inline">·</span>
            <time dateTime="2026-11-12" className="text-[#6B7280]">
              Updated November 12, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Strict Single H1: 53 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>High Court Original Side · Indian Succession Act, 1925 · Caveat Defense</span>
              </div>

              {/* Single H1: 53 characters (Strictly 30 to 65 chars, distinct from Title) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Contested Will Litigation Lawyer &amp; High Court Defense
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Defend your rightful inheritance against forged Wills, suspicious deathbed transfers, and wrongful disinheritance in high-stakes estates. Our senior High Court advocates file strategic caveats, coordinate CFSL forensic handwriting audits, and dismantle suspicious Wills under Sections 268 and 295 of the Indian Succession Act, 1925.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Litigation Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates/caveat-petition-high-court-probate-format"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Explore Probate Caveats</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Indian Succession Act 1925</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>ss. 268 &amp; 295 ISA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Forensic CFSL Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>BSA 2023 Evidence</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2: 57 characters */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                High-Stakes Testamentary Moat
              </div>
              {/* Single H2 on page: 57 characters (Strictly <= 70 chars, unique) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why High Courts Require Specialist Contested Will Lawyers
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Section 295 Suit Conversion:</strong> A caveat converts a non-contentious probate petition into a full civil suit. Generic trial lawyers often fail the stringent proof standards mandated under High Court Original Side Rules.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Removing Suspicious Clouds:</strong> Under the Supreme Court ruling in <em>Venkatachala Iyengar</em>, the propounder must prove sound disposing mind and dispel all suspicious circumstances to satisfy the court conscience.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>CFSL Scientific Scrutiny:</strong> Forensic ink analysis, microscopic signature tremor testing, and cross-examination of attesting witnesses under BSA 2023 determine multi-crore estate ownership.
                  </span>
                </li>
              </ul>
              <Link
                href="/templates/caveat-petition-high-court-probate-format"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Inspect High Court Caveat Petitions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE TESTAMENTARY TRIAL DEFENSE EXPLORER
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <TestamentarySuitInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Testamentary Litigation Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: High Court Testamentary Suit Defense Framework
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Contested probate suits require simultaneous defense across civil procedure, statutory evidence, and forensic science. Here is how our High Court litigation team protects multi-crore estates:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/high-court-testamentary-suit-contested-will-defense-og.jpg"
              alt="High Court Testamentary Suit Contested Will Defense Litigation Strategy India"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> High Court Testamentary Suit and Contested Will Defense Framework under Indian Succession Act 1925 ss. 268 &amp; 295 and Bharatiya Sakshya Adhiniyam 2023: forensic handwriting audit, caveat protection, and witness cross-examination.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE: HIGH COURT JURISDICTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Jurisdictional Benchmarks</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              High Court Original Side Jurisdictional &amp; Testamentary Table
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Testamentary procedures vary significantly between Bombay, Delhi, Calcutta, and Madras High Courts. Review our jurisdictional matrix to navigate caveat deadlines and court fee caps:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Judicial Forum</th>
                    <th className="py-4 px-6 w-[20%]">Governing Rules</th>
                    <th className="py-4 px-6 w-[22%]">Pecuniary Jurisdiction</th>
                    <th className="py-4 px-6 w-[20%]">Caveat &amp; Suit Procedure</th>
                    <th className="py-4 px-6 w-[18%]">Court Fee Scale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {HIGH_COURT_JURISDICTION_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.highCourt}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.statutoryRules}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.pecuniaryJurisdiction}</td>
                      <td className="py-5 px-6 font-medium text-[#111827]">
                        {row.caveatProcedure}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.courtFeeStructure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED FORENSIC AUDIT & SUSPICIOUS CIRCUMSTANCES SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <FileSearch className="w-4 h-4" />
                <span>Forensic Science &amp; Evidence Moat</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Forensic Audit: Unmasking Forgery &amp; ICU Deathbed Wills
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                In multi-crore estate disputes, bad-faith actors frequently fabricate holographic documents or coerce elderly relatives on their deathbeds. Proving or refuting these allegations demands scientific rigor under Bharatiya Sakshya Adhiniyam 2023.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                Under Section 73 of BSA 2023 and Order 26 Rule 10A CPC, we move for immediate High Court custody of the original disputed document. Our coordinating forensic examiners evaluate line quality, microscopic hesitation tremors, pen lifts, and chemical ink degradation.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                Landmark Precedent Shield: Under <em>H. Venkatachala Iyengar</em> (AIR 1959 SC 443) and <em>Kavita Kanwar</em> (2021 11 SCC 209), the propounder must affirmatively remove all suspicious circumstances to satisfy the court conscience, failing which probate is summarily denied.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Initiate Forensic Will Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/temporary-injunction-against-co-heir-alienation-suit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Injunction Against Co-Heirs</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 5-STEP TESTAMENTARY TRIAL PROTOCOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Procedural Defense SOP</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              5-Stage High Court Testamentary Suit Trial Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Navigating a contested Will from caveat to final decree requires precision. Here is our structured five-stage litigation roadmap:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                title: "Caveat & Injunction",
                desc: "Lodge caveat under Section 284 ISA to block ex-parte probate. Move urgent Order 39 CPC motion to freeze property sales and bank accounts.",
              },
              {
                step: "02",
                title: "Suit Conversion",
                desc: "File comprehensive Affidavit in Support under High Court Rules. Case converts into a regular Testamentary Suit under Section 295 ISA.",
              },
              {
                step: "03",
                title: "Forensic Document Audit",
                desc: "Secure original Will into court registry vault. Apply under Section 73 BSA 2023 for CFSL microscopic handwriting and ink testing.",
              },
              {
                step: "04",
                title: "Witness Cross-Exam",
                desc: "Cross-examine attesting witnesses and propounder under Sections 67 & 68 BSA 2023 to expose simultaneous presence contradictions.",
              },
              {
                step: "05",
                title: "Final Decree & Mutation",
                desc: "Deliver closing arguments on suspicious clouds. Secure decree refusing or granting probate, followed by municipal revenue mutation.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Stage {item.step}
                  </span>
                  <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY CITATIONS & LANDMARK AUTHORITIES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Gavel className="w-4 h-4" />
              <span>Statutory Trial Authorities</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory Framework: Indian Succession Act &amp; BSA 2023
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Testamentary disputes are decided on strict statutory mandates rather than general equity. Key provisions governing our High Court defense include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 295 ISA: Regular Civil Suit Conversion
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                When caveat objections are lodged, probate proceedings cease to be summary. The petition converts into a full civil suit governed by the Code of Civil Procedure, 1908, requiring framed issues and oral evidence.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Advantage: Shifts heavy initial burden of proof onto the propounder to establish genuine execution.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Sections 61 &amp; 73 BSA 2023: Document Examination
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Bharatiya Sakshya Adhiniyam 2023 empowers High Courts to compare disputed signatures with admitted contemporaneous standards. Scientific reports by handwriting experts form critical trial evidence under Section 39 BSA.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Key Note: Contemporaneous standard signatures must be procured from government or banking archives.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 247 ISA: Administrator Pendente Lite
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Where an executor or co-heir attempts to siphon rental collections, dividend payouts, or commercial revenues pending suit disposal, High Courts appoint an independent administrator to safeguard the corpus.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Rule: Prevents irreparable dissipation of high-value family wealth during litigation.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. COPYABLE CAVEAT AFFIDAVIT GROUNDS BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Standard Testamentary Objections</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sample Legal Grounds: Affidavit in Support of Caveat
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Review the statutory grounds formulated in our standard High Court caveat defense affidavit to challenge suspicious or forged Wills:
            </p>
          </div>

          <CopyableTrustClauseBox
            title="Affidavit Grounds in Support of Caveat (Indian Succession Act ss. 284 & 295)"
            code={`"GROUNDS OF OBJECTION IN SUPPORT OF CAVEAT:

1. The Caveator has a direct, substantial, and caveatable interest in the estate of the deceased Testator as a Class-I legal heir under the Hindu Succession Act, 1956, entitled to an undivided share upon intestate succession.

2. The alleged paper-writing propounded as the Last Will and Testament dated [Date] is an outcome of deliberate forgery, fabrication, and fraud, and does not bear the genuine signature or mark of the deceased Testator.

3. The deceased Testator was critically infirm, hospitalized in intensive care, and not possessed of a sound and disposing mind, memory, or understanding (non compos mentis) at the time of the purported execution of the said paper-writing.

4. The alleged execution is surrounded by thick clouds of suspicious circumstances: the Petitioner-Propounder took an active, dominant, and exclusive role in the procurement, drafting, and custody of the alleged Will to the complete exclusion of all natural heirs.

5. The alleged attesting witnesses are interested parties under the direct financial control and employment of the Petitioner-Propounder, and the statutory requirements of Section 63 of the Indian Succession Act, 1925 were never complied with.

6. The Caveator therefore prays that the Testamentary Petition be converted into a regular Testamentary Suit under Section 295 of the Indian Succession Act, 1925, and probate be refused with exemplary costs."`}
            explanation="Drafted in compliance with High Court Original Side Rules (Chapter XXV) and Sections 284 & 295 of the Indian Succession Act, 1925. Establishing specific grounds in the affidavit prevents ex-parte probate and compels full trial discovery."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL VS GENERIC TRIAL LAWYERS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Litigation Defense Moat</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              AMA Legal Solutions vs Generic Trial Advocates
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              General trial advocates frequently treat probate disputes like ordinary title suits, missing critical testamentary rules and forensic timelines. Here is how our specialized practice defends your rights:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Litigation Parameter</th>
                    <th className="py-4 px-6 w-[36%]">Generic Trial Lawyers</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions Specialists
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {GENERIC_VS_AMA_LITIGATION_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.generic}</td>
                      <td className="py-5 px-6 font-medium text-[#047857] bg-[#047857]/5">
                        {row.ama}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. TESTAMENTARY STATUTORY FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Litigation FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Contested Will Litigation
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Review answers to common questions about High Court testamentary suits, caveats, and forensic trial defense:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTAMENTARY_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h4>
                <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Probate Dispute &amp; Litigation Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Access our High Court petition templates, stay formats, and succession guides:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>All Legal Services Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/caveat-petition-high-court-probate-format"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate Caveat Format</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/application-for-temporary-injunction-probate-format"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate Injunction Format</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/temporary-injunction-against-co-heir-alienation-suit"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Co-Heir Alienation Injunction</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
            ========================================================================= */}
        <section className="w-full p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
              Editorial &amp; Legal Compliance Attribution
            </div>
            <div className="text-base font-semibold text-[#111827] mb-1">
              Authored by{" "}
              <a
                href="https://www.linkedin.com/in/iamanujmalik/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C65378] transition-colors"
              >
                Lawyer Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This litigation guide is prepared under the Indian Succession Act, 1925, the Code of Civil Procedure, 1908, the Bharatiya Sakshya Adhiniyam, 2023, and the Original Side Rules of the Bombay, Delhi, Calcutta, and Madras High Courts. It provides general legal information and does not constitute formal attorney-client representation until a Vakalatnama is executed.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/iamanujmalik/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0077b5] hover:text-[#C65378] shrink-0"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
