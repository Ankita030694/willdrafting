"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowUpRight,
  FileText,
  Layers,
  Sparkles,
  Calendar,
  Scale,
  FolderArchive,
  Compass,
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
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "templates":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "tools":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "guides":
        return "bg-amber-50 text-amber-800 border-amber-200/80";
      case "company":
        return "bg-slate-100 text-slate-700 border-slate-200/80";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200/80";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#172228] to-[#212F35] text-white overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{initialLinks.length} Curated Legal Pages &amp; Guides</span>
          </div>

          {/* H1 Heading (38 chars - strictly 30-65 chars, 0 em-dashes) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-xs">
            WillDrafting Sitemap &amp; Legal Directory
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal">
            Explore our complete index of online Will drafting services, Indian
            succession law guides, printable templates, and statutory calculators.
          </p>

          {/* Search Bar in Hero */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm border border-white/20 focus-within:ring-3 focus-within:ring-[#C65378]/50 transition-all">
              <div className="pl-4 pr-2 text-slate-400 flex items-center justify-center">
                <Search className="w-5 h-5 text-slate-500" />
              </div>
              <input
                id="sitemap-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or page URL (e.g. NRI will, codicil, probate)..."
                className="w-full py-4 pr-10 text-sm sm:text-base text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="pr-4 text-slate-400 hover:text-slate-700 transition-colors"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
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
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <FolderArchive className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-[#172228] mb-2">
              No matching pages found
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172228] text-white text-sm font-semibold hover:bg-[#212F35] transition-colors shadow-xs cursor-pointer"
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
                  className="group relative bg-white border border-slate-200/80 hover:border-[#C65378]/50 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
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
                      <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-[#C65378]/10 text-slate-400 group-hover:text-[#C65378] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Page Title */}
                    <h2 className="text-[15px] font-bold text-[#172228] group-hover:text-[#C65378] transition-colors leading-snug line-clamp-3 mb-2">
                      {link.title}
                    </h2>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="font-mono text-[11px] text-slate-400 truncate max-w-[150px]">
                      {link.href}
                    </span>
                    {displayDate && (
                      <span className="flex items-center gap-1 text-slate-400">
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
        <section className="mt-16 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Section 63 Compliant
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every template and guide adheres to the Indian Succession Act, 1925
                  and statutory witness execution requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Single Source of Truth
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  All pages are synchronized in real-time between this interactive
                  directory and the search engine XML sitemap.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Lawyer Vetted Formats
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Drafted and reviewed by succession advocates at AMA Legal Solutions
                  for real-world validity across all Indian states.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
