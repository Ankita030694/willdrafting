import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "undivided-share-of-land-uds-apartment-redevelopment-inheritance-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "undivided-share-of-land-uds-apartment-redevelopment-inheritance-india" }),
  });
}
