import { NextResponse } from "next/server";
import { getAllSitemapLinks, formatDateForXml } from "@/data/sitemapData";

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
 * Powered by Single Source of Truth (SSOT): src/data/sitemapData.ts
 * Cached on edge CDN for 24 hours with stale-while-revalidate.
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
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
