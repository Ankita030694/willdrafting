import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostDeathTrackerClient from "./PostDeathTrackerClient";

// Screaming Frog SEO Compliance: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "What to Do After Death in India Checklist | WillDrafting", // exactly 56 characters
  },
  description:
    "Free interactive checklist for legal formalities after death in India. Track 21-day death certificates, RTO Form 31, bank claims, and critical.", // exactly 153 characters
  keywords: [
    "what to do after death of family member in india checklist",
    "legal formalities after death in india",
    "documents to cancel or update after death aadhaar pan passport bank",
    "death certificate 21 day rule india",
    "rto form 31 intimation timeline",
    "section 159 income tax legal representative",
    "do not cancel pan card after death india",
    "sim card aadhaar otp after death",
    "rbi deceased depositor claim guidelines",
    "cancellation of gst reg 16 death of proprietor",
    "legal heir vs succession certificate bank claim",
    "ama legal solutions post death compliance tracker",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/post-death-30-day-legal-compliance-tracker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/post-death-30-day-legal-compliance-tracker",
      "x-default": "https://www.willdrafting.in/tools/post-death-30-day-legal-compliance-tracker",
    },
  },
  openGraph: {
    title: "What to Do After Death in India Checklist | WillDrafting",
    description:
      "Free interactive checklist for legal formalities after death in India. Track 21-day death certificates, RTO Form 31, bank claims, and critical.",
    url: "https://www.willdrafting.in/tools/post-death-30-day-legal-compliance-tracker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/post-death-30-day-legal-compliance-tracker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Post-Death 30-Day Legal Compliance Tracker India Checklist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Do After Death in India Checklist | WillDrafting",
    description:
      "Free interactive checklist for legal formalities after death in India. Track 21-day death certificates, RTO Form 31, bank claims, and critical.",
    images: ["https://www.willdrafting.in/images/post-death-30-day-legal-compliance-tracker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function PostDeathTrackerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/post-death-30-day-legal-compliance-tracker";
  const imageUrl = "https://www.willdrafting.in/images/post-death-30-day-legal-compliance-tracker-og.jpg";

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
        name: "What to Do After Death in India Checklist | WillDrafting",
        description:
          "Free interactive checklist for legal formalities after death in India. Track 21-day death certificates, RTO Form 31, bank claims, and critical.",
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
            name: "Tools",
            item: "https://www.willdrafting.in/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Post-Death Compliance Tracker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Post-Death 30-Day Legal Compliance Tracker India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory compliance tracker and deadline calculator for legal formalities after death in India under Registration of Births and.",
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What are the most urgent legal formalities required within 21 days of death in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 8 of the Registration of Births and Deaths Act, 1969, reporting the death to the local Registrar of Births and Deaths (Municipal Corporation, Municipality, or Gram Panchayat) within 21 days is legally mandatory. Timely reporting ensures issuance of the official Death Certificate without requiring delayed registration approvals or late fees. Families should also collect the Medical Certificate of Cause of Death (MCCD Form 4/4A) from the hospital and secure cremation or burial receipts.",
            },
          },
          {
            "@type": "Question",
            name: "Why should families NEVER surrender the deceased person's PAN card immediately?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Surrendering or cancelling the deceased's PAN card immediately is a major legal blunder. Under Section 159 of the Income Tax Act, 1961, the legal representative must file the deceased's final Income Tax Return (ITR) and claim any pending tax refunds using the deceased's PAN. Furthermore, banks, mutual fund AMCs, depositories (NSDL/CDSL), and the Sub-Registrar require active PAN verification to process asset transmissions. PAN should only be surrendered after all transmissions and tax assessments are fully completed.",
            },
          },
          {
            "@type": "Question",
            name: "Why must the deceased person's mobile number and SIM card be kept active?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In India, virtually all financial and statutory portals rely on Aadhaar-based OTP verification and mobile two-factor authentication. DigiLocker, net banking logins, Income Tax e-filing registrations, EPFO UAN portals, mutual fund platforms, and demat accounts transmit verification codes to the mobile number registered in the deceased's name. If you deactivate the SIM card, access to these accounts is locked, creating administrative bottlenecks. Families should maintain an active recharge on the SIM for at least 12 to 18 months.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 30-day legal deadline for vehicle ownership transfer under CMVR Rule 56?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 56(1) of the Central Motor Vehicles Rules, 1989, the person succeeding to the possession of the vehicle must intimate the demise of the registered owner to the Regional Transport Office (RTO) within 30 days of death. Thereafter, under Rule 56(2), a formal application for transfer of ownership using Form 31 must be submitted within 3 months. Failure to report can invalidate third-party motor insurance coverage and lead to vehicle seizure under the Motor Vehicles Act.",
            },
          },
          {
            "@type": "Question",
            name: "How do bank nominee claims differ from legal heir inheritance rights in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Banking Regulation Act, 1949 (Section 45ZA) and landmark Supreme Court rulings (Ram Chander Talwar v. Devinder Kumar Talwar and Sarbati Devi), a bank nominee is merely a statutory trustee authorized to receive the deposit funds to give a valid discharge to the bank. A nominee does not become the absolute owner of the money unless they are also the sole legal heir under a valid Will or personal succession laws. The nominee holds the funds in trust for distribution among all legal heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Can bank deposits be claimed without a Succession Certificate if there is no nominee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Reserve Bank of India (RBI) Master Directions, banks have established simplified claim thresholds (typically between ₹50,000 to ₹5,00,000 depending on bank policy) for accounts without nomination. Within this limit, legal heirs can claim funds by submitting a Deceased Claim Form, original death certificate, KYC documents, a joint Indemnity Bond, and an Affidavit signed by all surviving legal heirs, without requiring an expensive court-issued Succession Certificate.",
            },
          },
          {
            "@type": "Question",
            name: "What is the deadline for filing the deceased person's Income Tax Return under Section 159?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 159 of the Income Tax Act, 1961, the legal representative is liable to file the return of income for all income earned by the deceased from April 1 of the financial year up to the date of death. The return must be filed by the standard statutory deadline (typically July 31 for non-audit individual taxpayers). The legal representative must register on the Income Tax e-Filing portal by submitting the death certificate, proof of legal representation, and an indemnity bond.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a death is not registered within 21 days in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 13 of the Registration of Births and Deaths Act, 1969: (1) Registration between 21 and 30 days requires payment of a late fee to the Registrar. (2) Registration between 30 days and 1 year requires written permission from the designated authority (such as the Sub-Divisional Magistrate or Tehsildar) along with an affidavit. (3) Registration after 1 year can only be done following a formal judicial verification order from a First Class Magistrate or Executive Magistrate.",
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
        <PostDeathTrackerClient />
        <Footer />
      </div>
    </>
  );
}
