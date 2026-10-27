import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NriSeparateIndianWillClient from "./NriSeparateIndianWillClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "NRI Will Format for Indian Property | WillDrafting.in", // exactly 53 characters
  },
  description:
    "Download legally valid NRI will format for Indian property compliant with Indian Succession Act, 1925. Features separate situs and non-conflict clauses.", // exactly 152 characters
  keywords: [
    "nri will format for indian property",
    "indian will template for nri oci",
    "separate situs will format india pdf",
    "nri will revocation clause format",
    "lex situs section 5 indian succession act",
    "fema 21r immovable property will",
    "nri probate high court bombay calcutta",
    "form 15ca 15cb nri property repatriation",
    "section 195 tds nri inherited property",
    "ama legal solutions nri estate planning",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/nri-separate-indian-will-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/nri-separate-indian-will-format",
      "x-default": "https://www.willdrafting.in/templates/nri-separate-indian-will-format",
    },
  },
  openGraph: {
    title: "NRI Will Format for Indian Property | WillDrafting.in",
    description:
      "Download legally valid NRI will format for Indian property compliant with Indian Succession Act, 1925. Features separate situs and non-conflict clauses.",
    url: "https://www.willdrafting.in/templates/nri-separate-indian-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/nri-separate-indian-will-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "NRI Will Format for Indian Property and Separate Indian Situs Will Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Will Format for Indian Property | WillDrafting.in",
    description:
      "Download legally valid NRI will format for Indian property compliant with Indian Succession Act, 1925. Features separate situs and non-conflict clauses.",
    images: ["https://www.willdrafting.in/images/nri-separate-indian-will-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function NriSeparateIndianWillPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/nri-separate-indian-will-format";
  const imageUrl = "https://www.willdrafting.in/images/nri-separate-indian-will-format-og.jpg";

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
        name: "NRI Will Format for Indian Property | WillDrafting.in",
        description:
          "Download legally valid NRI will format for Indian property compliant with Indian Succession Act, 1925. Features separate situs and non-conflict clauses.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
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
            name: "Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "NRI Separate Indian Will Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "NRI Will Format for Indian Property (Separate Indian Situs Will)",
        url: canonicalUrl,
        description:
          "Lawyer-vetted territory-restricted Indian situs Will template for Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) featuring a non-conflict territorial revocation clause.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Why should an NRI have a separate Indian Will for assets in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 5 of the Indian Succession Act, 1925, succession to immovable property in India is strictly governed by Indian law (lex situs), regardless of the deceased's overseas domicile. Having a dedicated Indian Will avoids complex cross-border probate delays, prevents heavy exemplification expenses, and eliminates the catastrophic risk of accidentally revoking your foreign estate plan.",
            },
          },
          {
            "@type": "Question",
            name: "How does a standard Indian Will template accidentally revoke a US, UK, or UAE Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Almost all generic Will templates contain a boilerplate clause stating: 'I hereby revoke all my previous Wills and testamentary dispositions.' Under Section 62 of the Indian Succession Act and international private law, signing this clause revokes all prior wills executed globally, including your US living trust, UK will, or UAE DIFC will. An NRI Will must use a territorial non-conflict revocation clause restricting revocation strictly to prior Indian wills.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI bequeath agricultural land or farmhouses in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under FEMA Regulations (Notification No. FEMA 21(R)/2018-RB), an NRI or OCI cannot purchase agricultural land, plantation property, or farmhouses in India. However, an NRI or OCI can inherit agricultural land from a resident Indian. An NRI can bequeath such inherited agricultural land by Will to an Indian citizen residing in India. Bequeathing agricultural land to foreign citizens who are not of Indian origin requires prior RBI approval.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate mandatory in India for a Will executed overseas by an NRI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory if the Will is made within or pertains to immovable properties situated within the ordinary original civil jurisdiction of the High Courts of Bombay, Calcutta, or Chennai. For properties in Delhi, Bengaluru, Hyderabad, or other regions, probate is optional unless required by local housing societies, banks, or revenue authorities.",
            },
          },
          {
            "@type": "Question",
            name: "Can a foreign court probate order be directly executed in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A foreign probate decree cannot be directly executed in India to transfer land or bank accounts. Under Section 228 of the Indian Succession Act, 1925, the executor must file a petition before an Indian District Court or High Court for the grant of Ancillary Letters of Administration with a certified copy of the foreign Will annexed. This process often takes 18 to 36 months, which is why a separate Indian Will is strongly recommended.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI appoint an Indian resident as an executor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, and it is highly recommended. Appointing a trusted Indian resident, such as a family member, chartered accountant, or an advocate from AMA Legal Solutions, ensures that physical court appearances, Sub-Registrar visits, and bank verifications can proceed smoothly without requiring the NRI executor to travel to India.",
            },
          },
          {
            "@type": "Question",
            name: "How should an NRI execute an Indian Will while living abroad?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 63 of the Indian Succession Act, 1925, the Will must be signed by the testator in the presence of at least two independent adult witnesses who sign in the testator's presence. For foreign execution, it is best practice to have the Will signed before a Notary Public and apostilled (for Hague Convention countries like the USA, UK, Australia) or attested at the nearest Indian Embassy or High Commission.",
            },
          },
          {
            "@type": "Question",
            name: "Can sale proceeds of inherited property be repatriated abroad by an NRI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under RBI FEMA regulations and the Liberalised Remittance Scheme (LRS), an NRI or OCI can repatriate up to USD 1,000,000 (One Million US Dollars) per financial year out of balances held in their NRO account representing the sale proceeds of inherited property, subject to payment of applicable capital gains taxes and submission of Form 15CA and Form 15CB.",
            },
          },
          {
            "@type": "Question",
            name: "What is Section 195 TDS when an NRI sells inherited property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 195 of the Income Tax Act, 1961, the buyer must deduct TDS at 12.5% or 20% plus surcharge and cess on payments to an NRI seller. Without a Lower Deduction Certificate, TDS is deducted on the gross sale consideration rather than the net capital gain. NRI sellers should apply for a Section 197 certificate (Form 13) on the TRACES portal before executing the conveyance deed.",
            },
          },
          {
            "@type": "Question",
            name: "Does an NRI need to register an Indian Will at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Registration is voluntary under Section 18(e) of the Registration Act, 1908. An unregistered Will executed before two independent witnesses on plain paper is legally valid. However, if the NRI visits India, registering the Will before the Sub-Registrar where the immovable property is located provides formidable legal protection against frivolous challenges by distant relatives.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
        <Navbar />
        <NriSeparateIndianWillClient />
        <Footer />
      </div>
    </>
  );
}
