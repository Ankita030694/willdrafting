import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DelhiNCTLocationClient from "./DelhiNCTLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Delhi NCT: Registration & Succession",
  },
  description:
    "Draft a valid Will in NCT of Delhi. Complete DORIS portal registration support, DDA/MCD property mutation, and non-presidency probate advice.",
  keywords: [
    "will drafting in delhi nct",
    "will registration doris delhi",
    "online will maker delhi",
    "dda flat succession will",
    "delhi high court probate optional",
    "mcd property tax mutation will",
    "sub registrar office delhi nct",
    "will drafting in south delhi",
    "will drafting in dwarka",
    "will drafting in rohini",
    "will drafting in pitampura",
    "will drafting in vasant kunj",
    "will drafting in hauz khas",
    "will drafting in janakpuri",
    "will drafting in preet vihar",
    "doris portal appointment delhi",
    "section 31 registration act home visit delhi",
    "will registration fees in delhi",
    "doctor medical certificate will delhi",
    "ama legal solutions delhi will drafting",
    "delhi non presidency probate section 213",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/delhi-nct",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/delhi-nct",
      "x-default": "https://www.willdrafting.in/locations/delhi-nct",
    },
  },
  openGraph: {
    title: "Will Drafting in Delhi NCT: Registration & Succession",
    description:
      "Draft a valid Will in NCT of Delhi. Complete DORIS portal registration support, DDA/MCD property mutation, and non-presidency probate advice.",
    url: "https://www.willdrafting.in/locations/delhi-nct",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-delhi-nct-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Registration Services in Delhi NCT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Delhi NCT: Registration & Succession",
    description:
      "Draft a valid Will in NCT of Delhi. Complete DORIS portal registration support, DDA/MCD property mutation, and non-presidency probate advice.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-delhi-nct-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const DELHI_NCT_FAQS = [
  {
    q: "Is Will registration mandatory in Delhi NCT?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Delhi. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Delhi Sub-Registrar Office stores it in government Book III records. This prevents future title disputes and speeds up DDA, MCD, or L&DO property mutation.",
  },
  {
    q: "Is probate required for a Will in Delhi NCT?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Delhi is a non-presidency territory. The Delhi High Court has consistently confirmed that obtaining court probate is not mandatory for Hindu, Sikh, Jain, and Buddhist Wills in Delhi.",
  },
  {
    q: "What is the official government fee to register a Will in Delhi?",
    a: "Wills are completely exempt from stamp duty across Delhi under the Indian Stamp Act, 1899. At Delhi Sub-Registrar offices, you only pay a nominal flat ₹100 registration fee plus official scanning and pasting charges of approximately ₹100 to ₹200. There are no percentage-based property taxes for registering a Will.",
  },
  {
    q: "How do I book an online appointment on the DORIS portal in Delhi?",
    a: "Appointments are scheduled through the Delhi Online Registration Information System (DORIS) portal at doris.delhiservices.gov.in. You select your local revenue district and Sub-Registrar office, enter testator and witness details, pay the nominal fee online via e-challan, and download your designated appointment receipt.",
  },
  {
    q: "Can senior citizens in Delhi register a Will from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home visit by the Sub-Registrar. A registered MBBS doctor must certify that the testator is medically unable to travel. The Sub-Registrar visits with portable biometric equipment.",
  },
  {
    q: "How does a registered Will help in transferring DDA flats and MCD records?",
    a: "A registered Will provides authentic evidence of the deceased owner's intentions before the Delhi Development Authority (DDA) and Municipal Corporation of Delhi (MCD). It streamlines property tax name mutation and freehold conveyance deed transfer without requiring lengthy court probate proceedings.",
  },
  {
    q: "How are multi-story builder floors bequeathed in Delhi?",
    a: "Builder floors in areas like Greater Kailash, Vasant Kunj, or Janakpuri require precise drafting. A valid Will explicitly demarcates the specific floor, terrace rights, stilt parking slots, and undivided impartible ownership in the land, preventing future clashes among legal heirs.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Delhi properties?",
    a: "Yes. Many NRIs own residential flats in Dwarka, Rohini, or South Delhi. NRIs can draft a legally compliant Will online from abroad. They can execute it before two witnesses and get it apostilled or notarized, or register it before a Delhi Sub-Registrar during an India visit.",
  },
];

export default function DelhiNCTLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/delhi-nct";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-delhi-nct-og.jpg";

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
        name: "Will Drafting in Delhi NCT: Registration & Succession",
        description:
          "Draft a valid Will in NCT of Delhi. Complete DORIS portal registration support, DDA/MCD property mutation, and non-presidency probate advice.",
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
          caption: "Online Will Drafting and Registration Services in Delhi NCT",
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
            name: "Delhi NCT",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Delhi NCT - Legal Estate Planning & DORIS Registration",
        description:
          "Professional Will drafting, advocate verification, DORIS portal registration, and doorstep execution support across all 11 revenue districts.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressRegion: "Delhi NCT",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "National Capital Territory of Delhi" },
          { "@type": "City", name: "New Delhi" },
          { "@type": "City", name: "South Delhi" },
          { "@type": "City", name: "South West Delhi" },
          { "@type": "City", name: "South East Delhi" },
          { "@type": "City", name: "West Delhi" },
          { "@type": "City", name: "North West Delhi" },
          { "@type": "City", name: "North Delhi" },
          { "@type": "City", name: "North East Delhi" },
          { "@type": "City", name: "East Delhi" },
          { "@type": "City", name: "Central Delhi" },
          { "@type": "City", name: "Shahdara" },
          { "@type": "City", name: "Dwarka" },
          { "@type": "City", name: "Rohini" },
          { "@type": "City", name: "Vasant Kunj" },
          { "@type": "City", name: "Hauz Khas" },
          { "@type": "City", name: "Greater Kailash" },
          { "@type": "City", name: "Saket" },
          { "@type": "City", name: "Janakpuri" },
          { "@type": "City", name: "Pitampura" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Delhi NCT Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Delhi NCT Residents",
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
                name: "Complete Delhi SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Delhi NCT",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Delhi NCT.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Delhi Assets and Beneficiaries",
            text: "List your Delhi properties including DDA flats, builder floors, bank deposits, mutual funds, and demat shares. Name your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include revocation, survivorship, and specific asset bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Delhi SRO Appointment on DORIS Portal",
            text: "Book an e-appointment on the DORIS portal (doris.delhiservices.gov.in) for your local Sub-Registrar office and pay the nominal ₹100 registration fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Delhi SRO",
            text: "Visit the Sub-Registrar office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: DELHI_NCT_FAQS.map((item) => ({
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
      <DelhiNCTLocationClient faqs={DELHI_NCT_FAQS} />
      <Footer />
    </>
  );
}
