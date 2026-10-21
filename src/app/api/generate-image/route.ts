import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { blogImagesCol } from "@/lib/db/collections";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

async function saveBase64ToMongo(params: {
  rawBase64: string;
  mimeType: string;
  kind: "cover" | "infographic" | "inline";
  prompt: string;
  blogSlug?: string | null;
}) {
  const cleanBase64 = params.rawBase64.replace(/^data:[^;]+;base64,/, "");
  const size = Buffer.byteLength(cleanBase64, "base64");
  const col = await blogImagesCol();
  const _id = new ObjectId();
  const ext = params.mimeType.includes("jpeg") || params.mimeType.includes("jpg") ? "jpg" : "png";

  await col.insertOne({
    _id,
    kind: params.kind,
    filename: `willdrafting_${params.kind}_${Date.now()}.${ext}`,
    mimeType: params.mimeType || "image/png",
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
  let kind: "cover" | "infographic" | "inline" = "cover";
  let blogSlug: string | null = null;
  let customApiKey = "";

  try {
    const body = await request.json();
    parsedPrompt = String(body.prompt || "").trim();
    if (body.kind === "infographic" || body.kind === "cover" || body.kind === "inline") {
      kind = body.kind;
    }
    if (body.blogSlug && typeof body.blogSlug === "string") {
      blogSlug = body.blogSlug.trim();
    }
    if (body.apiKey && typeof body.apiKey === "string") {
      customApiKey = body.apiKey.trim();
    }

    if (!parsedPrompt) {
      return NextResponse.json({ error: "Image prompt is required" }, { status: 400 });
    }

    const apiKey = customApiKey || process.env.HELLO_DROP_CHOO?.trim() || "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured. Add HELLO_DROP_CHOO in .env.local." },
        { status: 500 }
      );
    }

    // Try OpenAI Image Generation Models in order: gpt-image-2 -> gpt-image-1 -> dall-e-3
    const modelsToTry = ["gpt-image-2", "gpt-image-1", "dall-e-3"];
    let rawBase64 = "";
    let mimeType = "image/png";
    let usedModel = "";

    for (const modelName of modelsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 180000);

        const payload: Record<string, unknown> = {
          model: modelName,
          prompt: parsedPrompt,
          n: 1,
          size: "1024x1024",
        };
        if (modelName === "dall-e-3") {
          payload.response_format = "b64_json";
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

    // Fallback: If all OpenAI image models failed (e.g., org verification or quota), fetch Pollinations FLUX and store as base64 in MongoDB
    let isFallback = false;
    if (!rawBase64) {
      console.log("[generate-image] Falling back to FLUX image generation and storing base64 in MongoDB...");
      const cleanPrompt = encodeURIComponent(parsedPrompt.substring(0, 800));
      const randomSeed = Math.floor(Math.random() * 1000000);
      const fallbackUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&nologo=true&seed=${randomSeed}`;

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
