import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Legal Insights & Will Drafting Guides",
  description:
    "Practical guides on drafting online Wills in minutes, asset distribution, executor duties, witness rules, and registration under Indian succession law.",
  alternates: {
    canonical: "https://www.willdrafting.in/blogs",
  },
  openGraph: {
    title: "Legal Insights & Will Drafting Guides | WillDrafting.in",
    description:
      "Practical guides on drafting online Wills in minutes, asset distribution, executor duties, witness rules, and registration under Indian succession law.",
    url: "https://www.willdrafting.in/blogs",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "WillDrafting.in Legal Insights & Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Insights & Will Drafting Guides | WillDrafting.in",
    description:
      "Practical guides on drafting online Wills in minutes, asset distribution, executor duties, witness rules, and registration under Indian succession law.",
    images: ["/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const BLOGS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.willdrafting.in/blogs#webpage",
      "url": "https://www.willdrafting.in/blogs",
      "name": "Legal Insights & Will Drafting Guides | WillDrafting.in",
      "description":
        "Practical guides on drafting online Wills in minutes, asset distribution, executor duties, witness rules, and registration under Indian succession law.",
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/blogs#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/blogs#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blogs & Insights",
          "item": "https://www.willdrafting.in/blogs",
        },
      ],
    },
  ],
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOGS_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            CENTERED HERO HEADER
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
            <span>Journal & Legal Insights</span>
          </div>

          <h1 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
            Protect what you build. Prepare for what comes next.
          </h1>

          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#55636D] font-normal max-w-2xl mx-auto">
            Clear, practical guidance on <span className="font-bold">Will drafting, estate planning, succession law, inheritance, asset protection, and family wealth planning in India</span>, helping you make informed decisions and protect your family’s future.
          </p>
        </div>

        {/* =========================================================================
            CARDS GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <Link href={`/blogs/${article.slug}`} className="block">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-neutral-200 border border-[#172228]/5 shadow-xs">
                    <Image
                      src={article.imageSrc}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </Link>

                <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-3">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <Link href={`/blogs/${article.slug}`}>
                  <h2 className="text-xl sm:text-[1.35rem] font-medium leading-[1.25] text-[#111827] mb-3 group-hover:text-[#C65378] transition-colors duration-200">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-[#49585F] text-[15px] leading-[1.6] mb-6 line-clamp-3">
                  {article.lead}
                </p>
              </div>

              <div className="pt-4 border-t border-[#172228]/10 flex items-center justify-between mt-auto">
                <span className="text-xs text-[#55636D] font-medium">
                  {article.date}
                </span>

                <Link
                  href={`/blogs/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#111827] group-hover:text-[#C65378] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
