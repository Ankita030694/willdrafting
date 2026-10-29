import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "nri-joint-holding-with-resident-parents-in-indian-bank-and-property" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "nri-joint-holding-with-resident-parents-in-indian-bank-and-property" }),
  });
}
