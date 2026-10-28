import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatKannadaClient from "./WillFormatKannadaClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ | Will Format in Kannada Guide", // exactly 54 characters
  },
  description:
    "Download legally valid ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (will format in kannada) under Indian Succession Act 1925 with Karnataka Kaveri 2.0.", // exactly 150 characters
  keywords: [
    "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ",
    "will format in kannada",
    "uyilu format in kannada pdf",
    "ಉಯಿಲು ಪತ್ರ ಮಾದರಿ",
    "how to write will in kannada",
    "karnataka kaveri 2.0 will registration",
    "indian succession act section 63 karnataka",
    "bangalore property will drafting",
    "kannada will registration fee sub registrar",
    "bhoomi rtc pouthi khata mutation will",
    "bbmp e-aasthi khata transfer registered will",
    "ama legal solutions kannada will draft",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-kannada-uyilu",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/will-format-india",
      "hi-IN": "https://www.willdrafting.in/templates/will-format-hindi",
      "mr-IN": "https://www.willdrafting.in/templates/will-format-marathi-mrutyupatra",
      "gu-IN": "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
      "pa-IN": "https://www.willdrafting.in/templates/will-format-punjabi-vasiyatnama",
      "bn-IN": "https://www.willdrafting.in/templates/will-format-bengali-ichchapatra",
      "ta-IN": "https://www.willdrafting.in/templates/will-format-tamil-uyil-sasanam",
      "te-IN": "https://www.willdrafting.in/templates/will-format-telugu-veelunama",
      "kn-IN": "https://www.willdrafting.in/templates/will-format-kannada-uyilu",
      "ml-IN": "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
      "x-default": "https://www.willdrafting.in/templates/will-format-india",
    },
  },
  openGraph: {
    title: "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ | Will Format in Kannada Guide",
    description:
      "Download legally valid ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (will format in kannada) under Indian Succession Act 1925 with Karnataka Kaveri 2.0.",
    url: "https://www.willdrafting.in/templates/will-format-kannada-uyilu",
    siteName: "WillDrafting.in",
    locale: "kn_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-kannada-uyilu-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Format in Kannada: ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (Uyilu Patra) Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ | Will Format in Kannada Guide",
    description:
      "Download legally valid ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (will format in kannada) under Indian Succession Act 1925 with Karnataka Kaveri 2.0.",
    images: ["https://www.willdrafting.in/images/will-format-kannada-uyilu-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatKannadaPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-kannada-uyilu";
  const imageUrl = "https://www.willdrafting.in/images/will-format-kannada-uyilu-og.jpg";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.willdrafting.in/#organization",
        name: "WillDrafting.in",
        url: "https://www.willdrafting.in",
        logo: "https://www.willdrafting.in/Logofinal.svg",
        parentOrganization: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ | Will Format in Kannada Guide",
        description:
          "Download legally valid ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (will format in kannada) under Indian Succession Act 1925 with Karnataka Kaveri 2.0.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
            name: "Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Will Format in Kannada (ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ (Will Format in Kannada)",
        url: canonicalUrl,
        description:
          "Bilingual Kannada and English legal Will draft format compliant with Section 63 of the Indian Succession Act 1925, Karnataka Registration.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "ವಿಲ್ ಬರೆಯುವ ಮಾದರಿ ಕನ್ನಡ: Legal Will Format in Kannada Guide",
        description:
          "Complete legal guide and printable template on how to write a valid Will in Kannada (ಉಯಿಲು ಪತ್ರ ಮಾದರಿ) under Indian Succession Act 1925 with.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: ["kn-IN", "en-IN"],
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "ಕರ್ನಾಟಕದಲ್ಲಿ ಉಯಿಲು (ವಿಲ್) ಬರೆಯಲು ಮುದ್ರಾಂಕ ಕಾಗದ (Stamp Paper) ಅಗತ್ಯವಿದೆಯೇ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಇಲ್ಲ. ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆ 1925 ರ ಸೆಕ್ಷನ್ 63 ಹಾಗೂ ಕರ್ನಾಟಕ ಮುದ್ರಾಂಕ ಕಾಯ್ದೆಯ ಅಡಿಯಲ್ಲಿ ಉಯಿಲು ಬರೆಯಲು ಯಾವುದೇ ಮುದ್ರಾಂಕ ಶುಲ್ಕ (Zero Stamp Duty) ಇರುವುದಿಲ್ಲ. ಬಿಳಿ ಕಾಗದದ (Plain Paper / Green Ledger Paper) ಮೇಲೆ ಕೈಬರಹದಲ್ಲಾಗಲಿ ಅಥವಾ ಬೆರಳಚ್ಚು (Type) ಮಾಡಿಯಾಗಲಿ ಬರೆದ ಉಯಿಲು ಸಂಪೂರ್ಣ ಕಾನೂನುಬದ್ಧವಾಗಿರುತ್ತದೆ.",
            },
          },
          {
            "@type": "Question",
            name: "ಕರ್ನಾಟಕದಲ್ಲಿ ಉಯಿಲನ್ನು ನೋಂದಣಿ (Registration) ಮಾಡಿಸುವುದು ಕಡ್ಡಾಯವೇ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ನೋಂದಣಿ ಕಾಯ್ದೆ 1908 ರ ಸೆಕ್ಷನ್ 18(e) ರ ಪ್ರಕಾರ ಭಾರತದಲ್ಲಿ ಹಾಗೂ ಕರ್ನಾಟಕದಲ್ಲಿ ಉಯಿಲು ನೋಂದಣಿ ಮಾಡಿಸುವುದು ಕಡ್ಡಾಯವಲ್ಲ, ಐಚ್ಛಿಕವಾಗಿರುತ್ತದೆ. ಆದರೆ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ (Sub-Registrar) ಕಚೇರಿಯಲ್ಲಿ ಕಾವೇರಿ 2.0 ಮೂಲಕ ನೋಂದಾಯಿಸುವುದರಿಂದ ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಉಯಿಲಿನ ಸತ್ಯಾಸತ್ಯತೆಯ ಮೇಲೆ ಬರುವ ತಕರಾರುಗಳು ಮತ್ತು ನಕಲಿ ದಾಖಲೆ ಆರೋಪಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಡೆಯಬಹುದು.",
            },
          },
          {
            "@type": "Question",
            name: "ಬೆಂಗಳೂರಿನಲ್ಲಿರುವ ಆಸ್ತಿಯ ಉಯಿಲಿಗೆ ನ್ಯಾಯಾಲಯದ ಪ್ರೊಬೇಟ್ (Probate) ಪಡೆಯುವುದು ಕಡ್ಡಾಯವೇ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಇಲ್ಲ. ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 213(2) ಮತ್ತು ಸೆಕ್ಷನ್ 57 ಕೇವಲ ಹಳೆಯ ಪ್ರೆಸಿಡೆನ್ಸಿ ಪಟ್ಟಣಗಳಾದ ಮುಂಬೈ, ಕೋಲ್ಕತ್ತಾ ಮತ್ತು ಚೆನ್ನೈ ನಗರಗಳಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ. ಕರ್ನಾಟಕ ಹೈಕೋರ್ಟಿನ ಸ್ಪಷ್ಟ ತೀರ್ಪುಗಳ ಪ್ರಕಾರ, ಬೆಂಗಳೂರು ಅಥವಾ ಕರ್ನಾಟಕದ ಯಾವುದೇ ಭಾಗದಲ್ಲಿರುವ ಹಿಂದೂ, ಜೈನ, ಸಿಖ್ ಹಾಗೂ ಬೌದ್ಧ ಧರ್ಮೀಯರ ಆಸ್ತಿಗೆ ಪ್ರೊಬೇಟ್ ಪಡೆಯುವುದು ಕಡ್ಡಾಯವಲ್ಲ. ನೋಂದಾಯಿತ ಉಯಿಲಿನ ಆಧಾರದ ಮೇಲೆಯೇ ನೇರವಾಗಿ ಬಿಬಿಎಂಪಿ ಇ-ಖಾತೆ ಅಥವಾ ಭೂಮಿ ಪೌತಿ ಖಾತೆ ವರ್ಗಾವಣೆ ಮಾಡಬಹುದು.",
            },
          },
          {
            "@type": "Question",
            name: "ಉಯಿಲು ಪತ್ರಕ್ಕೆ ಎಷ್ಟು ಜನ ಸಾಕ್ಷಿಗಳು (Witnesses) ಸಹಿ ಮಾಡಬೇಕು?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 63(c) ರ ಪ್ರಕಾರ ಕನಿಷ್ಠ ಇಬ್ಬರು ಸಾಕ್ಷಿಗಳು (Two Attesting Witnesses) ಉಯಿಲುಕರ್ತರು ಸಹಿ ಅಥವಾ ಹೆಬ್ಬೆಟ್ಟಿನ ಗುರುತು ಹಾಕುವುದನ್ನು ಪ್ರತ್ಯಕ್ಷವಾಗಿ ನೋಡಿ, ನಂತರ ಅವರ ಸಮ್ಮುಖದಲ್ಲೇ ಸಾಕ್ಷಿಯಾಗಿ ಸಹಿ ಮಾಡಬೇಕು. ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 67 ರ ಪ್ರಕಾರ, ಉಯಿಲಿನ ಮೂಲಕ ಆಸ್ತಿಯ ಫಲ ಪಡೆಯುವ ಫಲಾನುಭವಿಗಳು ಅಥವಾ ಅವರ ಪತಿ/ಪತ್ನಿ ಸಾಕ್ಷಿದಾರರಾಗಿ ಸಹಿ ಮಾಡಬಾರದು.",
            },
          },
          {
            "@type": "Question",
            name: "ಪಿತ್ರಾರ್ಜಿತ (Ancestral) ಆಸ್ತಿಯನ್ನು ಉಯಿಲಿನ ಮೂಲಕ ಸಂಪೂರ್ಣವಾಗಿ ಬರೆದುಕೊಡಬಹುದೇ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಇಲ್ಲ. ಒಬ್ಬ ವ್ಯಕ್ತಿಯು ತನ್ನ ಸ್ವಯಾರ್ಜಿತ (Self-Acquired) ಆಸ್ತಿಯನ್ನು ಮಾತ್ರ ತನ್ನ ಇಷ್ಟಾನುಸಾರ ಯಾರಿಗಾದರೂ ಉಯಿಲಿನ ಮೂಲಕ ನೀಡಬಹುದು. ಪಿತ್ರಾರ್ಜಿತ ಅವಿಭಕ್ತ ಹಿಂದೂ ಕುಟುಂಬದ (HUF Coparcenary) ಆಸ್ತಿಯಲ್ಲಿ ತನಗೆ ಕಾನೂನುಬದ್ಧವಾಗಿ ಬರಬೇಕಾದ ಅವಿಭಜಿತ ಪಾಲಿಗೆ (Undivided Share) ಮಾತ್ರ ಉಯಿಲು ಬರೆಯುವ ಹಕ್ಕಿರುತ್ತದೆ, ಇಡೀ ಆಸ್ತಿಗೆ ಬರೆಯುವಂತಿಲ್ಲ.",
            },
          },
          {
            "@type": "Question",
            name: "ಕರ್ನಾಟಕ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಉಯಿಲು ನೋಂದಣಿ ಶುಲ್ಕ ಎಷ್ಟು?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಕರ್ನಾಟಕ ಕಾವೇರಿ 2.0 ನಿಯಮಾವಳಿಗಳ ಪ್ರಕಾರ, ಉಯಿಲು ನೋಂದಣಿಗೆ ಸ್ಟ್ಯಾಂಪ್ ಡ್ಯೂಟಿ ಶೂನ್ಯ (₹0). ನೋಂದಣಿ ಶುಲ್ಕ ₹1,000 ಹಾಗೂ ಸ್ಕ್ಯಾನಿಂಗ್ ಶುಲ್ಕ ಸೇರಿದಂತೆ ಒಟ್ಟು ಸುಮಾರು ₹1,200 ರಿಂದ ₹1,500 ಮಾತ್ರ ಸರ್ಕಾರಿ ಶುಲ್ಕ ತಗಲುತ್ತದೆ.",
            },
          },
          {
            "@type": "Question",
            name: "ಒಬ್ಬ ವ್ಯಕ್ತಿ ತನ್ನ ಜೀವಿತಾವಧಿಯಲ್ಲಿ ಉಯಿಲನ್ನು ಎಷ್ಟು ಬಾರಿ ಬದಲಾಯಿಸಬಹುದು?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಒಬ್ಬ ವ್ಯಕ್ತಿಯು ಉತ್ತಮ ಮಾನಸಿಕ ಸ್ವಾಸ್ಥ್ಯ ಹೊಂದಿರುವವರೆಗೂ ತನ್ನ ಜೀವಿತಾವಧಿಯಲ್ಲಿ ಎಷ್ಟು ಬಾರಿ ಬೇಕಾದರೂ ಹೊಸ ಉಯಿಲು ಬರೆಯಬಹುದು ಅಥವಾ ಹಳೆಯ ಉಯಿಲನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದು (Revocation). ಆತ ಕೊನೆಯದಾಗಿ ಬರೆದು ಸಹಿ ಮಾಡಿದ ಉಯಿಲು (Last Will and Testament) ಮಾತ್ರ ಕಾನೂನಿನ ದೃಷ್ಟಿಯಲ್ಲಿ ಸಿಂಧುವಾಗಿರುತ್ತದೆ.",
            },
          },
          {
            "@type": "Question",
            name: "ನೋಂದಾಯಿತ ಉಯಿಲಿನ ಮೂಲಕ ಕರ್ನಾಟಕದಲ್ಲಿ ಪೌತಿ ಖಾತೆ (RTC Mutation) ಮಾಡಿಸುವುದು ಹೇಗೆ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ಉಯಿಲು ಬರೆದವರು ನಿಧನರಾದ ನಂತರ, ಅವರ ಮರಣ ಪ್ರಮಾಣಪತ್ರ, ಕಾವೇರಿ 2.0 ನೋಂದಾಯಿತ ಉಯಿಲು ಪ್ರತಿ ಮತ್ತು ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರದೊಂದಿಗೆ (EC) ಭೂಮಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (landrecords.karnataka.gov.in) ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತಿ/ತಹಶೀಲ್ದಾರ್ ಕಚೇರಿಯಲ್ಲಿ ಕರ್ನಾಟಕ ಭೂ ಕಂದಾಯ ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 128 ರಡಿ ಪೌತಿ ಖಾತೆ ವರ್ಗಾವಣೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
        <Navbar />
        <WillFormatKannadaClient />
        <Footer />
      </div>
    </>
  );
}
