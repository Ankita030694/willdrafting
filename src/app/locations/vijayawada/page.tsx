import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VijayawadaLocationClient from "./VijayawadaLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Vijayawada: Registration & Probate Guide",
  },
  description:
    "Draft your Will in Vijayawada with advocate assistance. Smooth AP IGRS registration guidance, commercial asset transfer, and VMC mutation assistance.",
  keywords: [
    "will drafting in vijayawada",
    "will registration ap igrs vijayawada",
    "apcrda plot will transfer",
    "commercial asset succession vijayawada",
    "succession advocate krishna",
    "vmc property mutation will",
    "sub registrar office governorpet appointment",
    "online will maker andhra pradesh",
    "is probate mandatory in vijayawada",
    "section 213 indian succession act andhra pradesh",
    "doorstep will registration vijayawada section 31",
    "doctor medical certificate will vijayawada",
    "will registration patamata sro",
    "will drafting gunadala vijayawada",
    "auto nagar business succession will",
    "krishna delta farm land will transfer",
    "ap igrs will registration fee",
    "ward sachivalayam property mutation will",
    "amaravati plot inheritance succession",
    "ama legal solutions vijayawada will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/vijayawada",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/vijayawada",
      "x-default": "https://www.willdrafting.in/locations/vijayawada",
    },
  },
  openGraph: {
    title: "Will Drafting in Vijayawada: Registration & Probate Guide",
    description:
      "Draft your Will in Vijayawada with advocate assistance. Smooth AP IGRS registration guidance, commercial asset transfer, and VMC mutation assistance.",
    url: "https://www.willdrafting.in/locations/vijayawada",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-vijayawada-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Asset Protection in Vijayawada Andhra Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Vijayawada: Registration & Probate Guide",
    description:
      "Draft your Will in Vijayawada with advocate assistance. Smooth AP IGRS registration guidance, commercial asset transfer, and VMC mutation assistance.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-vijayawada-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const VIJAYAWADA_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Vijayawada?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidential territories of Mumbai, Kolkata, and Chennai. Vijayawada is a non-presidency town governed under the High Court of Andhra Pradesh at Amaravati. The Supreme Court of India in Clarence Pais v. Union of India and multiple Andhra Pradesh High Court judgments have established that probate is strictly optional for Hindu, Sikh, Jain, and Buddhist Wills. A registered Will provides direct legal authority and allows smooth mutation in VMC and APCRDA records without filing expensive court probate petitions.",
  },
  {
    q: "Is Will registration compulsory under Andhra Pradesh IGRS rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Andhra Pradesh. A Will written on plain paper signed by the testator before two competent witnesses is legally valid. However, registering your Will at the local Sub-Registrar Office through the AP IGRS portal (registration.ap.gov.in) creates a tamper-proof official government record in Book III. This protects your family from fabricated claims, disputes by estranged relatives, and ensures immediate VMC property tax mutation.",
  },
  {
    q: "How do I transfer an APCRDA plot or VMC property after the testator passes away?",
    a: "Beneficiaries must submit the certified copy of the registered Will, original death certificate, Family Member Certificate issued by the Tahsildar or local Ward Secretariat, and prior registered title deeds. For APCRDA (Andhra Pradesh Capital Region Development Authority) residential or commercial plots, you apply for title transmission through the APCRDA land administration wing. For Vijayawada Municipal Corporation (VMC) flats and independent homes, you submit an online mutation application through the Ward Sachivalayam portal for direct assessment name transfer.",
  },
  {
    q: "What is the official government fee to register a Will in Vijayawada?",
    a: "Wills are 100% exempt from stamp duty across India under the Indian Stamp Act, 1899. At Vijayawada Sub-Registrar offices under the Registration and Stamps Department of Andhra Pradesh (AP IGRS), you only pay a flat statutory registration fee of ₹1,000 for Book III registration, plus nominal computer user charges of approximately ₹100 to ₹200. You do not pay any percentage-based property market value stamp duty.",
  },
  {
    q: "How can business owners in Governorpet and Auto Nagar structure succession?",
    a: "Vijayawada is the commercial capital of Andhra Pradesh, with bustling wholesale trading hubs in Governorpet, One Town, and manufacturing units in Jawahar Auto Nagar. A comprehensive Will allows business founders to clearly allocate commercial shop freeholds, partnership equity shares, machinery, trade receivables, current account authorizations, and warehouse leases. It avoids bitter inter-generational disputes and ensures business continuity without operational paralysis.",
  },
  {
    q: "Can an Andhra Pradesh Sub-Registrar visit home for senior citizens under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell citizens across Vijayawada can request a home or hospital visit by the jurisdictional Sub-Registrar. A registered medical practitioner (MBBS doctor) must provide a mental fitness certificate certifying sound disposing mind. An official government commission fee is paid through the CFMS portal. Our legal team assists with complete medical paperwork and official SRO coordination.",
  },
  {
    q: "How do I book an appointment on the AP IGRS portal for Will registration in Vijayawada?",
    a: "Appointments are scheduled online through the Andhra Pradesh Registration portal (registration.ap.gov.in). You log in to your citizen portal account, select Document Entry and Slot Booking, choose Book III (Will), enter testator and two witnesses' details, select your local Vijayawada SRO (such as Governorpet, Patamata, or Gunadala), generate the CFMS challan for fee payment, and download your confirmed appointment token slip.",
  },
  {
    q: "Who can be witnesses to a Will in Vijayawada, and must they visit the SRO?",
    a: "Under Section 63 of the Indian Succession Act, at least two adult witnesses of sound mind must attest the Will. Crucially, witnesses must not be beneficiaries receiving any property under the Will, nor spouses of beneficiaries (Section 67). Both witnesses must physically accompany the testator to the Vijayawada Sub-Registrar Office with original Aadhaar cards and biometric ID for verification.",
  },
  {
    q: "How do Ward and Village Sachivalayams assist in property mutation after a Will?",
    a: "Andhra Pradesh operates a decentralized Ward and Village Secretariat (Ward Sachivalayam) administrative framework. After obtaining the registered Will and death certificate, legal heirs can submit property tax mutation requests at their local Ward Secretariat in Vijayawada. The Ward Revenue Secretary coordinates with the Tahsildar and VMC town planning department, enabling transparent mutation without bureaucratic running.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) from Vijayawada create a Will for their Andhra properties?",
    a: "Yes. Many families in Vijayawada and the Amaravati capital region have family members working in the USA, the UK, Australia, Singapore, or the Gulf. NRIs owning apartments in Benz Circle, agricultural lands in Kankipadu, or commercial assets in Governorpet can draft their Will online. They can execute it abroad before two independent witnesses, get it attested by the nearest Indian Consulate or apostilled, or complete AP IGRS registration during their India visit.",
  },
];

export default function VijayawadaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/vijayawada";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-vijayawada-banner.jpg";

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
        name: "Will Drafting in Vijayawada: Registration & Probate Guide",
        description:
          "Draft your Will in Vijayawada with advocate assistance. Smooth AP IGRS registration guidance, commercial asset transfer, and VMC mutation assistance.",
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
          caption: "Online Will Drafting and Asset Protection in Vijayawada Andhra Pradesh",
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
            name: "Vijayawada",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Vijayawada - Estate Planning, Commercial Succession & AP IGRS Registration",
        description:
          "Professional Will drafting, commercial business estate succession advisory, APCRDA plot inheritance, and AP IGRS Sub-Registrar registration support across Vijayawada and Andhra Pradesh.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vijayawada",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Vijayawada" },
          { "@type": "City", name: "Benz Circle" },
          { "@type": "City", name: "Governorpet" },
          { "@type": "City", name: "Patamata" },
          { "@type": "City", name: "Moghalrajpuram" },
          { "@type": "City", name: "Suryaraopeta" },
          { "@type": "City", name: "Gandhinagar" },
          { "@type": "City", name: "Gunadala" },
          { "@type": "City", name: "Bhavanipuram" },
          { "@type": "City", name: "Gollapudi" },
          { "@type": "City", name: "Vidyadharapuram" },
          { "@type": "City", name: "Kanuru" },
          { "@type": "City", name: "Poranki" },
          { "@type": "City", name: "Penamaluru" },
          { "@type": "City", name: "Kankipadu" },
          { "@type": "City", name: "Gannavaram" },
          { "@type": "City", name: "Jawahar Auto Nagar" },
          { "@type": "City", name: "Enikepadu" },
          { "@type": "City", name: "Ramavarappadu" },
          { "@type": "City", name: "Mangalagiri" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Vijayawada Will Drafting, Commercial Succession & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Vijayawada Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & APCRDA Asset Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Vijayawada Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Vijayawada Andhra Pradesh",
        description:
          "Five straightforward steps to create a legally binding Will and register it before the Sub-Registrar in Vijayawada.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Properties, Commercial Assets, and Beneficiaries",
            text: "Compile your Vijayawada residential flats, APCRDA plots, commercial shops, bank accounts, demat holdings, and agricultural lands. Appoint your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Exact Legal Clauses",
            text: "Draft your Will using our legally verified platform or with a senior advocate to include non-presidency probate clarity, specific commercial bequests, and executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets or ledger paper and sign every page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Vijayawada SRO Slot on AP IGRS",
            text: "Schedule an appointment token on registration.ap.gov.in for your jurisdictional Vijayawada SRO and pay the nominal ₹1,000 registration fee via CFMS challan online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar Office with your two witnesses, original Aadhaar cards, and photographs for biometric thumbprinting, digital photo capture, and Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: VIJAYAWADA_FAQS.map((item) => ({
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
      <VijayawadaLocationClient faqs={VIJAYAWADA_FAQS} />
      <Footer />
    </>
  );
}
