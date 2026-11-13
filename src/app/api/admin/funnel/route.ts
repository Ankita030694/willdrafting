import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { buildConversionFunnel } from "@/lib/admin/funnel";

export const dynamic = "force-dynamic";

/** Query: ?days=7|30|90|all (cohort = accounts created in the window), ?internal=1 to include team/test accounts. */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get("days") ?? "30";
    const days = daysParam === "all" ? null : Math.min(365, Math.max(1, Number(daysParam) || 30));
    return NextResponse.json(await buildConversionFunnel({ days, includeInternal: searchParams.get("internal") === "1" }));
  } catch (error) {
    console.error("Admin funnel API error:", error);
    return NextResponse.json({ error: "Failed to build the funnel." }, { status: 500 });
  }
}
