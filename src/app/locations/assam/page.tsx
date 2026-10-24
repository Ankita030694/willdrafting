import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssamLocationClient from "./AssamLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Assam: Online Will Registration Guide",
  },
  description:
    "Draft a legally binding Will in Assam. Complete Panjeeyan registration guidance, tea estate succession, and Dharitree revenue mutation support online.",
  keywords: [
    "will drafting in assam",
    "will registration assam panjeeyan",
    "dharitree portal will transfer",
    "online will maker assam",
    "succession advocate guwahati",
    "gauhati high court probate rules",
    "assam tea garden will drafting",
    "guwahati municipal corporation will mutation",
    "circle officer dharitree mutation assam",
    "will drafting services in guwahati",
    "will drafting dibrugarh",
    "will drafting silchar",
    "will drafting jorhat",
    "will drafting tezpur",
    "will drafting nagaon",
    "will drafting tinsukia",
    "will drafting bongaigaon",
    "section 31 registration act home visit assam",
    "section 213 indian succession act assam probate",
    "ama legal solutions assam will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/assam",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/assam",
      "x-default": "https://www.willdrafting.in/locations/assam",
    },
  },
  openGraph: {
    title: "Will Drafting in Assam: Online Will Registration Guide",
    description:
      "Draft a legally binding Will in Assam. Complete Panjeeyan registration guidance, tea estate succession, and Dharitree revenue mutation support online.",
    url: "https://www.willdrafting.in/locations/assam",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-assam-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Property Succession in Assam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Assam: Online Will Registration Guide",
    description:
      "Draft a legally binding Will in Assam. Complete Panjeeyan registration guidance, tea estate succession, and Dharitree revenue mutation support online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-assam-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const ASSAM_FAQS = [
  {
    q: "Is Will registration mandatory in Assam?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Assam. A Will executed on plain white paper is legally valid if signed before two independent adult witnesses. However, registering your Will before a Sub-Registrar enters it into permanent Book III government custody, preventing malicious family challenges and expediting revenue mutation.",
  },
  {
    q: "Is probate compulsory for a Will in Assam under Gauhati High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Assam lies outside presidency town jurisdictions. The Gauhati High Court has confirmed that court probate is non-mandatory for Hindu, Muslim, Buddhist, Sikh, and Jain Wills, permitting direct title mutation.",
  },
  {
    q: "How does a registered Will help in Dharitree land mutation in Assam?",
    a: "Under the Assam Land and Revenue Regulation, 1886, Circle Officers and Lot Mandals require clear documentary proof to update Jamabandi and Chitha records on the Dharitree portal. An unregistered Will is frequently contested by legal heirs during field verification. A registered Will carries strong statutory evidentiary value, enabling swift mutation approval without civil court succession decrees.",
  },
  {
    q: "What is the official government fee to register a Will in Assam?",
    a: "Wills are completely exempt from ad-valorem stamp duty across Assam under the Indian Stamp Act. You can draft your Will on plain A4 paper without purchasing non-judicial stamp paper. At Assam Sub-Registrar Offices, you pay a flat nominal registration fee of ₹100 under Book III plus standard computer scanning and service charges of ₹100 to ₹250.",
  },
  {
    q: "How is succession handled for tea estates and agricultural land in Assam?",
    a: "Tea gardens and farmland can be bequeathed through a Will. However, testamentary clauses must comply with the Assam Fixation of Ceiling on Land Holdings Act, 1956 (50 bigha ceiling limit) and Chapter X of the Assam Land and Revenue Regulation regarding tribal belts and blocks. The registered Will ensures smooth leasehold transfer with the Tea Board and revenue authorities.",
  },
  {
    q: "How do I book an appointment on the Assam Panjeeyan registration portal?",
    a: "You can book appointments online on the Assam Panjeeyan portal (panjeeyan.assam.gov.in). Select your administrative district and jurisdictional Sub-Registrar Office, enter testator and witness KYC information, generate the government e-Challan for the ₹100 fee, and download the official appointment slip with your designated biometric time slot.",
  },
  {
    q: "Can senior citizens in Assam register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell individuals can request a home or hospital visit. An MBBS doctor issues a certificate confirming physical inability to travel. The Sub-Registrar visits your residence in Guwahati, Dibrugarh, Silchar, or any Assam district with portable biometric equipment.",
  },
  {
    q: "How does a registered Will facilitate Guwahati Municipal Corporation (GMC) mutation?",
    a: "Guwahati Municipal Corporation updates property tax assessment records based on testamentary documents. The beneficiary submits an application with the registered Will, death certificate, and ownership documents. A registered Will provides conclusive proof of title, allowing GMC to transfer holding numbers smoothly without requiring multiple family affidavits.",
  },
  {
    q: "Who can act as attesting witnesses for a Will in Assam?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will, nor should they be spouses of beneficiaries. Family doctors, trusted neighbors, or family friends are ideal.",
  },
  {
    q: "Can Non-Resident Assamese (NRIs) make a Will for Assam properties?",
    a: "Yes. Non-Resident Assamese living in other Indian metros or overseas in the US, UK, Gulf, or Singapore can draft a customized Will online through WillDrafting.in. The Will can be executed before two witnesses abroad and notarized or apostilled, or registered before an Assam Sub-Registrar during their visit to India.",
  },
];

export default function AssamLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/assam";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-assam.jpg";

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
        name: "Will Drafting in Assam: Online Will Registration Guide",
        description:
          "Draft a legally binding Will in Assam. Complete Panjeeyan registration guidance, tea estate succession, and Dharitree revenue mutation support online.",
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
          caption: "Online Will Drafting and Property Succession in Assam",
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
            name: "Assam",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Assam - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Assam Panjeeyan registration, and doorstep execution support across Guwahati, Dibrugarh, Silchar, Jorhat, Tezpur, and all districts of Assam.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Guwahati",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Guwahati" },
          { "@type": "City", name: "Dispur" },
          { "@type": "City", name: "Dibrugarh" },
          { "@type": "City", name: "Silchar" },
          { "@type": "City", name: "Jorhat" },
          { "@type": "City", name: "Tezpur" },
          { "@type": "City", name: "Nagaon" },
          { "@type": "City", name: "Tinsukia" },
          { "@type": "City", name: "Bongaigaon" },
          { "@type": "City", name: "Karimganj" },
          { "@type": "City", name: "Sivasagar" },
          { "@type": "City", name: "Goalpara" },
          { "@type": "City", name: "Barpeta" },
          { "@type": "City", name: "Dhubri" },
          { "@type": "City", name: "North Lakhimpur" },
          { "@type": "City", name: "Golaghat" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Assam Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Assam Residents",
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
                name: "Complete Assam Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Assam",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Assam.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Assam real estate including GMC apartments, Dharitree agricultural land, tea estate shares, and financial investments. Designate beneficiaries and an executor.",
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
            name: "Book Assam Panjeeyan Slot",
            text: "Schedule your registration appointment on the Assam Panjeeyan portal for your relevant Sub-Registrar Office and remit the flat ₹100 registration fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Assam SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: ASSAM_FAQS.map((item) => ({
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
      <AssamLocationClient faqs={ASSAM_FAQS} />
      <Footer />
    </>
  );
}
