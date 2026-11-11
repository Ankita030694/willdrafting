import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialNeedsTrustClauseClient from "./SpecialNeedsTrustClauseClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Special Needs Trust Clause Format India | WillDrafting", // exactly 54 characters
  },
  description:
    "Download special needs trust clause format for Indian wills. Protect disabled children with lifelong maintenance under Indian Trusts Act 1882.", // exactly 142 characters
  keywords: [
    "special needs child trust clause in will format",
    "testamentary trust for disabled child draft india",
    "national trust act compliant will clause",
    "lifelong care private trust sample format",
    "section 5 indian trusts act 1882 testamentary trust",
    "special needs child will format india",
    "section 14 national trust act legal guardian will",
    "protective trust clause for autistic child india",
    "disability private family trust taxation section 164",
    "successor trustee safeguard clause india",
    "medical emergency buffer fund clause will",
    "ama legal solutions special needs trust lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/special-needs-child-private-trust-clause-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/special-needs-child-private-trust-clause-format",
      "x-default": "https://www.willdrafting.in/templates/special-needs-child-private-trust-clause-format",
    },
  },
  openGraph: {
    title: "Special Needs Trust Clause Format India | WillDrafting",
    description:
      "Download special needs trust clause format for Indian wills. Protect disabled children with lifelong maintenance under Indian Trusts Act 1882.",
    url: "https://www.willdrafting.in/templates/special-needs-child-private-trust-clause-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/special-needs-child-private-trust-clause-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Special Needs Child Private Trust Clause Format for Indian Wills under Indian Trusts Act",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Special Needs Trust Clause Format India | WillDrafting",
    description:
      "Download special needs trust clause format for Indian wills. Protect disabled children with lifelong maintenance under Indian Trusts Act 1882.",
    images: ["https://www.willdrafting.in/images/special-needs-child-private-trust-clause-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SpecialNeedsTrustClausePage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/special-needs-child-private-trust-clause-format";
  const imageUrl = "https://www.willdrafting.in/images/special-needs-child-private-trust-clause-format-og.jpg";

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
        name: "Special Needs Trust Clause Format India | WillDrafting",
        description:
          "Download special needs trust clause format for Indian wills. Protect disabled children with lifelong maintenance under Indian Trusts Act 1882.",
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
            name: "Special Needs Trust Clause Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Special Needs Child Private Trust Clause Format India",
        headline: "Special Needs Child Trust Clause Format for Indian Wills",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Lawyer-vetted testamentary trust clause format for special needs and disabled children under Indian Trusts Act 1882 and National Trust Act 1999.",
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
            name: "What is a special needs testamentary private trust under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A special needs testamentary private trust is a protective legal vehicle created through a Will under Section 5 and Section 6 of the Indian Trusts Act, 1882. It takes effect upon the death of the parents, holding assets in trust for the lifelong maintenance, medical care, therapy, and housing of a child with special needs without transferring direct ownership to the child.",
            },
          },
          {
            "@type": "Question",
            name: "Why should Indian parents never leave property directly to a special needs child in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bequeathing property directly to a person with cognitive or intellectual disabilities exposes the assets to exploitation by relatives, legal freezes, and cumbersome court guardianship proceedings. A disabled individual cannot manage tenant disputes, banking operations, or sales, making direct bequests vulnerable to siphoning.",
            },
          },
          {
            "@type": "Question",
            name: "How does the National Trust Act 1999 interact with a testamentary private trust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 14 of the National Trust Act, 1999, the Local Level Committee headed by the District Collector appoints a Legal Guardian for persons with autism, cerebral palsy, mental retardation, and multiple disabilities. A well-drafted Will separates the Legal Guardian of the person from the Financial Trustees of the property to eliminate financial conflicts of interest.",
            },
          },
          {
            "@type": "Question",
            name: "How is a special needs private trust taxed under Section 164(1) of the Income Tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While discretionary trusts are normally taxed at the Maximum Marginal Rate, the first proviso to Section 164(1) grants a vital exemption for testamentary trusts created for a dependent relative with disability. Such trusts are taxed at normal individual income tax slab rates, preserving the maximum possible corpus for the child's care.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Medical Emergency Buffer Fund Rule inside the trust clause?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Medical Emergency Buffer Fund Rule mandates that the trustees keep a ring-fenced liquid reserve (such as designated bank fixed deposits or liquid debt instruments) exclusively for hospitalization, specialized surgeries, and critical therapies, preventing trustees from locking all capital into illiquid investments.",
            },
          },
          {
            "@type": "Question",
            name: "How does an institutional co-trustee safeguard the child against predatory relatives?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Appointing an institutional co-trustee (such as a registered trust company, bank trustee wing, or a registered NGO under the National Trust Act) ensures dual authorization for financial transactions. Family trustees cannot withdraw or liquidate trust assets without institutional compliance and verification of actual expenditures.",
            },
          },
          {
            "@type": "Question",
            name: "Can the trust assets be attached by creditors or relatives?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A properly drafted spendthrift and anti-alienation clause establishes that the trust corpus belongs to the trust and not to the beneficiary or relatives. Therefore, trust assets cannot be attached by civil courts for personal debts of the relatives or guardians.",
            },
          },
          {
            "@type": "Question",
            name: "What is a gift-over clause in a special needs testamentary trust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A gift-over clause dictates how any remaining trust property is distributed upon the eventual demise of the special needs child. Parents can direct the residual corpus to surviving siblings, extended family members, or registered disability charities, preventing hostile intestate disputes.",
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
        <SpecialNeedsTrustClauseClient />
        <Footer />
      </div>
    </>
  );
}
