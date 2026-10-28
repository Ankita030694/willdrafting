import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import { blogImagesCol } from "@/lib/db/collections";

export const dynamic = "force-dynamic";

async function ensureUnder90KB(inputBuffer: Buffer): Promise<Buffer> {
  if (inputBuffer.byteLength <= 90000) return inputBuffer;
  const meta = await sharp(inputBuffer).metadata();
  const origW = meta.width || 1200;
  const widths = [origW, Math.min(origW, 1200), Math.min(origW, 1000), Math.min(origW, 850)];
  for (const w of widths) {
    for (const q of [76, 70, 65, 60, 55, 50, 45, 40]) {
      let pipeline = sharp(inputBuffer).flatten({ background: "#ffffff" });
      if (w < origW) pipeline = pipeline.resize({ width: w, withoutEnlargement: true });
      const out = await pipeline
        .jpeg({ quality: q, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" })
        .toBuffer();
      if (out.byteLength <= 90000) return out;
    }
  }
  return sharp(inputBuffer)
    .flatten({ background: "#ffffff" })
    .resize({ width: 750, withoutEnlargement: true })
    .jpeg({ quality: 40, mozjpeg: true, progressive: true })
    .toBuffer();
}

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
    let buffer: Buffer = Buffer.from(rawBase64, "base64");
    let mimeType = doc.mimeType || "image/png";

    if (buffer.byteLength > 90000) {
      buffer = await ensureUnder90KB(buffer);
      mimeType = "image/jpeg";
      await col.updateOne(
        { _id: doc._id },
        {
          $set: {
            base64: buffer.toString("base64"),
            size: buffer.byteLength,
            mimeType: "image/jpeg",
          },
        }
      );
    }

    const safeFilename = (doc.filename || `${cleanId}.jpg`).replace(/[^a-zA-Z0-9._-]/g, "_");

    return new NextResponse(new Uint8Array(buffer), {
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
