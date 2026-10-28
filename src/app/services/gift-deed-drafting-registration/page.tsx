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
  Users,
  Landmark,
  Calculator,
  HeartHandshake,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import GiftDeedInteractive from "@/components/GiftDeedInteractive";
import CopyableGiftDeedClauseBox from "@/components/CopyableGiftDeedClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Gift Deed Lawyer India | Drafting & SRO Registration",
  },
  description:
    "Expert advocate assistance for gift deed lawyer india under Transfer of Property Act. High Court drafting, SRO registration, and senior asset defense.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "gift deed lawyer india",
    "gift deed drafting and registration service",
    "blood relative gift deed registration sub registrar",
    "conditional gift deed lawyer",
    "section 23 senior citizens act gift revocation",
    "transfer of property act section 122 advocate",
    "blood relative property gift deed stamp duty",
    "gift deed vs will estate planning advocate",
    "sub registrar gift deed biometric registration",
    "section 56 2 x income tax gift exemption",
    "sudesh chhikara v ramti devi precedent",
    "ama legal solutions gift deed practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/gift-deed-drafting-registration",
  },
  openGraph: {
    title: "Gift Deed Lawyer India | Drafting & SRO Registration",
    description:
      "Expert advocate assistance for gift deed lawyer india under Transfer of Property Act. High Court drafting, SRO registration, and senior asset defense.",
    url: "https://www.willdrafting.in/services/gift-deed-drafting-registration",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/gift-deed-drafting-registration-og.jpg",
        width: 1200,
        height: 630,
        alt: "Gift Deed Lawyer India High Court Drafting and Sub-Registrar SRO Registration Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Deed Lawyer India | Drafting & SRO Registration",
    description:
      "Expert advocate assistance for gift deed lawyer india under Transfer of Property Act. High Court drafting, SRO registration, and senior asset defense.",
    images: ["/images/gift-deed-drafting-registration-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GIFT_DEED_FAQS = [
  {
    q: "Is registration of a gift deed mandatory for immovable property in India?",
    a: "Yes. Under Section 123 of the Transfer of Property Act, 1882 and Section 17(1)(a) of the Registration Act, 1908, a gift of immovable property is legally void without a registered instrument signed by the donor, accepted by the donee, and attested by at least two independent witnesses.",
  },
  {
    q: "What is Section 23 of the Senior Citizens Act, and how does it protect parents?",
    a: "Section 23 of the MWPSC Act, 2007 allows senior citizens to revoke a property gift if the child fails to provide basic amenities and physical needs. The Supreme Court in Sudesh Chhikara (2022) affirmed that this maintenance condition must be clearly stated in the registered deed.",
  },
  {
    q: "What is the stamp duty on a gift deed between blood relatives across Indian states?",
    a: "Many states offer major rebates for blood relatives. In Maharashtra, stamp duty for residential property gifted to children is a flat fee of ₹200. In Uttar Pradesh, it is capped at ₹5,000 plus registration cess for direct lineage, compared to standard 5% to 7% for non-relatives.",
  },
  {
    q: "Is a gift deed for property taxable under the Indian Income Tax Act?",
    a: "No, if executed between defined relatives. Under Section 56(2)(x) of the Income Tax Act, 1961, properties received from lineal ascendants, descendants, spouses, or siblings are 100% tax-free. Gifts to non-relatives exceeding ₹50,000 attract full income tax in the hands of the donee.",
  },
  {
    q: "Can a registered gift deed be cancelled if the recipient misbehaves later?",
    a: "An unconditional gift deed cannot be cancelled unilaterally once accepted. However, if the deed includes a Section 23 maintenance covenant or a valid Section 126 conditional revocation clause, the senior donor can petition the Maintenance Tribunal or civil court to cancel the transfer.",
  },
  {
    q: "What is the key difference between a property gift deed and a registered Will?",
    a: "A gift deed transfers ownership immediately during your lifetime, requires upfront state stamp duty, and divests the donor of title. A Will takes effect only after the testator passes away, remains fully revocable during life, and incurs only nominal registration charges.",
  },
  {
    q: "Can an ancestral property or HUF coparcenary share be gifted in India?",
    a: "A coparcener cannot gift undivided ancestral coparcenary property to an outsider without the written consent of all other coparceners. However, a coparcener can voluntarily surrender or relinquish their share to other co-heirs, or gift their separate, self-acquired property freely.",
  },
  {
    q: "Does a gift deed require the signature and physical presence of the recipient?",
    a: "Yes. Section 122 of the Transfer of Property Act requires acceptance by or on behalf of the donee during the lifetime of the donor. At the Sub-Registrar office, both donor and donee must present government identity proofs and complete biometric fingerprint verification.",
  },
];

const GIFT_DEED_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/gift-deed-drafting-registration#webpage",
      url: "https://www.willdrafting.in/services/gift-deed-drafting-registration",
      name: "Gift Deed Lawyer India | Drafting & SRO Registration",
      description:
        "Expert advocate assistance for gift deed lawyer india under Transfer of Property Act. High Court drafting, SRO registration, and senior asset defense.",
      datePublished: "2026-10-28",
      dateModified: "2026-10-28",
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
        url: "https://www.willdrafting.in/images/gift-deed-drafting-registration-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "Gift Deed Lawyer India High Court Drafting and Sub-Registrar SRO Registration Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/gift-deed-drafting-registration#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/gift-deed-drafting-registration#legalservice",
      name: "AMA Legal Solutions Gift Deed & Conveyancing Practice",
      url: "https://www.willdrafting.in/services/gift-deed-drafting-registration",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/gift-deed-drafting-registration-og.jpg",
      description:
        "Pan-India property transfer, senior citizen asset protection, and Sub-Registrar conveyancing legal practice specializing in High Court drafting, Section 23 covenants, and blood-relative SRO registrations.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
        { "@type": "AdministrativeArea", name: "Maharashtra" },
        { "@type": "AdministrativeArea", name: "Karnataka" },
        { "@type": "AdministrativeArea", name: "Punjab & Haryana" },
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/gift-deed-drafting-registration#service",
      name: "Gift Deed Drafting, Stamp Duty Optimization & Sub-Registrar Registration",
      serviceType:
        "Property Conveyancing, Senior-Safe Gift Deed Drafting & SRO Registration",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/gift-deed-drafting-registration#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Property Gift Deed Drafting & SRO Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "9990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Concessional Blood Relative Gift Deed Drafting",
              description:
                "Custom drafting by High Court advocates under the Transfer of Property Act, 1882 with state stamp duty concession structuring and verified property schedules.",
            },
          },
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Senior-Safe Gift Deed with Section 23 Protection Clause",
              description:
                "Comprehensive gift deed drafting embedded with statutory Section 23 filial maintenance and lifetime exclusive residence covenants compliant with Supreme Court precedents.",
            },
          },
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "End-to-End High Court Drafting & SRO In-Person Registration Support",
              description:
                "Complete deed preparation, e-stamping facilitation, Sub-Registrar appointment booking, and advocate accompaniment for biometric registration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/gift-deed-drafting-registration#howto",
      name: "How Property Owners Execute a Legally Binding Gift Deed in India",
      description:
        "Four-step statutory protocol to draft, e-stamp, and register an ironclad property gift deed under the Transfer of Property Act and Registration Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Title Audit & Encumbrance Verification",
          "text": "Inspect the parent sale deed, mutation records, and encumbrance certificate (EC) to confirm clear, marketable title and absence of bank mortgages.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Senior-Safe Advocate Drafting & Section 23 Covenants",
          "text": "Structure clear property schedules, boundary descriptions, explicit acceptance recitals, and mandatory Section 23 maintenance clauses for senior donors.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "State E-Stamping & Duty Optimization",
          "text": "Calculate applicable state stamp duty rebates for blood relatives and purchase non-judicial e-stamp paper with correct municipal revenue head codes.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Sub-Registrar SRO Biometric Registration & Mutation",
          "text": "Present the deed before the jurisdictional Sub-Registrar with two independent witnesses, complete biometric authentication, and initiate municipal mutation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/gift-deed-drafting-registration#faq",
      mainEntity: GIFT_DEED_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/gift-deed-drafting-registration#breadcrumb",
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
          "name": "Gift Deed Lawyer India",
          "item":
            "https://www.willdrafting.in/services/gift-deed-drafting-registration",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    unconditionalGift: "Transfer of Property Act, 1882 (s. 122) & Registration Act, 1908",
    seniorSafeGift: "TPA, 1882 s. 122 read with MWPSC Act, 2007 s. 23",
    registeredWill: "Indian Succession Act, 1925 (s. 63) & Personal Succession Laws",
  },
  {
    feature: "When Title Transfers",
    unconditionalGift: "Immediately upon SRO registration and physical delivery",
    seniorSafeGift: "Immediately, subject to express statutory filial care covenants",
    registeredWill: "Only after testator's demise (zero lifetime divestment)",
  },
  {
    feature: "Compulsory SRO Registration",
    unconditionalGift: "Yes (Compulsory under Section 17(1)(a) of Registration Act)",
    seniorSafeGift: "Yes (Compulsory under Section 17(1)(a) with Section 23 recital)",
    registeredWill: "Optional under Section 18(e), highly recommended for evidentiary proof",
  },
  {
    feature: "State Stamp Duty Liability",
    unconditionalGift: "State blood-relative concession or standard 5% to 8% ad-valorem",
    seniorSafeGift: "State blood-relative concession or standard 5% to 8% ad-valorem",
    registeredWill: "Zero stamp duty; nominal SRO registration fee (₹0 to ₹500)",
  },
  {
    feature: "Lifetime Revocability",
    unconditionalGift: "Irrevocable once accepted by donee; cannot be cancelled alone",
    seniorSafeGift: "Revocable before Maintenance Tribunal if child neglects parent",
    registeredWill: "100% revocable anytime during testator's lifetime",
  },
  {
    feature: "Protection Against Eviction",
    unconditionalGift: "None; child obtains unrestricted title and can seek possession",
    seniorSafeGift: "Absolute; deed explicitly reserves lifetime exclusive residence",
    registeredWill: "Complete; testator remains 100% owner until death",
  },
  {
    feature: "Municipal Mutation Acceptance",
    unconditionalGift: "Immediate Khata and Dakhil Kharij mutation in recipient's name",
    seniorSafeGift: "Immediate mutation with recorded senior life-interest encumbrance",
    registeredWill: "Mutation occurs only post-death with death certificate and NOC",
  },
];

const SAMPLE_SECTION_23_CLAUSE = `WHEREAS the Donor is an elderly senior citizen aged [Age] years, and is voluntarily conveying the Schedule Property out of natural love and affection, subject to the express, non-negotiable statutory condition under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007;

AND WHEREAS this Gift is expressly conditional upon the Donee providing all basic amenities, physical healthcare, boarding, lodging, emotional maintenance, and day-to-day medical needs of the Donor throughout the Donor's natural lifetime;

AND WHEREAS the Donor expressly reserves the absolute, unfettered lifetime right of residence in the entire Schedule Property without any interference, obstruction, or demand for rent by the Donee;

NOW THIS DEED WITNESSETH that in the event the Donee neglects, refuses, or fails to provide such basic amenities, healthcare, or physical needs, or attempts to disrupt the Donor's peaceful lifetime residence, this Gift Deed shall be deemed void, fraudulent, and revoked at the sole option of the Donor, who shall be entitled to summary relief before the Maintenance Tribunal under Section 23 of the MWPSC Act, 2007.`;

export default function GiftDeedDraftingRegistrationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GIFT_DEED_SCHEMA) }}
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
              Gift Deed Lawyer India
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
                Advocate Anuj Anand Malik
              </a>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              Legally Verified by{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>
            </span>
            <span className="hidden sm:inline">·</span>
            <time dateTime="2026-10-28" className="text-[#6B7280]">
              Updated October 28, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 49 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · SRO Registration · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 49 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Gift Deed Drafting &amp; Registration Advocates India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Transferring real estate to your child or spouse requires careful
                legal drafting. Under Section 122 of the Transfer of Property
                Act, a standard gift deed is permanent once accepted. Elderly
                parents face sudden eviction if their deed lacks protective
                terms. Our High Court advocates draft senior-safe gift deeds with{" "}
                <strong className="text-[#111827]">
                  Section 23 Senior Citizens Act protection
                </strong>
                , optimize state stamp duty, and complete Sub-Registrar
                registration smoothly.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Property Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#gift-vs-will-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Gift Deed vs Will</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 23 Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Income Tax (Relatives)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Sub-Registrar SRO Slot</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Standard Gift Deeds Risk Litigation
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Standard Gift Deeds Risk Senior Dispossession
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Unconditional Wording Means No Return:</strong> Online
                    drafts transfer property outright. If a child stops caring for
                    elderly parents later, the parent cannot revoke the gift in
                    civil court.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Supreme Court Precedent in Sudesh Chhikara:</strong> The
                    Supreme Court ruled that Maintenance Tribunals cannot cancel a
                    gift deed unless the deed contains an explicit maintenance
                    clause.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Missing Blood-Relative Concession:</strong> Failing to
                    attach verified family proof triggers standard 7% stamp duty
                    instead of concessional state rates.
                  </span>
                </li>
              </ul>
              <Link
                href="/templates/gift-deed-format-blood-relatives-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Blood Relative Gift Deed Formats</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <GiftDeedInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Documentation</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Gift Deed vs Registered Will
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an advocate-drafted property gift deed safeguards your title,
              guarantees senior citizen maintenance, and complies with Sub-Registrar
              registration mandates:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/gift-deed-drafting-registration-og.jpg"
              alt="Gift Deed Lawyer India High Court Drafting and Sub-Registrar SRO Registration Counsel"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Gift Deed drafting under
                the Transfer of Property Act, 1882 and Section 23 of the MWPSC Act, 2007.
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
        <section id="gift-vs-will-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Gift Deed vs Will vs Settlement: Key Differences
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing between an immediate gift and a testamentary Will impacts
              your control, stamp duty expense, and eviction risks. Compare how
              Indian property law treats each legal instrument:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Unconditional Gift Deed
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Senior-Safe Gift Deed (Sec 23)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Registered Legal Will
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
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.unconditionalGift}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.seniorSafeGift}
                      </td>
                      <td className="py-5 px-6 text-[#172228]">
                        {row.registeredWill}
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
              <span>SRO Execution Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Gift Deed Registration Roadmap
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court advocates handle the complete gift deed procedure.
              Follow this structured 4-step path to transfer property safely:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Title & Khata Verification",
                desc: "We examine parent sale deeds, encumbrance certificates, and municipal tax receipts. This confirms clear ownership and absence of mortgage liens.",
              },
              {
                step: "02",
                title: "Senior-Safe Drafting",
                desc: "Our advocates craft bespoke clauses. We insert Section 23 filial support conditions and lifetime residence covenants to safeguard parents.",
              },
              {
                step: "03",
                title: "Stamp Duty Optimization",
                desc: "We calculate concessional state stamp duties for blood relatives. We purchase e-stamp certificates under correct government treasury heads.",
              },
              {
                step: "04",
                title: "SRO Biometric Registration",
                desc: "Our advocates book Sub-Registrar appointment slots, verify witnesses, guide biometric execution, and facilitate municipal mutation.",
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
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Section 23 Senior Protection Clause
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              In Sudesh Chhikara v. Ramti Devi (2022 SC), the Supreme Court
              clarified that oral promises of maintenance are not enforceable
              before the Maintenance Tribunal. You must include this explicit
              statutory condition directly in the registered gift deed:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <CopyableGiftDeedClauseBox
                title="Statutory Section 23 MWPSC Act Revocation Clause"
                code={SAMPLE_SECTION_23_CLAUSE}
                explanation="This clause empowers elderly parents to file a summary petition before the Maintenance Tribunal (SDM) to cancel the gift deed and recover possession if the child neglects physical or medical support."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Sub-Registrar Registration Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Sub-Registrar offices require these verified documents for
                  biometric registration:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Original Title Deed:</strong> Registered sale deed or
                      allotment letter proving donor ownership.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Identity Proofs:</strong> Aadhaar card and PAN card
                      for donor, donee, and two witnesses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Relationship Evidence:</strong> Birth certificate or
                      passport claiming blood-relative stamp duty concessions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Municipal Tax Receipt:</strong> Up-to-date property
                      tax payment slip and utility clearance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Witnesses:</strong> Independent adult witnesses
                      who personally know donor and donee.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Deed Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Link to Interactive Calculator */}
          <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1">
                  Need to Compare Gift Deed Stamp Duty vs Will Registration Costs?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Use our statutory calculator to compare state-wise stamp duty,
                  court fees, and registration costs before making a property transfer.
                </p>
              </div>
            </div>
            <Link
              href="/tools/gift-deed-vs-will-stamp-duty-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Calculate Stamp Duty</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. SENIOR CITIZENS PROTECTION & TAX EXEMPTION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Statutory Tax &amp; Senior Defense</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Senior Citizen Protection &amp; Income Tax Exemptions
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Section 56(2)(x) of the Income Tax Act exempts property gifts
                between defined relatives from income tax. Relatives include
                spouses, siblings, lineal ascendants, and descendants. Transfers
                within these categories attract zero tax liability for the recipient.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                However, senior parents should never sign away all family assets
                at once. Many families choose a hybrid estate plan: transferring one
                home via a Section 23-protected gift deed, while securing bank
                deposits, mutual funds, and ancestral shares in a court-ready Will.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Advocate Gift Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for Remaining Assets</span>
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
              <span>Gift Deed Law FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Gift Deed Drafting
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GIFT_DEED_FAQS.map((item, idx) => (
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
                Related Indian Conveyancing &amp; Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore statutory templates, revocation checkers, and related
                conveyancing services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/templates/gift-deed-format-blood-relatives-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Blood Relative Gift Deed Format</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/senior-citizen-section-23-gift-revocation-checker"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Senior Citizen Section 23 Revocation Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/blogs/gift-deed-vs-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Gift Deed vs Will Legal Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed (Haq Tyag)</span>
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
              Editorial &amp; Statutory Compliance Attribution
            </div>
            <div className="text-base font-semibold text-[#111827] mb-1">
              Authored by{" "}
              <a
                href="https://www.linkedin.com/in/iamanujmalik/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C65378] transition-colors"
              >
                Advocate Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This legal guide is prepared under the Transfer of Property Act,
              1882, the Registration Act, 1908, the Maintenance and Welfare of
              Parents and Senior Citizens Act, 2007, and the Income Tax Act, 1961.
              Judicial precedents cited include Sudesh Chhikara v. Ramti Devi
              (2022 SC) and Urmila Dixit v. Sunil Sharan Dixit (2025 SC). This
              content provides statutory education and does not replace
              individualized advocate counsel.
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
