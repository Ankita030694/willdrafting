import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AhmedabadLocationClient from "./AhmedabadLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Ahmedabad: Online Will & Asset Guide",
  },
  description:
    "Create a legally valid Will in Ahmedabad. Comprehensive HUF planning, Gujarat Sub-Registrar registration, and business asset succession guidance.",
  keywords: [
    "will drafting in ahmedabad",
    "will registration gujarat sub registrar",
    "huf partition will ahmedabad",
    "business succession planning gujarat",
    "legal will draft ahmedabad",
    "garvi gujarat will registration",
    "sub registrar office ahmedabad appointment",
    "online will maker ahmedabad",
    "will lawyer ahmedabad",
    "estate planning advocate ahmedabad",
    "probate required in ahmedabad",
    "amc property mutation through will",
    "auda property transfer will ahmedabad",
    "gidc industrial plot succession will",
    "section 31 registration act home visit ahmedabad",
    "will registration fees in gujarat",
    "doctor medical certificate will ahmedabad",
    "ama legal solutions ahmedabad will drafting",
    "gujarat high court will succession rules",
    "nri will drafting ahmedabad gandhinagar",
    "will drafting in navrangpura",
    "will drafting in bodakdev",
    "will drafting in satellite",
    "will drafting in vastrapur",
    "will drafting in bopal",
    "will drafting in sindhu bhavan road",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/ahmedabad",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/ahmedabad",
      "x-default": "https://www.willdrafting.in/locations/ahmedabad",
    },
  },
  openGraph: {
    title: "Will Drafting in Ahmedabad: Online Will & Asset Guide",
    description:
      "Create a legally valid Will in Ahmedabad. Comprehensive HUF planning, Gujarat Sub-Registrar registration, and business asset succession guidance.",
    url: "https://www.willdrafting.in/locations/ahmedabad",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-ahmedabad-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Business Succession in Ahmedabad Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Ahmedabad: Online Will & Asset Guide",
    description:
      "Create a legally valid Will in Ahmedabad. Comprehensive HUF planning, Gujarat Sub-Registrar registration, and business asset succession guidance.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-ahmedabad-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const AHMEDABAD_FAQS = [
  {
    q: "Is Will registration mandatory in Ahmedabad and Gujarat?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Gujarat. An unregistered Will signed before two independent witnesses is legally valid. However, registering your Will at the local Sub-Registrar Office via the Garvi Gujarat portal provides irrefutable government record. It prevents family property disputes and speeds up municipal property tax mutation with AMC and AUDA.",
  },
  {
    q: "Is court probate required for a Will in Ahmedabad?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Ahmedabad is a non-presidency jurisdiction. The Gujarat High Court has repeatedly held that obtaining court probate or letters of administration is not compulsory to establish testamentary rights in Gujarat.",
  },
  {
    q: "How does an HUF (Hindu Undivided Family) property get handled in an Ahmedabad Will?",
    a: "Under Mitakshara Hindu law prevailing in Gujarat, ancestral HUF coparcenary assets belong collectively to all coparceners. A Karta cannot bequeath the entire HUF property through a personal Will. However, under Section 30 of the Hindu Succession Act, 1956, a testator can validly bequeath their individual undivided coparcenary interest alongside their self-acquired assets.",
  },
  {
    q: "What is the official government fee to register a Will in Gujarat?",
    a: "Wills are completely exempt from stamp duty across Gujarat under the Gujarat Stamp Act, 1958. At the Ahmedabad Sub-Registrar offices, testators only pay a flat nominal registration fee of ₹100, plus official computer processing and scanning charges of approximately ₹100 to ₹200. There are zero ad-valorem or property-value taxes.",
  },
  {
    q: "How does the Garvi Gujarat portal appointment system work?",
    a: "Registration appointments are scheduled online through the official Garvi Gujarat portal (garvi.gujarat.gov.in). You enter testator, witness, and property details, upload document drafts, pay the ₹100 registration fee online, and generate an appointment receipt with a time slot for the selected Ahmedabad or Gandhinagar Sub-Registrar office.",
  },
  {
    q: "Can an Ahmedabad Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically fragile citizens can request a home or hospital visit by the Sub-Registrar. You must submit an MBBS doctor medical fitness certificate and pay the official government commission. Our Ahmedabad team handles the entire application and doorstep coordination.",
  },
  {
    q: "Can family business assets and GIDC industrial plots be bequeathed in a Will?",
    a: "Yes. Testators can bequeath shares in private limited companies, capital accounts in partnership firms, commercial shops, and leasehold rights in Gujarat Industrial Development Corporation (GIDC) industrial plots across Vatva, Naroda, and Odhav. The Will should clearly name successor partners or directors to prevent corporate disruption.",
  },
  {
    q: "How does a registered Will help in mutating property with AMC, AUDA, or AnyROR (e-Dhara)?",
    a: "A registered Will provides conclusive testamentary evidence for title mutation before the Ahmedabad Municipal Corporation (AMC), Ahmedabad Urban Development Authority (AUDA), and village revenue records (AnyROR 7/12 extract). It avoids costly legal heir disputes and eliminates the need for expensive civil court succession certificates.",
  },
  {
    q: "Do I need a doctor's certificate to execute a Will in Ahmedabad?",
    a: "While not compulsory for young adults, obtaining a fitness certificate from an MBBS practitioner is strongly recommended for seniors aged 60 and above. The medical certificate confirms testamentary capacity and sound mental alertness. This safeguards your Will against allegations of dementia, undue influence, or fraud.",
  },
  {
    q: "Can Non-Resident Gujaratis (NRGs / NRIs) draft a Will for Ahmedabad and Gandhinagar properties?",
    a: "Yes. Non-resident Gujaratis owning apartments, villas, commercial showrooms, or bank deposits in Ahmedabad, Gandhinagar, or GIFT City can draft a Will online. NRGs can sign before two witnesses and notarize or apostille the Will through an Indian Embassy, or execute and register it in person during an India visit.",
  },
];

export default function AhmedabadLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/ahmedabad";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-ahmedabad-og.jpg";

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
        name: "Will Drafting in Ahmedabad: Online Will & Asset Guide",
        description:
          "Create a legally valid Will in Ahmedabad. Full HUF planning, Gujarat SRO filing, and business asset estate guidance.",
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
          caption: "Legal Will Drafting & Business Succession in Ahmedabad Gujarat",
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
            name: "Ahmedabad",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Ahmedabad - Estate Planning, HUF & SRO Registration",
        description:
          "Professional Will drafting, HUF estate structuring, and SRO office e-filing support across Ahmedabad and Gandhinagar revenue.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ahmedabad" },
          { "@type": "City", name: "Gandhinagar" },
          { "@type": "City", name: "Navrangpura" },
          { "@type": "City", name: "Bodakdev" },
          { "@type": "City", name: "Satellite" },
          { "@type": "City", name: "Vastrapur" },
          { "@type": "City", name: "Bopal" },
          { "@type": "City", name: "South Bopal" },
          { "@type": "City", name: "Sindhu Bhavan Road" },
          { "@type": "City", name: "SG Highway" },
          { "@type": "City", name: "Maninagar" },
          { "@type": "City", name: "Kankaria" },
          { "@type": "City", name: "Chandkheda" },
          { "@type": "City", name: "Motera" },
          { "@type": "City", name: "Sabarmati" },
          { "@type": "City", name: "Paldi" },
          { "@type": "City", name: "Ellisbridge" },
          { "@type": "City", name: "Sanand" },
          { "@type": "City", name: "GIFT City" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ahmedabad Will Drafting & Business Succession Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Ahmedabad Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "HUF Succession & Senior Advocate Will Consultation",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Garvi Gujarat SRO Will Registration & Doorstep Execution",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Ahmedabad Gujarat",
        description:
          "Five clear steps to create a legally binding Will, allocate HUF and business assets, and register before the Gujarat SRO.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Inventory Personal, HUF, and Business Assets",
            text: "List your Ahmedabad assets including AMC flats, bungalows, GIDC plant plots, partnership capital, and demat accounts. Clearly separate single assets from joint HUF joint assets.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Will with Estate Advocates",
            text: "Draft your Will using our online legal platform or with our senior estate lawyers. Incorporate specific bequest clauses, business estate pathways, executor appointments, and survivorship conditions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the physical presence of two independent adult witnesses who are not heirs under the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book SRO Slot on Garvi Gujarat Portal",
            text: "Book an e-appointment on the Garvi Gujarat portal (garvi.gujarat.gov.in) for your local Ahmedabad or Gandhinagar SRO office and pay the nominal ₹100 filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the SRO office with your two witnesses and original photo IDs for biometric fingerprinting, digital photo capture, and official Book III filing entry.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: AHMEDABAD_FAQS.map((item) => ({
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
      <AhmedabadLocationClient faqs={AHMEDABAD_FAQS} />
      <Footer />
    </>
  );
}
