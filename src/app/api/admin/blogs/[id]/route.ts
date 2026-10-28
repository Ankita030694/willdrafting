import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { blogImagesCol, blogsCol } from "@/lib/db/collections";
import type { BlogFAQItem, BlogReferenceItem, BlogReviewItem } from "@/lib/db/types";

export const dynamic = "force-dynamic";

function extractMongoImageIds(blog: {
  image?: string | null;
  imageId?: string | null;
  infographic?: string | null;
  infographicId?: string | null;
  description?: string | null;
}): ObjectId[] {
  const idSet = new Set<string>();

  if (blog.imageId && ObjectId.isValid(blog.imageId)) {
    idSet.add(blog.imageId);
  }
  if (blog.infographicId && ObjectId.isValid(blog.infographicId)) {
    idSet.add(blog.infographicId);
  }

  const combinedText = [blog.image || "", blog.infographic || "", blog.description || ""].join(" ");
  const regex = /\/api\/blog-images\/([a-fA-F0-9]{24})/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(combinedText)) !== null) {
    if (match[1] && ObjectId.isValid(match[1])) {
      idSet.add(match[1]);
    }
  }

  return Array.from(idSet).map((id) => new ObjectId(id));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const col = await blogsCol();

    const doc = ObjectId.isValid(id)
      ? await col.findOne({ _id: new ObjectId(id) })
      : await col.findOne({ slug: id.toLowerCase().trim() });

    if (!doc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog: {
        ...doc,
        id: doc._id.toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/blogs/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const body = await req.json();
    const col = await blogsCol();
    const existing = await col.findOne({ _id: new ObjectId(id) });

    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof body.title === "string" && body.title.trim()) {
      updateFields.title = body.title.trim();
    }
    if (typeof body.subtitle === "string") {
      updateFields.subtitle = body.subtitle.trim();
    }
    if (typeof body.slug === "string" && body.slug.trim()) {
      updateFields.slug = body.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    if (typeof body.category === "string") {
      updateFields.category = body.category.trim();
    }
    if (typeof body.readTime === "string") {
      updateFields.readTime = body.readTime.trim();
    }
    if (typeof body.date === "string") {
      const trimmedDate = body.date.trim();
      const dmyOrMdy = trimmedDate.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
      if (dmyOrMdy) {
        const p1 = Number(dmyOrMdy[1]);
        const p2 = Number(dmyOrMdy[2]);
        const year = Number(dmyOrMdy[3]);
        const day = p2 > 12 ? p2 : p1;
        const month = p2 > 12 ? p1 : p2;
        updateFields.date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      } else {
        updateFields.date = trimmedDate;
      }
    }
    if (typeof body.image === "string") {
      updateFields.image = body.image.trim();
    }
    if (body.imageId !== undefined) {
      updateFields.imageId = body.imageId ? String(body.imageId).trim() : null;
    }
    if (body.infographic !== undefined) {
      updateFields.infographic = body.infographic ? String(body.infographic).trim() : null;
    }
    if (body.infographicId !== undefined) {
      updateFields.infographicId = body.infographicId ? String(body.infographicId).trim() : null;
    }
    if (typeof body.description === "string") {
      updateFields.description = body.description.replace(
        /https?:\/\/(?:www\.)?indiacode\.nic\.in\/(?:handle\/[^\s"'<>]+|bitstream\/[^\s"'<>]+|show-data[^\s"'<>]*|\?[^\s"'<>]+)/gi,
        "https://legislative.gov.in/"
      );
    }
    if (typeof body.metaTitle === "string") {
      updateFields.metaTitle = body.metaTitle.trim();
    }
    if (typeof body.metaDescription === "string") {
      updateFields.metaDescription = body.metaDescription.trim();
    }
    if (Array.isArray(body.keywords)) {
      updateFields.keywords = body.keywords.map((k: unknown) => String(k).trim()).filter(Boolean);
    }
    if (Array.isArray(body.shortVersion)) {
      updateFields.shortVersion = body.shortVersion
        .map((s: unknown) => String(s).trim())
        .filter(Boolean);
    }
    if (Array.isArray(body.actionSteps)) {
      updateFields.actionSteps = body.actionSteps
        .map((s: unknown) => String(s).trim())
        .filter(Boolean);
    }
    if (typeof body.author === "string") {
      updateFields.author = body.author.trim();
    }
    if (typeof body.authorRole === "string") {
      updateFields.authorRole = body.authorRole.trim();
    }
    if (body.status === "PUBLISHED" || body.status === "DRAFT") {
      updateFields.status = body.status;
    }
    if (Array.isArray(body.faqs)) {
      updateFields.faqs = body.faqs
        .map((f: Record<string, unknown>) => ({
          question: String(f?.question || "").trim(),
          answer: String(f?.answer || "").trim(),
        }))
        .filter((f: BlogFAQItem) => f.question && f.answer);
    }
    if (Array.isArray(body.reviews)) {
      updateFields.reviews = body.reviews
        .map((r: Record<string, unknown>) => ({
          name: String(r?.name || "").trim(),
          rating: Math.min(5, Math.max(1, Number(r?.rating) || 5)),
          review: String(r?.review || r?.text || "").trim(),
          location: r?.location ? String(r.location).trim() : undefined,
        }))
        .filter((r: BlogReviewItem) => r.name && r.review);
    }
    if (Array.isArray(body.references)) {
      updateFields.references = body.references
        .map((ref: Record<string, unknown>) => ({
          title: String(ref?.title || "").trim(),
          url: String(ref?.url || "")
            .trim()
            .replace(
              /^https?:\/\/(?:www\.)?indiacode\.nic\.in\/(?:handle\/.*|bitstream\/.*|show-data.*|\?.*)$/i,
              "https://legislative.gov.in/"
            ),
        }))
        .filter((ref: BlogReferenceItem) => ref.title);
    }
    if (typeof body.disclaimer === "string") {
      updateFields.disclaimer = body.disclaimer.trim();
    }

    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
    const updated = await col.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      blog: updated ? { ...updated, id: updated._id.toString() } : null,
    });
  } catch (error) {
    console.error("PUT /api/admin/blogs/[id] error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const col = await blogsCol();
    const existing = await col.findOne({ _id: new ObjectId(id) });

    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Clean up all associated base64 images (cover, infographic, and inline content images) from MongoDB
    const imageObjectIds = extractMongoImageIds(existing);
    if (imageObjectIds.length > 0) {
      const imgCol = await blogImagesCol();
      await imgCol.deleteMany({ _id: { $in: imageObjectIds } });
    }

    await col.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      deletedImagesCount: imageObjectIds.length,
    });
  } catch (error) {
    console.error("DELETE /api/admin/blogs/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
