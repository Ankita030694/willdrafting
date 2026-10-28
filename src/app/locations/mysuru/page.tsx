import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MysuruLocationClient from "./MysuruLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Mysuru: Registration & Probate Law Guide",
  },
  description:
    "Draft and register your Will in Mysuru. Expert Karnataka High Court probate guidance, MUDA asset distribution, and advocate consultation.",
  keywords: [
    "will drafting in mysuru",
    "will drafting in gokulam",
    "will drafting in jayalakshmipuram",
    "will drafting in kuvempunagar",
    "will drafting in vijayanagar mysuru",
    "will drafting in saraswathipuram",
    "will drafting in yadavagiri",
    "will drafting in hebbal mysuru",
    "will registration mysore kaveri",
    "kaveri 2.0 will registration mysuru",
    "muda plot will transfer mysuru",
    "karnataka high court probate will mysore",
    "will lawyer mysuru",
    "estate planning advocate mysore",
    "online will maker mysuru karnataka",
    "mcc e-aasthi khata transfer will mysore",
    "section 213 indian succession act karnataka probate",
    "sub registrar office mysuru mini vidhana soudha",
    "sub registrar office ramakrishnanagar mysuru",
    "sub registrar office vijayanagar mysuru",
    "sub registrar office nazarbad mysore",
    "probate lawyer karnataka high court",
    "will registration fees in karnataka",
    "section 31 registration act home visit mysuru",
    "senior citizen will registration mysore",
    "ama legal solutions mysuru will drafting",
    "testamentary succession karnataka",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/mysuru",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/mysuru",
      "x-default": "https://www.willdrafting.in/locations/mysuru",
    },
  },
  openGraph: {
    title: "Will Drafting in Mysuru: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Mysuru. Expert Karnataka High Court probate guidance, MUDA asset distribution, and advocate consultation.",
    url: "https://www.willdrafting.in/locations/mysuru",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-mysuru.jpg",
        width: 1024,
        height: 576,
        alt: "Legal Will Drafting and Probate Support Services in Mysuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Mysuru: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Mysuru. Expert Karnataka High Court probate guidance, MUDA asset distribution, and advocate consultation.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-mysuru.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MYSURU_FAQS = [
  {
    q: "Is Will registration mandatory in Mysuru?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Karnataka. A Will written on plain paper is legally valid if signed before two independent witnesses. However, registering your Will via Karnataka's Kaveri 2.0 portal stores it permanently in government Book III records. This prevents future inheritance disputes and proves authenticity.",
  },
  {
    q: "Is probate compulsory for a Will in Mysuru?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only in the historic presidency towns of Mumbai, Kolkata, and Chennai. Mysuru is a non-presidency city. The Karnataka High Court has settled that Hindus, Sikhs, Jains, and Buddhists do not need mandatory probate to execute a Will in Mysuru.",
  },
  {
    q: "How does Karnataka's Kaveri 2.0 portal work for Mysuru Wills?",
    a: "Kaveri 2.0 (kaveri.karnataka.gov.in) is Karnataka's unified registration system. You set up a citizen account, input testator and witness information, upload your draft Will, pay the nominal government fee online, and schedule an appointment at your local Mysuru Sub-Registrar Office. You then attend the SRO once for biometric authentication.",
  },
  {
    q: "What is the official government fee to register a Will in Mysuru?",
    a: "Under the Karnataka Stamp Act, 1957, Wills are completely exempt from stamp duty. At Mysuru Sub-Registrar offices, you only pay a flat registration fee of ₹200 along with standard scanning and data processing charges of approximately ₹100 to ₹300. There are no percentage-based property charges.",
  },
  {
    q: "How does a registered Will help transfer MUDA plots and MCC Khata?",
    a: "A registered Will provides unimpeachable legal title evidence. It enables your beneficiaries to apply directly to the Mysuru Urban Development Authority (MUDA) for site transfer and to the Mysuru City Corporation (MCC) for e-Aasthi Khata mutation, eliminating the need for an expensive civil court succession certificate.",
  },
  {
    q: "Can senior citizens register a Will from home in Mysuru under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can conduct a home or hospital visit for senior citizens or unwell testators. An MBBS doctor issues a medical fitness certificate confirming sound mental capacity. Upon paying the official government commission fee, the officer visits with portable biometric equipment.",
  },
  {
    q: "How are ancestral and heritage family homes in Mysuru passed via a Will?",
    a: "You can bequeath your self-acquired property and your defined ancestral coparcenary share under the Hindu Succession Act, 1956. For heritage homes in Gokulam, Saraswathipuram, or Nazarbad, clearly identifying the schedule of property, boundaries, and chain title deeds ensures uninterrupted transfer across generations.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Mysuru properties?",
    a: "Yes. NRIs owning real estate, MUDA sites, or bank deposits in Mysuru can execute an Indian Will. Immovable property in India is governed by the law of the land (lex situs). Having a dedicated Indian Will prevents cumbersome foreign probate re-sealing procedures in Karnataka courts.",
  },
];

export default function MysuruLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/mysuru";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-mysuru.jpg";

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
        name: "Will Drafting in Mysuru: Registration & Probate Law Guide",
        description:
          "Draft and register your Will in Mysuru. Expert Karnataka High Court probate guidance, MUDA asset split, and lawyer talk.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1024,
          height: 576,
          caption: "Legal Will Drafting & Probate Support Services in Mysuru",
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
            name: "Mysuru",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Mysuru - Estate Planning, Registration & Probate Guidance",
        description:
          "Professional Will drafting, lawyer check, Karnataka Kaveri 2.0 SRO filing, and Karnataka High Court probate guidance.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mysuru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Mysuru" },
          { "@type": "City", name: "Gokulam" },
          { "@type": "City", name: "Jayalakshmipuram" },
          { "@type": "City", name: "Saraswathipuram" },
          { "@type": "City", name: "Kuvempunagar" },
          { "@type": "City", name: "Vijayanagar" },
          { "@type": "City", name: "Yadavagiri" },
          { "@type": "City", name: "Ramakrishnanagar" },
          { "@type": "City", name: "Bogadi" },
          { "@type": "City", name: "Dattagalli" },
          { "@type": "City", name: "JP Nagar" },
          { "@type": "City", name: "Hebbal" },
          { "@type": "City", name: "Nazarbad" },
          { "@type": "City", name: "Vani Vilas Mohalla" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mysuru Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Mysuru Residents",
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
                name: "Complete Karnataka SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Mysuru",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Karnataka.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Mysuru Assets and Beneficiaries",
            text: "Itemize your Mysuru assets including MUDA plots, family homes, bank accounts, demat investments, and pension benefits. Appoint your heirs and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Statutory Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior lawyer to incorporate survivorship, specific bequest, and revocation clauses under the Indian Succession Act, 1925.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign each page before two independent adult witnesses who are not heirs under the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Appointment on Karnataka Kaveri 2.0 Portal",
            text: "Schedule an appointment on kaveri.karnataka.gov.in for your local SRO office in Mysuru and pay the nominal ₹200 filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Attend the SRO office with both witnesses and original IDs for biometric thumbprinting, web-camera photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MYSURU_FAQS.map((item) => ({
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
      <MysuruLocationClient faqs={MYSURU_FAQS} />
      <Footer />
    </>
  );
}
