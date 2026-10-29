import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "sovereign-gold-bonds-sgb-transfer-after-death-rbi-rules" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "sovereign-gold-bonds-sgb-transfer-after-death-rbi-rules" }),
  });
}
