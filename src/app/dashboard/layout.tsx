import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Dashboard & Will Vault",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
