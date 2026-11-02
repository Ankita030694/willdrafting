import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  FileCheck,
  Landmark,
  Sparkles,
  HelpCircle,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriBhutanWillInteractive from "@/components/NriBhutanWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Bhutan | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Bhutan. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in bhutan",
    "nri will drafting services bhutan",
    "indian will for nri in bhutan",
    "make a will for indian property from bhutan",
    "indian inheritance lawyer bhutan",
    "thimphu indian expat estate planning",
    "punatsangchhu hydro engineer indian will",
    "dantak bro officer inheritance india",
    "nro bank account succession bhutan expats",
    "consular attestation embassy of india thimphu",
    "ama legal solutions cross border succession",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Bhutan | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Bhutan. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-bhutan-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Bhutan: Consular Execution & Estate Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Bhutan | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Bhutan. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-bhutan-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_BHUTAN_FAQS = [
  {
    q: "Can Indian citizens residing in Bhutan draft an Indian Will?",
    a: "Yes. You can write your Will on plain paper. Under Section 63 of the Indian Succession Act, you only need two adult witnesses. You do not need Indian stamp paper while in Bhutan. It is simple to do.",
  },
  {
    q: "How can I get my Will attested at the Embassy in Thimphu?",
    a: "Book an appointment at the Embassy of India in Thimphu. Sign the Will before a consular officer. The official seal proves voluntary execution before Indian courts and land offices. It gives peace of mind.",
  },
  {
    q: "Can Indian nationals own freehold land in Bhutan?",
    a: "No. The Land Act of Bhutan 2007 bars non-citizens from owning freehold land in Bhutan. Indian expats hold their real estate in India. Your Will protects your Indian properties. It secures your family land rights.",
  },
  {
    q: "Why is relying solely on bank nominations risky for expats?",
    a: "Under the Supreme Court Sarbati Devi ruling, bank nominees act only as trustees. They do not own the money. A valid Will gives true ownership and avoids court delays.",
  },
  {
    q: "How does an Indian Will protect ancestral land in West Bengal or Assam?",
    a: "Many expats in Bhutan own land in nearby states. A clear Will with survey and khatian numbers helps your executor update land records quickly without family disputes.",
  },
  {
    q: "How can my heirs repatriate sale proceeds from inherited property?",
    a: "Heirs deposit sale money into an NRO bank account in India. Using Form 15CA and Form 15CB, they can remit up to 1 million USD per year under RBI foreign exchange rules.",
  },
  {
    q: "Do I need a local lawyer in Bhutan for my Indian Will?",
    a: "No. Your assets sit in India, so Indian law governs your estate. High Court advocates at AMA Legal Solutions draft your Will and guide you on signing it in Bhutan.",
  },
];

const NRI_BHUTAN_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
      name: "Will Drafting for NRIs in Bhutan | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Bhutan. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-bhutan-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Bhutan Consular Attestation & Asset Protection",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#legalservice",
      name: "AMA Legal Solutions Bhutan-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-bhutan-og.jpg",
      description:
        "Cross-border Indian Will drafting, consular execution guidance via Embassy of India in Thimphu, Indian Succession Act harmonization, and asset transmission counsel for NRIs in Bhutan.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Bhutan" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Thimphu" },
        { "@type": "City", name: "Phuntsholing" },
        { "@type": "City", name: "Paro" },
        { "@type": "City", name: "Gelephu" },
        { "@type": "City", name: "Samdrup Jongkhar" },
        { "@type": "City", name: "Punakha" },
        { "@type": "City", name: "Wangdue Phodrang" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#service",
      name: "Indian Will Drafting Services for NRIs in Bhutan",
      serviceType:
        "Cross-Border Succession, Consular Will Attestation & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#legalservice",
      },
      description:
        "Customized Indian Will drafting for Indian professionals, hydro project engineers, educators, and corporate executives living in Bhutan with assets in India.",
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#howto",
      name: "How NRIs in Bhutan Can Draft and Execute a Valid Indian Will",
      description:
        "Four-step statutory process for Indian expats in Bhutan to execute a legally binding Will for Indian immovable and movable assets.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule Asset Portfolio and Title Records",
          text: "Gather title deeds, survey khatian numbers, municipal tax receipts, and 16-digit Demat and bank account details across India.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Draft Customized Territorial Will with AMA Legal Solutions",
          text: "Our High Court advocates draft an Indian Succession Act compliant Will with explicit ring-fencing clauses protecting your Indian estate.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Execute Before Witnesses and Obtain Consular Attestation",
          text: "Sign the Will before two independent adult witnesses in Bhutan and obtain consular authentication at the Embassy of India in Thimphu.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Deposit Copy and Register Property Mutation Ready File",
          text: "Transmit certified copies to your designated executor in India to ensure immediate revenue mutation upon maturity.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#faq",
      mainEntity: NRI_BHUTAN_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan#breadcrumb",
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
          name: "NRI Hub",
          item: "https://www.willdrafting.in/services/nri-will-india",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "NRIs in Bhutan",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-bhutan",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Default Governing Succession Law",
    bhutanLaw: "Bhutanese courts oversee local matters. Non-citizens face property curbs.",
    indianLaw: "Indian Succession Act 1925 applies to all Indian real estate",
    ringFenced: "Explicit territorial clause ensures Indian law controls Indian assets",
  },
  {
    feature: "Land Ownership Rights",
    bhutanLaw: "Non-citizens cannot acquire freehold land under Land Act 2007",
    indianLaw: "Full freehold land and property ownership rights in India",
    ringFenced: "Guarantees direct mutation of Indian land to your chosen heirs",
  },
  {
    feature: "Will Execution Formalities",
    bhutanLaw: "Royal Court of Justice registration for local Bhutanese records",
    indianLaw: "Signed on plain paper before two adult witnesses under Section 63",
    ringFenced: "Execution in Bhutan with optional Thimphu consular authentication",
  },
  {
    feature: "Bank & Demat Asset Transmission",
    bhutanLaw: "Handled through Royal Monetary Authority rules for local funds",
    indianLaw: "Sarbati Devi rule applies. Nominees act only as interim trustees.",
    ringFenced: "Direct transmission via Will without waiting for court orders",
  },
  {
    feature: "Immovable Property Mutation",
    bhutanLaw: "Foreign court papers not accepted by Indian revenue Tehsildars",
    indianLaw: "Revenue mutation under state land laws and municipal rules",
    ringFenced: "Fast Tehsildar and municipal property tax transfer across India",
  },
  {
    feature: "Estate & Inheritance Tax",
    bhutanLaw: "No estate duty on foreign nationals residing in Bhutan",
    indianLaw: "Zero inheritance tax in India. Section 197 lowers sale tax.",
    ringFenced: "Full tax transparency for Section 197 TDS and Form 15CA remittance",
  },
];

export default function WillDraftingForNrisInBhutanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_BHUTAN_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* Breadcrumb Bar */}
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
            <Link
              href="/services/nri-will-india"
              className="hover:text-[#C65378] transition-colors font-medium"
            >
              NRI Hub
            </Link>
            <span>/</span>
            <span
              aria-current="page"
              className="text-[#111827] font-semibold"
            >
              Will Drafting for NRIs in Bhutan
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

        {/* Hero Section */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Bhutan-India Practice · Consular Attestation
                </span>
              </div>

              {/* Single H1: 39 chars */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Bhutan
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 60,000 Indian engineers, teachers, and PSU managers live in Bhutan.
                They work in Thimphu, Phuntsholing, and on hydro projects. Under Bhutan law,
                non-citizens cannot own land there. All your property stays in India. We help
                you write a clear Indian Will. Our lawyers draft under the Indian Succession
                Act 1925. We help you sign in Bhutan with consular seals. Your flats, land,
                and bank funds stay safe for your family. It gives you peace. It protects your family. It saves money. It brings clarity. You stay in control.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Indian Will Online</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>ISA 1925 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Thimphu Consular Seal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hydro Expat Focus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 61 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Key Estate Protection Risks
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Bhutan NRI Estate Risks: Cross-Border Land &amp; Asset Protection
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Zero Freehold Land in Bhutan:</strong> Under the Bhutan Land Act 2007,
                    foreigners cannot own land. All your real estate sits in India. Your estate
                    plan must focus on Indian land records.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Traps:</strong> Banks treat nominees only as temporary
                    agents. Nominees do not own the money. Without a Will, heirs face court delays.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancestral Land Disputes:</strong> Many expats hold ancestral land in
                    West Bengal and Assam. A written Will speeds up name transfer in land records.
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

        {/* Plain-English Summary Cards */}
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
                We help you write a clear Will. Your wealth stays safe. Your family avoids long court fights. Our legal team guides you. Every step is simple.
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
                Any Indian in Bhutan who owns a flat, plot, bank balance, or mutual
                funds in India. It helps engineers, teachers, and officers. You can
                sign your Will in Bhutan. Two adult friends witness your signature. You do
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
                We draft your Will under Indian law. You sign it in Bhutan with two
                witnesses. We guide you on Thimphu embassy attestation. We also help your
                family update Indian land records. Our lawyers make the entire process simple
                and safe. Your land stays secure. Your rights are clear.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Component */}
        <NriBhutanWillInteractive />

        {/* Visual Legal Framework (Image Embed) */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Bhutan-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, ensures seamless consular attestation
              in Thimphu, and enables swift asset transmission in India:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-bhutan.jpg"
              alt="Will Drafting for NRIs in Bhutan Consular Attestation & Asset Protection"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Bhutan under consular execution and the Indian Succession Act.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* Structured HTML Comparison Table */}
        <section id="bhutan-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Bhutan vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Understanding the differences between estate planning in Bhutan
              and property rules in India helps you protect your family assets:
            </p>
          </div>

          <div className="w-full overflow-hidden rounded-[24px] border border-[#172228]/10 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13.5px] border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[#111827] font-bold">
                    <th className="p-4 sm:p-5">Legal Aspect</th>
                    <th className="p-4 sm:p-5">Kingdom of Bhutan</th>
                    <th className="p-4 sm:p-5">Republic of India</th>
                    <th className="p-4 sm:p-5">With AMA Legal Indian Will</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[#374151]">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/40 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5">{row.bhutanLaw}</td>
                      <td className="p-4 sm:p-5">{row.indianLaw}</td>
                      <td className="p-4 sm:p-5 font-medium text-[#047857]">
                        {row.ringFenced}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Copyable Clause Box Section */}
        <section className="w-full mb-16 sm:mb-24">
          <CopyableNriPropertyClauseBox
            title="Territorial Non-Revocation & Ring-Fencing Clause"
            code={`"I hereby declare that this Last Will and Testament shall apply exclusively and solely to all my immovable and movable properties, estate, agricultural lands, plots, residential apartments, NRE/NRO bank accounts, fixed deposits, Demat portfolios, and financial investments situated within the territorial jurisdiction of the Republic of India.

It shall not revoke, cancel, or affect any separate testamentary declaration, employment benefits, or personal property situated within the Kingdom of Bhutan, which shall be governed by local law without conflict."`}
            explanation="This clause explicitly restricts your Indian Will to assets located within India. It prevents inadvertent revocation of any local paperwork or benefits in Bhutan and establishes undisputed jurisdiction for Indian sub-registrars and courts."
          />
        </section>

        {/* Detailed Legal Analysis */}
        <section className="w-full mb-16 sm:mb-24 space-y-8">
          <div className="max-w-3xl">
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Statutory Process for Expats Stationed in Bhutan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How Indian engineers, project officers, and educators execute an
              enforceable Indian Will without taking leave to travel to India:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs space-y-3">
              <h4 className="text-base font-bold text-[#111827]">
                Plain-Paper Signing Under Section 63 ISA 1925
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                You do not need stamp paper while in Bhutan. You print your Will on A4 paper.
                You sign in front of two witnesses. The witnesses must be adults. They must not
                be heirs in your Will. This fulfills all rules of Section 63. It keeps your Will legally sound.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs space-y-3">
              <h4 className="text-base font-bold text-[#111827]">
                Embassy Attestation in Thimphu
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                Under Section 3 of the Consular Act 1948, Indian consular officers verify
                signatures. Getting your Will sealed at the Embassy in Thimphu proves voluntary
                intent. Local Indian land officers and judges accept consular seals without doubt.
                It protects your family from future disputes.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs space-y-3">
              <h4 className="text-base font-bold text-[#111827]">
                Managing Ancestral Land in Neighboring States
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                Many professionals in Bhutan own ancestral plots in West Bengal and Assam.
                Without a Will, all distant legal heirs must sign consent forms. A clear Will
                names your sole beneficiary. This avoids long partition suits in local courts.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs space-y-3">
              <h4 className="text-base font-bold text-[#111827]">
                Securing Bank Balances and Demat Portfolios
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                Nominees are only caretakers under Indian law. They cannot keep your funds if
                other heirs dispute the estate. Our Will lists exact Demat Client IDs. It includes
                bank account numbers. Your executor claims funds directly without court delays.
              </p>
            </div>
          </div>
        </section>

        {/* Repatriation and FEMA Guidance */}
        <section className="w-full mb-16 sm:mb-24 bg-white rounded-[28px] p-8 sm:p-10 border border-[#172228]/10 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <h3 className="text-[1.85rem] sm:text-[2.2rem] font-medium leading-[1.15] text-[#111827]">
              FEMA Compliance &amp; Repatriation for Inherited Estates
            </h3>
            <p className="text-xs sm:text-[14px] leading-[1.7] text-[#49585F]">
              Under RBI foreign exchange rules, non-resident heirs can inherit property in
              India without prior approval. When heirs sell the property, they can remit up to
              1 million USD per year. They use an NRO bank account. To save tax, heirs apply for a
              Lower TDS Certificate under Section 197. This lowers the default 20 percent TDS
              rate. It matches your true capital gains. It makes repatriation fast and easy.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
              >
                <span>Read NRI Property Sale Repatriation Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
              >
                <span>Probate &amp; Succession Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Answers</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions for Expats in Bhutan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Answers to common cross-border estate planning questions from
              Indian citizens living and working in Bhutan:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {NRI_BHUTAN_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-[15px] font-bold text-[#111827] mb-2 leading-snug">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Global CTA Section */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
