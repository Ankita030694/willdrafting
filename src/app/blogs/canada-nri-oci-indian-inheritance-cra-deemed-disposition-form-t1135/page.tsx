import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "canada-nri-oci-indian-inheritance-cra-deemed-disposition-form-t1135" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "canada-nri-oci-indian-inheritance-cra-deemed-disposition-form-t1135" }),
  });
}
