import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./start/dashboard/bento.css";
import GlobalPopup from "@/components/GlobalPopup";
import StyledJsxRegistry from "./registry";
import { LanguageProvider } from "@/context/LanguageContext";
import AuthProvider from "@/components/providers/AuthProvider";
import SignupModalHost from "@/components/auth/SignupModalHost";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.willdrafting.in"),
  title: {
    default: "India's First Online Will Drafting Platform | WillDrafting.in",
    template: "%s | WillDrafting.in",
  },
  description:
    "India's first online will drafting platform. Make a legally valid online Will in India in minutes with instant court-ready PDF & advocate review by AMA Legal Solutions.",
  keywords: [
    "india's first online will drafting platform",
    "online will drafting platform india",
    "online will maker india",
    "online will drafting india",
    "make a will online india",
    "create a will online india",
    "legally valid online will india",
    "best online will maker in india",
    "digital will maker india",
    "how to make a will in india online",
    "make a will in minutes india",
    "will drafting website india",
    "online will generator india",
    "instant will pdf india",
    "bilingual will maker english hindi",
    "online will india",
    "lawyer verified will online india",
    "nri will drafting india",
    "indian succession act 1925 will",
    "hindu succession act will",
    "muslim will wasiyat india",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in",
  },
  openGraph: {
    title: "India's First Online Will Drafting Platform | WillDrafting.in",
    description:
      "India's first online will drafting platform. Make a legally valid online Will in India in minutes with instant court-ready PDF & advocate review by AMA Legal Solutions.",
    url: "https://www.willdrafting.in",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "WillDrafting.in - Online Will Maker & Lawyer-Verified Wills in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "India's First Online Will Drafting Platform | WillDrafting.in",
    description:
      "India's first online will drafting platform. Make a legally valid online Will in India in minutes with instant court-ready PDF & advocate review by AMA Legal Solutions.",
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
        "India's premier legal-tech platform for lawyer-verified online testamentary Wills under the Indian Succession Act, 1925 and Hindu Succession Act, 1956 for Resident Indians and NRIs/OCIs worldwide.",
      "email": "hello@willdrafting.in",
      "priceRange": "₹2,490 - ₹9,990",
      "currenciesAccepted": "INR",
      "availableLanguage": ["en-IN", "hi-IN"],
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" },
      ],
      "knowsAbout": [
        "Indian Succession Act, 1925",
        "Hindu Succession Act, 1956",
        "Muslim Personal Law (Shariat) Wasiyat",
        "NRI & OCI Estate Planning for Indian Assets",
        "Will Registration under the Registration Act, 1908",
        "Probate and Letters of Administration in India",
      ],
      "parentOrganization": {
        "@type": "LegalService",
        "name": "AMA Legal Solutions",
      },
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
      "inLanguage": ["en-IN", "hi-IN"],
      "description":
        "Legally valid online will drafting and estate succession planning in India for Resident Indians, NRIs, and OCIs.",
      "publisher": {
        "@id": "https://www.willdrafting.in/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.willdrafting.in/#organization",
      "name": "WillDrafting.in",
      "legalName": "AMA Legal Solutions",
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
          <AuthProvider>
            <LanguageProvider>
              {children}
              <GlobalPopup />
              <SignupModalHost />
            </LanguageProvider>
          </AuthProvider>
        </StyledJsxRegistry>
        <Analytics />
      </body>
    </html>
  );
}
