import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "partition-suit-among-brothers-and-sisters-preliminary-final-decree-india" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "partition-suit-among-brothers-and-sisters-preliminary-final-decree-india" }),
  });
}
