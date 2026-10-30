import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "sealed-cover-will-deposit-with-registrar-section-42-registration-act" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "sealed-cover-will-deposit-with-registrar-section-42-registration-act" }),
  });
}
