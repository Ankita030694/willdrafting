import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LadakhLocationClient from "./LadakhLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 145 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Ladakh: Online Will & Succession Guide",
  },
  description:
    "Draft a valid Will in Ladakh. Expert guidance on local land inheritance practices, Leh and Kargil revenue records, and family asset distribution.",
  keywords: [
    "will drafting in ladakh",
    "will registration leh kargil",
    "ladakh revenue land succession",
    "high court of j&k and ladakh will",
    "online will lawyer ladakh",
    "will drafting leh",
    "will drafting kargil",
    "will drafting nubra valley",
    "will drafting zanskar",
    "will drafting drass",
    "lahdc leh land will transfer",
    "lahdc kargil revenue inheritance",
    "khangchen customary succession ladakh",
    "section 31 registration act home visit ladakh",
    "is probate mandatory in ladakh",
    "ladakh land revenue act intiqal",
    "leh sub registrar office will appointment",
    "kargil tehsildar will registration",
    "hotel property will succession leh",
    "ama legal solutions ladakh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/ladakh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/ladakh",
      "x-default": "https://www.willdrafting.in/locations/ladakh",
    },
  },
  openGraph: {
    title: "Will Drafting in Ladakh: Online Will & Succession Guide",
    description:
      "Draft a valid Will in Ladakh. Expert guidance on local land inheritance practices, Leh and Kargil revenue records, and family asset distribution.",
    url: "https://www.willdrafting.in/locations/ladakh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-ladakh-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Ladakh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Ladakh: Online Will & Succession Guide",
    description:
      "Draft a valid Will in Ladakh. Expert guidance on local land inheritance practices, Leh and Kargil revenue records, and family asset distribution.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-ladakh-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const LADAKH_FAQS = [
  {
    q: "Is Will registration mandatory in Ladakh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Ladakh. An unregistered Will executed on plain paper and signed before two independent witnesses is legally valid. However, registering your Will before the Sub-Registrar in Leh or Kargil places it into permanent Book III government custody. This prevents forged claims and ensures smooth revenue mutation with LAHDC authorities.",
  },
  {
    q: "How did the J&K Reorganisation Act 2019 affect Will drafting in Ladakh?",
    a: "The Jammu and Kashmir Reorganisation Act, 2019 made central laws directly applicable to the Union Territory of Ladakh. Testamentary succession is now governed by the Indian Succession Act, 1925 and the central Registration Act, 1908. This standardizes legal capacity, attestation standards, and execution procedures under established national judicial precedents.",
  },
  {
    q: "Is court probate mandatory for property succession in Ladakh?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. The High Court of Jammu & Kashmir and Ladakh has held that probate is non-mandatory in Ladakh. Legal heirs can mutate revenue records directly using a registered Will.",
  },
  {
    q: "How are ancestral farmlands and orchards in Ladakh transferred by Will?",
    a: "Agricultural lands, barley terraces, and apricot or walnut orchards in Leh and Kargil are governed by local revenue records. Upon the testator's demise, the beneficiary presents the registered Will and death certificate to the local Patwari and Tehsildar. A formal revenue mutation (Intiqal) entry is recorded, updating the Jamabandi and Khasra Girdawari records.",
  },
  {
    q: "What role do LAHDC Leh and LAHDC Kargil play in property succession?",
    a: "The Ladakh Autonomous Hill Development Councils (LAHDC Leh and LAHDC Kargil) oversee local governance, land allotment, and development planning. While statutory inheritance follows personal law and testamentary bequests, revenue mutations for council-allotted plots or town municipal records require verification against LAHDC developmental regulations.",
  },
  {
    q: "How does traditional Buddhist customary succession interact with a written Will?",
    a: "Traditional Ladakhi Buddhist families historically practiced customary family arrangements like the Khangchen-Khangchung system. However, under the Indian Succession Act, 1925, any person of sound mind can execute a written testamentary Will that legally supersedes uncodified customary practices, ensuring clear, enforceable asset division among children.",
  },
  {
    q: "How are Muslim family estates in Kargil governed under testamentary law?",
    a: "For Muslim testators in Kargil and Leh, testamentary succession is guided by Muslim Personal Law (Shariat). A testator can bequeath up to one-third of their net estate to non-heirs without the consent of lawful legal heirs. Any bequest exceeding one-third or made in favor of an existing legal heir requires the explicit post-death consent of all surviving heirs.",
  },
  {
    q: "What are the government registration fees for a Will in Ladakh?",
    a: "Wills are testamentary instruments and do not attract ad valorem stamp duty in Ladakh (₹0 stamp duty on Wills). At Leh and Kargil Sub-Registrar offices, testators only pay nominal registration charges and computerized scanning fees of approximately ₹100 to ₹300. There are no percentage-based property market value charges.",
  },
  {
    q: "Can senior citizens in Ladakh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep visit. An MBBS doctor certifies physical inability to travel. The Sub-Registrar attends your residence in Leh, Choglamsar, or Kargil with portable biometric equipment.",
  },
  {
    q: "How can hotel, guesthouse, and homestay owners in Ladakh bequeath their business?",
    a: "Commercial tourism assets in Leh, Nubra, and Pangong belt involve land titles, building structures, tourism department licenses, and bank accounts. A professionally drafted Will specifies operational management control, equity division among heirs, and leasehold succession, preventing operational paralysis during the tourism season.",
  },
];

export default function LadakhLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/ladakh";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-ladakh.jpg";

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
        name: "Will Drafting in Ladakh: Online Will & Succession Guide",
        description:
          "Draft a valid Will in Ladakh. Expert guidance on local land inheritance practices, Leh and Kargil revenue records, and family asset distribution.",
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
          caption: "Legal Will Drafting and Property Succession in Ladakh",
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
            name: "Ladakh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Ladakh - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Leh & Kargil revenue land records compliance, LAHDC succession, and Section 31 doorstep.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Leh",
          addressRegion: "Ladakh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Leh" },
          { "@type": "City", name: "Kargil" },
          { "@type": "City", name: "Choglamsar" },
          { "@type": "City", name: "Nubra Valley" },
          { "@type": "City", name: "Diskit" },
          { "@type": "City", name: "Hunder" },
          { "@type": "City", name: "Zanskar" },
          { "@type": "City", name: "Padum" },
          { "@type": "City", name: "Drass" },
          { "@type": "City", name: "Sankoo" },
          { "@type": "City", name: "Khaltsi" },
          { "@type": "City", name: "Nyoma" },
          { "@type": "City", name: "Durbuk" },
          { "@type": "City", name: "Shey" },
          { "@type": "City", name: "Thiksey" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ladakh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Ladakh Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Ladakh Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Ladakh",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Ladakh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Ladakh properties including Leh and Kargil town plots, ancestral agricultural terraces, hotels or homestays, and bank deposits. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, executor powers, guardian appointments for minors, and revocation of past instruments.",
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
            name: "Schedule Sub-Registrar Appointment",
            text: "Coordinate your registration appointment with the jurisdictional Sub-Registrar or Tehsildar office in Leh, Kargil, Nubra, or Zanskar.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Ladakh SRO",
            text: "Visit the Sub-Registrar office with both witnesses for identity verification, photograph capture, and thumb impression to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: LADAKH_FAQS.map((item) => ({
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <LadakhLocationClient faqs={LADAKH_FAQS} />
      <Footer />
    </>
  );
}
