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
import NriSouthAfricaWillInteractive from "@/components/NriSouthAfricaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in South Africa | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in South Africa. Protect ancestral land, flats & NRE bank accounts under Indian Succession Act. DIRCO compliant.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in south africa",
    "nri will drafting services south africa",
    "indian will for nri in south africa",
    "make a will for indian property from south africa",
    "indian inheritance lawyer south africa",
    "south africa administration of estates act 66 1965 indian property",
    "south african wills act 7 of 1953 foreign asset ring fencing",
    "dirco apostille pretoria indian will attestation",
    "oci ancestral land inheritance gujarat tamil nadu fema",
    "durban kwazulu natal indian property inheritance advocate",
    "master of the high court south africa indian probate",
    "ama legal solutions cross border estate planning south africa",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in South Africa | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in South Africa. Protect ancestral land, flats & NRE bank accounts under Indian Succession Act. DIRCO compliant.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-south-africa-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in South Africa and Indian Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in South Africa | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in South Africa. Protect ancestral land, flats & NRE bank accounts under Indian Succession Act. DIRCO compliant.",
    images: ["/images/will-drafting-for-nris-in-south-africa-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_SOUTH_AFRICA_FAQS = [
  {
    q: "Does my South African Will automatically cover my property and land in India?",
    a: "No. Under Section 5 of the Indian Succession Act, 1925, succession to land and flats follows the Lex Situs rule. This means the law of India applies. Indian land offices and Tehsildars follow Indian law. A South African Will must go through court in South Africa first. It then needs a second court case in an Indian High Court. This takes years. Making a separate Indian Will lets your heirs take over land directly.",
  },
  {
    q: "How does the South African Master of the High Court treat assets located in India?",
    a: "Under the Estates Act 66 of 1965, the Master oversees estate assets. If an NRI includes Indian property in a South African Will, the executor must list it. This causes big tax delays. Yet Indian land offices do not accept Master Letters of Executorship. A separate Indian Will keeps Indian homes and land out of South African court hands.",
  },
  {
    q: "Can 4th or 5th generation South African Indians with OCI inherit ancestral farmland in India?",
    a: "Yes. Under FEMA rule 3(1)(b), OCIs can inherit farm land, farm houses, and plots from an Indian resident. Foreign citizens cannot buy farm land in India directly. But inheriting land through a Will is safe by law. An attested Indian Will makes sure your heirs get clean land title without family disputes.",
  },
  {
    q: "How do I trace ancestral land in Gujarat, Maharashtra, or Tamil Nadu from South Africa?",
    a: "Many families trace roots to Gujarat, Maharashtra, or Tamil Nadu. Our High Court advocates help find old land deeds. We get certified 7/12 land records or Patta passbooks. We also make legal family trees (Pedhinama or Varisu) to prove your link to the land.",
  },
  {
    q: "How do I prevent my South African Will from revoking my Indian Will?",
    a: "Standard South African Wills have wording that cancels all past wills. Under Section 2 of the South African Wills Act 7 of 1953, this can cancel your Indian Will. We draft twin, matched Wills. Your South African Will covers local assets. Your Indian Will protects your Indian assets and will not touch your South African estate.",
  },
  {
    q: "How does DIRCO apostille in Pretoria validate an Indian Will signed in South Africa?",
    a: "Both South Africa and India belong to the Hague Apostille Convention of 1961. You can sign your Will before two adult witnesses in South Africa. A local Notary can witness it. Then DIRCO in Pretoria adds an Apostille seal. Indian courts accept this seal with no need to visit an Indian Embassy.",
  },
  {
    q: "Do I need to pay Indian stamp duty to make an Indian Will from South Africa?",
    a: "No. Under the Indian Stamp Act, 1899, Wills need zero stamp duty. You can print your Indian Will on plain A4 paper in Durban, Johannesburg, Cape Town, or Pretoria. Just sign it before two adult witnesses who are not named as heirs.",
  },
  {
    q: "How can South African heirs repatriate proceeds from selling inherited Indian property?",
    a: "Under RBI rules, heirs can send up to 1 Million US Dollars abroad each financial year through an NRO bank account. Our team helps you obtain a Section 197 lower TDS tax certificate and Form 15CA and 15CB tax forms for fast bank transfers.",
  },
];

const NRI_SOUTH_AFRICA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
      name: "Will Drafting for NRIs in South Africa | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in South Africa. Protect ancestral land, flats & NRE bank accounts under Indian Succession Act. DIRCO compliant.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-south-africa-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in South Africa and Indian Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#legalservice",
      name: "AMA Legal Solutions South Africa-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-south-africa-og.jpg",
      description:
        "Cross-border Indian testamentary succession, South Africa-India estate harmonization, Section 63 Will drafting, DIRCO Apostille counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "AdministrativeArea", name: "KwaZulu-Natal" },
        { "@type": "AdministrativeArea", name: "Gauteng" },
        { "@type": "AdministrativeArea", name: "Western Cape" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "AdministrativeArea", name: "Maharashtra" },
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in South Africa",
      serviceType:
        "Cross-Border Indian Will Drafting, South African Dual-Will Harmonization & Ancestral Land Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI South Africa Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with South African asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "DIRCO Pretoria Apostille & Notary Certification Package",
              description:
                "High Court advocate vetting with DIRCO Pretoria Hague Apostille roadmap, South African notary guidelines, and Indian safe custody registration.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "South Africa Dual-Will Harmonization & Ancestral Revenue Mutation Counsel",
              description:
                "End-to-end alignment of South African Wills with Indian Succession Act rules, Gujarat/Maharashtra/Tamil Nadu revenue mutation support, and FEMA USD 1M remittance counsel.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#howto",
      name: "How NRIs in South Africa Execute a Legally Valid Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from South Africa under the Indian Succession Act, 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule Asset Mapping & Ancestral Title Verification",
          text: "Catalog all immovable properties, ancestral lands, 7/12 extracts or Patta records, NRE/NRO accounts, and Demat portfolios in India with exact survey numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & South African Asset Ring-Fencing",
          text: "Draft the Indian Will with an explicit Non-Revocation Territorial Clause that isolates South African wills, retirement annuities, and local assets.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation & DIRCO Apostille in South Africa",
          text: "Print the Will on plain A4 paper and sign before two independent adult witnesses. Optionally obtain a DIRCO Pretoria Hague Apostille or Consular certification.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & Tehsildar Mutation Readiness in India",
          text: "Provide registered copies to your trusted Indian executor and deposit sealed duplicates with legal counsel to ensure seamless revenue mutation across state land portals.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#faq",
      mainEntity: NRI_SOUTH_AFRICA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa#breadcrumb",
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
          name: "Will Drafting for NRIs in South Africa",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-south-africa",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Law",
    southAfricanWill: "Wills Act 7 of 1953 & Estates Act 66 of 1965",
    singleGlobalWill: "South African Master Court Powers",
    separateIndianWill: "Indian Succession Act, 1925 ss. 5 & 63",
  },
  {
    parameter: "Indian Land & Flat Validity",
    southAfricanWill: "Needs second probate or civil court case in India",
    singleGlobalWill: "Slow; needs Section 228 court grant",
    separateIndianWill: "100% valid under Section 5 Lex Situs rule",
  },
  {
    parameter: "Master of High Court Powers",
    southAfricanWill: "Indian assets caught in South African estate duty",
    singleGlobalWill: "Delays estate closure in South Africa",
    separateIndianWill: "Indian assets kept outside Master review",
  },
  {
    parameter: "Stamp Duty & Signing",
    southAfricanWill: "Formal South African notary rules",
    singleGlobalWill: "Foreign court certified papers",
    separateIndianWill: "Plain A4 paper; 2 adult witnesses (Zero stamp duty)",
  },
  {
    parameter: "Ancestral Land Mutation",
    southAfricanWill: "Tehsildar rejects foreign court orders",
    singleGlobalWill: "Civil court declaratory suit needed",
    separateIndianWill: "Direct mutation via 7/12 (Gujarat/MH) or Patta (TN)",
  },
  {
    parameter: "Sending Funds to SA (USD 1M)",
    southAfricanWill: "Needs long banking compliance checks",
    singleGlobalWill: "Delayed bank review",
    separateIndianWill: "Fast 15CA/15CB tax forms to South African bank",
  },
];

export default function NriSouthAfricaWillDraftingPage() {
  const foreignAssetRingFencingClause = `TERRITORIAL LIMITATION & FOREIGN ASSET RING-FENCING CLAUSE:

"1. JURISDICTIONAL SCOPE:
I hereby declare that this Last Will and Testament applies exclusively and strictly to all my movable, immovable, tangible, and intangible properties, assets, bank accounts (including NRE, NRO, and FCNR accounts), corporate securities, and ancestral interests situated within the territorial boundaries of the Republic of India.

2. PRESERVATION OF SOUTH AFRICAN TESTAMENTARY DISPOSITIONS:
I hereby expressly declare that this Will does not revoke, modify, alter, or supersede any Will, Codicil, or testamentary instrument executed by me governing my estate, properties, retirement annuities, business interests, or personal assets situated in the Republic of South Africa or any jurisdiction outside the Republic of India. 

3. EXCLUSION OF SOUTH AFRICAN MASTER OF HIGH COURT OVERSIGHT:
It is my express intention that my Indian estate shall be administered independently under the Indian Succession Act, 1925, without requiring liquidation, approval, or intervention by the Master of the High Court under the South African Administration of Estates Act 66 of 1965."`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_SOUTH_AFRICA_SCHEMA) }}
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
              Will Drafting for NRIs in South Africa
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
            1. HERO SECTION (Single Strict H1: 45 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  South Africa · Durban · Johannesburg · Cape Town · Pretoria
                </span>
              </div>

              {/* Single H1: 45 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in South Africa
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Protect family land, flats, and bank accounts in India. Over 1.7 million
                Indian South Africans live in Durban, Joburg, Cape Town, and Pretoria.
                Passing on Indian assets needs clear legal care. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , Indian land and flats follow Indian law. Our High Court lawyers draft clear
                Indian Wills. We ring-fence your South African assets and help update Indian
                land records fast.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#cross-border-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Succession Rules</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Indian Act Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>DIRCO Apostille Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>SA Assets Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA OCI Land Rights</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single H2: 48 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why A Single Global Will Fails
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The South Africa Master of High Court Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Court Letters Not Accepted:</strong> The Master of the High
                    Court works under Act 66 of 1965. Indian land offices reject South
                    African letters of executorship without a costly Indian High Court case.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Risk of Cancelling Your Will:</strong> Standard South African
                    will drafts cancel all prior wills. This can wipe out your Indian Will
                    by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Land Record Delays:</strong> In Gujarat, Maharashtra, and
                    Tamil Nadu, local revenue offices need clear Indian will papers to
                    transfer ancestral land (7/12 or Patta).
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Full NRI Estate Planning Master Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriSouthAfricaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Testamentary Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: South Africa Dual-Will Protocol
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a standalone Indian Will drafted by High Court advocates isolates
              your South African estate, protects ancestral farmland in Gujarat and Tamil Nadu,
              and speeds up land revenue mutation:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-south-africa-og.jpg"
              alt="Will Drafting for NRIs in South Africa and Indian Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for NRIs in South
                Africa under the Indian Succession Act, 1925, and DIRCO Apostille standards.
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
        <section id="cross-border-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              South Africa Will vs Indian Succession Act: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Relying on a single worldwide Will causes major delays in both jurisdictions.
              Compare how South African law and Indian law treat testamentary succession
              and property transfer:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">South African Will (Act 7 of 1953)</th>
                    <th className="py-4 px-6 w-[26%]">Single Global Will</th>
                    <th className="py-4 px-6 w-[28%] font-semibold text-[#047857]">
                      Separate Indian Will (Recommended)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {SUCCESSION_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.southAfricanWill}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.singleGlobalWill}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.separateIndianWill}
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
              4-Step Execution Protocol for NRIs in South Africa
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this 4-step path to write and sign a valid Indian Will from Durban,
              Joburg, Cape Town, or Pretoria without visiting India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Audit & Land Search",
                desc: "We list your Indian flats, shops, NRE accounts, and family land. We check land records like 7/12 extracts in Gujarat and Maharashtra or Patta passes in Tamil Nadu.",
              },
              {
                step: "02",
                title: "High Court Lawyer Drafting",
                desc: "Our lawyers draft your Will under Section 63 of the Indian Succession Act, 1925. We add clear clauses to keep your South African assets safe.",
              },
              {
                step: "03",
                title: "Signing on Plain Paper & DIRCO",
                desc: "Print on plain A4 paper in South Africa. Sign before two adult witnesses. You can add a DIRCO Pretoria Apostille seal for official court proof.",
              },
              {
                step: "04",
                title: "Land Mutation & Sending Funds",
                desc: "We give your executor sealed copies for safe keeping. We help update land records with the Tehsildar and guide heirs on sending funds to South Africa.",
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
              Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              To safeguard your South African estate and prevent the Master of the High
              Court from intervening in your Indian assets, every Indian Will must contain
              an explicit territorial isolation recital:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Territorial Limitation & South African Non-Revocation Clause"
            code={foreignAssetRingFencingClause}
            explanation="This clause ring-fences your Indian assets, confirms that your South African testament remains intact, and stops accidental cross-border cancellation under Section 2 of the South African Wills Act 7 of 1953."
          />

          {/* Schedule Demarcation Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Indian Property Demarcation Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian land offices and banks require exact asset details in your Will schedules:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Flats and Homes:</strong> Give the flat number, floor, wing,
                      area, undivided land share (UDS), and registered sale deed number.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Farm Land (Gujarat / MH / TN):</strong> State survey numbers,
                      plot size, village, and district from the 7/12 extract or Patta passbook.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Accounts:</strong> List bank name, branch, and NRE or NRO
                      account numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Shares and Mutual Funds:</strong> List DP ID, client ID,
                      depository, and investment folio details.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF7F0] rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                  Need Help Finding Old Land Papers?
                </div>
                <h4 className="text-base font-semibold text-[#111827] mb-3">
                  Ancestral Record Retrieval in India
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#49585F] mb-4">
                  If your family left Gujarat, Maharashtra, or Tamil Nadu years ago, our team
                  visits local revenue offices to pull certified copies of 7/12 extracts,
                  Ferfar entries, and old sale deeds.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
              >
                <span>Request Land Title Search</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 sm:p-6 flex items-start justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Estimate tax relief and capital gains under Indian tax laws
                    before selling inherited real estate.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-3.5 py-2.5 rounded-full border border-[#172228]/15 transition-colors shrink-0"
              >
                <span>Calculate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 sm:p-6 flex items-start justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Evaluate Section 195 withholding tax, Form 13 lower TDS certificates,
                    and USD 1 Million repatriation paths.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-3.5 py-2.5 rounded-full border border-[#172228]/15 transition-colors shrink-0"
              >
                <span>Evaluate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. MANDATORY UNIQUE ON-PAGE ASSET:
               SOUTH AFRICA TO INDIA ESTATE TRANSMISSION MANUAL + DIRCO APOSTILLE GUIDE
            ========================================================================= */}
        <section id="estate-transmission-manual" className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Mandatory Unique Practice Asset</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              South Africa to India Estate Transmission Manual
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A specialized legal bridge between South Africa&apos;s Administration of Estates Act 66
              of 1965, the Hague Apostille Convention, and Indian Land Revenue Mutation Courts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] text-[#C65378] flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                DIRCO Apostille in Pretoria
              </h4>
              <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                South Africa joined the Hague Apostille Convention in 1995. A Will signed
                in South Africa before a Notary can get an Apostille seal from DIRCO in
                Pretoria. Indian courts accept this seal with no need for embassy visits.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] text-[#C65378] flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                OCI Land Rights Under FEMA
              </h4>
              <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                Foreign citizens cannot buy farm land in India. But FEMA rule 3(1)(b) lets
                OCIs inherit farm land, farm houses, and plots. An Indian Will stops relatives
                from taking family land.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] text-[#C65378] flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Ancestral Land Records
              </h4>
              <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                We help update land records in India: Pedhinama in Gujarat, Ferfar in Maharashtra,
                and Varisu in Tamil Nadu. Our team works with the Tehsildar so heirs get clear title.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#172228]/10">
            <span className="text-xs text-[#55636D]">
              Have questions regarding Indian diplomatic missions in Pretoria, Johannesburg, Durban, or Cape Town?
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white bg-[#C65378] hover:bg-[#a13c5d] px-5 py-2.5 rounded-full transition-colors"
              >
                <span>Ask Advocate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#172228] bg-white hover:bg-[#FAF7F0] border border-[#172228]/15 px-4 py-2.5 rounded-full transition-colors"
              >
                <span>Inherited Property Sale Guide</span>
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
              <span>Cross-Border Legal Guidance</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in South Africa
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_SOUTH_AFRICA_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related NRI Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, court representation, and property repatriation:
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
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Online Will Intake Portal</span>
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
              This cross-border legal guide is prepared under the Indian Succession Act,
              1925 (Sections 5 &amp; 63), the Foreign Exchange Management Act, 1999 (FEMA),
              the South African Wills Act 7 of 1953, and the Administration of Estates Act 66
              of 1965. Document authentication is governed by the Hague Apostille Convention
              of 1961 and the Indian Evidence Act. This content is for legal education and
              does not substitute formal advocate-client consultation.
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
