import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "who-should-keep-original-will-safely-in-india-locker-vs-executor-trap" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "who-should-keep-original-will-safely-in-india-locker-vs-executor-trap" }),
  });
}
