import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JammuLocationClient from "./JammuLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Jammu: Online Will Registration Guide",
  },
  description:
    "Draft a legally valid Will in Jammu. Complete NGDRS token booking, JDA plot transfer guidance, and family estate succession advice with.",
  keywords: [
    "will drafting in jammu",
    "will registration ngdrs jammu",
    "jda plot will transfer",
    "jmc property mutation will",
    "succession advocate jammu",
    "online will jammu and kashmir",
    "high court jammu wing probate",
    "will drafting gandhi nagar jammu",
    "will drafting trikuta nagar",
    "will drafting channi himmat",
    "will drafting sainik colony jammu",
    "will drafting janipur",
    "will drafting roop nagar jammu",
    "will drafting bantalab",
    "will drafting talab tillo",
    "will drafting bakshi nagar",
    "will drafting bari brahmana",
    "will drafting gangyal",
    "rs pura agricultural land will",
    "section 31 registration act home visit jammu",
    "ngdrs jk gov in token slot jammu",
    "is probate mandatory in jammu",
    "ama legal solutions jammu will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/jammu",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/jammu",
      "x-default": "https://www.willdrafting.in/locations/jammu",
    },
  },
  openGraph: {
    title: "Will Drafting in Jammu: Online Will Registration Guide",
    description:
      "Draft a legally valid Will in Jammu. Complete NGDRS token booking, JDA plot transfer guidance, and family estate succession advice with.",
    url: "https://www.willdrafting.in/locations/jammu",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-jammu-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Jammu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Jammu: Online Will Registration Guide",
    description:
      "Draft a legally valid Will in Jammu. Complete NGDRS token booking, JDA plot transfer guidance, and family estate succession advice with.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-jammu-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const JAMMU_FAQS = [
  {
    q: "Is Will registration mandatory in Jammu?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Jammu. A Will handwritten or printed on plain white paper and attested by two competent witnesses is legally valid. However, formal registration on the NGDRS J&K portal and Book III custody with the Sub-Registrar provides strong statutory presumption of genuineness under Section 114 of the Indian Evidence Act (now Bharatiya Sakshya Adhiniyam, 2023) and facilitates seamless mutation with the Jammu Development Authority (JDA) and Jammu Municipal Corporation (JMC).",
  },
  {
    q: "Is probate required for a Will in Jammu under High Court rules?",
    a: "No. Under Section 213(2) read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or concerning properties located in the historical presidency towns of Mumbai, Kolkata, and Chennai. For Jammu, probate is completely non-mandatory for Hindu, Sikh, Jain, and Buddhist testators. Beneficiaries can directly apply for title mutation with JDA, JMC, and revenue authorities using a registered Will. Probate or Letters of Administration is only needed if there is a severe title contest among legal heirs in the District Court, Jammu.",
  },
  {
    q: "What is the official government fee to register a Will on NGDRS in Jammu?",
    a: "Wills in Jammu and Kashmir do not attract ad-valorem stamp duty based on property valuation. Registration is conducted under nominal fixed fees on the National Generic Document Registration System (NGDRS J&K). The official registration fee is nominal (typically ₹100 to ₹500 plus standard electronic scanning and data processing charges of ₹100 to ₹250). There are zero percentage-based stamp duties charged on the total market worth of your estate.",
  },
  {
    q: "How are Jammu Development Authority (JDA) leasehold and freehold plots transferred via Will?",
    a: "For plots in JDA colonies like Gandhi Nagar, Trikuta Nagar, Roop Nagar, and Bantalab, the legatee submits the registered Will, death certificate, affidavit, and an indemnity bond to the JDA Secretary or Director of Land Management. JDA publishes a 30-day public notice in local dailies. If no objection is lodged, the plot lease or freehold ownership is transferred smoothly without requiring civil court probate.",
  },
  {
    q: "How does a registered Will simplify Jammu Municipal Corporation (JMC) property tax mutation?",
    a: "Jammu Municipal Corporation requires conclusive testamentary proof to update the property tax assessment register and civic utility connections. A registered Will bearing Sub-Registrar Book III registration seals satisfies JMC legal verification instantly, avoiding cumbersome civil court succession certificates or disputed legal heir affidavits from the revenue tehsildar.",
  },
  {
    q: "Can senior citizens in Jammu register a Will at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or testators with severe medical disabilities can apply for a special commission home visit. Upon submitting an MBBS doctor's medical fitness certificate, the Sub-Registrar attends the testator's residence in Gandhi Nagar, Channi Himmat, Janipur, or other localities with portable biometric verification apparatus.",
  },
  {
    q: "How does one book an appointment on the NGDRS J&K portal for Jammu Sub-Registrars?",
    a: "The testator or their advocate accesses the official NGDRS J&K portal (ngdrs.jk.gov.in). You select District Jammu, choose the appropriate Sub-Registrar Office jurisdiction (e.g., SRO Jammu South, SRO Jammu North, SRO Jammu West, or SRO Jammu Central), upload testator and witness KYC documents, remit the nominal fee, and generate an appointment token slot.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Jammu Sub-Registrar offices?",
    a: "Any two adult individuals of sound mental capacity holding valid Aadhaar or government identity proof can act as witnesses. Under Section 67 of the Indian Succession Act, 1925, an attesting witness must not be a beneficiary under the Will, nor should their spouse receive any bequest, as any legacy to a witness is rendered legally void. Family doctors, trusted family friends, or colleagues are ideal.",
  },
  {
    q: "How is ancestral agricultural land in RS Pura, Bishnah, or Marh transferred under a Will?",
    a: "Agricultural land and Basmati farming parcels across Jammu rural tehsils can be bequeathed under a valid Will. Following the testator's demise, the beneficiary submits the registered Will and death certificate to the concerned Halqa Patwari and Tehsildar. A mutation entry (Intiqal) is recorded in the revenue Jamabandi register under the J&K Land Revenue Act, ensuring clean legal title.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for residential properties in Jammu?",
    a: "Yes. NRIs residing in the UAE, USA, UK, or Canada owning residential properties in Jammu can draft a customized Indian succession Will. The document can be signed before two witnesses abroad and authenticated via the Indian Consulate or apostilled, or registered in person before the local Jammu Sub-Registrar through an NGDRS token booking during their visit to India.",
  },
];

export default function JammuLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/jammu";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-jammu.jpg";

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
        name: "Will Drafting in Jammu: Online Will Registration Guide",
        description:
          "Draft a legally valid Will in Jammu. Complete NGDRS token booking, JDA plot transfer guidance, and family estate succession advice with.",
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
          caption: "Legal Will Drafting and Property Succession in Jammu",
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
            name: "Jammu",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Jammu - Estate Planning & NGDRS Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS J&K registration, JDA plot mutation guidance, and doorstep execution support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jammu",
          addressRegion: "Jammu and Kashmir",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Jammu" },
          { "@type": "City", name: "Gandhi Nagar" },
          { "@type": "City", name: "Trikuta Nagar" },
          { "@type": "City", name: "Channi Himmat" },
          { "@type": "City", name: "Sainik Colony" },
          { "@type": "City", name: "Greater Kailash" },
          { "@type": "City", name: "Janipur" },
          { "@type": "City", name: "Roop Nagar" },
          { "@type": "City", name: "Bantalab" },
          { "@type": "City", name: "Talab Tillo" },
          { "@type": "City", name: "Bakshi Nagar" },
          { "@type": "City", name: "Canal Road" },
          { "@type": "City", name: "Sidhra" },
          { "@type": "City", name: "Nagrota" },
          { "@type": "City", name: "Gangyal" },
          { "@type": "City", name: "Bari Brahmana" },
          { "@type": "City", name: "RS Pura" },
          { "@type": "City", name: "Bishnah" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Jammu Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Jammu Residents",
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
                name: "Complete Jammu Sub-Registrar NGDRS Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Jammu",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Jammu via NGDRS.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Jammu properties including JDA residential plots, JMC freehold houses, agricultural land in RS Pura or Bishnah, and financial investments. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses compliant with the Indian Succession Act, 1925, detailing survivorship, executor powers, minor guardian designations, and prior instrument revocation.",
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
            name: "Book NGDRS J&K Portal Appointment",
            text: "Schedule your registration appointment on the NGDRS J&K portal for your relevant Jammu Sub-Registrar Office and remit the nominal registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Jammu SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: JAMMU_FAQS.map((item) => ({
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
      <JammuLocationClient faqs={JAMMU_FAQS} />
      <Footer />
    </>
  );
}
