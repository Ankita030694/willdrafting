import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LLPPartnerTransmissionClient from "./LLPPartnerTransmissionClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "LLP Partner Transmission Notice Format | WillDrafting", // exactly 53 characters
  },
  description:
    "Download LLP partner transmission notice format and supplemental deed under LLP Act 2008. Settle capital contribution upon death of designated partner.", // exactly 151 characters
  keywords: [
    "transmission of partnership interest in llp notice format",
    "form 4 llp partner death format",
    "legal heir admission in llp draft notice",
    "llp partner capital transmission letter sample",
    "supplemental llp agreement death of partner format",
    "section 24 limited liability partnership act 2008",
    "section 25 mca form 4 cessation notice",
    "capital contribution settlement deceased partner llp",
    "section 6 llp act six month survival partner liability",
    "rule 10 llp rules 2009 partner change notice",
    "ama legal solutions llp partner succession lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/llp-partner-transmission-notice-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/llp-partner-transmission-notice-format-india",
      "x-default": "https://www.willdrafting.in/templates/llp-partner-transmission-notice-format-india",
    },
  },
  openGraph: {
    title: "LLP Partner Transmission Notice Format | WillDrafting",
    description:
      "Download LLP partner transmission notice format and supplemental deed under LLP Act 2008. Settle capital contribution upon death of designated partner.",
    url: "https://www.willdrafting.in/templates/llp-partner-transmission-notice-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/llp-partner-transmission-notice-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "LLP Partner Transmission Notice Format MCA Form 4 and Supplemental Deed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LLP Partner Transmission Notice Format | WillDrafting",
    description:
      "Download LLP partner transmission notice format and supplemental deed under LLP Act 2008. Settle capital contribution upon death of designated partner.",
    images: ["https://www.willdrafting.in/images/llp-partner-transmission-notice-format-india-og.jpg"],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function LLPPartnerTransmissionPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/llp-partner-transmission-notice-format-india";
  const imageUrl = "https://www.willdrafting.in/images/llp-partner-transmission-notice-format-india-og.jpg";

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
        name: "LLP Partner Transmission Notice Format | WillDrafting",
        description:
          "Download LLP partner transmission notice format and supplemental deed under LLP Act 2008. Settle capital contribution upon death of designated partner.",
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
            name: "LLP Partner Transmission Notice Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: {
          "@id": `${canonicalUrl}#webpage`,
        },
        headline: "LLP Partner Transmission Notice Format India",
        description:
          "Complete legal guide, MCA Form 4 notice draft, supplemental LLP agreement template, and capital balance settlement schedule under the Limited Liability Partnership Act, 2008.",
        image: imageUrl,
        datePublished: "2026-11-12T00:00:00+05:30",
        dateModified: "2026-11-12T00:00:00+05:30",
        mainEntityOfPage: canonicalUrl,
        author: {
          "@type": "Person",
          name: "Lawyer Anuj Anand Malik",
          jobTitle: "Senior Estate & Corporate Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
            url: "https://www.amalegalsolutions.com",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "LLP Partner Transmission Legal Notice Draft & Supplemental Deed Format",
        url: canonicalUrl,
        description:
          "Lawyer-vetted legal transmission notice draft, MCA Form 4 filing pack, and Supplemental LLP Agreement for designated partner demise under Section 24 and 25 of the LLP Act, 2008.",
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
            name: "What happens when a partner dies in a Limited Liability Partnership in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 24(2) of the LLP Act 2008, a person ceases to be a partner upon demise. Because an LLP has perpetual succession as a body corporate under Section 3, the firm does not automatically dissolve. The economic rights of the deceased partner transmit to their legal heirs under Section 24(5), but partner management rights do not automatically transfer unless the LLP agreement allows it.",
            },
          },
          {
            "@type": "Question",
            name: "Does a legal heir automatically become a partner in an LLP upon the partner's death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 24(6) of the LLP Act 2008, the legal representative or heir does not automatically get the right to interfere in management. An heir only becomes a partner if the registered LLP agreement has a clear admission clause, or if all surviving partners consent in writing and execute a formal Supplemental LLP Agreement.",
            },
          },
          {
            "@type": "Question",
            name: "What is the deadline for filing MCA Form 4 upon the death of an LLP partner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 25(2) of the LLP Act 2008 read with Rule 10 of the LLP Rules 2009, the LLP must file MCA Form 4 with the Registrar of Companies within strictly 30 days of the date of demise. Late filing attracts daily statutory additional fees under Section 69.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a two-partner LLP loses one partner to death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 6 of the LLP Act 2008, an LLP must have at least two partners. If partner count drops to one and business carries on beyond 6 months, the sole surviving partner becomes personally liable for all firm obligations incurred during that time. The surviving partner must admit a legal heir or new partner within 6 months.",
            },
          },
          {
            "@type": "Question",
            name: "How is the capital balance calculated and settled under Section 24(5) of the LLP Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 24(5) gives the legal representative the right to receive an amount equal to the deceased partner's actual capital contribution plus their share of accumulated profits after deducting accumulated losses, determined as of the date of death. This is verified by an interim balance sheet prepared by the statutory auditor.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Supplemental LLP Agreement mandatory when settling capital transmission?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Any change in the partner roster, designated partner appointment, capital contribution ratio, or profit-sharing percentages requires a Supplemental LLP Agreement. It must be executed on non-judicial stamp paper and filed with MCA in Form 3 within 30 days of execution.",
            },
          },
          {
            "@type": "Question",
            name: "What documents must be attached to MCA Form 4 for partner transmission?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mandatory attachments include: (1) Certified true copy of the municipal Death Certificate, (2) Board or Partner Resolution taking formal note of the cessation, (3) Legal Heir Certificate or Surviving Member Certificate or Registered Will with Probate, (4) Consent and NOC of legal heirs, and (5) Supplemental LLP Agreement.",
            },
          },
          {
            "@type": "Question",
            name: "How much stamp duty is payable on a Supplemental LLP Agreement in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stamp duty on Supplemental LLP Agreements varies by state. In Delhi, a flat non-judicial stamp duty of ₹1,000 applies. In Maharashtra, stamp duty is payable under Article 47. In Karnataka, Article 40 applies. If total capital contribution is increased, ad valorem stamp duty applies on the incremental capital.",
            },
          },
          {
            "@type": "Question",
            name: "Does transmission of LLP capital to legal heirs attract capital gains tax in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Receipt of inheritance by legal heirs under Section 56(2)(x) of the Income Tax Act 1961 is strictly exempt from tax. Furthermore, returning the deceased partner's original capital balance does not trigger capital gains for the legal heirs. However, firm-level capital gains can arise if immovable firm assets are transferred directly to settle claims.",
            },
          },
          {
            "@type": "Question",
            name: "What remedies exist if surviving partners refuse to settle the deceased partner's capital balance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If surviving partners fail or refuse to settle the capital balance under Section 24(5), the legal heirs can issue a formal legal transmission notice, invoke the dispute resolution or arbitration clause under the LLP agreement, or petition the National Company Law Tribunal (NCLT) for oppressive conduct or winding up under Section 64.",
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
        <LLPPartnerTransmissionClient />
        <Footer />
      </div>
    </>
  );
}
