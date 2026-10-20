import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/process";
import EstateComparison from "@/components/EstateComparison";
import WhyTrust from "@/components/whytrust";
import EstateFolderSection from "@/components/EstateFolderSection";
import Pricing from "@/components/pricing";
import Testimonial from "@/components/testimonial";
import FAQ from "@/components/faq";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
  title: {
    absolute: "India's First Online Will Drafting Platform | WillDrafting.in",
  },
  description:
    "India's first online will drafting platform. Create a legally valid Will online in India in minutes. Lawyer-verified and court-ready PDF powered by AMA Legal Solutions.",
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
    "online will for nri india",
    "lawyer verified will india",
    "will under indian succession act 1925",
    "hindu will drafting online",
    "muslim wasiyat online india",
    "christian parsi will india",
    "will on plain paper india",
    "nominee vs legal heir will india",
    "ama legal solutions will drafting",
    "court ready will printout india",
    "estate planning india online",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in",
  },
  openGraph: {
    title: "India's First Online Will Drafting Platform | WillDrafting.in",
    description:
      "India's first online will drafting platform. Create a legally valid Will online in India in minutes. Lawyer-verified and court-ready PDF powered by AMA Legal Solutions.",
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
      "India's first online will drafting platform. Create a legally valid Will online in India in minutes. Lawyer-verified and court-ready PDF powered by AMA Legal Solutions.",
    images: ["/desktopusp.jpg"],
  },
};

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/#howto",
      "name": "How to Make a Legally Valid Will Online in India",
      "description":
        "Step-by-step process to draft, verify, and execute a legally valid Will in India under Section 63 of the Indian Succession Act, 1925.",
      "totalTime": "PT15M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": "2490",
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Family, Beneficiary & Asset Details",
          "text": "Complete the guided online Will questionnaire (in English or Hindi, or via AI voice assistant) listing your family members, immovable properties, bank accounts, Demat holdings, mutual funds, and jewellery.",
          "url": "https://www.willdrafting.in/#how-it-works",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Assign Percentage Shares, Executors & Minor Guardians",
          "text": "Allocate exact percentage shares (totalling 100%) for each asset, name a primary and alternate Executor under Section 222, and appoint testamentary guardians for minor children.",
          "url": "https://www.willdrafting.in/#how-it-works",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Verify via OTP & Optional High Court Advocate Review",
          "text": "Review your structured Will clause-by-clause, lock it with OTP verification, and optionally have an Indian succession advocate at AMA Legal Solutions verify every clause.",
          "url": "https://www.willdrafting.in/pricing",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Print on Plain A4 Paper & Sign with Two Witnesses",
          "text": "Download your court-ready Will PDF, print it on plain white A4 paper (no stamp paper required under the Indian Stamp Act, 1899), and sign in the simultaneous presence of two independent adult witnesses under Section 63 of the Indian Succession Act, 1925.",
          "url": "https://www.willdrafting.in/blogs/will-valid-on-plain-paper-india",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What basic details do I need to keep ready before I start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "You only need everyday details: your full name, date of birth, address, PAN or Aadhaar number, and the names of your immediate family members (such as your spouse, children, or parents). You do not need to upload bulky property deeds just to draft your Will.",
          },
        },
        {
          "@type": "Question",
          "name": "What kinds of property, bank accounts, and savings can I include in my Will?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "You can include your house, flat, or land, bank savings and fixed deposits, mutual funds, Demat shares, life insurance policies, gold and jewellery, vehicles, business interests, and even digital accounts. You can list as many assets as you own.",
          },
        },
        {
          "@type": "Question",
          "name": "What if my house or car still has an ongoing bank loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "That is completely fine. While adding an asset, you can simply select that it has an active loan and mention the bank or loan details so your Will clearly records how it should be handled for your family.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I divide a single property or bank account among multiple family members?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. For every asset, you can choose who receives it and split it in any percentage you like (for example, 50% each to two children, or 100% to your spouse). You can also name a backup person for any asset just in case.",
          },
        },
        {
          "@type": "Question",
          "name": "What happens to assets I buy in the future after making this Will?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "During the questionnaire, you will choose who should receive any remaining or future assets not separately listed. This ensures that even if you open a new bank account or buy minor items later, they are automatically covered.",
          },
        },
        {
          "@type": "Question",
          "name": "Who is an Executor, and whom should I name?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "An Executor is simply the trusted person who will make sure your wishes in the Will are carried out smoothly. Most people choose their spouse, an adult child, a sibling, or a trusted family friend. You can also name an alternate person as a backup.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I make sure my children are cared for if they are under 18?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "If you have minor children, our guided flow includes a dedicated step where you can name a trusted Guardian (and a backup Guardian) to look after their upbringing and protect their share until they turn 18.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I add personal wishes or special instructions for specific family items?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. You can write specific notes for individual assets (such as family heirlooms or jewellery), mention any pending loans or obligations, and include your personal funeral or charitable wishes.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I know I haven't missed anything, and can anyone edit my Will later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Before generating your final Will, you review all your details section by section and confirm them with a one-time password (OTP) sent to your email. Once you verify with the OTP, your Will is locked so nobody can alter your wishes, and our automatic check makes sure all shares add up to 100%.",
          },
        },
        {
          "@type": "Question",
          "name": "Once I download my Will PDF, how do I make it legally valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Simply print the downloaded PDF on plain A4 paper, sign it in the presence of two adult witnesses (who are not beneficiaries in your Will), and have both witnesses sign alongside you. Your Will is immediately valid, and you can also register it at your local Sub-Registrar's office if you wish.",
          },
        },
        {
          "@type": "Question",
          "name": "Can NRIs and OCIs living in the US, UK, UAE, Canada, or Australia draft a valid Will for Indian property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. NRIs and OCIs holding residential or commercial real estate, NRE/NRO/FCNR bank accounts, mutual funds, or Demat portfolios in India should maintain a separate Indian Will under the Two-Will Strategy. This avoids 12 to 18 months of foreign probate re-sealing delays under Section 228 of the Indian Succession Act, 1925 and streamlines FEMA repatriation.",
          },
        },
        {
          "@type": "Question",
          "name": "I already added a nominee on my bank account, mutual funds, and Demat account. Do I still need a Will?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. As reaffirmed by the Supreme Court of India in Sarbati Devi and Shakti Yezdani (2023), a bank, insurance, or Demat nominee is only a provisional trustee (custodian) who receives the asset for discharge of institutional liability, not the legal owner. Only a valid Will legally transfers permanent ownership to your chosen beneficiaries.",
          },
        },
        {
          "@type": "Question",
          "name": "Does WillDrafting.in support Hindu, Muslim (Wasiyat), Christian, and Parsi succession laws in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Our legal-tech drafting engine and AMA Legal Solutions advocates structure Wills compliant with the Hindu Succession Act, 1956 (for Hindus, Buddhists, Sikhs, and Jains), Muslim Personal Law Shariat Wasiyat rules (including the 1/3rd testamentary limit), and the Indian Succession Act, 1925 (for Christians, Parsis, and inter-faith marriages under the Special Marriage Act).",
          },
        },
        {
          "@type": "Question",
          "name": "Is Will registration or Probate mandatory in India (including Mumbai, Chennai, and Kolkata)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Under Section 18(e) of the Registration Act, 1908, registering a Will is completely optional across India. An unregistered Will signed before two witnesses on plain paper is 100% legally valid. Furthermore, following the Repealing and Amending Act, 2025 (omitting Section 213 of the Indian Succession Act), compulsory High Court probate in Mumbai, Chennai, and Kolkata is no longer a statutory bar for uncontested Wills.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA) }}
      />
      <Navbar />
      <main style={{ flex: "1 0 auto" }}>
        {/* 1st: Hero Section */}
        <Hero />

        {/* 2nd: Working Process */}
        <Process />

        {/* 3rd: What Happens If You Die Without a Will */}
        <EstateComparison />

        {/* 4th: Why WillDrafting */}
        <WhyTrust />

        {/* Sample Will & Estate Folder Section */}
        <EstateFolderSection />

        {/* Pricing */}
        <Pricing />

        {/* 6th: Testimonials */}
        <Testimonial />

        {/* 7th: FAQ */}
        <FAQ />

        {/* Map */}
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
