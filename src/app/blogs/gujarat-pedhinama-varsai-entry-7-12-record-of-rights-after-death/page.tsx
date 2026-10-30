import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "gujarat-pedhinama-varsai-entry-7-12-record-of-rights-after-death" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "gujarat-pedhinama-varsai-entry-7-12-record-of-rights-after-death" }),
  });
}
