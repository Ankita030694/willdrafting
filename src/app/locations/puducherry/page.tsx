import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PuducherryLocationClient from "./PuducherryLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Puducherry: Online Will Making Guide",
  },
  description:
    "Draft a legally binding Will in Puducherry. Guidance on French Civil Code Renonçants rules, Indian Succession Act, and Sub-Registrar registration in PY.",
  keywords: [
    "will drafting in puducherry",
    "will registration pondicherry sro",
    "french civil code succession renonçants puducherry",
    "madras high court jurisdiction",
    "online will",
    "will drafting pondicherry",
    "oulgaret sub registrar office will",
    "french renonçants reserve hereditaire",
    "will drafting white town puducherry",
    "will drafting lawspet",
    "will drafting villianur",
    "will drafting bahour",
    "will drafting karaikal",
    "will drafting mahe",
    "will drafting yanam",
    "puducherry municipality property tax will transfer",
    "section 31 registration act home visit puducherry",
    "is probate mandatory in puducherry",
    "nilamagal puducherry patta will mutation",
    "ama legal solutions puducherry will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/puducherry",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/puducherry",
      "x-default": "https://www.willdrafting.in/locations/puducherry",
    },
  },
  openGraph: {
    title: "Will Drafting in Puducherry: Online Will Making Guide",
    description:
      "Draft a legally binding Will in Puducherry. Guidance on French Civil Code Renonçants rules, Indian Succession Act, and Sub-Registrar registration in PY.",
    url: "https://www.willdrafting.in/locations/puducherry",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-puducherry-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Estate Planning in Puducherry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Puducherry: Online Will Making Guide",
    description:
      "Draft a legally binding Will in Puducherry. Guidance on French Civil Code Renonçants rules, Indian Succession Act, and Sub-Registrar registration in PY.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-puducherry-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const PUDUCHERRY_FAQS = [
  {
    q: "Is Will registration mandatory in Puducherry?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across the Union Territory of Puducherry. A Will written on plain paper is valid if signed before two independent witnesses. However, registering your Will at a Puducherry or Oulgaret Sub-Registrar Office places it in permanent Book III custody. This eliminates forgery allegations and facilitates swift municipal property tax mutation.",
  },
  {
    q: "How does the French Civil Code apply to Renonçants in Puducherry?",
    a: "Under the French Decrees of 1881 and 1884 ratified by the 1956 Treaty of Cession, Puducherry residents who renounced local personal laws remain governed by the French Civil Code. Renonçants cannot freely disinherit direct descendants due to forced heirship rules. Conversely, non-renonçants follow the Indian Succession Act or Hindu Succession Act with absolute testamentary freedom over self-acquired assets.",
  },
  {
    q: "What is the reserve hereditary portion under French law in Puducherry?",
    a: "Under Articles 913 to 930 of the French Civil Code, a Renonçant testator must reserve a statutory fraction (réserve héréditaire) for children. If you have one child, one-half is reserved and one-half is disposable. With two children, two-thirds is reserved. For three or more children, three-fourths is protected. Any bequest exceeding the disposable quota (quotité disponible) can be challenged by lawful heirs.",
  },
  {
    q: "Is court probate compulsory in Puducherry under Madras High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Chennai, Mumbai, and Kolkata. Although the Madras High Court holds appellate jurisdiction over Puducherry, Puducherry lies outside its Ordinary Original Civil Jurisdiction. Therefore, probate is strictly optional for properties situated in Puducherry, Karaikal, Mahe, and Yanam.",
  },
  {
    q: "What are the official government fees to register a Will in Puducherry?",
    a: "Wills are completely exempt from stamp duty across the Union Territory of Puducherry. At Puducherry Sub-Registrar offices, testators only pay a nominal registration fee of approximately ₹100 to ₹200 along with user computerisation and scanning charges. There are no percentage-based property market value charges.",
  },
  {
    q: "Can senior citizens in Puducherry register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly individuals or residents with medical mobility constraints can request a home visit. Upon submitting a fitness certificate from a registered medical practitioner, the Sub-Registrar visits your residence in White Town, Lawspet, or surrounding areas with portable biometric equipment to complete registration.",
  },
  {
    q: "How does a registered Will help in Puducherry municipal property tax mutation?",
    a: "Puducherry and Oulgaret Municipalities require verified documentary evidence before updating property tax records after an owner passes away. A registered Will registered in Book III provides definitive proof of title transfer. It removes the necessity of obtaining expensive civil court succession certificates or disputed family consent affidavits.",
  },
  {
    q: "How are properties in Karaikal, Mahe, and Yanam handled in a Puducherry Will?",
    a: "A single comprehensive Will drafted under Indian law can bequeath properties across all four enclaves of the Union Territory of Puducherry, as well as assets across any Indian state. The Will can be registered at the Sub-Registrar Office where the testator resides, or where any part of the immovable property is situated.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Puducherry Sub-Registrar offices?",
    a: "Any two adults of sound mind who possess valid government photo IDs such as Aadhaar or voter identity cards can act as attesting witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries or the spouse of a beneficiary receiving any bequest under the Will.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Puducherry properties?",
    a: "Yes. Many French citizens of Puducherry origin and NRIs residing in France, Europe, or the Gulf hold ancestral and self-acquired properties in Puducherry. NRIs can draft a tailored Will online, execute it before two witnesses abroad with Indian consular notarization, or register it before a Puducherry Sub-Registrar during a visit to India.",
  },
];

export default function PuducherryLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/puducherry";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-puducherry.jpg";

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
        name: "Will Drafting in Puducherry: Online Will Making Guide",
        description:
          "Draft a legally binding Will in Puducherry. Guidance on French Civil Code Renonçants rules, Indian Succession Act, and Sub-Registrar registration in PY.",
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
          caption: "Legal Will Drafting and Estate Planning in Puducherry",
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
            name: "Puducherry",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Puducherry - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, French Civil Code and Indian Succession Act consultation, and SRO registration support across Puducherry, Oulgaret, Karaikal, Mahe, and Yanam.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Puducherry",
          addressRegion: "Puducherry",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Puducherry" },
          { "@type": "City", name: "White Town" },
          { "@type": "City", name: "Oulgaret" },
          { "@type": "City", name: "Lawspet" },
          { "@type": "City", name: "Reddiarpalayam" },
          { "@type": "City", name: "Muthialpet" },
          { "@type": "City", name: "Villianur" },
          { "@type": "City", name: "Ariyankuppam" },
          { "@type": "City", name: "Bahour" },
          { "@type": "City", name: "Karaikal" },
          { "@type": "City", name: "Thirunallar" },
          { "@type": "City", name: "Mahe" },
          { "@type": "City", name: "Yanam" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Puducherry Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Puducherry Residents",
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
                name: "Complete Puducherry Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Puducherry",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Puducherry.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Identify Succession Regime and Compile Assets",
            text: "Determine whether the testator is governed by the French Civil Code (Renonçant) or the Indian Succession Act. Compile all immovable properties in White Town, Oulgaret, Karaikal, or agricultural tracts.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Statutory Bequest Clauses",
            text: "Draft legal clauses ensuring adherence to disposable quotas (quotité disponible) under French law or full testamentary discretion under the Indian Succession Act, including executor appointments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain white A4 paper. The testator and two independent non-beneficiary witnesses sign each page in each other's physical presence.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar Office Appointment",
            text: "Book an appointment slot at the relevant Sub-Registrar Office in Puducherry, Oulgaret, Villianur, Bahour, Karaikal, Mahe, or Yanam and pay nominal official registration fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at the Sub-Registrar Office",
            text: "Attend the SRO with both attesting witnesses. Complete verbal verification, digital photograph capture, and thumbprint impression to secure permanent Book III government registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: PUDUCHERRY_FAQS.map((item) => ({
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
      <PuducherryLocationClient faqs={PUDUCHERRY_FAQS} />
      <Footer />
    </>
  );
}
