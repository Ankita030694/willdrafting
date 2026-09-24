import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalPopup from "@/components/GlobalPopup";
import StyledJsxRegistry from "./registry";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased">
        <StyledJsxRegistry>
          {children}
          <GlobalPopup />
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

