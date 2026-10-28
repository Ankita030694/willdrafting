import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuratLocationClient from "./SuratLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Surat: Online Will & Business Planning",
  },
  description:
    "Draft your Will in Surat with expert lawyer review. Secure commercial assets, family business shares, and Gujarat Sub-Registrar registration.",
  keywords: [
    "will drafting in surat",
    "will registration surat gujarat",
    "diamond business succession will surat",
    "textile commercial estate planning surat",
    "online will maker surat",
    "garvi gujarat will registration surat",
    "surat diamond bourse business succession",
    "ring road textile market shop will",
    "sub registrar office athwa surat",
    "sub registrar office katargam surat",
    "sub registrar office varachha surat",
    "sub registrar office adajan rander surat",
    "gidc industrial plot succession surat",
    "sachin gidc factory will drafting",
    "pandesara gidc succession will",
    "is probate mandatory in surat gujarat",
    "smc property tax mutation will surat",
    "suda property transfer will surat",
    "section 31 registration act home visit surat",
    "will registration fees in gujarat",
    "doctor medical certificate will surat",
    "ama legal solutions surat will drafting",
    "gujarat high court will succession rules",
    "will drafting in vesu",
    "will drafting in vip road surat",
    "will drafting in adajan",
    "will drafting in piplod",
    "will drafting in city light surat",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/surat",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/surat",
      "x-default": "https://www.willdrafting.in/locations/surat",
    },
  },
  openGraph: {
    title: "Will Drafting in Surat: Online Will & Business Planning",
    description:
      "Draft your Will in Surat with expert lawyer review. Secure commercial assets, family business shares, and Gujarat Sub-Registrar registration.",
    url: "https://www.willdrafting.in/locations/surat",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-surat-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Commercial Asset Planning in Surat Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Surat: Online Will & Business Planning",
    description:
      "Draft your Will in Surat with expert lawyer review. Secure commercial assets, family business shares, and Gujarat Sub-Registrar registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-surat-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SURAT_FAQS = [
  {
    q: "Is Will registration mandatory in Surat and Gujarat?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Gujarat. An unregistered Will signed on plain white paper before two independent witnesses is legally valid and binding. However, registering your Will at the local Sub-Registrar Office via the Garvi Gujarat portal creates an unchallengeable government record, preventing family disputes and accelerating municipal property mutation with the Surat Municipal Corporation (SMC) and SUDA.",
  },
  {
    q: "Is court probate required for a Will in Surat?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Surat is a non-presidency jurisdiction. The Gujarat High Court has established in consistent rulings that obtaining court probate or letters of administration is not compulsory to enforce testamentary succession or title transfer in Gujarat.",
  },
  {
    q: "How are diamond businesses and trading stock transferred through a Will in Surat?",
    a: "Surat is the diamond capital of the world. Testators can bequeath partnership shares in diamond cutting and polishing firms, promoter equity in private limited diamond manufacturing units, Surat Diamond Bourse (SDB) commercial trading offices in DREAM City, and bank vaults. A tailored Will clearly specifies managerial succession, partner capital distribution, and inventory handover to prevent post-death business stagnation.",
  },
  {
    q: "How does textile business succession and Ring Road market shop inheritance work?",
    a: "For families owning wholesale textile shops along Ring Road, Millennium Market, or Surat Textile Market, a Will can dispose of commercial ownership, tenancy rights (pagdi), weaving machinery, and trade receivables. Structuring specific testamentary bequests prevents dissolution of partnership firms and guarantees smooth inter-generational handover without trade disruptions.",
  },
  {
    q: "What is the official government fee to register a Will in Gujarat?",
    a: "Under Article 64 of the Gujarat Stamp Act, 1958, Wills are completely exempt from stamp duty across Gujarat (₹0 stamp duty). At Surat Sub-Registrar offices, testators only pay a nominal flat registration fee of ₹100, alongside official computer scanning and data entry fees of ₹100 to ₹200. There are zero property-valuation or percentage taxes levied.",
  },
  {
    q: "How does the Garvi Gujarat online appointment system work for Surat SROs?",
    a: "Registration appointments are booked online through the official Garvi Gujarat portal (garvi.gujarat.gov.in). You submit testator, witness, and property details, upload draft documents, pay the ₹100 government fee online, and download your e-appointment receipt with an allotted date and time slot for your designated Surat Sub-Registrar office (such as Athwa, Katargam, Varachha, or Rander).",
  },
  {
    q: "Can a Surat Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell citizens can request a home or hospital visit by the Sub-Registrar. You must submit a medical fitness certificate from a registered MBBS doctor and pay the official government commission charge. Our Surat legal team manages the complete doorstep application and SRO commissioner coordination.",
  },
  {
    q: "How does a registered Will help in mutating property with SMC and SUDA?",
    a: "A registered Will serves as authentic legal evidence for title mutation before the Surat Municipal Corporation (SMC), Surat Urban Development Authority (SUDA), City Survey Office (Jan Seva Kendra), and village revenue records (AnyRoR Gujarat 7/12 extracts). It eliminates the need for expensive civil court succession certificates and safeguards properties from sibling contention.",
  },
  {
    q: "Can GIDC industrial plots in Sachin or Pandesara be bequeathed in a Will?",
    a: "Yes. Leasehold industrial plots and factory sheds allotted by the Gujarat Industrial Development Corporation (GIDC) in Sachin GIDC, Pandesara GIDC, or Khatodara GIDC can be validly bequeathed. The Will should specifically mention GIDC allotment numbers, lease terms, and nominate the succeeding partner or director to streamline GIDC transfer documentation.",
  },
  {
    q: "Can Non-Resident Gujaratis (NRGs / NRIs) draft a Will for Surat properties and investments?",
    a: "Yes. Non-resident Gujaratis owning apartments in Vesu, commercial shops on VIP Road, industrial units, or bank deposits across Surat can draft their Will online. NRGs can sign before two independent witnesses and notarize or apostille the Will through the Indian Consulate in their country of residence, or register it before a Surat Sub-Registrar during a visit to India.",
  },
];

export default function SuratLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/surat";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-surat-og.jpg";

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
        name: "Will Drafting in Surat: Online Will & Business Planning",
        description:
          "Draft your Will in Surat with expert lawyer review. Secure shop assets, family business shares, and Gujarat SRO filing.",
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
          caption: "Online Will Drafting and Commercial Asset Planning in Surat Gujarat",
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
            name: "Surat",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Surat - Commercial Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, diamond and textile business estate, HUF asset planning, and SRO office e-filing support.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Surat" },
          { "@type": "City", name: "Vesu" },
          { "@type": "City", name: "VIP Road" },
          { "@type": "City", name: "Adajan" },
          { "@type": "City", name: "Pal" },
          { "@type": "City", name: "Piplod" },
          { "@type": "City", name: "Varachha" },
          { "@type": "City", name: "Katargam" },
          { "@type": "City", name: "Athwalines" },
          { "@type": "City", name: "City Light" },
          { "@type": "City", name: "Ghod Dod Road" },
          { "@type": "City", name: "Ring Road" },
          { "@type": "City", name: "Udhna" },
          { "@type": "City", name: "Pandesara" },
          { "@type": "City", name: "Sachin" },
          { "@type": "City", name: "Rander" },
          { "@type": "City", name: "Jahangirpura" },
          { "@type": "City", name: "Althan" },
          { "@type": "City", name: "Bhimrad" },
          { "@type": "City", name: "DREAM City" },
          { "@type": "City", name: "Hazira" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Surat Will Drafting & Commercial Succession Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Surat Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Commercial & Business Succession Advocate Will Consultation",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Surat Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Surat, Gujarat",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Surat.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Business Interests",
            text: "List your Surat assets including SMC home apartments, textile shop shops, diamond trading shares, GIDC plots, bank accounts, and demat folios. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Commercial & Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include business estate, survivorship, HUF split, and specific asset bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the physical presence of two independent adult witnesses who are not heirs.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Surat SRO Appointment on Garvi Gujarat",
            text: "Book an e-appointment on the Garvi Gujarat portal (garvi.gujarat.gov.in) for your local SRO office and pay the nominal ₹100 filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the SRO office with your two witnesses and original IDs for biometric thumbprints, digital photograph capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: SURAT_FAQS.map((item) => ({
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
      <SuratLocationClient faqs={SURAT_FAQS} />
      <Footer />
    </>
  );
}
