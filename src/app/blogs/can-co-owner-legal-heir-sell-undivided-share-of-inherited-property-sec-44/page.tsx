import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "can-co-owner-legal-heir-sell-undivided-share-of-inherited-property-sec-44" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "can-co-owner-legal-heir-sell-undivided-share-of-inherited-property-sec-44" }),
  });
}
