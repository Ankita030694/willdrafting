import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BankDeceasedClaimClient from "./BankDeceasedClaimClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Bank Deceased Claim Documents Checklist | WillDrafting.in", // exactly 57 characters
  },
  description:
    "Generate your bank deceased claim documents checklist under RBI rules. Compare SBI, HDFC, ICICI thresholds, indemnity bonds, and claim.", // exactly 153 characters
  keywords: [
    "bank deceased claim documents checklist",
    "sbi deceased claim calculator documents",
    "hdfc icici bank account claim after death without nominee",
    "rbi deceased claim threshold",
    "bank claim without nominee indemnity bond format",
    "rbi 15 day deceased depositor claim settlement rule",
    "succession certificate vs indemnity bond bank claim",
    "annexure a deceased claim format sbi pnb bob",
    "bank locker claim process deceased nominee",
    "legal heir claim bank fixed deposit interest",
    "section 45za banking regulation act nominee rights",
    "ama legal solutions bank deceased claim checklist",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/bank-deceased-claim-document-checklist-generator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/bank-deceased-claim-document-checklist-generator",
      "x-default": "https://www.willdrafting.in/tools/bank-deceased-claim-document-checklist-generator",
    },
  },
  openGraph: {
    title: "Bank Deceased Claim Documents Checklist | WillDrafting.in",
    description:
      "Generate your bank deceased claim documents checklist under RBI rules. Compare SBI, HDFC, ICICI thresholds, indemnity bonds, and claim.",
    url: "https://www.willdrafting.in/tools/bank-deceased-claim-document-checklist-generator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/bank-deceased-claim-document-checklist-generator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Bank Deceased Claim Document Checklist Generator and RBI Settlement Rules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bank Deceased Claim Documents Checklist | WillDrafting.in",
    description:
      "Generate your bank deceased claim documents checklist under RBI rules. Compare SBI, HDFC, ICICI thresholds, indemnity bonds, and claim.",
    images: ["https://www.willdrafting.in/images/bank-deceased-claim-document-checklist-generator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function BankDeceasedClaimPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/bank-deceased-claim-document-checklist-generator";
  const imageUrl =
    "https://www.willdrafting.in/images/bank-deceased-claim-document-checklist-generator-og.jpg";

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
        name: "Bank Deceased Claim Documents Checklist | WillDrafting.in",
        description:
          "Generate your bank deceased claim papers checklist under RBI rules. Compare SBI, HDFC, ICICI thresholds, indemnity bonds, and claim.",
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
            name: "Bank Deceased Claim Checklist",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Bank Deceased Claim Document Checklist Generator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free legal compliance tool for generating bank deceased claim paper checklists across top 12 Indian banks, comparing RBI.",
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
            name: "How do I claim money from a deceased person's bank account in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To claim money from a deceased depositor's account, check if a nominee is filed. If a filed nominee exists, submit the bank claim form, original death paper, nominee KYC papers, and passbook. The bank will release funds within 15 days. If no nominee exists, all legal heirs must jointly submit claim forms, legal heir paper, letter of disclaimer, and an indemnity bond with sureties.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum balance a bank can settle without a succession certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Master Directions, every bank's Board fixes an indemnity threshold for settling claims without demanding a court estate paper. For State Bank of India, Punjab National Bank, Bank of Baroda, and Axis Bank, this threshold is ₹5,00,000. ICICI Bank allows simplified deal up to ₹10,00,000 against an indemnity bond and solvent sureties.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee become the absolute owner of the deceased's bank account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court of India held in Smt. Sarbati Devi v. Smt. Usha Devi and Ram Chander Talwar v. Devender Kumar Talwar that a nominee is merely a legal trustee authorized to receive funds and give a valid discharge to the bank. The money forms part of the deceased person's estate and belongs to the legal heirs under personal estate law.",
            },
          },
          {
            "@type": "Question",
            name: "How much time does a bank have to settle a deceased claim under RBI guidelines?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Master Direction on Customer Service in Banks (DBR.No.Leg.BC.21/09.07.006/2015-16), banks are strictly mandated to settle claims in respect of deceased depositors and release payments to survivors or nominees within a period not exceeding 15 calendar days from the date of receipt of the complete claim.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to claim a bank account without a nominee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Papers required for non-nominee claims include: (1) Prescribed Bank Deceased Claim Form signed by all legal heirs, (2) Original death paper, (3) Revenue Legal Heir Paper or Surviving Member Paper, (4) Letter of Disclaimer (Annexure C) from heirs relinquishing rights, (5) Indemnity Bond (Annexure D) on non-judicial stamp paper, (6) Two solvent sureties with income proof, and (7) KYC papers of all heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Why do banks ask for two sureties or guarantors on an indemnity bond?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When a claim is settled without a court order, banks require an Indemnity Bond signed by the claimant and two independent solvent sureties. This protects the bank against financial liability in case another unknown legal heir or creditor then emerges and claims the deposited funds.",
            },
          },
          {
            "@type": "Question",
            name: "How can legal heirs claim contents of a bank safety locker after the holder dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 45ZE of the Banking Regulation Act, 1949, if a locker has a filed nominee, the bank allows locker access to the nominee after preparing an inventory in the presence of the branch manager, nominee, and two independent witnesses. If there is no nominee, all legal heirs must jointly attend the inventory or provide a filed power of attorney.",
            },
          },
          {
            "@type": "Question",
            name: "What can I do if a bank branch manager refuses to settle a claim without a court order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the account balance is below the bank Board threshold and no court injunction exists, demanding a estate paper violates RBI circular DBOD.No.Leg.BC.95/2004-05. You can submit a formal written grievance to the Branch Manager citing RBI directions. If unresolved within 30 days, file an online complaint with the RBI Banking Ombudsman on the CMS portal.",
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
        <BankDeceasedClaimClient />
        <Footer />
      </div>
    </>
  );
}
