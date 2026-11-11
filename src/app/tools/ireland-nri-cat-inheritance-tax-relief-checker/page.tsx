import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IrelandCatCheckerClient from "./IrelandCatCheckerClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Ireland NRI CAT Inheritance Tax Checker | WillDrafting", // exactly 54 characters
  },
  description:
    "Check Irish Capital Acquisitions Tax (CAT) on inherited Indian property for NRIs in Ireland. Calculate Group A thresholds, 33% tax, and remittances.", // exactly 148 characters
  keywords: [
    "irish inheritance tax indian property cat checker",
    "capital acquisitions tax ireland indian inheritance",
    "irish resident inheriting property in india cat thresholds",
    "ireland revenue form it38 calculator",
    "group a cat threshold 400000 budget 2024 ireland",
    "5 year non domiciled residency rule ireland cat",
    "section 72 relief catca 2003 indian property",
    "form 15ca 15cb nri property remittance ireland",
    "fema 1 million usd inheritance repatriation ireland",
    "double taxation relief ireland india inheritance",
    "nro account repatriation rbi 1 million limit ireland",
    "willdrafting cross border nri succession",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/ireland-nri-cat-inheritance-tax-relief-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/ireland-nri-cat-inheritance-tax-relief-checker",
      "x-default": "https://www.willdrafting.in/tools/ireland-nri-cat-inheritance-tax-relief-checker",
    },
  },
  openGraph: {
    title: "Ireland NRI CAT Inheritance Tax Checker | WillDrafting",
    description:
      "Check Irish Capital Acquisitions Tax (CAT) on inherited Indian property for NRIs in Ireland. Calculate Group A thresholds, 33% tax, and remittances.",
    url: "https://www.willdrafting.in/tools/ireland-nri-cat-inheritance-tax-relief-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/ireland-nri-cat-inheritance-tax-relief-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Ireland NRI Capital Acquisitions Tax Inheritance Checker on Indian Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Ireland NRI CAT Inheritance Tax Checker | WillDrafting",
    description:
      "Check Irish Capital Acquisitions Tax (CAT) on inherited Indian property for NRIs in Ireland. Calculate Group A thresholds, 33% tax, and remittances.",
    images: ["https://www.willdrafting.in/images/ireland-nri-cat-inheritance-tax-relief-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function IrelandNriCatCheckerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/ireland-nri-cat-inheritance-tax-relief-checker";
  const imageUrl = "https://www.willdrafting.in/images/ireland-nri-cat-inheritance-tax-relief-checker-og.jpg";

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
        name: "Ireland NRI CAT Inheritance Tax Checker | WillDrafting",
        description:
          "Check Irish Capital Acquisitions Tax (CAT) on inherited Indian property for NRIs in Ireland. Calculate Group A thresholds, 33% tax, and remittances.",
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
            name: "Ireland NRI CAT Inheritance Tax Relief Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Ireland NRI CAT Inheritance Tax Relief Checker",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic calculator to determine Irish Capital Acquisitions Tax (CAT) liability, Group A/B/C lifetime thresholds, and Form IT38 reporting obligations on inherited Indian property.",
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
            name: "Does Irish 33% Capital Acquisitions Tax apply to Indian inherited property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, under the Capital Acquisitions Tax Consolidation Act 2003 (CATCA), if either the disponer (deceased) or the beneficiary (heir) is resident or ordinarily resident in Ireland on the valuation date, Irish CAT applies to worldwide gifts and inheritances. However, non-domiciled Indian citizens living in Ireland on employment permits (Stamp 1 or Stamp 4) are exempt unless they have completed five consecutive tax years of Irish tax residence.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Group A inheritance tax threshold in Ireland for inherited Indian assets?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Irish Budget 2024 changes effective from 2 October 2024, the Group A lifetime tax-free threshold is €400,000 (increased from €335,000). This applies to gifts and inheritances taken by a child from their parent. Any value exceeding €400,000 (after adjusting for prior lifetime gifts since 5 December 1991) is taxed at a flat rate of 33%.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 5-year non-domiciled residency rule for Indian expats in Dublin?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 11(5) of CATCA 2003, an individual who is not domiciled in Ireland (such as an Indian citizen living in Dublin or Cork) is not treated as resident or ordinarily resident for CAT purposes unless they have been resident in Ireland for the five consecutive tax years immediately preceding the year of assessment. If you have lived in Ireland for under five consecutive years, inherited Indian property from parents in India is generally outside the scope of Irish CAT.",
            },
          },
          {
            "@type": "Question",
            name: "When is Form IT38 mandatory even if no Irish inheritance tax is payable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 46 of CATCA 2003, you are legally obligated to file an electronic Form IT38 return via Revenue Online Service (ROS) or myAccount whenever the taxable value of an inheritance reaches or exceeds 80% of the applicable group threshold. For Group A, 80% of €400,000 is €320,000. If you inherit Indian property worth €330,000, zero CAT is due, but filing Form IT38 is mandatory. Failure to file incurs statutory late-filing surcharges of up to 10%.",
            },
          },
          {
            "@type": "Question",
            name: "What is the filing and payment deadline for Irish Form IT38?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The deadline depends on the valuation date. If the valuation date falls between 1 January and 31 August, you must file Form IT38 and pay any CAT due by 31 October of that same calendar year. If the valuation date falls between 1 September and 31 December, the filing and payment deadline is 31 October of the following year.",
            },
          },
          {
            "@type": "Question",
            name: "Can Irish CAT be credited against Indian capital gains tax under the DTAA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No direct credit exists between Irish CAT and Indian capital gains tax under the India-Ireland Double Taxation Avoidance Agreement (DTAA). The 1993 DTAA covers income tax and capital gains tax (Article 13), but does not cover inheritance taxes because India abolished estate duty in 1985. However, under Section 104 of CATCA 2003, if the inherited Indian asset is sold and triggers both Irish Capital Gains Tax and Irish CAT on the same disposal, a credit of CGT against CAT is permissible.",
            },
          },
          {
            "@type": "Question",
            name: "How can an NRI repatriate sales proceeds of inherited Indian property to Ireland?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI FEMA regulations (Notification FEMA 21(R)/2018-RB), an NRI or OCI can repatriate up to USD 1,000,000 per financial year (April to March) from their Non-Resident Ordinary (NRO) bank account. Repatriation requires obtaining Form 15CB (a certificate issued by an Indian Chartered Accountant confirming tax clearance) and submitting Form 15CA online on the Indian Income Tax portal, along with inheritance proof to the Authorized Dealer Bank.",
            },
          },
          {
            "@type": "Question",
            name: "What is Section 72 relief under Irish tax law for Indian family properties?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 72 of the Capital Acquisitions Tax Consolidation Act 2003 allows parents or individuals to take out an approved life insurance policy specifically designated to pay inheritance tax arising upon death. The policy payout is completely exempt from CAT to the extent it is applied toward paying the beneficiary's CAT liability, protecting the underlying Indian ancestral property from forced distress sale.",
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
        <IrelandCatCheckerClient />
        <Footer />
      </div>
    </>
  );
}
