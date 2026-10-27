import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstateAssetInventoryClient from "./EstateAssetInventoryClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Asset Inventory List for Family India | WillDrafting.in", // exactly 54 characters
  },
  description:
    "Build an asset inventory list for family India under Indian Succession Act. Catalog bank accounts, demat, policies and real estate into a private dossier.", // exactly 154 characters
  keywords: [
    "asset inventory list for family india",
    "financial dossier for family in case of death",
    "where to list all bank accounts and policies for family",
    "estate inventory worksheet india",
    "emergency death folder personalfinanceindia",
    "family red file template india",
    "rbi udgam unclaimed deposits estate list",
    "iepf demat transmission list",
    "section 317 indian succession act inventory accounts",
    "section 159 income tax act legal representative liability",
    "will asset inventory schedule format",
    "ama legal solutions estate net worth calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/estate-net-worth-asset-inventory-builder",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/estate-net-worth-asset-inventory-builder",
      "x-default": "https://www.willdrafting.in/tools/estate-net-worth-asset-inventory-builder",
    },
  },
  openGraph: {
    title: "Asset Inventory List for Family India | WillDrafting.in",
    description:
      "Build an asset inventory list for family India under Indian Succession Act. Catalog bank accounts, demat, policies and real estate into a private dossier.",
    url: "https://www.willdrafting.in/tools/estate-net-worth-asset-inventory-builder",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/estate-net-worth-asset-inventory-builder-og.jpg",
        width: 1200,
        height: 675,
        alt: "Asset Inventory List for Family India and Estate Net Worth Emergency Vault",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asset Inventory List for Family India | WillDrafting.in",
    description:
      "Build an asset inventory list for family India under Indian Succession Act. Catalog bank accounts, demat, policies and real estate into a private dossier.",
    images: ["https://www.willdrafting.in/images/estate-net-worth-asset-inventory-builder-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function EstateAssetInventoryPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/estate-net-worth-asset-inventory-builder";
  const imageUrl = "https://www.willdrafting.in/images/estate-net-worth-asset-inventory-builder-og.jpg";

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
        name: "Asset Inventory List for Family India | WillDrafting.in",
        description:
          "Build an asset inventory list for family India under Indian Succession Act. Catalog bank accounts, demat, policies and real estate into a private dossier.",
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
            name: "Estate Asset Inventory Builder",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Estate Net Worth & Family Asset Inventory Vault Builder India",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "100% browser-local, zero-server private asset inventory and emergency dossier builder under Indian Succession Act 1925, protecting family wealth against RBI UDGAM and IEPF forfeiture.",
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
            name: "Why is a family asset inventory list essential in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Over ₹78,000 Crores of unclaimed funds currently lie abandoned in Indian banks (transferred to the RBI DEA Fund / UDGAM portal) and IEPF (unclaimed shares and dividends). Without a comprehensive written or printable asset dossier, surviving spouses and children frequently have no knowledge of existing fixed deposits, demat folios, PPF accounts, or life insurance policies.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee become the absolute legal owner of assets after death in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court of India in landmark judgments including Sarbati Devi (1984) and Shakti Yezdani (2023) established that a nominee is merely a statutory trustee or custodian authorized to receive funds. Beneficial ownership remains with the legal heirs named in a valid Will, or governed by personal succession laws (such as the Hindu Succession Act, 1956).",
            },
          },
          {
            "@type": "Question",
            name: "Is my financial data uploaded or stored on any server?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This tool runs 100% locally in your web browser. Zero financial values, account details, or policy numbers are transmitted to or stored on our servers. You can export your data as a local JSON file or generate a printable physical dossier directly on your device.",
            },
          },
          {
            "@type": "Question",
            name: "What is an Emergency Red File or Death Folder?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Emergency Red File (popularized across Indian personal finance communities) is a centralized physical and digital dossier containing property deeds, bank account rosters, insurance policy numbers, loan schedules, locker keys location, and your registered Will. It ensures that in the event of incapacitation or sudden demise, the family can instantly step in without facing financial paralysis.",
            },
          },
          {
            "@type": "Question",
            name: "How does Section 317 of the Indian Succession Act, 1925 govern estate inventories?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 317 mandates that every executor or administrator of an estate must exhibit an exact inventory of all property in possession and credits belonging to the deceased within six months of obtaining probate or letters of administration. Maintaining an up-to-date asset roster during life ensures seamless compliance and avoids court citations.",
            },
          },
          {
            "@type": "Question",
            name: "What are legal heirs' liabilities for the deceased's debts under Section 159 of the Income Tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 159 of the Income Tax Act, 1961, legal representatives are liable to pay taxes due from the deceased only to the extent to which the estate is capable of meeting the liability. Heirs are not personally liable beyond the net inherited estate value.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert this asset inventory directly into a legally binding Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An asset inventory provides the exact schedule of assets required in a challenge-proof Will. You can use our self-serve Will drafting wizard to attach this schedule directly as Schedule of Properties, specifying specific legatees for each asset.",
            },
          },
          {
            "@type": "Question",
            name: "How should passwords, crypto keys, and digital locker credentials be handled?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Never store master passwords or private crypto seeds in unsecured plain-text sheets. Record the existence of the digital assets (e.g., hardware wallet model, broker name) in the dossier, and store master passwords inside an encrypted password manager or sealed tamper-evident envelope with your designated digital executor.",
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
      <Navbar />
      <EstateAssetInventoryClient />
      <Footer />
    </>
  );
}
