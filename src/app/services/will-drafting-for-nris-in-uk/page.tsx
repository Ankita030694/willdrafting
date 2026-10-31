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
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriUkWillInteractive from "@/components/NriUkWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in United Kingdom | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in United Kingdom. Protect properties, NRE/NRO accounts & investments in India under Indian succession law.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in united kingdom",
    "nri will drafting services united kingdom",
    "indian will for nri in united kingdom",
    "make a will for indian property from united kingdom",
    "indian inheritance lawyer united kingdom",
    "hmrc 40 inheritance tax indian property nri",
    "uk domicile of origin indian succession act",
    "fcdo apostille indian will legalisation",
    "section 228 indian succession act probate resealing",
    "nri punjab gujarat farmland inheritance will",
    "dual will architecture uk india estate planning",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in United Kingdom | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in United Kingdom. Protect properties, NRE/NRO accounts & investments in India under Indian succession law.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-uk-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in United Kingdom Cross-Border Estate Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in United Kingdom | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in United Kingdom. Protect properties, NRE/NRO accounts & investments in India under Indian succession law.",
    images: ["/images/will-drafting-for-nris-in-uk-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_UK_FAQS = [
  {
    q: "Does my English Will automatically cover my properties and bank accounts in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, Indian land and flats follow Indian law. This is the Lex Situs rule. Indian land tehsils do not accept English probate papers directly. If you use only a UK Will, your family must get probate in London first. Then they must petition an Indian High Court under Section 228. This process takes 2 to 4 years. A separate Indian Will lets your family inherit assets quickly without court delays.",
  },
  {
    q: "How does HMRC's 40% Inheritance Tax apply to Indian assets owned by UK residents?",
    a: "Under the UK Inheritance Tax Act 1984, people who are UK-domiciled pay 40% tax on worldwide assets above £325,000. But if you keep your Indian Domicile of Origin, your Indian assets stay outside the UK tax net. Writing a single worldwide Will can harm your claim to Indian domicile. A separate Indian Will ring-fences your Indian assets and shields them from HMRC tax.",
  },
  {
    q: "Can a British citizen with OCI status inherit agricultural land in Punjab or Gujarat?",
    a: "Yes. Under RBI FEMA rules (Regulation 3), NRIs and foreign citizens with OCI can inherit farm land and farmhouses from Indian residents. But without a clear Indian Will, relatives can dispute title in revenue courts. A clear Indian Will names your heirs and protects your land records.",
  },
  {
    q: "How does the FCDO Apostille work for signing an Indian Will in the United Kingdom?",
    a: "Both the UK and India follow the Hague Apostille Convention 1961. You can sign your Indian Will in the UK on plain A4 paper before two witnesses. Then a UK Notary Public notarizes it. Next, the UK Foreign Office (FCDO) attaches an Apostille certificate. Indian land registries and banks accept this without a trip to the Indian High Commission in London.",
  },
  {
    q: "Why should I avoid using a single worldwide Will for both the UK and India?",
    a: "A single worldwide Will creates big delays. When you submit the original Will to the UK Probate Registry, the court keeps it. You cannot send the original to Indian land offices. Also, standard English Wills often cancel past Wills by mistake. Having two separate Wills keeps both estates clean.",
  },
  {
    q: "What is Section 228 of the Indian Succession Act, and why does UK probate delay it?",
    a: "Section 228 allows Indian courts to issue letters of administration based on a copy of a foreign probated Will. But you must wait for the English court to finish first. Then you must hire Indian High Court lawyers and pay state court fees. A standalone Indian Will lets your executor act right away without Section 228 cases.",
  },
  {
    q: "Do I need to pay Indian stamp duty or register my Will at an Indian Sub-Registrar office?",
    a: "No. Under the Indian Stamp Act 1899, Wills pay zero stamp duty in India. Registration is also optional under Section 18 of the Registration Act 1908. You can sign on plain A4 paper in London, Birmingham, or Manchester. You can also register the Will during your next trip to India if you wish.",
  },
  {
    q: "How can British-Indian heirs repatriate sale proceeds from inherited Indian property?",
    a: "Under RBI rules, each foreign heir can send up to 1 Million US Dollars per financial year back to the UK from their NRO account. Our advocates obtain the Section 197 low tax certificate and Form 15CA and Form 15CB certifications to send your funds safely to your UK bank.",
  },
];

const NRI_UK_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
      name: "Will Drafting for NRIs in United Kingdom | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in United Kingdom. Protect properties, NRE/NRO accounts & investments in India under Indian succession law.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-uk-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in United Kingdom Cross-Border Estate Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#legalservice",
      name: "AMA Legal Solutions UK-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-uk-og.jpg",
      description:
        "Cross-border Indian Will drafting, HMRC 40% IHT ring-fencing advisory, FCDO Apostille attestation, and ancestral property succession for NRIs in the UK.",
      priceRange: "£££",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Greater London" },
        { "@type": "AdministrativeArea", name: "West Midlands" },
        { "@type": "AdministrativeArea", name: "Leicestershire" },
        { "@type": "AdministrativeArea", name: "Greater Manchester" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#service",
      name: "UK-India Cross-Border Will Drafting & Estate Succession",
      serviceType:
        "NRI Testamentary Drafting, FCDO Apostille Legalization & Indian Asset Ring-Fencing",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "UK NRI Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Will Drafting for UK NRIs",
              description:
                "Lex Situs compliant Indian Will covering residential flats, ancestral land, NRO/NRE accounts, and mutual funds with cross-border ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "UK-India Dual Will Estate Synchronization",
              description:
                "Harmonization of English Will and Indian Will, HMRC 40% IHT ring-fencing blueprint, and UK Notary with FCDO Apostille execution protocol.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Advocate Execution & Tehsil Mutation Escrow",
              description:
                "Comprehensive advocate assistance for land revenue mutation (Jamabandi Intkal), bank account transmission, and High Court probate support.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#howto",
      name: "How UK NRIs Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, attest, and legalize a separate Indian Will from the United Kingdom under the Indian Succession Act 1925 and Hague Apostille Convention.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Indian Asset Audit & Schedule Demarcation",
          "text": "Catalog all Indian assets including ancestral land survey numbers, residential registry documents, and bank NRO/NRE account details.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "High Court Advocate Drafting & IHT Ring-Fencing",
          "text": "Draft the standalone Indian Will with strict non-revocation clauses to prevent conflict with English Wills and protect against HMRC 40% tax claims.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Section 63 Attestation Before Two UK Witnesses",
          "text": "Sign the Will on plain A4 paper in the UK before two adult independent witnesses who observe your signature simultaneously.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "UK Notary Notarization & FCDO Apostille Legalization",
          "text": "Notarize the signed Will before a UK Notary Public and obtain an FCDO Apostille certificate, making it fully enforceable across Indian authorities.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#faq",
      mainEntity: NRI_UK_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk#breadcrumb",
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
          "name": "Will Drafting for NRIs in United Kingdom",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-uk",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    ukLaw: "UK Wills Act 1837 & Estates Act 1925",
    indianLaw: "Indian Succession Act 1925 (s. 5 & 63)",
    crossBorderImpact: "Indian land follows Indian law under Lex Situs rule",
  },
  {
    feature: "Inheritance Tax",
    ukLaw: "HMRC 40% tax on worldwide wealth",
    indianLaw: "Zero Indian Inheritance Tax (Abolished 1985)",
    crossBorderImpact: "Separate Indian Will ring-fences Indian wealth",
  },
  {
    feature: "Cross-Border Recognition",
    ukLaw: "UK probate applies to English assets only",
    indianLaw: "Indian High Court resealing under Section 228",
    crossBorderImpact: "Standalone Indian Will skips 2 to 4 years court delay",
  },
  {
    feature: "Legalization Protocol",
    ukLaw: "UK Notary Public seal for overseas use",
    indianLaw: "Hague Apostille Convention 1961 accepted",
    crossBorderImpact: "FCDO Apostille valid without Indian Embassy visit",
  },
  {
    feature: "Stamp Duty & Paper",
    ukLaw: "Valid on plain paper without stamp duty",
    indianLaw: "Exempt from stamp duty under Stamp Act 1899",
    crossBorderImpact: "Can sign on standard A4 paper in London or Leicester",
  },
  {
    feature: "Probate Requirement",
    ukLaw: "Mandatory via UK Probate Registry",
    indianLaw: "Only mandatory in Mumbai, Kolkata & Chennai",
    crossBorderImpact: "Indian assets outside 3 cities pass without probate",
  },
  {
    feature: "Transmission Speed",
    ukLaw: "9 to 16 months UK Probate backlog",
    indianLaw: "7 to 21 days for direct bank transfer",
    crossBorderImpact: "Protects Indian property from relative disputes",
  },
];

export default function NriUkWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_UK_SCHEMA) }}
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
              NRIs in United Kingdom
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
                Advocate Anuj Anand Malik
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
            1. HERO SECTION (Single Strict H1: 40 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Cross-Border Counsel · FCDO Legalization
                </span>
              </div>

              {/* Single H1: 40 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in United Kingdom
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Many British-Indian families live in London, Leicester, and
                Birmingham. They hold family homes, flats, and bank savings in
                India. A UK Will cannot transfer Indian land directly. Indian
                land offices follow Indian law under the Lex Situs rule. Writing
                only an English Will can also expose Indian assets to HMRC 40%
                inheritance tax. Our High Court advocates draft clear Indian
                Wills. We protect your family land, keep your UK assets safe, and
                stop court delays.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Cross-Border Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Online Indian Will</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>HMRC 40% Tax Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs ISA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FCDO Apostille Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Estate Duty</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 50 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Pitfalls for UK Indians
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The HMRC 40% Inheritance Tax &amp; Lex Situs Challenge
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>HMRC 40% Tax Risk:</strong> Putting Indian assets
                    into an English Will can make HMRC claim 40% tax on your
                    Indian family land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>UK Court Delays:</strong> Resealing a UK probate in
                    an Indian High Court takes 2 to 4 years. It costs high court
                    fees.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Will Cancellation:</strong> English Will
                    templates often cancel older Wills. This can void your Indian
                    property Will.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Global NRI Master Hub Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriUkWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Dual-Will Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a dedicated Indian Will synchronized with English estate planning
              protects your wealth, avoids probate backlogs, and insulates Indian
              assets from foreign inheritance tax:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-uk-og.jpg"
              alt="Will Drafting for NRIs in United Kingdom Cross-Border Estate Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of UK-India Dual-Will
                Architecture, FCDO Apostille legalization, and Section 228
                probate bypass.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. RESPONSIVE HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="uk-vs-india-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              UK vs Indian Succession Law: Legal Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              UK succession statutes and the Indian Succession Act 1925 operate
              under fundamentally different legal principles. Compare how English
              probate rules differ from Indian testamentary requirements:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">United Kingdom Succession Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act 1925</th>
                    <th className="py-4 px-6 w-[28%]">Cross-Border Legal Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.ukLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.crossBorderImpact}
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
              <span>Step-by-Step Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Indian Will Protocol in the UK
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Execute a fully compliant Indian Will without traveling to India or
              waiting months for High Commission consular appointments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Schedule Mapping",
                desc: "We verify title records for your Indian flats, commercial units, and ancestral land survey numbers. We list bank NRO/NRE deposits and mutual funds.",
              },
              {
                step: "02",
                title: "High Court Lawyer Drafting",
                desc: "Our advocates craft a standalone Indian Will. We draft custom non-revocation clauses to prevent conflict with your existing English Will.",
              },
              {
                step: "03",
                title: "UK Section 63 Attestation",
                desc: "Print your Will on plain A4 paper in the UK. Sign it before two adult independent witnesses who observe your signature simultaneously.",
              },
              {
                step: "04",
                title: "UK Notary & FCDO Apostille",
                desc: "Have your signature notarized before a UK Notary Public. We guide you to obtain an FCDO Apostille certificate for seamless enforcement across India.",
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
            6. ESSENTIAL LEGAL CLAUSE BOX (Foreign Asset Ring-Fencing)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing &amp; Non-Revocation Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard English Wills often contain boilerplate revocation language
              that revokes all previous testamentary dispositions worldwide. To
              protect your Indian estate, your Indian Will must include explicit
              jurisdictional ring-fencing recitals:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Jurisdiction Limitation Clause
                  </span>
                  <span>Non-Revocation Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament relates
                  EXCLUSIVELY to all my movable and immovable properties situated
                  within the territory of the Republic of India. I declare that I
                  have executed, or intend to execute, a separate Last Will and
                  Testament for my assets situated in the United Kingdom of Great
                  Britain and Northern Ireland. This Indian Will shall NOT revoke,
                  alter, or affect in any manner my English Will; AND conversely,
                  no subsequent general revocation clause in any foreign Will shall
                  be construed as revoking this Indian Will unless express reference
                  is made hereto.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Dual-Will architecture requires coordination between
                  your UK solicitor and Indian High Court advocates to ensure both
                  instruments operate harmoniously without jurisdictional conflict.
                </p>
              </div>
            </div>

            {/* Execution Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Cross-Border Execution Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Ensure full compliance under Section 63 of the Indian Succession
                  Act 1925:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Must not be named as
                      beneficiaries or spouses of beneficiaries in the Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Simultaneous Attestation:</strong> Both witnesses
                      must watch you sign and sign in your presence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>UK Notary Public Seal:</strong> Formal notarization of
                      testator identity and capacity in the UK.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>FCDO Apostille Certificate:</strong> Legalisation
                      Office apostille confirming the Notary&apos;s signature.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Schedule UK-India Will Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Evaluate cost of acquisition indexation and long-term capital
                    gains tax under Indian Income Tax Act Section 48.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Capital Gains</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Estimate Section 195 withholding tax and RBI 1 Million USD
                    annual remittance eligibility for UK bank wire transfers.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Repatriation TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. DEMOGRAPHIC FOCUS: UK HUBS & ANCESTRAL PROPERTY
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>UK Demographics &amp; Ancestral Ties</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Demographic Focus: UK Hubs &amp; Ancestral Property
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Over 1.86 million people of Indian heritage live in Greater
                London, the West Midlands, Leicester, Manchester, Slough, and
                Leeds. British Indians own flats, commercial plots, and family
                land across India. Farmland in Punjab and Haryana is often cared
                for by distant family members.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under FEMA rules, foreign citizens with OCI can lawfully inherit
                farm land. But without a clear Indian Will listing land survey
                numbers, family fights can tie up title in revenue courts. Our
                legal team secures your property succession and prepares robust
                Power of Attorney papers for local Tehsil mutation.
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
                <span>Draft Online Will for Indian Assets</span>
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
              <span>Cross-Border Legal Guidance</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: UK NRI Wills
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
            {NRI_UK_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Outbound Spokes) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related NRI Succession &amp; Repatriation Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, repatriation protocols,
                and probate guidance:
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
                <span>Probate &amp; Letters of Administration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Global NRI Master Hub</span>
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
                Advocate Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This cross-border legal guide is prepared under the Indian
              Succession Act 1925 (Sections 5, 63, and 228), the UK Inheritance
              Tax Act 1984, the Foreign Exchange Management Act (FEMA), and the
              Hague Apostille Convention 1961. This content provides legal
              education and does not replace individualized counsel from a
              licensed advocate or UK solicitor.
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
