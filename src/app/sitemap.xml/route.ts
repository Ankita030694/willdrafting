import { NextResponse } from "next/server";
import { getAllSitemapLinks, formatDateForXml } from "@/data/sitemapData";
import { blogsCol } from "@/lib/db/collections";

const BASE_URL = "https://www.willdrafting.in";

/**
 * Escapes reserved XML characters to prevent parser errors.
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Standards-compliant XML Sitemap Route Handler (/sitemap.xml)
 *
 * Combines Single Source of Truth (SSOT) static routes (`src/data/sitemapData.ts`)
 * with dynamic published blogs from MongoDB (`blogs` collection).
 */
export async function GET() {
  const pages = getAllSitemapLinks();

  // Deduplication map ensuring ZERO duplicate <loc> tags
  const urlMap = new Map<
    string,
    {
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }
  >();

  // 1. Include static sitemap pages first (prioritizing newly created templates, tools and legal calculators)
  for (const page of pages) {
    const rawHref = page.href.startsWith("/") ? page.href : `/${page.href}`;
    const absoluteLoc = rawHref === "/" ? BASE_URL : `${BASE_URL}${rawHref}`;
    const escapedLoc = escapeXml(absoluteLoc);

    if (!urlMap.has(escapedLoc)) {
      urlMap.set(escapedLoc, {
        loc: escapedLoc,
        lastmod: formatDateForXml(page.date),
        changefreq: page.changefreq || "weekly",
        priority: (page.priority ?? 0.8).toFixed(1),
      });
    }
  }

  // 2. Include dynamic published blogs from MongoDB
  try {
    const col = await blogsCol();
    const dbBlogs = await col
      .find({ status: "PUBLISHED" }, { projection: { slug: 1, date: 1, updatedAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    for (const b of dbBlogs) {
      if (!b.slug) continue;
      const absoluteLoc = `${BASE_URL}/blogs/${b.slug}`;
      const escapedLoc = escapeXml(absoluteLoc);
      if (!urlMap.has(escapedLoc)) {
        urlMap.set(escapedLoc, {
          loc: escapedLoc,
          lastmod: formatDateForXml(b.date || new Date(b.updatedAt || Date.now()).toISOString().split("T")[0]),
          changefreq: "weekly",
          priority: "0.9",
        });
      }
    }
  } catch (e) {
    console.warn("Could not query MongoDB blogs for sitemap.xml:", e);
  }

  const urls = Array.from(urlMap.values());

  const xmlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy":
        "default-src 'self'; style-src 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'self';",
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    },
  });
}
