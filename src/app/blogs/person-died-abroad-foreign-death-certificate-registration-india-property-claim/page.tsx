import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "person-died-abroad-foreign-death-certificate-registration-india-property-claim" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "person-died-abroad-foreign-death-certificate-registration-india-property-claim" }),
  });
}
