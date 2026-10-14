import { NextRequest, NextResponse } from "next/server";
import { cleanName, isValidEmail, normalizeEmail, normalizePhone } from "@/lib/authValidation";
import { ensureLead } from "@/lib/accounts";
import { getClientIp, jsonError, readJson } from "@/lib/http";
import { checkRateLimit } from "@/lib/rateLimit";
import type { LeadSource } from "@/lib/db/types";

const SOURCES: Record<string, LeadSource> = {
  global_popup: "intake_popup",
  intake_popup: "intake_popup",
  contact_page: "contact_form",
  contact_form: "contact_form",
};

/**
 * Single entry point for every marketing form (intake popup + contact page).
 * Only ever writes to `leads`, never returns tokens or reveals whether the contact is a customer.
 */
export async function POST(request: NextRequest) {
  try {
    const limit = await checkRateLimit(`leads_${getClientIp(request)}`, 10, 15 * 60 * 1000);
    if (!limit.allowed) {
      return jsonError(
        `Too many submissions. Please retry in ${limit.retryAfterSeconds} seconds.`,
        429
      );
    }

    const body = await readJson(request);
    const name = cleanName(body.name ?? body.fullName);
    const email = normalizeEmail(body.email);
    const phone = normalizePhone(body.phone);
    const state = String(body.state ?? "").trim().slice(0, 60);
    const message = String(body.message ?? body.note ?? "").trim().slice(0, 2000);
    const source = SOURCES[String(body.source ?? "")] ?? "intake_popup";

    if (email && !isValidEmail(email)) {
      return jsonError("Please enter a valid email address.", 400);
    }
    if (body.phone && !phone) {
      return jsonError("Please enter a valid 10-digit Indian mobile number.", 400);
    }
    if (!email && !phone) {
      return jsonError("Please provide a valid phone number or email address.", 400);
    }

    await ensureLead({
      email,
      name,
      phone,
      state: state || undefined,
      message: message || undefined,
      source,
      marketingConsent: body.marketingConsent === true,
    });

    // Same response whether the lead is new, existing, or already a customer.
    return NextResponse.json({ success: true, message: "Inquiry saved successfully." });
  } catch (error) {
    console.error("Lead capture error:", error);
    return jsonError("Internal server error. Failed to save inquiry.", 500);
  }
}
