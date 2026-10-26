import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DispurLocationClient from "./DispurLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Dispur: Online Will Registration Guide",
  },
  description:
    "Draft a legally binding Will in Dispur. Expert guidance on Assam Panjeeyan portal registration, GMDA property mutation, and inheritance law consultation.",
  keywords: [
    "will drafting in dispur",
    "will registration dispur kamrup",
    "assam panjeeyan will registration",
    "gmda plot transfer dispur",
    "succession advocate dispur",
    "gauhati high court probate rules",
    "gmc property mutation will dispur",
    "online will maker dispur assam",
    "dharitree portal myadi patta succession",
    "will drafting gs road dispur",
    "will drafting ganeshguri",
    "will drafting beltola",
    "will drafting hatigaon",
    "will drafting six mile",
    "will drafting kahilipara",
    "will drafting panjabari",
    "will drafting basistha",
    "section 31 registration act home visit dispur",
    "sub registrar office kamrup metro appointment",
    "is probate mandatory in dispur assam",
    "janata bhawan estate planning dispur",
    "ama legal solutions dispur will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/dispur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/dispur",
      "x-default": "https://www.willdrafting.in/locations/dispur",
    },
  },
  openGraph: {
    title: "Will Drafting in Dispur: Online Will Registration Guide",
    description:
      "Draft a legally binding Will in Dispur. Expert guidance on Assam Panjeeyan portal registration, GMDA property mutation, and inheritance law consultation.",
    url: "https://www.willdrafting.in/locations/dispur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-dispur-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Dispur Assam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Dispur: Online Will Registration Guide",
    description:
      "Draft a legally binding Will in Dispur. Expert guidance on Assam Panjeeyan portal registration, GMDA property mutation, and inheritance law consultation.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-dispur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const DISPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Dispur under Assam laws?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Dispur. A Will written on standard paper is legally valid if signed by the testator before two independent witnesses. However, registering your Will at the Dispur or Kamrup Metro Sub-Registrar Office places the document into permanent Book III government custody, preventing fraudulent challenges and ensuring swift property mutation with GMDA, GMC, and the Circle Office.",
  },
  {
    q: "Is probate required for a Will in Dispur under Gauhati High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Kolkata, Mumbai, and Chennai. Dispur falls under the jurisdiction of the Gauhati High Court, which has consistently held that court probate is non-mandatory for Hindu, Buddhist, Sikh, and Jain Wills in Assam. A registered Will allows direct title transfer and mutation without civil court probate delays.",
  },
  {
    q: "How are periodic Myadi Patta lands in Dispur transferred through a Will?",
    a: "Periodic Myadi Patta represents permanent, heritable, and transferable land rights in Assam. A testator can legally bequeath Myadi Patta land. Following the testator's demise, the beneficiary submits the registered Will and death certificate to the jurisdictional Circle Officer for revenue mutation under the Assam Land and Revenue Regulation, 1886, updated digitally via the Dharitree portal.",
  },
  {
    q: "Can Eksona (Annual Patta) land in Dispur be bequeathed in a Will?",
    a: "No. Annual Patta (Eksona Patta) confers only a temporary leasehold right to cultivate or occupy land for one year and does not confer permanent transferable ownership. Under Assam revenue regulations, Eksona Patta cannot be bequeathed through a Will. Property owners must first convert Eksona land into periodic Myadi Patta through the Circle Office or Mission Basundhara before executing a testamentary bequest.",
  },
  {
    q: "What is the official government fee to register a Will in Dispur?",
    a: "In Assam, testamentary Wills are completely exempt from ad-valorem stamp duty. At the Dispur Sub-Registrar Office, testators pay only a nominal government registration fee and portal processing charges via an e-challan generated through the Assam Panjeeyan portal. There are no percentage-based property market value levies.",
  },
  {
    q: "How does a registered Will facilitate GMDA plot and apartment mutation?",
    a: "The Guwahati Metropolitan Development Authority (GMDA) requires conclusive testamentary evidence to mutate residential plots, commercial properties, and multi-story apartments. A registered Will under Book III government custody provides indisputable proof of succession, enabling GMDA and the Guwahati Municipal Corporation (GMC) to update ownership records without demanding indemnity bonds or court succession certificates.",
  },
  {
    q: "How do I book an appointment on the Assam Panjeeyan portal for Dispur?",
    a: "Appointments are scheduled online through the official Assam Panjeeyan portal (panjeeyan.assam.gov.in) operated by the Revenue & Disaster Management Department. You select SRO Dispur or SRO Kamrup Metro, upload testator and witness KYC information, generate the nominal fee e-challan, and select a confirmed date and time slot for biometric execution.",
  },
  {
    q: "Can senior citizens in Dispur register a Will at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with mobility restrictions can request a doorstep home visit by the Sub-Registrar. An MBBS medical practitioner certifies physical inability to travel to the office. The Sub-Registrar attends your residence in Beltola, Hatigaon, GS Road, or Six Mile with portable biometric equipment to complete registration.",
  },
  {
    q: "How is GMC property tax assessment transferred using a Will?",
    a: "The Guwahati Municipal Corporation (GMC) updates the property tax assessment register (holding number) upon receiving an application with a certified copy of the registered Will, death certificate, and previous municipal tax receipts. This ensures water connections, trade licenses, and municipal property records seamlessly reflect the lawful beneficiary.",
  },
  {
    q: "Who can serve as valid attesting witnesses for a Will in Dispur?",
    a: "Under Section 63 and Section 67 of the Indian Succession Act, 1925, any two adult individuals of sound mind with valid government photo IDs (such as Aadhaar or voter ID) can serve as witnesses. Crucially, witnesses must not be beneficiaries receiving any property or bequest under the Will, nor should their spouses receive any benefit. Independent neighbors, family friends, or doctors are optimal choices.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) or Assamese living abroad execute a Will for Dispur assets?",
    a: "Yes. Non-Resident Indians and Assamese living abroad who own apartments, GMDA plots, or ancestral homesteads in Dispur can draft a comprehensive Will online. They can execute it abroad before two witnesses and have it attested by the Indian Consulate or notarized, or complete official Book III registration before the Dispur Sub-Registrar during their visit to Assam.",
  },
];

export default function DispurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/dispur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-dispur.jpg";

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
        name: "Will Drafting in Dispur: Online Will Registration Guide",
        description:
          "Draft a legally binding Will in Dispur. Expert guidance on Assam Panjeeyan portal registration, GMDA property mutation, and inheritance law consultation.",
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
          caption: "Legal Will Drafting and Property Succession in Dispur Assam",
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
            name: "Dispur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Dispur - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Assam Panjeeyan portal appointment scheduling, GMDA plot transfer, and Section 31 doorstep execution across Dispur and Kamrup Metro.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dispur",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Dispur" },
          { "@type": "City", name: "Ganeshguri" },
          { "@type": "City", name: "GS Road" },
          { "@type": "City", name: "Beltola" },
          { "@type": "City", name: "Hatigaon" },
          { "@type": "City", name: "Six Mile" },
          { "@type": "City", name: "Kahilipara" },
          { "@type": "City", name: "Panjabari" },
          { "@type": "City", name: "Basistha" },
          { "@type": "City", name: "Hengrabari" },
          { "@type": "City", name: "Survey" },
          { "@type": "City", name: "Jatia" },
          { "@type": "City", name: "Guwahati" },
          { "@type": "City", name: "Kamrup Metropolitan" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dispur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Dispur Residents",
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
                name: "Complete Dispur Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Dispur",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Dispur Kamrup Metro.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Dispur immovable properties including GMDA residential plots, GMC municipal holdings, periodic Myadi Patta lands, bank deposits, and family enterprises. Designate beneficiaries and an executor.",
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
            name: "Book Assam Panjeeyan Portal Slot",
            text: "Schedule your registration appointment on the Assam Panjeeyan portal (panjeeyan.assam.gov.in) for SRO Dispur or Kamrup Metro and generate the nominal registration fee e-challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Dispur SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: DISPUR_FAQS.map((item) => ({
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
      <DispurLocationClient faqs={DISPUR_FAQS} />
      <Footer />
    </>
  );
}
