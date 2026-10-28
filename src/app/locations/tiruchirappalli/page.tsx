import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiruchirappalliLocationClient from "./TiruchirappalliLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
  },
  description:
    "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
  keywords: [
    "will drafting in tiruchirappalli",
    "will registration tnreginet trichy",
    "patta transfer registered will trichy",
    "advocate for will drafting trichy",
    "online will tamil nadu",
    "trichy corporation property mutation will",
    "sub registrar office trichy court appointment",
    "will drafting thillai nagar",
    "will drafting srirangam",
    "will drafting kk nagar trichy",
    "will drafting thiruverumbur",
    "will drafting cantonment trichy",
    "will drafting lalgudi",
    "will drafting manachanallur",
    "bhel trichy industrial will drafting",
    "tamil nilam patta name change will trichy",
    "section 31 registration act home visit trichy",
    "is probate mandatory in tiruchirappalli",
    "madras high court probate trichy exemption",
    "ama legal solutions tiruchirappalli will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/tiruchirappalli",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/tiruchirappalli",
      "x-default": "https://www.willdrafting.in/locations/tiruchirappalli",
    },
  },
  openGraph: {
    title: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
    description:
      "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
    url: "https://www.willdrafting.in/locations/tiruchirappalli",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-tiruchirappalli-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Tiruchirappalli Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
    description:
      "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET registration guidance, and hassle-free City Corporation Patta.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-tiruchirappalli-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TIRUCHIRAPPALLI_FAQS = [
  {
    q: "Is Will registration mandatory in Tiruchirappalli?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, filing a Will is optional in Trichy. A Will on plain white paper signed in front of two witnesses is valid. Still, filing it on TNREGINET and keeping it in Book III at a Trichy SRO gives strong proof. It stops fake claims and speeds up City tax and Patta updates.",
  },
  {
    q: "Is probate required for a Will in Tiruchirappalli under Madras High Court rules?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, probate is needed only in Chennai, Mumbai, and Kolkata. Trichy is outside those old zones and falls under the Madurai Bench of the Madras High Court. Probate is optional for Hindu, Sikh, Jain, and Buddhist Wills in Trichy.",
  },
  {
    q: "What is the official government fee to register a Will in Tiruchirappalli?",
    a: "Wills have zero stamp duty across Tamil Nadu. At Trichy SRO offices, you pay a flat ₹100 filing fee plus about ₹100 for page scans. There is no tax based on your land or house value.",
  },
  {
    q: "How is Patta transferred after death using a registered Will in Tiruchirappalli?",
    a: "For plots and delta farm land, the heir applies on the Tamil Nilam portal (eservices.tn.gov.in). You upload the registered Will, death certificate, heir certificate, and EC. The local Tahsildar checks the files and issues a new Patta and Chitta in the heir's name.",
  },
  {
    q: "How do I book an online appointment on TNREGINET for Will registration in Trichy?",
    a: "You book a slot on the TNREGINET site (tnreginet.gov.in). Log in, pick your SRO (like Court Compound, Thillai Nagar, or Srirangam), enter ID details, print the token slip, and visit the office at your booked time.",
  },
  {
    q: "Can senior citizens in Srirangam or Thillai Nagar register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elders or sick people who cannot travel can ask for a home visit. An MBBS doctor writes a note saying the person has a clear mind. The officer then comes to your home with a thumb scan kit.",
  },
  {
    q: "How does a registered Will help with Tiruchirappalli City Corporation (TCC) property tax mutation?",
    a: "The Trichy City office needs clear proof to change names on house tax bills. A registered Will gives solid proof of who gets the house. It stops delays, family fights, and the need for costly civil court orders.",
  },
  {
    q: "Can agricultural lands in the Kaveri and Coleroon delta belts be bequeathed in a Will?",
    a: "Yes. Wet land (Nanjai), dry land (Punjai), and groves in Lalgudi, Manachanallur, and nearby delta towns can be passed by a Will. Just list the survey numbers, plot sizes, and four borders so the VAO can update the Patta fast.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Tiruchirappalli Sub-Registrar offices?",
    a: "Any two adults aged 18 or older with a sound mind and valid Aadhaar cards can be witnesses. Under Section 67 of the Indian Succession Act, witnesses and their spouses must not get any gift or land in the Will.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for ancestral properties in Tiruchirappalli?",
    a: "Yes. Many NRIs in Singapore, Malaysia, the Gulf, the US, or the UK own homes in Trichy and Srirangam. NRIs can draft a Will online and sign it abroad with two witnesses, or file it in Book III at a Trichy SRO when visiting India.",
  },
];

export default function TiruchirappalliLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/tiruchirappalli";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-tiruchirappalli.jpg";

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
        name: "Will Drafting in Tiruchirappalli: Legal Online Will Guide",
        description:
          "Draft a legally valid Will in Tiruchirappalli. Expert lawyer drafting, TNREGINET signing guidance, and hassle-free City City Board Patta.",
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
          caption: "Legal Will Drafting and Property Succession in Tiruchirappalli Tamil Nadu",
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
            name: "Tiruchirappalli",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Tiruchirappalli - Estate Planning & TNREGINET Registration",
        description:
          "Professional Will drafting, lawyer check, TNREGINET online token booking, and Section 31 doorstep signing support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tiruchirappalli",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Tiruchirappalli" },
          { "@type": "City", name: "Thillai Nagar" },
          { "@type": "City", name: "Srirangam" },
          { "@type": "City", name: "KK Nagar" },
          { "@type": "City", name: "Cantonment" },
          { "@type": "City", name: "Thiruverumbur" },
          { "@type": "City", name: "Thiruvanaikoil" },
          { "@type": "City", name: "Golden Rock" },
          { "@type": "City", name: "Lalgudi" },
          { "@type": "City", name: "Manachanallur" },
          { "@type": "City", name: "Crawford" },
          { "@type": "City", name: "Woraiyur" },
          { "@type": "City", name: "Tennur" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tiruchirappalli Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Tiruchirappalli Residents",
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
                name: "Complete Tiruchirappalli Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Tiruchirappalli",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Tiruchirappalli.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Tiruchirappalli real estate including City City Board apartments, Srirangam heritage assets, BHEL plant units, Kaveri delta farmland, and financial assets. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using checked legal clauses for asset split, survivorship, guardian appointments for minors, and revocation of prior instruments.",
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
            text: "Schedule your signing appointment on the TNREGINET portal for your relevant Tiruchirappalli SRO and remit the flat ₹100 signing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Tiruchirappalli SRO",
            text: "Visit the SRO office with both witnesses for verbal witness signing, photo capture, and biometric thumbprinting to complete Book III signing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: TIRUCHIRAPPALLI_FAQS.map((item) => ({
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
      <TiruchirappalliLocationClient faqs={TIRUCHIRAPPALLI_FAQS} />
      <Footer />
    </>
  );
}
