import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { cleanName, normalizePhone } from "@/lib/authValidation";
import { findAccountById, isPhoneTakenByOther, updateAccount } from "@/lib/accounts";
import { jsonError, readJson } from "@/lib/http";

/** Lets a signed-in account add the contact details that Google / email sign-in did not collect. */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") {
      return jsonError("Unauthorized. Please sign in.", 401);
    }

    const body = await readJson(request);
    const cleanPhone = normalizePhone(body.phone);
    if (!cleanPhone) {
      return jsonError("Please enter a valid 10-digit Indian mobile number.", 400);
    }

    const account = await findAccountById(session.user.id);
    if (!account) return jsonError("Account not found. Please sign in again.", 404);

    // Phone numbers are not verified, so duplicates are tolerated for leads; only block
    // clashes with another paying customer to keep customer records unambiguous.
    if (account.kind === "user" && (await isPhoneTakenByOther(cleanPhone, account.doc._id))) {
      return jsonError("This mobile number is already linked to another account.", 409);
    }

    const patch: Record<string, unknown> = { phone: cleanPhone };
    const name = cleanName(body.name);
    if (name && !account.doc.name) patch.name = name;

    await updateAccount(account, patch);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      phone: cleanPhone,
    });
  } catch (error) {
    console.error("Complete profile error:", error);
    return jsonError("Failed to update profile. Please try again.", 500);
  }
}
