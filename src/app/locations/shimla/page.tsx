import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShimlaLocationClient from "./ShimlaLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Shimla: Online Will & Property Guide",
  },
  description:
    "Draft a valid Will in Shimla. Complete guidance on Section 118 HP Tenancy Act, apple orchard succession, Shimla MC mutation, and SRO registration online.",
  keywords: [
    "will drafting in shimla",
    "will registration shimla sro",
    "section 118 hp tenancy act will",
    "apple orchard succession shimla",
    "estate lawyer himachal",
    "shimla municipal corporation mutation will",
    "high court of himachal pradesh probate",
    "himbhoomi jamabandi will mutation shimla",
    "himuda flat transfer will new shimla",
    "sub registrar office shimla urban dc office",
    "sub registrar office shimla rural boileauganj",
    "theog apple orchard will registration",
    "kotkhai jubbal orchard succession",
    "rohru pabbar valley will drafting",
    "section 31 registration act home visit shimla",
    "e-himsugam will registration appointment",
    "online will drafting services shimla",
    "ama legal solutions shimla will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/shimla",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/shimla",
      "x-default": "https://www.willdrafting.in/locations/shimla",
    },
  },
  openGraph: {
    title: "Will Drafting in Shimla: Online Will & Property Guide",
    description:
      "Draft a valid Will in Shimla. Complete guidance on Section 118 HP Tenancy Act, apple orchard succession, Shimla MC mutation, and SRO registration online.",
    url: "https://www.willdrafting.in/locations/shimla",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-shimla-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Shimla Himachal Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Shimla: Online Will & Property Guide",
    description:
      "Draft a valid Will in Shimla. Complete guidance on Section 118 HP Tenancy Act, apple orchard succession, Shimla MC mutation, and SRO registration online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-shimla-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SHIMLA_FAQS = [
  {
    q: "Is Will registration mandatory in Shimla?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Shimla. A Will written on standard paper signed before two independent witnesses is legally enforceable. However, registering your Will at the Shimla Sub-Registrar Office places it into permanent Book III government records. This prevents fraudulent challenges, satisfies Section 118 scrutiny, and guarantees rapid mutation with the Shimla Municipal Corporation and revenue authorities.",
  },
  {
    q: "How does Section 118 of the HP Tenancy Act affect apple orchard succession?",
    a: "Section 118 of the Himachal Pradesh Tenancy and Land Reforms Act, 1972 restricts the transfer of agricultural land to non-agriculturists. Natural legal heirs can inherit ancestral farmland and apple orchards through a Will without restriction. However, bequeathing agricultural land to non-agriculturists or entities lacking HP agriculturist status requires prior statutory permission from the State Government under Section 118(2)(h).",
  },
  {
    q: "Is probate compulsory for a Will in Shimla under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory solely within the historical presidency towns of Mumbai, Kolkata, and Chennai. Shimla is a non-presidency jurisdiction. The High Court of Himachal Pradesh in Shimla has consistently upheld that probate is not mandatory for Hindu, Sikh, Jain, and Buddhist Wills, enabling direct property transfer upon registering the Will.",
  },
  {
    q: "What is the official government fee to register a Will in Shimla?",
    a: "Testamentary Wills are completely exempt from ad valorem stamp duty across Himachal Pradesh under the Indian Stamp Act, 1899 as applicable to the state. At Shimla Sub-Registrar offices, testators pay only a flat nominal registration fee of approximately ₹100 to ₹500 plus modest computer scanning charges. There is zero percentage-based market value stamp duty.",
  },
  {
    q: "How does a registered Will help with Shimla Municipal Corporation (SMC) mutation?",
    a: "Shimla Municipal Corporation requires clear documentary evidence of succession before substituting ownership on the property tax assessment register for core area and green belt properties. A registered Will provides conclusive proof of the deceased testator's intentions, eliminating the need for expensive civil court succession certificates or contentious legal heir disputes.",
  },
  {
    q: "How is Intiqal mutation carried out for apple orchards in HimBhoomi?",
    a: "Following the testator's demise, the nominated successor submits the registered Will and certified death certificate to the Halqa Patwari. The Patwari enters the Intiqal (mutation entry) in the revenue register under the Himachal Pradesh Land Revenue Act, 1954. Once reviewed and sanctioned by the Revenue Tehsildar, the updated Jamabandi is published on the official HimBhoomi digital portal.",
  },
  {
    q: "Can senior citizens in Shimla register a Will from home under Section 31?",
    a: "Yes. Given Shimla's steep hilly terrain and stepped walkways, senior citizens, bedridden individuals, or persons facing physical mobility constraints can request a home visit under Section 31 of the Registration Act, 1908. Supported by a medical practitioner's certificate, the Sub-Registrar visits the residence in Chotta Shimla, Sanjauli, New Shimla, or rural tehsils with portable biometric devices.",
  },
  {
    q: "How does a Will impact HIMUDA flat and plot transfers in New Shimla?",
    a: "Himachal Pradesh Housing and Urban Development Authority (HIMUDA) housing schemes in New Shimla, Kasumpti, and Mehli require testamentary validation for title transfer. A registered Will directs HIMUDA to mutate the leasehold or freehold title directly in the beneficiary's name, avoiding tripartite complications and prolonged legal delays.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Shimla Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any asset, orchard parcel, or monetary bequest under the Will. Family physicians, longtime neighbors, or family friends are ideal witnesses.",
  },
  {
    q: "Can non-resident Himachalis or NRIs make a Will for property situated in Shimla?",
    a: "Yes. Himachalis working across Chandigarh, Delhi NCR, overseas, or serving in the armed forces can draft a customized Will online specifying their Shimla assets. They can execute the Will before two independent witnesses wherever they reside. To ensure seamless revenue mutation, they can complete formal Book III registration before a Shimla Sub-Registrar during their visit home.",
  },
];

export default function ShimlaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/shimla";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-shimla.jpg";

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
        name: "Will Drafting in Shimla: Online Will & Property Guide",
        description:
          "Draft a valid Will in Shimla. Complete guidance on Section 118 HP Tenancy Act, apple orchard succession, Shimla MC mutation, and SRO registration online.",
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
          caption: "Legal Will Drafting and Property Succession in Shimla Himachal Pradesh",
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
            name: "Shimla",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Shimla - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Section 118 HP Tenancy Act compliance, e-Himsugam registration, and doorstep execution support across Shimla, Theog, Rohru, and Kotkhai.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shimla",
          addressRegion: "Himachal Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Shimla" },
          { "@type": "City", name: "The Mall" },
          { "@type": "City", name: "Sanjauli" },
          { "@type": "City", name: "Chotta Shimla" },
          { "@type": "City", name: "New Shimla" },
          { "@type": "City", name: "Kasumpti" },
          { "@type": "City", name: "Boileauganj" },
          { "@type": "City", name: "Theog" },
          { "@type": "City", name: "Kotkhai" },
          { "@type": "City", name: "Jubbal" },
          { "@type": "City", name: "Rohru" },
          { "@type": "City", name: "Rampur Bushahr" },
          { "@type": "City", name: "Kasauli" },
          { "@type": "City", name: "Solan" },
          { "@type": "City", name: "Mashobra" },
          { "@type": "City", name: "Shoghi" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Shimla Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Shimla Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Section 118 Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Shimla Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Shimla",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Shimla.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Shimla assets including Shimla Municipal Corporation properties, HIMUDA flats, apple orchards in Theog or Kotkhai with HimBhoomi Khasra numbers, and financial savings. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Section 118 Compliant Clauses",
            text: "Draft your Will using verified statutory clauses that comply with Section 118 of the HP Tenancy Act, clear orchard succession, survivorship, and revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar Appointment",
            text: "Book your registration appointment for the relevant Shimla Sub-Registrar Office via the e-Himsugam portal and pay the nominal government fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Shimla SRO",
            text: "Visit the Sub-Registrar Office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: SHIMLA_FAQS.map((item) => ({
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
      <ShimlaLocationClient faqs={SHIMLA_FAQS} />
      <Footer />
    </>
  );
}