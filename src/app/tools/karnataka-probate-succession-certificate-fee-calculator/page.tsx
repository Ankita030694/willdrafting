import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KarnatakaProbateFeeClient from "./KarnatakaProbateFeeClient";

// Screaming Frog Rules: Title 50-60 chars (<=561px), Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Karnataka Probate & Succession Calculator | WillDrafting", // 56 characters
  },
  description:
    "Calculate Karnataka probate, LOA & succession certificate court fees under Schedule I Art. 6 & 7 (3% & 5% slabs, Rs 30,000 cap) and Sec. 53 deductions.", // 151 characters
  keywords: [
    "karnataka probate court fee calculator",
    "karnataka succession certificate court fee calculator",
    "karnataka court fees and suits valuation act 1958 article 6",
    "karnataka schedule 1 article 7 succession certificate fee",
    "bangalore city civil court p&sc petition court fee",
    "karnataka probate maximum court fee 30000",
    "karnataka act 12 of 2000 probate court fee amendment",
    "section 53 karnataka court fees act deductions debts funeral",
    "section 376 extension of succession certificate fee karnataka",
    "schedule 2 article 11 l caveat probate suit fee karnataka",
    "khajane 2 court fee payment karnataka probate",
    "is probate mandatory in bangalore karnataka section 213",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/karnataka-probate-succession-certificate-fee-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/karnataka-probate-succession-certificate-fee-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/karnataka-probate-succession-certificate-fee-calculator",
    },
  },
  openGraph: {
    title: "Karnataka Probate & Succession Calculator | WillDrafting",
    description:
      "Calculate Karnataka probate, LOA & succession certificate court fees under Schedule I Art. 6 & 7 (3% & 5% slabs, Rs 30,000 cap) and Sec. 53 deductions.",
    url: "https://www.willdrafting.in/tools/karnataka-probate-succession-certificate-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/karnataka-probate-succession-certificate-fee-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Karnataka probate and succession certificate court fee calculator for families",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Karnataka Probate & Succession Calculator | WillDrafting",
    description:
      "Calculate Karnataka probate, LOA & succession certificate court fees under Schedule I Art. 6 & 7 (3% & 5% slabs, Rs 30,000 cap) and Sec. 53 deductions.",
    images: [
      "https://www.willdrafting.in/images/karnataka-probate-succession-certificate-fee-calculator-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function KarnatakaProbateSuccessionFeeCalculatorPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/karnataka-probate-succession-certificate-fee-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/karnataka-probate-succession-certificate-fee-calculator-og.jpg";

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
        name: "Karnataka Probate & Succession Calculator | WillDrafting",
        description:
          "Calculate Karnataka probate, LOA & succession certificate court fees under Schedule I Art. 6 & 7 (3% & 5% slabs, Rs 30,000 cap) and Sec. 53 deductions.",
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
            name: "Karnataka Probate & Succession Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Karnataka Probate and Succession Certificate Fee Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free Karnataka court fee calculator for Probate, Letters of Administration, and Succession Certificates under the Karnataka Court-Fees and Suits Valuation Act, 1958.",
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
            name: "What is the maximum court fee for Probate or a Succession Certificate in Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule I, Article 6 of the Karnataka Court-Fees and Suits Valuation Act, 1958 (as amended by Karnataka Act 12 of 2000), estates up to Rs 1,000 are exempt, values from Rs 1,001 to Rs 3,00,000 attract 3%, and values above Rs 3,00,000 attract 5% or Rs 30,000 whichever is less. In Karnataka District and Bengaluru City Civil Court registry practice, Rs 30,000 is widely treated as the maximum ceiling, while a literal stacked reading of clauses 6(a) and 6(b) reaches Rs 38,970.",
            },
          },
          {
            "@type": "Question",
            name: "Is Probate mandatory for a Will in Bengaluru or Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Probate was never mandatory for Wills executed by Hindus outside the old Presidency towns, and the Repealing and Amending Act, 2025 omitted Section 213 of the Indian Succession Act, 1925 across India. However, banks, housing boards, BBMP offices, or property buyers in Bengaluru may still ask for voluntary probate or Letters of Administration when a Will is unregistered or disputed.",
            },
          },
          {
            "@type": "Question",
            name: "How is the court fee calculated for a Succession Certificate in Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule I, Article 7 of the Karnataka Court-Fees and Suits Valuation Act, 1958, a Succession Certificate issued under Section 374 of the Indian Succession Act attracts the exact same fee scale as Probate under Article 6, calculated on the total value of listed debts and securities. If you later extend the certificate to new securities under Section 376, the fee on the added amount is 1.5 times the standard Article 6 rate.",
            },
          },
          {
            "@type": "Question",
            name: "Which debts and costs can be deducted before calculating Karnataka probate court fee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 53(2)(a) and Annexure B of Part I of Schedule III to the Karnataka Court-Fees and Suits Valuation Act, 1958, you can deduct legally payable debts owed by the deceased, reasonable funeral expenses, and mortgage encumbrances on estate assets from the gross estate value. You cannot deduct debts tied to assets left out of a partial application.",
            },
          },
          {
            "@type": "Question",
            name: "When do I pay the ad valorem court fee in a Karnataka P&SC petition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "At initial filing of an uncontested P&SC petition, you pay only a small fixed petition fee (Rs 5, Rs 10, or Rs 25) under Schedule II, Article 11(l). The higher ad valorem grant fee under Schedule I, Article 6 or Article 7 is payable only after the court allows the petition and before the court engrosses and issues the final certificate.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to court fees if someone files a caveat and contests the Will in Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the proviso to Schedule II, Article 11(l) of the Karnataka Court-Fees and Suits Valuation Act, 1958, once a caveat is entered and the P&SC petition is registered as a contested suit, the petitioner must pay one-half (50%) of the regular ad valorem civil suit fee prescribed under Schedule I, Article 1 on the estate market value, minus the fixed filing fee already paid.",
            },
          },
          {
            "@type": "Question",
            name: "Which court has jurisdiction for Probate and Succession Certificate cases in Bengaluru?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 371 of the Indian Succession Act, 1925, the District Judge holds primary jurisdiction. In Bengaluru Urban, P&SC petitions are filed before the Principal City Civil and Sessions Judge, Bengaluru, while outside Bengaluru they are filed in the respective Principal District and Sessions Court where the deceased resided or held assets. Appeals under Section 384 go to the High Court of Karnataka.",
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
        <KarnatakaProbateFeeClient />
        <Footer />
      </div>
    </>
  );
}
