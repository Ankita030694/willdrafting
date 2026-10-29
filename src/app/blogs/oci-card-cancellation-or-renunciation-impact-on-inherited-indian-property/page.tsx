import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "oci-card-cancellation-or-renunciation-impact-on-inherited-indian-property" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "oci-card-cancellation-or-renunciation-impact-on-inherited-indian-property" }),
  });
}
