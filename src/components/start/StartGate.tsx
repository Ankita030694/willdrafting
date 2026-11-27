import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import PaymentReturnBanner from "@/components/dashboard/PaymentReturnBanner";
import { getStartAccess } from "@/lib/startAccess";

/**
 * Server-side gate for every /start page. Paying customers and accounts that were already drafting
 * before pay-first (see `src/lib/startAccess.ts`) see the page; everyone else sees the checkout in
 * its place. It renders instead of redirecting so the many site links to /start never become 3xx
 * links (SEO_AUDIT_RULES.md), and each page calls it so the check re-runs on every navigation.
 */
export default async function StartGate({ children }: { children: React.ReactNode }) {
  const access = await getStartAccess();
  if (access.allowed) return <>{children}</>;
  return <StartPaywall />;
}

function StartPaywall() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F0]">
      <Navbar />
      <main className="flex-1 px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          {/* PayU sends failed / unconfirmed payments back here; show the outcome above the plans. */}
          <Suspense fallback={null}>
            <PaymentReturnBanner />
          </Suspense>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378]">Secure checkout</p>
          <h1 className="mb-3 text-[1.9rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] sm:text-[2.5rem]">
            Choose a plan to start your Will
          </h1>
          <p className="mb-8 max-w-2xl text-[0.98rem] leading-relaxed text-[#49585F]">
            The Will questionnaire opens once your plan is paid. Pay in under two minutes, then answer the questions
            at your own pace.
          </p>
          <CheckoutClient initialPlan="essential" context="start_gate" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
