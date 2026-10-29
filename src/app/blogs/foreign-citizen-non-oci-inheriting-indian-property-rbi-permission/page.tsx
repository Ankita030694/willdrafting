import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "foreign-citizen-non-oci-inheriting-indian-property-rbi-permission" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "foreign-citizen-non-oci-inheriting-indian-property-rbi-permission" }),
  });
}
