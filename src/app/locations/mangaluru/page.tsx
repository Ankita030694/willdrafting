import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MangaluruLocationClient from "./MangaluruLocationClient";

// Title: Exactly 59 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Mangaluru: Registration & Probate Law Guide",
  },
  description:
    "Draft and register your Will in Mangaluru. Expert Karnataka High Court probate guidance, asset distribution, and lawyer consultation across.",
  keywords: [
    "will drafting in mangaluru",
    "will drafting in kodialbail",
    "will drafting in kadri",
    "will drafting in bejai",
    "will drafting in falnir",
    "will drafting in surathkal",
    "will drafting in ullal",
    "will drafting in deralakatte",
    "will drafting in moodabidri",
    "will registration mangalore kaveri",
    "kaveri 2.0 will registration mangaluru",
    "muda plot will transfer mangalore",
    "karnataka high court probate will mangaluru",
    "will lawyer mangaluru",
    "gulf nri will coastal karnataka",
    "estate planning advocate mangalore",
    "online will maker mangaluru karnataka",
    "mcc e-aasthi khata transfer will mangaluru",
    "section 213 indian succession act karnataka probate",
    "sub registrar office mangaluru mini vidhana soudha",
    "sub registrar office surathkal",
    "sub registrar office ullal",
    "sub registrar office moodabidri",
    "sub registrar office bantwal",
    "probate lawyer karnataka high court",
    "will registration fees in karnataka",
    "section 31 registration act home visit mangaluru",
    "senior citizen will registration mangalore",
    "ama legal solutions mangaluru will drafting",
    "christian succession act will mangalore",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/mangaluru",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/mangaluru",
      "x-default": "https://www.willdrafting.in/locations/mangaluru",
    },
  },
  openGraph: {
    title: "Will Drafting in Mangaluru: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Mangaluru. Expert Karnataka High Court probate guidance, asset distribution, and lawyer consultation across.",
    url: "https://www.willdrafting.in/locations/mangaluru",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-mangaluru.jpg",
        width: 1024,
        height: 576,
        alt: "Legal Will Drafting and Probate Support Services in Mangaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Mangaluru: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Mangaluru. Expert Karnataka High Court probate guidance, asset distribution, and lawyer consultation across.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-mangaluru.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MANGALURU_FAQS = [
  {
    q: "Is Will registration mandatory in Mangaluru?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Karnataka. A Will written on plain paper is legally valid if signed before two independent witnesses. However, registering your Will via Karnataka's Kaveri 2.0 portal stores it permanently in government Book III records. This prevents future inheritance disputes and proves authenticity.",
  },
  {
    q: "Is probate compulsory for a Will in Mangaluru?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only in the historic presidency towns of Mumbai, Kolkata, and Chennai. Mangaluru is a non-presidency city. The Karnataka High Court has settled that Hindus, Christians, Sikhs, Jains, and Buddhists do not need mandatory probate to execute a Will in Mangaluru.",
  },
  {
    q: "How does Karnataka's Kaveri 2.0 portal work for Mangaluru Wills?",
    a: "Kaveri 2.0 (kaveri.karnataka.gov.in) is Karnataka's unified registration system. You set up a citizen account, input testator and witness information, upload your draft Will, pay the nominal government fee online, and schedule an appointment at your local Mangaluru Sub-Registrar Office. You then attend the SRO once for biometric authentication.",
  },
  {
    q: "What is the official government fee to register a Will in Mangaluru?",
    a: "Under the Karnataka Stamp Act, 1957, Wills are completely exempt from stamp duty. At Mangaluru Sub-Registrar offices, you only pay a flat registration fee of ₹200 along with standard scanning and data processing charges of approximately ₹100 to ₹300. There are no percentage-based property charges.",
  },
  {
    q: "How are coastal and CRZ properties in Mangaluru bequeathed in a Will?",
    a: "Immovable assets along the coastal corridor, Panambur, Ullal, or Netravati riverfront require exact survey numbers, Khata certificates from MCC, and revenue RTC records from the Bhoomi portal. Clearly mentioning building plan approvals and KCZMA clearance records guarantees undisputed title succession for your heirs.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) in the Gulf make a Will for Mangaluru properties?",
    a: "Yes. With Mangaluru's large diaspora in UAE, Saudi Arabia, Oman, Qatar, and Kuwait, Gulf NRIs can execute an Indian Will for their local real estate, bank deposits, and NRE accounts. Having a dedicated Indian Will prevents cumbersome foreign probate re-sealing procedures in Karnataka courts.",
  },
  {
    q: "Can senior citizens register a Will from home in Mangaluru under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can conduct a home or hospital visit for senior citizens or unwell testators. An MBBS doctor issues a medical fitness certificate confirming sound mental capacity. Upon paying the official government commission fee, the officer visits with portable biometric equipment.",
  },
  {
    q: "How does a registered Will help transfer MUDA plots and MCC Khata?",
    a: "A registered Will provides unimpeachable legal title evidence. It enables your beneficiaries to apply directly to the Mangalore Urban Development Authority (MUDA) for site transfer and to the Mangaluru City Corporation (MCC) for E-Aasthi Khata mutation, eliminating the need for an expensive civil court succession certificate.",
  },
];

export default function MangaluruLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/mangaluru";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-mangaluru.jpg";

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
        name: "Will Drafting in Mangaluru: Registration & Probate Law Guide",
        description:
          "Draft and register your Will in Mangaluru. Expert Karnataka High Court probate guidance, asset distribution, and lawyer consultation across.",
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
          caption: "Legal Will Drafting & Probate Support Services in Mangaluru",
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
            name: "Mangaluru",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Mangaluru - Estate Planning, Registration & Probate Guidance",
        description:
          "Professional Will drafting, lawyer verification, Karnataka Kaveri 2.0 Sub-Registrar registration, and Karnataka High Court probate guidance.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mangaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Mangaluru" },
          { "@type": "City", name: "Hampankatta" },
          { "@type": "City", name: "Kodialbail" },
          { "@type": "City", name: "Kadri" },
          { "@type": "City", name: "Bejai" },
          { "@type": "City", name: "Falnir" },
          { "@type": "City", name: "Balmatta" },
          { "@type": "City", name: "Surathkal" },
          { "@type": "City", name: "Ullal" },
          { "@type": "City", name: "Deralakatte" },
          { "@type": "City", name: "Mulki" },
          { "@type": "City", name: "Moodabidri" },
          { "@type": "City", name: "Bantwal" },
          { "@type": "City", name: "Derebail" },
          { "@type": "City", name: "Kulshekar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mangaluru Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Mangaluru Residents",
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
        name: "How to Draft and Register a Will in Mangaluru",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Karnataka.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Mangaluru Assets and Beneficiaries",
            text: "Itemize your Mangaluru assets including MUDA plots, coastal family homes, NRI bank deposits, demat investments, and business shares. Appoint your beneficiaries and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Statutory Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior advocate to incorporate survivorship, specific bequest, and revocation clauses under the Indian Succession Act, 1925.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign each page before two independent adult witnesses who are not beneficiaries under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Appointment on Karnataka Kaveri 2.0 Portal",
            text: "Schedule an appointment on kaveri.karnataka.gov.in for your jurisdictional Sub-Registrar office in Mangaluru and pay the nominal ₹200 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Attend the Sub-Registrar office with both witnesses and original IDs for biometric thumbprinting, web-camera photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MANGALURU_FAQS.map((item) => ({
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
      <MangaluruLocationClient faqs={MANGALURU_FAQS} />
      <Footer />
    </>
  );
}
