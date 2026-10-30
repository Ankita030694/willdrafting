import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "video-kyc-and-virtual-court-hearing-for-nris-in-indian-probate-cases" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "video-kyc-and-virtual-court-hearing-for-nris-in-indian-probate-cases" }),
  });
}
