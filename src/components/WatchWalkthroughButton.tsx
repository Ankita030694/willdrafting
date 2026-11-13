"use client";

import React from "react";
import { Play } from "lucide-react";

interface WatchWalkthroughButtonProps {
  targetId?: string;
  label?: string;
  className?: string;
}

export default function WatchWalkthroughButton({
  targetId = "walkthrough-video",
  label = "Watch 1-Min Walkthrough",
  className,
}: WatchWalkthroughButtonProps) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.dispatchEvent(new CustomEvent("play-will-walkthrough", { detail: { time: 0 } }));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#C65378]/30 bg-[#FDF1F5] px-5 py-3.5 text-sm font-bold text-[#C65378] shadow-2xs transition hover:border-[#C65378] hover:bg-[#C65378]/12 sm:w-auto cursor-pointer"
      }
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C65378] text-white shrink-0">
        <Play size={10} className="fill-current ml-0.5" />
      </span>
      <span>{label}</span>
    </button>
  );
}
