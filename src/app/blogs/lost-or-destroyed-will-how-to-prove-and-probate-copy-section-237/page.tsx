import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "lost-or-destroyed-will-how-to-prove-and-probate-copy-section-237" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "lost-or-destroyed-will-how-to-prove-and-probate-copy-section-237" }),
  });
}
