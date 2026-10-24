import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GandhinagarLocationClient from "./GandhinagarLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Gandhinagar: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Gandhinagar. Clear guidance on Garvi Gujarat SRO registration, GUDA sector plot transfer, and business succession planning.",
  keywords: [
    "will drafting in gandhinagar",
    "will registration garvi gujarat gandhinagar",
    "guda plot will transfer",
    "capital sector property will",
    "succession lawyer gandhinagar",
    "online will gujarat",
    "gmc gandhinagar mutation will",
    "sub registrar office gandhinagar appointment",
    "will drafting gift city",
    "will drafting kudasan",
    "will drafting randesan",
    "will drafting koba",
    "will drafting raysan",
    "will drafting sargasan",
    "will drafting vavol",
    "will drafting infocity gandhinagar",
    "will drafting kalol",
    "will drafting mansa",
    "will drafting dahegam",
    "section 31 registration act home visit gandhinagar",
    "gujarat stamp act will exemption",
    "is probate mandatory in gandhinagar",
    "gujarat high court probate exemption",
    "anyror 7 12 satbara will mutation gandhinagar",
    "ama legal solutions gandhinagar will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/gandhinagar",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/gandhinagar",
      "x-default": "https://www.willdrafting.in/locations/gandhinagar",
    },
  },
  openGraph: {
    title: "Will Drafting in Gandhinagar: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Gandhinagar. Clear guidance on Garvi Gujarat SRO registration, GUDA sector plot transfer, and business succession planning.",
    url: "https://www.willdrafting.in/locations/gandhinagar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-gandhinagar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Gandhinagar Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Gandhinagar: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Gandhinagar. Clear guidance on Garvi Gujarat SRO registration, GUDA sector plot transfer, and business succession planning.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-gandhinagar-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GANDHINAGAR_FAQS = [
  {
    q: "Is Will registration mandatory in Gandhinagar and Gujarat?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Gujarat. An unregistered Will drafted on plain white paper and signed before two independent witnesses is legally enforceable. However, registering your Will before a Gandhinagar Sub-Registrar through the Garvi Gujarat portal places it into Book III government custody. This prevents legal heir disputes and ensures smooth property mutation with GUDA and Gandhinagar Municipal Corporation (GMC).",
  },
  {
    q: "Is court probate required for a Will in Gandhinagar under Gujarat High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or properties situated within the presidency towns of Mumbai, Kolkata, and Chennai. Gandhinagar is outside presidency limits. The Gujarat High Court has established that obtaining probate or letters of administration is non-compulsory for Hindu, Jain, Sikh, and Buddhist Wills in Gandhinagar, enabling direct asset transfer with a registered Will.",
  },
  {
    q: "How are GUDA residential sector plots and GMC properties transferred via Will?",
    a: "Gandhinagar Urban Development Authority (GUDA) and Gandhinagar Municipal Corporation (GMC) manage residential plots across Sectors 1 to 30 and surrounding growth corridors. Upon the testator's demise, the named beneficiary presents a certified copy of the registered Will, death certificate, legal heir affidavit, and indemnity bond. GMC executes ownership mutation (Varasdar Nond) without requiring lengthy civil court succession decrees.",
  },
  {
    q: "What is the official government fee to register a Will in Gujarat via Garvi Gujarat?",
    a: "Wills are 100% exempt from stamp duty across Gujarat under the Gujarat Stamp Act, 1958. At Gandhinagar Sub-Registrar offices, testators only pay a flat statutory registration fee of ₹100, plus nominal computerized scanning and data charges of approximately ₹100 to ₹200. There are zero property market-value charges or ad-valorem taxes.",
  },
  {
    q: "How are agricultural lands and farmhouses in Gandhinagar district transferred via Will?",
    a: "Farmland and agricultural holdings in Mansa, Kalol, Dahegam, or Pethapur can be bequeathed under a Will subject to Gujarat agrarian statutes. The beneficiary submits the registered Will and death certificate to the Talathi. A Village Form 6 Ferfar entry (Hakk Patrak) is recorded and verified on the AnyRoR portal (anyror.gujarat.gov.in), updating the 7/12 Satbara and 8A extracts transparently.",
  },
  {
    q: "Can senior citizens in Gandhinagar register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly citizens, bedridden testators, or persons with medical mobility restrictions can request a doorstep visit. An MBBS doctor issues a medical fitness certificate stating mental testamentary soundness and travel inability. The Sub-Registrar attends the testator's residence in Sectors 1 to 30, Kudasan, or Koba with portable biometric scanners.",
  },
  {
    q: "How do I book an appointment on the Garvi Gujarat portal for Gandhinagar SRO?",
    a: "Appointments are scheduled online via the official Inspector General of Registration Gujarat portal (garvi.gujarat.gov.in). You log in, select the Gandhinagar registration district and relevant Sub-Registrar Office, enter testator and witness identification details, generate the e-Challan for the ₹100 registration fee via Cyber Treasury Gujarat, and confirm your preferred time slot.",
  },
  {
    q: "How does a Will protect modern assets in GIFT City and Infocity tech corridors?",
    a: "Gandhinagar houses Gujarat International Finance Tec-City (GIFT City) and Infocity, featuring multi-currency bank accounts, domestic and SEZ residential apartments, private equity shares, and fintech investments. A comprehensive Will provides clear digital asset clauses, designated nominees, and corporate executor powers to prevent freeze of financial instruments.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Gandhinagar Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as attesting witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or legacy under the Will. Family doctors, trusted colleagues, or long-time friends are ideal witnesses.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Gandhinagar?",
    a: "Yes. Many NRIs residing in the USA, UK, Canada, Australia, and the UAE hold investments in GIFT City, Kudasan, and Gandhinagar capital sectors. NRIs can draft an India-compliant Will online. They can execute it abroad before two witnesses and get it attested by the Indian Consulate or apostilled, or register it before a Gandhinagar Sub-Registrar during their visit to Gujarat.",
  },
];

export default function GandhinagarLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/gandhinagar";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-gandhinagar.jpg";

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
        name: "Will Drafting in Gandhinagar: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Gandhinagar. Clear guidance on Garvi Gujarat SRO registration, GUDA sector plot transfer, and business succession planning.",
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
          caption: "Legal Will Drafting and Property Succession in Gandhinagar Gujarat",
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
            name: "Gandhinagar",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Gandhinagar - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Garvi Gujarat SRO registration, and doorstep execution support across Gandhinagar, GIFT City, Kudasan, and Kalol.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gandhinagar",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Gandhinagar" },
          { "@type": "City", name: "GIFT City" },
          { "@type": "City", name: "Kudasan" },
          { "@type": "City", name: "Randesan" },
          { "@type": "City", name: "Koba" },
          { "@type": "City", name: "Raysan" },
          { "@type": "City", name: "Sargasan" },
          { "@type": "City", name: "Vavol" },
          { "@type": "City", name: "Infocity" },
          { "@type": "City", name: "Kalol" },
          { "@type": "City", name: "Mansa" },
          { "@type": "City", name: "Dahegam" },
          { "@type": "City", name: "Pethapur" },
          { "@type": "City", name: "Chiloda" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gandhinagar Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Gandhinagar Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Gujarat Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Gandhinagar Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Gandhinagar",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Gandhinagar.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Gandhinagar real estate including GUDA residential sector plots, GIFT City apartments, agricultural land in Kalol or Mansa, and financial portfolios. Designate beneficiaries and an executor.",
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
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Garvi Gujarat SRO Slot",
            text: "Schedule your registration appointment on the Garvi Gujarat portal (garvi.gujarat.gov.in) for your relevant Gandhinagar SRO and remit the flat ₹100 registration fee via Cyber Treasury Gujarat.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Gandhinagar SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GANDHINAGAR_FAQS.map((item) => ({
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
      <GandhinagarLocationClient faqs={GANDHINAGAR_FAQS} />
      <Footer />
    </>
  );
}
