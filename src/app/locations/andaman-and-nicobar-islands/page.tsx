import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AndamanLocationClient from "./AndamanLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Andaman & Nicobar: Online Will Guide",
  },
  description:
    "Draft a valid Will in Andaman and Nicobar Islands. Guidance on Port Blair SRO registration, island revenue regulations, and family asset.",
  keywords: [
    "will drafting in andaman and nicobar",
    "will registration port blair",
    "andaman revenue regulation will",
    "calcutta high court circuit bench port blair",
    "online will",
    "port blair sub registrar office will",
    "pbmc flat transfer will port blair",
    "swaraj dweep havelock resort succession will",
    "section 31 registration act home visit andaman",
    "andaman land revenue and land reforms regulation 1966",
    "tribal land protection regulation nicobar will",
    "diglipur agricultural land succession will",
    "mayabunder tehsil will registration",
    "rangat middle andaman estate planning",
    "is probate mandatory in andaman",
    "calcutta high court probate exemption port blair",
    "ama legal solutions andaman will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/andaman-and-nicobar-islands",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/andaman-and-nicobar-islands",
      "x-default": "https://www.willdrafting.in/locations/andaman-and-nicobar-islands",
    },
  },
  openGraph: {
    title: "Will Drafting in Andaman & Nicobar: Online Will Guide",
    description:
      "Draft a valid Will in Andaman and Nicobar Islands. Guidance on Port Blair SRO registration, island revenue regulations, and family asset.",
    url: "https://www.willdrafting.in/locations/andaman-and-nicobar-islands",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-andaman-and-nicobar-islands-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Andaman and Nicobar Islands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Andaman & Nicobar: Online Will Guide",
    description:
      "Draft a valid Will in Andaman and Nicobar Islands. Guidance on Port Blair SRO registration, island revenue regulations, and family asset.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-andaman-and-nicobar-islands-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const ANDAMAN_FAQS = [
  {
    q: "Is Will registration mandatory in Andaman and Nicobar Islands?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Andaman and Nicobar Islands. A Will drafted on plain white paper and attested by two independent adult witnesses is legally valid. However, registering your Will at the Sub-Registrar Office in Port Blair or your local Tehsil office places it in Book III government custody, providing irrefutable proof against disputes during Tehsildar mutation.",
  },
  {
    q: "Is probate compulsory for a Will in Andaman under Calcutta High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or concerning immovable properties located in the historical presidency towns of Kolkata, Mumbai, and Chennai. Although the Calcutta High Court exercises jurisdiction over Andaman & Nicobar through its Circuit Bench at Port Blair, the islands lie outside presidency town limits. Probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills here.",
  },
  {
    q: "What is the official government fee to register a Will in Port Blair?",
    a: "Testamentary Wills are completely exempt from ad-valorem stamp duty across Andaman and Nicobar Islands. At the Port Blair Sub-Registrar Office and Tehsil registration registries, you only pay nominal statutory registration fees and routine document processing charges. There are no percentage levies on the market value of your residential houses, plantations, or commercial assets.",
  },
  {
    q: "How does the Andaman Land Revenue and Land Reforms Regulation 1966 affect Will drafting?",
    a: "Under the Andaman and Nicobar Islands Land Revenue and Land Reforms Regulation, 1966 (Regulation 2 of 1966), agricultural grants, occupancy holdings, and homestead plots require lawful mutation before the Tehsildar. A registered Will serves as conclusive documentary evidence of the deceased person's intent, enabling smooth transfer of occupancy rights and land revenue records without protracted family contestation.",
  },
  {
    q: "Can non-tribals bequeath or inherit land in tribal reserve areas of Nicobar?",
    a: "No. Under the Andaman and Nicobar Islands (Protection of Aboriginal Tribes) Regulation, 1956, tribal reserve areas such as Car Nicobar, Nancowry, and reserved territories are legally protected. Non-tribal individuals cannot acquire, inherit, or receive agricultural land or real property in protected tribal tracts via a Will. Estate bequests in these zones must strictly conform to tribal customary law and statutory protections.",
  },
  {
    q: "How are PBMC properties in Port Blair mutated following a Will?",
    a: "For residential houses, plots, and commercial buildings within the Port Blair Municipal Council (PBMC) limits, the beneficiary submits the registered Will, original death certificate, and ownership documents to the Revenue Officer of PBMC. A public notice is published, and upon completing verification, ownership is mutated on the municipal assessment register without requiring civil court succession certificates.",
  },
  {
    q: "Can senior citizens in Andaman register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or physically restricted testators residing across South Andaman can apply for a doorstep commission visit. Upon submitting an MBBS doctor's medical fitness certificate, the Sub-Registrar attends the testator's residence or healthcare facility in Port Blair or surrounding villages to complete biometric attestation.",
  },
  {
    q: "Can resort properties and tourism leases in Swaraj Dweep (Havelock) be bequeathed?",
    a: "Yes. Resort buildings, homestay structures, and commercial leasehold rights in Swaraj Dweep (Havelock) and Shaheed Dweep (Neil Island) can be bequeathed through a Will. The Will must clearly distinguish between government commercial lease allotments, private freehold holdings, and corporate business shares to guarantee uninterrupted resort operations and compliance with tourism department licensing.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Port Blair Sub-Registrar Office?",
    a: "Any two adult individuals of sound mind who hold valid Aadhaar cards or government identity cards can serve as attesting witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property, asset, or legacy under the Will, nor should they be spouses of designated beneficiaries. Trusted friends, colleagues, or family doctors are ideal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Port Blair?",
    a: "Yes. Many NRIs and professionals residing in mainland India or overseas hold family bungalows, plots, or commercial investments in Port Blair. An NRI can draft an Andaman-compliant Will online, execute it before two adult witnesses in their country of residence with Indian consular attestation or apostille certification, or register it before the Port Blair Sub-Registrar during their visit to the islands.",
  },
];

export default function AndamanLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/andaman-and-nicobar-islands";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-andaman-and-nicobar-islands.jpg";

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
        name: "Will Drafting in Andaman & Nicobar: Online Will Guide",
        description:
          "Draft a valid Will in Andaman and Nicobar Islands. Guidance on Port Blair SRO registration, island revenue regulations, and family asset.",
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
          caption: "Legal Will Drafting and Property Succession in Andaman and Nicobar Islands",
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
            name: "Andaman and Nicobar Islands",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Andaman & Nicobar - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Port Blair Sub-Registrar registration, and Section 31 doorstep execution support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Port Blair",
          addressRegion: "Andaman and Nicobar Islands",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Port Blair" },
          { "@type": "City", name: "Garacharma" },
          { "@type": "City", name: "Dollygunj" },
          { "@type": "City", name: "Junglighat" },
          { "@type": "City", name: "Aberdeen Bazaar" },
          { "@type": "City", name: "Swaraj Dweep" },
          { "@type": "City", name: "Shaheed Dweep" },
          { "@type": "City", name: "Ferrargunj" },
          { "@type": "City", name: "Bambooflat" },
          { "@type": "City", name: "Rangat" },
          { "@type": "City", name: "Baratang" },
          { "@type": "City", name: "Mayabunder" },
          { "@type": "City", name: "Diglipur" },
          { "@type": "City", name: "Car Nicobar" },
          { "@type": "City", name: "Campbell Bay" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Andaman Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Andaman Residents",
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
                name: "Complete Port Blair Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Andaman & Nicobar",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Andaman and Nicobar Islands.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your island properties including PBMC houses, revenue grant holdings under the 1966 Regulation, Swaraj Dweep tourism assets, bank accounts, and designate beneficiaries with an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minors, and revocation of prior testamentary instruments.",
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
            name: "Schedule Sub-Registrar Appointment",
            text: "Book your appointment at the Port Blair Sub-Registrar Office or your jurisdictional Tehsil registry office and prepare necessary identity documentation.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at SRO Port Blair",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete permanent Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: ANDAMAN_FAQS.map((item) => ({
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
      <AndamanLocationClient faqs={ANDAMAN_FAQS} />
      <Footer />
    </>
  );
}