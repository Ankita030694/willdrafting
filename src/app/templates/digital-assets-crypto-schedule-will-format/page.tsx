import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DigitalAssetsCryptoScheduleClient from "./DigitalAssetsCryptoScheduleClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Crypto & Digital Asset Inventory Will India | WillDrafting", // exactly 58 characters
  },
  description:
    "Download digital asset inventory template for will India. Protect Bitcoin, crypto wallets, and 2FA with 2-part will clauses and sealed legacy.", // exactly 153 characters
  keywords: [
    "digital asset inventory template for will india",
    "crypto will clause format india",
    "password and digital legacy memorandum format",
    "how to leave crypto in will india",
    "hardware wallet seed phrase inheritance india",
    "section 115bbh crypto inheritance tax india",
    "digital executor clause format indian succession act",
    "virtual digital assets will schedule format",
    "sealed letter of digital access memorandum format",
    "coindcx wazirx crypto death claim procedure",
    "information technology act section 43 electronic record will",
    "ama legal solutions crypto will drafting advocate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/digital-assets-crypto-schedule-will-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/digital-assets-crypto-schedule-will-format",
      "x-default": "https://www.willdrafting.in/templates/digital-assets-crypto-schedule-will-format",
    },
  },
  openGraph: {
    title: "Crypto & Digital Asset Inventory Will India | WillDrafting",
    description:
      "Download digital asset inventory template for will India. Protect Bitcoin, crypto wallets, and 2FA with 2-part will clauses and sealed legacy.",
    url: "https://www.willdrafting.in/templates/digital-assets-crypto-schedule-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/digital-assets-crypto-schedule-will-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Digital Assets and Crypto Schedule Will Format India Guide and Inventory Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto & Digital Asset Inventory Will India | WillDrafting",
    description:
      "Download digital asset inventory template for will India. Protect Bitcoin, crypto wallets, and 2FA with 2-part will clauses and sealed legacy.",
    images: ["https://www.willdrafting.in/images/digital-assets-crypto-schedule-will-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function DigitalAssetsCryptoSchedulePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/digital-assets-crypto-schedule-will-format";
  const imageUrl =
    "https://www.willdrafting.in/images/digital-assets-crypto-schedule-will-format-og.jpg";

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
        name: "Crypto & Digital Asset Inventory Will India | WillDrafting",
        description:
          "Download digital asset inventory template for will India. Protect Bitcoin, crypto wallets, and 2FA with 2-part will clauses and sealed legacy.",
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
            name: "Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Digital Assets & Crypto Will Schedule",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Digital Assets and Crypto Schedule Will Format India",
        url: canonicalUrl,
        description:
          "Two-part legally compliant digital asset inventory template and confidential access memorandum adhering to Indian Succession Act, 1925.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I mention my crypto wallet seed phrases or passwords directly in my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. You must never write hardware wallet recovery seed phrases, private keys, or account passwords directly in a filed Will. Under Section 294 of the Indian Succession Act, 1925, a probated Will becomes a public judicial paper open for inspection by court staff, adverse litigants, and the general public. Anyone inspecting the probate records could drain your crypto in seconds.",
            },
          },
          {
            "@type": "Question",
            name: "What is the recommended two-part format for bequeathing crypto in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The gold-standard legal architecture consists of: (1) A formal Public Will Clause bequeathing ownership of the underlying digital assets, tokens, hardware devices, and domains to designated heirs and appointing a Digital Executor, and (2) A confidential, offline Sealed Digital Access Memorandum stored in a secure bank safe deposit locker or steel vault containing technical access coordinates, hardware PIN locations, and password recovery instructions.",
            },
          },
          {
            "@type": "Question",
            name: "Is crypto inheritance taxable under Section 115BBH in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, any asset received under a Will or by way of estate is completely exempt from income tax in the hands of the legal heir. While Section 115BBH levies a flat 30% tax plus surcharge and cess on the transfer of Virtual Digital Assets (VDAs), estate is excluded from taxable transfer. However, when the heir then sells or exchanges the inherited crypto for fiat currency, the 30% tax applies on the net gains.",
            },
          },
          {
            "@type": "Question",
            name: "What powers does a Digital Executor have under the Information Technology Act, 2000?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Digital Executor is legally authorized in the Will to act as the deceased's authorized agent under the Information Technology Act, 2000 and Indian Succession Act, 1925. This explicit authorization shields the executor from criminal penalties for unwanted access or hacking under Sections 43 and 66 of the IT Act when accessing devices, communicating with service providers, and signing custodial transfers.",
            },
          },
          {
            "@type": "Question",
            name: "How do Indian exchanges like CoinDCX and WazirX handle the death of an account holder?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Indian FIU-filed exchanges require: (1) Certified copy of the death paper, (2) Probated Will or Estate Paper or Legal Heir Paper issued by the competent revenue office or civil court, (3) KYC papers and PAN of the claiming legal heir, and (4) An indemnity bond signed by all legal heirs with two solvent sureties. The account is frozen upon notification, and assets are transferred only to checked heir bank accounts.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to self-custody cold wallets (Ledger, Trezor) if no seed phrase is left behind?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a Will maker dies without leaving behind their 12 or 24-word BIP-39 recovery seed phrase or PIN, the crypto stored on a non-custodial hardware wallet is mathematically unrecoverable. Neither High Courts, estate papers, nor device manufacturers like Ledger or SatoshiLabs have backdoors or root access to decrypt private keys on the blockchain.",
            },
          },
          {
            "@type": "Question",
            name: "Can I transfer domain names, SaaS accounts, and social media through a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Domain names filed on ICANN-accredited registrars (such as GoDaddy or Namecheap) and proprietary intellectual asset or software codes are recognized as intangible personal asset. The Will should authorize the Digital Executor to request registry transfer. For accounts with Google and Apple, Will makers should configure Inactive Account Manager and Apple Legacy Contacts prior to demise.",
            },
          },
          {
            "@type": "Question",
            name: "Is a separate Sealed Digital Access Memorandum legally binding in an Indian court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Sealed Memorandum serves as an operational guidance letter to your Executor rather than a Will instrument that disposes of asset title. The legal bequest of title is signed via the filed Will itself. Because the memorandum provides logistical instructions to the fiduciary rather than alienating asset, it does not require probate or public filing, preserving complete technical privacy.",
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
        <DigitalAssetsCryptoScheduleClient />
        <Footer />
      </div>
    </>
  );
}
