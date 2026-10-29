import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "credit-card-personal-loan-liability-after-death-rbi-rules-legal-heirs" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "credit-card-personal-loan-liability-after-death-rbi-rules-legal-heirs" }),
  });
}
