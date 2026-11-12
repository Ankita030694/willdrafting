import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdministratorPendenteLiteClient from "./AdministratorPendenteLiteClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Administrator Pendente Lite Petition Format | WillDrafting", // exactly 58 characters
  },
  description:
    "Download Section 247 Indian Succession Act petition format for appointment of Administrator Pendente Lite during contested will and probate trials.", // exactly 147 characters
  keywords: [
    "administrator pendente lite petition format india",
    "section 247 indian succession act petition draft",
    "court receiver application in will dispute sample",
    "appointment of administrator pending probate format",
    "administrator pendente lite powers schedule high court",
    "surety bond administrator pendente lite format",
    "contested will interim estate protection petition",
    "order 40 cpc receiver probate testamentary suit",
    "section 247 isa petition high court original side",
    "testamentary suit court receiver format word pdf",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/petition-for-appointment-of-administrator-pendente-lite-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/petition-for-appointment-of-administrator-pendente-lite-format",
      "x-default": "https://www.willdrafting.in/templates/petition-for-appointment-of-administrator-pendente-lite-format",
    },
  },
  openGraph: {
    title: "Administrator Pendente Lite Petition Format | WillDrafting",
    description:
      "Download Section 247 Indian Succession Act petition format for appointment of Administrator Pendente Lite during contested will and probate trials.",
    url: "https://www.willdrafting.in/templates/petition-for-appointment-of-administrator-pendente-lite-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/petition-for-appointment-of-administrator-pendente-lite-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Administrator Pendente Lite Petition Format Under Section 247 Indian Succession Act",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Administrator Pendente Lite Petition Format | WillDrafting",
    description:
      "Download Section 247 Indian Succession Act petition format for appointment of Administrator Pendente Lite during contested will and probate trials.",
    images: ["https://www.willdrafting.in/images/petition-for-appointment-of-administrator-pendente-lite-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function AdministratorPendenteLitePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/petition-for-appointment-of-administrator-pendente-lite-format";
  const imageUrl =
    "https://www.willdrafting.in/images/petition-for-appointment-of-administrator-pendente-lite-format-og.jpg";

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
        name: "Administrator Pendente Lite Petition Format | WillDrafting",
        description:
          "Download Section 247 Indian Succession Act petition format for appointment of Administrator Pendente Lite during contested will and probate trials.",
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
            name: "Petition for Appointment of Administrator Pendente Lite Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Petition for Appointment of Administrator Pendente Lite Under Section 247 ISA",
        url: canonicalUrl,
        description:
          "High Court and District Court petition draft under Section 247 of the Indian Succession Act, 1925 with Administrator Powers Schedule and Surety Bond template.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is an Administrator Pendente Lite under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Administrator Pendente Lite is a neutral officer appointed by the High Court or District Judge under Section 247 of the Indian Succession Act, 1925. This administrator takes charge of the deceased person's estate while a contested probate or testamentary suit is pending. They have all the powers of a general administrator to protect and manage assets, except they cannot distribute the estate corpus to any party until the court makes a final decree.",
            },
          },
          {
            "@type": "Question",
            name: "When should you file a petition under Section 247 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You should file a Section 247 petition when there is a real risk that estate assets will be wasted, damaged, or stolen during a contested probate suit. Common grounds include one disputing party pocketing commercial rents, siphoning tenant deposits, refusing to pay municipal property taxes, selling movable assets, or mismanaging family businesses.",
            },
          },
          {
            "@type": "Question",
            name: "How does Section 247 ISA differ from Order 40 Rule 1 CPC for court receivers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 247 of the Indian Succession Act is a special statutory provision tailored specifically for testamentary and probate suits. While Order 40 CPC governs receivers across general civil suits, courts applying Section 247 follow similar principles of equity. The key distinction is that an Administrator Pendente Lite automatically assumes the statutory role of a general personal representative under probate law, subject to the express prohibition against distributing estate funds.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Administrator Pendente Lite collect rents and file tax returns?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Unless specifically restricted by the appointing court, an Administrator Pendente Lite has the full legal authority of a general administrator. This includes collecting commercial and residential rents, opening and operating an escrow court bank account, issuing rent receipts, paying municipal property taxes, and filing income tax returns for the deceased estate under Section 159 of the Income Tax Act.",
            },
          },
          {
            "@type": "Question",
            name: "Can an named executor or an interested heir be appointed as Administrator Pendente Lite?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "As a general rule, Indian courts prefer appointing an independent, neutral third party, such as an advocate commissioner, court receiver, or chartered accountant. A named executor or an interested heir will generally not be appointed if their bona fides are challenged or if other heirs object, unless all disputing parties give written consent.",
            },
          },
          {
            "@type": "Question",
            name: "Is the Administrator Pendente Lite required to furnish security or a surety bond?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 291 of the Indian Succession Act and High Court Testamentary Rules, an Administrator Pendente Lite must execute an administration bond with one or more solvent sureties. The bond amount is fixed by the court based on the gross annual valuation and income of the estate to ensure honest accounting.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Administrator Pendente Lite sell or mortgage property of the deceased?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. An Administrator Pendente Lite cannot sell, mortgage, gift, or permanently alienate any immovable or movable property of the estate without prior express leave of the court. Their statutory duty is preservation of the status quo, not disposal.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the Administrator Pendente Lite once probate is granted?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The office of Administrator Pendente Lite terminates automatically upon the final disposal of the testamentary suit. Once probate or letters of administration are granted, the administrator must submit final audited accounts to the court registrar, hand over all books and assets to the successful executor or administrator, and obtain formal discharge.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Administrator Pendente Lite file eviction suits against encroachers or defaulting tenants?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. With the sanction of the appointing court, an Administrator Pendente Lite has the right to initiate, prosecute, and defend civil suits, recovery proceedings, and eviction actions against illegal occupants, trespassers, and defaulting tenants to protect estate revenue.",
            },
          },
          {
            "@type": "Question",
            name: "How is the remuneration or commission of an Administrator Pendente Lite determined?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 247, the court appointing the administrator directs reasonable remuneration out of the estate. High Courts typically fix remuneration as a monthly honorarium or a percentage commission on gross rental collections, paid directly from estate funds before distribution.",
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
        <AdministratorPendenteLiteClient />
        <Footer />
      </div>
    </>
  );
}
