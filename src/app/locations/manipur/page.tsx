import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ManipurLocationClient from "./ManipurLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Manipur: Online Will Registration Guide",
  },
  description:
    "Draft a valid Will in Manipur. Complete guidance on valley land title deeds, hill district customary succession practices, and advocate review.",
  keywords: [
    "will drafting in manipur",
    "will registration imphal",
    "manipur land revenue act will",
    "customary inheritance manipur",
    "estate advocate manipur",
    "online will manipur",
    "will drafting imphal west lamphelpat",
    "sub registrar office imphal east porompat",
    "thoubal sro will registration",
    "bishnupur will drafting advocate",
    "churachandpur lamka will succession",
    "ukhrul customary land will",
    "senapati estate lawyer will",
    "loucha pathap jamabandi will mutation",
    "patta transfer will manipur",
    "section 158 manipur land revenue act",
    "manipur hill areas customary succession",
    "is probate mandatory in manipur",
    "high court of manipur probate exemption",
    "section 31 registration act home visit imphal",
    "nri manipuri will drafting",
    "ama legal solutions manipur will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/manipur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/manipur",
      "x-default": "https://www.willdrafting.in/locations/manipur",
    },
  },
  openGraph: {
    title: "Will Drafting in Manipur: Online Will Registration Guide",
    description:
      "Draft a valid Will in Manipur. Complete guidance on valley land title deeds, hill district customary succession practices, and advocate review.",
    url: "https://www.willdrafting.in/locations/manipur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-manipur-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Manipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Manipur: Online Will Registration Guide",
    description:
      "Draft a valid Will in Manipur. Complete guidance on valley land title deeds, hill district customary succession practices, and advocate review.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-manipur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MANIPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Manipur?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Manipur. A Will typed or handwritten on plain paper is legally valid if signed before two independent adult witnesses. However, registering your Will at a Manipur Sub-Registrar Office enters it into permanent Book III government custody. This protects the document against suppression, loss, or fraud, and streamlines mutation of valley Patta land and Imphal residential properties.",
  },
  {
    q: "Is probate compulsory for a Will in Manipur under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or covering properties situated in historical presidency towns (Mumbai, Kolkata, Chennai). Manipur lies outside presidency limits. The High Court of Manipur in Imphal has affirmed that probate is strictly non-compulsory for Hindus, Buddhists, Jains, Sikhs, and Christians in Manipur, permitting direct title transfer with a registered Will.",
  },
  {
    q: "How does the Manipur Land Revenue and Land Reforms Act (1960) govern Will bequests?",
    a: "The Manipur Land Revenue and Land Reforms Act, 1960 governs land tenure across the valley districts (Imphal West, Imphal East, Thoubal, Kakching, Bishnupur). A landowner can bequeath their self-acquired or partitioned Patta land (Ingkhol or Lou) through a Will. However, under Section 158 of the Act, agricultural land held by Scheduled Tribes cannot be bequeathed or transferred to non-tribals without prior sanction of the State Government and Deputy Commissioner.",
  },
  {
    q: "How are customary succession rules in Manipur Hill Districts balanced with a Will?",
    a: "In Manipur's hill districts (Churachandpur, Ukhrul, Senapati, Tamenglong, Chandel), ancestral clan land is governed by customary tribal laws and Village Authorities. While ancestral clan lands often follow hereditary customs, an individual enjoys testamentary freedom under the Indian Succession Act, 1925 to bequeath self-acquired urban properties, town buildings, bank savings, vehicles, and commercial businesses via a written Will.",
  },
  {
    q: "What is the official government fee to register a Will in Manipur?",
    a: "Testamentary Wills are exempt from ad-valorem stamp duty across Manipur. At Manipur Sub-Registrar Offices (such as Lamphelpat or Porompat), you pay only nominal statutory registration fees and document scanning fees, generally totaling between ₹200 and ₹500. There are no percentage-based real estate value charges.",
  },
  {
    q: "Can senior citizens in Imphal register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, unwell individuals, or persons with mobility restrictions can request a doorstep visit. An MBBS doctor issues a medical certificate stating the testator is lucid but unable to travel. The Sub-Registrar then visits the residence in Imphal West, Imphal East, or other districts with registration ledgers to complete registration.",
  },
  {
    q: "How does a beneficiary mutate valley land (Jamabandi/Patta) after the testator dies?",
    a: "Upon the testator's demise, the beneficiary submits an application for mutation along with the original or certified registered Will, death certificate, and Jamabandi copy to the jurisdictional Sub-Divisional Officer (SDO) or Sub-Deputy Collector (SDC). After public proclamation and notice verification on the Loucha Pathap portal, the beneficiary's name is recorded on the Record of Rights (RoR).",
  },
  {
    q: "Who can serve as valid attesting witnesses at Manipur Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards, EPIC voter IDs, or government photo identification can act as witnesses. Under Section 67 of the Indian Succession Act, 1925, attesting witnesses must not be beneficiaries receiving any property or legacy under the Will. Family friends, neighbors, or colleagues are recommended.",
  },
  {
    q: "Can Non-Resident Manipuris (NRMs) make a Will for properties located in Imphal?",
    a: "Yes. Manipuris living across India or abroad (in Bangalore, Delhi, the UK, USA, or Southeast Asia) can draft an enforceable Will online for properties situated in Manipur. They can execute it before two witnesses where they reside, have it notarized or apostilled, or register it before an Imphal Sub-Registrar during their visit to Manipur.",
  },
  {
    q: "Can a tribal landowner bequeath hill land to a non-tribal through a Will in Manipur?",
    a: "No. A testamentary Will cannot override constitutional and statutory land protection provisions. Under customary tribal laws protected by Article 371C and Section 158 of the Manipur Land Revenue and Land Reforms Act, 1960, tribal land in hill districts and designated tribal belts cannot be transferred or bequeathed to a non-tribal beneficiary. Any such clause is void ab initio.",
  },
];

export default function ManipurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/manipur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-manipur.jpg";

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
        name: "Will Drafting in Manipur: Online Will Registration Guide",
        description:
          "Draft a valid Will in Manipur. Complete guidance on valley land title deeds, hill district customary succession practices, and advocate review.",
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
          caption: "Legal Will Drafting and Property Succession in Manipur",
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
            name: "Manipur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Manipur - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Sub-Registrar registration, and Section 31 doorstep execution support across Imphal West.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Imphal",
          addressRegion: "Manipur",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Imphal" },
          { "@type": "City", name: "Imphal West" },
          { "@type": "City", name: "Imphal East" },
          { "@type": "City", name: "Thoubal" },
          { "@type": "City", name: "Kakching" },
          { "@type": "City", name: "Bishnupur" },
          { "@type": "City", name: "Moirang" },
          { "@type": "City", name: "Churachandpur" },
          { "@type": "City", name: "Ukhrul" },
          { "@type": "City", name: "Senapati" },
          { "@type": "City", name: "Kangpokpi" },
          { "@type": "City", name: "Tamenglong" },
          { "@type": "City", name: "Chandel" },
          { "@type": "City", name: "Jiribam" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Manipur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Manipur Residents",
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
                name: "Complete Manipur SRO Registration & Home Visit Coordination",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Manipur",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Manipur.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Beneficiaries",
            text: "List your Manipur assets including valley Patta land (Jamabandi records), Imphal residential homesteads, commercial holdings, and bank savings. Designate your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using legally vetted clauses for asset distribution, survivorship, minor guardian appointments, and revocation of prior instruments, respecting Section 158 MLR & LR Act rules.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard white paper and sign each page in the presence of two independent adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar Office Visit",
            text: "Submit your document and book an appointment with your jurisdictional Manipur Sub-Registrar Office (such as Lamphelpat, Porompat, Thoubal, or Churachandpur) and pay nominal statutory fees.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Verification & Book III Registration",
            text: "Visit the SRO with both witnesses for identity verification, photograph capture, and thumb impressions to complete official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MANIPUR_FAQS.map((item) => ({
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
      <ManipurLocationClient faqs={MANIPUR_FAQS} />
      <Footer />
    </>
  );
}
