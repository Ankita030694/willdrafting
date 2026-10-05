import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_ARTICLES, getArticleBySlug, getRelatedArticles } from "@/data/blogs";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  BLOG_ARTICLES.forEach((article) => {
    params.push({ slug: article.slug });
    if (article.aliases) {
      article.aliases.forEach((alias) => {
        params.push({ slug: alias });
      });
    }
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const metaDesc =
    article.lead.length > 155
      ? `${article.lead.slice(0, 152)}...`
      : article.lead;

  const canonicalUrl = `https://www.willdrafting.in/blogs/${article.slug}`;
  const imageUrl = article.imageSrc.startsWith("http")
    ? article.imageSrc
    : `https://www.willdrafting.in${article.imageSrc.startsWith("/") ? "" : "/"}${article.imageSrc}`;

  return {
    title: article.title,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | WillDrafting.in`,
      description: metaDesc,
      url: canonicalUrl,
      siteName: "WillDrafting.in",
      locale: "en_IN",
      type: "article",
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | WillDrafting.in`,
      description: metaDesc,
      images: [imageUrl],
    },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonicalUrl = `https://www.willdrafting.in/blogs/${article.slug}`;
  const imageUrl = article.imageSrc.startsWith("http")
    ? article.imageSrc
    : `https://www.willdrafting.in${article.imageSrc.startsWith("/") ? "" : "/"}${article.imageSrc}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        "headline": article.title,
        "description": article.lead,
        "image": imageUrl,
        "datePublished": new Date(article.date).toISOString(),
        "dateModified": new Date(article.date).toISOString(),
        "mainEntityOfPage": canonicalUrl,
        "author": {
          "@type": "Person",
          "name": article.author,
          "jobTitle": article.authorRole,
        },
        "publisher": {
          "@id": "https://www.willdrafting.in/#organization",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": canonicalUrl,
          },
        ],
      },
    ],
  };

  const relatedArticles = getRelatedArticles(article.slug, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />

      {/* =========================================================================
          HERO SECTION: End-to-end from top below navbar with increased height
          ========================================================================= */}
      <div className="w-full px-3 sm:px-6 lg:px-8 pt-[74px] sm:pt-[78px] lg:pt-[82px] pb-4 sm:pb-6">
        <section className="relative w-full max-w-[1580px] mx-auto overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#172228]/10 bg-[#FAF7F0] px-6 sm:px-10 lg:px-14 pt-5 sm:pt-7 lg:pt-8 pb-6 sm:pb-8 lg:pb-10 min-h-[400px] sm:min-h-[450px] lg:min-h-[480px] flex flex-col justify-between shadow-xs">
          {/* Faded Background Hero Image with Increased Height */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            <Image
              src={article.imageSrc}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-[0.25] saturate-[0.9] contrast-[1.05]"
            />
            {/* Soft ambient tint to keep typography crisp while letting the illustration shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0]/90 via-[#FAF7F0]/70 to-[#FAF7F0]/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0]/60 via-transparent to-[#FAF7F0]/80" />
          </div>

          <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
            {/* Top Back Row with horizontal dividing rule matching screenshot */}
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#6B7280] hover:text-[#172228] transition-colors group shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#6B7280] group-hover:text-[#C65378]" />
                <span>BACK TO THE JOURNAL</span>
              </Link>
              <div className="h-[1px] bg-[#172228]/10 flex-1" />
            </div>

            {/* Hero Grid: Left Heading & Lead, Right Metadata Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Title & Excerpt */}
              <div className="lg:col-span-8 xl:col-span-8">
                <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-medium leading-[1.14] tracking-[-0.025em] text-[#111827] mb-6">
                  {article.title}
                </h1>

                <p className="text-base sm:text-lg lg:text-[1.15rem] leading-[1.65] text-[#49585F] font-normal max-w-2xl">
                  {article.lead}
                </p>
              </div>

              {/* Right Column: Metadata Table matching reference screenshot */}
              <div className="lg:col-span-4 xl:col-span-4 border-t border-[#172228]/10 lg:border-t-0 pt-6 lg:pt-0">
                <div className="space-y-0 text-sm">
                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      FILED UNDER
                    </span>
                    <span className="text-[#111827] font-medium text-right text-sm">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      PUBLISHED
                    </span>
                    <span className="text-[#111827] font-medium text-right text-sm">
                      {article.date}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      READING TIME
                    </span>
                    <span className="text-[#111827] font-medium text-right text-sm">
                      {article.readTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      WRITTEN BY
                    </span>
                    <div className="text-right">
                      <span className="text-[#111827] font-medium text-sm block">
                        {article.author}
                      </span>
                      <span className="text-xs text-[#718096]">
                        {article.authorRole}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        {/* =========================================================================
            EDITORIAL TWO-COLUMN LAYOUT
            Left: "The Short Version" Box, Sticky Consultation CTA Card
            Right: Main Article Editorial Content
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-[#172228]/10 pb-20 mb-20">
          {/* ---------------------------------------------------------------------
              LEFT COLUMN: SIDEBAR (Sticky on Desktop)
              --------------------------------------------------------------------- */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8 order-2 lg:order-1">

            {/* "The Short Version" Summary Box */}
            <div className="bg-[#F4EFE6] border border-[#172228]/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h2 className="text-[15px] font-semibold tracking-wide text-[#111827] uppercase mb-4">
                The short version
              </h2>
              <ul className="space-y-3.5">
                {article.shortVersion.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#374151]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sticky Consultation CTA Card */}
            <div className="bg-white border border-[#172228]/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-1.5 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-semibold text-[#172228] ml-1.5">
                  4.9
                </span>
                <span className="text-xs text-[#6B7280]">
                  (212+ verified reviews)
                </span>
              </div>

              <p className="text-[14.5px] leading-[1.65] text-[#49585F] mb-5">
                If any of this touches your estate, Will, or legal situation, our initial legal review is completely confidential and free.
              </p>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#172228] text-white hover:bg-[#C65378] font-medium text-sm py-3 px-5 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md group"
              >
                <span>Tell us what happened</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </aside>

          {/* ---------------------------------------------------------------------
              RIGHT COLUMN: MAIN ARTICLE EDITORIAL CONTENT
              --------------------------------------------------------------------- */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-10 sm:space-y-12">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-5">
                {/* Section Subhead (Plus Jakarta Sans) */}
                <h2 className="text-2xl sm:text-[1.85rem] font-medium leading-[1.28] tracking-[-0.02em] text-[#111827]">
                  {section.heading}
                </h2>

                {/* Section Paragraphs */}
                <div className="space-y-4 text-[16.5px] sm:text-[17px] leading-[1.8] text-[#374151] font-normal">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Optional Callout / Pull Quote */}
                {section.calloutQuote && (
                  <blockquote className="my-7 p-6 sm:p-7 rounded-xl bg-[#F4EFE6]/80 border-l-4 border-[#C65378] text-[#172228] text-[16.5px] sm:text-[17.5px] italic leading-[1.7]">
                    <p>&ldquo;{section.calloutQuote}&rdquo;</p>
                  </blockquote>
                )}
              </section>
            ))}

            {/* "What to do next" Action Steps Card */}
            <div className="bg-[#FAF7F0] border border-[#172228]/15 rounded-2xl p-7 sm:p-9 mt-12 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#111827] mb-5">
                What to do next
              </h2>
              <div className="space-y-4">
                {article.actionSteps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                    <p className="text-[15.5px] leading-relaxed text-[#374151]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer Box */}
            <div className="p-6 rounded-xl bg-neutral-100/70 border border-[#172228]/5 text-xs sm:text-[13px] leading-relaxed text-[#6B7280]">
              <span className="font-semibold text-[#374151]">Notice: </span>
              {article.disclaimer}
            </div>
          </article>
        </div>

        {/* =========================================================================
            BOTTOM SECTION: MORE FROM THE JOURNAL / RELATED ARTICLES
            ========================================================================= */}
        <section className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#C65378] block mb-2">
                Continue Reading
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#111827]">
                More from the journal
              </h2>
            </div>

            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#172228] hover:text-[#C65378] transition-colors group"
            >
              <span>All notes</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {relatedArticles.map((rel) => (
              <article
                key={rel.id}
                className="flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <Link href={`/blogs/${rel.slug}`} className="block">
                    {/* Image Banner */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-neutral-200 border border-[#172228]/5 shadow-xs">
                      <Image
                        src={rel.imageSrc}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </Link>

                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-3">
                    <span>{rel.category}</span>
                    <span>{rel.readTime}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-[1.2rem] sm:text-[1.3rem] font-medium leading-[1.3] text-[#111827] mb-3 group-hover:text-[#C65378] transition-colors">
                    <Link href={`/blogs/${rel.slug}`}>
                      {rel.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                    {rel.lead}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-4 border-t border-[#172228]/10 mt-auto">
                  <span className="text-[13px] text-[#718096] font-normal">
                    {rel.date}
                  </span>

                  <Link
                    href={`/blogs/${rel.slug}`}
                    className="w-9 h-9 rounded-full border border-neutral-300/80 bg-white flex items-center justify-center text-[#172228] group-hover:bg-[#C65378] group-hover:text-white group-hover:border-[#C65378] transition-all shadow-xs"
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
