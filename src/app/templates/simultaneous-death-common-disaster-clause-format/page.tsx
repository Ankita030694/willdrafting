import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimultaneousDeathClauseClient from "./SimultaneousDeathClauseClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Simultaneous Death Clause Format India | WillDrafting", // exactly 53 characters
  },
  description:
    "Download verified 30-day survivorship and simultaneous death clause format for Indian wills. Prevent double probate fees and legal heir conflicts.", // exactly 146 characters
  keywords: [
    "common disaster simultaneous death clause will format",
    "commorientes clause in will india sample",
    "30 day survivorship clause format",
    "husband and wife car accident succession clause",
    "section 21 hindu succession act override clause",
    "section 105 indian succession act lapse of legacy",
    "section 124 indian succession act contingent bequest",
    "prevent double probate fees husband wife will india",
    "mirror will survivorship clause india",
    "jayantilal mansukhlal section 21 hsa",
    "alternate executor simultaneous death clause will",
    "ama legal solutions estate planning india",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/simultaneous-death-common-disaster-clause-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/simultaneous-death-common-disaster-clause-format",
      "x-default": "https://www.willdrafting.in/templates/simultaneous-death-common-disaster-clause-format",
    },
  },
  openGraph: {
    title: "Simultaneous Death Clause Format India | WillDrafting",
    description:
      "Download verified 30-day survivorship and simultaneous death clause format for Indian wills. Prevent double probate fees and legal heir conflicts.",
    url: "https://www.willdrafting.in/templates/simultaneous-death-common-disaster-clause-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/simultaneous-death-common-disaster-clause-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Simultaneous Death and Common Disaster Will Clause Format India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Simultaneous Death Clause Format India | WillDrafting",
    description:
      "Download verified 30-day survivorship and simultaneous death clause format for Indian wills. Prevent double probate fees and legal heir conflicts.",
    images: ["https://www.willdrafting.in/images/simultaneous-death-common-disaster-clause-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SimultaneousDeathClausePage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/simultaneous-death-common-disaster-clause-format";
  const imageUrl = "https://www.willdrafting.in/images/simultaneous-death-common-disaster-clause-format-og.jpg";

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
        name: "Simultaneous Death Clause Format India | WillDrafting",
        description:
          "Download verified 30-day survivorship and simultaneous death clause format for Indian wills. Prevent double probate fees and legal heir conflicts.",
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
            name: "Simultaneous Death Clause Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Simultaneous Death and Common Disaster Clause Format for Indian Wills",
        headline: "Simultaneous Death & Common Disaster Will Clause Format",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Verified 30-day survivorship clause format, Section 21 Hindu Succession Act override text, and double probate avoidance guide for Indian couples.",
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
            name: "What happens if a husband and wife die together in an accident in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If spouses die together and no proof shows who lived longer, Section 21 of the Hindu Succession Act presumes the younger spouse outlived the elder spouse. Assets from the elder spouse pass to the younger spouse's estate first, then pass again to the next heirs. This often triggers two court cases and double probate fees.",
            },
          },
          {
            "@type": "Question",
            name: "What is a 30-day survivorship clause in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A 30-day survivorship clause is a Will rule stating that your spouse or heir must outlive you by at least 30 full days to inherit your assets. If your spouse dies in the same crash or within 30 days of your death, your property skips their estate and passes straight to your alternate heirs or child trust.",
            },
          },
          {
            "@type": "Question",
            name: "How does a survivorship clause prevent double probate court fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Without a wait clause, the elder spouse's assets pass into the younger spouse's estate. Heirs may have to file two separate probate cases and pay two sets of court fees. With a 30-day clause, assets bypass the deceased spouse completely and vest straight in your children or alternate heirs through one clean transfer.",
            },
          },
          {
            "@type": "Question",
            name: "Does Section 21 of the Hindu Succession Act apply if a Will exists?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, unless your Will overrides it. In Jayantilal Mansukhlal v. Mehta Chhanalal Ambalal, the Gujarat High Court applied Section 21 to a Will when a mother and daughter died together in a fire. A clear common disaster clause lets you set your own survivorship rule and prevent unintended asset transfers.",
            },
          },
          {
            "@type": "Question",
            name: "What law applies to Christians, Parsis, or couples married under the Special Marriage Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non-Hindus are governed by the Indian Succession Act, 1925, which has no age-based survival rule like Section 21 HSA. Under Section 105 ISA, if heirs cannot prove the beneficiary outlived the Will maker, the gift lapses into the residue. Adding a 30-day clause with Sections 124 and 129 gift-over wording prevents lapse disputes.",
            },
          },
          {
            "@type": "Question",
            name: "Why is naming an alternate executor critical in a common disaster clause?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most couples name only each other as sole executor. If both spouses die in one crash, nobody is left to apply for probate under Section 222 of the Indian Succession Act. Your family must then apply for Letters of Administration under Section 232, which takes much longer. Always name a backup executor.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to a childless couple's assets if they die together without this clause?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a childless Hindu couple dies together without a survivorship clause, Section 21 treats the younger spouse as surviving. Assets given to the younger spouse under a Will may then pass solely to the younger spouse's parents or siblings, cutting off the elder spouse's parents completely.",
            },
          },
          {
            "@type": "Question",
            name: "Should we add this clause using a Codicil or draft fresh Mirror Wills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If your existing Will already covers all your assets well, you can add a 30-day survivorship clause and backup executor through a registered Codicil under Section 62 ISA. If both spouses have old or basic Wills, drafting two fresh Mirror Wills with matching common disaster clauses is cleaner and safer.",
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
        <SimultaneousDeathClauseClient />
        <Footer />
      </div>
    </>
  );
}
