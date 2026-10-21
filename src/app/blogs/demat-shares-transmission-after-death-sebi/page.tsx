import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "demat-shares-transmission-after-death-sebi" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "demat-shares-transmission-after-death-sebi" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import DematSharesTransmissionClient from "./DematSharesTransmissionClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Demat Shares Transmission After Death: SEBI Rules & Process",
//   },
//   description:
//     "Transfer demat shares after death under SEBI rules. Learn nominee rights, Rs 15 lakh threshold, Form ISR-5, and succession steps with WillDrafting.",
//   keywords: [
//     "transmission of shares after death",
//     "demat account transmission after death",
//     "SEBI transmission rules",
//     "share transfer after death of holder",
//     "nominee vs legal heir shares",
//     "Form ISR-5 SEBI",
//     "transmission of mutual fund units deceased holder",
//     "depository participant transmission NSDL CDSL",
//     "succession certificate for demat shares",
//     "legal heir claim shares SEBI circular",
//     "shakti yezdani nominee supreme court",
//     "demat shares inheritance without will",
//   ],
//   alternates: {
//     canonical: "https://www.willdrafting.in/blogs/demat-shares-transmission-after-death-sebi",
//     languages: {
//       "en-IN": "https://www.willdrafting.in/blogs/demat-shares-transmission-after-death-sebi",
//       "x-default": "https://www.willdrafting.in/blogs/demat-shares-transmission-after-death-sebi",
//     },
//   },
//   openGraph: {
//     title: "Demat Shares Transmission After Death: SEBI Rules & Process",
//     description:
//       "Transfer demat shares after death under SEBI rules. Learn nominee rights, Rs 15 lakh threshold, Form ISR-5, and succession steps with WillDrafting.",
//     url: "https://www.willdrafting.in/blogs/demat-shares-transmission-after-death-sebi",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/demat-shares-transmission-sebi-process.jpg",
//         width: 1200,
//         height: 675,
//         alt: "Transmission of Shares After Death SEBI Demat Account Nominee and Legal Heirs Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Demat Shares Transmission After Death: SEBI Rules & Process",
//     description:
//       "Transfer demat shares after death under SEBI rules. Learn nominee rights, Rs 15 lakh threshold, Form ISR-5, and succession steps with WillDrafting.",
//     images: ["https://www.willdrafting.in/images/demat-shares-transmission-sebi-process.jpg"],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     "max-snippet": -1,
//     "max-image-preview": "large",
//     "max-video-preview": -1,
//   },
// };
// 
// export default function DematSharesTransmissionPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/demat-shares-transmission-after-death-sebi";
//   const imageUrl =
//     "https://www.willdrafting.in/images/demat-shares-transmission-sebi-process.jpg";
// 
//   const schemaGraph = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         "@id": "https://www.willdrafting.in/#organization",
//         name: "WillDrafting.in",
//         url: "https://www.willdrafting.in",
//         logo: "https://www.willdrafting.in/Logofinal.svg",
//         parentOrganization: {
//           "@type": "LegalService",
//           name: "WillDrafting.in",
//           url: "https://www.willdrafting.in/contact",
//         },
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${canonicalUrl}#webpage`,
//         url: canonicalUrl,
//         name: "Demat Shares Transmission After Death: SEBI Rules & Process",
//         description:
//           "Transfer demat shares after death under SEBI rules. Learn nominee rights, Rs 15 lakh threshold, Form ISR-5, and succession steps with WillDrafting.",
//         isPartOf: {
//           "@type": "WebSite",
//           "@id": "https://www.willdrafting.in/#website",
//           name: "WillDrafting.in",
//           url: "https://www.willdrafting.in",
//         },
//       },
//       {
//         "@type": "BreadcrumbList",
//         "@id": `${canonicalUrl}#breadcrumb`,
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Home",
//             item: "https://www.willdrafting.in",
//           },
//           {
//             "@type": "ListItem",
//             position: 2,
//             name: "Blogs",
//             item: "https://www.willdrafting.in/blogs",
//           },
//           {
//             "@type": "ListItem",
//             position: 3,
//             name: "Demat Shares Transmission After Death",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Transmission of Demat Shares After Death: Complete SEBI Guide",
//         description:
//           "Master the transmission of demat shares after death under SEBI regulations. Understand nominee vs legal heir rights, simplified Rs 15 lakh thresholds, Form ISR-5, and court requirements.",
//         image: imageUrl,
//         inLanguage: "en-IN",
//         mainEntityOfPage: canonicalUrl,
//         datePublished: "2026-10-20T10:00:00+05:30",
//         dateModified: "2026-10-20T15:00:00+05:30",
//         articleSection: "Capital Markets & Inheritance Law",
//         author: {
//           "@type": "Person",
//           name: "Advocate Rajeshwar Rao",
//           jobTitle: "Senior Estate & Succession Counsel",
//           worksFor: {
//             "@type": "LegalService",
//             name: "WillDrafting.in",
//           },
//         },
//         publisher: {
//           "@type": "Organization",
//           name: "WillDrafting.in",
//           logo: {
//             "@type": "ImageObject",
//             url: "https://www.willdrafting.in/Logofinal.svg",
//           },
//         },
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is the difference between transfer and transmission of shares?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A transfer is a voluntary sale or gift of shares made while the holder is alive, requiring a transfer deed and stamp duty. Transmission happens automatically by operation of law upon the death, bankruptcy, or insolvency of the holder, requiring zero stamp duty.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does a nominee become the absolute legal owner of demat shares?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. The Supreme Court of India in Shakti Yezdani v. Jayanand Salgaonkar (2023) confirmed that a nominee is merely a trustee or custodian. While the depository transfers shares to the nominee, the legal ownership belongs to the heirs named in the Will or statutory heirs under succession law.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is the SEBI monetary threshold for transmission without a nominee?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under the SEBI Master Circular dated May 18, 2022, the monetary threshold for demat securities held without a nominee is Rs 15 Lakhs per depository participant account. For physical share certificates, the threshold is Rs 5 Lakhs per listed company.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can demat shares valued under Rs 15 Lakhs be claimed without a court order?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. For demat portfolios valued up to Rs 15 Lakhs without a nominee, legal heirs can submit Form ISR-5, the death certificate, a Legal Heir Certificate, an affidavit, an indemnity bond, and No Objection Certificates from non-claimants without filing a civil court petition.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "When is a Succession Certificate mandatory for demat share transmission?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Succession Certificate granted by a Civil Court under Part X of the Indian Succession Act, 1925 is mandatory when the deceased sole holder did not register a nominee and the portfolio value exceeds Rs 15 Lakhs, or whenever legal heirs raise competing disputes.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What happens to a joint demat account when one holder passes away?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under the joint survivorship clause, the shares do not go to legal heirs or nominees immediately. The surviving joint holder(s) submit Form ISR-5 and the death certificate, and the depository transmits the entire portfolio into a demat account opened in the name of the survivor(s).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is Form ISR-5 and where do I submit it?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Form ISR-5 is the standardized Transmission Request Form created by SEBI for claiming securities after the holder's demise. You submit Form ISR-5 along with supporting identity and kinship documents directly to the depository participant broker (such as Zerodha, ICICI Direct, or Groww).",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How can multiple legal heirs divide inherited demat shares?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Legal heirs can either open separate individual demat accounts and specify their percentage entitlement on Form ISR-5, or execute a registered Family Settlement Deed or notarized No Objection Certificates (NOC) allowing one heir to receive the shares on behalf of the family.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How are mutual fund units transmitted after the death of the investor?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Mutual fund units in demat mode follow SEBI depository rules through your broker. Units held in Statement of Account (SoA) mode are transmitted through AMFI Form T2 (for joint holders) or Form T3 (for nominees or legal heirs) submitted via MF Central, CAMS, or KFintech.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does having a registered Will prevent demat transmission delays?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. An advocate-drafted registered Will clearly specifies who inherits each stock and names an executor. This removes ambiguity, protects against family disputes, avoids civil court petitions, and saves your family months in paperwork.",
//             },
//           },
//         ],
//       },
//     ],
//   };
// 
//   return (
//     <>
//       <Navbar />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
//       />
//       <DematSharesTransmissionClient />
//       <Footer />
//     </>
//   );
// }
// 
