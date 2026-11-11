import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpendthriftTrustClauseClient from "./SpendthriftTrustClauseClient";

// Screaming Frog SEO Rules: Title 30-60 chars (52), Meta Description 70-154 chars (145), 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Spendthrift Trust Clause Format India | WillDrafting", // 52 characters
  },
  description:
    "Protect family inheritance from creditors and insolvency. Download spendthrift trust clause format for Indian wills under Indian Trusts Act 1882.", // 145 characters
  keywords: [
    "spendthrift trust clause in will format india",
    "protect inheritance from son creditors clause",
    "insolvency protective trust clause india",
    "spendthrift beneficiary will sample",
    "section 138 indian succession act 1925",
    "section 6 and 9 indian trusts act 1882",
    "section 60 cpc attachment immunity trust",
    "discretionary monthly stipend will clause",
    "insolvency attachment bar will format",
    "section 164 income tax sole testamentary trust",
    "protect family property from business debt",
    "ama legal solutions private family trust",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/spendthrift-trust-protective-clause-will-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/spendthrift-trust-protective-clause-will-format",
      "x-default": "https://www.willdrafting.in/templates/spendthrift-trust-protective-clause-will-format",
    },
  },
  openGraph: {
    title: "Spendthrift Trust Clause Format India | WillDrafting",
    description:
      "Protect family inheritance from creditors and insolvency. Download spendthrift trust clause format for Indian wills under Indian Trusts Act 1882.",
    url: "https://www.willdrafting.in/templates/spendthrift-trust-protective-clause-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/spendthrift-trust-protective-clause-will-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Spendthrift Trust Clause Format for Indian Wills under Indian Trusts Act 1882",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Spendthrift Trust Clause Format India | WillDrafting",
    description:
      "Protect family inheritance from creditors and insolvency. Download spendthrift trust clause format for Indian wills under Indian Trusts Act 1882.",
    images: [
      "https://www.willdrafting.in/images/spendthrift-trust-protective-clause-will-format-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SpendthriftTrustProtectiveClausePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/spendthrift-trust-protective-clause-will-format";
  const imageUrl =
    "https://www.willdrafting.in/images/spendthrift-trust-protective-clause-will-format-og.jpg";

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
        name: "Spendthrift Trust Clause Format India | WillDrafting",
        description:
          "Protect family inheritance from creditors and insolvency. Download spendthrift trust clause format for Indian wills under Indian Trusts Act 1882.",
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
            name: "Spendthrift Trust Clause Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Spendthrift Trust Clause Format India (Indian Trusts Act 1882)",
        headline: "Spendthrift Trust Clause in Will Format: India Legal Guide",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Creditor-proof spendthrift trust clause format for Indian wills with discretionary monthly stipend rule, CPC Section 60 immunity table, and insolvency attachment bar.",
        image: imageUrl,
        inLanguage: "en-IN",
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can creditors seize property left to my son through a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, if you leave property directly to an indebted son. Once legal title vests in him, his business creditors can attach and sell the asset under Section 60(1) of the Code of Civil Procedure, 1908. Creating a discretionary spendthrift trust inside your Will under Sections 6 and 9 of the Indian Trusts Act, 1882 keeps legal ownership with independent Trustees so creditors cannot seize the corpus.",
            },
          },
          {
            "@type": "Question",
            name: "Why does writing 'my son cannot sell this house' fail under Section 138 ISA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 138 of the Indian Succession Act, 1925 voids any restriction attached to an absolute gift of property or funds. Under Section 10 of the Transfer of Property Act, 1882, absolute restraints on sale are also void. To protect the inheritance legally, you must leave legal ownership to Trustees on a discretionary trust rather than giving an absolute gift to your son.",
            },
          },
          {
            "@type": "Question",
            name: "How does CPC Section 60 protect a discretionary monthly stipend?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 60(1) of the Code of Civil Procedure, 1908, creditors can only seize saleable property or fixed rights that a debtor owns. In a pure discretionary trust, the son has no fixed legal claim to demand money, so the corpus stays immune. Also, proviso (n) to Section 60(1) exempts a pure right to future maintenance from court attachment.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if Trustees deposit trust cash into my son's personal bank account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "That creates a post-distribution trap. Trust assets stay safe only while inside the trust. Once cash is deposited into the debtor's own bank account, creditors can freeze it through a court garnishee order under Order 21 Rule 46 of the CPC. To prevent this, our Trustee Powers Draft empowers Trustees to pay rent, school fees, and medical bills directly to vendors.",
            },
          },
          {
            "@type": "Question",
            name: "How is a spendthrift testamentary trust taxed under Section 164(1) of the Income Tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ordinarily, discretionary trusts with indeterminate beneficiary shares pay the Maximum Marginal Rate of tax. However, proviso (ii) to Section 164(1) of the Income Tax Act, 1961 gives a major relief for wills. If the trust is created by a Will and is the only trust declared by that Will, its income is taxed at normal individual slab rates.",
            },
          },
          {
            "@type": "Question",
            name: "Can an indebted person put their own assets into a spendthrift trust to avoid existing loans?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A person cannot transfer their own property into a self-settled trust to defeat their own creditors. Courts strike down such transfers as fraudulent under Section 53 of the Transfer of Property Act, 1882 and the Insolvency and Bankruptcy Code, 2016. Only a parent or third party can shield their own self-acquired property for a child through a Will.",
            },
          },
          {
            "@type": "Question",
            name: "Can I put ancestral or HUF property into a spendthrift trust for my son?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can only place your own self-acquired assets or your own undivided coparcenary share under Section 30 of the Hindu Succession Act, 1956 into a testamentary trust. You cannot lock away your son's existing birthright coparcenary share in ancestral HUF property through your Will.",
            },
          },
          {
            "@type": "Question",
            name: "Who should I appoint as Trustees for a protective spendthrift trust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Always appoint at least two independent, unindebted adults, such as your spouse, an unindebted sibling, a trusted family Chartered Accountant, or a corporate trustee. Never make the indebted beneficiary the sole trustee, because holding full legal control and enjoyment defeats creditor immunity.",
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
        <SpendthriftTrustClauseClient />
        <Footer />
      </div>
    </>
  );
}
