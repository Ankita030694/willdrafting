import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdministratorPendenteLiteClient from "./AdministratorPendenteLiteClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Administrator Pendente Lite Evaluator | WillDrafting", // exactly 52 characters
  },
  description:
    "Evaluate grounds to appoint an Administrator Pendente Lite under Section 247 Indian Succession Act during probate litigation. Prevent estate waste.", // exactly 147 characters
  keywords: [
    "administrator pendente lite eligibility evaluator",
    "section 247 indian succession act checker",
    "court receiver estate pending probate tool",
    "protect estate during will contest checklist",
    "interim court receiver appointment contested will",
    "section 247 isa petition readiness checker",
    "prevent estate waste during probate trial india",
    "order 40 rule 1 cpc probate receiver",
    "pandurang shamrao laud v dwarkadas kalliandas",
    "bombay high court testamentary receiver rules",
    "high court testamentary suit contested will defense",
    "ama legal solutions testamentary litigation",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/administrator-pendente-lite-urgency-evaluator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/administrator-pendente-lite-urgency-evaluator",
      "x-default": "https://www.willdrafting.in/tools/administrator-pendente-lite-urgency-evaluator",
    },
  },
  openGraph: {
    title: "Administrator Pendente Lite Evaluator | WillDrafting",
    description:
      "Evaluate grounds to appoint an Administrator Pendente Lite under Section 247 Indian Succession Act during probate litigation. Prevent estate waste.",
    url: "https://www.willdrafting.in/tools/administrator-pendente-lite-urgency-evaluator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/administrator-pendente-lite-urgency-evaluator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Administrator Pendente Lite Urgency Evaluator under Section 247 ISA India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Administrator Pendente Lite Evaluator | WillDrafting",
    description:
      "Evaluate grounds to appoint an Administrator Pendente Lite under Section 247 Indian Succession Act during probate litigation. Prevent estate waste.",
    images: ["https://www.willdrafting.in/images/administrator-pendente-lite-urgency-evaluator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function AdministratorPendenteLiteEvaluatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/administrator-pendente-lite-urgency-evaluator";
  const imageUrl = "https://www.willdrafting.in/images/administrator-pendente-lite-urgency-evaluator-og.jpg";

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
        name: "Administrator Pendente Lite Evaluator | WillDrafting",
        description:
          "Evaluate grounds to appoint an Administrator Pendente Lite under Section 247 Indian Succession Act during probate litigation. Prevent estate waste.",
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
            name: "Tools",
            item: "https://www.willdrafting.in/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Administrator Pendente Lite Evaluator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Administrator Pendente Lite Urgency Evaluator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive diagnostic legal tool to evaluate the balance of convenience, risk of waste, rental diversion, and necessity for appointing an Administrator Pendente Lite or Court Receiver under Section 247 of the Indian Succession Act, 1925 and Order 40 Rule 1 of the Code of Civil Procedure during contested Will litigation.",
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is an Administrator Pendente Lite under Section 247 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Administrator Pendente Lite is a neutral officer or receiver appointed by a testamentary court under Section 247 of the Indian Succession Act, 1925, while a lawsuit touching the validity of a Will or the grant or revocation of probate is pending. The administrator possesses all the rights and powers of a general administrator to collect rents, manage assets, and defend estate debts, but is strictly prohibited from distributing the estate until the trial concludes.",
            },
          },
          {
            "@type": "Question",
            name: "When will an Indian court appoint an Administrator Pendente Lite during a Will contest?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The court appoints an Administrator Pendente Lite when there is a bona fide legal contest regarding the validity of a Will (lis pendens) and there is no neutral person legally entitled to manage the estate, or where there is an imminent risk of waste, damage, or diversion of rental income by one contentious co-heir. As established in Pandurang Shamrao Laud v. Dwarkadas Kalliandas (AIR 1933 Bom 342), the applicant does not need to establish extreme fraud; demonstrating bona fide litigation and estate vulnerability is sufficient.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Administrator Pendente Lite sell or distribute the deceased person's property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 247 of the Indian Succession Act expressly provides that the administrator pendente lite has general administrative powers 'other than the right of distributing such estate'. They cannot sell immovable property without explicit prior sanction of the court, nor can they distribute estate assets or funds to any legal heir until the probate suit is finally decreed.",
            },
          },
          {
            "@type": "Question",
            name: "How is Section 247 ISA different from appointing a Court Receiver under Order 40 Rule 1 CPC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While Order 40 Rule 1 of the CPC requires demonstrating that receiver appointment is 'just and convenient' (often demanding proof of irreparable damage or strong prima facie title in regular civil suits), Section 247 of the Indian Succession Act is specific to testamentary disputes. Because an unprobated executor cannot deal with contested property against a caveat, Section 247 provides a statutory mechanism to prevent the estate from remaining unrepresented and unprotected during lengthy probate trials.",
            },
          },
          {
            "@type": "Question",
            name: "Who collects rental income from tenants while a probate lawsuit is pending?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When an Administrator Pendente Lite is appointed, the court directs all tenants to pay monthly rents directly to the administrator or deposit them into an official court bank account. If one co-heir has been illegally collecting rents and refusing to share accounts, the court can order that co-heir to deposit all past arrears and restrain them from intercepting future rents.",
            },
          },
          {
            "@type": "Question",
            name: "Who pays the fees and remuneration of an Administrator Pendente Lite?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 247 of the Indian Succession Act, the administrator pendente lite is entitled to reasonable remuneration fixed by the court. This commission (usually ranging between 1.5% and 5% of gross collections, or a fixed monthly allowance) is paid out of the income or corpus of the deceased's estate as a first-charge administration expense before any other disbursements.",
            },
          },
          {
            "@type": "Question",
            name: "Does an Administrator Pendente Lite need to furnish an administration bond with sureties?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 291 of the Indian Succession Act, 1925, an administrator pendente lite is typically required to execute an administration bond with one or more solvent sureties, ensuring faithful management and regular submission of true accounts, unless an Official Trustee or Court Receiver attached to the High Court is appointed in their ex-officio capacity.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to a running factory or family business during contested probate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the deceased operated a sole proprietorship, factory, or active commercial firm, the court can grant the Administrator Pendente Lite specific operational powers to disburse employee salaries, sign statutory GST/TDS tax returns, renew trade licenses, and safeguard inventory, ensuring the enterprise does not collapse into insolvency during probate litigation.",
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
