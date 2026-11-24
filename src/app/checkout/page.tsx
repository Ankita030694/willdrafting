import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLAN_IDS, type PlanId } from "@/lib/authTypes";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: {
    absolute: "Buy Your Will Plan & Pay Securely | WillDrafting.in",
  },
  description:
    "Pick a Will plan, pay securely with UPI, card or net banking, and fill in your details later at your own pace. Fixed prices, no hidden fees.",
  alternates: {
    canonical: "https://www.willdrafting.in/checkout",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).plan;
  const requested = Array.isArray(raw) ? raw[0] : raw;
  const initialPlan: PlanId = PLAN_IDS.includes(requested as PlanId) ? (requested as PlanId) : "essential";

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F0]">
      <Navbar />
      <main className="flex-1 px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378]">Secure checkout</p>
          <h1 className="mb-3 text-[1.9rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] sm:text-[2.5rem]">
            Pay now, complete your Will at your own pace
          </h1>
          <p className="mb-8 max-w-2xl text-[0.98rem] leading-relaxed text-[#49585F]">
            Pick a plan and pay in under two minutes. Your plan stays active on your account, so you can answer the
            questions today or come back later.
          </p>
          <CheckoutClient initialPlan={initialPlan} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
