import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Online Will Drafting Questionnaire | WillDrafting.in",
  },
  description:
    "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
  alternates: {
    canonical: "https://www.willdrafting.in/start",
    languages: {
      "en-IN": "https://www.willdrafting.in/start",
      "x-default": "https://www.willdrafting.in/start",
    },
  },
  openGraph: {
    title: "Online Will Drafting Questionnaire | WillDrafting.in",
    description:
      "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
    url: "https://www.willdrafting.in/start",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting Questionnaire India - WillDrafting.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Will Drafting Questionnaire | WillDrafting.in",
    description:
      "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
    images: ["https://www.willdrafting.in/desktopusp.jpg"],
  },
  // Paid customers only since pay-first (27 Nov 2026): keep the questionnaire out of search.
  robots: {
    index: false,
    follow: true,
  },
};

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
