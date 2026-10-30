import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "ademption-of-legacy-what-if-property-mentioned-in-will-is-sold-before-death" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "ademption-of-legacy-what-if-property-mentioned-in-will-is-sold-before-death" }),
  });
}
