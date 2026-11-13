const SITE_URL = "https://www.willdrafting.in";

export const WALKTHROUGH_VIDEO_META = {
  title: "How to Make a Legally Valid Online Will in India (60-Second Walkthrough)",
  description:
    "Watch how to draft a legally valid Will online in India in 10 simple steps on WillDrafting.in: add family and property, split percentage shares, appoint an executor and minor guardian, pass an automatic legal health check, choose High Court advocate review, and sign on plain paper with two witnesses under Section 63 of the Indian Succession Act, 1925.",
  mp4Url: `${SITE_URL}/videos/willdrafting-intro.mp4`,
  vttUrl: `${SITE_URL}/videos/willdrafting-intro.vtt`,
  posterPath: "/images/willdrafting-walkthrough-poster.jpg",
  posterUrl: `${SITE_URL}/images/willdrafting-walkthrough-poster.jpg`,
  uploadDate: "2026-11-13T15:35:00+05:30",
  durationIso: "PT1M2S",
  durationSeconds: 62,
} as const;

export interface VideoChapterClip {
  id: string;
  stepBadge: string;
  label: string;
  shortDesc: string;
  startOffset: number;
  endOffset: number;
  timeLabel: string;
}

export const WALKTHROUGH_CHAPTERS: VideoChapterClip[] = [
  {
    id: "family-details",
    stepBadge: "Steps 1–2",
    label: "You & Family",
    shortDesc: "Basic details & legal heirs",
    startOffset: 8,
    endOffset: 16,
    timeLabel: "0:08",
  },
  {
    id: "assets-shares",
    stepBadge: "Steps 3–4",
    label: "Assets & Shares",
    shortDesc: "Property list & % split",
    startOffset: 16,
    endOffset: 24,
    timeLabel: "0:16",
  },
  {
    id: "executor-guardian",
    stepBadge: "Steps 5–6",
    label: "Executor & Guardian",
    shortDesc: "Trusted executor & minor care",
    startOffset: 24,
    endOffset: 32,
    timeLabel: "0:24",
  },
  {
    id: "health-check",
    stepBadge: "Auto Audit",
    label: "Legal Health Check",
    shortDesc: "100-point gap scan",
    startOffset: 32,
    endOffset: 36,
    timeLabel: "0:32",
  },
  {
    id: "will-draft",
    stepBadge: "Auto Draft",
    label: "Clause Assembly",
    shortDesc: "Court-ready Will PDF",
    startOffset: 36,
    endOffset: 40,
    timeLabel: "0:36",
  },
  {
    id: "plans-signing",
    stepBadge: "Final Step",
    label: "Plans & Signing",
    shortDesc: "Lawyer review & 2 witnesses",
    startOffset: 40,
    endOffset: 52,
    timeLabel: "0:40",
  },
];

/**
 * Generates Google-compliant VideoObject + Clip ("Key Moments") JSON-LD
 * for a given canonical page URL.
 */
export function buildWalkthroughVideoSchema(canonicalPageUrl: string) {
  const cleanUrl = canonicalPageUrl.replace(/\/$/, "") || SITE_URL;
  return {
    "@type": "VideoObject",
    "@id": `${cleanUrl}#walkthrough-video`,
    name: WALKTHROUGH_VIDEO_META.title,
    description: WALKTHROUGH_VIDEO_META.description,
    thumbnailUrl: [WALKTHROUGH_VIDEO_META.posterUrl],
    uploadDate: WALKTHROUGH_VIDEO_META.uploadDate,
    duration: WALKTHROUGH_VIDEO_META.durationIso,
    contentUrl: WALKTHROUGH_VIDEO_META.mp4Url,
    embedUrl: `${cleanUrl}#walkthrough-video`,
    inLanguage: "en-IN",
    isFamilyFriendly: true,
    regionsAllowed: "IN",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "WillDrafting.in",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Logofinal.svg`,
      },
    },
    hasPart: WALKTHROUGH_CHAPTERS.map((clip) => ({
      "@type": "Clip",
      name: `${clip.stepBadge}: ${clip.label} — ${clip.shortDesc}`,
      startOffset: clip.startOffset,
      endOffset: clip.endOffset,
      url: `${cleanUrl}?t=${clip.startOffset}#walkthrough-video`,
    })),
  };
}
