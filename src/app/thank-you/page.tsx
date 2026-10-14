"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Home, Mail } from "lucide-react";

function ThankYouContent() {
  return (
    <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#172228]/10 text-center animate-fade-in">
      {/* Success Icon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#10B981]/15 text-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.2} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-medium text-[#111827] leading-tight tracking-tight mb-4">
        Thank You for Contacting Us!
      </h1>

      <p className="text-base sm:text-lg text-[#55636D] leading-relaxed max-w-md mx-auto mb-6 font-normal">
        We will reach out to you soon.
      </p>

      {/* Email */}
      <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#172228]/10 text-sm text-[#55636D] mb-6">
        <Mail className="w-4 h-4 text-[#C65378]" />
        <span>Email:</span>
        <a
          href="mailto:hello@willdrafting.in"
          className="font-semibold text-[#111827] hover:text-[#C65378] transition-colors underline"
        >
          hello@willdrafting.in
        </a>
      </div>

      {/* Go Back to Home Button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#C65378] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#9F3B5C] transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Go Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Suspense fallback={<div className="text-center p-8">Loading submission details...</div>}>
          <ThankYouContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
