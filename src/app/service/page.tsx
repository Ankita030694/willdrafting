import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Process from "@/components/process";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Will Drafting & Registration Help",
  description:
    "Fast online Will drafting in minutes, instant court-ready printouts, legal verification by Indian advocates, and hassle-free registration guidance.",
  alternates: {
    canonical: "https://www.willdrafting.in/service",
  },
  openGraph: {
    title: "Online Will Drafting & Registration Help | WillDrafting.in",
    description:
      "Fast online Will drafting in minutes, instant court-ready printouts, legal verification by Indian advocates, and hassle-free registration guidance.",
    url: "https://www.willdrafting.in/service",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting & Registration Services in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Will Drafting & Registration Help | WillDrafting.in",
    description:
      "Fast online Will drafting in minutes, instant court-ready printouts, legal verification by Indian advocates, and hassle-free registration guidance.",
    images: ["/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/service#service",
      "name": "Online Will Drafting & Registration Guidance",
      "serviceType": "Legal Will Preparation & Estate Succession",
      "provider": {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      "areaServed": {
        "@type": "Country",
        "name": "India",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Will Drafting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Online Legal Will Drafting (Court-Ready Printout)",
              "description":
                "Create a legally binding, lawyer-verified Will online in minutes with instant court-ready PDF download.",
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/service#breadcrumb",
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
          "name": "Services",
          "item": "https://www.willdrafting.in/service",
        },
      ],
    },
  ],
};

interface ServiceCard {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  isComingSoon?: boolean;
  illustrationSrc: string;
}

const services: ServiceCard[] = [
  {
    title: "Online Will Drafting",
    description:
      "Create a professionally structured legal Will online from the comfort of your home. Clearly document your wishes, protect your assets, provide for your family and children, and have your Will reviewed by WillDrafting Law.",
    linkText: "Write your Will",
    linkHref: "/start",
    illustrationSrc: "/new1servcie.png",
  },
  {
    title: "Coming Soon",
    description:
      "Power of Attorney and additional estate planning services in India are coming soon, giving you more ways to plan, manage and protect your family's legal and financial interests.",
    linkText: "Coming Soon",
    isComingSoon: true,
    illustrationSrc: "/comingsoon.png",
  },
];

export default function ServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-20">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="mb-8 sm:mb-12 max-w-[1200px]">
            <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
              <span>Will Drafting Services</span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
              Protect What You’ve Built. <br /> Secure Who You Leave Behind.
            </h1>

            <p className="text-[1.05rem] sm:text-[1.18rem] leading-[1.65] text-[#49585F] font-normal max-w-[720px]">
              <span className="font-bold">Lawyer-drafted Wills, estate planning and succession solutions tailored to your family, assets and wishes. Ensure your property, investments, business interests and beneficiaries</span> are clearly protected through a legally sound Will under applicable Indian succession laws.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SERVICES CARDS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#1B2A4A]/5"
              >
                <div className="relative w-full bg-gradient-to-b from-[#F5EBF4]/40 to-transparent flex items-center justify-center h-[220px] sm:h-[285px] overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={service.illustrationSrc}
                      alt={
                        service.title === "Online Will Drafting"
                          ? "Online Will Drafting under Indian Succession Act 1925"
                          : "Estate planning and Power of Attorney services coming soon"
                      }
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain scale-[1.2] transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-[1.75rem] font-medium text-[#111827] mb-3 group-hover:text-[#C65378] transition-colors duration-200">
                      {service.title}
                    </h2>
                    <p className="text-[#49585F] text-[15px] sm:text-[16px] leading-[1.6] mb-8 font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {service.isComingSoon ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] bg-[#F5EBF4] px-4 py-2 rounded-full">
                        Coming Soon
                      </span>
                    ) : (
                      <Link
                        href={service.linkHref || "/start"}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] group/link hover:text-[#C65378] transition-colors"
                      >
                        <span>{service.linkText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Process />
      </main>

      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
