import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Online Will Drafting Questionnaire | WillDrafting.in",
  },
  description:
    "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
  alternates: {
    canonical: "https://www.willdrafting.in/start",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
