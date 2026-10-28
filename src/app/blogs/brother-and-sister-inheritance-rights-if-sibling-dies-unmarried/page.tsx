import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "brother-and-sister-inheritance-rights-if-sibling-dies-unmarried" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "brother-and-sister-inheritance-rights-if-sibling-dies-unmarried" }),
  });
}
