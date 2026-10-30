import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "pakistani-bangladeshi-sri-lankan-citizen-inheritance-fema-enemy-property-act" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "pakistani-bangladeshi-sri-lankan-citizen-inheritance-fema-enemy-property-act" }),
  });
}
