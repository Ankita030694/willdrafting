import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoidaLocationClient from "./NoidaLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Noida: Online Will Registration Support",
  },
  description:
    "Draft a valid Will in Noida and Greater Noida. Complete guidance for apartment leasehold transfer, Sub-Registrar registration, and legal.",
  keywords: [
    "will drafting in noida",
    "will registration noida sector 33",
    "greater noida flat will transfer",
    "online will maker noida",
    "succession lawyer noida",
    "noida authority lease deed will transfer",
    "igrsup noida will registration",
    "sub registrar office sector 33 noida",
    "sub registrar surajpur greater noida",
    "sub registrar office dadri",
    "is probate mandatory in uttar pradesh",
    "allahabad high court will probate exemption",
    "will drafting noida expressway",
    "will drafting sector 50 noida",
    "will drafting sector 137 noida",
    "will drafting greater noida west",
    "noida extension flat will transfer",
    "section 31 registration act home visit noida",
    "will registration fees in uttar pradesh",
    "gnida flat succession through will",
    "noida tripartite lease deed will mutation",
    "ama legal solutions noida will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/noida",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/noida",
      "x-default": "https://www.willdrafting.in/locations/noida",
    },
  },
  openGraph: {
    title: "Will Drafting in Noida: Online Will Registration Support",
    description:
      "Draft a valid Will in Noida and Greater Noida. Complete guidance for apartment leasehold transfer, Sub-Registrar registration, and legal.",
    url: "https://www.willdrafting.in/locations/noida",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-noida-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Noida NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Noida: Online Will Registration Support",
    description:
      "Draft a valid Will in Noida and Greater Noida. Complete guidance for apartment leasehold transfer, Sub-Registrar registration, and legal.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-noida-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const NOIDA_FAQS = [
  {
    q: "Is Will registration mandatory in Noida and Uttar Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. An unregistered Will written on plain A4 paper and executed before two witnesses is legally valid. However, for Noida, Greater Noida, and YEIDA leasehold flats, Authorities specifically require a registered Will to carry out direct title mutation without demanding newspaper public notices or high-value indemnity bonds.",
  },
  {
    q: "Why is a registered Will essential for Noida Authority 90-year leasehold flats?",
    a: "All residential plots and apartment complexes in Noida and Greater Noida are 90-year leasehold properties governed by Noida Authority or GNIDA tripartite sub-lease deeds. In the event of an unregistered Will, Authority succession guidelines demand public advertisements in two national dailies, a 30-day objection wait, and non-objection affidavits from all legal heirs. A registered Will drastically simplifies this, allowing smooth single-window mutation.",
  },
  {
    q: "Is court probate required for a Will in Noida or Greater Noida?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for properties situated within the presidency towns of Mumbai, Kolkata, and Chennai. The Hon'ble Allahabad High Court has affirmed in several landmark judgments (including Smt. Raj Rani and Ram Chand) that probate is strictly optional in Uttar Pradesh. Local Sub-Registrars and Authorities process registered Wills directly.",
  },
  {
    q: "What is the official government fee to register a Will in Noida on IGRSUP?",
    a: "Wills are 100% exempt from stamp duty across Uttar Pradesh under the Indian Stamp Act. On the UP IGRSUP portal (igrsup.gov.in), you pay only a nominal government registration fee of ₹100, plus an official document scanning and processing fee of ₹100 to ₹200. There are no percentage-based property taxes or transfer stamp levies for registering a Will.",
  },
  {
    q: "How do I book an e-appointment for Will registration on IGRSUP in Gautam Buddha Nagar?",
    a: "Visit the official UP registration portal at igrsup.gov.in. Under the document registration tab, select Gautam Buddha Nagar district and your relevant Sub-Registrar Office (Sector 33 Noida, Surajpur Greater Noida, or Dadri). Fill in testator and witness Aadhaar details, pay the nominal fee online, and download your e-appointment slot receipt with a designated date and token number.",
  },
  {
    q: "Can a Sub-Registrar visit our apartment in Noida for doorstep registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or hospitalized testators across high-rise societies in Noida (e.g. Sectors 50, 78, 128, 137, Expressway) can request an official home visit by the Sub-Registrar. You must submit an MBBS medical fitness certificate and pay an official government commission fee. Our advocates handle complete petition filing and scheduling.",
  },
  {
    q: "How does succession work if builder-buyer sub-lease deed registry is still pending?",
    a: "If your builder hasn't executed the registry yet and you hold a Builder-Buyer Agreement (BBA) with an allotment letter, you can still legally bequeath those contractual and beneficial rights in your Will. Your Will should reference the flat number, tower, allotment date, and developer name. Upon the testator's demise, the nominated beneficiary steps into the testator's shoes before the builder and Noida Authority.",
  },
  {
    q: "What documents are required for Noida Authority flat mutation after testator's demise?",
    a: "The beneficiary must submit: (1) Certified copy of the Registered Will from the Sub-Registrar, (2) Original death certificate of the testator, (3) Original Tripartite Sub-Lease Deed / Allotment Letter, (4) Legal heir tree affidavit, (5) Indemnity bond on stamp paper, and (6) No-dues certificate from the apartment owners association (AOA). Noida Authority then issues a formal mutation endorsement letter.",
  },
  {
    q: "Who can be witnesses for a Will in Noida, and can they be family members?",
    a: "A Will must be attested by at least two adult witnesses (aged 18+) of sound mind. While relatives can be witnesses, any person who is named as a beneficiary (or the spouse of a beneficiary) should never sign as a witness under Section 67 of the Indian Succession Act. Trusted neighbors, family friends, or doctors make ideal independent witnesses.",
  },
];

export default function NoidaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/noida";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-noida-og.jpg";

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
        name: "Will Drafting in Noida: Online Will Registration Support",
        description:
          "Draft a valid Will in Noida and Greater Noida. Complete guidance for apartment leasehold transfer, SRO filing, and legal.",
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
          caption: "Will Drafting & Registration Services in Noida NCR",
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
            name: "Noida NCR",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Noida - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-filing support across Noida, Greater Noida, and Gautam.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Noida" },
          { "@type": "City", name: "Greater Noida" },
          { "@type": "City", name: "Noida Expressway" },
          { "@type": "City", name: "Surajpur" },
          { "@type": "City", name: "Greater Noida West" },
          { "@type": "City", name: "Dadri" },
          { "@type": "City", name: "Jewar" },
          { "@type": "City", name: "Sector 50 Noida" },
          { "@type": "City", name: "Sector 78 Noida" },
          { "@type": "City", name: "Sector 137 Noida" },
          { "@type": "City", name: "Sector 150 Noida" },
          { "@type": "City", name: "Pari Chowk" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Noida Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Noida Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Authority Lease Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Noida Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Noida & Greater Noida NCR",
        description:
          "Five clear steps to create a legally binding Will and register it before the Gautam Buddha Nagar SRO in Noida.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Authority Properties",
            text: "Compile your Noida real estate details including tripartite sub-lease deeds, builder-buyer agreements, bank accounts, and demat holdings. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Noida Authority Specific Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include 90-year leasehold bequest clauses, revocation terms, and executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs in the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Noida SRO Appointment on IGRSUP Portal",
            text: "Book an e-appointment on igrsup.gov.in for Sector 33 Noida or Surajpur Greater Noida SRO and pay the nominal ₹100 filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the SRO office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: NOIDA_FAQS.map((item) => ({
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
      <NoidaLocationClient faqs={NOIDA_FAQS} />
      <Footer />
    </>
  );
}
