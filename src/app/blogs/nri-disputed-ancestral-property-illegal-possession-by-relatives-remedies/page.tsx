import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "nri-disputed-ancestral-property-illegal-possession-by-relatives-remedies" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "nri-disputed-ancestral-property-illegal-possession-by-relatives-remedies" }),
  });
}
