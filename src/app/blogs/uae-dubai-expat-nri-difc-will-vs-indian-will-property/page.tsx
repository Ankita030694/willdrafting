import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "uae-dubai-expat-nri-difc-will-vs-indian-will-property" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "uae-dubai-expat-nri-difc-will-vs-indian-will-property" }),
  });
}
