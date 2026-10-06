import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, state, message, source } = body;

    const trimmedName = String(name || "").replace(/[^a-zA-Z\s]/g, "").trim();
    const cleanPhone = String(phone || "").replace(/\D/g, "").slice(0, 10);
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanState = String(state || "").trim();

    if (!trimmedName || cleanPhone.length !== 10 || !cleanEmail || !cleanState) {
      return NextResponse.json(
        { error: "Name, 10-digit phone number, valid email, and state are required." },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";

    const newContactSubmission = {
      name: trimmedName,
      phone: cleanPhone,
      email: cleanEmail,
      state: cleanState,
      message: message ? String(message).trim() : "",
      source: source || "contact_page",
      status: "new",
      ipAddress: clientIp,
      userAgent: userAgent,
      createdAt: new Date(),
    };

    const result = await db.collection("contacts").insertOne(newContactSubmission);

    return NextResponse.json(
      {
        success: true,
        message: "Contact submission saved successfully.",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving contact submission to MongoDB:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to save inquiry." },
      { status: 500 }
    );
  }
}
