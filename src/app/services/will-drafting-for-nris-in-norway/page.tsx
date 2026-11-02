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
  Scale,
  Sparkles,
  HelpCircle,
  Users,
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriNorwayWillInteractive from "@/components/NriNorwayWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Norway | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Norway. Protect land, flats, NRE/NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in norway",
    "nri will drafting services norway",
    "indian will for nri in norway",
    "make a will for indian property from norway",
    "indian inheritance lawyer norway",
    "norwegian succession act arveloven pliktdelsarv",
    "statsforvalteren apostille indian will norway",
    "oslo bergen stavanger nri property lawyer",
    "nro account inheritance repatriation norway",
    "dtaa india norway inherited property tax",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Norway | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Norway. Protect land, flats, NRE/NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-norway-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Norway Cross-Border Estate Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Norway | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Norway. Protect land, flats, NRE/NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-norway-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_NORWAY_FAQS = [
  {
    q: "Does the Norwegian Succession Act 2019 (Arveloven) govern my assets in India?",
    a: "Indian land and flats follow Indian law alone under Section 5. Norwegian Arveloven cannot control land in India. A separate Indian Will keeps your assets safe. Your family avoids long cross-border court fights.",
  },
  {
    q: "What is Norwegian pliktdelsarv and how does it impact Indian properties?",
    a: "Pliktdelsarv is Norwegian forced heirship. It gives children two-thirds of an estate. But Section 59 gives you full freedom over your self-earned assets in India. A separate Indian Will stops forced share claims.",
  },
  {
    q: "Can NRIs in Norway execute an Indian Will on plain paper?",
    a: "Yes. You can sign your Will on plain A4 paper in Norway under Section 63. You do not need Indian stamp paper. Two adult friends witness your signature. Your witnesses must not be heirs named in the Will.",
  },
  {
    q: "Do I need a County Governor (Statsforvalteren) Hague apostille?",
    a: "Two adult witnesses make your Will valid under Indian law. A County Governor apostille gives extra proof. This stops family disputes in India. Land offices and banks accept apostilled papers fast.",
  },
  {
    q: "Why should NRIs in Norway avoid a single worldwide Will?",
    a: "A single global Will causes long court delays. Indian land offices do not accept Norwegian court orders. Heirs must file new court cases in India. Two separate Wills let both estates settle fast.",
  },
  {
    q: "Does Norway or India levy inheritance tax on inherited property?",
    a: "Neither country levies inheritance tax. Norway ended it in 2014, and India ended estate duty in 1985. But selling inherited Indian land later brings capital gains tax. Under the tax treaty, taxes paid in India give tax credits in Norway.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts claimed from Norway?",
    a: "Bank nominees are only caretakers under Supreme Court rules. Nominees do not own the money. A clear Indian Will names your true heirs. Your family claims bank funds and shares fast without court certificates.",
  },
  {
    q: "How can heirs in Norway repatriate inherited property sale funds?",
    a: "Heirs first update land records using the Will. When selling, they get a Lower TDS Certificate to avoid 20 percent tax cuts. Under RBI rules, heirs can send up to 1 million USD per year to Norway using an NRO account.",
  },
];

const NRI_NORWAY_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
      name: "Will Drafting for NRIs in Norway | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Norway. Protect land, flats, NRE/NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-norway-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Norway Cross-Border Estate Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#legalservice",
      name: "AMA Legal Solutions Norway NRI Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-norway-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Norwegian Arveloven ring-fencing, and Statsforvalteren apostille legal counsel for NRIs and OCIs in Norway.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Norway" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Oslo" },
        { "@type": "City", name: "Bergen" },
        { "@type": "City", name: "Stavanger" },
        { "@type": "City", name: "Trondheim" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#service",
      name: "Indian Will Drafting & Cross-Border Estate Planning for NRIs in Norway",
      serviceType:
        "Cross-Border Succession, Standalone Indian Will Drafting & Statsforvalteren Apostille Advisory",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "Norway",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Norway NRI Estate Planning & Indian Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Norway",
              description:
                "Bespoke Indian Will drafting for residential flats, bank accounts, and demat shares compliant with Section 63 of the Indian Succession Act 1925.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual Estate Will & Statsforvalteren Apostille Protocol",
              description:
                "Comprehensive cross-border Will ring-fencing Indian assets from Norwegian Arveloven pliktdelsarv, complete with Tingrett and Statsforvalteren apostille guidance.",
            },
          },
          {
            "@type": "Offer",
            price: "64990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Net Worth Cross-Border Estate & Asset Repatriation Counsel",
              description:
                "Multi-city Indian property succession, ancestral coparcenary audit, RBI 1 Million USD repatriation planning, and Section 197 Lower TDS advisory.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#howto",
      name: "How NRIs in Norway Execute a Legally Binding Indian Will",
      description:
        "Four-step cross-border legal protocol to draft, execute, and apostille a valid Indian Will from Oslo, Bergen, Stavanger, or Trondheim.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Asset Audit & Cross-Border Mapping",
          "text": "Catalog all Indian assets including residential flats, plots, NRE and NRO bank folios, and Demat accounts to verify title records.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Advocate Drafting & Arveloven Ring-Fencing",
          "text": "Structure a standalone Indian Will under the lex situs doctrine, explicitly ring-fencing Indian assets from Norwegian Arveloven pliktdelsarv claims.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Plain-Paper Execution & Attestation",
          "text": "Sign the Will in Norway on plain A4 paper in the physical presence of two independent adult witnesses who sign as attesting witnesses.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Statsforvalteren Apostille or Embassy Legalization",
          "text": "Notarize signatures before a Norwegian Notarius Publicus and obtain the Hague Apostille from the County Governor (Statsforvalteren) or Embassy in Oslo.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#faq",
      mainEntity: NRI_NORWAY_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway#breadcrumb",
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
          "name": "Will Drafting for NRIs in Norway",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-norway",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    norwegianLaw: "Norwegian Succession Act 2019 (Arveloven)",
    separateWill: "Indian Succession Act 1925 (Lex Situs Rule)",
    worldwideWill: "Conflicting jurisdictional laws across borders",
  },
  {
    feature: "Statutory Forced Heirship",
    norwegianLaw: "Pliktdelsarv: 2/3 share reserved for children up to 15G",
    separateWill: "Zero forced shares; 100% testamentary freedom",
    worldwideWill: "Children may claim pliktdelsarv over Indian estate",
  },
  {
    feature: "Recognition by Indian SROs",
    norwegianLaw: "Not recognized directly by Indian Sub-Registrars",
    separateWill: "100% admissible for municipal mutation and registry",
    worldwideWill: "Rejected until ancillary probate is obtained in India",
  },
  {
    feature: "Probate Procedure in India",
    norwegianLaw: "Foreign skifteattest has no automatic legal standing",
    separateWill: "Direct probate only if property in Mumbai, Kolkata, Chennai",
    worldwideWill: "Mandatory ancillary probate under Section 228 of Act",
  },
  {
    feature: "Estate & Inheritance Tax",
    norwegianLaw: "Abolished in 2014; tax continuity applies",
    separateWill: "No inheritance tax in India; DTAA Article 13 applies",
    worldwideWill: "Risk of double reporting and delayed tax clearances",
  },
  {
    feature: "Bank & Demat folios",
    norwegianLaw: "Norwegian court certificates not accepted by Indian banks",
    separateWill: "Rapid asset transfer under RBI FEMA guidelines",
    worldwideWill: "Accounts remain frozen pending Indian court certificate",
  },
  {
    feature: "Cross-Border Dispute Risk",
    norwegianLaw: "Moderate in Norway; high in Indian civil courts",
    separateWill: "Negligible; ring-fenced clauses protect your heirs",
    worldwideWill: "High; siblings can challenge execution in Indian courts",
  },
];

export default function WillDraftingForNrisInNorwayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_NORWAY_SCHEMA) }}
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
              Will Drafting for NRIs in Norway
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
            1. HERO SECTION (Single Strict H1: 43 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Statsforvalteren Apostille · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 43 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Norway
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Around 28,000 Indians live in Oslo, Bergen, Stavanger, and Trondheim. Norway has a Succession Act called Arveloven. It gives children a forced share of your estate. But Indian land and flats follow Indian law alone under Section 5. Our High Court lawyers draft clean Indian Wills. We keep your Indian wealth safe. We also guide you through the County Governor Hague apostille step.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-xs transition-all"
                >
                  <span>Consult Asset Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#norway-vs-india-succession"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Norway vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Arveloven Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Inheritance Tax</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Statsforvalteren Apostille</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single Strict H2 (51 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Single Worldwide Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Norwegian Arveloven &amp; Pliktdelsarv Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Norwegian Pliktdelsarv Forced Claims:</strong> Section 50 of Arveloven gives children a two-thirds share. A single global Will puts your Indian flats at risk. Foreign heirs may claim shares in court.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>No Direct Indian SRO Recognition:</strong> Indian land registries reject Norwegian probate orders. Heirs must file new court cases in India. This causes years of costly delay.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Frozen Banking &amp; Demat Portfolios:</strong> Nominees do not own your bank money under Supreme Court rules. Indian banks freeze accounts without a Will. Families must get costly court papers.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Master Succession Hub &amp; Legal Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PLAIN-ENGLISH SUMMARY CARDS (Rule 9 Readability Optimization)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Why Write an Indian Will Now?
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                You protect your flats and land in India. Court cases in India take
                many years to finish. A clean Will lets your heirs take over peacefully.
                We help you write a clear Will. Your wealth stays safe. Your family avoids long court fights.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Who Needs This Legal Help?
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                Any Indian in Norway who owns a flat, plot, bank balance, or mutual
                funds in India. It helps energy engineers, IT specialists, and shipping pros. You can
                sign your Will in Norway before two adult witnesses. You do not need Indian stamp paper.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                How Our Lawyers Help You
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                Our High Court advocates draft an ironclad Will under Indian law.
                We ring-fence your assets against Norwegian forced heirship. We guide
                you through Notarius Publicus and Statsforvalteren apostilles so your heirs face zero roadblocks.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriNorwayWillInteractive />

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
              Visual Legal Framework: Norway Estate vs Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How our High Court lawyers protect your Indian land. We draft clear Wills. We secure your bank folios. We help you get the Norwegian Hague apostille.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-norway.jpg"
              alt="Will Drafting for NRIs in Norway Cross-Border Estate Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Cross-border legal estate planning
                architecture for NRIs and OCIs residing in Norway.
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
        <section id="norway-vs-india-succession" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Norway Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Relying on foreign rules causes heavy court delays. Norwegian forced shares may hurt your plans. Compare how assets are treated under Norwegian law, an Indian Will, and a single worldwide Will:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Norwegian Law (Arveloven)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Standalone Indian Will
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Single Worldwide Will
                    </th>
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
                        {row.norwegianLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.separateWill}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.worldwideWill}
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
              4-Step Succession Protocol for NRIs in Norway
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow our proven legal steps to sign a valid Indian Will. You can complete all steps without leaving Norway:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Genealogic Audit",
                desc: "We verify local property tax IDs, registered sale deeds, bank accounts, and demat shares across India. We ensure all property title is clear.",
              },
              {
                step: "02",
                title: "Advocate Drafting & Ring-Fencing",
                desc: "Our lawyers draft your Will with border clauses. We separate Indian assets from Norwegian rules. Your Indian land stays free from forced share claims.",
              },
              {
                step: "03",
                title: "Plain-Paper Attestation",
                desc: "You print the draft on plain A4 paper in Norway. You sign before two adult witnesses under Section 63. You do not need Indian stamp paper. Your Will is valid at once.",
              },
              {
                step: "04",
                title: "Apostille or Embassy Seal",
                desc: "You notarize signatures before a Norwegian notary. You get the Hague Apostille from the County Governor. Indian land offices accept apostilled papers without delay.",
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
            6. ESSENTIAL LEGAL CLAUSE & STATSFORVALTEREN CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Separate Indian Will: Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Norwegian law gives children forced shares. Your Indian Will must have clear border clauses. This keeps your Indian land under Indian law alone:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Lex Situs Ring-Fencing Clause
                  </span>
                  <span>Standalone Indian Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament
                  pertains exclusively and solely to my assets, properties
                  (movable and immovable), bank folios, demat accounts, and
                  securities situated within the territory of the Republic of
                  India. Under the doctrine of lex situs codified in Section 5 of
                  the Indian Succession Act, 1925, succession to immovable
                  property situated in India is governed exclusively by Indian law.
                  This Will does not revoke, amend, or alter any separate Will or
                  testamentary disposition executed by me in Norway or elsewhere
                  governing my foreign estate, nor shall any foreign forced
                  heirship provisions, including pliktdelsarv under the Norwegian
                  Succession Act 2019, apply to my Indian properties.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Each cross-border Will must be custom-drafted to mirror
                  your exact property titles, Demat folios, and family branches.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Statsforvalteren &amp; Embassy Legalization Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Ensure flawless evidentiary acceptance before Indian
                  authorities:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Neutral witnesses who
                      are not named as beneficiaries or executors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Notarius Publicus Stamp:</strong> Signature
                      verification by a Norwegian District Court (Tingrett) notary.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Statsforvalteren Apostille:</strong> Hague Apostille
                      from the County Governor in Oslo, Vestland, or Rogaland.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Doctor Fitness Certificate:</strong> Medical memo
                      confirming sound mental capacity to prevent Will challenges.
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

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex items-start justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Calculate Indian capital gains tax on inherited properties
                    and verify deductions under Section 54 of the Income Tax Act.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors shrink-0"
              >
                <span>Calculate Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex items-start justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI TDS &amp; 15CA/15CB Repatriation Calculator
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Estimate withholding tax under Section 195 and map your
                    1 Million USD remittance pathway to Norwegian bank accounts.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors shrink-0"
              >
                <span>TDS Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ANCESTRAL PROPERTY & ARVELOVEN CONFLICT SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Statutory Conflict of Laws</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Norwegian Arveloven &amp; Indian Lex Situs Assets
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 50 of the Norwegian Arveloven, children have forced heirship rights called pliktdelsarv. This gives them two-thirds of an estate. But under Section 5 of the Indian Succession Act 1925, Indian land and flats follow Indian law alone. Foreign rules cannot control land in India.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Indian courts do not enforce foreign forced shares over your self-earned assets. You have 100 percent freedom to gift your wealth under Section 59. For ancestral land, Section 6 of the Hindu Succession Act gives daughters equal birth rights. Our lawyers balance both legal systems. We keep your family safe from court fights.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Lawyer Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for Self-Acquired Assets</span>
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
              <span>Norway Succession FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Norway
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear cross-border legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_NORWAY_FAQS.map((item, idx) => (
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
                Related Indian Succession &amp; Cross-Border Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related services, repatriation guides, and site directory:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Release Deed (Haq Tyag) Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate &amp; Will Letters of Administration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Inherited Property Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>HTML Sitemap Directory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Sitemap Filter</span>
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
            <p className="text-xs sm:text-[13.5px] text-[#55636D] leading-relaxed max-w-3xl">
              This cross-border legal guide is prepared under the Indian
              Succession Act, 1925, the Norwegian Succession Act 2019
              (Arveloven), the Hague Apostille Convention 1961, and the
              India-Norway Double Tax Avoidance Agreement. Precedents cited
              include Sarbati Devi v. Usha Devi (AIR 1984 SC 346) and Vineeta
              Sharma v. Rakesh Sharma (2020 SC). This content is educational
              and does not replace individualized advocate counsel.
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
