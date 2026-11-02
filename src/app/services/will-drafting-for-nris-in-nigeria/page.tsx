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
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriNigeriaWillInteractive from "@/components/NriNigeriaWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Nigeria | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Nigeria. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in nigeria",
    "nri will drafting services nigeria",
    "indian will for nri in nigeria",
    "make a will for indian property from nigeria",
    "indian inheritance lawyer nigeria",
    "lagos abuja nri property lawyer",
    "nigerian administration of estates law indian property",
    "high commission of india abuja will attestation",
    "nro account inheritance repatriation nigeria",
    "fema agricultural land inheritance nigeria oci",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Nigeria | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Nigeria. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-nigeria-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Nigeria Administration of Estates Law Harmonization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Nigeria | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Nigeria. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-nigeria-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_NIGERIA_FAQS = [
  {
    q: "Does Nigerian succession law apply to assets in India?",
    a: "Nigerian courts look at your home city for cash and shares. But Indian land and flats follow Indian law. Indian courts apply the Indian Succession Act, 1925 to local plots. A separate Indian Will protects your wealth. It prevents foreign court disputes.",
  },
  {
    q: "Can NRIs in Nigeria execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign on plain A4 paper. You do not need Indian stamp paper while living in Nigeria. Two adult friends must witness your signature. Your witnesses must not be heirs named in the Will.",
  },
  {
    q: "Do I need attestation by the High Commission in Abuja?",
    a: "Two adult witnesses make your Will valid under Indian law. Nigeria is not part of the Hague Apostille treaty. Getting your Will signed at the Indian High Commission in Abuja or Lagos gives strong proof. It prevents family fights and speeds up land transfers.",
  },
  {
    q: "Why avoid a single worldwide Will for Nigeria and India?",
    a: "A single worldwide Will causes long court delays. Nigerian probate grants have no direct power in India. Indian courts demand an extra court case under Section 228. Two separate Wills let both estates settle fast without court roadblocks.",
  },
  {
    q: "How can industrialists protect Indian ancestral property?",
    a: "Many families in Lagos and Kano own ancestral land or shops in India. A clear Indian Will names your exact share. It lists all Class-I heirs. It also gives your executor power to complete land mutation before the local Tehsildar.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts claimed?",
    a: "Bank nominees act only as temporary helpers under the Supreme Court Sarbati Devi ruling. Nominees do not own the funds. A clear Indian Will names your true heirs. This lets your family claim bank accounts and shares without a civil court certificate.",
  },
  {
    q: "Does Nigeria or India levy tax on inherited estates?",
    a: "Neither country levies estate duty. India ended estate duty in 1985. Nigeria does not tax foreign land. When selling inherited land in India later, capital gains tax applies. Getting a Lower TDS Certificate under Section 197 stops high tax deductions.",
  },
  {
    q: "How can heirs in Nigeria repatriate property sale funds?",
    a: "Heirs first update land records using the Will. When selling the property, they apply for a Lower TDS Certificate under Section 197. Under RBI rules, heirs can send up to 1 million USD per year to Nigeria using an NRO account and Form 15CA and 15CB.",
  },
];

const NRI_NIGERIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
      name: "Will Drafting for NRIs in Nigeria | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Nigeria. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-nigeria-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Nigeria Administration of Estates Law Harmonization",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#legalservice",
      name: "AMA Legal Solutions Nigeria-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-nigeria-og.jpg",
      description:
        "Cross-border Indian Will drafting, Nigerian Administration of Estates Law harmonization, High Commission consular attestation guidance, and asset transmission counsel for NRIs in Nigeria.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Lagos" },
        { "@type": "City", name: "Abuja" },
        { "@type": "City", name: "Kano" },
        { "@type": "City", name: "Port Harcourt" },
        { "@type": "City", name: "Ibadan" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#service",
      name: "Indian Will Drafting Services for NRIs in Nigeria",
      serviceType:
        "Cross-Border Succession, Nigerian Administration of Estates Law Harmonization & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Nigeria Will Drafting & Succession Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Nigeria",
              description:
                "Complete Indian Will drafting with clear territorial clauses, plain-paper execution steps, and municipal land transfer help.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Nigeria-India Ring-Fenced Architecture",
              description:
                "Coordinated cross-border estate planning keeping Nigerian commercial assets separate from Indian properties, preventing court clashes and Section 228 delays.",
            },
          },
          {
            "@type": "Offer",
            price: "64990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Industrial & Multi-City Family Estate Succession Counsel",
              description:
                "Full legal support including High Commission attestation advice, FEMA agricultural land transmission guidance, and High Court probate representation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#howto",
      name: "How NRIs in Nigeria Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory path to draft, ring-fence, and execute an ironclad Indian Will while living in Nigeria under the Indian Succession Act.",
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
          name: "Nigerian Estates Law Choice & Ring-Fencing Drafting",
          text: "High Court lawyers draft an Indian Will with clear territorial clauses under Section 59 of the Indian Succession Act, keeping Nigerian commercial assets separate.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Signing or Consular Attestation",
          text: "Print the draft on plain paper. Sign before two adult witnesses in Nigeria, with optional consular attestation before the High Commission of India in Abuja or Lagos.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & India Executor Briefing",
          text: "Send signed original copies to your chosen executors in India. Store digital backups. Prepare clear steps for local revenue mutation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#faq",
      mainEntity: NRI_NIGERIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria#breadcrumb",
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
          name: "Will Drafting for NRIs in Nigeria",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-nigeria",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Default Governing Succession Law",
    nigeriaLaw: "Administration of Estates Law via Domicile at Death",
    indianLaw: "Indian Succession Act, 1925 applies to Indian land (Lex Situs)",
    ringFenced: "Explicit territorial clause ensures Indian law governs Indian assets",
  },
  {
    feature: "Forced Heirship & Customary Rules",
    nigeriaLaw: "Common law freedom; state customary inheritance claims possible",
    indianLaw: "Zero forced heirship; 100% testamentary freedom under Section 59",
    ringFenced: "Ring-fencing isolates Indian real estate from Nigerian estate disputes",
  },
  {
    feature: "Will Execution Formalities",
    nigeriaLaw: "Signed before two witnesses under Wills Act / State Wills Laws",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    ringFenced: "Signed in Nigeria on plain paper with optional High Commission seal",
  },
  {
    feature: "Bank & Demat Asset Transmission",
    nigeriaLaw: "Requires High Court Grant of Probate or Letters of Administration",
    indianLaw: "Sarbati Devi rule applies; nominee acts only as interim trustee",
    ringFenced: "Direct transmission via Will without waiting for Indian court orders",
  },
  {
    feature: "Immovable Property Mutation",
    nigeriaLaw: "Foreign Nigerian court orders not recognized by Indian Sub-Registrars",
    indianLaw: "Revenue mutation under state land laws and municipal corporation rules",
    ringFenced: "Fast Tehsildar and municipal property tax transfer across India",
  },
  {
    feature: "Inheritance Tax & Capital Gains",
    nigeriaLaw: "No federal inheritance tax on foreign real estate holdings",
    indianLaw: "Zero inheritance tax in India; Section 197 lower TDS on property sale",
    ringFenced: "Full tax transparency for Section 197 TDS and Form 15CA/15CB remittance",
  },
  {
    feature: "Court Probate Requirement",
    nigeriaLaw: "High Court probate required in Lagos or Abuja for Nigerian estate",
    indianLaw: "Probate mandatory only in Mumbai, Kolkata, Chennai (Section 57/213)",
    ringFenced: "Parallel settlement in Nigeria and India without reciprocal court delays",
  },
];

export default function WillDraftingForNrisInNigeriaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_NIGERIA_SCHEMA) }}
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
              Will Drafting for NRIs in Nigeria
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
                  High Court Lawyers · Nigerian Estates Law Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 41 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Nigeria
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 51,800 Indians live across Lagos, Abuja, Kano, and Port Harcourt. Many run factories or trade firms. They also own flats, land, and bank funds in India. Without an Indian Will, foreign probate causes long delays in Indian courts. You can avoid this. A clear Indian Will protects your wealth. It ensures direct transfer to your heirs.
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
                  href="#nigeria-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Nigerian vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Estates Law Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Abuja Attestation Guide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Industrial Wealth Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 63 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Combined Worldwide Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Nigeria NRI Estate Risks: Cross-Border Land &amp; Asset Protection
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Domicile Default Under Nigerian Law:</strong> Under Lagos State estate rules, your domicile governs movable cash and shares. But Nigerian probate orders cannot update land records in India.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Section 228 Indian Probate Bottlenecks:</strong> Indian land offices reject foreign court orders. Getting an ancillary probate in India takes years. It needs certified copies and notices to all relatives.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Hazards:</strong> Standard wills signed in Nigeria often cancel all past wills across the globe. This cancels your Indian Will by mistake. Your Indian properties face disputes.
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
                Any Indian in Nigeria who owns a flat, plot, bank balance, or mutual
                funds in India. It helps business founders, engineers, and families. You can
                sign your Will in Nigeria. Two adult friends witness your signature. You do
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
                We draft your Will under Indian law and Nigerian rules. You sign it in
                Nigeria with two witnesses. We guide you on High Commission attestation.
                We also help your family update Indian land records. Our lawyers make the
                entire process simple and safe.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriNigeriaWillInteractive />

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
              Visual Legal Framework: Nigeria-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a separate Indian Will drafted by lawyers safeguards your wealth. It aligns Nigerian rules with Indian law. It makes property transfer fast and simple:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-nigeria.jpg"
              alt="Will Drafting for NRIs in Nigeria Administration of Estates Law Harmonization"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Indian Will drafting for NRIs in Nigeria under Nigerian rules and the Indian Succession Act 1925.
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
        <section id="nigeria-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Nigeria vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without separate Wills, your family faces foreign court delays. They also face heavy costs. Compare how Nigerian law and Indian law handle your property:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Nigerian Law</th>
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
                        {row.nigeriaLaw}
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
              Legal 4-Step Nigeria NRI Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our lawyers guide you through every step. Follow this easy 4-step path to protect your assets in India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Schedule & Title Audit",
                desc: "We review your sale deeds, tax receipts, bank accounts, and demat folios in India. We verify every property detail with care.",
              },
              {
                step: "02",
                title: "Lagos Law Ring-Fencing Drafting",
                desc: "Our lawyers draft your Will with clear territorial clauses. We elect Indian law and protect your Nigerian business assets from conflict.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing & Attestation",
                desc: "You print the draft on plain paper. You sign before two adult witnesses in Nigeria. We guide you on High Commission attestation in Abuja or Lagos.",
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
            6. MANDATORY UNIQUE ON-PAGE ASSET: NIGERIA-INDIA INDUSTRIAL BLUEPRINT
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-white rounded-[28px] p-7 sm:p-10 border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Mandatory Succession Blueprint</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Nigeria-India Industrial &amp; Family Estate Blueprint
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Many Indian families in Lagos and Abuja run factories or trading firms in Nigeria. They also own flats, plots, and land in India. Here is how our lawyers protect both estates with two separate Wills:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#FAF7F0] p-6 border border-[#172228]/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-2 block">
                  Track 1: Nigerian Commercial Assets
                </span>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Operating Companies &amp; Plants
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F] mb-4">
                  Governed under Nigerian company rules and local state wills laws. Company shares and plant assets stay separate. This stops court delays in India.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-[#047857] flex items-center gap-1.5 pt-3 border-t border-[#172228]/10">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Local Nigerian Will Governed</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAF7F0] p-6 border border-[#172228]/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-2 block">
                  Track 2: Indian Real Estate Holdings
                </span>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Ancestral Land, Plots &amp; Flats
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F] mb-4">
                  Governed strictly under the Indian Succession Act, 1925. Under FEMA rules, you can inherit flats, shops, and family farm plots in India without hurdles.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-[#047857] flex items-center gap-1.5 pt-3 border-t border-[#172228]/10">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Standalone Indian Will Governed</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAF7F0] p-6 border border-[#172228]/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-2 block">
                  Track 3: Financial Assets &amp; Remittance
                </span>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  NRE, NRO, Demat &amp; Repatriation
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F] mb-4">
                  Bank nominees act only as temporary helpers. A clear Will names your true heirs. You can send up to 1 million USD each year using Form 15CA and Form 15CB.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-[#047857] flex items-center gap-1.5 pt-3 border-t border-[#172228]/10">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>FEMA &amp; RBI Compliance Covered</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Copy-Pasteable Nigeria-India Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear territorial clause, foreign court orders cause delays. Our lawyers draft clean clauses to protect your property in India:
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
                  &ldquo;I, [Testator Full Legal Name], residing in [City, Federal
                  Republic of Nigeria], holding [Indian / Foreign] Passport No.
                  [Passport Number] [and OCI Card No. [OCI Number]], hereby declare
                  that this Last Will and Testament shall govern exclusively all my
                  immovable and movable properties, bank accounts, fixed deposits, demat
                  folios, mutual funds, and assets situated in the Republic of India. In
                  accordance with Section 5 and Section 59 of the Indian Succession Act,
                  1925 (lex situs principle), the succession, administration, and
                  distribution of my Indian estate shall be governed strictly by the
                  laws of the Republic of India. This Will is executed as an autonomous
                  testamentary instrument and shall not revoke, cancel, or supersede any
                  separate Will executed by me in Nigeria regarding my Nigerian assets or
                  business interests.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: If you hold an OCI card or Nigerian passport, our lawyers adapt this text to keep your Indian assets fully safe.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Nigeria-India Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Nigeria and India:
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
                      <strong>High Commission Attestation:</strong> Optional consular
                      attestation at the High Commission in Abuja or Lagos confirms authenticity.
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
                    Calculate indexation gains, Section 54 savings, and tax dues before selling inherited land or flats in India.
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
                    Check Section 195 tax cuts, Section 197 low tax certificates, and outward fund transfers.
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
            8. CROSS-BORDER TAXATION & REPATRIATION SECTION
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
                Neither India nor Nigeria levies inheritance tax. You inherit Indian assets tax-free. But selling land or flats later brings capital gains tax. Buyers in India deduct tax under Section 195. Our lawyers help you obtain a Low TDS Certificate under Section 197. This stops huge tax cuts upfront.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under RBI rules, heirs can send up to 1 million USD per year to Nigeria. You use an NRO bank account with Form 15CA and Form 15CB. Our lawyers make sure your funds move safely and fast.
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
            9. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Nigeria
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers from our{" "}
              <strong className="text-[#111827]">
                WillDrafting Team
              </strong>{" "}
              and checked by High Court lawyers at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_NIGERIA_FAQS.map((item, idx) => (
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
            10. EDITORIAL & E-E-A-T ATTRIBUTION CARD
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
              This legal guide is written under the Indian Succession Act 1925, Nigerian Administration of Estates Laws, and FEMA 1999. Court rules include Section 5, Section 59, and the Sarbati Devi ruling. This content provides legal education and does not replace lawyer advice.
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
