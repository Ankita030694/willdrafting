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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriFijiWillInteractive from "@/components/NriFijiWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Fiji | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Fiji. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in fiji",
    "nri will drafting services fiji",
    "indian will for nri in fiji",
    "make a will for indian property from fiji",
    "indian inheritance lawyer fiji",
    "fiji succession probate and administration act 1970",
    "section 5 indian succession act 1925 lex situs",
    "section 228 indian succession act probate resealing",
    "high commission of india suva will attestation",
    "indo fijian ancestral land inheritance india fema",
    "oci inherit agricultural land india fema 1999",
    "ama legal solutions cross border estate planning fiji",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Fiji | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Fiji. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-fiji-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Fiji and Indian Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Fiji | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Fiji. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
    images: ["/images/will-drafting-for-nris-in-fiji-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_FIJI_FAQS = [
  {
    q: "Why does an Indo-Fijian NRI or OCI need a separate Indian Will for Indian property?",
    a: "Under Section 5 of the Indian Succession Act 1925, land and flats in India follow Indian law. If you only write a Fiji Will, the High Court of Fiji keeps the original paper for probate. To transfer Indian land, your heirs must go to an Indian High Court under Section 228. This step takes one to two years. A separate Indian Will works on its own and lets your heirs update land records directly.",
  },
  {
    q: "How does the Fiji Succession, Probate and Administration Act 1970 interact with Indian law?",
    a: "The Fiji Succession, Probate and Administration Act 1970 governs estates in Fiji. But probates from the High Court of Fiji in Suva do not grant title to Indian land. Local land offices and banks in India demand an Indian Will. Writing a separate Indian Will prevents your Indian assets from being stalled by Fiji probate delays.",
  },
  {
    q: "Can Fiji citizens holding OCI status inherit agricultural land and ancestral property in India?",
    a: "Yes. Under FEMA Regulation 3(1)(b), OCIs and persons of Indian origin can inherit farm land, farmhouses, and homes from Indian parents. Foreign citizens cannot buy farm land in India directly. But inheriting land through a valid Will is protected by law.",
  },
  {
    q: "How do I prevent my Fijian Will from inadvertently revoking my Indian Will?",
    a: "Standard Fiji wills include wording that cancels all past wills worldwide. This can accidentally wipe out your Indian Will. To stop this error, our lawyers write clear ring-fencing terms. Your Fiji Will handles only Fiji assets. Your Indian Will handles only your land, flats, and bank funds in India.",
  },
  {
    q: "Can I sign an Indian Will in Fiji without visiting India or purchasing Indian stamp paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, a Will needs zero stamp duty. You can print your Indian Will on plain A4 paper anywhere in Fiji, such as Suva, Lautoka, Nadi, or Ba. You sign it before two adult witnesses who are not named as heirs.",
  },
  {
    q: "How does consular attestation work at the High Commission of India in Suva?",
    a: "Consular attestation proves that you signed the Will yourself. You book a slot at the High Commission of India at Level 7, LICI Building, Butt Street, Suva. You bring your passport, Fiji residency card, two copies of the Will, and two witnesses. The consular officer signs and stamps the paper.",
  },
  {
    q: "What happens to my Indian NRE and NRO bank accounts if I only have a bank nominee?",
    a: "In Sarbati Devi v. Usha Devi, the Supreme Court ruled that a nominee is only a trustee, not the owner. The funds belong to the legal heirs. Without an Indian Will, Indian banks often freeze NRE and NRO accounts. A clear Indian Will names your heirs directly and speeds up bank releases.",
  },
  {
    q: "How can Indo-Fijian heirs sell inherited property in India and repatriate funds to Fiji?",
    a: "Under RBI FEMA rules, foreign heirs can send up to 1 Million US Dollars abroad each financial year from their NRO accounts. Our advocates help heirs get a Lower TDS certificate under Section 197 to avoid heavy tax cuts. We also help with CA forms for fast wire transfers to Fiji.",
  },
];

const FIJI_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
      name: "Will Drafting for NRIs in Fiji | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Fiji. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-fiji-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Fiji and Indian Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#legalservice",
      name: "AMA Legal Solutions Fiji-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-fiji-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Fiji-India estate harmonization, Section 5 ISA Lex Situs ring-fencing, High Commission Suva attestation counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Fiji" },
        { "@type": "AdministrativeArea", name: "Suva" },
        { "@type": "AdministrativeArea", name: "Lautoka" },
        { "@type": "AdministrativeArea", name: "Nadi" },
        { "@type": "AdministrativeArea", name: "Ba" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
        { "@type": "AdministrativeArea", name: "Mumbai" },
        { "@type": "AdministrativeArea", name: "Punjab" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in Fiji",
      serviceType:
        "Cross-Border Indian Will Drafting, Fiji Dual-Will Harmonization & Ancestral Property Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Fiji" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Fiji Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Fiji asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Commission Suva Consular & Notarial Attestation Package",
              description:
                "High Court advocate vetting with High Commission of India Suva consular roadmap, notary guidelines, and Indian safe custody registration.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Fiji Dual-Will Harmonization & OCI Ancestral Land Carve-Out Counsel",
              description:
                "End-to-end alignment of Fiji Succession Act 1970 rules with Section 30 Hindu Succession Act testamentary freedom, revenue mutation, and FEMA USD 1M remittance counsel.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#howto",
      name: "How NRIs in Fiji Execute an Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from Fiji under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Jurisdictional Asset Mapping & Title Audit",
          text: "Identify personal self-acquired properties, ancestral coparcenary shares, and bank accounts in India, separating them from Fijian residential assets.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Lex Situs Ring-Fencing",
          text: "Structure an independent Indian Will declaring Lex Situs governance under Section 5 ISA 1925 and inserting reciprocal non-revocation clauses.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation before Two Witnesses",
          text: "Print the Will on standard A4 paper in Fiji and sign in the concurrent presence of two independent adult witnesses who are not beneficiaries.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "High Commission Suva Attestation or Notarial Verification",
          text: "Complete consular attestation at the High Commission of India in Suva (Butt Street) or verify before a Fiji Notary Public for seamless Indian court validity.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#faq",
      mainEntity: NRI_FIJI_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji#breadcrumb",
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
          name: "Will Drafting for NRIs in Fiji",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-fiji",
        },
      ],
    },
  ],
};

const FIJI_SUCCESSION_COMPARISON = [
  {
    parameter: "Governing Law",
    fijiLaw: "Fiji Succession Act 1970 (Cap 60)",
    indianLaw: "Indian Succession Act 1925 & HSA 1956",
    crossBorderImpact: "Indian land strictly follows Indian law under Section 5 ISA 1925.",
  },
  {
    parameter: "Land and Flats",
    fijiLaw: "High Court of Fiji grants probate over local land",
    indianLaw: "Local land offices and Tehsildars govern Indian land",
    crossBorderImpact: "Indian land offices reject foreign deeds without court orders.",
  },
  {
    parameter: "Probate Resealing",
    fijiLaw: "Probate granted by High Court of Fiji in Suva",
    indianLaw: "Section 228 ISA letters of administration in court",
    crossBorderImpact: "A separate Indian Will avoids two years of court delay.",
  },
  {
    parameter: "Farm Land Inheritance",
    fijiLaw: "Fiji estate rules govern distribution in Fiji",
    indianLaw: "FEMA rules allow OCIs to inherit farm land",
    crossBorderImpact: "An Indian Will ensures smooth name change for ancestral land.",
  },
  {
    parameter: "How You Sign",
    fijiLaw: "Fiji Wills Act rules before two adult witnesses",
    indianLaw: "Plain A4 paper signed before two adult witnesses",
    crossBorderImpact: "No stamp duty or trip to India is needed to sign.",
  },
  {
    parameter: "Consular Seal",
    fijiLaw: "Fiji Notary Public or Foreign Affairs seal",
    indianLaw: "High Commission of India in Suva at Butt Street",
    crossBorderImpact: "Consular seals give clear proof in Indian courts.",
  },
  {
    parameter: "Sending Money Home",
    fijiLaw: "Reserve Bank of Fiji exchange control rules",
    indianLaw: "FEMA USD 1M annual limit via NRO bank accounts",
    crossBorderImpact: "A Section 197 tax form prevents high tax cuts on land sales.",
  },
];

export default function NriFijiWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FIJI_SCHEMA) }}
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
              Will Drafting for NRIs in Fiji
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
            <time dateTime="2026-10-31" className="text-[#6B7280]">
              Updated October 31, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 37 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Fiji-India Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 37 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Fiji
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                More than 316,000 Indo-Fijians live in Suva, Lautoka, Nadi, and
                Ba. Many families have ancestral land in Uttar Pradesh, Bihar,
                Punjab, or Gujarat. Others own flats, shops, and bank funds in
                India. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act 1925
                </strong>
                , Indian land follows Indian law. A Fiji Will cannot easily pass
                Indian land to your heirs. Our High Court advocates draft clean
                Indian Wills. These protect your family, save legal costs, and
                prevent long court delays.
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
                  href="#fiji-vs-india-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Fiji vs Indian Laws</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Dual Will Structuring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Sec 228 Resealing Avoidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Suva Consular Attestation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 44 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Worldwide Wills Fail in India
              </div>
              {/* Single Strict H2: 44 chars (Unique across entire site, <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Single Worldwide Will Trap for Fiji NRIs
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Original Will Kept in Suva:</strong> The High Court
                    of Fiji keeps your original Will after granting probate.
                    Indian revenue offices demand the original document, which
                    stalls land transfers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Clause:</strong> Standard Fiji
                    wills cancel all past wills. This wording can wipe out your
                    Indian Will by mistake, triggering long fights among heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Two Years of Court Delays:</strong> Proving a Fiji
                    probate in an Indian High Court takes up to two years. A
                    separate Indian Will lets your family act without court delays.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Master Will Hub &amp; Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriFijiWillInteractive />

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
              Visual Overview: Fiji NRI Estate Planning Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how a separate Indian Will protects your family land, shields
              Fiji assets, and complies with Indian succession rules:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-fiji-og.jpg"
              alt="Will Drafting for NRIs in Fiji and Indian Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> How Indo-Fijians write an Indian Will
                under the Indian Succession Act 1925.
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
        <section id="fiji-vs-india-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Fiji Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Using one Will for both countries causes frozen accounts and long
              delays. Compare how Fiji law and Indian law treat your assets:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Fijian Estate Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Law</th>
                    <th className="py-4 px-6 w-[26%]">Cross-Border Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {FIJI_SUCCESSION_COMPARISON.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.fijiLaw}
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
            5. STATUTORY 4-STEP ROADMAP (Mandatory On-Page Asset)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Estate Transmission Guide</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Fiji to India Estate Transmission Protocol
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers guide you through every step. Follow these 4
              simple steps to sign a valid Indian Will from Fiji:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Audit & Title Check",
                desc: "We check sale deeds, tax bills, and land records across Indian states. We map ancestral rights and self-acquired flats clearly.",
              },
              {
                step: "02",
                title: "Advocate Will Drafting",
                desc: "Our lawyers write your Indian Will with clear clauses. We insert terms that protect your Fiji Will from being cancelled by mistake.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing in Fiji",
                desc: "Print your Will on plain A4 paper in Suva, Lautoka, Nadi, or Ba. Sign before two adult witnesses who are not heirs.",
              },
              {
                step: "04",
                title: "Suva Consular Attestation",
                desc: "Get your Will attested at the High Commission of India in Suva. This seal gives solid proof before Indian banks and land offices.",
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
            6. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause Box
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear clause, your Indian Will may clash with your Fiji
              Will. Use this tested clause written by our High Court advocates:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Separate Indian Will & Territorial Ring-Fencing Clause"
            code={`"I hereby declare that this Last Will and Testament relates exclusively to my estate, properties, and assets situated within the Republic of India, including but not limited to immovable properties, residential flats, agricultural lands, plots, commercial premises, bank accounts (including NRE, NRO, and FCNR accounts), fixed deposits, mutual funds, shares, and demat holdings.

I expressly declare that this Will does NOT revoke, alter, supersede, or affect any other Will, testamentary disposition, or trust executed by me in relation to my assets, properties, superannuation funds, or investments situated in the Republic of Fiji or any other jurisdiction outside India.

Similarly, no Will or testamentary instrument executed by me outside the Republic of India shall be construed as revoking, modifying, or superseding this Indian Will unless it makes specific and express reference to this Will by its date of execution."`}
            explanation="This mutual non-revocation clause insulates your Indian estate under Section 5 of the Indian Succession Act 1925 while ensuring your Fijian Will remains fully effective under the Fiji Succession, Probate and Administration Act 1970."
          />

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Indian capital gains tax on inherited flats and
                    land with clear rules for past costs.
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

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate tax cuts on property sales and check annual limits
                    for sending funds back to Fiji.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Repatriation Limits</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ANCESTRAL PROPERTY & OCI INHERITANCE RIGHTS SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>FEMA 1999 &amp; OCI Inheritance Protections</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Protecting Ancestral Heritage for Indo-Fijians
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Many Indo-Fijians trace their roots back to early migrants from
                Uttar Pradesh, Bihar, Punjab, or Gujarat. Many families still
                hold shares in ancestral land. Under Section 30 of the Hindu
                Succession Act 1956, you have total freedom to give your self-made
                property and family land shares to anyone through a Will.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Foreign citizens with OCI cards cannot buy farm land in India.
                However, under FEMA rules, OCIs can legally inherit farm land from
                Indian relatives. A clear Indian Will gives your family solid
                legal proof. This ensures your children can claim their land
                without fights from distant relatives.
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
                <span>Draft Online Will in Minutes</span>
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
              Frequently Asked Questions: Fiji NRI Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_FIJI_FAQS.map((item, idx) => (
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
                Related Cross-Border Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI estate planning hubs, transmission guides,
                and advocate services:
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
                <span>Property Sale &amp; Repatriation</span>
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
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Online Will Intake Tool</span>
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
              Act 1925, the Hindu Succession Act 1956, the Foreign Exchange
              Management Act 1999 (FEMA), and the Fiji Succession, Probate and
              Administration Act 1970 (Laws of Fiji Cap 60). Judicial authorities
              cited include Sarbati Devi v. Usha Devi (1984 AIR 346 SC). This
              content provides legal educational guidance and does not replace
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
