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
  Scale,
  Building2,
  Users,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriBrazilWillInteractive from "@/components/NriBrazilWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Brazil | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Brazil. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in brazil",
    "nri will drafting services brazil",
    "indian will for nri in brazil",
    "make a will for indian property from brazil",
    "indian inheritance lawyer brazil",
    "brazilian civil code legitima indian property",
    "codigo civil necessary heirs india will",
    "sao paulo nri property lawyer",
    "cartorio de notas apostille indian will brazil",
    "nro account inheritance repatriation brazil",
    "dtaa india brazil inherited property tax",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Brazil | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Brazil. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-brazil-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Brazil Succession Law & Lex Situs Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Brazil | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Brazil. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-brazil-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_BRAZIL_FAQS = [
  {
    q: "Does Brazilian inheritance law apply to properties located in India?",
    a: "No. Real estate in India follows Indian law. Under Section 5 of the Indian Succession Act 1925, land and homes follow the law where they sit. This rule is called lex rei sitae. Brazilian courts also respect this rule under LINDB Article 8. Indian courts have total power over land located in India.",
  },
  {
    q: "What is the Brazilian 50% forced share (legítima) and can it affect Indian land?",
    a: "Under Articles 1.789 and 1.846 of the Brazilian Civil Code, half of an estate must go to forced heirs. These heirs include your spouse, children, and parents. But Indian succession law does not have forced heirship for self-acquired land. A ring-fenced Indian Will applies Indian law to your Indian assets. This shields your Indian flats and bank deposits from Brazilian forced share claims.",
  },
  {
    q: "Can NRIs in Brazil make an Indian Will on plain paper without traveling to India?",
    a: "Yes. You do not need to travel to India. Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper in Brazil. You do not need Indian stamp paper while living abroad. You only need two adult witnesses who watch you sign. These witnesses must not be heirs named in the Will.",
  },
  {
    q: "Do I need a Brazilian Cartório notarization or Hague Apostille for an Indian Will?",
    a: "Two adult witnesses make your Will legally valid. But getting signature recognition at a Brazilian Cartório de Notas adds strong proof. You can also affix a Hague Apostille (Apostila de Haia) under CNJ rules. Indian registries and High Courts accept apostilled papers without delay.",
  },
  {
    q: "Why should NRIs in Brazil avoid using a single worldwide Will?",
    a: "A single global Will creates long court delays. Brazilian probate (inventário) can take years to finish. During this time, your Indian properties and bank accounts remain frozen. Making two separate Wills solves this. One Will covers Brazil under local rules. A second Will covers India under Indian law. Both estates can then settle quickly.",
  },
  {
    q: "How do heirs in Brazil claim Indian NRE, NRO bank accounts and demat shares?",
    a: "Under the Supreme Court Sarbati Devi ruling, bank nominees are only temporary caretakers. They do not own the money. A clear Indian Will names your true heirs. This lets your family claim bank funds, fixed deposits, and mutual funds fast. They do not need to fight for a court succession certificate.",
  },
  {
    q: "How can heirs in Brazil repatriate inherited money from India to Brazil under RBI rules?",
    a: "Heirs first sell or claim the assets and deposit the funds into an NRO bank account. Under RBI FEMA rules, non-residents can remit up to 1 million USD per financial year to Brazil. Our lawyers help obtain Form 15CA and Form 15CB tax clearances from a Chartered Accountant.",
  },
  {
    q: "Does Brazil levy inheritance tax (ITCMD) on assets inherited in India?",
    a: "In Brazil, states charge ITCMD tax on inherited wealth. India does not levy any inheritance or estate tax. But your heirs in Brazil must follow local state tax rules. Tax credits may also apply under the India-Brazil Double Tax Avoidance Agreement (DTAA).",
  },
];

const NRI_BRAZIL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
      name: "Will Drafting for NRIs in Brazil | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Brazil. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
      datePublished: "2026-11-02",
      dateModified: "2026-11-02",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-brazil-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Brazil Succession Law & Lex Situs Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#legalservice",
      name: "AMA Legal Solutions NRI Brazil Cross-Border Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-brazil-og.jpg",
      description:
        "Cross-border Indian testamentary succession counsel for NRIs, PIOs, and OCIs residing in Brazil, specializing in lex situs real estate protection and FEMA repatriation.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Brazil" },
        { "@type": "City", name: "São Paulo" },
        { "@type": "City", name: "Rio de Janeiro" },
        { "@type": "City", name: "Curitiba" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#service",
      name: "Indian Will Drafting & Estate Protection for NRIs in Brazil",
      serviceType:
        "Cross-Border Succession, Lex Situs Estate Ring-Fencing & Indian Will Execution",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Brazil" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Brazil Will Drafting & Asset Protection Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Self-Serve Online Indian Will for NRIs in Brazil",
              description:
                "Digital Indian Will creation platform with statutory clauses compliant with Section 63 of the Indian Succession Act 1925.",
            },
          },
          {
            "@type": "Offer",
            price: "29990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Advocate-Assisted Cross-Border NRI Will Drafting",
              description:
                "Comprehensive advocate drafting with Brazilian Civil Code exclusion, Cartório guidance, and municipal property demarcation.",
            },
          },
          {
            "@type": "Offer",
            price: "54990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Dual-Country Estate Plan (Brazil & India)",
              description:
                "High Court advocate and cross-border advisory for multi-city real estate, FEMA NRO repatriation, and Hague Apostille attestation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#howto",
      name: "How NRIs in Brazil Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol for Indian expats in Brazil to draft, execute, and authenticate an Indian Will under the Indian Succession Act 1925.",
      totalTime: "P7D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Indian Asset Audit & Schedule Compilation",
          "text": "Compile title deeds, municipal property tax receipts, Khata numbers, NRE/NRO account IFSC codes, and Demat client IDs across India.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Advocate Drafting & Lex Situs Ring-Fencing",
          "text": "Draft a dedicated Indian Will asserting Section 5 Indian Succession Act lex situs and expressly excluding Brazilian properties.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Attestation in Brazil & Hague Apostille",
          "text": "Sign the Will in Brazil before two adult witnesses, notarize at a local Cartório de Notas, and affix a Hague Apostille.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Safe Custody & Transmission Preparedness",
          "text": "Provide certified copies to your named India-resident executor for swift revenue mutation and bank settlement upon demise.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#faq",
      mainEntity: NRI_BRAZIL_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil#breadcrumb",
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
          "name": "Will Drafting for NRIs in Brazil",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-brazil",
        },
      ],
    },
  ],
};

const BRAZIL_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    brazilLaw: "Código Civil (Lei No 10.406/2002) Arts. 1.784-2.027",
    indianWill: "Indian Succession Act 1925 (Act No. 39 of 1925) s. 5",
    intestate: "Religious personal succession laws (HSA 1956, ISA 1925)",
  },
  {
    feature: "Forced Heirship (Legítima)",
    brazilLaw: "Mandatory 50% share reserved for necessary heirs",
    indianWill: "Zero forced share; 100% testamentary freedom for self-acquired land",
    intestate: "Equal division among all Class-I heirs by statute",
  },
  {
    feature: "Execution Formalities in Brazil",
    brazilLaw: "Public deed (escritura pública) or closed/private Will",
    indianWill: "Plain paper signing before two adult witnesses (s. 63)",
    intestate: "No Will exists; court succession decree mandatory",
  },
  {
    feature: "Authentication & Cross-Border Admissibility",
    brazilLaw: "Cartório filing; foreign probate needed for Indian assets",
    indianWill: "Hague Apostille (Apostila de Haia) directly admissible in India",
    intestate: "Heirs must file civil succession suits in Indian courts",
  },
  {
    feature: "Indian Bank & Demat Transmission",
    brazilLaw: "Indian banks reject foreign court probate orders",
    indianWill: "Direct transfer to named heirs under Sarbati Devi precedent",
    intestate: "Frozen accounts; requires court succession certificate",
  },
  {
    feature: "Timeline to Asset Transmission",
    brazilLaw: "3 to 6 years due to cross-border court translation",
    indianWill: "1 to 3 months for bank funds; 2 to 4 months for land mutation",
    intestate: "5 to 12 years across multiple Indian civil court hearings",
  },
  {
    feature: "Risk of Family Disputes",
    brazilLaw: "High; Brazilian heirs contest disinheritance under local code",
    indianWill: "Minimal; clear lex situs ring-fencing bars foreign claims",
    intestate: "Very high; multiple siblings file partition suits in India",
  },
];

export default function WillDraftingForNrisInBrazilPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_BRAZIL_SCHEMA) }}
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
              Will Drafting for NRIs in Brazil
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
            <time dateTime="2026-11-02" className="text-[#6B7280]">
              Updated November 2, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 39 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Lex Situs Counsel · Pan-India Estate Planning
                </span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for Indian NRIs in Brazil
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 27,000 Indian citizens live in São Paulo, Rio de Janeiro,
                and Curitiba. Many hold flats, family land, and bank funds in
                India. Passing away without an Indian Will creates big hurdles
                for your heirs. Under Brazilian law, half of your estate must go
                to forced heirs. This is known as legítima. Our High Court
                lawyers draft clear Indian Wills. We use Section 5 of the Indian
                Succession Act 1925. This keeps your Indian wealth safe from
                foreign court fights.
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
                  href="#brazil-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Brazil vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hague Apostille Valid</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Forced Heirship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 49 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Bottleneck
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Brazilian Civil Code Legítima vs Indian Lex Situs
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>50% Forced Share (Legítima):</strong> Under Brazilian
                    civil rules, half of your estate must pass to necessary
                    heirs. This cuts your freedom to give your land to whom you
                    choose.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian Lex Situs Power:</strong> Section 5(1) of the
                    Indian Succession Act governs Indian land. Brazilian courts
                    respect local land rules under LINDB Article 8. This keeps
                    your Indian flats safe.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Cartório Apostille Signings:</strong> You can sign
                    your Indian Will at a Brazilian Cartório de Notas. Adding a
                    Hague Apostille ensures quick use in Indian land offices.
                  </span>
                </li>
              </ul>
              <Link
                href="/templates/will-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Indian Will Formats &amp; Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriBrazilWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Brazil-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, harmonizes Brazilian Civil Code norms
              with the Indian Succession Act, and enables swift asset transmission:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-brazil.jpg"
              alt="Will Drafting for NRIs in Brazil Succession Law & Lex Situs Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Brazil under Brazilian Civil Code rules and the Indian Succession Act.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            PLAIN-ENGLISH SUMMARY CARDS (High Readability Boost)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] block mb-2">
                  Why Write a Will Now?
                </span>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Protect Your Indian Land
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  Dying without a Will leads to court cases. Your flats and land
                  can stay locked for years. A clear Will protects your loved
                  ones. It names your true heirs. It keeps your property safe.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] block mb-2">
                  Who Needs an Indian Will?
                </span>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Indian Citizens in Brazil
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  You need an Indian Will if you own flats, plots, or bank funds
                  in India. You also need one if you hold mutual funds or shares.
                  Do not rely on bank nominees alone.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] block mb-2">
                  How We Help You
                </span>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Complete Legal Guidance
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  Our lawyers draft ironclad Wills. We guide you on Brazilian
                  notary steps. We help with Hague Apostille seals. We also help
                  your family transfer bank funds to Brazil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="brazil-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Brazil vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Relying on a Brazilian Will or dying without a Will causes years
              of court delays and frozen bank accounts. Compare how Brazilian
              and Indian laws treat cross-border estates:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Brazilian Civil Code</th>
                    <th className="py-4 px-6 w-[26%]">Separate Indian Will</th>
                    <th className="py-4 px-6 w-[26%]">Intestate (No Will)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {BRAZIL_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.brazilLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianWill}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.intestate}
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
              <span>Succession Roadmap</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Brazil-India Cross-Border Estate Succession Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this structured 4-step roadmap to draft, execute, and
              register your Indian Will while living in Brazil:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Audit & Delineation",
                desc: "Compile title deeds, municipal tax numbers, Jamabandi, NRE/NRO accounts, and Demat IDs. Ring-fence Brazilian assets from Indian property.",
              },
              {
                step: "02",
                title: "Advocate Drafting & Choice of Law",
                desc: "Our High Court lawyers draft your Will with specific clauses invoking Section 5 of the Indian Succession Act 1925 to bypass Brazilian forced heirship.",
              },
              {
                step: "03",
                title: "Cartório Signing & Apostille",
                desc: "Sign before two independent adult witnesses. Authenticate signatures at a Brazilian Cartório de Notas and affix a Hague Apostille.",
              },
              {
                step: "04",
                title: "Execution & FEMA Remittance",
                desc: "Your India-resident executor updates land records, transfers bank funds, and assists heirs in remitting funds under RBI FEMA rules.",
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
            6. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause for Indian Assets
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear geographic ring-fencing clause, an Indian Will
              might accidentally revoke your Brazilian testament, or Brazilian
              courts might attempt to claim jurisdiction over your Indian land:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Foreign Asset Exclusion Clause
                  </span>
                  <span>Section 5 Lex Situs Rule</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament
                  relates exclusively to all my immovable and movable assets,
                  properties, bank accounts, deposits, and shares situated in
                  the Republic of India. This Will shall not revoke, alter, or
                  affect any testamentary instrument or testament executed by me
                  in the Federative Republic of Brazil or elsewhere concerning
                  my assets situated outside India. The succession to my Indian
                  immovable properties shall be governed solely by the lex
                  situs principle under Section 5(1) of the Indian Succession
                  Act, 1925.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Our High Court advocates customize this clause to match
                  your specific holdings in São Paulo, Rio de Janeiro, and Indian
                  states.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  NRI Brazil Will Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Brazil and
                  India:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Must watch you sign
                      and sign in your presence. Neither witness can be an heir.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Cartório Attestation:</strong> Obtain signature
                      recognition (reconhecimento de firma) at a local Cartório.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Hague Apostille:</strong> Affix Apostila de Haia
                      under CNJ Resolution 228 for direct Indian admissibility.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>India-Resident Executor:</strong> Name an executor
                      in India to handle mutation and tax filings without travel.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom NRI Will Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Capital Gains Tax on Inherited Property
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Estimate your capital gains tax liability before selling
                    inherited real estate in India.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors w-fit"
              >
                <span>Calculate Capital Gains Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Check Section 195 TDS rates and plan RBI 1 million USD
                    remittances to Brazil.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors w-fit"
              >
                <span>Calculate TDS &amp; Remittance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. BRAZILIAN CIVIL CODE & LEX SITUS DEEP DIVE SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority &amp; Precedents</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Protecting Indian Assets from Brazilian Forced Heirship
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Articles 1.789 and 1.846 of the Brazilian Civil Code impose
                strict forced heirship, guaranteeing 50% of the estate to
                spouses and descendants. However, under the Supreme Court of
                India precedent in{" "}
                <strong className="text-[#111827]">
                  Viswanathan v. Rukn-ul-Mulk Syed Abdul Wajid (1963 SC)
                </strong>
                , foreign courts have no jurisdiction to adjudicate title to
                immovable property in India.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Furthermore, in{" "}
                <strong className="text-[#111827]">
                  Sarbati Devi v. Usha Devi (1984 SC)
                </strong>
                , the Supreme Court ruled that bank nominees are merely trustees
                and do not own bank balances. Having an ironclad Indian Will
                prevents prolonged civil litigation, enables smooth revenue
                mutation, and ensures fast transmission of your assets.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult High Court NRI Lawyer</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for India</span>
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
              <span>Cross-Border Estate FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRI Wills in Brazil
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_BRAZIL_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Hub-and-Spoke Matrix & Sitemap Filters) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related NRI Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border succession guides, legal services,
                and complete sitemaps:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Will India Master Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Inherited Property Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate &amp; Letters of Administration Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Sitemap (All Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Filter Sitemap</span>
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
              This legal guide is prepared under the Indian Succession Act,
              1925, the Brazilian Civil Code (Lei No 10.406/2002), the Foreign
              Exchange Management Act, 1999, and the 1961 Hague Apostille
              Convention. Precedents cited include Viswanathan v. Wajid (1963 SC)
              and Sarbati Devi v. Usha Devi (1984 SC). This content is for legal
              education and does not replace individualized counsel.
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
