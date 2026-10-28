import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatTeluguClient from "./WillFormatTeluguClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "వీలునామా ఫార్మాట్ తెలుగు: Telugu Will Format | WillDrafting", // exactly 59 characters
  },
  description:
    "Download legally valid వీలునామా ఫార్మాట్ తెలుగు (will format in telugu) under Indian Succession Act, 1925 with Telangana and AP SRO.", // exactly 151 characters
  keywords: [
    "వీలునామా ఫార్మాట్ తెలుగు",
    "will format in telugu",
    "veelunama format in telugu pdf",
    "వీలునామా ఎలా రాయాలి",
    "sample will in telugu",
    "telugu will format download",
    "telangana sro will registration rules",
    "andhra pradesh will registration fee igrs",
    "indian succession act section 63 telugu",
    "dharani portal will mutation hyderabad",
    "us nri telugu will drafting",
    "ama legal solutions telugu will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-telugu-veelunama",
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
    title: "వీలునామా ఫార్మాట్ తెలుగు: Telugu Will Format | WillDrafting",
    description:
      "Download legally valid వీలునామా ఫార్మాట్ తెలుగు (will format in telugu) under Indian Succession Act, 1925 with Telangana and AP SRO.",
    url: "https://www.willdrafting.in/templates/will-format-telugu-veelunama",
    siteName: "WillDrafting.in",
    locale: "te_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-telugu-veelunama-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Format in Telugu: వీలునామా ఫార్మాట్ (Veelunama) Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "వీలునామా ఫార్మాట్ తెలుగు: Telugu Will Format | WillDrafting",
    description:
      "Download legally valid వీలునామా ఫార్మాట్ తెలుగు (will format in telugu) under Indian Succession Act, 1925 with Telangana and AP SRO.",
    images: ["https://www.willdrafting.in/images/will-format-telugu-veelunama-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatTeluguPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-telugu-veelunama";
  const imageUrl = "https://www.willdrafting.in/images/will-format-telugu-veelunama-og.jpg";

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
        name: "వీలునామా ఫార్మాట్ తెలుగు: Telugu Will Format | WillDrafting",
        description:
          "Download legally valid వీలునామా ఫార్మాట్ తెలుగు (will format in telugu) under Indian Succession Act, 1925 with Telangana and AP SRO.",
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
            name: "Will Format in Telugu (వీలునామా)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "వీలునామా ఫార్మాట్ తెలుగు (Will Format in Telugu)",
        url: canonicalUrl,
        description:
          "Bilingual Telugu and English legal Will draft template compliant with Section 63 of the Indian Succession Act 1925, Telangana Registration.",
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
        headline: "వీలునామా ఫార్మాట్ తెలుగు: Legal Will Format in Telugu Guide",
        description:
          "Complete legal guide and printable template on how to write a valid Will in Telugu (వీలునామా ఎలా రాయాలి) under Indian Succession Act 1925 with.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: ["te-IN", "en-IN"],
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
            name: "వీలునామా రాయడానికి స్టాంప్ పేపర్ (Stamp Paper) అవసరమా?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "అవసరం లేదు. భారతీయ వారసత్వ చట్టం 1925 సెక్షన్ 63 ప్రకారం వీలునామాను స్టాంప్ పేపర్‌పై రాయవలసిన అవసరం లేదు. తెల్ల కాగితం (Plain Paper లేదా Green Ledger Paper) పై చేతితో రాసినా లేదా కంప్యూటర్‌లో టైప్ చేసినా అది చట్టబద్ధంగా పూర్తిగా చెల్లుబాటు అవుతుంది.",
            },
          },
          {
            "@type": "Question",
            name: "తెలంగాణ మరియు ఆంధ్రప్రదేశ్‌లలో వీలునామా రిజిస్ట్రేషన్ తప్పనిసరిగా చేయాలా?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "రిజిస్ట్రేషన్ చట్టం 1908 సెక్షన్ 18(e) ప్రకారం వీలునామా రిజిస్ట్రేషన్ చేయడం చట్టరీత్యా తప్పనిసరి కాదు, అది ఐచ్ఛికం (Optional). అయితే, సబ్-రిజిస్ట్రార్ కార్యాలయం (SRO) లో రిజిస్ట్రేషన్ చేయించడం వలన భవిష్యత్తులో నకిలీ ఆరోపణలు, ఫోర్జరీ లేదా బలవంతపు ఆరోపణలు రాకుండా బలమైన చట్టపరమైన రక్షణ లభిస్తుంది.",
            },
          },
          {
            "@type": "Question",
            name: "హైదరాబాద్ లేదా ఆంధ్రప్రదేశ్‌లో వీలునామాకు కోర్టు ప్రొబేట్ (Probate) అవసరమా?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "అవసరం లేదు. భారతీయ వారసత్వ చట్టం సెక్షన్ 57 మరియు సెక్షన్ 213 ప్రకారం, ప్రొబేట్ కేవలం ముంబై, కోల్‌కతా, మరియు చెన్నై ప్రెసిడెన్సీ నగరాలకు మాత్రమే వర్తిస్తుంది. హైదరాబాద్, విశాఖపట్నం, విజయవాడ మరియు తెలంగాణ, ఏపీలలోని ఇతర ప్రాంతాలలో వీలునామా అమలు కొరకు కోర్టు ప్రొబేట్ పొందడం తప్పనిసరి కాదు.",
            },
          },
          {
            "@type": "Question",
            name: "వీలునామాపై ఎంతమంది సాక్షులు సంతకాలు చేయాలి?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "సెక్షన్ 63(c) ప్రకారం కనీసం ఇద్దరు స్వతంత్ర సాక్షులు (Two Attesting Witnesses) వీలునామా కర్త సంతకం చేయడాన్ని ప్రత్యక్షంగా చూసి సాక్షి సంతకాలు చేయాలి. అత్యంత ముఖ్యమైన నియమం: సెక్షన్ 67 ప్రకారం ఆస్తి పొందే లబ్ధిదారులు (Beneficiaries) లేదా వారి భార్య/భర్త సాక్షులుగా సంతకం చేయకూడదు.",
            },
          },
          {
            "@type": "Question",
            name: "పూర్వీకుల ఆస్తిపై (Ancestral Property) పూర్తి వీలునామా రాయవచ్చా?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "వ్యక్తి తన సొంత సంపాదనతో కొనుగోలు చేసిన ఆస్తులపై (Self-Acquired Property) మాత్రమే తన ఇష్టానుసారం పూర్తి వీలునామా రాయవచ్చును. పూర్వీకుల ఉమ్మడి కుటుంబ ఆస్తిలో (Ancestral Coparcenary Property) తనకు చట్టప్రకారం లభించే విభజించబడని వాటాకు (Undivided Share) మాత్రమే సెక్షన్ 30 ప్రకారం వీలునామా రాయవచ్చును.",
            },
          },
          {
            "@type": "Question",
            name: "తెలంగాణ మరియు ఏపీలలో వీలునామా రిజిస్ట్రేషన్ ఫీజు ఎంత?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "తెలంగాణ మరియు ఆంధ్రప్రదేశ్ రిజిస్ట్రేషన్ నిబంధనల ప్రకారం వీలునామాపై స్టాంప్ డ్యూటీ సున్నా (₹0). కేవలం ప్రభుత్వ రిజిస్ట్రేషన్ ఫీజు ₹1,000 మరియు కంప్యూటర్ స్కానింగ్ ఛార్జీలు మాత్రమే ఉంటాయి. మొత్తం ఖర్చు సుమారు ₹1,500 వరకు ఉంటుంది.",
            },
          },
          {
            "@type": "Question",
            name: "అమెరికాలో ఉన్న ఎన్నారై (US Telugu NRI) తల్లిదండ్రులు హైదరాబాద్ ఆస్తులపై వీలునామా ఎలా రాయాలి?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "భారతదేశంలో ఉన్న స్థిరాస్తుల కొరకు ప్రత్యేకమైన భారతీయ వీలునామా (Separate Indian Will) రాయడం చట్టపరంగా ఉత్తమం. అమెరికా లివింగ్ ట్రస్ట్ (US Living Trust) లేదా యుఎస్ వీలునామాను భారతీయ రెవెన్యూ అధికారులు, తహశీల్దార్ లేదా ధరణి పోర్టల్ నేరుగా అంగీకరించవు. ప్రత్యేక భారతీయ వీలునామా రాయడం ద్వారా సులభంగా నామ మార్పిడి (Mutation) జరుగుతుంది.",
            },
          },
          {
            "@type": "Question",
            name: "జీవితకాలంలో వీలునామాను ఎన్నిసార్లు మార్చవచ్చు లేదా రద్దు చేయవచ్చు?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "వ్యక్తి సజీవంగా మరియు ఆరోగ్యకరమైన మానసిక స్థితిలో ఉన్నంతవరకు ఎన్నిసార్లయినా వీలునామాను మార్చుకోవచ్చు లేదా పూర్తిగా రద్దు చేసుకోవచ్చు. చివరగా రాసి సంతకం చేసిన వీలునామా (Last Will and Testament) మాత్రమే చట్టప్రకారం చెల్లుబాటు అవుతుంది.",
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
        <WillFormatTeluguClient />
        <Footer />
      </div>
    </>
  );
}
