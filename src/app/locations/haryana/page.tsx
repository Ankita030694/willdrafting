import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HaryanaLocationClient from "./HaryanaLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Haryana: Online Will Registration Guide",
  },
  description:
    "Draft a legally valid Will in Haryana. Complete Jamabandi portal token booking, HSVP plot succession rules, and dispute-free family estate planning in HR.",
  keywords: [
    "will drafting in haryana",
    "will registration jamabandi haryana",
    "hsvp plot will succession",
    "builder floor will transfer haryana",
    "estate lawyer gurgaon",
    "punjab haryana high court probate",
    "jamabandi token booking haryana",
    "online will maker panchkula",
    "will lawyer faridabad",
    "tehsil will registration haryana",
    "section 31 registration act home visit haryana",
    "independent builder floor will gurugram",
    "agricultural land will jamabandi mutation",
    "doctor fitness certificate will haryana",
    "ama legal solutions haryana will drafting",
    "probate non mandatory haryana",
    "will registration fees haryana",
    "will drafting services in panchkula",
    "will drafting services in rohtak",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/haryana",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/haryana",
      "x-default": "https://www.willdrafting.in/locations/haryana",
    },
  },
  openGraph: {
    title: "Will Drafting in Haryana: Online Will Registration Guide",
    description:
      "Draft a legally valid Will in Haryana. Complete Jamabandi portal token booking, HSVP plot succession rules, and dispute-free family estate planning in HR.",
    url: "https://www.willdrafting.in/locations/haryana",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-haryana.jpg",
        width: 1200,
        height: 675,
        alt: "Online Will Drafting and SRO Registration Services in Haryana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Haryana: Online Will Registration Guide",
    description:
      "Draft a legally valid Will in Haryana. Complete Jamabandi portal token booking, HSVP plot succession rules, and dispute-free family estate planning in HR.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-haryana.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const HARYANA_FAQS = [
  {
    q: "Is probate mandatory for a Will in Haryana?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historic presidency towns of Mumbai, Kolkata, and Chennai. Haryana is a non-presidency territory under the jurisdiction of the Punjab and Haryana High Court. The High Court has consistently held that court probate is strictly optional for Hindu, Sikh, Jain, and Buddhist Wills in Haryana. A registered Will serves as conclusive testamentary proof for property transfer without requiring a court probate order.",
  },
  {
    q: "How does HSVP transfer a plot or builder floor based on a Will?",
    a: "Haryana Shehri Vikas Pradhikaran (HSVP, formerly HUDA) processes property mutation upon submitting a certified copy of the registered Will, original death certificate, legal heir affidavit, and an indemnity bond. HSVP issues a public notice in local newspapers inviting objections within 30 days. If no objections are raised, the Estate Officer issues a fresh re-allotment letter in favor of the designated beneficiary.",
  },
  {
    q: "What is the official stamp duty and registration fee for a Will in Haryana?",
    a: "Wills are completely exempt from stamp duty across Haryana under the Haryana Stamp Rules. You can execute your Will on standard white A4 paper. At Tehsil and Sub-Registrar Offices, you only pay a nominal registration fee of ₹100 to ₹200 along with standard computer scanning and service charges. There are zero percentage-based or ad-valorem stamp duties payable on Wills.",
  },
  {
    q: "How do I book an online appointment for Will registration in Haryana?",
    a: "Will registration appointments are scheduled through the Haryana Land Records portal at jamabandi.nic.in. Testators select their revenue district and Tehsil, complete deed registration token booking, enter personal and witness details, and download the appointment receipt with a dedicated date and time slot for physical appearance.",
  },
  {
    q: "Can senior citizens in Haryana register a Will from home or hospital?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically frail testators can request a home or hospital commission visit by the Sub-Registrar or Joint Sub-Registrar. A fitness certificate from a registered MBBS doctor stating medical inability to travel is attached with the application, and the registry officer completes biometric verification on-site.",
  },
  {
    q: "How should independent builder floors in Gurugram and Faridabad be bequeathed?",
    a: "Independent builder floors under Haryana's stilt plus 4 floors policy require precise drafting. The Will must distinctly demarcate the specific floor number, proportionate undivided share (UDS) in the land, reserved stilt parking bays, and common access rights to the terrace and overhead water tanks to avoid future partition disputes between co-owners.",
  },
  {
    q: "How is agricultural land in Haryana transferred after the testator passes away?",
    a: "For agricultural land, the beneficiary submits an application for mutation (Intiqal) along with a certified copy of the registered Will and death certificate to the local Halqa Patwari. The Patwari enters the mutation in the revenue records, and the Tehsildar approves it in an open Jalsa/court session to update the Jamabandi record of rights.",
  },
  {
    q: "Why is a doctor medical fitness certificate essential for senior testators?",
    a: "While not statutory for the Will to be valid, a medical fitness certificate issued on the execution day by a registered MBBS physician certifies sound mind, memory, and understanding. This provides solid legal defense against disgruntled relatives alleging lack of testamentary capacity, dementia, or undue influence during future civil litigation.",
  },
];

export default function HaryanaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/haryana";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-haryana.jpg";

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
        name: "Will Drafting in Haryana: Online Will Registration Guide",
        description:
          "Draft a legally valid Will in Haryana. Complete Jamabandi portal token booking, HSVP plot succession rules, and dispute-free family estate planning in HR.",
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
          caption: "Online Will Drafting and SRO Registration Services in Haryana",
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
            name: "Haryana",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Haryana - Legal Estate Planning & Jamabandi Registration",
        description:
          "Professional Will drafting, advocate verification, Jamabandi Haryana e-token registration, and Section 31 doorstep execution support across Gurugram, Faridabad, Panchkula, Panipat, Karnal, and all Haryana districts.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "State", name: "Haryana" },
          { "@type": "City", name: "Gurugram" },
          { "@type": "City", name: "Faridabad" },
          { "@type": "City", name: "Panchkula" },
          { "@type": "City", name: "Panipat" },
          { "@type": "City", name: "Ambala" },
          { "@type": "City", name: "Karnal" },
          { "@type": "City", name: "Rohtak" },
          { "@type": "City", name: "Hisar" },
          { "@type": "City", name: "Sonipat" },
          { "@type": "City", name: "Yamunanagar" },
          { "@type": "City", name: "Sirsa" },
          { "@type": "City", name: "Bhiwani" },
          { "@type": "City", name: "Bahadurgarh" },
          { "@type": "City", name: "Jind" },
          { "@type": "City", name: "Thanesar" },
          { "@type": "City", name: "Kaithal" },
          { "@type": "City", name: "Rewari" },
          { "@type": "City", name: "Palwal" },
          { "@type": "City", name: "Hansi" },
          { "@type": "City", name: "Narnaul" },
          { "@type": "City", name: "Fatehabad" },
          { "@type": "City", name: "Charkhi Dadri" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Haryana Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Haryana Residents",
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
                name: "Complete Haryana Tehsil Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Haryana",
        description:
          "Five clear steps to create a legally binding Will and register it before the Tehsil Sub-Registrar in Haryana.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Assets and Designate Beneficiaries",
            text: "List your Haryana assets including HSVP plots, builder floors, condominium flats, agricultural Jamabandi land, bank deposits, and shares. Designate primary beneficiaries and an alternate executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Mandatory Legal Clauses",
            text: "Draft your Will using our legal platform or consult our senior advocate to include revocation clauses, specific bequests, terrace and parking allocations, and executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Token on Jamabandi Haryana Portal",
            text: "Book an appointment on the official Jamabandi portal (jamabandi.nic.in) for your local Tehsil or Sub-Tehsil office and pay the nominal government fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Tehsil",
            text: "Visit the Tehsil Sub-Registrar office with your two witnesses and original Aadhaar cards for biometric thumbprint scanning, photograph capture, and Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: HARYANA_FAQS.map((item) => ({
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
      <HaryanaLocationClient faqs={HARYANA_FAQS} />
      <Footer />
    </>
  );
}
