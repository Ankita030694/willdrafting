import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { blogImagesCol } from "@/lib/db/collections";

export const dynamic = "force-dynamic";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "default-src 'self'; script-src 'none'; sandbox;",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    // Allow optional file extension like /api/blog-images/6716abcd1234.png
    const cleanId = rawId.replace(/\.(png|jpg|jpeg|webp|gif|svg)$/i, "").trim();

    if (!ObjectId.isValid(cleanId)) {
      return new NextResponse("Invalid image ID", {
        status: 400,
        headers: SECURITY_HEADERS,
      });
    }

    const col = await blogImagesCol();
    const doc = await col.findOne({ _id: new ObjectId(cleanId) });

    if (!doc || !doc.base64) {
      return new NextResponse("Image not found", {
        status: 404,
        headers: SECURITY_HEADERS,
      });
    }

    // Strip any accidental data URL prefix before decoding
    const rawBase64 = doc.base64.replace(/^data:[^;]+;base64,/, "");
    const buffer = Buffer.from(rawBase64, "base64");
    const mimeType = doc.mimeType || "image/png";
    const safeFilename = (doc.filename || `${cleanId}.png`).replace(/[^a-zA-Z0-9._-]/g, "_");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        ...SECURITY_HEADERS,
        "Content-Type": mimeType,
        "Content-Length": String(buffer.byteLength),
        "Content-Disposition": `inline; filename="${safeFilename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving MongoDB base64 blog image:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }
}
