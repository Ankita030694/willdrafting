import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BengaluruLocationClient from "./BengaluruLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Bengaluru: Expert Online Will Services",
  },
  description:
    "Create a legally binding Will in Bengaluru. Get Kaveri 2.0 registration guidance, tech estate planning, and lawyer drafting for IT professionals.",
  keywords: [
    "will drafting in bengaluru",
    "will drafting in koramangala",
    "will drafting in hsr layout",
    "will drafting in indiranagar",
    "will drafting in whitefield",
    "will drafting in jayanagar",
    "will drafting in jp nagar",
    "will drafting in electronic city",
    "will drafting in yelahanka",
    "will drafting in hebbal",
    "will drafting in malleshwaram",
    "will drafting in rajajinagar",
    "will drafting in bellandur",
    "will drafting in marathahalli",
    "will registration bangalore kaveri",
    "online will drafting karnataka",
    "tech startup esop will bangalore",
    "estate planning bangalore",
    "will lawyer bengaluru",
    "kaveri 2.0 will registration",
    "bbmp khata transfer will bengaluru",
    "sub registrar office koramangala will registration",
    "sub registrar office whitefield will registration",
    "sub registrar office indiranagar will registration",
    "sub registrar office jayanagar will registration",
    "probate lawyer bengaluru karnataka",
    "sub registrar office bengaluru will registration",
    "section 31 registration act home visit bengaluru",
    "digital assets crypto will bangalore",
    "will registration fees in karnataka",
    "bda site will transfer bangalore",
    "ama legal solutions bengaluru will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/bengaluru",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/bengaluru",
      "x-default": "https://www.willdrafting.in/locations/bengaluru",
    },
  },
  openGraph: {
    title: "Will Drafting in Bengaluru: Expert Online Will Services",
    description:
      "Create a legally binding Will in Bengaluru. Get Kaveri 2.0 registration guidance, tech estate planning, and lawyer drafting for IT professionals.",
    url: "https://www.willdrafting.in/locations/bengaluru",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-bengaluru-og.jpg",
        width: 1200,
        height: 675,
        alt: "Online Will Drafting and Property Succession in Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Bengaluru: Expert Online Will Services",
    description:
      "Create a legally binding Will in Bengaluru. Get Kaveri 2.0 registration guidance, tech estate planning, and lawyer drafting for IT professionals.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-bengaluru-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const BENGALURU_FAQS = [
  {
    q: "Is Will registration mandatory in Bengaluru?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Karnataka. A Will written on plain white paper and signed before two witnesses is legally valid. However, registering your Will through Karnataka's Kaveri 2.0 portal prevents family disputes, enters official Book III records, and simplifies BBMP Khata transfer.",
  },
  {
    q: "Is probate compulsory for a Will in Bengaluru?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historic presidency towns of Mumbai, Kolkata, and Chennai. Bengaluru is a non-presidency city. The Karnataka High Court has confirmed that Hindus, Sikhs, Jains, and Buddhists do not need mandatory probate to execute a Will in Karnataka.",
  },
  {
    q: "How does Karnataka's Kaveri 2.0 portal work for Will registration?",
    a: "Kaveri 2.0 is Karnataka's online registration system. You create a citizen login, input testator and witness details, upload your draft Will, pay the nominal government fee online, and book an appointment slot at your local Sub-Registrar Office (SRO). You then visit the SRO only once for biometric verification.",
  },
  {
    q: "What is the official government fee to register a Will in Bengaluru?",
    a: "Under the Karnataka Stamp Act, 1957, Wills are completely exempt from stamp duty. At Bengaluru Sub-Registrar offices, you only pay a nominal registration fee of ₹200 along with standard scanning and data processing charges of approximately ₹100 to ₹300. There are no percentage-based property charges.",
  },
  {
    q: "How do I pass startup ESOPs and US shares (RSUs) in a Bengaluru Will?",
    a: "Bangalore tech professionals often hold unlisted startup ESOPs and US tech stocks (RSUs). Your Will should clearly list vested stock options, company folio numbers, and international brokerage accounts (such as Morgan Stanley or Charles Schwab). A Will overrides company nominations and prevents cross-border estate hurdles.",
  },
  {
    q: "How does a Will help in transferring BBMP A Khata and B Khata property?",
    a: "A registered Will provides clear legal proof of ownership. It allows your legal heir to apply for BBMP Khata transfer (e-Aasthi) without obtaining an expensive succession certificate from civil court. For B Khata properties, a registered Will ensures uninterrupted tax paying rights and prevents unauthorized claims.",
  },
  {
    q: "Can an elderly person register a Will from home in Bengaluru?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can conduct a home visit for senior citizens or individuals with medical conditions. A registered doctor must provide a medical fitness certificate. Upon paying the official government commission fee, the officer visits with portable biometric equipment.",
  },
  {
    q: "Do NRIs owning property in Bengaluru need an Indian Will?",
    a: "Yes. Non-Resident Indians owning flats in Whitefield, Sarjapur, or North Bengaluru should execute an Indian Will for their immovable assets. Indian real estate succession is governed by Indian law (lex situs). Having a dedicated Indian Will prevents costly foreign court probate validation in Bengaluru courts.",
  },
];

export default function BengaluruLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/bengaluru";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-bengaluru-og.jpg";

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
        name: "Will Drafting in Bengaluru: Expert Online Will Services",
        description:
          "Create a legally binding Will in Bengaluru. Get Kaveri 2.0 filing guidance, tech estate planning, and lawyer drafting for IT professionals.",
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
          height: 675,
          caption: "Online Will Drafting and Property Succession in Bengaluru",
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
            name: "Bengaluru",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Bengaluru - Estate Planning & Kaveri 2.0 Registration",
        description:
          "Professional Will drafting, tech startup estate advisory, and Kaveri 2.0 SRO office filing support across Bengaluru Urban and.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Bengaluru" },
          { "@type": "City", name: "Koramangala" },
          { "@type": "City", name: "HSR Layout" },
          { "@type": "City", name: "Indiranagar" },
          { "@type": "City", name: "Domlur" },
          { "@type": "City", name: "Whitefield" },
          { "@type": "City", name: "Marathahalli" },
          { "@type": "City", name: "Jayanagar" },
          { "@type": "City", name: "JP Nagar" },
          { "@type": "City", name: "Electronic City" },
          { "@type": "City", name: "Bommanahalli" },
          { "@type": "City", name: "Yelahanka" },
          { "@type": "City", name: "Hebbal" },
          { "@type": "City", name: "Malleshwaram" },
          { "@type": "City", name: "Rajajinagar" },
          { "@type": "City", name: "Bellandur" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Bengaluru Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Bengaluru Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Tech Asset Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Kaveri 2.0 SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Bengaluru via Kaveri 2.0",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Karnataka using the Kaveri 2.0 portal.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Assets, ESOPs and Beneficiaries",
            text: "List your Bengaluru real estate (BBMP A or B Khata, BDA sites), demat portfolios, startup stock options (ESOPs/RSUs), and overseas accounts. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Tech & Property Clauses",
            text: "Draft your Will using our online legal platform or with a senior lawyer to incorporate specific asset split, survivorship, and digital estate clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not named as heirs.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Kaveri 2.0 SRO Appointment Online",
            text: "Log in to Karnataka's Kaveri 2.0 portal, upload your Will details, pay the nominal government fee of ₹200, and book an appointment slot at your local SRO office.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at SRO",
            text: "Visit the SRO office with your two witnesses and original Aadhaar cards for fingerprint scanning, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: BENGALURU_FAQS.map((item) => ({
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
      <BengaluruLocationClient faqs={BENGALURU_FAQS} />
      <Footer />
    </>
  );
}
