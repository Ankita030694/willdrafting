import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "privileged-will-for-indian-army-navy-air-force-soldiers-section-65-66" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "privileged-will-for-indian-army-navy-air-force-soldiers-section-65-66" }),
  });
}
