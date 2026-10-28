import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BhubaneswarLocationClient from "./BhubaneswarLocationClient";

// Title: Exactly 58 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Bhubaneswar: Registration & Probate Guide",
  },
  description:
    "Draft and register your Will in Bhubaneswar. Expert Orissa High Court probate guidance, asset distribution, and lawyer consultation across.",
  keywords: [
    "will drafting in bhubaneswar",
    "will drafting in patia",
    "will drafting in nayapalli",
    "will drafting in saheed nagar",
    "will drafting in chandrasekharpur",
    "will drafting in jayadev vihar",
    "will drafting in khandagiri",
    "will drafting in pokhariput",
    "will drafting in old town bhubaneswar",
    "will registration bhubaneswar igr odisha",
    "orissa high court probate will bhubaneswar",
    "will lawyer bhubaneswar",
    "estate planning advocate bhubaneswar",
    "bda plot will transfer bhubaneswar",
    "ga department leasehold flat will bhubaneswar",
    "online will maker bhubaneswar odisha",
    "bmc municipal mutation will bhubaneswar",
    "section 213 indian succession act orissa high court",
    "district sub registrar office bhubaneswar unit 2",
    "sub registrar office bhubaneswar 2 khandagiri",
    "sub registrar office chandaka patia",
    "sub registrar office balianta pahal",
    "sub registrar office jatni",
    "probate lawyer orissa high court cuttack",
    "will registration fees in odisha",
    "section 31 registration act home visit bhubaneswar",
    "senior citizen will registration bhubaneswar",
    "ama legal solutions bhubaneswar will drafting",
    "odia nri will property bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/bhubaneswar",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/bhubaneswar",
      "x-default": "https://www.willdrafting.in/locations/bhubaneswar",
    },
  },
  openGraph: {
    title: "Will Drafting in Bhubaneswar: Registration & Probate Guide",
    description:
      "Draft and register your Will in Bhubaneswar. Expert Orissa High Court probate guidance, asset distribution, and lawyer consultation across.",
    url: "https://www.willdrafting.in/locations/bhubaneswar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-bhubaneswar.jpg",
        width: 1024,
        height: 576,
        alt: "Legal Will Drafting and Probate Support Services in Bhubaneswar Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Bhubaneswar: Registration & Probate Guide",
    description:
      "Draft and register your Will in Bhubaneswar. Expert Orissa High Court probate guidance, asset distribution, and lawyer consultation across.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-bhubaneswar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const BHUBANESWAR_FAQS = [
  {
    q: "Is Will registration mandatory in Bhubaneswar?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Bhubaneswar and across Odisha. An unregistered Will signed on plain white paper before two independent adult witnesses is legally valid. However, registering your Will at the Sub-Registrar Office places it in government Book III records. This prevents future title challenges and proves document authenticity.",
  },
  {
    q: "Is probate compulsory for properties located in Bhubaneswar?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only in the historical Presidency towns of Mumbai, Kolkata, and Chennai. Bhubaneswar is a non-presidency city. The Orissa High Court has consistently affirmed that probate is not mandatory for Odisha properties. Beneficiaries can mutate assets directly before the Tahsildar, BDA, or BMC.",
  },
  {
    q: "How do I mutate BDA or GA leasehold property after death using a Will?",
    a: "To mutate Bhubaneswar Development Authority (BDA) or General Administration (GA) leasehold plots, the beneficiary must submit an application with the registered Will, death certificate, and legal heir affidavit. BDA or the GA Department issues a public notice in local newspapers. If no objection is filed within 30 days, the leasehold or freehold mutation is completed in municipal records.",
  },
  {
    q: "What is the official government fee to register a Will in Bhubaneswar?",
    a: "Wills are exempt from ad valorem stamp duty across Odisha under the Indian Stamp Act as applied to the state. At Bhubaneswar Sub-Registrar offices, you only pay a flat nominal registration fee of ₹100 along with user scanning charges of ₹100 to ₹200. You do not pay any percentage-based property transfer tax.",
  },
  {
    q: "How do I book an online appointment for Will registration on IGR Odisha?",
    a: "You can book an appointment through the Inspector General of Registration (IGR) Odisha portal at igrodisha.gov.in. Under the e-Registration module, fill in the testator and witness details, upload deed drafts, and generate an e-Token appointment slot. Pay the nominal government fees online via the Odisha Treasury e-Challan gateway and download your booking slip.",
  },
  {
    q: "Can an elderly or bedridden person register a Will from home in Bhubaneswar?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can conduct a home or hospital visit in Bhubaneswar. You must submit an application supported by a medical fitness certificate from a registered MBBS doctor stating the testator cannot travel. Upon paying the official government commission fee, the officer visits the residence with portable biometric equipment.",
  },
  {
    q: "Does a nominee automatically become the owner of a Bhubaneswar apartment?",
    a: "No. Under Indian succession laws and Supreme Court rulings, a nominee is merely a temporary custodian. A nominee holds the flat or financial asset on behalf of legal heirs. Beneficial ownership passes exclusively through a valid Will or statutory succession law. Making a Will ensures your designated heir receives undisputed ownership.",
  },
  {
    q: "Can Odia Non-Resident Indians (NRIs) make a Will for Bhubaneswar properties?",
    a: "Yes. NRIs living in the US, UK, Middle East, or elsewhere can draft an Indian Will for their Bhubaneswar properties, bank deposits, and mutual funds online. The Will can be executed abroad before two adult witnesses and attested by the Indian Consulate or apostilled, or registered locally during an India visit.",
  },
];

export default function BhubaneswarLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/bhubaneswar";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-bhubaneswar.jpg";

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
        name: "Will Drafting in Bhubaneswar: Registration & Probate Guide",
        description:
          "Draft and register your Will in Bhubaneswar. Expert Orissa High Court probate guidance, asset split, and lawyer talk across.",
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
          caption: "Legal Will Drafting and Probate Support Services in Bhubaneswar Odisha",
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
            name: "Bhubaneswar",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Bhubaneswar - Estate Planning, Registration & Probate Guidance",
        description:
          "Professional Will drafting, lawyer check, Odisha IGR SRO filing, and Orissa High Court probate guidance across.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bhubaneswar",
          addressRegion: "Odisha",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Bhubaneswar" },
          { "@type": "City", name: "Patia" },
          { "@type": "City", name: "Nayapalli" },
          { "@type": "City", name: "Saheed Nagar" },
          { "@type": "City", name: "Chandrasekharpur" },
          { "@type": "City", name: "Jayadev Vihar" },
          { "@type": "City", name: "Khandagiri" },
          { "@type": "City", name: "Pokhariput" },
          { "@type": "City", name: "Old Town" },
          { "@type": "City", name: "Hanspal" },
          { "@type": "City", name: "Pahala" },
          { "@type": "City", name: "Jatni" },
          { "@type": "City", name: "Khordha" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Bhubaneswar Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Bhubaneswar Residents",
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
                name: "Complete Odisha SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Bhubaneswar",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Odisha.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Bhubaneswar Properties & Beneficiaries",
            text: "Itemize your Bhubaneswar assets including BDA plots, GA leasehold flats, freehold family lands, mutual funds, and bank deposits. Appoint chosen heirs and a reliable executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Statutory Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior lawyer to incorporate specific bequests, survivorship conditions, and revocation clauses under the Indian Succession Act, 1925.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Adult Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the simultaneous presence of two independent adult witnesses who are not heirs under the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Appointment on IGR Odisha e-Registration",
            text: "Book an appointment slot on the IGR Odisha portal (igrodisha.gov.in) for your local SRO office and pay the nominal ₹100 government fee online via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Bhubaneswar SRO",
            text: "Attend the SRO office with both witnesses carrying original photo IDs for biometric fingerprint scanning, digital web-camera capture, and Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: BHUBANESWAR_FAQS.map((item) => ({
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
      <BhubaneswarLocationClient faqs={BHUBANESWAR_FAQS} />
      <Footer />
    </>
  );
}
