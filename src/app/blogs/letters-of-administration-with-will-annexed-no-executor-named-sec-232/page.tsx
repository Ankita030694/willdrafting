import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "letters-of-administration-with-will-annexed-no-executor-named-sec-232" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "letters-of-administration-with-will-annexed-no-executor-named-sec-232" }),
  });
}
