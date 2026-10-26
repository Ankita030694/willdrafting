import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeerutLocationClient from "./MeerutLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Meerut: Online Will Registration Guide",
  },
  description:
    "Draft a legally compliant Will in Meerut. Professional lawyer drafting, UP IGRS registration help, and MDA residential property transfer advice in UP.",
  keywords: [
    "will drafting in meerut",
    "will drafting services in meerut",
    "will registration up igrs meerut",
    "mda plot will transfer",
    "online will maker meerut",
    "succession lawyer meerut cantt",
    "sub registrar office meerut kutchery",
    "meerut nagar nigam mutation will",
    "sports industry succession will",
    "will drafting shastri nagar meerut",
    "will drafting saket meerut",
    "will drafting ganga nagar meerut",
    "will drafting modipuram",
    "will drafting pallavpuram",
    "will drafting civil lines meerut",
    "section 31 registration act home visit meerut",
    "is probate mandatory in meerut",
    "allahabad high court probate up exemption",
    "section 108 up revenue code agricultural will",
    "ama legal solutions meerut will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/meerut",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/meerut",
      "x-default": "https://www.willdrafting.in/locations/meerut",
    },
  },
  openGraph: {
    title: "Will Drafting in Meerut: Online Will Registration Guide",
    description:
      "Draft a legally compliant Will in Meerut. Professional lawyer drafting, UP IGRS registration help, and MDA residential property transfer advice in UP.",
    url: "https://www.willdrafting.in/locations/meerut",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-meerut-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Meerut Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Meerut: Online Will Registration Guide",
    description:
      "Draft a legally compliant Will in Meerut. Professional lawyer drafting, UP IGRS registration help, and MDA residential property transfer advice in UP.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-meerut-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MEERUT_FAQS = [
  {
    q: "Is Will registration mandatory in Meerut?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Meerut Sub-Registrar Office enters it into permanent Book III government custody, preventing fraudulent challenges and ensuring fast mutation with Meerut Development Authority (MDA) and Meerut Nagar Nigam.",
  },
  {
    q: "Is probate required for a Will in Meerut under Allahabad High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Meerut is situated in Uttar Pradesh under the jurisdiction of the Allahabad High Court, where probate is strictly optional. A registered Will allows direct mutation of MDA plots, houses, and ancestral lands.",
  },
  {
    q: "What is the official government fee to register a Will in Meerut?",
    a: "Wills are 100% exempt from stamp duty across Uttar Pradesh. At Meerut Sub-Registrar offices in Kutchery, Mawana, and Sardhana, you only pay a flat ₹100 registration fee plus nominal government scanning and data charges of approximately ₹100 to ₹300. There are no percentage-based property valuation fees.",
  },
  {
    q: "How is an MDA (Meerut Development Authority) plot transferred through a Will?",
    a: "For MDA allotted residential plots and houses in Shastri Nagar, Ganga Nagar, or Pallavpuram, the designated beneficiary submits the registered Will, death certificate, MDA allotment letter, and indemnity bond to the MDA Property Section. A registered Will prevents family succession disputes and enables prompt substitution of ownership records.",
  },
  {
    q: "How does agricultural land succession work in Meerut District under UP law?",
    a: "Farmland and agricultural holdings across Mawana, Sardhana, Daurala, and Hastinapur are governed by Section 108 of the Uttar Pradesh Revenue Code, 2006. Testamentary bequests of agricultural land must comply with statutory ceiling restrictions. The beneficiary presents the registered Will to the Tehsildar to record ownership in UP Bhulekh Khatauni records.",
  },
  {
    q: "How can sports goods and manufacturing enterprises in Meerut be bequeathed?",
    a: "As India's sports goods and musical instruments capital, enterprises located in Partapur and Mohkampur Industrial Areas require structured testamentary succession. A watertight Will specifies distribution of factory leasehold rights, partnership shares, export machinery, and intellectual property trademarks, ensuring seamless business continuity.",
  },
  {
    q: "How do I book an e-Appointment on the UP IGRSUP portal for Meerut SRO?",
    a: "Appointments are scheduled online via the Uttar Pradesh Stamps and Registration Department portal (igrsup.gov.in). You select the relevant Meerut Sub-Registrar Office (SRO I, SRO II, Mawana, or Sardhana), enter testator and witness KYC details, generate the ₹100 fee e-Challan, and download your confirmed appointment token.",
  },
  {
    q: "Can senior citizens in Meerut register a Will at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly individuals or residents with medical mobility limitations across Shastri Nagar, Saket, or Civil Lines can request a home visit. Upon receiving an MBBS doctor's fitness and disability certificate, the Sub-Registrar visits your home with biometric recording devices.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Meerut Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted neighbors, or long-time friends are ideal.",
  },
  {
    q: "Can Meerut Cantonment leasehold properties be passed through a Will?",
    a: "Yes. Bungalows and residential units on Cantonment Board leaseholds along Mall Road or Cariappa Marg can be bequeathed through a Will. The beneficiary presents the registered Will and death certificate to the Meerut Cantonment Board (MCB) for mutation of lease records without requiring civil court probate.",
  },
];

export default function MeerutLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/meerut";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-meerut.jpg";

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
        name: "Will Drafting in Meerut: Online Will Registration Guide",
        description:
          "Draft a legally compliant Will in Meerut. Professional lawyer drafting, UP IGRS registration help, and MDA residential property transfer advice in UP.",
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
          caption: "Legal Will Drafting and Property Succession in Meerut Uttar Pradesh",
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
            name: "Meerut",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Meerut - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, UP IGRSUP e-Challan appointment booking, and doorstep execution support across Meerut, Shastri Nagar, Saket, Ganga Nagar, and Cantt.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Meerut",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Meerut" },
          { "@type": "City", name: "Shastri Nagar" },
          { "@type": "City", name: "Saket" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Meerut Cantt" },
          { "@type": "City", name: "Ganga Nagar" },
          { "@type": "City", name: "Mohkampur" },
          { "@type": "City", name: "Partapur" },
          { "@type": "City", name: "Modipuram" },
          { "@type": "City", name: "Pallavpuram" },
          { "@type": "City", name: "Mawana" },
          { "@type": "City", name: "Sardhana" },
          { "@type": "City", name: "Hastinapur" },
          { "@type": "City", name: "Daurala" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Meerut Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Meerut Residents",
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
                name: "Complete Meerut Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Meerut",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Meerut.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Meerut real estate including MDA plots, residential bungalows, sports manufacturing units, Mawana farmland, and financial investments. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, minor guardianship, and explicit revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two independent adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book UP IGRSUP e-Appointment Slot",
            text: "Schedule your registration appointment on the Stamps and Registration UP portal (igrsup.gov.in) for your relevant Meerut SRO and remit the flat ₹100 registration fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Meerut SRO",
            text: "Visit the Sub-Registrar office at Kutchery Collectorate, Mawana, or Sardhana with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MEERUT_FAQS.map((item) => ({
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
      <MeerutLocationClient faqs={MEERUT_FAQS} />
      <Footer />
    </>
  );
}
