import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "karnataka-khata-transfer-and-pouthi-khata-mutation-after-death-bbmp-bhoomi" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "karnataka-khata-transfer-and-pouthi-khata-mutation-after-death-bbmp-bhoomi" }),
  });
}
