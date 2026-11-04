import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { jsonError, readJson } from "@/lib/http";
import { checkRateLimit } from "@/lib/rateLimit";
import { recordWizardStep, resolveSessionAccount } from "@/lib/wills";

export const dynamic = "force-dynamic";

/**
 * Records which questionnaire step the signed-in account just opened (body: `{ step: 1-14 }`).
 * Analytics only: the client fires and forgets, so failures never block the wizard.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") {
      return jsonError("Please log in to continue.", 401, { loginRequired: true });
    }
    const me = await resolveSessionAccount(session.user.id);
    if (!me) return jsonError("Please log in to continue.", 401, { loginRequired: true });

    const step = Number((await readJson(request)).step);
    if (!Number.isInteger(step) || step < 1 || step > 14) return jsonError("Invalid step.", 400);

    const limit = await checkRateLimit(`will_progress_${me.userId.toString()}`, 60, 60 * 1000);
    if (!limit.allowed) return jsonError("Too many requests.", 429);

    await recordWizardStep(me, step);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/will/progress error:", error);
    return jsonError("Could not record progress.", 500);
  }
}
