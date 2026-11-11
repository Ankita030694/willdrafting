import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartupFounderEquityClient from "./StartupFounderEquityClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Startup Founder Equity Succession Tool | WillDrafting", // exactly 53 characters
  },
  description:
    "Calculate startup founder equity, vested shares and unvested ESOP succession under Companies Act 2013. Model voting rights and nominee transmission.", // exactly 148 characters
  keywords: [
    "startup founder equity succession calculator india",
    "unvested esop transmission calculator",
    "founder share vesting upon death",
    "cap table succession planning tool",
    "companies act 2013 section 56 transmission",
    "companies act 2013 section 72 nomination shares",
    "sebi sbeb regulations 2021 death vesting",
    "indian succession act section 30 founder will",
    "reverse vesting death acceleration clause",
    "shakti yezdani v jayanand salgaonkar",
    "aruna oswal v pankaj oswal nominee rights",
    "startup founder will drafting india",
    "ama legal solutions startup succession",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/startup-founder-equity-succession-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/startup-founder-equity-succession-calculator",
      "x-default": "https://www.willdrafting.in/tools/startup-founder-equity-succession-calculator",
    },
  },
  openGraph: {
    title: "Startup Founder Equity Succession Tool | WillDrafting",
    description:
      "Calculate startup founder equity, vested shares and unvested ESOP succession under Companies Act 2013. Model voting rights and nominee transmission.",
    url: "https://www.willdrafting.in/tools/startup-founder-equity-succession-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/startup-founder-equity-succession-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Startup Founder Equity Succession Calculator and Cap Table Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Founder Equity Succession Tool | WillDrafting",
    description:
      "Calculate startup founder equity, vested shares and unvested ESOP succession under Companies Act 2013. Model voting rights and nominee transmission.",
    images: ["https://www.willdrafting.in/images/startup-founder-equity-succession-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function StartupFounderEquitySuccessionPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/startup-founder-equity-succession-calculator";
  const imageUrl = "https://www.willdrafting.in/images/startup-founder-equity-succession-calculator-og.jpg";

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
        name: "Startup Founder Equity Succession Tool | WillDrafting",
        description:
          "Calculate startup founder equity, vested shares and unvested ESOP succession under Companies Act 2013. Model voting rights and nominee transmission.",
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
            name: "Startup Founder Equity Succession Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Startup Founder Equity Succession Calculator India",
        url: canonicalUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        description:
          "Interactive micro-tool to calculate startup founder equity succession, reverse vesting death acceleration, cliff vesting, and nominee shareholder transmission under Companies Act 2013.",
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
            name: "What happens to unvested founder shares if a co-founder passes away?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unvested founder equity is governed by the Shareholders' Agreement (SHA) and Articles of Association (AoA). Under standard reverse vesting, unvested shares are repurchased at face value by surviving founders or company. If the SHA contains a Death and Disability Acceleration clause, 50% to 100% of unvested shares immediately accelerate and vest in the founder's estate.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee under Form SH-13 become the absolute owner of startup shares?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the Supreme Court landmark ruling in Shakti Yezdani v. Jayanand Salgaonkar (2023), nomination under Section 72 of the Companies Act 2013 does not confer beneficial ownership. A nominee is merely a temporary legal trustee to receive transmission. Beneficial ownership vests strictly in the legal heirs or beneficiaries designated in a valid Will.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to founder ESOPs upon death under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under SEBI (SBEB) Regulations 2021 (Regulation 9(11)), all options granted to an employee or founder vest immediately with their legal heirs or nominees upon death. For unlisted private limited startups, treatment depends on the company ESOP Scheme. Best practice clauses provide immediate accelerated vesting of all granted options.",
            },
          },
          {
            "@type": "Question",
            name: "Can surviving co-founders get locked out if a founder dies without a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When a founder dies intestate (without a Will), their vested equity enters legal limbo for 12 to 24 months pending a Succession Certificate from court. Without a registered Will and Cross-Purchase buyback clause, heirs may inherit voting equity, disrupting board quorum, investor negotiations, and funding rounds.",
            },
          },
          {
            "@type": "Question",
            name: "How does transmission of private company shares work under Section 56?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Transmission of shares occurs by operation of law upon death. The legal heir or nominee submits Form SH-4 (or transmission intimation letter), a certified death certificate, and a probated Will or succession certificate to the Board of Directors. The Board passes a transmission resolution within 60 days under Section 56 of the Companies Act 2013.",
            },
          },
          {
            "@type": "Question",
            name: "Can a founder bequeath private limited shares to someone outside the family in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 30 of the Indian Succession Act, 1925, any person of sound mind can bequeath their self-acquired assets, including private company equity, through a Will. However, company Articles of Association (AoA) may enforce pre-emptive rights or Right of First Refusal (ROFR) requiring transfer to surviving co-founders at fair market value.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between share transfer and share transmission?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Share transfer is a voluntary sale or gift requiring an executed share transfer deed (Form SH-4), stamp duty payment, and consideration. Share transmission is involuntary, occurring automatically by operation of law upon death, insolvency, or lunacy. No stamp duty is payable on share transmission under Section 56 of the Companies Act 2013.",
            },
          },
          {
            "@type": "Question",
            name: "How can startup co-founders fund a post-death equity buyout?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Co-founders use a Cross-Purchase Agreement paired with Keyman Insurance or Cross-Life Insurance policies. If a founder dies, insurance proceeds are paid directly to surviving co-founders tax-free, who then immediately buy out the deceased founder's equity from their family at fair value, preventing cap table dilution and family lawsuits.",
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
        <StartupFounderEquityClient />
        <Footer />
      </div>
    </>
  );
}
