import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiharLocationClient from "./BiharLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Bihar: Online Will Registration Guide",
  },
  description:
    "Create a valid Will in Bihar with advocate assistance. Guidance on Bihar e-Nibandhan portal, Bihar Bhumi Dakhil Kharij mutation, and ancestral.",
  keywords: [
    "will drafting in bihar",
    "will registration bihar e-nibandhan",
    "bihar bhumi dakhil kharij will",
    "patna high court probate will",
    "property succession advocate bihar",
    "ancestral land will bihar",
    "parivarik bantwara will bihar",
    "batwaranama will registration bihar",
    "khatiyani land succession bihar",
    "bihar land mutation act will",
    "circle officer dakhil kharij will",
    "will drafting services in patna",
    "will drafting gaya",
    "will drafting muzaffarpur",
    "will drafting bhagalpur",
    "will drafting darbhanga",
    "will drafting purnia",
    "will drafting begusarai",
    "section 31 registration act home visit bihar",
    "section 213 indian succession act bihar probate",
    "ama legal solutions bihar will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/bihar",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/bihar",
      "x-default": "https://www.willdrafting.in/locations/bihar",
    },
  },
  openGraph: {
    title: "Will Drafting in Bihar: Online Will Registration Guide",
    description:
      "Create a valid Will in Bihar with advocate assistance. Guidance on Bihar e-Nibandhan portal, Bihar Bhumi Dakhil Kharij mutation, and ancestral.",
    url: "https://www.willdrafting.in/locations/bihar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-bihar.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Land Succession Services in Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Bihar: Online Will Registration Guide",
    description:
      "Create a valid Will in Bihar with advocate assistance. Guidance on Bihar e-Nibandhan portal, Bihar Bhumi Dakhil Kharij mutation, and ancestral.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-bihar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const BIHAR_FAQS = [
  {
    q: "Is Will registration mandatory in Bihar?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Bihar. A Will executed on plain paper is valid if signed before two independent witnesses. However, registering your Will before a Sub-Registrar places it in official Book III custody. This provides strong legal proof and prevents land disputes during Bihar Bhumi Dakhil Kharij mutation.",
  },
  {
    q: "Is probate compulsory for a Will in Bihar under Patna High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only in the presidency towns of Mumbai, Kolkata, and Chennai. Bihar is outside these presidency jurisdictions. The Patna High Court has confirmed that court probate is optional for Hindu, Muslim, Sikh, Jain, and Buddhist Wills, allowing direct title transfer.",
  },
  {
    q: "How does a registered Will help in Bihar Bhumi Dakhil Kharij land mutation?",
    a: "Under the Bihar Land Mutation Act, 2011, Circle Officers require clear legal proof before updating Jamabandi records. An unregistered Will is often challenged by relatives during mutation proceedings. A registered Will gives strong legal presumption of authenticity under the Indian Evidence Act, helping the Circle Officer approve Dakhil Kharij without delay.",
  },
  {
    q: "What is the official government fee to register a Will in Bihar?",
    a: "Wills are exempt from ad-valorem stamp duty across Bihar under the Indian Stamp Act. You can draft your Will on plain white A4 paper. At Bihar Sub-Registrar Offices, you pay a flat nominal registration fee of approximately ₹100 under Book III plus nominal scanning charges of ₹100 to ₹250. There are no percentage fees based on property market value.",
  },
  {
    q: "Can ancestral Khatiyani land and agricultural holdings be willed in Bihar?",
    a: "Yes, you can bequeath your defined share in ancestral land. If a family partition (Parivarik Bantwara) has taken place and your name is recorded in Jamabandi or Register-II, you can transfer that specific land. If partition is pending, you can bequeath your undivided legal share, provided it complies with coparcenary rights under the Hindu Succession Act.",
  },
  {
    q: "How do I book an appointment on the Bihar e-Nibandhan registration portal?",
    a: "You can book appointments online on the Bihar Registration Department portal (biharregservices.gov.in). Select your administrative district and local Sub-Registrar Office, enter testator and witness KYC information, pay the nominal fee online, and download the e-appointment slip with your designated time slot for biometric verification.",
  },
  {
    q: "Can senior citizens in Bihar register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home or hospital visit. An MBBS doctor issues a certificate confirming medical inability to travel. The Sub-Registrar then visits your residence in Patna, Gaya, Muzaffarpur, or any Bihar district to complete registration.",
  },
  {
    q: "How are residential flats and houses mutated with Patna Municipal Corporation?",
    a: "Patna Municipal Corporation (PMC) updates property tax assessment records based on inheritance documents. The beneficiary submits an application with the registered Will, testator death certificate, and identity proof. A registered Will prevents competing claims from distant relatives and allows swift issuance of the revised tax receipt.",
  },
  {
    q: "Who can act as attesting witnesses for a Will in Bihar?",
    a: "Any two adult individuals of sound mind who hold valid Aadhaar cards or voter IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property under the Will, nor should they be spouses of beneficiaries. Family doctors or trusted acquaintances are recommended.",
  },
  {
    q: "Can Non-Resident Biharis living outside the state make a Will for Bihar properties?",
    a: "Yes. NRIs and professionals living in Delhi NCR, Bengaluru, Mumbai, or abroad can prepare a customized Will online through WillDrafting.in. The Will can be signed before two witnesses wherever they currently live. When visiting Bihar, they can complete optional Book III registration at their ancestral district Sub-Registrar Office.",
  },
];

export default function BiharLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/bihar";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-bihar.jpg";

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
        name: "Will Drafting in Bihar: Online Will Registration Guide",
        description:
          "Create a valid Will in Bihar with lawyer help. Guidance on Bihar e-Nibandhan portal, Bihar Bhumi Dakhil Kharij name change, and family.",
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
          caption: "Online Will Drafting and Land Succession Services in Bihar",
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
            name: "Bihar",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Bihar - Land Succession & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, Bihar e-Nibandhan portal filing, and doorstep signing support across Patna, Gaya.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Patna" },
          { "@type": "City", name: "Danapur" },
          { "@type": "City", name: "Gaya" },
          { "@type": "City", name: "Bodh Gaya" },
          { "@type": "City", name: "Muzaffarpur" },
          { "@type": "City", name: "Bhagalpur" },
          { "@type": "City", name: "Darbhanga" },
          { "@type": "City", name: "Purnia" },
          { "@type": "City", name: "Begusarai" },
          { "@type": "City", name: "Ara" },
          { "@type": "City", name: "Munger" },
          { "@type": "City", name: "Katihar" },
          { "@type": "City", name: "Chhapra" },
          { "@type": "City", name: "Nalanda" },
          { "@type": "City", name: "Bettiah" },
          { "@type": "City", name: "Saharsa" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Bihar Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Bihar Residents",
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
                name: "Complete Bihar Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Bihar",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Bihar.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Bihar real estate including urban apartments, family Khatiyani land, Jamabandi numbers, bank deposits, and family business assets. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Legally Enforceable Will Clauses",
            text: "Draft your Will using checked legal clauses for clear asset split, survivorship, guardian appointments for minors, and revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Bihar e-Nibandhan Online Appointment",
            text: "Schedule your filing appointment on the Bihar e-Nibandhan portal for your relevant district SRO and remit the nominal filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Sub-Registrar Office",
            text: "Visit the SRO office with both witnesses for verbal witness signing, photo capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: BIHAR_FAQS.map((item) => ({
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
      <BiharLocationClient faqs={BIHAR_FAQS} />
      <Footer />
    </>
  );
}
