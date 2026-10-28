import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NagalandLocationClient from "./NagalandLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Nagaland: Customary Succession Guide",
  },
  description:
    "Draft a legally valid Will in Nagaland. Guidance on Article 371A protections, Naga customary land inheritance, and self-acquired property.",
  keywords: [
    "will drafting in nagaland",
    "article 371a naga customary law will",
    "ancestral land succession nagaland",
    "will registration kohima dimapur",
    "estate lawyer nagaland",
    "online will nagaland",
    "will registration deputy commissioner kohima",
    "dc office dimapur will registry",
    "chumoukedima will drafting advocate",
    "mokokchung estate planning will",
    "wokha will registration advocate",
    "tuensang customary succession will",
    "mon district estate lawyer",
    "nagaland land and revenue regulation 1978 will",
    "gauhati high court kohima bench probate",
    "is probate mandatory in nagaland",
    "section 31 registration act home visit nagaland",
    "self acquired urban property will dimapur",
    "naga tribal council land succession will",
    "ama legal solutions nagaland will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/nagaland",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/nagaland",
      "x-default": "https://www.willdrafting.in/locations/nagaland",
    },
  },
  openGraph: {
    title: "Will Drafting in Nagaland: Customary Succession Guide",
    description:
      "Draft a legally valid Will in Nagaland. Guidance on Article 371A protections, Naga customary land inheritance, and self-acquired property.",
    url: "https://www.willdrafting.in/locations/nagaland",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-nagaland-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Nagaland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Nagaland: Customary Succession Guide",
    description:
      "Draft a legally valid Will in Nagaland. Guidance on Article 371A protections, Naga customary land inheritance, and self-acquired property.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-nagaland-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NAGALAND_FAQS = [
  {
    q: "Is Will registration mandatory in Nagaland?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Nagaland. A Will executed on plain white paper and attested by two competent witnesses is legally valid. However, registering your Will before the Deputy Commissioner (DC) or Sub-Divisional Officer (Civil) in Kohima, Dimapur, or your district center places it in permanent Book III government custody, shielding your estate against fraudulent claims and disputes.",
  },
  {
    q: "How does Article 371A of the Constitution influence Will drafting in Nagaland?",
    a: "Article 371A grants special constitutional protection to Nagaland, providing that parliamentary statutes regarding Naga customary law, procedure, and ownership and transfer of land do not apply unless approved by the Nagaland Legislative Assembly. When drafting a Will, ancestral clan or village lands must respect tribal customary constraints, whereas self-acquired urban properties, commercial investments, bank accounts, and movable assets enjoy full testamentary freedom.",
  },
  {
    q: "Can self-acquired urban properties in Dimapur and Kohima be bequeathed via a Will?",
    a: "Yes. Self-acquired properties purchased with personal earnings, including commercial buildings, residential apartments, leased urban plots, vehicles, and financial assets in Dimapur and Kohima, are fully within the testamentary power of the owner under the Indian Succession Act, 1925. A carefully drafted Will allows you to allocate these self-acquired assets to any chosen family member or beneficiary.",
  },
  {
    q: "Is probate required for a Will in Nagaland under Gauhati High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or concerning properties located in the historical presidency towns of Mumbai, Kolkata, and Chennai. The Gauhati High Court (Kohima Bench) has established that court probate is strictly non-compulsory in Nagaland, permitting direct property mutation with municipal councils and revenue offices.",
  },
  {
    q: "How does the Nagaland Land and Revenue Regulation (Amendment) Act, 1978 affect bequests?",
    a: "The Nagaland Land and Revenue Regulation (Amendment) Act, 1978 strictly prohibits the transfer of land to non-indigenous inhabitants of Nagaland. When drafting a Will, testators must ensure that bequests of landed property adhere to indigenous eligibility regulations. Our estate advocates ensure all clauses respect these statutory restrictions while securing financial and commercial assets for designated beneficiaries.",
  },
  {
    q: "Where is a Will officially registered in Nagaland?",
    a: "In Nagaland, registration powers are exercised by the Office of the Deputy Commissioner (DC), Additional Deputy Commissioner (ADC), or Sub-Divisional Officer (Civil) functioning as District Registrars and Sub-Registrars under the Registration Act, 1908. Testators in Kohima, Dimapur, Mokokchung, Chumoukedima, Wokha, and other district headquarters present their Will before the respective DC or administrative registry.",
  },
  {
    q: "What is the official government fee to register a Will in Nagaland?",
    a: "Wills are testamentary instruments and do not attract ad-valorem stamp duty in Nagaland. At the Deputy Commissioner or Sub-Registrar registry, testators only pay nominal statutory registration and document processing fees, typically ranging between ₹200 and ₹500. There are no percentage-based property market value charges.",
  },
  {
    q: "Can senior citizens in Nagaland register a Will at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or individuals with severe medical mobility constraints can petition the Deputy Commissioner or Sub-Registrar for a home or hospital visit. Upon submitting an MBBS medical certificate confirming physical inability to travel, the registering officer attends the residence to record attestation and biometrics.",
  },
  {
    q: "Who can serve as valid attesting witnesses for a Will in Nagaland?",
    a: "Any two adult individuals of sound mind possessing valid photo identification (such as an Aadhaar card or Voter ID) can act as attesting witnesses. Under Section 67 of the Indian Succession Act, 1925, an attesting witness must not be a beneficiary receiving any property or legacy under the Will. Respected community members, family doctors, or trusted neighbors make ideal witnesses.",
  },
  {
    q: "Can non-resident Nagas living outside the state draft a Will for assets in Nagaland?",
    a: "Yes. Many Nagas residing in Delhi, Bengaluru, Mumbai, Guwahati, or overseas own valuable properties, ancestral interests, or commercial investments across Nagaland. Our online platform enables you to draft and legally review a comprehensive Will remotely. You can execute the document before two independent witnesses wherever you reside and register it during your next visit to Nagaland.",
  },
];

export default function NagalandLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/nagaland";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-nagaland.jpg";

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
        name: "Will Drafting in Nagaland: Local Estate Guide",
        description:
          "Draft a legally valid Will in Nagaland. Guidance on Article 371A protections, Naga local land passing assets, and self-acquired asset.",
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
          caption: "Legal Will Drafting and Asset Estate in Nagaland",
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
            name: "Nagaland",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Nagaland - Estate Planning & DC SRO Registration",
        description:
          "Professional Will drafting, lawyer check, Article 371A local compliance, and Deputy Commissioner registry help across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kohima",
          addressRegion: "Nagaland",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kohima" },
          { "@type": "City", name: "Dimapur" },
          { "@type": "City", name: "Chumoukedima" },
          { "@type": "City", name: "Mokokchung" },
          { "@type": "City", name: "Wokha" },
          { "@type": "City", name: "Tuensang" },
          { "@type": "City", name: "Mon" },
          { "@type": "City", name: "Phek" },
          { "@type": "City", name: "Zunheboto" },
          { "@type": "City", name: "Niuland" },
          { "@type": "City", name: "Tseminyu" },
          { "@type": "City", name: "Peren" },
          { "@type": "City", name: "Kiphire" },
          { "@type": "City", name: "Longleng" },
          { "@type": "City", name: "Noklak" },
          { "@type": "City", name: "Shamator" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Nagaland Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Nagaland Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Lawyer Will Talk & Local Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Nagaland DC Office Will Registration & Doorstep Support",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Nagaland",
        description:
          "Five clear legal steps to draft and register an enforceable Will under Naga local protections and Indian succession laws.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Categorize Family and Self-Acquired Assets",
            text: "Distinguish between tribal family clan holdings and self-acquired urban assets in Dimapur or Kohima, bank savings, vehicles, and shop ventures.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Incorporate Article 371A Compliant Clauses",
            text: "Draft legally sound clauses aligning with Article 371A safeguards, legal land transfer regulations, designated heirs, and executor appointments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page before two competent adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Submit at Deputy Commissioner Registry",
            text: "Present the signed Will at the Office of the Deputy Commissioner or Sub-Divisional Officer (Civil) in your district and remit nominal legal fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Obtain Book III Registration Endorsement",
            text: "Complete personal appearance and identity check with both witnesses to receive the official government Book III signing endorsement.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: NAGALAND_FAQS.map((item) => ({
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
        type="form/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <NagalandLocationClient faqs={NAGALAND_FAQS} />
      <Footer />
    </>
  );
}
