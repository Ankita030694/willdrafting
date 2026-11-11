import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "delhi-mcd-dda-l-and-do-property-mutation-and-surviving-member-certificate" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "delhi-mcd-dda-l-and-do-property-mutation-and-surviving-member-certificate" }),
  });
}
