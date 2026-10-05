import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, FileText, HelpCircle, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#172228]/5">
          <span className="inline-block text-[#C65378] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#172228] mb-4">
            Page Not Found
          </h1>
          <p className="text-base text-[#55636D] leading-relaxed mb-8">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you get back on track to protecting your legacy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#172228] text-white text-sm font-medium hover:bg-[#204031] transition-colors"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/how-it-works"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F0] text-[#172228] border border-[#172228]/10 text-sm font-medium hover:bg-[#F2EFE8] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F0] text-[#172228] border border-[#172228]/10 text-sm font-medium hover:bg-[#F2EFE8] transition-colors"
            >
              <FileText className="w-4 h-4" />
              Pricing & Plans
            </Link>
            <Link
              href="/contactus"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F0] text-[#172228] border border-[#172228]/10 text-sm font-medium hover:bg-[#F2EFE8] transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Contact Support
            </Link>
          </div>

          <div className="pt-6 border-t border-[#172228]/5 text-xs text-[#55636D]">
            Need immediate legal guidance? Call our legal desk at <a href="tel:+919820098765" className="font-semibold text-[#172228] underline underline-offset-2">+91 98200 98765</a>.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
