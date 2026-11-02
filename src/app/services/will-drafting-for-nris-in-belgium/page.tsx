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
  Gem,
  Coins,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriBelgiumWillInteractive from "@/components/NriBelgiumWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Belgium | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Belgium. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in belgium",
    "nri will drafting services belgium",
    "indian will for nri in belgium",
    "make a will for indian property from belgium",
    "indian inheritance lawyer belgium",
    "antwerp diamond merchant will indian estate",
    "brussels nri will drafting lawyer",
    "belgian civil code forced heirship indian assets",
    "eu regulation 650 2012 article 22 indian succession",
    "belgian notaire apostille indian will fps foreign affairs",
    "nro account inheritance repatriation belgium",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Belgium | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Belgium. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-belgium-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Belgium EU Brussels IV Succession Harmonization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Belgium | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Belgium. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-belgium-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_BELGIUM_FAQS = [
  {
    q: "Does Belgian Civil Code forced heirship apply to my properties in India?",
    a: "No. Indian land and flats follow the Lex Situs rule under Section 5 of the Indian Succession Act. Indian law alone governs immovable property in India. In addition, Article 22 of EU Regulation 650/2012 lets you choose Indian law. This choice shields your Indian estate from Belgian forced heirship claims.",
  },
  {
    q: "Can NRIs in Belgium execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper in Belgium. You do not need Indian stamp paper abroad. You only need two adult witnesses who watch you sign. Your witnesses must not be beneficiaries in the Will.",
  },
  {
    q: "Do I need an apostille from Belgian FPS Foreign Affairs for my Will?",
    a: "Two adult witnesses make your Will legally valid in India. Getting your signatures notarized by a Belgian Notaire and apostilled by FPS Foreign Affairs in Brussels adds strong legal proof. It prevents disputes among relatives and speeds up property transfers before Indian municipal bodies.",
  },
  {
    q: "Why should diamond merchants in Antwerp avoid a single worldwide Will?",
    a: "A single worldwide Will causes long court freezes. Belgian probate orders are not recognized directly by Indian land registries or the Bharat Diamond Bourse. Indian High Courts require ancillary probate with certified Dutch or French translations. Two separate Wills let both estates settle fast without business stops.",
  },
  {
    q: "How does EU Regulation 650/2012 Article 22 protect Indian assets?",
    a: "Article 22 allows EU residents to choose their national law for succession. Indian passport holders in Antwerp, Brussels, Ghent, or Leuven can choose Indian law. This choice overrides Belgian default succession rules. It gives you 100 percent freedom to distribute your Indian wealth.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts claimed from Belgium?",
    a: "Bank nominees act only as temporary trustees under the Supreme Court Sarbati Devi ruling. Nominees do not own the money. A clear Indian Will names your true heirs. This lets your family claim bank funds and shares quickly without a civil court succession certificate.",
  },
  {
    q: "Does Belgium or India levy inheritance tax on Indian inherited property?",
    a: "India abolished estate duty in 1985, so inherited assets pay zero tax on transfer. In Belgium, regional inheritance tax can apply to worldwide estates of Belgian tax residents. A standalone Indian Will simplifies valuations and avoids double tax friction under the India-Belgium DTAA.",
  },
  {
    q: "How can heirs in Belgium repatriate money from an Indian property sale?",
    a: "Heirs first update land records using the Will. When selling, they obtain a Lower TDS Certificate under Section 197 to avoid 20 percent tax deduction. Under RBI FEMA rules, heirs can send up to 1 million USD per year to Belgium using an NRO account with Form 15CA and 15CB.",
  },
];

const NRI_BELGIUM_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
      name: "Will Drafting for NRIs in Belgium | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Belgium. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-belgium-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Belgium EU Brussels IV Succession Harmonization",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#legalservice",
      name: "AMA Legal Solutions Belgium-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-belgium-og.jpg",
      description:
        "Cross-border Indian Will drafting, Belgian Civil Code Book 4 harmonization, EU Brussels IV choice of law advisory, and asset transmission counsel for NRIs in Belgium.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Belgium" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Antwerp" },
        { "@type": "City", name: "Brussels" },
        { "@type": "City", name: "Ghent" },
        { "@type": "City", name: "Leuven" },
        { "@type": "City", name: "Bruges" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#service",
      name: "Indian Will Drafting Services for NRIs in Belgium",
      serviceType:
        "Cross-Border Succession, EU Brussels IV Harmonization & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Belgium" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Belgium Will Drafting & Succession Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Belgium",
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
              name: "Dual-Will Belgium-India Ring-Fenced Architecture",
              description:
                "Coordinated cross-border estate planning keeping Belgian assets separate from Indian land and companies, preventing court clashes.",
            },
          },
          {
            "@type": "Offer",
            price: "64990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Antwerp Diamond Merchant & Commercial Estate Counsel",
              description:
                "Comprehensive business succession drafting for diamond trading receivables, corporate share bequests, and High Court probate support.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#howto",
      name: "How NRIs in Belgium Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory path to draft, ring-fence, and execute an ironclad Indian Will while living in Belgium under the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Title & Business Inventory Audit",
          text: "Catalog Indian flats, plots, commercial offices, demat portfolios, and diamond firm stakes with registered deed details and corporate numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "EU Brussels IV & Ring-Fenced Drafting",
          text: "High Court lawyers draft an Indian Will electing Indian succession law under Article 22 of EU Regulation 650/2012, ring-fencing foreign assets.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper or Belgian Notaire Signing",
          text: "Sign the Will in Belgium before two adult witnesses on plain paper, with optional Belgian Notaire notarization and FPS Foreign Affairs apostille.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Indian Safe Custody & Executor Briefing",
          text: "Dispatch signed original copies to India executors. Store secure digital scans. Prepare guidance for municipal mutation and bank claims.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#faq",
      mainEntity: NRI_BELGIUM_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium#breadcrumb",
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
          name: "Will Drafting for NRIs in Belgium",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-belgium",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Default Governing Succession Law",
    belgiumLaw: "Belgian Civil Code Book 4 via Habitual Residence",
    indianLaw: "Indian Succession Act 1925 applies to Indian land (Lex Situs)",
    ringFenced: "Explicit territorial clause ensures Indian law governs Indian assets",
  },
  {
    feature: "Forced Heirship & Reserved Share",
    belgiumLaw: "Children receive mandatory reserved share of 50 percent",
    indianLaw: "Zero forced heirship; 100 percent testamentary freedom under s. 59",
    ringFenced: "Article 22 EU choice isolates Indian wealth from Belgian reserve claims",
  },
  {
    feature: "Will Execution Formalities",
    belgiumLaw: "Notarial authentic deed, international will, or holographic form",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    ringFenced: "Signed in Belgium on plain paper with optional Notaire & FPS apostille",
  },
  {
    feature: "Diamond Trade & Business Assets",
    belgiumLaw: "Business shares subject to clawback under forced heirship rules",
    indianLaw: "Direct bequeathal of corporate shares and partnership interests",
    ringFenced: "Prevents operational freeze across Mumbai and Surat diamond firms",
  },
  {
    feature: "Bank, NRE/NRO & Demat Accounts",
    belgiumLaw: "Belgian certificate of inheritance not accepted by Indian banks",
    indianLaw: "Sarbati Devi rule applies; nominee acts only as interim trustee",
    ringFenced: "Direct transmission via Will without civil court succession certificate",
  },
  {
    feature: "Immovable Property Land Mutation",
    belgiumLaw: "Foreign Belgian court orders rejected by Indian Sub-Registrars",
    indianLaw: "Revenue mutation under state land laws and municipal rules",
    ringFenced: "Fast Tehsildar and municipal property tax transfer across India",
  },
  {
    feature: "Inheritance Tax & Capital Gains",
    belgiumLaw: "Regional inheritance tax in Flanders, Wallonia, or Brussels",
    indianLaw: "Zero inheritance tax in India; Section 197 lower TDS on property sale",
    ringFenced: "Full tax clarity for Section 197 TDS and Form 15CA/15CB remittance",
  },
  {
    feature: "Court Probate Requirement",
    belgiumLaw: "Belgian Notaire certificate of inheritance (erfrechtverklaring)",
    indianLaw: "Probate mandatory only in Mumbai, Kolkata, Chennai (Section 57/213)",
    ringFenced: "Parallel settlement in Belgium and India without cross-border court halts",
  },
];

const RING_FENCING_CLAUSE = `I, [Full Legal Name], son/daughter of [Father's Name], aged [Age] years, holding Indian Passport No. [Passport Number] / Belgian Passport No. [Number] with OCI Card No. [OCI Number], currently residing at [Belgian Residential Address, Antwerp/Brussels/Ghent], do hereby make, publish, and declare this to be my Last Will and Testament solely and exclusively in respect of all my movable, immovable, and financial assets situated within the territorial borders of the Republic of India.

1. TERRITORIAL EXCLUSIVITY & SEPARATE WILL DECLARATION: This Will governs only my assets situated in India, including but not limited to residential apartments, land parcels, commercial offices at the Bharat Diamond Bourse (BDB) or Surat, shares in Indian private limited companies, NRE/NRO/FCNR bank accounts, fixed deposits, demat folios, mutual funds, gold bullion, and ancestral HUF interests. This Will shall operate independently of any Will, testament, or notarial act executed by me in the Kingdom of Belgium.

2. EU BRUSSELS IV CHOICE OF LAW (ART. 22): Pursuant to Article 22 of EU Regulation No. 650/2012, I hereby explicitly designate the substantive laws of India, including the Indian Succession Act, 1925 and the Hindu Succession Act, 1956, as the governing law of my succession in respect of my Indian estate.

3. NON-REVOCATION OF FOREIGN WILLS: This Will shall not revoke, alter, or cancel any prior or subsequent Will executed by me in Belgium or elsewhere in respect of assets located outside India, nor shall any general revocation clause in any foreign Will revoke this Indian Will unless specific reference is made to this instrument.`;

export default function WillDraftingForNrisInBelgiumPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_BELGIUM_SCHEMA) }}
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
              Will Drafting for NRIs in Belgium
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
            1. HERO SECTION (Single Strict H1: 41 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · EU Brussels IV Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 41 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Belgium
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Around 29,000 Indians live across Antwerp, Brussels, Ghent, and
                Leuven. Under Belgian law, forced heirship gives children a
                fixed half of your estate. Without an Indian Will, Belgian court
                papers cause years of delay in Indian land offices. You can
                avoid this trap. A separate Indian Will protects your diamond
                firms, flats, and bank funds. Our High Court lawyers draft clean
                Wills for smooth asset transfer.
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
                  href="#belgium-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Belgian vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>EU Brussels IV Article 22</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Belgian Notaire Apostille</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Antwerp Diamond Bourse Focus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 56 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Combined Worldwide Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Belgium NRI Estate Protection &amp; Cross-Border Succession
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Belgian Civil Code Forced Heirship:</strong> Belgian
                    law gives children a mandatory half of your wealth. This is
                    called forced heirship. Without an Indian Will, foreign courts
                    can try to split your Indian assets. An Indian Will stops this.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian Land Registry Rejections:</strong> Indian land
                    offices reject foreign Belgian court papers. Indian courts
                    require probate with certified Dutch or French copies. This can
                    take years in court. An Indian Will avoids this delay.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Antwerp Diamond Business Freeze:</strong> Diamond
                    trading firms and Bharat Diamond Bourse offices face banking
                    halts when family disputes arise without a clear Indian Will.
                    A Will keeps business running smoothly.
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
              <p className="text-sm leading-relaxed text-[#49585F]">
                If you die without a Will, your land and bank funds get stuck. Heirs
                must spend years in court for succession certificates. A Will passes
                your wealth directly without court fights.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Who Needs an Indian Will in Belgium?
              </h3>
              <p className="text-sm leading-relaxed text-[#49585F]">
                Indian passport holders and OCI cardholders in Antwerp, Brussels, Ghent,
                or Leuven. Anyone who owns flats, plots, bank deposits, mutual funds, or
                diamond firm shares in India.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                How Our Indian Lawyers Help You
              </h3>
              <p className="text-sm leading-relaxed text-[#49585F]">
                We draft custom Wills using EU Brussels IV rules. We help you sign on
                plain paper in Belgium. Our team assists your executors with land and
                bank transfers across India.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HERO BANNER IMAGE (Figure with Explicit Dimensions & Alt <= 100 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-belgium.jpg"
              alt="Will Drafting for NRIs in Belgium EU Brussels IV Succession Harmonization"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-[20px] object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Harmonized cross-border Indian Will
                framework for NRIs in Belgium under EU Brussels IV rules.
              </span>
              <span>
                Source: WillDrafting Research &amp; AMA Legal Solutions Cross-Border Practice
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            2. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="belgium-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Legal Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Belgium vs Indian Law: Key Succession Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Belgian civil law enforces strict forced heirship, while Indian
              law gives you complete testamentary freedom. Review how the two legal
              frameworks compare and how a ring-fenced Dual-Will architecture protects your estate:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Belgian Succession Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act</th>
                    <th className="py-4 px-6 w-[26%]">Ring-Fenced Dual-Will</th>
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
                        {row.belgiumLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
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
            3. MANDATORY UNIQUE ON-PAGE ASSET: ANTWERP DIAMOND BLUEPRINT
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#172228] text-white rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Gem className="w-4 h-4" />
              <span>Antwerp High-Net-Worth Advisory</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-4">
              Antwerp Diamond Trade &amp; Indian Succession Blueprint
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-gray-300">
              Antwerp is the world diamond trade hub. For decades, Palanpuri Jain
              and Gujarati families have run firms across Antwerp, Mumbai, and Surat.
              Passing down this wealth needs clear legal planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-base font-semibold text-white mb-2">
                Bharat Diamond Bourse (BDB) Offices
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-gray-300">
                Offices in BKC Mumbai and Surat diamond factories need clear Will clauses.
                An Indian Will prevents partnership freezes. It keeps business trade licenses active.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-base font-semibold text-white mb-2">
                Diamond Consignment &amp; Trade Receivables
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-gray-300">
                Diamond trade between Antwerp and Mumbai involves large book dues.
                Naming a business executor ensures smooth bill collection and supplier payouts without court delays.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-base font-semibold text-white mb-2">
                HUF &amp; Ancestral Gujarat Real Estate
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-gray-300">
                Many families hold ancestral land in Palanpur, Ahmedabad, and Surat under HUF rules.
                A clear Will separates joint family shares from your self-bought wealth.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <span className="text-xs sm:text-sm text-gray-300">
              Protect your business legacy across Belgium and India with bespoke counsel.
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-3 transition-colors shrink-0"
            >
              <span>Consult Diamond Estate Counsel</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            4. INTERACTIVE SCENARIOS & DIAGNOSTIC PLANNER
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <NriBelgiumWillInteractive />
        </section>

        {/* =========================================================================
            5. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Roadmap for NRIs in Belgium
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this structured four-step path to draft, execute, and safeguard
              your Indian Will while living in Belgium:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Title Inventory",
                desc: "We catalog all your Indian assets, including flats, plots, demat accounts, bank deposits, and company shares with exact registered details.",
              },
              {
                step: "02",
                title: "EU Brussels IV Drafting",
                desc: "Our High Court lawyers draft a standalone Indian Will electing Indian law under Article 22 of EU Regulation 650/2012, ring-fencing Belgian assets.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing in Belgium",
                desc: "Sign your draft in Belgium before two adult witnesses on plain paper. You can optionally add Belgian Notaire and FPS apostille verification.",
              },
              {
                step: "04",
                title: "Safe Custody & India Briefing",
                desc: "Dispatch original signed copies to India executors. Store secure digital backups. We assist your family with mutation and bank transfers.",
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
            6. COPYABLE SEPARATE WILL CLAUSE BOX & CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Agreement Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A standard boilerplate Will from the internet risks accidentally
              revoking your Belgian estate plans. Copy and adapt our vetted
              territorial ring-fencing clause below:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Separate Indian Will & EU Article 22 Choice of Law Clause"
            code={RING_FENCING_CLAUSE}
            explanation="This clause explicitly restricts the jurisdiction of your Indian Will to the Republic of India and designates Indian succession law under Article 22 of EU Regulation 650/2012. It prevents accidental revocation of your Belgian estate instruments."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation &amp; Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian land offices and banks require exact schedules before
                  accepting testamentary claims:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule A (Real Estate):</strong> Exact survey numbers,
                      flat numbers, registered deed dates, and municipal property IDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule B (Bank &amp; Demat Accounts):</strong> Bank
                      branch IFSC codes, NRE/NRO account numbers, and 16-digit depository client IDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule C (Commercial Interests):</strong> Share certificate
                      folios, company CIN numbers, and partnership firm registration details.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Independent Witness Signatures:</strong> Two adult
                      witnesses who are not named beneficiaries under the Will.
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

            <div className="lg:col-span-5 bg-[#FAF7F0] rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
                  <Globe2 className="w-4 h-4" />
                  <span>Diplomatic Formalities</span>
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Belgian Notaire Signing &amp; FPS Apostille Process
                </h3>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed mb-4">
                  Under Indian law, signing before two adult witnesses on plain A4
                  paper is legally valid. However, obtaining an apostille provides
                  conclusive proof before Indian revenue courts:
                </p>
                <div className="space-y-3 text-xs sm:text-[13px] text-[#374151]">
                  <div className="p-3 bg-white rounded-xl border border-[#172228]/10">
                    <strong className="text-[#111827]">Option 1: Belgian Notaire &amp; Apostille</strong>
                    <p className="text-gray-500 mt-1">
                      Sign before a Belgian Notaire (notaris / notaire) and obtain
                      an apostille from the Federal Public Service (FPS) Foreign Affairs
                      in Brussels under the Hague Convention.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#172228]/10">
                    <strong className="text-[#111827]">Option 2: Indian Embassy Attestation</strong>
                    <p className="text-gray-500 mt-1">
                      Sign in the presence of a consular officer at the Embassy
                      of India in Brussels (Chaussée de Vleurgat).
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Start Online Will Intake</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Need to Calculate Capital Gains on Inherited Property?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Use our interactive legal tool to evaluate capital gains tax
                    liabilities, cost inflation indexation, and Section 54 deductions.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Capital Gains</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Need to Calculate TDS &amp; Repatriation Limits to Belgium?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Section 195 withholding tax and check your 1 million
                    USD annual remittance allowances under RBI FEMA rules.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate NRI TDS &amp; Remittance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY FAQS SECTION (FAQPage Schema Compliant, min 5 FAQs)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal Knowledge Base</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Belgium NRI Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">WillDrafting Editorial Team</strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_BELGIUM_FAQS.map((item, idx) => (
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
                Related Indian Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal guides, calculators, and estate services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
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
                <span>High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Sitemap (All Categories)</span>
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
            8. EDITORIAL & E-E-A-T ATTRIBUTION CARD
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
              This cross-border legal guide is published in compliance with the Indian
              Succession Act 1925, the Hindu Succession Act 1956, EU Regulation 650/2012
              (Brussels IV), and Belgian Civil Code Book 4. Judicial precedents cited include
              Sarbati Devi v. Usha Devi (AIR 1984 SC 346) and the Hague Apostille Convention 1961.
              This content provides informational guidance and does not establish an attorney-client relationship.
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
