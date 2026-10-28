import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripuraLocationClient from "./TripuraLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Tripura: Online Will Registration Guide",
  },
  description:
    "Draft a valid Will in Tripura. Expert guidance on TLR & LR Act provisions, tribal area Sixth Schedule land rules, and SRO registration in.",
  keywords: [
    "will drafting in tripura",
    "will registration agartala",
    "tripura land revenue act will",
    "ttaadc tribal land inheritance",
    "estate advocate tripura",
    "online will tripura",
    "amc agartala flat mutation will",
    "will drafting agartala sadar",
    "will registration udaipur gomati",
    "dharmanagar will drafting lawyer",
    "kailashahar will advocate unakoti",
    "belonia will registration south tripura",
    "bishalgarh estate planning tripura",
    "ambassa dhalai will lawyer",
    "section 187 tlr lr act will",
    "high court of tripura probate exemption",
    "is probate mandatory in tripura",
    "section 31 registration act home visit tripura",
    "tripura khatian jamabandi will mutation",
    "ama legal solutions tripura will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/tripura",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/tripura",
      "x-default": "https://www.willdrafting.in/locations/tripura",
    },
  },
  openGraph: {
    title: "Will Drafting in Tripura: Online Will Registration Guide",
    description:
      "Draft a valid Will in Tripura. Expert guidance on TLR & LR Act provisions, tribal area Sixth Schedule land rules, and SRO registration in.",
    url: "https://www.willdrafting.in/locations/tripura",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-tripura-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Tripura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Tripura: Online Will Registration Guide",
    description:
      "Draft a valid Will in Tripura. Expert guidance on TLR & LR Act provisions, tribal area Sixth Schedule land rules, and SRO registration in.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-tripura-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TRIPURA_FAQS = [
  {
    q: "Is Will registration mandatory in Tripura?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Tripura. A Will written on plain paper and attested by two competent witnesses is legally valid. However, registering your Will before the Sub-Registrar in Agartala Sadar, Udaipur, Dharmanagar, or other district SROs enters it into permanent Book III government custody, eliminating allegations of fraud and accelerating revenue mutation under the TLR & LR Act.",
  },
  {
    q: "Is probate required for a Will in Tripura under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Tripura lies outside these presidency limits. The High Court of Tripura has maintained that court probate is non-mandatory for Hindu, Buddhist, Sikh, and Jain Wills, enabling direct property mutation without expensive probate litigation.",
  },
  {
    q: "How does the Tripura Land Revenue and Land Reforms Act, 1960 affect bequests?",
    a: "Section 187 of the Tripura Land Revenue and Land Reforms Act, 1960 strictly restricts the transfer of land belonging to Scheduled Tribes to non-tribals. A Will cannot be used to bypass Section 187; testamentary bequests of tribal lands in Tripura must remain within eligible tribal legal successors or comply with statutory collector permissions. Self-acquired urban properties, non-tribal lands, and financial assets remain under unrestricted testamentary power.",
  },
  {
    q: "What are the rules for land inheritance in TTAADC Sixth Schedule areas?",
    a: "The Tripura Tribal Areas Autonomous District Council (TTAADC), established under the Sixth Schedule of the Indian Constitution, oversees customary tribal land governance. In TTAADC areas, ancestral lands follow traditional customary laws of succession. A Will dealing with properties located within ADC areas must align with community land customs and council regulations to prevent disputes during village council verification.",
  },
  {
    q: "What is the official government fee to register a Will in Tripura?",
    a: "Wills in Tripura attract ₹0 stamp duty under the Indian Stamp Act, 1899 as applicable to Tripura, because a Will is not an inter-vivos conveyance. At Tripura Sub-Registrar Offices (SROs), you only pay nominal statutory Book III registration and computerized scanning fees. There is no ad-valorem percentage-based property market value tax charged on registering a Will.",
  },
  {
    q: "How does a registered Will help in Agartala Municipal Corporation (AMC) mutation?",
    a: "Agartala Municipal Corporation (AMC) requires authentic legal evidence of succession before updating property tax registers and municipal holding records. A registered Will serves as prima facie authentic evidence of the deceased testator's intentions, eliminating expensive civil court succession proceedings, no-objection disputes among distant relatives, or intestate delays.",
  },
  {
    q: "Can senior citizens in Tripura register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or individuals with severe medical or mobility restrictions can request a doorstep visit by the Sub-Registrar. Upon submitting an application with a medical fitness certificate from a registered MBBS physician, the SRO official visits your residence in Agartala, Udaipur, or other subdivisions with mobile biometric recording apparatus.",
  },
  {
    q: "How are agricultural lands (Nal, Lunga, Tilla) in Tripura transferred via Will?",
    a: "Agricultural and homestead lands in Tripura, classified locally as Nal (plains/paddy), Lunga (low-lying valleys), and Tilla (elevated highlands), are recorded in Khatians under the Revenue Department. Upon the testator's demise, the beneficiary files an application along with the registered Will and death certificate to the Circle Tehsil office. After spot verification, the Revenue Officer mutates the Khatian into the beneficiary's name under the TLR & LR Act.",
  },
  {
    q: "Who can serve as valid attesting witnesses for a Will in Tripura?",
    a: "Under Section 63 of the Indian Succession Act, 1925, a Will must be attested by at least two competent adult witnesses of sound mind. Crucially, under Section 67, attesting witnesses must not be beneficiaries receiving any property or bequest under the Will. Family physicians, longtime neighbors, or professional colleagues carrying valid Aadhaar cards or voter IDs make ideal witnesses.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for property located in Tripura?",
    a: "Yes. Many NRIs and professionals living outside Tripura or overseas own residential apartments, family homesteads, or tea garden interests in Agartala, Dharmanagar, and Udaipur. NRIs can draft a comprehensive Indian Will online with our legal team, execute it before two witnesses abroad with consular notarization or apostille, or register it before the local Sub-Registrar during their visit to Tripura.",
  },
];

export default function TripuraLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/tripura";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-tripura.jpg";

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
        name: "Will Drafting in Tripura: Online Will Registration Guide",
        description:
          "Draft a valid Will in Tripura. Expert guidance on TLR & LR Act provisions, tribal area Sixth Schedule land rules, and SRO registration in.",
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
          caption: "Legal Will Drafting and Property Succession in Tripura",
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
            name: "Tripura",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Tripura - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, TLR & LR Act compliance, and Sub-Registrar Office assistance across Agartala, Udaipur.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Agartala",
          addressRegion: "Tripura",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Agartala" },
          { "@type": "City", name: "Udaipur" },
          { "@type": "City", name: "Dharmanagar" },
          { "@type": "City", name: "Kailashahar" },
          { "@type": "City", name: "Belonia" },
          { "@type": "City", name: "Bishalgarh" },
          { "@type": "City", name: "Ambassa" },
          { "@type": "City", name: "Mohanpur" },
          { "@type": "City", name: "Jirania" },
          { "@type": "City", name: "Kumarghat" },
          { "@type": "City", name: "Sabroom" },
          { "@type": "City", name: "Melaghar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tripura Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Tripura Residents",
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
                name: "Complete Tripura Sub-Registrar Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Tripura",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Tripura.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Tripura real estate including Agartala municipal holdings, Nal/Lunga/Tilla land Khatians, and financial investments. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses compliant with the TLR & LR Act 1960, TTAADC protections, survivorship terms, and guardian appointments for minors.",
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
            name: "Schedule Sub-Registrar Office Visit",
            text: "Prepare your application for your local Sub-Registrar Office in Agartala Sadar, Udaipur, Dharmanagar, or other district registries and pay nominal government Book III fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Tripura SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: TRIPURA_FAQS.map((item) => ({
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
      <TripuraLocationClient faqs={TRIPURA_FAQS} />
      <Footer />
    </>
  );
}
