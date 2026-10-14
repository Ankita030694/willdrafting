import { NextResponse } from "next/server";

/**
 * The mock payment endpoint granted access without charging and has been removed.
 * Real payments go through PayU (see /api/payment/create-order and the PayU callbacks).
 */
export async function POST() {
  return NextResponse.json(
    { error: "This endpoint has been retired. Please use the checkout flow." },
    { status: 410 }
  );
}
