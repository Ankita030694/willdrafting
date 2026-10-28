import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JammuAndKashmirLocationClient from "./JammuAndKashmirLocationClient";

// Title: Exactly 51 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 146 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Jammu & Kashmir: Online Will Guide",
  },
  description:
    "Draft a valid Will in Jammu and Kashmir. Guidance on post-2019 land laws, NGDRS J&K registration, and apple orchard or hotel property succession.",
  keywords: [
    "will drafting in jammu and kashmir",
    "will registration ngdrs jk",
    "jk property succession will",
    "online will srinagar jammu",
    "high court of j&k and ladakh",
    "will drafting srinagar",
    "will drafting jammu",
    "will drafting anantnag",
    "will drafting baramulla",
    "will drafting udhampur",
    "will drafting kathua",
    "apple orchard succession will kashmir",
    "dal lake hotel property succession",
    "ngdrs jk appointment booking",
    "section 31 registration act home visit jammu kashmir",
    "jk land revenue act will mutation intiqal",
    "is probate mandatory in jammu and kashmir",
    "high court of jk and ladakh probate exemption",
    "smc jammu municipal corporation mutation will",
    "ama legal solutions jammu and kashmir will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/jammu-and-kashmir",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/jammu-and-kashmir",
      "x-default": "https://www.willdrafting.in/locations/jammu-and-kashmir",
    },
  },
  openGraph: {
    title: "Will Drafting in Jammu & Kashmir: Online Will Guide",
    description:
      "Draft a valid Will in Jammu and Kashmir. Guidance on post-2019 land laws, NGDRS J&K registration, and apple orchard or hotel property succession.",
    url: "https://www.willdrafting.in/locations/jammu-and-kashmir",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-jammu-and-kashmir-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Jammu and Kashmir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Jammu & Kashmir: Online Will Guide",
    description:
      "Draft a valid Will in Jammu and Kashmir. Guidance on post-2019 land laws, NGDRS J&K registration, and apple orchard or hotel property succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-jammu-and-kashmir-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const JK_FAQS = [
  {
    q: "Is Will registration mandatory in Jammu and Kashmir?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Jammu and Kashmir. A Will written on plain white paper is legally valid if signed by the testator in the presence of two independent witnesses. However, registering your Will via the NGDRS J&K portal and submitting it before the Sub-Registrar places it in permanent Book III custody. This prevents fraudulent challenges and ensures fast mutation with municipal bodies and revenue authorities.",
  },
  {
    q: "How did the J&K Reorganisation Act 2019 impact Will drafting?",
    a: "The Jammu and Kashmir Reorganisation Act, 2019 made central legislations directly applicable across the Union Territory. The Indian Succession Act, 1925 and the central Registration Act, 1908 now govern testamentary succession in J&K, standardizing execution formalities, witness rules, and revocation procedures under nationwide legal precedents.",
  },
  {
    q: "Is probate compulsory for a Will in Jammu and Kashmir?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is mandatory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. The High Court of Jammu & Kashmir and Ladakh has held that probate is non-compulsory in J&K for Hindu, Sikh, Jain, Buddhist, and Christian testators, permitting direct property mutation with a registered Will.",
  },
  {
    q: "How does Muslim Personal Law (Shariat) govern Will making in J&K?",
    a: "For Muslim testators in Jammu and Kashmir, testamentary succession is governed by Muslim Personal Law (Shariat). A testator can bequeath up to one-third of their net estate to non-heirs without the consent of lawful legal heirs. Any bequest exceeding one-third or made in favor of an existing legal heir requires the explicit consent of all remaining legal heirs after the testator's demise.",
  },
  {
    q: "How are apple orchards and agricultural lands in Kashmir transferred via Will?",
    a: "Agricultural lands, saffron tracts, and apple or walnut orchards in districts such as Baramulla, Shopian, and Pulwama are governed by the J&K Land Revenue Act and Agrarian Reforms regulations. Upon the testator's death, the beneficiary presents the registered Will and death certificate to the local Patwari and Tehsildar. A formal revenue mutation (Intiqal) entry is recorded, updating the Jamabandi and Khasra Girdawari records.",
  },
  {
    q: "How do I book an NGDRS J&K appointment for Will registration?",
    a: "Appointments are booked through the National Generic Document Registration System (NGDRS) J&K portal at ngdrs.jk.gov.in. You enter testator and witness KYC particulars, upload the draft Will, generate the e-Challan for statutory registration and scanning fees, and reserve a confirmed time slot at your designated Sub-Registrar Office in Srinagar, Jammu, or other districts.",
  },
  {
    q: "Can senior citizens in Jammu & Kashmir register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep SRO visit. Upon submitting a medical certificate from an MBBS doctor certifying inability to travel, the Sub-Registrar visits your home or healthcare facility in Srinagar or Jammu with portable biometric equipment.",
  },
  {
    q: "How does a registered Will help with SMC or JMC property mutation?",
    a: "The Srinagar Municipal Corporation (SMC) and Jammu Municipal Corporation (JMC), as well as development authorities (SDA and JDA), require conclusive legal proof before mutating ownership on municipal property tax registers. A registered Will under Book III provides irrefutable testamentary evidence, eliminating protracted civil court succession suits or disputes over legal heir certificates.",
  },
  {
    q: "Who can serve as valid attesting witnesses at J&K Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind carrying valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or legacy under the Will. Family doctors, trusted neighbors, or colleagues who know the testator well are ideal witnesses.",
  },
  {
    q: "Can NRIs and Kashmiri diaspora overseas draft a Will for J&K properties?",
    a: "Yes. Non-Resident Indians and diaspora members residing abroad who own houses, commercial plots, or orchards in Jammu and Kashmir can draft an India-compliant Will online. They can execute it before two witnesses abroad and have it notarized or apostilled, or register it before an SRO in Srinagar or Jammu during a visit to India.",
  },
];

export default function JammuAndKashmirLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/jammu-and-kashmir";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-jammu-and-kashmir.jpg";

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
        name: "Will Drafting in Jammu & Kashmir: Online Will Guide",
        description:
          "Draft a valid Will in Jammu and Kashmir. Guidance on post-2019 land laws, NGDRS J&K registration, and apple orchard or hotel property succession.",
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
          caption: "Legal Will Drafting and Property Succession in Jammu and Kashmir",
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
            name: "Jammu and Kashmir",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Jammu & Kashmir - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS J&K registration scheduling, and doorstep execution support across Srinagar, Jammu.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Srinagar & Jammu",
          addressRegion: "Jammu and Kashmir",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Srinagar" },
          { "@type": "City", name: "Jammu" },
          { "@type": "City", name: "Anantnag" },
          { "@type": "City", name: "Baramulla" },
          { "@type": "City", name: "Udhampur" },
          { "@type": "City", name: "Kathua" },
          { "@type": "City", name: "Sopore" },
          { "@type": "City", name: "Pulwama" },
          { "@type": "City", name: "Shopian" },
          { "@type": "City", name: "Budgam" },
          { "@type": "City", name: "Ganderbal" },
          { "@type": "City", name: "Kupwara" },
          { "@type": "City", name: "Rajouri" },
          { "@type": "City", name: "Poonch" },
          { "@type": "City", name: "Samba" },
          { "@type": "City", name: "Reasi" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Jammu & Kashmir Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for J&K Residents",
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
                name: "Complete J&K Sub-Registrar Will Registration & Home Visit Assistance",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Jammu and Kashmir",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Jammu and Kashmir.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "Document your assets across J&K including residential houses, Dal Lake commercial hotels or houseboats, apple and walnut orchards, bank accounts, and investments. Nominate your executor and legal beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Structure your Will using verified statutory clauses under the Indian Succession Act 1925 or Muslim Personal Law, designating clear share allotments, survivorship provisions, and revoking any prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the simultaneous presence of two independent adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book NGDRS J&K Registration Slot",
            text: "Schedule an online registration appointment on the NGDRS J&K portal (ngdrs.jk.gov.in) for your local Sub-Registrar Office and pay the requisite registration fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Sub-Registrar Office",
            text: "Attend the Sub-Registrar counter with both witnesses for biometric thumbprinting, identity verification, and photographic recording to place the Will in permanent Book III custody.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: JK_FAQS.map((item) => ({
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
      <JammuAndKashmirLocationClient faqs={JK_FAQS} />
      <Footer />
    </>
  );
}
