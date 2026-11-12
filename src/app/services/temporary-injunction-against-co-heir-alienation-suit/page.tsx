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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import InjunctionDiagnosticExplorer from "@/components/InjunctionDiagnosticExplorer";
import CopyableTrustClauseBox from "@/components/CopyableTrustClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Stop Co-Heir Selling Property Lawyer | WillDrafting",
  },
  description:
    "Urgent legal injunction services to restrain co-heirs and brothers from selling or alienating undivided ancestral property. Order 39 stay representation.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "stop co heir from selling property injunction lawyer",
    "order 39 rules 1 and 2 cpc advocate",
    "section 52 lis pendens property sale stay lawyer",
    "restrain brother from selling ancestral property service",
    "temporary injunction undivided property india",
    "stay on sale of ancestral property advocate",
    "stop sibling selling joint family home court stay",
    "ex parte status quo order property litigation",
    "sub registrar objection letter property sale",
    "ama legal solutions testamentary litigation",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit",
      "x-default":
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit",
    },
  },
  openGraph: {
    title: "Stop Co-Heir Selling Property Lawyer | WillDrafting",
    description:
      "Urgent legal injunction services to restrain co-heirs and brothers from selling or alienating undivided ancestral property. Order 39 stay representation.",
    url: "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/temporary-injunction-against-co-heir-alienation-suit-og.jpg",
        width: 1200,
        height: 675,
        alt: "Temporary Injunction Against Co-Heir Property Alienation Order 39 CPC Stay Representation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Co-Heir Selling Property Lawyer | WillDrafting",
    description:
      "Urgent legal injunction services to restrain co-heirs and brothers from selling or alienating undivided ancestral property. Order 39 stay representation.",
    images: [
      "https://www.willdrafting.in/images/temporary-injunction-against-co-heir-alienation-suit-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const INJUNCTION_FAQS = [
  {
    q: "Can a brother or co-heir legally sell undivided ancestral property without consent?",
    a: "No. Under Hindu law and Indian property rules, a co-heir can only sell their undivided share, not a specific physical plot. In addition, Section 44 of the Transfer of Property Act prevents an outside buyer from claiming joint possession of a family house. You can seek an immediate Order 39 injunction to stop an unauthorized sale.",
  },
  {
    q: "How fast can an advocate secure an ex-parte stay order in civil court?",
    a: "Under Order 39 Rule 3 of the CPC, civil courts can grant an emergency ad-interim ex-parte injunction within 24 to 48 hours without prior notice to the opposing co-heir if delay causes irreparable loss. Our litigation counsels prepare same-day pleadings and mention the matter urgently.",
  },
  {
    q: "What is the tripartite test courts use to grant an Order 39 temporary injunction?",
    a: "Courts evaluate three strict statutory requirements: first, a prima facie case showing legal title or co-heirship; second, balance of convenience favoring property preservation; and third, irreparable injury that cannot be compensated in money if third-party rights are created.",
  },
  {
    q: "How does Section 52 Lis Pendens protect me if my co-heir signs an agreement to sell?",
    a: "Section 52 of the Transfer of Property Act, 1882 establishes that any transfer during active court proceedings is subject to the final decree. Serving an official intimation letter to the local Sub-Registrar puts the suit on public record and blocks the buyer from claiming protection as a bona fide purchaser.",
  },
  {
    q: "What should I do if my brother has already accepted token money from a buyer?",
    a: "Act immediately before a formal sale deed is registered. File a partition suit with an urgent Order 39 injunction motion. Simultaneously submit a written objection letter to the Sub-Registrar and issue a public caution notice in local newspapers stating that the property is undivided and under litigation.",
  },
  {
    q: "Can an injunction stop a co-heir from demolishing or constructing on joint land?",
    a: "Yes. Order 39 Rule 1(a) of the CPC empowers the court to issue a status quo order restraining any waste, damage, or alteration of joint property. We also apply for the appointment of a court Local Commissioner under Order 26 Rule 9 to conduct an immediate site inspection and record physical status.",
  },
  {
    q: "What remedy is available if a sale deed is already registered by a co-heir?",
    a: "You must file a civil suit for cancellation of the sale deed under Section 31 of the Specific Relief Act, 1963, accompanied by a declaration of co-ownership. You must also seek an interim injunction under Order 39 restraining the outside buyer from taking physical possession or creating further encumbrances.",
  },
  {
    q: "What is the cost of retaining High Court and District Court advocates for stay motions?",
    a: "Unlike traditional litigators who charge unpredictable appearance fees, WillDrafting and AMA Legal Solutions provide transparent flat-fee litigation retainers starting from ₹49,990 for emergency stay drafting and court mentions, scaling with court jurisdiction and contested trial stages.",
  },
];

const INJUNCTION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit#webpage",
      url: "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit",
      name: "Stop Co-Heir Selling Property Lawyer | WillDrafting",
      description:
        "Urgent legal injunction services to restrain co-heirs and brothers from selling or alienating undivided ancestral property. Order 39 stay representation.",
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
        url: "https://www.willdrafting.in/images/temporary-injunction-against-co-heir-alienation-suit-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Temporary Injunction Against Co-Heir Property Alienation Order 39 CPC Stay Representation",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id":
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit#service",
      name: "Temporary Injunction Against Co-Heir Property Alienation",
      serviceType:
        "Order 39 CPC Injunctions, Ex-Parte Stay Motions, Lis Pendens Filings & SRO Restraint",
      provider: {
        "@type": "LegalService",
        name: "WillDrafting by AMA Legal Solutions",
        url: "https://www.willdrafting.in",
        image:
          "https://www.willdrafting.in/images/temporary-injunction-against-co-heir-alienation-suit-og.jpg",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
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
        name: "Property Injunction Legal Retainer Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Urgent Stay Drafting & SRO Restraint Notice",
              description:
                "Same-day drafting of Order 39 application, supporting affidavit, Section 52 notice, and Sub-Registrar restraining objection.",
            },
          },
          {
            "@type": "Offer",
            price: "89990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Ex-Parte Injunction Hearing Representation",
              description:
                "Senior advocate court representation before Civil Judge or High Court for urgent ad-interim ex-parte status quo orders.",
            },
          },
          {
            "@type": "Offer",
            price: "149990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Partition Suit & Stay Retainer",
              description:
                "End-to-end civil partition suit institution, injunction motions, local commissioner execution, and contested trial defense.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit#howto",
      name: "How to Obtain an Injunction Against a Co-Heir Selling Undivided Property",
      description:
        "Four-step statutory protocol to restrain a co-heir or brother from selling, mortgaging, or transferring joint family property in India.",
      totalTime: "P2D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Establish Co-Heirship and Title Records",
          text: "Collect revenue records, Jamabandi, municipal house tax receipts, or inheritance mutations proving undivided co-ownership.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Draft Order 39 Application and Verification Affidavit",
          text: "Litigation counsel prepares an Order 39 Rules 1 & 2 application detailing imminent alienation risk and the tripartite test.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Urgent Mentioning for Ad-Interim Ex-Parte Stay",
          text: "Counsel mentions the matter before the Civil Judge or High Court to obtain an immediate status quo order without waiting for notice.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Serve Certified Order on Sub-Registrar and Revenue Authorities",
          text: "Officially serve the court injunction order upon the local Sub-Registrar and Tehsildar to physically block property registry.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit#faq",
      mainEntity: INJUNCTION_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit#breadcrumb",
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
          name: "Stop Co-Heir Selling Property Injunction",
          item: "https://www.willdrafting.in/services/temporary-injunction-against-co-heir-alienation-suit",
        },
      ],
    },
  ],
};

const INJUNCTION_COMPARISON_TABLE = [
  {
    remedy: "Ad-Interim Ex-Parte Injunction (Order 39 R 1 & 2)",
    authority: "Code of Civil Procedure, 1908 Order 39 Rules 1-3",
    stage: "Day 1 of filing partition suit before issuing summons.",
    impact: "Immediately freezes sale negotiations and developer deals.",
    idealScenario: "Co-heir actively negotiating or taking token money.",
  },
  {
    remedy: "Status Quo Order on Title & Possession",
    authority: "Civil Court Inherent Powers (Section 151 CPC)",
    stage: "Hearing after preliminary notice to opposing parties.",
    impact: "Both sides strictly prohibited from changing site character.",
    idealScenario: "Threat of construction, tree cutting, or demolition.",
  },
  {
    remedy: "Lis Pendens Registration Notice (Section 52 TPA)",
    authority: "Transfer of Property Act, 1882 Section 52",
    stage: "Immediately upon filing plaint and obtaining suit number.",
    impact: "Binds third-party buyers to final outcome of the suit.",
    idealScenario: "Blocking buyers from claiming bona fide purchaser status.",
  },
  {
    remedy: "Perpetual Injunction Decree (Section 38 SRA)",
    authority: "Specific Relief Act, 1963 Section 38",
    stage: "Final decree passed after full civil trial and evidence.",
    impact: "Permanent legal prohibition against unauthorized alienation.",
    idealScenario: "Conclusive partition of estate and boundary demarking.",
  },
];

const LITIGATION_VS_AMA_TABLE = [
  {
    parameter: "Turnaround Time for Emergency Motion",
    traditional: "5 to 14 days due to drafting backlogs and junior briefing",
    ama: "Same-day drafting and emergency filing within 24 hours",
  },
  {
    parameter: "Sub-Registrar (SRO) Restraint Notice",
    traditional: "Rarely served; left to client to figure out local SRO steps",
    ama: "Official legal notice served on SRO with Book 1 diary entry",
  },
  {
    parameter: "Pricing Structure & Transparency",
    traditional: "Uncapped per-hearing appearance fees with hidden extras",
    ama: "Clear flat-fee litigation retainer starting from ₹49,990",
  },
  {
    parameter: "Urgent Ex-Parte Mentioning Skill",
    traditional: "Routine listing through ordinary registry channels",
    ama: "Special urgent mentioning before Senior Civil Judge / High Court",
  },
  {
    parameter: "Local Commissioner & Site Audit",
    traditional: "Requested only after defendant files written statement",
    ama: "Simultaneous Order 26 Rule 9 motion to freeze ground status",
  },
];

export default function TemporaryInjunctionServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(INJUNCTION_SCHEMA) }}
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
              Injunction Against Co-Heir Alienation
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
            1. HERO SECTION (Strict Single H1: 54 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Civil Litigation · Order 39 CPC · Emergency Stay Motions</span>
              </div>

              {/* Single H1: 54 characters (Strictly 30 to 65 chars, distinct from Title) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Injunction to Stop Co-Heir Selling Ancestral Property
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Is your brother, sister, or relative trying to sell joint family land? Order 39 of the Civil Procedure Code gives you a fast court stay. Our High Court lawyers file same-day stay pleas to freeze sales and save your land.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Request Injunction Stay</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates/application-for-temporary-injunction-probate-format"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>View Order 39 Format</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Order 39 CPC Stay</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 52 Lis Pendens</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Ex-Parte Status Quo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>SRO Registry Freeze</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (Length: 56 chars, <= 70 chars, unique) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Emergency Litigation Protection
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Urgent Injunctions Are Essential in Co-Heir Disputes
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Stops Third-Party Possession:</strong> Evicting an outside buyer takes years once they get in. A court stay stops any sale or physical handover right away.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Blocks Sub-Registrar Recording:</strong> Giving a certified court order to the local Sub-Registrar freezes land records and stops any sale deed transfer.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Prevents Waste and Demolition:</strong> Co-owners cannot break walls, cut trees, or build new rooms while a court stay is active.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Family Settlement Deeds</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE INJUNCTION DIAGNOSTIC & STRATEGY EXPLORER
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <InjunctionDiagnosticExplorer />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Litigation Architecture</span>
            </div>
            {/* H3 #1: 59 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: Injunction &amp; Property Restraint Protocol
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Securing a court stay order freezes title at the Sub-Registrar and prevents unauthorized third-party possession. Here is the operational framework for Order 39 CPC filings:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/temporary-injunction-against-co-heir-alienation-suit-og.jpg"
              alt="Temporary Injunction Against Co-Heir Property Alienation Order 39 CPC Stay Representation"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Emergency litigation roadmap under Order 39 Rules 1 and 2 CPC — securing ad-interim status quo, serving Section 52 Lis Pendens notices, and freezing local SRO property registers.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE: INJUNCTION REMEDIES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Legal Framework</span>
            </div>
            {/* H3 #2: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Legal Comparison: Order 39 CPC vs Section 52 Lis Pendens
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Different legal tools protect undivided family land at different stages of a dispute. Review this statutory comparison to understand how each remedy shields your estate:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[24%]">Remedy &amp; Instrument</th>
                    <th className="py-4 px-6 w-[20%]">Governing Statute</th>
                    <th className="py-4 px-6 w-[18%]">Execution Stage</th>
                    <th className="py-4 px-6 w-[20%]">Legal Effect &amp; Injunction</th>
                    <th className="py-4 px-6 w-[18%]">Recommended Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {INJUNCTION_COMPARISON_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.remedy}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.authority}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.stage}</td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.impact}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.idealScenario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED SIBLING RESTRAINT SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Ancestral Property Rights</span>
              </div>
              {/* H3 #3: 57 characters */}
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Restraining Brother from Selling Undivided Family Property
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                In many Indian homes, one brother tries to sell the best part of family land without telling his sisters or brothers. Under the Hindu Succession Act, 1956, all heirs hold equal rights in family land.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                No single heir can sell a specific corner without a registered family deed or court partition order. A private deal signed by one brother cannot bind the other heirs.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                Supreme Court Protection: Under Section 44 of the Transfer of Property Act and the landmark Supreme Court ruling in Dorab Cawasji Warden, a stranger who buys an undivided share cannot force their way into joint possession of a family house.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Retain Injunction Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Calculate Your Legal Share</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 4-STEP INJUNCTION FILING PROTOCOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step SOP</span>
            </div>
            {/* H3 #4: 50 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Protocol: Filing Urgent Stay in Civil Court
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              When a sale threat is immediate, every hour counts. Our High Court and District Court advocates execute a proven 4-step emergency litigation protocol:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Evidence & Records",
                desc: "We collect land records, Jamabandi papers, Khata files, and proof of secret sale talks or site visits.",
              },
              {
                step: "02",
                title: "Same-Day Drafting",
                desc: "Our lawyers draft the suit, stay plea, urgent hearing motion, and sworn affidavit on the same day.",
              },
              {
                step: "03",
                title: "Ex-Parte Mentioning",
                desc: "We appear before the Civil Judge or High Court to argue the stay tests and get an immediate status quo order.",
              },
              {
                step: "04",
                title: "Sub-Registrar Service",
                desc: "We hand-deliver the signed court order to the local Sub-Registrar and revenue Tehsildar to freeze registry books.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Stage {item.step}
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
            7. ORDER 39 TRIPARTITE TEST LEGAL CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Judicial Standards</span>
            </div>
            {/* H3 #5: 54 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Order 39 Legal Checklist: The Three Injunction Pillars
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Under the Code of Civil Procedure, 1908 and Supreme Court rulings, judges grant temporary injunctions only when all three mandatory pillars are proven:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                1. Prima Facie Case
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                You must show a clear legal right and family ownership in the property. Land records, family trees, or death papers prove this right easily.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Required Proof: Land Jamabandi, title deeds, death certificates of ancestors, and family tree records.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                2. Balance of Convenience
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                The court checks who suffers more harm if the stay is not granted. Keeping the property as it is maintains family peace.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Key Test: Preserving undivided property status quo prevents irreversible commercial complications.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                3. Irreparable Injury &amp; Loss
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                You must show that cash cannot fix the loss if land is sold to strangers. A sale to outside builders causes endless court battles.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Legal Threshold: Sale to commercial builders creates multi-party litigation that takes decades to resolve.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. SUB-REGISTRAR RESTRAINT BOX (MANDATORY UNIQUE ASSET)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Mandatory Unique Legal Asset</span>
            </div>
            {/* H3 #6: 53 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sub-Registrar Restraining Letter &amp; Lis Pendens Notice
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Do not wait for court summons to be served. Serve this formal statutory objection letter directly upon the local Sub-Registrar to freeze property conveyance:
            </p>
          </div>

          <CopyableTrustClauseBox
            title="Sub-Registrar Restraint Notice (Section 52 TPA &amp; Registration Act)"
            code={`"FORMAL STATUTORY OBJECTION & RESTRAINT NOTICE UNDER SECTION 52 TPA, 1882

To:
The Sub-Registrar of Assurances / Joint Sub-Registrar,
Office of the Sub-Registrar, [Jurisdictional Tehsil / Sub-District], [State]

SUBJECT: Formal Intimation of Pending Civil Partition Suit No. [___] of [2026] and Objection Against Registration of Any Sale Deed, Agreement, or Transfer in Respect of Undivided Property [Full Schedule / Khasra No. / Municipal House No.].

Sir / Madam,

1. TAKE NOTICE that the Applicant is an equal co-owner and Class I legal heir holding an undivided share in the immovable property situated at [Complete Property Description and Boundaries].

2. TAKE FURTHER NOTICE that Civil Suit No. [___] of [2026] titled '[Plaintiff Name] vs. [Defendant Co-Heir Name]' for Partition, Separate Possession, and Permanent Injunction has been duly instituted and is actively pending before the Court of Learned Senior Civil Judge at [District/City].

3. Under Section 52 of the Transfer of Property Act, 1882 (Doctrine of Lis Pendens), any alienation, sale, mortgage, or charge created during the active pendency of this suit is legally subordinate to the rights of the parties under any decree or interim order passed by the Court.

4. Furthermore, an urgent application under Order XXXIX Rules 1 and 2 of the Code of Civil Procedure, 1908 has been preferred seeking an ad-interim ex-parte injunction restraining the Defendants from selling, transferring, alienating, or creating third-party interests over the undivided property.

5. You are hereby called upon and requested:
   (a) To enter this statutory notice in Book 1 / Index II encumbrance registers;
   (b) To refuse registration of any Deed of Sale, Gift Deed, Agreement to Sell, or Power of Attorney presented by Defendant [Co-Heir Name] without prior leave of the competent Civil Court;
   (c) To inform any prospective buyer presenting documents that the property is subject to pending partition litigation.

Dated: [Date]
[Name of Advocate]
Advocate for the Co-Heir / Plaintiff
Bar Council Enrollment No. [___]"`}
            explanation="Drafted under Section 52 of the Transfer of Property Act, 1882 and state registration rules. Serving this notice officially puts the Sub-Registrar on alert and deprives outside buyers of the defense of being an innocent purchaser without notice."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL SOLUTIONS VS TRADITIONAL LITIGATION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Transparent Litigation Moat</span>
            </div>
            {/* H3 #7: 58 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              WillDrafting Injunction Retainer vs Traditional Litigators
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Traditional lawyers take weeks to draft petitions while co-heirs execute covert sale deeds. AMA Legal Solutions and WillDrafting combine rapid response with fixed pricing:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Litigation Parameter</th>
                    <th className="py-4 px-6 w-[36%]">Traditional Court Litigators</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions &amp; WillDrafting
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {LITIGATION_VS_AMA_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.traditional}</td>
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
            10. STATUTORY INJUNCTION FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal FAQs</span>
            </div>
            {/* H3 #8: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Co-Heir Property Injunctions
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Review quick legal answers on stopping property alienation, obtaining civil stay orders, and serving Sub-Registrars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INJUNCTION_FAQS.map((item, idx) => (
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
                Related Estate Dispute &amp; Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Access our verified legal formats, estate dispute advocates, and calculation tools:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/application-for-temporary-injunction-probate-format"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Order 39 Probate Format</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Family Settlement Deed</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/will-dispute-contest-litigation-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Will Dispute Lawyer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Succession Calculator</span>
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
              This civil litigation advisory guide is prepared in accordance with the Code of Civil Procedure, 1908, the Transfer of Property Act, 1882, the Specific Relief Act, 1963, and the Registration Act, 1908. It provides legal information on emergency stay remedies and does not constitute formal legal representation until an advocate engagement agreement is executed.
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