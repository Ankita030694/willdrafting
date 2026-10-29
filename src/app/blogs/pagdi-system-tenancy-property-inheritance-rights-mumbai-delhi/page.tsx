import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "pagdi-system-tenancy-property-inheritance-rights-mumbai-delhi" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "pagdi-system-tenancy-property-inheritance-rights-mumbai-delhi" }),
  });
}
