import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporateSuccessionClient from "./CorporateSuccessionClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Business Succession Planning Lawyer | WillDrafting", // exactly 50 characters
  },
  description:
    "Comprehensive business succession planning and family constitution drafting services in India. Protect promoter equity and prevent company deadlock.", // exactly 148 characters
  keywords: [
    "business succession planning lawyer india",
    "family business constitution lawyer",
    "promoter shareholding succession law firm",
    "buy sell agreement advocate india",
    "companies act section 56 share transmission",
    "section 72 nominee trustee companies act",
    "nclt oppression mismanagement section 241",
    "articles of association succession harmonization",
    "private family trust for business shares",
    "family council dispute escalation mechanism",
    "shakti yezdani v jayanand salgaonkar supreme court",
    "ama legal solutions business succession",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/corporate-business-succession-family-constitution",
    languages: {
      "en-IN": "https://www.willdrafting.in/services/corporate-business-succession-family-constitution",
      "x-default": "https://www.willdrafting.in/services/corporate-business-succession-family-constitution",
    },
  },
  openGraph: {
    title: "Business Succession Planning Lawyer | WillDrafting",
    description:
      "Comprehensive business succession planning and family constitution drafting services in India. Protect promoter equity and prevent company deadlock.",
    url: "https://www.willdrafting.in/services/corporate-business-succession-family-constitution",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/corporate-business-succession-family-constitution-og.jpg",
        width: 1200,
        height: 675,
        alt: "Business Succession Planning and Family Constitution Lawyer India Corporate Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Business Succession Planning Lawyer | WillDrafting",
    description:
      "Comprehensive business succession planning and family constitution drafting services in India. Protect promoter equity and prevent company deadlock.",
    images: ["https://www.willdrafting.in/images/corporate-business-succession-family-constitution-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CorporateBusinessSuccessionPage() {
  const canonicalUrl = "https://www.willdrafting.in/services/corporate-business-succession-family-constitution";
  const imageUrl = "https://www.willdrafting.in/images/corporate-business-succession-family-constitution-og.jpg";

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
        name: "Business Succession Planning Lawyer | WillDrafting",
        description:
          "Comprehensive business succession planning and family constitution drafting services in India. Protect promoter equity and prevent company deadlock.",
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
            name: "Services",
            item: "https://www.willdrafting.in/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Corporate Business Succession & Family Constitution",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "AMA Legal Solutions - Corporate Business Succession & Estate Advisory",
        url: canonicalUrl,
        image: imageUrl,
        description:
          "Specialized commercial succession planning, family business constitution drafting, AoA-Will synchronization, and NCLT deadlock defense practice.",
        priceRange: "₹1,00,000 - ₹5,00,000+",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Corporate Business Succession Planning & Family Constitution Drafting",
        serviceType: "Corporate Legal Advisory & Succession Planning",
        provider: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
        description:
          "End-to-end commercial succession legal counsel for Indian SMEs, MSMEs, and family business promoters. Synchronizes Wills, company Articles of Association (AoA), Shareholders' Agreements (SHA), and Family Constitutions.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Succession Planning Deliverables",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Family Business Constitution Drafting",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AoA & Will Synchronization Audit",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "NCLT Oppression & Deadlock Risk Mitigation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Cross-Purchase Buy-Sell Agreement Structuring",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Does a nominee of company shares become the absolute legal owner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A nominee under Section 72 of the Companies Act, 2013 is solely a temporary custodian or trustee. The Supreme Court in Shakti Yezdani v. Jayanand Salgaonkar (2023) held that share nomination does not override the law of succession. Ownership passes strictly to the legal heirs or testamentary beneficiaries named in the promoter's Will.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a company Articles of Association (AoA) conflicts with a founder's Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Corporate articles prevail over private testamentary dispositions regarding company governance and share transmission. Under Section 56 of the Companies Act, 2013, the board may refuse share transmission if the Will breaches transfer restrictions in the AoA. To ensure business continuity, promoters must synchronize their Will with the company AoA and SHA.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Family Constitution legally binding and enforceable in Indian courts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A standalone family constitution is primarily a moral and governance charter. However, it becomes legally binding and enforceable when its key provisions are formally transposed into the Articles of Association (AoA) of the company, incorporated into registered Shareholders' Agreements (SHA), and backed by a registered Family Settlement Agreement.",
            },
          },
          {
            "@type": "Question",
            name: "How can promoters prevent NCLT oppression and management deadlocks upon sudden death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Promoters can prevent Section 241-242 petitions before the NCLT by adopting five legal safeguards: (1) board appointment clauses in the AoA, (2) mandatory pre-litigation family mediation rules, (3) clear buy-sell valuation formulas under Rule 11UA, (4) voting trusts or dual-class equity, and (5) Russian Roulette or shotgun exit mechanisms.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to a partnership firm when a partner passes away without a continuity clause?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 42(c) of the Indian Partnership Act, 1932, a partnership firm automatically dissolves upon the death of any partner unless there is an express contract to the contrary. Banks immediately freeze the firm's operational accounts. A well-drafted partnership deed must contain continuity and survivor-purchase clauses.",
            },
          },
          {
            "@type": "Question",
            name: "What is the role of a Private Family Trust in business succession planning?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Private Family Trust established under the Indian Trusts Act, 1882 holds promoter shareholding outside the probate process. It isolates business assets from individual creditor risks, eliminates probate delays of 2-5 years in metro High Courts, and ensures seamless management continuity through designated corporate trustees.",
            },
          },
          {
            "@type": "Question",
            name: "How are non-active family members compensated without diluting operational control?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A robust family constitution separates economic ownership from operational management. Non-active family heirs can be allocated differential dividend-bearing non-voting shares, fixed debentures, or real estate assets through an Owelty mechanism, while active heirs retain voting equity and board seats.",
            },
          },
          {
            "@type": "Question",
            name: "What is the typical legal retainer fee for business succession planning in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For Indian SMEs, MSMEs, and mid-market business enterprises, comprehensive legal retainers typically range from ₹1,00,000 to ₹5,00,000 or more. This fee covers corporate entity audits, AoA amendment drafting, Family Constitution preparation, cross-purchase buy-sell agreements, and synchronized promoter Wills.",
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
        <CorporateSuccessionClient />
        <Footer />
      </div>
    </>
  );
}
