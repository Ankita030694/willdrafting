import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  BookOpen,
  Landmark,
  Calculator,
  Globe2,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriAustraliaWillInteractive from "@/components/NriAustraliaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Australia | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Australia. Protect land, flats & NRE/NRO bank accounts under the Indian Succession Act. Dual-Will counsel.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in australia",
    "nri will drafting services australia",
    "indian will for nri in australia",
    "make a will for indian property from australia",
    "indian inheritance lawyer australia",
    "nsw succession act 2006 indian property",
    "vic administration and probate act indian will",
    "australian superannuation death benefit indian will",
    "ato foreign inherited property capital gains tax",
    "dfat apostille indian will australia",
    "hague apostille convention australia india will",
    "ama legal solutions cross border estate planning australia",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Australia | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Australia. Protect land, flats & NRE/NRO bank accounts under the Indian Succession Act. Dual-Will counsel.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-australia-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Australia NSW VIC and Indian Land Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Australia | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Australia. Protect land, flats & NRE/NRO bank accounts under the Indian Succession Act. Dual-Will counsel.",
    images: ["/images/will-drafting-for-nris-in-australia-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_AUSTRALIA_FAQS = [
  {
    q: "Does my Australian Will cover my apartments, ancestral land, and bank accounts in India?",
    a: "Under Section 5 of the Indian Succession Act 1925, succession to immovable property in India is strictly governed by the Lex Situs rule (the law of the land where property is situated). Indian land registry authorities and revenue Tehsildars require compliance with Indian testamentary law. An Australian Will must undergo probate in an Australian Supreme Court and then lengthy ancillary probate proceedings in an Indian High Court under Section 228. A separate Indian Will transfers land directly.",
  },
  {
    q: "Why must Australian superannuation and SMSF be kept separate from an Indian Will?",
    a: "Under Section 59 of the Superannuation Industry (Supervision) Act 1993 (SIS Act), Australian superannuation does not automatically form part of your deceased estate. It is distributed by the fund trustee or via a Binding Death Benefit Nomination (BDBN). Mentioning superannuation in an Indian Will creates cross-border tax conflicts under ITAA 1997 Division 302. Our dual-will architecture keeps superannuation and Indian property cleanly segregated.",
  },
  {
    q: "How does the Australia-India Dual-Will strategy prevent probate delays in Indian courts?",
    a: "A dual-will architecture consists of an Australian Will limited strictly to Australian assets (family home in Sydney or Melbourne, local bank accounts, and shares) and a separate Indian Will limited exclusively to Indian properties and NRE/NRO accounts. Each Will contains express non-revocation recitals. When the testator passes away, probate in Australia proceeds independently without freezing Indian assets.",
  },
  {
    q: "How does the Australian Taxation Office (ATO) treat inherited real estate in India for CGT?",
    a: "Under Section 128-15 of the Australian Income Tax Assessment Act 1997 (ITAA 1997), when an Australian tax resident inherits foreign property from a non-resident of Australia, the cost base is generally the fair market value of the property at the date of death. India levies zero inheritance tax or capital gains tax on bequest under Section 47 of the Indian Income Tax Act 1961. Foreign Income Tax Offsets (FITO) prevent double taxation when the property is later sold.",
  },
  {
    q: "Can an Australian citizen with an OCI card inherit agricultural land and farmhouses in India?",
    a: "Yes. Under FEMA Regulation 3(1)(b) issued by the Reserve Bank of India, Persons of Indian Origin (PIOs) and Overseas Citizens of India (OCIs) are permitted to inherit agricultural land, farmhouses, and plantation properties from resident Indians. However, they cannot purchase agricultural land. A clearly drafted Indian Will ensures hassle-free mutation into revenue Jamabandi records without cousin contestation.",
  },
  {
    q: "How does the 1961 Hague Apostille Convention work for signing an Indian Will in Australia via DFAT?",
    a: "Both Australia and India are signatories to the 1961 Hague Apostille Convention. An Indian Will executed before an Australian Public Notary only requires an Apostille certificate from the Australian Department of Foreign Affairs and Trade (DFAT). You do not need in-person legalization appointments at the Indian High Commission in Canberra or Consulates in Sydney, Melbourne, or Perth.",
  },
  {
    q: "Do I need Indian stamp paper to execute an Indian Will in Melbourne or Sydney?",
    a: "No. Under the Indian Stamp Act, 1899, testamentary Wills are completely exempt from stamp duty across all Indian states. You can print your Indian Will on plain Letter or standard A4 paper in Australia and sign it in the physical presence of two independent adult witnesses who are not beneficiaries under the Will.",
  },
  {
    q: "How can Australian NRI heirs repatriate the sales proceeds of inherited property to Australia?",
    a: "Under Reserve Bank of India (RBI) Foreign Exchange Management regulations, non-resident heirs can repatriate up to USD 1,000,000 (1 Million US Dollars) per financial year from their NRO accounts. Our legal team assists with Section 197 lower TDS certificates from Indian tax authorities and Chartered Accountant Form 15CA and Form 15CB certifications for smooth international bank wire transfers.",
  },
];

const NRI_AUSTRALIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
      name: "Will Drafting for NRIs in Australia | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Australia. Protect land, flats & NRE/NRO bank accounts under the Indian Succession Act. Dual-Will counsel.",
      datePublished: "2026-10-31",
      dateModified: "2026-10-31",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-australia-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Australia NSW VIC and Indian Land Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#legalservice",
      name: "AMA Legal Solutions Australia-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-australia-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Australia-India estate harmonization, Section 63 Will drafting, DFAT Hague Apostille counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Australia" },
        { "@type": "AdministrativeArea", name: "New South Wales" },
        { "@type": "AdministrativeArea", name: "Victoria" },
        { "@type": "AdministrativeArea", name: "Queensland" },
        { "@type": "AdministrativeArea", name: "Western Australia" },
        { "@type": "AdministrativeArea", name: "South Australia" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in Australia",
      serviceType:
        "Cross-Border Indian Will Drafting, Australia Dual-Will Harmonization & Superannuation Separation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Australia Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Australian asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "DFAT Hague Apostille & Public Notary Legalization Package",
              description:
                "High Court advocate vetting with Australian DFAT Hague Apostille roadmap, Public Notary guidelines, and Indian safe custody registration.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "NSW & VIC Dual-Will Harmonization & Superannuation Carve-Out Counsel",
              description:
                "End-to-end alignment of Australian state Wills with Indian Succession Act rules, superannuation BDBN coordination, and FEMA USD 1M remittance counsel.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#howto",
      name: "How NRIs in Australia Execute a Legally Valid Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from Australia under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Discovery & Revenue Record Audit",
          text: "Collate property deeds, Jamabandi revenue records, and bank portfolios across Indian states, auditing undivided family shares and ancestral title.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Superannuation Ring-Fencing",
          text: "High Court advocates draft your Indian Will with strict territorial ring-fencing clauses, segregating Australian superannuation and family trusts.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation & DFAT Apostille",
          text: "Sign the Will in Australia before two independent adult witnesses and an Australian Public Notary, securing a DFAT Apostille certificate.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & Indian Executor Onboarding",
          text: "Deposit sealed registered copies with legal counsel in India, equipping your resident executor with complete documentation for future revenue mutation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#faq",
      mainEntity: NRI_AUSTRALIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia#breadcrumb",
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
          name: "Will Drafting for NRIs in Australia",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-australia",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Succession Statute",
    australianWill: "NSW Succession Act 2006 / VIC Admin & Probate Act 1958",
    singleGlobalWill: "Subject to conflicting cross-border conflict-of-law rules",
    separateIndianWill: "Indian Succession Act 1925 s. 5 & Lex Situs",
  },
  {
    parameter: "Enforceability for Indian Real Estate",
    australianWill: "Ineffective; cannot mutate Indian revenue records directly",
    singleGlobalWill: "Requires expensive High Court ancillary probate s. 228",
    separateIndianWill: "Directly enforceable before Sub-Registrars & Tehsildars",
  },
  {
    parameter: "Australian Superannuation Treatment",
    australianWill: "Governed by BDBN under SIS Act 1993; non-estate asset",
    singleGlobalWill: "Causes cross-border confusion and potential ATO tax leaks",
    separateIndianWill: "Completely ring-fenced outside Indian testamentary scope",
  },
  {
    parameter: "Probate Timeline & Legal Costs",
    australianWill: "2 to 4 months in Australia, but 3 to 5+ years in Indian courts",
    singleGlobalWill: "Requires Australian Supreme Court grant + Indian resealing",
    separateIndianWill: "Independent probate in India without waiting for Australia",
  },
  {
    parameter: "Risk of Accidental Revocation",
    australianWill: "Standard Australian revocation clause revokes Indian wills",
    singleGlobalWill: "High risk of mutual revocation conflicts between solicitors",
    separateIndianWill: "Zero risk; territorial ring-fencing preserves both wills",
  },
  {
    parameter: "Hague Apostille Recognition",
    australianWill: "Apostille on Australian probate cannot override Indian Lex Situs",
    singleGlobalWill: "Requires apostilled foreign grant + Indian court verification",
    separateIndianWill: "DFAT apostille on Australian notary seal accepted across India",
  },
  {
    parameter: "ATO & Indian Tax Compliance",
    australianWill: "No guidance on Indian TDS s. 195 or Form 15CA/CB remittance",
    singleGlobalWill: "Complex reporting under ITAA 1997 Div 128 cost base rules",
    separateIndianWill: "Clear separation allows streamlined DTAA FITO & RBI USD 1M",
  },
];

export default function NriAustraliaWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_AUSTRALIA_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL ATTRIBUTION BAR
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
            <span
              aria-current="page"
              className="text-[#111827] font-semibold"
            >
              Will Drafting for NRIs in Australia
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
            <time dateTime="2026-10-31" className="text-[#6B7280]">
              Updated October 31, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 35 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>
                  Cross-Border Counsel · Australia-India Estate Harmonization
                </span>
              </div>

              {/* Single H1: 35 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Australia
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Australia is home to over 976,000 people of Indian heritage across
                Melbourne, Sydney, Brisbane, Perth, and Adelaide. Many hold
                apartments in Bengaluru, Mumbai, or Delhi NCR alongside ancestral
                farmland in Punjab, Gujarat, or Andhra Pradesh. Under Section 5 of
                the Indian Succession Act 1925, Indian land cannot be transferred
                through an Australian probate grant alone. Our High Court advocates
                draft dedicated Indian Wills that ring-fence Australian superannuation,
                prevent cross-revocation, and secure smooth revenue mutation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Cross-Border Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#comparison-table"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Australian vs Indian Will</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>DFAT Apostille 1961</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Superannuation Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Death Duty</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (41 chars, <= 70 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Key Cross-Border Warning
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Australian Will &amp; Indian Land Pitfall
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation of Indian Rights:</strong> Standard
                    Wills drafted by Australian solicitors contain clauses revoking
                    all prior wills worldwide. This unwittingly cancels prior Indian
                    wills and plunges ancestral land into intestacy disputes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Superannuation &amp; SMSF Commingling:</strong> Australian
                    superannuation is governed by Binding Death Benefit Nominations
                    under the SIS Act 1993. Mixing superannuation with Indian estate
                    clauses causes tax and trustee distribution disputes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Sub-Registrar &amp; Revenue Rejection:</strong> Indian land
                    registrars refuse to recognize Australian Supreme Court probate
                    grants without expensive Indian High Court proceedings.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read NRI Master Succession Blueprint</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriAustraliaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Australia-India Succession Architecture &amp; Asset Protection
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will coordinated with your Australian estate plan
              secures your family title, complies with Australian state laws, and
              prevents multi-year revenue disputes in India:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-australia-og.jpg"
              alt="Will Drafting for NRIs in Australia NSW VIC and Indian Land Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Australia-India Will drafting,
                superannuation ring-fencing, and DFAT Hague Apostille execution protocol.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="comparison-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Australian Will vs Single Global Will vs Dedicated Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Relying on an Australian Will for Indian property creates severe delays
              and probate bottlenecks. Compare how Indian and Australian legal systems
              treat these three estate planning routes:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Australian State Will</th>
                    <th className="py-4 px-6 w-[26%]">Single Worldwide Will</th>
                    <th className="py-4 px-6 w-[26%]">Separate Indian Will</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {SUCCESSION_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.australianWill}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.singleGlobalWill}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.separateIndianWill}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Cross-Border Execution from Australia
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              You can protect your Indian assets without traveling overseas. Follow
              this structured statutory path to execute an ironclad Indian Will from
              Sydney, Melbourne, Brisbane, Perth, or Adelaide:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Discovery & Mutation Audit",
                desc: "We verify municipal property tax IDs, builder deeds, Khewat/Khasra farmland records, and bank accounts across Indian states.",
              },
              {
                step: "02",
                title: "Advocate Drafting & Ring-Fencing",
                desc: "Our High Court advocates draft your Indian Will with a territorial clause that protects your Australian home, superannuation, and local estate.",
              },
              {
                step: "03",
                title: "Attestation & DFAT Apostille",
                desc: "Print on plain A4 paper in Australia and sign before two witnesses and a Public Notary. Secure a DFAT Apostille certificate without embassy visits.",
              },
              {
                step: "04",
                title: "Safe Custody & Revenue Execution",
                desc: "We deposit sealed registered copies with legal counsel in India, equipping your resident executor with complete documentation for land mutation.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. ESSENTIAL LEGAL CLAUSE: SEPARATE INDIAN WILL RING-FENCING
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Copy-Pasteable Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard Australian Wills often inadvertently revoke prior testamentary
              instruments worldwide. To avoid conflicts, our cross-border lawyers
              insert an explicit territorial ring-fencing clause:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Territorial Non-Revocation & Ring-Fencing Clause"
                code={`"I hereby declare that this Last Will and Testament shall apply exclusively and solely to all my immovable and movable properties, estate, agricultural lands, plots, residential apartments, NRE/NRO bank accounts, fixed deposits, Demat portfolios, and financial investments situated within the territorial jurisdiction of the Republic of India.

I expressly declare that this Will does NOT revoke, alter, or affect any Will, codicil, Binding Death Benefit Nomination (BDBN), or testamentary disposition executed by me in the Commonwealth of Australia or any other foreign jurisdiction regarding properties located outside India, it being my intention that my Indian estate and my Australian estate shall be governed by independent testamentary instruments."`}
                explanation="This clause establishes a strict territorial ring-fence under Section 5 of the Indian Succession Act 1925. It guarantees that an Australian Will governing your Australian real estate and superannuation cannot be held to revoke your Indian Will, and prevents Australian probate proceedings from holding up asset transfers in India."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between my-8">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Indian Will Asset Schedule Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian revenue authorities and banks require exact identifying details:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Flats &amp; Plots:</strong> Unit number, registered
                      conveyance deed number, and undivided share in land (UDS).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Farmland Details:</strong> Khewat, Khatauni, and
                      Khasra numbers with Tehsil, Patwar circle, and District.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Accounts:</strong> NRE, NRO, and FCNR account
                      numbers with branch IFSC codes and nominee notes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat &amp; Shares:</strong> 16-digit Client ID,
                      Depository Participant (CDSL/NSDL), and folio details.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Will Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Indian long-term capital gains tax on ancestral real
                    estate with indexation benefits and Section 54 deductions.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Capital Gains</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 withholding TDS, Form 13 lower tax
                    certificates, and RBI USD 1 Million repatriation limits.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate NRI Sale TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. AUSTRALIA DUAL-WILL STRATEGY & SUPERANNUATION SEPARATION GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Building2 className="w-4 h-4" />
                <span>NSW Succession Act, VIC Probate &amp; Indian Succession Act</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Dual-Will Strategy &amp; Superannuation Separation Guide
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                In New South Wales, Victoria, and Queensland, state courts govern
                the probate of local real estate and financial assets. Under the
                landmark principles of international private law recognized in
                Australia, succession to foreign immovable property is strictly
                governed by the Lex Situs rule. An Australian grant of probate has
                no legal jurisdiction over Indian apartments or ancestral plots.
                Attempting to reseal an Australian grant in Indian High Courts under
                Section 228 of the Indian Succession Act 1925 causes probate delays
                lasting 3 to 5 years.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Simultaneously, under Section 59 of the Superannuation Industry
                (Supervision) Act 1993, superannuation balances and death benefits
                must be directed through a valid Binding Death Benefit Nomination
                (BDBN) to preserve tax-free status for dependants under ITAA 1997
                Section 302-60. By executing an independent Indian Will ring-fenced
                from Australian superannuation and local real estate, you guarantee
                that both your Australian and Indian estates pass swiftly to your
                loved ones without unnecessary tax exposure or probate disputes.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Dual-Will Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Self-Service Online Will</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Australia NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_AUSTRALIA_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h3 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h3>
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
                Related Cross-Border &amp; Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI estate planning guides, mutation workflows, and
                probate services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Property Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Succession Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Sitemap Directory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Directory Filter</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. EDITORIAL & E-E-A-T ATTRIBUTION CARD
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
              This legal guide is prepared under the Indian Succession Act 1925,
              the NSW Succession Act 2006, the VIC Administration and Probate Act 1958,
              the Superannuation Industry (Supervision) Act 1993, the Australian
              Income Tax Assessment Act 1997, the Indian Stamp Act 1899, the Foreign
              Exchange Management Act 1999, and the 1961 Hague Apostille Convention.
              Judicial precedents cited include Sarbati Devi v. Usha Devi (1984 SC)
              and Granovsky Estate principles. This content provides legal education
              and does not constitute formal attorney-client counsel.
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
