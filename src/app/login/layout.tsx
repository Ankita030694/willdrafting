import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Securely sign in to your WillDrafting account to manage, edit, or download your legal will.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
