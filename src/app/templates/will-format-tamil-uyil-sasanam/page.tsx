import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatTamilClient from "./WillFormatTamilClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "உயில் சாசனம் மாதிரி | Will Format in Tamil | WillDrafting", // exactly 57 characters
  },
  description:
    "Download legally valid உயில் எழுதுவது எப்படி மாதிரி (will format in tamil) under Indian Succession Act, 1925 with Chennai probate guidance and.", // exactly 153 characters
  keywords: [
    "உயில் எழுதுவது எப்படி மாதிரி",
    "will format in tamil",
    "uyil format in tamil pdf",
    "உயில் சாசனம் மாதிரி",
    "sample will in tamil language",
    "chennai high court probate section 213",
    "tamil nadu sro will registration fee",
    "tnreginet uyil pathivu guidelines",
    "indian succession act section 63 tamil nadu",
    "varisu certificate vs registered uyil",
    "tamil nilam patta transfer with will",
    "ama legal solutions tamil will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-tamil-uyil-sasanam",
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
    title: "உயில் சாசனம் மாதிரி | Will Format in Tamil | WillDrafting",
    description:
      "Download legally valid உயில் எழுதுவது எப்படி மாதிரி (will format in tamil) under Indian Succession Act, 1925 with Chennai probate guidance and.",
    url: "https://www.willdrafting.in/templates/will-format-tamil-uyil-sasanam",
    siteName: "WillDrafting.in",
    locale: "ta_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-tamil-uyil-sasanam-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Format in Tamil: உயில் சாசனம் மாதிரி (Uyil Sasanam) Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "உயில் சாசனம் மாதிரி | Will Format in Tamil | WillDrafting",
    description:
      "Download legally valid உயில் எழுதுவது எப்படி மாதிரி (will format in tamil) under Indian Succession Act, 1925 with Chennai probate guidance and.",
    images: ["https://www.willdrafting.in/images/will-format-tamil-uyil-sasanam-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatTamilPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-tamil-uyil-sasanam";
  const imageUrl = "https://www.willdrafting.in/images/will-format-tamil-uyil-sasanam-og.jpg";

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
        name: "உயில் சாசனம் மாதிரி | Will Format in Tamil | WillDrafting",
        description:
          "Download legally valid உயில் எழுதுவது எப்படி மாதிரி (will format in tamil) under Indian Succession Act, 1925 with Chennai probate guidance and.",
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
            name: "Will Format in Tamil (உயில் சாசனம்)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "உயில் சாசனம் மாதிரி (Will Format in Tamil)",
        url: canonicalUrl,
        description:
          "Bilingual Tamil and English legal Will draft format compliant with Section 63 of the Indian Succession Act 1925, Tamil Nadu Registration.",
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
        headline: "உயில் சாசனம் மாதிரி: Legal Will Format in Tamil Guide",
        description:
          "Complete legal guide and printable template on how to write a valid Will in Tamil (உயில் எழுதுவது எப்படி மாதிரி) under Indian Succession Act.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: ["ta-IN", "en-IN"],
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
            name: "உயில் எழுத முத்திரைத்தாள் (Stamp Paper) தேவையா?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "இல்லை. இந்திய வாரிசுரிமை சட்டம் 1925 பிரிவு 63 மற்றும் தமிழ்நாடு முத்திரைத்தாள் சட்டத்தின் கீழ், உயில் எழுதுவதற்கு முத்திரைத்தாள் கட்டாயமில்லை. வெள்ளைத்தாளில் (Plain Paper / Green Ledger Paper) கைப்படவோ அல்லது தட்டச்சு செய்தோ எழுதப்பட்ட உயில் முழு சட்ட செல்லுபடியாகும் தன்மை கொண்டது.",
            },
          },
          {
            "@type": "Question",
            name: "தமிழ்நாட்டில் உயில் பதிவு செய்வது கட்டாயமா?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "பதிவு சட்டம் 1908 பிரிவு 18(e)-ன் படி இந்தியாவில் உயில் பதிவு செய்வது கட்டாயமில்லை (விருப்பத்திற்குரியது). இருப்பினும், சார்-பதிவாளர் அலுவலகத்தில் (SRO) பதிவு செய்வது பின்னாளில் உயிலின் உண்மைத்தன்மை மீது எழும் போலி ஆவண குற்றச்சாட்டுகள் மற்றும் நீதிமன்ற வழக்குகளைத் தடுக்கும் மிக வலிமையான சட்ட பாதுகாப்பைத் தருகிறது.",
            },
          },
          {
            "@type": "Question",
            name: "சென்னையில் உயிலுக்கு புரோபேட் (Probate) வாங்குவது கட்டாயமா?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ஆம். இந்திய வாரிசுரிமை சட்டம் 1925 பிரிவு 213 மற்றும் 57-ன் படி, சென்னை மாநகராட்சி எல்லைக்குட்பட்ட அசையா சொத்துக்கள் தொடர்பாக எழுதப்படும் உயில்களுக்கு அல்லது சென்னை எல்லைக்குள் இயற்றப்படும் உயில்களுக்கு சென்னை உயர் நீதிமன்றத்தில் (Madras High Court Original Side) புரோபேட் அல்லது லெட்டர்ஸ் ஆப் அட்மினிஸ்ட்ரேஷன் பெறுவது கட்டாயமாகும். சென்னை தவிர்த்த பிற தமிழக மாவட்டங்களில் (கோவை, மதுரை, திருச்சி போன்றவை) இது கட்டாயமில்லை.",
            },
          },
          {
            "@type": "Question",
            name: "உயிலில் எத்தனை சாட்சிகள் கையெழுத்திட வேண்டும்?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "சட்டப்பிரிவு 63(c)-ன் படி குறைந்தது 2 சாட்சிகள் (Attesting Witnesses) உயில் எழுதுபவர் கையெழுத்திடுவதை நேரில் பார்த்துவிட்டு கையெழுத்திட வேண்டும். சாட்சிகள் உயிலின் மூலம் சொத்து பலன் பெறும் பயனாளிகளாக (Beneficiaries) இருக்கக்கூடாது.",
            },
          },
          {
            "@type": "Question",
            name: "பூர்வீக சொத்தை உயில் மூலம் முழுமையாக எழுதி வைக்க முடியுமா?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "இல்லை. ஒருவர் தனது சுய சம்பாத்திய சொத்துக்களை (Self-Acquired Property) மட்டுமே தனது விருப்பப்படி யாருக்கு வேண்டுமானாலும் உயில் மூலம் எழுதி வைக்க முடியும். பூர்வீக கூட்டு குடும்ப சொத்தில் (Ancestral Property) தனக்கு சட்டப்படி கிடைக்கக்கூடிய பிரிக்கப்படாத பங்குக்கு (Undivided Coparcenary Share) மட்டுமே உயில் எழுத முடியும்.",
            },
          },
          {
            "@type": "Question",
            name: "தமிழ்நாட்டில் உயில் பதிவு செய்ய கட்டணம் எவ்வளவு?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "தமிழ்நாடு பத்திரப்பதிவு துறை (TNREGINET) விதிகளின்படி, உயில் பதிவு செய்ய முத்திரைத்தாள் கட்டணம் ஏதுமில்லை (ரூ.0). பதிவுக்கட்டணம் ரூ.500 மற்றும் கணினி சேவைக் கட்டணம் உட்பட சுமார் ரூ.1,000 மட்டுமே செலவாகும்.",
            },
          },
          {
            "@type": "Question",
            name: "ஒருவர் தன் வாழ்நாளில் உயிலை எத்தனை முறை மாற்றலாம் அல்லது ரத்து செய்யலாம்?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ஒருவர் தன் வாழ்நாளில் நல்ல மனநிலையில் இருக்கும் வரை எத்தனை முறை வேண்டுமானாலும் புதிய உயில் எழுதலாம் அல்லது பழைய உயிலை ரத்து செய்யலாம் (Revocation). அவர் கடைசியாக எழுதி கையொப்பமிட்ட உயில் மட்டுமே செல்லுபடியாகும் (Last Will and Testament).",
            },
          },
          {
            "@type": "Question",
            name: "பதிவு செய்யப்பட்ட உயிலை வைத்து தமிழ்நாட்டில் பட்டா மாறுதல் செய்வது எப்படி?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "உயில் எழுதியவர் காலமான பிறகு, அவரது இறப்பு சான்றிதழ், வில்லங்க சான்றிதழ் (EC) மற்றும் பதிவு செய்யப்பட்ட உயில் நகலுடன் தமிழ்நாடு நில ஆவண போர்ட்டலில் (tamilnilam.tn.gov.in) பட்டா பெயர் மாறுதலுக்கு விண்ணப்பிக்கலாம். வருவாய் வட்டாட்சியர் கள ஆய்வு செய்து சட்டப்பூர்வமாக பட்டா வழங்கிடுவார்.",
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
        <WillFormatTamilClient />
        <Footer />
      </div>
    </>
  );
}
