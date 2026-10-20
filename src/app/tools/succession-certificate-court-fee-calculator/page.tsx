import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessionFeeCalculatorClient from "./SuccessionFeeCalculatorClient";

export const metadata: Metadata = {
  title: {
    absolute: "Succession Certificate Fees: Court Fee Calculator India",
  },
  description:
    "Calculate state-wise succession certificate court fees in India. Check ad valorem rates, statutory caps, and see how drafting a Will avoids court costs.",
  keywords: [
    "succession certificate fees",
    "succession certificate court fees by state",
    "court fee calculator india",
    "succession certificate cost",
    "ad valorem fee succession",
    "section 379 indian succession act",
    "part x succession certificate",
    "court fee cap maharashtra succession",
    "succession certificate court fee calculator",
    "delhi court fee succession certificate",
    "karnataka court fee succession certificate",
    "willdrafting succession certificate calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/succession-certificate-court-fee-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/succession-certificate-court-fee-calculator",
      "x-default": "https://www.willdrafting.in/tools/succession-certificate-court-fee-calculator",
    },
  },
  openGraph: {
    title: "Succession Certificate Fees: Court Fee Calculator India",
    description:
      "Calculate state-wise succession certificate court fees in India. Check ad valorem rates, statutory caps, and see how drafting a Will avoids court costs.",
    url: "https://www.willdrafting.in/tools/succession-certificate-court-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/succession-certificate-court-fee-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Succession Certificate Court Fee Calculator India and State Rates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Succession Certificate Fees: Court Fee Calculator India",
    description:
      "Calculate state-wise succession certificate court fees in India. Check ad valorem rates, statutory caps, and see how drafting a Will avoids court costs.",
    images: ["https://www.willdrafting.in/images/succession-certificate-court-fee-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SuccessionCertificateCourtFeeCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/succession-certificate-court-fee-calculator";
  const imageUrl = "https://www.willdrafting.in/images/succession-certificate-court-fee-calculator-og.jpg";

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
        name: "Succession Certificate Fees: Court Fee Calculator India",
        description:
          "Calculate state-wise succession certificate court fees in India. Check ad valorem rates, statutory caps, and see how drafting a Will avoids court costs.",
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
            name: "Succession Certificate Court Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Succession Certificate Court Fee Calculator India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive diagnostic calculator to compute state-wise ad valorem court fees, statutory caps, and procedural expenses under Part X of the Indian Succession Act, 1925 and State Court Fees Acts.",
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
            name: "What is the court fee for a succession certificate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Court fees for a succession certificate are calculated on an ad valorem (percentage-of-value) basis under Schedule I, Article 12 of the Court Fees Act, 1870 (or state-specific amendments). Rates generally range between 2% and 7.5% of the total movable debts and securities declared in the petition. Some states enforce statutory maximum caps, such as ₹75,000 in Maharashtra and Gujarat, or ₹10,00,000 in Karnataka, while others scale without a ceiling.",
            },
          },
          {
            "@type": "Question",
            name: "Is court fee paid when filing the petition or when the certificate is granted?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 379(1) of the Indian Succession Act, 1925, the petitioner must deposit the estimated court fee or judicial stamps when the court pronounces the final judgment granting the certificate, prior to the physical preparation and sealing of the formal document. An initial nominal court fee stamp (usually ₹50 to ₹200) is paid when filing the original Section 372 petition.",
            },
          },
          {
            "@type": "Question",
            name: "Can a succession certificate be granted for immovable property like land or a house?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 370 of the Indian Succession Act, 1925 explicitly restricts succession certificates to movable debts and securities. It can never be issued for immovable real estate, agricultural land, or flats. To establish title over real estate left without a Will, legal heirs must obtain a Legal Heir Certificate for revenue mutation or petition the District Court for Letters of Administration under Section 218.",
            },
          },
          {
            "@type": "Question",
            name: "How does drafting a Will avoid succession certificate court fees completely?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When a person creates a legally valid Will, they appoint an executor and bequeath specific assets to chosen beneficiaries. Banks and financial institutions transfer deposits and securities directly upon verifying the Will and identity proofs. A succession certificate is strictly needed only for intestate succession (when someone dies without a Will). A valid Will completely avoids the 2% to 7.5% court fees, newspaper publication costs, and 6-month court delays.",
            },
          },
          {
            "@type": "Question",
            name: "Why do banks demand a succession certificate if there is already a nominee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Supreme Court of India precedents (including Sarbati Devi v. Usha Devi and Shakti Yezdani v. Jayanand Jayant Salgaonkar), a nominee is merely a statutory trustee or custodian holding funds for the rightful legal heirs, not the absolute owner. If the deposit amount is high (often above ₹5 Lakhs to ₹15 Lakhs depending on internal bank policy) or if any legal heir disputes the claim, banks demand a succession certificate to get full statutory immunity under Section 381.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum court fee cap for succession certificates in Maharashtra and Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Maharashtra, Schedule I, Article 12 of the Maharashtra Court-fees Act, 1959 imposes a strict maximum ceiling cap of ₹75,000, regardless of whether the estate value is ₹2 Crore or ₹50 Crore. In Delhi, progressive slabs typically peak around 3%, with district courts observing practical administrative caps around ₹75,000 depending on judicial valuation rules.",
            },
          },
          {
            "@type": "Question",
            name: "Are women, widows, or minor children exempt from court fees in any Indian state?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Certain states provide partial or total court fee concessions for specific vulnerable classes. For instance, Maharashtra government notifications have periodically granted court fee exemptions for female litigants in family and succession matters, subject to specific income thresholds. Petitioners should have their advocate review local state revenue notifications when filing.",
            },
          },
          {
            "@type": "Question",
            name: "What other expenses are involved besides the ad valorem court fee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In addition to the ad valorem court fee, petitioners must pay for mandatory public citations in two daily newspapers (one English, one vernacular, costing ₹6,000 to ₹12,000), advocate professional drafting and court appearance fees (typically ₹25,000 to ₹60,000), non-judicial stamp paper for the court surety bond under Section 375, and miscellaneous typing and court registry fees.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take from filing the petition to receiving the succession certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An uncontested succession certificate petition generally takes between 4 and 8 months in Indian District Courts. The statutory timeline includes 30 to 45 days for public newspaper citation objections, court recording of petitioner testimony, valuation verification, payment of court fees under Section 379, and execution of a surety indemnity bond under Section 375.",
            },
          },
          {
            "@type": "Question",
            name: "What is a surety bond under Section 375 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 375 of the Indian Succession Act, 1925, the District Judge usually requires the person granted the certificate to furnish a personal bond with one or two solvent sureties. This bond guarantees that the certificate holder will indemnify anyone rightfully entitled to a share in the debt against wrongful appropriation.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <SuccessionFeeCalculatorClient />
      <Footer />
    </>
  );
}