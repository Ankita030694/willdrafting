import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { promptsCol } from "@/lib/db/collections";
import { WILLDRAFTING_PROMPT_PRESETS } from "@/lib/defaultPrompts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await promptsCol();
    let docs = await col.find({}).sort({ isDefault: -1, createdAt: -1 }).toArray();

    // Auto-seed WillDrafting.in default prompt presets if collection is empty
    if (docs.length === 0) {
      const now = new Date();
      const seedDocs = WILLDRAFTING_PROMPT_PRESETS.map((preset) => ({
        _id: new ObjectId(),
        name: preset.name,
        description: preset.description,
        coreInstructions: preset.coreInstructions,
        targetWordCount: preset.targetWordCount,
        isDefault: preset.isDefault,
        createdAt: now,
        updatedAt: now,
      }));
      await col.insertMany(seedDocs);
      docs = seedDocs;
    } else {
      // Auto-sync any newly added code presets missing from the database
      const missingPresets = WILLDRAFTING_PROMPT_PRESETS.filter(
        (preset) => !docs.some((d) => d.name?.trim() === preset.name.trim())
      );
      if (missingPresets.length > 0) {
        const now = new Date();
        const newDocs = missingPresets.map((preset) => ({
          _id: new ObjectId(),
          name: preset.name,
          description: preset.description,
          coreInstructions: preset.coreInstructions,
          targetWordCount: preset.targetWordCount,
          isDefault: false,
          createdAt: now,
          updatedAt: now,
        }));
        await col.insertMany(newDocs);
        docs = [...docs, ...newDocs];
        docs.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
      }
    }

    return NextResponse.json({
      success: true,
      prompts: docs.map((d) => ({
        id: d._id.toString(),
        name: d.name,
        description: d.description,
        coreInstructions: d.coreInstructions,
        targetWordCount: d.targetWordCount || 3500,
        isDefault: Boolean(d.isDefault),
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/prompts error:", error);
    return NextResponse.json({ error: "Failed to fetch prompt profiles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await promptsCol();

    if (body.action === "seed") {
      const now = new Date();
      const existingCount = await col.countDocuments();
      if (existingCount > 0 && WILLDRAFTING_PROMPT_PRESETS.some((p) => p.isDefault)) {
        await col.updateMany({}, { $set: { isDefault: false } });
      }
      const inserted = [];
      for (const preset of WILLDRAFTING_PROMPT_PRESETS) {
        const doc = {
          _id: new ObjectId(),
          name: preset.name,
          description: preset.description,
          coreInstructions: preset.coreInstructions,
          targetWordCount: preset.targetWordCount,
          isDefault: preset.isDefault,
          createdAt: now,
          updatedAt: now,
        };
        await col.insertOne(doc);
        inserted.push(doc);
      }
      return NextResponse.json({
        success: true,
        count: inserted.length,
      });
    }

    const id = body.id ? String(body.id).trim() : "";
    const name = String(body.name || "").trim();
    const description = String(body.description || "").trim();
    const coreInstructions = String(body.coreInstructions || "").trim();
    const targetWordCount = Math.min(12000, Math.max(500, Number(body.targetWordCount) || 3500));
    let isDefault = Boolean(body.isDefault);

    if (!name || !coreInstructions) {
      return NextResponse.json(
        { error: "Prompt Name and Core Instructions are required" },
        { status: 400 }
      );
    }

    const totalCount = await col.countDocuments();
    if (totalCount === 0) {
      isDefault = true;
    }

    if (isDefault) {
      await col.updateMany({}, { $set: { isDefault: false } });
    }

    const now = new Date();

    if (id && ObjectId.isValid(id)) {
      await col.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            description,
            coreInstructions,
            targetWordCount,
            isDefault,
            updatedAt: now,
          },
        }
      );
      return NextResponse.json({ success: true, id });
    } else {
      const _id = new ObjectId();
      await col.insertOne({
        _id,
        name,
        description,
        coreInstructions,
        targetWordCount,
        isDefault,
        createdAt: now,
        updatedAt: now,
      });
      return NextResponse.json({ success: true, id: _id.toString() });
    }
  } catch (error) {
    console.error("POST /api/admin/prompts error:", error);
    return NextResponse.json({ error: "Failed to save prompt profile" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")?.trim();
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid prompt ID is required" }, { status: 400 });
    }

    const col = await promptsCol();
    await col.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/prompts error:", error);
    return NextResponse.json({ error: "Failed to delete prompt profile" }, { status: 500 });
  }
}
