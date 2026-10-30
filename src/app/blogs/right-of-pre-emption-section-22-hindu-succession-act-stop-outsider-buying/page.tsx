import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "right-of-pre-emption-section-22-hindu-succession-act-stop-outsider-buying" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "right-of-pre-emption-section-22-hindu-succession-act-stop-outsider-buying" }),
  });
}
