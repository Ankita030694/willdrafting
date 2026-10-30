import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "limitation-period-to-challenge-a-will-or-mutation-in-india-article-58-65" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "limitation-period-to-challenge-a-will-or-mutation-in-india-article-58-65" }),
  });
}
