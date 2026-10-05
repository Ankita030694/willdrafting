import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Phone, Home, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You — Request Received",
  description:
    "Thank you for contacting WillDrafting.in. Our legal advisory team has received your submission and will assist you shortly.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#172228]/10 text-center animate-fade-in">
          {/* Animated Success Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#10B981]/15 text-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.2} />
          </div>

          <span className="inline-block text-[#C65378] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Submission Confirmed
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#111827] leading-tight tracking-tight mb-4">
            Thank You for Reaching Out!
          </h1>

          <p className="text-base sm:text-lg text-[#55636D] leading-relaxed max-w-xl mx-auto mb-8 font-normal">
            We have securely received your details in our system. A qualified legal specialist from our estate advisory desk will review your inquiry and get in touch with you shortly.
          </p>

          {/* Quick Steps Box */}
          <div className="bg-[#FAF7F0] rounded-2xl p-6 mb-8 text-left border border-[#172228]/10 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-[#C65378] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827]">
                  Same-Day Legal Review
                </h4>
                <p className="text-xs text-[#55636D] leading-relaxed">
                  Our succession advocates review your notes and prepare custom guidance for your family&apos;s estate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-[#C65378] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827]">
                  Direct Verification Call or WhatsApp
                </h4>
                <p className="text-xs text-[#55636D] leading-relaxed">
                  We will answer your questions regarding executor appointment, minor child guardianship, and Sub-Registrar registration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-[#C65378] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827]">
                  Self-Guided 15-Minute Will Tool
                </h4>
                <p className="text-xs text-[#55636D] leading-relaxed">
                  You don&apos;t have to wait—you can begin entering your family &amp; asset details online right now.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C65378] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#9F3B5C] transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <span>Speak with an Estate Advocate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF7F0] text-[#172228] border border-[#172228]/15 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#F2EFE8] transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>

          {/* Direct Legal Helpline */}
          <div className="pt-6 border-t border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#55636D]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Bank-Grade 256-Bit SSL Encrypted Vault</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C65378]" />
              <span>Direct Legal Desk: </span>
              <a href="tel:+919820098765" className="font-semibold text-[#111827] underline">
                +91 98200 98765
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
