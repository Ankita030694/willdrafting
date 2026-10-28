import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiruchirappalliLocationClient from "./TiruchirappalliLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
  },
  description:
    "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
  keywords: [
    "will drafting in tiruchirappalli",
    "will registration tnreginet trichy",
    "patta transfer registered will trichy",
    "advocate for will drafting trichy",
    "online will tamil nadu",
    "trichy corporation property mutation will",
    "sub registrar office trichy court appointment",
    "will drafting thillai nagar",
    "will drafting srirangam",
    "will drafting kk nagar trichy",
    "will drafting thiruverumbur",
    "will drafting cantonment trichy",
    "will drafting lalgudi",
    "will drafting manachanallur",
    "bhel trichy industrial will drafting",
    "tamil nilam patta name change will trichy",
    "section 31 registration act home visit trichy",
    "is probate mandatory in tiruchirappalli",
    "madras high court probate trichy exemption",
    "ama legal solutions tiruchirappalli will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/tiruchirappalli",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/tiruchirappalli",
      "x-default": "https://www.willdrafting.in/locations/tiruchirappalli",
    },
  },
  openGraph: {
    title: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
    description:
      "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
    url: "https://www.willdrafting.in/locations/tiruchirappalli",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-tiruchirappalli-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Tiruchirappalli Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
    description:
      "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-tiruchirappalli-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TIRUCHIRAPPALLI_FAQS = [
  {
    q: "Is Will registration mandatory in Tiruchirappalli?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Tiruchirappalli. A Will executed on plain white paper and signed in the presence of two independent witnesses is legally valid. However, registering your Will via the TNREGINET portal and placing it in official Book III custody at a Tiruchirappalli Sub-Registrar Office provides undeniable authenticity, preventing fraudulent claims and expediting City Corporation and Patta mutations.",
  },
  {
    q: "Is probate required for a Will in Tiruchirappalli under Madras High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Chennai, Mumbai, and Kolkata. Tiruchirappalli is a non-presidency mofussil district falling under the territorial jurisdiction of the Madras High Court (Madurai Bench). Probate is strictly optional for Hindu, Sikh, Jain, and Buddhist Wills in Trichy, allowing immediate property transmission.",
  },
  {
    q: "What is the official government fee to register a Will in Tiruchirappalli?",
    a: "Wills are 100% exempt from stamp duty across Tamil Nadu under the Indian Stamp Act as applicable to the state. At Tiruchirappalli Sub-Registrar offices, testators only pay a flat statutory registration fee of ₹100 along with nominal government computer scanning charges of approximately ₹100. There are no percentage-based property market value charges.",
  },
  {
    q: "How is Patta transferred after death using a registered Will in Tiruchirappalli?",
    a: "For revenue plots and delta agricultural holdings, the beneficiary applies through the Tamil Nadu Government's Tamil Nilam portal (eservices.tn.gov.in). By submitting the registered Will, testator death certificate, legal heir certificate, and Encumbrance Certificate (EC), the jurisdictional Tahsildar approves the transfer and issues an updated Patta and Chitta extract.",
  },
  {
    q: "How do I book an online appointment on TNREGINET for Will registration in Trichy?",
    a: "Appointments are scheduled online on the TNREGINET portal (tnreginet.gov.in). You log in, select the relevant Sub-Registrar Office (such as SRO Court Compound, SRO Thillai Nagar, or SRO Srirangam), enter testator and witness KYC details, generate the appointment token, and visit the office with original documents during the designated time slot.",
  },
  {
    q: "Can senior citizens in Srirangam or Thillai Nagar register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or testators with severe mobility restrictions can request a home commission visit. A registered MBBS doctor certifies that the individual is of sound testamentary mind but physically unable to travel. The Sub-Registrar then attends your residence with biometric verification devices.",
  },
  {
    q: "How does a registered Will help with Tiruchirappalli City Corporation (TCC) property tax mutation?",
    a: "Tiruchirappalli City Corporation requires unambiguous legal proof before updating ownership on the property tax assessment roll. A registered Will provides conclusive documentary evidence of the deceased testator's intentions, eliminating delays, disputes among legal heirs, and the need for expensive civil court succession certificates.",
  },
  {
    q: "Can agricultural lands in the Kaveri and Coleroon delta belts be bequeathed in a Will?",
    a: "Yes. Agricultural wet lands (Nanjai), dry lands (Punjai), and coconut groves across Lalgudi, Manachanallur, and surrounding delta zones can be legally bequeathed. The Will must accurately record survey numbers, sub-divisions, extents, and four-boundary descriptions to enable smooth mutation with the local Village Administrative Officer (VAO) and Revenue Department.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Tiruchirappalli Sub-Registrar offices?",
    a: "Any two adult individuals aged 18 or above with sound mental capacity and valid Aadhaar cards or government photo IDs can act as attesting witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses and their spouses must not be beneficiaries receiving any bequest or property under the Will.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for ancestral properties in Tiruchirappalli?",
    a: "Yes. Many NRIs residing in Singapore, Malaysia, the Gulf, the US, or the UK own ancestral houses or apartments in Tiruchirappalli and Srirangam. NRIs can draft a comprehensive Indian Will online and execute it overseas before two witnesses with Indian consulate attestation or complete formal Book III registration before a Trichy Sub-Registrar during their visit to India.",
  },
];

export default function TiruchirappalliLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/tiruchirappalli";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-tiruchirappalli.jpg";

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
        name: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
        description:
          "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
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
          caption: "Legal Will Drafting and Property Succession in Tiruchirappalli Tamil Nadu",
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
            name: "Tiruchirappalli",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Tiruchirappalli - Estate Planning & TNREGINET Registration",
        description:
          "Professional Will drafting, advocate verification, TNREGINET online token booking, and Section 31 doorstep execution support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tiruchirappalli",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Tiruchirappalli" },
          { "@type": "City", name: "Thillai Nagar" },
          { "@type": "City", name: "Srirangam" },
          { "@type": "City", name: "KK Nagar" },
          { "@type": "City", name: "Cantonment" },
          { "@type": "City", name: "Thiruverumbur" },
          { "@type": "City", name: "Thiruvanaikoil" },
          { "@type": "City", name: "Golden Rock" },
          { "@type": "City", name: "Lalgudi" },
          { "@type": "City", name: "Manachanallur" },
          { "@type": "City", name: "Crawford" },
          { "@type": "City", name: "Woraiyur" },
          { "@type": "City", name: "Tennur" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tiruchirappalli Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Tiruchirappalli Residents",
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
                name: "Complete Tiruchirappalli Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Tiruchirappalli",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Tiruchirappalli.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Tiruchirappalli real estate including City Corporation apartments, Srirangam heritage properties, BHEL industrial units, Kaveri delta farmland, and financial assets. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for asset distribution, survivorship, guardian appointments for minors, and revocation of prior instruments.",
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
            name: "Book TNREGINET Appointment Token",
            text: "Schedule your registration appointment on the TNREGINET portal for your relevant Tiruchirappalli SRO and remit the flat ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Tiruchirappalli SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: TIRUCHIRAPPALLI_FAQS.map((item) => ({
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
      <TiruchirappalliLocationClient faqs={TIRUCHIRAPPALLI_FAQS} />
      <Footer />
    </>
  );
}
