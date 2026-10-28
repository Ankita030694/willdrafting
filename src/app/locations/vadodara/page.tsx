import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VadodaraLocationClient from "./VadodaraLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Vadodara: Legal Online Will Making Help",
  },
  description:
    "Draft a legally compliant Will in Vadodara. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession.",
  keywords: [
    "will drafting in vadodara",
    "will drafting services in vadodara",
    "will registration gujarat sub registrar",
    "vadodara business succession will",
    "garvi gujarat baroda sro",
    "estate lawyer vadodara",
    "will drafting in alkapuri",
    "will drafting in akota",
    "will drafting in gotri",
    "will drafting in manjalpur",
    "will drafting in karelibaug",
    "will drafting in old padra road",
    "will drafting in vasna bhayli",
    "will drafting in gorwa",
    "will drafting in sayajigunj",
    "online will maker vadodara",
    "vmc property mutation will vadodara",
    "vuda plot will transfer vadodara",
    "makarpura gidc business will",
    "nandesari chemical msme will drafting",
    "garvi gujarat portal appointment vadodara",
    "kothi compound sub registrar office vadodara",
    "sub registrar office akota vadodara",
    "sub registrar office manjalpur vadodara",
    "is probate mandatory in vadodara gujarat",
    "section 31 registration act home visit vadodara",
    "huf asset succession will vadodara",
    "will registration fees in gujarat",
    "doctor medical certificate will vadodara",
    "ama legal solutions vadodara will drafting",
    "nri will drafting vadodara properties",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/vadodara",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/vadodara",
      "x-default": "https://www.willdrafting.in/locations/vadodara",
    },
  },
  openGraph: {
    title: "Will Drafting in Vadodara: Legal Online Will Making Help",
    description:
      "Draft a legally compliant Will in Vadodara. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession.",
    url: "https://www.willdrafting.in/locations/vadodara",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-vadodara-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Drafting Services in Vadodara Gujarat Online Legal Help",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Vadodara: Legal Online Will Making Help",
    description:
      "Draft a legally compliant Will in Vadodara. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-vadodara-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const VADODARA_FAQS = [
  {
    q: "Is Will registration mandatory in Vadodara, Gujarat?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Vadodara and across Gujarat. A Will executed on plain white A4 paper and signed in the physical presence of two independent adult witnesses is legally valid. However, registering the Will before the Sub-Registrar via the Garvi Gujarat portal creates an official public record in Book III, providing conclusive proof of execution and preventing post-demise family inheritance disputes.",
  },
  {
    q: "Is probate compulsory for Wills executed in Vadodara?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidential jurisdictions of Mumbai, Kolkata, and Chennai. Vadodara is a non-presidency jurisdiction under the Gujarat High Court. The Gujarat High Court in Minaxiben Shashikantbhai Patel v. Anand Patel and subsequent rulings has settled that probate is not mandatory for Hindu, Sikh, Jain, or Buddhist Wills in Gujarat.",
  },
  {
    q: "What is the official government fee to register a Will in Vadodara?",
    a: "Under the Gujarat Stamp Act, 1958, Wills are completely exempt from stamp duty (Article 64 exemption). You do not need expensive non-judicial stamp paper. At any Vadodara Sub-Registrar Office (Kothi Compound, Akota, Manjalpur, Gorwa, Sayajigunj), you only pay a nominal government registration fee of ₹100 under the Gujarat Table of Registration Fees, alongside standard biometric scanning and computer service charges of ₹100 to ₹200.",
  },
  {
    q: "How do I book an e-appointment on the Garvi Gujarat portal for Baroda SROs?",
    a: "Appointments are scheduled digitally through the Inspector General of Registration Gujarat portal (Garvi Gujarat at garvi.gujarat.gov.in). You log in, select the relevant Vadodara Taluka and SRO (such as Vadodara 1 Kothi or Vadodara 2 Akota), enter testator and witness KYC details, generate an e-Challan through Cyber Treasury Gujarat, and download the appointment receipt with your allotted time slot.",
  },
  {
    q: "Can a Vadodara Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators residing in Vadodara (e.g., in Alkapuri, Karelibaug, Gotri, or Old Padra Road) can request an official home visit by the Sub-Registrar. A medical fitness certificate from a registered MBBS doctor and the requisite government commission fee must be submitted. Our Vadodara legal team coordinates the entire process.",
  },
  {
    q: "How does a registered Will simplify property mutation with VMC and VUDA?",
    a: "Upon the testator's demise, beneficiaries must apply to the Vadodara Municipal Corporation (VMC) for property tax assessment updates and to the Vadodara Urban Development Authority (VUDA) for Town Planning (TP) scheme leasehold or freehold title mutation. A registered Will, accompanied by the death certificate and an affidavit, enables mutation without requiring an expensive court succession certificate or probate.",
  },
  {
    q: "How should MSME chemical and pharmaceutical business assets in Vadodara be bequeathed?",
    a: "Vadodara is a leading hub for chemicals, pharmaceuticals, and engineering MSMEs located in Makarpura GIDC, Nandesari GIDC, and Savli GIDC. A legally structured Will should explicitly delineate equity shareholdings, partnership capital balances, director loan accounts, intellectual property patents, and factory real estate leases to ensure uninterrupted corporate succession and prevent frozen operational accounts.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Vadodara properties?",
    a: "Yes. Many Baroda families have members residing in the USA, Canada, UK, Australia, and the Gulf. NRIs owning flats, bungalows, or plots in Alkapuri, Gotri, Vasna-Bhayli, or Sevasi can draft their Will online. They can execute it abroad before two independent witnesses, attest it at the Indian Embassy or Consulate, or complete biometric registration before the Vadodara Sub-Registrar during their visit to India.",
  },
  {
    q: "Can I bequeath my share in an HUF property in Vadodara?",
    a: "Under Section 30 of the Hindu Succession Act, 1956 (as amended in 2005), a Hindu testator can bequeath their individual undivided coparcenary interest in an HUF (Hindu Undivided Family) property through a Will. However, you cannot bequeath the entire HUF estate or assets belonging to other coparceners. Our estate advocates ensure specific clause drafting to prevent probate objections.",
  },
  {
    q: "Who can act as witnesses for Will registration at Vadodara Sub-Registrar offices?",
    a: "A Will requires at least two independent adult witnesses (aged 18 or above) of sound mind with valid Aadhaar cards and PAN cards. Under Section 67 of the Indian Succession Act, 1925, a beneficiary or their spouse must NEVER sign as an attesting witness, as any bequest made to an attesting witness becomes void. Trusted family friends, neighbours, doctors, or colleagues can serve as witnesses.",
  },
];

export default function VadodaraLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/vadodara";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-vadodara-og.jpg";

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
        name: "Will Drafting in Vadodara: Legal Online Will Making Help",
        description:
          "Draft a legally compliant Will in Vadodara. Expert lawyer help, Garvi Gujarat filing advice, and family business estate.",
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
          caption: "Will Drafting Services in Vadodara Gujarat Online Legal Help",
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
            name: "Vadodara",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Vadodara - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-filing support across all revenue divisions of Vadodara.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vadodara",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Vadodara" },
          { "@type": "AdministrativeArea", name: "Alkapuri" },
          { "@type": "AdministrativeArea", name: "Akota" },
          { "@type": "AdministrativeArea", name: "Gotri" },
          { "@type": "AdministrativeArea", name: "Manjalpur" },
          { "@type": "AdministrativeArea", name: "Karelibaug" },
          { "@type": "AdministrativeArea", name: "Old Padra Road" },
          { "@type": "AdministrativeArea", name: "Vasna-Bhayli" },
          { "@type": "AdministrativeArea", name: "Gorwa" },
          { "@type": "AdministrativeArea", name: "Sayajigunj" },
          { "@type": "AdministrativeArea", name: "Fatehgunj" },
          { "@type": "AdministrativeArea", name: "Subhanpura" },
          { "@type": "AdministrativeArea", name: "Makarpura" },
          { "@type": "AdministrativeArea", name: "Waghodia Road" },
          { "@type": "AdministrativeArea", name: "Sama-Savli" },
          { "@type": "AdministrativeArea", name: "Nizampura" },
          { "@type": "AdministrativeArea", name: "Harni" },
          { "@type": "AdministrativeArea", name: "Sevasi" },
          { "@type": "AdministrativeArea", name: "Sun Pharma Road" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Vadodara Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Vadodara Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Business Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Vadodara Sub-Registrar Registration & Doorstep Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Vadodara, Gujarat",
        description:
          "Five clear steps to create a legally binding Will and register it before the Vadodara SRO via the Garvi Gujarat portal.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Inventory Assets & Designate Beneficiaries",
            text: "List your Vadodara land assets (VMC home units, VUDA plots, shop shops) and movables (bank fixed deposits, demat shares, GIDC enterprise equity). Designate primary and contingent heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Custom Legal Clauses",
            text: "Draft your Will using our online legal platform or with our senior estate lawyers, inserting specific survivorship, revocation, debt indemnification, and business estate clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the simultaneous presence of two independent adult witnesses who are not heirs under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Generate Garvi Gujarat Token & Pay Nominal Fee",
            text: "Log into the Garvi Gujarat portal (garvi.gujarat.gov.in), enter paper details for your local Vadodara SRO (Kothi, Akota, Manjalpur, etc.), generate Cyber Treasury e-Challan for ₹100 filing fee, and select an appointment slot.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Biometric Verification at Vadodara Sub-Registrar Office",
            text: "Visit the Vadodara SRO office with two witnesses and original Aadhaar cards for biometric thumbprint scanning, live photograph capture, and Book III filing paper issuance.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: VADODARA_FAQS.map((item) => ({
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
      <VadodaraLocationClient faqs={VADODARA_FAQS} />
      <Footer />
    </>
  );
}
