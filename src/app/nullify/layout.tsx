import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | WillDrafting.in",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function NullifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
