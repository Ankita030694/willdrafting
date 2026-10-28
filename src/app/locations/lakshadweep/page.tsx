import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LakshadweepLocationClient from "./LakshadweepLocationClient";

// Title: Exactly 50 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 142 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Lakshadweep: Customary Will Guide",
  },
  description:
    "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam customary property, island tenancy regulations, and SRO Kavaratti registration.",
  keywords: [
    "will drafting in lakshadweep",
    "marumakkathayam will succession lakshadweep",
    "will registration kavaratti",
    "kerala high court jurisdiction lakshadweep",
    "online will",
    "velliazha property will lakshadweep",
    "belasha property will",
    "sro kavaratti will appointment",
    "agatti island will drafting",
    "amini island succession",
    "andrott island property will",
    "minicoy island will drafting maliku",
    "kalpeni island succession",
    "lakshadweep land revenue tenancy regulation 1965",
    "section 31 registration act home visit lakshadweep",
    "is probate mandatory in lakshadweep",
    "kerala high court probate exemption lakshadweep",
    "ama legal solutions lakshadweep will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/lakshadweep",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/lakshadweep",
      "x-default": "https://www.willdrafting.in/locations/lakshadweep",
    },
  },
  openGraph: {
    title: "Will Drafting in Lakshadweep: Customary Will Guide",
    description:
      "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam customary property, island tenancy regulations, and SRO Kavaratti registration.",
    url: "https://www.willdrafting.in/locations/lakshadweep",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-lakshadweep-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Lakshadweep Islands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Lakshadweep: Customary Will Guide",
    description:
      "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam customary property, island tenancy regulations, and SRO Kavaratti registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-lakshadweep-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const LAKSHADWEEP_FAQS = [
  {
    q: "Is Will registration mandatory in Lakshadweep?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Lakshadweep. A Will drafted on plain white paper and attested by two independent adult witnesses is legally binding. However, registering your Will at the Sub-Registrar Office in Kavaratti or your island Sub-Divisional registry enters it into permanent Book III government records. This safeguards against family disputes during revenue mutation before the Tehsildar.",
  },
  {
    q: "Is probate compulsory for a Will in Lakshadweep under Kerala High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only for Wills executed within or concerning immovable properties located in the historical presidency towns of Mumbai, Kolkata, and Chennai. Although the Kerala High Court exercises constitutional territorial jurisdiction over Lakshadweep, the islands lie outside presidency town limits. Probate is non-mandatory for island residents, allowing direct property transfer with a registered Will.",
  },
  {
    q: "What is the difference between Belasha and Velliazha property under island customary law?",
    a: "Under Lakshadweep Marumakkathayam customary law, property is divided into two distinct classes. Velliazha (ancestral or tarawad property) descends through the female lineage and belongs collectively to the matrilineal family; an individual cannot dispose of it through a Will without unanimous tarawad consent. Conversely, Belasha (self-acquired property) earned through individual enterprise or trade is subject to absolute testamentary freedom and can be freely bequeathed to anyone via a Will.",
  },
  {
    q: "Can non-islanders or non-natives inherit or acquire land in Lakshadweep through a Will?",
    a: "No. Under the Laccadive, Minicoy and Amindivi Islands Land Revenue and Tenancy Regulation, 1965, strict statutory prohibitions prevent non-natives from acquiring, holding, or receiving agricultural or residential land in Lakshadweep without prior written approval from the Union Territory Administrator. Testamentary bequests of immovable land parcels must respect these indigenous protective regulations.",
  },
  {
    q: "How does the Land Revenue and Tenancy Regulation 1965 affect Will mutation?",
    a: "Under Regulation 6 of 1965 and the Tenancy Rules of 1968, agricultural coconut holdings, cowle grants, and homestead plots require formal mutation before the local Tehsildar and Revenue Inspector. Presenting a registered Will alongside the testator death certificate provides conclusive legal proof of testamentary intention, ensuring swift updating of the island Record of Rights without civil litigation.",
  },
  {
    q: "What is the official government fee to register a Will at SRO Kavaratti?",
    a: "Wills are completely exempt from ad-valorem stamp duty across Lakshadweep because they are testamentary instruments taking effect after death. At the Sub-Registrar Office in Kavaratti or island Sub-Divisional registry desks, you pay only nominal statutory registration fees and administrative document processing charges of approximately ₹100 to ₹300. There are no percentage-based property valuation fees.",
  },
  {
    q: "How does Will succession work in Minicoy (Maliku) with Athiri and Avakar dwellings?",
    a: "Minicoy features a distinct island social structure divided into Athiris (traditional village units). Residential dwellings (Avakar) traditionally descend matrilocally to female lineage members who maintain the ancestral homestead. A Will in Minicoy can decisively distribute self-acquired properties, maritime vessels, personal assets, and financial accounts, while ensuring family homestead bequests harmoniously align with village traditions.",
  },
  {
    q: "Can senior citizens or ill testators in Lakshadweep register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons unable to undertake sea travel between islands can petition for a commission visit. Supported by an authorized medical fitness certificate, the Sub-Registrar or delegated island revenue magistrate attends the testator residence on Kavaratti, Agatti, Amini, or Andrott for home execution.",
  },
  {
    q: "Who can act as attesting witnesses for a Will in Lakshadweep?",
    a: "Any two adult individuals of sound mind who hold valid government photo identification such as Aadhaar cards or voter IDs can serve as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property, asset, or bequest under the Will. Respected community elders, neighbors, or island medical practitioners are recommended.",
  },
  {
    q: "How does a registered Will help with Village (Dweep) Panchayat mutation?",
    a: "Under the Lakshadweep Panchayats Regulation, 1994, local Village (Dweep) Panchayats maintain village registers and property tax records. A registered Will provides undeniable legal evidence of succession. This enables the Panchayat Secretary to swiftly substitute the beneficiary name on building assessment books and issue municipal ownership confirmations without delay.",
  },
];

export default function LakshadweepLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/lakshadweep";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-lakshadweep.jpg";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.willdrafting.in/#organization",
        name: "WillDrafting.in",
        url: "https://www.willdrafting.in",
        logo: "https://www.willdrafting.in/Logofinal.svg",
        parentOrganization: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Will Drafting in Lakshadweep: Local Will Guide",
        description:
          "Draft a valid Will in Lakshadweep. Guidance on Marumakkathayam local asset, island tenancy regulations, and SRO Kavaratti signing.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
          caption: "Legal Will Drafting and Asset Estate in Lakshadweep Islands",
        },
        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
            name: "Locations",
            item: "https://www.willdrafting.in/locations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Lakshadweep",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Lakshadweep - Local Estate & SRO Kavaratti Registration",
        description:
          "Professional Will drafting, Kerala High Court lawyer talk, Marumakkathayam local asset check, and SRO Kavaratti.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kavaratti",
          addressRegion: "Lakshadweep",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kavaratti" },
          { "@type": "City", name: "Agatti" },
          { "@type": "City", name: "Amini" },
          { "@type": "City", name: "Andrott" },
          { "@type": "City", name: "Minicoy" },
          { "@type": "City", name: "Kalpeni" },
          { "@type": "City", name: "Kadmat" },
          { "@type": "City", name: "Kiltan" },
          { "@type": "City", name: "Chetlat" },
          { "@type": "City", name: "Bitra" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Lakshadweep Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Lakshadweep Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Lawyer Talk & Marumakkathayam Local Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete SRO Kavaratti Will Registration & Island Home Visit Support",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Lakshadweep",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Lakshadweep.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Distinguish Belasha from Velliazha Assets",
            text: "List your self-acquired Belasha assets, bank savings, and fishing vessels separately from tarawad family Velliazha holdings. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal and Local Clauses",
            text: "Draft your Will using verified legal clauses adhering to Section 63 of the Indian Succession Act, island land revenue rules, and local matrilineal rules.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Submit at SRO Kavaratti or Island Sub-Division",
            text: "Present the signed Will to the SRO office in Kavaratti or your local island Sub-Divisional registry office, remitting nominal government signing fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Verbal Attestation and Book III Entry",
            text: "Appear with both witnesses for identity check, thumb impressions, and verbal affirmation to finalize official Book III government recording.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: LAKSHADWEEP_FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="form/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <LakshadweepLocationClient faqs={LAKSHADWEEP_FAQS} />
      <Footer />
    </>
  );
}
