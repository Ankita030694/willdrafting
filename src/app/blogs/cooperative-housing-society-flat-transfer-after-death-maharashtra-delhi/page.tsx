import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "cooperative-housing-society-flat-transfer-after-death-maharashtra-delhi" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "cooperative-housing-society-flat-transfer-after-death-maharashtra-delhi" }),
  });
}
