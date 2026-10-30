import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "difference-between-mutation-dakhil-kharij-and-title-ownership-supreme-court" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "difference-between-mutation-dakhil-kharij-and-title-ownership-supreme-court" }),
  });
}
