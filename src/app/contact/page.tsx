import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/faq";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Legal Advisory Team",
  description:
    "Have questions about drafting or registering your Will? Speak with our legal advisory team for instant assistance with your testamentary testament.",
  alternates: {
    canonical: "https://www.willdrafting.in/contact",
  },
  openGraph: {
    title: "Contact Our Legal Advisory Team | WillDrafting.in",
    description:
      "Have questions about drafting or registering your Will? Speak with our legal advisory team for instant assistance with your testamentary testament.",
    url: "https://www.willdrafting.in/contact",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Contact WillDrafting.in Legal Advisory Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Legal Advisory Team | WillDrafting.in",
    description:
      "Have questions about drafting or registering your Will? Speak with our legal advisory team for instant assistance with your testamentary testament.",
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

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.willdrafting.in/contact#webpage",
      "url": "https://www.willdrafting.in/contact",
      "name": "Contact Our Legal Advisory Team | WillDrafting.in",
      "description":
        "Have questions about drafting or registering your Will? Speak with our legal advisory team for instant assistance with your testamentary testament.",
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/contact#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/contact#breadcrumb",
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
          "name": "Contact Us",
          "item": "https://www.willdrafting.in/contact",
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-20 mt-25">
        {/* Page Top Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827]">
            Get in touch
          </h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
          {/* Mobile Introduction Heading */}
          <div className="block lg:hidden">
            <h2 className="text-[1rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-2">
              Let’s plan what matters most.
            </h2>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-6 lg:pl-4 order-1 lg:order-2 w-full">
            <ContactForm />
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1 pt-6 lg:pt-0 border-t border-neutral-200/70 lg:border-t-0">
            <h2 className="hidden lg:block text-2xl sm:text-3xl lg:text-[2.25rem] font-medium leading-[1.22] tracking-[-0.015em] text-[#111827] mb-6">
              Have questions about making a Will? Tell us a little about what you need, and our team will help you take the next step.
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#4B5563] mb-8 sm:mb-10 max-w-[520px]">
              Whether you need Will drafting, estate planning or succession guidance, we’re here to make the process simple and clear.
            </p>

            <div className="flex flex-col space-y-5 sm:space-y-6 pt-1 pb-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] shadow-sm text-[#C65378]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">
                    Phone Number
                  </span>
                  <a
                    href="tel:+919820098765"
                    className="text-[15px] sm:text-[16px] font-medium text-[#111827] transition-colors hover:text-[#C65378]"
                  >
                    +91 98200 98765
                  </a>
                  <span className="text-xs text-[#718096] mt-0.5">
                    Monday to Saturday, 9:00 AM – 8:00 PM IST
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] shadow-sm text-[#C65378]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">
                    Email Address
                  </span>
                  <a
                    href="mailto:hello@willdrafting.in"
                    className="text-[15px] sm:text-[16px] font-medium text-[#111827] transition-colors hover:text-[#C65378]"
                  >
                    hello@willdrafting.in
                  </a>
                  <span className="text-xs text-[#718096] mt-0.5">
                    We reply within 24 hours on working days
                  </span>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] shadow-sm text-[#C65378]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">
                    Legal Advisory Desk
                  </span>
                  <p className="text-[15px] sm:text-[16px] font-medium text-[#111827]">
                    WillDrafting Legal Solutions
                  </p>
                  <span className="text-xs text-[#718096] mt-0.5">
                    Delhi & Mumbai, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FAQ />
      <Footer />
    </div>
  );
}
