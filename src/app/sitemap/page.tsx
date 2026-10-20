import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SitemapClient from "./SitemapClient";
import { getAllSitemapLinks } from "@/data/sitemapData";

// Strict SEO compliance: Title 50–60 chars, Meta Description 140–155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: "WillDrafting Sitemap: Complete Legal Directory Index", // exactly 52 characters
  description:
    "Explore WillDrafting's complete legal directory of online Will drafting services, statutory succession guides, legal templates, and succession tools.", // exactly 149 characters
  alternates: {
    canonical: "https://www.willdrafting.in/sitemap",
  },
  openGraph: {
    title: "WillDrafting Sitemap: Complete Legal Directory Index",
    description:
      "Explore WillDrafting's complete legal directory of online Will drafting services, statutory succession guides, legal templates, and succession tools.",
    url: "https://www.willdrafting.in/sitemap",
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WillDrafting Sitemap: Complete Legal Directory Index",
    description:
      "Explore WillDrafting's complete legal directory of online Will drafting services, statutory succession guides, legal templates, and succession tools.",
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

export default function SitemapPage() {
  const allLinks = getAllSitemapLinks();

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
        name: "Sitemap",
        item: "https://www.willdrafting.in/sitemap",
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WillDrafting Legal Directory & Sitemap",
    description:
      "Complete index of online Will drafting services, statutory Indian succession guides, and legal templates.",
    url: "https://www.willdrafting.in/sitemap",
    isPartOf: {
      "@type": "WebSite",
      name: "WillDrafting",
      url: "https://www.willdrafting.in",
    },
    about: {
      "@type": "Thing",
      name: "Will Drafting & Succession Law in India",
    },
    numberOfItems: allLinks.length,
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
          <SitemapClient initialLinks={allLinks} />
        </div>
        <Footer />
      </div>
    </>
  );
}
