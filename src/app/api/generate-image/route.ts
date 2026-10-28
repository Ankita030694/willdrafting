import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import { blogImagesCol } from "@/lib/db/collections";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

async function compressBufferUnder90KB(inputBuffer: Buffer): Promise<{ buffer: Buffer; mimeType: string }> {
  if (inputBuffer.byteLength <= 90000) {
    return { buffer: inputBuffer, mimeType: "" };
  }
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
      if (out.byteLength <= 90000) return { buffer: out, mimeType: "image/jpeg" };
    }
  }
  const fallback = await sharp(inputBuffer)
    .flatten({ background: "#ffffff" })
    .resize({ width: 750, withoutEnlargement: true })
    .jpeg({ quality: 40, mozjpeg: true, progressive: true })
    .toBuffer();
  return { buffer: fallback, mimeType: "image/jpeg" };
}

async function saveBase64ToMongo(params: {
  rawBase64: string;
  mimeType: string;
  kind: "cover" | "infographic" | "inline";
  prompt: string;
  blogSlug?: string | null;
}) {
  let cleanBase64 = params.rawBase64.replace(/^data:[^;]+;base64,/, "");
  let size = Buffer.byteLength(cleanBase64, "base64");
  let finalMime = params.mimeType || "image/png";
  if (size > 90000) {
    const compressed = await compressBufferUnder90KB(Buffer.from(cleanBase64, "base64"));
    cleanBase64 = compressed.buffer.toString("base64");
    size = compressed.buffer.byteLength;
    if (compressed.mimeType) finalMime = compressed.mimeType;
  }
  const col = await blogImagesCol();
  const _id = new ObjectId();
  const ext = finalMime.includes("jpeg") || finalMime.includes("jpg") ? "jpg" : "png";

  await col.insertOne({
    _id,
    kind: params.kind,
    filename: `willdrafting_${params.kind}_${Date.now()}.${ext}`,
    mimeType: finalMime,
    base64: cleanBase64,
    size,
    prompt: params.prompt,
    blogSlug: params.blogSlug || null,
    createdAt: new Date(),
  });

  const imageId = _id.toString();
  const imageUrl = `/api/blog-images/${imageId}`;
  return { imageId, imageUrl, size };
}

export async function POST(request: NextRequest) {
  let parsedPrompt = "";
  let blogTitle = "";
  let kind: "cover" | "infographic" | "inline" = "cover";
  let blogSlug: string | null = null;
  let customApiKey = "";

  try {
    const body = await request.json();
    parsedPrompt = String(body.prompt || "").trim();
    blogTitle = String(body.blogTitle || body.title || "").trim();
    if (body.kind === "infographic" || body.kind === "cover" || body.kind === "inline") {
      kind = body.kind;
    }
    if (body.blogSlug && typeof body.blogSlug === "string") {
      blogSlug = body.blogSlug.trim();
    }
    if (body.apiKey && typeof body.apiKey === "string") {
      customApiKey = body.apiKey.trim();
    }

    if (!parsedPrompt && !blogTitle) {
      return NextResponse.json({ error: "Image prompt or blog title is required" }, { status: 400 });
    }

    const baseSubject = parsedPrompt || `Indian family and estate lawyer discussing ${blogTitle}`;
    const titleInstruction = blogTitle
      ? `The exact blog title "${blogTitle}" MUST be clearly, accurately, and prominently written on the image inside a refined WillDrafting.in banner/overlay.`
      : `The blog title mentioned in the prompt MUST be clearly, accurately, and prominently written on the image inside a refined WillDrafting.in banner/overlay.`;

    // Enforce real-life landscape photography, blog title written on the image, and strict WillDrafting font (Plus Jakarta Sans) & colors
    const enforcedPrompt =
      kind === "infographic"
        ? `${baseSubject}\n\nSTRICT LANDSCAPE VISUAL, TITLE OVERLAY & BRAND RULES:\n- Format: Wide landscape orientation (1536x1024) featuring a real-life Indian residential/architectural landscape background with real Indian people.\n- Title on Image: ${titleInstruction}\n- WillDrafting Brand Font: 100% of all text, the main title, headings, and step labels MUST exclusively use the exact WillDrafting website font 'Plus Jakarta Sans' (clean geometric sans-serif, weights 600-800). Strictly NO serif, script, or other fonts.\n- WillDrafting Brand Colors: Use exclusively the WillDrafting color palette — Deep Navy (#172228) for primary banners/text, Warm Cream (#FAF7F0) for clean cards/surfaces, Berry Rose (#C65378) for primary highlights/badges, Slate (#49585F) for subtext, and Sage (#5F7E75) for positive step accents.`
        : `${baseSubject.replace(/\b(illustration|cartoon|vector|clipart)\b/gi, "photorealistic DSLR photograph")}\n\nSTRICT LANDSCAPE VISUAL, TITLE OVERLAY & BRAND RULES:\n- Format: Wide real-life landscape DSLR photograph (1536x1024, natural golden-hour lighting) featuring REAL Indian people in a REAL Indian landscape, home, or architectural setting (strictly NO cartoon, vector, or flat illustration).\n- Title Written on Image: ${titleInstruction}\n- WillDrafting Brand Font: The title written on the image MUST exclusively use the exact WillDrafting website font 'Plus Jakarta Sans' (bold modern geometric sans-serif, weights 700-800). Do NOT use any serif, cursive, or other font.\n- WillDrafting Brand Colors: Style the title typography and subtle brand overlay using the exact WillDrafting color palette — Deep Navy (#172228), Warm Cream (#FAF7F0), Berry Rose accent (#C65378), and Sage (#5F7E75).`;

    const apiKey = customApiKey || process.env.HELLO_DROP_CHOO?.trim() || "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured. Add HELLO_DROP_CHOO in .env.local." },
        { status: 500 }
      );
    }

    // Try OpenAI Image Generation Models in order: gpt-image-2 -> gpt-image-1 -> gpt-image-1-mini -> dall-e-3
    const modelsToTry = ["gpt-image-2", "gpt-image-1", "gpt-image-1-mini", "dall-e-3"];
    let rawBase64 = "";
    let mimeType = "image/png";
    let usedModel = "";

    for (const modelName of modelsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 180000);

        const payload: Record<string, unknown> = {
          model: modelName,
          prompt: enforcedPrompt,
          n: 1,
          size: modelName === "dall-e-3" ? "1792x1024" : "1536x1024",
        };
        if (modelName === "dall-e-3") {
          payload.response_format = "b64_json";
        } else {
          payload.quality = "medium";
        }

        const openAiResponse = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!openAiResponse.ok) {
          const errText = await openAiResponse.text();
          console.warn(`[generate-image] OpenAI ${modelName} returned ${openAiResponse.status}:`, errText);
          continue;
        }

        const openAiData = await openAiResponse.json();
        const item = openAiData?.data?.[0];

        if (item?.b64_json) {
          rawBase64 = item.b64_json;
          mimeType = "image/png";
          usedModel = modelName;
          break;
        } else if (item?.url) {
          // Download the generated URL and convert to base64 immediately for MongoDB storage
          const imgRes = await fetch(item.url);
          if (imgRes.ok) {
            const arrBuf = await imgRes.arrayBuffer();
            rawBase64 = Buffer.from(arrBuf).toString("base64");
            mimeType = imgRes.headers.get("content-type") || "image/png";
            usedModel = modelName;
            break;
          }
        }
      } catch (modelErr) {
        console.warn(`[generate-image] Model ${modelName} attempt failed:`, modelErr);
      }
    }

    // Fallback: If all OpenAI image models failed (e.g., org verification or quota), fetch Pollinations FLUX in landscape and store as base64 in MongoDB
    let isFallback = false;
    if (!rawBase64) {
      console.log("[generate-image] Falling back to FLUX landscape image generation and storing base64 in MongoDB...");
      const cleanPrompt = encodeURIComponent(enforcedPrompt.substring(0, 900));
      const randomSeed = Math.floor(Math.random() * 1000000);
      const fallbackUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1536&height=1024&nologo=true&seed=${randomSeed}&model=flux`;

      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const arrBuf = await fallbackRes.arrayBuffer();
        rawBase64 = Buffer.from(arrBuf).toString("base64");
        mimeType = fallbackRes.headers.get("content-type") || "image/jpeg";
        usedModel = "flux-fallback";
        isFallback = true;
      }
    }

    if (!rawBase64) {
      return NextResponse.json(
        { error: "Failed to generate image from OpenAI and fallback provider." },
        { status: 502 }
      );
    }

    // Store base64 image in MongoDB `blog_images` and provide its permanent link
    const saved = await saveBase64ToMongo({
      rawBase64,
      mimeType,
      kind,
      prompt: parsedPrompt,
      blogSlug,
    });

    return NextResponse.json({
      success: true,
      imageId: saved.imageId,
      imageUrl: saved.imageUrl,
      size: saved.size,
      mimeType,
      model: usedModel,
      isFallback,
    });
  } catch (error) {
    console.error("[generate-image] Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate and store image in MongoDB",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
