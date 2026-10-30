import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "nri-bank-account-nro-nre-fcnr-claim-after-death-by-resident-or-nri-heirs" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "nri-bank-account-nro-nre-fcnr-claim-after-death-by-resident-or-nri-heirs" }),
  });
}
