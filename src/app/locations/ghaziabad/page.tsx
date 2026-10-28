import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhaziabadLocationClient from "./GhaziabadLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Ghaziabad: Online Will Services in NCR",
  },
  description:
    "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
  keywords: [
    "will drafting in ghaziabad",
    "will registration up igrs ghaziabad",
    "gda flat will transfer",
    "online will maker ghaziabad",
    "succession lawyer indirapuram",
    "ghaziabad nagar nigam mutation will",
    "sub registrar office collectorate ghaziabad",
    "igrsup ghaziabad appointment",
    "will drafting indirapuram",
    "will drafting vaishali",
    "will drafting vasundhara",
    "will drafting raj nagar extension",
    "will drafting crossings republik",
    "will drafting kavi nagar",
    "will drafting sahibabad",
    "will drafting modi nagar",
    "will drafting loni tronica city",
    "section 31 registration act home visit ghaziabad",
    "is probate mandatory in ghaziabad",
    "allahabad high court probate up exemption",
    "up apartment act 2010 flat succession",
    "ama legal solutions ghaziabad will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/ghaziabad",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/ghaziabad",
      "x-default": "https://www.willdrafting.in/locations/ghaziabad",
    },
  },
  openGraph: {
    title: "Will Drafting in Ghaziabad: Online Will Services in NCR",
    description:
      "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
    url: "https://www.willdrafting.in/locations/ghaziabad",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-ghaziabad-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Ghaziabad UP NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Ghaziabad: Online Will Services in NCR",
    description:
      "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-ghaziabad-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GHAZIABAD_FAQS = [
  {
    q: "Is Will registration mandatory in Ghaziabad?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Ghaziabad and across Uttar Pradesh. A Will written on standard paper is legally valid if signed before two independent witnesses. However, registering your Will at a Ghaziabad Sub-Registrar Office enters it into permanent Book III government custody. This prevents fraudulent challenges and ensures fast mutation with the Ghaziabad Development Authority (GDA), Nagar Nigam, and high-rise Apartment Owners Associations (AOAs).",
  },
  {
    q: "Is probate required for a Will in Ghaziabad under Allahabad High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Ghaziabad lies outside presidency limits under the jurisdiction of the Allahabad High Court. Court probate is strictly non-compulsory in Uttar Pradesh for Hindu, Sikh, Jain, and Buddhist Wills, enabling direct property transfer upon presenting a registered Will.",
  },
  {
    q: "How are GDA flats and high-rise society apartments in Indirapuram and Vaishali transferred via Will?",
    a: "High-rise apartments governed by the UP Apartment (Promotion of Construction, Ownership & Maintenance) Act, 2010 and GDA flats are transferred to designated heirs upon submitting the registered Will, original death certificate, legal heir affidavit, and indemnity bond to the Ghaziabad Development Authority and society AOA for title mutation and maintenance ledger substitution.",
  },
  {
    q: "What is the official government fee to register a Will on the UP IGRSUP portal?",
    a: "Wills are completely exempt from stamp duty across Uttar Pradesh. At Ghaziabad Sub-Registrar offices, testators only pay a nominal flat ₹100 registration fee plus nominal government scanning and user charges of approximately ₹100 to ₹200 generated through the official IGRSUP portal (igrsup.gov.in). There are no ad valorem percentage-based property market value levies.",
  },
  {
    q: "Does a high-rise society nominee automatically own the flat in Ghaziabad?",
    a: "No. In accordance with Supreme Court precedents including Indrani Wahi v. Registrar of Co-operative Societies, a nominee acts merely as a legal trustee to hold the property until testamentary or intestate succession is settled. True beneficial ownership never passes to a nominee. Only a legally valid Will or succession certificate establishes lawful ownership and title rights.",
  },
  {
    q: "How do I book an e-appointment on the UP IGRSUP portal for Ghaziabad SROs?",
    a: "Appointments are scheduled online through the Stamps and Registration Department UP portal (igrsup.gov.in). Select Ghaziabad district and your designated Sub-Registrar Office (e.g., Raj Nagar Collectorate, Sahibabad, or Modi Nagar), enter testator and witness KYC information, remit the statutory ₹100 fee online, and generate an official appointment token slip.",
  },
  {
    q: "Can senior citizens in Ghaziabad register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or mobility-impaired testators in Indirapuram, Vaishali, Vasundhara, or Raj Nagar can apply for a doorstep official visit. An MBBS registered doctor issues a physical disability certificate, and the Sub-Registrar conducts an official home commission with biometric devices.",
  },
  {
    q: "How does a registered Will help with Ghaziabad Nagar Nigam property tax mutation?",
    a: "Ghaziabad Nagar Nigam mandates proof of succession before changing property tax assessment records (Namaantaran). A registered Will serves as conclusive documentary proof of testamentary intent, expediting municipal record mutation without compelling heirs to undergo expensive civil court proceedings.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Ghaziabad Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Crucially, under Section 67 of the Indian Succession Act, attesting witnesses must not be beneficiaries receiving any asset, property, or legacy under the Will. Independent family friends, doctors, or colleagues are recommended.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Ghaziabad?",
    a: "Yes. Many NRIs residing in the UAE, USA, UK, Canada, or Singapore hold residential apartments or commercial plots in Ghaziabad. NRIs can draft an airtight Indian Will online. They can execute it abroad before two witnesses and apostille or consularize it, or complete Book III biometric registration before a Ghaziabad Sub-Registrar during their visit to India.",
  },
];

export default function GhaziabadLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/ghaziabad";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-ghaziabad.jpg";

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
        name: "Will Drafting in Ghaziabad: Online Will Services in NCR",
        description:
          "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
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
          caption: "Legal Will Drafting and Property Succession in Ghaziabad UP NCR",
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
            name: "Ghaziabad",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Ghaziabad - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, UP IGRSUP registration, and doorstep execution support across Ghaziabad, Indirapuram.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ghaziabad",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ghaziabad" },
          { "@type": "City", name: "Indirapuram" },
          { "@type": "City", name: "Vaishali" },
          { "@type": "City", name: "Vasundhara" },
          { "@type": "City", name: "Raj Nagar Extension" },
          { "@type": "City", name: "Crossings Republik" },
          { "@type": "City", name: "Raj Nagar" },
          { "@type": "City", name: "Kavi Nagar" },
          { "@type": "City", name: "Sahibabad" },
          { "@type": "City", name: "Kaushambi" },
          { "@type": "City", name: "Modi Nagar" },
          { "@type": "City", name: "Muradnagar" },
          { "@type": "City", name: "Loni" },
          { "@type": "City", name: "Tronica City" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ghaziabad Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Ghaziabad Residents",
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
                name: "Complete Ghaziabad Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Ghaziabad",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Ghaziabad.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Ghaziabad real estate including GDA flats, high-rise society apartments in Indirapuram or Vaishali, industrial plots, and financial investments. Designate beneficiaries and an executor.",
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
            name: "Book UP IGRSUP Appointment Slot",
            text: "Schedule your registration appointment on the UP Stamps and Registration portal (igrsup.gov.in) for your relevant Ghaziabad SRO and remit the flat ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Ghaziabad SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GHAZIABAD_FAQS.map((item) => ({
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
      <GhaziabadLocationClient faqs={GHAZIABAD_FAQS} />
      <Footer />
    </>
  );
}
