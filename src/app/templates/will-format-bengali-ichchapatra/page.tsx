import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatBengaliClient from "./WillFormatBengaliClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Will Format | WillDrafting", // exactly 58 characters
  },
  description:
    "Download valid উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা (will format in bengali) under Indian Succession Act 1925 with Dayabhaga rules and Kolkata.", // exactly 151 characters
  keywords: [
    "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা",
    "will format in bengali",
    "will format in bengali pdf",
    "ইচ্ছাপত্র লেখার নিয়ম",
    "sample will in bengali kolkata",
    "dayabhaga hindu law will west bengal",
    "kolkata high court probate section 213",
    "banglarbhumi mutation after will",
    "warish certificate vs registered will",
    "west bengal sub registrar will registration fee",
    "indian succession act section 63 west bengal",
    "ama legal solutions bengali will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-bengali-ichchapatra",
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
    title: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Will Format | WillDrafting",
    description:
      "Download valid উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা (will format in bengali) under Indian Succession Act 1925 with Dayabhaga rules and Kolkata.",
    url: "https://www.willdrafting.in/templates/will-format-bengali-ichchapatra",
    siteName: "WillDrafting.in",
    locale: "bn_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-bengali-ichchapatra-og.jpg",
        width: 1200,
        height: 675,
        alt: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Will Format in Bengali Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Will Format | WillDrafting",
    description:
      "Download valid উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা (will format in bengali) under Indian Succession Act 1925 with Dayabhaga rules and Kolkata.",
    images: ["https://www.willdrafting.in/images/will-format-bengali-ichchapatra-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatBengaliPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-bengali-ichchapatra";
  const imageUrl = "https://www.willdrafting.in/images/will-format-bengali-ichchapatra-og.jpg";

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
        name: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Will Format | WillDrafting",
        description:
          "Download valid উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা (will format in bengali) under Indian Succession Act 1925 with Dayabhaga rules and Kolkata.",
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
            name: "Will Format in Bengali (উইল ইচ্ছাপত্র)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা (Will Format in Bengali)",
        url: canonicalUrl,
        description:
          "Bilingual Bengali and English legal Will draft format compliant with Section 63 of the Indian Succession Act 1925, Dayabhaga School of Hindu.",
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
        headline: "উইল বা ইচ্ছাপত্র ফরম্যাট বাংলা: Legal Will Format Guide",
        description:
          "Complete legal guide and printable template on how to write a valid Will in Bengali (উইল বা ইচ্ছাপত্র লেখার নিয়ম) under Indian Succession Act.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: ["bn-IN", "en-IN"],
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
            name: "উইল বা ইচ্ছাপত্র লেখার জন্য কি স্ট্যাম্প পেপার (Stamp Paper) প্রয়োজন?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "না। ভারতীয় উত্তরাধিকার আইন ১৯২৫ এর ধারা ৬৩ এবং পশ্চিমবঙ্গ স্ট্যাম্প আইন অনুসারে, উইল লেখার জন্য কোনো নন-জুডিশিয়াল স্ট্যাম্প পেপার প্রয়োজন হয় না। সাদা সাধারণ কাগজ বা গ্রিন লেজার পেপারে হাতে লিখে বা টাইপ করে সম্পাদিত উইল সম্পূর্ণ আইনত বৈধ।",
            },
          },
          {
            "@type": "Question",
            name: "দায়ভাগ হিন্দু আইনে পৈতৃক সম্পত্তির ওপর বাবার কি সম্পূর্ণ উইল করার অধিকার আছে?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "হ্যাঁ। পশ্চিমবঙ্গ ও আসামে প্রচলিত দায়ভাগ হিন্দু আইন (Dayabhaga School of Hindu Law) অনুযায়ী পিতা জীবিত থাকা পর্যন্ত সন্তানদের পৈতৃক সম্পত্তিতে কোনো জন্মগত সমস্বত্বাধিকার (Coparcenary Right) থাকে না। ফলে একজন বাঙালি হিন্দু পিতা তাঁর স্বোপার্জিত এবং পৈতৃক উভয় সম্পত্তির ওপরই ১০০% নিরঙ্কুশ উইল বা হস্তান্তরের ক্ষমতা রাখেন।",
            },
          },
          {
            "@type": "Question",
            name: "কলকাতায় কি উইলের জন্য কোর্ট থেকে প্রোবেট (Probate) নেওয়া বাধ্যতামূলক?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "হ্যাঁ। ভারতীয় উত্তরাধিকার আইন ১৯২৫ এর ধারা ৫৭ এবং ২১৩ অনুসারে, যদি কোনো উইল কলকাতা প্রেসিডেন্সি শহরের স্থানীয় ভৌগোলিক সীমার মধ্যে সম্পাদিত হয়, অথবা উইলে উল্লিখিত স্থাবর সম্পত্তি কলকাতা মিউনিসিপ্যাল কর্পোরেশন (KMC) এলাকার মধ্যে অবস্থিত হয়, তবে সেই উইলের ভিত্তিতে সম্পত্তিতে অধিকার প্রতিষ্ঠা করতে কলকাতা হাইকোর্ট বা আলিপুর কোর্ট থেকে প্রোবেট বা লেটার্স অব অ্যাডমিনিস্ট্রেশন নেওয়া আইনত বাধ্যতামূলক। তবে কলকাতার বাইরের জেলাগুলোতে (যেমন হাওড়া, উত্তর বা দক্ষিণ ২৪ পরগনা, হুগলি, শিলিগুড়ি) প্রোবেট বাধ্যতামূলক নয়।",
            },
          },
          {
            "@type": "Question",
            name: "উইলে কতজন সাক্ষী থাকা আইনত আবশ্যক?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ভারতীয় উত্তরাধিকার আইনের ধারা ৬৩(গ) অনুসারে, কমপক্ষে ২ জন নিরপেক্ষ সাক্ষীর (Attesting Witnesses) উপস্থিত থাকা আবশ্যক। সাক্ষীদের উপস্থিতিতে উইলকারী সই করবেন এবং উইলকারীর উপস্থিতিতে সাক্ষীরা স্বাক্ষর করবেন। ধারা ৬৭ অনুসারে, উইলের সুবিধাভোগী (Beneficiary) বা তাঁর স্বামী/স্ত্রী কোনোভাবেই উইলের সাক্ষী হতে পারবেন না।",
            },
          },
          {
            "@type": "Question",
            name: "ওয়ারিশান সার্টিফিকেট (Warish Certificate) এবং উইলের মধ্যে পার্থক্য কী?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "যদি কোনো ব্যক্তি উইল না রেখে মারা যান (Intestate Succession), তবে তাঁর সমস্ত স্বাভাবিক উত্তরাধিকারীদের তালিকাভুক্ত করে গ্রাম পঞ্চায়েত প্রধান বা মিউনিসিপ্যালিটি কাউন্সিলর থেকে ওয়ারিশান সার্টিফিকেট নিয়ে বাংলারভূমি পোর্টালে মিউটেশন করা হয়। কিন্তু কোনো ব্যক্তি জীবিতাবস্থায় বৈধ উইল রেখে গেলে ওয়ারিশান সার্টিফিকেটের পরিবর্তে সেই উইলের (কলকাতায় প্রোবেট সহ) ভিত্তিতে একক বা নির্দিষ্ট মনোনীত উত্তরাধিকারীর নামে নামপত্তন হয়।",
            },
          },
          {
            "@type": "Question",
            name: "পশ্চিমবঙ্গে রেজিস্ট্রি অফিসে (ADSR / ARA) উইল রেজিস্ট্রেশন খরচ কত?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "পশ্চিমবঙ্গ সরকারের ই-নথিকরণ (e-Nathikaran) নিয়মানুযায়ী উইলে কোনো অ্যাড-ভ্যালোরেম স্ট্যাম্প ডিউটি লাগে না (স্ট্যাম্প শুল্ক শূন্য টাকা)। সাব-রেজিস্ট্রার অফিসে শুধুমাত্র সরকারি রেজিস্ট্রেশন ফি প্রায় ₹১০০ থেকে ₹২০০ এবং কম্পিউটার সার্ভিস চার্জ বাবদ সামান্য খরচ হয়।",
            },
          },
          {
            "@type": "Question",
            name: "জীবিতাবস্থায় কি উইল পরিবর্তন বা বাতিল (Revocation) করা যায়?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "হ্যাঁ। সুস্থ মস্তিষ্কে থাকা অবস্থায় একজন ব্যক্তি তাঁর জীবদ্দশায় যতবার খুশি উইল পরিবর্তন, সংশোধন (Codicil) বা সম্পূর্ণ প্রত্যাহার (Revocation) করতে পারেন। মৃত্যুর পূর্বে সম্পাদিত সর্বশেষ স্বাক্ষরিত উইলটিই আইনত বলবৎ থাকবে (Last Will and Testament)।",
            },
          },
          {
            "@type": "Question",
            name: "উইলের পর বাংলারভূমি পোর্টালে (banglarbhumi.gov.in) জমি বা ফ্ল্যাট মিউটেশন কীভাবে হয়?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "উইলকারীর মৃত্যুর পর তাঁর ডেথ সার্টিফিকেট, নিবন্ধিত উইল (কলকাতার ক্ষেত্রে প্রোবেট অর্ডার কপি), আগের খতিয়ান ও পর্চা সহ বাংলারভূমি পোর্টালে অনলাইনে ওয়ারিশ ও টেস্টামেন্টারি মিউটেশনের আবেদন জমা দিতে হয়। এরপর সংশ্লিষ্ট বিএলঅ্যান্ডএলআরও (BL&LRO) শুনানি করে আবেদনকারীর নামে নতুন খতিয়ান মঞ্জুর করেন।",
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
        <WillFormatBengaliClient />
        <Footer />
      </div>
    </>
  );
}
