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
    "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA mutation.",
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
      "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA mutation.",
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
      "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA mutation.",
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
    q: "Is Will registration mandatory in Uttarakhand?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Uttarakhand. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Sub-Registrar Office via the e-Prerna portal enters it into permanent Book III government custody. This prevents family challenges and simplifies property mutation with MDDA, Nagar Nigam, and Revenue Tehsildars.",
  },
  {
    q: "Is probate compulsory for properties in Uttarakhand under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. The High Court of Uttarakhand at Nainital has settled that probate is non-mandatory for Hindu, Sikh, Jain, Buddhist, and Muslim testators. Legal heirs can directly mutate properties using a registered Will and death certificate.",
  },
  {
    q: "How does Section 154 UPZA&LR land ceiling affect Will inheritance in Uttarakhand?",
    a: "Section 154 of the UPZA&LR Act (as adapted in Uttarakhand) restricts non-domiciles from purchasing more than 250 square meters of agricultural or rural land without state sanction. However, testamentary succession by lawful heirs through a valid Will is recognized under revenue jurisprudence. A registered Will clearly establishes bona fide inheritance, protecting ancestral lands from illegal transaction disputes.",
  },
  {
    q: "What is the official government fee to register a Will in Uttarakhand?",
    a: "Wills are 100% exempt from ad valorem stamp duty across Uttarakhand. You can execute your Will on standard A4 plain paper without buying expensive non-judicial stamp paper. At Uttarakhand Sub-Registrar offices, you only pay a nominal flat registration fee of ₹100 plus standard electronic scanning and user charges of approximately ₹100 to ₹200.",
  },
  {
    q: "How do I book an e-Prerna portal appointment for Will registration in Uttarakhand?",
    a: "Appointments are scheduled online through the Stamps and Registration Department portal at registration.uk.gov.in (e-Prerna). You select your district Sub-Registrar Office (such as Dehradun, Haridwar, or Haldwani), enter testator and witness identification details, generate the appointment slip, and visit the office at the chosen time slot.",
  },
  {
    q: "Can senior citizens register a Will from home under Section 31 in Uttarakhand?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep commissioner visit. With an MBBS doctor's certificate confirming medical inability to travel, the Sub-Registrar visits your residence in Dehradun, Haridwar, Haldwani, or Rishikesh with portable biometric devices.",
  },
  {
    q: "How does a registered Will help with MDDA and Nagar Nigam property mutation?",
    a: "Development bodies like MDDA and municipal bodies like Nagar Nigam Dehradun require conclusive proof of succession before updating ownership on municipal assessment registers (Namantaran). A registered Will provides verified testamentary proof, eliminating the need for expensive civil court succession certificates or contentious legal heir affidavits.",
  },
  {
    q: "Can defense veterans and retired officers in Dehradun bequeath pensions and cantonment property?",
    a: "Dehradun is home to thousands of retired armed forces officers and civil servants. A Will can bequeath freehold residential properties, bank accounts, demat portfolios, and personal effects. While statutory military family pensions follow specific defense service pension regulations, bequeathing private savings, gratuity payouts, and cantonment freehold properties requires a clear Will.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Uttarakhand Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as attesting witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property under the Will. Family doctors, trusted neighbors, or long-time friends are ideal choices.",
  },
  {
    q: "Can non-domiciles or NRIs bequeath or inherit ancestral properties in Uttarakhand?",
    a: "Yes. Non-domiciles and Non-Resident Indians (NRIs) who lawfully own property in Uttarakhand can execute a valid Will. NRIs residing abroad can draft their Will online, execute it before two witnesses, and have it notarized or apostilled, or complete formal Book III registration before an Uttarakhand Sub-Registrar during their visit to India.",
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
          "Draft a valid Will in Uttarakhand with lawyer review. Complete guidance on Section 154 land ceiling rules, e-Prerna registration, and MDDA mutation.",
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
          "Professional Will drafting, advocate verification, e-Prerna registration assistance, and Section 31 doorstep execution support across Dehradun, Haridwar, Nainital, Haldwani, and Rishikesh.",
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
            text: "List your Uttarakhand real estate including MDDA residential plots, Nagar Nigam flats, rural land holdings, bank accounts, and defense pension portfolios. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Section 154 Compliant Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, Section 154 UPZA&LR land ceiling compliance, guardian appointments for minors, and revocation of prior wills.",
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
            text: "Schedule your registration appointment on the e-Prerna portal (registration.uk.gov.in) for your relevant Uttarakhand SRO and remit the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Uttarakhand SRO",
            text: "Visit the Sub-Registrar office with both witnesses for identity verification, digital photography, and biometric thumbprinting to complete Book III government registration.",
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
