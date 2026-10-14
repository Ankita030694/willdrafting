import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyTrust from "@/components/whytrust";
import BelowTrust from "@/components/belowtrust";
import WhatWeDo from "@/components/whatwedo";
import EstateFolderSection from "@/components/EstateFolderSection";
import Process from "@/components/process";
import EstateComparison from "@/components/EstateComparison";
import PoweredByAma from "@/components/PoweredByAma";
import Pricing from "@/components/pricing";
import Testimonial from "@/components/testimonial";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "WillDrafting.in — Legally Valid Online Will in Minutes",
  },
  description:
    "Draft your legally valid Will online in minutes. Powered by AMA Legal Solutions — enter details, verify via OTP, and download a court-ready printout.",
  alternates: {
    canonical: "https://www.willdrafting.in",
  },
  openGraph: {
    title: "WillDrafting.in — Legally Valid Online Will in Minutes",
    description:
      "Draft your legally valid Will online in minutes. Powered by AMA Legal Solutions — enter details, verify via OTP, and download a court-ready printout.",
    url: "https://www.willdrafting.in",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "WillDrafting.in - Legally Valid Online Wills in Minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WillDrafting.in — Legally Valid Online Will in Minutes",
    description:
      "Draft your legally valid Will online in minutes. Powered by AMA Legal Solutions — enter details, verify via OTP, and download a court-ready printout.",
    images: ["/desktopusp.jpg"],
  },
};

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What basic details do I need to keep ready before I start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "You only need everyday details—your full name, date of birth, address, PAN or Aadhaar number, and the names of your immediate family members (such as your spouse, children, or parents). You do not need to upload bulky property deeds just to draft your Will.",
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
        <Hero />
        <WhyTrust />
        <BelowTrust />
        <WhatWeDo />
        <EstateFolderSection />
        <Process />
        <EstateComparison />
        <PoweredByAma />
        <Pricing />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
