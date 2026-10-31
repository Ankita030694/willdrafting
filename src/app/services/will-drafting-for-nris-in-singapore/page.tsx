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
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriSingaporeWillInteractive from "@/components/NriSingaporeWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Singapore | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Singapore. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in singapore",
    "nri will drafting services singapore",
    "indian will for nri in singapore",
    "make a will for indian property from singapore",
    "indian inheritance lawyer singapore",
    "singapore wills act cap 352 cross border will",
    "section 228 indian succession act probate resealing",
    "high commission of india singapore will attestation",
    "nri inherit agricultural land india fema 1999",
    "nre nro bank account transmission without probate",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Singapore | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Singapore. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-singapore-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Singapore Indian Succession Act and High Court Resealing Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Singapore | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Singapore. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-singapore-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_SINGAPORE_FAQS = [
  {
    q: "Why does an NRI in Singapore need a separate Indian Will instead of a single worldwide will?",
    a: "Under Section 5 of the Indian Succession Act, 1925, Indian land and homes follow the Lex Situs rule. Indian law controls assets in India. If you use one Singapore Will, Singapore courts keep the original Will for probate. To transfer Indian land, your heirs must go to an Indian High Court under Section 228. This step takes 12 to 24 months. A separate Indian Will works on its own and saves time.",
  },
  {
    q: "Can a Singapore Will dispose of Singapore CPF savings and Indian properties together?",
    a: "No. Under Singapore law, Central Provident Fund (CPF) savings do not pass under any Will. You must make an official CPF nomination with the CPF Board. Also, Singapore wills face long court checks in India. A dedicated Indian Will protects your Indian assets, while a separate Singapore Will and CPF nomination handle Singapore assets.",
  },
  {
    q: "How can an NRI execute a valid Indian Will while living in Singapore without traveling to India?",
    a: "You do not need to travel to India or buy Indian stamp paper. Under Section 63 of the Indian Succession Act, 1925, an Indian Will can be signed on plain A4 paper anywhere. You sign the paper before two adult witnesses who are not named as heirs. Indian law does not demand compulsory registration under Section 18 of the Registration Act, 1908.",
  },
  {
    q: "How does consular attestation work at the High Commission of India at 31 Grange Road?",
    a: "Consular attestation gives clear proof of your signature. You book an online slot at the High Commission of India at 31 Grange Road, Singapore. You take your Indian passport, Singapore pass, two copies of your Will, and your two witnesses. The consular officer signs your papers under the Diplomatic and Consular Officers Act, 1948.",
  },
  {
    q: "How does Section 228 of the Indian Succession Act handle resealing of a Singapore Grant of Probate?",
    a: "India does not have an automatic probate treaty with Singapore under Section 228. When a Singapore court issues probate, the original Will stays in Singapore. The executor must apply to an Indian court for letters of administration with a verified copy of the Will. This requires foreign court papers and court hearings. A separate Indian Will avoids this delay.",
  },
  {
    q: "Can a Singapore citizen holding an OCI card inherit agricultural land and family homes in India?",
    a: "Yes. Under FEMA 1999 rules, Overseas Citizens of India (OCIs) and NRIs can legally inherit flats, shops, and farmland from an Indian resident. Foreign citizens cannot buy farmland in India, but inheriting farm land through a valid Will is fully legal.",
  },
  {
    q: "What happens to my Indian NRE/NRO fixed deposits and demat shares if I only have a bank nominee?",
    a: "In Sarbati Devi v. Usha Devi, the Supreme Court ruled that a bank nominee is only a trustee, not the owner. The funds belong to the legal heirs. Without an Indian Will, Indian banks often freeze NRE/NRO accounts and demats. They may demand a court succession certificate. A clear Indian Will names your heirs directly and speeds up bank releases.",
  },
  {
    q: "How can legal heirs in Singapore sell inherited Indian property and repatriate the funds to Singapore?",
    a: "Under RBI foreign exchange rules, foreign legal heirs can send up to USD 1,000,000 every financial year from their NRO accounts. Our advocates help heirs get Lower TDS Certificates under Section 197 of the Income Tax Act. We also handle Form 15CA and Form 15CB papers with CAs for smooth bank transfers to Singapore.",
  },
];

const SINGAPORE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
      name: "Will Drafting for NRIs in Singapore | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Singapore. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-singapore-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Singapore Indian Succession Act and High Court Resealing Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#legalservice",
      name: "AMA Legal Solutions Singapore-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-singapore-og.jpg",
      description:
        "Cross-border Indian Will drafting, High Court probate resealing under Section 228, and asset transmission counsel for NRIs and OCIs in Singapore.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Singapore" },
        { "@type": "AdministrativeArea", name: "Central Region Singapore" },
        { "@type": "AdministrativeArea", name: "East Coast Singapore" },
        { "@type": "AdministrativeArea", name: "Jurong Singapore" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#service",
      name: "Indian Will Drafting & Dual-Will Structuring for Singapore NRIs",
      serviceType:
        "Cross-Border Succession, Indian Property Will Drafting & High Court Probate Resealing",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Singapore" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Singapore NRI Estate Planning Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Property Will for Singapore NRIs",
              description:
                "Comprehensive Indian Will compliant with Section 63 of the Indian Succession Act, covering real estate, NRE/NRO deposits, and demat folios.",
            },
          },
          {
            "@type": "Offer",
            price: "29990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Framework with Singapore Asset Ring-Fencing",
              description:
                "Harmonized estate planning coordinating Singapore assets and Indian assets with cross-border non-revocation recitals.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Section 228 Ancillary Probate & Estate Transmission",
              description:
                "End-to-end representation by High Court advocates for ancillary probate of Singapore wills, bank releases, and municipal mutation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#howto",
      name: "How NRIs in Singapore Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, ring-fence, and execute an ironclad Indian Will from Singapore under the Indian Succession Act and FEMA.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Cross-Border Asset Mapping & Ring-Fencing",
          "text": "Catalog Indian properties, bank accounts, and demat folios while ring-fencing Singapore condominiums, SGX shares, and CPF nominations.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Section 63 ISA Advocate Drafting",
          "text": "Draft a bespoke Indian Will with clear asset schedules, alternate executor appointments, and non-revocation clauses for Singapore assets.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Singapore Execution & Witness Attestation",
          "text": "Sign the Will on plain A4 paper before two independent adult witnesses in Singapore, or complete consular attestation at 31 Grange Road.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Indian Transmission & Revenue Mutation",
          "text": "Provide executor guidance for SRO registration during visits to India or swift asset transmission across Indian banks and land registries.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#faq",
      mainEntity: NRI_SINGAPORE_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.willdrafting.in/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Will Drafting for NRIs in Singapore",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-singapore",
        },
      ],
    },
  ],
};

const SINGAPORE_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    singaporeLaw: "Singapore Wills Act 1838 (Rev 2020) & Probate Act (Cap 251)",
    indianLaw: "Indian Succession Act, 1925 (ss. 5, 63, 213, 228) & Personal Laws",
  },
  {
    feature: "Real Estate (Lex Situs)",
    singaporeLaw: "Applies solely to Singapore properties (HDB flats, private condos)",
    indianLaw: "Strictly governs all Indian land and flats; foreign wills cannot transfer land directly",
  },
  {
    feature: "CPF Monies vs Indian PF & Demat",
    singaporeLaw: "CPF savings cannot pass via Will; requires direct CPF Board nomination",
    indianLaw: "Nominees are mere trustees (Sarbati Devi); Will is needed to pass Demat & funds",
  },
  {
    feature: "Execution & Witness Rules",
    singaporeLaw: "Signed by testator in presence of 2 witnesses present together (s. 6)",
    indianLaw: "Signed before 2 independent witnesses on plain paper; no stamp duty needed (s. 63)",
  },
  {
    feature: "Probate & Cross-Border Resealing",
    singaporeLaw: "Grant of Probate issued by Family Justice Courts / General Division",
    indianLaw: "Requires Section 228 petition in Indian High Courts; separate Will avoids this delay",
  },
  {
    feature: "Beneficiary Witness Disqualification",
    singaporeLaw: "Section 10 rule: Gifts to attesting witnesses or spouses are completely void",
    indianLaw: "Witnesses should not be beneficiaries to prevent challenges under Section 67",
  },
  {
    feature: "Funds Repatriation & Capital Gains",
    singaporeLaw: "Zero capital gains tax in Singapore; completely free capital inflow",
    indianLaw: "FEMA USD 1 Million yearly scheme via NRO accounts with Form 15CA/15CB & Sec 197 TDS",
  },
];

export default function NriSingaporeWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SINGAPORE_SCHEMA) }}
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
              Will Drafting for NRIs in Singapore
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
            1. HERO SECTION (Single Strict H1: 43 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Singapore-India Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 43 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Singapore
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 650,000 Indians live and work in Singapore across the Central
                Region, Jurong, Little India, and the East Coast. If you own
                homes in Singapore and flats, land, or Demat accounts in India,
                a single worldwide Will creates legal delays. Under Section 5 of
                the Indian Succession Act, 1925, Indian land follows Indian
                succession law. Our High Court advocates draft clean Indian Wills
                that protect your family, ring-fence Singapore assets, and stop
                costly court delays.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult NRI Estate Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#singapore-vs-india-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Singapore vs Indian Laws</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Dual Will Structuring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Sec 228 Resealing Avoidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Grange Road Attestation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 47 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Worldwide Wills Fail in India
              </div>
              {/* Single Strict H2: 47 chars (Unique across entire site, <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Single Worldwide Will Cross-Border Trap
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Original Will Retained in Singapore:</strong> The
                    Family Justice Courts in Singapore retain the original Will
                    upon granting probate. Indian revenue offices and banks demand
                    the original document, creating an impasse.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Section 228 Indian Court Delays:</strong> Resealing a
                    foreign Grant of Probate in Indian High Courts takes 12 to 24
                    months. Bank accounts and properties remain frozen during this
                    period.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Risk:</strong> Standard
                    boilerplate revocation clauses in a Singapore Will can
                    inadvertently cancel your Indian Will, causing intestate
                    disputes among heirs.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Master Estate Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriSingaporeWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (Full HD OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Singapore-India Succession Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted by High Court advocates secures
              your properties in India, protects your Singapore estate, and
              prevents High Court probate delays:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-singapore-og.jpg"
              alt="Will Drafting for NRIs in Singapore Indian Succession Act and High Court Resealing Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Singapore NRI Will drafting
                under the Indian Succession Act, 1925 and Section 228 resealing
                framework.
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
        <section id="singapore-vs-india-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Singapore Succession Law vs Indian Succession Act
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Navigating dual jurisdictions requires understanding where statutory
              boundaries intersect. Compare key legal provisions between Singapore
              probate law and Indian succession statutes:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[24%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[38%]">
                      Singapore Law (Wills Act &amp; CPF Act)
                    </th>
                    <th className="py-4 px-6 w-[38%]">
                      Indian Law (Indian Succession Act 1925)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {SINGAPORE_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.singaporeLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
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
              <span>Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Singapore-India 4-Step Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court advocates handle the complete cross-border estate
              lifecycle. Follow this structured 4-step path to secure your Indian
              assets while living in Singapore:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Dual Estate Audit",
                desc: "We map your Indian apartments, plots, Demat folios, and NRE/NRO accounts while cleanly ring-fencing Singapore condominiums and bank savings.",
              },
              {
                step: "02",
                title: "Bespoke Advocate Drafting",
                desc: "Our advocates draft your Indian Will under Section 63 with specific asset schedules, alternate executor appointments, and non-revocation clauses.",
              },
              {
                step: "03",
                title: "Witness Execution in SG",
                desc: "Sign on plain white A4 paper before two independent witnesses in Singapore, or complete consular attestation at 31 Grange Road.",
              },
              {
                step: "04",
                title: "Asset Transfer & Land Records",
                desc: "When needed, our advocates guide your family through bank account transfers, Demat releases, and local land office records.",
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
                  <h4 className="text-xl font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
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
              To prevent an Indian Will from accidentally disturbing your Singapore
              investments, or a Singapore Will from revoking your Indian
              testament, insert this verified cross-border ring-fencing clause:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Foreign Asset Ring-Fencing Clause for Singapore NRIs"
            code={`WHEREAS I possess assets, bank accounts, and properties in the Republic of Singapore which are governed by a separate testamentary instrument executed under the laws of Singapore;

AND WHEREAS this present Will is intended by me to apply strictly, exclusively, and solely to my movable and immovable properties, estates, investments, bank accounts (including NRE, NRO, and FCNR accounts), demat folios, mutual fund units, and agricultural or commercial holdings situated in the Republic of India;

AND WHEREAS nothing contained in this Will shall be construed as revoking, modifying, or altering any Will, nomination, or testamentary document executed by me in respect of my Singapore estate, nor shall any subsequent foreign Will revoke this instrument unless specific and explicit reference is made to my Indian estate.`}
            explanation="This clause establishes separate legal status under Section 5 and Section 63 of the Indian Succession Act, 1925, preventing accidental cancellation across borders."
          />

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate indexed acquisition costs and long-term capital gains
                    tax liability for Indian property inherited by Singapore expats.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Capital Gains Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 withholding TDS and evaluate the USD 1
                    Million annual repatriation quota from NRO accounts to Singapore.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate NRI Sale TDS &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. HIGH COURT PROBATE & FEMA INHERITANCE SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Landmark className="w-4 h-4" />
                <span>High Court Probate &amp; FEMA Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                FEMA Regulations &amp; High Court Resealing
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under FEMA 1999 rules, NRIs and OCIs can legally inherit flats,
                plots, and farmland from resident Indians. Foreign citizenship
                does not block your family inheritance rights.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                If an expat passes away leaving only a Singapore Will, Indian
                offices do not accept the foreign court decree directly. Heirs
                must file an Indian High Court petition under Section 228 of the
                Indian Succession Act, 1925 for court letters. Our advocates draft
                clean Indian Wills to avoid this long court process completely.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult Senior Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Start Online Will for Indian Assets</span>
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
              <span>Singapore NRI FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Singapore NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_SINGAPORE_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Including Sitemap Links) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Cross-Border Succession Services &amp; Directory
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate support, and legal directory:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Inherited Property Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate &amp; Will Contest</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Sitemap (All Directory)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Services Directory</span>
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
              This cross-border legal guide is prepared under the Indian
              Succession Act, 1925, the Singapore Wills Act 1838 (Rev 2020),
              the Foreign Exchange Management Act (FEMA), 1999, and the Diplomatic
              and Consular Officers (Oaths and Fees) Act, 1948. Judicial precedents
              cited include Smt. Sarbati Devi v. Smt. Usha Devi (AIR 1984 SC 346).
              This content provides legal education and does not replace
              individualized lawyer counsel.
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
