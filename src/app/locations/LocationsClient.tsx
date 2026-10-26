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
  MapPin,
  Building2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { LocationItem } from "@/data/locationsData";
import { formatDateForDisplay } from "@/data/sitemapData";

interface LocationsClientProps {
  initialLocations: LocationItem[];
}

export default function LocationsClient({ initialLocations }: LocationsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filterTabs = [
    "All",
    "Metros",
    "States & UTs",
    "Cities",
    "North India",
    "South India",
    "West & Central",
    "East & North-East",
  ];

  const filteredLocations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialLocations.filter((loc) => {
      // Category / Region filter
      let matchesTab = true;
      if (activeFilter === "Metros") {
        matchesTab = loc.type === "Metro";
      } else if (activeFilter === "States & UTs") {
        matchesTab = loc.type === "State & UT";
      } else if (activeFilter === "Cities") {
        matchesTab = loc.type === "City";
      } else if (
        activeFilter === "North India" ||
        activeFilter === "South India" ||
        activeFilter === "West & Central" ||
        activeFilter === "East & North-East"
      ) {
        matchesTab = loc.region === activeFilter;
      }

      if (!matchesTab) return false;
      if (!q) return true;

      const titleMatch = loc.title.toLowerCase().includes(q);
      const hrefMatch = loc.href.toLowerCase().includes(q);
      const nameMatch = loc.cityOrState.toLowerCase().includes(q);
      const slugMatch = loc.slug.toLowerCase().includes(q);

      return titleMatch || hrefMatch || nameMatch || slugMatch;
    });
  }, [searchQuery, activeFilter, initialLocations]);

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
            <span>{initialLocations.length} Cities, States &amp; UTs Across India</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4">
            Will Drafting Across <span className="font-bold text-[#C65378]">India</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-[0.98rem] sm:text-[1.08rem] leading-[1.65] text-[#49585F] font-normal">
            Explore state-specific Will registration procedures, local Sub-Registrar guidelines,
            revenue land mutation rules, and succession lawyer assistance across India.
          </p>

          {/* Search Bar matching Sitemap */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)] rounded-2xl overflow-hidden bg-white border border-[#172228]/12 focus-within:border-[#C65378] focus-within:ring-3 focus-within:ring-[#C65378]/15 transition-all">
              <div className="pl-4 pr-2 text-[#49585F] flex items-center justify-center">
                <Search className="w-5 h-5 text-[#55636D]" />
              </div>
              <input
                id="locations-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, state, or location (e.g. Mumbai, Delhi, Bengaluru, Gujarat, Punjab)..."
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
        {/* Category Filter Pills & Results Counter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#172228]/10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter.toLowerCase() === tab.toLowerCase();
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#172228] text-white shadow-xs"
                      : "bg-white text-[#49585F] hover:bg-[#F4EFE6] hover:text-[#172228] border border-[#172228]/10"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Results Counter in pink badge matching screenshot */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs sm:text-sm font-semibold border border-[#C65378]/20 self-end md:self-auto shrink-0">
            <Compass className="w-4 h-4 text-[#C65378]" />
            <span>
              Showing <strong className="text-[#172228]">{filteredLocations.length}</strong> of{" "}
              {initialLocations.length} pages
            </span>
          </div>
        </div>

        {/* Card Grid / Empty State */}
        {filteredLocations.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#172228]/10 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAF7F0] flex items-center justify-center text-[#55636D]">
              <FolderArchive className="w-8 h-8 text-[#55636D]" />
            </div>
            <h2 className="text-xl font-bold text-[#172228] mb-2">
              No matching locations found
            </h2>
            <p className="text-sm text-[#49585F] mb-6 leading-relaxed">
              We couldn&apos;t find any location matching &quot;{searchQuery}&quot; in{" "}
              {activeFilter === "All" ? "all locations" : activeFilter}. Try a
              different keyword or clear your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65378] text-white text-sm font-semibold hover:bg-[#a13c5d] transition-colors shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredLocations.map((loc) => {
              const displayDate = formatDateForDisplay(loc.date);
              return (
                <Link
                  key={loc.href}
                  href={loc.href}
                  className="group relative bg-white border border-[#172228]/[0.08] hover:border-[#C65378]/50 rounded-2xl p-5 shadow-[0_2px_8px_rgba(23,34,40,0.03)] hover:shadow-[0_8px_24px_rgba(23,34,40,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Meta Row matching screenshot */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${loc.badgeStyle}`}
                      >
                        {loc.badge}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7F0] group-hover:bg-[#C65378]/10 text-[#55636D] group-hover:text-[#C65378] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Location Title */}
                    <h2 className="text-[15px] font-semibold text-[#172228] group-hover:text-[#C65378] transition-colors leading-snug line-clamp-3 mb-2">
                      {loc.title}
                    </h2>
                  </div>

                  {/* Card Bottom Meta matching screenshot */}
                  <div className="pt-3 mt-3 border-t border-[#172228]/[0.06] flex items-center justify-between text-[11px] text-[#55636D] font-medium">
                    <span className="font-mono text-[11px] text-[#8A969E] group-hover:text-[#55636D] truncate max-w-[150px]">
                      {loc.href}
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

        {/* Cross-link to Tools & Templates banner */}
        <section className="mt-12 bg-white rounded-2xl border border-[#172228]/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
              <Sparkles className="w-4 h-4" /> Comprehensive Legal Directory
            </div>
            <h3 className="text-lg font-bold text-[#172228]">
              Looking for Calculators or Legal Document Templates?
            </h3>
            <p className="text-xs sm:text-sm text-[#49585F] mt-1 max-w-xl">
              Explore our free inheritance share calculators, state-wise court fee estimators,
              and lawyer-vetted plain paper Will formats.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7F0] text-[#172228] hover:bg-[#F4EFE6] border border-[#172228]/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Legal Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#172228] text-white hover:bg-[#C65378] text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Legal Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
                  Pan-India Statutory Validity
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Every Will drafted through WillDrafting strictly complies with Section 63
                  of the Indian Succession Act, 1925, valid across all Indian courts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#C65378]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Local Sub-Registrar SOPs
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Clear, verified guidance on e-Dhara, Jamabandi, Kaveri, and local land
                  revenue mutations without costly litigation or middlemen.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#172228]/5 text-[#172228] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#172228]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172228] mb-1">
                  Local Advocate Network
                </h3>
                <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
                  Access High Court and District Court succession advocates at AMA Legal
                  Solutions for physical registration support and home visits.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
