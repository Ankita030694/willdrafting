import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "how-to-challenge-a-will-in-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "how-to-challenge-a-will-in-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import HowToChallengeAWillClient from "./HowToChallengeAWillClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "How to Challenge a Will in India: Legal Grounds & Process",
//   },
//   description:
//     "Learn how to challenge a will in India. Explore legal grounds, limitation periods, BSA 2023 evidence rules, and how to draft contest-proof wills online.",
//   keywords: [
//     "how to challenge a will in india",
//     "grounds to challenge a will",
//     "will contest india",
//     "disputed will india",
//     "how to prove a will is forged",
//     "limitation period to challenge will",
//     "section 59 indian succession act",
//     "section 61 undue influence will",
//     "section 63 execution of will",
//     "section 67 bharatiya sakshya adhiniyam",
//     "suspicious circumstances will contest",
//     "caveat petition probate india",
//     "testamentary capacity doctor certificate",
//     "contest a will procedure india",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/how-to-challenge-a-will-in-india",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/how-to-challenge-a-will-in-india",
//       "x-default":
//         "https://www.willdrafting.in/blogs/how-to-challenge-a-will-in-india",
//     },
//   },
//   openGraph: {
//     title: "How to Challenge a Will in India: Legal Grounds & Process",
//     description:
//       "Learn how to challenge a will in India. Explore legal grounds, limitation periods, BSA 2023 evidence rules, and how to draft contest-proof wills online.",
//     url: "https://www.willdrafting.in/blogs/how-to-challenge-a-will-in-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/how-to-challenge-a-will-in-india-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "How to Challenge a Will in India Legal Grounds Evidence and Defense Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "How to Challenge a Will in India: Legal Grounds & Process",
//     description:
//       "Learn how to challenge a will in India. Explore legal grounds, limitation periods, BSA 2023 evidence rules, and how to draft contest-proof wills online.",
//     images: [
//       "https://www.willdrafting.in/images/how-to-challenge-a-will-in-india-og.jpg",
//     ],
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
// export default function HowToChallengeAWillPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/how-to-challenge-a-will-in-india";
//   const imageUrl =
//     "https://www.willdrafting.in/images/how-to-challenge-a-will-in-india-og.jpg";
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
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${canonicalUrl}#webpage`,
//         url: canonicalUrl,
//         name: "How to Challenge a Will in India: Legal Grounds & Process",
//         description:
//           "Learn how to challenge a will in India. Explore legal grounds, limitation periods, BSA 2023 evidence rules, and how to draft contest-proof wills online.",
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
//             name: "How to Challenge a Will in India",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "How to Challenge a Will in India: Complete Legal Guide",
//         description:
//           "Learn how to challenge a will in India. Explore legal grounds, limitation periods, BSA 2023 evidence rules, and how to draft contest-proof wills online.",
//         image: imageUrl,
//         datePublished: "2026-10-20T09:00:00+05:30",
//         dateModified: "2026-10-20T12:00:00+05:30",
//         author: {
//           "@type": "Person",
//           name: "Advocate Anuj Anand Malik",
//           jobTitle: "Senior Estate & Succession Counsel",
//         },
//         publisher: {
//           "@id": "https://www.willdrafting.in/#organization",
//         },
//         mainEntityOfPage: {
//           "@id": `${canonicalUrl}#webpage`,
//         },
//         articleSection: "Will Disputes & Testamentary Litigation",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "Who has the legal right to challenge a Will in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Only persons who have a direct legal interest in the deceased person's estate have legal standing (locus standi) to challenge a Will. This includes natural legal heirs under personal laws (such as children, surviving spouse, or parents under Section 8 of the Hindu Succession Act) or beneficiaries named in an earlier valid Will who stand to lose their inheritance.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can you challenge a Will while the testator is still alive?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Indian succession law, a Will has zero legal effect during the lifetime of the testator. The person who made the Will can revoke, alter, or cancel it at any time. A Will only becomes operative upon death, so no court will entertain a challenge before the testator passes away.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is the limitation period to challenge a Will in Indian courts?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under the Limitation Act, 1963, a civil suit to declare a Will void or cancel an instrument (under Article 59 or Article 137) must generally be filed within 3 years from the date the right to sue accrues, or within 3 years from when the challenger first discovers the existence of the disputed Will or alleged fraud.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a registered Will be challenged in an Indian court?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Registration under the Registration Act, 1908 proves that the document was presented to a Sub-Registrar, but it does not grant absolute immunity. The Supreme Court of India in Rani Purnima Debi v. Kumar Khagendra Narayan Deb ruled that if suspicious circumstances or undue influence exist, registration alone does not validate an otherwise invalid Will.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How does Section 67 of Bharatiya Sakshya Adhiniyam 2023 apply to Wills?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (which replaces Section 68 of the Indian Evidence Act, 1872) mandates that if a Will is contested, at least one attesting witness who signed the document must be examined in court to prove proper execution, provided that witness is alive and capable of giving evidence.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What constitutes suspicious circumstances in a Will contest?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Suspicious circumstances include situations where the main beneficiary took an active part in preparing or executing the Will, where natural legal heirs were excluded without explanation, where the testator signed with a shaky hand shortly before death, or where the Will was kept secret for many years.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What happens if a court declares a Will invalid or forged?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "If a court declares a Will invalid and no earlier valid Will exists, the estate of the deceased is distributed according to intestate succession rules (such as the Hindu Succession Act, 1956 or Indian Succession Act, 1925). Under these rules, all Class 1 legal heirs receive equal statutory shares.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How can someone make their own Will completely challenge-proof?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "To make your Will dispute-proof: attach a mental fitness certificate from a qualified doctor, record high-definition video of the execution and reading, choose two younger independent witnesses who receive nothing under the Will, register the document at the Sub-Registrar Office, and explicitly explain any exclusion of natural heirs.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is a Caveat petition in probate court and when should you file one?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 284 of the Indian Succession Act, 1925, a Caveat is a formal legal notice filed in probate court warning the judge not to grant probate or letters of administration to another party without first serving notice and hearing your objections.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can an attesting witness be a beneficiary under the Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy given to an attesting witness or their spouse becomes completely void. The Will remains valid, but the witness forfeits their entire inheritance. Attesting witnesses must always be independent third parties.",
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
//       <HowToChallengeAWillClient />
//       <Footer />
//     </>
//   );
// }
// 
