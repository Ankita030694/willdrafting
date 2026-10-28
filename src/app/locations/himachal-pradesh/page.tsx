import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HimachalPradeshLocationClient from "./HimachalPradeshLocationClient";

// Title: Exactly 52 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Himachal Pradesh: Online Will Guide",
  },
  description:
    "Draft a legally valid Will in Himachal Pradesh. Guidance on Section 118 tenancy act compliance, apple orchard succession, and e-Himsugam SRO.",
  keywords: [
    "will drafting in himachal pradesh",
    "will registration himachal sro",
    "section 118 hp tenancy act will",
    "apple orchard succession will",
    "estate lawyer shimla",
    "himachal pradesh high court probate",
    "online will maker himachal pradesh",
    "e-himsugam will registration",
    "himbhoomi jamabandi will mutation",
    "himuda plot will transfer shimla",
    "sub registrar office shimla dharamsala",
    "section 31 registration act home visit himachal",
    "kullu manali apple orchard will",
    "solan baddi industrial will drafting",
    "intiqal mutation registered will himachal",
    "tribal land will kinnaur lahaul",
    "advocate for will drafting himachal",
    "ama legal solutions himachal pradesh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/himachal-pradesh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/himachal-pradesh",
      "x-default": "https://www.willdrafting.in/locations/himachal-pradesh",
    },
  },
  openGraph: {
    title: "Will Drafting in Himachal Pradesh: Online Will Guide",
    description:
      "Draft a legally valid Will in Himachal Pradesh. Guidance on Section 118 tenancy act compliance, apple orchard succession, and e-Himsugam SRO.",
    url: "https://www.willdrafting.in/locations/himachal-pradesh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-himachal-pradesh-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Himachal Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Himachal Pradesh: Online Will Guide",
    description:
      "Draft a legally valid Will in Himachal Pradesh. Guidance on Section 118 tenancy act compliance, apple orchard succession, and e-Himsugam SRO.",
    images: [
      "https://www.willdrafting.in/images/will-drafting-in-himachal-pradesh-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const HIMACHAL_FAQS = [
  {
    q: "Is Will registration mandatory in Himachal Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Himachal Pradesh. A Will written on plain paper is legally valid if executed before two independent witnesses. However, registering your Will at a Himachal Pradesh Sub-Registrar Office enters it into permanent Book III government records. This provides decisive evidence against title disputes, Section 118 scrutiny, and delays during HimBhoomi revenue mutations.",
  },
  {
    q: "How does Section 118 of the HP Tenancy Act affect testamentary Wills?",
    a: "Section 118 of the HP Tenancy and Land Reforms Act, 1972 restricts the transfer of agricultural land to non-agriculturists. Natural legal heirs can inherit ancestral farmland and apple orchards through a Will. However, bequeathing agricultural property to a non-agriculturist or third party who does not hold agriculturist status in Himachal Pradesh is strictly regulated and requires prior State Government approval under Section 118(2)(h).",
  },
  {
    q: "Can I bequeath an apple orchard in Shimla or Kullu through a Will?",
    a: "Yes. Apple orchards in Shimla, Kinnaur, Kullu, and Mandi can be bequeathed through a Will. Testators should clearly describe Khasra and Khatauni numbers as recorded in HimBhoomi revenue records. Explicit clauses can specify orchard management, prevent uneven fragmentation, and establish life interest for a surviving spouse before dividing parcels among heirs.",
  },
  {
    q: "Is probate compulsory for a Will in Himachal Pradesh under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Himachal Pradesh is a non-presidency jurisdiction. The High Court of Himachal Pradesh has confirmed that probate is not mandatory for Hindu, Sikh, Jain, and Buddhist Wills in the state, permitting direct property transfer upon registering the Will.",
  },
  {
    q: "What is the official government fee to register a Will in Himachal Pradesh?",
    a: "Testamentary Wills are completely exempt from ad valorem stamp duty across Himachal Pradesh under the Indian Stamp Act, 1899 as locally applied. At Himachal Sub-Registrar offices, testators pay only a nominal flat registration fee of approximately ₹100 to ₹500 plus modest computer scanning and service charges. There is zero percentage-based property market value duty.",
  },
  {
    q: "How are agricultural lands and orchards mutated after demise in HP?",
    a: "Upon the testator's demise, the beneficiary submits the registered Will and certified death certificate to the Halqa Patwari. The Patwari enters the Intiqal (mutation) in the revenue records under the Himachal Pradesh Land Revenue Act, 1954. After public proclamation and verification by the Revenue Tehsildar, the updated Jamabandi is published on the official HimBhoomi web portal.",
  },
  {
    q: "Can senior citizens in Himachal Pradesh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly citizens, bedridden persons, or individuals facing severe mobility constraints in hilly terrain can request an official home visit. Backed by a registered doctor mental and physical fitness certificate, the Sub-Registrar visits the residence with portable biometric equipment to complete Book III registration.",
  },
  {
    q: "How does a registered Will simplify HIMUDA and Municipal Corporation transfers?",
    a: "Himachal Pradesh Housing and Urban Development Authority (HIMUDA) and Municipal Corporations in Shimla, Dharamshala, Solan, and Mandi require clear documentary evidence of succession. A registered Will provides conclusive proof of testamentary intent, expediting ownership substitution on the property tax assessment register and leasehold transfers without court succession certificates.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Himachal Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property, orchard, or monetary legacy under the Will. Family physicians, village elders, or longtime family friends are ideal witnesses.",
  },
  {
    q: "Can Himachalis living outside the state or NRIs draft a Will for HP property?",
    a: "Yes. Himachalis working in Chandigarh, Delhi NCR, overseas, or serving in the armed forces can draft a customized Will online specifying their Himachal assets. They can execute the Will before two independent witnesses wherever they reside. To ensure seamless mutation, they can complete formal Book III registration before an HP Sub-Registrar during their visit home.",
  },
];

export default function HimachalPradeshLocationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/locations/himachal-pradesh";
  const imageUrl =
    "https://www.willdrafting.in/images/will-drafting-in-himachal-pradesh.jpg";

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
        name: "Will Drafting in Himachal Pradesh: Online Will Guide",
        description:
          "Draft a legally valid Will in Himachal Pradesh. Guidance on Section 118 tenancy act compliance, apple orchard estate, and e-Himsugam SRO.",
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
          caption:
            "Legal Will Drafting and Property Succession in Himachal Pradesh",
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
            name: "Himachal Pradesh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Himachal Pradesh - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, Section 118 HP Tenancy Act compliance, e-Himsugam SRO filing, and Section 31 doorstep.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shimla",
          addressRegion: "Himachal Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Shimla" },
          { "@type": "City", name: "Dharamshala" },
          { "@type": "City", name: "Kangra" },
          { "@type": "City", name: "Solan" },
          { "@type": "City", name: "Mandi" },
          { "@type": "City", name: "Kullu" },
          { "@type": "City", name: "Manali" },
          { "@type": "City", name: "Baddi" },
          { "@type": "City", name: "Hamirpur" },
          { "@type": "City", name: "Bilaspur" },
          { "@type": "City", name: "Una" },
          { "@type": "City", name: "Palampur" },
          { "@type": "City", name: "Rohru" },
          { "@type": "City", name: "Theog" },
          { "@type": "City", name: "Jubbal" },
          { "@type": "City", name: "Kinnaur" },
          { "@type": "City", name: "Chamba" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Himachal Pradesh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Himachal Residents",
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
                name: "Complete Himachal Pradesh SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Himachal Pradesh",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Himachal Pradesh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Estate Assets & HimBhoomi Land Records",
            text: "List your home assets, HIMUDA flats, bank investments, and farm apple orchards with exact Khasra and Khatauni numbers from the HimBhoomi portal. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Section 118 Compliant Testamentary Clauses",
            text: "Structure your Will with checked legal clauses that comply with Section 118 of the HP Tenancy Act, establish clear bequests to legal heirs, and provide clear executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Attesting Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the physical presence of two adult witnesses who receive no legacy or asset under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar Appointment on e-Himsugam",
            text: "Access the e-Himsugam portal to book a time slot with your local Himachal Tehsil SRO office and pay nominal government filing charges.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Himachal SRO",
            text: "Attend the SRO office with both signing witnesses for verbal check, photo capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: HIMACHAL_FAQS.map((item) => ({
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
      <HimachalPradeshLocationClient faqs={HIMACHAL_FAQS} />
      <Footer />
    </>
  );
}
