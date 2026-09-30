import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalPopup from "@/components/GlobalPopup";
import StyledJsxRegistry from "./registry";
import { LanguageProvider } from "@/context/LanguageContext";

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
      { url: "/Logofinal.svg", type: "image/svg+xml" },
    ],
    shortcut: "/Logofinal.svg",
    apple: "/Logofinal.svg",
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
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans antialiased">
        <StyledJsxRegistry>
          <LanguageProvider>
            {children}
            <GlobalPopup />
          </LanguageProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

