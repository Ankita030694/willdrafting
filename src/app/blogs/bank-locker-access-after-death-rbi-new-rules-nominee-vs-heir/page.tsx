import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "bank-locker-access-after-death-rbi-new-rules-nominee-vs-heir" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "bank-locker-access-after-death-rbi-new-rules-nominee-vs-heir" }),
  });
}
