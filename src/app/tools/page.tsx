import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolsClient from "./ToolsClient";
import { toolsData } from "@/data/toolsData";

export const dynamic = "force-dynamic";

// Strict SEO compliance: Title 50–60 chars, Meta Description 140–155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Legal Succession Tools & Calculators | WillDrafting",
  },
  description:
    "Free legal diagnostic tools, court fee calculators, NRI Will checkers, and Hindu succession share estimators under the Indian Succession Act 1925.",
  alternates: {
    canonical: "https://www.willdrafting.in/tools",
  },
  openGraph: {
    title: "Legal Succession Tools & Calculators | WillDrafting",
    description:
      "Free legal diagnostic tools, court fee calculators, NRI Will checkers, and Hindu succession share estimators. Compliant with Indian Succession.",
    url: "https://www.willdrafting.in/tools",
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Succession & Will Tools Directory - WillDrafting.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Succession Tools & Calculators | WillDrafting",
    description:
      "Free legal diagnostic tools, court fee calculators, NRI Will checkers, and Hindu succession share estimators. Compliant with Indian Succession.",
    images: ["https://www.willdrafting.in/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ToolsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Legal Tools",
        item: "https://www.willdrafting.in/tools",
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WillDrafting Legal Succession Tools & Calculators Directory",
    description:
      "Complete index of interactive succession tools, court fee calculators, NRI Will checkers, and probate diagnostic engines.",
    url: "https://www.willdrafting.in/tools",
    isPartOf: {
      "@type": "WebSite",
      name: "WillDrafting",
      url: "https://www.willdrafting.in",
    },
    about: {
      "@type": "Thing",
      name: "Indian Succession Tools & Legal Calculators",
    },
    numberOfItems: toolsData.length,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: toolsData.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: `https://www.willdrafting.in${tool.href}`,
        description: tool.description,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <Navbar />
        <div className="flex-1">
          <ToolsClient initialTools={toolsData} />
        </div>
        <Footer />
      </div>
    </>
  );
}
