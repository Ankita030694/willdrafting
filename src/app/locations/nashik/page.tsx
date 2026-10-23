import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NashikLocationClient from "./NashikLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Nashik: Legal Online Will Making Guide",
  },
  description:
    "Create a valid Will in Nashik with legal consultation. Clear guidance on agro-industrial assets, IGR Maharashtra registration, and NMC flat succession.",
  keywords: [
    "will drafting in nashik",
    "will registration nashik sro",
    "nmc flat transfer will nashik",
    "advocate for will drafting nashik",
    "online will maharashtra",
    "nashik municipal corporation mutation will",
    "igr maharashtra nashik appointment",
    "will drafting gangapur road",
    "will drafting college road",
    "will drafting cidco nashik",
    "will drafting panchavati",
    "will drafting mahatma nagar",
    "will drafting indira nagar",
    "will drafting nashik road",
    "will drafting ambad midc",
    "will drafting satpur midc",
    "dindori vineyard agricultural will",
    "niphad grape orchard succession",
    "section 31 registration act home visit nashik",
    "article 64 maharashtra stamp act will",
    "is probate mandatory in nashik",
    "bombay high court probate nashik exemption",
    "7 12 utara satbara will mutation nashik",
    "cooperative housing society will transfer nashik",
    "ama legal solutions nashik will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/nashik",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/nashik",
      "x-default": "https://www.willdrafting.in/locations/nashik",
    },
  },
  openGraph: {
    title: "Will Drafting in Nashik: Legal Online Will Making Guide",
    description:
      "Create a valid Will in Nashik with legal consultation. Clear guidance on agro-industrial assets, IGR Maharashtra registration, and NMC flat succession.",
    url: "https://www.willdrafting.in/locations/nashik",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-nashik-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Nashik Maharashtra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Nashik: Legal Online Will Making Guide",
    description:
      "Create a valid Will in Nashik with legal consultation. Clear guidance on agro-industrial assets, IGR Maharashtra registration, and NMC flat succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-nashik-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NASHIK_FAQS = [
  {
    q: "Is Will registration mandatory in Nashik?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Nashik. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Nashik Sub-Registrar Office enters it into permanent Book III government custody. This prevents fraudulent challenges and ensures fast mutation with Nashik Municipal Corporation and cooperative societies.",
  },
  {
    q: "Is probate required for a Will in Nashik under Bombay High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Nashik lies outside Greater Mumbai. The Bombay High Court has repeatedly held that court probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills in Nashik, allowing direct property transfer with a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Nashik?",
    a: "Wills are 100% exempt from stamp duty across Maharashtra under Article 64 of Schedule I of the Maharashtra Stamp Act. At Nashik Sub-Registrar offices, you only pay a flat ₹100 registration fee plus nominal government scanning and data charges of approximately ₹100 to ₹300. There are no percentage-based property market value charges.",
  },
  {
    q: "Does a nominee automatically own a cooperative housing society flat in Nashik?",
    a: "No. Under Section 30 of the Maharashtra Co-operative Societies Act, 1960 and Supreme Court precedents, a nominee acts merely as a trustee to manage society records. True beneficial ownership does not pass to a nominee. Only a legally valid Will or intestate succession determines lawful ownership of the flat and share certificate.",
  },
  {
    q: "How are agricultural lands, vineyards, and orchards in Nashik transferred via Will?",
    a: "Farmland, grape orchards, and vineyards in Dindori, Niphad, or Sinnar can be bequeathed through a Will. Upon the testator's demise, the beneficiary submits the registered Will and death certificate to the Talathi. A Ferfar entry is posted under Section 149 of the Maharashtra Land Revenue Code, 1966, updating the 7/12 extract (Satbara Utara) smoothly.",
  },
  {
    q: "How do I book an IGR Maharashtra e-Stepin appointment in Nashik?",
    a: "Appointments are scheduled online through the Inspector General of Registration Maharashtra portal (igrmaharashtra.gov.in) using the e-Stepin facility. You select your local Nashik Sub-Registrar Office, enter testator and witness KYC details, generate the e-Challan for the ₹100 fee on GRAS, and secure a confirmed time slot.",
  },
  {
    q: "Can senior citizens in Nashik register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep visit. An MBBS doctor certifies physical inability to travel. The Sub-Registrar attends your residence in Gangapur Road, Indira Nagar, or Mahatma Nagar with portable biometric devices.",
  },
  {
    q: "How does a registered Will help with Nashik Municipal Corporation (NMC) mutation?",
    a: "Nashik Municipal Corporation requires clear documentary evidence of succession before substituting ownership on the property tax assessment register (Varasdar Nond). A registered Will provides conclusive proof of the deceased testator's intentions, eliminating the need for expensive civil court succession certificates or disputed legal heir affidavits.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Nashik Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted neighbors, or family friends are ideal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Nashik?",
    a: "Yes. Many NRIs residing in the Gulf, USA, UK, or Canada own apartments or plots in Nashik. NRIs can draft a customized Will online. They can execute it before two witnesses abroad and have it notarized or apostilled, or complete formal Book III registration before a Nashik Sub-Registrar during their visit to India.",
  },
];

export default function NashikLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/nashik";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-nashik.jpg";

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
        name: "Will Drafting in Nashik: Legal Online Will Making Guide",
        description:
          "Create a valid Will in Nashik with legal consultation. Clear guidance on agro-industrial assets, IGR Maharashtra registration, and NMC flat succession.",
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
          caption: "Legal Will Drafting and Property Succession in Nashik Maharashtra",
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
            name: "Nashik",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Nashik - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, IGR Maharashtra e-Stepin registration, and doorstep execution support across Nashik, Panchavati, CIDCO, and Nashik Road.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nashik",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Nashik" },
          { "@type": "City", name: "Gangapur Road" },
          { "@type": "City", name: "College Road" },
          { "@type": "City", name: "Mahatma Nagar" },
          { "@type": "City", name: "CIDCO" },
          { "@type": "City", name: "Panchavati" },
          { "@type": "City", name: "Nashik Road" },
          { "@type": "City", name: "Indira Nagar" },
          { "@type": "City", name: "Govind Nagar" },
          { "@type": "City", name: "Satpur" },
          { "@type": "City", name: "Ambad" },
          { "@type": "City", name: "Anandwalli" },
          { "@type": "City", name: "Dindori" },
          { "@type": "City", name: "Niphad" },
          { "@type": "City", name: "Sinnar" },
          { "@type": "City", name: "Trimbakeshwar" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Nashik Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Nashik Residents",
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
                name: "Complete Nashik Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Nashik",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Nashik.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Nashik real estate including NMC apartments, cooperative society flats, Dindori or Niphad agricultural land, and financial investments. Designate beneficiaries and an executor.",
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
            name: "Book IGR Maharashtra e-Stepin Slot",
            text: "Schedule your registration appointment on the IGR Maharashtra portal for your relevant Nashik SRO and remit the flat ₹100 registration fee via GRAS.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Nashik SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: NASHIK_FAQS.map((item) => ({
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
      <NashikLocationClient faqs={NASHIK_FAQS} />
      <Footer />
    </>
  );
}
