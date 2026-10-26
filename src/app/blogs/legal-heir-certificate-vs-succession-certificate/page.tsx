import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "legal-heir-certificate-vs-succession-certificate" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "legal-heir-certificate-vs-succession-certificate" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import LegalHeirCertificateVsSuccessionCertificateClient from "./LegalHeirCertificateVsSuccessionCertificateClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Legal Heir vs Succession Certificate: Key Differences",
//   },
//   description:
//     "Compare Legal Heir Certificate and Succession Certificate in India. Learn key differences, court fees, asset procedures, and when each is required by law.",
//   keywords: [
//     "legal heir certificate vs succession certificate",
//     "legal heir certificate",
//     "succession certificate",
//     "legal heir certificate documents",
//     "which certificate do I need",
//     "legal heir certificate online",
//     "part x indian succession act 1925",
//     "section 370 indian succession act",
//     "tehsildar legal heir certificate",
//     "succession certificate court fees",
//     "property transfer after death without will",
//     "bank account claim deceased legal heir",
//   ],
//   alternates: {
//     canonical: "https://www.willdrafting.in/blogs/legal-heir-certificate-vs-succession-certificate",
//     languages: {
//       "en-IN": "https://www.willdrafting.in/blogs/legal-heir-certificate-vs-succession-certificate",
//       "x-default": "https://www.willdrafting.in/blogs/legal-heir-certificate-vs-succession-certificate",
//     },
//   },
//   openGraph: {
//     title: "Legal Heir vs Succession Certificate: Key Differences",
//     description:
//       "Compare Legal Heir Certificate and Succession Certificate in India. Learn key differences, court fees, asset procedures, and when each is required by law.",
//     url: "https://www.willdrafting.in/blogs/legal-heir-certificate-vs-succession-certificate",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/legal-heir-certificate-vs-succession-certificate-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Legal Heir Certificate vs Succession Certificate Differences and Comparison Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Legal Heir vs Succession Certificate: Key Differences",
//     description:
//       "Compare Legal Heir Certificate and Succession Certificate in India. Learn key differences, court fees, asset procedures, and when each is required by law.",
//     images: ["https://www.willdrafting.in/images/legal-heir-certificate-vs-succession-certificate-og.jpg"],
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
// export default function LegalHeirCertificateVsSuccessionCertificatePage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/legal-heir-certificate-vs-succession-certificate";
//   const imageUrl =
//     "https://www.willdrafting.in/images/legal-heir-certificate-vs-succession-certificate-og.jpg";
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
//         name: "Legal Heir vs Succession Certificate: Key Differences",
//         description:
//           "Compare Legal Heir Certificate and Succession Certificate in India. Learn key differences, court fees, asset procedures, and when each is required by law.",
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
//             name: "Legal Heir vs Succession Certificate",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Legal Heir Certificate vs Succession Certificate Explained",
//         description:
//           "Compare Legal Heir Certificate and Succession Certificate in India. Learn key differences, court fees, asset procedures, and when each is required by law.",
//         image: imageUrl,
//         datePublished: "2026-10-20T09:00:00+05:30",
//         dateModified: "2026-10-20T12:00:00+05:30",
//         author: {
//           "@type": "Person",
//           name: "Advocate Anuj Anand Malik",
//           jobTitle: "Senior Estate & Succession Counsel",
//           affiliation: {
//             "@type": "LegalService",
//             name: "WillDrafting.in",
//           },
//         },
//         publisher: {
//           "@id": "https://www.willdrafting.in/#organization",
//         },
//         mainEntityOfPage: {
//           "@id": `${canonicalUrl}#webpage`,
//         },
//         articleSection: "Post-Death Succession",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is the primary legal difference between a Legal Heir Certificate and a Succession Certificate?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Legal Heir Certificate is an administrative document issued by a Tehsildar or SDM to establish family kinship for pensions and property mutation. A Succession Certificate is a judicial decree issued by a Civil Court under Part X of the Indian Succession Act, 1925 to establish legal title and collect movable debts and securities.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a Succession Certificate be issued for real estate or agricultural land in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Section 370 of the Indian Succession Act, 1925, a Succession Certificate cannot be granted for immovable property such as houses, flats, or agricultural land. Transferring real estate without a Will requires a Legal Heir Certificate and registered family settlement deeds, or Letters of Administration from a civil court.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can I use a Legal Heir Certificate to claim bank fixed deposits and demat shares?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Banks and depository participants may accept a Legal Heir Certificate with an indemnity bond for balances below their policy threshold (often 5 lakh rupees). For high-value balances, contested accounts, or high-value shares, institutions legally require a Succession Certificate under Section 381 of the Indian Succession Act.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Which authority issues a Legal Heir Certificate in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Legal Heir Certificate is issued by local administrative revenue authorities, typically the Tehsildar, Talukdar, Mandal Revenue Officer (MRO), or Sub-Divisional Magistrate (SDM) of the district where the deceased resided.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How much does a Succession Certificate cost compared to a Legal Heir Certificate?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Legal Heir Certificate costs a nominal fee of 20 to 100 rupees on state revenue portals. A Succession Certificate requires ad valorem court fees under state Court Fees Acts, generally 2% to 7.5% of the total asset value, plus advocate legal fees and newspaper publication costs.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How long does it take to get a Succession Certificate from a Civil Court?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "A Succession Certificate takes between 6 and 12 months in Civil Court due to mandatory public notice in local and national newspapers, citation periods, judicial hearings, and surety bond execution. A Legal Heir Certificate is typically issued in 15 to 30 days.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a Legal Heir Certificate be challenged or revoked?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. An administrative Legal Heir Certificate can be cancelled by the Sub-Divisional Magistrate or District Collector if it was obtained through false affidavits or omission of eligible heirs. The affected heir can also challenge it in a Civil Court.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What happens if there is an active nominee on a bank account or mutual fund?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Supreme Court rulings and RBI guidelines, a nominee is a legal trustee appointed to receive funds immediately without requiring a court certificate. However, the nominee does not become the absolute owner; they hold the funds in trust for distribution among the legal heirs.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does having a registered Will eliminate the need for both certificates?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. When a deceased leaves a valid registered Will, the named executor holds direct legal authority under Section 211 of the Indian Succession Act. Assets transfer directly to the named beneficiaries, eliminating the need for either certificate and saving lakhs in court fees.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Where can I apply online for a Legal Heir Certificate in my state?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Most major Indian states provide online applications through state e-District portals, such as e-District Delhi, Aaple Sarkar in Maharashtra, e-Sevai in Tamil Nadu, Seva Sindhu in Karnataka, and eSathi in Uttar Pradesh.",
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
//       <LegalHeirCertificateVsSuccessionCertificateClient />
//       <Footer />
//     </>
//   );
// }
// 
