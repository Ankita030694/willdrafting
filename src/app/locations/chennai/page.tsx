import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChennaiLocationClient from "./ChennaiLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 146 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Chennai: Registration & Probate Guide",
  },
  description:
    "Draft your Will in Chennai with expert legal consultation. Complete Madras High Court probate guidance and Sub-Registrar office registration help.",
  keywords: [
    "will drafting in chennai",
    "madras high court will probate",
    "will registration chennai tnreginet",
    "advocate for will drafting chennai",
    "succession certificate chennai",
    "chennai corporation property mutation will",
    "tnreginet will appointment",
    "will drafting advocate mylapore",
    "will drafting lawyer adyar",
    "will drafting in anna nagar",
    "will registration saidapet sro",
    "section 213 indian succession act chennai",
    "is probate mandatory in chennai",
    "doorstep will registration chennai section 31",
    "patta transfer with registered will chennai",
    "online will maker chennai",
    "tnhb flat succession will chennai",
    "cmda plot will drafting chennai",
    "doctor medical certificate will chennai",
    "ama legal solutions chennai will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/chennai",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/chennai",
      "x-default": "https://www.willdrafting.in/locations/chennai",
    },
  },
  openGraph: {
    title: "Will Drafting in Chennai: Registration & Probate Guide",
    description:
      "Draft your Will in Chennai with expert legal consultation. Complete Madras High Court probate guidance and Sub-Registrar office registration help.",
    url: "https://www.willdrafting.in/locations/chennai",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-chennai-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Probate Services in Chennai Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Chennai: Registration & Probate Guide",
    description:
      "Draft your Will in Chennai with expert legal consultation. Complete Madras High Court probate guidance and Sub-Registrar office registration help.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-chennai-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const CHENNAI_FAQS = [
  {
    q: "Is probate compulsory for a Will in Chennai?",
    a: "Yes, under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory for Wills executed by Hindus, Buddhists, Sikhs, and Jains within the Ordinary Original Civil Jurisdiction of the Madras High Court, or where the Will relates to immovable property situated within Chennai city limits. If your property is inside Chennai municipal limits, an executor must obtain probate from the Madras High Court or City Civil Court to establish legal title.",
  },
  {
    q: "Is Will registration mandatory in Chennai under Tamil Nadu law?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Chennai and across Tamil Nadu. A Will written on plain paper and signed before two witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via TNREGINET provides official government proof, eliminates allegations of forgery, and speeds up Patta transfer and Greater Chennai Corporation tax mutation.",
  },
  {
    q: "What is the official government fee to register a Will in Chennai?",
    a: "Wills are 100% exempt from stamp duty across India under the Indian Stamp Act, 1899. At Chennai Sub-Registrar offices, you only pay a nominal registration fee of ₹100, plus official computer scanning and user charges of approximately ₹100 to ₹150. You do not have to pay any percentage-based property tax or stamp duty for registering a Will.",
  },
  {
    q: "How do I book an appointment on TNREGINET for Will registration in Chennai?",
    a: "Appointments are scheduled online through the Tamil Nadu Registration Department portal (tnreginet.gov.in). You log into your citizen account, create a token under document registration for Book III (Will), enter testator and witness details, pay the registration fee, and download the appointment token slip with your designated SRO date and time slot.",
  },
  {
    q: "Can a Chennai Sub-Registrar visit home for senior citizens under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators residing in Chennai can request a home or hospital visit by the Sub-Registrar. You must submit an MBBS doctor fitness certificate and pay a prescribed government commission fee. Our Chennai legal team coordinates the entire paperwork and officer visit.",
  },
  {
    q: "How does a registered Will help in transferring Patta and Greater Chennai Corporation tax?",
    a: "A registered Will serves as authentic legal evidence of succession before the Greater Chennai Corporation (GCC) Revenue Department and Tamil Nadu Revenue Authorities. It enables beneficiaries to apply for Patta name transfer through Tamil Nadu e-Sevai centers and updates municipal property tax assessments smoothly without family partition litigation.",
  },
  {
    q: "Who can be witnesses to a Will in Chennai, and must they attend the SRO?",
    a: "Under Section 63(c) of the Indian Succession Act, a Will must be attested by at least two adult witnesses of sound mind. Crucially, witnesses must not be beneficiaries receiving property under the Will, nor should they be spouses of beneficiaries (Section 67). Both witnesses must physically accompany the testator to the Chennai Sub-Registrar Office with original Aadhaar cards and passport photos.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Chennai properties?",
    a: "Yes. NRIs owning flats along OMR, ECR, Anna Nagar, or ancestral homes in Mylapore can draft their Will online. They can sign it abroad before two independent witnesses, get it notarized or attested by the Indian Consulate, or complete formal SRO registration during an India trip. We also provide Power of Attorney advisory for local estate administration.",
  },
];

export default function ChennaiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/chennai";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-chennai-og.jpg";

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
        name: "Will Drafting in Chennai: Registration & Probate Guide",
        description:
          "Draft your Will in Chennai with expert legal consultation. Complete Madras High Court probate guidance and Sub-Registrar office registration help.",
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
          caption: "Legal Will Drafting & Probate Guidance in Chennai Tamil Nadu",
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
            name: "Chennai",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Chennai - Estate Planning, Probate & SRO Registration",
        description:
          "Professional Will drafting, Madras High Court probate advisory, and TNREGINET Sub-Registrar Office registration support across Chennai and.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Chennai" },
          { "@type": "City", name: "Mylapore" },
          { "@type": "City", name: "Adyar" },
          { "@type": "City", name: "Anna Nagar" },
          { "@type": "City", name: "T. Nagar" },
          { "@type": "City", name: "Velachery" },
          { "@type": "City", name: "Besant Nagar" },
          { "@type": "City", name: "Saidapet" },
          { "@type": "City", name: "Guindy" },
          { "@type": "City", name: "Thiruvanmiyur" },
          { "@type": "City", name: "Alwarpet" },
          { "@type": "City", name: "Nungambakkam" },
          { "@type": "City", name: "Kilpauk" },
          { "@type": "City", name: "Sholinganallur" },
          { "@type": "City", name: "OMR" },
          { "@type": "City", name: "Porur" },
          { "@type": "City", name: "Tambaram" },
          { "@type": "City", name: "Chromepet" },
          { "@type": "City", name: "Royapettah" },
          { "@type": "City", name: "George Town" },
          { "@type": "City", name: "Perambur" },
          { "@type": "City", name: "Ambattur" },
          { "@type": "City", name: "Medavakkam" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Chennai Will Drafting, Registration & Probate Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Chennai Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Probate Advisory",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Chennai Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Chennai (Tamil Nadu)",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar via TNREGINET in Chennai.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Chennai Assets & Appoint an Executor",
            text: "List your Chennai real estate (GCC apartments, CMDA plots, TNHB homes), bank deposits, and demat accounts. Appoint a trustworthy executor, which is crucial for Madras High Court probate proceedings under Section 213 of the Indian Succession Act.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Specific Devise and Revocation Clauses",
            text: "Draft your Will using our online legal engine or consult a senior estate advocate to incorporate essential legal clauses, survivorship rights, and clear partition barriers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Non-Beneficiary Witnesses",
            text: "Print the Will on standard white A4 sheets. Sign each page in the simultaneous presence of two independent adult witnesses who do not inherit any property under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book TNREGINET Appointment & Pay Official Fee",
            text: "Generate an online token on the Tamil Nadu registration portal (tnreginet.gov.in) for your jurisdictional Sub-Registrar Office and pay the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Registration at Chennai SRO",
            text: "Visit the Chennai Sub-Registrar Office with your two witnesses and original photo IDs for biometric fingerprinting, digital photo capture, and permanent Book III entry.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: CHENNAI_FAQS.map((item) => ({
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
      <ChennaiLocationClient faqs={CHENNAI_FAQS} />
      <Footer />
    </>
  );
}
