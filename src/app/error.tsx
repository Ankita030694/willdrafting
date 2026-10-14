"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for observability
    console.error("Application error boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] text-[#172228] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-[#172228]/10 text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#E11D48]/10 flex items-center justify-center text-[#E11D48]">
          <AlertCircle className="w-7 h-7" />
        </div>

        <span className="inline-block text-[#C65378] text-xs font-bold tracking-widest uppercase mb-2">
          Notice
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172228] mb-3">
          Something went wrong
        </h1>

        <p className="text-sm text-[#55636D] leading-relaxed mb-6">
          We encountered an unexpected issue while loading this page. 
          <strong className="block mt-1 text-[#172228]">
            Your draft data is safely preserved in your browser.
          </strong>
        </p>

        {error?.message && (
          <div className="p-3 mb-6 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-left">
            <p className="text-xs text-[#55636D] font-mono break-words">
              {error.message.length > 150 ? `${error.message.substring(0, 150)}...` : error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#172228] text-white text-sm font-medium hover:bg-[#204031] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/start"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F0] text-[#172228] border border-[#172228]/15 text-sm font-medium hover:bg-[#F2EFE8] transition-colors"
          >
            <Home className="w-4 h-4" />
            Resume Will
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-[#172228]/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#55636D] hover:text-[#172228] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
