import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DigitalAssetsCryptoClient from "./DigitalAssetsCryptoClient";

export const metadata: Metadata = {
  title: {
    absolute: "How to Include Crypto in Will India: Digital Assets",
  },
  description:
    "Learn how to include crypto in will India using the two-document method. Protect Bitcoin, wallets, and digital accounts legally with AMA advocates.",
  keywords: [
    "how to include crypto in will india",
    "digital assets in will",
    "crypto inheritance india",
    "bitcoin will india",
    "digital estate planning",
    "include online accounts in will",
    "crypto will two document method",
    "virtual digital assets succession act",
    "section 115bbh crypto inheritance",
    "hardware wallet estate planning",
    "fiu ind crypto inheritance",
    "ama legal solutions digital will",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/blogs/digital-assets-crypto-will-india",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/blogs/digital-assets-crypto-will-india",
      "x-default":
        "https://www.willdrafting.in/blogs/digital-assets-crypto-will-india",
    },
  },
  openGraph: {
    title: "How to Include Crypto in Will India: Digital Assets",
    description:
      "Learn how to include crypto in will India using the two-document method. Protect Bitcoin, wallets, and digital accounts legally with AMA advocates.",
    url: "https://www.willdrafting.in/blogs/digital-assets-crypto-will-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/digital-assets-crypto-will-india.jpg",
        width: 1200,
        height: 630,
        alt: "How to Include Crypto and Digital Assets in an Indian Will Legal Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Include Crypto in Will India: Digital Assets",
    description:
      "Learn how to include crypto in will India using the two-document method. Protect Bitcoin, wallets, and digital accounts legally with AMA advocates.",
    images: [
      "https://www.willdrafting.in/images/digital-assets-crypto-will-india.jpg",
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

export default function DigitalAssetsCryptoPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/blogs/digital-assets-crypto-will-india";
  const imageUrl =
    "https://www.willdrafting.in/images/digital-assets-crypto-will-india.jpg";

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
        name: "How to Include Crypto in Will India: Digital Assets",
        description:
          "Learn how to include crypto in will India using the two-document method. Protect Bitcoin, wallets, and digital accounts legally with AMA advocates.",
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
            name: "Crypto and Digital Assets in Will India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "How to Include Crypto & Digital Assets in an Indian Will",
        description:
          "Statutory guide on digital estate planning in India covering the Two-Document Method, crypto seed phrase security, VDA taxation under Section 115BBH, and digital asset inventories.",
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Adv. Sneha Jaiswal",
          jobTitle: "Senior Succession & Trust Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
        datePublished: "2026-10-21T09:00:00+05:30",
        dateModified: "2026-10-21T09:00:00+05:30",
        mainEntityOfPage: canonicalUrl,
        articleSection: "Digital Estate Planning & Succession",
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I legally bequeath crypto and Bitcoin in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 30 of the Indian Succession Act, 1925, any competent person can dispose of any movable property by Will. The Supreme Court of India in the 2020 Internet and Mobile Association of India (IMAI) judgment affirmed that cryptocurrency is legal to hold as digital property. Cryptocurrency is legally classified as Virtual Digital Assets (VDAs) under Section 2(47A) of the Income Tax Act, 1961 and can be validly bequeathed to any legal heir.",
            },
          },
          {
            "@type": "Question",
            name: "Why should I never put my crypto private keys or seed phrases in my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Will is not a secret document. Under Section 63 of the Indian Succession Act, at least two independent witnesses must view your execution and can read the Will. Furthermore, if your Will is submitted for probate in court or registered at the Sub-Registrar Office, it becomes a public record. Anyone who reads your 12 or 24-word seed phrase can instantly steal your entire balance irreversibly. That is why you must use the Two-Document Method.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Two-Document Method for crypto and digital estate planning?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Two-Document Method splits legal ownership from technical access. Document 1 is your formal Last Will and Testament, which names your beneficiaries and legally gifts your digital assets to them. Document 2 is a separate, confidential Digital Asset Memorandum or sealed access letter (stored in a bank locker or encrypted password vault) that contains hardware wallet locations, PINs, seed phrases, and technical recovery instructions.",
            },
          },
          {
            "@type": "Question",
            name: "Is inherited crypto taxed in India under the 30% VDA tax rule?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, the inheritance itself is 100% tax-free at receipt. Under the proviso to Section 56(2)(x) of the Income Tax Act, 1961, any property or virtual digital asset received under a Will or through inheritance is completely exempt from gift tax and income tax. However, when your heir later sells or exchanges that crypto for rupees, they will owe a flat 30% tax on net profits under Section 115BBH plus 1% TDS under Section 194S.",
            },
          },
          {
            "@type": "Question",
            name: "How does my heir calculate capital gains when selling inherited crypto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 49(1) of the Income Tax Act, 1961, the cost of acquisition for the legal heir is deemed to be the cost for which the deceased person originally bought the cryptocurrency. The heir's taxable profit is the final sale price minus that original purchase cost. Under Section 115BBH, no indexation benefits or loss offsets are permitted.",
            },
          },
          {
            "@type": "Question",
            name: "How can my family recover crypto kept on Indian centralized exchanges like CoinDCX or WazirX?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Centralized exchanges registered with FIU-IND require your legal heir or executor to submit a formal transmission claim. They will ask for an official death certificate, a copy of the probated Will or Legal Heir Certificate / Succession Certificate, complete KYC documents of the claimant, and an indemnity bond. Once verified, the exchange transfers the balance to the heir's verified account.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to self-custodial wallets like MetaMask or Ledger if I do not leave instructions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unlike bank accounts or stock demat accounts, self-custodial blockchain wallets have no customer support, no nominee mechanism, and no court override. If you do not leave your hardware wallet PIN and 12/24-word seed phrase in a secure letter, your crypto will remain locked on the blockchain forever and can never be recovered by anyone, including judges or cyber police.",
            },
          },
          {
            "@type": "Question",
            name: "Can my executor access my Google Drive, iCloud, and emails legally after my death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 43 and Section 66 of the Information Technology Act, 2000, logging into another person's account without express authorization can technically constitute an offense. To protect your family, you should: (1) explicitly authorize your digital executor in your Will to handle electronic accounts, and (2) configure platform legacy features like Google Inactive Account Manager and Apple Legacy Contact during your lifetime.",
            },
          },
          {
            "@type": "Question",
            name: "How do I include domain names, social media channels, and YouTube revenue in my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Digital media and revenue accounts represent commercial intellectual and contractual property. You can bequeath specific domain names, monetized YouTube channels, or online storefronts to named beneficiaries in your Will. Your confidential access memo should list the registrar (e.g. GoDaddy), Google AdSense account ID, and payout details so the executor can reassign ownership smoothly.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to update my Will every time I buy a new cryptocurrency or change a password?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No! This is the greatest advantage of the Two-Document Method. Your formal Will contains a broad legal bequest (e.g. 'all my virtual digital assets and cryptocurrency holdings'). When you buy new coins, open new wallets, or update passwords, you simply update your private Digital Asset Memorandum in your safe or password vault without paying advocate fees or executing a Codicil.",
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
      <DigitalAssetsCryptoClient />
      <Footer />
    </>
  );
}
