import { NextRequest, NextResponse } from "next/server";
import { jsonError } from "@/lib/http";
import { runWhatsAppCampaign, type CampaignMode } from "@/lib/whatsapp/campaign";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MODES: CampaignMode[] = ["off", "dry_run", "test", "live"];
/** A query-string override may only make a run safer than the configured mode, never riskier. */
const SAFETY_ORDER: Record<CampaignMode, number> = { off: 0, dry_run: 1, test: 2, live: 3 };

/**
 * Runs the WhatsApp re-engagement campaign. Called every 15 minutes by Vercel Cron (vercel.json),
 * which sends `Authorization: Bearer $CRON_SECRET` automatically.
 *
 * Query: ?mode=dry_run|test (optional, can only lower WHATSAPP_MODE)
 *        ?backfill=1 (one message, once, to leads that existed before consent was collected)
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return jsonError("Unauthorized.", 401);
  }

  const configured = (process.env.WHATSAPP_MODE ?? "off") as CampaignMode;
  const baseMode: CampaignMode = MODES.includes(configured) ? configured : "off";
  const requested = request.nextUrl.searchParams.get("mode") as CampaignMode | null;
  const mode =
    requested && MODES.includes(requested) && SAFETY_ORDER[requested] < SAFETY_ORDER[baseMode] ? requested : baseMode;
  const backfill = request.nextUrl.searchParams.get("backfill") === "1";

  try {
    const summary = await runWhatsAppCampaign({ mode, backfill });
    if (summary.sent || summary.failed.length) {
      console.log(`[whatsapp] mode=${mode} backfill=${backfill} sent=${summary.sent} failed=${summary.failed.length}`);
    }
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[whatsapp] campaign run failed:", error);
    return jsonError("Campaign run failed.", 500);
  }
}
