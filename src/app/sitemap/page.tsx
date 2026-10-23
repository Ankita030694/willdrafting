import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SitemapClient from "./SitemapClient";
import { getAllSitemapLinks, sanitizeHref, SitemapPageItem } from "@/data/sitemapData";
import { blogsCol } from "@/lib/db/collections";

export const dynamic = "force-dynamic";

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

export default async function SitemapPage() {
  const staticLinks = getAllSitemapLinks();
  const seenHrefs = new Set<string>();
  const allLinks: SitemapPageItem[] = [];

  // 1. Dynamically include all published blogs from MongoDB so /sitemap stays 100% synced with /sitemap.xml
  try {
    const col = await blogsCol();
    const dbBlogs = await col
      .find({ status: "PUBLISHED" }, { projection: { slug: 1, title: 1, date: 1, updatedAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    for (const b of dbBlogs) {
      if (!b.slug || !b.title) continue;
      const cleanHref = sanitizeHref(`/blogs/${b.slug}`);
      if (!seenHrefs.has(cleanHref)) {
        seenHrefs.add(cleanHref);
        allLinks.push({
          title: b.title,
          href: cleanHref,
          category: "Guides",
          date: b.date || new Date(b.updatedAt || Date.now()).toISOString().split("T")[0],
          changefreq: "weekly",
          priority: 0.9,
        });
      }
    }
  } catch (e) {
    console.warn("Could not query MongoDB blogs for /sitemap:", e);
  }

  // 2. Merge static SSOT routes without duplicates
  for (const item of staticLinks) {
    const cleanHref = sanitizeHref(item.href);
    if (!seenHrefs.has(cleanHref)) {
      seenHrefs.add(cleanHref);
      allLinks.push(item);
    }
  }

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
