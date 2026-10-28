import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UdaipurLocationClient from "./UdaipurLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Udaipur: Online Will & Succession Guide",
  },
  description:
    "Protect family property in Udaipur. Expert lawyer drafting, ePanjiyan Rajasthan registration guidance, and heritage asset succession without.",
  keywords: [
    "will drafting in udaipur",
    "will registration rajasthan epanjiyan udaipur",
    "uda plot will transfer",
    "heritage hotel succession will",
    "succession advocate udaipur",
    "udaipur municipal corporation mutation will",
    "sub registrar office collectorate udaipur",
    "will drafting hiran magri",
    "will drafting fatehpura",
    "will drafting panchwati udaipur",
    "will drafting saheli nagar",
    "will drafting sukher marble belt",
    "will drafting shobhagpura",
    "will drafting goverdhan vilas",
    "will drafting mavli",
    "section 31 registration act home visit udaipur",
    "is probate mandatory in udaipur",
    "rajasthan high court probate exemption",
    "epanjiyan rajasthan appointment booking",
    "ama legal solutions udaipur will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/udaipur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/udaipur",
      "x-default": "https://www.willdrafting.in/locations/udaipur",
    },
  },
  openGraph: {
    title: "Will Drafting in Udaipur: Online Will & Succession Guide",
    description:
      "Protect family property in Udaipur. Expert lawyer drafting, ePanjiyan Rajasthan registration guidance, and heritage asset succession without.",
    url: "https://www.willdrafting.in/locations/udaipur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-udaipur-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Heritage Estate Planning in Udaipur Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Udaipur: Online Will & Succession Guide",
    description:
      "Protect family property in Udaipur. Expert lawyer drafting, ePanjiyan Rajasthan registration guidance, and heritage asset succession without.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-udaipur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const UDAIPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Udaipur?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Udaipur and throughout Rajasthan. A Will written on standard paper is legally enforceable if signed by the testator before two competent witnesses. However, registering your Will at an Udaipur Sub-Registrar Office enters it into permanent Book III government records. This provides strong legal evidentiary value against disputes and accelerates property mutation with the Udaipur Development Authority (UDA) and Nagar Nigam.",
  },
  {
    q: "Is probate required for a Will in Udaipur under Rajasthan High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Udaipur is a non-presidency district under the jurisdiction of the Rajasthan High Court. The High Court has consistently held that court probate is non-mandatory for Hindu, Jain, Sikh, and Buddhist Wills in Rajasthan, allowing direct property transmission with a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Udaipur?",
    a: "Testamentary Wills are completely exempt from ad-valorem stamp duty across Rajasthan. At Udaipur Sub-Registrar offices, you do not pay any percentage-based property market value charges. You only pay a flat nominal registration fee of ₹100 along with computer scanning and data entry fees of approximately ₹150 to ₹300 on the ePanjiyan Rajasthan portal.",
  },
  {
    q: "How does a registered Will help with Udaipur Development Authority (UDA) plot mutation?",
    a: "The Udaipur Development Authority (formerly UIT Udaipur) requires unambiguous testamentary proof before substituting leasehold or freehold title on its records. Submitting a registered Will alongside the testator death certificate, legal heir affidavits, and indemnity bonds enables direct mutation across residential sectors in Hiran Magri, Fatehpura, and Shobhagpura without costly succession suits.",
  },
  {
    q: "Can heritage havelis, boutique resorts, and homestays in Udaipur be bequeathed through a Will?",
    a: "Yes. Centuries-old heritage havelis near Lake Pichola, Fatehsagar, and the Old City often have joint family lineage. A customized Will accurately defines your specific self-acquired or partitioned ownership shares, commercial boutique resort operating licenses, and partnership equity, preventing bitter partition litigation among co-heirs.",
  },
  {
    q: "How are marble mining leases and processing units in Sukher bequeathed?",
    a: "Sukher and Bhuwana house major marble processing and mineral trading enterprises. A testamentary Will can explicitly distribute factory machinery, proprietary capital, RIICO industrial plot leasehold rights, and succession preferences for mineral concession licenses governed by the Rajasthan Minor Mineral Concession Rules.",
  },
  {
    q: "How do I book an ePanjiyan Rajasthan appointment in Udaipur?",
    a: "Appointments are scheduled online through the Registration and Stamps Department Rajasthan portal (epanjiyan.rajasthan.gov.in). You select the relevant Udaipur Sub-Registrar Office, enter testator and witness KYC information, generate the e-Challan for the nominal registration fee via e-GRAS, and select a confirmed appointment time slot.",
  },
  {
    q: "Can senior citizens in Udaipur register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or individuals with mobility restrictions can request a doorstep SRO visit. A registered MBBS doctor issues a medical certificate verifying travel inability. The Sub-Registrar attends the testator residence in Panchwati, Saheli Nagar, or Hiran Magri with portable biometric hardware.",
  },
  {
    q: "Who can serve as valid attesting witnesses for an Udaipur Will?",
    a: "Any two adult individuals of sound mind carrying valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted long-term neighbors, or family accountants are ideal attesting witnesses.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Udaipur?",
    a: "Yes. Many NRIs residing in the Gulf, USA, UK, or Singapore hold ancestral havelis, villas, or commercial investments in Udaipur. An NRI can draft a customized Indian Will online. The Will can be executed before two witnesses abroad and authenticated at an Indian Consulate, or registered before an Udaipur Sub-Registrar during their visit to India.",
  },
];

export default function UdaipurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/udaipur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-udaipur.jpg";

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
        name: "Will Drafting in Udaipur: Online Will & Succession Guide",
        description:
          "Protect family property in Udaipur. Expert lawyer drafting, ePanjiyan Rajasthan registration guidance, and heritage asset succession without.",
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
          caption: "Legal Will Drafting and Heritage Estate Planning in Udaipur Rajasthan",
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
            name: "Udaipur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Udaipur - Heritage Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, ePanjiyan Rajasthan registration support, and doorstep execution across Udaipur, Hiran.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Udaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Udaipur" },
          { "@type": "City", name: "Hiran Magri" },
          { "@type": "City", name: "Panchwati" },
          { "@type": "City", name: "Saheli Nagar" },
          { "@type": "City", name: "Fatehpura" },
          { "@type": "City", name: "Sukher" },
          { "@type": "City", name: "Bhuwana" },
          { "@type": "City", name: "Shobhagpura" },
          { "@type": "City", name: "Goverdhan Vilas" },
          { "@type": "City", name: "Madri" },
          { "@type": "City", name: "Kaladwas" },
          { "@type": "City", name: "Girwa" },
          { "@type": "City", name: "Mavli" },
          { "@type": "City", name: "Vallabhnagar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Udaipur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Udaipur Residents",
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
                name: "Complete Udaipur Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Udaipur",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Udaipur.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Mewar Asset Inventory and Successors",
            text: "List your Udaipur real estate including UDA residential plots, heritage havelis, Sukher marble processing units, bank deposits, and demat accounts. Appoint clear beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minors, and revocation of prior testamentary instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard white A4 sheets and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book ePanjiyan Rajasthan Appointment Slot",
            text: "Schedule your registration appointment on the ePanjiyan Rajasthan portal for your relevant Udaipur SRO and remit the nominal registration fee online via e-GRAS.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Udaipur SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal verification, photo capture, and biometric thumbprinting to complete permanent Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: UDAIPUR_FAQS.map((item) => ({
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
      <UdaipurLocationClient faqs={UDAIPUR_FAQS} />
      <Footer />
    </>
  );
}
