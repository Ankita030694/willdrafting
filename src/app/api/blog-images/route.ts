import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { blogImagesCol } from "@/lib/db/collections";

export const dynamic = "force-dynamic";

async function isAdminSession() {
  try {
    const session = await auth();
    return session?.user?.role === "superadmin";
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const kind = searchParams.get("kind");
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 30)));

    const col = await blogImagesCol();
    const filter: Record<string, unknown> = {};
    if (kind === "cover" || kind === "infographic" || kind === "inline") {
      filter.kind = kind;
    }

    const docs = await col
      .find(filter, { projection: { base64: 0 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      images: docs.map((d) => ({
        id: d._id.toString(),
        url: `/api/blog-images/${d._id.toString()}`,
        kind: d.kind,
        filename: d.filename,
        mimeType: d.mimeType,
        size: d.size,
        prompt: d.prompt || null,
        blogSlug: d.blogSlug || null,
        createdAt: d.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET /api/blog-images error:", error);
    return NextResponse.json({ error: "Failed to list blog images" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let rawBase64 = "";
    let mimeType = "image/png";
    let filename = `willdrafting_${Date.now()}.png`;
    let kind: "cover" | "infographic" | "inline" = "cover";
    let prompt: string | null = null;
    let blogSlug: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");
      const kindField = String(formData.get("kind") || "cover");
      if (kindField === "cover" || kindField === "infographic" || kindField === "inline") {
        kind = kindField;
      }
      prompt = formData.get("prompt") ? String(formData.get("prompt")) : null;
      blogSlug = formData.get("blogSlug") ? String(formData.get("blogSlug")) : null;

      if (!file || !(file instanceof Blob)) {
        return NextResponse.json({ error: "No image file provided" }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      rawBase64 = buffer.toString("base64");
      mimeType = file.type || "image/png";
      if ("name" in file && typeof file.name === "string" && file.name.trim()) {
        filename = file.name.trim();
      }
    } else {
      const body = await req.json();
      const inputBase64 = String(body.base64 || body.dataUrl || "").trim();
      if (!inputBase64) {
        return NextResponse.json({ error: "base64 image data is required" }, { status: 400 });
      }

      const dataUrlMatch = inputBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (dataUrlMatch) {
        mimeType = dataUrlMatch[1] || body.mimeType || "image/png";
        rawBase64 = dataUrlMatch[2];
      } else {
        mimeType = body.mimeType || "image/png";
        rawBase64 = inputBase64;
      }

      if (body.filename && typeof body.filename === "string") {
        filename = body.filename.trim();
      }
      if (body.kind === "cover" || body.kind === "infographic" || body.kind === "inline") {
        kind = body.kind;
      }
      if (body.prompt && typeof body.prompt === "string") {
        prompt = body.prompt;
      }
      if (body.blogSlug && typeof body.blogSlug === "string") {
        blogSlug = body.blogSlug;
      }
    }

    const byteSize = Buffer.byteLength(rawBase64, "base64");
    // MongoDB documents have a 16MB BSON limit; enforce max 10MB binary image size
    if (byteSize > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image exceeds 10MB limit. Please compress or resize before uploading." },
        { status: 413 }
      );
    }

    const col = await blogImagesCol();
    const _id = new ObjectId();
    await col.insertOne({
      _id,
      kind,
      filename,
      mimeType,
      base64: rawBase64,
      size: byteSize,
      prompt,
      blogSlug,
      createdAt: new Date(),
    });

    const imageId = _id.toString();
    const imageUrl = `/api/blog-images/${imageId}`;

    return NextResponse.json({
      success: true,
      imageId,
      imageUrl,
      mimeType,
      size: byteSize,
    });
  } catch (error) {
    console.error("POST /api/blog-images error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to store base64 image in MongoDB" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")?.trim();
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid image id is required" }, { status: 400 });
    }

    const col = await blogImagesCol();
    await col.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/blog-images error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
