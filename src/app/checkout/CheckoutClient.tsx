"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { track } from "@vercel/analytics";
import { Check, Lock } from "lucide-react";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";
import type { PlanId } from "@/lib/authTypes";
import { IS_TEST_PRICING, PLANS } from "@/lib/plans";
import { postToPayu } from "@/lib/postToPayu";

interface Tier {
  id: PlanId;
  title: string;
  sub: string;
  features: string[];
  badge?: string;
}

/** Same plan wording as the in-wizard paywall, so a buyer sees one consistent offer. */
const TIERS: Tier[] = [
  {
    id: "essential",
    title: "Auto Verified",
    sub: "Essential Will",
    badge: "Most popular",
    features: ["Statutory PDF download", "Dual-witness signing guide", "Digital vault backup"],
  },
  {
    id: "lawyer_verified",
    title: "Manually Verified",
    sub: "Lawyer Verified",
    features: ["Everything in Auto Verified", "Line-by-line review by advocate"],
  },
  {
    id: "premium",
    title: "Connect to Lawyer",
    sub: "Lawyer Verified / Queries",
    features: ["Advocate connects on call", "Advocate verification & audit", "Answers for further queries"],
  },
];

const NEXT_STEPS = [
  { title: "Pay securely", text: "UPI, cards or net banking through PayU." },
  { title: "Answer simple questions", text: "About you, your family and who gets what. Save and return anytime." },
  { title: "Get your Will", text: "Confirm your details and download the PDF with a signing guide." },
];

const rupees = (id: PlanId) => PLANS[id].priceRupees.toLocaleString("en-IN");

function safeTrack(name: string, props: Record<string, string>) {
  try {
    track(name, props);
  } catch {
    // analytics must never block checkout
  }
}

export default function CheckoutClient({ initialPlan }: { initialPlan: PlanId }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  // Set once the email code is accepted; the session hook may take a moment to catch up.
  const [justVerified, setJustVerified] = useState(false);

  const viewed = useRef(false);
  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    safeTrack("checkout_viewed", { plan: initialPlan });
  }, [initialPlan]);

  // Coming back from PayU without paying (back button / bfcache) must re-enable the button.
  useEffect(() => {
    const reset = () => setPaying(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const startPayment = async (planId: PlanId) => {
    setPaying(true);
    setError("");
    safeTrack("checkout_pay_clicked", { plan: planId });
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, source: "checkout" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.needsPhone) {
          router.push("/complete-profile");
          return;
        }
        throw new Error(data.error || "Could not start the payment. Please try again.");
      }
      postToPayu(data.action, data.fields);
      // Safety reset in case the browser never leaves the page.
      setTimeout(() => setPaying(false), 6000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not start the payment. Please try again.");
      setPaying(false);
    }
  };

  const signedIn = status === "authenticated" || justVerified;
  const isAdmin = session?.user?.role === "superadmin";
  const alreadyPaid = session?.user?.paymentStatus === "paid";
  const payLabel = `Pay ₹${rupees(plan)} securely`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* Plan choice */}
      <section aria-labelledby="checkout-plans">
        <h2 id="checkout-plans" className="mb-3 text-lg font-semibold text-[#172228]">
          Select the Will plan you want to buy
        </h2>
        <div role="radiogroup" aria-labelledby="checkout-plans" className="flex flex-col gap-3">
          {TIERS.map((tier) => {
            const selected = tier.id === plan;
            return (
              <button
                key={tier.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPlan(tier.id)}
                disabled={paying}
                className={`w-full rounded-2xl border bg-white p-4 text-left transition-all sm:p-5 ${
                  selected
                    ? "border-[#C65378] shadow-[0_6px_22px_rgba(198,83,120,0.16)] ring-1 ring-[#C65378]"
                    : "border-[#172228]/12 hover:border-[#172228]/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? "border-[#C65378] bg-[#C65378]" : "border-[#172228]/25 bg-white"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3.5} />}
                    </span>
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[1.02rem] font-semibold text-[#172228]">{tier.title}</span>
                        {tier.badge && (
                          <span className="rounded-full bg-[#C65378]/10 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-[#C65378]">
                            {tier.badge}
                          </span>
                        )}
                      </span>
                      <span className="block text-xs text-[#55636D]">{tier.sub}</span>
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-[1.2rem] font-bold text-[#172228]">₹{rupees(tier.id)}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5 pl-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[0.84rem] text-[#49585F]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7C9473]" strokeWidth={3} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-[#172228]/10 bg-white/70 p-5">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.1em] text-[#172228]">What happens next</h3>
          <ol className="flex flex-col gap-3">
            {NEXT_STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#172228] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[0.88rem] leading-snug text-[#49585F]">
                  <strong className="font-semibold text-[#172228]">{step.title}.</strong> {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Details + pay */}
      <section
        aria-label="Your details and payment"
        className="rounded-2xl border border-[#172228]/10 bg-white p-5 shadow-[0_10px_40px_rgba(23,34,40,0.07)] sm:p-6 lg:sticky lg:top-28"
      >
        <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-[#172228]/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#55636D]">You pay today</p>
            <p className="text-sm text-[#172228]">{PLANS[plan].name}</p>
          </div>
          <p className="whitespace-nowrap text-[1.7rem] font-bold leading-none text-[#172228]">₹{rupees(plan)}</p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-600/25 bg-red-600/[0.08] px-3.5 py-3 text-[0.84rem] text-[#991B1B]"
          >
            {error}
          </div>
        )}

        {status === "loading" && !justVerified ? (
          <div className="h-40 animate-pulse rounded-xl bg-[#172228]/[0.06]" aria-hidden="true" />
        ) : isAdmin ? (
          <p className="text-sm text-[#49585F]">Admin accounts cannot buy a plan. Sign in with a customer account.</p>
        ) : alreadyPaid ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-[#49585F]">
              Your account already has an active plan. Continue your Will from your dashboard, where you can also
              upgrade your plan.
            </p>
            <Link
              href="/start/dashboard"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#172228] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#263640]"
            >
              Go to my dashboard
            </Link>
          </div>
        ) : signedIn ? (
          <div className="flex flex-col gap-3">
            {session?.user?.email && (
              <p className="text-[0.84rem] text-[#55636D]">
                Signed in as <strong className="font-semibold text-[#172228]">{session.user.email}</strong>
              </p>
            )}
            <button
              type="button"
              onClick={() => void startPayment(plan)}
              disabled={paying}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C65378] px-5 py-4 text-[0.98rem] font-bold text-white shadow-[0_6px_20px_rgba(198,83,120,0.28)] transition-colors hover:bg-[#a83d5f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span>{paying ? "Opening PayU..." : payLabel}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <h3 className="text-[1.02rem] font-semibold text-[#172228]">Your details</h3>
            <p className="mb-2 text-[0.84rem] leading-snug text-[#55636D]">
              We email a 6-digit code to confirm it is you, then take you straight to payment.
            </p>
            <EmailOtpAuth
              mode="signup"
              interestedPlanId={plan}
              submitLabel={`Verify email & pay ₹${rupees(plan)} →`}
              onSuccess={() => {
                safeTrack("checkout_otp_verified", { plan });
                setJustVerified(true);
                void startPayment(plan);
              }}
            />
          </div>
        )}

        <p className="mt-4 flex items-start gap-2 text-[0.76rem] leading-snug text-[#55636D]">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>No GST or hidden charges. Secure payment via PayU (UPI, cards, net banking).</span>
        </p>
        {IS_TEST_PRICING && (
          <p className="mt-2 text-[0.72rem] font-semibold text-[#C65378]">
            Development mode: test prices (₹1 / ₹2 / ₹3) are being charged.
          </p>
        )}
        <p className="mt-3 border-t border-[#172228]/10 pt-3 text-[0.8rem] text-[#55636D]">
          Not ready to pay?{" "}
          <Link href="/start/01" className="font-semibold text-[#C65378] hover:text-[#a83d5f]">
            Try the questionnaire free first
          </Link>
        </p>
      </section>
    </div>
  );
}
