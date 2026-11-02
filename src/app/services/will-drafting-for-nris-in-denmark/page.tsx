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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriDenmarkWillInteractive from "@/components/NriDenmarkWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Denmark | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Denmark. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in denmark",
    "nri will drafting services denmark",
    "indian will for nri in denmark",
    "make a will for indian property from denmark",
    "indian inheritance lawyer denmark",
    "danish inheritance act arveloven indian assets",
    "copenhagen nri property succession lawyer",
    "udenrigsministeriet apostille indian will denmark",
    "eu brussels iv opt out denmark dual will",
    "nro account inheritance repatriation denmark",
    "dtaa india denmark inherited property capital gains",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Denmark | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Denmark. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-denmark-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Denmark Danish Arveloven Succession Harmonization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Denmark | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Denmark. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-denmark-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_DENMARK_FAQS = [
  {
    q: "Does the Danish Inheritance Act (Arveloven) apply to my property in India?",
    a: "Indian real estate follows Indian law under Section 5. Danish Arveloven rules do not govern Indian land or flats. But without an Indian Will, Danish courts may try worldwide probate. A separate Indian Will protects your Indian assets. It stops cross-border delays.",
  },
  {
    q: "Why does Denmark opt-out from EU Brussels IV matter for my Indian Will?",
    a: "Denmark opted out of EU Regulation 650/2012 (Brussels IV). You cannot make an EU choice-of-law declaration in Denmark. Danish courts use local domicile rules. You need two separate wills. Use one Danish Will for assets in Denmark. Use a separate Indian Will for assets in India.",
  },
  {
    q: "Can NRIs in Denmark execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper in Denmark. You do not need Indian stamp paper while abroad. You only need two adult witnesses who watch you sign. Your witnesses must not be beneficiaries named in the Will.",
  },
  {
    q: "Is a Danish notarial Will (Notartestamente) accepted by Indian land registries?",
    a: "Indian land offices often reject Danish wills. A foreign will requires Indian court probate and an apostille before local officers accept it. This process can take years. Drafting a dedicated Indian Will avoids these court delays entirely.",
  },
  {
    q: "Do bank nominees automatically become the owners of Indian bank accounts?",
    a: "No. The Supreme Court of India ruled in Sarbati Devi and Shakti Yezdani that bank nominees are only temporary custodians. Nominees hold the funds in trust for the legal heirs. A valid Indian Will clearly names your chosen heirs and ensures seamless bank transmission.",
  },
  {
    q: "Does India or Denmark levy inheritance tax on inherited property in India?",
    a: "India abolished estate duty in 1985. There is zero inheritance tax in India. Denmark levies an estate tax called boafgift on worldwide assets for Danish residents. Under the India-Denmark tax treaty, capital gains on Indian land are taxed in India. Foreign tax credits may apply in Denmark.",
  },
  {
    q: "How can NRI heirs in Denmark repatriate sale proceeds from inherited Indian property?",
    a: "Heirs in Denmark can send up to 1 million USD per financial year from an NRO account under RBI rules. The bank needs Form 15CA and Form 15CB certified by an Indian Chartered Accountant. A Section 197 Lower TDS Certificate helps avoid high tax cuts.",
  },
  {
    q: "Why should I have separate Wills for Denmark and India instead of one joint Will?",
    a: "A single global Will must go through probate in both countries. Danish probate through Skifteretten takes months. Indian courts also demand certified translations and ancillary probate. Separate wills allow fast administration in both Denmark and India without holdups.",
  },
];

const NRI_DENMARK_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
      name: "Will Drafting for NRIs in Denmark | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Denmark. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-denmark-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Denmark Danish Arveloven Succession Harmonization",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#legalservice",
      name: "AMA Legal Solutions NRI Denmark Cross-Border Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-denmark-og.jpg",
      description:
        "Cross-border Indian testamentary estate planning for NRIs, PIOs, and OCIs living in Denmark. Specializing in Danish Arveloven ring-fencing, Ministry of Foreign Affairs apostille guidance, and RBI FEMA compliance.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Denmark" },
        { "@type": "City", name: "Copenhagen" },
        { "@type": "City", name: "Aarhus" },
        { "@type": "City", name: "Odense" },
        { "@type": "City", name: "Aalborg" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#service",
      name: "Indian Will Drafting for NRIs in Denmark",
      serviceType:
        "Cross-Border Indian Estate Planning, Arveloven Ring-Fencing & Succession Services",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Denmark" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Denmark Succession Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Will for NRIs in Denmark",
              description:
                "Complete advocate-drafted Indian Will with geographic ring-fencing to exclude Danish Arveloven forced heirship and secure Indian property.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Harmonized Denmark-India Dual Will Framework",
              description:
                "Dual-will drafting coordinating Danish testamente and Indian Will to prevent revocation, with Ministry of Foreign Affairs apostille guidance.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Senior Advocate High Court Estate & Repatriation Advisory",
              description:
                "End-to-end estate representation including Section 197 Lower TDS advisory, Form 15CA/15CB repatriation planning, and High Court probate support.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#howto",
      name: "How NRIs in Denmark Draft and Execute a Legally Enforceable Indian Will",
      description:
        "Step-by-step statutory protocol to draft, sign, and validate an Indian Will from Copenhagen, Aarhus, or anywhere in Denmark.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Indian Asset Inventory & Title Verification",
          text: "Catalog all immovable and movable assets in India, including registered sale deeds, Demat DP client IDs, and NRE/NRO bank account folios.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Arveloven Ring-Fencing",
          text: "Our High Court advocates draft your Indian Will with explicit clauses ring-fencing Indian assets and preventing Danish Arveloven forced heirship claims.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Execution in Denmark with Two Witnesses",
          text: "Execute the Will on plain paper before two neutral adult witnesses in Denmark under Section 63 of the Indian Succession Act, 1925.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Optional Danish Notary & UM Apostille Certification",
          text: "Optionally certify before a Danish Court Notary (Notar) and obtain a Hague Apostille from the Danish Ministry of Foreign Affairs (Udenrigsministeriet).",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#faq",
      mainEntity: NRI_DENMARK_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark#breadcrumb",
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
          name: "Will Drafting for NRIs in Denmark",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-denmark",
        },
      ],
    },
  ],
};

const DENMARK_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    denmarkLaw: "Danish Inheritance Act (Arveloven Act No. 515/2007)",
    indianLaw: "Indian Succession Act, 1925 (Section 5 & 59)",
    impactOnNri:
      "Indian realty strictly follows Indian law under the lex situs rule.",
  },
  {
    feature: "Forced Heirship (Tvangsarv)",
    denmarkLaw: "25% compulsory share for spouse and direct children",
    indianLaw: "Zero forced heirship; 100% testamentary freedom",
    impactOnNri:
      "Separate Indian Will prevents Danish forced claims on Indian land.",
  },
  {
    feature: "EU Brussels IV Application",
    denmarkLaw: "Opt-out under Protocol 22; EU regulation does not apply",
    indianLaw: "Independent statutory framework; lex situs applies",
    impactOnNri:
      "Requires dual-will setup because EU choice-of-law is unavailable.",
  },
  {
    feature: "Execution Formalities",
    denmarkLaw: "Court Notary (Notar) or two testament witnesses",
    indianLaw: "Two independent adult witnesses under Section 63",
    impactOnNri:
      "NRIs can sign on plain A4 paper in Denmark without travelling to India.",
  },
  {
    feature: "Cross-Border Apostille",
    denmarkLaw: "Udenrigsministeriet Apostille under 1961 Convention",
    indianLaw: "Recognized by High Courts under Hague Convention",
    impactOnNri:
      "Ministry apostille provides strong evidential proof across Indian courts.",
  },
  {
    feature: "Estate Duty & Death Taxes",
    denmarkLaw: "15% to 36.25% estate tax (Boafgift) on net estate",
    indianLaw: "Zero estate duty or inheritance tax in India",
    impactOnNri:
      "Indian wealth transfers tax-free; capital gains tax applies upon resale.",
  },
  {
    feature: "Bank & Demat Asset Claims",
    denmarkLaw: "Danish Probate Court (Skifteretten) certificates",
    indianLaw: "Nominee transmission or probate under Indian law",
    impactOnNri:
      "Indian Will naming heirs avoids costly Indian succession certificates.",
  },
];

export default function NriDenmarkWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_DENMARK_SCHEMA) }}
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
              Will Drafting for NRIs in Denmark
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
            1. HERO SECTION (Single Strict H1: 40 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Denmark-India Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 40 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Denmark
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 20,000 Indians live in Denmark. Many work in pharma, IT, and shipping across Copenhagen, Aarhus, and Odense. Denmark opted out of EU Brussels IV rules. EU choice-of-law options do not apply here. Danish Arveloven gives children a 25 percent forced share. But Indian land follows Indian law under Section 5. Our High Court lawyers draft clean Indian wills. We protect your flats, plots, and bank accounts from foreign court delays.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#denmark-vs-india-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Denmark vs India Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Brussels IV Opt-Out Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Arveloven Ring-Fencing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Copenhagen Apostille Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (41 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Global Danish Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Danish Arveloven &amp; Lex Situs Conflict
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Danish 25% Forced Share (Tvangsarv):</strong> Under
                    Arveloven Section 5, spouses and children get forced shares.
                    A single global Will invites foreign claims on your Indian
                    ancestral or self-acquired land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Brussels IV Opt-Out Gap:</strong> Denmark is not bound
                    by EU Succession Regulation 650/2012. You cannot use EU
                    choice-of-law clauses. You must use separate wills for each country.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian Land Office Rejections:</strong> Indian sub-registrars
                    reject foreign Danish wills. Getting probate in India for a
                    foreign Will takes years and heavy legal fees.
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
                Any Indian in Denmark who owns a flat, plot, bank balance, or mutual
                funds in India. It helps pharma scientists, IT engineers, and shipping
                executives. You can sign your Will in Denmark. Two adult friends witness
                your signature. You do not need Indian stamp paper.
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
                We draft an Indian Will that fits your needs. We add clear clauses
                so Danish rules do not hurt your Indian assets. We guide you on
                notary and apostille steps in Denmark. We also guide your family on bank
                claims and sending money back to Denmark.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriDenmarkWillInteractive />

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
              Visual Legal Framework: Denmark vs India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted by High Court lawyers protects
              your Indian assets, harmonizes with Danish succession law, and prevents
              cross-border family disputes:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-denmark.jpg"
              alt="Will Drafting for NRIs in Denmark Danish Arveloven Succession Harmonization"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Denmark under the Indian Succession Act, 1925.
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
        <section id="denmark-vs-india-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Legal Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Denmark Arveloven vs Indian Succession Act
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to understand the difference between Danish inheritance
              law and Indian law causes heavy court delays. Compare key legal
              rules below:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Feature</th>
                    <th className="py-4 px-6 w-[27%]">
                      Danish Law (Arveloven 2007)
                    </th>
                    <th className="py-4 px-6 w-[27%]">
                      Indian Law (Succession Act 1925)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Impact on NRIs in Denmark
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {DENMARK_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.denmarkLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.impactOnNri}
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
              Legal 4-Step Denmark NRI Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers handle your estate planning from Denmark.
              Follow this structured 4-step path to secure your Indian wealth:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Title Audit",
                desc: "We review your registered sale deeds, Demat accounts, and bank folios across India to confirm clean legal titles.",
              },
              {
                step: "02",
                title: "Advocate Drafting",
                desc: "Our lawyers draft your Indian Will with clear clauses that separate Indian assets from Danish inheritance rules.",
              },
              {
                step: "03",
                title: "Denmark Signing",
                desc: "You sign on plain paper in Denmark before two witnesses. We guide you on Danish notary and Ministry apostille steps.",
              },
              {
                step: "04",
                title: "Indian Registration",
                desc: "We provide custody storage in India and guide your family on asset mutation and sending funds back to Denmark.",
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
            6. ESSENTIAL LEGAL CLAUSE & VERIFICATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Geographic Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A standard Will template fails cross-border scrutiny. Without an
              explicit geographic limit, your Indian Will might accidentally revoke
              your Danish Will, or your Danish estate might interfere with Indian
              assets. Our lawyers use tested clauses like this:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Geographic Ring-Fencing Clause
                  </span>
                  <span>Non-Conflict Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament applies
                  strictly and exclusively to all my movable and immovable properties,
                  assets, rights, and bank accounts situated within the Republic of
                  India. This Will shall not revoke, alter, or impact any separate
                  testamentary disposition or Will executed by me governing my
                  assets situated in the Kingdom of Denmark or other foreign
                  jurisdictions. All Indian properties shall devolve strictly under
                  the Indian Succession Act, 1925.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Our advocates tailor this clause to match your specific
                  family structure, ensuring zero clash with Danish Arveloven rules.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Denmark NRI Will Verification Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps before executing your Indian Will from Denmark:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Witnesses:</strong> Two adult witnesses who are
                      not heirs named in the Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Clean Boundary Details:</strong> Exact survey numbers,
                      sale deeds, and undivided share (UDS).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank &amp; Demat Folios:</strong> Complete 16-digit Demat
                      client IDs and NRE/NRO branch details.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Foreign Ministry Apostille:</strong> Hague Apostille
                      from Udenrigsministeriet for extra proof.
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
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Tax Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate indexation benefits, acquisition costs, and net tax
                    liability under Indian tax laws when selling inherited land.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Evaluate Section 195 TDS rates, Form 15CA/15CB thresholds, and
                    repatriation limits to Danish bank accounts.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open TDS Repatriation Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. IN-DEPTH LEGAL ANALYSIS SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Private International Law &amp; RBI Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Danish EU Opt-Out &amp; RBI Fund Transmission
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Protocol No. 22 on the Position of Denmark, EU Succession
                Regulation No. 650/2012 does not apply in Denmark. This means Danish
                residents cannot choose Indian law for Danish assets under EU rules.
                However, under Section 5 of the Indian Succession Act, Indian real
                estate is strictly governed by the law of India (lex situs).
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                When heirs in Denmark inherit property in India, they can sell the
                asset and repatriate up to 1 million USD per financial year via an
                NRO bank account. Our advocates coordinate with Indian Chartered
                Accountants to issue Form 15CA and 15CB certificates, apply for
                Section 197 Lower TDS certificates, and secure smooth transmission
                without lengthy court probate.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Legal Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Indian Will Online</span>
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
              <span>Cross-Border Succession FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Denmark NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_DENMARK_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, tools, and the comprehensive sitemap:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Will Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
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
                <span>High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Explore Full Sitemap (All)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Directory Sitemap</span>
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
              This cross-border legal guide is prepared under the Indian Succession
              Act, 1925, the Danish Inheritance Act (Arveloven Act No. 515/2007),
              the Hague Apostille Convention 1961, and RBI Foreign Exchange
              Management Regulations. Precedents cited include Sarbati Devi v.
              Usha Devi (AIR 1984 SC 346) and Shakti Yezdani v. Jayanand Jayant
              Salgaonkar (2023 INSC 1083). This content provides educational guidance
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
