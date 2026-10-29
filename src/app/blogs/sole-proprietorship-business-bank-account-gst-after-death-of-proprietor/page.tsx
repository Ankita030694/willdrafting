import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "sole-proprietorship-business-bank-account-gst-after-death-of-proprietor" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "sole-proprietorship-business-bank-account-gst-after-death-of-proprietor" }),
  });
}
