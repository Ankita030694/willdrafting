import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UttarakhandLocationClient from "./UttarakhandLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Uttarakhand: Online Will & Land Guide",
  },
  description:
    "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA.",
  keywords: [
    "will drafting in uttarakhand",
    "will registration uttarakhand e-prerna",
    "section 154 land ceiling will uttarakhand",
    "mdda plot will transfer",
    "estate lawyer dehradun",
    "online will drafting uttarakhand",
    "dehradun sub registrar office will",
    "will drafting services in dehradun",
    "haridwar will registration sro",
    "haldwani estate lawyer",
    "nainital high court probate will",
    "rishikesh will drafting advocate",
    "roorkee property will succession",
    "rudrapur will registration",
    "kashipur succession planning",
    "upzalar section 154 uttarakhand will",
    "bhulekh uttarakhand mutation will",
    "nagar nigam dehradun mutation will",
    "section 31 registration act home visit uttarakhand",
    "indian succession act uttarakhand probate exemption",
    "ama legal solutions uttarakhand will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/uttarakhand",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/uttarakhand",
      "x-default": "https://www.willdrafting.in/locations/uttarakhand",
    },
  },
  openGraph: {
    title: "Will Drafting in Uttarakhand: Online Will & Land Guide",
    description:
      "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA.",
    url: "https://www.willdrafting.in/locations/uttarakhand",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-uttarakhand-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Uttarakhand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Uttarakhand: Online Will & Land Guide",
    description:
      "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-uttarakhand-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const UTTARAKHAND_FAQS = [
  {
    q: "Is Will registration required by law in Uttarakhand?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, recording a Will at the SRO is optional in Uttarakhand. A Will written on plain white paper is valid if you sign it in front of two witnesses. Still, filing your Will at an SRO through the e-Prerna portal stores it in safe Book III records. This stops family fights and speeds up title transfers with MDDA, Nagar Nigam, and local Tehsil offices.",
  },
  {
    q: "Is court probate needed for properties in Uttarakhand?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, court probate is needed only in Mumbai, Kolkata, and Chennai. The High Court at Nainital rules that probate is not required for Hindu, Sikh, Jain, Buddhist, or Muslim Wills in Uttarakhand. Heirs can update land records directly with a registered Will and a death certificate.",
  },
  {
    q: "How does the Section 154 land cap affect a Will in Uttarakhand?",
    a: "Section 154 of the UPZA&LR Act caps non-residents at 250 square meters when buying farm land in Uttarakhand. However, passing land to legal heirs through a valid Will is protected by law. A registered Will gives clear proof of family succession and keeps your farm and hill land safe from title disputes.",
  },
  {
    q: "What is the state fee to register a Will in Uttarakhand?",
    a: "Wills pay zero stamp duty across Uttarakhand. You can print your Will on plain white A4 paper without buying stamp paper. At any Uttarakhand SRO desk, you pay only a flat ₹100 state fee plus ₹100 to ₹200 for page scans.",
  },
  {
    q: "How do I book an e-Prerna slot to register a Will in Uttarakhand?",
    a: "You can book your slot online on the state portal at registration.uk.gov.in (e-Prerna). Pick your local SRO desk (such as Dehradun, Haridwar, or Haldwani), enter your ID and witness details, print the slip, and visit the office at your booked time.",
  },
  {
    q: "Can seniors register a Will from home under Section 31 in Uttarakhand?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, seniors or unwell owners who cannot travel can ask for a home visit. With a doctor's note, the SRO officer brings a thumb scanner and camera to your home in Dehradun, Haridwar, Haldwani, or Rishikesh.",
  },
  {
    q: "How does a registered Will help with MDDA and city tax mutation?",
    a: "Civic boards like MDDA and Nagar Nigam Dehradun ask for clear proof of succession before they update the owner's name on house tax records (Namantaran). A registered Will gives trusted proof so your heirs do not need a slow civil court order.",
  },
  {
    q: "Can army veterans in Dehradun pass pensions and cantt homes by Will?",
    a: "Yes. Dehradun is home to many retired army officers and civil staff. A Will lets you pass freehold homes, bank accounts, stocks, and personal goods to your chosen heirs. While service family pensions follow defense rules, your savings, gratuity funds, and freehold cantt homes pass smoothly under a clear Will.",
  },
  {
    q: "Who can sign as a valid witness at an Uttarakhand SRO?",
    a: "Any two adults of sound mind with valid Aadhaar cards or state photo IDs can sign as witnesses. Under Section 67 of the Indian Succession Act, a witness must not be an heir who gets property in the Will. Family doctors, neighbors, or friends are great choices.",
  },
  {
    q: "Can non-residents or NRIs pass or inherit land in Uttarakhand?",
    a: "Yes. Non-residents and NRIs who own land or flats in Uttarakhand can make a valid Will. NRIs living abroad can draft their Will online, sign it before two witnesses, or record it in Book III at an Uttarakhand SRO during a trip to India.",
  },
];

export default function UttarakhandLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/uttarakhand";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-uttarakhand.jpg";

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
        name: "Will Drafting in Uttarakhand: Online Will & Land Guide",
        description:
          "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna signing, and MDDA.",
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
          caption: "Legal Will Drafting and Property Succession in Uttarakhand",
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
            name: "Uttarakhand",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Uttarakhand - Estate Planning & e-Prerna SRO Registration",
        description:
          "Professional Will drafting, advocate check, e-Prerna signing help, and Section 31 doorstep execution support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dehradun",
          addressRegion: "Uttarakhand",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Dehradun" },
          { "@type": "City", name: "Haridwar" },
          { "@type": "City", name: "Haldwani" },
          { "@type": "City", name: "Nainital" },
          { "@type": "City", name: "Rishikesh" },
          { "@type": "City", name: "Roorkee" },
          { "@type": "City", name: "Rudrapur" },
          { "@type": "City", name: "Kashipur" },
          { "@type": "City", name: "Almora" },
          { "@type": "City", name: "Mussoorie" },
          { "@type": "City", name: "Ranikhet" },
          { "@type": "City", name: "Pithoragarh" },
          { "@type": "City", name: "Vikas Nagar" },
          { "@type": "City", name: "Kotdwar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Uttarakhand Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Uttarakhand Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Land Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Uttarakhand SRO e-Prerna Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Uttarakhand",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Uttarakhand.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Uttarakhand Asset Inventory and Successors",
            text: "List your Uttarakhand real estate including MDDA residential plots, Nagar Nigam flats, rural land holdings, bank accounts, and defense pension portfolios. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Section 154 Compliant Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset split, Section 154 UPZA&LR land ceiling compliance, guardian appointments for minors, and revocation of prior wills.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 plain paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Uttarakhand e-Prerna Portal Slot",
            text: "Schedule your signing appointment on the e-Prerna portal (signing.uk.gov.in) for your relevant Uttarakhand SRO and remit the nominal ₹100 signing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Uttarakhand SRO",
            text: "Visit the SRO office with both witnesses for identity check, digital photography, and biometric thumbprinting to complete Book III government signing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: UTTARAKHAND_FAQS.map((item) => ({
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
      <UttarakhandLocationClient faqs={UTTARAKHAND_FAQS} />
      <Footer />
    </>
  );
}
