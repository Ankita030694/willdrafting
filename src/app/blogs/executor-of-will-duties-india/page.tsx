import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "executor-of-will-duties-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "executor-of-will-duties-india" }),
  });
}

// ============================================================================
// HARDCODED BLOG COMMENTED OUT (PRESERVED — NOW RENDERED FROM MONGODB)
// ============================================================================
// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ExecutorOfWillDutiesClient from "./ExecutorOfWillDutiesClient";
// 
// export const metadata: Metadata = {
//   title: {
//     absolute: "Executor of Will Duties in India: Step-by-Step Legal Guide",
//   },
//   description:
//     "Understand executor of will duties in India under the Indian Succession Act. Follow our 90-day checklist, probate rules, and asset distribution guide.",
//   keywords: [
//     "executor of will duties india",
//     "executor of will india",
//     "duties of executor",
//     "executor responsibilities",
//     "what does an executor do",
//     "executor first steps after death",
//     "section 211 indian succession act",
//     "section 222 probate executor",
//     "executor first 90 days checklist",
//     "priority of debts estate india",
//     "executor vs administrator",
//     "executor renunciation india",
//     "estate administration india",
//     "WillDrafting.in estate settlement",
//   ],
//   alternates: {
//     canonical:
//       "https://www.willdrafting.in/blogs/executor-of-will-duties-india",
//     languages: {
//       "en-IN":
//         "https://www.willdrafting.in/blogs/executor-of-will-duties-india",
//       "x-default":
//         "https://www.willdrafting.in/blogs/executor-of-will-duties-india",
//     },
//   },
//   openGraph: {
//     title: "Executor of Will Duties in India: Step-by-Step Legal Guide",
//     description:
//       "Understand executor of will duties in India under the Indian Succession Act. Follow our 90-day checklist, probate rules, and asset distribution guide.",
//     url: "https://www.willdrafting.in/blogs/executor-of-will-duties-india",
//     siteName: "WillDrafting.in",
//     locale: "en_IN",
//     type: "article",
//     images: [
//       {
//         url: "https://www.willdrafting.in/images/executor-of-will-duties-india-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Executor of Will Duties in India 90-Day Legal Checklist and Statutory Guide",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Executor of Will Duties in India: Step-by-Step Legal Guide",
//     description:
//       "Understand executor of will duties in India under the Indian Succession Act. Follow our 90-day checklist, probate rules, and asset distribution guide.",
//     images: [
//       "https://www.willdrafting.in/images/executor-of-will-duties-india-og.jpg",
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
// export default function ExecutorOfWillDutiesPage() {
//   const canonicalUrl =
//     "https://www.willdrafting.in/blogs/executor-of-will-duties-india";
//   const imageUrl =
//     "https://www.willdrafting.in/images/executor-of-will-duties-india-og.jpg";
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
//         name: "Executor of Will Duties in India: Step-by-Step Legal Guide",
//         description:
//           "Understand executor of will duties in India under the Indian Succession Act. Follow our 90-day checklist, probate rules, and asset distribution guide.",
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
//             name: "Executor of Will Duties India",
//             item: canonicalUrl,
//           },
//         ],
//       },
//       {
//         "@type": "Article",
//         "@id": `${canonicalUrl}#article`,
//         headline: "Executor of Will Duties in India: 90-Day Legal Roadmap",
//         description:
//           "Understand executor of will duties in India under the Indian Succession Act. Follow our 90-day checklist, probate rules, and asset distribution guide.",
//         image: imageUrl,
//         datePublished: "2026-10-20T09:00:00+05:30",
//         dateModified: "2026-10-20T12:00:00+05:30",
//         author: {
//           "@type": "Person",
//           name: "Advocate Rajeshwar Rao",
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
//         articleSection: "Estate Administration & Succession Law",
//       },
//       {
//         "@type": "FAQPage",
//         "@id": `${canonicalUrl}#faq`,
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is an executor of a Will in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 2(c) of the Indian Succession Act, 1925, an executor is a trusted individual appointed by the testator in their Will to manage and distribute their estate. The executor stands as the legal representative of the deceased for all purposes under Section 211.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What are the primary legal duties of an executor in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "An executor has five core legal duties: (1) Secure the original Will and obtain death certificates; (2) Collect and preserve all estate assets with due diligence; (3) Pay statutory debts in priority order under Sections 320 to 325; (4) Obtain probate if required by jurisdiction; and (5) Distribute assets to beneficiaries and file an estate inventory under Section 317.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is an executor personally liable for the debts of the deceased person?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "No. An executor is never personally liable for the debts of the deceased out of their own private pocket. Debts are cleared strictly using the assets left behind by the deceased. However, if an executor distributes estate assets to beneficiaries without paying known creditors first, they may become personally liable for wasting estate property (devastavit) under Section 368.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can an executor also be a beneficiary in the same Will?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Under Indian law, an executor can absolutely be a beneficiary. In fact, many individuals appoint a primary heir (such as an adult son, daughter, or spouse) as their executor. However, an executor who is also a beneficiary must never witness the Will, as Section 67 voids gifts to attesting witnesses.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Does an executor have the power to sell estate property?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 307 of the Indian Succession Act, an executor has general power to dispose of estate property to pay funeral costs, court expenses, and valid debts of the deceased, unless the Will explicitly restricts this power. When probate is granted, court restrictions on property sales must be strictly obeyed.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can a named executor refuse to take up the role?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. No person is legally forced to serve as an executor. Under Sections 229 and 230 of the Indian Succession Act, a named executor can formally renounce their appointment in writing or orally before the court before intermeddling with estate assets. In that case, beneficiaries can apply for Letters of Administration with the Will annexed.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What is the difference between an executor and an administrator?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "An executor is appointed directly by the testator inside a written Will. An administrator is appointed by a court through Letters of Administration when there is no Will (intestate death), or when the Will does not name an executor, or when the named executor renounces or passes away.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How long does an executor have to complete estate distribution in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 317 of the Indian Succession Act, an executor must exhibit a full inventory of the property and credits within 6 months of probate, and submit a final accounting within 1 year. Section 343 provides an 'executor's year'—meaning an executor cannot generally be compelled to pay out legacies until one year after the testator's death.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is probate always mandatory for an executor in India?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Under Section 213 of the Indian Succession Act, probate is mandatory for Wills made by Hindus, Buddhists, Jains, or Sikhs only if made within the historic presidential towns of Mumbai, Kolkata, or Chennai, or if immovable properties are situated within those limits. In other states, probate is optional unless a bank or housing society specifically demands a court grant.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Can an executor be removed by court for mismanaging estate assets?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Under Section 301 of the Indian Succession Act, the High Court has inherent power to suspend, remove, or discharge an executor on grounds of gross negligence, fraud, conflict of interest, or unreasonable delay, and appoint a court administrator to safeguard beneficiary interests.",
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
//       <ExecutorOfWillDutiesClient />
//       <Footer />
//     </>
//   );
// }
// 
