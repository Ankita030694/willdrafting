import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChandigarhLocationClient from "./ChandigarhLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Chandigarh: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Chandigarh Tricity. Expert guidance on share of property, Sub-Registrar registration, and family succession.",
  keywords: [
    "will drafting in chandigarh",
    "will registration tricity mohali panchkula",
    "chandigarh housing board will transfer",
    "estate planning lawyer chandigarh",
    "online will punjab",
    "chandigarh estate office will mutation",
    "sub registrar office sector 17 chandigarh",
    "chb flat transfer will succession",
    "is probate mandatory in chandigarh",
    "punjab and haryana high court will probate",
    "gmada plot will transfer mohali",
    "hsvp plot will transfer panchkula",
    "will drafting sector 17 chandigarh",
    "will drafting sector 35 chandigarh",
    "will drafting sector 43 chandigarh",
    "will drafting in mohali",
    "will drafting in panchkula",
    "will drafting new chandigarh mullanpur",
    "nri will drafting chandigarh",
    "section 31 registration act home visit chandigarh",
    "will registration fees in chandigarh",
    "doctor medical certificate will chandigarh",
    "ban on fragmentation chandigarh property will",
    "ama legal solutions chandigarh will drafting",
    "sub registrar office mohali sector 76",
    "sub registrar office panchkula sector 1",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/chandigarh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/chandigarh",
      "x-default": "https://www.willdrafting.in/locations/chandigarh",
    },
  },
  openGraph: {
    title: "Will Drafting in Chandigarh: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Chandigarh Tricity. Expert guidance on share of property, Sub-Registrar registration, and family succession.",
    url: "https://www.willdrafting.in/locations/chandigarh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-chandigarh-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Estate Planning in Chandigarh Tricity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Chandigarh: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Chandigarh Tricity. Expert guidance on share of property, Sub-Registrar registration, and family succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-chandigarh-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const CHANDIGARH_FAQS = [
  {
    q: "Is Will registration mandatory in Chandigarh and Tricity?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Chandigarh, Mohali, and Panchkula. A Will written on plain paper and signed before two witnesses is legally valid. However, the Chandigarh Housing Board (CHB) and the UT Estate Office strongly recommend registration to ensure rapid title transfer without requiring newspaper advertisements or indemnity bonds.",
  },
  {
    q: "How does a registered Will help in transferring a Chandigarh Housing Board (CHB) flat?",
    a: "The Chandigarh Housing Board has strict succession policies. For unregistered Wills, CHB demands public notices in English and Punjabi dailies, extensive indemnity bonds, and affidavits from all surviving Class I legal heirs. A registered Will drastically speeds up the process, allowing the CHB Secretary to sanction direct mutation and ownership transfer to the nominated beneficiary.",
  },
  {
    q: "Is court probate required for a Will in Chandigarh, Punjab, or Haryana?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. The Punjab & Haryana High Court in landmark rulings (including Ram Chand v. Sardara Singh and Madan Lal v. Dev Raj) has confirmed that probate is not compulsory in Chandigarh, Punjab, or Haryana for Hindu, Sikh, Jain, or Buddhist Wills.",
  },
  {
    q: "What are the rules regarding share-wise property transfer in Chandigarh under a Will?",
    a: "Following Supreme Court rulings and UT Administration regulations, the fragmentation or floor-wise bifurcation of independent residential plots (marla and kanal houses) is strictly prohibited. While a testator can bequeath percentage shares in a residential property, the property remains impartible. Our advocates draft specific clauses to prevent joint ownership gridlocks among siblings.",
  },
  {
    q: "What is the official government fee to register a Will in Chandigarh?",
    a: "Wills are 100% exempt from stamp duty across Chandigarh, Punjab, and Haryana under the Indian Stamp Act, 1899. At the Sub-Registrar Office in Sector 17, Chandigarh, you only pay a nominal government registration fee of ₹100 to ₹200 plus computerized scanning charges. There are no percentage-based property taxes for registering a Will.",
  },
  {
    q: "Can a single Will cover properties spread across Chandigarh, Mohali, and Panchkula?",
    a: "Yes. You can execute a single comprehensive Will covering your real estate in Chandigarh (UT), GMADA plots in Mohali (Punjab), and HSVP floors in Panchkula (Haryana), alongside national bank accounts. Under Section 32 of the Registration Act, you can register this Will at the Sub-Registrar Office where you reside or where your primary property is located.",
  },
  {
    q: "Can an elderly citizen in Chandigarh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically vulnerable citizens can request a home visit by the Sub-Registrar. This is widely utilized by retired defense officers and senior citizens in Sectors 33, 34, 35, and 36. An MBBS doctor certificate of sound mental capacity and a nominal government commission fee are required.",
  },
  {
    q: "How can Non-Resident Indians (NRIs) make a legally binding Will for Chandigarh properties?",
    a: "NRIs residing in Canada, the UK, the USA, or Australia owning properties in Chandigarh or Mohali can draft their Will online through our platform. They can execute it abroad before two independent witnesses, attest it at the Indian Consulate/Embassy, or register it formally at the Sector 17 Sub-Registrar Office during their visit to India.",
  },
];

export default function ChandigarhLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/chandigarh";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-chandigarh-og.jpg";

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
        name: "Will Drafting in Chandigarh: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Chandigarh Tricity. Expert guidance on share of property, Sub-Registrar registration, and family succession.",
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
          caption: "Will Drafting & Estate Planning Services in Chandigarh Tricity",
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
            name: "Chandigarh Tricity",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Chandigarh - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer verification, and Sub-Registrar Office registration support across Chandigarh, Mohali, and Panchkula.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chandigarh",
          addressRegion: "Chandigarh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Chandigarh" },
          { "@type": "City", name: "Mohali" },
          { "@type": "City", name: "Panchkula" },
          { "@type": "City", name: "New Chandigarh" },
          { "@type": "City", name: "Zirakpur" },
          { "@type": "City", name: "Kharar" },
          { "@type": "City", name: "Dera Bassi" },
          { "@type": "City", name: "Manimajra" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Chandigarh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Chandigarh Residents",
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
                name: "Complete Chandigarh Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Chandigarh Tricity",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Chandigarh, Mohali, or Panchkula.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Tricity Assets and Beneficiaries",
            text: "List your Chandigarh Estate Office plots, CHB flats, GMADA/HSVP properties, bank accounts, and demat folios. Name your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Specific Impartibility Clauses",
            text: "Draft your Will using our online legal platform or with a senior advocate to incorporate UT Chandigarh building bylaws, impartibility, and survivorship clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain white A4 paper and sign each page in the physical presence of two independent adult witnesses who are not beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar Appointment",
            text: "Book an appointment at the Sector 17 Sub-Registrar Office in Chandigarh, or Mohali DAC Complex, or Panchkula Mini Secretariat.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at SRO",
            text: "Visit the Sub-Registrar Office with your two witnesses and original Aadhaar cards for biometric verification, photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: CHANDIGARH_FAQS.map((item) => ({
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
      <ChandigarhLocationClient faqs={CHANDIGARH_FAQS} />
      <Footer />
    </>
  );
}
