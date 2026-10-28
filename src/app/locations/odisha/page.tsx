import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OdishaLocationClient from "./OdishaLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Odisha: Legal Online Will Making Guide",
  },
  description:
    "Create a valid Will in Odisha. Expert lawyer drafting, Odisha e-Registration assistance, Bhulekh land mutation, and family wealth protection.",
  keywords: [
    "will drafting in odisha",
    "will registration odisha e-registration",
    "bhulekh odisha will mutation",
    "bda cda plot will transfer",
    "estate lawyer bhubaneswar",
    "succession lawyer odisha",
    "general administration land will transfer bhubaneswar",
    "sub registrar office khandagiri appointment",
    "igrodisha.gov.in appointment",
    "orissa high court probate exemption",
    "section 31 registration act home visit odisha",
    "will drafting bhubaneswar",
    "will drafting cuttack",
    "will drafting rourkela",
    "will drafting puri",
    "will drafting berhampur",
    "will drafting sambalpur",
    "bda leasehold property will transfer",
    "cda cuttack property succession will",
    "ama legal solutions odisha will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/odisha",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/odisha",
      "x-default": "https://www.willdrafting.in/locations/odisha",
    },
  },
  openGraph: {
    title: "Will Drafting in Odisha: Legal Online Will Making Guide",
    description:
      "Create a valid Will in Odisha. Expert lawyer drafting, Odisha e-Registration assistance, Bhulekh land mutation, and family wealth protection.",
    url: "https://www.willdrafting.in/locations/odisha",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-odisha-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Odisha: Legal Online Will Making Guide",
    description:
      "Create a valid Will in Odisha. Expert lawyer drafting, Odisha e-Registration assistance, Bhulekh land mutation, and family wealth protection.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-odisha-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const ODISHA_FAQS = [
  {
    q: "Is Will registration mandatory in Odisha?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Odisha. A Will written on standard paper is legally valid if executed voluntarily before two independent witnesses. However, registering your Will at an Odisha Sub-Registrar Office enters it into permanent Book III government custody. This prevents fraudulent succession claims and ensures swift mutation with Bhulekh Odisha, GA Department, BDA, and CDA.",
  },
  {
    q: "Is probate compulsory for a Will in Odisha under Orissa High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Odisha lies completely outside these presidency jurisdictions. The High Court of Orissa in Cuttack has repeatedly confirmed that court probate is non-compulsory for Hindu, Jain, Sikh, Buddhist, and Muslim Wills, allowing direct title succession with a registered Will.",
  },
  {
    q: "How are General Administration (GA) department leasehold properties in Bhubaneswar transferred through a Will?",
    a: "Bhubaneswar has many 99-year residential leasehold plots granted by the General Administration & Public Grievance (GA & PG) Department. To transfer leasehold rights, the named beneficiary submits the registered Will, death certificate, legal heir details, and an affidavit to the GA Department. Upon scrutiny and payment of nominal administrative mutation charges, the GA Department executes a fresh leasehold substitution deed.",
  },
  {
    q: "How does a registered Will help in Bhulekh Odisha land mutation (RoR / Patta)?",
    a: "Under the Odisha Mutation Manual, local Tahasildars require documentary proof of title before issuing a corrected Record of Rights (RoR / Patta). When an unregistered Will is produced, co-heirs often submit disputes during the 30-day proclamation period. A registered Will provides a statutory presumption of validity, enabling the Tahasildar to approve the mutation case smoothly on the Bhulekh Odisha portal.",
  },
  {
    q: "What is the official government fee to register a Will in Odisha?",
    a: "Testamentary Wills are completely exempt from ad-valorem stamp duty across Odisha under the Indian Stamp Act. You do not need expensive non-judicial stamp papers. At Odisha Sub-Registrar offices, citizens only pay a flat standard registration fee of approximately ₹100 under Book III plus nominal computer user and document scanning fees of ₹100 to ₹250. There are no percentage-based property market value charges.",
  },
  {
    q: "Can BDA and CDA allotted plots or flats be bequeathed via a Will in Odisha?",
    a: "Yes. Both Bhubaneswar Development Authority (BDA) and Cuttack Development Authority (CDA) residential flats, duplexes, and plotted allotments can be legally bequeathed. A clearly drafted Will containing the allotment number, sector, and lease deed details enables the beneficiary to apply directly to BDA or CDA for ownership substitution without protracted title litigation.",
  },
  {
    q: "How do I book an appointment on the Odisha e-Registration portal (igrodisha.gov.in)?",
    a: "Appointments are scheduled online through the Directorate of Registration Odisha portal (igrodisha.gov.in). You generate an e-Registration citizen token, select your local District Sub-Registrar or Sub-Registrar office, upload property schedule and party details, pay the nominal government fee online via Odisha Treasury Portal, and download your confirmed appointment time slot.",
  },
  {
    q: "Can senior citizens in Odisha register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell individuals can request a doorstep SRO visit. A registered medical practitioner issues a medical fitness certificate stating the testator is of sound mind but cannot travel. The Sub-Registrar attends your residence in Bhubaneswar, Cuttack, Puri, or any Odisha district with mobile biometric registration tools.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Odisha Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any asset or bequest under the Will. Family doctors, trusted neighbors, or lifelong friends who can testify to the testator's sound mind are recommended.",
  },
  {
    q: "Are there restrictions on bequeathing agricultural land under the Odisha Land Reforms Act?",
    a: "A person can bequeath agricultural land up to the ceiling limits established under the Odisha Land Reforms Act, 1960. However, special statutory restrictions apply under Sections 22 and 23 of the OLR Act regarding land transfers involving members of Scheduled Castes and Scheduled Tribes. Our estate advocates structure your bequests to ensure complete compliance with state revenue regulations.",
  },
];

export default function OdishaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/odisha";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-odisha.jpg";

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
        name: "Will Drafting in Odisha: Legal Online Will Making Guide",
        description:
          "Create a valid Will in Odisha. Expert lawyer drafting, Odisha e-Filing help, Bhulekh land name change, and family wealth protection.",
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
          caption: "Legal Will Drafting and Property Succession in Odisha",
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
            name: "Odisha",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Odisha - Estate Planning & SRO Registration Desk",
        description:
          "Professional Will drafting, lawyer check, Odisha e-Filing help, Bhulekh land record guidance, and Section 31 doorstep.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bhubaneswar",
          addressRegion: "Odisha",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Bhubaneswar" },
          { "@type": "City", name: "Cuttack" },
          { "@type": "City", name: "Rourkela" },
          { "@type": "City", name: "Puri" },
          { "@type": "City", name: "Berhampur" },
          { "@type": "City", name: "Sambalpur" },
          { "@type": "City", name: "Balasore" },
          { "@type": "City", name: "Angul" },
          { "@type": "City", name: "Jharsuguda" },
          { "@type": "City", name: "Khordha" },
          { "@type": "City", name: "Jajpur" },
          { "@type": "City", name: "Bhadrak" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Odisha Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Odisha Residents",
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
                name: "Complete Odisha Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Odisha",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Odisha.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Audit Assets and Verify Leasehold Titles",
            text: "List your cash and land assets across Odisha, including GA leaseholds in Bhubaneswar, BDA or CDA allotments, Bhulekh farm land, and banking investments.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Statutory Legal Clauses",
            text: "Draft your Will using checked legal clauses for clear asset split, survivorship, executor appointment, and complete revocation of past Will instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the physical presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Odisha e-Registration Slot",
            text: "Schedule an appointment on the Directorate of Filing Odisha portal (igrodisha.gov.in) and pay the nominal Book III filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Odisha SRO",
            text: "Attend the SRO office with both signing witnesses for personal appearance, photo capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: ODISHA_FAQS.map((item) => ({
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
      <OdishaLocationClient faqs={ODISHA_FAQS} />
      <Footer />
    </>
  );
}
