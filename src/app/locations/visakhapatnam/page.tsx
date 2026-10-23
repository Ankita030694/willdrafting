import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisakhapatnamLocationClient from "./VisakhapatnamLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Visakhapatnam: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Visakhapatnam. Complete AP IGRS registration guidance, coastal asset protection, and senior advocate consultation online.",
  keywords: [
    "will drafting in visakhapatnam",
    "will registration vizag igrs ap",
    "online will draft vizag",
    "property will lawyer andhra pradesh",
    "succession planning vizag",
    "gvmc property mutation will",
    "vmrda plot will transfer",
    "will drafting services in vishakapatnam",
    "ap igrs will registration fee",
    "sub registrar office dwarakanagar vizag",
    "will drafting madhurawada visakhapatnam",
    "will registration gajuwaka sro",
    "naval veteran will drafting vizag",
    "eastern naval command estate succession",
    "is probate mandatory in visakhapatnam",
    "section 213 indian succession act andhra pradesh",
    "doorstep will registration vizag section 31",
    "doctor medical certificate will visakhapatnam",
    "online will maker andhra pradesh",
    "ama legal solutions visakhapatnam will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/visakhapatnam",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/visakhapatnam",
      "x-default": "https://www.willdrafting.in/locations/visakhapatnam",
    },
  },
  openGraph: {
    title: "Will Drafting in Visakhapatnam: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Visakhapatnam. Complete AP IGRS registration guidance, coastal asset protection, and senior advocate consultation online.",
    url: "https://www.willdrafting.in/locations/visakhapatnam",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-visakhapatnam-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Asset Protection in Visakhapatnam Andhra Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Visakhapatnam: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Visakhapatnam. Complete AP IGRS registration guidance, coastal asset protection, and senior advocate consultation online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-visakhapatnam-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const VISAKHAPATNAM_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Visakhapatnam?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidential presidency towns of Mumbai, Kolkata, and Chennai. Visakhapatnam is a non-presidency town governed under the Andhra Pradesh High Court at Amaravati. The Supreme Court of India in Clarence Pais v. Union of India and multiple Andhra Pradesh High Court judgments have established that probate is strictly optional for Hindu, Sikh, Jain, and Buddhist Wills. A registered Will provides direct legal title and allows smooth mutation without filing expensive court probate petitions.",
  },
  {
    q: "Is Will registration mandatory under Andhra Pradesh IGRS rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Andhra Pradesh. A Will written on plain paper signed by the testator before two competent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office through the AP IGRS portal (registration.ap.gov.in) creates a tamper-proof official government record in Book III, protects your family from fabricated claims, and ensures swift GVMC property tax mutation.",
  },
  {
    q: "How do I transfer a VMRDA plot or GVMC property after the testator passes away?",
    a: "Beneficiaries must produce the certified copy of the registered Will, original death certificate, family member certificate or legal heir certificate issued by the local Tahsildar or Ward Secretariat, and prior registered sale deeds. For VMRDA (Visakhapatnam Metropolitan Region Development Authority) approved plots, you apply for title transfer at the VMRDA office. For Greater Visakhapatnam Municipal Corporation (GVMC) residential flats and homes, you submit an online mutation application through the Ward Sachivalayam portal for direct assessment name transfer.",
  },
  {
    q: "What is the official government fee to register a Will in Visakhapatnam?",
    a: "Wills are 100% exempt from stamp duty across India under the Indian Stamp Act, 1899. At Visakhapatnam Sub-Registrar offices under the Registration and Stamps Department of Andhra Pradesh (AP IGRS), you only pay a flat statutory registration fee of ₹1,000 for Book III registration, plus nominal computer user charges of approximately ₹100 to ₹200. You do not pay any percentage-based property market value stamp duty.",
  },
  {
    q: "How can Eastern Naval Command (ENC) and defense veterans in Vizag structure their estate?",
    a: "Visakhapatnam is home to thousands of retired naval officers, defense personnel, and shipyard professionals residing in MVP Colony, Seethammadhara, Lawsons Bay, and AWHO or AFNHB societies. A Will allows veterans to clearly allocate defense service pensions, insurance nominations, residential flats, demat holdings, and ancestral land. It enables naming trusted executors and testamentary guardians, preventing bitter inter-generational family friction.",
  },
  {
    q: "Can an Andhra Pradesh Sub-Registrar visit home for senior citizens under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell citizens across Visakhapatnam can request a home or hospital visit by the jurisdictional Sub-Registrar. A registered medical practitioner (MBBS doctor) must provide a mental fitness certificate certifying sound disposing state of mind. An official government commission fee is paid through the CFMS portal. Our legal team assists with complete documentation and official coordination.",
  },
  {
    q: "How do I book an appointment on the AP IGRS portal for Will registration in Vizag?",
    a: "Appointments are booked online through the Andhra Pradesh Registration portal (registration.ap.gov.in). You log in to your citizen account, navigate to Document Entry and Slot Booking, choose Book III (Will), enter testator and two witnesses' details, select your local Visakhapatnam SRO (such as Dwarakanagar, Madhurawada, or Gajuwaka), generate the CFMS challan for fee payment, and download your confirmed appointment token slip.",
  },
  {
    q: "Who can be witnesses to a Will in Visakhapatnam, and must they visit the SRO?",
    a: "Under Section 63 of the Indian Succession Act, at least two adult witnesses of sound mind must attest the Will. Most importantly, witnesses must not be beneficiaries receiving any property under the Will, nor spouses of beneficiaries (Section 67). Both witnesses must physically accompany the testator to the Visakhapatnam Sub-Registrar Office with original Aadhaar cards and biometric ID for verification.",
  },
  {
    q: "How do Grama and Ward Sachivalayams assist in property mutation after a Will?",
    a: "Andhra Pradesh operates a decentralized Ward Secretariat (Ward Sachivalayam) model. After obtaining the registered Will and death certificate, legal heirs can submit property tax mutation requests at their local Ward Secretariat in Vizag. The Ward Revenue Secretary coordinates with the Tahsildar and GVMC town planning wing, enabling transparent name mutation without running between multiple administrative headquarters.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) from Vizag create a Will for coastal Andhra properties?",
    a: "Yes. Many Vizag families have children or family members working in the USA, the UK, Singapore, or the Gulf. NRIs owning apartments, commercial shops, or plots in Visakhapatnam can draft their Will online. They can execute it abroad before two independent witnesses, get it attested by the nearest Indian Consulate or notarized, or complete AP IGRS registration during their India visit.",
  },
];

export default function VisakhapatnamLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/visakhapatnam";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-visakhapatnam-og.jpg";

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
        name: "Will Drafting in Visakhapatnam: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Visakhapatnam. Complete AP IGRS registration guidance, coastal asset protection, and senior advocate consultation online.",
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
          caption: "Online Will Drafting and Asset Protection in Visakhapatnam Andhra Pradesh",
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
            name: "Visakhapatnam",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Visakhapatnam - Estate Planning, Naval Succession & AP IGRS Registration",
        description:
          "Professional Will drafting, naval veteran estate succession advisory, and AP IGRS Sub-Registrar Office registration support across Visakhapatnam and Andhra Pradesh.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Visakhapatnam",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Visakhapatnam" },
          { "@type": "City", name: "MVP Colony" },
          { "@type": "City", name: "Seethammadhara" },
          { "@type": "City", name: "Madhurawada" },
          { "@type": "City", name: "Gajuwaka" },
          { "@type": "City", name: "Dwarakanagar" },
          { "@type": "City", name: "Rushikonda" },
          { "@type": "City", name: "Pendurthi" },
          { "@type": "City", name: "Gopalapatnam" },
          { "@type": "City", name: "Anandapuram" },
          { "@type": "City", name: "Kurmannapalem" },
          { "@type": "City", name: "Waltair Uplands" },
          { "@type": "City", name: "Maharani Peta" },
          { "@type": "City", name: "Siripuram" },
          { "@type": "City", name: "Sagar Nagar" },
          { "@type": "City", name: "Yendada" },
          { "@type": "City", name: "PM Palem" },
          { "@type": "City", name: "Kancharapalem" },
          { "@type": "City", name: "Bheemunipatnam" },
          { "@type": "City", name: "Ukkunagaram" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Visakhapatnam Will Drafting, Asset Protection & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Visakhapatnam Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Coastal Asset Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Visakhapatnam Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Visakhapatnam Andhra Pradesh",
        description:
          "Five straightforward steps to create a legally binding Will and register it before the Sub-Registrar in Visakhapatnam.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Properties, Naval Assets, and Beneficiaries",
            text: "Compile your Visakhapatnam residential flats, VMRDA plots, naval pension benefits, bank accounts, and demat shares. Appoint your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Exact Legal Clauses",
            text: "Draft your Will using our legally verified platform or with a senior advocate to include non-presidency probate clarity, specific asset bequests, and executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign every page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Visakhapatnam SRO Slot on AP IGRS",
            text: "Schedule an appointment token on registration.ap.gov.in for your jurisdictional Visakhapatnam SRO and pay the nominal ₹1,000 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar Office with your two witnesses, original Aadhaar cards, and photographs for biometric fingerprinting, digital photo capture, and Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: VISAKHAPATNAM_FAQS.map((item) => ({
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
      <VisakhapatnamLocationClient faqs={VISAKHAPATNAM_FAQS} />
      <Footer />
    </>
  );
}
