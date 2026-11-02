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
import NriPolandWillInteractive from "@/components/NriPolandWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Poland | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Poland. Protect assets in India under Indian Succession Act with cross-border succession law experts.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in poland",
    "nri will drafting services poland",
    "indian will for nri in poland",
    "make a will for indian property from poland",
    "indian inheritance lawyer poland",
    "brussels iv article 22 choice of law poland",
    "polish civil code kodeks cywilny zachowek indian assets",
    "warsaw krakow wroclaw poznan nri property lawyer",
    "polish notary notariusz msz apostille indian will",
    "nro account inheritance repatriation poland",
    "dtaa india poland inherited property tax",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Poland | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Poland. Protect assets in India under Indian Succession Act with cross-border succession law experts.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-poland-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Poland Brussels IV Article 22 Choice of Law Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Poland | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Poland. Protect assets in India under Indian Succession Act with cross-border succession law experts.",
    images: ["/images/will-drafting-for-nris-in-poland-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_POLAND_FAQS = [
  {
    q: "Does EU Succession Regulation (Brussels IV) apply to NRIs in Poland?",
    a: "Yes. Under Article 21 of EU Regulation 650/2012, your habitual residence in Poland defaults your estate to Polish law. This covers cities like Warsaw, Kraków, and Wrocław. But Article 22 lets Indian citizens choose Indian law for their Indian estate. This protects your Indian land, flats, and wealth. It keeps your estate under Indian succession courts.",
  },
  {
    q: "What is Polish zachowek and how does it affect Indian assets?",
    a: "Polish forced heirship is called zachowek under Articles 991 to 1011 of the Polish Civil Code. It gives children, spouse, and parents a mandatory cash claim. This claim equals half or two-thirds of their legal share. Electing Indian law under Article 22 protects your Indian assets. It stops these forced money claims completely.",
  },
  {
    q: "Can NRIs in Poland execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper. You do not need Indian stamp paper while living abroad. You only need two adult witnesses who watch you sign. Your witnesses must not be heirs named in the Will. This makes signing in Poland fast and legal.",
  },
  {
    q: "Do I need a Polish Notary certification or MSZ apostille in Poland?",
    a: "Two adult witnesses make your Will legally valid in India. But getting a signature seal from a Polish Notary (Notariusz) gives strong proof. You can also get an apostille from the Polish Foreign Ministry (MSZ). It stops family disputes in Indian courts before they begin. Our team guides you on every step.",
  },
  {
    q: "Does Poland levy inheritance tax on inherited properties located in India?",
    a: "Poland taxes inheritance, but close family members can claim full tax exemption under Group 0. You must report it to the Polish Tax Office within six months. In India, inheritance is completely tax-free. Our legal team coordinates cross-border tax compliance under the India-Poland DTAA. This ensures zero double tax.",
  },
  {
    q: "Why should NRIs in Poland maintain separate Wills for Poland and India?",
    a: "A single worldwide Will creates court delays. Polish courts require local probate or notarial deeds. Meanwhile, Indian land offices demand local Indian succession papers. Two separate ring-fenced Wills allow both estates to settle fast. They avoid court confusion and jurisdictional conflicts.",
  },
  {
    q: "How are Indian NRE and NRO bank accounts claimed by heirs in Poland?",
    a: "Bank nominees act only as caretakers under the Supreme Court Sarbati Devi ruling. Nominees do not own the money. A clear Indian Will names the true legal owners. This lets your family claim bank funds quickly without a court order. It covers NRE, NRO, and FCNR bank accounts.",
  },
  {
    q: "How can heirs in Poland sell inherited property and repatriate funds?",
    a: "Heirs first update land records using the Will. Then they get a Lower TDS Certificate under Section 197. Under RBI rules, they can move up to 1 million USD per year to Poland. They use an NRO bank account with Form 15CA and Form 15CB. Our advocates handle the entire repatriation process.",
  },
];

const NRI_POLAND_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
      name: "Will Drafting for NRIs in Poland | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Poland. Protect assets in India under Indian Succession Act with cross-border succession law experts.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-poland-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Poland Brussels IV Article 22 Choice of Law Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#legalservice",
      name: "AMA Legal Solutions Poland-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-poland-og.jpg",
      description:
        "Cross-border Indian Will drafting, EU Brussels IV Article 22 choice of law, Polish Notariusz apostille advisory, and asset transmission counsel for NRIs in Poland.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Poland" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Warsaw" },
        { "@type": "City", name: "Kraków" },
        { "@type": "City", name: "Wrocław" },
        { "@type": "City", name: "Poznań" },
        { "@type": "City", name: "Gdańsk" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#service",
      name: "Indian Will Drafting Services for NRIs in Poland",
      serviceType:
        "Cross-Border Succession, Brussels IV Article 22 Choice of Law & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Poland" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Poland Will Drafting & Succession Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Poland",
              description:
                "Comprehensive Indian Will drafting incorporating Article 22 Brussels IV choice-of-law declarations, plain-paper execution SOP, and municipal mutation guidelines.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Poland-India Ring-Fenced Architecture",
              description:
                "Coordinated cross-border estate planning ring-fencing Polish assets from Indian properties, preventing Polish zachowek disruption and duplicate court probates.",
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
                "End-to-end legal representation including Polish Notary apostille advisory, Indian embassy attestation coordination, and High Court probate support.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#howto",
      name: "How NRIs in Poland Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, ring-fence, and execute an ironclad Indian Will while residing in Poland under the Indian Succession Act and EU Brussels IV.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule & Title Verification",
          text: "Itemize all Indian properties, demat folios, mutual funds, and bank accounts with exact registered deed details, municipal tax IDs, and bank IFSC numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Article 22 Choice-of-Law Advocate Drafting",
          text: "High Court advocates draft an Indian Will incorporating an express Article 22 Brussels IV election of Indian law and foreign asset ring-fencing clauses.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Execution & Attestation in Poland",
          text: "Print the draft on plain paper and execute before two adult attesting witnesses in Poland, with optional Polish Notary seal or consular attestation.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & India Executor Briefing",
          text: "Deliver original signed copies to designated executors in India, store electronic backups, and prepare mutation instructions for local land revenue offices.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#faq",
      mainEntity: NRI_POLAND_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland#breadcrumb",
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
          name: "Will Drafting for NRIs in Poland",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-poland",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Default Governing Succession Law",
    polandLaw: "Polish Civil Code (Kodeks cywilny) via Habitual Residence (Art. 21 Brussels IV)",
    indianLaw: "Indian Succession Act, 1925 applies strictly to Indian land (Lex Situs)",
    ringFenced: "Article 22 Choice of Law ensures Indian law governs Indian assets",
  },
  {
    feature: "Forced Heirship (Zachowek)",
    polandLaw: "Mandatory 50% or 66% statutory cash claim for children and spouse (KC Arts. 991-1011)",
    indianLaw: "Zero forced heirship; 100% testamentary freedom under Section 59",
    ringFenced: "Electing Indian law insulates Indian properties from Polish claims",
  },
  {
    feature: "Will Execution Formalities",
    polandLaw: "Handwritten holographic Will or notarial deed before a Polish Notariusz (KC Art. 949/950)",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    ringFenced: "Executed in Poland on plain paper with optional Notary or MSZ apostille",
  },
  {
    feature: "Bank & Demat Asset Transmission",
    polandLaw: "Requires Polish court succession decree or notarial deed (Akt Poświadczenia Dziedziczenia)",
    indianLaw: "Sarbati Devi rule applies; nominee is only a temporary trustee",
    ringFenced: "Direct transmission via Will without waiting for Indian court orders",
  },
  {
    feature: "Immovable Property Mutation",
    polandLaw: "Foreign court orders not recognized by Indian Sub-Registrars",
    indianLaw: "Revenue mutation under state land laws and municipal corporation rules",
    ringFenced: "Swift Tehsildar and municipal property tax transfer across India",
  },
  {
    feature: "Inheritance Taxation & DTAA",
    polandLaw: "Polish inheritance tax applies unless Group 0 exemption is reported within 6 months",
    indianLaw: "Zero estate duty or inheritance tax in India since 1985",
    ringFenced: "Clean tax documentation for Section 197 TDS and Form 15CA/15CB",
  },
  {
    feature: "Court Probate Requirement",
    polandLaw: "Polish court confirmation (Stwierdzenie nabycia spadku) needed for Polish estate",
    indianLaw: "Probate mandatory only in Mumbai, Kolkata, Chennai (Section 57/213)",
    ringFenced: "Parallel settlement in Poland and India without reciprocal roadblocks",
  },
];

export default function WillDraftingForNrisInPolandPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_POLAND_SCHEMA) }}
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
              Will Drafting for NRIs in Poland
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
                  High Court Lawyers · Brussels IV EU Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Poland
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 24,200 Indians live in Poland today. Most live in Warsaw,
                Kraków, Wrocław, and Poznań. Under EU Brussels IV rules, Polish law
                applies to your estate by default. This triggers Polish forced
                share rules called zachowek. Your family could face heavy money
                claims. But you can protect your assets. Under Article 22 of
                Brussels IV, you can pick Indian law. Our High Court lawyers
                draft clear Wills. We protect your flats, plots, and bank
                deposits in India.
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
                  href="#poland-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Polish vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Brussels IV Art. 22 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Avoids Polish Zachowek</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Polish Notary Advice</span>
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
                Why Combined EU Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Poland NRI Estate Risks: Cross-Border Land &amp; Asset Protection
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Habitual Residence Default:</strong> Under Article 21
                    of Brussels IV, living in Poland defaults your estate to
                    Polish law. Polish courts may claim rights over your Indian
                    assets. This causes long delays for your heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Zachowek Cash Claims:</strong> Polish Civil Code gives
                    children and spouses a forced cash claim of up to two-thirds.
                    This is called zachowek. It can disrupt gifts made to parents
                    or siblings in India.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian Land Mutation Delays:</strong> Indian land
                    offices reject Polish court decrees. A Will must follow
                    Section 63 of the Indian Succession Act to be valid in India.
                    Proper drafting prevents title disputes.
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
                We help you write a clear Will. Your wealth stays safe. Your family
                avoids long court fights. You choose who gets your property. Everything
                stays simple and clear.
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
                Any Indian in Poland who owns property in India needs this service.
                This includes flats, plots, bank deposits, and mutual funds. It helps
                tech engineers, logistics managers, and students. You can sign your
                Will in Poland. Two adult friends witness your signature. You do not
                need Indian stamp paper. You save time and travel costs.
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
                Poland with two witnesses. We guide you on Polish Notary seals. We
                also help your family update Indian land records. Our lawyers make
                the entire process simple and safe. We guide your family every step
                of the way.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriPolandWillInteractive />

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
              Visual Legal Framework: Poland-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, elects Indian law under Brussels IV
              Article 22, and shields your estate from Polish zachowek:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-poland-og.jpg"
              alt="Will Drafting for NRIs in Poland Brussels IV Article 22 Choice of Law Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Poland under Brussels IV and the Indian Succession Act.
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
        <section id="poland-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Poland vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to ring-fence Indian assets exposes your family to Polish
              forced heirship and conflicting court jurisdictions. Compare how
              succession operates across both legal systems:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Polish Law (Kodeks Cywilny / EU)</th>
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
                        {row.polandLaw}
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
              Legal 4-Step Poland NRI Will Roadmap
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
                title: "Asset Schedule & Title Audit",
                desc: "We check your sale deeds, tax receipts, bank accounts, and demat folios in India. We verify every property detail.",
              },
              {
                step: "02",
                title: "Article 22 Brussels IV Drafting",
                desc: "Our lawyers draft your Will with clear choice-of-law clauses. We elect Indian law and ring-fence your Polish assets.",
              },
              {
                step: "03",
                title: "Plain-Paper Execution in Poland",
                desc: "You print the draft on plain paper. You sign before two adult witnesses in Poland. We guide you on notarial seals.",
              },
              {
                step: "04",
                title: "Executor Briefing & Mutation SOP",
                desc: "We give your executors in India clear steps for land mutation, bank account claims, and RBI fund repatriation.",
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
              Copy-Pasteable Article 22 Choice of Law Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without an explicit choice-of-law election, European courts apply
              Polish succession rules by default. Our advocates structure clean
              ring-fencing recitals to secure your Indian property:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Brussels IV Article 22 Election Clause
                  </span>
                  <span>Cross-Border Ring-Fenced Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I, [Testator Full Legal Name], an Indian citizen holding
                  Indian Passport No. [Passport Number] and residing in [City,
                  Poland], hereby declare that this Will shall govern exclusively
                  all my immovable and movable properties, bank accounts, demat
                  folios, and investments situated in the Republic of India. In
                  accordance with Article 22 of EU Succession Regulation No
                  650/2012 (Brussels IV), I expressly choose the laws of India
                  (specifically the Indian Succession Act, 1925) to govern the
                  succession of my Indian estate in its entirety. This Will is
                  executed as an independent instrument and shall not revoke,
                  amend, or alter any separate testamentary disposition executed
                  by me in the Republic of Poland regarding my European
                  assets.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: If you hold Polish citizenship or an OCI card, our High
                  Court advocates customize this clause to preserve Indian
                  succession autonomy under international private law.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Poland-India Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Poland and India:
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
                      <strong>Optional Notary Certification:</strong> Polish Notary
                      signature seal or MSZ apostille confirms genuine signing.
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
                India has no estate duty or inheritance tax. You inherit Indian
                property tax-free. Poland taxes inheritance, but immediate family
                heirs can claim full exemption under Group 0. They must notify
                the Polish Tax Office within six months. Selling inherited
                property later in India triggers capital gains tax. Property
                buyers in India must deduct TDS under Section 195. Our team
                helps you apply for a Lower TDS Certificate under Section 197.
                This saves you from excess tax deductions.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under RBI rules, heirs can transfer up to 1 million USD per
                financial year to Poland. You use an NRO bank account with Form
                15CA and Form 15CB. Under the India-Poland tax treaty, you avoid
                double tax. Taxes paid in India can be claimed as a credit in
                Poland. Our team helps you with bank forms and tax clearance.
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
              Frequently Asked Questions: NRIs in Poland
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_POLAND_FAQS.map((item, idx) => (
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
              Succession Act, 1925, EU Succession Regulation No 650/2012
              (Brussels IV), the Polish Civil Code (Kodeks cywilny Book IV), and
              the Foreign Exchange Management Act (FEMA), 1999. Judicial
              authorities referenced include Article 22 of Brussels IV and the
              Supreme Court ruling in Sarbati Devi. This content provides legal
              education and does not replace personalized lawyer counsel.
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
