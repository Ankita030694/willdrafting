import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, whenDidItHappen, whatHappened, agreeDisclaimer, source } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: "Name and at least one contact method (phone or email) are required." },
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
      name: String(name).trim(),
      phone: phone ? String(phone).trim() : "",
      email: email ? String(email).trim().toLowerCase() : "",
      helpTopic: whenDidItHappen ? String(whenDidItHappen).trim() : "",
      message: whatHappened ? String(whatHappened).trim() : "",
      agreeDisclaimer: Boolean(agreeDisclaimer),
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
