import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TelanganaLocationClient from "./TelanganaLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Telangana: Online Will & Asset Planning",
  },
  description:
    "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review online.",
  keywords: [
    "will drafting in telangana",
    "will registration igrs telangana",
    "dharani portal will succession",
    "ghmc property mutation will",
    "estate lawyer hyderabad",
    "online will telangana",
    "will registration hyderabad sro",
    "will drafting secunderabad",
    "will drafting warangal",
    "will drafting karimnagar",
    "will drafting nizamabad",
    "will drafting khammam",
    "will drafting mahabubnagar",
    "will drafting nalgonda",
    "section 31 registration act home visit telangana",
    "is probate mandatory in telangana",
    "telangana high court probate exemption",
    "dharani epattadar passbook will succession",
    "hmda plot will succession telangana",
    "ama legal solutions telangana will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/telangana",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/telangana",
      "x-default": "https://www.willdrafting.in/locations/telangana",
    },
  },
  openGraph: {
    title: "Will Drafting in Telangana: Online Will & Asset Planning",
    description:
      "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review online.",
    url: "https://www.willdrafting.in/locations/telangana",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-telangana-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Telangana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Telangana: Online Will & Asset Planning",
    description:
      "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-telangana-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TELANGANA_FAQS = [
  {
    q: "Is Will registration mandatory in Telangana?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Telangana. A Will executed on plain paper and signed before two independent witnesses is legally enforceable. However, registering your Will at an IGRS Telangana Sub-Registrar Office places it in permanent Book III government custody, preventing fraudulent challenges and expediting mutation with GHMC, municipal bodies, and the Dharani portal.",
  },
  {
    q: "Is probate required for a Will in Telangana under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Telangana is a non-presidency state. The Telangana High Court at Hyderabad has consistently held that court probate is non-mandatory for Hindu, Sikh, Jain, and Buddhist Wills to establish title or transfer property.",
  },
  {
    q: "How does agricultural land succession work on the Dharani portal in Telangana?",
    a: "For agricultural parcels, mutation is processed under the Telangana Rights in Land and Pattadar Pass Books Act, 2020 via the Dharani portal (dharani.telangana.gov.in). Following the testator's demise, the beneficiary submits the registered Will and death certificate to the local Tahsildar. The Record of Rights is updated online directly on the digital e-Pattadar passbook without bureaucratic delays.",
  },
  {
    q: "What is the official government fee to register a Will in Telangana?",
    a: "Wills are completely exempt from ad-valorem stamp duty across Telangana under the Indian Stamp Act as adopted in the state. At IGRS Telangana Sub-Registrar offices, you only pay a nominal statutory registration fee of approximately ₹100 to ₹200 plus minor scanning and user charges. There are no percentage-based property market charges.",
  },
  {
    q: "How does a registered Will help in GHMC property tax mutation?",
    a: "Greater Hyderabad Municipal Corporation (GHMC) and other regional municipal bodies require definitive testamentary succession evidence before substituting ownership on the property tax assessment register (PTIN). A registered Will serves as conclusive title evidence before single-window municipal portals, eliminating the requirement for expensive civil court succession certificates.",
  },
  {
    q: "How do I book an IGRS Telangana online appointment?",
    a: "Appointments are scheduled digitally through the Registration & Stamps Department Telangana portal (registration.telangana.gov.in). You select your jurisdictional Sub-Registrar Office, enter testator and witness KYC details, generate the Cyber Treasury e-Challan, and download a confirmed appointment slot slip.",
  },
  {
    q: "Can senior citizens in Telangana register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep home visit by the Sub-Registrar. A registered MBBS doctor certifies that the testator is of sound mind but medically advised against traveling. The Sub-Registrar attends your home with portable biometric equipment.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Telangana Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted neighbors, or long-standing family friends are ideal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located across Telangana?",
    a: "Yes. Many Telugu NRIs residing in the USA, UK, UAE, Australia, or Canada own apartments, villas in HITEC City, commercial sites, or ancestral lands across Telangana. NRIs can draft a customized Will online, execute it before two witnesses abroad, and have it consular-notarized or apostilled, or register it before a Telangana Sub-Registrar during their visit to India.",
  },
  {
    q: "Does a nominee automatically become the owner of an apartment in Telangana?",
    a: "No. Under established Supreme Court jurisprudence and cooperative housing guidelines, a nominee acts merely as a temporary trustee to manage records and maintenance charges. True beneficial ownership does not pass to a nominee. Only a legally valid Will or personal succession laws determine lawful ownership of the flat.",
  },
];

export default function TelanganaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/telangana";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-telangana.jpg";

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
        name: "Will Drafting in Telangana: Online Will & Asset Planning",
        description:
          "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review online.",
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
          caption: "Legal Will Drafting and Property Succession in Telangana",
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
            name: "Telangana",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Telangana - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, IGRS Telangana slot scheduling, Dharani portal land succession, and doorstep execution support across Hyderabad, Warangal, Nizamabad, and Karimnagar.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "City", name: "Secunderabad" },
          { "@type": "City", name: "Warangal" },
          { "@type": "City", name: "Hanamkonda" },
          { "@type": "City", name: "Nizamabad" },
          { "@type": "City", name: "Karimnagar" },
          { "@type": "City", name: "Ramagundam" },
          { "@type": "City", name: "Khammam" },
          { "@type": "City", name: "Mahabubnagar" },
          { "@type": "City", name: "Nalgonda" },
          { "@type": "City", name: "Suryapet" },
          { "@type": "City", name: "Sangareddy" },
          { "@type": "City", name: "Medchal" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Telangana Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Telangana Residents",
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
                name: "Complete Telangana Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Telangana",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Telangana.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Telangana assets including GHMC flats, HMDA plots, Dharani agricultural land records, bank accounts, and demat shares. Designate beneficiaries and an executor.",
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
            name: "Book IGRS Telangana Portal Slot",
            text: "Schedule your registration appointment on the IGRS Telangana portal for your relevant Sub-Registrar Office and remit the nominal registration fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Sub-Registrar Office",
            text: "Visit the Sub-Registrar office with both witnesses for identity verification, digital photograph capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: TELANGANA_FAQS.map((item) => ({
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
      <TelanganaLocationClient faqs={TELANGANA_FAQS} />
      <Footer />
    </>
  );
}
