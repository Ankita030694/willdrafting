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
  title: "About Us — Hassle-Free Online Wills",
  description:
    "Learn how WillDrafting.in helps Indian families draft, download court-ready Wills in minutes, and register with ease under applicable Indian law.",
  alternates: {
    canonical: "https://www.willdrafting.in/aboutus",
  },
  openGraph: {
    title: "About Us | Hassle-Free Online Wills | WillDrafting.in",
    description:
      "Learn how WillDrafting.in helps Indian families draft, download court-ready Wills in minutes, and register with ease under applicable Indian law.",
    url: "https://www.willdrafting.in/aboutus",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "About WillDrafting.in - Protecting Legacies Across Generations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Hassle-Free Online Wills | WillDrafting.in",
    description:
      "Learn how WillDrafting.in helps Indian families draft, download court-ready Wills in minutes, and register with ease under applicable Indian law.",
    images: ["/desktopusp.jpg"],
  },
};

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.willdrafting.in/aboutus#webpage",
      "url": "https://www.willdrafting.in/aboutus",
      "name": "About Us | Hassle-Free Online Wills | WillDrafting.in",
      "description":
        "Learn how WillDrafting.in helps Indian families draft, download court-ready Wills in minutes, and register with ease under applicable Indian law.",
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/aboutus#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/aboutus#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://www.willdrafting.in/aboutus",
        },
      ],
    },
  ],
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
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
          <h1 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
            Protecting your legacy. Securing your family’s future.
          </h1>

          {/* Subheading in Centre */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#55636D] font-normal max-w-2xl mx-auto">
            We provide personalised <span className="font-bold">Will drafting, estate planning and succession services</span> to help protect your assets, honour your wishes, and give your family clarity when it matters most.
          </p>
        </div>

        {/* =========================================================================
            CHECKERBOARD MOSAIC HERO SECTION
            ========================================================================= */}
        <section className="w-full rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {/* ROW 1 - TILE 1: Dark Stat Card (Cases) */}
            <div className="bg-[#C65378] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
                <span>WILLS DRAFTED</span>
              </div>
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-white mb-4">
                  500+
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-white/70">
                  Professionally drafted Wills helping families protect their assets, express their wishes, and plan for a secure future.
                </p>
              </div>
            </div>

            {/* ROW 1 - TILE 2: Photo Portrait (Advocate) */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden">
              <Image
                src="/1.jpg"
                alt="Senior legal advocate reviewing Indian estate succession documents"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* ROW 1 - TILE 3: Dark Stat Card (Clients) */}
            <div className="bg-[#C65378] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square border-t sm:border-t-0 border-[#172228]/10">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
                <span>FAMILIES PROTECTED</span>
              </div>
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-white mb-4">
                  300+
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-white/70">
                  Helping families with personalised Will drafting, estate planning, and succession guidance tailored to their unique needs.
                </p>
              </div>
            </div>

            {/* ROW 1 - TILE 4: Photo Portrait (Attorney Desk) */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden">
              <Image
                src="/2.jpg"
                alt="Legal consultation desk for online testamentary will drafting"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* ROW 2 - TILE 5: Photo Portrait */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden group">
              <Image
                src="/3.jpg"
                alt="Legal counsel advising Indian client on inheritance and asset protection"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* ROW 2 - TILE 6: Warm Sand/Beige Stat Card (Commitment) */}
            <div className="bg-[#DFCEBF] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#172228]/60">
                <span>COMMITMENT</span>
              </div>
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-[#172228] mb-4">
                  100%
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#172228]/80">
                  Every Will is carefully prepared around your family, assets, beneficiaries, and wishes, with clarity at every step.
                </p>
              </div>
            </div>

            {/* ROW 2 - TILE 7: Photo Portrait (Service Consultation) */}
            <div className="relative aspect-square w-full h-full min-h-[300px] bg-neutral-800 overflow-hidden">
              <Image
                src="/4.jpg"
                alt="Lawyer verifying clauses under Indian estate succession law"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* ROW 2 - TILE 8: Warm Sand/Beige Stat Card (Results) */}
            <div className="bg-[#DFCEBF] p-8 sm:p-10 lg:p-12 flex flex-col justify-between aspect-square">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#172228]/60">
                <span>PEACE OF MIND</span>
              </div>
              <div className="mt-auto">
                <div className="text-5xl sm:text-6xl font-medium tracking-tight text-[#172228] mb-4">
                  100%
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#172228]/80">
                  Clear estate planning and legally sound Will drafting designed to reduce uncertainty and help protect what matters most to your family.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ORIGIN SECTION: 2-Column Story
            ========================================================================= */}
        <section className="w-full pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[#C65378] mb-5 sm:mb-6">
                <span>ORIGIN</span>
              </div>

              <h2 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.2rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827]">
                Built in India, for families planning what comes next.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#49585F] text-[1.05rem] sm:text-[1.15rem] leading-[1.75] font-normal">
              <p>
                Too many families put off making a Will, not because they do not care, but because talking about what happens after them can feel difficult. Property, investments, businesses, beneficiaries, and succession can quickly become complicated when there is no clear plan in place.
              </p>

              <p>
                We believed there should be a simpler, more thoughtful way. So we built a practice around it. Professional Will drafting and estate planning that turns your wishes into a clear legal document, with carefully considered clauses, personalised asset distribution, and guidance designed around your family.
              </p>

              <p>
                Our advocates help families create legally sound Wills, plan succession, protect their assets, and reduce the uncertainty that can lead to future family disputes. Every Will is drafted with care because what may be a legal document to us is a lifetime of work and the future of a family to you.
              </p>
              <p>
                Today, we help families across India put their estates in order. The responsibility has never felt routine.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HOW WE OPERATE SECTION: 3 Columns
            ========================================================================= */}
        <section className="w-full pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 border-t border-[#172228]/10">
          <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[#C65378] mb-4 sm:mb-5">
            <span className="w-6 h-[1.5px] bg-[#C65378]" />
            <span>HOW WE OPERATE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-medium leading-[1.14] tracking-[-0.025em] text-[#111827] mb-12 sm:mb-16">
            Three things we believe in.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-8 sm:pt-10 border-t border-[#172228]/10">
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center mb-5">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-[1.35rem] font-medium text-[#111827] mb-3">
                You&apos;ll talk to a person.
              </h3>
              <p className="text-[#49585F] text-[15px] sm:text-[15.5px] leading-[1.65]">
                No confusing forms, automated answers, or legal jargon. You speak with someone who takes the time to understand your family, assets, wishes, and concerns because <strong className="font-medium text-[#111827]">Will drafting is about more than paperwork.</strong>
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center mb-5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-[1.35rem] font-medium text-[#111827] mb-3">
                Our process stays transparent.
              </h3>
              <p className="text-[#49585F] text-[15px] sm:text-[15.5px] leading-[1.65]">
                The advice you receive is clear from the beginning. No hidden surprises, unnecessary upsells, or confusing charges. Just straightforward guidance through <strong className="font-medium text-[#111827]">Will drafting, estate planning, and succession planning.</strong>
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center mb-5">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-xl sm:text-[1.35rem] font-medium text-[#111827] mb-3">
                We sweat the legal detail.
              </h3>
              <p className="text-[#49585F] text-[15px] sm:text-[15.5px] leading-[1.65]">
                Every Will is carefully drafted around your circumstances, beneficiaries, assets, and wishes. We pay close attention to the legal details that can help protect your legacy, reduce ambiguity, and give your family greater clarity when it matters most.
              </p>
            </div>
          </div>
        </section>
      </main>

      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
