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
import NriGreeceWillInteractive from "@/components/NriGreeceWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Greece | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Greece. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in greece",
    "nri will drafting services greece",
    "indian will for nri in greece",
    "make a will for indian property from greece",
    "indian inheritance lawyer greece",
    "brussels iv article 22 choice of law india",
    "greek civil code forced heirship indian assets",
    "athens thessaloniki crete nri property lawyer",
    "protodikeio apostille indian will greece",
    "nro account inheritance repatriation greece",
    "dtaa india greece inherited property tax",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Greece | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Greece. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-greece-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Greece Brussels IV Article 22 Choice of Law Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Greece | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Greece. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-greece-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_GREECE_FAQS = [
  {
    q: "Does EU Brussels IV Regulation apply to NRIs in Greece?",
    a: "Yes. Under EU Regulation 650/2012 Article 21, living in Athens, Thessaloniki, or Crete defaults your estate to Greek law. This puts your Indian assets under Greek court rules. But Article 22 allows you to choose Indian law in your Will. This keeps your Indian land, flats, and bank accounts under Indian courts.",
  },
  {
    q: "What is Greek forced heirship and does it affect India?",
    a: "Greek Civil Code Articles 1825 to 1830 set forced shares (Nomimi Moira) of up to 50% for children, spouses, and parents. Under Section 59 of the Indian Succession Act, you have 100% freedom over your self-made wealth. Choosing Indian law stops Greek forced share claims against your Indian estate.",
  },
  {
    q: "Can NRIs in Greece sign an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper in Greece. You do not need Indian stamp paper. You only need two adult witnesses who watch you sign. Your witnesses must not be beneficiaries named in the Will.",
  },
  {
    q: "Do I need a Greek Notary or Protodikeio court apostille?",
    a: "Two adult witnesses make your Will valid under Indian law. But an attestation by a Greek Notary (Symvolaiografos) and an apostille from the Greek Court (Protodikeio) give strong legal proof. You can also attest the Will before the Embassy of India in Athens.",
  },
  {
    q: "Why should NRIs in Greece avoid a single worldwide Will?",
    a: "A single worldwide Will causes court delays. Greek probate orders are not accepted directly by Indian land registries or banks. Indian courts ask for local probate under Section 228 with Greek translations. Having two separate Wills lets both estates settle fast without court roadblocks.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts claimed?",
    a: "Bank and demat nominees act only as temporary caretakers under the Supreme Court Sarbati Devi ruling. Nominees do not own the money. A clear Indian Will names your true heirs. This lets your family claim bank balances and shares quickly without a court succession certificate.",
  },
  {
    q: "Does Greece or India levy inheritance tax on property?",
    a: "India ended inheritance tax in 1985. You inherit Indian properties tax-free. When selling inherited land later, capital gains tax applies. Under the India-Greece tax treaty, taxes paid in India can be credited against Greek taxes.",
  },
  {
    q: "How can heirs in Greece sell property and repatriate funds?",
    a: "Heirs first update land records using the Will. When selling, they get a Lower TDS Certificate under Section 197 to avoid high 20% tax cuts. Under RBI rules, heirs can transfer up to 1 million USD per year to Greece using Form 15CA and Form 15CB.",
  },
];

const NRI_GREECE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
      name: "Will Drafting for NRIs in Greece | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Greece. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-greece-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Greece Brussels IV Article 22 Choice of Law Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#legalservice",
      name: "AMA Legal Solutions Greece-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-greece-og.jpg",
      description:
        "Cross-border Indian Will drafting, EU Brussels IV Article 22 election of Indian law, Protodikeio apostille authentication, and asset transmission counsel for NRIs in Greece.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Greece" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Athens" },
        { "@type": "City", name: "Thessaloniki" },
        { "@type": "City", name: "Heraklion" },
        { "@type": "City", name: "Patras" },
        { "@type": "City", name: "Larissa" },
        { "@type": "City", name: "Volos" },
        { "@type": "City", name: "Chania" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#service",
      name: "Indian Will Drafting Services for NRIs in Greece",
      serviceType:
        "Cross-Border Succession, EU Brussels IV Harmonization & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Greece" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Greece Will Drafting & Succession Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Greece",
              description:
                "Complete Indian Will drafting with clear territorial clauses, plain-paper signing steps, and municipal land transfer help.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Greece-India Ring-Fenced Architecture",
              description:
                "Coordinated cross-border estate planning keeping Greek assets separate from Indian land, preventing court clashes and double probate delays.",
            },
          },
          {
            "@type": "Offer",
            price: "64990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Advocate Cross-Border Estate & Execution Counsel",
              description:
                "Full legal support including Greek Notary apostille guidance, Indian embassy attestation advice, and High Court probate representation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#howto",
      name: "How NRIs in Greece Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory path to draft, ring-fence, and execute an ironclad Indian Will while living in Greece under the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule & Title Verification",
          text: "List all Indian properties, demat folios, mutual funds, and bank accounts with exact registered deed details, municipal tax IDs, and bank IFSC numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Brussels IV Art. 22 Choice & Ring-Fencing Drafting",
          text: "High Court lawyers draft an Indian Will with clear territorial clauses under Section 59 of the Indian Succession Act, electing Indian law under Article 22.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper or Apostille Execution in Greece",
          text: "Print the draft on plain paper. Sign before two adult witnesses in Greece, with optional Greek Notary attestation and Protodikeio court apostille.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & India Executor Briefing",
          text: "Send signed original copies to your chosen executors in India. Store digital backups. Prepare clear steps for local land revenue offices.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#faq",
      mainEntity: NRI_GREECE_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece#breadcrumb",
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
          name: "Will Drafting for NRIs in Greece",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-greece",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Default Governing Succession Law",
    greeceLaw: "Greek Civil Code via Habitual Residence (EU Reg 650/2012 Art. 21)",
    indianLaw: "Indian Succession Act, 1925 applies to Indian land (Lex Situs)",
    ringFenced: "Article 22 election ensures Indian law governs Indian assets",
  },
  {
    feature: "Forced Heirship Rules",
    greeceLaw: "Nomimi Moira reserves 50% statutory share for children/spouse",
    indianLaw: "Zero forced heirship; 100% testamentary freedom under Section 59",
    ringFenced: "Ring-fencing isolates Indian real estate from Greek forced claims",
  },
  {
    feature: "Will Execution Formalities",
    greeceLaw: "Holographic, public notarial, or secret Will before Greek notary",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    ringFenced: "Signed in Greece on plain paper with optional Protodikeio apostille",
  },
  {
    feature: "Bank & Demat Asset Transmission",
    greeceLaw: "Requires Greek court certificate of inheritance (Klironomitirio)",
    indianLaw: "Sarbati Devi rule applies; nominee acts only as interim trustee",
    ringFenced: "Direct transmission via Will without waiting for Indian court orders",
  },
  {
    feature: "Immovable Property Mutation",
    greeceLaw: "Foreign Greek court orders not recognized by Indian Sub-Registrars",
    indianLaw: "Revenue mutation under state land laws and municipal corporation rules",
    ringFenced: "Fast Tehsildar and municipal property tax transfer across India",
  },
  {
    feature: "Court Probate Requirement",
    greeceLaw: "Greek Court of First Instance (Protodikeio) publication of Will",
    indianLaw: "Probate mandatory only in Mumbai, Kolkata, Chennai (Section 57/213)",
    ringFenced: "Parallel settlement in Greece and India without cross-border delay",
  },
  {
    feature: "Capital Gains & Fund Repatriation",
    greeceLaw: "Greek tax reporting applies; India-Greece DTAA avoids double tax",
    indianLaw: "Zero inheritance tax in India; Section 197 lower TDS on property sale",
    ringFenced: "Full tax transparency for Section 197 TDS and Form 15CA/15CB remittance",
  },
];

export default function WillDraftingForNrisInGreecePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_GREECE_SCHEMA) }}
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
              Will Drafting for NRIs in Greece
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
                  High Court Lawyers · Brussels IV Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Greece
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 35,000 Indians live across Athens, Thessaloniki, and Crete.
                Under EU Brussels IV rules, your succession defaults to Greek law.
                Without an Indian Will, Greek court orders face huge delays in
                India. You can avoid this easily. A standalone Indian Will
                protects your flats, ancestral lands, and bank deposits. Our High
                Court lawyers draft clear Wills for peaceful asset transfer.
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
                  href="#greece-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Greece vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Brussels IV Art. 22 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Protodikeio Court Apostille</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Nomimi Moira Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 61 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Combined Worldwide Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Greece NRI Estate Risks: Cross-Border Land &amp; Asset Protection
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Brussels IV Habitual Residence Default:</strong> Under
                    EU Regulation 650/2012 Article 21, living in Greece defaults your
                    entire worldwide estate to Greek law. Greek courts cannot
                    directly update Indian land registers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Greek Forced Heirship (Nomimi Moira):</strong> Greek
                    Civil Code Articles 1825 to 1830 reserve forced shares of up to
                    50% for children and spouses. Electing Indian law protects
                    your Indian wealth from forced claims.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian High Court Probate Delays:</strong> Indian land
                    offices reject foreign Greek court orders. Getting ancillary
                    probate in India takes years and needs Greek translations.
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
                Any Indian in Greece who owns a flat, plot, bank balance, or mutual
                funds in India. It helps shipping professionals, business owners, and workers. You can
                sign your Will in Greece. Two adult friends witness your signature. You do
                not need Indian stamp paper.
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
                We draft your Will under Indian law and EU rules. You sign it in
                Greece with two witnesses. We guide you on Protodikeio court apostilles.
                We also help your family update Indian land records. Our lawyers make the
                entire process simple and safe.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriGreeceWillInteractive />

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
              Visual Legal Framework: Greece-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, harmonizes EU Brussels IV rules
              with the Indian Succession Act, and enables swift asset transmission:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-greece.jpg"
              alt="Will Drafting for NRIs in Greece Brussels IV Article 22 Choice of Law Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Greece under EU Brussels IV and the Indian Succession Act.
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
        <section id="greece-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Greece vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to ring-fence Indian assets exposes your family to Greek
              court delays, translation costs, and conflicting jurisdictions.
              Compare how succession operates across both legal frameworks:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Greek Succession Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act, 1925</th>
                    <th className="py-4 px-6 w-[26%]">Dual-Will Ring-Fencing</th>
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
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.greeceLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#172228] font-semibold">
                        {row.ringFenced}
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
              <span>Cross-Border Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step Greece NRI Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers handle the entire cross-border succession
              lifecycle. Follow this 4-step path to secure your Indian wealth:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Step 1: Schedule & Title Verification",
                desc: "We review your sale deeds, tax bills, bank accounts, and demat folios in India. We verify every property detail with care.",
              },
              {
                step: "02",
                title: "Step 2: Brussels IV Art. 22 Election",
                desc: "Our lawyers draft your Will with clear territorial clauses. We elect Indian law and protect your Greek assets from conflict.",
              },
              {
                step: "03",
                title: "Step 3: Plain-Paper or Apostille Signing",
                desc: "You print the draft on plain paper. You sign before two adult witnesses in Greece. We guide you on notarial seals.",
              },
              {
                step: "04",
                title: "Step 4: Executor Briefing & Mutation SOP",
                desc: "We give your executors in India clear steps for land mutation, bank account claims, and RBI fund repatriation.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Phase {item.step}
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
              Copy-Pasteable Greece-India Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear territorial clause, cross-border court orders cause delays.
              Our advocates structure clean clauses to protect and isolate your Indian property:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Territorial Ring-Fencing Recital
                  </span>
                  <span>Autonomous Indian Testament</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I, [Testator Full Legal Name], residing in [City, Hellenic
                  Republic of Greece], holding [Indian / Greek] Passport No. [Passport Number]
                  [and OCI Card No. [OCI Number]], hereby declare that this Last Will
                  and Testament shall govern exclusively all my immovable and movable
                  properties, bank accounts, fixed deposits, demat folios, mutual
                  funds, and assets situated in the Republic of India. In accordance
                  with Section 5 and Section 59 of the Indian Succession Act, 1925,
                  and Article 22 of EU Regulation No 650/2012 (Brussels IV professio
                  juris principle), I expressly elect the laws of the Republic of India
                  to govern the succession and administration of my entire Indian estate.
                  This Will is executed as an autonomous testamentary instrument and shall
                  not revoke, cancel, or supersede any separate Will executed by me
                  in the Hellenic Republic regarding my Greek assets.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: If you hold Greek citizenship or an OCI card, our High
                  Court advocates customize this clause to preserve Indian
                  succession autonomy under international private law.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Greece-India Succession Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Greece and India:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Sign in the presence
                      of two witnesses who are not named as heirs in the Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>No Indian Stamp Paper:</strong> Execution on plain A4
                      paper is 100% valid under Section 63 of the Indian Succession Act.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Greek Notary &amp; Apostille:</strong> Greek Notary
                      attestation and Protodikeio court apostille confirm genuine signing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule Identification:</strong> List exact survey
                      numbers, flat unit numbers, and bank account IFSC details.
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

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate indexation benefits, Section 54 deductions, and
                    capital gains tax liability before selling inherited Indian real estate.
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

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Section 195 withholding tax, Section 197 lower TDS
                    certificates, and Form 15CA/15CB outward remittance quotas.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Repatriation TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CROSS-BORDER TAXATION & REPATRIATION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Taxation &amp; FEMA Repatriation Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Cross-Border Taxation &amp; Fund Repatriation
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Neither India nor Greece levies estate duty on inherited Indian assets. You
                inherit Indian assets tax-free. But selling real estate later brings
                capital gains tax. Indian buyers must deduct tax under Section 195.
                Our legal team helps you get a Lower TDS Certificate under Section 197.
                This saves you from high tax cuts upfront.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under RBI rules, heirs can transfer up to 1 million USD per year to
                Greece. You use an NRO bank account with Form 15CA and Form 15CB. Under
                the India-Greece tax treaty, double tax is avoided.
                Taxes paid in India can be credited against Greek tax liabilities.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult Cross-Border Lawyer</span>
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
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Greece
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_GREECE_FAQS.map((item, idx) => (
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
                Related Cross-Border Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI legal services, statutory guides, and the
                complete directory index:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>All Legal Services</span>
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
                <span>WillDrafting Sitemap (All Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Services Filter</span>
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
              Succession Act, 1925, Greek Civil Code (Astikos Kodikas Book V),
              EU Regulation No 650/2012 (Brussels IV), the Foreign Exchange
              Management Act (FEMA), 1999, and the 1961 Hague Apostille
              Convention. Judicial authorities referenced include lex situs
              under Section 5/59 and the Supreme Court ruling in Sarbati Devi.
              This content provides legal education and does not replace
              personalized advocate counsel.
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
