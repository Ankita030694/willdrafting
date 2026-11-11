import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CryptoWillInventoryClient from "./CryptoWillInventoryClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Crypto Will & Digital Asset Builder | WillDrafting", // exactly 49 characters
  },
  description:
    "Safely bequeath Bitcoin, cold storage crypto, and digital assets in an Indian will without exposing private keys. Free inventory and tax builder.", // exactly 145 characters
  keywords: [
    "crypto will digital asset inventory builder india",
    "how to bequeath cryptocurrency in will india",
    "hardware wallet seed phrase will checklist",
    "30 percent crypto tax inheritance calculator",
    "section 115bbh crypto inheritance tax india",
    "ledger trezor crypto succession will",
    "zero knowledge crypto will inventory",
    "section 56 2 x crypto inheritance exemption",
    "digital asset executor indian succession act",
    "cold storage bitcoin inheritance legal guide",
    "fiu ind exchange crypto nominee transmission",
    "ama legal solutions crypto estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/crypto-hardware-wallet-digital-will-inventory-builder",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/crypto-hardware-wallet-digital-will-inventory-builder",
      "x-default":
        "https://www.willdrafting.in/tools/crypto-hardware-wallet-digital-will-inventory-builder",
    },
  },
  openGraph: {
    title: "Crypto Will & Digital Asset Builder | WillDrafting",
    description:
      "Safely bequeath Bitcoin, cold storage crypto, and digital assets in an Indian will without exposing private keys. Free inventory and tax builder.",
    url: "https://www.willdrafting.in/tools/crypto-hardware-wallet-digital-will-inventory-builder",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/crypto-hardware-wallet-digital-will-inventory-builder-og.jpg",
        width: 1200,
        height: 675,
        alt: "Crypto Hardware Wallet and Digital Will Inventory Builder India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Will & Digital Asset Builder | WillDrafting",
    description:
      "Safely bequeath Bitcoin, cold storage crypto, and digital assets in an Indian will without exposing private keys. Free inventory and tax builder.",
    images: [
      "https://www.willdrafting.in/images/crypto-hardware-wallet-digital-will-inventory-builder-og.jpg",
    ],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CryptoHardwareWalletDigitalWillPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/crypto-hardware-wallet-digital-will-inventory-builder";
  const imageUrl =
    "https://www.willdrafting.in/images/crypto-hardware-wallet-digital-will-inventory-builder-og.jpg";

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
        name: "Crypto Will & Digital Asset Builder | WillDrafting",
        description:
          "Safely bequeath Bitcoin, cold storage crypto, and digital assets in an Indian will without exposing private keys. Free inventory and tax builder.",
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
            name: "Crypto Digital Will Inventory Builder",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Crypto Hardware Wallet & Digital Will Inventory Builder India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Zero-knowledge inventory generator, air-gapped letter of instruction builder, and Section 115BBH VDA inheritance tax calculator for Indian digital asset owners.",
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
            name: "Can I mention Bitcoin, Ethereum, and crypto in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 30 of the Indian Succession Act, 1925, any adult of sound mind can bequeath their movable and intangible property through a Will. The Supreme Court in the IMAI ruling (2020) confirmed that cryptocurrencies constitute valid intangible digital assets. You can legally bequeath crypto holdings to your chosen heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Should I write my seed phrase or private keys inside my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Never. Writing your 12 or 24-word recovery seed phrase or private keys inside a Will is a catastrophic security mistake. Under Section 57 of the Registration Act, 1908, registered Wills become public records. In addition, probate court proceedings are open to the public. If your keys are written in the Will, clerks, witnesses, or third parties can steal all your crypto immediately.",
            },
          },
          {
            "@type": "Question",
            name: "How do heirs access my hardware wallet without private keys in the Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use an Air-Gapped Dual Structure. The legal Will establishes legal ownership, names a tech-savvy Digital Asset Executor, and bequeaths the digital assets. A separate, confidential Letter of Instruction stored in a bank safety locker or personal safe provides the physical device locations, PIN hints, and recovery steps without exposing them in public court filings.",
            },
          },
          {
            "@type": "Question",
            name: "Is inherited crypto taxed at 30% under Section 115BBH in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No tax is due upon inheritance. Under the First Proviso to Section 56(2)(x) of the Income Tax Act, 1961, any property including Virtual Digital Assets received under a Will or by way of inheritance is 100% exempt from income tax and gift tax. The 30% tax under Section 115BBH applies only when the heir later sells, trades, or liquidates the crypto for INR.",
            },
          },
          {
            "@type": "Question",
            name: "What is the cost of acquisition when an heir sells inherited crypto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 49(1)(iii)(a) of the Income Tax Act, the cost of acquisition to the legal heir is deemed to be the original purchase cost paid by the deceased testator. The heir pays 30% tax (plus 4% cess) only on the net gain calculated as the final selling price minus the original purchase cost.",
            },
          },
          {
            "@type": "Question",
            name: "Does 1% TDS under Section 194S apply when transferring crypto via Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 194S mandates 1% TDS only on the transfer of Virtual Digital Assets for consideration (sale or exchange). A testamentary bequest in a Will does not involve monetary consideration, so 1% TDS does not apply to estate transmission.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to crypto on Indian exchanges like CoinDCX or WazirX upon death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "FIU-IND compliant Indian exchanges follow formal transmission procedures. Heirs or executors must submit a certified copy of the death certificate, legal heir certificate or probate, PAN cards, and KYC documents. The exchange freezes trading and transfers the fiat or crypto balance to the verified legal heir bank account or exchange wallet.",
            },
          },
          {
            "@type": "Question",
            name: "What is a Digital Asset Executor and why do I need one?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Digital Asset Executor is a trusted person named in your Will with specific fiduciary powers to manage, secure, access, and distribute digital assets, hardware devices, and online exchange accounts under Section 211 of the Indian Succession Act. Appointing someone tech-savvy prevents assets from being permanently lost due to lost passwords or hardware wallet lockout.",
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
        <CryptoWillInventoryClient />
        <Footer />
      </div>
    </>
  );
}
