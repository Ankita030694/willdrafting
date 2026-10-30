import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "lapse-of-legacy-what-if-beneficiary-dies-before-testator-section-105-109" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "lapse-of-legacy-what-if-beneficiary-dies-before-testator-section-105-109" }),
  });
}
