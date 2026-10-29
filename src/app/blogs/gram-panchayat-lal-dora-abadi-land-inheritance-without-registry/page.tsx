import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "gram-panchayat-lal-dora-abadi-land-inheritance-without-registry" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "gram-panchayat-lal-dora-abadi-land-inheritance-without-registry" }),
  });
}
