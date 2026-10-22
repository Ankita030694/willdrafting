import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MumbaiLocationClient from "./MumbaiLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 148 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Mumbai: Registration & Probate Law Guide",
  },
  description:
    "Draft and register your Will in Mumbai. Expert Bombay High Court probate guidance, asset distribution, and lawyer consultation across Mumbai and MMR.",
  keywords: [
    "will drafting in mumbai",
    "will drafting in borivali",
    "will drafting in thane",
    "will drafting in andheri",
    "will drafting in bandra",
    "will drafting in south mumbai",
    "will drafting in navi mumbai",
    "will drafting in chembur",
    "will drafting in ghatkopar",
    "will drafting in goregaon",
    "will drafting in malad",
    "will drafting in kandivali",
    "will registration mumbai igr",
    "bombay high court probate will",
    "will lawyer mumbai",
    "estate planning mumbai mmr",
    "online will maker mumbai maharashtra",
    "cooperative housing society will flat transfer mumbai",
    "section 213 indian succession act mumbai probate",
    "sub registrar office mumbai will registration",
    "sub registrar office borivali will registration",
    "sub registrar office thane will registration",
    "igr maharashtra will registration e-stepin",
    "probate lawyer bombay high court",
    "will registration fees in mumbai",
    "section 31 registration act home visit mumbai",
    "ama legal solutions mumbai will drafting",
    "testamentary petition bombay high court",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/mumbai",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/mumbai",
      "x-default": "https://www.willdrafting.in/locations/mumbai",
    },
  },
  openGraph: {
    title: "Will Drafting in Mumbai: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Mumbai. Expert Bombay High Court probate guidance, asset distribution, and lawyer consultation across Mumbai and MMR.",
    url: "https://www.willdrafting.in/locations/mumbai",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-mumbai.jpg",
        width: 1024,
        height: 576,
        alt: "Legal Will Drafting and Probate Support Services in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Mumbai: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Mumbai. Expert Bombay High Court probate guidance, asset distribution, and lawyer consultation across Mumbai and MMR.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-mumbai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MUMBAI_FAQS = [
  {
    q: "Is Will registration mandatory in Mumbai?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Mumbai. A Will on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at the local Sub-Registrar Office stores it in government Book III records. This prevents future disputes and proves that the document is genuine.",
  },
  {
    q: "When is probate required for a Will in Mumbai?",
    a: "Probate is an official court order certifying a Will. Under Section 213 of the Indian Succession Act, 1925, probate rules historically applied to certain Wills in Mumbai. Today, probate is essential if any legal heir disputes the Will. It is also needed when housing societies, banks, or buyers demand court approval before transferring property.",
  },
  {
    q: "Does a nominee automatically become the owner of a Mumbai flat?",
    a: "No. Under Maharashtra cooperative society laws, a nominee is only a temporary trustee. A nominee holds the flat on behalf of the legal heirs. Beneficial ownership passes only through a valid Will or succession law. Making a Will ensures your chosen beneficiary gets full ownership of your flat.",
  },
  {
    q: "What is the official government fee to register a Will in Mumbai?",
    a: "Wills are completely exempt from stamp duty across Maharashtra under Article 64. At Mumbai Sub-Registrar offices, you only pay a flat one hundred rupee registration fee. Nominal scanning and document charges of about one hundred to three hundred rupees also apply. You do not pay any percentage-based property tax.",
  },
  {
    q: "How do I book an online appointment for Will registration in Mumbai?",
    a: "You can book appointments through the IGR Maharashtra portal using the e-Stepin facility on igrmaharashtra.gov.in. Select your local Sub-Registrar office and enter witness details. Then pay the nominal fee online and download your appointment time-slot receipt.",
  },
  {
    q: "Can an elderly or unwell person register a Will from home in Mumbai?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can visit your home or hospital. A registered doctor must certify that the testator cannot travel. You then pay an official commission fee. The officer visits with portable biometric equipment to complete the process.",
  },
  {
    q: "How does a registered Will help in transferring a Mumbai CHS apartment?",
    a: "A registered Will provides clear legal proof of the owner's wishes. Under Model Bye-laws of Maharashtra Cooperative Housing Societies, it helps the society transfer the share certificate smoothly. This avoids costly indemnity bonds and long disputes among family members.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Mumbai properties?",
    a: "Yes. NRIs owning flats or investments in Mumbai, Thane, or Navi Mumbai can draft a Will online. They can sign it abroad before two independent witnesses. They can also get it notarized or apostilled, or register it during an India visit.",
  },
];

export default function MumbaiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/mumbai";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-mumbai.jpg";

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
        name: "Will Drafting in Mumbai: Registration & Probate Law Guide",
        description:
          "Draft and register your Will in Mumbai. Expert Bombay High Court probate guidance, asset distribution, and lawyer consultation across Mumbai and MMR.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1024,
          height: 576,
          caption: "Legal Will Drafting & Probate Support Services in Mumbai",
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
            name: "Mumbai",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Mumbai - Estate Planning, Registration & Probate Guidance",
        description:
          "Professional Will drafting, lawyer verification, Maharashtra IGR Sub-Registrar registration, and Bombay High Court probate guidance across Mumbai and MMR.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Mumbai Suburban" },
          { "@type": "City", name: "Borivali" },
          { "@type": "City", name: "Kandivali" },
          { "@type": "City", name: "Andheri" },
          { "@type": "City", name: "Bandra" },
          { "@type": "City", name: "Thane" },
          { "@type": "City", name: "Navi Mumbai" },
          { "@type": "City", name: "Chembur" },
          { "@type": "City", name: "Ghatkopar" },
          { "@type": "City", name: "Goregaon" },
          { "@type": "City", name: "Malad" },
          { "@type": "City", name: "Mira Bhayandar" },
          { "@type": "City", name: "Kalyan-Dombivli" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mumbai Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Mumbai Residents",
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
                name: "Complete Maharashtra SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Mumbai",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Maharashtra.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Mumbai Assets and Beneficiaries",
            text: "Itemize your Mumbai assets including CHS apartments, commercial units, demat portfolios, and bank accounts. Appoint your beneficiaries and a trusted executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Statutory Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior advocate to incorporate survivorship, specific bequest, and revocation clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign each page before two independent adult witnesses who are not beneficiaries under the document.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Appointment on IGR Maharashtra e-Stepin",
            text: "Schedule an e-appointment on igrmaharashtra.gov.in for your jurisdictional Sub-Registrar office and pay the nominal ₹100 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Attend the Sub-Registrar office with both witnesses and original IDs for biometric thumbprinting, web-camera photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MUMBAI_FAQS.map((item) => ({
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
      <MumbaiLocationClient faqs={MUMBAI_FAQS} />
      <Footer />
    </>
  );
}
