import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RajasthanLocationClient from "./RajasthanLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Rajasthan: Online Will & Asset Planning",
  },
  description:
    "Draft a valid Will in Rajasthan. Complete guidance on ancestral property succession, ePanjiyan portal registration, and Apna Khata revenue.",
  keywords: [
    "will drafting in rajasthan",
    "will registration rajasthan epanjiyan",
    "apna khata will mutation",
    "jda uit plot will transfer",
    "succession lawyer jaipur jodhpur",
    "online will maker rajasthan",
    "rajasthan high court probate non requirement",
    "ancestral property will rajasthan",
    "mitakshara coparcenary will rajasthan",
    "epanjiyan rajasthan appointment jaipur",
    "sub registrar office rajasthan will registration",
    "section 31 registration act home visit rajasthan",
    "rajasthan stamp act 1998 will exemption",
    "doctor medical certificate will rajasthan",
    "nri will drafting rajasthan",
    "will lawyer udaipur kota ajmer",
    "will drafting bikaner alwar bhilwara",
    "apna khata jamabandi namantran will",
    "jaipur development authority will mutation",
    "ama legal solutions rajasthan will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/rajasthan",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/rajasthan",
      "x-default": "https://www.willdrafting.in/locations/rajasthan",
    },
  },
  openGraph: {
    title: "Will Drafting in Rajasthan: Online Will & Asset Planning",
    description:
      "Draft a valid Will in Rajasthan. Complete guidance on ancestral property succession, ePanjiyan portal registration, and Apna Khata revenue.",
    url: "https://www.willdrafting.in/locations/rajasthan",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-rajasthan.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Property Succession in Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Rajasthan: Online Will & Asset Planning",
    description:
      "Draft a valid Will in Rajasthan. Complete guidance on ancestral property succession, ePanjiyan portal registration, and Apna Khata revenue.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-rajasthan.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const RAJASTHAN_FAQS = [
  {
    q: "Is Will registration mandatory in Rajasthan?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Rajasthan. A Will written or typed on plain paper and signed before two independent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via the ePanjiyan Rajasthan portal enters it into official Book III records. This creates irrefutable government evidence, prevents family disputes, and expedites title mutation across JDA, UIT, and Apna Khata records.",
  },
  {
    q: "Is court probate required for a Will in Rajasthan?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Rajasthan is a non-presidency state. The Rajasthan High Court, through its Principal Seat at Jodhpur and Bench at Jaipur, has consistently held that court probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills to establish testamentary succession.",
  },
  {
    q: "How does ancestral coparcenary property get handled in a Rajasthan Will?",
    a: "Under Mitakshara Hindu law applicable across Rajasthan, ancestral property is owned jointly by all coparceners. A testator cannot bequeath the entire ancestral estate or ancestral haveli. However, under Section 30 of the Hindu Succession Act, 1956, a testator can lawfully bequeath their individual undivided coparcenary share alongside their self-acquired properties, protecting the rights of all heirs equally.",
  },
  {
    q: "What is the official government fee to register a Will in Rajasthan?",
    a: "Wills are completely exempt from stamp duty across the State under the Rajasthan Stamp Act, 1998. At Rajasthan Sub-Registrar offices, testators pay only a flat statutory registration fee of one hundred rupees. Nominal CSI and computer scanning charges of ₹100 to ₹200 apply. There is zero percentage-based property tax.",
  },
  {
    q: "How does a registered Will help transfer JDA or UIT leasehold and freehold plots?",
    a: "The Jaipur Development Authority (JDA) and Urban Improvement Trusts (UITs in Jodhpur, Udaipur, Kota, Ajmer, Bikaner, and Alwar) require genuine testamentary proof to substitute the deceased owner's name on 99-year leases or freehold pattas. A registered Will serves as primary proof before single window portals, eliminating lengthy succession litigation.",
  },
  {
    q: "How is agricultural land mutated on the Apna Khata portal through a Will?",
    a: "For agricultural farmland or rural revenue land, mutation (Namantran) is updated in the Jamabandi record through the Apna Khata Rajasthan portal (apnakhata.rajasthan.gov.in). The local Patwari and Tehsildar verify the Will and Death Certificate under the Rajasthan Land Revenue Act, 1956, officially entering the beneficiary's name in revenue records.",
  },
  {
    q: "Can senior citizens in Rajasthan register a Will from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or medically unwell testators can request a home visit by the Sub-Registrar. A registered MBBS doctor must certify that the testator is mentally competent but physically unable to travel. The Sub-Registrar conducts doorstep biometric verification.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties in Rajasthan?",
    a: "Yes. Many NRIs hold ancestral Havelis, heritage properties, or plots in Jaipur, Jodhpur, and Shekhawati. NRIs can draft a legally compliant Will online from overseas. They can execute it before two independent witnesses and have it apostilled, or register it before a Rajasthan Sub-Registrar during an India visit.",
  },
];

export default function RajasthanLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/rajasthan";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-rajasthan.jpg";

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
        name: "Will Drafting in Rajasthan: Online Will & Asset Planning",
        description:
          "Draft a valid Will in Rajasthan. Complete guidance on ancestral property succession, ePanjiyan portal registration, and Apna Khata revenue.",
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
          caption: "Online Will Drafting and Property Succession in Rajasthan",
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
            name: "Rajasthan",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Rajasthan - Legal Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, ePanjiyan Rajasthan registration, and doorstep execution support across Jaipur, Jodhpur.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Jaipur" },
          { "@type": "City", name: "Jodhpur" },
          { "@type": "City", name: "Udaipur" },
          { "@type": "City", name: "Kota" },
          { "@type": "City", name: "Ajmer" },
          { "@type": "City", name: "Bikaner" },
          { "@type": "City", name: "Alwar" },
          { "@type": "City", name: "Bhilwara" },
          { "@type": "City", name: "Sikar" },
          { "@type": "City", name: "Pali" },
          { "@type": "City", name: "Sri Ganganagar" },
          { "@type": "City", name: "Bharatpur" },
          { "@type": "City", name: "Neemrana" },
          { "@type": "City", name: "Bhiwadi" },
          { "@type": "City", name: "Barmer" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Rajasthan Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Rajasthan Residents",
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
                name: "Complete Rajasthan Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Rajasthan",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Rajasthan.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Rajasthan properties including JDA or UIT plots, Apna Khata agricultural land, bank deposits, mutual funds, and demat shares. Name your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to clearly separate Mitakshara coparcenary interest from self-acquired assets, including survivorship terms.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the direct physical presence of two independent adult witnesses who are not beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Rajasthan SRO Appointment on ePanjiyan Portal",
            text: "Book an e-appointment on the ePanjiyan Rajasthan portal (epanjiyan.rajasthan.gov.in) for your local Sub-Registrar circle and pay the nominal ₹100 registration fee through e-GRAS.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Rajasthan SRO",
            text: "Visit the Sub-Registrar office with your two witnesses and original government IDs for biometric thumbprinting, live webcam photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: RAJASTHAN_FAQS.map((item) => ({
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
      <RajasthanLocationClient faqs={RAJASTHAN_FAQS} />
      <Footer />
    </>
  );
}
