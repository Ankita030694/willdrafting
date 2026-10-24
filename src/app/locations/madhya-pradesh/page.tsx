import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MadhyaPradeshLocationClient from "./MadhyaPradeshLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 155 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Madhya Pradesh: Online Will & MP Guide",
  },
  description:
    "Draft a legally valid Will in Madhya Pradesh. Complete MP Sampada 2.0 registration guidance, ancestral land succession rules, and legal consultation in MP.",
  keywords: [
    "will drafting in madhya pradesh",
    "will registration mp sampada",
    "mp bhulekh will mutation",
    "property will lawyer indore bhopal",
    "estate planning mp",
    "mp high court probate exemption",
    "sampada mpigr appointment slot",
    "indore development authority will transfer",
    "bhopal development authority will mutation",
    "jabalpur development authority plot will",
    "gwalior development authority property will",
    "mp housing board flat will transfer",
    "mp land revenue code namantran will",
    "section 31 registration act home visit mp",
    "ancestral property will madhya pradesh",
    "mitakshara coparcenary will mp",
    "sub registrar office indore bhopal jabalpur gwalior",
    "doctor mental fitness certificate will mp",
    "nri will drafting madhya pradesh",
    "ama legal solutions madhya pradesh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/madhya-pradesh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/madhya-pradesh",
      "x-default": "https://www.willdrafting.in/locations/madhya-pradesh",
    },
  },
  openGraph: {
    title: "Will Drafting in Madhya Pradesh: Online Will & MP Guide",
    description:
      "Draft a legally valid Will in Madhya Pradesh. Complete MP Sampada 2.0 registration guidance, ancestral land succession rules, and legal consultation in MP.",
    url: "https://www.willdrafting.in/locations/madhya-pradesh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-madhya-pradesh-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Madhya Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Madhya Pradesh: Online Will & MP Guide",
    description:
      "Draft a legally valid Will in Madhya Pradesh. Complete MP Sampada 2.0 registration guidance, ancestral land succession rules, and legal consultation in MP.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-madhya-pradesh-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MP_FAQS = [
  {
    q: "Is Will registration mandatory in Madhya Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Madhya Pradesh. A Will typed or handwritten on plain paper and signed before two independent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via the MP Sampada 2.0 portal enters it into permanent Book III public custody. This prevents fraudulent challenges and ensures fast mutation with municipal bodies and MP Bhulekh records.",
  },
  {
    q: "Is court probate required for a Will in Madhya Pradesh under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Madhya Pradesh is a non-presidency state. The Madhya Pradesh High Court (Principal Seat at Jabalpur and Benches at Indore and Gwalior) has repeatedly held that court probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills to establish succession.",
  },
  {
    q: "What is the official government fee to register a Will in Madhya Pradesh?",
    a: "Wills are completely exempt from ad-valorem stamp duty across Madhya Pradesh under the Indian Stamp Act as adapted for the state. At Madhya Pradesh Sub-Registrar offices, testators pay only a nominal statutory registration fee of approximately ₹200 to ₹500 via the MP Sampada 2.0 portal, plus minimal scanning and document handling fees. There are zero percentage-based property market charges.",
  },
  {
    q: "How are agricultural lands and farmhouses mutated on the MP Bhulekh portal via a Will?",
    a: "For agricultural land and rural parcels, mutation (Namantran) is processed under Section 109 and Section 110 of the Madhya Pradesh Land Revenue Code, 1959. Following the testator's demise, the beneficiary submits the registered Will and death certificate to the local Tehsildar or Patwari. The record of rights (Khasra and Khatauni) is updated online through the MP Bhulekh portal (mpbhulekh.gov.in).",
  },
  {
    q: "How does a registered Will facilitate property transfer with IDA, BDA, and JDA?",
    a: "Urban development authorities including Indore Development Authority (IDA), Bhopal Development Authority (BDA), and Jabalpur Development Authority (JDA) require conclusive proof of testamentary succession to transfer residential plots, commercial units, or 99-year leasehold rights. A registered Will serves as definitive proof before single-window citizen portals, preventing lengthy civil disputes.",
  },
  {
    q: "How do I book an MP Sampada 2.0 registration appointment in Madhya Pradesh?",
    a: "Appointments are booked digitally through the MP Commercial Tax & Registration Department portal (sampada.mpigr.gov.in). The testator or advocate selects the district SRO, enters testator and witness KYC details, uploads the draft Will, pays the nominal registration fee via MP Treasury Cyber Challan, and schedules an appointment slot.",
  },
  {
    q: "Can senior citizens in Madhya Pradesh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with mobility restrictions can request a home visit by the Sub-Registrar. A registered MBBS doctor certifies that the testator is mentally competent but physically unable to travel. The Sub-Registrar attends your residence with portable biometric equipment.",
  },
  {
    q: "How does a Will handle ancestral property succession under Mitakshara law in MP?",
    a: "Under Mitakshara Hindu law applicable across Madhya Pradesh, ancestral property is owned jointly by all coparceners. A testator cannot bequeath the entire ancestral estate without family consent. However, under Section 30 of the Hindu Succession Act, 1956, a testator can lawfully bequeath their individual undivided coparcenary share alongside 100% of their self-acquired properties.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Madhya Pradesh Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted neighbors, or long-standing colleagues are recommended.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Madhya Pradesh?",
    a: "Yes. Many NRIs residing abroad own apartments, ancestral farmland, or commercial assets in Indore, Bhopal, or Gwalior. NRIs can draft a legally compliant Will online. They can execute it before two witnesses abroad and have it consular-notarized or apostilled, or register it before an MP Sub-Registrar during their visit to India.",
  },
];

export default function MadhyaPradeshLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/madhya-pradesh";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-madhya-pradesh.jpg";

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
        name: "Will Drafting in Madhya Pradesh: Online Will & MP Guide",
        description:
          "Draft a legally valid Will in Madhya Pradesh. Complete MP Sampada 2.0 registration guidance, ancestral land succession rules, and legal consultation in MP.",
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
          caption: "Legal Will Drafting and Property Succession in Madhya Pradesh",
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
            name: "Madhya Pradesh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Madhya Pradesh - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, MP Sampada 2.0 registration, and Section 31 doorstep execution support across Indore, Bhopal, Jabalpur, Gwalior, and all MP districts.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Madhya Pradesh" },
          { "@type": "City", name: "Indore" },
          { "@type": "City", name: "Bhopal" },
          { "@type": "City", name: "Jabalpur" },
          { "@type": "City", name: "Gwalior" },
          { "@type": "City", name: "Ujjain" },
          { "@type": "City", name: "Sagar" },
          { "@type": "City", name: "Dewas" },
          { "@type": "City", name: "Satna" },
          { "@type": "City", name: "Ratlam" },
          { "@type": "City", name: "Rewa" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Madhya Pradesh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Madhya Pradesh Residents",
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
                name: "Complete MP Sampada SRO Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Madhya Pradesh",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Madhya Pradesh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Complete Asset Inventory and Successors",
            text: "List your Madhya Pradesh real estate including IDA, BDA, or JDA plots, MP Housing Board flats, agricultural farmland recorded on MP Bhulekh, and financial securities. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses with Advocate Review",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minors, and revocation of prior testamentary instruments.",
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
            name: "Book MP Sampada 2.0 SRO Slot & Generate Cyber Challan",
            text: "Schedule your registration appointment on the MP Commercial Tax & Registration portal (sampada.mpigr.gov.in) for your relevant district SRO and remit nominal registration fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Sub-Registrar Office",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete permanent Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MP_FAQS.map((item) => ({
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
      <MadhyaPradeshLocationClient faqs={MP_FAQS} />
      <Footer />
    </>
  );
}
