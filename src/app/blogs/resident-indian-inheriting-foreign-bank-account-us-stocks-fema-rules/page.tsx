import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "resident-indian-inheriting-foreign-bank-account-us-stocks-fema-rules" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "resident-indian-inheriting-foreign-bank-account-us-stocks-fema-rules" }),
  });
}
