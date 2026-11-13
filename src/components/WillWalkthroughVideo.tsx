"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  WALKTHROUGH_CHAPTERS,
  WALKTHROUGH_VIDEO_META,
} from "@/lib/videoSchema";

export interface WillWalkthroughVideoProps {
  id?: string;
  variant?: "showcase" | "embedded";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  /** Set false ONLY if rendered before a page's single <h2> tag */
  useHeadingTag?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function WillWalkthroughVideo({
  id = "walkthrough-video",
  variant = "showcase",
  eyebrow = "60-Second Guided Demo",
  heading = "See How Your Online Will Comes Together in 1 Minute",
  subheading = "Watch every step before you start: add family and assets, split shares, run a legal gap check, and print on plain white paper.",
  useHeadingTag = true,
  ctaText = "Begin Step 1 Free",
  ctaHref = "/start/01",
}: WillWalkthroughVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playFromTime = (seconds?: number) => {
    const vid = videoRef.current;
    setHasStarted(true);
    if (!vid) return;
    if (typeof seconds === "number" && Number.isFinite(seconds)) {
      try {
        vid.currentTime = seconds;
      } catch {
        // Metadata not loaded yet; seek once loadedmetadata fires
        const onLoaded = () => {
          vid.currentTime = seconds;
          vid.removeEventListener("loadedmetadata", onLoaded);
        };
        vid.addEventListener("loadedmetadata", onLoaded);
      }
      setCurrentTime(seconds);
    }
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay fallback: retry muted if browser policy blocks unmuted programmatic play
        vid.muted = true;
        setIsMuted(true);
        vid.play().catch(() => {});
      });
    }
  };

  useEffect(() => {
    const handleTriggerPlay = (event: Event) => {
      const custom = event as CustomEvent<{ time?: number }>;
      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      playFromTime(custom.detail?.time);
    };

    window.addEventListener("play-will-walkthrough", handleTriggerPlay);

    // Support Google Search "Key Moments" Clip deep-links (?t=16#walkthrough-video)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tParam = params.get("t");
      const hashMatches = window.location.hash === `#${id}`;
      if (tParam !== null && (hashMatches || Number(tParam) > 0)) {
        const parsed = Number(tParam);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 62) {
          const vid = videoRef.current;
          if (vid) {
            vid.muted = true;
            const onMeta = () => {
              vid.currentTime = parsed;
              setHasStarted(true);
              setIsMuted(true);
              setCurrentTime(parsed);
              vid.removeEventListener("loadedmetadata", onMeta);
            };
            vid.addEventListener("loadedmetadata", onMeta);
            vid.load();
          }
        }
      }
    }

    return () => {
      window.removeEventListener("play-will-walkthrough", handleTriggerPlay);
    };
  }, [id]);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const activeChapterId =
    WALKTHROUGH_CHAPTERS.find(
      (c) => currentTime >= c.startOffset && currentTime < c.endOffset
    )?.id ?? null;

  const HeadingElement = useHeadingTag ? "h3" : "div";

  return (
    <div
      id={id}
      className={`scroll-mt-24 w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#172228]/10 shadow-[0_16px_48px_-18px_rgba(23,34,40,0.09)] ${
        variant === "embedded"
          ? "p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8"
          : "p-4 sm:p-7 lg:p-9"
      }`}
    >
      {/* Top Header Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5 sm:mb-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C65378]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{eyebrow}</span>
          </div>

          <HeadingElement className="text-[1.35rem] sm:text-[1.75rem] lg:text-[2rem] font-semibold text-[#172228] leading-[1.16] tracking-[-0.02em]">
            {heading}
          </HeadingElement>

          <p className="mt-2 text-xs sm:text-sm text-[#49585F] leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Right Quick Meta & Sound Toggle */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] border border-[#172228]/10 px-3 py-1.5 text-xs font-semibold text-[#172228]">
            <Clock className="w-3.5 h-3.5 text-[#C65378]" />
            <span>1 Min 02 Sec</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] border border-[#172228]/10 px-3 py-1.5 text-xs font-semibold text-[#172228]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
            <span>Section 63 Valid</span>
          </span>
          {hasStarted && (
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute walkthrough audio" : "Mute walkthrough audio"}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#172228] text-white px-3 py-1.5 text-xs font-semibold hover:bg-[#263640] transition cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#EFB3C6]" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#EFB3C6]" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 16:9 Cinema Video Frame */}
      <div className="relative w-full aspect-video rounded-[20px] sm:rounded-[26px] overflow-hidden bg-[#FAF7F0] border border-[#172228]/10 shadow-[0_10px_30px_-12px_rgba(23,34,40,0.12)] group">
        <video
          ref={videoRef}
          controls={hasStarted}
          playsInline
          preload="none"
          poster={WALKTHROUGH_VIDEO_META.posterPath}
          aria-label={WALKTHROUGH_VIDEO_META.title}
          onPlay={() => {
            setHasStarted(true);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onVolumeChange={() => {
            if (videoRef.current) {
              setIsMuted(videoRef.current.muted);
            }
          }}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          className="w-full h-full object-cover bg-[#FAF7F0]"
        >
          <source src="/videos/willdrafting-intro.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/videos/willdrafting-intro.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support HTML5 video.
        </video>

        {/* Zero-Byte Initial Poster Facade & Tactile Play Button */}
        {!hasStarted && (
          <button
            type="button"
            onClick={() => playFromTime(0)}
            aria-label="Play 60-second online Will drafting walkthrough video"
            className="absolute inset-0 w-full h-full text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C65378]/50"
          >
            <Image
              src={WALKTHROUGH_VIDEO_META.posterPath}
              alt="Step-by-step online Will drafting walkthrough on WillDrafting.in"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1280px"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            />

            {/* Soft contrast wash so center play control pops without hiding UI preview */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172228]/35 via-transparent to-[#172228]/10 transition-opacity duration-300 group-hover:opacity-90" />

            {/* Top-Right Feature Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 absolute top-4 right-4 rounded-full bg-white/92 backdrop-blur-xs border border-[#172228]/10 px-3.5 py-1.5 text-[11px] font-bold text-[#172228] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span>Works Without Sound · Captioned</span>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#C65378] text-white shadow-[0_18px_45px_rgba(198,83,120,0.55)] ring-8 ring-white/85 transition-transform duration-300 group-hover:scale-108 group-active:scale-95">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </div>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#172228]/90 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-[13px] font-semibold text-white shadow-md">
                <span>Watch 1-Minute Walkthrough</span>
                <span className="text-white/65">· 1:02</span>
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Interactive Jump-to-Step Chapters */}
      <div className="mt-4 sm:mt-5">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#49585F]">
            Jump to Any Step in the Video
          </span>
          {isPlaying && (
            <span className="text-[11px] font-semibold text-[#C65378]">
              Playing walkthrough…
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {WALKTHROUGH_CHAPTERS.map((chapter) => {
            const isActive = activeChapterId === chapter.id && hasStarted;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => playFromTime(chapter.startOffset)}
                className={`text-left rounded-2xl p-2.5 sm:p-3 border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FDF1F5] border-[#C65378] shadow-xs"
                    : "bg-[#FAF7F0] border-[#172228]/8 hover:border-[#C65378]/50 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? "text-[#C65378]" : "text-[#55636D]"
                    }`}
                  >
                    {chapter.stepBadge}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-[#C65378] text-white"
                        : "bg-white text-[#172228]/70 border border-[#172228]/8"
                    }`}
                  >
                    {chapter.timeLabel}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#172228] leading-snug">
                  {chapter.label}
                </div>
                <div className="text-[11px] text-[#49585F] leading-tight mt-0.5 line-clamp-1">
                  {chapter.shortDesc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Reassurance & Direct Questionnaire Action */}
      <div className="mt-5 pt-4 border-t border-[#172228]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#49585F]">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>No property papers needed to start</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>Auto-saved with 256-bit encryption</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>Print on plain A4 paper</span>
          </span>
        </div>

        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C65378] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#a83d5f] transition shrink-0"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
