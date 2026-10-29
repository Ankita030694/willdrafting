import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "pledged-gold-loan-recovery-after-death-of-borrower-bank-muthoot" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "pledged-gold-loan-recovery-after-death-of-borrower-bank-muthoot" }),
  });
}
