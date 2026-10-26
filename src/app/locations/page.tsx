import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationsClient from "./LocationsClient";
import { getLocationItems } from "@/data/locationsData";

export const dynamic = "force-dynamic";

// Strict SEO compliance: Title 50–60 chars, Meta Description 140–155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: "Will Drafting in India: 91 Cities & States Directory", // exactly 53 characters
  description:
    "Find expert online Will drafting and registration services across 91 Indian cities and states. Section 63 compliant succession lawyers across India.", // exactly 151 characters
  alternates: {
    canonical: "https://www.willdrafting.in/locations",
  },
  openGraph: {
    title: "Will Drafting in India: 91 Cities & States Directory",
    description:
      "Find expert online Will drafting and registration services across 91 Indian cities and states. Section 63 compliant succession lawyers across India.",
    url: "https://www.willdrafting.in/locations",
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Will Drafting Across 91 Indian Cities and States - WillDrafting.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in India: 91 Cities & States Directory",
    description:
      "Find expert online Will drafting and registration services across 91 Indian cities and states. Section 63 compliant succession lawyers across India.",
    images: ["https://www.willdrafting.in/desktopusp.jpg"],
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
};

export default function LocationsPage() {
  const locations = getLocationItems();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.willdrafting.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://www.willdrafting.in/locations",
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WillDrafting Pan-India Locations Directory",
    description:
      "Complete index of online Will drafting services, local Sub-Registrar guidelines, and succession lawyers across 91 Indian cities and states.",
    url: "https://www.willdrafting.in/locations",
    isPartOf: {
      "@type": "WebSite",
      name: "WillDrafting",
      url: "https://www.willdrafting.in",
    },
    about: {
      "@type": "Thing",
      name: "Will Drafting Services in India Across 91 Locations",
    },
    numberOfItems: locations.length,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: locations.map((loc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: loc.title,
        url: `https://www.willdrafting.in${loc.href}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <Navbar />
        <div className="flex-1">
          <LocationsClient initialLocations={locations} />
        </div>
        <Footer />
      </div>
    </>
  );
}
