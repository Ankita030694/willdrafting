import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KotaLocationClient from "./KotaLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Kota: Online Will Registration Support",
  },
  description:
    "Draft a legally compliant Will in Kota. Complete guidance on KDA property transfer, ePanjiyan registration, and educational enterprise.",
  keywords: [
    "will drafting in kota",
    "will registration rajasthan epanjiyan kota",
    "kda plot will transfer",
    "coaching institute succession will",
    "estate lawyer kota",
    "kota municipal corporation mutation will",
    "sub registrar office collectorate kota",
    "will drafting mahaveer nagar",
    "will drafting talwandi",
    "will drafting rajeev gandhi nagar",
    "will drafting landmark city",
    "will drafting dadabari",
    "will drafting kunhari",
    "will drafting vigyan nagar",
    "will drafting ramganj mandi",
    "section 31 registration act home visit kota",
    "is probate mandatory in kota",
    "rajasthan high court probate exemption",
    "epanjiyan rajasthan appointment booking",
    "student hostel commercial asset will kota",
    "kota stone quarry license succession",
    "ama legal solutions kota will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/kota",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/kota",
      "x-default": "https://www.willdrafting.in/locations/kota",
    },
  },
  openGraph: {
    title: "Will Drafting in Kota: Online Will Registration Support",
    description:
      "Draft a legally compliant Will in Kota. Complete guidance on KDA property transfer, ePanjiyan registration, and educational enterprise.",
    url: "https://www.willdrafting.in/locations/kota",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-kota-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Estate Succession in Kota Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Kota: Online Will Registration Support",
    description:
      "Draft a legally compliant Will in Kota. Complete guidance on KDA property transfer, ePanjiyan registration, and educational enterprise.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-kota-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const KOTA_FAQS = [
  {
    q: "Is Will registration mandatory in Kota?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Kota and across Rajasthan. A Will executed on plain white paper before two independent witnesses is legally valid and admissible in court. However, registering your Will at a Kota Sub-Registrar Office enters it into permanent Book III government custody. This provides strong evidentiary presumption against fraud and accelerates property mutation with the Kota Development Authority (KDA) and Kota Nagar Nigam.",
  },
  {
    q: "Is court probate required for a Will in Kota under Rajasthan High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Kota is a non-presidency district under the jurisdiction of the Rajasthan High Court. The High Court has consistently established that probate is non-mandatory for Hindu, Jain, Sikh, and Buddhist Wills in Rajasthan, allowing direct property transmission with a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Kota?",
    a: "Testamentary Wills are completely exempt from ad-valorem stamp duty across Rajasthan. You do not pay any percentage of your property market value. At Kota Sub-Registrar offices, you only pay a flat nominal registration fee of ₹100 along with computer scanning and data entry fees of approximately ₹150 to ₹300 on the ePanjiyan Rajasthan portal.",
  },
  {
    q: "How does a registered Will help in transferring Kota Development Authority (KDA) plots?",
    a: "The Kota Development Authority (formerly UIT Kota) requires unambiguous testamentary proof to substitute name in leasehold or freehold plot records. A registered Will, submitted alongside the testator's death certificate, legal heir affidavits, and indemnity bonds, enables direct mutation across residential sectors in Mahaveer Nagar, Talwandi, Kunhari, and RK Puram without costly civil succession suits.",
  },
  {
    q: "How can student hostel complexes and coaching institute businesses in Kota be bequeathed?",
    a: "Kota houses extensive multi-storey student hostel buildings, mess facilities, and coaching institute enterprises in Landmark City, Rajeev Gandhi Nagar, and Jawahar Nagar. A customized Will separates commercial real estate title from operational hospitality contracts, distributes corporate equity shares, and designates management succession to prevent operational disruption during active coaching academic sessions.",
  },
  {
    q: "Can Kota stone quarrying leases and mineral processing units be transferred via Will?",
    a: "Yes. Stone quarries, mineral concessions, and processing units in Ramganj Mandi, Chechat, and Anantpura Industrial Area can be bequeathed. The Will explicitly details mining leases governed by the Rajasthan Minor Mineral Concession Rules, partnership capital, and factory machinery, enabling smooth license substitution with the Mines and Geology Department.",
  },
  {
    q: "How do I book an ePanjiyan Rajasthan appointment for Will registration in Kota?",
    a: "Appointments are scheduled online via the official Rajasthan Registration & Stamps portal (epanjiyan.rajasthan.gov.in). You select your jurisdictional Kota SRO, enter testator and witness KYC information, generate the e-Challan for the nominal registration fee via e-GRAS, and select a convenient time slot for physical attendance and biometric capture.",
  },
  {
    q: "Can senior citizens in Kota register their Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically restricted residents in Talwandi, Dadabari, Vigyan Nagar, or elsewhere in Kota can request a home visit. A registered MBBS/MD doctor certifies physical inability to travel, and the Sub-Registrar attends your residence with portable biometric equipment to complete Book III registration.",
  },
  {
    q: "Who can act as valid attesting witnesses at Kota Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property, asset, or legacy under the Will. Family doctors, trusted neighbors, or long-standing family friends are ideal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their properties located in Kota?",
    a: "Yes. Many NRIs residing abroad own apartments, ancestral homes, or commercial hostel investments in Kota. NRIs can draft a customized India-compliant Will online. They can execute it before two witnesses abroad and have it notarized or apostilled, or complete formal Book III registration before a Kota Sub-Registrar during their visit to India.",
  },
];

export default function KotaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/kota";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-kota.jpg";

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
        name: "Will Drafting in Kota: Online Will Registration Support",
        description:
          "Draft a legally compliant Will in Kota. Complete guidance on KDA property transfer, ePanjiyan registration, and educational enterprise.",
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
          caption: "Legal Will Drafting and Estate Succession in Kota Rajasthan",
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
            name: "Kota",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Kota - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, ePanjiyan Rajasthan registration support, and doorstep execution across Kota, Talwandi.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kota",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kota" },
          { "@type": "City", name: "Mahaveer Nagar" },
          { "@type": "City", name: "Talwandi" },
          { "@type": "City", name: "Rajeev Gandhi Nagar" },
          { "@type": "City", name: "Landmark City" },
          { "@type": "City", name: "Dadabari" },
          { "@type": "City", name: "Kunhari" },
          { "@type": "City", name: "Vigyan Nagar" },
          { "@type": "City", name: "Jawahar Nagar" },
          { "@type": "City", name: "Shastri Nagar" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Nayapura" },
          { "@type": "City", name: "Rampura" },
          { "@type": "City", name: "Ladpura" },
          { "@type": "City", name: "Anantpura" },
          { "@type": "City", name: "RK Puram" },
          { "@type": "City", name: "Ramganj Mandi" },
          { "@type": "City", name: "Bundi Road" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kota Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Kota Residents",
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
                name: "Complete Kota Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Kota",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Kota.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Kota assets including KDA residential plots, student hostels in Landmark City or Rajeev Gandhi Nagar, coaching equity, and Ramganj Mandi quarry leases. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minors, and revocation of prior instruments.",
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
            name: "Book ePanjiyan Rajasthan Slot",
            text: "Schedule your registration appointment on the ePanjiyan Rajasthan portal (epanjiyan.rajasthan.gov.in) for your relevant Kota SRO and remit the nominal fee via e-GRAS.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Kota SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KOTA_FAQS.map((item) => ({
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
      <KotaLocationClient faqs={KOTA_FAQS} />
      <Footer />
    </>
  );
}
