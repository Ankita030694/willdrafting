import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Authority Portal | WillDrafting.in",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AuthorityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
