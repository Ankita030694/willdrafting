"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowUpRight,
  FileText,
  Calendar,
  Scale,
  FolderArchive,
  Compass,
  Sparkles,
} from "lucide-react";
import {
  SitemapPageItem,
  formatDateForDisplay,
  getCategories,
} from "@/data/sitemapData";

interface SitemapClientProps {
  initialLinks: SitemapPageItem[];
}

export default function SitemapClient({ initialLinks }: SitemapClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return getCategories(initialLinks);
  }, [initialLinks]);

  const filteredLinks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialLinks.filter((link) => {
      const matchesCategory =
        activeCategory === "All" ||
        link.category?.toLowerCase() === activeCategory.toLowerCase();

      if (!matchesCategory) return false;
      if (!q) return true;

      const titleMatch = link.title.toLowerCase().includes(q);
      const hrefMatch = link.href.toLowerCase().includes(q);
      const catMatch = link.category?.toLowerCase().includes(q);

      return titleMatch || hrefMatch || catMatch;
    });
  }, [searchQuery, activeCategory, initialLinks]);

  const getCategoryBadgeStyle = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "services":
        return "bg-[#5F7E75]/10 text-[#3d5951] border-[#5F7E75]/25";
      case "templates":
        return "bg-[#C65378]/10 text-[#C65378] border-[#C65378]/25";
      case "tools":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "guides":
        return "bg-amber-50 text-amber-800 border-amber-200/80";
      case "company":
        return "bg-[#172228]/5 text-[#172228] border-[#172228]/15";
      default:
        return "bg-[#FAF7F0] text-[#49585F] border-[#172228]/10";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* Subtle decorative background ambient glows matching Hero.tsx and whole WillDrafting theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C65378]/[0.05] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-72 -left-20 w-80 h-80 rounded-full bg-[#5F7E75]/[0.05] blur-3xl"
      />

      {/* Hero Header Section */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C65378]/25 text-[0.75rem] font-bold tracking-[0.14em] uppercase text-[#C65378] mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C65378] animate-pulse" />
            <span>{initialLinks.length} Legal Pages &amp; Guides</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4">
            WillDrafting Sitemap &amp; <span className="font-bold text-[#C65378]">Legal Directory</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-[0.98rem] sm:text-[1.08rem] leading-[1.65] text-[#49585F] font-normal">
            Browse our full list of online Will services, state law guides, free Will formats, and free legal tools. Pick a tab below or type a word to find the exact page you need.
          </p>

          {/* Search Bar in Hero */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)] rounded-2xl overflow-hidden bg-white border border-[#172228]/12 focus-within:border-[#C65378] focus-within:ring-3 focus-within:ring-[#C65378]/15 transition-all">
              <div className="pl-4 pr-2 text-[#49585F] flex items-center justify-center">
                <Search className="w-5 h-5 text-[#55636D]" />
              </div>
              <input
                id="sitemap-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, word, or city (e.g. NRI will, probate, Delhi)..."
                className="w-full py-4 pr-10 text-sm sm:text-base text-[#172228] bg-transparent placeholder-[#8A969E] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="pr-4 text-[#55636D] hover:text-[#172228] transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-lg sm:text-xl font-semibold text-[#172228] mb-2">
          All WillDrafting Pages, Tools &amp; State Guides
        </h2>
        <p className="text-xs sm:text-sm text-[#49585F] mb-5 leading-relaxed">
          Each card links straight to a free tool, Will format, state guide, or legal service. Click any card to open the page.
        </p>
        {/* Category Filter Pills & Results Counter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#172228]/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#172228] text-white shadow-xs"
                      : "bg-white text-[#49585F] hover:bg-[#F4EFE6] hover:text-[#172228] border border-[#172228]/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Counter */}
          <div className="text-xs sm:text-sm text-[#49585F] font-medium flex items-center gap-1.5 self-end md:self-auto">
            <Compass className="w-4 h-4 text-[#C65378]" />
            <span>
              Showing <strong className="text-[#172228]">{filteredLinks.length}</strong> of{" "}
              {initialLinks.length} pages
            </span>
          </div>
        </div>

        {/* Card Grid / Empty State */}
        {filteredLinks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#172228]/10 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAF7F0] flex items-center justify-center text-[#55636D]">
              <FolderArchive className="w-8 h-8 text-[#55636D]" />
            </div>
            <h3 className="text-xl font-bold text-[#172228] mb-2">
              No matching pages found
            </h3>
            <p className="text-sm text-[#49585F] mb-6 leading-relaxed">
              We couldn&apos;t find any pages matching &quot;{searchQuery}&quot; in{" "}
              {activeCategory === "All" ? "all categories" : activeCategory}. Try a
              different keyword or clear your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65378] text-white text-sm font-semibold hover:bg-[#a13c5d] transition-colors shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredLinks.map((link, index) => {
              const displayDate = formatDateForDisplay(link.date);
              return (
                <Link
                  key={`${link.href}-${index}`}
                  href={link.href}
                  className="group relative bg-white border border-[#172228]/[0.08] hover:border-[#C65378]/50 rounded-2xl p-5 shadow-[0_2px_8px_rgba(23,34,40,0.03)] hover:shadow-[0_8px_24px_rgba(23,34,40,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Meta Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${getCategoryBadgeStyle(
                          link.category
                        )}`}
                      >
                        {link.category || "General"}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7F0] group-hover:bg-[#C65378]/10 text-[#55636D] group-hover:text-[#C65378] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Page Title */}
                    <h3 className="text-[15px] font-semibold text-[#172228] group-hover:text-[#C65378] transition-colors leading-snug line-clamp-3 mb-2">
                      {link.title}
                    </h3>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 mt-3 border-t border-[#172228]/[0.06] flex items-center justify-between text-[11px] text-[#55636D] font-medium">
                    <span className="text-[11px] text-[#8A969E] group-hover:text-[#55636D] font-semibold">
                      Read Page
                    </span>
                    {displayDate && (
                      <span className="flex items-center gap-1 text-[#8A969E]">
                        <Calendar className="w-3 h-3" />
                        {displayDate}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom Trust & Legal Context Card */}
        <section className="mt-16 bg-white rounded-3xl border border-[#172228]/[0.08] p-8 sm:p-10 shadow-[0_4px_20px_-4px_rgba(23,34,40,0.04)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5F7E75]/10 text-[#3d5951] flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-[#5F7E75]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Valid Under Law
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Each Will format and guide follows the Indian Succession Act, 1925. All forms meet the two-witness signing rule in Section 63.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#C65378]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Live Page Index
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  All links on this page stay in sync with our search map. New guides, tools, and state pages show up here first.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#172228]/5 text-[#172228] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#172228]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Checked by Lawyers
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Each draft and guide is checked by our legal team at AMA Legal Solutions so your family plan stays safe in every Indian state.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
