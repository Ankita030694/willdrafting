"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowUpRight,
  Calendar,
  Scale,
  FolderArchive,
  Compass,
  Sparkles,
  FileCheck2,
  ScrollText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { TemplateItem } from "@/data/templatesData";
import { formatDateForDisplay } from "@/data/sitemapData";

interface TemplatesClientProps {
  initialTemplates: TemplateItem[];
}

export default function TemplatesClient({ initialTemplates }: TemplatesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialTemplates.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialTemplates]);

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialTemplates.filter((template) => {
      const matchesCategory =
        activeCategory === "All" ||
        template.category?.toLowerCase() === activeCategory.toLowerCase();

      if (!matchesCategory) return false;
      if (!q) return true;

      const titleMatch = template.title.toLowerCase().includes(q);
      const hrefMatch = template.href.toLowerCase().includes(q);
      const descMatch = template.description?.toLowerCase().includes(q);
      const catMatch = template.category?.toLowerCase().includes(q);
      const kwMatch = template.keywords?.some((k) => k.toLowerCase().includes(q));

      return titleMatch || hrefMatch || descMatch || catMatch || kwMatch;
    });
  }, [searchQuery, activeCategory, initialTemplates]);

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* Decorative ambient background glows matching Hero and sitemap */}
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
            <span>{initialTemplates.length} Lawyer-Vetted Indian Legal Templates</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4">
            Legal Will &amp; Succession{" "}
            <span className="font-bold text-[#C65378]">Templates in India</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-[0.98rem] sm:text-[1.08rem] leading-[1.65] text-[#49585F] font-normal">
            Download legally valid, plain paper legal templates adhering to Section 63 of
            the Indian Succession Act, Supreme Court living will directives, and release deeds.
          </p>

          {/* Search Bar matching Sitemap */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)] rounded-2xl overflow-hidden bg-white border border-[#172228]/12 focus-within:border-[#C65378] focus-within:ring-3 focus-within:ring-[#C65378]/15 transition-all">
              <div className="pl-4 pr-2 text-[#49585F] flex items-center justify-center">
                <Search className="w-5 h-5 text-[#55636D]" />
              </div>
              <input
                id="templates-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or format (e.g. plain paper, codicil, living will)..."
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
        <h2 className="text-lg sm:text-xl font-semibold text-[#172228] mb-4">
          Downloadable Indian Will, Codicil &amp; Deed Formats
        </h2>
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

          {/* Results Counter in pink badge matching screenshot */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs sm:text-sm font-semibold border border-[#C65378]/20 self-end md:self-auto">
            <Compass className="w-4 h-4 text-[#C65378]" />
            <span>
              Showing <strong className="text-[#172228]">{filteredTemplates.length}</strong> of{" "}
              {initialTemplates.length} templates
            </span>
          </div>
        </div>

        {/* Card Grid / Empty State */}
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#172228]/10 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAF7F0] flex items-center justify-center text-[#55636D]">
              <FolderArchive className="w-8 h-8 text-[#55636D]" />
            </div>
            <h3 className="text-xl font-bold text-[#172228] mb-2">
              No matching templates found
            </h3>
            <p className="text-sm text-[#49585F] mb-6 leading-relaxed">
              We couldn&apos;t find any templates matching &quot;{searchQuery}&quot; in{" "}
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
            {filteredTemplates.map((template) => {
              const displayDate = formatDateForDisplay(template.date);
              return (
                <Link
                  key={template.href}
                  href={template.href}
                  className="group relative bg-white border border-[#172228]/[0.08] hover:border-[#C65378]/50 rounded-2xl p-5 shadow-[0_2px_8px_rgba(23,34,40,0.03)] hover:shadow-[0_8px_24px_rgba(23,34,40,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Meta Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${template.badgeStyle}`}
                      >
                        {template.badge}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7F0] group-hover:bg-[#C65378]/10 text-[#55636D] group-hover:text-[#C65378] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Template Title */}
                    <h3 className="text-[15px] font-semibold text-[#172228] group-hover:text-[#C65378] transition-colors leading-snug line-clamp-3 mb-2">
                      {template.title}
                    </h3>

                    {/* Template Description */}
                    <p className="text-xs text-[#55636D] line-clamp-2 leading-relaxed mb-3">
                      {template.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 mt-3 border-t border-[#172228]/[0.06] flex items-center justify-between text-[11px] text-[#55636D] font-medium">
                    <span className="font-mono text-[11px] text-[#8A969E] group-hover:text-[#55636D] truncate max-w-[150px]">
                      {template.href}
                    </span>
                    {displayDate && (
                      <span className="flex items-center gap-1 text-[#8A969E] shrink-0">
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

        {/* Cross-link to Tools banner */}
        <section className="mt-12 bg-white rounded-2xl border border-[#172228]/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
              <Sparkles className="w-4 h-4" /> Free Diagnostic Engines
            </div>
            <h3 className="text-lg font-bold text-[#172228]">
              Need to Calculate Legal Heir Shares or Court Fees?
            </h3>
            <p className="text-xs sm:text-sm text-[#49585F] mt-1 max-w-xl">
              Use our legal Hindu succession tool, state-wise court fee
              estimator, probate rule checker, and NRI Will analyzer.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172228] text-white text-xs sm:text-sm font-semibold hover:bg-[#C65378] transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Explore Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Bottom Trust & Legal Context Card */}
        <section className="mt-12 bg-white rounded-3xl border border-[#172228]/[0.08] p-8 sm:p-10 shadow-[0_4px_20px_-4px_rgba(23,34,40,0.04)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5F7E75]/10 text-[#3d5951] flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-[#5F7E75]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Section 63 Compliant
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Every template strictly enforces the two-witness witness signing rules
                  and legal capacity guidelines under the Indian Succession Act, 1925.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center shrink-0">
                <ScrollText className="w-6 h-6 text-[#C65378]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Valid on Plain Paper
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Under settled Indian law, Wills do not require expensive stamp paper
                  or needed filing to be legally enforceable in probate courts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#172228]/5 text-[#172228] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6 text-[#172228]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Lawyer Vetted Formats
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Drafted, reviewed, and battle-tested by estate lawyers at AMA
                  Legal Solutions for court-readiness across all Indian jurisdictions.
                </p>
              </div>
            </div>
          </div>
        </section>
      
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
            </div>
          </div>

      </main>
    </div>
  );
}
