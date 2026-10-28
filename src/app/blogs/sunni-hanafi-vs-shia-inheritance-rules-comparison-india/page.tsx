import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "sunni-hanafi-vs-shia-inheritance-rules-comparison-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "sunni-hanafi-vs-shia-inheritance-rules-comparison-india" }),
  });
}
