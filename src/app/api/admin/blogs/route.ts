import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { blogsCol } from "@/lib/db/collections";
import type { BlogDoc, BlogFAQItem, BlogReferenceItem, BlogReviewItem } from "@/lib/db/types";

export const dynamic = "force-dynamic";

function estimateReadTime(html: string): string {
  const plainText = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(3, Math.ceil(wordCount / 220));
  return `${minutes} min`;
}

function serializeBlog(doc: BlogDoc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    subtitle: doc.subtitle || "",
    slug: doc.slug,
    category: doc.category || "Indian Succession Law",
    readTime: doc.readTime || estimateReadTime(doc.description || ""),
    date: doc.date || new Date(doc.createdAt).toISOString().split("T")[0],
    image: doc.image || "/desktopusp.jpg",
    imageId: doc.imageId || null,
    infographic: doc.infographic || "",
    infographicId: doc.infographicId || null,
    description: doc.description || "",
    metaTitle: doc.metaTitle || doc.title,
    metaDescription: doc.metaDescription || doc.subtitle || "",
    keywords: Array.isArray(doc.keywords) ? doc.keywords : [],
    shortVersion: Array.isArray(doc.shortVersion) ? doc.shortVersion : [],
    actionSteps: Array.isArray(doc.actionSteps) ? doc.actionSteps : [],
    author: doc.author || "Advocate Anuj Anand Malik",
    authorRole: doc.authorRole || "Senior Succession & Trust Counsel, WillDrafting.in",
    status: doc.status || "PUBLISHED",
    faqs: Array.isArray(doc.faqs) ? doc.faqs : [],
    reviews: Array.isArray(doc.reviews) ? doc.reviews : [],
    references: Array.isArray(doc.references) ? doc.references : [],
    disclaimer:
      doc.disclaimer ||
      "This legal guide is published for educational and estate planning awareness under the Indian Succession Act, 1925 and applicable personal laws. For tailored estate planning or Will review, consult an advocate on WillDrafting.in.",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const slugFilter = searchParams.get("slug");

    const col = await blogsCol();

    if (slugFilter) {
      const doc = await col.findOne({ slug: slugFilter.toLowerCase().trim() });
      if (!doc) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog: serializeBlog(doc) });
    }

    const filter: Record<string, unknown> = {};
    if (statusFilter === "PUBLISHED" || statusFilter === "DRAFT") {
      filter.status = statusFilter;
    }

    const docs = await col.find(filter).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({
      success: true,
      blogs: docs.map(serializeBlog),
    });
  } catch (error) {
    console.error("GET /api/admin/blogs error:", error);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Blog title is required" }, { status: 400 });
    }

    const rawSlug = String(body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const slug = rawSlug || `will-guide-${Date.now()}`;
    const description = String(body.description || "");
    const subtitle = String(body.subtitle || "").trim();
    const category = String(body.category || "Indian Succession Law").trim();
    const readTime = String(body.readTime || "").trim() || estimateReadTime(description);
    const date = String(body.date || new Date().toISOString().split("T")[0]).trim();
    const image = String(body.image || "/desktopusp.jpg").trim();
    const imageId = body.imageId ? String(body.imageId).trim() : null;
    const infographic = body.infographic ? String(body.infographic).trim() : null;
    const infographicId = body.infographicId ? String(body.infographicId).trim() : null;
    const metaTitle = String(body.metaTitle || title).trim();
    const metaDescription = String(body.metaDescription || subtitle).trim();
    const author = String(body.author || "Advocate Anuj Anand Malik").trim();
    const authorRole = String(
      body.authorRole || "Senior Succession & Trust Counsel, WillDrafting.in"
    ).trim();
    const status: "PUBLISHED" | "DRAFT" =
      body.status === "DRAFT" ? "DRAFT" : "PUBLISHED";

    const keywords: string[] = Array.isArray(body.keywords)
      ? body.keywords.map((k: unknown) => String(k).trim()).filter(Boolean)
      : [];

    const shortVersion: string[] = Array.isArray(body.shortVersion)
      ? body.shortVersion.map((s: unknown) => String(s).trim()).filter(Boolean)
      : [];

    const actionSteps: string[] = Array.isArray(body.actionSteps)
      ? body.actionSteps.map((s: unknown) => String(s).trim()).filter(Boolean)
      : [];

    const faqs: BlogFAQItem[] = Array.isArray(body.faqs)
      ? body.faqs
          .map((f: Record<string, unknown>) => ({
            question: String(f?.question || "").trim(),
            answer: String(f?.answer || "").trim(),
          }))
          .filter((f: BlogFAQItem) => f.question && f.answer)
      : [];

    const reviews: BlogReviewItem[] = Array.isArray(body.reviews)
      ? body.reviews
          .map((r: Record<string, unknown>) => ({
            name: String(r?.name || "").trim(),
            rating: Math.min(5, Math.max(1, Number(r?.rating) || 5)),
            review: String(r?.review || r?.text || "").trim(),
            location: r?.location ? String(r.location).trim() : undefined,
          }))
          .filter((r: BlogReviewItem) => r.name && r.review)
      : [];

    const references: BlogReferenceItem[] = Array.isArray(body.references)
      ? body.references
          .map((ref: Record<string, unknown>) => ({
            title: String(ref?.title || "").trim(),
            url: String(ref?.url || "").trim(),
          }))
          .filter((ref: BlogReferenceItem) => ref.title)
      : [];

    const disclaimer =
      String(body.disclaimer || "").trim() ||
      "This legal guide is published for educational and estate planning awareness under the Indian Succession Act, 1925 and applicable personal laws. For tailored estate planning or Will review, consult an advocate on WillDrafting.in.";

    const col = await blogsCol();
    const now = new Date();

    const existing = await col.findOne({ slug });
    if (existing) {
      await col.updateOne(
        { _id: existing._id },
        {
          $set: {
            title,
            subtitle,
            category,
            readTime,
            date,
            image,
            imageId,
            infographic,
            infographicId,
            description,
            metaTitle,
            metaDescription,
            keywords,
            shortVersion,
            actionSteps,
            author,
            authorRole,
            status,
            faqs,
            reviews,
            references,
            disclaimer,
            updatedAt: now,
          },
        }
      );
      const updated = await col.findOne({ _id: existing._id });
      return NextResponse.json({
        success: true,
        blog: updated ? serializeBlog(updated) : null,
        updatedExisting: true,
      });
    }

    const newDoc: BlogDoc = {
      _id: new ObjectId(),
      title,
      subtitle,
      slug,
      category,
      readTime,
      date,
      image,
      imageId,
      infographic,
      infographicId,
      description,
      metaTitle,
      metaDescription,
      keywords,
      shortVersion,
      actionSteps,
      author,
      authorRole,
      status,
      faqs,
      reviews,
      references,
      disclaimer,
      createdAt: now,
      updatedAt: now,
    };

    await col.insertOne(newDoc);

    return NextResponse.json({
      success: true,
      blog: serializeBlog(newDoc),
    });
  } catch (error) {
    console.error("POST /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create blog" },
      { status: 500 }
    );
  }
}
