"use client";

import React, { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";

interface CopyableTrustClauseBoxProps {
  title: string;
  code: string;
  explanation: string;
}

export default function CopyableTrustClauseBox({
  title,
  code,
  explanation,
}: CopyableTrustClauseBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full rounded-[24px] bg-[#172228] text-white p-6 sm:p-8 shadow-[0_8px_32px_rgba(23,34,40,0.15)] overflow-hidden my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#C65378]/20 flex items-center justify-center text-[#C65378]">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm sm:text-base text-white tracking-wide">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-[#C65378] text-white border border-white/15 transition-all self-start sm:self-auto cursor-pointer"
          aria-label="Copy legal clause to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#34D399]" />
              <span className="text-[#34D399]">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Legal Format</span>
            </>
          )}
        </button>
      </div>

      <pre className="font-mono text-xs sm:text-[13px] leading-[1.65] bg-black/30 p-5 rounded-xl text-gray-200 overflow-x-auto whitespace-pre-wrap select-all border border-white/5">
        {code}
      </pre>

      <p className="mt-4 text-xs text-gray-400 leading-relaxed border-t border-white/10 pt-3">
        <strong className="text-gray-200">Statutory Notice:</strong> {explanation}
      </p>
    </div>
  );
}
