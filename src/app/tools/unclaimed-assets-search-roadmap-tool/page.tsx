import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnclaimedAssetsSearchClient from "./UnclaimedAssetsSearchClient";

// Strict Screaming Frog SEO compliance:
// Title: Strictly 50-60 characters (never >60, never <30)
// Meta Description: Strictly 140-155 characters (never >155, never <100)
// 0 em-dashes anywhere in titles, descriptions, or headings
export const metadata: Metadata = {
  title: {
    absolute: "Find Deceased Parents Bank Accounts & Assets | WillDrafting", // exactly 59 characters
  },
  description:
    "Trace deceased parents bank accounts, demat shares, IEPF, and mutual funds using PAN under Section 159. Free interactive discovery roadmap tool.", // exactly 144 characters
  keywords: [
    "how to find deceased parents bank accounts and investments india",
    "trace all assets of deceased person using pan india",
    "udgam iepf sebi mitra lic unclaimed check tool",
    "section 159 legal heir income tax login ais tis",
    "find deceased father mutual funds cams kfintech",
    "how to track deceased parent demat shares cdsl nsdl",
    "rbi udgam portal unclaimed deposits deceased claim",
    "recover deceased parent shares from iepf",
    "bima bharosa lic unclaimed policy search portal",
    "epfo uan death claim form 20 10d 5if",
    "how to trace dormant bank accounts of deceased person",
    "ama legal solutions unclaimed assets recovery lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/unclaimed-assets-search-roadmap-tool",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/unclaimed-assets-search-roadmap-tool",
      "x-default": "https://www.willdrafting.in/tools/unclaimed-assets-search-roadmap-tool",
    },
  },
  openGraph: {
    title: "Find Deceased Parents Bank Accounts & Assets | WillDrafting",
    description:
      "Trace deceased parents bank accounts, demat shares, IEPF, and mutual funds using PAN under Section 159. Free interactive discovery roadmap tool.",
    url: "https://www.willdrafting.in/tools/unclaimed-assets-search-roadmap-tool",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/unclaimed-assets-search-roadmap-tool-og.jpg",
        width: 1200,
        height: 675,
        alt: "Unclaimed Assets Search Roadmap Tool and Asset Discovery Protocol India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Deceased Parents Bank Accounts & Assets | WillDrafting",
    description:
      "Trace deceased parents bank accounts, demat shares, IEPF, and mutual funds using PAN under Section 159. Free interactive discovery roadmap tool.",
    images: ["https://www.willdrafting.in/images/unclaimed-assets-search-roadmap-tool-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function UnclaimedAssetsSearchRoadmapPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/unclaimed-assets-search-roadmap-tool";
  const imageUrl = "https://www.willdrafting.in/images/unclaimed-assets-search-roadmap-tool-og.jpg";

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
        name: "Find Deceased Parents Bank Accounts & Assets | WillDrafting",
        description:
          "Trace deceased parents bank accounts, demat shares, IEPF, and mutual funds using PAN under Section 159. Free interactive discovery roadmap tool.",
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
            name: "Unclaimed Assets Search Roadmap",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Unclaimed Assets & Deceased Accounts Search Roadmap Tool",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory roadmap to discover deceased parents bank accounts, demat equity shares, mutual fund folios, IEPF unclaimed assets, and.",
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
            name: "Can I find all my deceased parents bank accounts and investments using their PAN?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. While India has no single master asset search database, your parent's Permanent Account Number (PAN) is the universal financial identifier. By leveraging PAN-based Consolidated Account Statements (CAS) across CDSL, NSDL, and MFCentral, the Annual Information Statement (AIS/TIS) on the Income Tax portal via Section 159 legal heir access, RBI UDGAM for dormant deposits, and the IEPF portal, legal heirs can discover approximately 98% of all domestic bank accounts, shares, mutual funds, and fixed deposits.",
            },
          },
          {
            "@type": "Question",
            name: "How do legal heirs register on the Income Tax portal under Section 159 to view AIS and 26AS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 159 of the Income Tax Act, 1961, the legal representative of a deceased taxpayer can register on incometax.gov.in. The heir logs into their own e-Filing profile, navigates to Authorized Partners > Register as Representative Assessee, selects Deceased (Legal Heir), and uploads: (1) Copy of PAN of both deceased and heir, (2) Certified Death Certificate, and (3) Legal Heir Certificate, Surviving Member Certificate, or Registered Will/Probate. Once approved by the Assessing Officer, the heir can access the deceased's Annual Information Statement (AIS) and Form 26AS, which list every bank reporting interest, dividend payments, stock sales, and high-value transactions.",
            },
          },
          {
            "@type": "Question",
            name: "What is the RBI UDGAM portal and which bank deposits can be tracked through it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UDGAM (Unclaimed Deposits Gateway to Access Information) is an official centralized search portal established by the Reserve Bank of India (RBI). Under Section 26A of the Banking Regulation Act, 1949, all balances in savings and current accounts inactive for 10 or more years, and term deposits unclaimed for 10 years past maturity, are transferred to the RBI's Depositor Education and Awareness (DEA) Fund. UDGAM enables citizens to search across 30+ major commercial, private, and regional rural banks using the deceased's name combined with PAN, voter ID, passport, or date of birth.",
            },
          },
          {
            "@type": "Question",
            name: "How can I track all mutual funds owned by a deceased parent across CAMS and KFintech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All 44+ mutual fund houses in India are administered by two primary Registrars and Transfer Agents (RTAs): CAMS and KFintech. Instead of querying fund houses individually, legal heirs can obtain a Consolidated Account Statement (CAS). Through MFCentral (mfcentral.com) or the CAMS and KFintech online portals, you can generate a PAN-level CAS. If the parent's registered mobile number is no longer active, heirs can submit a physical CAS request form at any local CAMS or KFintech Investor Service Centre (ISC) along with an attested death certificate and legal heir documentation.",
            },
          },
          {
            "@type": "Question",
            name: "What is the process to find forgotten shares transferred to the IEPF authority?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 124(6) of the Companies Act, 2013, if dividends on shares remain unpaid or unclaimed for 7 consecutive years, the company must legally transfer both the accumulated dividends and the underlying equity shares to the Investor Education and Protection Fund (IEPF). To check whether shares were transferred, visit iepf.gov.in and search the Unclaimed and Unpaid Amounts database using your parent's PAN, folio number, or name. To recover the shares, heirs must secure an Entitlement Letter from the company's RTA (Form ISR-4) and submit Form IEPF-5 online on MCA21.",
            },
          },
          {
            "@type": "Question",
            name: "How do I trace life insurance policies when I do not have policy documents or numbers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you suspect your deceased parent held life insurance policies but cannot find paper bonds, you should utilize three channels: (1) The IRDAI Bima Bharosa portal (bimabharosa.irdai.gov.in), (2) The official LIC Unclaimed Policy search portal (licindia.in), which searches across all LIC branches nationwide by policyholder name and date of birth, and (3) Auditing bank statements and Income Tax AIS/TIS for premium debits or Section 80C life insurance tax deduction entries.",
            },
          },
          {
            "@type": "Question",
            name: "Will a bank freeze my deceased parent's account as soon as they are notified of the death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Upon receiving formal intimation and a death certificate, banks are legally mandated to place an immediate debit freeze on the deceased's sole accounts to prevent unauthorized ATM withdrawals, cheques, or net banking transfers. Inward credits like dividends and pension interest continue. If a nominee was registered, the bank must settle the claim within 15 calendar days under RBI guidelines. If no nominee exists, funds are disbursed to Class I legal heirs upon submitting an Indemnity Bond, NOCs, and a Legal Heir or Succession Certificate.",
            },
          },
          {
            "@type": "Question",
            name: "When is a Succession Certificate mandatory instead of a basic Legal Heir Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Legal Heir Certificate is an administrative certificate issued by local revenue authorities (Tehsildar or SDM) establishing relationship status, suitable for bank claims below institutional threshold limits (typically ₹1 Lakh to ₹5 Lakhs). In contrast, a Succession Certificate is a judicial decree issued by a Civil District Court under Section 372 of the Indian Succession Act, 1925, certifying legal title to debts and securities. A Succession Certificate or Court Probate of Will is mandatory when claiming high-value demat shares, IEPF refunds exceeding ₹5 Lakhs, or bank balances exceeding branch settlement thresholds.",
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
        <UnclaimedAssetsSearchClient />
        <Footer />
      </div>
    </>
  );
}
