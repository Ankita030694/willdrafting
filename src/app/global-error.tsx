"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global root error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#FAF7F0] text-[#172228] p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-[#172228]/10 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#E11D48]/10 flex items-center justify-center text-[#E11D48]">
            <AlertCircle className="w-7 h-7" />
          </div>

          <span className="inline-block text-[#C65378] text-xs font-bold tracking-widest uppercase mb-2">
            System Notice
          </span>
          <h1 className="text-2xl font-bold text-[#172228] mb-3">
            Application Error
          </h1>

          <p className="text-sm text-[#55636D] leading-relaxed mb-6">
            An unexpected error occurred. Your draft data is safely saved in your browser storage.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#172228] text-white text-sm font-medium hover:bg-[#204031] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>

            <a
              href="/start"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F0] text-[#172228] border border-[#172228]/15 text-sm font-medium hover:bg-[#F2EFE8] transition-colors text-center"
            >
              Resume Will
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
