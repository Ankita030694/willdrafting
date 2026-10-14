import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logFunnelEvent } from "@/lib/accounts";
import { jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rateLimit";
import { getWill, resolveSessionAccount, unlockWill } from "@/lib/wills";

export const dynamic = "force-dynamic";

/**
 * Once a Will is verified via Email OTP after 1-by-1 details review, it is permanently locked
 * and cannot be unlocked or modified.
 */
export async function POST(_request: NextRequest) {
  return jsonError("Will details are permanently locked after OTP verification and cannot be edited.", 403);
}
