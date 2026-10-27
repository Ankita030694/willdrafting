import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatMalayalamClient from "./WillFormatMalayalamClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "മരണപത്രം ഫോർമാറ്റ് മലയാളം | Will Format in Malayalam", // exactly 52 characters
  },
  description:
    "Download legally valid മരണപത്രം ഫോർമാറ്റ് മലയാളം (will format in malayalam) under Indian Succession Act 1925 with Kerala PEARL SRO registration guide.", // exactly 150 characters
  keywords: [
    "മരണപത്രം ഫോർമാറ്റ് മലയാളം",
    "will format in malayalam",
    "maranapathram sample malayalam pdf",
    "വിൽപത്രം എഴുതുന്ന വിധം",
    "will format in malayalam kerala",
    "kerala pearl will registration fee",
    "indian succession act section 63 kerala",
    "kerala probate exemption high court",
    "kerala resurvey thandapper will schedule",
    "village office pokkuvarav will mutation",
    "ama legal solutions malayalam will draft",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
    languages: {
      "ml-IN": "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
      "en-IN": "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
      "x-default": "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
    },
  },
  openGraph: {
    title: "മരണപത്രം ഫോർമാറ്റ് മലയാളം | Will Format in Malayalam",
    description:
      "Download legally valid മരണപത്രം ഫോർമാറ്റ് മലയാളം (will format in malayalam) under Indian Succession Act 1925 with Kerala PEARL SRO registration guide.",
    url: "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
    siteName: "WillDrafting.in",
    locale: "ml_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-malayalam-maranapathram-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Format in Malayalam: മരണപത്രം ഫോർമാറ്റ് മലയാളം (Maranapathram) Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "മരണപത്രം ഫോർമാറ്റ് മലയാളം | Will Format in Malayalam",
    description:
      "Download legally valid മരണപത്രം ഫോർമാറ്റ് മലയാളം (will format in malayalam) under Indian Succession Act 1925 with Kerala PEARL SRO registration guide.",
    images: ["https://www.willdrafting.in/images/will-format-malayalam-maranapathram-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatMalayalamPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram";
  const imageUrl = "https://www.willdrafting.in/images/will-format-malayalam-maranapathram-og.jpg";

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
        name: "മരണപത്രം ഫോർമാറ്റ് മലയാളം | Will Format in Malayalam",
        description:
          "Download legally valid മരണപത്രം ഫോർമാറ്റ് മലയാളം (will format in malayalam) under Indian Succession Act 1925 with Kerala PEARL SRO registration guide.",
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
            name: "Will Format in Malayalam (മരണപത്രം)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "മരണപത്രം ഫോർമാറ്റ് മലയാളം (Will Format in Malayalam)",
        url: canonicalUrl,
        description:
          "Bilingual Malayalam and English legal Will draft format compliant with Section 63 of the Indian Succession Act 1925, Kerala Registration Rules, PEARL portal guidelines, and Kerala High Court probate exemption rulings.",
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
        headline: "മരണപത്രം ഫോർമാറ്റ് മലയാളം: Legal Will Format in Kerala",
        description:
          "Complete legal guide and printable template on how to write a valid Will in Malayalam (വിൽപത്രം എഴുതുന്ന വിധം) under Indian Succession Act 1925 with Kerala SRO and revenue mutation rules.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: ["ml-IN", "en-IN"],
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
            name: "കേരളത്തിൽ മരണപത്രം (വിൽപത്രം) എഴുതാൻ മുദ്രപ്പത്രം (Stamp Paper) ആവശ്യമുണ്ടോ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ഇല്ല. ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം (Indian Succession Act, 1925) സെക്ഷൻ 63 പ്രകാരവും കേരള സ്റ്റാമ്പ് ആക്ട് പ്രകാരവും വിൽപത്രം തയ്യാറാക്കാൻ മുദ്രപ്പത്രം നിർബന്ധമില്ല (സീറോ സ്റ്റാമ്പ് ഡ്യൂട്ടി). സാധാരണ വെള്ളക്കടലാസിലോ ഗ്രീൻ ലെഡ്ജർ പേപ്പറിലോ കൈപ്പടയിലോ ടൈപ്പ് ചെയ്തോ തയ്യാറാക്കിയ മരണപത്രത്തിന് പൂർണ്ണ നിയമസാധുതയുണ്ട്.",
            },
          },
          {
            "@type": "Question",
            name: "കേരളത്തിൽ മരണപത്രം സബ് രജിസ്ട്രാർ ഓഫീസിൽ രജിസ്റ്റർ ചെയ്യുന്നത് നിർബന്ധമാണോ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "രജിസ്ട്രേഷൻ ആക്ട് 1908 സെക്ഷൻ 18(e) പ്രകാരം വിൽപത്രം രജിസ്റ്റർ ചെയ്യുന്നത് നിർബന്ധമല്ല, ഐച്ഛികമാണ് (optional). എന്നാൽ രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടൽ വഴി സബ് രജിസ്ട്രാർ ഓഫീസിൽ രജിസ്റ്റർ ചെയ്യുന്നത് ഭാവിയിൽ ഉയരാനിടയുള്ള വ്യാജരേഖാ ആരോപണങ്ങളും കോടതി തർക്കങ്ങളും ഒഴിവാക്കാൻ അതിശക്തമായ നിയമ പരിരക്ഷ നൽകുന്നു.",
            },
          },
          {
            "@type": "Question",
            name: "കേരളത്തിലെ സ്വത്തുക്കൾക്കുള്ള മരണപത്രത്തിന് കോടതി പ്രൊബേറ്റ് (Probate) നിർബന്ധമാണോ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "അല്ല. ഇന്ത്യൻ പിന്തുടർച്ചാവകാശ നിയമം സെക്ഷൻ 213, സെക്ഷൻ 57 എന്നിവ പഴയ പ്രസിഡൻസി നഗരങ്ങളായ ചെന്നൈ, മുംബൈ, കൊൽക്കത്ത എന്നിവിടങ്ങളിലെ സ്വത്തുക്കൾക്ക് മാത്രമാണ് ബാധകം. കേരള ഹൈക്കോടതിയുടെ പ്രമുഖ വിധികൾ (Mary Thomas v. Dr. K.E. Thomas) വ്യക്തമാക്കുന്നത് പോലെ കേരളത്തിലുള്ള ഹിന്ദു, ക്രിസ്ത്യൻ, മുസ്ലിം വിഭാഗങ്ങളുടെ സ്വത്തുക്കൾക്ക് കോടതി പ്രൊബേറ്റ് നിർബന്ധമല്ല. രജിസ്റ്റർ ചെയ്ത വിൽപത്രവും മരണ സർട്ടിഫിക്കറ്റും ഉപയോഗിച്ച് വില്ലേജ് ഓഫീസിൽ നേരിട്ട് പോക്കുവരവ് നടത്താം.",
            },
          },
          {
            "@type": "Question",
            name: "മരണപത്രത്തിൽ എത്ര സാക്ഷികൾ ഒപ്പുവെക്കണം?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "സെക്ഷൻ 63(c) പ്രകാരം കുറഞ്ഞത് 2 സാക്ഷികൾ (Attesting Witnesses) വിൽപത്രം തയ്യാറാക്കുന്നയാൾ ഒപ്പിടുന്നത് നേരിട്ട് കണ്ട് സാക്ഷ്യപ്പെടുത്തി ഒപ്പിടണം. സെക്ഷൻ 67 പ്രകാരം വിൽപത്രത്തിലൂടെ സ്വത്ത് ലഭിക്കുന്ന ഗുണഭോക്താവോ അവരുടെ ജീവിതപങ്കാളിയോ സാക്ഷികളാകാൻ പാടില്ല.",
            },
          },
          {
            "@type": "Question",
            name: "കുടുംബ സ്വത്ത് (Ancestral Property) വിൽപത്രത്തിലൂടെ പൂർണ്ണമായി എഴുതിക്കൊടുക്കാൻ കഴിയുമോ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "സ്വയം ആർജ്ജിച്ച സ്വത്തുക്കൾ (Self-Acquired Property) ആർക്കും തന്റെ ഇഷ്ടപ്രകാരം എഴുതിക്കൊടുക്കാം. കേരളത്തിൽ 1975 ലെ ജോയിന്റ് ഹിന്ദു ഫാമിലി സിസ്റ്റം (അബോലിഷൻ) ആക്ട് പ്രകാരം ജന്മാവകാശം റദ്ദാക്കപ്പെട്ടതിനാൽ, കുടുംബ സ്വത്തിൽ തനിക്ക് വിഭജനത്തിലൂടെ ലഭിച്ച നിയമപരമായ ഓഹരിയിൽ മാത്രമേ ഒരാൾക്ക് വിൽപത്രം എഴുതാൻ അവകാശമുള്ളൂ.",
            },
          },
          {
            "@type": "Question",
            name: "കേരള രജിസ്ട്രേഷൻ വകുപ്പിന്റെ PEARL പോർട്ടലിൽ വിൽപത്രം രജിസ്റ്റർ ചെയ്യുന്നതിനുള്ള ഫീസ് എത്രയാണ്?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "കേരള രജിസ്ട്രേഷൻ ചട്ടങ്ങൾ അനുസരിച്ച് വിൽപത്രത്തിന് സ്റ്റാമ്പ് ഡ്യൂട്ടി ഇല്ല (₹0). രജിസ്ട്രേഷൻ ഫീസ് ₹1,000 നും കമ്പ്യൂട്ടർ സർവീസ് ഫീസ് ₹100 ഉം ഉൾപ്പെടെ ആകെ ₹1,100 മുതൽ ₹1,200 വരെ മാത്രമാണ് സർക്കാർ ഫീസ് വരുന്നത്.",
            },
          },
          {
            "@type": "Question",
            name: "കിടപ്പുരോഗികൾക്കും പ്രായമായവർക്കും വീട്ടിലിരുന്ന് വിൽപത്രം രജിസ്റ്റർ ചെയ്യാൻ കഴിയുമോ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "അതെ. രജിസ്ട്രേഷൻ ആക്ട് സെക്ഷൻ 31 പ്രകാരം കമ്മീഷൻ രജിസ്ട്രേഷൻ (Commission Visit) സൗകര്യം ലഭ്യമാണ്. അപേക്ഷയും ഡോക്ടറുടെ മെഡിക്കൽ സർട്ടിഫിക്കറ്റും സമർപ്പിച്ചാൽ സബ് രജിസ്ട്രാർ വീട്ടിലോ ആശുപത്രിയിലോ നേരിട്ടെത്തി വിൽപത്രം രജിസ്റ്റർ ചെയ്തു തരും.",
            },
          },
          {
            "@type": "Question",
            name: "രജിസ്റ്റർ ചെയ്ത വിൽപത്രം ഉപയോഗിച്ച് വില്ലേജ് ഓഫീസിൽ പോക്കുവരവ് (പോക്കുവരവ് / തണ്ടപ്പേർ മാറ്റം) ചെയ്യുന്നത് എങ്ങനെ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "വിൽപത്രം എഴുതിയ ആൾ മരണമടഞ്ഞ ശേഷം തദ്ദേശസ്ഥാപനത്തിൽ നിന്നുള്ള മരണ സർട്ടിഫിക്കറ്റ്, രജിസ്റ്റർ ചെയ്ത വിൽപത്രത്തിന്റെ സാക്ഷ്യപ്പെടുത്തിയ പകർപ്പ്, ബാധ്യതാ സർട്ടിഫിക്കറ്റ് (EC), മുൻ ആധാരം എന്നിവ സഹിതം കേരള റവന്യൂ ഇ-സർവീസസ് പോർട്ടലിലൂടെ (revenue.kerala.gov.in) ഓൺലൈനായി പോക്കുവരവിന് അപേക്ഷിക്കാം. വില്ലേജ് ഓഫീസർ പരിശോധന നടത്തി തണ്ടപ്പേർ മാറ്റി പുതിയ ഭൂനികുതി രസീത് നൽകും.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <WillFormatMalayalamClient />
      <Footer />
    </>
  );
}
