import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GermanyNriTaxCalculatorClient from "./GermanyNriTaxCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Germany NRI Erbschaftsteuer Tax Calculator | WillDrafting", // exactly 57 characters
  },
  description:
    "Calculate German inheritance tax (Erbschaftsteuer) on Indian property for NRIs in Germany. Model Freibetrag thresholds, tax classes, and DTAA rules.", // exactly 148 characters
  keywords: [
    "german inheritance tax indian property calculator nri",
    "germany erbschaftsteuer indian assets calculator",
    "german tax resident inheriting property in india",
    "steuerklasse freibetrag india calculator",
    "erbstg indian property inheritance",
    "dtaa germany india inheritance tax gap",
    "nri 15ca 15cb remittance to germany",
    "german inheritance tax brackets steuerklasse 1",
    "inheriting ancestral flat in india german resident",
    "ama legal solutions nri germany tax repatriation",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/germany-nri-erbschaftsteuer-indian-property-tax-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/germany-nri-erbschaftsteuer-indian-property-tax-calculator",
      "x-default": "https://www.willdrafting.in/tools/germany-nri-erbschaftsteuer-indian-property-tax-calculator",
    },
  },
  openGraph: {
    title: "Germany NRI Erbschaftsteuer Tax Calculator | WillDrafting",
    description:
      "Calculate German inheritance tax (Erbschaftsteuer) on Indian property for NRIs in Germany. Model Freibetrag thresholds, tax classes, and DTAA rules.",
    url: "https://www.willdrafting.in/tools/germany-nri-erbschaftsteuer-indian-property-tax-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/germany-nri-erbschaftsteuer-indian-property-tax-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Germany NRI Erbschaftsteuer Indian Property Tax Calculator Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Germany NRI Erbschaftsteuer Tax Calculator | WillDrafting",
    description:
      "Calculate German inheritance tax (Erbschaftsteuer) on Indian property for NRIs in Germany. Model Freibetrag thresholds, tax classes, and DTAA rules.",
    images: ["https://www.willdrafting.in/images/germany-nri-erbschaftsteuer-indian-property-tax-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function GermanyNriErbschaftsteuerTaxCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/germany-nri-erbschaftsteuer-indian-property-tax-calculator";
  const imageUrl = "https://www.willdrafting.in/images/germany-nri-erbschaftsteuer-indian-property-tax-calculator-og.jpg";

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
        name: "Germany NRI Erbschaftsteuer Tax Calculator | WillDrafting",
        description:
          "Calculate German inheritance tax (Erbschaftsteuer) on Indian property for NRIs in Germany. Model Freibetrag thresholds, tax classes, and DTAA rules.",
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
            name: "Germany NRI Erbschaftsteuer Tax Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Germany NRI Erbschaftsteuer Indian Property Tax Calculator",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "Diagnostic cross-border tax calculator for NRIs and German tax residents inheriting immovable property and financial assets in India.",
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Does German inheritance tax apply to Indian property inherited by an NRI in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 2 Paragraph 1 Number 1 of the German Inheritance and Gift Tax Act (Erbschaftsteuer- und Schenkungsteuergesetz - ErbStG), if either the beneficiary (heir) or the deceased was a German tax resident (Inlaender) at the time of death, unlimited tax liability applies. This means your worldwide inheritance, including apartments, houses, agricultural land, and bank deposits in India, is subject to German inheritance tax.",
            },
          },
          {
            "@type": "Question",
            name: "What is the statutory Freibetrag tax-free allowance for children inheriting Indian assets?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 16 Paragraph 1 Number 2 of the German ErbStG, biological and adopted children belong to Tax Class I (Steuerklasse I) and receive a personal tax-free allowance (Freibetrag) of 400,000 Euros per parent. If the fair market value of the inherited Indian property attributable to the child is below 400,000 Euros (approximately 3.68 Crore INR), zero German inheritance tax is payable.",
            },
          },
          {
            "@type": "Question",
            name: "Does the India-Germany DTAA protect against German inheritance tax?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Double Taxation Avoidance Agreement (DTAA) between India and Germany covers income tax and wealth tax, but strictly excludes inheritance and gift taxes. Because India abolished its Estate Duty in 1985, there is zero inheritance tax levied in India. Consequently, you cannot claim a foreign tax credit in Germany under Section 21 ErbStG, leaving the entire German inheritance tax liability unshielded by the treaty.",
            },
          },
          {
            "@type": "Question",
            name: "Is inheritance of real estate taxed in India under the Income-tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 56(2)(x) proviso (e) of the Indian Income-tax Act, 1961, any property or money received under a Will or by way of intestate inheritance is completely exempt from Indian income tax. However, if the NRI heir later sells the property, Indian capital gains tax under Sections 45 and 48 will apply on the sale proceeds.",
            },
          },
          {
            "@type": "Question",
            name: "What are the German inheritance tax brackets under Steuerklasse I, II, and III?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 19 ErbStG, progressive tax rates apply to net taxable amounts exceeding the Freibetrag. For Tax Class I (spouses, children), rates range from 7% (up to 75,000 Euros) to 30% (over 26 Million Euros). For Tax Class II (siblings, nephews, nieces), rates range from 15% to 43%. For Tax Class III (unrelated persons), rates start at 30% and reach 50%.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 3-month notification requirement (Anzeigepflicht) to the German Finanzamt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 30 ErbStG, any person subject to German tax liability must formally notify their local tax office (Finanzamt) of an inheritance within three months of learning about the death and the acquisition. Because Indian courts and registries do not inform the German authorities, failure to notify constitutes a regulatory breach and can be prosecuted as tax evasion under Section 370 of the German Fiscal Code (Abgabenordnung - AO).",
            },
          },
          {
            "@type": "Question",
            name: "How can an NRI legally repatriate sale proceeds of an inherited Indian property to Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Foreign Exchange Management Act (FEMA) Remittance of Assets Regulations, an NRI can repatriate up to 1,000,000 US Dollars per financial year from their NRO account. The NRI must obtain title mutation in India, register the sale deed, credit funds to an NRO account, obtain Form 15CB certification from an Indian Chartered Accountant, submit Form 15CA online, and fulfill Section 67 AWV statistical reporting upon receipt in Germany.",
            },
          },
          {
            "@type": "Question",
            name: "How does the German Finanzamt value inherited real estate located in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the German Valuation Act (Bewertungsgesetz - BewG), foreign immovable property must be assessed at fair market value (gemeiner Wert) on the date of death. Indian circle rates or Ready Reckoner rates are generally rejected if market values are higher. The Finanzamt typically requires an independent certified valuation report from a Government Approved Valuer in India, translated and converted at the official European Central Bank (ECB) exchange rate.",
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
        <GermanyNriTaxCalculatorClient />
        <Footer />
      </div>
    </>
  );
}
