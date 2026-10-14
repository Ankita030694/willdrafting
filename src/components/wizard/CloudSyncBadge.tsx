"use client";

import React from "react";
import { Check, Loader2, WifiOff, AlertCircle } from "lucide-react";
import { useWillStore } from "@/lib/useWillStore";

interface CloudSyncBadgeProps {
  className?: string;
  lang?: "en" | "hi";
}

export default function CloudSyncBadge({ className = "", lang = "en" }: CloudSyncBadgeProps) {
  const syncStatus = useWillStore((s) => s.syncStatus);
  const isHi = lang === "hi";

  if (syncStatus === "saving") {
    return (
      <div
        className={`cloud-sync-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 whitespace-nowrap shrink-0 transition-all duration-200 ${className}`}
        title={isHi ? "क्लाउड पर सहेजा जा रहा है..." : "Saving to cloud..."}
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500 shrink-0" />
        <span>{isHi ? "सहेजा जा रहा है..." : "Saving..."}</span>
      </div>
    );
  }

  if (syncStatus === "offline") {
    return (
      <div
        className={`cloud-sync-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-stone-500/10 text-stone-600 dark:text-stone-300 border-stone-400/20 whitespace-nowrap shrink-0 transition-all duration-200 ${className}`}
        title={isHi ? "ऑफ़लाइन: केवल स्थानीय रूप से सहेजा गया" : "Offline: Saved to local storage"}
      >
        <WifiOff className="w-3.5 h-3.5 text-stone-500 shrink-0" />
        <span>{isHi ? "स्थानीय सहेजा गया (ऑफ़लाइन)" : "Saved locally (Offline)"}</span>
      </div>
    );
  }

  if (syncStatus === "error") {
    return (
      <button
        type="button"
        onClick={() => void useWillStore.getState().flushSyncNow()}
        className={`cloud-sync-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/20 cursor-pointer whitespace-nowrap shrink-0 transition-all duration-200 ${className}`}
        title={isHi ? "क्लिक करके पुनः सहेजें" : "Click to retry sync now"}
      >
        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
        <span>{isHi ? "सिंक विफल · पुनः प्रयास करें" : "Sync delayed · Click to Retry"}</span>
      </button>
    );
  }

  // "saved" or "idle"
  return (
    <div
      className={`cloud-sync-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 whitespace-nowrap shrink-0 transition-all duration-200 ${className}`}
      title={isHi ? "स्वतः सहेजा गया" : "Auto saved to cloud and local storage"}
    >
      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span>{isHi ? "स्वतः सहेजा गया" : "Auto Saved"}</span>
    </div>
  );
}
