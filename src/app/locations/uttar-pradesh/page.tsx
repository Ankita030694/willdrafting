import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UttarPradeshLocationClient from "./UttarPradeshLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Uttar Pradesh: Online Will Registration",
  },
  description:
    "Draft a valid Will in Uttar Pradesh. Complete IGRSUP registration support, Section 108 UP Revenue Code agricultural succession, and lawyer drafting.",
  keywords: [
    "will drafting in uttar pradesh",
    "will registration up igrs",
    "section 108 up revenue code will",
    "up bhulekh mutation will",
    "succession lawyer noida lucknow",
    "igrsup online will registration",
    "allahabad high court probate exception",
    "noida authority will transfer",
    "lda lucknow plot will succession",
    "kda kanpur property will transfer",
    "gda ghaziabad flat will mutation",
    "agricultural land will uttar pradesh",
    "bhumidhari rights will bequest up",
    "ghaziabad sub registrar office will",
    "varanasi will registration advocate",
    "agra will lawyer estate planning",
    "prayagraj sro will registration",
    "meerut will drafting services",
    "bareilly sro will registration",
    "gorakhpur estate lawyer will",
    "section 31 registration act home visit up",
    "article 64 stamp duty will exemption up",
    "ama legal solutions uttar pradesh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/uttar-pradesh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/uttar-pradesh",
      "x-default": "https://www.willdrafting.in/locations/uttar-pradesh",
    },
  },
  openGraph: {
    title: "Will Drafting in Uttar Pradesh: Online Will Registration",
    description:
      "Draft a valid Will in Uttar Pradesh. Complete IGRSUP registration support, Section 108 UP Revenue Code agricultural succession, and lawyer drafting.",
    url: "https://www.willdrafting.in/locations/uttar-pradesh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-uttar-pradesh.jpg",
        width: 1200,
        height: 675,
        alt: "Online Will Drafting and IGRSUP Registration Services in Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Uttar Pradesh: Online Will Registration",
    description:
      "Draft a valid Will in Uttar Pradesh. Complete IGRSUP registration support, Section 108 UP Revenue Code agricultural succession, and lawyer drafting.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-uttar-pradesh.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const UP_FAQS = [
  {
    q: "Is Will registration mandatory in Uttar Pradesh?",
    a: "Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Uttar Pradesh. A Will written on plain white paper and attested by two independent witnesses is legally enforceable. However, registering your Will on the IGRSUP portal (igrsup.gov.in) provides government Book III verification. This prevents title disputes during revenue mutation before Tehsildars and local development authorities like Noida, LDA, and KDA.",
  },
  {
    q: "Is court probate required for properties in Uttar Pradesh?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in former presidency towns (Mumbai, Kolkata, and Chennai). The Allahabad High Court has repeatedly settled that probate is non-mandatory for Hindu, Sikh, Jain, Buddhist, and Muslim Wills in Uttar Pradesh. Legal heirs can directly apply for mutation without probate proceedings.",
  },
  {
    q: "How does Section 108 of the UP Revenue Code affect agricultural land Wills?",
    a: "Section 108 of the Uttar Pradesh Revenue Code, 2006 governs succession to agricultural land (Bhumidhari rights). If a landholder dies without a Will, agricultural land passes strictly according to the statutory order of male and female heirs defined in Section 108, superseding general personal laws. Executing a valid Will allows the Bhumidhar to bequeath agricultural land to chosen beneficiaries, subject to state land ceiling limits.",
  },
  {
    q: "How do I book an online Will registration slot on the IGRSUP portal?",
    a: "Visit the Stamps and Registration Department portal at igrsup.gov.in. Select the online registration module (संपत्ति पंजीकरण / विलेख पंजीकरण), enter testator and witness identification details, select your district Sub-Registrar Office (SRO), choose an available date and time slot, and download your appointment token receipt.",
  },
  {
    q: "What is the official stamp duty and registration fee for a Will in UP?",
    a: "Wills are completely exempt from stamp duty in Uttar Pradesh. You can print and execute your Will on standard A4 plain paper without buying judicial stamp paper. At the Sub-Registrar Office, a nominal Book III registration fee of ₹100 is charged, alongside approximately ₹100 for biometric user processing. There are zero percentage-based property taxes.",
  },
  {
    q: "How are development authority flats in Noida, Lucknow, and Kanpur transferred?",
    a: "Development authorities such as Noida, Greater Noida, YEIDA, LDA Lucknow, and KDA Kanpur require legal heirs to submit a copy of the Will, death certificate, affidavit, and indemnity bond. For leasehold properties, the authority endorses the transfer on the lease deed or executes a tripartite sub-lease transfer without requiring court probate.",
  },
  {
    q: "Can elderly or bedridden citizens in Uttar Pradesh register a Will from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home or hospital visit by a Sub-Registrar commissioner. A certificate from a registered MBBS doctor stating medical inability to travel is submitted with the application, and the official records biometrics on-site.",
  },
  {
    q: "How does a registered Will help in UP Bhulekh Khatauni mutation?",
    a: "After the death of an agricultural landholder, the beneficiary files an application for testamentary mutation under Section 34 or Section 35 of the UP Revenue Code, 2006 before the local Tehsildar court. A registered Will provides a statutory presumption of genuine execution, speeding up official orders to update the Khatauni land record on the UP Bhulekh portal (upbhulekh.gov.in).",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Uttar Pradesh properties?",
    a: "Yes. Many NRIs own properties in Noida, Greater Noida, Lucknow, and Ghaziabad. NRIs can draft an India-specific Will online through our platform. They can execute it abroad before two witnesses and get it notarized or apostilled through the Indian consulate, or register it at a UP Sub-Registrar Office during an India visit.",
  },
  {
    q: "Why is a doctor mental fitness certificate recommended for senior testators?",
    a: "While not statutory for the Will to be legally executed, a fitness certificate issued on the same day by a registered MBBS doctor certifies sound mind, memory, and testamentary capacity. This eliminates future legal challenges from disgruntled relatives alleging dementia, senility, coercion, or undue influence during civil litigation.",
  },
];

export default function UttarPradeshLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/uttar-pradesh";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-uttar-pradesh.jpg";

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
        name: "Will Drafting in Uttar Pradesh: Online Will Registration",
        description:
          "Draft a valid Will in Uttar Pradesh. Complete IGRSUP registration support, Section 108 UP Revenue Code agricultural succession, and lawyer drafting.",
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
          caption: "Online Will Drafting and IGRSUP Registration Services in Uttar Pradesh",
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
            name: "Uttar Pradesh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Uttar Pradesh - Legal Estate Planning & IGRSUP Registration",
        description:
          "Professional Will drafting, advocate verification, IGRSUP online registration, Section 108 UP Revenue Code agricultural succession, and Section 31 doorstep execution support across all 75 Uttar Pradesh districts.",
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
          { "@type": "State", name: "Uttar Pradesh" },
          { "@type": "City", name: "Lucknow" },
          { "@type": "City", name: "Noida" },
          { "@type": "City", name: "Greater Noida" },
          { "@type": "City", name: "Ghaziabad" },
          { "@type": "City", name: "Kanpur" },
          { "@type": "City", name: "Varanasi" },
          { "@type": "City", name: "Prayagraj" },
          { "@type": "City", name: "Agra" },
          { "@type": "City", name: "Meerut" },
          { "@type": "City", name: "Bareilly" },
          { "@type": "City", name: "Gorakhpur" },
          { "@type": "City", name: "Aligarh" },
          { "@type": "City", name: "Moradabad" },
          { "@type": "City", name: "Saharanpur" },
          { "@type": "City", name: "Ayodhya" },
          { "@type": "City", name: "Jhansi" },
          { "@type": "City", name: "Mathura" },
          { "@type": "City", name: "Firozabad" },
          { "@type": "City", name: "Muzaffarnagar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Uttar Pradesh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Uttar Pradesh Residents",
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
                name: "Complete UP Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Uttar Pradesh",
        description:
          "Five straightforward steps to draft a legally binding Will and register it before the Sub-Registrar in Uttar Pradesh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Assets and Designate Beneficiaries",
            text: "List your Uttar Pradesh assets including development authority flats (Noida, LDA, KDA), agricultural Bhumidhari farmland, urban houses, bank FDs, and demat shares. Appoint your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Mandatory Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior advocate to incorporate revocation, survivorship, specific bequests, and Section 108 UP Revenue Code compliance.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book SRO Slot on IGRSUP Portal",
            text: "Book an appointment token on the official UP Stamps and Registration Department portal (igrsup.gov.in) for your local Tehsil Sub-Registrar Office.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at SRO",
            text: "Visit the Sub-Registrar office with your two witnesses and original Aadhaar cards for biometric thumbprint scanning, live webcam photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: UP_FAQS.map((item) => ({
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
      <UttarPradeshLocationClient faqs={UP_FAQS} />
      <Footer />
    </>
  );
}
