import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Gujarati } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatGujaratiClient from "./WillFormatGujaratiClient";

// Noto Sans Gujarati font for crisp vernacular typography
const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "વસીયતનામું ફોર્મેટ ગુજરાતી | Will Format | WillDrafting", // exactly 55 characters
  },
  description:
    "Download legally valid વસીયતનામું ફોર્મેટ ગુજરાતી under Indian Succession Act 1925. Free sample clauses, execution rules & Gujarat registration guide.", // exactly 150 characters
  keywords: [
    "વસીયતનામું ફોર્મેટ ગુજરાતી",
    "will format in gujarati",
    "vasiyatnama sample in gujarati pdf",
    "વિલ નમૂનો ગુજરાતી",
    "how to write will in gujarati",
    "gujarati vasiyatnama format",
    "section 63 indian succession act gujarat",
    "gujarat sub registrar will registration rules",
    "will drafting ahmedabad surat vadodara",
    "registered will vs unregistered will gujarat",
    "agricultural land will gujarat tenancy act",
    "ama legal solutions gujarati will format",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
    languages: {
      "gu-IN": "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
      "en-IN": "https://www.willdrafting.in/templates/will-format-india",
      "x-default": "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
    },
  },
  openGraph: {
    title: "વસીયતનામું ફોર્મેટ ગુજરાતી | Will Format | WillDrafting",
    description:
      "Download legally valid વસીયતનામું ફોર્મેટ ગુજરાતી under Indian Succession Act 1925. Free sample clauses, execution rules & Gujarat registration guide.",
    url: "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
    siteName: "WillDrafting.in",
    locale: "gu_IN",
    alternateLocale: ["en_IN"],
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-gujarati-vasiyatnama-og.jpg",
        width: 1200,
        height: 675,
        alt: "વસીયતનામું ફોર્મેટ ગુજરાતી - Legal Will Format in Gujarati with Execution Rules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "વસીયતનામું ફોર્મેટ ગુજરાતી | Will Format | WillDrafting",
    description:
      "Download legally valid વસીયતનામું ફોર્મેટ ગુજરાતી under Indian Succession Act 1925. Free sample clauses, execution rules & Gujarat registration guide.",
    images: ["https://www.willdrafting.in/images/will-format-gujarati-vasiyatnama-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatGujaratiPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama";
  const imageUrl = "https://www.willdrafting.in/images/will-format-gujarati-vasiyatnama-og.jpg";

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
        name: "વસીયતનામું ફોર્મેટ ગુજરાતી | Will Format | WillDrafting",
        description:
          "Download legally valid વસીયતનામું ફોર્મેટ ગુજરાતી under Indian Succession Act 1925. Free sample clauses, execution rules & Gujarat registration guide.",
        inLanguage: "gu-IN",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 675,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
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
            name: "વસીયતનામું ફોર્મેટ ગુજરાતી (Gujarati Will)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "કાનૂની વસીયતનામું ફોર્મેટ ગુજરાતી (Gujarati Legal Will Format)",
        url: canonicalUrl,
        description:
          "Statutory Gujarati Vasiyatnama template compliant with Section 63 of the Indian Succession Act 1925, featuring executor appointment, schedule of immovable and movable assets, two attesting witness clauses, and Gujarat SRO registration guidelines.",
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
        headline: "વસીયતનામું ફોર્મેટ ગુજરાતી: કાનૂની વિલ નમૂનો અને નિયમો",
        description:
          "Complete legal guide, printable Unicode Gujarati Vasiyatnama format, Gujarati-to-English legal glossary, and Gujarat Sub-Registrar registration procedure under Indian Succession Act 1925.",
        image: imageUrl,
        inLanguage: "gu-IN",
        mainEntityOfPage: canonicalUrl,
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "ગુજરાતીમાં લખેલું વસીયતનામું શું કાયદેસર ગણાય છે? (Is a Gujarati Will legally valid?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "હા, સંપૂર્ણપણે કાયદેસર છે. ભારતીય ઉત્તરાધિકાર અધિનિયમ, 1925 (Indian Succession Act, 1925) ની કલમ 63 મુજબ વિલ કોઈપણ ભાષામાં લખી શકાય છે. ગુજરાતી ભાષામાં સાદા કાગળ પર લખેલું વસીયતનામું, જો તેના પર ટેસ્ટેટરની સહી અને બે પુખ્ત સાક્ષીઓની સાક્ષી હોય, તો ભારતીય અદાલતોમાં 100% માન્ય છે.",
            },
          },
          {
            "@type": "Question",
            name: "શું ગુજરાતમાં વસીયતનામું સ્ટેમ્પ પેપર પર બનાવવું ફરજિયાત છે? (Is stamp paper mandatory in Gujarat?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ના, વસીયતનામું કોઈપણ સ્ટેમ્પ પેપર પર બનાવવું ફરજિયાત નથી. ગુજરાત સ્ટેમ્પ અધિનિયમ, 1958 અને ભારતીય સ્ટેમ્પ કાયદા હેઠળ વસીયતનામા પર સ્ટેમ્પ ડ્યુટીમાંથી સંપૂર્ણ મુક્તિ છે. તમે સાદા A4 કાગળ અથવા ગ્રીન લેજર પેપર પર વિલ લખી શકો છો.",
            },
          },
          {
            "@type": "Question",
            name: "વસીયતનામા માટે કેટલા સાક્ષીઓ હોવા જરૂરી છે? (How many witnesses are required?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "કલમ 63(c) મુજબ ઓછામાં ઓછા બે (2) પુખ્ત અને સક્ષમ સાક્ષીઓની સહી હોવી ફરજિયાત છે. બંને સાક્ષીઓએ ટેસ્ટેટરને સહી કરતા રૂબરૂ જોયેલા હોવા જોઈએ. સૌથી મહત્વનો નિયમ: કલમ 67 મુજબ વિલના લાભાર્થી (વારસદાર) કે તેના પતિ/પત્ની સાક્ષી બની શકતા નથી. સાક્ષી હંમેશા તટસ્થ વ્યક્તિ (જેમ કે ફેમિલી ડૉક્ટર, સીએ કે મિત્ર) હોવા જોઈએ.",
            },
          },
          {
            "@type": "Question",
            name: "શું ગુજરાતમાં વસીયતનામાની નોંધણી (Registration) કરાવવી ફરજિયાત છે? (Is registration mandatory?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "નોંધણી અધિનિયમ, 1908 (Registration Act) ની કલમ 18(e) મુજબ વસીયતનામાની રજિસ્ટ્રેશન મરજિયાત (optional) છે. બિન-નોંધાયેલું વિલ પણ કાયદેસર છે. જોકે સબ-રજિસ્ટ્રાર કચેરી (SRO) ખાતે રજિસ્ટ્રેશન કરાવવાથી બનાવટી દસ્તાવેજ કે દબાણના આક્ષેપો સામે મજબૂત કાનૂની પુરાવો મળે છે.",
            },
          },
          {
            "@type": "Question",
            name: "ખેતીની જમીનનું વસીયતનામું બિન-ખેડૂતને કરી શકાય? (Can agricultural land in Gujarat be bequeathed to non-agriculturists?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "મુંબઈ ગણોત વહીવટ અને ખેતીની જમીન અધિનિયમ, 1948 (Bombay Tenancy Act) ની કલમ 63 અને સુપ્રીમ કોર્ટના ચુકાદા મુજબ, ખેતીની જમીન વસીયતનામા દ્વારા પણ બિન-ખેડૂત વ્યક્તિને આપી શકાતી નથી. જો વિલ દ્વારા બિન-ખેડૂતને ખેતીની જમીન આપવામાં આવે તો તે ટ્રાન્સફર રદબાતલ ઠરી શકે છે અને કલમ 84C હેઠળ જમીન સરકાર હસ્તક જઈ શકે છે.",
            },
          },
          {
            "@type": "Question",
            name: "વહીવટકર્તા (Executor) ની નિમણૂક શા માટે જરૂરી છે? (Why appoint an Executor in a Gujarati Will?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "વહીવટકર્તા એ વ્યક્તિ છે જેને ટેસ્ટેટર પોતાના અવસાન બાદ મિલકતોની વહેંચણી, બેંક ખાતાઓનું સમાધાન, સોનાની વહેંચણી અને મ્યુટેશન કરાવવાની કાનૂની જવાબદારી સોંપે છે. વિશ્વસનીય એક્ઝિક્યુટર રાખવાથી વારસદારો વચ્ચે ઝઘડા કે કોર્ટ વિવાદ અટકે છે.",
            },
          },
          {
            "@type": "Question",
            name: "શું વસીયતનામું ગમે ત્યારે બદલી કે રદ કરી શકાય છે? (Can a Gujarati Will be changed or revoked?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "હા, ટેસ્ટેટર પોતાના જીવનકાળ દરમિયાન અને સ્વસ્થ માનસિક સ્થિતિમાં હોય ત્યાં સુધી ગમે તેટલી વાર નવું વિલ બનાવી શકે છે અથવા જૂનું વિલ રદ (Revoke) કરી શકે છે. કલમ 62 મુજબ બનાવેલું છેલ્લું વસીયતનામું જ કાયદેસર અમલમાં આવે છે. નાના ફેરફારો માટે કોડિસિલ (Codicil) પણ બનાવી શકાય છે.",
            },
          },
          {
            "@type": "Question",
            name: "વિદેશમાં રહેતા NRI ગુજરાતીઓ પોતાની ગુજરાતની મિલકત માટે વિલ કેવી રીતે બનાવી શકે? (How can NRIs draft a Will for Gujarat property?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "NRI ગુજરાતીઓ ભારતીય મિલકતો (અમદાવાદ, વડોદરા, સુરત, રાજકોટ વગેરે) માટે સ્વતંત્ર ભારતીય વિલ બનાવી શકે છે. તેઓ વિદેશમાં બે સાક્ષીઓની હાજરીમાં વિલ સહી કરીને ભારતીય વાણિજ્ય દૂતાવાસ (Indian Embassy/Consulate) માં નોટરાઈઝ અથવા એપોસ્ટિલ કરાવી શકે છે.",
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
      <div className={`min-h-screen bg-[#FAF7F0] text-[#172228] antialiased ${notoGujarati.variable}`}>
        <Navbar />
        <WillFormatGujaratiClient />
        <Footer />
      </div>
    </>
  );
}
