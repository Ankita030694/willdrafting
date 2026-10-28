import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SrinagarLocationClient from "./SrinagarLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Srinagar: Online Will & Property Guide",
  },
  description:
    "Draft a valid Will in Srinagar. Guidance on NGDRS J&K registration, apple orchard and hotel succession, SMC mutation, and Indian Succession.",
  keywords: [
    "will drafting in srinagar",
    "will registration ngdrs srinagar",
    "kashmir property will succession",
    "smc mutation will srinagar",
    "estate lawyer srinagar",
    "online will srinagar",
    "will drafting rajbagh srinagar",
    "will drafting lal chowk",
    "will drafting hyderpora",
    "will drafting hazratbal",
    "kashmir apple orchard will succession",
    "dal lake houseboat will inheritance",
    "section 31 registration act home visit srinagar",
    "is probate mandatory in srinagar",
    "high court of jammu and kashmir probate",
    "intiqal revenue mutation will srinagar",
    "ngdrs jk gov in appointment srinagar",
    "advocate for will drafting srinagar",
    "ama legal solutions srinagar will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/srinagar",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/srinagar",
      "x-default": "https://www.willdrafting.in/locations/srinagar",
    },
  },
  openGraph: {
    title: "Will Drafting in Srinagar: Online Will & Property Guide",
    description:
      "Draft a valid Will in Srinagar. Guidance on NGDRS J&K registration, apple orchard and hotel succession, SMC mutation, and Indian Succession.",
    url: "https://www.willdrafting.in/locations/srinagar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-srinagar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Srinagar Jammu and Kashmir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Srinagar: Online Will & Property Guide",
    description:
      "Draft a valid Will in Srinagar. Guidance on NGDRS J&K registration, apple orchard and hotel succession, SMC mutation, and Indian Succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-srinagar-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SRINAGAR_FAQS = [
  {
    q: "Is Will registration mandatory in Srinagar under J&K rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Srinagar. A Will written on standard paper is legally valid if signed by the testator in the presence of two independent witnesses. However, registering your Will via the NGDRS J&K portal places it into Book III government custody, providing strong legal protection against forgery and accelerating SMC property tax mutation.",
  },
  {
    q: "Is probate required for a Will in Srinagar under the Indian Succession Act?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for properties or Wills executed within the historical presidency towns of Mumbai, Kolkata, and Chennai. Since Srinagar lies outside these presidency limits, probate is strictly non-compulsory. Beneficiaries can mutate real estate and claim bank deposits directly using a registered Will.",
  },
  {
    q: "How are apple orchards and agricultural lands in Srinagar transferred by Will?",
    a: "Agricultural land, apple orchards, and walnut groves in Harwan, Nishat, or Shalimar can be bequeathed through a Will. Upon the testator demise, the beneficiary presents the registered Will and death certificate to the jurisdictional Tehsildar or Patwari. An Intiqal (mutation entry) is recorded in the Jamabandi and Khasra Girdawari under the J&K Land Revenue Act.",
  },
  {
    q: "How do I book an NGDRS J&K appointment for Will registration in Srinagar?",
    a: "Appointments are scheduled online through the National Generic Document Registration System portal (ngdrs.jk.gov.in). You select the relevant Srinagar Sub-Registrar Office (such as SRO Srinagar Khas-I at the DC Office Complex), enter testator and witness KYC details, upload the draft, remit statutory fees via J&K GRAS, and reserve a convenient execution time slot.",
  },
  {
    q: "Does a registered Will help with Srinagar Municipal Corporation (SMC) mutation?",
    a: "Yes. Srinagar Municipal Corporation requires verified documentary proof before updating ownership records on the municipal property tax assessment register. A registered Will provides conclusive proof of the deceased testator intentions, eliminating delays, multiple legal heir affidavits, or expensive civil court disputes.",
  },
  {
    q: "How does succession work for Dal Lake houseboats and tourism hotels in Srinagar?",
    a: "Houseboats on Dal Lake and Nigeen Lake operate under water surface permits and Kashmir Tourism Department registration certificates. A customized Will details the transmission of physical houseboat shares, hotel leasehold rights, and tourism operating licenses, preventing disruptive disputes among surviving business heirs.",
  },
  {
    q: "Can senior citizens in Srinagar register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden testators, or persons with mobility issues can request a doorstep visit. An MBBS doctor issues a medical fitness certificate. The Srinagar Sub-Registrar visits your residence in Rajbagh, Hyderpora, or Sanat Nagar with portable biometric devices under a special commission.",
  },
  {
    q: "What is the official government fee to register a Will in Srinagar?",
    a: "Testamentary Wills are completely exempt from commercial ad-valorem stamp duty across Jammu and Kashmir. At Srinagar Sub-Registrar offices, you only pay a nominal statutory registration fee plus standard computer scanning charges via the NGDRS portal. There are no percentage-based property market value charges.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Srinagar Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any asset or bequest under the Will. Family doctors, trusted neighbors, or colleagues are ideal choices.",
  },
  {
    q: "How did the J&K Reorganisation Act 2019 affect Will drafting in Srinagar?",
    a: "Following the Jammu and Kashmir Reorganisation Act, 2019, the Central Indian Succession Act, 1925, and Central Registration Act, 1908, became directly applicable to Srinagar. This introduced standardized national succession protections, online NGDRS digital registration, and streamlined inter-state asset administration for families owning properties across India.",
  },
];

export default function SrinagarLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/srinagar";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-srinagar.jpg";

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
        name: "Will Drafting in Srinagar: Online Will & Property Guide",
        description:
          "Draft a valid Will in Srinagar. Guidance on NGDRS J&K registration, apple orchard and hotel succession, SMC mutation, and Indian Succession.",
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
          caption: "Legal Will Drafting and Property Succession in Srinagar Jammu and Kashmir",
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
            name: "Srinagar",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Srinagar - Estate Planning & NGDRS Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS J&K registration, and doorstep execution support across Srinagar, Rajbagh, Lal Chowk.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Srinagar",
          addressRegion: "Jammu and Kashmir",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Srinagar" },
          { "@type": "City", name: "Rajbagh" },
          { "@type": "City", name: "Lal Chowk" },
          { "@type": "City", name: "Jawahar Nagar" },
          { "@type": "City", name: "Karan Nagar" },
          { "@type": "City", name: "Hyderpora" },
          { "@type": "City", name: "Rawalpora" },
          { "@type": "City", name: "Sanat Nagar" },
          { "@type": "City", name: "Hazratbal" },
          { "@type": "City", name: "Nishat" },
          { "@type": "City", name: "Shalimar" },
          { "@type": "City", name: "Harwan" },
          { "@type": "City", name: "Khanyar" },
          { "@type": "City", name: "Nowhatta" },
          { "@type": "City", name: "Batamaloo" },
          { "@type": "City", name: "Bemina" },
          { "@type": "City", name: "Pantha Chowk" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Srinagar Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Srinagar Residents",
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
                name: "Complete Srinagar Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Srinagar",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Srinagar.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Srinagar real estate including SMC residential houses, Dal Lake houseboats, commercial hotels, apple orchards in Harwan or Nishat, and financial investments. Designate beneficiaries and an executor.",
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
            name: "Book NGDRS J&K Appointment Slot",
            text: "Schedule your registration appointment on the NGDRS J&K portal (ngdrs.jk.gov.in) for your relevant Srinagar SRO and remit nominal fees via J&K GRAS.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Srinagar SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: SRINAGAR_FAQS.map((item) => ({
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
      <SrinagarLocationClient faqs={SRINAGAR_FAQS} />
      <Footer />
    </>
  );
}
