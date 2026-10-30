import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "maharashtra-7-12-utara-varas-nond-ferfar-online-mutation-after-death" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "maharashtra-7-12-utara-varas-nond-ferfar-online-mutation-after-death" }),
  });
}
