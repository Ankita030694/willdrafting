import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClaimUnclaimedDepositsUdgamClient from "./ClaimUnclaimedDepositsUdgamClient";

export const metadata: Metadata = {
  title: {
    absolute: "Claim Unclaimed Deposits of Deceased: RBI UDGAM Guide",
  },
  description:
    "Claim unclaimed bank deposits of a deceased person using RBI's UDGAM portal. Learn documents, bank claim limits, DEA Fund rules, and succession steps.",
  keywords: [
    "claim unclaimed deposits of deceased",
    "UDGAM portal unclaimed deposits deceased",
    "how to claim deceased bank account RBI UDGAM",
    "unclaimed bank deposits india deceased",
    "DEA fund unclaimed deposits claim process",
    "deceased bank account claim without nominee",
    "rbi circular deceased depositor claim settlement",
    "udgam reference number UDRN",
    "succession certificate for unclaimed bank deposits",
    "claiming deceased fixed deposits and savings",
    "banking regulation act section 26A DEA fund",
    "legal heir claim deceased bank account form",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/blogs/claim-unclaimed-deposits-deceased-udgam",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/blogs/claim-unclaimed-deposits-deceased-udgam",
      "x-default":
        "https://www.willdrafting.in/blogs/claim-unclaimed-deposits-deceased-udgam",
    },
  },
  openGraph: {
    title: "Claim Unclaimed Deposits of Deceased: RBI UDGAM Guide",
    description:
      "Claim unclaimed bank deposits of a deceased person using RBI's UDGAM portal. Learn documents, bank claim limits, DEA Fund rules, and succession steps.",
    url: "https://www.willdrafting.in/blogs/claim-unclaimed-deposits-deceased-udgam",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/claim-unclaimed-deposits-deceased-udgam-og.jpg",
        width: 1200,
        height: 675,
        alt: "How to Claim Unclaimed Bank Deposits of Deceased via RBI UDGAM Portal Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claim Unclaimed Deposits of Deceased: RBI UDGAM Guide",
    description:
      "Claim unclaimed bank deposits of a deceased person using RBI's UDGAM portal. Learn documents, bank claim limits, DEA Fund rules, and succession steps.",
    images: [
      "https://www.willdrafting.in/images/claim-unclaimed-deposits-deceased-udgam-og.jpg",
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

export default function ClaimUnclaimedDepositsUdgamPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/blogs/claim-unclaimed-deposits-deceased-udgam";
  const imageUrl =
    "https://www.willdrafting.in/images/claim-unclaimed-deposits-deceased-udgam-og.jpg";

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
        name: "Claim Unclaimed Deposits of Deceased: RBI UDGAM Guide",
        description:
          "Claim unclaimed bank deposits of a deceased person using RBI's UDGAM portal. Learn documents, bank claim limits, DEA Fund rules, and succession steps.",
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
            name: "Blogs",
            item: "https://www.willdrafting.in/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Claim Unclaimed Deposits Deceased UDGAM",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "How to Claim Unclaimed Bank Deposits of Deceased via UDGAM",
        description:
          "Claim unclaimed bank deposits of a deceased person using RBI's UDGAM portal. Learn documents, bank claim limits, DEA Fund rules, and succession steps.",
        image: imageUrl,
        datePublished: "2026-10-20T09:00:00+05:30",
        dateModified: "2026-10-20T09:00:00+05:30",
        author: {
          "@type": "Person",
          name: "Advocate Rajeshwar Rao",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        articleSection: "Post-Death Succession & Banking",
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the RBI UDGAM portal and what does it do?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UDGAM (Unclaimed Deposits - Gateway to Access inforMation) is an official online search portal developed by the Reserve Bank of India (RBI). It allows citizens and legal heirs to search across multiple banks in one place to locate inoperative accounts and unclaimed fixed deposits, recurring deposits, or savings balances.",
            },
          },
          {
            "@type": "Question",
            name: "Can I receive the unclaimed money directly online through UDGAM?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. UDGAM is strictly an information search engine. It helps you find forgotten accounts and generates an Unclaimed Deposit Reference Number (UDRN). To actually receive the money, the registered nominee or legal heirs must visit the respective bank branch and submit physical claim paperwork.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to a bank account after 10 years of inactivity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 26 of the Banking Regulation Act, 1949, any savings account, current account, or fixed deposit that remains un-operated or unclaimed for 10 consecutive years is classified as an unclaimed deposit. Under Section 26A, banks must transfer these balances along with accrued interest to the RBI's Depositor Education and Awareness (DEA) Fund.",
            },
          },
          {
            "@type": "Question",
            name: "Can legal heirs still claim the money after it goes to the RBI DEA Fund?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Transfer to the DEA Fund does not extinguish your legal right to the money. The depositor, nominee, or legal heirs have a permanent right to reclaim the entire principal amount plus permissible interest from the bank at any time. The bank settles your claim first, and then claims reimbursement from the RBI.",
            },
          },
          {
            "@type": "Question",
            name: "How fast must a bank settle a claim if a nominee is registered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Master Directions on Deceased Depositors, banks are strictly required to settle claims submitted by registered nominees within a maximum of 15 calendar days from receiving all required documents.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee become the absolute owner of the deceased's bank balance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In landmark rulings including Shakti Yezdani (2023) and Sarbati Devi (1983), the Supreme Court held that a bank nominee is merely a fiduciary trustee or provisional custodian. The nominee collects the funds to facilitate bank discharge, but must hand over the money to the lawful legal heirs under succession law or as named in the deceased's Will.",
            },
          },
          {
            "@type": "Question",
            name: "Can legal heirs claim unclaimed bank deposits without a court succession certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, provided the total claim falls within the bank's simplified threshold (typically up to Rs 1 Lakh to Rs 5 Lakhs, depending on the bank). Legal heirs can claim funds by submitting an Indemnity Bond, Affidavits, a Legal Heir Certificate or Surviving Member Certificate, and NOCs from other co-heirs without approaching civil court.",
            },
          },
          {
            "@type": "Question",
            name: "When does a bank insist on a court Succession Certificate or Probate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Succession Certificate issued by a competent Civil Court under Part X of the Indian Succession Act, 1925 is mandatory when the unclaimed balance exceeds the bank's simplified threshold (e.g. over Rs 5 Lakhs in SBI), when there are conflicting claims among family members, or when heirship cannot be verified by revenue authorities.",
            },
          },
          {
            "@type": "Question",
            name: "How does having a Will prevent bank deposits from becoming unclaimed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A properly drafted Will lists an exhaustive asset schedule with all bank accounts, FD folios, and branches. It names an Executor with statutory power to collect all estate funds, and aligns nominations with testamentary bequests. This ensures your family immediately knows where all funds are kept and can claim them seamlessly within days.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to search for a deceased person on UDGAM?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To search on UDGAM, you need the deceased account holder's full legal name and at least one matching identifier: PAN card number, Voter ID, Passport number, Driving License, Date of Birth, Date of Death, or their registered address.",
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
      <ClaimUnclaimedDepositsUdgamClient />
      <Footer />
    </>
  );
}
