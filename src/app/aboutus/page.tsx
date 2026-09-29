import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | WillDrafting.in — Protecting Legacies Across Generations",
  description:
    "Learn about our estate planning practice, legal expertise, client-first advocacy, and commitment to clear Indian succession law solutions.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            CENTERED HERO HEADER: Pill, Heading, Subheading (Plus Jakarta Sans)
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Pill in Centre */}
          <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
            <span>About Our Practice</span>
          </div>

          {/* Main Heading in Centre (Plus Jakarta Sans) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
            Dedicated to protecting what matters most to your family.
          </h1>

          {/* Subheading in Centre */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#55636D] font-normal max-w-2xl mx-auto">
            We combine decades of estate planning acumen, compassionate advocacy, and modern execution to ensure seamless succession and lasting peace of mind.
          </p>
        </div>

        {/* =========================================================================
            CHECKERBOARD MOSAIC HERO SECTION
            2 Rows of 4 Alternating Cards: Dark Cards, Warm Beige Cards & Public Photos
            ========================================================================= */}
        <section className="w-full rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {/* -------------------------------------------------------------------
                ROW 1 - TILE 1: Dark Stat Card (Cases)
                ------------------------------------------------------------------- */}
            <div className="bg-[#C65378] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square">
              {/* Eyebrow with Dash */}
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
                <span className="w-4 h-[1px] bg-white/40" />
                <span>CASES</span>
              </div>

              {/* Stat & Description */}
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-white mb-4">
                  200+
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-white/70">
                  Successfully resolved over 200 cases, demonstrating our expertise and effectiveness.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                ROW 1 - TILE 2: Photo Portrait (Advocate)
                ------------------------------------------------------------------- */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden">
              <Image
                src="/images/advocate.jpg"
                alt="Our Senior Legal Counsel"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* -------------------------------------------------------------------
                ROW 1 - TILE 3: Dark Stat Card (Clients)
                ------------------------------------------------------------------- */}
            <div className="bg-[#C65378] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square border-t sm:border-t-0 border-[#172228]/10">
              {/* Eyebrow with Dash */}
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
                <span className="w-4 h-[1px] bg-white/40" />
                <span>CLIENTS</span>
              </div>

              {/* Stat & Description */}
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-white mb-4">
                  100+
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-white/70">
                  Served the needs of 100+ clients, providing personalized solutions and dedicated support.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                ROW 1 - TILE 4: Photo Portrait (Attorney Desk)
                ------------------------------------------------------------------- */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden">
              <Image
                src="/images/attorney-desk.jpg"
                alt="Consultation Desk & Legal Drafting"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* -------------------------------------------------------------------
                ROW 2 - TILE 5: Photo Portrait with Floating Contact Pill
                ------------------------------------------------------------------- */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden group">
              <Image
                src="/images/contact-consultation.jpg"
                alt="Client Consultation & Advisory"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

             
            </div>

            {/* -------------------------------------------------------------------
                ROW 2 - TILE 6: Warm Sand/Beige Stat Card (Commitment)
                ------------------------------------------------------------------- */}
            <div className="bg-[#DFCEBF] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square">
              {/* Eyebrow with Dash */}
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#172228]/60">
                <span className="w-4 h-[1px] bg-[#172228]/40" />
                <span>COMMITMENT</span>
              </div>

              {/* Stat & Description */}
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-[#172228] mb-4">
                  110%
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#172228]/80">
                  Our team is dedicated to going above and beyond, ensuring 110% client satisfaction and excellence.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                ROW 2 - TILE 7: Photo Portrait (Service Consultation)
                ------------------------------------------------------------------- */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden">
              <Image
                src="/images/service-hero.jpg"
                alt="Document Review and Estate Strategy"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* -------------------------------------------------------------------
                ROW 2 - TILE 8: Warm Sand/Beige Stat Card (Results)
                ------------------------------------------------------------------- */}
            <div className="bg-[#DFCEBF] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square">
              {/* Eyebrow with Dash */}
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#172228]/60">
                <span className="w-4 h-[1px] bg-[#172228]/40" />
                <span>RESULTS</span>
              </div>

              {/* Stat & Description */}
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-[#172228] mb-4">
                  100%
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#172228]/80">
                  With a focus on excellence, we consistently deliver 100% results, ensuring complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ORIGIN SECTION: 2-Column Story matching user reference screenshot
            Left: Dash Eyebrow & Main Title (Plus Jakarta Sans)
            Right: Narrative Paragraphs on Plain-Language Law
            ========================================================================= */}
        <section className="w-full pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Eyebrow + Headline */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[#C65378] mb-5 sm:mb-6">
                <span>ORIGIN</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827]">
                Started in India, in 2020.
              </h2>
            </div>

            {/* Right Column: Editorial Narrative Paragraphs */}
            <div className="lg:col-span-7 space-y-6 text-[#49585F] text-[1.05rem] sm:text-[1.15rem] leading-[1.75] font-normal">
              <p>
                Too many families were putting these decisions off, not because they did not care, but because the process made them hard to face. Wills, probate, and succession arrangements were full of confusing forms, legal jargon, and costs that were hard to understand when families needed clarity most.
              </p>

              <p>
                Our team thought there was a calmer, more transparent version. So we built one. A Will you can draft in 20 minutes with verified legal clauses. Probate at a fixed fee, prepared and vetted by qualified advocates on staff. Seamless execution with zero confusing legalese or hidden expenses.
              </p>

              <p>
                Six years on, we&apos;ve helped thousands of families put their estates in order. The work has never felt routine.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HOW WE OPERATE SECTION: 3 Columns matching user reference screenshot
            ========================================================================= */}
        <section className="w-full pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 border-t border-[#172228]/10">
          {/* Eyebrow with dash */}
          <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[#C65378] mb-4 sm:mb-5">
            <span className="w-6 h-[1.5px] bg-[#C65378]" />
            <span>HOW WE OPERATE</span>
          </div>

          {/* Heading (Plus Jakarta Sans) */}
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-medium leading-[1.14] tracking-[-0.025em] text-[#111827] mb-12 sm:mb-16">
            Three things we hold to.
          </h2>

          {/* 3 Columns Grid with subtle top border */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-8 sm:pt-10 border-t border-[#172228]/10">
            {/* Column 1 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center mb-5">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-[1.35rem] font-medium text-[#111827] mb-3">
                You&apos;ll talk to a person.
              </h3>
              <p className="text-[#49585F] text-[15px] sm:text-[15.5px] leading-[1.65]">
                No bots, no scripts, no waiting on hold. We pick up because someone in your shoes deserves a person on the other end.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center mb-5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-[1.35rem] font-medium text-[#111827] mb-3">
                Our prices stay put.
              </h3>
              <p className="text-[#49585F] text-[15px] sm:text-[15.5px] leading-[1.65]">
                The figure we quote is the figure you pay. No upsells, no last-minute additions, no commissions paid to staff.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center mb-5">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-[1.35rem] font-medium text-[#111827] mb-3">
                We sweat the legal detail.
              </h3>
              <p className="text-[#49585F] text-[15px] sm:text-[15.5px] leading-[1.65]">
                Wills built by lawyers, kept current with changes in state law. The careful, quiet work that keeps things uncontested.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
}
