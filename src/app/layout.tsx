import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import GlobalPopup from "@/components/GlobalPopup";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WillDrafting.com — Your Wishes. Your Family. Legally Protected.",
  description:
    "India's premier Legal-Tech Will platform. Answer simple questions, organize family and assets, and receive a professionally drafted Will reviewed by a qualified lawyer.",
  keywords: [
    "will drafting",
    "online will India",
    "Indian Succession Act 1925",
    "will registration",
    "lawyer verified will",
    "estate planning India",
    "legaltech",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">
        {children}
        <GlobalPopup />
      </body>
    </html>
  );
}

