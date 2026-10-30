import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "punjab-haryana-fard-badar-intkal-virasat-mutation-jamabandi-after-death" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "punjab-haryana-fard-badar-intkal-virasat-mutation-jamabandi-after-death" }),
  });
}
