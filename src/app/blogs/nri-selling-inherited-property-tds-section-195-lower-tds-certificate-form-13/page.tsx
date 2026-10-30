import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "nri-selling-inherited-property-tds-section-195-lower-tds-certificate-form-13" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "nri-selling-inherited-property-tds-section-195-lower-tds-certificate-form-13" }),
  });
}
