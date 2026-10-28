import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PuneLocationClient from "./PuneLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Pune: Legal Online Will Making Guide",
  },
  description:
    "Draft a legally compliant Will in Pune. Expert lawyer assistance, IGR Maharashtra registration advice, and seamless family estate planning online.",
  keywords: [
    "will drafting in pune",
    "will registration pune sro",
    "online will maker maharashtra",
    "succession advocate pune",
    "flat transfer will pune pcmc",
    "igr maharashtra sarita portal will",
    "pune municipal corporation will mutation",
    "pcmc property transfer will",
    "probate non compulsory pune",
    "will lawyer kothrud pune",
    "will drafting baner balewadi",
    "will registration hinjewadi wakad",
    "will lawyer hadapsar magarpatta",
    "will drafting viman nagar kharadi",
    "will drafting aundh shivaji nagar",
    "sub registrar office haveli pune",
    "doctor fitness certificate will pune",
    "section 31 registration act home visit pune",
    "article 64 maharashtra stamp act will",
    "ama legal solutions pune will drafting",
    "bombay high court probate pune exception",
    "cooperative housing society will transfer pune",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/pune",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/pune",
      "x-default": "https://www.willdrafting.in/locations/pune",
    },
  },
  openGraph: {
    title: "Will Drafting in Pune: Legal Online Will Making Guide",
    description:
      "Draft a legally compliant Will in Pune. Expert lawyer assistance, IGR Maharashtra registration advice, and seamless family estate planning online.",
    url: "https://www.willdrafting.in/locations/pune",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-pune.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Registration Services in Pune Maharashtra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Pune: Legal Online Will Making Guide",
    description:
      "Draft a legally compliant Will in Pune. Expert lawyer assistance, IGR Maharashtra registration advice, and seamless family estate planning online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-pune.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const PUNE_FAQS = [
  {
    q: "Is Will registration mandatory in Pune?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Pune. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Pune Sub-Registrar Office stores it in government Book III records. This prevents future title disputes and speeds up PMC and PCMC property mutation.",
  },
  {
    q: "Is probate required for a Will in Pune?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Pune is not a presidency town. The Bombay High Court has consistently held that court probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills in Pune unless specifically contested or ordered by court.",
  },
  {
    q: "What is the official government fee to register a Will in Pune?",
    a: "Wills are completely exempt from stamp duty across Maharashtra under Article 64 of the Maharashtra Stamp Act. At Pune Sub-Registrar offices, you only pay a flat one hundred rupee registration fee. Nominal computer scanning charges of approximately ₹100 to ₹300 also apply. There is zero percentage-based property tax.",
  },
  {
    q: "How do I book an online appointment for Will registration in Pune?",
    a: "Appointments are booked through the IGR Maharashtra portal using the e-Stepin system under the SARITA framework (igrmaharashtra.gov.in). You select your local Haveli Sub-Registrar office, enter testator and witness details, pay the nominal fee online, and download your designated appointment receipt.",
  },
  {
    q: "Does a nominee automatically own a cooperative housing society flat in Pune?",
    a: "No. Under Section 30 of the Maharashtra Co-operative Societies Act, 1960 and Supreme Court rulings, a nominee acts only as a trustee. A nominee holds the flat on behalf of the legal heirs. True beneficial ownership passes strictly through a valid Will or legal succession.",
  },
  {
    q: "Can senior citizens in Pune register a Will from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home visit by the Sub-Registrar. A registered MBBS doctor must certify that the testator is medically unable to travel. The Sub-Registrar visits with portable biometric equipment.",
  },
  {
    q: "How does a registered Will help in transferring PMC and PCMC flats?",
    a: "A registered Will provides authentic evidence of the deceased owner's intentions before Pune Municipal Corporation (PMC) and Pimpri-Chinchwad Municipal Corporation (PCMC). It streamlines property tax name mutation (Varasdar Nond) and avoids lengthy succession certificate proceedings.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Pune properties?",
    a: "Yes. Many NRIs own apartments in Hinjewadi, Wakad, Baner, and Kharadi. NRIs can draft a legally compliant Will online from abroad. They can execute it before two witnesses and get it apostilled or notarized, or register it before a Pune Sub-Registrar during an India visit.",
  },
];

export default function PuneLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/pune";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-pune.jpg";

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
        name: "Will Drafting in Pune: Legal Online Will Making Guide",
        description:
          "Draft a legally compliant Will in Pune. Expert lawyer help, IGR Maharashtra filing advice, and seamless family estate planning online.",
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
          caption: "Online Will Drafting and Registration Services in Pune Maharashtra",
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
            name: "Pune",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Pune - Legal Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, IGR Maharashtra Sarita filing, and doorstep signing support across Pune, PCMC, and.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Pune" },
          { "@type": "City", name: "Pimpri-Chinchwad" },
          { "@type": "City", name: "Kothrud" },
          { "@type": "City", name: "Baner" },
          { "@type": "City", name: "Balewadi" },
          { "@type": "City", name: "Aundh" },
          { "@type": "City", name: "Wakad" },
          { "@type": "City", name: "Hinjewadi" },
          { "@type": "City", name: "Hadapsar" },
          { "@type": "City", name: "Magarpatta" },
          { "@type": "City", name: "Kharadi" },
          { "@type": "City", name: "Viman Nagar" },
          { "@type": "City", name: "Kalyani Nagar" },
          { "@type": "City", name: "Shivaji Nagar" },
          { "@type": "City", name: "Deccan Gymkhana" },
          { "@type": "City", name: "Bavdhan" },
          { "@type": "City", name: "Bibwewadi" },
          { "@type": "City", name: "Sinhagad Road" },
          { "@type": "City", name: "Pimple Saudagar" },
          { "@type": "City", name: "Nigdi" },
          { "@type": "City", name: "Akurdi" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pune Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Pune Residents",
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
                name: "Complete Pune Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Pune",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Pune.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Pune assets including PMC/PCMC flats, plots, bank deposits, mutual funds, and demat shares. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include revocation, survivorship, and specific asset bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Pune SRO Appointment on IGR Portal",
            text: "Book an e-appointment on the IGR Maharashtra Sarita portal for your local Haveli SRO office and pay the nominal ₹100 filing fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Pune SRO",
            text: "Visit the SRO office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: PUNE_FAQS.map((item) => ({
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
      <PuneLocationClient faqs={PUNE_FAQS} />
      <Footer />
    </>
  );
}
