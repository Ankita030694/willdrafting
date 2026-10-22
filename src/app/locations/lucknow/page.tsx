import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LucknowLocationClient from "./LucknowLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Lucknow: Online Will Registration Help",
  },
  description:
    "Secure family wealth in Lucknow. Professional Will drafting, UP IGRS registration guidance, and legal property succession advice by senior lawyers.",
  keywords: [
    "will drafting in lucknow",
    "will registration up igrs",
    "lda property will transfer lucknow",
    "lawyer for will lucknow",
    "property inheritance up",
    "will drafting gomti nagar",
    "will drafting aliganj lucknow",
    "will drafting hazratganj",
    "will drafting indira nagar",
    "will drafting mahanagar",
    "will drafting jankipuram",
    "will drafting ashiyana",
    "will drafting sushant golf city",
    "will drafting vrindavan yojna",
    "will drafting chowk lucknow",
    "up revenue code 2006 agricultural land will",
    "igrsup lucknow appointment booking",
    "sub registrar kaisarbagh lucknow",
    "sub registrar mohanlalganj",
    "sub registrar bakshi ka talab",
    "is probate mandatory in lucknow",
    "allahabad high court probate exemption uttar pradesh",
    "section 31 registration act home visit lucknow",
    "will registration fees in uttar pradesh",
    "doctor medical certificate will lucknow",
    "ama legal solutions lucknow will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/lucknow",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/lucknow",
      "x-default": "https://www.willdrafting.in/locations/lucknow",
    },
  },
  openGraph: {
    title: "Will Drafting in Lucknow: Online Will Registration Help",
    description:
      "Secure family wealth in Lucknow. Professional Will drafting, UP IGRS registration guidance, and legal property succession advice by senior lawyers.",
    url: "https://www.willdrafting.in/locations/lucknow",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-lucknow-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Lucknow Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Lucknow: Online Will Registration Help",
    description:
      "Secure family wealth in Lucknow. Professional Will drafting, UP IGRS registration guidance, and legal property succession advice by senior lawyers.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-lucknow-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const LUCKNOW_FAQS = [
  {
    q: "Is Will registration mandatory in Lucknow and Uttar Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. A Will written on plain white paper and executed before two witnesses is legally valid. However, for Lucknow Development Authority (LDA) properties, Awas Vikas flats, and ancestral agricultural land, official registration on IGRSUP is strongly recommended to ensure smooth municipal mutation and prevent family title disputes.",
  },
  {
    q: "Why is a registered Will crucial for LDA property mutation in Lucknow?",
    a: "The Lucknow Development Authority (LDA) at Pradhikaran Bhawan in Gomti Nagar requires clear proof of succession to transfer plots and flats. With an unregistered Will, the LDA often mandates newspaper public advertisements, a 30-day objection period, and heavy indemnity bonds. A registered Will drastically accelerates estate mutation, allowing direct transfer without protracted legal delays.",
  },
  {
    q: "Can agricultural land in Lucknow be bequeathed through a Will under UP Revenue Code 2006?",
    a: "Yes. Under Section 107 of the Uttar Pradesh Revenue Code, 2006, a Bhumidhar with transferable rights can bequeath their landholding through a Will. However, this power is subject to specific statutory restrictions, such as protecting the rights of Scheduled Castes and ensuring the bequest does not violate statutory female succession mandates. Tehsil mutation is recorded in the Khatauni via the UP Bhulekh portal.",
  },
  {
    q: "Is court probate required for a Will in Lucknow or Uttar Pradesh?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only for properties situated in the historical presidency towns of Mumbai, Kolkata, and Chennai. The Hon'ble Allahabad High Court has consistently held that probate is strictly optional in Uttar Pradesh. LDA, Awas Vikas, municipal bodies, and nationalized banks in Lucknow recognize a registered Will directly.",
  },
  {
    q: "What is the official government fee to register a Will in Lucknow on IGRSUP?",
    a: "Wills are completely exempt from stamp duty across Uttar Pradesh under Article 64 of Schedule I-B of the Indian Stamp Act, 1899. On the UP IGRSUP portal (igrsup.gov.in), you pay only a flat government registration fee of ₹100, plus an official document scanning fee of ₹100 to ₹200. There are no percentage-based property charges for registering a Will.",
  },
  {
    q: "How do I book an online appointment for Will registration in Lucknow on igrsup.gov.in?",
    a: "Visit the UP Registration and Stamps Department portal at igrsup.gov.in. Navigate to the online document registration section, select Lucknow district and your respective Sub-Registrar Office (such as Kaisarbagh, Vikas Nagar, Mohanlalganj, or Bakshi Ka Talab). Upload the testator and witness details, pay the ₹100 fee online, and generate an e-appointment token with a designated date and time slot.",
  },
  {
    q: "Can a Lucknow Sub-Registrar visit an elderly or bedridden testator at home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically incapacitated testators can request a home or hospital visit by the Sub-Registrar in Lucknow. You must submit an application accompanied by an MBBS doctor's fitness certificate and pay the prescribed government inspection travel fees. Our Lucknow team coordinates complete doorstep execution.",
  },
  {
    q: "Do I need an MBBS doctor's medical fitness certificate for Will registration in Lucknow?",
    a: "While not statutory for young testators, an MBBS medical certificate is strongly recommended for seniors aged 60 and above. The medical practitioner certifies that the testator is of sound disposing mind and capable of understanding the consequences of their testamentary dispositions. This certificate forms an invaluable safeguard against future court challenges citing cognitive infirmity.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their Lucknow properties?",
    a: "Yes. NRIs residing in the UAE, USA, UK, Canada, or elsewhere who own ancestral or newly acquired properties in Lucknow can draft a legally valid Will online. They can execute it abroad before two independent witnesses, or complete formal SRO registration during a visit to Lucknow, or appoint a trusted legal executor to oversee LDA and Tehsil mutations.",
  },
];

export default function LucknowLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/lucknow";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-lucknow-og.jpg";

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
        name: "Will Drafting in Lucknow: Online Will Registration Help",
        description:
          "Secure family wealth in Lucknow. Professional Will drafting, UP IGRS registration guidance, and legal property succession advice by senior lawyers.",
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
          caption: "Will Drafting & Registration Services in Lucknow Uttar Pradesh",
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
            name: "Lucknow",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Lucknow - Estate Planning & SRO Registration",
        description:
          "Expert Will drafting, advocate verification, LDA property mutation guidance, and Sub-Registrar Office e-registration support across Lucknow district.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Lucknow" },
          { "@type": "Place", name: "Gomti Nagar" },
          { "@type": "Place", name: "Gomti Nagar Extension" },
          { "@type": "Place", name: "Hazratganj" },
          { "@type": "Place", name: "Aliganj" },
          { "@type": "Place", name: "Indira Nagar" },
          { "@type": "Place", name: "Mahanagar" },
          { "@type": "Place", name: "Jankipuram" },
          { "@type": "Place", name: "Ashiyana" },
          { "@type": "Place", name: "Sushant Golf City" },
          { "@type": "Place", name: "Vrindavan Yojna" },
          { "@type": "Place", name: "Rajajipuram" },
          { "@type": "Place", name: "Alambagh" },
          { "@type": "Place", name: "Chowk" },
          { "@type": "Place", name: "Aminabad" },
          { "@type": "Place", name: "Mohanlalganj" },
          { "@type": "Place", name: "Bakshi Ka Talab" },
          { "@type": "Place", name: "Malihabad" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Lucknow Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Lucknow Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & LDA Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Lucknow SRO Registration & Section 31 Doorstep Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Lucknow",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Lucknow.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Assets and Beneficiaries",
            text: "Compile details of all LDA plots, Awas Vikas flats, bank accounts, agricultural land under UP Revenue Code, and jewellery. Identify beneficiaries and name an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Clauses",
            text: "Draft your Will using our online legal platform or with our senior advocate to include proper revocation, residuary, and LDA mutation clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book IGRSUP Slot Online",
            text: "Book an e-appointment on the UP IGRSUP portal (igrsup.gov.in) for your local Lucknow Sub-Registrar Office and pay the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar office in Lucknow with two witnesses and original Aadhaar cards for biometric thumbprints, digital photograph, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: LUCKNOW_FAQS.map((item) => ({
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
      <LucknowLocationClient faqs={LUCKNOW_FAQS} />
      <Footer />
    </>
  );
}
