import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Will Generator & Visual Studio",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function Dashboard2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
