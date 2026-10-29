import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "deceased-person-income-tax-return-itr-filing-legal-representative-sec-159" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "deceased-person-income-tax-return-itr-filing-legal-representative-sec-159" }),
  });
}
