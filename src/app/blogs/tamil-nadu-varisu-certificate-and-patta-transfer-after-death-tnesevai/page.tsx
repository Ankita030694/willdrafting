import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "tamil-nadu-varisu-certificate-and-patta-transfer-after-death-tnesevai" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "tamil-nadu-varisu-certificate-and-patta-transfer-after-death-tnesevai" }),
  });
}
