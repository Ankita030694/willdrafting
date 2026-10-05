import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Will Drafting Questionnaire",
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
