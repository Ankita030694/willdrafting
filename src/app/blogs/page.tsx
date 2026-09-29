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
  title: "Blogs & Insights | WillDrafting.in — Clear Legal Answers",
  description:
    "Expert legal insights, estate planning strategies, and plain-language answers to Indian succession laws and Will drafting.",
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            CENTERED HERO HEADER: Pill, Heading, Subheading (Plus Jakarta Sans)
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Pill in Centre */}
          <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
            <span>Journal & Legal Insights</span>
          </div>

          {/* Main Heading in Centre (Plus Jakarta Sans) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
            Clear answers to complex legal questions.
          </h1>

          {/* Subheading in Centre */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#55636D] font-normal max-w-2xl mx-auto">
            Practical legal guidance on Indian succession laws, testamentary wills, estate protection, and family wealth governance.
          </p>
        </div>

        {/* =========================================================================
            CARDS GRID: 3-column layout matching reference screenshot
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image Banner */}
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

                {/* Category & Read Time Row */}
                <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-3">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Article Title */}
                <h2 className="text-[1.25rem] sm:text-[1.38rem] font-medium leading-[1.3] text-[#111827] mb-3 group-hover:text-[#C65378] transition-colors">
                  <Link href={`/blogs/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6">
                  {article.lead}
                </p>
              </div>

              {/* Bottom Row: Date & Arrow Button */}
              <div className="flex items-center justify-between pt-4 border-t border-[#172228]/10 mt-auto">
                <span className="text-[13px] text-[#718096] font-normal">
                  {article.date}
                </span>

                <Link
                  href={`/blogs/${article.slug}`}
                  className="w-9 h-9 rounded-full border border-neutral-300/80 bg-white flex items-center justify-center text-[#172228] group-hover:bg-[#C65378] group-hover:text-white group-hover:border-[#C65378] transition-all shadow-xs"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
}
