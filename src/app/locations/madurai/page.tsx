import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaduraiLocationClient from "./MaduraiLocationClient";

// Title: Exactly 58 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Madurai: Registration & Probate Law Guide",
  },
  description:
    "Draft and register your Will in Madurai. Expert Madras High Court probate advice, asset distribution, and lawyer consultation in Madurai and.",
  keywords: [
    "will drafting in madurai",
    "will registration tnreginet madurai",
    "will drafting advocate kk nagar madurai",
    "will lawyer anna nagar madurai",
    "will drafting tallakulam madurai",
    "will registration sub registrar office madurai",
    "sub registrar office madurai north appointment",
    "sub registrar office madurai south appointment",
    "is probate mandatory in madurai",
    "section 213 indian succession act madurai",
    "madurai bench of madras high court probate",
    "tamil nilam patta transfer with will madurai",
    "madurai corporation property tax mutation will",
    "doorstep will registration madurai section 31",
    "ancestral property will drafting madurai",
    "textile business succession will madurai",
    "doctor medical certificate will madurai",
    "online will maker tamil nadu",
    "ama legal solutions madurai will drafting",
    "will registration fees in madurai",
    "estate planning lawyer madurai",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/madurai",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/madurai",
      "x-default": "https://www.willdrafting.in/locations/madurai",
    },
  },
  openGraph: {
    title: "Will Drafting in Madurai: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Madurai. Expert Madras High Court probate advice, asset distribution, and lawyer consultation in Madurai and.",
    url: "https://www.willdrafting.in/locations/madurai",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-madurai.jpg",
        width: 1024,
        height: 576,
        alt: "Legal Will Drafting and Estate Succession Services in Madurai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Madurai: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Madurai. Expert Madras High Court probate advice, asset distribution, and lawyer consultation in Madurai and.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-madurai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MADURAI_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Madurai?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidency towns of Chennai, Mumbai, and Kolkata. Madurai lies outside the original civil jurisdiction of Chennai. The Madras High Court and Supreme Court have established that probate is not compulsory for Hindu, Jain, Sikh, and Buddhist Wills in Madurai. A registered Will provides full authority for direct property and bank transmission.",
  },
  {
    q: "Is Will registration mandatory under Tamil Nadu Registration Department rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Madurai and across Tamil Nadu. A Will executed on plain white paper before two witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via TNREGINET creates an official government record in Book III, protects against false forgery claims, and ensures swift property tax mutation with the Madurai Corporation.",
  },
  {
    q: "How do I distribute ancestral property, residential plots, and agricultural land in Madurai?",
    a: "Under Indian succession law, a testator can only bequeath self-acquired properties and their defined undivided share in ancestral coparcenary property. For residential plots in K.K. Nagar, commercial shops near the Meenakshi Temple, or agricultural land in Melur or Thirumangalam, your Will must detail specific survey numbers, Patta numbers, and boundary descriptions to prevent family partition disputes.",
  },
  {
    q: "What is the official government fee to register a Will in Madurai?",
    a: "Wills are completely exempt from stamp duty across Tamil Nadu under the Indian Stamp Act, 1899. At Madurai Sub-Registrar offices via TNREGINET, you only pay a flat government registration fee of ₹100, plus nominal computer scanning and user charges of approximately ₹100 to ₹150. You do not pay any percentage-based stamp duty or property transfer tax.",
  },
  {
    q: "How does a registered Will help in transferring Patta on the Tamil Nilam portal?",
    a: "A registered Will serves as authentic legal evidence of testamentary succession before Madurai Taluk Revenue Authorities. Beneficiaries can submit the certified registered Will copy and death certificate online through the Tamil Nilam portal (eservices.tn.gov.in) or local e-Sevai centers to obtain a direct Patta or Chitta name transfer without waiting for expensive civil court succession certificates.",
  },
  {
    q: "Can an elderly or unwell person register a Will from home in Madurai?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators residing in Anna Nagar, SS Colony, Tallakulam, or any Madurai locality can request a doorstep home visit by the Sub-Registrar. You must submit an MBBS doctor medical fitness certificate and pay a prescribed government commission fee. Our legal team manages the complete commission petition.",
  },
  {
    q: "How do I book an appointment on TNREGINET for Will registration in Madurai?",
    a: "Appointments are scheduled online through the Tamil Nadu Registration Department portal (tnreginet.gov.in). You log into your citizen account, create a token under document registration for Book III (Will), enter the testator and two witnesses' details, select your local Madurai SRO, pay the registration fee, and download the appointment token slip with your designated time slot.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) from Madurai create a Will for local properties?",
    a: "Yes. NRIs residing in the USA, Singapore, Malaysia, the UK, or the Gulf who own properties or investments in Madurai can draft their Will online. They can execute it abroad before two independent witnesses, get it notarized or attested by the Indian Consulate, or complete formal SRO registration during an India visit. We also offer complete local estate administration support.",
  },
];

export default function MaduraiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/madurai";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-madurai.jpg";

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
        name: "Will Drafting in Madurai: Registration & Probate Law Guide",
        description:
          "Draft and register your Will in Madurai. Expert Madras High Court probate advice, asset distribution, and lawyer consultation in Madurai and.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1024,
          height: 576,
          caption: "Legal Will Drafting & Probate Support Services in Madurai",
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
            name: "Madurai",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Madurai - Estate Planning, Registration & Probate Guidance",
        description:
          "Professional Will drafting, lawyer verification, Tamil Nadu TNREGINET Sub-Registrar registration, and Madras High Court Madurai Bench probate.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madurai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Madurai" },
          { "@type": "City", name: "K.K. Nagar" },
          { "@type": "City", name: "Anna Nagar" },
          { "@type": "City", name: "Tallakulam" },
          { "@type": "City", name: "SS Colony" },
          { "@type": "City", name: "Ellis Nagar" },
          { "@type": "City", name: "Thiruparankundram" },
          { "@type": "City", name: "Mattuthavani" },
          { "@type": "City", name: "Sellur" },
          { "@type": "City", name: "Villapuram" },
          { "@type": "City", name: "Othakadai" },
          { "@type": "City", name: "Pasumalai" },
          { "@type": "City", name: "Avaniyapuram" },
          { "@type": "City", name: "Thirumangalam" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Madurai Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Madurai Residents",
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
                name: "Complete Tamil Nadu SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Madurai",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Tamil Nadu.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Madurai Assets and Beneficiaries",
            text: "Itemize your Madurai assets including residential plots, ancestral properties, commercial shops, bank deposits, and demat accounts. Appoint your beneficiaries and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Statutory Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior advocate to incorporate survivorship, specific bequest, and revocation clauses under the Indian Succession Act.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign each page before two independent adult witnesses who are not beneficiaries under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Appointment on TNREGINET Portal",
            text: "Schedule an appointment on tnreginet.gov.in for your jurisdictional Madurai Sub-Registrar office and pay the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Attend the Sub-Registrar office with both witnesses and original Aadhaar cards for biometric thumbprinting, web-camera photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MADURAI_FAQS.map((item) => ({
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
      <MaduraiLocationClient faqs={MADURAI_FAQS} />
      <Footer />
    </>
  );
}
