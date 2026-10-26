import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  ShieldCheck,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_ARTICLES, getArticleBySlug, getRelatedArticles } from "@/data/blogs";
import { blogsCol } from "@/lib/db/collections";
import type { BlogDoc } from "@/lib/db/types";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* Hardcoded generateStaticParams commented out — blogs are rendered from MongoDB:
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
*/

async function findMongoBlogBySlug(slug: string): Promise<BlogDoc | null> {
  try {
    const col = await blogsCol();
    const normalized = slug.toLowerCase().trim();
    const doc = await col.findOne({
      $or: [{ slug: normalized }, { aliases: normalized } as any],
    });
    return doc || null;
  } catch {
    return null;
  }
}

async function findRelatedMongoBlogs(currentSlug: string, count = 3) {
  try {
    const col = await blogsCol();
    const docs = await col
      .find({ slug: { $ne: currentSlug.toLowerCase().trim() }, status: "PUBLISHED" })
      .sort({ createdAt: -1 })
      .limit(count)
      .toArray();
    return docs.map((d) => ({
      id: d._id.toString(),
      slug: d.slug,
      title: d.title,
      lead: d.subtitle || d.metaDescription || "",
      category: d.category || "Indian Succession Law",
      readTime: d.readTime || d.readingTime || "10 min",
      date: d.date || "2026-10-21",
      imageSrc: d.image || "/desktopusp.jpg",
    }));
  } catch {
    return [];
  }
}

function processHtmlAndExtractToc(rawHtml: string): {
  processedHtml: string;
  toc: Array<{ id: string; text: string }>;
} {
  if (!rawHtml) return { processedHtml: "", toc: [] };

  const toc: Array<{ id: string; text: string }> = [];
  let idx = 0;

  let html = rawHtml.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_full, attrs, inner) => {
    const plain = inner.replace(/<[^>]*>/g, "").trim();
    const id =
      plain
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `section-${++idx}`;
    if (plain && !/popular searches/i.test(plain)) {
      toc.push({ id, text: plain });
    }
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });

  // Transform Popular Searches list into pill tags
  html = html.replace(
    /<h3>\s*Popular Searches\s*<\/h3>\s*<ul>([\s\S]*?)<\/ul>/gi,
    (_m, listInner) => {
      return `<div class="wd-popular-searches-box"><h3>Popular Searches</h3><ul class="wd-popular-searches-pills">${listInner}</ul></div>`;
    }
  );

  // Wrap tables in responsive container
  html = html.replace(/<table([\s\S]*?)<\/table>/gi, '<div class="wd-blog-table-wrap"><table$1</table></div>');

  return { processedHtml: html, toc };
}

function splitHtmlForInfographic(html: string): [string, string] {
  const h2Matches = Array.from(html.matchAll(/<h2\b[^>]*>/gi));
  if (h2Matches.length >= 2) {
    const mid = Math.floor(h2Matches.length / 2);
    const splitIndex = h2Matches[mid].index ?? -1;
    if (splitIndex > 0) {
      return [html.slice(0, splitIndex), html.slice(splitIndex)];
    }
  }
  const pMatches = Array.from(html.matchAll(/<\/p>/gi));
  if (pMatches.length >= 4) {
    const mid = Math.floor(pMatches.length / 2);
    const splitIndex = (pMatches[mid].index ?? 0) + 4;
    return [html.slice(0, splitIndex), html.slice(splitIndex)];
  }
  return [html, ""];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbBlog = await findMongoBlogBySlug(slug);

  if (dbBlog) {
    const canonicalUrl = `https://www.willdrafting.in/blogs/${dbBlog.slug}`;
    const imageUrl = dbBlog.image?.startsWith("http")
      ? dbBlog.image
      : `https://www.willdrafting.in${dbBlog.image?.startsWith("/") ? "" : "/"}${dbBlog.image || "desktopusp.jpg"}`;

    return {
      title: {
        absolute: dbBlog.metaTitle || dbBlog.title,
      },
      description: dbBlog.metaDescription || dbBlog.subtitle,
      keywords: dbBlog.keywords || [],
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: dbBlog.metaTitle || dbBlog.title,
        description: dbBlog.metaDescription || dbBlog.subtitle,
        url: canonicalUrl,
        siteName: "WillDrafting.in",
        locale: "en_IN",
        type: "article",
        publishedTime: new Date(dbBlog.date || dbBlog.createdAt).toISOString(),
        authors: [dbBlog.author || "Advocate Anuj Anand Malik"],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: dbBlog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: dbBlog.metaTitle || dbBlog.title,
        description: dbBlog.metaDescription || dbBlog.subtitle,
        images: [imageUrl],
      },
    };
  }

  return {
    title: "Article Not Found",
    robots: { index: false, follow: false },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const dbBlog = await findMongoBlogBySlug(slug);
  // Hardcoded fallback commented out — all blogs are rendered from MongoDB:
  // const staticArticle = !dbBlog ? getArticleBySlug(slug) : undefined;
  const staticArticle = undefined as ReturnType<typeof getArticleBySlug>;

  if (!dbBlog && !staticArticle) {
    notFound();
  }

  const title = dbBlog ? dbBlog.title : staticArticle!.title;
  const lead = dbBlog ? dbBlog.subtitle : staticArticle!.lead;
  const category = dbBlog ? dbBlog.category : staticArticle!.category;
  const dateStr = dbBlog ? dbBlog.date : staticArticle!.date;
  const readTime = dbBlog ? dbBlog.readTime || dbBlog.readingTime || "10 min" : staticArticle!.readTime;
  const author = dbBlog ? dbBlog.author || "Advocate Anuj Anand Malik" : staticArticle!.author;
  const authorRole = dbBlog
    ? dbBlog.authorRole || "Senior Succession & Trust Counsel, WillDrafting.in"
    : staticArticle!.authorRole.replace(/WillDrafting.in/gi, "WillDrafting.in");
  const imageSrc = dbBlog ? dbBlog.image || "/desktopusp.jpg" : staticArticle!.imageSrc;
  const infographicSrc = dbBlog?.infographic || null;
  const canonicalSlug = dbBlog ? dbBlog.slug : staticArticle!.slug;
  const metaDescription = dbBlog ? dbBlog.metaDescription || dbBlog.subtitle : staticArticle!.metaDescription;
  const keywords = dbBlog ? dbBlog.keywords || [] : staticArticle!.keywords;
  const shortVersion = dbBlog ? dbBlog.shortVersion || [] : staticArticle!.shortVersion;
  const actionSteps = dbBlog ? dbBlog.actionSteps || [] : staticArticle!.actionSteps;
  const faqs = dbBlog ? dbBlog.faqs || [] : staticArticle!.faqs || [];
  const rawReviews = dbBlog ? dbBlog.reviews || [] : [];
  const reviews = rawReviews
    .map((r: any) => ({
      name: String(r?.name || "")
        .replace(/\s*\((?:illustrative|sample|fictional).*?\)/gi, "")
        .trim(),
      location: r?.location ? String(r.location).trim() : undefined,
      rating: Number(r?.rating) || 5,
      review: String(r?.review || r?.comment || r?.text || "")
        .replace(
          /^(?:\[?(?:Illustrative|Sample|Fictional|Example|Hypothetical)[^:\]]*[:\]]\s*)+/i,
          ""
        )
        .trim(),
    }))
    .filter((r) => r.name && r.review.length > 0);
  const references = dbBlog ? dbBlog.references || [] : [];
  const disclaimer = (
    dbBlog?.disclaimer ||
    staticArticle?.disclaimer ||
    "This legal guide is published for educational and estate planning awareness under the Indian Succession Act, 1925. For customized estate planning, consult an advocate on WillDrafting.in."
  ).replace(/WillDrafting.in/gi, "WillDrafting.in");

  const canonicalUrl = `https://www.willdrafting.in/blogs/${canonicalSlug}`;
  const imageUrl = imageSrc.startsWith("http")
    ? imageSrc
    : `https://www.willdrafting.in${imageSrc.startsWith("/") ? "" : "/"}${imageSrc}`;

  const schemaGraph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      isPartOf: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      headline: title,
      description: metaDescription,
      keywords: keywords.join(", "),
      image: imageUrl,
      datePublished: new Date(dateStr || Date.now()).toISOString(),
      dateModified: new Date(dbBlog?.updatedAt || dateStr || Date.now()).toISOString(),
      mainEntityOfPage: canonicalUrl,
      author: {
        "@type": "Person",
        name: author,
        jobTitle: authorRole,
        url: "https://www.linkedin.com/in/iamanujmalik/",
        sameAs: ["https://www.linkedin.com/in/iamanujmalik/"],
      },
      reviewedBy: {
        "@type": "LegalService",
        name: "WillDrafting.in Estate Planning Counsel",
        url: "https://www.willdrafting.in",
      },
      publisher: {
        "@id": "https://www.willdrafting.in/#organization",
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
          name: "Blogs & Insights",
          item: "https://www.willdrafting.in/blogs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: canonicalUrl,
        },
      ],
    },
  ];

  if (faqs.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  // const relatedArticles = getRelatedArticles(canonicalSlug, 3);
  const relatedArticles = await findRelatedMongoBlogs(canonicalSlug, 3);

  const { processedHtml, toc } = dbBlog
    ? processHtmlAndExtractToc(dbBlog.description || dbBlog.content || "")
    : { processedHtml: "", toc: [] };

  const [firstHalfHtml, secondHalfHtml] = dbBlog
    ? splitHtmlForInfographic(processedHtml)
    : ["", ""];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <div className="w-full px-3 sm:px-6 lg:px-8 pt-[74px] sm:pt-[78px] lg:pt-[82px] pb-4 sm:pb-6">
        <section className="relative w-full max-w-[1580px] mx-auto overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#172228]/10 bg-[#FAF7F0] px-6 sm:px-10 lg:px-14 pt-5 sm:pt-7 lg:pt-8 pb-6 sm:pb-8 lg:pb-10 min-h-[400px] sm:min-h-[450px] lg:min-h-[480px] flex flex-col justify-between shadow-xs">
          <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              unoptimized={imageSrc.startsWith("/api/")}
              sizes="100vw"
              className="object-cover object-center opacity-[0.25] saturate-[0.9] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0]/90 via-[#FAF7F0]/70 to-[#FAF7F0]/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0]/60 via-transparent to-[#FAF7F0]/80" />
          </div>

          <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-8 xl:col-span-8">
                <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-medium leading-[1.14] tracking-[-0.025em] text-[#111827] mb-6">
                  {title}
                </h1>

                <p className="text-base sm:text-lg lg:text-[1.15rem] leading-[1.65] text-[#49585F] font-normal max-w-2xl">
                  {lead}
                </p>
              </div>

              <div className="lg:col-span-4 xl:col-span-4 border-t border-[#172228]/10 lg:border-t-0 pt-6 lg:pt-0">
                <div className="space-y-0 text-sm">
                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      FILED UNDER
                    </span>
                    <span className="text-[#111827] font-medium text-right text-sm">
                      {category}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      PUBLISHED
                    </span>
                    <span className="text-[#111827] font-medium text-right text-sm">
                      {dateStr}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      READING TIME
                    </span>
                    <span className="text-[#111827] font-medium text-right text-sm">
                      {readTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[#172228]/10">
                    <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.16em]">
                      WRITTEN BY
                    </span>
                    <div className="text-right">
                      <a
                        href="https://www.linkedin.com/in/iamanujmalik/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#111827] hover:text-[#C65378] transition-colors font-medium text-sm block"
                      >
                        {author}
                      </a>
                      <span className="text-xs text-[#718096] block">
                        {authorRole}
                      </span>
                      <a
                        href="https://www.linkedin.com/in/iamanujmalik/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#0077b5] hover:underline inline-block mt-0.5"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-[#172228]/10 pb-20 mb-20">
          {/* LEFT COLUMN: STICKY SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8 order-2 lg:order-1">
            {shortVersion.length > 0 && (
              <div className="bg-[#F4EFE6] border border-[#172228]/10 rounded-2xl p-6 sm:p-7 shadow-xs">
                <h2 className="text-[15px] font-semibold tracking-wide text-[#111827] uppercase mb-4">
                  The short version
                </h2>
                <ul className="space-y-3.5">
                  {shortVersion.map((point, idx) => (
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
            )}

            {toc.length > 0 && (
              <div className="bg-white border border-[#172228]/10 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-3.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>In This Guide</span>
                </div>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-[13.5px] leading-snug text-[#49585F] hover:text-[#C65378] transition-colors py-1"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

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
                Draft a legally valid Indian Will reviewed by WillDrafting.in estate planning advocates, compliant with Section 63, Hindu Succession Act, and Shariat rules.
              </p>

              <div className="space-y-2.5">
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#172228] text-white hover:bg-[#C65378] font-medium text-sm py-3 px-5 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md group"
                >
                  <span>Start Your Indian Will</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF7F0] text-[#172228] border border-[#172228]/15 hover:border-[#C65378] font-medium text-xs py-2.5 px-4 rounded-xl transition-colors"
                >
                  <span>Speak to an Estate Advocate</span>
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-[#172228]/10 space-y-2.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B7280] block">
                  Explore Services &amp; Tools
                </span>
                <Link
                  href="/services"
                  className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1 transition-colors"
                >
                  <span>Online Will Drafting Services India</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/services/nri-will-india"
                  className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1 transition-colors"
                >
                  <span>NRI &amp; OCI Indian Will Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1 transition-colors"
                >
                  <span>Free Indian Succession Calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1 transition-colors"
                >
                  <span>Transparent Fixed-Fee Pricing (₹2,490+)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: MAIN ARTICLE EDITORIAL CONTENT */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-10 sm:space-y-12">
            {dbBlog ? (
              <div className="wd-dynamic-article-body space-y-8">
                <div
                  className="wd-article-html"
                  dangerouslySetInnerHTML={{ __html: firstHalfHtml }}
                />

                {/* Mid-Article Topic Infographic Card (Base64 served from MongoDB) */}
                {infographicSrc && (
                  <figure className="my-10 rounded-2xl border border-[#172228]/12 bg-white p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378]">
                        Visual Statutory Guide &amp; Summary
                      </span>
                      <span className="text-xs text-[#6B7280]">WillDrafting.in Legal Infographic</span>
                    </div>
                    <div className="relative w-full overflow-hidden rounded-xl bg-[#FAF7F0] border border-[#172228]/8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={infographicSrc}
                        alt={`${title} - Statutory Infographic`}
                        className="w-full h-auto object-contain mx-auto max-h-[680px]"
                      />
                    </div>
                  </figure>
                )}

                {secondHalfHtml && (
                  <div
                    className="wd-article-html"
                    dangerouslySetInnerHTML={{ __html: secondHalfHtml }}
                  />
                )}
              </div>
            ) : (
              <>
                {staticArticle!.sections.map((section, idx) => (
                  <section key={idx} className="space-y-5">
                    <h2 className="text-2xl sm:text-[1.85rem] font-medium leading-[1.28] tracking-[-0.02em] text-[#111827]">
                      {section.heading}
                    </h2>

                    <div className="space-y-4 text-[16.5px] sm:text-[17px] leading-[1.8] text-[#374151] font-normal">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {section.calloutQuote && (
                      <blockquote className="my-7 p-6 sm:p-7 rounded-xl bg-[#F4EFE6]/80 border-l-4 border-[#C65378] text-[#172228] text-[16.5px] sm:text-[17.5px] italic leading-[1.7]">
                        <p>&ldquo;{section.calloutQuote}&rdquo;</p>
                      </blockquote>
                    )}
                  </section>
                ))}

                {staticArticle!.tableData && (
                  <section className="space-y-4 pt-2">
                    <h2 className="text-2xl sm:text-[1.75rem] font-medium leading-[1.28] tracking-[-0.02em] text-[#111827]">
                      {staticArticle!.tableData.heading}
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      {staticArticle!.tableData.caption}
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-[#172228]/15 bg-white shadow-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#172228] text-white text-xs uppercase tracking-[0.12em]">
                            {staticArticle!.tableData.headers.map((header, hIdx) => (
                              <th
                                key={hIdx}
                                className="py-4 px-5 font-semibold border-r border-white/10 last:border-r-0"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#172228]/10 text-[14.5px] leading-relaxed text-[#374151]">
                          {staticArticle!.tableData.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx % 2 === 1 ? "bg-[#FAF7F0]/70" : "bg-white"}
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`py-4 px-5 align-top border-r border-[#172228]/10 last:border-r-0 ${
                                    cIdx === 0 ? "font-semibold text-[#111827]" : ""
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {staticArticle!.templateBox && (
                  <section className="rounded-2xl border-2 border-[#C65378]/30 bg-white p-6 sm:p-8 shadow-xs space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-6 h-6 text-[#C65378] shrink-0 mt-1" />
                      <div>
                        <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#111827]">
                          {staticArticle!.templateBox.heading}
                        </h2>
                        <p className="text-sm text-[#6B7280] mt-1">
                          {staticArticle!.templateBox.subtitle}
                        </p>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-[#172228] bg-[#FAF7F0] border border-[#172228]/15 rounded-xl p-5 sm:p-6 overflow-x-auto">
                      {staticArticle!.templateBox.content}
                    </pre>
                  </section>
                )}
              </>
            )}

            {/* "What to do next" Action Steps Card */}
            {actionSteps.length > 0 && (
              <div className="bg-[#FAF7F0] border border-[#172228]/15 rounded-2xl p-7 sm:p-9 mt-12 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#111827] mb-5">
                  What to do next
                </h2>
                <div className="space-y-4">
                  {actionSteps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                      <p className="text-[15.5px] leading-relaxed text-[#374151]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Statutory Questions */}
            {faqs.length > 0 && (
              <section className="space-y-5 pt-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#C65378]" />
                  <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight text-[#111827]">
                    Frequently Asked Statutory Questions
                  </h2>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-2xl border border-[#172228]/10 bg-white p-6 shadow-xs"
                    >
                      <h3 className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-[15px] sm:text-[15.5px] leading-[1.75] text-[#49585F]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Client Reviews (if present) */}
            {reviews.length > 0 && (
              <section className="space-y-5 pt-4">
                <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight text-[#111827]">
                  Verified WillDrafting.in Client Experiences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {reviews.map((rev, rIdx) => (
                    <div
                      key={rIdx}
                      className="rounded-2xl border border-[#172228]/10 bg-white p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-3">
                          {[...Array(rev.rating || 5)].map((_, s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-[#374151] mb-4">
                          &ldquo;{rev.review}&rdquo;
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-[#111827] pt-3 border-t border-[#172228]/8">
                        {rev.name}
                        {rev.location ? (
                          <span className="text-[#6B7280] font-normal"> · {rev.location}</span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Statutory References (if present) */}
            {references.length > 0 && (
              <section className="rounded-2xl border border-[#172228]/10 bg-white p-6 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#172228]">
                  Statutory &amp; Judicial References
                </h3>
                <ul className="space-y-2 text-sm">
                  {references.map((ref, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#49585F]">
                      <ExternalLink className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                      {ref.url ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#C65378] underline"
                        >
                          {ref.title}
                        </a>
                      ) : (
                        <span>{ref.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Legal Disclaimer Box */}
            <div className="p-6 rounded-xl bg-neutral-100/70 border border-[#172228]/5 text-xs sm:text-[13px] leading-relaxed text-[#6B7280]">
              <span className="font-semibold text-[#374151]">Notice: </span>
              {disclaimer}
            </div>
          </article>
        </div>

        {/* BOTTOM SECTION: MORE FROM THE JOURNAL */}
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

                  <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-3">
                    <span>{rel.category}</span>
                    <span>{rel.readTime}</span>
                  </div>

                  <h3 className="text-[1.2rem] sm:text-[1.3rem] font-medium leading-[1.3] text-[#111827] mb-3 group-hover:text-[#C65378] transition-colors">
                    <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                  </h3>

                  <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                    {rel.lead}
                  </p>
                </div>

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

      <style>{`
        .wd-article-html h1 {
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.22;
          color: #111827;
          margin-top: 2.2rem;
          margin-bottom: 1rem;
        }
        .wd-article-html h2 {
          font-size: 1.75rem;
          font-weight: 500;
          line-height: 1.28;
          letter-spacing: -0.02em;
          color: #111827;
          margin-top: 2.4rem;
          margin-bottom: 1rem;
          scroll-margin-top: 7rem;
        }
        .wd-article-html h3 {
          font-size: 1.28rem;
          font-weight: 600;
          color: #172228;
          margin-top: 1.8rem;
          margin-bottom: 0.75rem;
        }
        .wd-article-html h4 {
          font-size: 1.12rem;
          font-weight: 600;
          color: #172228;
          margin-top: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .wd-article-html h5,
        .wd-article-html h6 {
          font-size: 1rem;
          font-weight: 600;
          color: #172228;
          margin-top: 1.1rem;
          margin-bottom: 0.4rem;
        }
        .wd-article-html p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 1.15rem;
        }
        .wd-article-html ul,
        .wd-article-html ol {
          margin: 0.85rem 0 1.35rem 0;
          padding-left: 1.75rem;
          color: #374151;
          line-height: 1.75;
          list-style-position: outside;
        }
        .wd-article-html ul:not(.wd-popular-searches-pills) {
          list-style-type: disc !important;
        }
        .wd-article-html ul:not(.wd-popular-searches-pills) ul {
          list-style-type: circle !important;
          margin-top: 0.35rem;
          margin-bottom: 0.35rem;
        }
        .wd-article-html ol {
          list-style-type: decimal !important;
        }
        .wd-article-html li {
          display: list-item;
          margin-bottom: 0.45rem;
          font-size: 1.03rem;
        }
        .wd-article-html li::marker {
          color: #172228;
          font-weight: 600;
        }
        .wd-article-html li > p {
          margin-bottom: 0.25rem;
        }
        .wd-article-html hr {
          border: none;
          border-top: 2px solid rgba(23, 34, 40, 0.12);
          margin: 1.75rem 0;
        }
        .wd-article-html pre {
          background-color: #172228;
          color: #FAF7F0;
          padding: 1.1rem 1.35rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.25rem 0;
          font-size: 0.88rem;
          line-height: 1.65;
        }
        .wd-article-html code {
          background-color: #F4EFE6;
          color: #172228;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9em;
        }
        .wd-article-html pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        .wd-article-html blockquote {
          margin: 1.75rem 0;
          padding: 1.35rem 1.6rem;
          border-radius: 0.85rem;
          background: rgba(244, 239, 230, 0.85);
          border-left: 4px solid #c65378;
          color: #172228;
          font-style: italic;
        }
        .wd-article-html a {
          color: #c65378;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .wd-blog-table-wrap {
          overflow-x: auto;
          border-radius: 1rem;
          border: 1px solid rgba(23, 34, 40, 0.15);
          background: #ffffff;
          margin: 1.75rem 0;
        }
        .wd-blog-table-wrap table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }
        .wd-blog-table-wrap th {
          background: #172228;
          color: #ffffff;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.9rem 1.1rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wd-blog-table-wrap td {
          padding: 0.9rem 1.1rem;
          border-top: 1px solid rgba(23, 34, 40, 0.1);
          border-right: 1px solid rgba(23, 34, 40, 0.08);
          color: #374151;
          vertical-align: top;
        }
        .wd-popular-searches-box {
          margin-top: 2.5rem;
          padding: 1.5rem;
          border-radius: 1rem;
          background: #f4efe6;
          border: 1px solid rgba(23, 34, 40, 0.1);
        }
        .wd-popular-searches-box h3 {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #172228;
          margin: 0 0 0.85rem 0;
        }
        .wd-popular-searches-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          margin: 0 !important;
          padding: 0;
        }
        .wd-popular-searches-pills li {
          background: #ffffff;
          border: 1px solid rgba(23, 34, 40, 0.12);
          border-radius: 999px;
          padding: 0.3rem 0.8rem;
          font-size: 0.78rem;
          color: #49585F;
          margin: 0 !important;
        }
      `}</style>

      <Footer />
    </div>
  );
}
