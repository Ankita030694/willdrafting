import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Sign In to Your Account | WillDrafting.in",
  },
  description:
    "Securely sign in to your WillDrafting account to manage, edit, or download your legal will.",
  alternates: {
    canonical: "https://www.willdrafting.in/login",
  },
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
