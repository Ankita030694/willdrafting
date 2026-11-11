import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NZNRIEstateTaxEstimatorClient from "./NZNRIEstateTaxEstimatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "New Zealand NRI Estate Tax Calculator | WillDrafting", // exactly 52 characters
  },
  description:
    "Calculate New Zealand tax implications on inherited Indian property for Kiwi NRIs. Check IRD rules, foreign trust disclosure, and 15CA repatriation.", // exactly 148 characters
  keywords: [
    "new zealand nri indian property inheritance calculator",
    "nz tax resident inheriting property in india",
    "inland revenue nz foreign trust estate tax",
    "new zealand nri repatriation calculator",
    "new zealand india dtaa article 13 capital gains",
    "fema 1 million dollar repatriation new zealand",
    "form 15ca 15cb nro remittance auckland",
    "nz bright line test inherited property exemption",
    "transitional resident 48 month exemption nz foreign trust",
    "nz trusts act 2019 foreign trust disclosure",
    "section 195 tds nri property sale new zealand",
    "ama legal solutions cross border estate lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/new-zealand-nri-estate-succession-tax-estimator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/new-zealand-nri-estate-succession-tax-estimator",
      "x-default": "https://www.willdrafting.in/tools/new-zealand-nri-estate-succession-tax-estimator",
    },
  },
  openGraph: {
    title: "New Zealand NRI Estate Tax Calculator | WillDrafting",
    description:
      "Calculate New Zealand tax implications on inherited Indian property for Kiwi NRIs. Check IRD rules, foreign trust disclosure, and 15CA repatriation.",
    url: "https://www.willdrafting.in/tools/new-zealand-nri-estate-succession-tax-estimator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/new-zealand-nri-estate-succession-tax-estimator-og.jpg",
        width: 1200,
        height: 675,
        alt: "New Zealand NRI Indian Estate Succession Tax Estimator and IRD Repatriation Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "New Zealand NRI Estate Tax Calculator | WillDrafting",
    description:
      "Calculate New Zealand tax implications on inherited Indian property for Kiwi NRIs. Check IRD rules, foreign trust disclosure, and 15CA repatriation.",
    images: ["https://www.willdrafting.in/images/new-zealand-nri-estate-succession-tax-estimator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function NZNRIEstateTaxEstimatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/new-zealand-nri-estate-succession-tax-estimator";
  const imageUrl = "https://www.willdrafting.in/images/new-zealand-nri-estate-succession-tax-estimator-og.jpg";

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
        name: "New Zealand NRI Estate Tax Calculator | WillDrafting",
        description:
          "Calculate New Zealand tax implications on inherited Indian property for Kiwi NRIs. Check IRD rules, foreign trust disclosure, and 15CA repatriation.",
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
            name: "NZ NRI Estate Tax Estimator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "New Zealand NRI Indian Property Succession Tax Estimator",
        url: canonicalUrl,
        applicationCategory: "TaxApplication",
        operatingSystem: "All",
        description:
          "Cross-border tax calculator for Kiwi NRIs inheriting real estate in India. Simulates NZ Inland Revenue liability, foreign trust rules, and RBI remittance limits.",
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
            name: "Does New Zealand Inland Revenue (IRD) tax inherited property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. New Zealand has no estate duty, death duties, or inheritance tax (abolished in 1992). An inheritance of immovable property in India received by a New Zealand tax resident is not subject to tax by Inland Revenue (IRD) at the time of transfer or transmission.",
            },
          },
          {
            "@type": "Question",
            name: "Does the New Zealand Bright-line property rule apply to inherited Indian land?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section CB 6A(1) of the New Zealand Income Tax Act 2007, residential property acquired through inheritance or transmission upon death is specifically exempt from the Bright-line residential test. You do not pay New Zealand Bright-line tax when inheriting Indian real estate.",
            },
          },
          {
            "@type": "Question",
            name: "Are distributions from an Indian family trust taxable in New Zealand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under New Zealand trust taxation rules (Subpart HC of the Income Tax Act 2007), an Indian trust settled by non-residents is classified as a Foreign Trust. Distribution of original trust corpus (capital) is tax-free in New Zealand. However, distributions of accumulated income or capital gains are taxable as taxable distributions at your marginal income tax rate (up to 39%), unless you qualify as a Transitional Resident under the 48-month tax holiday.",
            },
          },
          {
            "@type": "Question",
            name: "How does the India-New Zealand DTAA protect against double taxation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 13 of the India-New Zealand Double Tax Avoidance Agreement (DTAA), India retains the primary right to tax capital gains arising from immovable property located in India. Under Article 23, New Zealand provides a Foreign Tax Credit (FTC) for income taxes paid in India against any New Zealand tax liability on the same income.",
            },
          },
          {
            "@type": "Question",
            name: "What are the RBI FEMA rules for repatriating inherited property sale proceeds to New Zealand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Master Direction No. 13/2015-16, an NRI can repatriate up to USD 1,000,000 per financial year from their NRO account balances. The remitter must complete Form 15CA on the Indian Income Tax e-filing portal, obtain Form 15CB certification from an Indian Chartered Accountant, and submit Form A2 to the Authorized Dealer Category-I bank.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to pay TDS in India when selling my inherited property from New Zealand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When an NRI sells Indian property, the buyer is required to withhold tax under Section 195 of the Income-tax Act at 20% plus applicable surcharge and cess on the total sale consideration. To avoid excessive withholding on gross value, the NRI can apply for a Lower or Nil Deduction Certificate under Section 197.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 48-month Transitional Resident tax exemption in New Zealand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section HR 8 of the NZ Income Tax Act 2007, new migrants or returning Kiwis who have been non-resident for at least 10 continuous years can qualify for a 48-month exemption from New Zealand tax on most offshore passive income, including foreign trust distributions and foreign rental yields.",
            },
          },
          {
            "@type": "Question",
            name: "Can a New Zealand NRI inherit agricultural land in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under FEMA regulations, an NRI or OCI can inherit agricultural land, plantation property, or a farmhouse in India from an Indian resident. However, an NRI cannot purchase agricultural land in India, and can only sell or gift inherited agricultural land to a resident Indian citizen.",
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
        <NZNRIEstateTaxEstimatorClient />
        <Footer />
      </div>
    </>
  );
}
