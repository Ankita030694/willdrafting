import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "thumb-impression-on-will-illiterate-blind-parkinsons-bedridden-testator" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "thumb-impression-on-will-illiterate-blind-parkinsons-bedridden-testator" }),
  });
}
