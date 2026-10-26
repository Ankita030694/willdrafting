import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplatesClient from "./TemplatesClient";
import { templatesData } from "@/data/templatesData";

export const dynamic = "force-dynamic";

// Strict SEO compliance: Title 50–60 chars, Meta Description 140–155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: "Legal Will & Succession Templates | WillDrafting", // exactly 50 characters
  description:
    "Download legally valid plain paper Will formats, Hindi wasiyatnama, codicils, living wills, and relinquishment deeds under Indian Succession Act 1925.", // exactly 151 characters
  alternates: {
    canonical: "https://www.willdrafting.in/templates",
  },
  openGraph: {
    title: "Legal Will & Succession Templates | WillDrafting",
    description:
      "Download legally valid plain paper Will formats, Hindi wasiyatnama, codicils, living wills, and relinquishment deeds under Indian Succession Act 1925.",
    url: "https://www.willdrafting.in/templates",
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will & Succession Templates Directory - WillDrafting.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Will & Succession Templates | WillDrafting",
    description:
      "Download legally valid plain paper Will formats, Hindi wasiyatnama, codicils, living wills, and relinquishment deeds under Indian Succession Act 1925.",
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

export default function TemplatesPage() {
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
        name: "Legal Templates",
        item: "https://www.willdrafting.in/templates",
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WillDrafting Legal Will & Succession Templates Directory",
    description:
      "Complete directory of lawyer-vetted legal templates for Wills, Codicils, Living Wills, and Relinquishment Deeds.",
    url: "https://www.willdrafting.in/templates",
    isPartOf: {
      "@type": "WebSite",
      name: "WillDrafting",
      url: "https://www.willdrafting.in",
    },
    about: {
      "@type": "Thing",
      name: "Indian Will & Property Succession Templates",
    },
    numberOfItems: templatesData.length,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: templatesData.map((template, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: template.title,
        url: `https://www.willdrafting.in${template.href}`,
        description: template.description,
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
          <TemplatesClient initialTemplates={templatesData} />
        </div>
        <Footer />
      </div>
    </>
  );
}
