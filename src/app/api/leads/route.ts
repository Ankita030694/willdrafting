import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, state, source, note } = body;

    const cleanPhone = phone ? String(phone).replace(/\D/g, "") : "";
    const cleanName = fullName ? String(fullName).trim() : "";

    if (!cleanName && !cleanPhone && !email) {
      return NextResponse.json(
        { error: "At least one contact identifier (name, phone, or email) is required." },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";

    const newLead = {
      fullName: cleanName,
      phone: cleanPhone,
      email: email ? String(email).trim().toLowerCase() : "",
      state: state || "Delhi",
      source: source || "global_popup",
      note: note || "",
      status: "new",
      ipAddress: clientIp,
      userAgent: userAgent,
      createdAt: new Date(),
    };

    const result = await db.collection("leads").insertOne(newLead);

    return NextResponse.json(
      {
        success: true,
        message: "Lead saved successfully.",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving lead to MongoDB:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to save lead." },
      { status: 500 }
    );
  }
}
