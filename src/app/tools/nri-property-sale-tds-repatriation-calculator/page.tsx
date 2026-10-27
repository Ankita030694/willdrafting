import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NriPropertyTdsCalculatorClient from "./NriPropertyTdsCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "NRI Inherited Property Sale TDS Calculator | WillDrafting", // exactly 57 characters
  },
  description:
    "Calculate Section 195 TDS on NRI property sale, Form 13 lower tax savings, and RBI USD 1M repatriation via 15CA/15CB under Indian Income Tax Act.", // exactly 145 characters
  keywords: [
    "nri inherited property sale tds calculator",
    "nri repatriation calculator 1 million usd",
    "section 195 tds on nri property sale",
    "form 13 lower tds savings calculator",
    "form 15ca 15cb nri property sale remittance",
    "nro account repatriation rbi 1 million limit",
    "nri capital gains tax property sale india",
    "section 197 lower deduction certificate traces",
    "fema remittance of assets regulations 2016",
    "buyer deducting tds on full sale consideration nri",
    "nri property sale tax advice ama legal solutions",
    "nro to nre account transfer rules property sale",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/nri-property-sale-tds-repatriation-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/nri-property-sale-tds-repatriation-calculator",
      "x-default": "https://www.willdrafting.in/tools/nri-property-sale-tds-repatriation-calculator",
    },
  },
  openGraph: {
    title: "NRI Inherited Property Sale TDS Calculator | WillDrafting",
    description:
      "Calculate Section 195 TDS on NRI property sale, Form 13 lower tax savings, and RBI USD 1M repatriation via 15CA/15CB under Indian Income Tax Act.",
    url: "https://www.willdrafting.in/tools/nri-property-sale-tds-repatriation-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/nri-property-sale-tds-repatriation-calculator-og.jpg",
        width: 1376,
        height: 768,
        alt: "NRI Inherited Property Sale TDS and USD 1 Million Repatriation Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Inherited Property Sale TDS Calculator | WillDrafting",
    description:
      "Calculate Section 195 TDS on NRI property sale, Form 13 lower tax savings, and RBI USD 1M repatriation via 15CA/15CB under Indian Income Tax Act.",
    images: ["https://www.willdrafting.in/images/nri-property-sale-tds-repatriation-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function NriPropertySaleTdsCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/nri-property-sale-tds-repatriation-calculator";
  const imageUrl = "https://www.willdrafting.in/images/nri-property-sale-tds-repatriation-calculator-og.jpg";

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
        name: "NRI Inherited Property Sale TDS Calculator | WillDrafting",
        description:
          "Calculate Section 195 TDS on NRI property sale, Form 13 lower tax savings, and RBI USD 1M repatriation via 15CA/15CB under Indian Income Tax Act.",
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
            name: "NRI Property Sale TDS & Repatriation Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "NRI Inherited Property Sale TDS & Repatriation Calculator",
        url: canonicalUrl,
        applicationCategory: "TaxApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory micro-tool for NRI property sales in India. Computes Section 195 gross TDS deduction, Form 13 lower deduction certificate savings, cash-flow blockage relief, and FEMA USD 1 Million NRO outward repatriation under Form 15CA/15CB.",
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
            name: "Why does the buyer deduct TDS on the full sale price instead of my capital gain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 195 of the Income Tax Act, 1961, the buyer is legally obligated to withhold tax on payments to non-residents. Because buyers fear heavy penalties and interest under Section 201 for short deduction, they routinely deduct TDS on the entire gross sale consideration unless the NRI seller furnishes an official Lower or Nil Deduction Certificate under Section 197 issued by the Assessing Officer.",
            },
          },
          {
            "@type": "Question",
            name: "How much cash-flow blockage does Form 13 save for an NRI selling inherited property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Form 13 Lower Deduction Certificate limits the withholding tax strictly to the actual capital gains tax liability rather than the gross sale price. For example, on a ₹3.00 Crore property with ₹80 Lakhs in capital gains, default Section 195 TDS blocks approximately ₹44.85 Lakhs (at 14.95%), whereas Form 13 limits tax to approximately ₹11.96 Lakhs, immediately unlocking ₹32.89 Lakhs in liquid funds.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI repatriate more than USD 1 Million per financial year from inherited property sale?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the RBI USD 1 Million Scheme (FEMA Remittance of Assets Regulations, 2016), an NRI or OCI can repatriate up to USD 1,000,000 per financial year (April to March) from their NRO account without RBI approval. If sale proceeds exceed USD 1 Million, you may either split remittances across two financial years (e.g., March and April) or apply for prior RBI permission through your Authorized Dealer Category-I bank.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to file Form 15CA and Form 15CB for outward remittance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Repatriation requires: (1) Form 15CB certified by a Chartered Accountant verifying tax compliance, (2) Form 15CA filed online on the Income Tax e-filing portal, (3) Registered Agreement for Sale / Conveyance Deed, (4) Registered Will, Probate, or Legal Heir Certificate proving inherited title, (5) Proof of tax payment (TDS certificate Form 16A or advance tax challan), and (6) Form A2 and FEMA declaration submitted to your bank.",
            },
          },
          {
            "@type": "Question",
            name: "Does an Indian resident buyer need a TAN to buy property from an NRI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Unlike purchases from resident Indians where buyers deduct 1% TDS using PAN under Section 194-IA, purchasing from an NRI falls strictly under Section 195. The buyer MUST apply for a Tax Deduction and Collection Account Number (TAN) under Form 49B, deposit TDS via Challan ITNS 281 within 7 days from month-end, and file quarterly TDS returns in Form 27Q.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to obtain a Section 197 Lower TDS Certificate via TRACES?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Processing typically requires 3 to 6 weeks from online submission on the TRACES portal. The file is assigned to the International Taxation Ward having jurisdiction over non-residents. Sellers should initiate the application immediately after signing the Agreement for Sale / MoU and well before executing the final registered sale deed.",
            },
          },
          {
            "@type": "Question",
            name: "Can multiple NRI siblings selling one inherited property each repatriate USD 1 Million?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The RBI USD 1 Million annual limit applies individually to each separate legal heir holding a distinct PAN card. If three NRI siblings jointly inherit ancestral property in India, each co-owner can independently repatriate up to USD 1 Million per financial year through their respective NRO accounts, enabling up to USD 3 Million in aggregate family transfers.",
            },
          },
          {
            "@type": "Question",
            name: "Can NRI sellers claim Double Taxation Relief (DTAA) in the US, UK, or Canada?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Article 13 of the India-US DTAA (and corresponding capital gains provisions in UK and Canada treaties), capital gains on immovable real estate are primarily taxable in India where the property is located. However, you can claim a Foreign Tax Credit (FTC) in your home jurisdiction (such as IRS Form 1116 in the United States) to eliminate double taxation.",
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
        <NriPropertyTdsCalculatorClient />
        <Footer />
      </div>
    </>
  );
}
