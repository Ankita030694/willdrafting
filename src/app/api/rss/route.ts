import { NextResponse } from "next/server";
import { blogsCol } from "@/lib/db/collections";
import { BLOG_ARTICLES } from "@/data/blogs";

export const dynamic = "force-dynamic";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const baseUrl = "https://www.willdrafting.in";
    const col = await blogsCol();
    const dbBlogs = await col
      .find({ status: "PUBLISHED" })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const items: Array<{
      title: string;
      slug: string;
      description: string;
      pubDate: string;
      author: string;
      category: string;
    }> = [];

    const seenSlugs = new Set<string>();

    for (const b of dbBlogs) {
      seenSlugs.add(b.slug);
      items.push({
        title: b.title,
        slug: b.slug,
        description: b.metaDescription || b.subtitle || "",
        pubDate: new Date(b.date || b.createdAt).toUTCString(),
        author: b.author || "WillDrafting.in Editorial Counsel",
        category: b.category || "Indian Succession Law",
      });
    }

    /* Hardcoded BLOG_ARTICLES loop commented out — RSS items are rendered from MongoDB:
    for (const a of BLOG_ARTICLES) {
      if (items.length >= 25) break;
      if (seenSlugs.has(a.slug)) continue;
      seenSlugs.add(a.slug);
      items.push({
        title: a.title,
        slug: a.slug,
        description: a.metaDescription || a.lead || "",
        pubDate: new Date(a.date).toUTCString(),
        author: a.author,
        category: a.category,
      });
    }
    */

    const rssItems = items
      .map(
        (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${baseUrl}/blogs/${escapeXml(item.slug)}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${escapeXml(item.slug)}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <author>${escapeXml(item.author)}</author>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WillDrafting.in | Indian Succession Law &amp; Estate Planning Journal</title>
    <link>${baseUrl}/blogs</link>
    <description>Authoritative guides on Indian succession law, Section 63 Will rules, Hindu Succession Act, Muslim Wasiyat, NRI estate planning, and probate by WillDrafting.in.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("GET /api/rss error:", error);
    return new NextResponse("Failed to generate RSS feed", { status: 500 });
  }
}
