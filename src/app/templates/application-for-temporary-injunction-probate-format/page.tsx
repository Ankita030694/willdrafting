import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProbateInjunctionClient from "./ProbateInjunctionClient";

// Strict SEO compliance: Title 50-60 chars, Meta Description 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Probate Injunction Application Format | WillDrafting", // exactly 52 characters
  },
  description:
    "Download Order 39 Rules 1 & 2 CPC temporary injunction application format in probate suits. Restrain unauthorized property sale during will contests.", // exactly 149 characters
  keywords: [
    "injunction application format in probate suit india",
    "order 39 rules 1 and 2 cpc probate format",
    "stop sale of estate during probate petition sample",
    "stay on property transfer pending will contest draft",
    "temporary injunction in testamentary suit high court",
    "section 268 indian succession act injunction powers",
    "order 19 affidavit for injunction in probate",
    "interlocutory application restraining executor sale",
    "status quo order format in contested will case",
    "order 39 rule 2a breach of injunction probate",
    "ama legal solutions testamentary litigation lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/application-for-temporary-injunction-probate-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/application-for-temporary-injunction-probate-format",
      "x-default": "https://www.willdrafting.in/templates/application-for-temporary-injunction-probate-format",
    },
  },
  openGraph: {
    title: "Probate Injunction Application Format | WillDrafting",
    description:
      "Download Order 39 Rules 1 & 2 CPC temporary injunction application format in probate suits. Restrain unauthorized property sale during will contests.",
    url: "https://www.willdrafting.in/templates/application-for-temporary-injunction-probate-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/application-for-temporary-injunction-probate-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Order 39 CPC Temporary Injunction Application Format in Probate Suits India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Probate Injunction Application Format | WillDrafting",
    description:
      "Download Order 39 Rules 1 & 2 CPC temporary injunction application format in probate suits. Restrain unauthorized property sale during will contests.",
    images: ["https://www.willdrafting.in/images/application-for-temporary-injunction-probate-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ProbateInjunctionFormatPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/application-for-temporary-injunction-probate-format";
  const imageUrl = "https://www.willdrafting.in/images/application-for-temporary-injunction-probate-format-og.jpg";

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
        name: "Probate Injunction Application Format | WillDrafting",
        description:
          "Download Order 39 Rules 1 & 2 CPC temporary injunction application format in probate suits. Restrain unauthorized property sale during will contests.",
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
            name: "Probate Injunction Application Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Order 39 Rules 1 & 2 CPC Temporary Injunction Application Format in Probate Suits",
        url: canonicalUrl,
        description:
          "Lawyer-vetted legal format for temporary injunction application under Order 39 CPC read with Section 268 of Indian Succession Act to restrain sale of estate assets pending probate.",
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
            name: "Can a probate court grant a temporary injunction to stop the sale of property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. While a probate court does not adjudicate disputed titles to property, Section 268 of the Indian Succession Act, 1925 makes the Code of Civil Procedure applicable to all probate proceedings. Under Order 39 Rules 1 and 2 read with Section 151 CPC and Section 269 of the Indian Succession Act, the court possesses plenary jurisdiction to preserve and protect the corpus of the estate from waste, damage, or alienation pending final decision on the validity of the Will.",
            },
          },
          {
            "@type": "Question",
            name: "What is the tripartite test for getting an injunction in a probate suit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under landmark Supreme Court jurisprudence in Dalpat Kumar v. Prahlad Singh, the applicant must establish three conditions: (1) Prima Facie Case by showing caveatable interest as a natural legal heir and establishing suspicious circumstances surrounding the execution of the disputed Will; (2) Irreparable Injury showing that unauthorized transfer to third parties will create irreversible encumbrances and multi-party litigation that money cannot remedy; and (3) Balance of Convenience demonstrating that freezing alienation preserves the subject matter in custodia legis without causing injustice.",
            },
          },
          {
            "@type": "Question",
            name: "How does a probate proceeding become a contentious testamentary suit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 295 of the Indian Succession Act, 1925, as soon as a caveator files a caveat under Section 284 followed by a verified affidavit in support disclosing grounds of opposition, the petition is numbered as a regular suit. The propounder becomes the Plaintiff and the caveator becomes the Defendant, and full Code of Civil Procedure powers including Order 39 temporary injunctions become immediately enforceable.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if an executor sells property during the pendency of a probate petition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If an injunction has been granted, any sale or mortgage executed in violation of court orders attracts severe contempt proceedings under Order 39 Rule 2A CPC, punishable with attachment of properties and civil prison detention up to three months. Furthermore, under the landmark ruling in Surjit Singh v. Harbans Singh, any transfer made in defiance of an injunction order is illegal and void ab initio.",
            },
          },
          {
            "@type": "Question",
            name: "Does Section 52 of the Transfer of Property Act apply to probate proceedings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once a caveat is filed and the petition is converted into a contentious testamentary suit under Section 295, the doctrine of Lis Pendens under Section 52 applies. Any third-party purchaser pendente lite takes the property strictly subject to the ultimate decree of the court, although obtaining an express Order 39 injunction is strongly advised to prevent third-party possession disputes.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Order 39 Injunction and Section 247 Administrator Pendente Lite?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Order 39 injunction is a restraining order that commands parties to maintain status quo and prohibits sale, encumbrance, or structural alteration. In contrast, Section 247 of the Indian Succession Act appoints an independent court officer (Administrator Pendente Lite or Receiver under Order 40 CPC) to actively take physical custody, collect tenant rents, pay municipal taxes, and manage running commercial assets until the Will contest concludes.",
            },
          },
          {
            "@type": "Question",
            name: "Can I serve the injunction order on the Sub-Registrar of Assurances?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Once the High Court or District Judge issues an interim status quo order, an advocate must immediately serve a certified copy along with an official letter of intimation on the jurisdictional Sub-Registrar (SRO) and revenue authorities (Tahsildar or Municipal Corporation). This formally blocks the registration of any sale deed, gift deed, or revenue mutation in respect of the property.",
            },
          },
          {
            "@type": "Question",
            name: "What documents must be attached with the Order 39 application in a probate court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You must attach: (1) Sworn verification affidavit under Order 19 CPC detailing personal knowledge and specific threats; (2) Certified pedigree table proving caveatable interest as Class I or II legal heir; (3) Evidence of suspicious circumstances (medical records showing mental incapacity, suspicious handwriting reports); (4) Evidence of imminent alienation (property portal listings, broker communications, site photographs); and (5) Property schedule specifying survey numbers and boundaries.",
            },
          },
          {
            "@type": "Question",
            name: "How quickly can an ex-parte status quo order be obtained in urgent situations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In extreme emergencies where demolition or imminent registered sale is demonstrated, the court can grant an ex-parte ad-interim injunction on the very first day under the proviso to Order 39 Rule 3 CPC. The applicant must comply with the mandatory requirement of delivering copies to the opposite party by registered post or courier on the same day.",
            },
          },
          {
            "@type": "Question",
            name: "What is the court fee payable on an interlocutory injunction application in probate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Because an interlocutory application under Order 39 is filed within an existing testamentary suit, it does not require ad-valorem court fees on the market value of the property. A nominal miscellaneous court fee stamp (ranging from ₹10 to ₹100 depending on the state Court Fees Act) is affixed to the application and supporting affidavit.",
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
        <ProbateInjunctionClient />
        <Footer />
      </div>
    </>
  );
}
