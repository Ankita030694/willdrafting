import type { PlanId } from "@/lib/authTypes";

/**
 * Single source of truth for what a Will plan costs. Prices are in rupees and are
 * ALWAYS computed on the server; the browser only ever sends a plan id.
 * No GST is charged: the listed price is the final price.
 */
export interface PlanDef {
  id: PlanId;
  name: string;
  priceRupees: number;
}

/**
 * Real prices (rupees). In development (`next dev`, NODE_ENV !== "production") every plan is
 * charged a token amount instead so the whole payment flow can be tested cheaply. Production
 * builds always charge the real prices; there is no env flag that could enable test prices there.
 */
const LIVE_PRICE: Record<PlanId, number> = {
  essential: 2490,
  lawyer_verified: 4990,
  premium: 9990,
};
const DEV_PRICE: Record<PlanId, number> = {
  essential: 1,
  lawyer_verified: 2,
  premium: 3,
};
export const IS_TEST_PRICING = process.env.NODE_ENV !== "production";
const PRICE = IS_TEST_PRICING ? DEV_PRICE : LIVE_PRICE;

export const PLANS: Record<PlanId, PlanDef> = {
  essential: { id: "essential", name: "Auto Verified (Essential Will)", priceRupees: PRICE.essential },
  lawyer_verified: {
    id: "lawyer_verified",
    name: "Manually Verified (Lawyer Verified)",
    priceRupees: PRICE.lawyer_verified,
  },
  premium: { id: "premium", name: "Connect to Lawyer", priceRupees: PRICE.premium },
};

export interface PriceQuote {
  planId: PlanId;
  baseAmount: number;
  discount: number;
  amount: number;
}

/**
 * Applies an optional percentage discount (Phase 8 retargeting coupons: 5% / 10%).
 * Rounds the discount down so the customer never pays more than the advertised price.
 */
/** Rounds a rupee value to 2 decimals so float noise never reaches the database or PayU. */
export function roundRupees(value: number): number {
  return Math.round(value * 100) / 100;
}

export function quotePlan(planId: PlanId, discountPercent = 0): PriceQuote {
  const plan = PLANS[planId];
  const pct = Math.min(Math.max(Math.floor(discountPercent), 0), 50);
  const discount = Math.floor(plan.priceRupees * pct) / 100;
  return {
    planId,
    baseAmount: plan.priceRupees,
    discount,
    amount: roundRupees(plan.priceRupees - discount),
  };
}

/** PayU expects the amount as a decimal rupee string, e.g. "2490.00". */
export function toRupeeString(rupees: number): string {
  return roundRupees(rupees).toFixed(2);
}

export function parseRupees(value: string | number): number {
  return roundRupees(Number(value));
}

export const PLAN_TIERS: Record<PlanId, number> = {
  essential: 1,
  lawyer_verified: 2,
  premium: 3,
};

export interface UpgradeQuote {
  currentPlanId: PlanId;
  targetPlanId: PlanId;
  currentPaid: number;
  targetPrice: number;
  upgradeAmount: number;
}

/**
 * Calculates the prorated differential price to upgrade from an existing plan to a higher plan.
 * Minuses the amount already paid from the target plan price.
 */
export function quotePlanUpgrade(currentPlanId: PlanId, targetPlanId: PlanId): UpgradeQuote | null {
  const currentTier = PLAN_TIERS[currentPlanId] || 0;
  const targetTier = PLAN_TIERS[targetPlanId] || 0;
  if (targetTier <= currentTier) return null;

  const currentPaid = PLANS[currentPlanId]?.priceRupees ?? 0;
  const targetPrice = PLANS[targetPlanId]?.priceRupees ?? 0;
  const diff = targetPrice - currentPaid;
  // Ensure at least a token ₹1 (dev) / minimum positive amount
  const upgradeAmount = Math.max(diff, 1);

  return {
    currentPlanId,
    targetPlanId,
    currentPaid: currentPaid,
    targetPrice: targetPrice,
    upgradeAmount,
  };
}
