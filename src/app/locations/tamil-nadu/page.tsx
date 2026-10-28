import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TamilNaduLocationClient from "./TamilNaduLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Tamil Nadu: Registration & Probate Law",
  },
  description:
    "Draft your Will in Tamil Nadu with advocate help. Clear guidance on Madras High Court probate rules, TNREGINET registration, and Patta name.",
  keywords: [
    "will drafting in tamil nadu",
    "will registration tnreginet",
    "madras high court probate will",
    "tamil nilam patta transfer registered will",
    "estate lawyer chennai",
    "online will tamil nadu",
    "advocate for will drafting chennai",
    "tnreginet will token appointment",
    "greater chennai corporation property mutation will",
    "coimbatore will drafting lawyer",
    "madurai will registration sro",
    "tiruchirappalli succession planning advocate",
    "salem estate lawyer will",
    "tiruppur textile business will",
    "section 31 registration act home visit tamil nadu",
    "is probate mandatory in tamil nadu",
    "section 213 indian succession act chennai",
    "tamil nadu stamp act will exemption",
    "eservices tn gov in patta chitta transfer",
    "ama legal solutions tamil nadu will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/tamil-nadu",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/tamil-nadu",
      "x-default": "https://www.willdrafting.in/locations/tamil-nadu",
    },
  },
  openGraph: {
    title: "Will Drafting in Tamil Nadu: Registration & Probate Law",
    description:
      "Draft your Will in Tamil Nadu with advocate help. Clear guidance on Madras High Court probate rules, TNREGINET registration, and Patta name.",
    url: "https://www.willdrafting.in/locations/tamil-nadu",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-tamil-nadu-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Tamil Nadu: Registration & Probate Law",
    description:
      "Draft your Will in Tamil Nadu with advocate help. Clear guidance on Madras High Court probate rules, TNREGINET registration, and Patta name.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-tamil-nadu-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TAMIL_NADU_FAQS = [
  {
    q: "Is Will registration mandatory in Tamil Nadu?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Tamil Nadu. An unregistered Will signed on plain white paper before two independent witnesses is legally valid. However, registering your Will at a Tamil Nadu Sub-Registrar Office enters it into permanent Book III government custody. This prevents fraudulent challenges and accelerates Patta name changes on the Tamil Nilam portal.",
  },
  {
    q: "Is probate compulsory for a Will in Tamil Nadu?",
    a: "It depends on where the property is located. Under Section 213 of the Indian Succession Act, probate is compulsory only for properties situated within Chennai municipal limits (the ordinary original civil jurisdiction of the Madras High Court). Across the rest of Tamil Nadu (including Coimbatore, Madurai, Trichy, and Salem), probate is strictly optional.",
  },
  {
    q: "What is the government fee for Will registration on TNREGINET?",
    a: "Wills are completely exempt from stamp duty across Tamil Nadu under the Tamil Nadu Stamp Act. At the Sub-Registrar Office, you only pay a flat statutory registration fee of ₹100 plus nominal computer scanning charges of ₹100. There are no percentage charges based on the market value of your assets.",
  },
  {
    q: "How does a registered Will help in Tamil Nilam Patta transfer?",
    a: "After the testator's demise, the beneficiary applies for Patta name change through the Tamil Nilam portal (eservices.tn.gov.in) or an e-Sevai center. A registered Will provides undeniable proof of testamentary bequest. The Zonal Deputy Tahsildar accepts the certified Book III copy to update the Patta, Chitta, and Town Survey Land Register (TSLR) without civil court succession disputes.",
  },
  {
    q: "How do I book an online Will registration token on TNREGINET?",
    a: "You create an account on the Commercial Taxes and Registration Department portal (tnreginet.gov.in). Select your jurisdictional Sub-Registrar Office under the 'Initiate Registration' menu, enter the testator and witness KYC details, and schedule a token appointment. You pay the ₹100 registration fee online or generate an e-Challan.",
  },
  {
    q: "Can senior citizens in Tamil Nadu register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens or bedridden individuals can request a home visit. A registered MBBS doctor issues a medical fitness certificate confirming the testator has testamentary capacity but cannot travel. The Sub-Registrar attends your home with portable biometric scanning equipment.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Tamil Nadu SROs?",
    a: "Any two adult individuals of sound mind with valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property under the Will. Family doctors, trusted family friends, or long-time neighbors are ideal.",
  },
  {
    q: "How does a Will handle Greater Chennai Corporation (GCC) flat mutation?",
    a: "Greater Chennai Corporation requires clear proof of title before mutating property tax records. If the apartment lies within Chennai city limits, a probated Will or registered Will with legal heir concurrence ensures immediate name transfer on the GCC property tax portal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Tamil Nadu properties?",
    a: "Yes. Many Tamilians residing in Singapore, Malaysia, USA, UAE, and the UK own properties in Chennai, Coimbatore, or Madurai. NRIs can draft an Indian Will online, sign it before two adult witnesses abroad, and have it notarized or apostilled, or register it before a Tamil Nadu Sub-Registrar during their visit to India.",
  },
  {
    q: "Can ancestral agricultural land in Tamil Nadu be bequeathed in a Will?",
    a: "A person can bequeath only their individual separate share in ancestral Hindu Undivided Family (HUF) property under Section 30 of the Hindu Succession Act, 1956. Self-acquired agricultural lands can be bequeathed 100% according to the testator's wishes without any restriction.",
  },
];

export default function TamilNaduLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/tamil-nadu";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-tamil-nadu.jpg";

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
        name: "Will Drafting in Tamil Nadu: Registration & Probate Law",
        description:
          "Draft your Will in Tamil Nadu with lawyer help. Clear guidance on Madras High Court probate rules, TNREGINET filing, and Patta name.",
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
          caption: "Legal Will Drafting and Property Succession in Tamil Nadu",
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
            name: "Tamil Nadu",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Tamil Nadu - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, TNREGINET token booking, Madras High Court probate counsel, and doorstep signing support.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Tamil Nadu" },
          { "@type": "City", name: "Chennai" },
          { "@type": "City", name: "Coimbatore" },
          { "@type": "City", name: "Madurai" },
          { "@type": "City", name: "Tiruchirappalli" },
          { "@type": "City", name: "Salem" },
          { "@type": "City", name: "Tiruppur" },
          { "@type": "City", name: "Erode" },
          { "@type": "City", name: "Vellore" },
          { "@type": "City", name: "Tirunelveli" },
          { "@type": "City", name: "Thoothukudi" },
          { "@type": "City", name: "Thanjavur" },
          { "@type": "City", name: "Dindigul" },
          { "@type": "City", name: "Kanchipuram" },
          { "@type": "City", name: "Chengalpattu" },
          { "@type": "City", name: "Hosur" },
          { "@type": "City", name: "Nagercoil" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tamil Nadu Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Tamil Nadu Residents",
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
                name: "Complete Tamil Nadu Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Tamil Nadu",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Tamil Nadu.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Tamil Nadu real estate including GCC flats, CMDA plots, Tamil Nilam farm land, and financial investments. Designate heirs and an executor.",
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
            name: "Book TNREGINET Appointment Token",
            text: "Schedule your filing appointment on the TNREGINET portal (tnreginet.gov.in) for your relevant SRO and remit the flat ₹100 filing fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Tamil Nadu SRO",
            text: "Visit the SRO office with both witnesses for verbal witness signing, photo capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: TAMIL_NADU_FAQS.map((item) => ({
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
      <TamilNaduLocationClient faqs={TAMIL_NADU_FAQS} />
      <Footer />
    </>
  );
}
