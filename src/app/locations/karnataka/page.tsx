import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KarnatakaLocationClient from "./KarnatakaLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 155 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Karnataka: Expert Online Will Services",
  },
  description:
    "Create a legally binding Will in Karnataka. Get Kaveri 2.0 registration guidance, tech estate planning, and agricultural land succession support statewide.",
  keywords: [
    "will drafting in karnataka",
    "will registration kaveri 2.0",
    "bhoomi portal will mutation",
    "tech equity will bangalore",
    "estate lawyer karnataka",
    "online will karnataka",
    "karnataka high court probate exemption",
    "kaveri portal will slot booking",
    "bbmp e khata will transfer bangalore",
    "agricultural land succession karnataka",
    "sub registrar office karnataka will",
    "section 31 registration act home visit karnataka",
    "karnataka stamp act will exemption",
    "mysuru will drafting advocate",
    "mangaluru will registration sro",
    "hubballi dharwad succession lawyer",
    "belagavi estate planning advocate",
    "startup esop will drafting bangalore",
    "ama legal solutions karnataka will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/karnataka",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/karnataka",
      "x-default": "https://www.willdrafting.in/locations/karnataka",
    },
  },
  openGraph: {
    title: "Will Drafting in Karnataka: Expert Online Will Services",
    description:
      "Create a legally binding Will in Karnataka. Get Kaveri 2.0 registration guidance, tech estate planning, and agricultural land succession support statewide.",
    url: "https://www.willdrafting.in/locations/karnataka",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-karnataka-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Karnataka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Karnataka: Expert Online Will Services",
    description:
      "Create a legally binding Will in Karnataka. Get Kaveri 2.0 registration guidance, tech estate planning, and agricultural land succession support statewide.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-karnataka-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const KARNATAKA_FAQS = [
  {
    q: "Is Will registration mandatory in Karnataka?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Karnataka. An unregistered Will executed on plain paper and signed before two independent witnesses is legally valid. However, registering your Will at a Karnataka Sub-Registrar Office via the Kaveri 2.0 portal places the document into permanent Book III government custody. This provides conclusive proof of genuine execution and prevents property disputes during BBMP e-Khata or Bhoomi land transfers.",
  },
  {
    q: "Is court probate required for a Will in Karnataka under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory solely in the historical presidency towns of Mumbai, Kolkata, and Chennai. Karnataka is a non-presidency jurisdiction. The High Court of Karnataka has settled that probate is non-mandatory for Indian citizens (including Hindus, Sikhs, Jains, Buddhists, Christians, and Muslims), allowing direct property transfer with a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Karnataka?",
    a: "Wills are 100% exempt from stamp duty across Karnataka under the Karnataka Stamp Act, 1957. At Karnataka Sub-Registrar offices, testators pay only a flat statutory registration fee of ₹200 plus nominal scanning charges of approximately ₹200 generated through KII-challan on Kaveri 2.0. There is zero percentage-based property market value duty.",
  },
  {
    q: "How do IT professionals and founders bequeath tech equity and ESOPs in Karnataka?",
    a: "Karnataka is India's tech hub where estates frequently feature unvested and vested ESOPs, US tech stocks (RSUs via global brokerage portals), demat equity portfolios, startup equity, and crypto wallets. Our estate lawyers draft precise testamentary succession clauses that address corporate vesting schedules, power-of-attorney protocols, and nominee harmonization.",
  },
  {
    q: "How does a registered Will help with BBMP e-Khata ('A' Khata and 'B' Khata) mutation?",
    a: "Bruhat Bengaluru Mahanagara Palike (BBMP) requires documentary proof of succession to mutate municipal property records. A registered Will and death certificate enable direct e-Aasthi application submission, resulting in smooth 'A' Khata transfer or PID assignment without needing costly civil court succession certificates or legal heir disputes.",
  },
  {
    q: "How is agricultural land transferred via Will on the Karnataka Bhoomi portal?",
    a: "Agricultural farmland across Karnataka is governed by the Karnataka Land Revenue Act, 1964 and Karnataka Land Reforms Act, 1961. Following the testator's demise, the beneficiary submits the registered Will and death certificate to the jurisdictional Village Accountant and Revenue Inspector to update RTC / Pahani records via the online Bhoomi portal (bhoomi.karnataka.gov.in).",
  },
  {
    q: "How do I book an SRO appointment on the Kaveri 2.0 portal in Karnataka?",
    a: "Appointments are scheduled online through the Department of Stamps and Registration Karnataka portal (kaveri.karnataka.gov.in). Users log in, enter testator and witness KYC details, generate the KII-challan for the ₹200 registration fee, upload the draft Will copy, and select their preferred date and time slot at the relevant Sub-Registrar Office.",
  },
  {
    q: "Can senior citizens in Karnataka register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep commissioner visit. A registered MBBS doctor certifies inability to travel to the registry, and the Sub-Registrar visits your home with portable biometric hardware.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Karnataka Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted colleagues, or family friends are ideal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located across Karnataka?",
    a: "Yes. Many NRIs residing across the USA, UK, UAE, Singapore, and Europe own residential flats and plots in Bengaluru, Mysuru, and Mangaluru. NRIs can draft a comprehensive Will online, execute it before two witnesses abroad, and have it notarized or apostilled, or complete Book III SRO registration during an India visit.",
  },
];

export default function KarnatakaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/karnataka";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-karnataka.jpg";

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
        name: "Will Drafting in Karnataka: Expert Online Will Services",
        description:
          "Create a legally binding Will in Karnataka. Get Kaveri 2.0 registration guidance, tech estate planning, and agricultural land succession support statewide.",
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
          caption: "Legal Will Drafting and Property Succession in Karnataka",
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
            name: "Karnataka",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Karnataka - Estate Planning & Kaveri 2.0 Registration",
        description:
          "Professional Will drafting, advocate verification, Kaveri 2.0 online slot booking, and doorstep execution support across Bengaluru, Mysuru, Mangaluru, Hubballi, Belagavi, and all districts of Karnataka.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Karnataka" },
          { "@type": "City", name: "Bengaluru" },
          { "@type": "City", name: "Mysuru" },
          { "@type": "City", name: "Mangaluru" },
          { "@type": "City", name: "Hubballi" },
          { "@type": "City", name: "Dharwad" },
          { "@type": "City", name: "Belagavi" },
          { "@type": "City", name: "Kalaburagi" },
          { "@type": "City", name: "Ballari" },
          { "@type": "City", name: "Udupi" },
          { "@type": "City", name: "Tumakuru" },
          { "@type": "City", name: "Shivamogga" },
          { "@type": "City", name: "Davanagere" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Karnataka Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Karnataka Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Estate Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Karnataka Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Karnataka",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Karnataka.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Karnataka real estate including BBMP flats, BDA plots, tech company ESOPs, and Bhoomi agricultural lands. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, tech equity inheritance, survivorship, guardian appointments, and revocation of prior wills.",
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
            name: "Book Kaveri 2.0 SRO Slot Online",
            text: "Schedule your registration appointment on the Kaveri 2.0 portal for your relevant Karnataka SRO and pay the nominal ₹200 registration fee via KII-challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Karnataka SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KARNATAKA_FAQS.map((item) => ({
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
      <KarnatakaLocationClient faqs={KARNATAKA_FAQS} />
      <Footer />
    </>
  );
}
