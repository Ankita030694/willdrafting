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
  metadataBase: new URL("https://www.willdrafting.in"),
  title: {
    default: "WillDrafting.in — Legally Valid Online Will in Minutes",
    template: "%s | WillDrafting.in",
  },
  description:
    "Draft your legally valid Will online in minutes under the Indian Succession Act. Enter details, download court-ready printout & register hassle-free.",
  keywords: [
    "will drafting",
    "online will India",
    "Indian succession law",
    "will registration",
    "lawyer verified will",
    "estate planning India",
    "legal will printout",
    "make a will in minutes",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in",
  },
  openGraph: {
    title: "WillDrafting.in — Legally Valid Online Will in Minutes",
    description:
      "Draft your legally valid Will online in minutes under the Indian Succession Act. Enter details, download court-ready printout & register hassle-free.",
    url: "https://www.willdrafting.in",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "WillDrafting.in - Legally Valid Online Wills in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WillDrafting.in — Legally Valid Online Will in Minutes",
    description:
      "Draft your legally valid Will online in minutes under the Indian Succession Act. Enter details, download court-ready printout & register hassle-free.",
    images: ["/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/Logofinal.svg", type: "image/svg+xml" }],
    shortcut: "/Logofinal.svg",
    apple: "/Logofinal.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const GLOBAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": "https://www.willdrafting.in/#legalservice",
      "name": "WillDrafting.in",
      "url": "https://www.willdrafting.in",
      "logo": "https://www.willdrafting.in/Logofinal.svg",
      "image": "https://www.willdrafting.in/desktopusp.jpg",
      "description":
        "India's premier legal-tech platform for lawyer-verified online testamentary Wills under Indian succession law.",
      "email": "hello@willdrafting.in",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Delhi / Mumbai",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          "opens": "09:00",
          "closes": "20:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.willdrafting.in/#website",
      "url": "https://www.willdrafting.in",
      "name": "WillDrafting.in",
      "description":
        "Legally valid online will drafting and estate succession planning in India.",
      "publisher": {
        "@id": "https://www.willdrafting.in/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.willdrafting.in/#organization",
      "name": "WillDrafting.in",
      "url": "https://www.willdrafting.in",
      "logo": "https://www.willdrafting.in/Logofinal.svg",
      "sameAs": [
        "https://twitter.com/willdrafting",
        "https://linkedin.com/company/willdrafting",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SCHEMA) }}
        />
      </head>
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
