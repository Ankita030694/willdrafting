import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  MAX_WILL_BYTES,
  claimGuestWill,
  deleteWill,
  getWill,
  publicWill,
  resolveSessionAccount,
  sanitizeIncomingState,
  saveWill,
} from "@/lib/wills";
import { readGuestSessionFromRequest } from "@/lib/guestSession";

export const dynamic = "force-dynamic";

async function requireAccount() {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") return null;
    return await resolveSessionAccount(session.user.id);
  } catch {
    return null;
  }
}

function unauthorized() {
  return jsonError("Please log in to continue.", 401, { loginRequired: true });
}

/**
 * Loads the saved Will:
 * - If signed in: returns the user's account will (automatically claiming any guest session).
 * - If guest: returns the guest will tied to the anonymous guest session cookie/header.
 */
export async function GET(request: NextRequest) {
  try {
    const me = await requireAccount();

    if (me) {
      // 1. Registered User Flow
      const guestSession = readGuestSessionFromRequest(request);
      if (guestSession) {
        // Handshake: Claim guest will if user doesn't already have one
        await claimGuestWill(me.userId, me.email, guestSession);
      }

      const will = await getWill(me.userId);
      if (!will) return NextResponse.json({ exists: false, paid: me.paid, isGuest: false });
      return NextResponse.json(publicWill(will, me.paid), { headers: { "Cache-Control": "no-store" } });
    }

    // Guests are not allowed: login is required.
    return unauthorized();
  } catch (error) {
    console.error("GET /api/will error:", error);
    return jsonError("Could not load your Will.", 500);
  }
}

/**
 * Saves the questionnaire:
 * - Authenticated users save by userId to permanent records.
 * - Anonymous guests save by sessionId with a 30-day TTL.
 */
export async function PUT(request: NextRequest) {
  try {
    const me = await requireAccount();

    const raw = await request.text();
    if (raw.length > MAX_WILL_BYTES) return jsonError("Will data is too large.", 413);

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return jsonError("Invalid JSON.", 400);
    }

    // 1. Authenticated User Flow
    if (me) {
      const limit = await checkRateLimit(`will_save_${me.userId.toString()}`, 120, 60 * 1000);
      if (!limit.allowed) {
        return jsonError("Saving too frequently. Please slow down.", 429, { retryAfterSeconds: limit.retryAfterSeconds });
      }

      const state = sanitizeIncomingState((body as { state?: unknown })?.state, me.paid);
      if (!state) return jsonError("Invalid Will data.", 400);

      const result = await saveWill(me, state);
      if (!result.ok) {
        return jsonError("Your Will is verified and locked. Unlock it to make changes.", 423, { locked: true });
      }

      return NextResponse.json({
        success: true,
        version: result.will.version,
        updatedAt: result.will.updatedAt,
        paid: me.paid,
        isGuest: false,
      });
    }

    // Guests are not allowed: login is required.
    return unauthorized();
  } catch (error) {
    console.error("PUT /api/will error:", error);
    return jsonError("Could not save your Will.", 500);
  }
}

/**
 * Clears/Deletes the saved Will from database:
 * - Authenticated users delete by userId.
 * - Anonymous guests delete by sessionId.
 */
export async function DELETE(request: NextRequest) {
  try {
    const me = await requireAccount();

    if (me) {
      await deleteWill(me.userId);
      return NextResponse.json({ success: true, message: "Will cleared from database." });
    }

    return unauthorized();
  } catch (error) {
    console.error("DELETE /api/will error:", error);
    return jsonError("Could not clear your Will.", 500);
  }
}
