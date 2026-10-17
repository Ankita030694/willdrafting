import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Profile",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CompleteProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
