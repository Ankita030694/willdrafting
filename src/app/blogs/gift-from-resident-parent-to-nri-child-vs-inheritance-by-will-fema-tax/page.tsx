import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "gift-from-resident-parent-to-nri-child-vs-inheritance-by-will-fema-tax" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "gift-from-resident-parent-to-nri-child-vs-inheritance-by-will-fema-tax" }),
  });
}
