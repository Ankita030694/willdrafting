import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DelhiProbateSuccessionFeeClient from "./DelhiProbateSuccessionFeeClient";

// Screaming Frog Rules: Title 30-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Delhi Probate & Succession Fee Calculator | WillDrafting", // 56 characters
  },
  description:
    "Calculate Delhi District Court probate (4%) and succession certificate (2.5%) fees under Court Fees Act 1870. Check Article 11 & 12 slabs now.", // 142 characters
  keywords: [
    "delhi district court probate court fee calculator",
    "delhi succession certificate court fee calculator",
    "court fees act 1870 delhi schedule 1 article 11",
    "court fees act 1870 delhi schedule 1 article 12",
    "probate court fee in delhi 4 percent",
    "succession certificate fee in delhi 2.5 percent",
    "extension of succession certificate court fee delhi 4 percent",
    "delhi district court vs delhi high court probate jurisdiction",
    "is probate mandatory in delhi section 213 indian succession act",
    "shcil e court fee delhi probate payment",
    "administrative civil judge succession certificate delhi",
    "section 19h sdm valuation report delhi probate",
    "praveena bhardwaj v state delhi court fee timing",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/delhi-district-court-probate-succession-fee-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/delhi-district-court-probate-succession-fee-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/delhi-district-court-probate-succession-fee-calculator",
    },
  },
  openGraph: {
    title: "Delhi Probate & Succession Fee Calculator | WillDrafting",
    description:
      "Calculate Delhi District Court probate (4%) and succession certificate (2.5%) fees under Court Fees Act 1870. Check Article 11 & 12 slabs now.",
    url: "https://www.willdrafting.in/tools/delhi-district-court-probate-succession-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/delhi-district-court-probate-succession-fee-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Delhi District Court Probate and Succession Fee Calculator Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Delhi Probate & Succession Fee Calculator | WillDrafting",
    description:
      "Calculate Delhi District Court probate (4%) and succession certificate (2.5%) fees under Court Fees Act 1870. Check Article 11 & 12 slabs now.",
    images: [
      "https://www.willdrafting.in/images/delhi-district-court-probate-succession-fee-calculator-og.jpg",
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

export default function DelhiDistrictCourtProbateSuccessionFeeCalculatorPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/delhi-district-court-probate-succession-fee-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/delhi-district-court-probate-succession-fee-calculator-og.jpg";

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
        name: "Delhi Probate & Succession Fee Calculator | WillDrafting",
        description:
          "Calculate Delhi District Court probate (4%) and succession certificate (2.5%) fees under Court Fees Act 1870. Check Article 11 & 12 slabs now.",
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
            name: "Delhi Probate & Succession Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Delhi District Court Probate & Succession Fee Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free interactive court fee calculator for Delhi District Courts covering Probate, Letters of Administration (Schedule I Article 11), and Succession Certificates (Schedule I Article 12) under the Court Fees Act, 1870.",
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
            name: "What is the probate court fee percentage in Delhi District Courts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule I, Article 11 of the Court Fees Act, 1870 as applied in Delhi, probate and letters of administration carry an uncapped fee of 4% on the net estate value when it exceeds Rs 50,000. Lower slabs apply 2% from Rs 1,001 to Rs 10,000 and 2.5% from Rs 10,001 to Rs 50,000.",
            },
          },
          {
            "@type": "Question",
            name: "Is there any upper cap on probate or succession court fees in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Unlike Maharashtra, which caps probate court fees at Rs 75,000, Delhi has no upper ceiling. The 4% probate fee or 2.5% succession certificate fee applies to the full verified net value of the listed estate or securities.",
            },
          },
          {
            "@type": "Question",
            name: "What is the court fee for a Succession Certificate in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Per the Delhi District Courts handbook and Schedule I, Article 12 of the Court Fees Act, 1870, an initial Succession Certificate under Section 374 carries a 2.5% court fee on the total value of debts and securities. Adding missed assets later through an extension under Section 376 attracts a 4% fee on the added value.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate of a Will legally mandatory in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Sections 57 and 213 of the Indian Succession Act, 1925, probate is not mandatory in Delhi for Wills made by Hindus, Sikhs, Jains, or Buddhists for Delhi properties. The Supreme Court in Kanta Yadav v. Om Prakash Yadav confirmed this rule. However, heirs often seek probate voluntarily if a bank, society, or buyer asks for court proof.",
            },
          },
          {
            "@type": "Question",
            name: "When do I have to pay the 4% probate court fee in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You do not pay the 4% ad valorem fee when filing the petition. Under Section 19-I of the Court Fees Act and the Delhi High Court ruling in Praveena Bhardwaj v. State, you pay only a nominal fixed filing fee at the start. The full 4% e-court fee is paid only after the SDM valuation report arrives and the court approves the grant.",
            },
          },
          {
            "@type": "Question",
            name: "Does an estate above Rs 2 crore go to Delhi High Court or District Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Rs 2 crore limit under Section 5(2) of the Delhi High Court Act applies to regular civil suits, not succession petitions. You can file Probate or Letters of Administration in the Delhi District Court even if the estate exceeds Rs 2 crore, though the Delhi High Court also has concurrent probate power. Succession Certificates are filed only before the Administrative Civil Judge (ACJ) in the District Court.",
            },
          },
          {
            "@type": "Question",
            name: "Can home loans and funeral costs be deducted before calculating Delhi probate fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 19-D and Schedule III (Annexure B) of the Court Fees Act, 1870, you can deduct bona fide funeral costs, unpaid loans, mortgages, and trust assets from the gross estate value. The 4% fee applies only to the net estate value.",
            },
          },
          {
            "@type": "Question",
            name: "How do I pay Delhi District Court probate or succession fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Court fees in Delhi are paid digitally through the Stock Holding Corporation of India Limited (SHCIL) e-Court Fee portal. Select NCT of Delhi, enter the exact court-approved amount, pay via net banking or UPI, and submit the printed e-Court Fee receipt to the court reader before the final certificate is sealed.",
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
        <DelhiProbateSuccessionFeeClient />
        <Footer />
      </div>
    </>
  );
}
