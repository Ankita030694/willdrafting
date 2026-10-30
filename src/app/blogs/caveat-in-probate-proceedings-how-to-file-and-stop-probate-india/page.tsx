import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "caveat-in-probate-proceedings-how-to-file-and-stop-probate-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "caveat-in-probate-proceedings-how-to-file-and-stop-probate-india" }),
  });
}
