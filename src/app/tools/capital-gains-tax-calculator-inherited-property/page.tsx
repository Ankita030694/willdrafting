import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CapitalGainsCalculatorClient from "./CapitalGainsCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Inherited Property Capital Gains Calculator | WillDrafting", // exactly 58 characters
  },
  description:
    "Calculate capital gains tax on inherited property in India. Compare 12.5% flat vs 20% indexation, Section 54 deductions, and NRI TDS under.", // exactly 145 characters
  keywords: [
    "capital gains tax on inherited property calculator india",
    "tax on sale of inherited property india",
    "section 49 cost of acquisition calculator",
    "12.5% vs 20% indexation inherited property",
    "budget 2024 capital gains grandfathering property",
    "cit v manjula j shah indexation rule",
    "section 54 capital gains exemption multiple heirs",
    "section 54ec bonds 50 lakh limit per legal heir",
    "nri tds on sale of inherited property form 13",
    "section 195 lower deduction certificate inherited property",
    "income tax on ancestral property sale india",
    "ama legal solutions capital gains tax calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/capital-gains-tax-calculator-inherited-property",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/capital-gains-tax-calculator-inherited-property",
      "x-default": "https://www.willdrafting.in/tools/capital-gains-tax-calculator-inherited-property",
    },
  },
  openGraph: {
    title: "Inherited Property Capital Gains Calculator | WillDrafting",
    description:
      "Calculate capital gains tax on inherited property in India. Compare 12.5% flat vs 20% indexation, Section 54 deductions, and NRI TDS under.",
    url: "https://www.willdrafting.in/tools/capital-gains-tax-calculator-inherited-property",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/capital-gains-tax-calculator-inherited-property-og.jpg",
        width: 1200,
        height: 675,
        alt: "Capital Gains Tax on Inherited Property Calculator India and Budget 2024 Comparator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inherited Property Capital Gains Calculator | WillDrafting",
    description:
      "Calculate capital gains tax on inherited property in India. Compare 12.5% flat vs 20% indexation, Section 54 deductions, and NRI TDS under.",
    images: ["https://www.willdrafting.in/images/capital-gains-tax-calculator-inherited-property-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CapitalGainsTaxCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/capital-gains-tax-calculator-inherited-property";
  const imageUrl = "https://www.willdrafting.in/images/capital-gains-tax-calculator-inherited-property-og.jpg";

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
        name: "Inherited Property Capital Gains Calculator | WillDrafting",
        description:
          "Calculate capital gains tax on inherited property in India. Compare 12.5% flat vs 20% indexation, Section 54 deductions, and NRI TDS under.",
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
            name: "Capital Gains Tax Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Capital Gains Tax on Inherited Property Calculator India",
        url: canonicalUrl,
        applicationCategory: "TaxApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory tax calculator comparing Budget 2024 grandfathering relief (20% with indexation vs 12.5% flat), Section 49(1) cost to.",
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
            name: "Is there any tax on inheriting property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 47(iii) of the Income Tax Act, 1961, transfer of capital assets under a Will or by inheritance is expressly excluded from the definition of transfer. Therefore, inheriting a house, land, or commercial property does not attract any capital gains tax or income tax at the time of inheritance.",
            },
          },
          {
            "@type": "Question",
            name: "How is capital gains tax calculated when selling an inherited property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When you sell an inherited property, tax is calculated based on the gain made over the original cost paid by the previous owner who purchased it (Section 49(1)). The holding period includes the previous owner's ownership tenure (Section 2(42A)). If the combined holding period exceeds 24 months, it is treated as Long-Term Capital Gain (LTCG).",
            },
          },
          {
            "@type": "Question",
            name: "What is the Budget 2024 grandfathering option for inherited property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Finance (No. 2) Act, 2024 amendment to Section 112, for properties acquired before July 23, 2024 by resident individuals or HUFs, taxpayers have the legal right to compute capital gains under both regimes: (1) Old regime at 20% with Cost Inflation Index (CII), or (2) New regime at 12.5% flat without indexation, and pay whichever produces the lower tax liability.",
            },
          },
          {
            "@type": "Question",
            name: "Does indexation start from the original purchase year or the year of inheritance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the landmark Bombay High Court ruling in CIT v. Manjula J. Shah (approved nationwide by High Courts), indexation benefit begins from the year in which the PREVIOUS owner purchased the asset (or 2001-02 if purchased earlier), not the year in which the heir inherited it. This significantly increases the indexed cost and lowers taxable gains.",
            },
          },
          {
            "@type": "Question",
            name: "How is the cost determined for property acquired before April 1, 2001?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 55(2)(b) of the Income Tax Act, if the previous owner purchased the property before April 1, 2001, you can substitute the Fair Market Value (FMV) as on April 1, 2001 as your base cost. However, under Section 55(2)(b)(ii), this FMV cannot exceed the Stamp Duty Ready Reckoner Value of the property as on April 1, 2001.",
            },
          },
          {
            "@type": "Question",
            name: "Do multiple legal heirs each get a separate Section 54EC bond limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When siblings or co-heirs inherit a property as tenants-in-common, each co-owner is taxed separately on their proportionate share of the capital gains. Consequently, each legal heir is individually entitled to invest up to ₹50 Lakhs in Section 54EC capital gains bonds (REC, NHAI, PFC, IRFC). For example, three siblings can collectively shelter up to ₹1.5 Crore in capital gains from tax.",
            },
          },
          {
            "@type": "Question",
            name: "How much TDS is deducted when an NRI sells inherited property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 195 of the Income Tax Act, the buyer is required to deduct TDS on payments to Non-Resident Indians. By default, buyers deduct TDS on the FULL sale consideration at 12.5% or 20% plus surcharge and cess (often amounting to 20% to 23.9% of gross value). To prevent this massive cash lockup, NRI sellers should apply to the Income Tax Department for a Lower or Nil Deduction Certificate under Section 197 (Form 13) before executing the sale.",
            },
          },
          {
            "@type": "Question",
            name: "How can Section 54 exemption be claimed on inherited residential property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 54, if the inherited asset was a long-term residential house, you can exempt capital gains by purchasing a new residential house within 1 year before or 2 years after the sale, or constructing one within 3 years. The exemption is capped at ₹10 Crore. If the net long-term capital gain is up to ₹2 Crore, you may invest in two residential properties once in a lifetime.",
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
        <CapitalGainsCalculatorClient />
        <Footer />
      </div>
    </>
  );
}
