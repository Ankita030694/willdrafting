import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "nre-nro-fcnr-bank-account-inheritance-rules-for-nri" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "nre-nro-fcnr-bank-account-inheritance-rules-for-nri" }),
  });
}
