import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "what-if-both-attesting-witnesses-of-will-have-died-section-69-bsa" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "what-if-both-attesting-witnesses-of-will-have-died-section-69-bsa" }),
  });
}
