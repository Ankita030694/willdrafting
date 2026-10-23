import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoimbatoreLocationClient from "./CoimbatoreLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Coimbatore: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Coimbatore. Expert guidance on industrial assets, Tamil Nadu SRO registration, and smooth family wealth distribution.",
  keywords: [
    "will drafting in coimbatore",
    "will registration tnreginet coimbatore",
    "industrial asset succession will",
    "estate planning lawyer coimbatore",
    "online will tamil nadu",
    "coimbatore corporation property mutation will",
    "sub registrar office coimbatore appointment",
    "will drafting advocate rs puram",
    "will drafting lawyer race course coimbatore",
    "will drafting in peelamedu",
    "will drafting in gandhipuram",
    "will drafting in saibaba colony",
    "will registration singanallur sro",
    "will registration ganapathy sro",
    "is probate mandatory in coimbatore",
    "section 213 indian succession act coimbatore",
    "tamil nilam patta transfer with will coimbatore",
    "ccmc property tax mutation will coimbatore",
    "doorstep will registration coimbatore section 31",
    "textile mill business succession will coimbatore",
    "kovai pumps foundry will drafting lawyer",
    "doctor medical certificate will coimbatore",
    "online will maker tamil nadu",
    "ama legal solutions coimbatore will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/coimbatore",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/coimbatore",
      "x-default": "https://www.willdrafting.in/locations/coimbatore",
    },
  },
  openGraph: {
    title: "Will Drafting in Coimbatore: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Coimbatore. Expert guidance on industrial assets, Tamil Nadu SRO registration, and smooth family wealth distribution.",
    url: "https://www.willdrafting.in/locations/coimbatore",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-coimbatore-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting & Wealth Distribution in Coimbatore Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Coimbatore: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Coimbatore. Expert guidance on industrial assets, Tamil Nadu SRO registration, and smooth family wealth distribution.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-coimbatore-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const COIMBATORE_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Coimbatore?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Coimbatore is outside Chennai municipal limits. The Madras High Court and Supreme Court have clarified that probate is not compulsory for Hindu, Sikh, Jain, and Buddhist Wills in Coimbatore. A registered Will provides full authority for direct property and bank transmission.",
  },
  {
    q: "Is Will registration mandatory under Tamil Nadu Registration Department rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Coimbatore and across Tamil Nadu. A Will executed on plain white paper before two witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via TNREGINET creates an official government record in Book III, protects against false forgery claims, and ensures swift CCMC property tax mutation.",
  },
  {
    q: "How do I distribute shares in textile mills, foundries, or pump manufacturing units in Coimbatore?",
    a: "Family-owned textile mills, precision engineering foundries, and motor pump manufacturing firms require precise bequest clauses. Your Will can specify the exact transfer of private limited equity shares, partnership capital balances, commercial sheds, and operational machinery to named successors. This prevents factory lockouts, operational disruptions, and multi-branch family litigation.",
  },
  {
    q: "What is the official government fee to register a Will in Coimbatore?",
    a: "Wills are 100% exempt from stamp duty across India under the Indian Stamp Act, 1899. At Coimbatore Sub-Registrar offices via TNREGINET, you only pay a flat government registration fee of ₹100, plus nominal computer scanning and user charges of approximately ₹100 to ₹150. You do not have to pay any percentage-based property tax to register a Will.",
  },
  {
    q: "How does a registered Will help in transferring Patta on the Tamil Nilam portal?",
    a: "A registered Will serves as authentic legal evidence of succession before Coimbatore Revenue Authorities. Beneficiaries can submit the certified registered Will copy and death certificate online through the Tamil Nilam portal (eservices.tn.gov.in) or local e-Sevai centers to obtain a direct Patta name transfer without waiting for expensive court succession certificates.",
  },
  {
    q: "Can a Coimbatore Sub-Registrar visit home for senior citizens under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators residing in RS Puram, Race Course, Peelamedu, or other Coimbatore localities can request a doorstep home visit by the Sub-Registrar. You must submit an MBBS doctor medical fitness certificate and pay a prescribed government commission fee. Our legal team manages the complete paperwork.",
  },
  {
    q: "How do I book an appointment on TNREGINET for Will registration in Coimbatore?",
    a: "Appointments are booked online through the Tamil Nadu Registration Department portal (tnreginet.gov.in). You log into your citizen account, create a token under document registration for Book III (Will), enter the testator and two witnesses' details, select your local Coimbatore SRO, pay the registration fee, and download the appointment token slip with your time slot.",
  },
  {
    q: "Who can be witnesses to a Will in Coimbatore, and must they visit the SRO?",
    a: "Under Section 63 of the Indian Succession Act, your Will must be attested by at least two adult witnesses of sound mind. Crucially, witnesses must not be beneficiaries receiving assets under the Will, nor should they be spouses of beneficiaries (Section 67). Both witnesses must physically accompany the testator to the Coimbatore Sub-Registrar Office with original Aadhaar cards and photographs.",
  },
  {
    q: "How does Coimbatore City Municipal Corporation (CCMC) update property tax name with a Will?",
    a: "Coimbatore City Municipal Corporation (CCMC) revenue offices across East, West, North, South, and Central zones accept certified registered Will copies along with the death certificate and encumbrance certificate. Because probate is not mandatory in Coimbatore, CCMC updates property tax assessments directly without insisting on High Court probate decrees.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) from Coimbatore create a Will for Kongu region properties?",
    a: "Yes. NRIs residing in the USA, Singapore, the UK, or the Gulf who own commercial buildings, agricultural groves, or flats in Coimbatore can draft their Will online. They can execute it abroad before two independent witnesses, get it notarized or attested by the Indian Consulate, or complete formal SRO registration during an India trip. We also offer local estate administration support.",
  },
];

export default function CoimbatoreLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/coimbatore";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-coimbatore-og.jpg";

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
        name: "Will Drafting in Coimbatore: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Coimbatore. Expert guidance on industrial assets, Tamil Nadu SRO registration, and smooth family wealth distribution.",
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
          caption: "Legal Will Drafting & Wealth Distribution in Coimbatore Tamil Nadu",
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
            name: "Coimbatore",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Coimbatore - Estate Planning, Industrial Succession & SRO Registration",
        description:
          "Professional Will drafting, industrial family enterprise succession advisory, and TNREGINET Sub-Registrar Office registration support across Coimbatore and Tamil Nadu.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Coimbatore" },
          { "@type": "City", name: "RS Puram" },
          { "@type": "City", name: "Race Course" },
          { "@type": "City", name: "Peelamedu" },
          { "@type": "City", name: "Gandhipuram" },
          { "@type": "City", name: "Saibaba Colony" },
          { "@type": "City", name: "Saravanampatti" },
          { "@type": "City", name: "Singanallur" },
          { "@type": "City", name: "Ramanathapuram" },
          { "@type": "City", name: "Ganapathy" },
          { "@type": "City", name: "Vadavalli" },
          { "@type": "City", name: "Kovaipudur" },
          { "@type": "City", name: "Thondamuthur" },
          { "@type": "City", name: "Sulur" },
          { "@type": "City", name: "Perur" },
          { "@type": "City", name: "Kurichi" },
          { "@type": "City", name: "Kuniyamuthur" },
          { "@type": "City", name: "Pollachi" },
          { "@type": "City", name: "Mettupalayam" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Coimbatore Will Drafting, Industrial Succession & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Coimbatore Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Industrial Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Coimbatore Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Coimbatore Tamil Nadu",
        description:
          "Five straightforward steps to create a legally binding Will and register it before the Sub-Registrar in Coimbatore.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Properties, Industrial Holdings, and Heirs",
            text: "Compile your Coimbatore residential properties, textile or foundry equity shares, bank accounts, and agricultural groves. Designate your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Exact Legal Clauses",
            text: "Draft your Will using our legally verified platform or with a senior estate advocate to include non-presidency probate clarity, business survivorship, and specific asset bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign every page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Coimbatore SRO Token on TNREGINET",
            text: "Schedule an appointment token on tnreginet.gov.in for your jurisdictional Coimbatore SRO and pay the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar Office with your two witnesses, original Aadhaar cards, and photos for biometric fingerprinting, digital photo capture, and Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: COIMBATORE_FAQS.map((item) => ({
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
      <CoimbatoreLocationClient faqs={COIMBATORE_FAQS} />
      <Footer />
    </>
  );
}
