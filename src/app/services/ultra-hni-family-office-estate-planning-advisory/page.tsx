import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UltraHniFamilyOfficeClient from "./UltraHniFamilyOfficeClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Ultra HNI Estate Planning Lawyer India | WillDrafting", // exactly 53 characters
  },
  description:
    "Premier ultra-HNI estate planning and family office succession legal services in India. Institutional private trusts, HoldCo restructuring, and wills.", // exactly 150 characters
  keywords: [
    "ultra hni estate planning lawyer india",
    "family office estate planning advocate",
    "multi-jurisdiction wealth succession law firm",
    "private trust and will advisory hni india",
    "promoter wealth ring fencing advocate",
    "core investment company cic succession india",
    "fema cross border estate planning lawyer",
    "family constitution drafting counsel india",
    "irrevocable private trust taxation section 56",
    "sebi sast open offer promoter trust exemption",
    "ama legal solutions ultra hni family office",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/ultra-hni-family-office-estate-planning-advisory",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/ultra-hni-family-office-estate-planning-advisory",
      "x-default":
        "https://www.willdrafting.in/services/ultra-hni-family-office-estate-planning-advisory",
    },
  },
  openGraph: {
    title: "Ultra HNI Estate Planning Lawyer India | WillDrafting",
    description:
      "Premier ultra-HNI estate planning and family office succession legal services in India. Institutional private trusts, HoldCo restructuring, and wills.",
    url: "https://www.willdrafting.in/services/ultra-hni-family-office-estate-planning-advisory",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/ultra-hni-family-office-estate-planning-advisory-og.jpg",
        width: 1200,
        height: 675,
        alt: "Ultra HNI Estate Planning Lawyer and Family Office Advisory Services India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultra HNI Estate Planning Lawyer India | WillDrafting",
    description:
      "Premier ultra-HNI estate planning and family office succession legal services in India. Institutional private trusts, HoldCo restructuring, and wills.",
    images: [
      "https://www.willdrafting.in/images/ultra-hni-family-office-estate-planning-advisory-og.jpg",
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

export default function UltraHniFamilyOfficePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/services/ultra-hni-family-office-estate-planning-advisory";
  const imageUrl =
    "https://www.willdrafting.in/images/ultra-hni-family-office-estate-planning-advisory-og.jpg";

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
        name: "Ultra HNI Estate Planning Lawyer India | WillDrafting",
        description:
          "Premier ultra-HNI estate planning and family office succession legal services in India. Institutional private trusts, HoldCo restructuring, and wills.",
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
            name: "Services",
            item: "https://www.willdrafting.in/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Ultra HNI Family Office Estate Planning Advisory",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "Ultra HNI Family Office Estate Planning & Succession Legal Practice",
        url: canonicalUrl,
        description:
          "Institutional legal advisory for Indian ultra-HNIs, family offices, and promoters structuring private family trusts, HoldCos, cross-border FEMA estates, and multi-generational family constitutions.",
        image: imageUrl,
        priceRange: "₹1,50,000 - ₹10,00,000+",
        serviceType:
          "Estate Planning, Family Office Advisory, Private Trust Formation, Corporate Succession",
        provider: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Ultra-HNI Estate Planning and Family Office Advisory",
        url: canonicalUrl,
        provider: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ultra-HNI Estate Structuring Modules",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Irrevocable Discretionary Private Family Trust Formation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Family Holding Company Restructuring & Section 56 Exemption",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Multi-Jurisdiction FEMA Cross-Border Succession Architecture",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Family Constitution, Council Charter & Dispute Resolution Protocol",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between a simple Will and an institutional Private Family Trust for an ultra-HNI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A simple Will only takes effect after death and requires court probate in presidency towns like Mumbai, Kolkata, and Chennai. A Private Family Trust operates during the founder's lifetime. It provides immediate asset ring-fencing against creditors, avoids court probate delays, maintains complete confidentiality, and allows structured distributions to multiple generations.",
            },
          },
          {
            "@type": "Question",
            name: "Does transferring shares or immovable property into a Private Trust attract capital gains tax in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 47(iii) of the Income Tax Act, 1961, any transfer of a capital asset under a gift or an irrevocable trust is expressly exempt from capital gains tax. Furthermore, Section 56(2)(x) exemptions apply when trust beneficiaries are relatives of the settler, making the initial settlement tax-neutral.",
            },
          },
          {
            "@type": "Question",
            name: "How does Section 32A of the Insolvency and Bankruptcy Code (IBC) protect trust assets from creditor attachment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Assets settled into an irrevocable private trust while the promoter is solvent and with no pending creditor claims are legally separated from the promoter's personal estate. Under the Indian Trusts Act and IBC jurisprudence, creditors or resolution professionals cannot attach genuinely settled trust properties for company debts.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Indian promoter use a Private Trust to hold shares in listed companies without triggering SEBI open offer rules?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Regulation 10(1)(a)(ii) and SEBI Takeover Regulations clarification circulars, transfers of equity shares from promoters to private family trusts where only family members are trustees and ultimate beneficiaries qualify for general exemptions from mandatory open offers under the SEBI SAST Regulations.",
            },
          },
          {
            "@type": "Question",
            name: "How do FEMA and Overseas Investment Rules 2022 regulate cross-border trusts and overseas assets of Indian family offices?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Indian residents can remit funds overseas up to $250,000 per financial year under the RBI Liberalised Remittance Scheme (LRS). Under FEMA (Overseas Investment) Rules 2022, resident individuals can invest in foreign entities, hold overseas bank accounts, and settle foreign trusts subject to specific reporting in Form FC and annual compliance.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Family Constitution legally binding and enforceable in Indian courts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Family Constitution combines moral family agreements with legally binding corporate contracts. When backed by voting agreements, amended Articles of Association (AoA) under the Companies Act 2013, and private trust deeds, Indian courts enforce these governance terms under the Indian Contract Act, 1872 as confirmed in Kale v. Dy. Director of Consolidation.",
            },
          },
          {
            "@type": "Question",
            name: "What is a Core Investment Company (CIC) and when should an ultra-HNI family use a HoldCo versus a Private Trust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Core Investment Company (CIC) is an RBI-registered NBFC that holds at least 90% of its net assets in equity, preference shares, or debt of group companies. Ultra-HNIs use a HoldCo for commercial operational control and reinvestment, while placing the equity shares of that HoldCo into an irrevocable Private Trust for generational succession and creditor protection.",
            },
          },
          {
            "@type": "Question",
            name: "How does Section 6 of the Married Women's Property Act (MWPA) 1874 protect family wealth?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When an ultra-HNI takes a life insurance policy under Section 6 of the MWPA for the benefit of their wife or children, the policy forms an automatic statutory trust. By law, neither the husband, his creditors, court attachments, nor tax authorities can attach the policy proceeds during insolvency or business failure.",
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
        <UltraHniFamilyOfficeClient />
        <Footer />
      </div>
    </>
  );
}
