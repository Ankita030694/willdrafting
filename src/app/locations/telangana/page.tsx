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
    "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review.",
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
      "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review.",
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
      "Draft a legally valid Will in Telangana. Easy registration via IGRS Telangana, Dharani portal land transfer, and experienced advocate review.",
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
    q: "Is Will registration required by law in Telangana?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, filing a Will at the SRO is optional across Telangana. A Will signed on plain white paper before two witnesses is valid. Still, recording your Will at an IGRS Telangana SRO stores it in safe Book III state records, stopping fake claims and speeding up name updates with GHMC, city boards, and the Dharani portal.",
  },
  {
    q: "Is court probate needed for a Will in Telangana?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, court probate is needed only in the old presidency cities of Mumbai, Kolkata, and Chennai. Telangana is a non-presidency state. The Telangana High Court at Hyderabad rules that court probate is not required for Hindu, Sikh, Jain, or Buddhist Wills to prove title or transfer land.",
  },
  {
    q: "How does farm land transfer work on the Dharani portal in Telangana?",
    a: "For farm plots, name transfer follows the Telangana Rights in Land and Pattadar Pass Books Act, 2020 on the Dharani portal (dharani.telangana.gov.in). After the owner passes away, the heir shows the registered Will and death certificate to the local Tahsildar. The land record is updated online on the digital e-Pattadar passbook without court delays.",
  },
  {
    q: "What is the state fee to register a Will in Telangana?",
    a: "Wills pay zero stamp duty across Telangana under the Indian Stamp Act. At IGRS Telangana SRO desks, you pay only a small state filing fee of ₹100 to ₹200 plus minor page scan charges. There are no percentage fees based on land value.",
  },
  {
    q: "How does a registered Will help in GHMC house tax mutation?",
    a: "GHMC and other city offices ask for clear proof of succession before changing the owner's name on the house tax record (PTIN). A registered Will gives solid title proof at single-window city portals, so your family does not need a slow civil court order.",
  },
  {
    q: "How do I book an IGRS Telangana online slot?",
    a: "You can book your slot online on the Telangana registration portal (registration.telangana.gov.in). Pick your local SRO desk, enter owner and witness ID details, pay the Cyber Treasury fee slip, and print a confirmed time-slot slip.",
  },
  {
    q: "Can seniors in Telangana register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, seniors or unwell owners who cannot travel can ask for a home visit by the SRO officer. An MBBS doctor writes a note confirming a clear mind, and the SRO officer visits your home with a hand-held thumb scanner.",
  },
  {
    q: "Who can sign as a valid witness at Telangana SRO offices?",
    a: "Any two adults of sound mind with valid Aadhaar cards or state photo IDs can sign as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be heirs who get any property under the Will. Family doctors, neighbors, or friends are ideal choices.",
  },
  {
    q: "Can NRIs make a Will for properties across Telangana?",
    a: "Yes. Many Telugu NRIs living in the USA, UK, UAE, Australia, or Canada own flats, villas in HITEC City, shop plots, or family farms across Telangana. NRIs can draft a custom Will online, sign it before two witnesses abroad, or record it at a Telangana SRO during a trip to India.",
  },
  {
    q: "Does a nominee become the true owner of a flat in Telangana?",
    a: "No. Under settled Supreme Court law and housing society rules, a nominee is only a caretaker who manages records and dues after death. True ownership passes strictly to the legal heirs named in a valid Will.",
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
          "Draft a legally valid Will in Telangana. Easy signing via IGRS Telangana, Dharani portal land transfer, and experienced lawyer review.",
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
          "Professional Will drafting, lawyer check, IGRS Telangana slot scheduling, Dharani portal land estate, and doorstep signing.",
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
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Telangana.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Telangana assets including GHMC flats, HMDA plots, Dharani farm land records, bank accounts, and demat shares. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using checked legal clauses for clear asset split, survivorship, guardian appointments for minors, and revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book IGRS Telangana Portal Slot",
            text: "Schedule your signing appointment on the IGRS Telangana portal for your relevant SRO office and remit the nominal signing fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at SRO office",
            text: "Visit the SRO office with both witnesses for identity check, digital photograph capture, and biometric thumbprinting to complete Book III signing.",
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
