import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "telangana-andhra-pradesh-family-member-certificate-dharani-meebhoomi-succession" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "telangana-andhra-pradesh-family-member-certificate-dharani-meebhoomi-succession" }),
  });
}
